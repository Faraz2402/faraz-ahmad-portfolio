import { expertise } from '../data/content.js'
import Reveal from './Reveal.jsx'
import RevealText from './RevealText.jsx'
import SectionHead from './SectionHead.jsx'

// Each area gets its own treatment so the grid reads as an editorial spread, not a row of identical cards.
const treatments = [
  { span: 'lg:col-span-7 lg:row-span-2', box: 'bg-charcoal text-ivory', sub: 'text-ivory/70', tag: 'text-sand', size: 'text-5xl md:text-6xl', minH: 'min-h-[22rem] lg:min-h-[30rem]' },
  { span: 'lg:col-span-5', box: 'bg-stone text-charcoal', sub: 'text-muted', tag: 'text-olive-ink', size: 'text-4xl', minH: 'min-h-[15rem]' },
  { span: 'lg:col-span-5', box: 'border border-charcoal/25 text-charcoal', sub: 'text-muted', tag: 'text-olive-ink', size: 'text-4xl', minH: 'min-h-[15rem]' },
  { span: 'lg:col-span-4', box: 'bg-sand/55 text-charcoal', sub: 'text-charcoal/75', tag: 'text-charcoal', size: 'text-4xl', minH: 'min-h-[16rem]' },
  { span: 'lg:col-span-4', box: 'bg-sage/45 text-charcoal', sub: 'text-charcoal/75', tag: 'text-charcoal', size: 'text-4xl', minH: 'min-h-[16rem]' },
  { span: 'lg:col-span-4', box: 'bg-olive-ink text-ivory', sub: 'text-ivory/90', tag: 'text-ivory', size: 'text-4xl', minH: 'min-h-[16rem]' },
]

export default function Expertise() {
  return (
    <section id="expertise" aria-labelledby="expertise-title" className="py-24 md:py-36">
      <div className="container-x">
        <SectionHead index={4} name="Areas of Expertise" aside="Commercial × Analytical" />

        <div className="mt-12 grid grid-cols-12 gap-x-6 gap-y-6 md:mt-16">
          <RevealText as="h2" id="expertise-title" className="display col-span-12 text-5xl leading-[0.98] md:col-span-8 md:text-6xl lg:text-7xl">
            Where procurement <em className="text-olive-ink">meets the data behind it.</em>
          </RevealText>
          <Reveal as="p" delay={0.1} className="col-span-12 max-w-[40ch] self-end text-muted md:col-span-4">
            Six areas I work in every week — the commercial side of buying and the analytical side of seeing it clearly.
          </Reveal>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-3 md:mt-20 md:grid-cols-2 lg:grid-cols-12 lg:gap-4">
          {expertise.map((area, i) => {
            const t = treatments[i]
            return (
              <Reveal
                as="li"
                key={area.title}
                delay={(i % 3) * 0.06}
                className={`group relative flex flex-col justify-between overflow-hidden p-7 md:p-9 ${t.box} ${t.span} ${t.minH} ${
                  i === 0 ? 'md:col-span-2' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-6">
                  <span className={`label tabular-nums ${t.tag}`}>{String(i + 1).padStart(2, '0')}</span>
                  <span
                    className="mt-[0.45rem] h-px w-8 bg-current opacity-50 transition-all duration-700 ease-[var(--ease-editorial)] group-hover:w-24 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </div>

                <div className="mt-12">
                  <h3 className={`display ${t.size} leading-[1] transition-transform duration-700 ease-[var(--ease-editorial)] group-hover:-translate-y-1`}>
                    {area.title}
                  </h3>
                  <p className={`mt-4 max-w-[38ch] text-[0.975rem] leading-relaxed ${t.sub}`}>{area.text}</p>
                  <p className="mt-6 flex flex-wrap gap-x-4 gap-y-1">
                    {area.tags.map((tag) => (
                      <span key={tag} className={`label ${t.tag}`}>
                        {tag}
                      </span>
                    ))}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
