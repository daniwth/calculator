import { createContext, useContext, useState, useEffect } from 'react'
import { getSession, login as authLogin, logout as authLogout, createUser } from '../lib/auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const session = getSession()
    setUser(session)
    setLoading(false)
  }, [])

  function login(email, password) {
    const session = authLogin(email, password)
    setUser(session)
    return session
  }

  function register({ nombre, email, password }) {
    const newUser = createUser({ nombre, email, password })
    const session = authLogin(email, password)
    setUser(session)
    return session
  }

  function logout() {
    authLogout()
    setUser(null)
  }

  function refreshUser() {
    const session = getSession()
    setUser(session)
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout,
      refreshUser,
      isAuthenticated: !!user,
      isPremium: user?.plan === 'premium',
      isAdmin: user?.role === 'admin',
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
