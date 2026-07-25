import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

export default function ThemeToggle({ className = '', size = 'md' }) {
  const { theme, toggleTheme } = useTheme()
  const isLight = theme === 'light'

  if (size === 'sm') {
    return (
      <button
        onClick={toggleTheme}
        aria-label="Toggle color theme"
        className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border border-soft bg-elevated transition-colors cursor-pointer ${className}`}
      >
        <span
          className={`absolute h-5 w-5 rounded-full bg-brand-500 flex items-center justify-center text-ink-950 transition-transform duration-300 ${
            isLight ? 'translate-x-6' : 'translate-x-1'
          }`}
        >
          {isLight ? <Sun size={12} /> : <Moon size={12} />}
        </span>
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      className={`relative inline-flex h-8 sm:h-9 w-14 sm:w-16 shrink-0 items-center rounded-full border border-soft bg-elevated transition-colors cursor-pointer ${className}`}
    >
      <span
        className={`absolute h-6 sm:h-7 w-6 sm:w-7 rounded-full bg-brand-500 flex items-center justify-center text-ink-950 transition-transform duration-300 ${
          isLight ? 'translate-x-7 sm:translate-x-8' : 'translate-x-1'
        }`}
      >
        {isLight ? <Sun size={14} /> : <Moon size={14} />}
      </span>
    </button>
  )
}
