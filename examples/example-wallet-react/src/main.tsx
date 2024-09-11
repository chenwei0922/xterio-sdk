import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { type IXterioWalletContextProps, XterioWalletProvider } from '@xterio-sdk/wallet'
import { Env } from '@xterio-sdk/auth'
import '@xterio-sdk/wallet/style/main.css'
import '@xterio-sdk/auth/style/main.css'

const devConfig = {
  redirect_uri: 'http://localhost:3000/',
  client_id: '4gsmgur6gkp8u9ps8dlco3k7eo',
  app_id: ''
}
const stageConfig = {
  redirect_uri: location.href,
  client_id: '3094298453404953',
  app_id: '6c684e202700'
}
const _config = __EXAMPLE_ENV__ === Env.Staging ? stageConfig : devConfig
const env = __EXAMPLE_ENV__

const config: IXterioWalletContextProps = {
  ..._config,
  env
}
createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <XterioWalletProvider {...config}>
    <App />
  </XterioWalletProvider>
  // </StrictMode>
)
