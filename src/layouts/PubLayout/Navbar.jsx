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
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-2">
        {/* Brand Logo - Shows only icon on mobile (< sm), shows full text on sm+ */}
        <Link to="/" className="flex items-center gap-2.5 font-display font-extrabold text-lg text-theme-heading shrink-0">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 text-ink-950 shadow-md shadow-brand-500/20">
            <Video size={19} strokeWidth={2.5} />
          </span>
          <span className="hidden sm:inline">MeetSphere</span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
          {links.map((l) => (
            <a key={l.label} href={l.to} className="text-theme-sub hover:text-brand-500 transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        {/* Desktop Action Buttons & Theme Toggle */}
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

        {/* Mobile Hamburger Menu Toggle Button */}
        <button
          className="md:hidden p-2 rounded-xl bg-elevated/80 text-theme-heading hover:text-brand-500 border border-soft transition-colors cursor-pointer"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {open && (
        <div className="md:hidden border-t border-soft bg-elevated px-5 py-4 flex flex-col gap-4 shadow-2xl animate-fade-up">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.to}
              onClick={() => setOpen(false)}
              className="text-sm text-theme-sub hover:text-brand-500 font-semibold py-1"
            >
              {l.label}
            </a>
          ))}
          <div className="flex flex-col gap-3 pt-3 border-t border-soft">
            <div className="flex items-center justify-between text-xs text-theme-sub font-semibold">
              <span>Theme Preference</span>
              <ThemeToggle />
            </div>

            {isAuthenticated ? (
              <Button size="sm" onClick={() => { setOpen(false); navigate('/app') }} className="w-full font-bold justify-center">
                Go to Dashboard <ArrowRight size={14} />
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" to="/login" onClick={() => setOpen(false)} className="flex-1 font-semibold justify-center">
                  Sign in
                </Button>
                <Button size="sm" to="/register" onClick={() => setOpen(false)} className="flex-1 font-bold justify-center">
                  Get started
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
