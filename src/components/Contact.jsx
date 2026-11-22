import { ArrowUpRight, Download, Mail } from 'lucide-react'
import { profile } from '../data/content.js'
import Button from './Button.jsx'
import Reveal from './Reveal.jsx'
import RevealText from './RevealText.jsx'
import SectionHead from './SectionHead.jsx'

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-ink py-24 text-ivory md:py-36">
      <div className="container-x">
        <SectionHead index={8} name="Contact" tone="dark" aside={profile.location} />

        <RevealText
          as="h2"
          id="contact-title"
          className="display mt-14 text-[2.6rem] leading-[0.95] tracking-[-0.04em] sm:text-6xl md:mt-20 md:text-[5.5rem] xl:text-[7rem]"
        >
          Let’s make better
          <br />
          <em className="text-sand">business decisions.</em>
        </RevealText>

        <div className="mt-14 grid grid-cols-12 gap-x-6 gap-y-12 md:mt-20">
          <Reveal className="col-span-12 md:col-span-5">
            <p className="max-w-[40ch] text-lg leading-relaxed text-ivory/80">
              Interested in procurement analytics, business intelligence, business analysis or transformation
              opportunities? Let’s connect.
            </p>
            <p className="label mt-8 inline-flex items-center gap-3 border border-sage/40 px-3 py-2 text-sage">
              <span className="h-1.5 w-1.5 rounded-full bg-sage" aria-hidden="true" />
              Available for suitable full-time roles
            </p>
          </Reveal>

          <Reveal delay={0.1} className="col-span-12 md:col-span-7 lg:col-span-6 lg:col-start-7">
            <dl className="border-t border-ivory/20">
              <div className="flex flex-col gap-1 border-b border-ivory/20 py-5 sm:flex-row sm:items-baseline sm:justify-between">
                <dt className="label text-ivory/60">Email</dt>
                <dd>
                  <a href={`mailto:${profile.email}`} className="display link-draw break-all text-2xl md:text-3xl">
                    {profile.email}
                  </a>
                </dd>
              </div>
              <div className="flex flex-col gap-1 border-b border-ivory/20 py-5 sm:flex-row sm:items-baseline sm:justify-between">
                <dt className="label text-ivory/60">LinkedIn</dt>
                <dd>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="display link-draw inline-flex items-center gap-2 text-2xl md:text-3xl"
                  >
                    {profile.linkedinHandle}
                    <ArrowUpRight size={20} strokeWidth={1.25} aria-hidden="true" />
                  </a>
                </dd>
              </div>
            </dl>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button href={profile.contactMailto} variant="light" icon={Mail}>
                Contact me
              </Button>
              <Button href={profile.resume} download={profile.resumeFileName} variant="ghostDark" icon={Download}>
                Download resume
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
