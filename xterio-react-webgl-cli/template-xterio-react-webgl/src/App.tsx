import { Unity } from 'react-unity-webgl'
import './App.css'
import { useRef } from 'react'
import { XterioChainId } from './config'
import { SIGNIN_ABI } from './abi'
import { getContract, NETWORK_NAME } from './common'

import { useXterioTransaction, useXterioWalletContext } from '@xterio-sdk/wallet'
import { LoginType, XterioAuth } from '@xterio-sdk/auth'
import { useGlobalUnityContext, useResponsiveCanvas } from './hooks'
import { useUnityEventListener } from './hooks/useUnityEventListener'
import { SplashLoading } from './components'
import { useSendUnityMessage } from './hooks/useSendUnityMessage'

function App() {
  const { unityProvider, sendMessage, isLoaded, loadingProgression } = useGlobalUnityContext()

  console.log({ isLoaded2: isLoaded })
  const { userinfo, isLogin, logout, aaAddress, obtainWallet, switchChain, openWallet } =
    useXterioWalletContext()
  const { sendUserOperation, state } = useXterioTransaction()

  const unityCanvasRef = useRef<HTMLCanvasElement>(null)
  const devicePixelRatio = useResponsiveCanvas(unityCanvasRef)

  // 监听登录
  useUnityEventListener('XterLogin', async () => {
    const token = await XterioAuth.getIdToken()
    if (!token) {
      XterioAuth.login(LoginType.Mini)
    }
  })

  // 监听登出
  useUnityEventListener('XterLogout', () => {
    logout()
  })

  //监听钱包连接，如果没有钱包先获取钱包
  useUnityEventListener('XterConnectWallet', () => {
    console.log({ isLogin, aaAddress })
    if (!isLogin) {
      return
    }
    if (!aaAddress) {
      obtainWallet()
    } else {
      openWallet()
    }
  })

  //监听签到交易连接
  useUnityEventListener('XterCheckIn', async () => {
    console.log({ isLogin, aaAddress })
    if (!isLogin || !aaAddress) {
      return
    }
    await switchChain(XterioChainId)
    const contractAddress = '0x19c10FFf96B80208f454034C046CCc4445Cd20ba'
    const abi = SIGNIN_ABI
    const contract = getContract(NETWORK_NAME.XTERIO, contractAddress, abi)
    const type = 2

    const tx = {
      to: contractAddress,
      data: contract.interface.encodeFunctionData('checkIn', [type])
    }
    try {
      const res = await sendUserOperation?.(tx)
      sendMessage('XterManager', 'CheckIntateCallback', res.transactionHash ? 'true' : 'false')
    } catch (err) {
      sendMessage('XterManager', 'CheckIntateCallback', 'false')
    }
  })

  // 登录状态发生变化时候向 unity 发送登录状态和用户信息
  useSendUnityMessage(
    (sendMessage) => {
      console.log('sendmessage,', userinfo, isLoaded)
      sendMessage(
        'XterManager',
        'LoginStateCallback',
        userinfo ? JSON.stringify(userinfo ?? '') : ''
      )
    },
    {
      ready: isLoaded,
      refreshDeps: [isLogin, userinfo, isLoaded]
    }
  )

  return (
    <div className="unity-wrapper" id="unity-container">
      <SplashLoading percentage={loadingProgression} loaded={isLoaded} />
      <Unity
        style={{ visibility: isLoaded ? 'visible' : 'hidden' }}
        unityProvider={unityProvider}
        devicePixelRatio={devicePixelRatio}
        ref={unityCanvasRef}
        id="unity-canvas"
        tabIndex={0}
      />
    </div>
  )
}

export default App
