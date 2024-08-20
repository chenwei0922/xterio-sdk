import { getPackageVersion } from 'utils'
import * as XterioAuth from 'index'

describe('xterioauth', () => {
  test('sdkversion:', () => {
    const version = getPackageVersion()
    console.log('sdkversion=', version)
    expect(version).toEqual('1.0.0')
  })
  test('login', async () => {
    XterioAuth.init({
      client_id: '4gsmgur6gkp8u9ps8dlco3aaaa',
      client_secret: 'ABC23',
      redirect_uri: 'http://localhost:3000'
    })
    const authorizeUrl = XterioAuth.XterioAuthInfo.authorizeUrl
    console.log('authorizeUrl=', authorizeUrl)
  })
  test('userinfo', async () => {
    await XterioAuth.XterioAuthService.login('ZWRLMWVIMWYTZTM5NY0ZYTI4LTHMYJKTZJY4MDFLYJE3ODZL')
    const userinfo = XterioAuth.XterioAuthInfo.userInfo
    console.log('userinfo=', userinfo)
  })
})
