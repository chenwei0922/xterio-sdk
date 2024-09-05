import { Env, LoginType } from 'interfaces/loginInfo'
import { getFetcher, postFetcher, putFetcher, deleteFetcher } from 'utils/fetchers'
import { XTERIO_CONST, XTERIO_EVENTS } from 'utils/const'
import { XterioAuthTokensManager } from 'modules/XterAuthInfo'

export * from './modules/XterEventEmitter'
export * from './modules/XterAuth'
export * from './modules/AuthService'
export * from './modules/XterAuthModal'

export {
  LoginType,
  Env,
  XTERIO_CONST,
  XTERIO_EVENTS,
  getFetcher,
  postFetcher,
  putFetcher,
  deleteFetcher,
  XterioAuthTokensManager
}
export type { IUserInfo, ISSoTokensParams } from './interfaces/loginInfo'
