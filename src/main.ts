import { log } from 'utils'
import * as XterioAuth from './index'
import type { IUserInfo } from './index'

log('initial')
const redirect_uri = 'http://localhost:3000/'
const client_id = '4gsmgur6gkp8u9ps8dlco3k7eo'
//4gsmgur6gkp8u9ps8dlco3k7eo, 4gsmgur6gkp8u9ps8dlco3aaaa
const client_secret = 'ABC23'
XterioAuth.init({ client_id, client_secret, redirect_uri })
XterioAuth.XterEventEmiter.on(XterioAuth.XTERIO_EVENTS.ACCOUNT, (info: IUserInfo) => {
  console.log('info1=', info)
})

XterioAuth.login(XterioAuth.LoginType.Union, (info) => {
  console.log('info2=', info)
})

window.onload = () => {
  const btn = document.getElementById('login')
  if (!btn) return
  btn.onclick = () => {
    console.log('userinfo=', XterioAuth.XterioAuthInfo.userInfo)
  }
}
