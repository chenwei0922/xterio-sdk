import classNames from 'classnames'
import { motion } from 'framer-motion'

export type TransitionType =
  | 'leftIn'
  | 'rightIn'
  | 'topIn'
  | 'bottomIn'
  | 'fadeIn'
  | 'fadeOut'
  | 'scaleIn'
  | 'scaleOut'
  | 'slideIn'
  | 'slideOut'
  | 'none'
export interface TransitionProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode
  className?: string
  delay?: number
  transition?: TransitionType
}

const transitionMap = {
  leftIn: {
    initial: { opacity: 0, x: -10 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 10 }
  },
  rightIn: {
    initial: { opacity: 0, x: 10 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -10 }
  },
  topIn: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
  },
  bottomIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  fadeOut: {
    initial: { opacity: 1 },
    animate: { opacity: 0 },
    exit: { opacity: 1 }
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 }
  },
  scaleOut: {
    initial: { opacity: 1, scale: 1 },
    animate: { opacity: 0, scale: 0.9 },
    exit: { opacity: 1, scale: 1 }
  },
  slideIn: {
    initial: { opacity: 0, x: 10 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -10 }
  },
  slideOut: {
    initial: { opacity: 1, x: 0 },
    animate: { opacity: 0, x: 10 },
    exit: { opacity: 1, x: 0 }
  },
  none: {
    initial: { opacity: 1 },
    animate: { opacity: 1 },
    exit: { opacity: 1 }
  }
}
export const Transition: React.FC<TransitionProps> = ({ transition, delay = 0.15, children, className = '' }) => {
  const transitionVariants = transition ? transitionMap[transition] : {}
  return (
    <motion.div
      className={classNames(className)}
      {...transitionVariants}
      transition={{ delay: delay, duration: 0.5, type: 'spring', bounce: 0.6 }}
    >
      {children}
    </motion.div>
  )
}
