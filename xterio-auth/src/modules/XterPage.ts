import { OpenPageMode, PageOptionParam, PageType } from 'interfaces/loginInfo'
import { XterioAuthInfo, XterioAuthTokensManager } from './XterAuthInfo'
import { XLog } from 'utils/logger'
import qs from 'query-string'
import { getIframe } from 'utils/dom'
import { XterioAuth } from './XterAuth'
import { XterioAuthService } from './AuthService'

const getOtac = async () => {
  const idToken = await XterioAuth.getIdToken()
  if (idToken) {
    // User is logged in or the login token is expiring soon
    if (!XterioAuthInfo?.otac) {
      const otac = await XterioAuthService.getOtacByTokens()
      if (otac) {
        XterioAuthInfo.otac = otac
        // Set a timer to clear the otac after 2 minutes
        setTimeout(
          () => {
            XterioAuthInfo.otac = ''
          },
          2 * 60 * 1000
        )
      }
    }
  }
  return XterioAuthInfo?.otac || ''
}

export const openPage = async (page: PageType, mode?: OpenPageMode, options?: PageOptionParam) => {
  const { active = 'ingame', keyword, collection, features, platform } = options || {}
  const isMobile = platform === 'mobile'
  let _p: Record<string, any> = {
    hide_wallet_entrance: true,
    hide_account_entrance: true,
    hide_menu_entrance: true,
    hide_sign_out: true,
    hide_footer: true,
    disable_logo_click: true
  }

  const _type = mode || OpenPageMode.alert
  const app_id = XterioAuthInfo.config?.app_id || ''
  if (!app_id) {
    throw new Error('You must set xterio-auth app_id')
  }
  const basePage = XterioAuthInfo.pageURL
  let uri = ''
  if (page === PageType.asset) {
    _p = { ..._p, hide_game_select: true, hide_game_tokens: true }
    uri = `${basePage}/asset?source=1&app_id=${app_id}&active=${active}`
  } else if (page === PageType.account) {
    uri = `${basePage}/settings?source=1`
  } else if (page === PageType.wallet) {
    uri = `${basePage}/settings?source=1&tab=wallet`
  } else if (page === PageType.nft) {
    _p = { ..._p, hide_game_filter: true }
    let query: Record<string, unknown> = { source: 1, app_id }
    if (collection) {
      query = { ...query, collection }
    }
    if (keyword) {
      query = { ...query, keyword: encodeURIComponent(keyword) }
    }
    if (features) {
      query = { ...query, features: encodeURIComponent(JSON.stringify(features)) }
    }
    uri = `${basePage}/marketplace?${qs.stringify(query)}`
  }

  if (isMobile) {
    uri += `&${qs.stringify(_p)}`
  }
  const otac = await getOtac()
  if (otac) {
    uri += `&_otac=${otac}`
  }

  XLog.debug('open xerio page uri:', uri)
  if (_type === OpenPageMode.iframeUri) {
    return uri
  }
  if (_type === OpenPageMode.iframeDom) {
    return getIframe(uri).querySelector('iframe')
  }
  if (_type === OpenPageMode.alert) {
    document.body.appendChild(getIframe(uri))
    return
  }
  if (_type === OpenPageMode.page) {
    location.href = uri
  }
}
