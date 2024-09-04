interface TitleProps {
  className?: string
  children?: React.ReactNode
  onClick?: any
}
export const Title: React.FC<TitleProps> = ({ className = '', children, onClick }) => {
  return (
    <div className={`text-base font-semibold text-black ${className}`} onClick={onClick}>
      {children}
    </div>
  )
}
