import { useEffect } from 'react'
import { useGlobalUnityContext } from './useGlobalUnityContext'

export const useUnityEventListener = (eventName: string, callback: (...args: any[]) => void) => {
  const { addEventListener, removeEventListener, isLoaded } = useGlobalUnityContext()

  useEffect(() => {
    if (!isLoaded) return

    addEventListener(eventName, callback)
    return () => {
      removeEventListener(eventName, callback)
    }
  }, [eventName, callback, isLoaded, addEventListener, removeEventListener])
}
