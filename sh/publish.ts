import chalk from 'chalk'
import consola from 'consola'
import { emptyDir, ensureDir, readJSONSync, writeJSONSync } from 'fs-extra'
import { pathAuth, pathWallet, pathAuthJson, pathWalletJson } from './paths'
import { run } from './run'

const AuthJsonData = readJSONSync(pathAuthJson, { encoding: 'utf-8' })
const WalletJsonData = readJSONSync(pathWalletJson, { encoding: 'utf-8' })

const _flag = process.argv[2]
consola.info('_flag=', chalk.blue(_flag))

async function init() {
  const isExecuteAuth = !_flag || _flag === 'auth'
  const isExecuteWallet = !_flag || _flag === 'wallet'

  if (isExecuteAuth) {
    await run('npm run publish', pathAuth)
  }

  if (isExecuteWallet) {
    //tip: change package.json content
    WalletJsonData.dependencies['@xterio-sdk/auth'] = '^' + AuthJsonData.version
    writeJSONSync(pathWalletJson, WalletJsonData, { encoding: 'utf-8', spaces: 2 })
    await run('npm run publish', pathWallet)

    // reset()
  }
}
const reset = () => {
  WalletJsonData.dependencies['@xterio-sdk/auth'] = 'workspace:^'
  writeJSONSync(pathWalletJson, WalletJsonData, { encoding: 'utf-8', spaces: 2 })
}

init()
