console.log('module')
import React from 'https://esm.sh/react?dev'
import ReactDOM from 'https://esm.sh/react-dom?dev'
import ReactDOMClient from 'https://esm.sh/react-dom/client?dev'

window.React = React
window.ReactDOM = ReactDOM
window.ReactDOMClient = ReactDOMClient

// import 'https://esm.sh/@particle-network/aa@2.0.1?bundle'
// import 'https://esm.sh/@particle-network/auth-core@2.0.2?bundle'
// import 'https://esm.sh/@particle-network/authkit@2.0.2?bundle'
// import 'https://esm.sh/@particle-network/wallet@2.0.2?bundle'

// 'ahooks', 'antd', '@ant-design/icons'
// import 'https://esm.sh/ahooks@3.8.1'
// import 'https://esm.sh/antd'
// import 'https://esm.sh/@ant-design/icons'
// import 'https://esm.sh/axios'

import * as XterioAuth from 'https://esm.sh/@xterio-sdk/auth@0.0.8'
window.XterioAuth = XterioAuth

// import * as XterioWallet from 'https://esm.sh/@xterio-sdk/wallet@0.0.8-patch?bundle&alias=react:React"'

// import * as XterioWallet from 'https://esm.sh/xterio-wallet@0.0.8-patch?bundle'

import * as XterioWallet from 'https://esm.sh/xterio-wallet@0.0.2-patch-8?bundle&deps=axios,react@18.3.1,react-dom@18.3.1&dev'
window.XterioWallet = XterioWallet

// console.log('[1]XterioWallet=', XterioWallet)
// console.log('[1]XterioAuth=', XterioAuth)

// console.log('[1]React=', React)
// console.log('[1]ReactDOM=', ReactDOM)
