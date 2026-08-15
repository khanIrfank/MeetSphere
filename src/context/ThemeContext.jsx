import { createContext, useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setThemeAction } from '../redux/slices/themeSlice'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.theme.theme)

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('theme-light')
    } else {
      document.documentElement.classList.remove('theme-light')
    }
  }, [theme])

  const setTheme = (newTheme) => {
    dispatch(setThemeAction(newTheme))
  }

  const toggleTheme = () => {
    dispatch(setThemeAction(theme === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
