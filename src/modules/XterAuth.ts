import type { ISSoTokensParams, IUserInfo } from 'interfaces/loginInfo'
import { Env, LoginType } from 'interfaces/loginInfo'
import { XterioAuthInfo } from './XterAuthInfo'
import { XterEventEmiter } from './XterEventEmitter'
import { XterioAuthService } from './AuthService'
import { log, XTERIO_CONST, XTERIO_EVENTS } from 'utils'
import qs from 'query-string'

const EnvBaseURLConst: Record<Env, string> = {
  [Env.Dev]: 'https://api.playvrs.net',
  [Env.Staging]: 'https://api.xterio.net',
  [Env.Production]: 'https://api.xterio.net'
}

export class XterioAuth {
  static get isLogin() {
    return !!XterioAuthInfo.userInfo?.uuid
  }
  static get userinfo() {
    return XterioAuthInfo.userInfo
  }
  private static async checkCode() {
    const cacheType = localStorage.getItem(XTERIO_CONST.LOGIN_TYPE) || XterioAuthInfo.loginType
    const _type = cacheType
    log('check the authorize status', _type)

    if (_type !== LoginType.Authorize) return

    const queryParams = qs.parseUrl(location.href, { types: { code: 'string' } })
    const code = queryParams.query?.code
    if (!code) {
      throw new Error('no authorize')
    }
    const uri = XterioAuthInfo.config?.redirect_uri
    if (uri) {
      history.pushState(null, '', uri)
    }
    log('going to login ...')
    const res = await XterioAuthService.login(code as string)
    if (res?.uuid) {
      localStorage.removeItem(XTERIO_CONST.LOGIN_TYPE)
      XterioAuthInfo.onAccount?.(res)
    }
  }
  static init(config: Partial<ISSoTokensParams>, env?: Env) {
    const { client_id, client_secret, redirect_uri = '' } = config
    const _env = env ?? Env.Dev
    const _baseURL = EnvBaseURLConst[_env]
    const _config: ISSoTokensParams = {
      client_id: client_id || '',
      client_secret: client_secret || '',
      redirect_uri,
      response_type: 'code',
      scope: 'all',
      mode: 'email',
      grant_type: 'authorization_code'
    }
    XterioAuthInfo.client_id = client_id || ''
    XterioAuthInfo.env = _env
    XterioAuthInfo.baseURL = _baseURL
    XterioAuthInfo.authorizeUrl = _baseURL + `/account/v1/oauth2/authorize?` + qs.stringify(_config)
    XterioAuthInfo.config = _config

    XterEventEmiter.listeners = {}
    log('initial')

    window.addEventListener('load', (event: Event) => {
      this.checkCode()
    })
  }
  static logout() {
    XterioAuthInfo.userInfo = undefined
    XterioAuthInfo.tokens = undefined
    localStorage.removeItem(XTERIO_CONST.LOGIN_TYPE)
  }
  static login(onCallBack?: (info: IUserInfo) => void) {
    if (XterioAuthInfo.userInfo?.uuid) {
      //logined, callback the account info
      XterEventEmiter.emit(XTERIO_EVENTS.ACCOUNT, XterioAuthInfo.userInfo)
      onCallBack?.(XterioAuthInfo.userInfo)
      return
    }

    XterioAuthInfo.onAccount = onCallBack

    // const _type = type || XterioAuthInfo.loginType || LoginType.Authorize
    const _type = XterioAuthInfo.loginType || LoginType.Authorize

    XterioAuthInfo.loginType = _type
    localStorage.setItem(XTERIO_CONST.LOGIN_TYPE, _type)

    /* delete union login way
    if (_type === LoginType.Union) {
      const queryParams = qs.parseUrl(location.href, { types: { code: 'string' } })
      const code = queryParams.query?.code
      if (code) {
        log('going to login ...')
        const uri = XterioAuthInfo.config?.redirect_uri
        if (uri) {
          history.pushState(null, '', uri)
        }
        const res = await XterioAuthService.login(code as string)
        if (res?.uuid) {
          localStorage.removeItem(XTERIO_CONST.LOGIN_TYPE)
          onCallBack?.(res)
        }
        return
      }
    }
     */
    //go to authorize
    log('going to authorize ...')
    location.href = XterioAuthInfo.authorizeUrl
  }
}
