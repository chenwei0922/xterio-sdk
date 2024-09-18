import { Env } from 'interfaces/loginInfo'

type EnvVariableType = {
  HCAPTCHA_SITE_KEY: string
}
export const EnvVariableConfig: Record<Env, EnvVariableType> = {
  [Env.Dev]: {
    HCAPTCHA_SITE_KEY: '24e8a314-60ce-4d6e-bf78-c01c598a29f6'
  },
  [Env.Staging]: {
    HCAPTCHA_SITE_KEY: 'f274d312-aade-4b86-a8c0-05cc85a83d32'
  },
  [Env.Production]: {
    HCAPTCHA_SITE_KEY: '22e2664c-fb06-482c-992c-8b74946e763a'
  }
}

export const XTERIO_EVENTS = {
  LOGIN: 'xter_auth_login_success',
  ACCOUNT: 'xter_auth_response_userinfo',
  REQ_ACCOUNT: 'xter_auth_request_userinfo'
}
export const XTERIO_CONST = {
  LOGIN_TYPE: 'xter_auth_login_type',
  TOKENS: 'xter_auth_login_tokens',
  ID_TOKEN: 'xter_auth_id_token',
  REFRESH_TOKEN: 'xter_auth_refresh_token',
  ACCESS_TOKEN: 'xter_auth_access_token',
  USERINFO: 'xter_auth_userinfo'
}
