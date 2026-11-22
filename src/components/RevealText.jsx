import { Children, cloneElement, isValidElement } from 'react'
import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

const wordVariants = {
  hidden: { y: '115%', rotate: 3, opacity: 0 },
  show: { y: '0%', rotate: 0, opacity: 1, transition: { duration: 0.95, ease } },
}

function Word({ children }) {
  return (
    <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
      <motion.span className="inline-block origin-bottom-left will-change-transform" variants={wordVariants}>
        {children}
      </motion.span>
    </span>
  )
}

// Splits text (including text inside <em>, <span> etc.) into words that rise out of a mask.
function split(children, prefix = 'w') {
  return Children.toArray(children).flatMap((child, i) => {
    const key = `${prefix}${i}`
    if (typeof child === 'string' || typeof child === 'number') {
      return String(child)
        .split(/(\s+)/)
        .map((part, j) => (/^\s+$/.test(part) ? ' ' : part ? <Word key={`${key}-${j}`}>{part}</Word> : null))
    }
    if (isValidElement(child) && child.type !== 'br' && child.props.children) {
      return cloneElement(child, { key }, split(child.props.children, `${key}-`))
    }
    return child
  })
}

/**
 * Word-by-word reveal for headings and short paragraphs.
 * `stagger` controls the delay between words; use a smaller value for long text.
 */
export default function RevealText({ as = 'h2', stagger = 0.06, delay = 0, className, children, ...rest }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      {...rest}
    >
      {split(children)}
    </Tag>
  )
}
