import { TonConnectUIProvider } from '@tonconnect/ui-react'
import { observer } from 'mobx-react-lite'
import { BrowserRouter } from 'react-router-dom'
import { GlobalProvider } from './contexts/GlobalContext'
import { useTelegram } from './hooks'
import { RenderRouter } from './routes'
import { useStores } from './stores'

const App = observer(() => {
  const VITE_TEL_APP_URL = import.meta.env.VITE_TEL_APP_URL
  const { webApp, user } = useTelegram()

  const { userStore } = useStores()

  return (
    <>
      <GlobalProvider>
        <TonConnectUIProvider
          manifestUrl={`https://${VITE_TEL_APP_URL}/tonconnect-manifest.json`}
          actionsConfiguration={{
            twaReturnUrl: `https://${VITE_TEL_APP_URL}`
          }}
        >
          <BrowserRouter basename={import.meta.env.BASE_URL}>
            <RenderRouter />
          </BrowserRouter>
        </TonConnectUIProvider>
      </GlobalProvider>
    </>
  )
})

export default App
