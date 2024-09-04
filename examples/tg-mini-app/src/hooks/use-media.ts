import { useLayoutEffect, useState } from 'react'

const breakPointsConfig = {
  xs: '(max-width: 576px)',
  sm: '(min-width: 960px)',
  md: '(min-width: 1280px)',
  lg: '(min-width: 1440px)',
  xlg: '(min-width: 1920px)',
  xxlg: '(min-width: 2560px)'
}

type BreakPointConfig = keyof typeof breakPointsConfig
/**
 * 设备响应式hooks，
 * @param breakpoint BreakPointConfig
 * @returns
 */
export const useMedia = (breakpoint: BreakPointConfig) => {
  const [matches, setMatches] = useState(false)

  useLayoutEffect(() => {
    const media = window.matchMedia(breakPointsConfig[breakpoint])
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    const listener = () => setMatches(media.matches)
    window.addEventListener('resize', listener)
    return () => window.removeEventListener('resize', listener)
  }, [matches, breakpoint])

  return matches
}
