import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const dir = dirname(fileURLToPath(import.meta.url))

export const pathRoot = resolve(dir, '..')
export const pathSh = resolve(pathRoot, 'sh')
export const pathAuth = resolve(pathRoot, 'xterio-auth')
export const pathWallet = resolve(pathRoot, 'xterio-wallet')
export const pathAuthJson = resolve(pathAuth, 'package.json')
export const pathWalletJson = resolve(pathWallet, 'package.json')
export const pathExample = resolve(pathRoot, 'examples')
export const pathExampleAuthReact = resolve(pathExample, 'example-auth-react')
export const pathExampleWalletReact = resolve(pathExample, 'example-wallet-react')
export const pathExampleOutput = resolve(pathExample, 'dist')
export const pathExampleOutputAuthReact = resolve(pathExample, 'dist/auth-react')
export const pathExampleOutputWalletReact = resolve(pathExample, 'dist/wallet-react')
