import { version } from '../../package.json'

export const log = (...args: any[]) => {
  console.log(`[XterioAuth(v${version})]`, ...args)
}

export const getPackageVersion = () => {
  return version
}

export const randomId = (): number => {
  const date = Date.now() * Math.pow(10, 3)
  const extra = Math.floor(Math.random() * Math.pow(10, 3))
  return date + extra
}

export const randomNonceStr = (c?: number): string => {
  c = c || 32
  const t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  const a = t.length
  let n = ''
  for (let i = 0; i < c; i++) n += t.charAt(Math.floor(Math.random() * a))
  return n
}
