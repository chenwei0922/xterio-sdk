console.log(111)
import { getPackageVersion, XterioAuth, randomNonceStr } from 'xterio-auth'
console.log('ddd=', getPackageVersion())
console.log('222=', randomNonceStr())

const app = new XterioAuth()
app.init({ client_id: '4gsmgur6gkp8u9ps8dlco3aaaa', client_secret: 'ABC23' })
const ur = await app.login()
location.href = ur
// location.href = ur
// await app.getCode(code)
// console.log('///code=', code)
