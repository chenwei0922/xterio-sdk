import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import '@xterio-sdk/auth/style/main.css'
import './common/styles/main.css'
import { IXterioWalletContextProps, XterioWalletProvider } from './index.ts'

const redirect_uri = 'http://localhost:3000/'
const client_id = '4gsmgur6gkp8u9ps8dlco3k7eo'
//4gsmgur6gkp8u9ps8dlco3k7eo, 4gsmgur6gkp8u9ps8dlco3aaaa
const client_secret = 'ABC23'

const config: IXterioWalletContextProps = {
  client_id,
  client_secret,
  redirect_uri
}
createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <XterioWalletProvider {...config}>
    <App />
  </XterioWalletProvider>
  // </StrictMode>
)