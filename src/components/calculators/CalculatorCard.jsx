import { Link } from 'react-router-dom'
import { Lock, ArrowRight } from 'lucide-react'
import { cn } from '../../lib/utils'
import { useAuth } from '../../context/AuthContext'

export default function CalculatorCard({ calculator, compact = false }) {
  const { isPremium } = useAuth()
  const isLocked = calculator.tier === 'premium' && !isPremium

  return (
    <Link
      to={`/calculadoras/${calculator.slug}`}
      className={cn(
        'group relative flex flex-col rounded-2xl border transition-all duration-200',
        'bg-gray-900 border-gray-800 hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/10',
        compact ? 'p-4' : 'p-6',
      )}
    >
      {/* Tier badge */}
      <div className="absolute top-3 right-3">
        {calculator.tier === 'premium' ? (
          <span className="premium-badge flex items-center gap-1">
            {isLocked && <Lock className="w-2.5 h-2.5" />}
            PRO
          </span>
        ) : (
          <span className="free-badge">GRATIS</span>
        )}
      </div>

      {/* Icon */}
      <div className={cn(
        'rounded-xl flex items-center justify-center text-2xl mb-3 w-12 h-12',
        calculator.tier === 'premium'
          ? 'bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/20'
          : 'bg-gradient-to-br from-primary-500/20 to-violet-500/20 border border-primary-500/20'
      )}>
        {calculator.icon}
      </div>

      {/* Content */}
      <h3 className={cn(
        'font-semibold text-white group-hover:text-primary-300 transition-colors mb-1',
        compact ? 'text-sm' : 'text-base'
      )}>
        {calculator.nombre}
      </h3>

      {!compact && (
        <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-4">
          {calculator.descripcion}
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto">
        <span className="text-xs text-gray-600 capitalize">{calculator.categoria}</span>
        <ArrowRight className={cn(
          'w-4 h-4 transition-all',
          isLocked ? 'text-amber-500' : 'text-primary-500',
          'group-hover:translate-x-1'
        )} />
      </div>

      {/* Locked overlay gradient */}
      {isLocked && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent to-amber-950/10 pointer-events-none" />
      )}
    </Link>
  )
}
