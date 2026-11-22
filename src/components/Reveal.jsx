import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

// Fade-in-up with a light blur that resolves to sharp as the element scrolls into view.
export default function Reveal({ as = 'div', delay = 0, y = 28, className, children, ...rest }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1, ease, delay }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
