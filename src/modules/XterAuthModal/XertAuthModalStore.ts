import { getProfileService, IProfile, loginService, refreshTokenService, registerConfirmService } from './services'
import { ModalObservable } from './ModalObservable'
import { XterAuthModalTokenManager } from './XterAuthModalTokenManager'

export interface IUserInfo extends IProfile {
  wallet?: string[] //TODO
}

interface UserState {
  isLogin: boolean
  userInfo: IUserInfo | null | undefined
}
export class XterAuthModalStore extends ModalObservable {
  public userState: UserState = { isLogin: false, userInfo: null }
  public tokenManager: XterAuthModalTokenManager

  constructor() {
    super()

    this.tokenManager = new XterAuthModalTokenManager()

    this.refreshUserInfo()

    this.listenStateChange()
  }

  private listenStateChange() {
    const _userState: UserState = {
      isLogin: false,
      userInfo: null
    }
    this.userState = new Proxy(_userState, {
      set: (target, prop, value) => {
        console.log('userinfo settttt', value, target)
        if (target[prop as keyof UserState] !== value) {
          target[prop as keyof UserState] = value
          this.setPersistUserInfo()
          this.notify()
        }
        return true
      }
    })
  }

  // 用户登录方法
  public async login(username: string, password: string) {
    const { error, err_code, access_token, id_token, refresh_token } = await loginService(username, password)

    if (!error && access_token && refresh_token) {
      this.tokenManager.setTokens({ accessToken: access_token, refreshToken: refresh_token, idToken: id_token })

      await this.getUserInfo()

      this.userState.isLogin = true
    } else {
      this.userState.isLogin = false
    }

    return { error: !!error, err_code }
  }

  public async confirmSignUpLogin({ username, password, code }: { username: string; password: string; code: string }) {
    const { error, err_code, access_token, id_token, refresh_token } = await registerConfirmService({
      username,
      password,
      code
    })

    if (!error && access_token && refresh_token) {
      this.tokenManager.setTokens({ accessToken: access_token, refreshToken: refresh_token, idToken: id_token })

      await this.getUserInfo()

      this.userState.isLogin = true
    } else {
      this.userState.isLogin = false
    }
    return { error: !!error, err_code }
  }

  private async getUserInfo() {
    const profile = await getProfileService()
    console.log({ profile })
    if (profile && profile.uuid) {
      this.userState.userInfo = { ...this.userState.userInfo, ...profile }
      this.userState.isLogin = true
    }
    return profile
  }

  private setPersistUserInfo() {
    localStorage.setItem('userInfo', JSON.stringify(this.userState.userInfo))
  }

  public getPersistUserInfo() {
    const uf = localStorage.getItem('userInfo')
    return uf ? JSON.parse(uf) : null
  }

  private async refreshUserInfo() {
    const { refreshToken, idToken } = this.tokenManager
    if (refreshToken && !idToken) {
      const res = await refreshTokenService(refreshToken)
      this.tokenManager.setTokens({
        accessToken: res.access_token ?? '',
        refreshToken: refreshToken,
        idToken: res.id_token ?? ''
      })
    }
    if (this.tokenManager.idToken) {
      await this.getUserInfo()
    } else {
      this.logout()
    }
  }

  // 用户登出方法
  public logout(): void {
    this.userState.isLogin = false
    this.userState.userInfo = null

    localStorage.removeItem('userInfo')
    this.tokenManager.removeTokens()
  }
}
