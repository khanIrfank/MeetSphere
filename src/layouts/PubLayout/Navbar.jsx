import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Video, ArrowRight } from 'lucide-react'
import Button from '../../components/common/Button'
import ThemeToggle from '../../components/common/ThemeToggle'
import { useAuth } from '../../context/AuthContext'

const links = [
  { to: '/#features', label: 'Features' },
  { to: '/#pricing', label: 'Pricing' },
  { to: '/#faq', label: 'FAQ' },
]

export default function Navbar() {
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
      <div className="max-w-7xl mx-auto px-3 sm:px-8 h-15 sm:h-16 flex items-center justify-between gap-1.5 sm:gap-4">
        {/* Brand Logo - Compact Icon + Optional text */}
        <Link to="/" className="flex items-center gap-1.5 sm:gap-2.5 font-display font-extrabold text-sm sm:text-lg text-theme-heading shrink-0">
          <span className="flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-lg sm:rounded-xl bg-brand-500 text-ink-950 shadow-md shadow-brand-500/20">
            <Video size={16} strokeWidth={2.5} className="sm:w-5 sm:h-5" />
          </span>
          <span className="hidden min-[400px]:inline">MeetSphere</span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
          {links.map((l) => (
            <a key={l.label} href={l.to} className="text-theme-sub hover:text-brand-500 transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons & Theme Toggle - Responsive Layout for All Mobile Screens without menu */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Responsive ThemeToggle (Compact on small mobile screens) */}
          <div className="sm:hidden">
            <ThemeToggle size="sm" />
          </div>
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>

          {isAuthenticated ? (
            <Button
              size="sm"
              onClick={() => navigate('/app')}
              className="px-2.5 py-1 text-[11px] sm:px-4 sm:py-2 sm:text-xs font-bold whitespace-nowrap shrink-0"
            >
              <span>Dashboard</span> <ArrowRight size={13} />
            </Button>
          ) : (
            <>
              <Button
                size="sm"
                variant="outline"
                to="/login"
                className="px-2.5 py-1 text-[11px] sm:px-4 sm:py-2 sm:text-xs font-semibold whitespace-nowrap shrink-0"
              >
                Sign in
              </Button>
              <Button
                size="sm"
                to="/register"
                className="px-3 py-1 text-[11px] sm:px-4 sm:py-2 sm:text-xs font-bold whitespace-nowrap shrink-0"
              >
                Get started
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
