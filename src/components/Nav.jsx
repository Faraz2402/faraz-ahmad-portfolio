import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { nav, profile } from '../data/content.js'
import { useActiveSection } from '../hooks/useActiveSection.js'

const ids = nav.map((n) => n.id)
const ease = [0.22, 1, 0.36, 1]

// Shared pill surface: readable over both the dark hero and the ivory sections.
const pill =
  'rounded-full border border-charcoal/10 bg-ivory/80 shadow-[0_8px_30px_-12px_rgba(23,24,22,0.35)] backdrop-blur-xl'

function Availability() {
  return (
    <span className={`${pill} label hidden h-11 items-center gap-2.5 whitespace-nowrap px-5 text-olive-ink xl:inline-flex`}>
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className="absolute inset-0 animate-ping rounded-full bg-olive opacity-60 [animation-duration:2.4s]" />
        <span className="relative h-2 w-2 rounded-full bg-olive shadow-[0_0_10px_2px_rgba(115,124,100,0.6)]" />
      </span>
      Open to opportunities
    </span>
  )
}

export default function Nav() {
  const active = useActiveSection(ids)
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(null)

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const highlighted = hovered ?? active

  return (
    <>
    <motion.header
      className="fixed inset-x-0 top-0 z-50 pt-3 md:pt-4"
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease, delay: 0.2 }}
    >
      <nav className="container-x flex items-center justify-between gap-4" aria-label="Primary">
        <a
          href="#top"
          onClick={() => setOpen(false)}
          className={`${pill} label inline-flex h-11 items-center gap-2 whitespace-nowrap px-5 font-semibold text-charcoal transition-colors hover:bg-ivory`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-terracotta" aria-hidden="true" />
          Faraz Ahmad
          <span className="hidden font-medium text-muted 2xl:inline">— Personal Portfolio</span>
        </a>

        <ul
          className={`${pill} relative hidden h-11 items-center p-1 lg:flex`}
          onMouseLeave={() => setHovered(null)}
        >
          {nav.map((item) => {
            const isOn = highlighted === item.id
            return (
              <li key={item.id} className="relative">
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? 'true' : undefined}
                  onMouseEnter={() => setHovered(item.id)}
                  onFocus={() => setHovered(item.id)}
                  onBlur={() => setHovered(null)}
                  className={`label relative z-10 flex h-9 items-center whitespace-nowrap rounded-full px-4 transition-colors duration-300 xl:px-5 ${
                    isOn ? 'text-ivory' : 'text-charcoal/75 hover:text-charcoal'
                  }`}
                >
                  {item.label}
                </a>
                {isOn && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-charcoal shadow-[0_0_0_1px_rgba(184,111,82,0.35),0_0_22px_2px_rgba(184,111,82,0.45)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    aria-hidden="true"
                  />
                )}
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-3">
          <Availability />
          <button
            type="button"
            className={`${pill} flex h-11 w-11 items-center justify-center text-charcoal lg:hidden`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </nav>
    </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-ivory pt-20 lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease }}
          >
            <ul className="container-x flex flex-1 flex-col justify-center gap-1">
              {nav.map((item, i) => (
                <li key={item.id} className="overflow-hidden border-b border-charcoal/10">
                  <motion.a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between py-4"
                    initial={{ y: '100%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 0.7, delay: 0.15 + i * 0.06, ease }}
                  >
                    <span className={`display text-5xl ${active === item.id ? 'italic text-terracotta-ink' : ''}`}>
                      {item.label}
                    </span>
                    <span className="label text-olive-ink">0{i + 1}</span>
                  </motion.a>
                </li>
              ))}
            </ul>
            <div className="container-x flex items-center justify-between pb-8 pt-6">
              <span className="label inline-flex items-center gap-2 text-olive-ink">
                <span className="h-1.5 w-1.5 rounded-full bg-olive" aria-hidden="true" />
                Open to opportunities
              </span>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="label inline-flex items-center gap-1">
                LinkedIn <ArrowUpRight size={14} strokeWidth={1.5} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
