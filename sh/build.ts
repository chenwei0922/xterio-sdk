import chalk from 'chalk'
import consola from 'consola'
import { emptyDir, ensureDir } from 'fs-extra'
import { pathAuth, pathWallet } from './paths'
import { run } from './run'

const _flag = process.argv[2]
consola.info('_flag=', chalk.blue(_flag))
async function init() {
  const isExecuteAuth = !_flag || _flag === 'auth'
  const isExecuteWallet = !_flag || _flag === 'wallet'

  if (isExecuteAuth) {
    consola.info(chalk.blue('build xterio auth...'))
    await run('npm run build', pathAuth)
    consola.info(chalk.blue('xterio auth build finished.'))
  }
  if (isExecuteWallet) {
    consola.info(chalk.blue('build xterio wallet...'))
    await run('npm run build', pathWallet)
    consola.info(chalk.blue('xterio wallet build finished.'))
  }
}

init()
