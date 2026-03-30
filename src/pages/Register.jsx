import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Calculator, Eye, EyeOff, AlertCircle, Check } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const [form, setForm] = useState({ nombre: '', email: '', password: '', confirm: '' })
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const passwordStrong = form.password.length >= 6
  const passwordMatch = form.password === form.confirm && form.confirm.length > 0

  function update(field, val) {
    setForm(prev => ({ ...prev, [field]: val }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!passwordStrong) return setError('La contraseña debe tener al menos 6 caracteres')
    if (!passwordMatch) return setError('Las contraseñas no coinciden')
    setLoading(true)
    try {
      register({ nombre: form.nombre.trim(), email: form.email.trim(), password: form.password })
      navigate('/calculadoras')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary-600 to-violet-600">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-2xl text-white">
              Calc<span className="text-primary-400">Pro</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-white">Crea tu cuenta</h1>
          <p className="text-gray-500 mt-1">Gratis para siempre en el plan básico</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-2 text-sm text-red-400">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Nombre</label>
              <input type="text" value={form.nombre} onChange={e => update('nombre', e.target.value)}
                placeholder="Tu nombre" required className="input-field w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
              <input type="email" value={form.email} onChange={e => update('email', e.target.value)}
                placeholder="tu@email.com" required className="input-field w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Contraseña</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} value={form.password}
                  onChange={e => update('password', e.target.value)}
                  placeholder="Mínimo 6 caracteres" required className="input-field w-full pr-10" />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {form.password.length > 0 && (
                <div className={`mt-1 flex items-center gap-1 text-xs ${passwordStrong ? 'text-emerald-400' : 'text-red-400'}`}>
                  <Check className="w-3 h-3" />
                  {passwordStrong ? 'Contraseña válida' : 'Mínimo 6 caracteres'}
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Confirmar contraseña</label>
              <input type="password" value={form.confirm} onChange={e => update('confirm', e.target.value)}
                placeholder="Repite la contraseña" required className="input-field w-full" />
              {form.confirm.length > 0 && (
                <div className={`mt-1 flex items-center gap-1 text-xs ${passwordMatch ? 'text-emerald-400' : 'text-red-400'}`}>
                  <Check className="w-3 h-3" />
                  {passwordMatch ? 'Contraseñas coinciden' : 'Las contraseñas no coinciden'}
                </div>
              )}
            </div>
            <button type="submit" disabled={loading}
              className="w-full btn-primary py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creando cuenta...
                </span>
              ) : 'Crear cuenta gratis'}
            </button>
          </form>
          <p className="text-center text-xs text-gray-600 mt-4">
            Al registrarte aceptas los términos de uso y política de privacidad.
          </p>
        </div>
        <p className="text-center text-sm text-gray-500 mt-6">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-primary-400 hover:text-primary-300 font-medium">Iniciar sesión</Link>
        </p>
      </div>
    </div>
  )
}
