import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import spawn from 'cross-spawn'
import minimist from 'minimist'
import prompts from 'prompts'
import { blue, cyan, green, lightGreen, lightRed, magenta, red, reset, yellow } from 'kolorist'

// Avoids autoconversion to number of the project name by defining that the args
// non associated with an option ( _ ) needs to be parsed as a string. See #4606
const argv = minimist<{
  t?: string
  template?: string
}>(process.argv.slice(2), { string: ['_'] })
const cwd = process.cwd()

type ColorFunc = (str: string | number) => string
type Framework = {
  name: string
  display: string
  color: ColorFunc
  variants: FrameworkVariant[]
}

type AppType = {
  name: string
  display: string
  color: ColorFunc
}

type AppVariant = {
  name: string
  display: string
  color: ColorFunc
  customCommand?: string
}

type FrameworkVariant = {
  name: string
  display: string
  color: ColorFunc
  customCommand?: string
}

const APPTYPES: AppType[] = [
  {
    name: 'xterio-react-webgl',
    display: '基础版',
    color: green
  }
  // {
  //   name: "xterio-react-webgl-tg",
  //   display: "TG 小程序版",
  //   color: blue,
  // },
]

const TEMPLATES = APPTYPES.map((f) => (f.variants && f.variants.map((v) => v.name)) || [f.name]).reduce(
  (a, b) => a.concat(b),
  []
)

const renameFiles: Record<string, string | undefined> = {
  _gitignore: '.gitignore',
  '_eslintrc.js': '.eslintrc.js'
}

const defaultTargetDir = 'xterio-react-webgl-starter'

async function init() {
  const argTargetDir = formatTargetDir(argv._[0])
  const argTemplate = argv.template || argv.t

  let targetDir = argTargetDir || defaultTargetDir
  const getProjectName = () => (targetDir === '.' ? path.basename(path.resolve()) : targetDir)

  let result: prompts.Answers<'projectName' | 'overwrite' | 'packageName' | 'appType' | 'variant'>

  try {
    result = await prompts(
      [
        {
          type: argTargetDir ? null : 'text',
          name: 'projectName',
          message: reset('Project name:'),
          initial: defaultTargetDir,
          onState: (state) => {
            targetDir = formatTargetDir(state.value) || defaultTargetDir
          }
        },
        {
          type: () => (!fs.existsSync(targetDir) || isEmpty(targetDir) ? null : 'confirm'),
          name: 'overwrite',
          message: () =>
            (targetDir === '.' ? 'Current directory' : `Target directory "${targetDir}"`) +
            ` is not empty. Remove existing files and continue?`
        },
        {
          type: (_, { overwrite }: { overwrite?: boolean }) => {
            if (overwrite === false) {
              throw new Error(red('✖') + ' Operation cancelled')
            }
            return null
          },
          name: 'overwriteChecker'
        },
        {
          type: () => (isValidPackageName(getProjectName()) ? null : 'text'),
          name: 'packageName',
          message: reset('Package name:'),
          initial: () => toValidPackageName(getProjectName()),
          validate: (dir) => isValidPackageName(dir) || 'Invalid package.json name'
        },
        {
          type: argTemplate && TEMPLATES.includes(argTemplate) ? null : 'select',
          name: 'appType',
          message:
            typeof argTemplate === 'string' && !TEMPLATES.includes(argTemplate)
              ? reset(`"${argTemplate}" isn't a valid template. Please choose from below: `)
              : reset('选择项目类型:'),
          initial: 0,
          choices: APPTYPES.map((framework) => {
            const frameworkColor = framework.color
            return {
              title: frameworkColor(framework.display || framework.name),
              value: framework
            }
          })
        },
        {
          type: (appType: AppType) => (appType && appType.variants ? 'select' : null),
          name: 'variant',
          message: reset('Select a variant:'),
          choices: (appType: AppType) =>
            appType?.variants?.map((variant) => {
              const variantColor = variant.color
              return {
                title: variantColor(variant.display || variant.name),
                value: variant.name
              }
            })
        }
      ],
      {
        onCancel: () => {
          throw new Error(red('✖') + ' Operation cancelled')
        }
      }
    )
  } catch (cancelled: any) {
    console.log(cancelled.message)
    return
  }

  // user choice associated with prompts
  const { appType, overwrite, packageName, variant } = result

  const root = path.join(cwd, targetDir)

  if (overwrite) {
    emptyDir(root)
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root, { recursive: true })
  }

  // determine template
  let template: string = variant || appType?.name || argTemplate
  let isReactSwc = false
  if (template.includes('-swc')) {
    isReactSwc = true
    template = template.replace('-swc', '')
  }

  const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent)
  const pkgManager = pkgInfo ? pkgInfo.name : 'npm'
  const isYarn1 = pkgManager === 'yarn' && pkgInfo?.version.startsWith('1.')

  const { customCommand } = APPTYPES.flatMap((f) => f.variants).find((v) => v?.name === template) ?? {}

  if (customCommand) {
    const fullCustomCommand = customCommand
      .replace(/^npm create /, () => {
        // `bun create` uses it's own set of templates,
        // the closest alternative is using `bun x` directly on the package
        if (pkgManager === 'bun') {
          return 'bun x create-'
        }
        return `${pkgManager} create `
      })
      // Only Yarn 1.x doesn't support `@version` in the `create` command
      .replace('@latest', () => (isYarn1 ? '' : '@latest'))
      .replace(/^npm exec/, () => {
        // Prefer `pnpm dlx`, `yarn dlx`, or `bun x`
        if (pkgManager === 'pnpm') {
          return 'pnpm dlx'
        }
        if (pkgManager === 'yarn' && !isYarn1) {
          return 'yarn dlx'
        }
        if (pkgManager === 'bun') {
          return 'bun x'
        }
        // Use `npm exec` in all other cases,
        // including Yarn 1.x and other custom npm clients.
        return 'npm exec'
      })

    const [command, ...args] = fullCustomCommand.split(' ')
    // we replace TARGET_DIR here because targetDir may include a space
    const replacedArgs = args.map((arg) => arg.replace('TARGET_DIR', targetDir))
    const { status } = spawn.sync(command, replacedArgs, {
      stdio: 'inherit'
    })
    process.exit(status ?? 0)
  }

  console.log(`\n正在初始化脚手架项目，请稍等 ${root}...`)

  const templateDir = path.resolve(fileURLToPath(import.meta.url), '../..', `template-${template}`)

  const write = (file: string, content?: string) => {
    const targetPath = path.join(root, renameFiles[file] ?? file)
    if (content) {
      fs.writeFileSync(targetPath, content)
    } else {
      copy(path.join(templateDir, file), targetPath)
    }
  }

  const files = fs.readdirSync(templateDir)
  for (const file of files.filter((f) => f !== 'package.json')) {
    write(file)
  }

  const pkg = JSON.parse(fs.readFileSync(path.join(templateDir, `package.json`), 'utf-8'))

  pkg.name = packageName || getProjectName()

  write('package.json', JSON.stringify(pkg, null, 2) + '\n')

  if (isReactSwc) {
    setupReactSwc(root, template.endsWith('-ts'))
  }

  const cdProjectName = path.relative(cwd, root)
  console.log(`\nDone. Now run:\n`)
  if (root !== cwd) {
    console.log(`  cd ${cdProjectName.includes(' ') ? `"${cdProjectName}"` : cdProjectName}`)
  }
  // console.log(`  git init`)
  console.log(`  open /src/main.ts to fulfill the config`)
  switch (pkgManager) {
    case 'yarn':
      console.log('  yarn')
      console.log('  yarn dev')
      break
    default:
      console.log(`  ${pkgManager} install`)
      console.log(`  ${pkgManager} run dev`)
      break
  }
  console.log()
}

