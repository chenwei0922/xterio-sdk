import { OpenPageMode, PageOptionParam, PageType } from 'interfaces/loginInfo'
import { XterioAuthInfo } from './XterAuthInfo'
import { XLog } from 'utils/logger'
import qs from 'query-string'
import { addCssText, convertStyleToArray, getDiv, getIframe } from 'utils/dom'
import { XterioAuth } from './XterAuth'
import { XterioAuthService } from './AuthService'
import { iconContentMap } from 'ui/svg-icon'

export const getOtac = async () => {
  //tip: otac invalid when used once
  if (XterioAuth.isLogin) {
    const otac = await XterioAuthService.getOtacByTokens()
    return otac || ''
  }
  return ''

  /*
  if (XterioAuth.isLogin) {
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
  */
}

export const openPage = async (page: PageType, mode?: OpenPageMode, options?: PageOptionParam) => {
  const { active = 'ingame', tab = 'account', keyword, collection, features, alertConfig, ...rest } = options || {}
  const _type = mode || OpenPageMode.alert
  const app_id = XterioAuthInfo.config?.app_id || ''
  if (!app_id) {
    throw new Error('You must set xterio-auth app_id')
  }
  const {
    asset: assetPath,
    settings: settingPath,
    marketplace: marketPath,
    collection: collectionPath
  } = XterioAuthInfo.pageUriMap || {}
  const basePage = XterioAuthInfo.pageURL
  let uri = ''
  let query: Record<string, unknown> = {}

  if (page === PageType.asset && assetPath) {
    query = { app_id, active }
    uri = `${basePage}${assetPath}`
  } else if (page === PageType.setting && settingPath) {
    query = { tab }
    uri = `${basePage}${settingPath}`
  } else if (page === PageType.nft_market && marketPath) {
    query = { app_id }
    if (collection) {
      query = { ...query, collection }
    }
    if (keyword) {
      query = { ...query, keyword: encodeURIComponent(keyword) }
    }
    if (features) {
      query = { ...query, features: encodeURIComponent(JSON.stringify(features)) }
    }
    uri = `${basePage}${marketPath}`
  } else if (page === PageType.nft_collection && collection && collectionPath) {
    if (features) {
      query = { features: encodeURIComponent(JSON.stringify(features)) }
    }
    uri = `${basePage}${collectionPath}`.replace('{app_id}', app_id).replace('{collection_id}', collection)
  }

  if (uri) {
    query = { ...query, ...rest }
    const otac = await getOtac()
    if (otac) {
      query = { ...query, _otac: otac }
    }
    if (Object.keys(query)?.length) {
      uri += (uri.includes('?') ? '&' : '?') + qs.stringify(query)
    }
  }

  XLog.debug('open xerio page uri:', uri)
  if (_type === OpenPageMode.iframeUri) {
    return uri
  }
  if (_type === OpenPageMode.iframeDom) {
    const { iframe } = getIframe(uri)
    return iframe
  }
  if (_type === OpenPageMode.page) {
    location.href = uri
  }
  if (_type === OpenPageMode.alert) {
    alertIframeLogic(uri, alertConfig)
    return
  }
}

const alertIframeLogic = (uri: string, config: PageOptionParam['alertConfig']) => {
  const { placement = 'right', style = { width: '100%', height: '100%' }, showCloseIcon = true } = config || {}
  const { iframeDiv, shadow } = getIframe(uri)
  if (showCloseIcon) {
    const { element: closeDiv, remove: unsubscribe } = getDiv('close-icon pointer', () => {
      shadow.remove()
      unsubscribe?.()
    })
    addCssText(closeDiv, `position:absolute;top:16px;left:16px;`)
    closeDiv.innerHTML = iconContentMap['icon-close-iframe']
    iframeDiv.appendChild(closeDiv)
  }
  document.body.appendChild(shadow)
  //update style, style > placement
  const _styArr = []
  _styArr.push('margin-top', `calc((100% - ${style.height}) / 2)`)
  if (placement === 'right') {
    _styArr.push('margin-left', `calc(100% - ${style.width})`)
  } else if (placement === 'center') {
    _styArr.push('margin-left', `calc((100% - ${style.width}) / 2)`)
  }
  _styArr.push(...convertStyleToArray(style))
  addCssText(iframeDiv, ..._styArr)
}