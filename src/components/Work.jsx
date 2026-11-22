import { projects } from '../data/content.js'
import Reveal from './Reveal.jsx'
import RevealText from './RevealText.jsx'
import SectionHead from './SectionHead.jsx'

function Step({ n, title, children }) {
  return (
    <div className="border-t border-ivory/15 pt-5">
      <p className="label flex items-center gap-3 text-sand">
        <span className="tabular-nums text-ivory/45">{n}</span>
        {title}
      </p>
      <div className="mt-3 text-[0.975rem] leading-relaxed text-ivory/80">{children}</div>
    </div>
  )
}

function Project({ p, i }) {
  return (
    <Reveal
      as="article"
      className="group relative grid grid-cols-12 gap-x-6 gap-y-10 border-t border-ivory/20 py-14 md:py-20"
      aria-labelledby={`project-${i}`}
    >
      {/* Hover rule */}
      <span
        className="absolute left-0 top-[-1px] h-px w-0 bg-terracotta transition-[width] duration-1000 ease-[var(--ease-editorial)] group-hover:w-full"
        aria-hidden="true"
      />

      <header className="col-span-12 lg:col-span-5">
        <p className="label flex items-center gap-4 text-sand">
          <span>Project {String(i + 1).padStart(2, '0')}</span>
          <span className="h-px w-8 bg-sand/50" aria-hidden="true" />
          <span className="text-ivory/60">{p.setting}</span>
        </p>
        <RevealText as="h3" id={`project-${i}`} stagger={0.05} className="display mt-6 text-4xl leading-[1] text-ivory md:text-5xl lg:text-[3.4rem]">
          {p.title}
        </RevealText>
        <div className="mt-10 lg:mt-14">
          <p className="display text-[5rem] leading-none tracking-[-0.03em] text-terracotta transition-transform duration-700 ease-[var(--ease-editorial)] group-hover:translate-x-2 md:text-[6.5rem]">
            {p.figure}
          </p>
          <p className="label mt-3 text-ivory/70">{p.figureLabel}</p>
        </div>
      </header>

      <div className="col-span-12 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
        <Step n="i" title="Business challenge">
          <p>{p.challenge}</p>
        </Step>
        <Step n="ii" title="My approach">
          <p>{p.approach}</p>
        </Step>
        <Step n="iii" title="Tools used">
          <ul className="flex flex-wrap gap-2">
            {p.tools.map((t) => (
              <li key={t} className="border border-ivory/25 px-2.5 py-1 text-sm text-ivory/85">
                {t}
              </li>
            ))}
          </ul>
        </Step>
        <Step n="iv" title="Measurable impact">
          <ul className="space-y-2">
            {p.impact.map((m) => (
              <li key={m} className="relative pl-5 text-ivory">
                <span className="absolute left-0 top-[0.75em] h-px w-2.5 bg-terracotta" aria-hidden="true" />
                {m}
              </li>
            ))}
          </ul>
        </Step>
      </div>
    </Reveal>
  )
}

export default function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="bg-charcoal py-24 text-ivory md:py-36">
      <div className="container-x">
        <SectionHead index={5} name="Selected Work & Business Impact" tone="dark" aside="Four engagements" />

        <div className="mt-12 grid grid-cols-12 gap-x-6 gap-y-6 md:mt-16">
          <RevealText as="h2" id="work-title" className="display col-span-12 text-5xl leading-[0.98] md:col-span-8 md:text-6xl lg:text-7xl">
            Real problems, <em className="text-sand">measured outcomes.</em>
          </RevealText>
          <Reveal as="p" delay={0.1} className="col-span-12 max-w-[42ch] self-end text-ivory/70 md:col-span-4">
            Every project follows the same line of reasoning: the business challenge, how I approached it, the tools
            involved and what changed as a result. Client details are kept general.
          </Reveal>
        </div>

        <div className="mt-16 md:mt-24">
          {projects.map((p, i) => (
            <Project key={p.title} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
