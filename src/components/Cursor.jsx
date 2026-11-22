import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// Small dot with a trailing ring. Desktop fine pointers only; off for touch and reduced motion.
export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 })
  const ry = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 })

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setEnabled(fine.matches && !reduce.matches)
    update()
    fine.addEventListener('change', update)
    reduce.addEventListener('change', update)
    return () => {
      fine.removeEventListener('change', update)
      reduce.removeEventListener('change', update)
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (!enabled) {
      root.classList.remove('has-custom-cursor')
      return
    }
    root.classList.add('has-custom-cursor')
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
      setHovering(!!e.target.closest?.('a, button, [role="button"]'))
    }
    const leave = () => setVisible(false)
    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerleave', leave)
    return () => {
      root.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', leave)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[200] mix-blend-difference" aria-hidden="true">
      <motion.div
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-[#e9e5dc]"
        style={{ x, y, translateX: '-50%', translateY: '-50%', opacity: visible ? 1 : 0 }}
      />
      <motion.div
        className="absolute left-0 top-0 rounded-full border border-[#e9e5dc]"
        style={{ x: rx, y: ry, translateX: '-50%', translateY: '-50%', opacity: visible ? 1 : 0 }}
        animate={{ width: hovering ? 56 : 30, height: hovering ? 56 : 30 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  )
}
