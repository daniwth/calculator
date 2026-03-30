import { useState } from 'react'
import { formatCurrency, formatNumber } from '../../lib/utils'
import { Tag, TrendingDown } from 'lucide-react'

export default function DiscountCalculator() {
  const [original, setOriginal] = useState('')
  const [discount, setDiscount] = useState('')
  const [mode, setMode] = useState('pct')

  const orig = parseFloat(original) || 0
  const disc = parseFloat(discount) || 0

  let discountAmount, finalPrice, savedPct
  if (mode === 'pct') { discountAmount = (orig * disc) / 100; finalPrice = orig - discountAmount; savedPct = disc }
  else { discountAmount = disc; finalPrice = orig - disc; savedPct = orig > 0 ? (disc / orig) * 100 : 0 }

  return (
    <div className="max-w-md mx-auto space-y-5">
      <div className="flex gap-2">
        {[{ id: 'pct', label: 'Descuento en %' }, { id: 'amount', label: 'Descuento en €' }].map(m => (
          <button key={m.id} onClick={() => { setMode(m.id); setDiscount('') }}
            className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${
              mode === m.id ? 'bg-primary-500 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}>{m.label}</button>
        ))}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">Precio original (€)</label>
        <input type="number" value={original} onChange={e => setOriginal(e.target.value)} placeholder="Ej: 99.99" className="input-field w-full" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">{mode === 'pct' ? 'Descuento (%)' : 'Importe del descuento (€)'}</label>
        <input type="number" value={discount} onChange={e => setDiscount(e.target.value)} placeholder={mode === 'pct' ? 'Ej: 20' : 'Ej: 15.00'} className="input-field w-full" />
      </div>
      {orig > 0 && disc > 0 && (
        <div className="space-y-3 animate-slide-up">
          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-900/30 to-green-900/30 border border-emerald-500/20 text-center">
            <div className="flex items-center justify-center gap-2 text-emerald-400 text-sm mb-2"><Tag className="w-4 h-4" />Precio final</div>
            <div className="text-5xl font-extrabold text-emerald-400 calc-display">{formatCurrency(finalPrice)}</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-gray-900 border border-gray-800 text-center">
              <div className="text-xs text-gray-500 mb-1 flex items-center justify-center gap-1"><TrendingDown className="w-3 h-3" />Ahorro</div>
              <div className="text-lg font-bold text-white">{formatCurrency(discountAmount)}</div>
            </div>
            <div className="p-4 rounded-xl bg-gray-900 border border-gray-800 text-center">
              <div className="text-xs text-gray-500 mb-1">% ahorrado</div>
              <div className="text-lg font-bold text-amber-400">{formatNumber(savedPct)}%</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
