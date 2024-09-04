import { useXterLoginModal } from 'xterio-auth'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import { useStores } from 'src/stores'
import 'xterio-auth/dist/lib/style.css'

export const Header = observer(() => {
  const navigate = useNavigate()
  const { userStore } = useStores()
  const { userInfo } = userStore
  const { open } = useXterLoginModal()

  console.log({ userInfo })
  return (
    <div className="flex h-16 w-full items-center justify-between bg-black/10 px-4">
      <span className="font-semibold">X-MINI</span>
      {userInfo?.username ? (
        <span>{userInfo.username}</span>
      ) : (
        <div
          // onClick={() => {
          //   navigate('/platform-login')
          // }}
          onClick={() => {
            open()
          }}
        >
          Login
        </div>
      )}
    </div>
  )
})
