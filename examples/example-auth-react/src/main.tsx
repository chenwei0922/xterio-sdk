import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.js'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)

import { XterioAuth, XterEventEmiter, XTERIO_EVENTS } from '@xterio-sdk/auth'

const redirect_uri = 'http://localhost:3000/'
const client_id = '4gsmgur6gkp8u9ps8dlco3k7eo'
//4gsmgur6gkp8u9ps8dlco3k7eo, 4gsmgur6gkp8u9ps8dlco3aaaa
const client_secret = 'ABC23'

//初始化一次即可
XterioAuth.init({ client_id, client_secret, redirect_uri })
//监听登录成功事件
XterEventEmiter.on(XTERIO_EVENTS.ACCOUNT, (res) => {
  console.log('info1=', res)
})
