import { Link } from 'react-router-dom'
import { Calculator, Github, Heart } from 'lucide-react'

const footerLinks = {
  Calculadoras: [
    { label: 'Básica', to: '/calculadoras/basica' },
    { label: 'Científica', to: '/calculadoras/cientifica' },
    { label: 'Hipoteca', to: '/calculadoras/hipoteca' },
    { label: 'Ver todas', to: '/calculadoras' },
  ],
  Empresa: [
    { label: 'Inicio', to: '/' },
    { label: 'Precios', to: '/precios' },
    { label: 'Licencia', to: '/licencia' },
  ],
  Cuenta: [
    { label: 'Iniciar sesión', to: '/login' },
    { label: 'Registrarse', to: '/registro' },
    { label: 'Panel de control', to: '/dashboard' },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary-600 to-violet-600">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white">
                Calc<span className="text-primary-400">Pro</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              La plataforma de calculadoras más completa. Más de 20 tipos para cada necesidad.
            </p>
            <a
              href="https://github.com/daniwth/calculator"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" />
              Ver en GitHub
            </a>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-sm font-semibold text-white mb-3">{section}</h3>
              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} CalcPro. Licencia MIT.
          </p>
          <p className="text-sm text-gray-600 flex items-center gap-1">
            Hecho con <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> por{' '}
            <a href="https://daniwth.me" target="_blank" rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300 transition-colors">
              daniwth
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
