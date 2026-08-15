import { createSlice } from '@reduxjs/toolkit'

const getSavedTheme = () => {
  return localStorage.getItem('meetsphere_theme') || 'dark'
}

const initialState = {
  theme: getSavedTheme(),
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
