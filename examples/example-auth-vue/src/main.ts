import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import '@xterio-sdk/auth/style/main.css'
import { XterioAuth, Env } from '@xterio-sdk/auth'

const redirect_uri = 'http://localhost:3000/'
const client_id = '4gsmgur6gkp8u9ps8dlco3k7eo'
//4gsmgur6gkp8u9ps8dlco3k7eo, 4gsmgur6gkp8u9ps8dlco3aaaa

//初始化一次即可
XterioAuth.init({ client_id, redirect_uri }, Env.Dev)

createApp(App).mount('#app')
