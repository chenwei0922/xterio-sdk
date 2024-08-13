import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import { getPackageVersion, log, randomNonceStr } from './utils'
import { Env, IUserInfo } from './interfaces/loginInfo'
import qs from 'query-string'

const EnvBaseURLConst: Record<Env, string> = {
  [Env.Dev]: 'https://api.playvrs.net',
  [Env.Staging]: 'https://api.xterio.net',
  [Env.Production]: 'https://api.xterio.net'
}

class XterioAuth {
  private _userinfo: IUserInfo | undefined
  private _client_id: string | undefined
  private _redirect_uri: string | undefined
  private isDebug: boolean = true
  private _env: Env = Env.Dev
  private _baseURL: string = EnvBaseURLConst[Env.Dev]

  constructor() {}

  get userInfo(): IUserInfo {
    return this._userinfo || ({} as IUserInfo)
  }
  get request(): AxiosInstance {
    const instance = axios.create({
      maxRedirects: 0,
      baseURL: this._baseURL,
      timeout: 60000,
      headers: {
        sdkVersion: getPackageVersion(),
        platform: 'pc',
        clientId: this._client_id,
        timestamp: Date.now(),
        language: 'en',
        nonce: randomNonceStr()
        //app端
        // appVersion: '',
        // appPackage: '',
      }
    })

    return instance
  }
  openDebug(_flag?: boolean) {
    this.isDebug = !!_flag
  }
  init(config: { client_id: string }, env?: Env) {
    const { client_id } = config
    this._client_id = client_id
    this._env = env ?? Env.Dev
    this._baseURL = EnvBaseURLConst[this._env]
  }
  async login() {
    const authConfig = {
      redirect_uri: 'XterioAuth://login',
      client_id: this._client_id,
      response_type: 'code',
      scope: 'all',
      mode: 'default',
      logout: 1
    }
    const param = qs.stringify(authConfig)
    const authUrl = `/account/v1/oauth2/authorize?` + param
    // const authUrl = `/account/v1/oauth2/authorize?client_id=${this._client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=all&mode=default&logout=1`
    log('authUrl=', authUrl)

    const result = await this.request
      .get(authUrl, { maxRedirects: 0 })
      .then((resp) => {
        log('request success:', resp)
        return resp.data
      })
      .catch((err) => {
        if (err?.response?.status === 302) {
          return { redirectUri: err?.response?.headers?.location || '' }
        }
        log('request error:', err)
        return Promise.reject(err)
      })
    log('result=', result)
    const redirectUri = result?.redirectUri || ''
    // 'https://d39wr9n5mj2b6n.cloudfront.net/sso?s=5e99397a-9f01-4d8c-8eb5-93afe869e6c8&mode=default&logout=1'
    const reg = /[?&]s=([^&]*)/
    const code = redirectUri.match(reg)?.[1]
    log('code=', code)
  }
}

export default XterioAuth
