import { useState, useCallback } from 'react'
import { Delete, History, X } from 'lucide-react'
import { cn } from '../../lib/utils'

const buttons = [
  ['C', '±', '%', '÷'],
  ['7', '8', '9', '×'],
  ['4', '5', '6', '−'],
  ['1', '2', '3', '+'],
  ['0', '.', '⌫', '='],
]

function calcType(btn) {
  if (btn === '=') return 'equals'
  if (btn === 'C') return 'clear'
  if (btn === '⌫') return 'backspace'
  if (['+', '−', '×', '÷'].includes(btn)) return 'operator'
  if (['±', '%'].includes(btn)) return 'function'
  return 'number'
}

export default function BasicCalculator() {
  const [display, setDisplay] = useState('0')
  const [expression, setExpression] = useState('')
  const [history, setHistory] = useState([])
  const [showHistory, setShowHistory] = useState(false)
  const [newNumber, setNewNumber] = useState(true)

  const addToHistory = (expr, result) => {
    setHistory(prev => [{ expr, result, id: Date.now() }, ...prev].slice(0, 20))
  }

  const handleButton = useCallback((btn) => {
    const type = calcType(btn)
    if (type === 'clear') { setDisplay('0'); setExpression(''); setNewNumber(true); return }
    if (type === 'backspace') { setDisplay(display.length > 1 ? display.slice(0, -1) : '0'); return }
    if (type === 'function') {
      const num = parseFloat(display)
      if (btn === '±') setDisplay(String(-num))
      if (btn === '%') setDisplay(String(num / 100))
      return
    }
    if (type === 'operator') {
      setExpression(display + ' ' + btn + ' ')
      setNewNumber(true)
      return
    }
    if (type === 'equals') {
      if (!expression) return
      const opMap = { '÷': '/', '×': '*', '−': '-', '+': '+' }
      let evalExpr = expression + display
      Object.entries(opMap).forEach(([sym, op]) => { evalExpr = evalExpr.replace(sym, op) })
      try {
        // eslint-disable-next-line no-new-func
        const result = new Function(`"use strict"; return (${evalExpr})`)()
        const resultStr = Number.isInteger(result) ? String(result) : parseFloat(result.toFixed(10)).toString()
        addToHistory(expression + display, resultStr)
        setDisplay(resultStr); setExpression(''); setNewNumber(true)
      } catch { setDisplay('Error'); setExpression(''); setNewNumber(true) }
      return
    }
    if (newNumber) { setDisplay(btn === '.' ? '0.' : btn); setNewNumber(false) }
    else {
      if (btn === '.' && display.includes('.')) return
      setDisplay(display === '0' && btn !== '.' ? btn : display + btn)
    }
  }, [display, expression, newNumber])

  return (
    <div className="max-w-sm mx-auto">
      <div className="bg-gray-900 rounded-2xl p-5 mb-4 border border-gray-800">
        <div className="text-right">
          <div className="text-gray-500 text-sm calc-display min-h-[20px] truncate">{expression || '\u00A0'}</div>
          <div className="text-4xl font-light text-white calc-display mt-1 truncate">{display}</div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2 mb-4">
        {buttons.flat().map((btn, i) => {
          const type = calcType(btn)
          return (
            <button key={i} onClick={() => handleButton(btn)}
              className={cn('calc-btn h-14 rounded-xl text-lg font-medium transition-all duration-100 active:scale-95 select-none',
                btn === '0' ? 'col-span-2' : '',
                type === 'equals' && 'bg-gradient-to-br from-primary-600 to-violet-600 text-white hover:from-primary-500 hover:to-violet-500',
                type === 'operator' && 'bg-primary-500/15 text-primary-400 hover:bg-primary-500/25 border border-primary-500/20',
                type === 'function' && 'bg-gray-700 text-gray-300 hover:bg-gray-600',
                type === 'clear' && 'bg-red-500/15 text-red-400 hover:bg-red-500/25',
                type === 'backspace' && 'bg-gray-700 text-gray-300 hover:bg-gray-600',
                type === 'number' && 'bg-gray-800 text-white hover:bg-gray-700',
              )}>
              {btn === '⌫' ? <Delete className="w-5 h-5 mx-auto" /> : btn}
            </button>
          )
        })}
      </div>
      <button onClick={() => setShowHistory(!showHistory)}
        className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-gray-800/50 hover:bg-gray-800 text-gray-400 hover:text-white text-sm transition-colors">
        <span className="flex items-center gap-2"><History className="w-4 h-4" />Historial ({history.length})</span>
        {showHistory ? <X className="w-4 h-4" /> : null}
      </button>
      {showHistory && history.length > 0 && (
        <div className="mt-2 bg-gray-900 rounded-xl border border-gray-800 overflow-hidden animate-slide-up">
          {history.map(item => (
            <div key={item.id} className="px-4 py-2.5 border-b border-gray-800 last:border-0 cursor-pointer hover:bg-gray-800 transition-colors"
              onClick={() => { setDisplay(item.result); setNewNumber(true) }}>
              <div className="text-xs text-gray-500 calc-display">{item.expr}</div>
              <div className="text-base text-white font-medium calc-display">= {item.result}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
