import { log, XTERIO_EVENTS } from 'utils'

type Func = (...args: any) => void | unknown

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

  //one to one
  private static _cacheMap: Map<string, Func> = new Map()
  static subscribe<T>(callback: (p: T) => void, _event?: string) {
    const _key = _event || XTERIO_EVENTS.ACCOUNT
    log('subscribe event', _key)
    const _callback = (info: T) => {
      callback?.(info)
    }
    this._cacheMap.set(_key, _callback)
    this.on(_key, _callback)
  }
  static unsubscribe(_event?: string) {
    const _key = _event || XTERIO_EVENTS.ACCOUNT
    log('unsubscribe event', _key)
    const _callback = this._cacheMap.get(_key)
    if (_callback) {
      this.off(_key, _callback)
      this._cacheMap.delete(_key)
    }
  }
  static clear() {
    this.listeners = {}
    this._cacheMap.clear()
  }
}
