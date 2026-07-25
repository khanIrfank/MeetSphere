import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('ms-user')
    return raw ? JSON.parse(raw) : null
  })

  const login = (email) => {
    const name = email.split('@')[0].replace(/[._]/g, ' ')
    const fakeUser = {
      name: name.replace(/\b\w/g, (c) => c.toUpperCase()) || 'User',
      email,
    }
    localStorage.setItem('ms-user', JSON.stringify(fakeUser))
    setUser(fakeUser)
    return fakeUser
  }

  const register = (name, email) => {
    const fakeUser = { name, email }
    localStorage.setItem('ms-user', JSON.stringify(fakeUser))
    setUser(fakeUser)
    return fakeUser
  }

  const logout = () => {
    localStorage.removeItem('ms-user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
