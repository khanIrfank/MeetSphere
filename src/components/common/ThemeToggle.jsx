import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme()
  const isLight = theme === 'light'

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      className={`relative inline-flex h-9 w-16 items-center rounded-full border bg-elevated transition-colors ${className}`}
    >
      <span
        className={`absolute h-7 w-7 rounded-full bg-brand-500 flex items-center justify-center text-ink-950 transition-transform duration-300 ${
          isLight ? 'translate-x-8' : 'translate-x-1'
        }`}
      >
        {isLight ? <Sun size={15} /> : <Moon size={15} />}
      </span>
    </button>
  )
}
