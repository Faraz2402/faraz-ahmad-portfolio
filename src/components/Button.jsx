// Text-led button with a fill that slides in on hover. Renders as a link.
const variants = {
  solid: 'bg-charcoal text-ivory border-charcoal',
  outline: 'bg-transparent text-charcoal border-charcoal/35 hover:border-charcoal',
  light: 'bg-ivory text-ink border-ivory',
  ghostDark: 'bg-transparent text-ivory border-ivory/30 hover:border-ivory',
}
const fills = {
  solid: 'bg-terracotta',
  outline: 'bg-charcoal',
  light: 'bg-sand',
  ghostDark: 'bg-ivory',
}
const hoverText = {
  solid: 'group-hover:text-ivory',
  outline: 'group-hover:text-ivory',
  light: 'group-hover:text-ink',
  ghostDark: 'group-hover:text-ink',
}

export default function Button({ href, variant = 'solid', icon: Icon, children, className = '', ...rest }) {
  return (
    <a
      href={href}
      className={`group relative inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden border px-6 py-3 transition-colors duration-500 ${variants[variant]} ${className}`}
      {...rest}
    >
      <span
        className={`absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:scale-x-100 ${fills[variant]}`}
        aria-hidden="true"
      />
      <span className={`label relative transition-colors duration-500 ${hoverText[variant]}`}>{children}</span>
      {Icon && (
        <Icon
          size={15}
          strokeWidth={1.5}
          aria-hidden="true"
          className={`relative transition-[transform,color] duration-500 group-hover:translate-x-0.5 ${hoverText[variant]}`}
        />
      )}
    </a>
  )
}
