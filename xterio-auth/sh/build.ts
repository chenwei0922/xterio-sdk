import chalk from 'chalk'
import consola from 'consola'
import { emptyDir, ensureDir } from 'fs-extra'
import { pathOutput, pathSrc } from './paths'
import { run } from './run'

async function init() {
  consola.info(chalk.blue('cleaning dist...'))
  await ensureDir(pathOutput)
  await emptyDir(pathOutput)
  consola.info(chalk.blue('building...'))
  run('vite build')
  consola.info(chalk.blue('build successful'))
}

init()
