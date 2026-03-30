import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Calculator, Menu, X, ChevronDown, User, LogOut, Settings, LayoutDashboard, Shield } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { cn } from '../../lib/utils'

const navLinks = [
  { to: '/calculadoras', label: 'Calculadoras' },
  { to: '/precios', label: 'Precios' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { user, isAuthenticated, isAdmin, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    setUserMenuOpen(false)
    navigate('/')
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800 bg-gray-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary-600 to-violet-600">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-white group-hover:text-primary-400 transition-colors">
              Calc<span className="text-primary-400">Pro</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => cn(
                  'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary-500/10 text-primary-400'
                    : 'text-gray-400 hover:text-gray-100 hover:bg-gray-800'
                )}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-all text-sm"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-500 to-violet-500 flex items-center justify-center text-xs font-bold text-white">
                    {user?.nombre?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <span className="max-w-[100px] truncate">{user?.nombre}</span>
                  {user?.plan === 'premium' && (
                    <span className="premium-badge text-[10px] px-1.5 py-0.5">PRO</span>
                  )}
                  <ChevronDown className={cn('w-3 h-3 transition-transform', userMenuOpen && 'rotate-180')} />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-gray-900 border border-gray-700 rounded-xl shadow-xl overflow-hidden animate-fade-in">
                    <div className="px-3 py-2 border-b border-gray-700">
                      <p className="text-xs text-gray-500">Conectado como</p>
                      <p className="text-sm font-medium text-white truncate">{user?.email}</p>
                    </div>
                    <div className="py-1">
                      <Link to="/dashboard" onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800">
                        <LayoutDashboard className="w-4 h-4" />Panel de control
                      </Link>
                      <Link to="/ajustes" onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800">
                        <Settings className="w-4 h-4" />Ajustes
                      </Link>
                      {isAdmin && (
                        <Link to="/admin" onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-amber-400 hover:text-amber-300 hover:bg-gray-800">
                          <Shield className="w-4 h-4" />Panel admin
                        </Link>
                      )}
                    </div>
                    <div className="border-t border-gray-700 py-1">
                      <button onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-gray-800">
                        <LogOut className="w-4 h-4" />Cerrar sesión
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login"
                  className="px-4 py-1.5 text-sm font-medium text-gray-300 hover:text-white transition-colors">
                  Iniciar sesión
                </Link>
                <Link to="/registro"
                  className="px-4 py-1.5 text-sm font-medium btn-primary rounded-lg">
                  Empezar gratis
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-800 bg-gray-950 animate-slide-up">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) => cn(
                  'block px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  isActive ? 'bg-primary-500/10 text-primary-400' : 'text-gray-400 hover:text-white hover:bg-gray-800'
                )}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
          <div className="px-4 py-3 border-t border-gray-800 space-y-2">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-gray-800">
                  Panel de control
                </Link>
                {isAdmin && (
                  <Link to="/admin" onClick={() => setMenuOpen(false)}
                    className="block px-3 py-2 rounded-lg text-sm text-amber-400 hover:bg-gray-800">
                    Panel admin
                  </Link>
                )}
                <button onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-gray-800">
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-gray-800">
                  Iniciar sesión
                </Link>
                <Link to="/registro" onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm btn-primary text-center">
                  Empezar gratis
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      {/* Backdrop for user menu */}
      {userMenuOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
      )}
    </header>
  )
}
