import { useBoolean } from 'ahooks'
import { observer } from 'mobx-react-lite'
import { SvgIcon } from 'src/components/ui'
import { useTelegram } from 'src/hooks'
import { TonConnectModal } from './TonConnectModal'
import { OKX_CONNECT_ERROR_CODES, OkxConnectError, OKXTonConnect } from 'okxconnect'
import { useState } from 'react'

const Airdrop = observer(() => {
  const { webApp } = useTelegram()
  const [TonModalIsOpen, TonModalAction] = useBoolean()

  const [isOkxConnected, setIsOkxConnected] = useBoolean(false)
  const [okxWalletAddress, setOkxWalletAddress] = useState<string | null>(null)

  const okxTonConnect = new OKXTonConnect({
    metaData: {
      name: 'xter',
      icon: 'https://resources.xter.io/ft/aod/roar.png'
    }
  })

  const connectOkxWallet = async () => {
    try {
      const res = await okxTonConnect.connect({
        tonProof: 'signmessage',
        // redirect: 'tg://resolve',
        openUniversalLink: true
      })
      console.log('connect res ==', res)
      const connect: boolean = okxTonConnect.connected
      setIsOkxConnected.set(connect)
      if (connect) {
        const address = okxTonConnect.wallet?.account.address || null
        setOkxWalletAddress(address)
      }
    } catch (error) {
      if (error instanceof OkxConnectError) {
        if (error.code === OKX_CONNECT_ERROR_CODES.USER_REJECTS_ERROR) {
          alert('User reject')
        } else if (error.code === OKX_CONNECT_ERROR_CODES.ALREADY_CONNECTED_ERROR) {
          alert('Already connected')
        } else {
          alert('Unknown error happened')
        }
      } else {
        alert('Unknown error happened')
      }
    }
  }

  const restoreConnection = async () => {
    try {
      await okxTonConnect.restoreConnection()
      const connect: boolean = okxTonConnect.connected
      setIsOkxConnected.set(connect)
      if (connect) {
        const address = okxTonConnect.wallet?.account.address || null
        setOkxWalletAddress(address)
      }
    } catch (error) {
      alert('Error while restoring connection')
    }
  }

  const disconnectOkxWallet = async () => {
    try {
      setIsOkxConnected.set(false)
      setOkxWalletAddress(null)
      await okxTonConnect.disconnect()
    } catch (error) {
      if (error instanceof OkxConnectError) {
        switch (error.code) {
          case OKX_CONNECT_ERROR_CODES.NOT_CONNECTED_ERROR:
            alert('Not connected')
            break
          default:
            alert('Unknown error happened')
            break
        }
      } else {
        alert('Unknown error happened')
      }
    }
  }

  return (
    <div>
      <div className="relative flex h-[260px] flex-col items-center justify-start">
        <div
          className="mt-4 flex h-12 w-full cursor-pointer items-center justify-between px-4 pb-3 pt-2 hover:opacity-80"
          onClick={TonModalAction.setTrue}
          style={{
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="flex flex-1 items-center overflow-hidden">
            <h3 className="max-w-[250px] truncate text-sm font-semibold">{'Connect your TON wallet'}</h3>
          </div>
          <div className="ml-4 flex flex-shrink-0">
            <SvgIcon iconName="icon_arrow_right" size={14} />
          </div>
        </div>
        {/* <TonConnectButton /> */}
        <TonConnectModal open={TonModalIsOpen} onClose={TonModalAction.setFalse} />

        {/* okx */}
        <div
          className="mt-4 flex h-12 w-full cursor-pointer items-center justify-between px-4 pb-3 pt-2 hover:opacity-80"
          onClick={connectOkxWallet}
          style={{
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="flex flex-1 items-center overflow-hidden">
            <h3 className="max-w-[250px] truncate text-sm font-semibold">{'Connect your okx ton wallet'}</h3>
          </div>
          <div className="ml-4 flex flex-shrink-0">
            <SvgIcon iconName="icon_arrow_right" size={14} />
          </div>
        </div>

        <div
          className="mt-4 flex h-12 w-full cursor-pointer items-center justify-between px-4 pb-3 pt-2 hover:opacity-80"
          onClick={restoreConnection}
          style={{
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="flex flex-1 items-center overflow-hidden">
            <h3 className="max-w-[250px] truncate text-sm font-semibold">{'Restore okx ton wallet connection'}</h3>
          </div>
          <div className="ml-4 flex flex-shrink-0">
            <SvgIcon iconName="icon_arrow_right" size={14} />
          </div>
        </div>

        <div
          className="mt-4 flex h-12 w-full cursor-pointer items-center justify-between px-4 pb-3 pt-2 hover:opacity-80"
          onClick={disconnectOkxWallet}
          style={{
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="flex flex-1 items-center overflow-hidden">
            <h3 className="max-w-[250px] truncate text-sm font-semibold">{'Disconnect your okx ton wallet'}</h3>
          </div>
          <div className="ml-4 flex flex-shrink-0">
            <SvgIcon iconName="icon_arrow_right" size={14} />
          </div>
        </div>

        {isOkxConnected && okxWalletAddress && (
          <div className="mt-4 mx-auto text-sm font-semibold text-wrap">
            {'Connected okx ton wallet Address: ' + okxWalletAddress}
          </div>
        )}
      </div>
    </div>
  )
})

export default Airdrop
