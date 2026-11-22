import { proficiencyScale, toolkit } from '../data/content.js'
import Reveal from './Reveal.jsx'
import RevealText from './RevealText.jsx'
import SectionHead from './SectionHead.jsx'

const levelName = Object.fromEntries(proficiencyScale.map((p) => [p.level, p.label.split(' — ')[0]]))

function Meter({ level }) {
  return (
    <span className="flex items-center gap-1" aria-hidden="true">
      {[1, 2, 3, 4].map((n) => (
        <span key={n} className={`h-1.5 w-4 ${n <= level ? 'bg-charcoal' : 'bg-charcoal/15'}`} />
      ))}
    </span>
  )
}

export default function Toolkit() {
  return (
    <section aria-labelledby="toolkit-title" className="py-24 md:py-36">
      <div className="container-x">
        <SectionHead index={6} name="Technology Toolkit" aside="Rated honestly" />

        <div className="mt-12 grid grid-cols-12 gap-x-6 gap-y-8 md:mt-16">
          <RevealText as="h2" id="toolkit-title" className="display col-span-12 text-5xl leading-[0.98] md:col-span-7 md:text-6xl">
            The tools, <em className="text-olive-ink">and how deep they go.</em>
          </RevealText>
          <Reveal className="col-span-12 self-end md:col-span-5">
            <ul className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2" aria-label="Proficiency scale">
              {proficiencyScale.map((p) => (
                <li key={p.level} className="flex items-center gap-3">
                  <Meter level={p.level} />
                  <span className="text-[0.8125rem] leading-snug text-muted">{p.label}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 md:mt-20 md:grid-cols-2 lg:grid-cols-3">
          {toolkit.map((g, gi) => (
            <Reveal key={g.group} delay={(gi % 3) * 0.06}>
              <h3 className="label border-b border-charcoal pb-3 text-charcoal">{g.group}</h3>
              <ul>
                {g.items.map((item) => (
                  <li key={item.name} className="flex items-center justify-between gap-4 border-b border-charcoal/15 py-4">
                    <span>
                      <span className="display text-[1.6rem] leading-none">{item.name}</span>
                      {item.note && <span className="ml-2 text-sm text-muted">({item.note})</span>}
                    </span>
                    <span className="flex shrink-0 items-center">
                      <span className="sr-only">Proficiency: {levelName[item.level]}</span>
                      <Meter level={item.level} />
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
