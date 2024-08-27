import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useXterioWalletContext } from './contexts'

function App() {
  const {
    userinfo,
    isLogin,
    login,
    logout,
    aaAddress,
    isConnect,
    disconnectWallet,
    openWallet,
    obtainWallet,
    connectWallet
  } = useXterioWalletContext()

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
      <h1>Xterio SDK</h1>
      <div>xterio auth sdk</div>
      <div className="card">
        <p>是否登录: {isLogin ? 'true' : 'false'}</p>
        <p>用户信息: {userinfo ? JSON.stringify(userinfo) : ''}</p>
        <button onClick={() => login()}>默认登录</button>
        <button onClick={() => login('email')}>邮箱登录</button>
        <button onClick={logout}>退出登录</button>
      </div>

      <div>xterio wallet sdk</div>
      <div className="card">
        <div>pn aa wallet address: {aaAddress}</div>
        <div>pn aa wallet connected status: {isConnect ? 'true' : 'false'}</div>
        <button onClick={connectWallet}>AA钱包连接</button>
        <button onClick={disconnectWallet}>AA钱包断开连接</button>
        <button onClick={obtainWallet}>AA钱包领取</button>
        <button onClick={openWallet}>打开AA钱包</button>
      </div>
      {/* <div className='' style={}></div> */}
    </>
  )
}

export default App
