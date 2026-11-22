import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

// Restrained number animation that runs once when the figure enters the viewport.
export default function CountUp({ value, prefix = '', suffix = '', duration = 1600 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(reduce ? value : 0)

  useEffect(() => {
    if (!inView || reduce) {
      if (reduce) setDisplay(value)
      return
    }
    let frame
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 4)
      setDisplay(Math.round(eased * value))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, reduce, value, duration])

  return (
    <span ref={ref} aria-label={`${prefix}${value}${suffix}`}>
      <span aria-hidden="true">
        {prefix}
        {display.toLocaleString('en-GB')}
        {suffix}
      </span>
    </span>
  )
}
