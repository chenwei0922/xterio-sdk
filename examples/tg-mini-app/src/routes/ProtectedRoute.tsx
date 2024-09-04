import { observer } from 'mobx-react-lite'
import React, { PropsWithChildren } from 'react'

interface Props {
  isPublic?: boolean
  isAuthorized?: boolean
}
const ProtectedRoute: React.FC<PropsWithChildren<Props>> = observer(({ isPublic, children }) => {
  // const { userStore } = useStores()
  // const { isAuthenticated } = userStore
  // if (!isPublic && !isAuthenticated) {
  //   return <Navigate to="/login" replace />
  // }
  return <>{children}</>
})

export default ProtectedRoute
