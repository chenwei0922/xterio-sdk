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
}
// XterEventEmiter.on('login', () => { })
// XterEventEmiter.emit('login', 'ddd')
