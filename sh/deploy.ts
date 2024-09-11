import { copy, emptyDir } from 'fs-extra'
import {
  pathExampleAuthReact,
  pathExample,
  pathExampleOutput,
  pathExampleOutputAuthReact,
  pathExampleAuthTG,
  pathExampleOutputAuthTg,
  pathExampleWalletReact,
  pathExampleOutputWalletReact,
  pathRoot
} from './paths'
import { run } from './run'
import { resolve, join } from 'path'
import consola from 'consola'
import chalk from 'chalk'

async function init() {
  //example-auth-react
  // await buildExample(pathExampleAuthReact, pathExampleOutputAuthReact)
  consola.log(chalk.greenBright('🎈example-auth-react build finish ✅'))

  //tg-mini-app
  // await buildExample(pathExampleAuthTG, pathExampleOutputAuthTg, 'tg')
  consola.log(chalk.green('🎈tg-mini-app build finish ✅'))

  //example-wallet-react
  await buildExample(pathExampleWalletReact, pathExampleOutputWalletReact)
  consola.log(chalk.green('🎈example-wallet-react build finish ✅'))

  //index.html
  await copy(join(pathExample, 'index.html'), join(pathExampleOutput, 'index.html'))

  consola.log(chalk.green('🎈all examples build finish ✅'))
}

async function buildExample(input: string, output: string, _flag?: string) {
  const srcdist = resolve(input, 'dist')
  const outDist = output
  await emptyDir(srcdist)
  await emptyDir(outDist)

  await run('pnpm run build', input)

  // if (_flag === 'tg') {
  //   await run('pnpm run -w build:tg-mini-app', pathRoot)
  // } else {
  //   await run('pnpm run build', input)
  // }
  await copy(srcdist, outDist)
}
init()
