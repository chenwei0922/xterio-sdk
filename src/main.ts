import queryString from 'query-string'
import { log } from 'utils'
import * as XterioAuth from './index'

log('initial')
const redirect_uri = 'http://localhost:3000/'
const client_id = '4gsmgur6gkp8u9ps8dlco3k7eo'
//4gsmgur6gkp8u9ps8dlco3k7eo, 4gsmgur6gkp8u9ps8dlco3aaaa
const client_secret = 'ABC23'
XterioAuth.init({ client_id, client_secret, redirect_uri })

const queryParams = queryString.parseUrl(location.href, { types: { code: 'string' } })
const code = queryParams.query?.code
log('code=', code)
if (code) {
  log('logining ...')
  XterioAuth.XterioAuthService.getToken(code as string)
} else {
  log('begin authorizing ...')
  location.href = XterioAuth.XterioAuthInfo.authorizeUrl
}

window.onload = () => {
  const btn = document.getElementById('login')
  if (!btn) return
  btn.onclick = () => {
    console.log('userinfo=', XterioAuth.XterioAuthInfo.userInfo)
  }
}
