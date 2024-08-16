import type { Env, ISSoTokensParams, ITokenRes, IUserInfo } from 'interfaces/loginInfo'
import { XterioAuthService } from './AuthService'

export class XterioAuthInfo {
  /** 申请的应用id */
  static client_id: string = ''
  /** 平台环境 */
  static env: Env
  /** 平台服务baseurl */
  static baseURL: string = ''
  /** 授权地址 */
  static authorizeUrl: string = ''
  /** 配置信息 */
  static config?: ISSoTokensParams
  /** whether is login */
  static isLogin: boolean = false
  /** 平台token */
  static tokens?: ITokenRes
  /** 平台userinfo */
  static userInfo?: IUserInfo
}
