import { Link } from 'react-router-dom'
import { Check, X, Zap, Crown } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const plans = [
  {
    id: 'basic', name: 'Básico', price: 0, period: 'Para siempre', description: 'Perfecto para empezar',
    highlight: false, icon: <Zap className="w-5 h-5" />,
    features: [
      { text: 'Calculadora básica', included: true },
      { text: 'Calculadora científica', included: true },
      { text: 'Porcentajes y descuentos', included: true },
      { text: 'Conversor de unidades', included: true },
      { text: 'Propinas', included: true },
      { text: 'Historial (últimos 10)', included: true },
      { text: 'Calculadora de hipoteca', included: false },
      { text: 'IMC y calorías', included: false },
      { text: 'Conversor de divisas', included: false },
      { text: 'Estadística y matrices', included: false },
      { text: 'Historial ilimitado', included: false },
      { text: 'Sin anuncios', included: false },
    ],
    cta: 'Empezar gratis', ctaTo: '/registro',
  },
  {
    id: 'premium', name: 'Premium', price: 4.99, period: 'por mes', description: 'Para profesionales y power users',
    highlight: true, icon: <Crown className="w-5 h-5" />,
    features: [
      { text: 'Todo lo del plan Básico', included: true },
      { text: '20 calculadoras avanzadas', included: true },
      { text: 'Calculadora de hipoteca', included: true },
      { text: 'IMC, TMB y calorías', included: true },
      { text: 'Conversor de divisas en tiempo real', included: true },
      { text: 'Estadística avanzada', included: true },
      { text: 'Calculadora de matrices', included: true },
      { text: 'Programador (hex/oct/bin)', included: true },
      { text: 'IRPF y calculadora financiera', included: true },
      { text: 'Historial ilimitado', included: true },
      { text: 'Sin anuncios', included: true },
      { text: 'Soporte prioritario', included: true },
    ],
    cta: 'Obtener Premium', ctaTo: '/registro',
  },
]

const faq = [
  { q: '¿Puedo cancelar en cualquier momento?', a: 'Sí, puedes cancelar tu suscripción cuando quieras. Seguirás teniendo acceso Premium hasta el final del período de facturación.' },
  { q: '¿Qué pasa con mis datos si cancelo?', a: 'Todos tus datos se almacenan localmente en tu dispositivo. Si cancelas, seguirás teniendo tus datos, pero no podrás añadir nuevos cálculos premium.' },
  { q: '¿Hay período de prueba?', a: 'El plan básico es gratuito de por vida, lo que te permite probar la plataforma sin límite de tiempo antes de decidir actualizar.' },
  { q: '¿El precio incluye IVA?', a: 'Los precios mostrados no incluyen IVA. El precio final dependerá de tu país de residencia.' },
]

export default function Pricing() {
  const { isPremium, isAuthenticated } = useAuth()

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
          Precios simples y <span className="gradient-text">transparentes</span>
        </h1>
        <p className="text-xl text-gray-400">Empieza gratis. Actualiza cuando lo necesites. Sin sorpresas.</p>
        {isPremium && (
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium">
            <Crown className="w-4 h-4" />Ya tienes el plan Premium activo
          </div>
        )}
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
        {plans.map(plan => (
          <div key={plan.id} className={`relative rounded-2xl p-8 flex flex-col ${
            plan.highlight ? 'bg-gradient-to-br from-primary-900/60 to-violet-900/60 border-2 border-primary-500/50 shadow-xl shadow-primary-500/10' : 'bg-gray-900 border border-gray-800'
          }`}>
            {plan.highlight && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="premium-badge px-4 py-1 text-sm">MÁS POPULAR</span>
              </div>
            )}
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
              plan.highlight ? 'bg-gradient-to-br from-primary-500 to-violet-500 text-white' : 'bg-gray-800 text-gray-400'
            }`}>{plan.icon}</div>
            <h3 className="text-2xl font-bold text-white mb-1">{plan.name}</h3>
            <p className="text-gray-500 text-sm mb-4">{plan.description}</p>
            <div className="mb-6">
              <span className="text-4xl font-extrabold text-white">{plan.price === 0 ? 'Gratis' : `${plan.price}€`}</span>
              {plan.price > 0 && <span className="text-gray-400 text-sm ml-2">{plan.period}</span>}
              {plan.price === 0 && <span className="text-gray-500 text-sm ml-2 block">{plan.period}</span>}
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              {plan.features.map(feat => (
                <li key={feat.text} className="flex items-start gap-2 text-sm">
                  {feat.included
                    ? <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.highlight ? 'text-primary-400' : 'text-emerald-400'}`} />
                    : <X className="w-4 h-4 flex-shrink-0 mt-0.5 text-gray-700" />}
                  <span className={feat.included ? 'text-gray-300' : 'text-gray-600'}>{feat.text}</span>
                </li>
              ))}
            </ul>
            {isPremium && plan.id === 'premium' ? (
              <div className="w-full text-center py-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 font-semibold text-sm">Plan activo</div>
            ) : (
              <Link to={isAuthenticated ? '/dashboard' : plan.ctaTo}
                className={`w-full block text-center py-3 rounded-xl font-semibold transition-all ${
                  plan.highlight ? 'btn-primary' : 'btn-secondary'
                }`}>
                {isAuthenticated && plan.id === 'basic' ? 'Ir al panel' : plan.cta}
              </Link>
            )}
          </div>
        ))}
      </div>

      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-white text-center mb-8">Preguntas frecuentes</h2>
        <div className="space-y-4">
          {faq.map(item => (
            <div key={item.q} className="p-5 rounded-xl bg-gray-900 border border-gray-800">
              <h3 className="font-semibold text-white mb-2">{item.q}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
