import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import * as XterioAuth from '@xterio-sdk/auth'
import '@xterio-sdk/auth/dist/es/style.css'
import { addViewportMeta, validateConfig } from './utils/index.ts'
import {
  IXterioWalletContextProps,
  SendTransactionMode,
  XterioWalletProvider
} from '@xterio-sdk/wallet'

import '@xterio-sdk/wallet/style/main.css'
import { GlobalUnityProvider } from './contexts/GlobalUnityContext.tsx'

// Add viewport meta to support mobile view
addViewportMeta()

const config: IXterioWalletContextProps = {
  /**
   * 申请平台账号接入时平台分配的app_id
   */
  app_id: '', // demo app_id:55f9d090bdb6
  /**
   * 申请平台账号接入时平台分配的client_id
   */
  client_id: '', // demo client_id:1833749239520857
  /**
   * 申请平台账号接入时平台分配的client_secret
   */
  client_secret: '', // demo client_secret: ZGh5Nf4JcWp6jg3qMruYE9ye8xkFHtn2
  /**
   * 申请 particle newtork 钱包分配的 app id
   */
  pn_app_id: '', // demo pn_app_id: e45ec292-c9ec-4092-bdad-4435a2296c79
  /**
   * 申请平台账号接入时提交的redirect_uri,用于 sso 登录后跳转的地址，如果不是sso 登录可以忽略改参数
   */
  redirect_uri: '/',
  /**
   * 对接平台的环境类型： Dev | Staging | Production
   */
  env: XterioAuth.Env.Production,
  /**
   * 是否显示打开钱包弹窗悬浮按钮，默认为false
   */
  showOpenWalletIcon: false,
  /**
   * 是否在钱包sdk中自动集成auth模块并初始化，默认为true
   */
  enableAuthInit: true,
  /**
   * AA 钱包交易模式，默认为Gasless，UserSelect = 0 | Gasless = 1 | UserPaidNative = 2
   */
  transactionMode: SendTransactionMode.Gasless
}

// Check Xter SDK initial config
validateConfig(config)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <XterioWalletProvider {...config}>
    <GlobalUnityProvider>
      <App />
    </GlobalUnityProvider>
  </XterioWalletProvider>
)
