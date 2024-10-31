import { useEffect, useRef, useState } from 'react'
import { Unity } from 'react-unity-webgl'
import { IUserInfo, LoginType, XterEventEmiter, XTERIO_EVENTS, XterioAuth } from '@xterio-sdk/auth'
import { useXterioTransaction, useXterioWalletContext } from '@xterio-sdk/wallet'
import { XterioChainId } from './config'
import { SIGNIN_ABI } from './abi'
import { getContract, NETWORK_NAME } from './common'

import { useGlobalUnityContext, useResponsiveCanvas } from './hooks'
import { useUnityEventListener } from './hooks/useUnityEventListener'
import { SplashLoading } from './components'
import { useSendUnityMessage } from './hooks/useSendUnityMessage'

import './App.css'

const useSignInTrade = () => {
  const chainId = XterioChainId
  const contractAddress = '0x19c10FFf96B80208f454034C046CCc4445Cd20ba'
  const network = NETWORK_NAME.XTERIO
  const abi = SIGNIN_ABI
  const contract = getContract(network, contractAddress, abi)
  const { sendTransaction, state } = useXterioTransaction(contract, 'checkIn')
  return {
    sendTransaction,
    state,
    chainId,
    contract,
    contractAddress
  }
}

function App() {
  const { unityProvider, sendMessage, isLoaded, loadingProgression } = useGlobalUnityContext()

  const unityCanvasRef = useRef<HTMLCanvasElement>(null)
  const devicePixelRatio = useResponsiveCanvas(unityCanvasRef)

  const { aaAddress, obtainWallet, switchChain, openWallet } = useXterioWalletContext()

  const [userinfo, setUserInfo] = useState<IUserInfo>(undefined)

  const { sendTransaction, state, chainId, contract, contractAddress } = useSignInTrade()

  //xterio auth 监听事件
  useEffect(() => {
    const unsubscribe_info = XterEventEmiter.subscribe((res: IUserInfo) => {
      console.log('[xtest] emit userinfo=', res)
      setUserInfo(res)
    })
    const unsubscribe_logout = XterEventEmiter.subscribe(() => {
      setUserInfo(undefined)
    }, XTERIO_EVENTS.LOGOUT)

    return () => {
      unsubscribe_info?.()
      unsubscribe_logout?.()
    }
  }, [])

  // 监听登录
  useUnityEventListener('XterLogin', async () => {
    if (!XterioAuth.isLogin) {
      XterioAuth.login(LoginType.Mini)
    }
  })

  // 监听登出
  useUnityEventListener('XterLogout', () => {
    XterioAuth.logout()
  })

  //监听钱包连接，如果没有钱包先获取钱包
  useUnityEventListener('XterConnectWallet', () => {
    if (!XterioAuth.isLogin) {
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
    if (!XterioAuth.isLogin || !aaAddress) {
      return
    }
    await switchChain(XterioChainId)
    const type = 2
    try {
      const res = await sendTransaction?.(type)
      sendMessage('XterManager', 'CheckIntateCallback', res.transactionHash ? 'true' : 'false')
    } catch (err) {
      sendMessage('XterManager', 'CheckIntateCallback', 'false')
    }
  })

  // 登录状态发生变化时候向 unity 发送登录状态和用户信息
  useSendUnityMessage(
    (sendMessage) => {
      console.log({ userinfo })
      sendMessage(
        'XterManager',
        'LoginStateCallback',
        userinfo ? JSON.stringify(userinfo ?? '') : ''
      )
    },
    {
      ready: isLoaded,
      refreshDeps: [userinfo]
    }
  )

  //签到合约交易状态监听
  useEffect(() => {
    //进行中 => PendingSignature,Mining
    //交易成功 => Success
    //交易失败 => Exception,Fail
    //交易初始状态 => None

    console.log(`[xtest] the transacton status = `, state.status)
    if (['Exception', 'Fail'].includes(state.status)) {
      sendMessage('XterManager', 'SignInFinish', 'false')
    } else if (state.status === 'Success') {
      sendMessage('XterManager', 'SignInFinish', 'true')
    }
  }, [state.status])

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
