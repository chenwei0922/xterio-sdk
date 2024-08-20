# xterio-auth

## 1. Install
`npm install xterio-auth` | `yarn add xterio-auth` | `pnpm add xterio-auth` 

## 2. Quick Start

```ts
import * as XterioAuth from 'xterio-auth'

//1. Initialize only once
const redirect_uri = ''
const client_id = ''
const client_secret = ''
XterioAuth.init({ client_id, client_secret, redirect_uri })

//2. Register to listen for user information
XterioAuth.XterEventEmiter.on(XterioAuth.XTERIO_EVENTS.ACCOUNT, (info: IUserInfo) => {
  console.log('info1=', info)
})

//3. SignIn (Authorize / Union)
...
```

## 3. Login Authorize
```js
XterioAuth.login(XterioAuth.LoginType.Authorize, (info) => {
  console.log('info2=', info)
})
```

## 4. Login Union
```js
XterioAuth.login(XterioAuth.LoginType.Union, (info) => {
  console.log('info=', info)
})
```