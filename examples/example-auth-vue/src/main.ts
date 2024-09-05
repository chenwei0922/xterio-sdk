import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')

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
