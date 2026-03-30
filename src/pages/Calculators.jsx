import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { getCalculatorBySlug } from '../../lib/calculators'
import PremiumGate from '../../components/calculators/PremiumGate'
import { useAuth } from '../../context/AuthContext'
import { cn } from '../../lib/utils'

import BasicCalculator from './BasicCalculator'
import PercentageCalculator from './PercentageCalculator'
import TipCalculator from './TipCalculator'
import DiscountCalculator from './DiscountCalculator'

// TODO: añadir cuando se creen los archivos
// import ScientificCalculator from './ScientificCalculator'
// import UnitConverter from './UnitConverter'
// import BMICalculator from './BMICalculator'
// import MortgageCalculator from './MortgageCalculator'
// import LoanCalculator from './LoanCalculator'
// import CompoundInterestCalculator from './CompoundInterestCalculator'
// import CurrencyCalculator from './CurrencyCalculator'
// import StatisticsCalculator from './StatisticsCalculator'
// import MatrixCalculator from './MatrixCalculator'
// import ProgrammerCalculator from './ProgrammerCalculator'
// import DateCalculator from './DateCalculator'
// import GeometryCalculator from './GeometryCalculator'
// import FuelCalculator from './FuelCalculator'
// import CalorieCalculator from './CalorieCalculator'
// import IRPFCalculator from './IRPFCalculator'
// import FinancialCalculator from './FinancialCalculator'

const COMPONENTS = {
  basica: BasicCalculator,
  porcentajes: PercentageCalculator,
  propinas: TipCalculator,
  descuentos: DiscountCalculator,
}

export default function CalculatorPage() {
  const { slug } = useParams()
  const calc = getCalculatorBySlug(slug)
  const { isPremium } = useAuth()

  if (!calc) return <Navigate to="/calculadoras" replace />
  const Component = COMPONENTS[slug]
  if (!Component) return <Navigate to="/calculadoras" replace />

  const isPremiumCalc = calc.tier === 'premium'
  const isLocked = isPremiumCalc && !isPremium

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        <Link to="/calculadoras" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-300 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />Todas las calculadoras
        </Link>

        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-4">
            <div className={cn('w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0',
              isPremiumCalc ? 'bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/20'
              : 'bg-gradient-to-br from-primary-500/20 to-violet-500/20 border border-primary-500/20'
            )}>{calc.icon}</div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold text-white">{calc.nombre}</h1>
                {isPremiumCalc ? <span className="premium-badge">PRO</span> : <span className="free-badge">GRATIS</span>}
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">{calc.descripcion}</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {calc.tags.slice(0, 4).map(tag => (
                  <span key={tag} className="px-2 py-0.5 rounded-full text-xs bg-gray-800 text-gray-500">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-6">
          {isLocked ? (
            <PremiumGate calculatorName={calc.nombre}><Component /></PremiumGate>
          ) : (
            <Component />
          )}
        </div>
      </div>
    </div>
  )
}