function formatTargetDir(targetDir: string | undefined) {
  return targetDir?.trim().replace(/\/+$/g, '')
}

function copy(src: string, dest: string) {
  const stat = fs.statSync(src)
  if (stat.isDirectory()) {
    copyDir(src, dest)
  } else {
    fs.copyFileSync(src, dest)
  }
}

function isValidPackageName(projectName: string) {
  return /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(projectName)
}

function toValidPackageName(projectName: string) {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/^[._]/, '')
    .replace(/[^a-z\d\-~]+/g, '-')
}

function copyDir(srcDir: string, destDir: string) {
  fs.mkdirSync(destDir, { recursive: true })
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file)
    const destFile = path.resolve(destDir, file)
    copy(srcFile, destFile)
  }
}

function isEmpty(path: string) {
  const files = fs.readdirSync(path)
  return files.length === 0 || (files.length === 1 && files[0] === '.git')
}

function emptyDir(dir: string) {
  if (!fs.existsSync(dir)) {
    return
  }
  for (const file of fs.readdirSync(dir)) {
    if (file === '.git') {
      continue
    }
    fs.rmSync(path.resolve(dir, file), { recursive: true, force: true })
  }
}

function pkgFromUserAgent(userAgent: string | undefined) {
  if (!userAgent) return undefined
  const pkgSpec = userAgent.split(' ')[0]
  const pkgSpecArr = pkgSpec.split('/')
  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1]
  }
}

function setupReactSwc(root: string, isTs: boolean) {
  editFile(path.resolve(root, 'package.json'), (content) => {
    return content.replace(/"@vitejs\/plugin-react": ".+?"/, `"@vitejs/plugin-react-swc": "^3.0.0"`)
  })
  editFile(path.resolve(root, `vite.config.${isTs ? 'ts' : 'js'}`), (content) => {
    return content.replace('@vitejs/plugin-react', '@vitejs/plugin-react-swc')
  })
}

function editFile(file: string, callback: (content: string) => string) {
  const content = fs.readFileSync(file, 'utf-8')
  fs.writeFileSync(file, callback(content), 'utf-8')
}

init().catch((e) => {
  console.error(e)
})
