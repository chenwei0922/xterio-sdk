# @xterio-sdk/auth

## 1. Install
`npm install @xterio-sdk/auth` | `yarn add @xterio-sdk/auth` | `pnpm add @xterio-sdk/auth` 

## 2. Usage

```ts
import '@xterio-sdk/auth/style/main.css'
import { XterioAuth, XterEventEmiter } from '@xterio-sdk/auth'

//1. Initialize only once
const redirect_uri = ''
const client_id = ''
const client_secret = ''
const app_id = ''
XterioAuth.init({app_id, client_id, client_secret, redirect_uri })

//2. Register to listen for user information
XterEventEmiter.subscribe(info=>{
  //subscribe
  console.log('info=', info)
})
//unsubscribe
XterEventEmiter.unsubscribe()

//3. SignIn
XterioAuth.login()
...
```

## 3. API Reference

### 3.1 Method
#### `init(config, env?:Env)`
Initialize Function
```ts
XterioAuth.init({app_id:'', client_id:'', client_secret:'' redirect_uri:'' }, Env.Dev)
```

#### `login(mode?: LoginType)`
login xterio
```ts
XterioAuth.login() //default: LoginType.Default
XterioAuth.login(LoginType.Email)
XterioAuth.login(LoginType.Mini)
```

#### `logout()`
quit xterio
```ts
XterioAuth.logout()
```

### 3.2 Property
#### `isLogin`
whether to log in
```ts
XterioAuth.isLogin //boolean
```

#### `userinfo`
get xterio user information
```ts
XterioAuth.userinfo
```

### 3.3 EventEmiter

#### `subscribe(callback:Func, _event?: string)`
```ts
XterEventEmiter.subscribe(()=>{}) //default: XTERIO_EVENTS.ACCOUNT
```

#### `unsubscribe(_event?: string)`
```ts
XterEventEmiter.unsubscribe() //default: XTERIO_EVENTS.ACCOUNT
```

#### `off/on(event:string, callback:Func)`

```ts
const cb = (info) => {
  console.log('emiter auth userinfo==', info)
}
XterEventEmiter.on(cb, 'event_name')
XterEventEmiter.off(cb, 'event_name')
```

#### `clear()`
clear all listeners



