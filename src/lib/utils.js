import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num, decimals = 2) {
  if (typeof num !== 'number' || isNaN(num)) return '0'
  return new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  }).format(num)
}

export function formatCurrency(amount, currency = 'EUR') {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount)
}

export function formatDate(dateStr) {
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(dateStr))
}

export function formatDateTime(dateStr) {
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateStr))
}

export function safeEval(expression) {
  // Replace common notation
  let expr = expression
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/,/g, '.')
    .replace(/π/g, Math.PI.toString())
    .replace(/e(?![0-9])/g, Math.E.toString())

  // Only allow safe characters
  if (!/^[0-9+\-*/().%\s^]+$/.test(expr)) {
    throw new Error('Expresión inválida')
  }

  // Handle exponentiation (^)
  expr = expr.replace(/(\d+(?:\.\d+)?)\^(\d+(?:\.\d+)?)/g, (_, base, exp) => {
    return Math.pow(parseFloat(base), parseFloat(exp)).toString()
  })

  // eslint-disable-next-line no-new-func
  const result = new Function(`"use strict"; return (${expr})`)()
  if (typeof result !== 'number' || !isFinite(result)) {
    throw new Error('Resultado inválido')
  }
  return result
}

export function truncate(str, maxLen = 30) {
  if (str.length <= maxLen) return str
  return str.slice(0, maxLen) + '...'
}
