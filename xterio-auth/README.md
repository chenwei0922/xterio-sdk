# xterio-auth

## 1. Install
`npm install xterio-auth` | `yarn add xterio-auth` | `pnpm add xterio-auth` 

## 2. Quick Start

```ts
import { XterioAuth, XterEventEmiter, XTERIO_EVENTS } from 'xterio-auth'

//1. Initialize only once
const redirect_uri = ''
const client_id = ''
const client_secret = ''
XterioAuth.init({ client_id, client_secret, redirect_uri })

//2. Register to listen for user information
XterEventEmiter.on(XTERIO_EVENTS.ACCOUNT, (info) => {
  console.log('info1=', info)
})

//3. SignIn (Authorize / Union)
XterioAuth.login()
...
```

## 3. API Reference

### 3.1 Method
#### `init()`
Initialize Function
```ts
XterioAuth.init({ client_id:'', client_secret:'', redirect_uri:'' })
```

#### `login()`
login xterio-auth
```ts
XterioAuth.login()
```

#### `logout()`
quit xterio-auth
```ts
XterioAuth.logout()
```

### 3.2 Property
#### `isLogin`
whether to log in
```ts
XterioAuth.isLogin //true/false
```

#### `userinfo`
get xterio user information
```ts
XterioAuth.userinfo
```

### 3.3 EventEmiter
```ts
//1.Register to listen for user information
XterEventEmiter.on(XTERIO_EVENTS.ACCOUNT, (info) => {
  console.log('info1=', info)
})

//2.Cancel monitoring for user information
XterEventEmiter.off(XTERIO_EVENTS.ACCOUNT, (info) => {
  console.log('info1=', info)
})
```


