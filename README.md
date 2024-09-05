# Xterio SDK

## Usage
### Xterio Auth Login Modal (UI)
In app entry file:

Step 1: Init
```js
const redirect_uri = 'http://someappdomain.com'
const client_id = 'xxxx'
const client_secret = 'abcde'

XterioAuth.init({ client_id, client_secret, redirect_uri })
```
Step 2: Import useXterioAuthModal and css

```js
import { useXterLoginModal } from 'xterio-auth'
import 'xterio-auth/dist/es/style.css'

```
Step 3: Use useXterioAuthModal
```js
import { useState } from 'react'
import { useXterLoginModal } from 'xterio-auth'
import 'xterio-auth/dist/es/style.css'
export const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(false)
  const [userInfo, setUserInfo] = useState<any>()

  const { open, logout } = useXterLoginModal({
    onLoginStateChange: (isLogin, userInfo) => {
      setIsLogin(isLogin)
      setUserInfo(userInfo)
    }
  })

  return (
    <div>
      <div onClick={() => {open()}}> {isLogin ? userInfo?.username : 'Login'} </div>
      {isLogin && ( <span onClick={() => { logout() }}> Logout </span>)}
    </div>
  )
}

```

## Development
### TG MINI APP with xterio-auth
In workspace root, run:
```bash
npm install
npm run dev:examples-tg
```
```base
"dev:examples-tg":"turbo dev-watch --filter=tg-mini-app --filter=xterio-auth"
```
#### Intergrate with xterio-auth sdk in develop mode
To integrate the xterio-auth SDK in a `tg-mini-app` with hot-reloading in development mode, Turborepo's capabilities are needed to manage package dependencies.Manage the dependencies of various packages through Turborepo by configuring the turbo.json file.



## [xterio-auth](./xterio-auth/README.md)

## [xterio-wallet](./xterio-wallet/README.md)
