import flattenDeep from 'lodash/flattenDeep'
import { useMemo } from 'react'
import { routes } from './config'

/**
 * 根据当前路由查找当前所属子系统
 * @param path
 * @returns
 */
export const getPathSystem = (path: string) => {
  let _system = null
  const findSystem = (routes, parentSystem) => {
    for (const item of routes) {
      if (item?.path && path === item.path) {
        _system = item.system || parentSystem
        return _system
      } else if (item?.routes?.length > 0) {
        findSystem(item.routes, item.system ? item.system : parentSystem)
      }
    }
  }

  findSystem(routes, null)
  return _system
}

export const generateFlattenRoutes = (routes) => {
  if (!routes) return []
  return flattenDeep(routes.map(({ routes: subRoutes, ...rest }) => [rest, generateFlattenRoutes(subRoutes)]))
}

export const useSystemRoutes = (path) => {
  const filterSystem = useMemo(() => {
    const system = getPathSystem(path)
    return routes.find((item) => item.system === system)
  }, [path])
  return { routes: filterSystem?.routes }
}
