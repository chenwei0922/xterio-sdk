import axios from 'axios'
import { getPackageVersion } from './logger'

const instance = axios.create({
  baseURL: 'https://api.playvrs.net',
  timeout: 60000,
  headers: {
    sdkVersion: getPackageVersion(),
    platform: 'pc',
    clientId: '',
    timestamp: Date.now(),
    language: 'cn',
    nonce: ''
    // appVersion: '',
    // appPackage: '',
  }
})
