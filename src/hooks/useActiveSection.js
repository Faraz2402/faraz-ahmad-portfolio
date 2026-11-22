import { useEffect, useState } from 'react'

// Returns the id of the section currently crossing the upper third of the viewport, or null.
export function useActiveSection(ids) {
  const [active, setActive] = useState(null)

  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!els.length) return
    const visible = new Set()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        })
        // Pick the last section (in document order) inside the band, or none.
        const current = ids.filter((id) => visible.has(id)).pop() ?? null
        setActive(current)
      },
      { rootMargin: '-35% 0px -60% 0px' },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return active
}
