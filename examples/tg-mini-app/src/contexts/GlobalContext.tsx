import { createContext, useContext, useState } from 'react'
import { JToast, JToastProps, ToastVarient } from 'src/components/ui/Toast/Toast'

interface GlobalContextType {
  showToast: (message: string, options?: JToastProps) => void
}

const GlobalContext = createContext<GlobalContextType>(null!)

export const useToast = () => {
  return useContext(GlobalContext)
}

export const GlobalProvider = ({ children }) => {
  const [toast, setToast] = useState<JToastProps>({
    message: '',
    messageIcon: null,
    varient: 'info' as ToastVarient,
    open: false
  })

  const showToast = (message: string, options?: JToastProps) => {
    const { messageIcon, varient = 'info' } = options || {}
    setToast({ message, varient, messageIcon, open: true })
    setTimeout(() => {
      setToast({ ...toast, open: false })
    }, 3000)
  }

  return (
    <GlobalContext.Provider value={{ showToast }}>
      {children}

      <JToast
        messageIcon={toast.messageIcon}
        open={toast.open}
        message={toast.message}
        varient={toast.varient}
        onClose={() => {
          setToast({ ...toast, open: false })
        }}
      />
    </GlobalContext.Provider>
  )
}
