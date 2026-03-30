import { useState } from 'react'
import { formatCurrency } from '../../lib/utils'

export default function TipCalculator() {
  const [bill, setBill] = useState('')
  const [tipPct, setTipPct] = useState(10)
  const [people, setPeople] = useState(2)

  const billNum = parseFloat(bill) || 0
  const tip = (billNum * tipPct) / 100
  const total = billNum + tip
  const perPerson = people > 0 ? total / people : 0
  const tipPerPerson = people > 0 ? tip / people : 0
  const quickTips = [5, 10, 15, 18, 20, 25]

  return (
    <div className="max-w-md mx-auto space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">Importe de la cuenta (€)</label>
        <input type="number" value={bill} onChange={e => setBill(e.target.value)} placeholder="Ej: 45.00" className="input-field w-full text-lg" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Propina: <span className="text-primary-400 font-semibold">{tipPct}%</span></label>
        <div className="flex flex-wrap gap-2 mb-2">
          {quickTips.map(pct => (
            <button key={pct} onClick={() => setTipPct(pct)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                tipPct === pct ? 'bg-primary-500 text-white' : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
              }`}>{pct}%</button>
          ))}
        </div>
        <input type="range" min={0} max={50} value={tipPct} onChange={e => setTipPct(Number(e.target.value))} className="w-full accent-primary-500" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">Número de personas</label>
        <div className="flex items-center gap-4">
          <button onClick={() => setPeople(Math.max(1, people - 1))} className="w-10 h-10 rounded-xl bg-gray-800 text-white text-xl hover:bg-gray-700 transition-colors">−</button>
          <span className="text-2xl font-bold text-white w-8 text-center">{people}</span>
          <button onClick={() => setPeople(people + 1)} className="w-10 h-10 rounded-xl bg-gray-800 text-white text-xl hover:bg-gray-700 transition-colors">+</button>
        </div>
      </div>
      {billNum > 0 && (
        <div className="grid grid-cols-2 gap-3 animate-slide-up">
          {[
            { label: 'Propina total', value: formatCurrency(tip), color: 'text-amber-400' },
            { label: 'Total cuenta', value: formatCurrency(total), color: 'text-white' },
            { label: 'Propina/persona', value: formatCurrency(tipPerPerson), color: 'text-primary-400' },
            { label: 'Total/persona', value: formatCurrency(perPerson), color: 'text-emerald-400', big: true },
          ].map(item => (
            <div key={item.label} className={`p-4 rounded-xl bg-gray-900 border border-gray-800 ${item.big ? 'col-span-2' : ''}`}>
              <div className="text-xs text-gray-500 mb-1">{item.label}</div>
              <div className={`text-xl font-bold calc-display ${item.color}`}>{item.value}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
