import React, { createContext } from 'react'
import { useUnityContext } from 'react-unity-webgl'
import { appConfig } from '../config'
import { UnityContextHook } from 'react-unity-webgl/distribution/types/unity-context-hook'
import { UnityInstance } from 'react-unity-webgl/declarations/unity-instance'

interface IGlobalUnityContextHook extends Omit<UnityContextHook, 'UNSAFE__unityInstance'> {
  unityInstance: UnityInstance
}
export const GlobalUnityContext = createContext<IGlobalUnityContextHook>(null)

export const GlobalUnityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const unityContext = useUnityContext(appConfig)
  const { UNSAFE__unityInstance, ...rest } = unityContext

  return (
    <GlobalUnityContext.Provider value={{ ...rest, unityInstance: UNSAFE__unityInstance }}>
      {children}
    </GlobalUnityContext.Provider>
  )
}
