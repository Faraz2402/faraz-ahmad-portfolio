import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Snapshot from './components/Snapshot.jsx'
import About from './components/About.jsx'
import Experience from './components/Experience.jsx'
import Expertise from './components/Expertise.jsx'
import Work from './components/Work.jsx'
import Toolkit from './components/Toolkit.jsx'
import Approach from './components/Approach.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import Cursor from './components/Cursor.jsx'

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="label sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-charcoal focus:px-4 focus:py-3 focus:text-ivory"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Snapshot />
        <About />
        <Experience />
        <Expertise />
        <Work />
        <Toolkit />
        <Approach />
        <Contact />
      </main>
      <Footer />
      <Cursor />
    </>
  )
}
