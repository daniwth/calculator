import { useState } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import { CALCULATORS, CALCULATOR_CATEGORIES } from '../lib/calculators'
import CalculatorCard from '../components/calculators/CalculatorCard'
import { cn } from '../lib/utils'

export default function Calculators() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [tierFilter, setTierFilter] = useState('all')

  const filtered = CALCULATORS.filter(calc => {
    const matchSearch = search === '' ||
      calc.nombre.toLowerCase().includes(search.toLowerCase()) ||
      calc.descripcion.toLowerCase().includes(search.toLowerCase()) ||
      calc.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    const matchCat = category === 'all' || calc.categoria === category
    const matchTier = tierFilter === 'all' || calc.tier === tierFilter
    return matchSearch && matchCat && matchTier
  })

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Todas las calculadoras</h1>
          <p className="text-gray-400">{CALCULATORS.length} calculadoras disponibles</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Buscar calculadora..." className="input-field w-full pl-10" />
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-gray-500" />
            {[{ id: 'all', label: 'Todas' }, { id: 'free', label: 'Gratis' }, { id: 'premium', label: 'Premium' }].map(opt => (
              <button key={opt.id} onClick={() => setTierFilter(opt.id)}
                className={cn('px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                  tierFilter === opt.id ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30' : 'text-gray-500 hover:text-gray-300 border border-gray-800 hover:border-gray-700'
                )}>{opt.label}</button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {CALCULATOR_CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setCategory(cat.id)}
              className={cn('px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
                category === cat.id ? 'bg-primary-500 text-white' : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
              )}>{cat.label}</button>
          ))}
        </div>

        {(search || category !== 'all' || tierFilter !== 'all') && (
          <p className="text-sm text-gray-500 mb-4">{filtered.length} resultado{filtered.length !== 1 ? 's' : ''}</p>
        )}

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map(calc => <CalculatorCard key={calc.slug} calculator={calc} />)}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-white mb-2">Sin resultados</h3>
            <p className="text-gray-500 text-sm">No encontramos calculadoras con ese criterio. Prueba con otra búsqueda.</p>
          </div>
        )}
      </div>
    </div>
  )
}
