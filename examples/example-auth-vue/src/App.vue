<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { IUserInfo, LoginType, OpenPageMode, PageOptionParam, PagePopupConfig, PageType, XterEventEmiter, XTERIO_EVENTS, XterioAuth, XterViewCustomizeOptions } from '@xterio-sdk/auth'

const isChecked = (cls: string) => {
  const ele = document.getElementsByClassName(cls)?.[0]
  // console.log('ele', ele)
  const input = ele?.getElementsByTagName('input')?.[0]
  return input?.checked
}
const getRadioValue = (name: string) => {
  const tab: HTMLInputElement | null = document.querySelector(`input[name="${name}"]:checked`)
  return tab?.value
}
const getInputValue = (cls: string, tag: string = 'input') => {
  const ele = document.getElementsByClassName(cls)?.[0]
  const input = ele.getElementsByTagName(tag)?.[0] as HTMLInputElement
  return input?.value
}

defineProps<{ msg: string }>()

const userinfo = ref('')
const isLogin = ref(XterioAuth.isLogin)
const currentPage = ref(PageType.asset)
const unsubscribe = ref()
const logout_unsub = ref()

onMounted(() => {
  unsubscribe.value = XterEventEmiter.subscribe((res: IUserInfo) => {
    console.log('info1=', res)
    userinfo.value = JSON.stringify(res)
    isLogin.value = XterioAuth.isLogin
  })
  logout_unsub.value = XterEventEmiter.subscribe(() => {
    console.log('logout auth, and deal page state data')
    userinfo.value = JSON.stringify(XterioAuth.userinfo)
    isLogin.value = XterioAuth.isLogin
  }, XTERIO_EVENTS.LOGOUT)
})
onUnmounted(() => {
  unsubscribe.value?.()
  logout_unsub.value?.()
})
const checkIsLogin = () => {
  alert(XterioAuth.isLogin)
}
const login = (mode?: LoginType) => {
  XterioAuth.login(mode)
}
const logout = () => {
  XterioAuth.logout()
}
const openPage = async (_t: OpenPageMode) => {
  let param = getPageParam()
  if (_t === OpenPageMode.popup) {
    param = { ...param, popupConfig: getAlertConfig() }
  }
  const res = await XterioAuth.openPage(currentPage.value, _t, param)
  if (_t === OpenPageMode.iframeDom) {
    console.log('dom=', res)
    alert(res)
  } else if (_t === OpenPageMode.iframeUri) {
    console.log('uri=', res)
    alert(res)
  }
}
const getPageParam = () => {
  let dic: PageOptionParam = {}
  const curPage = currentPage.value

  if (curPage === PageType.asset) {
    const value = (getRadioValue('asset_active_tab_option') || 'ingame') as PageOptionParam['active']
    dic = { ...dic, active: value }
  }
  if (curPage === PageType.setting) {
    const value = (getRadioValue('setting_active_tab_option') || 'account') as PageOptionParam['tab']
    dic = { ...dic, tab: value }
  }
  if (curPage === PageType.nft_collection) {
    dic = { ...dic, collection: '65e04d9b65fca97f09ff8f42' }
  }
  // debugger

  {
    let options: XterViewCustomizeOptions = {}
    if (isChecked('hide_wallet_entrance')) {
      options = { ...options, hide_wallet_entrance: true }
    }
    if (isChecked('hide_account_entrance')) {
      options = { ...options, hide_account_entrance: true }
    }
    if (isChecked('hide_menu_entrance')) {
      options = { ...options, hide_menu_entrance: true }
    }
    if (isChecked('hide_sign_out')) {
      options = { ...options, hide_sign_out: true }
    }
    if (isChecked('hide_header')) {
      options = { ...options, hide_header: true }
    }
    if (isChecked('hide_footer')) {
      options = { ...options, hide_footer: true }
    }
    if (isChecked('disable_logo_click')) {
      options = { ...options, disable_logo_click: true }
    }
    if (isChecked('hide_game_select') && curPage === PageType.asset) {
      options = { ...options, hide_game_select: true }
    }
    if (isChecked('hide_game_tokens') && curPage === PageType.asset) {
      options = { ...options, hide_game_tokens: true }
    }
    if (isChecked('hide_game_filter') && curPage === PageType.nft_market) {
      options = { ...options, hide_game_filter: true }
    }
    if (Object.keys(options).length) {
      dic['XterViewCustomOptions'] = options
    }
  }

  console.log('dic=', dic)
  return dic
}
const getAlertConfig = () => {
  const placement = (getRadioValue('alert_active_place_option') || 'right') as PagePopupConfig['placement']
  let dic: Partial<PagePopupConfig> = { placement }
  if (isChecked('alert_showCloseIcon')) {
    dic = { ...dic, showCloseIcon: false }
  }
  let _sty = { width: getInputValue('alert_width'), height: getInputValue('alert_height') }

  const _customsty = getInputValue('alert_style', 'textarea') || '{}'
  try {
    _sty = { ..._sty, ...JSON.parse(_customsty) }
  } catch (err: unknown) {
    console.error('自定义样式输入不合法', _customsty, err)
  }
  dic.style = _sty

  console.log('alertConfig=', dic)
  return dic
}
const getOtac = async () => {
  const _otac = await XterioAuth.getOtac()
  console.log('_otac=', _otac)
  alert(_otac)
}
const getIdToken = async () => {
  const _idToken = await XterioAuth.getIdToken()
  console.log('_idToken=', _idToken)
  alert(_idToken)
}
const getLoginMethod = () => {
  alert(XterioAuth.loginMethod)
}
const getLoginWalletAddress = () => {
  alert(XterioAuth.loginWalletAddress)
}
const defaultStyle = JSON.stringify({
  marginTop: '20px',
  backgroundColor: 'red'
})

