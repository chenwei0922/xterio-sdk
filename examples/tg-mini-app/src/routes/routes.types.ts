export interface RouteConfigProps {
  /**
   * 路由路径
   */
  path?: string
  /**
   * 当前子模块对应的Layout,函数形式
   */
  renderLayout?: (() => React.FC) | (() => () => JSX.Element)
  /**
   * 子系统 key
   */
  system?: string
  /**
   * 子系统名称，用于显示在总菜单上
   */
  systemTitle?: string
  /**
   * 是否要显示子系统入口
   */
  showInSystemMenu?: boolean
  /**
   * 当前路由名称
   */
  name?: string
  /**
   * 当前路由显示名称
   */
  title?: string
  /**
   * 是否是根路由
   */
  index?: boolean
  /**
   * 是否公开路由，不需要校验用户登录状态
   */
  isPublic?: boolean
  /**
   * 是否在子系统左侧子菜单显示入口
   */
  showInSideMenu?: boolean
  icon?: React.ReactElement
  /**
   * 当前路由对应的组件
   */
  component?: () => Promise<any> | React.ReactElement
  /**
   * 当前路由下的子路由
   */
  routes?: RouteConfigProps[]
  /**
   * 隐藏菜单, 账号区域级别
   */
  hideSideMenu?: string[]
}
