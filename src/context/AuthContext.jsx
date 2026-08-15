import { createContext, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loginAction, logoutAction, updateProfileAction } from '../redux/slices/authSlice'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const dispatch = useDispatch()
  const { user, isAuthenticated } = useSelector((state) => state.auth)

  const login = (userData) => {
    dispatch(loginAction(userData))
  }

  const logout = () => {
    dispatch(logoutAction())
  }

  const updateProfile = (profileData) => {
    dispatch(updateProfileAction(profileData))
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
