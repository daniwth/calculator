import { Link } from 'react-router-dom'
import { Calculator, Zap, Lock, TrendingUp, Shield, Star, ArrowRight, Check } from 'lucide-react'
import { getPopularCalculators } from '../lib/calculators'
import CalculatorCard from '../components/calculators/CalculatorCard'

const features = [
  { icon: <Calculator className="w-6 h-6" />, title: '20+ Calculadoras', desc: 'Desde básica hasta financiera avanzada. Tenemos la herramienta que necesitas.' },
  { icon: <Zap className="w-6 h-6" />, title: 'Resultados instantáneos', desc: 'Cálculos en tiempo real sin esperas. Interfaz optimizada para máxima velocidad.' },
  { icon: <Shield className="w-6 h-6" />, title: '100% Privado', desc: 'Tus datos nunca salen de tu dispositivo. Sin servidores, sin seguimiento.' },
  { icon: <TrendingUp className="w-6 h-6" />, title: 'Historial & Favoritos', desc: 'Guarda tus cálculos y accede a ellos cuando los necesites.' },
  { icon: <Lock className="w-6 h-6" />, title: 'Sin anuncios en Premium', desc: 'Experiencia limpia y profesional sin interrupciones ni distracciones.' },
  { icon: <Star className="w-6 h-6" />, title: 'Diseño profesional', desc: 'Interfaz moderna y fácil de usar, adaptada a móvil y escritorio.' },
]

const pricingFeatures = {
  free: ['6 calculadoras esenciales', 'Calculadora básica y científica', 'Conversor de unidades', 'Historial de 10 cálculos', 'Acceso sin registro'],
  premium: ['Todo lo del plan Básico', '20 calculadoras avanzadas', 'IMC, Hipoteca, Préstamos', 'Divisas, Estadística, Matrices', 'Historial ilimitado', 'Sin anuncios', 'Soporte prioritario'],
}

export default function Home() {
  const popular = getPopularCalculators()

  return (
    <div className="min-h-screen">
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-6">
            <Zap className="w-3.5 h-3.5" />20+ calculadoras profesionales
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
            La calculadora que{' '}<span className="gradient-text">siempre quisiste</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Hipotecas, IMC, estadística, divisas, matrices y mucho más. Todas las calculadoras que necesitas, en un solo lugar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/calculadoras" className="px-8 py-3.5 rounded-xl btn-primary text-base font-semibold inline-flex items-center gap-2 justify-center">
              Ver todas las calculadoras<ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/registro" className="px-8 py-3.5 rounded-xl btn-secondary text-base font-semibold inline-flex items-center gap-2 justify-center">
              Crear cuenta gratis
            </Link>
          </div>
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {[{ value: '20+', label: 'Calculadoras' }, { value: '100%', label: 'Gratis para empezar' }, { value: '0€', label: 'Para siempre básico' }].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-extrabold gradient-text">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Las más populares</h2>
            <p className="text-gray-400">Las calculadoras que más utilizan nuestros usuarios</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {popular.map(calc => <CalculatorCard key={calc.slug} calculator={calc} />)}
          </div>
          <div className="text-center mt-8">
            <Link to="/calculadoras" className="btn-secondary inline-flex items-center gap-2 px-6 py-2.5 rounded-xl">
              Ver todas las calculadoras<ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">¿Por qué <span className="gradient-text">CalcPro</span>?</h2>
            <p className="text-gray-400">Todo lo que necesitas, sin lo que no necesitas</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(f => (
              <div key={f.title} className="p-6 rounded-2xl bg-gray-900 border border-gray-800 hover:border-gray-700 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 text-primary-400 flex items-center justify-center mb-4">{f.icon}</div>
                <h3 className="text-base font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Planes simples y transparentes</h2>
            <p className="text-gray-400">Empieza gratis, actualiza cuando quieras</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 rounded-2xl bg-gray-900 border border-gray-800">
              <h3 className="text-xl font-bold text-white mb-1">Básico</h3>
              <div className="text-4xl font-extrabold text-white mb-1">Gratis</div>
              <p className="text-gray-500 text-sm mb-6">Para siempre</p>
              <ul className="space-y-3 mb-8">
                {pricingFeatures.free.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <Link to="/registro" className="block w-full text-center btn-secondary px-6 py-3 rounded-xl font-semibold">Empezar gratis</Link>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-primary-900/50 to-violet-900/50 border border-primary-500/30 relative overflow-hidden">
              <div className="absolute top-4 right-4 premium-badge">POPULAR</div>
              <div className="relative">
                <h3 className="text-xl font-bold text-white mb-1">Premium</h3>
                <div className="text-4xl font-extrabold text-white mb-1">4,99€<span className="text-base font-normal text-gray-400">/mes</span></div>
                <p className="text-gray-500 text-sm mb-6">Facturación mensual</p>
                <ul className="space-y-3 mb-8">
                  {pricingFeatures.premium.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                      <Check className="w-4 h-4 text-primary-400 flex-shrink-0" />{f}
                    </li>
                  ))}
                </ul>
                <Link to="/precios" className="block w-full text-center btn-primary px-6 py-3 rounded-xl font-semibold">Obtener Premium</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="p-10 rounded-3xl bg-gradient-to-br from-primary-900/60 to-violet-900/60 border border-primary-500/20">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Empieza a calcular hoy</h2>
            <p className="text-gray-400 mb-8">Sin tarjeta de crédito. Sin compromisos. Acceso instantáneo a todas las calculadoras básicas.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/calculadoras" className="btn-primary px-8 py-3 rounded-xl font-semibold inline-flex items-center gap-2 justify-center">
                Explorar calculadoras<ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/registro" className="btn-secondary px-8 py-3 rounded-xl font-semibold">Crear cuenta gratis</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
