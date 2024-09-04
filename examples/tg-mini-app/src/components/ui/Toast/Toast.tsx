import classNames from 'classnames'
import { Toast } from 'konsta/react'
import { SvgIcon } from '..'
export type ToastVarient = 'info' | 'success' | 'error' | 'warning'
export interface JToastProps {
  message?: string
  open?: boolean
  messageIcon?: React.ReactNode | null
  varient?: ToastVarient
  onClose?: () => void
}
export const JToast: React.FC<JToastProps> = ({ message, messageIcon, open, onClose, varient = 'info' }) => {
  return (
    <Toast
      position="right"
      opened={open}
      className={classNames(
        '!bg-[rgba(0,0,0,0.7)]',
        '!top-10 bottom-auto',
        { 'translate-y-0': open },
        { '!-translate-y-full': !open }
      )}
    >
      <div className="flex w-full shrink items-center justify-between">
        <div
          className={classNames('flex items-center text-sm text-white', {
            '!text-jred': varient === 'error'
          })}
        >
          {messageIcon && <div className="flex-center mr-2 h-5 w-5">{messageIcon}</div>}
          <div>{message}</div>
        </div>

        <div className="flex-center h-4 w-4" onClick={onClose}>
          <SvgIcon iconName="icon_close"></SvgIcon>
        </div>
      </div>
    </Toast>
  )
}
