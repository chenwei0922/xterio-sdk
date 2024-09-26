import React from 'https://esm.sh/react?dev'
import ReactDOM from 'https://esm.sh/react-dom?dev'
import ReactDOMClient from 'https://esm.sh/react-dom/client?dev'

window.React = React
window.ReactDOM = ReactDOM
window.ReactDOMClient = ReactDOMClient

import 'https://esm.sh/@particle-network/authkit@2.0.2?bundle'

import * as XterioAuth from 'https://esm.sh/@xterio-sdk/auth@0.0.8'
window.XterioAuth = XterioAuth

// import * as XterioWallet from 'https://esm.sh/@xterio-sdk/wallet@0.0.8-patch?bundle&alias=react:React"'

import * as XterioWallet from 'https://esm.sh/@xterio-sdk/wallet@0.0.8-patch?bundle'
console.log('cccc', XterioWallet)
window.XterioWallet = XterioWallet
