import classNames from 'classnames'
import { Sheet } from 'konsta/react'
import { PropsWithChildren } from 'react'
import { parseImageUrl } from 'src/common/utils'
import { BgIcon } from '../BgIcon'

interface ModalProps {
  showClose?: boolean
  open: boolean
  height?: string | number
  confirmButtonProps?: {
    show?: boolean
    text?: string
    disabledText?: string
    disabled?: boolean
    onClick?: () => void
  }
  onClose: () => void
}
export const Modal: React.FC<PropsWithChildren<ModalProps>> = ({
  open,
  onClose,
  showClose = true,
  height = 'auto',
  confirmButtonProps,
  children
}) => {
  const { show, disabled, disabledText, text, onClick } = confirmButtonProps ?? {}
  return (
    <Sheet
      className={classNames('z-[1000] w-full !rounded-t-md border-t-2 border-[RGBA(109,121,248,1)] pb-safe', {
        'shadow-modal': open
      })}
      opened={open}
      onBackdropClick={onClose}
    >
      <div className="relative w-full text-white" style={{ height: height }}>
        <div
          className="flex h-6 items-center pr-3"
          style={{
            backgroundImage: `url(${parseImageUrl('/src/images/components/modal/modal_title_bg.png')})`,
            backgroundSize: '100% 100%'
          }}
        >
          {showClose && (
            <div className="ml-auto" onClick={onClose}>
              <BgIcon imagePath="/src/images/common/btn_close.png" className="h-5 w-5" />
            </div>
          )}
        </div>
        <div
          className="pd-11 px-4 pb-5 pt-5"
          style={{
            backgroundImage: `url(${parseImageUrl('/src/images/components/modal/modal_bg.png')})`
          }}
        >
          <div className={classNames('')}>{children}</div>

          {show && (
            <div className="mt-3 flex w-full items-center justify-center">
              <div
                className={classNames(
                  'flex h-[48px] w-[245px] items-center justify-center pb-1 text-base font-semibold text-btn-primary',
                  { '!opacity-50': disabled },
                  'active:grayscale'
                )}
                style={
                  disabled
                    ? {
                        backgroundImage: `url(${parseImageUrl('/src/images/common/btn_confirm.png')})`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center'
                      }
                    : {
                        backgroundImage: `url(${parseImageUrl('/src/images/common/btn_confirm.png')})`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center'
                      }
                }
                onClick={onClick}
              >
                {disabled ? (disabledText ?? text) : text}
              </div>
            </div>
          )}
        </div>
      </div>
    </Sheet>
  )
}
