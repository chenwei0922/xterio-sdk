// This is a hook function, used to provide access to telegram
import WebApp from '@twa-dev/sdk'
import { useCallback, useEffect } from 'react'
interface Options {
  onCloseMiniApp?: (e) => void
}
export function useTelegram(options?: Options) {
  const { onCloseMiniApp } = options || {}
  const user = WebApp.initDataUnsafe?.user

  // console.log({ WebApp })

  // Use as a callback for method results
  const onArgumentResult = (functionName, argument, result) => {
    // Show function call result using an alert
    WebApp.showAlert(`${functionName}(${argument}) returned ${result}`)
  }

  const onResult = (functionName, result) => {
    // Show function call result using an alert
    onArgumentResult(functionName, '', result)
  }

  // Use as a callback for some events
  const onReceivedEvent = (event, data) => {
    // Show function call result using an alert
    WebApp.showAlert(`received event(${event}) with data(${data})`)
  }

  // Call a method on webApp while handling errors
  const executeArgumentMethod = (methodName, argument, method, ignoreAlert) => {
    try {
      const result = method()
      if (!ignoreAlert) {
        const wrappedResult = `Result: ${result}`
        onArgumentResult(methodName, argument, wrappedResult)
      }
    } catch (error) {
      onArgumentResult(methodName, argument, error)
    }
  }

  const executeMethod = (methodName, method, ignoreAlert) => {
    executeArgumentMethod(methodName, '', method, ignoreAlert)
  }

  useEffect(() => {
    // TODO 待验证
    WebApp.onEvent('popupClosed', (e) => {
      // console.log({ e })
      onCloseMiniApp?.(e)
    })
  }, [])

  const tgHaptic = useCallback(() => {
    // tg中触发振动反馈
    if (WebApp) {
      WebApp?.HapticFeedback?.impactOccurred('heavy')
    }
  }, [])

  return {
    webApp: WebApp,
    user,
    onArgumentResult,
    onResult,
    onReceivedEvent,
    executeArgumentMethod,
    executeMethod,
    tgHaptic
  }
}
