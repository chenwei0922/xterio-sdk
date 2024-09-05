import { LoginType, XterEventEmiter, XTERIO_EVENTS, XterioAuth } from './index'

console.log('initial')
const redirect_uri = 'http://localhost:3000/'
const client_id = '4gsmgur6gkp8u9ps8dlco3k7eo'
//4gsmgur6gkp8u9ps8dlco3k7eo, 4gsmgur6gkp8u9ps8dlco3aaaa
const client_secret = 'ABC23'
XterioAuth.init({ client_id, client_secret, redirect_uri })
XterEventEmiter.on(XTERIO_EVENTS.ACCOUNT, (info) => {
  console.log('emit userinfo=', info)
})

window.onload = () => {
  const btn = document.getElementById('login')
  const logoutBtn = document.getElementById('logout')
  const emailBtn = document.getElementById('email')
  const miniBtn = document.getElementById('login_mini')
  if (miniBtn) {
    miniBtn.onclick = () => {
      // XterioAuth.
      XterioAuth.login(LoginType.Mini)
    }
  }
  if (btn) {
    btn.onclick = () => {
      XterioAuth.login()
    }
  }
  if (emailBtn) {
    emailBtn.onclick = () => {
      XterioAuth.login(LoginType.Email)
    }
  }
  if (logoutBtn) {
    logoutBtn.onclick = () => {
      XterioAuth.logout()
    }
  }
}
