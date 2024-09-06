import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { type IXterioWalletContextProps, XterioWalletProvider } from '@xterio-sdk/wallet'
import { Env } from '@xterio-sdk/auth'
import '@xterio-sdk/wallet/style/main.css'
import '@xterio-sdk/auth/style/main.css'

const redirect_uri = 'http://localhost:3000/'
const client_id = '4gsmgur6gkp8u9ps8dlco3k7eo'
//4gsmgur6gkp8u9ps8dlco3k7eo, 4gsmgur6gkp8u9ps8dlco3aaaa
const client_secret = 'ABC23'

const config: IXterioWalletContextProps = {
  client_id,
  client_secret,
  redirect_uri,
  env: Env.Dev
}
createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <XterioWalletProvider {...config}>
    <App />
  </XterioWalletProvider>
  // </StrictMode>
)
