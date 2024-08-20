import axios, { AxiosInstance } from 'axios'
import type { IUserInfo, ITokenRes, IRes, IUserInfoRes, IWalletItem } from 'interfaces/loginInfo'
import { getPackageVersion, log, randomNonceStr } from 'utils'
import { XterioAuthInfo } from './XterAuthInfo'
import { XterEventEmiter } from './XterEventEmitter'
import { XTERIO_EVENTS } from 'utils/const'

export class XterioAuthService {
  static request(needLogin?: boolean): AxiosInstance {
    if (!XterioAuthInfo.client_id) {
      throw new Error('You need set xterio-auth info')
    }
    let headers: Record<string, string | number> = {
      sdkVersion: getPackageVersion(),
      platform: 'pc',
      clientId: XterioAuthInfo.client_id,
      timestamp: Date.now(),
      language: 'en',
      nonce: randomNonceStr()
      //app端
      // appVersion: '',
      // appPackage: '',
    }
    if (needLogin) {
      const idtoken = XterioAuthInfo.tokens?.id_token || ''
      if (!idtoken) {
        throw new Error('You need first login')
      }
      headers = { ...headers, Authorization: idtoken }
    }

    const instance = axios.create({
      baseURL: XterioAuthInfo.baseURL,
      timeout: 60000,
      headers: headers
    })
    return instance
  }

  /**
   * 平台登录
   * @param code 授权code
   * @returns Promise < IUserInfo | null >
   */
  static async login(code: string) {
    const { client_id, client_secret, redirect_uri, grant_type } = XterioAuthInfo.config || {}
    const param = { client_id, client_secret, redirect_uri, grant_type, code }
    const data = param
    log('go login')

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const res = await this.request()
      .post<{ data: ITokenRes; err_code: number }>(`/account/v1/oauth2/token`, data, { headers })
      .then((res) => {
        log('login success.')
        XterioAuthInfo.tokens = res.data.data
        return res.data
      })
      .catch((err) => {
        log('login failed.')
        return { data: null }
      })

    if (res.data?.id_token) {
      log('get userinfo')
      const info = await this.getUserInfo()
      if (info.uuid) {
        XterEventEmiter.emit(XTERIO_EVENTS.ACCOUNT, info)
        return info
      }
    }
    return null
  }

  /**
   * 查询平台用户信息
   * @returns
   */
  static async getUserInfo(): Promise<IUserInfo> {
    const [profileInfo, wallet] = await Promise.all([this.getProfile(), this.getWallet()])
    XterioAuthInfo.userInfo = {
      ...profileInfo,
      wallet
    }
    return {
      ...profileInfo,
      wallet
    }
  }

  private static async getProfile(): Promise<IUserInfoRes> {
    const res = await this.request(true)
      .get<IRes<IUserInfoRes>>(`/account/v1/user/profile`)
      .then((res) => {
        log('get userinfo success.')
        return res.data
      })
      .catch((err) => {
        log('get userinfo failed.')
        return { data: null }
      })
    return res.data?.uuid ? { ...res.data } : {}
  }

  private static async getWallet(): Promise<IWalletItem[]> {
    const res = await this.request(true)
      .get<IRes<{ wallet: IWalletItem[] }>>(`/account/v1/wallet`)
      .then((res) => {
        log('get wallet success.')
        return res.data
      })
      .catch((err) => {
        log('get wallet failed.')
        return { data: null }
      })
    return res.data?.wallet || []
  }
}
