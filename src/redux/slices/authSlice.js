import { createSlice } from '@reduxjs/toolkit'

const getSavedUser = () => {
  try {
    const saved = localStorage.getItem('meetsphere_user')
    return saved ? JSON.parse(saved) : { name: 'Irfan Khan', email: 'irfan@meetsphere.com' }
  } catch {
    return { name: 'Irfan Khan', email: 'irfan@meetsphere.com' }
  }
}

const initialState = {
  user: getSavedUser(),
  isAuthenticated: true,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginAction: (state, action) => {
      state.user = action.payload
      state.isAuthenticated = true
      localStorage.setItem('meetsphere_user', JSON.stringify(action.payload))
    },
    logoutAction: (state) => {
      state.user = null
      state.isAuthenticated = false
      localStorage.removeItem('meetsphere_user')
    },
    updateProfileAction: (state, action) => {
      state.user = { ...state.user, ...action.payload }
      localStorage.setItem('meetsphere_user', JSON.stringify(state.user))
    },
  },
})

export const { loginAction, logoutAction, updateProfileAction } = authSlice.actions
export default authSlice.reducer
