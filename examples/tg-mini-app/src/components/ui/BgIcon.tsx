import { parseImageUrl } from 'src/common/utils'
import { Transition, TransitionType } from './Transition/Transition'

export const BgIcon = ({
  transition,
  className = '',
  imagePath = '',
  onClick
}: {
  transition?: TransitionType | undefined
  className?: string
  imagePath: string
  onClick?: () => void
}) => {
  // 字符串形式的静态资源路径必须使用 parseImageUrl 进行转化，否则打包后的路径异常
  if (transition) {
    return (
      <Transition transition={transition}>
        <div
          className={`bg-contain ${className}`}
          style={{
            backgroundImage: `url(${parseImageUrl(imagePath)})`
          }}
          onClick={onClick}
        />
      </Transition>
    )
  }

  return (
    <div
      className={`bg-contain ${className}`}
      style={{
        backgroundImage: `url(${parseImageUrl(imagePath)})`
      }}
      onClick={onClick}
    />
  )
}
