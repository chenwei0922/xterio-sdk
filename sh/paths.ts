import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const dir = dirname(fileURLToPath(import.meta.url))

export const pathRoot = resolve(dir, '..')
export const pathAuth = resolve(pathRoot, 'xterio-auth')
export const pathWallet = resolve(pathRoot, 'xterio-wallet')
