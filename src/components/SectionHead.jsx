import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

// Editorial section marker: index number, name and a hairline that draws across.
export default function SectionHead({ index, name, tone = 'light', aside }) {
  const color = tone === 'dark' ? 'text-sand' : 'text-olive-ink'
  const fade = (delay) => ({
    initial: { opacity: 0, y: 10 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '0px 0px -10% 0px' },
    transition: { duration: 0.8, ease, delay },
  })
  return (
    <div className={`flex items-center gap-4 ${color}`}>
      <motion.span className="label tabular-nums" {...fade(0)}>
        ({String(index).padStart(2, '0')})
      </motion.span>
      <motion.span className="label" {...fade(0.08)}>
        {name}
      </motion.span>
      <motion.span
        className="rule flex-1 origin-left"
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 1.4, ease, delay: 0.15 }}
      />
      {aside && (
        <motion.span className="label hidden sm:inline" {...fade(0.5)}>
          {aside}
        </motion.span>
      )}
    </div>
  )
}
