import chalk from 'chalk'
import consola from 'consola'
import { copy, emptyDir, ensureDir } from 'fs-extra'
import {
  pathAuth,
  pathWallet,
  pathExampleAuthReact,
  pathExample,
  pathExampleOutput,
  pathExampleOutputAuthReact
} from './paths'
import { run } from './run'
import { dirname, resolve, join } from 'path'

async function init() {
  //example-auth-react
  const srcdist = resolve(pathExampleAuthReact, 'dist')
  const outDist = pathExampleOutputAuthReact
  await emptyDir(srcdist)
  await emptyDir(outDist)
  await run('npm run build', pathExampleAuthReact)
  await copy(srcdist, outDist)

  //example-auth-vue

  //example-wallet-react

  //index.html
  await copy(join(pathExample, 'index.html'), join(pathExampleOutput, 'index.html'))
}

init()
