import { Lock, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function PremiumGate({ children, calculatorName }) {
  const { isPremium, isAuthenticated } = useAuth()

  if (isPremium) return children

  return (
    <div className="relative">
      {/* Blurred preview */}
      <div className="pointer-events-none select-none blur-sm opacity-40 saturate-50">
        {children}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <div className="glass rounded-2xl p-8 text-center max-w-sm mx-4 shadow-2xl shadow-black/50">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/25">
            <Lock className="w-8 h-8 text-white" />
          </div>

          <h3 className="text-xl font-bold text-white mb-2">
            Función Premium
          </h3>
          <p className="text-gray-400 text-sm mb-1">
            <strong className="text-white">{calculatorName}</strong> está disponible en el plan Premium.
          </p>
          <p className="text-gray-500 text-sm mb-6">
            Desbloquea todas las calculadoras avanzadas por solo <strong className="text-amber-400">€4,99/mes</strong>.
          </p>

          <div className="space-y-3 mb-6 text-left">
            {['20+ calculadoras avanzadas', 'Historial ilimitado', 'Sin anuncios', 'Acceso anticipado'].map(feat => (
              <div key={feat} className="flex items-center gap-2 text-sm text-gray-300">
                <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
                {feat}
              </div>
            ))}
          </div>

          <div className="space-y-2">
            {isAuthenticated ? (
              <Link
                to="/precios"
                className="w-full block text-center px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-semibold transition-all"
              >
                Actualizar a Premium
              </Link>
            ) : (
              <>
                <Link
                  to="/registro"
                  className="w-full block text-center px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-semibold transition-all"
                >
                  Crear cuenta gratis
                </Link>
                <Link
                  to="/login"
                  className="w-full block text-center px-6 py-2 rounded-xl text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Ya tengo cuenta
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
