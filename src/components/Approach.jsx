import { principles } from '../data/content.js'
import Reveal from './Reveal.jsx'
import RevealText from './RevealText.jsx'
import SectionHead from './SectionHead.jsx'

const numerals = ['I', 'II', 'III']

export default function Approach() {
  return (
    <section aria-labelledby="approach-title" className="bg-stone py-24 md:py-36">
      <div className="container-x">
        <SectionHead index={7} name="Professional Approach" aside="Three working principles" />

        <RevealText
          as="h2"
          id="approach-title"
          className="display mt-12 max-w-[18ch] text-5xl leading-[0.98] md:mt-16 md:text-6xl lg:text-[5.5rem]"
        >
          Making complex business information <em className="text-olive-ink">easier to act on.</em>
        </RevealText>

        <ol className="mt-16 md:mt-24">
          {principles.map((p, i) => (
            <Reveal
              as="li"
              key={p.title}
              className="grid grid-cols-12 gap-x-6 gap-y-4 border-t border-charcoal/25 py-10 md:py-14"
            >
              <span className="display col-span-12 text-6xl italic leading-none text-terracotta md:col-span-2 md:text-7xl">
                {numerals[i]}
              </span>
              <RevealText as="h3" stagger={0.035} className="display col-span-12 text-3xl leading-[1.08] md:col-span-6 md:text-[2.6rem]">
                {p.title}
              </RevealText>
              <p className="col-span-12 max-w-[44ch] text-muted md:col-span-4 md:pt-2">{p.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
