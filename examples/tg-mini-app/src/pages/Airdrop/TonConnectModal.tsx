import { TonConnectButton, useTonConnectUI } from '@tonconnect/ui-react'
import React from 'react'
import { BgIcon, Modal } from 'src/components/ui'

interface TonConnectModalProps {
  open: boolean
  onClose: () => void
}

export const TonConnectModal: React.FC<TonConnectModalProps> = ({ open, onClose }) => {
  const [tonConnectUI] = useTonConnectUI()

  // tonConnectUI.connected

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col items-center">
        <BgIcon imagePath="/src/images/common/icon_coin.png" className="mb-4 h-20 w-20" />
        <h2 className="mb-2 text-xl font-bold">{`${tonConnectUI.connected ? 'Your Ton wallet is connected' : 'Connect your TON wallet'}`}</h2>
        <span className="mx-auto max-w-xs text-center text-sm">{`Connect your crypto wallet. If you don't have one, create one in your Telegram account`}</span>
        <TonConnectButton className="mt-4" />
      </div>
    </Modal>
  )
}
