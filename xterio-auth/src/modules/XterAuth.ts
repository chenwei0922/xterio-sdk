import type { ISSoTokensParams, Payload } from 'interfaces/loginInfo'
import { Env, LoginType } from 'interfaces/loginInfo'
import { XterioAuthInfo } from './XterAuthInfo'
import { XterEventEmiter } from './XterEventEmitter'
import { XterioAuthService } from './AuthService'
import { log, XTERIO_CONST, XTERIO_EVENTS } from 'utils'
import qs from 'query-string'
import { XterioCache } from './XterCache'
import { decode } from 'js-base64'

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
  static get id_token() {
    return XterioAuthInfo.tokens?.id_token
  }
  private static get isVaildIdToken() {
    const id_token = XterioAuthInfo.tokens?.id_token || ''

    if (!id_token) {
      log('invalid token 1')
      return false
    }
    const payload = id_token.split('.')?.[1]
    if (!payload) {
      log('invalid token 2')
      return false
    }

    try {
      const { aud, exp = 0, sub } = JSON.parse(decode(payload)) as Payload
      const isExpire = !aud || Date.now() > exp * 1000
      return !isExpire
    } catch (error) {
      log('invalid token 3', error)
      return false
    }
  }

  private static async checkToken() {
    if (XterioCache.tokens) {
      XterioAuthInfo.tokens = XterioCache.tokens
    }
    const isvalid = XterioAuth.isVaildIdToken
    log('check the tokens valid status:', isvalid)
    if (!isvalid) {
      XterioAuthInfo.tokens = undefined
      XterioCache.delete(XTERIO_CONST.TOKENS)
    } else {
      //get userinfo
      await XterioAuthService.getUserInfo()
    }
  }

  private static async checkCode() {
    const _type = XterioCache.loginType
    log('check the authorize status', _type)

    if (_type !== LoginType.Authorize) return

    const uri = XterioAuthInfo.config?.redirect_uri
    if (!uri || !location.href.startsWith(uri)) {
      log('not check, different redirect_uri')
      return
    }

    const queryParams = qs.parseUrl(location.href, { types: { code: 'string' } })
    const code = queryParams.query?.code
    if (!code) {
      throw new Error('no authorize')
    }
    if (uri) {
      history.pushState(null, '', uri)
    }
    log('going to login ...')
    const res = await XterioAuthService.login(code as string)
    if (res?.uuid) {
      XterioCache.delete(XTERIO_CONST.LOGIN_TYPE)
    }
  }

  static async init(config: Partial<ISSoTokensParams>, env?: Env) {
    const { client_id, client_secret, redirect_uri = '', mode } = config
    const _env = env ?? Env.Dev
    const _baseURL = EnvBaseURLConst[_env]
    const _config: ISSoTokensParams = {
      client_id: client_id || '',
      client_secret: client_secret || '',
      redirect_uri,
      response_type: 'code',
      scope: 'all',
      mode: mode || 'default',
      grant_type: 'authorization_code',
      logout: '1'
    }
    XterioAuthInfo.client_id = client_id || ''
    XterioAuthInfo.env = _env
    XterioAuthInfo.baseURL = _baseURL
    XterioAuthInfo.authorizeUrl = _baseURL + `/account/v1/oauth2/authorize?` + qs.stringify(_config)
    XterioAuthInfo.config = _config

    XterEventEmiter.listeners = {}
    log('initial')

    await this.checkToken()
    window.addEventListener('load', async (event: Event) => {
      await this.checkCode()
    })
  }
  static logout() {
    log('logout success')
    XterioAuthInfo.userInfo = undefined
    XterioAuthInfo.tokens = undefined
    XterioCache.delete(XTERIO_CONST.LOGIN_TYPE)
    XterioCache.delete(XTERIO_CONST.TOKENS)
  }
  static async login(mode?: 'default' | 'email') {
    if (!XterioAuthInfo.config) {
      log('xterio auth sdk initial failed')
      return
    }
    if (mode) {
      XterioAuthInfo.config = { ...XterioAuthInfo.config, mode }
      XterioAuthInfo.authorizeUrl =
        XterioAuthInfo.baseURL + `/account/v1/oauth2/authorize?` + qs.stringify(XterioAuthInfo.config)
    }

    if (XterioAuth.isLogin) {
      //logined, callback the account info
      log('already logined.')
      XterEventEmiter.emit(XTERIO_EVENTS.ACCOUNT, XterioAuthInfo.userInfo)
      return
    }
    if (XterioAuth.isVaildIdToken) {
      //idtoken not expired
      log('get userinfo')
      return XterioAuthService.getUserInfo()
    }

    XterioCache.loginType = LoginType.Authorize

    //go to authorize
    log('going to authorize ...')
    location.href = XterioAuthInfo.authorizeUrl
  }
}
