import ReactDOM from 'react-dom/client'
import 'src/styles/index.scss'
import 'virtual:svg-icons-register'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { XterioAuth, XterEventEmiter, XTERIO_EVENTS, XterAuthLoginModal } from 'xterio-auth'

declare global {
  interface Window {
    Telegram?: any
    spine?: any
  }
}

const redirect_uri = 'http://localhost:3000/'
const client_id = '4gsmgur6gkp8u9ps8dlco3k7eo'
//4gsmgur6gkp8u9ps8dlco3k7eo, 4gsmgur6gkp8u9ps8dlco3aaaa
const client_secret = 'ABC23'

XterioAuth.init({ client_id, client_secret, redirect_uri })

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
// react18 concurrent，dev模式下，开启StrictMode 会渲染两次
// 参考：https://github.com/facebook/react/issues/17786
root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
