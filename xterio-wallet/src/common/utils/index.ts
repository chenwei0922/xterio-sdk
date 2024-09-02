import { version } from '../../../package.json'

export const log = (...args: any[]) => {
  console.log(`[XterioWallet(v${version})]`, ...args)
}

export const getPackageVersion = () => {
  return version
}

export function sleep(time: number): Promise<number> {
  return new Promise((res) => {
    setTimeout(res, time, time)
  })
}
