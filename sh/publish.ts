import chalk from 'chalk'
import consola from 'consola'
import { emptyDir, ensureDir, readJSONSync, writeJSONSync } from 'fs-extra'
import { pathAuth, pathWallet, pathAuthJson, pathWalletJson, pathSh, pathRoot } from './paths'
import { run } from './run'

const AuthJsonData = readJSONSync(pathAuthJson, { encoding: 'utf-8' })
const WalletJsonData = readJSONSync(pathWalletJson, { encoding: 'utf-8' })

const _flag = process.argv[2]
const _version = process.argv[3]
consola.info('_flag=', chalk.blue(_flag), _version)

async function init() {
  const isExecuteAuth = !_flag || _flag === 'auth'
  const isExecuteWallet = !_flag || _flag === 'wallet'
  let authVersion = AuthJsonData.version
  let walletVersion = WalletJsonData.version

  if (isExecuteAuth) {
    if (_version) {
      authVersion = _version
      AuthJsonData.version = _version
      writeJSONSync(pathAuthJson, AuthJsonData, { encoding: 'utf-8', spaces: 2 })
      await commitVersionFile('auth', _version)
      await run(`pnpm run build:auth`, pathRoot)
    }
    await run('npm publish', pathAuth)
    // publish success, commit all change content and push release lock.
    await run(`bash release.sh auth ${authVersion}`, pathSh)
  }

  if (isExecuteWallet) {
    if (_version) {
      walletVersion = _version
      WalletJsonData.version = _version
      writeJSONSync(pathWalletJson, WalletJsonData, { encoding: 'utf-8', spaces: 2 })
      await commitVersionFile('wallet', _version)
      await run(`pnpm run build:wallet`, pathRoot)
    }
    //tip: change package.json content
    WalletJsonData.dependencies['@xterio-sdk/auth'] = '^' + authVersion
    writeJSONSync(pathWalletJson, WalletJsonData, { encoding: 'utf-8', spaces: 2 })
    await run('npm publish', pathWallet)
    await run(`bash release.sh wallet ${walletVersion}`, pathSh)
    await reset()
  }
}
const commitVersionFile = async (_f: string, _v: string) => {
  const path = _f === 'auth' ? pathAuth : pathWallet
  await run(`git push origin main && git push new-origin main`)
  await run(`git add package.json && git commit -m "feat: npm pkg(${_f}) publish(${_v})"`, path)
  await run(`git push origin main && git push new-origin main`)
}
const reset = () => {
  WalletJsonData.dependencies['@xterio-sdk/auth'] = 'workspace:^'
  writeJSONSync(pathWalletJson, WalletJsonData, { encoding: 'utf-8', spaces: 2 })
}

init()
