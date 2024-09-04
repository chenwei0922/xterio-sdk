import React, { CSSProperties } from 'react'
import styles from './index.module.scss'

type SizeType = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xlg'

interface SvgIconProps {
  iconName: string
  className?: string
  color?: string
  style?: CSSProperties | undefined
  size?: SizeType | number | string
  clickable?: boolean
}
const SvgIcon: React.FC<SvgIconProps> = ({
  iconName,
  className = '',
  style = undefined,
  color,
  size = 'sm', // size 支持预定义类型传字符串如： size="sm"、size="md"，也支持自定义像素大小传number类型如：size={20}
  clickable = false
}) => {
  const isCustomSize = typeof size === 'number' || size.includes('px') || size.includes('rem')
  style = isCustomSize ? { ...style, fontSize: size } : style
  return (
    <svg
      className={`${styles.root} ${!isCustomSize ? styles[size] : ''} ${
        clickable ? styles.clickable : ''
      } ${className}`}
      aria-hidden="true"
      color={color}
      style={style}
    >
      {/* icon-icon-name 传入的name必须和文件名一致 */}
      <use xlinkHref={`#icon-${iconName}`} />
    </svg>
  )
}

const MemoSvgIcon = React.memo(SvgIcon)

export { MemoSvgIcon }
