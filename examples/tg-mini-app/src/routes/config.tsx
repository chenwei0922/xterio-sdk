import { MainLayout } from 'src/components'
import Airdrop from '../pages/Airdrop'
import Home from '../pages/Home'
import { RouteConfigProps } from './routes.types'

export const routes: RouteConfigProps[] = [
  {
    // 使用函数形式，解决循环routes 和 MainLayout 循环依赖导致的Vite热更新失效的问题,见：https://github.com/vitejs/vite/issues/3033
    renderLayout: () => MainLayout,
    system: 'Main',
    showInSystemMenu: true,
    systemTitle: 'dashboard',
    routes: [
      {
        name: 'HOME',
        title: 'HOME',
        component: Home,
        path: '/',
        index: true
      },
      {
        name: 'Airdrop',
        title: 'Airdrop',
        component: Airdrop,
        path: '/airdrop'
      }
    ]
  }
]
