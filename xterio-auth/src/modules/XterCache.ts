import type { ITokenRes } from 'interfaces/loginInfo'
import { XTERIO_CONST } from 'utils'

export class XterioCache {
  static set loginType(_type: string) {
    localStorage.setItem(XTERIO_CONST.LOGIN_TYPE, _type)
  }
  static get loginType(): string | undefined {
    const _type = localStorage.getItem(XTERIO_CONST.LOGIN_TYPE)
    return _type ? _type : undefined
  }
  static set tokens(value: ITokenRes) {
    localStorage.setItem(XTERIO_CONST.TOKENS, JSON.stringify(value))
  }
  static get tokens(): ITokenRes | undefined {
    const value = localStorage.getItem(XTERIO_CONST.TOKENS)
    if (value) {
      return JSON.parse(value) as ITokenRes
    }
    return undefined
  }
  static delete(key: string) {
    localStorage.removeItem(key)
  }
}
