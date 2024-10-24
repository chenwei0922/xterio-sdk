import '@xterio-sdk/auth/style/main.css'
//方式1，先授权，再登录
import { XterioAuth, XterEventEmiter, Env, LoginType, PageType, OpenPageMode } from '@xterio-sdk/auth'

const p = document.getElementById('userinfo')
const updateInfo = (info) => {
  if (p) {
    p.innerText = JSON.stringify(info)
  }
}

console.log('initial')
const redirect_uri = location.href.replace(/[?&]code=[^&]+/, '')
const client_id = '4gsmgur6gkp8u9ps8dlco3k7eo'
const client_secret = 'ABC23'
const app_id = 'apiautotest'
//4gsmgur6gkp8u9ps8dlco3k7eo, 4gsmgur6gkp8u9ps8dlco3aaaa
XterioAuth.init({ client_id, client_secret, redirect_uri, app_id }, Env.Dev)
XterEventEmiter.subscribe((info) => {
  console.log('emit userinfo=', info)
  updateInfo(info)
})

let currentPageName = PageType.asset
const addClick = (id, callback) => {
  const btn = document.getElementById(id)
  if (btn) {
    btn.onclick = () => {
      callback()
    }
  }
}
const hideDom = (cls, hide) => {
  const arr = document.getElementsByClassName(cls)
  for (let i = 0; i < arr.length; i++) {
    if (hide) {
      arr[i].classList.add('hide')
    } else {
      arr[i].classList.remove('hide')
    }
  }
}
const changePage = (page) => {
  currentPageName = page
  const el = document.getElementById('current-page')
  if (el) {
    el.innerText = currentPageName
  }

  //ui展示
  hideDom('config-asset', true)
  hideDom('config-setting', true)
  hideDom('config-nft-market', true)
  hideDom('config-nft-collection', true)
  if (currentPageName === PageType.asset) {
    hideDom('config-asset', false)
  } else if (currentPageName === PageType.setting) {
    hideDom('config-setting', false)
  } else if (currentPageName === PageType.nft_market) {
    hideDom('config-nft-market', false)
  } else if (currentPageName === PageType.nft_collection) {
    hideDom('config-nft-collection', false)
  }
}
addClick('login', () => {
  XterioAuth.login()
})
addClick('login_email', () => {
  XterioAuth.login(LoginType.Email)
})
addClick('login_mini', () => {
  XterioAuth.login(LoginType.Mini)
})
addClick('logout', () => {
  XterioAuth.logout()
  updateInfo({})
})
addClick('isLogin', () => {
  alert(XterioAuth.isLogin)
})
addClick('getIdToken', async () => {
  const id_token = await XterioAuth.getIdToken()
  console.log('id_token=', id_token)
  alert(id_token)
})
addClick('getOtac', async () => {
  const _otac = await XterioAuth.getOtac()
  console.log('_otac=', _otac)
  alert(_otac)
})

addClick('openAsset', () => {
  XterioAuth.openPage(currentPageName, OpenPageMode.alert, { ...getPageParam(), alertConfig: getAlertConfig() })
})
addClick('openAsset-new', () => {
  XterioAuth.openPage(currentPageName, OpenPageMode.page, getPageParam())
})
addClick('openAsset-dom', async () => {
  const dom = await XterioAuth.openPage(currentPageName, OpenPageMode.iframeDom, getPageParam())
  console.log('dom=', dom)
  alert(dom)
})
addClick('openAsset-uri', async () => {
  const uri = await XterioAuth.openPage(currentPageName, OpenPageMode.iframeUri, getPageParam())
  console.log('uri=', uri)
  alert(uri)
})

addClick('page-asset', () => {
  changePage(PageType.asset)
})
addClick('page-setting', () => {
  changePage(PageType.setting)
})
addClick('page-nft-market', () => {
  changePage(PageType.nft_market)
})
addClick('page-nft-collection', () => {
  changePage(PageType.nft_collection)
})

changePage(PageType.asset)

const isChecked = (cls) => {
  const ele = document.getElementsByClassName(cls)?.[0]
  const input = ele.getElementsByTagName('input')?.[0]
  return input?.checked
}
const getRadioValue = (name) => {
  const tab = document.querySelector(`input[name="${name}"]:checked`)
  return tab?.value
}
const getInputValue = (cls, tag = 'input') => {
  const ele = document.getElementsByClassName(cls)?.[0]
  const input = ele.getElementsByTagName(tag)?.[0]
  return input?.value
}
const getPageParam = () => {
  let dic = {}
  if (currentPageName === PageType.asset) {
    const tab = document.querySelector('input[name="asset_active_tab_option"]:checked')
    dic = { ...dic, active: tab?.value || 'ingame' }
  }
  if (currentPageName === PageType.setting) {
    const tab = document.querySelector('input[name="setting_active_tab_option"]:checked')
    dic = { ...dic, tab: tab?.value || 'account' }
  }
  if (currentPageName === PageType.nft_collection) {
    dic = { ...dic, collection: '65e04d9b65fca97f09ff8f42' }
  }

  if (isChecked('hide_wallet_entrance')) {
    dic = { ...dic, hide_wallet_entrance: true }
  }
  if (isChecked('hide_account_entrance')) {
    dic = { ...dic, hide_account_entrance: true }
  }
  if (isChecked('hide_menu_entrance')) {
    dic = { ...dic, hide_menu_entrance: true }
  }
  if (isChecked('hide_sign_out')) {
    dic = { ...dic, hide_sign_out: true }
  }
  if (isChecked('hide_header')) {
    dic = { ...dic, hide_header: true }
  }
  if (isChecked('hide_footer')) {
    dic = { ...dic, hide_footer: true }
  }
  if (isChecked('disable_logo_click')) {
    dic = { ...dic, disable_logo_click: true }
  }
  if (isChecked('hide_game_select') && currentPageName === PageType.asset) {
    dic = { ...dic, hide_game_select: true }
  }
  if (isChecked('hide_game_tokens') && currentPageName === PageType.asset) {
    dic = { ...dic, hide_game_tokens: true }
  }
  if (isChecked('hide_game_filter') && currentPageName === PageType.nft_market) {
    dic = { ...dic, hide_game_filter: true }
  }

  console.log('dic=', dic)
  return dic
}

const getAlertConfig = () => {
  const placement = getRadioValue('alert_active_place_option') || 'right'
  let dic = { placement }
  if (isChecked('alert_showCloseIcon')) {
    dic = { ...dic, showCloseIcon: false }
  }
  let _sty = { width: getInputValue('alert_width'), height: getInputValue('alert_height') }

  const _customsty = getInputValue('alert_style', 'textarea') || '{}'
  try {
    _sty = { ..._sty, ...JSON.parse(_customsty) }
  } catch (err) {
    console.error('自定义样式输入不合法', _customsty)
  }
  dic.style = _sty

  console.log('alertConfig=', dic)
  return dic
}
