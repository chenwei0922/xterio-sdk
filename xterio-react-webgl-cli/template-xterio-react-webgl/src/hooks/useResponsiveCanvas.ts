import { useEffect, useState } from 'react'

export const useResponsiveCanvas = (canvasRef: React.MutableRefObject<HTMLCanvasElement>) => {
  const [devicePixelRatio, setDevicePixelRatio] = useState(window.devicePixelRatio)

  useEffect(() => {
    const updateCanvasSize = () => {
      if (canvasRef.current) {
        canvasRef.current.style.width = window.innerWidth + 'px'
        canvasRef.current.style.height = window.innerHeight + 'px'
      }
    }

    const updateDevicePixelRatio = () => {
      setDevicePixelRatio(window.devicePixelRatio)
    }

    window.addEventListener('resize', updateCanvasSize)
    const mediaMatcher = window.matchMedia(`screen and (resolution: ${devicePixelRatio}dppx)`)
    mediaMatcher.addEventListener('change', updateDevicePixelRatio)

    updateCanvasSize()

    return () => {
      window.removeEventListener('resize', updateCanvasSize)
      mediaMatcher.removeEventListener('change', updateDevicePixelRatio)
    }
  }, [canvasRef, devicePixelRatio])

  return devicePixelRatio
}
