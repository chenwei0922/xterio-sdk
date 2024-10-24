import { useEffect, useMemo, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import {
  IUserInfo,
  LoginType,
  OpenPageMode,
  PageAlertConfig,
  PageOptionParam,
  PageType,
  XterEventEmiter,
  XTERIO_EVENTS,
  XterioAuth
} from '@xterio-sdk/auth'

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

function App() {
  const [userinfo, setUserinfo] = useState<string>('')
  //这种形式记录不够准确，比如登录态中途变更时，该页面无法及时获悉。所以对于需要判断登录的操作，直接调用XterioAuth.isLogin即可
  const [isLogin, setIsLogin] = useState(XterioAuth.isLogin)
  const [currentPage, setCurrentPage] = useState(PageType.asset)

  useEffect(() => {
    //监听登录成功事件
    const unsubscribe = XterEventEmiter.subscribe((res: IUserInfo) => {
      console.log('info1=', res)
      setUserinfo(JSON.stringify(res))
      setIsLogin(XterioAuth.isLogin)
    })

    //退出登录刷新本地islogin跟userinfo状态
    const logout_unsub = XterEventEmiter.subscribe(() => {
      console.log('logout auth, and deal page state data')
      setIsLogin(XterioAuth.isLogin)
      setUserinfo(JSON.stringify(XterioAuth.userinfo))
    }, XTERIO_EVENTS.LOGOUT)

    return () => {
      unsubscribe?.()
      logout_unsub?.()
    }
  }, [])

  const login = (mode?: LoginType) => {
    XterioAuth.login(mode)
  }
  const logout = () => {
    XterioAuth.logout()
  }
  const openPage = async (_t: OpenPageMode) => {
    let param = getPageParam()
    if (_t === OpenPageMode.alert) {
      param = { ...param, alertConfig: getAlertConfig() }
    }
    const res = await XterioAuth.openPage(currentPage, _t, param)
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
    const curPage = currentPage

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
    if (isChecked('hide_game_select') && curPage === PageType.asset) {
      dic = { ...dic, hide_game_select: true }
    }
    if (isChecked('hide_game_tokens') && curPage === PageType.asset) {
      dic = { ...dic, hide_game_tokens: true }
    }
    if (isChecked('hide_game_filter') && curPage === PageType.nft_market) {
      dic = { ...dic, hide_game_filter: true }
    }

    console.log('dic=', dic)
    return dic
  }
  const getAlertConfig = () => {
    const placement = (getRadioValue('alert_active_place_option') || 'right') as PageAlertConfig['placement']
    let dic: Partial<PageAlertConfig> = { placement }
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
  const defaultStyle = useMemo(() => {
    return JSON.stringify({
      marginTop: '20px',
      backgroundColor: 'red'
    })
  }, [])

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <p>是否登录: {isLogin ? 'true' : 'false'}</p>
        <p>用户信息: {userinfo}</p>
        <button onClick={() => alert(XterioAuth.isLogin)}>检查登录态</button>
        <button onClick={() => login()}>默认登录</button>
        <button onClick={() => login(LoginType.Email)}>邮箱登录</button>
        <button onClick={() => login(LoginType.Mini)}>TG 登录</button>
        <button onClick={logout}>退出登录</button>
        <button onClick={getIdToken}>IdToken</button>
        <button onClick={getOtac}>OTAC</button>
      </div>
      <div className="card">
        <p>当前要打开的页面: {currentPage}</p>
        <button onClick={() => setCurrentPage(PageType.asset)}>资产页</button>
        <button onClick={() => setCurrentPage(PageType.setting)}>账户钱包管理页</button>
        <button onClick={() => setCurrentPage(PageType.nft_market)}>nft市场页</button>
        <button onClick={() => setCurrentPage(PageType.nft_collection)}>nft落地页</button>
      </div>
      <div className="card">
        <p>全局控制参数：</p>
        <div className="list">
          <div className="hide_wallet_entrance">
            <input type="checkbox" />
            <span>隐藏钱包入口</span>
          </div>
          <div className="hide_account_entrance">
            <input type="checkbox" />
            <span>隐藏账号入口</span>
          </div>
          <div className="hide_menu_entrance">
            <input type="checkbox" />
            <span>隐藏菜单入口(仅H5生效)</span>
          </div>
          <div className="hide_sign_out">
            <input type="checkbox" />
            <span>隐藏登出按钮</span>
          </div>
          <div className="hide_header">
            <input type="checkbox" />
            <span>隐藏顶部导航</span>
          </div>
          <div className="hide_footer">
            <input type="checkbox" />
            <span>隐藏页脚</span>
          </div>
          <div className="disable_logo_click">
            <input type="checkbox" />
            <span>禁用左上角logo点击跳转首页</span>
          </div>
        </div>
      </div>
      <div className="card">
        <p>页面独有参数：</p>
        {currentPage === PageType.asset && (
          <div className="config-asset row justify-center">
            <div>定位到对应nft tab :</div>
            <div>
              <input type="radio" name="asset_active_tab_option" value="ingame" />
              <label>ingame</label>
              <input type="radio" name="asset_active_tab_option" value="onchain" />
              <label>onchain</label>
            </div>
          </div>
        )}
        {currentPage === PageType.asset && (
          <div className="config-asset hide_game_select">
            <input type="checkbox" />
            <span>隐藏游戏选择(资产页)</span>
          </div>
        )}
        {currentPage === PageType.asset && (
          <div className="config-asset hide_game_tokens">
            <input type="checkbox" />
            <span>隐藏token部分(资产页)</span>
          </div>
        )}
        {currentPage === PageType.nft_market && (
          <div className="config-nft-market hide_game_filter nft">
            <input type="checkbox" />
            <span>隐藏游戏filter(nft市场页)</span>
          </div>
        )}
        {currentPage === PageType.setting && (
          <div className="config-setting row justify-center">
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
        )}
        {currentPage === PageType.nft_market && (
          <div className="config-nft-market">tip: keyword & features 参考文档</div>
        )}
        {currentPage === PageType.nft_collection && (
          <div className="config-nft-collection">tip: features 参考文档，collection必传(示例为写死的值)</div>
        )}
      </div>
      <div className="card col">
        <p>弹框样式控制:</p>
        <div className="config-alert row justify-center">
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
        <div className="config-alert alert_showCloseIcon">
          <input type="checkbox" />
          <span>是否隐藏关闭按钮</span>
        </div>
        <div className="config-alert row items-center justify-center alert_width">
          <label>宽度:</label>
          <input type="text" placeholder="200px" defaultValue="200px" />
        </div>
        <div className="config-alert row items-center justify-center alert_height">
          <label>高度:</label>
          <input type="text" placeholder="200px" defaultValue="300px" />
        </div>
        <div className="config-alert col items-center justify-center alert_style">
          <label>自定义样式对象(合法json字符串):</label>
          <textarea style={{ width: '400px' }} placeholder="" rows={7} defaultValue={defaultStyle}></textarea>
        </div>
      </div>
      <div className="card">
        <p>打开页面的方式如下：</p>
        <button onClick={() => openPage(OpenPageMode.alert)}>弹框形式(iframe)</button>
        <button onClick={() => openPage(OpenPageMode.page)}>新页面形式</button>
        <button onClick={() => openPage(OpenPageMode.iframeDom)}>dom形式</button>
        <button onClick={() => openPage(OpenPageMode.iframeUri)}>uri形式</button>
      </div>
    </>
  )
}

export default App
