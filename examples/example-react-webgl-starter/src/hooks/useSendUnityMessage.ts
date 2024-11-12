import { useEffect } from 'react'
import { useGlobalUnityContext } from './useGlobalUnityContext'
import { ReactUnityEventParameter } from 'react-unity-webgl/distribution/types/react-unity-event-parameters'

export const useSendUnityMessage = (
  sendHandler: (
    sendMessage: (
      gameObjectName: string,
      methodName: string,
      parameter?: ReactUnityEventParameter
    ) => void
  ) => void,
  {
    ready,
    refreshDeps
  }: {
    ready: boolean
    refreshDeps: Array<any>
  }
) => {
  const { sendMessage } = useGlobalUnityContext()

  useEffect(() => {
    if (!ready) return
    sendHandler(sendMessage)
  }, [ready, sendMessage, sendHandler, ...refreshDeps])
}
