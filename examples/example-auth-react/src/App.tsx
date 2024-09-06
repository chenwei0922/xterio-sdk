import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { IUserInfo, LoginType, XterEventEmiter, XterioAuth } from '@xterio-sdk/auth'

function App() {
  const [userinfo, setUserinfo] = useState('')
  const [isLogin, setIsLogin] = useState(XterioAuth.isLogin)

  useEffect(() => {
    //监听登录成功事件
    XterEventEmiter.subscribe((res: IUserInfo) => {
      console.log('info1=', res)
      setUserinfo(JSON.stringify(res))
      setIsLogin(XterioAuth.isLogin)
    })
    return () => {
      XterEventEmiter.unsubscribe()
    }
  }, [])

  const login = (mode?: LoginType) => {
    XterioAuth.login(mode)
  }
  const logout = () => {
    XterioAuth.logout()
    setUserinfo('')
    setIsLogin(XterioAuth.isLogin)
  }

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
        <button onClick={() => login()}>默认登录</button>
        <button onClick={() => login(LoginType.Email)}>邮箱登录</button>
        <button onClick={() => login(LoginType.Mini)}>TT 登录</button>
        <button onClick={logout}>退出登录</button>
      </div>
    </>
  )
}

export default App
