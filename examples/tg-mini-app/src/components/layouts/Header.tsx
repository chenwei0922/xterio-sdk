import { useXterLoginModal, XterAuthModal } from '@xterio-sdk/auth'
import { observer } from 'mobx-react-lite'
import '@xterio-sdk/auth/dist/es/style.css'
import { useState } from 'react'

export const Header = observer(() => {
  const [isLogin, setIsLogin] = useState(false)
  const [userInfo, setUserInfo] = useState<any>()

  const { open, logout } = useXterLoginModal({
    onLoginStateChange: (isLogin, userInfo) => {
      setIsLogin(isLogin)
      setUserInfo(userInfo)
    }
  })

  return (
    <div className="flex h-16 w-full items-center justify-between bg-black/10 px-4">
      <span className="font-semibold">X-MINI</span>

      <div className="flex">
        <div
          onClick={() => {
            open()
          }}
        >
          {isLogin ? userInfo?.username : 'Login'}
        </div>
        {isLogin && (
          <span
            className="ml-2 cursor-pointer text-sm text-blue-400"
            onClick={() => {
              logout()
            }}
          >
            Logout
          </span>
        )}
      </div>
    </div>
  )
})
