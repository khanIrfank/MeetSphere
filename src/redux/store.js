import { configureStore } from '@reduxjs/toolkit'
import planReducer from './slices/planSlice'
import authReducer from './slices/authSlice'
import meetingsReducer from './slices/meetingsSlice'
import themeReducer from './slices/themeSlice'

export const store = configureStore({
  reducer: {
    plan: planReducer,
    auth: authReducer,
    meetings: meetingsReducer,
    theme: themeReducer,
  },
})
