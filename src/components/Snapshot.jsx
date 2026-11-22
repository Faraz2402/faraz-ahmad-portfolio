import { stats } from '../data/content.js'
import CountUp from './CountUp.jsx'
import Reveal from './Reveal.jsx'
import RevealText from './RevealText.jsx'
import SectionHead from './SectionHead.jsx'

export default function Snapshot() {
  return (
    <section aria-labelledby="snapshot-title" className="bg-stone py-20 md:py-28">
      <div className="container-x">
        <SectionHead index={1} name="Professional Snapshot" aside="Figures from delivered work" />

        <div className="mt-10 grid grid-cols-12 gap-x-6 md:mt-14">
          <RevealText as="h2" id="snapshot-title" className="display col-span-12 text-4xl leading-[1.05] md:col-span-7 md:text-[3.25rem]">
            Nine years of work, <em className="text-olive-ink">measured by what it made visible.</em>
          </RevealText>
          <Reveal delay={0.1} className="col-span-12 mt-6 max-w-[42ch] text-muted md:col-span-4 md:col-start-9 md:mt-2">
            <p>
              Each figure below comes from a specific engagement — the scale of the data I worked with, and the
              decision it was meant to support.
            </p>
          </Reveal>
        </div>

        <dl className="mt-14 grid grid-cols-1 border-t border-charcoal/20 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.08}
              className={`flex flex-col border-b border-charcoal/20 py-8 sm:px-6 sm:first:pl-0 lg:border-b-0 lg:py-10 lg:pl-6 lg:first:pl-0 ${
                i % 2 === 1 ? 'sm:border-l' : ''
              } ${i > 0 ? 'lg:border-l' : ''}`}
            >
              <dt className="order-2 mt-4">
                <span className="label block text-charcoal">{s.label}</span>
                <span className="mt-3 block max-w-[32ch] text-[0.9375rem] leading-relaxed text-muted">{s.context}</span>
              </dt>
              <dd className="display order-1 text-[4.5rem] leading-none tracking-[-0.03em] tabular-nums text-charcoal sm:text-[5rem] xl:text-[6rem]">
                <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
