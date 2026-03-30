import { useState } from 'react'
import { formatNumber } from '../../lib/utils'

export default function PercentageCalculator() {
  const [mode, setMode] = useState('of')
  const [a, setA] = useState('')
  const [b, setB] = useState('')

  const num_a = parseFloat(a) || 0
  const num_b = parseFloat(b) || 0

  let result = null, explanation = ''
  if (mode === 'of' && a && b) { result = (num_b / 100) * num_a; explanation = `El ${num_b}% de ${num_a} es ${formatNumber(result)}` }
  else if (mode === 'change' && a && b) { result = ((num_b - num_a) / num_a) * 100; explanation = `De ${num_a} a ${num_b} hay un ${result >= 0 ? 'aumento' : 'descenso'} del ${formatNumber(Math.abs(result))}%` }
  else if (mode === 'reverse' && a && b) { result = (num_a / num_b) * 100; explanation = `${num_a} es el ${formatNumber(result)}% de ${num_b}` }

  const modes = [
    { id: 'of', label: '% de un número', desc: 'Ej: ¿Cuánto es el 20% de 150?' },
    { id: 'change', label: 'Variación %', desc: 'Ej: ¿Cuánto cambió de 80 a 100?' },
    { id: 'reverse', label: '% inverso', desc: 'Ej: ¿Qué % es 25 de 200?' },
  ]
  const labels = {
    of: [{ label: 'Número base', ph: 'Ej: 150' }, { label: 'Porcentaje (%)', ph: 'Ej: 20' }],
    change: [{ label: 'Valor inicial', ph: 'Ej: 80' }, { label: 'Valor final', ph: 'Ej: 100' }],
    reverse: [{ label: 'Parte', ph: 'Ej: 25' }, { label: 'Total', ph: 'Ej: 200' }],
  }

  return (
    <div className="max-w-md mx-auto space-y-5">
      <div className="grid grid-cols-1 gap-2">
        {modes.map(m => (
          <button key={m.id} onClick={() => { setMode(m.id); setA(''); setB('') }}
            className={`text-left p-3 rounded-xl border transition-all ${
              mode === m.id ? 'border-primary-500/50 bg-primary-500/10' : 'border-gray-700 bg-gray-900 hover:border-gray-600'
            }`}>
            <div className="font-medium text-white text-sm">{m.label}</div>
            <div className="text-xs text-gray-500 mt-0.5">{m.desc}</div>
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {labels[mode].map((field, i) => (
          <div key={i}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">{field.label}</label>
            <input type="number" value={i === 0 ? a : b} onChange={e => i === 0 ? setA(e.target.value) : setB(e.target.value)}
              placeholder={field.ph} className="input-field w-full" />
          </div>
        ))}
      </div>
      {result !== null && (
        <div className="p-5 rounded-2xl bg-gradient-to-br from-primary-900/40 to-violet-900/40 border border-primary-500/20 text-center animate-slide-up">
          <div className="text-4xl font-bold text-white calc-display mb-2">
            {formatNumber(result)}{mode === 'of' || mode === 'reverse' ? '' : '%'}
          </div>
          <p className="text-sm text-gray-400">{explanation}</p>
        </div>
      )}
    </div>
  )
}
