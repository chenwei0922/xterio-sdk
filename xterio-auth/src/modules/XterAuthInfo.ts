import type { Env, ISSoTokensParams, ITokenRes, IUserInfo } from 'interfaces/loginInfo'
import { LoginType } from 'interfaces/loginInfo'

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
