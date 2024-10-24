import ReactDOM from 'react-dom/client'
import 'src/styles/index.scss'
import 'virtual:svg-icons-register'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Env, XterioAuth } from '@xterio-sdk/auth'

declare global {
  interface Window {
    // Telegram?: any
    spine?: any
  }
}
const GET_QUERY_STRING = (key: string) => {
  const ls = location.search || location.hash
  //var reg = eval("new RegExp('[a-zA-Z0-9]+=[^&]+&|[a-zA-Z0-9]+=[^&]+$','g')");
  const reg = eval("new RegExp('[?&]+(" + key + ')=[^&]+&|[?&]+(' + key + ")=[^&]+$')")
  const args = ls.match(reg)
  if (args) {
    return args[0].split('=')[1].replace(/&$/, '')
  } else {
    //console.log(key + "不存在");
    return null
  }
  //var args = ls.match(/[a-zA-Z0-9]+=[^&]+&|[a-zA-Z0-9]+=[^&]+$/g);
}

const devConfig = {
  redirect_uri: location.href.replace(/[?&]code=[^&]+/, ''),
  client_id: '4gsmgur6gkp8u9ps8dlco3k7eo',
  client_secret: 'ABC23',
  app_id: 'apiautotest'
}
const stageConfig = {
  redirect_uri: location.href.replace(/[?&]code=[^&]+/, ''),
  client_id: '3094298453404953',
  client_secret: 'mzmhYqcqDGdymblv5gb7s9OWcnYpH1ha',
  app_id: '6f5d74164311'
}
let _env: Env = __EXAMPLE_ENV__ || Env.Dev
const variable = GET_QUERY_STRING('env')
if (variable === 'dev') {
  _env = Env.Dev
} else if (variable === 'stage') {
  _env = Env.Staging
}
const config = _env === Env.Staging ? stageConfig : devConfig
//初始化一次即可
XterioAuth.init(config, _env)

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
