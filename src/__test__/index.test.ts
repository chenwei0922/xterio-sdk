import XterioAuth from 'index'
import { getPackageVersion } from 'utils'

describe('xterioauth', () => {
  test('sdkversion:', () => {
    const version = getPackageVersion()
    console.log('sdkversion=', version)
    expect(version).toEqual('1.0.0')
  })
  test('login', async () => {
    const app = new XterioAuth()
    app.init({ client_id: '4gsmgur6gkp8u9ps8dlco3aaaa' })
    await app.login()
  })
})
