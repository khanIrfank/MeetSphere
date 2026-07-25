import { Link } from 'react-router-dom'

const variants = {
  primary: 'bg-brand-500 hover:bg-brand-400 text-ink-950 shadow-[0_0_0_1px_rgba(20,181,109,0.4)]',
  outline: 'border border-soft bg-transparent hover:bg-elevated text-inherit',
  ghost: 'bg-transparent hover:bg-elevated text-inherit',
  danger: 'bg-rose-500/90 hover:bg-rose-500 text-white',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3.5 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  icon: Icon,
  className = '',
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${sizes[size]} ${className}`

  const content = (
    <>
      {Icon && <Icon size={17} strokeWidth={2} />}
      {children}
    </>
  )

  if (to) return <Link to={to} className={classes}>{content}</Link>
  if (href) return <a href={href} className={classes}>{content}</a>
  return (
    <button className={classes} {...props}>
      {content}
    </button>
  )
}
