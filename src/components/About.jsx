import { about } from '../data/content.js'
import Reveal from './Reveal.jsx'
import RevealText from './RevealText.jsx'
import SectionHead from './SectionHead.jsx'

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-24 md:py-36">
      <div className="container-x">
        <SectionHead index={2} name="About" aside="Hyderabad, India" />

        <div className="mt-12 grid grid-cols-12 gap-x-6 gap-y-12 md:mt-16">
          <RevealText as="h2" id="about-title" className="display col-span-12 text-[3rem] leading-[0.98] sm:text-6xl lg:col-span-5 lg:text-[4.75rem]">
            {about.heading[0]}
            <br />
            <em className="text-olive-ink">{about.heading[1]}</em>
          </RevealText>

          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <RevealText as="p" stagger={0.012} className="display text-[1.65rem] font-normal leading-[1.3] tracking-[-0.01em] text-charcoal md:text-[2rem]">
              {about.lead}
            </RevealText>
            <div className="mt-8 grid gap-5 text-muted md:grid-cols-2 md:gap-8">
              {about.body.map((p, i) => (
                <Reveal as="p" key={i} delay={0.08 * (i + 1)} className="text-[0.975rem] leading-relaxed">
                  {p}
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* What I do well */}
        <div className="mt-20 grid grid-cols-12 gap-x-6 md:mt-28">
          <Reveal className="col-span-12 mb-6 lg:col-span-3">
            <h3 className="label text-olive-ink">What I bring to a team</h3>
          </Reveal>
          <ol className="col-span-12 border-t border-charcoal/20 lg:col-span-9">
            {about.strengths.map((s, i) => (
              <Reveal
                as="li"
                key={s}
                delay={i * 0.05}
                className="group grid grid-cols-[3rem_1fr] items-baseline gap-4 border-b border-charcoal/20 py-5 md:grid-cols-[5rem_1fr]"
              >
                <span className="label tabular-nums text-olive-ink">0{i + 1}</span>
                <span className="display text-2xl leading-snug transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:translate-x-2 md:text-[2rem]">
                  {s}
                </span>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* Education */}
        <div className="mt-20 grid grid-cols-12 gap-x-6 gap-y-12 md:mt-28">
          <div className="col-span-12 lg:col-span-9 lg:col-start-4">
            <Reveal as="h3" className="label mb-5 text-olive-ink">
              Education
            </Reveal>
            <ul>
              {about.education.map((e, i) => (
                <Reveal as="li" key={e.award} delay={i * 0.05} className="border-t border-charcoal/20 py-4">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-medium text-charcoal">{e.award}</span>
                    <span className="label shrink-0 tabular-nums text-olive-ink">{e.years}</span>
                  </div>
                  <span className="text-sm text-muted">{e.school}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
