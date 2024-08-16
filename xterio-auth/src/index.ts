import { Env, ISSoTokensParams } from 'interfaces/loginInfo'
import { XterioAuthInfo } from 'modules/XterAuthInfo'
import { XterioAuthService } from 'modules/AuthService'

import qs from 'query-string'
import { log } from 'utils'

const EnvBaseURLConst: Record<Env, string> = {
  [Env.Dev]: 'https://api.playvrs.net',
  [Env.Staging]: 'https://api.xterio.net',
  [Env.Production]: 'https://api.xterio.net'
}

export const init = (config: Partial<ISSoTokensParams>, env?: Env) => {
  const { client_id, client_secret, redirect_uri = '' } = config
  const _env = env ?? Env.Dev
  const _baseURL = EnvBaseURLConst[_env]
  const _config: ISSoTokensParams = {
    client_id: client_id || '',
    client_secret: client_secret || '',
    redirect_uri,
    response_type: 'code',
    scope: 'all',
    mode: 'email',
    grant_type: 'authorization_code'
  }
  XterioAuthInfo.client_id = client_id || ''
  XterioAuthInfo.env = _env
  XterioAuthInfo.baseURL = _baseURL
  XterioAuthInfo.authorizeUrl = _baseURL + `/account/v1/oauth2/authorize?` + qs.stringify(_config)
  XterioAuthInfo.config = _config
}

export const login = () => {
  log('initial')
  const redirect_uri = 'http://localhost:3000/'
  const client_id = '4gsmgur6gkp8u9ps8dlco3k7eo'
  //4gsmgur6gkp8u9ps8dlco3k7eo, 4gsmgur6gkp8u9ps8dlco3aaaa
  const client_secret = 'ABC23'
  init({ client_id, client_secret, redirect_uri })

  const queryParams = qs.parseUrl(location.href, { types: { code: 'string' } })
  const code = queryParams.query?.code
  log('code=', code)
  if (code) {
    log('logining ...')
    XterioAuthService.getToken(code as string)
  } else {
    log('begin authorizing ...')
    location.href = XterioAuthInfo.authorizeUrl
  }
}

export * from './modules/XterAuthInfo'
export * from './modules/AuthService'
