import { version } from '../../../package.json'

export const log = (...args: any[]) => {
  console.log(`[XterioWallet(v${version})]`, ...args)
}

export const getPackageVersion = () => {
  return version
}
