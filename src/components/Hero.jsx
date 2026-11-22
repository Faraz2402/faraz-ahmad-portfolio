import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Download } from 'lucide-react'
import { hero, profile } from '../data/content.js'
import Button from './Button.jsx'

const ease = [0.22, 1, 0.36, 1]

// One line of the oversized name: each letter rises straight up out of a mask from below,
// staggered left to right, then lifts and warms to terracotta on hover.
function NameLine({ children, delay }) {
  return (
    <div className="overflow-hidden">
      <motion.div
        className="hero-name flex justify-center"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: delay } } }}
      >
        {[...children].map((ch, i) => (
          <motion.span
            key={i}
            className="inline-block"
            variants={{
              hidden: { y: '115%' },
              show: { y: '0%', transition: { duration: 1.2, ease } },
            }}
          >
            <motion.span
              className="inline-block"
              whileHover={{ y: '-8%', color: '#b86f52' }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            >
              {ch}
            </motion.span>
          </motion.span>
        ))}
      </motion.div>
    </div>
  )
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '6%'])
  const backY = useTransform(scrollYProgress, [0, 1], ['0%', '-25%'])
  const frontY = useTransform(scrollYProgress, [0, 1], ['0%', '-45%'])

  return (
    <section
      id="top"
      ref={ref}
      className="hero-scale relative overflow-hidden bg-ink pb-24 pt-28 text-ivory md:pb-32 md:pt-24"
      aria-labelledby="hero-name"
    >
      <h1 id="hero-name" className="sr-only">
        Faraz Ahmad — {profile.descriptor.join(', ')}
      </h1>

      <motion.p
        className="label relative z-30 text-center text-terracotta"
        initial={{ opacity: 0, y: 10, letterSpacing: '0.4em' }}
        animate={{ opacity: 1, y: 0, letterSpacing: '0.16em' }}
        transition={{ duration: 1.2, ease, delay: 0.1 }}
      >
        <span className="hidden sm:inline">{profile.descriptor.join(' · ')}</span>
        <span className="sm:hidden">Procurement · Analytics · BI</span>
      </motion.p>

      {/* Name / portrait stack: first name behind, portrait in the middle, last name in front */}
      <div className="relative mt-5 md:mt-4" aria-hidden="true">
        <motion.div className="relative z-0" style={{ y: backY }}>
          <NameLine delay={0.2}>FARAZ</NameLine>
        </motion.div>

        <motion.div
          className="hero-photo relative z-10 mx-auto"
          initial={{ opacity: 0, y: 40, scale: 1.06 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.4, ease, delay: 0.4 }}
        >
          <motion.img
            src={profile.portraitCutout}
            alt=""
            width="1655"
            height="2206"
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-contain object-bottom [mask-image:linear-gradient(to_bottom,black_70%,transparent_97%)]"
            style={{ y: imgY }}
          />
        </motion.div>

        <motion.div className="hero-front relative z-20" style={{ y: frontY }}>
          <NameLine delay={0.35}>AHMAD</NameLine>
        </motion.div>
      </div>

      {/* Headline, copy and CTAs */}
      <div className="container-x relative z-30 mt-10 md:mt-12">
        <motion.div
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease, delay: 0.9 }}
        >
          <p className="display text-[2.3rem] leading-[1.02] sm:text-5xl lg:text-[3.6rem]">
            Turning procurement data into <em className="text-sand">business decisions.</em>
          </p>
          <p className="mt-6 max-w-[54ch] text-[1.0625rem] leading-relaxed text-ivory/70">{hero.copy}</p>

          <div className="mt-9 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <Button href="#work" variant="light" icon={ArrowDown}>
              Explore my work
            </Button>
            <Button href={profile.resume} download={profile.resumeFileName} variant="ghostDark" icon={Download}>
              Download resume
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-ivory/80">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="label link-draw inline-flex items-center gap-1 pb-0.5 hover:text-ivory"
            >
              LinkedIn <ArrowUpRight size={13} strokeWidth={1.5} aria-hidden="true" />
            </a>
            <a href={`mailto:${profile.email}`} className="label link-draw pb-0.5 normal-case tracking-[0.04em] hover:text-ivory">
              {profile.email}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
