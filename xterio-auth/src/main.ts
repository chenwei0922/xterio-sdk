import { Env, IUserInfo, LoginType, XterEventEmiter, XTERIO_EVENTS, XterioAuth } from './index'

console.log('initial')
const redirect_uri = 'http://localhost:3000/'
const client_id = '4gsmgur6gkp8u9ps8dlco3k7eo'
//4gsmgur6gkp8u9ps8dlco3k7eo, 4gsmgur6gkp8u9ps8dlco3aaaa
XterioAuth.init({ client_id, redirect_uri }, Env.Dev)
XterEventEmiter.subscribe((info: IUserInfo) => {
  console.log('emit userinfo=', info)
  if (p) {
    p.innerText = JSON.stringify(info)
  }
})

const p = document.getElementById('userinfo')
window.onload = () => {
  const btn = document.getElementById('login')
  const logoutBtn = document.getElementById('logout')
  const emailBtn = document.getElementById('login_email')
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
      if (p) {
        p.innerText = ''
      }
    }
  }
}
