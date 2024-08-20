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