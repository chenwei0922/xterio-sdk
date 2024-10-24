const redirect_uri = 'http://localhost:3001/'
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

// const App = () => {
//   return (
//     <div>
//       <h1>Hello, ESM React!</h1>
//     </div>
//   )
// }
const App = () => {
  return React.createElement('div', null, React.createElement('h1', null, 'Hello, ESM React!'))
}

const GlobalProvider = ({ children }) => {
  // 在这里可以实现你的 Provider 逻辑
  return children
}

const init = () => {
  const React = window.React
  const ReactDOMClient = window.ReactDOMClient

  const XterioAuth = window.XterioAuth
  const XterioWallet = window.XterioWallet

  console.log('XterioWallet=', XterioWallet)
  console.log('XterioAuth=', XterioAuth)

  console.log('React=', React)
  console.log('ReactDOMClient=', ReactDOMClient)

  const root = ReactDOMClient.createRoot(document.getElementById('app'))
  // root.render(
  //   <GlobalProvider>
  //     <App />
  //   </GlobalProvider>
  // )

  // root.render(
  //   <XterioWallet.XterioWalletProvider {...config}>
  //     <App />
  //   </XterioWallet.XterioWalletProvider>
  // )

  root.render(React.createElement(XterioWallet.XterioWalletProvider, { ...config }, React.createElement(App)))
}

window.onload = () => {
  setTimeout(() => {
    init()
  }, 2000)
}
