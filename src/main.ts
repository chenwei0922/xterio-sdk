import { OpenPageMode, PageType } from 'interfaces/loginInfo'
import { Env, IUserInfo, LoginType, XterioAuth } from './index'
import './styles/main.scss'

const p = document.getElementById('userinfo')
const updateInfo = (info?: IUserInfo) => {
  if (p) {
    p.innerText = JSON.stringify(info)
  }
}

console.log('initial')
const redirect_uri = 'http://localhost:3000/'
const client_id = '4gsmgur6gkp8u9ps8dlco3k7eo'
const client_secret = 'ABC23'
const app_id = 'apiautotest'
//4gsmgur6gkp8u9ps8dlco3k7eo, 4gsmgur6gkp8u9ps8dlco3aaaa
XterioAuth.init({ app_id, client_id, client_secret, redirect_uri }, Env.Dev)
//way1:
XterioAuth.getUserInfo((info) => {
  updateInfo(info)
})

//way2
// XterEventEmiter.subscribe((info: IUserInfo) => {
//   updateInfo(info)
// })

let currentPageName: PageType = PageType.asset
const addClick = (id: string, callback: any) => {
  const btn = document.getElementById(id)
  if (btn) {
    btn.onclick = () => {
      callback()
    }
  }
}
const hideDom = (cls: string, hide: boolean) => {
  const arr = document.getElementsByClassName(cls)
  for (let i = 0; i < arr.length; i++) {
    if (hide) {
      arr[i].classList.add('hide')
    } else {
      arr[i].classList.remove('hide')
    }
  }
}
const changePage = (page: PageType) => {
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
addClick('isLogin', () => {
  alert(XterioAuth.isLogin)
})
addClick('login', () => {
  XterioAuth.login()
})
addClick('logout', () => {
  console.log('/dddd')
  XterioAuth.logout()
  if (p) {
    p.innerText = ''
  }
})
addClick('login_email', () => {
  XterioAuth.login(LoginType.Email)
})
addClick('login_mini', () => {
  XterioAuth.login(LoginType.Mini)
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
  XterioAuth.openPage(currentPageName, OpenPageMode.alert, getPageParam())
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

const isChecked = (cls: string) => {
  const ele = document.getElementsByClassName(cls)?.[0]
  const input = ele.getElementsByTagName('input')?.[0]
  return input?.checked
}
const getPageParam = () => {
  let dic: any = {}
  if (currentPageName === PageType.asset) {
    const tab: HTMLInputElement | null = document.querySelector('input[name="asset_active_tab_option"]:checked')
    dic = { ...dic, active: tab?.value || 'ingame' }
  }
  if (currentPageName === PageType.setting) {
    const tab: HTMLInputElement | null = document.querySelector('input[name="setting_active_tab_option"]:checked')
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
