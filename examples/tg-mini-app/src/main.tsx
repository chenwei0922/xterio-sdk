import ReactDOM from 'react-dom/client'
import 'src/styles/index.scss'
import 'virtual:svg-icons-register'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Env, XterioAuth } from '@xterio-sdk/auth'

declare global {
  interface Window {
    Telegram?: any
    spine?: any
  }
}

const devConfig = {
  redirect_uri: 'http://localhost:3000/',
  client_id: '4gsmgur6gkp8u9ps8dlco3k7eo',
  client_secret: 'ABC23',
  app_id: ''
}
const stageConfig = {
  redirect_uri: location.href,
  client_id: '3094298453404953',
  client_secret: 'mzmhYqcqDGdymblv5gb7s9OWcnYpH1ha',
  app_id: '6c684e202700'
}
const _config = __EXAMPLE_ENV__ === Env.Staging ? stageConfig : devConfig
const env = __EXAMPLE_ENV__

XterioAuth.init(_config, env)

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
