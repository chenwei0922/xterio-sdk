const redirect_uri = 'http://localhost:3000/'
const client_id = '4gsmgur6gkp8u9ps8dlco3k7eo'
const client_secret = 'ABC23'
const app_id = ''
const config = {
  app_id,
  client_id,
  client_secret,
  redirect_uri,
  env: 'Dev'
}
const A = () => {
  return (
    <XterioWallet.XterioWalletProvider {...config}>
      <B />
    </XterioWallet.XterioWalletProvider>
  )
}
const B = () => {
  return <div id="root">hello world</div>
}

console.log(XterioWallet)
const e = React.createElement
const domContainer = document.querySelector('#app')
const root = ReactDOM.createRoot(document.getElementById('app'))
root.render(<A />)

// TODO:
// 1. dom -> reactdom
// 2. provider bind
