interface IWalletItem {
  address: string
}
interface ISocialItem {
  name: string
}
interface IUserInfo {
  email: string
  avatar: string
  wallets: IWalletItem[]
  social: ISocialItem[]
}
enum Env {
  Dev = 'Dev',
  Staging = 'Staging',
  Production = 'Production'
}
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
  init(config: { client_id: string }, env?: Env) {
    const { client_id } = config
    this._client_id = client_id
    this._env = env ?? Env.Dev
    this._baseURL = EnvBaseURLConst[this._env]
  }
  login() {}
  openDebug(_flag?: boolean) {
    this.isDebug = !!_flag
  }
}

const a = new XterioAuth()
a.init({ client_id: '4gsmgur6gkp8u9ps8dlco3aaaa' })
a.login()