</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <h1>Vite + Vue</h1>
  <div class="card">
    <p>是否登录: {{ isLogin ? 'true' : 'false' }}</p>
    <p>用户信息: {{ userinfo }}</p>
    <button @click="checkIsLogin">检查登录态</button>
    <button @click="login()">默认登录</button>
    <button @click="login(LoginType.Email)">邮箱登录</button>
    <button @click="login(LoginType.Mini)">TG 登录</button>
    <button @click="logout()">退出登录</button>
    <button @click="getIdToken">IdToken</button>
    <button @click="getOtac">OTAC</button>
    <button @click="getLoginMethod">登录方式</button>
    <button @click="getLoginWalletAddress">登录钱包地址</button>
  </div>
  <div class="card">
    <p>当前要打开的页面: {{ currentPage }}</p>
    <button @click="currentPage = PageType.asset">资产页</button>
    <button @click="currentPage = PageType.setting">账户钱包管理页</button>
    <button @click="currentPage = PageType.nft_market">nft市场页</button>
    <button @click="currentPage = PageType.nft_collection">nft落地页</button>
  </div>
  <div class="card">
    <p>全局控制参数：</p>
    <div class="list">
      <div class="hide_wallet_entrance">
        <input type="checkbox" />
        <span>隐藏钱包入口</span>
      </div>
      <div class="hide_account_entrance">
        <input type="checkbox" />
        <span>隐藏账号入口</span>
      </div>
      <div class="hide_menu_entrance">
        <input type="checkbox" />
        <span>隐藏菜单入口(仅H5生效)</span>
      </div>
      <div class="hide_sign_out">
        <input type="checkbox" />
        <span>隐藏登出按钮</span>
      </div>
      <div class="hide_header">
        <input type="checkbox" />
        <span>隐藏顶部导航</span>
      </div>
      <div class="hide_footer">
        <input type="checkbox" />
        <span>隐藏页脚</span>
      </div>
      <div class="disable_logo_click">
        <input type="checkbox" />
        <span>禁用左上角logo点击跳转首页</span>
      </div>
    </div>
  </div>
  <div class="card">
    <p>页面独有参数：</p>
    <div v-if="currentPage === PageType.asset" class="config-asset row justify-center">
      <div>定位到对应nft tab :</div>
      <div>
        <input type="radio" name="asset_active_tab_option" value="ingame" />
        <label>ingame</label>
        <input type="radio" name="asset_active_tab_option" value="onchain" />
        <label>onchain</label>
      </div>
    </div>
    <div v-if="currentPage === PageType.asset" class="config-asset hide_game_select">
      <input type="checkbox" />
      <span>隐藏游戏选择(资产页)</span>
    </div>
    <div v-if="currentPage === PageType.asset" class="config-asset hide_game_tokens">
      <input type="checkbox" />
      <span>隐藏token部分(资产页)</span>
    </div>
    <div v-if="currentPage === PageType.nft_market" class="config-nft-market hide_game_filter nft">
      <input type="checkbox" />
      <span>隐藏游戏filter(nft市场页)</span>
    </div>
    <div v-if="currentPage === PageType.setting" class="config-setting row justify-center">
      <div>定位到对应tab页 :</div>
      <div>
        <input type="radio" name="setting_active_tab_option" value="profile" />
        <label>profile</label>
        <input type="radio" name="setting_active_tab_option" value="account" />
        <label>account</label>
        <input type="radio" name="setting_active_tab_option" value="wallet" />
        <label>wallet</label>
        <input type="radio" name="setting_active_tab_option" value="security" />
        <label>security</label>
      </div>
    </div>
    <div v-if="currentPage === PageType.nft_market" class="config-nft-market">tip: keyword & features 参考文档</div>
    <div v-if="currentPage === PageType.nft_collection" class="config-nft-collection">tip: features 参考文档，collection必传(示例为写死的值)</div>
  </div>
  <div class="card col">
    <p>弹框样式控制:</p>
    <div class="config-alert row justify-center">
      <div>位置:</div>
      <div>
        <input type="radio" name="alert_active_place_option" value="left" />
        <label>left</label>
        <input type="radio" name="alert_active_place_option" value="center" />
        <label>center</label>
        <input type="radio" name="alert_active_place_option" value="right" />
        <label>right</label>
      </div>
    </div>
    <div class="config-alert alert_showCloseIcon">
      <input type="checkbox" />
      <span>是否隐藏关闭按钮</span>
    </div>
    <div class="config-alert row items-center justify-center alert_width">
      <label>宽度:</label>
      <input type="text" placeholder="200px" value="200px" />
    </div>
    <div class="config-alert row items-center justify-center alert_height">
      <label>高度:</label>
      <input type="text" placeholder="200px" value="300px" />
    </div>
    <div class="config-alert col items-center justify-center alert_style">
      <label>自定义样式对象(合法json字符串):</label>
      <textarea style="width: 400px;" placeholder="" :rows="7">
        {{ defaultStyle }}
      </textarea>
    </div>
  </div>
  <div class="card">
    <p>打开页面的方式如下：</p>
    <button @click="openPage(OpenPageMode.popup)">弹框形式(iframe)</button>
    <button @click="openPage(OpenPageMode.page)">新页面形式</button>
    <button @click="openPage(OpenPageMode.iframeDom)">
      dom形式
    </button>
    <button @click="openPage(OpenPageMode.iframeUri)">
      uri形式
    </button>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
