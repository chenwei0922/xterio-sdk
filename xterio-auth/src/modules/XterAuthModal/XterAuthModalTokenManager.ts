import Cookies from 'js-cookie'

export class XterAuthModalTokenManager {
  public accessToken: string | undefined
  public refreshToken: string | undefined
  public idToken: string | undefined

  constructor() {
    this.accessToken = Cookies.get('_access_token')
    this.refreshToken = Cookies.get('_refresh_token')
    this.idToken = Cookies.get('_id_token')
  }

  public setTokens({
    accessToken,
    refreshToken,
    idToken
  }: {
    accessToken: string
    refreshToken: string
    idToken: string
  }) {
    this.accessToken = accessToken
    this.refreshToken = refreshToken
    this.idToken = idToken
    Cookies.set('_access_token', accessToken, { expires: 1 })
    Cookies.set('_id_token', idToken || '', { expires: 1 })
    Cookies.set('_refresh_token', refreshToken)
  }

  public removeTokens() {
    this.accessToken = undefined
    this.refreshToken = undefined
    this.idToken = undefined
    Cookies.remove('_access_token')
    Cookies.remove('_refresh_token')
    Cookies.remove('_id_token')
  }
}
