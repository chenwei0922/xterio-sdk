import { useEffect, useState } from 'react'
import styles from './index.module.css'
export const SplashLoading = ({
  percentage = 0,
  loaded = false
}: {
  percentage: number
  loaded: boolean
}) => {
  const [dismiss, setDismiss] = useState(false)

  const _percentage = ((percentage ?? 0) * 100).toFixed(1)

  useEffect(() => {
    let t: any
    if (Number(_percentage) >= 100) {
      t = setTimeout(() => {
        setDismiss(true)
      }, 1000)
    }

    return () => {
      clearTimeout(t)
    }
  }, [_percentage])

  if (dismiss && loaded) {
    return null
  }

  return (
    <div className={styles.splash_container}>
      <div className={styles.progress}>
        <div className={styles.progress_text}>
          <span>Loading</span>
          <span>
            &nbsp;
            {Number(percentage) === 100 ? 100 : _percentage}%
          </span>
        </div>
        <div className={styles.progress_bar}>
          <div className={styles.progress_bar_inner} style={{ width: `${_percentage}%` }}></div>
        </div>
      </div>
    </div>
  )
}
