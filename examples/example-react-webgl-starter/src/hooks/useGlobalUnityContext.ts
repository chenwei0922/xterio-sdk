import { useContext, useEffect } from 'react'
import { GlobalUnityContext } from '../contexts/GlobalUnityContext'

export const useGlobalUnityContext = () => {
  const context = useContext(GlobalUnityContext)

  useEffect(() => {
    if (!context.isLoaded) return
    // 将unityInstanceRef挂载到window上，方便Unity script中调用
    window.unityInstanceRef = context.unityInstance
  }, [context.isLoaded, context.unityInstance])

  if (!context) {
    throw new Error('useGlobalUnityContext must be used within a GlobalUnityProvider')
  }
  return context
}
