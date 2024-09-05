import type { Env, ISSoTokensParams, ITokenRes, IUserInfo } from 'interfaces/loginInfo'
import { LoginType } from 'interfaces/loginInfo'
import { XterioCache } from './XterCache'

export class XterioAuthInfo {
  /** app id */
  static client_id: string = ''
  /** app env */
  static env: Env
  /** service base url */
  static baseURL: string = ''
  /** authrorize url */
  static authorizeUrl: string = ''
  /** sdk initial config info */
  static config?: ISSoTokensParams
  /** user logined tokens */
  static tokens?: ITokenRes
  /** user account */
  static userInfo?: IUserInfo
  /** account callback function */
  static onAccount?(p: IUserInfo): void
  /** login way */
  static loginType?: LoginType
}

export class XterioAuthTokensManager {
  static setTokens(value: Partial<ITokenRes>) {
    const { id_token = '', access_token = '', refresh_token = '' } = value || {}
    XterioAuthInfo.tokens = { id_token, access_token, refresh_token }
    XterioCache.tokens = value
  }
  static removeTokens() {
    XterioAuthInfo.tokens = undefined
  }
  static get idToken() {
    return XterioAuthInfo.tokens?.id_token || ''
  }
  static get refreshToken() {
    return XterioAuthInfo.tokens?.refresh_token || ''
  }
}

export class XterioAuthUserInfoManager {
  static setUserInfo(value: IUserInfo) {
    XterioAuthInfo.userInfo = value
    XterioCache.userInfo = value
  }
  static removeUserInfo() {
    XterioAuthInfo.userInfo = undefined
  }
  static get userInfo() {
    return XterioAuthInfo.userInfo
  }
}
