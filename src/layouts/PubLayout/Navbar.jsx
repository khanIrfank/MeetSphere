import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Video, ArrowRight } from 'lucide-react'
import Button from '../../components/common/Button'
import ThemeToggle from '../../components/common/ThemeToggle'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'

const links = [
  { to: '/#features', label: 'Features' },
  { to: '/#pricing', label: 'Pricing' },
  { to: '/#faq', label: 'FAQ' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { isAuthenticated } = useAuth()
  const { theme } = useTheme()
  const isLight = theme === 'light'
  const navigate = useNavigate()
  const headerRef = useRef(null)

  useEffect(() => {
    const getScrollY = () => {
      const root = document.getElementById('root')
      return window.scrollY
        || document.documentElement.scrollTop
        || document.body.scrollTop
        || (root ? root.scrollTop : 0)
        || 0
    }

    const onScroll = () => setScrolled(getScrollY() > 10)

    // Listen on all possible scroll containers
    const root = document.getElementById('root')
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('scroll', onScroll, { passive: true })
    if (root) root.addEventListener('scroll', onScroll, { passive: true })

    setScrolled(getScrollY() > 10)

    return () => {
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('scroll', onScroll)
      if (root) root.removeEventListener('scroll', onScroll)
    }
  }, [])

  // When scrolled: white bg in light theme, deep dark in dark theme
  const scrolledBg = isLight ? '#ffffff' : '#06120d'
  const scrolledBorder = isLight ? 'rgba(10,40,25,0.12)' : 'rgba(255,255,255,0.07)'
  const scrolledText = isLight ? '#0a1712' : '#eafff3'
  const scrolledMuted = isLight ? '#3b5c4e' : '#9db8ac'


  const navStyle = scrolled
    ? { backgroundColor: scrolledBg, borderColor: scrolledBorder }
    : { backgroundColor: 'var(--hero-bg-top)', borderColor: 'rgba(255,255,255,0.1)' }

  return (
    <header
      ref={headerRef}
      style={navStyle}
      className={`sticky top-0 z-50 select-none border-b transition-all duration-300 ${
        scrolled ? 'shadow-lg' : 'shadow-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 sm:h-18 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3 font-display font-black text-lg sm:text-xl shrink-0 tracking-tight">
          <span className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-brand-500 text-ink-950 shadow-md shadow-brand-500/25">
            <Video size={18} strokeWidth={2.5} className="sm:w-5 sm:h-5" />
          </span>
          <span
            style={{ color: scrolled ? scrolledText : '#ffffff' }}
            className="font-display font-extrabold transition-colors duration-300"
          >
            MeetSphere
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav
          style={{ color: scrolled ? scrolledMuted : 'rgb(207 250 254)' }}
          className="hidden md:flex items-center gap-8 text-sm font-bold transition-colors duration-300"
        >
          {links.map((l) => (
            <a key={l.label} href={l.to} className="hover:text-brand-500 transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons & Theme Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="sm:hidden"><ThemeToggle size="sm" /></div>
          <div className="hidden sm:block"><ThemeToggle /></div>

          {isAuthenticated ? (
            <Button
              size="sm"
              onClick={() => navigate('/app')}
              className="px-3.5 py-1.5 text-xs font-bold whitespace-nowrap shrink-0 shadow-md shadow-brand-500/20"
            >
              <span>Dashboard</span> <ArrowRight size={14} />
            </Button>
          ) : (
            <>
              <Button
                size="sm"
                variant="outline"
                to="/login"
                style={scrolled
                  ? { color: scrolledText, borderColor: scrolledBorder }
                  : { color: '#ffffff', borderColor: 'rgba(255,255,255,0.35)' }
                }
                className="px-3.5 py-1.5 text-xs font-bold whitespace-nowrap shrink-0 transition-all duration-300 hover:bg-brand-500/10"
              >
                Sign in
              </Button>
              <Button
                size="sm"
                to="/register"
                className="px-4 py-1.5 text-xs font-bold whitespace-nowrap shrink-0 shadow-md shadow-brand-500/25"
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

