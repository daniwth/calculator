import { useState } from 'react'
import { CALCULATORS } from '../../lib/calculators'
import { Lock, Unlock, Crown, Zap } from 'lucide-react'
import { cn } from '../../lib/utils'

export default function AdminCalculators() {
  const [overrides, setOverrides] = useState({})

  function getCalcState(calc) {
    return { tier: overrides[calc.slug]?.tier ?? calc.tier, enabled: overrides[calc.slug]?.enabled ?? true }
  }

  function toggleTier(slug, currentTier) {
    setOverrides(prev => ({ ...prev, [slug]: { ...prev[slug], tier: currentTier === 'free' ? 'premium' : 'free' } }))
  }

  function toggleEnabled(slug) {
    setOverrides(prev => ({ ...prev, [slug]: { ...prev[slug], enabled: !(prev[slug]?.enabled ?? true) } }))
  }

  const freeCount = CALCULATORS.filter(c => (overrides[c.slug]?.tier ?? c.tier) === 'free').length
  const premiumCount = CALCULATORS.filter(c => (overrides[c.slug]?.tier ?? c.tier) === 'premium').length
  const disabledCount = Object.values(overrides).filter(o => o.enabled === false).length

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Gestión de Calculadoras</h1>
            <p className="text-gray-500 text-sm">Configura el plan y visibilidad de cada calculadora</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {[{ label: 'Gratuitas', value: freeCount, color: 'text-emerald-400' }, { label: 'Premium', value: premiumCount, color: 'text-amber-400' }, { label: 'Desactivadas', value: disabledCount, color: 'text-red-400' }].map(s => (
            <div key={s.label} className="p-4 rounded-xl bg-gray-900 border border-gray-800 text-center">
              <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-xs text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/15 text-xs text-amber-400 mb-5">
          Los cambios son temporales en esta demo (se resetean al recargar). En producción se persistirían en base de datos.
        </div>

        <div className="space-y-2">
          {CALCULATORS.map(calc => {
            const state = getCalcState(calc)
            return (
              <div key={calc.slug} className={cn('flex items-center gap-4 p-4 rounded-xl border transition-all',
                state.enabled ? 'bg-gray-900 border-gray-800' : 'bg-gray-900/50 border-gray-800/50 opacity-50'
              )}>
                <div className="text-2xl w-10 flex-shrink-0 text-center">{calc.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium text-white">{calc.nombre}</span>
                    <span className="text-xs text-gray-500 capitalize">{calc.categoria}</span>
                  </div>
                  <div className="text-xs text-gray-500 truncate mt-0.5">{calc.descripcion}</div>
                </div>
                <button onClick={() => toggleTier(calc.slug, state.tier)}
                  className={cn('flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
                    state.tier === 'free' ? 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/20'
                  )}>
                  {state.tier === 'free' ? <><Zap className="w-3 h-3" />Gratis</> : <><Crown className="w-3 h-3" />Premium</>}
                </button>
                <button onClick={() => toggleEnabled(calc.slug)}
                  className={cn('flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border',
                    state.enabled ? 'bg-gray-800 text-gray-400 hover:bg-gray-700 border-gray-700' : 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border-red-500/20'
                  )}>
                  {state.enabled ? <><Unlock className="w-3 h-3" />Activa</> : <><Lock className="w-3 h-3" />Desactivada</>}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
