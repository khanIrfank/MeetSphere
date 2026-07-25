import { motion } from 'framer-motion'

export default function FloatingBlob({ className = '' }) {
  return (
    <motion.div
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.3, 0.5, 0.3],
        rotate: [0, 90, 0],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={`absolute rounded-full bg-brand-500/20 blur-3xl pointer-events-none ${className}`}
    />
  )
}
