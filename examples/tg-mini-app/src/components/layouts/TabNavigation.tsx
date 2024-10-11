import classNames from 'classnames'
import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTelegram } from 'src/hooks'
const NavigationItems = [
  { name: 'HOME', path: '/' },
  { name: 'TON CONNECT', path: '/airdrop' },
  { name: 'OKX EVM', path: '/okx' }
]

export const TabNavigation = () => {
  const { tgHaptic } = useTelegram()

  const location = useLocation()
  const navigate = useNavigate()
  const pathname = location.pathname
  const isActive = (path) => pathname === path
  const { webApp } = useTelegram()

  useEffect(() => {
    if (webApp) {
      webApp.BackButton?.onClick(() => {
        navigate(-1)
      })
    }
  }, [])

  useEffect(() => {
    if (pathname !== '/' && webApp) {
      webApp.BackButton?.show()
    } else {
      webApp.BackButton?.hide()
    }
  }, [pathname])

  return (
    <div className="fixed bottom-0 left-0 right-0 h-15 px-3 pb-2 pt-2 mx-auto">
      <div className="z-1 relative flex items-end justify-center gap-3 mx-auto">
        {NavigationItems.map((item) => {
          const _isActive = isActive(item.path)
          return (
            <Link
              key={item.name}
              to={item.path}
              className={classNames(
                'text-cente flex min-w-24 origin-bottom flex-col items-center justify-center rounded-lg bg-blue-700 px-3 py-3 text-white',
                {
                  '!bg-red-500': _isActive
                }
              )}
              onClick={tgHaptic}
            >
              <span className="mt-0.5 text-xs font-bold !leading-none">{item.name}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
