import { IXterioWalletContextProps, SendTransactionMode } from '@xterio-sdk/wallet'
import { Env } from '@xterio-sdk/auth'
export interface EnvConfig {
  app_id: string
  client_id: string
  client_secret: string
  pn_app_id: string
  redirect_uri: string
  env: Env
}

export type WalletConfig = IXterioWalletContextProps

const envConfig: EnvConfig = {
  app_id: import.meta.env.VITE_APP_ID,
  client_id: import.meta.env.VITE_CLIENT_ID,
  client_secret: import.meta.env.VITE_CLIENT_SECRET,
  pn_app_id: import.meta.env.VITE_PN_APP_ID,
  redirect_uri: import.meta.env.VITE_REDIRECT_URI,
  env: import.meta.env.VITE_ENV as Env
}

export const getWalletConfig = (): WalletConfig => ({
  ...envConfig,
  showOpenWalletIcon: false,
  enableAuthInit: true,
  transactionMode: SendTransactionMode.Gasless
})
