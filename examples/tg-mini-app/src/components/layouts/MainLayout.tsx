import { observer } from 'mobx-react-lite'
import React, { PropsWithChildren } from 'react'
import { Outlet } from 'react-router-dom'

import { Header } from './Header'
import { TabNavigation } from './TabNavigation'

export const MainLayout: React.FC<PropsWithChildren> = observer(({ children }) => {
  return (
    <div className="h-full w-screen overflow-x-hidden">
      <Header />
      <Outlet />
      <TabNavigation />
    </div>
  )
})
