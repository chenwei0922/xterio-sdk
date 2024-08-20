console.log(111)

//方式1，先授权，再登录
import * as XterioAuth from 'xterio-auth'

const redirect_uri = 'http://localhost:3000/'
const client_id = '4gsmgur6gkp8u9ps8dlco3k7eo'
//4gsmgur6gkp8u9ps8dlco3k7eo, 4gsmgur6gkp8u9ps8dlco3aaaa
const client_secret = 'ABC23'

//初始化一次即可
XterioAuth.init({ client_id, client_secret, redirect_uri })
//监听登录成功事件
XterioAuth.XterEventEmiter.on(XterioAuth.XTERIO_EVENTS.ACCOUNT, (res) => {
  console.log('the listen account: ', res)
})

//无点击事件(页面初始就登录)
XterioAuth.login(XterioAuth.LoginType.Union, (info) => {
  console.log('info=', info)
})

const btn = document.getElementById('login')
const infoBtn = document.getElementById('userinfo')
if (btn) {
  btn.onclick = async () => {
    XterioAuth.login(XterioAuth.LoginType.Authorize, (info) => {
      console.log('info=', info)
    })
  }
}
if (infoBtn) {
  infoBtn.onclick = async () => {
    const a = XterioAuth.XterioAuthInfo.userInfo
    console.log('info2', a)
  }
}
/*
XterioAuth.init({ client_id, client_secret, redirect_uri })

const match = location.href.match(/\?code=(.*)/)
const code = match?.[1] || ''
if (code) {
  const res = await XterioAuth.login1(code)
  console.log('////re', res)
}

window.onload = () => {
  const btn = document.getElementById('login')
  const infoBtn = document.getElementById('userinfo')
  if (btn) {
    btn.onclick = () => {
      console.log('222')
      XterioAuth.authorize()
      // location.href = 'http://localhost:3000/'
      // XterioAuth.login()
    }
  }
  if (infoBtn) {
    infoBtn.onclick = async () => {
      const a = XterioAuth.XterioAuthInfo.userInfo
      console.log('333', a)
    }
  }
}
  */
