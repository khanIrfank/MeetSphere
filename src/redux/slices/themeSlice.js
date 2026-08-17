import { createSlice } from '@reduxjs/toolkit'

const getSavedTheme = () => {
  const saved = localStorage.getItem('meetsphere_theme')
  if (saved) return saved
  return 'light'
}

const initialTheme = getSavedTheme()
if (typeof document !== 'undefined') {
  if (initialTheme === 'light') {
    document.documentElement.classList.add('theme-light')
  } else {
    document.documentElement.classList.remove('theme-light')
  }
}

const initialState = {
  theme: initialTheme,
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeAction: (state, action) => {
      state.theme = action.payload
      localStorage.setItem('meetsphere_theme', action.payload)
      if (action.payload === 'light') {
        document.documentElement.classList.add('theme-light')
      } else {
        document.documentElement.classList.remove('theme-light')
      }
    },
  },
})

export const { setThemeAction } = themeSlice.actions
export default themeSlice.reducer
