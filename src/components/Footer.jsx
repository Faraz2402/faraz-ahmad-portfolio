import { ArrowUp } from 'lucide-react'
import { profile } from '../data/content.js'

export default function Footer() {
  return (
    <footer className="bg-ink text-ivory/70">
      <div className="container-x">
        <div className="flex flex-col gap-6 border-t border-ivory/15 py-8 md:flex-row md:items-center md:justify-between">
          <p className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
            <span className="label text-ivory">Faraz Ahmad</span>
            <span className="label">Senior Business Analyst — Procurement &amp; Spend Analytics</span>
          </p>
          <ul className="flex flex-wrap items-center gap-x-7 gap-y-3">
            <li>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="label link-draw pb-0.5 hover:text-ivory">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={`mailto:${profile.email}`} className="label link-draw pb-0.5 hover:text-ivory">
                Email
              </a>
            </li>
            <li className="label">© {new Date().getFullYear()}</li>
            <li>
              <a href="#top" className="label inline-flex items-center gap-2 hover:text-ivory">
                Back to top <ArrowUp size={13} strokeWidth={1.5} aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
