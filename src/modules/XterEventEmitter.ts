import type { IUserInfo } from 'interfaces/loginInfo'
import { log, XTERIO_EVENTS } from 'utils'

type Func = (() => void) | ((...args: any) => unknown)

export class XterEventEmiter {
  private static _listeners: { [key: string]: Func[] } = {}
  static set listeners(p: { [key: string]: Func[] }) {
    this._listeners = p
  }
  static get listeners() {
    return this._listeners
  }
  static on(event: string, listener: Func) {
    if (!this._listeners[event]) {
      this._listeners[event] = []
    }
    this._listeners[event].push(listener)
  }
  static off(event: string, listener: Func) {
    if (this._listeners[event]) {
      this._listeners[event] = this._listeners[event].filter((l) => l !== listener)
    }
  }
  static emit(event: string, ...args: any) {
    if (this._listeners[event]) {
      this._listeners[event].forEach((l) => {
        l(...args)
      })
    }
  }
  private static remove(event: string) {
    if (this._listeners[event]) {
      delete this._listeners[event]
    }
  }
  private static _userInfoCB: (p?: IUserInfo) => void
  static subscribe(callback: (p?: IUserInfo) => void, _event?: string) {
    log('subscribe userinfo listen')
    this._userInfoCB = (info?: IUserInfo) => {
      callback?.(info)
    }
    this.on(_event || XTERIO_EVENTS.ACCOUNT, this._userInfoCB)
  }
  static unsubscribe(_event?: string) {
    log('unsubscribe userinfo listen')
    this.off(_event || XTERIO_EVENTS.ACCOUNT, this._userInfoCB)
  }
  static clear() {
    this.listeners = {}
  }
}
// XterEventEmiter.on('login', () => { })
// XterEventEmiter.emit('login', 'ddd')
