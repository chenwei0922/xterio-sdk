import { ReactNode, Suspense } from 'react'
import { Route, Routes as ReactRoutes } from 'react-router-dom'
import { routes } from './config'
import ProtectedRoute from './ProtectedRoute'
import { generateFlattenRoutes } from './utils'

// 切换页面会出现闪屏现象
// 解决思路：公共页面不采用懒加载的方式 并在App.tsx去除Suspense的包裹
// 实现懒加载的用Suspense包裹 定义函数
const lazyLoad = (children: ReactNode): any => {
  return <Suspense fallback={<div></div>}>{children}</Suspense>
}

export const renderRoutes = (mainRoutes) => {
  const Routes = () => {
    const layouts = mainRoutes.map(({ renderLayout, routes }, index) => {
      const subRoutes = generateFlattenRoutes(routes)
      const Layout = renderLayout()
      return (
        <Route key={index} element={<Layout />}>
          {subRoutes
            .filter((item: any) => !!item.component)
            .map((it: any) => {
              const { component, path, name, isPublic } = it || {}
              // const Component = lazy(component)
              const Component = component
              return (
                Component &&
                path && (
                  <Route
                    key={name}
                    element={lazyLoad(
                      <ProtectedRoute isPublic={isPublic}>
                        <Component />
                      </ProtectedRoute>
                    )}
                    path={path}
                  />
                )
              )
            })}
        </Route>
      )
    })

    return <ReactRoutes>{layouts}</ReactRoutes>
  }
  return Routes
}

export const RenderRouter = renderRoutes(routes)
