import { XLog } from './logger'

export class XTimeOut {
  private _timer?: NodeJS.Timeout
  addTimeout(callback: () => void, timeout: number) {
    this.removeTimeout()
    XLog.info('the timer init')
    this._timer = setTimeout(() => {
      callback()
    }, timeout)
  }
  removeTimeout() {
    if (this._timer) {
      XLog.info('the timer clear')
      clearTimeout(this._timer)
    }
  }
}
