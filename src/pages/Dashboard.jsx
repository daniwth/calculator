import { Link } from 'react-router-dom'
import { Calculator, Crown, Clock, Star, Settings, ArrowRight, TrendingUp } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { getHistory } from '../lib/storage'
import { getPopularCalculators, getFreeCalculators } from '../lib/calculators'
import CalculatorCard from '../components/calculators/CalculatorCard'

export default function Dashboard() {
  const { user, isPremium } = useAuth()
  const history = user ? getHistory(user.id) : []
  const popular = getPopularCalculators().slice(0, 4)
  const free = getFreeCalculators().slice(0, 3)

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Hola, {user?.nombre?.split(' ')[0]} 👋</h1>
            <p className="text-gray-400">Bienvenido a tu panel de control</p>
          </div>
          <Link to="/ajustes" className="btn-secondary px-4 py-2 rounded-xl text-sm flex items-center gap-2">
            <Settings className="w-4 h-4" />Ajustes
          </Link>
        </div>

        <div className={`p-5 rounded-2xl mb-8 flex items-center justify-between ${
          isPremium ? 'bg-gradient-to-r from-amber-900/30 to-orange-900/30 border border-amber-500/20'
          : 'bg-gradient-to-r from-gray-900 to-gray-900/50 border border-gray-700'
        }`}>
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              isPremium ? 'bg-amber-500/20' : 'bg-gray-800'
            }`}>
              {isPremium ? <Crown className="w-6 h-6 text-amber-400" /> : <Calculator className="w-6 h-6 text-gray-400" />}
            </div>
            <div>
              <div className="font-semibold text-white">Plan {isPremium ? 'Premium' : 'Básico'}</div>
              <div className="text-sm text-gray-400">
                {isPremium ? 'Acceso completo a todas las calculadoras' : '6 calculadoras disponibles'}
              </div>
            </div>
          </div>
          {!isPremium && (
            <Link to="/precios" className="btn-primary px-4 py-2 rounded-xl text-sm flex items-center gap-1.5 flex-shrink-0">
              <Crown className="w-4 h-4" />Actualizar
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Cálculos', value: history.length, icon: <Calculator className="w-5 h-5" />, color: 'text-primary-400' },
                { label: 'Plan', value: isPremium ? 'Premium' : 'Básico', icon: <Crown className="w-5 h-5" />, color: isPremium ? 'text-amber-400' : 'text-gray-400' },
                { label: 'Calculadoras', value: isPremium ? '20' : '6', icon: <Star className="w-5 h-5" />, color: 'text-violet-400' },
              ].map(stat => (
                <div key={stat.label} className="p-4 rounded-xl bg-gray-900 border border-gray-800">
                  <div className={`mb-2 ${stat.color}`}>{stat.icon}</div>
                  <div className="text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />Historial reciente
                </h2>
              </div>
              {history.length > 0 ? (
                <div className="space-y-2">
                  {history.slice(0, 5).map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-900 border border-gray-800">
                      <div>
                        <div className="text-sm font-medium text-white">{item.calculator || 'Calculadora'}</div>
                        <div className="text-xs text-gray-500 calc-display">{item.expr || ''}</div>
                      </div>
                      <div className="text-sm font-bold text-primary-400 calc-display">{item.result || ''}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 rounded-xl bg-gray-900 border border-gray-800 text-center">
                  <Calculator className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Aún no has hecho ningún cálculo</p>
                  <Link to="/calculadoras" className="text-primary-400 text-sm hover:text-primary-300 mt-1 inline-block">Explorar calculadoras</Link>
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-gray-400" />Populares
                </h2>
                <Link to="/calculadoras" className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1">
                  Ver todas <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {popular.map(calc => <CalculatorCard key={calc.slug} calculator={calc} compact />)}
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="p-5 rounded-2xl bg-gray-900 border border-gray-800">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-violet-500 flex items-center justify-center text-2xl font-bold text-white mx-auto mb-3">
                {user?.nombre?.[0]?.toUpperCase()}
              </div>
              <div className="text-center">
                <div className="font-semibold text-white">{user?.nombre}</div>
                <div className="text-sm text-gray-500 truncate">{user?.email}</div>
                {isPremium && <span className="premium-badge mt-2 inline-block">Premium</span>}
              </div>
            </div>

            <div>
              <h2 className="font-semibold text-white mb-3 text-sm">Calculadoras gratuitas</h2>
              <div className="space-y-2">
                {free.map(calc => (
                  <Link key={calc.slug} to={`/calculadoras/${calc.slug}`}
                    className="flex items-center gap-3 p-3 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-700 transition-colors">
                    <span className="text-xl">{calc.icon}</span>
                    <span className="text-sm text-gray-300 hover:text-white transition-colors">{calc.nombre}</span>
                  </Link>
                ))}
                <Link to="/calculadoras" className="flex items-center justify-center gap-1 p-2 rounded-xl text-xs text-gray-500 hover:text-gray-300 transition-colors">
                  Ver todas <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
