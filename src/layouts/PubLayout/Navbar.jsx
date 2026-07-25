import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, Video, ArrowRight } from 'lucide-react'
import Button from '../../components/common/Button'
import ThemeToggle from '../../components/common/ThemeToggle'
import { useAuth } from '../../context/AuthContext'

const links = [
  { to: '/#features', label: 'Features' },
  { to: '/#pricing', label: 'Pricing' },
  { to: '/#faq', label: 'FAQ' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 select-none ${
        scrolled
          ? 'bg-elevated/90 backdrop-blur-md border-b border-soft shadow-md'
          : 'bg-surface/80 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 font-display font-extrabold text-lg text-theme-heading">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-500 text-ink-950 shadow-md shadow-brand-500/20">
            <Video size={18} strokeWidth={2.5} />
          </span>
          <span>MeetSphere</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
          {links.map((l) => (
            <a key={l.label} href={l.to} className="text-theme-sub hover:text-brand-500 transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          {isAuthenticated ? (
            <Button size="sm" onClick={() => navigate('/app')} className="font-bold">
              dashboard <ArrowRight size={14} />
            </Button>
          ) : (
            <>
              <Button size="sm" variant="outline" to="/login" className="font-semibold">
                Sign in
              </Button>
              <Button size="sm" to="/register" className="font-bold">
                Get started
              </Button>
            </>
          )}
        </div>

        <button
          className="md:hidden p-1 text-theme-heading hover:text-brand-500 transition-colors cursor-pointer"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-soft bg-elevated px-5 py-4 flex flex-col gap-4 shadow-xl">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.to}
              onClick={() => setOpen(false)}
              className="text-sm text-theme-sub hover:text-brand-500 font-semibold"
            >
              {l.label}
            </a>
          ))}
          <div className="flex items-center gap-3 pt-2 border-t border-soft">
            <ThemeToggle />
            <Button size="sm" variant="outline" to="/login" className="flex-1 font-semibold">
              Sign in
            </Button>
            <Button size="sm" to="/register" className="flex-1 font-bold">
              Get started
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
