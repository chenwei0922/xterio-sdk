const React = window.React
const ReactDOM = window.ReactDOMClient

const XterioAuth = window.XterioAuth
const XterioWallet = window.XterioWallet

console.log('XterioWallet=', XterioWallet)
console.log('XterioAuth=', XterioAuth)

console.log('React=', React)
console.log('ReactDOM=', ReactDOM)

const redirect_uri = 'http://localhost:3000/'
const client_id = '4gsmgur6gkp8u9ps8dlco3k7eo'
const client_secret = 'ABC23'
const app_id = 'apiautotest'
const config = {
  app_id,
  client_id,
  client_secret,
  redirect_uri,
  env: 'Dev',
  pn_app_id: '40ad8524-f844-496d-8de2-50a8a322d6ba'
}

const App = () => {
  const [count, setcount] = React.useState(11)
  return (
    <div>
      <h1>Hello, ESM React!{count}</h1>
    </div>
  )
}

const GlobalProvider = ({ children }) => {
  // 在这里可以实现你的 Provider 逻辑
  return children
}

const root = ReactDOMClient.createRoot(document.getElementById('app'))
root.render(
  <GlobalProvider>
    <App />
  </GlobalProvider>
)
// root.render(
//   <XterioWallet.XterioWalletProvider {...config}>
//     <App />
//   </XterioWallet.XterioWalletProvider>
// )

// // 创建一个全局的 Provider
// const GlobalProvider = ({ children }) => {
//   // 在这里可以实现你的 Provider 逻辑
//   return children
// }
// ReactDOM.createRoot(document.getElementById('root')).render(
//   <GlobalProvider>
//     <App />
//   </GlobalProvider>
// )

/*
import { XterioAuth } from 'https://esm.sh/@xterio-sdk/auth@0.0.8'
console.log(XterioAuth)
XterioAuth.init(config)
// import 'https://esm.sh/axios'
import * as XterioWallet from 'https://esm.sh/@xterio-sdk/wallet@0.0.8-patch?bundle'
console.log(XterioWallet)
*/
