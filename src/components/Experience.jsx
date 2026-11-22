import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { experience } from '../data/content.js'
import Reveal from './Reveal.jsx'
import RevealText from './RevealText.jsx'
import SectionHead from './SectionHead.jsx'

function Role({ job, index }) {
  const compact = index >= 3
  return (
    <li className="relative grid grid-cols-[1.25rem_1fr] gap-x-5 pb-14 md:grid-cols-[9rem_1.25rem_1fr] md:gap-x-8 md:pb-20 last:pb-0">
      {/* Period (desktop) */}
      <Reveal className="hidden pt-2 text-right md:block" y={12}>
        <span className="label block tabular-nums text-charcoal">{job.period.split(' – ')[0]}</span>
        <span className="label mt-1 block tabular-nums text-olive-ink">— {job.period.split(' – ')[1]}</span>
      </Reveal>

      {/* Node */}
      <div className="relative flex justify-center pt-3" aria-hidden="true">
        <span
          className={`relative z-10 block h-2.5 w-2.5 rounded-full ring-4 ring-ivory ${
            index === 0 ? 'bg-terracotta' : compact ? 'border border-charcoal/50 bg-ivory' : 'bg-charcoal'
          }`}
        />
      </div>

      <Reveal>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <RevealText as="h3" stagger={0.05} className={`display ${compact ? 'text-3xl md:text-4xl' : 'text-4xl md:text-[3.25rem]'}`}>
            {job.company}
          </RevealText>
          {job.status && (
            <span className="label border border-olive-ink/50 px-2 py-1 text-olive-ink">{job.status}</span>
          )}
        </div>
        <p className="mt-2 flex flex-wrap gap-x-3 text-charcoal">
          <span className="font-medium">{job.role}</span>
          <span className="text-muted">· {job.location}</span>
          <span className="label self-center tabular-nums text-olive-ink md:hidden">{job.period}</span>
        </p>
        {job.client && (
          <p className="label mt-3 text-olive-ink">
            Client <span className="ml-2 normal-case tracking-normal text-[0.95rem] font-normal italic text-muted">{job.client}</span>
          </p>
        )}

        <ul className="mt-5 max-w-[68ch] space-y-2.5">
          {job.points.map((p) => (
            <li key={p} className="relative pl-5 text-[0.975rem] leading-relaxed text-muted">
              <span className="absolute left-0 top-[0.75em] h-px w-2.5 bg-terracotta" aria-hidden="true" />
              {p}
            </li>
          ))}
        </ul>

        <p className="mt-5 flex flex-wrap gap-x-2 gap-y-1">
          {job.tools.map((t, i) => (
            <span key={t} className="label text-olive-ink">
              {t}
              {i < job.tools.length - 1 && <span className="ml-2 text-charcoal/30">/</span>}
            </span>
          ))}
        </p>
      </Reveal>
    </li>
  )
}

export default function Experience() {
  const listRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 70%', 'end 70%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 25, mass: 0.4 })

  return (
    <section id="experience" aria-labelledby="experience-title" className="border-t border-charcoal/10 bg-paper py-24 md:py-36">
      <div className="container-x">
        <SectionHead index={3} name="Experience" aside="~9 years · 2016 — 2026" />

        <div className="mt-12 grid grid-cols-12 gap-x-6 gap-y-14 md:mt-16">
          <div className="col-span-12 lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <RevealText as="h2" id="experience-title" className="display text-5xl leading-[0.98] md:text-6xl">
                A career built <em className="text-olive-ink">from the numbers up.</em>
              </RevealText>
              <Reveal as="p" delay={0.1} className="mt-6 max-w-[38ch] text-muted">
                From data analysis and accounts to the procurement desk and enterprise spend analytics — each role added
                a layer of how organisations buy, pay and govern their suppliers.
              </Reveal>
            </div>
          </div>

          <div className="relative col-span-12 lg:col-span-8">
            {/* Timeline spine */}
            <div
              className="absolute bottom-0 left-[0.625rem] top-3 w-px bg-charcoal/15 md:left-[calc(9rem+2rem+0.625rem)]"
              aria-hidden="true"
            >
              <motion.div className="h-full w-full origin-top bg-charcoal/60" style={{ scaleY: progress }} />
            </div>
            <ol ref={listRef}>
              {experience.map((job, i) => (
                <Role key={job.company} job={job} index={i} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
