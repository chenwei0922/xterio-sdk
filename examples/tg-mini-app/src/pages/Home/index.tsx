import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useTelegram } from 'src/hooks'

import { DemonstrationAccount } from 'src/common/configs'
import { useStores } from 'src/stores'

const Home = observer(() => {
  const { webApp, user, tgHaptic } = useTelegram({
    onCloseMiniApp() {
      // runLevelUp()
    }
  })

  const { appStore, userStore } = useStores()

  const userId = user?.id ?? DemonstrationAccount

  useEffect(() => {
    const startParam = webApp.initDataUnsafe.start_param
    console.error('start_params>>>')
    console.error(startParam)
    console.error('>>>start_params')
  }, [webApp])

  useEffect(() => {
    webApp.ready()
  }, [webApp])

  useEffect(() => {
    console.warn('start_param')
    console.warn(webApp.initDataUnsafe.start_param)
  }, [])

  return (
    <div className="flex h-[calc(100%_-_70px)] w-full flex-shrink-0 flex-col justify-between overflow-hidden pb-5">
      <h2 className="my-4 text-center">XTER TG MINI APP</h2>
    </div>
  )
})

export default Home
