import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.js'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)

import '@xterio-sdk/auth/style/main.css'
import { Env, XterioAuth } from '@xterio-sdk/auth'
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
const config = __EXAMPLE_ENV__ === Env.Staging ? stageConfig : devConfig
const env = __EXAMPLE_ENV__
//初始化一次即可
XterioAuth.init(config, env)
