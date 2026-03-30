import { Link } from 'react-router-dom'
import { Users, Calculator, Crown, TrendingUp, Shield } from 'lucide-react'
import { getUsers } from '../../lib/auth'
import { CALCULATORS } from '../../lib/calculators'
import { formatDateTime } from '../../lib/utils'
import { getStats as getUsageStats } from '../../lib/storage'

const CALC_LIST = CALCULATORS

export default function AdminDashboard() {
  const users = getUsers()
  const stats = getUsageStats()
  const premiumUsers = users.filter(u => u.plan === 'premium')
  const recentUsers = [...users].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5)
  const topCalcs = Object.entries(stats).sort(([, a], [, b]) => b - a).slice(0, 5)

  const statCards = [
    { label: 'Total usuarios', value: users.length, icon: <Users className="w-5 h-5" />, color: 'text-primary-400', bg: 'bg-primary-500/10' },
    { label: 'Usuarios Premium', value: premiumUsers.length, icon: <Crown className="w-5 h-5" />, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { label: 'Calculadoras', value: CALC_LIST.length, icon: <Calculator className="w-5 h-5" />, color: 'text-violet-400', bg: 'bg-violet-500/10' },
    { label: 'Conversión', value: users.length > 0 ? `${Math.round((premiumUsers.length / users.length) * 100)}%` : '0%', icon: <TrendingUp className="w-5 h-5" />, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  ]

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Panel de Administración</h1>
            <p className="text-gray-500 text-sm">Gestión de CalcPro</p>
          </div>
        </div>

        <div className="flex gap-3 mb-8 flex-wrap">
          <Link to="/admin/usuarios" className="btn-secondary px-4 py-2 rounded-xl text-sm flex items-center gap-2">
            <Users className="w-4 h-4" />Usuarios
          </Link>
          <Link to="/admin/calculadoras" className="btn-secondary px-4 py-2 rounded-xl text-sm flex items-center gap-2">
            <Calculator className="w-4 h-4" />Calculadoras
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map(card => (
            <div key={card.label} className="p-5 rounded-2xl bg-gray-900 border border-gray-800">
              <div className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center mb-3 ${card.color}`}>{card.icon}</div>
              <div className="text-2xl font-bold text-white">{card.value}</div>
              <div className="text-sm text-gray-500">{card.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
              <h2 className="font-semibold text-white">Usuarios recientes</h2>
              <Link to="/admin/usuarios" className="text-xs text-primary-400 hover:text-primary-300">Ver todos</Link>
            </div>
            <div className="divide-y divide-gray-800">
              {recentUsers.map(user => (
                <div key={user.id} className="flex items-center gap-3 px-5 py-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500/30 to-violet-500/30 flex items-center justify-center text-sm font-bold text-primary-300">
                    {user.nombre[0].toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white truncate">{user.nombre}</div>
                    <div className="text-xs text-gray-500 truncate">{user.email}</div>
                  </div>
                  <span className={user.plan === 'premium' ? 'premium-badge' : 'free-badge'}>
                    {user.plan === 'premium' ? 'PRO' : 'FREE'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
              <h2 className="font-semibold text-white">Calculadoras más usadas</h2>
            </div>
            <div className="p-5 space-y-3">
              {topCalcs.length > 0 ? topCalcs.map(([slug, count], i) => {
                const calc = CALC_LIST.find(c => c.slug === slug)
                const maxCount = topCalcs[0][1]
                return (
                  <div key={slug} className="flex items-center gap-3">
                    <span className="text-xs text-gray-600 w-4">{i + 1}</span>
                    <span className="text-base">{calc?.icon || '🔢'}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300 truncate">{calc?.nombre || slug}</span>
                        <span className="text-gray-500 text-xs ml-2">{count} usos</span>
                      </div>
                      <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-primary-500/60 rounded-full" style={{ width: `${(count / maxCount) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                )
              }) : <p className="text-sm text-gray-500 text-center py-4">No hay datos de uso todavía</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
