interface CardProps {
  className?: string
  children?: React.ReactNode
  onClick?: any
}
export const Card: React.FC<CardProps> = ({ className = '', children, onClick }) => {
  return (
    <div className={`rounded-md bg-card px-4 py-2.5 ${className}`} onClick={onClick}>
      {children}
    </div>
  )
}
