import chalk from 'chalk'
import consola from 'consola'
import { copy, emptyDir, ensureDir } from 'fs-extra'
import { pathAuth, pathWallet, pathExampleAuthReact, pathExampleAuthReactOutput } from './paths'
import { run } from './run'
import { dirname, resolve } from 'path'

async function init() {
  //example-auth-react
  const srcdist = resolve(pathExampleAuthReact, 'dist')
  const outDist = pathExampleAuthReactOutput
  await emptyDir(srcdist)
  await emptyDir(outDist)
  await run('npm run build', pathExampleAuthReact)
  await copy(srcdist, outDist)

  //example-auth-vue

  //example-wallet-react
}

init()
