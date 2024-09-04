import { useBoolean } from 'ahooks'
import { observer } from 'mobx-react-lite'
import { SvgIcon } from 'src/components/ui'
import { useTelegram } from 'src/hooks'
import { TonConnectModal } from './TonConnectModal'

const Airdrop = observer(() => {
  const { webApp } = useTelegram()

  const [TonModalIsOpen, TonModalAction] = useBoolean()

  return (
    <div>
      <div className="relative flex h-[260px] flex-col items-center justify-start">
        <div
          className="bg-no-repea absolute left-1/2 z-10 -translate-x-1/2 bg-contain bg-center"
          style={{
            width: '100%',
            height: '100%'
          }}
        />

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
      </div>
    </div>
  )
})

export default Airdrop
