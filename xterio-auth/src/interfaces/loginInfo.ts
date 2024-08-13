export interface IWalletItem {
  address: string
}

interface ISocialItem {
  name: string
}

export interface IUserInfo {
  email: string
  avatar: string
  wallets: IWalletItem[]
  social: ISocialItem[]
}

export enum Env {
  Dev = 'Dev',
  Staging = 'Staging',
  Production = 'Production'
}

export enum Language {
  EN = 'en',
  ZH_HANS = 'zh_hans',
  ZH_HANT = 'zh_hant',
  JA = 'ja',
  KO = 'ko'
}
