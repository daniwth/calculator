// Master registry of all calculators
// tier: 'free' | 'premium'
// category: string used for filtering

export const CALCULATOR_CATEGORIES = [
  { id: 'all', label: 'Todas' },
  { id: 'basica', label: 'Básica' },
  { id: 'cientifica', label: 'Científica' },
  { id: 'financiera', label: 'Financiera' },
  { id: 'salud', label: 'Salud' },
  { id: 'conversion', label: 'Conversión' },
  { id: 'matematica', label: 'Matemática' },
  { id: 'programacion', label: 'Programación' },
  { id: 'fechas', label: 'Fechas' },
  { id: 'vida', label: 'Cotidiana' },
]

export const CALCULATORS = [
  // ── FREE ───────────────────────────────────────────────
  { slug: 'basica', nombre: 'Calculadora Básica', descripcion: 'Operaciones aritméticas con historial de cálculos y memoria.', categoria: 'basica', tier: 'free', icon: '🔢', tags: ['suma', 'resta', 'multiplicación', 'división', 'básica'], popular: true },
  { slug: 'cientifica', nombre: 'Calculadora Científica', descripcion: 'Funciones trigonométricas, logaritmos, potencias, raíces y constantes matemáticas.', categoria: 'cientifica', tier: 'free', icon: '📐', tags: ['seno', 'coseno', 'tangente', 'logaritmo', 'raíz', 'científica'], popular: true },
  { slug: 'porcentajes', nombre: 'Calculadora de Porcentajes', descripcion: 'Calcula el porcentaje de una cantidad, variación porcentual y porcentaje inverso.', categoria: 'matematica', tier: 'free', icon: '%', tags: ['porcentaje', 'descuento', 'aumento', 'variación'], popular: true },
  { slug: 'propinas', nombre: 'Calculadora de Propinas', descripcion: 'Divide la cuenta entre personas y calcula la propina perfecta.', categoria: 'vida', tier: 'free', icon: '🍽️', tags: ['propina', 'dividir', 'cuenta', 'restaurante'], popular: false },
  { slug: 'unidades', nombre: 'Conversor de Unidades', descripcion: 'Convierte longitud, peso, temperatura, volumen, velocidad y área.', categoria: 'conversion', tier: 'free', icon: '📐', tags: ['metros', 'kilogramos', 'temperatura', 'conversión', 'unidades'], popular: true },
  { slug: 'descuentos', nombre: 'Calculadora de Descuentos', descripcion: 'Precio final con descuento, compara ofertas y calcula el ahorro real.', categoria: 'vida', tier: 'free', icon: '🏷️', tags: ['descuento', 'oferta', 'precio', 'ahorro', 'compra'], popular: false },
  // ── PREMIUM ────────────────────────────────────────────
  { slug: 'imc', nombre: 'Calculadora de IMC', descripcion: 'Índice de Masa Corporal con categorías, tabla de peso ideal y recomendaciones.', categoria: 'salud', tier: 'premium', icon: '⚖️', tags: ['IMC', 'peso', 'altura', 'salud', 'obesidad'], popular: true },
  { slug: 'hipoteca', nombre: 'Calculadora de Hipoteca', descripcion: 'Cuota mensual, total de intereses, tabla de amortización completa.', categoria: 'financiera', tier: 'premium', icon: '🏠', tags: ['hipoteca', 'préstamo', 'interés', 'vivienda', 'amortización'], popular: true },
  { slug: 'prestamos', nombre: 'Calculadora de Préstamos', descripcion: 'Cuotas mensuales, TIN, TAE y tabla de amortización detallada.', categoria: 'financiera', tier: 'premium', icon: '💳', tags: ['préstamo', 'cuota', 'interés', 'TIN', 'TAE'], popular: true },
  { slug: 'interes-compuesto', nombre: 'Interés Compuesto', descripcion: 'Capital final, gráfica de crecimiento y comparativa de escenarios.', categoria: 'financiera', tier: 'premium', icon: '📈', tags: ['interés', 'inversión', 'ahorro', 'compuesto', 'rentabilidad'], popular: true },
  { slug: 'divisas', nombre: 'Conversor de Divisas', descripcion: 'Conversión entre más de 30 monedas con tasas de cambio actualizadas.', categoria: 'conversion', tier: 'premium', icon: '💱', tags: ['divisa', 'moneda', 'EUR', 'USD', 'tipo de cambio'], popular: true },
  { slug: 'estadisticas', nombre: 'Calculadora Estadística', descripcion: 'Media, mediana, moda, varianza, desviación típica y más.', categoria: 'matematica', tier: 'premium', icon: '📊', tags: ['estadística', 'media', 'mediana', 'varianza', 'desviación'], popular: false },
  { slug: 'matrices', nombre: 'Calculadora de Matrices', descripcion: 'Suma, multiplicación, determinante e inversa de matrices hasta 4×4.', categoria: 'matematica', tier: 'premium', icon: '🔲', tags: ['matriz', 'determinante', 'inversa', 'álgebra', 'linear'], popular: false },
  { slug: 'programador', nombre: 'Calculadora Programador', descripcion: 'Conversión Decimal/Hex/Octal/Binario con operaciones bitwise.', categoria: 'programacion', tier: 'premium', icon: '💻', tags: ['binario', 'hexadecimal', 'octal', 'bitwise', 'AND', 'OR'], popular: false },
  { slug: 'fechas', nombre: 'Calculadora de Fechas', descripcion: 'Diferencia entre fechas, días laborables, edad exacta y próximas fechas.', categoria: 'fechas', tier: 'premium', icon: '📅', tags: ['fecha', 'días', 'semanas', 'meses', 'laboral', 'edad'], popular: false },
  { slug: 'geometria', nombre: 'Calculadora de Geometría', descripcion: 'Áreas y perímetros de figuras 2D y volúmenes de sólidos 3D.', categoria: 'matematica', tier: 'premium', icon: '📐', tags: ['geometría', 'área', 'perímetro', 'volumen', 'círculo', 'triángulo'], popular: false },
  { slug: 'combustible', nombre: 'Calculadora de Combustible', descripcion: 'Consumo por 100km, coste por kilómetro y comparativa entre vehículos.', categoria: 'vida', tier: 'premium', icon: '⛽', tags: ['combustible', 'gasolina', 'consumo', 'coche', 'litros'], popular: false },
  { slug: 'calorias', nombre: 'Calculadora de Calorías', descripcion: 'TMB, TDEE, déficit calórico y distribución de macronutrientes.', categoria: 'salud', tier: 'premium', icon: '🥗', tags: ['calorías', 'TMB', 'TDEE', 'dieta', 'macros', 'nutrición'], popular: true },
  { slug: 'irpf', nombre: 'Calculadora IRPF', descripcion: 'Cálculo de tramos del IRPF español, tipo efectivo y neto anual.', categoria: 'financiera', tier: 'premium', icon: '📋', tags: ['IRPF', 'impuestos', 'salario', 'bruto', 'neto', 'retención'], popular: true },
  { slug: 'financiera', nombre: 'Calculadora Financiera', descripcion: 'VAN, TIR, período de recuperación y análisis de rentabilidad.', categoria: 'financiera', tier: 'premium', icon: '💼', tags: ['VAN', 'TIR', 'rentabilidad', 'inversión', 'flujo de caja'], popular: false },
]

export function getCalculatorBySlug(slug) { return CALCULATORS.find(c => c.slug === slug) || null }
export function getFreeCalculators() { return CALCULATORS.filter(c => c.tier === 'free') }
export function getPremiumCalculators() { return CALCULATORS.filter(c => c.tier === 'premium') }
export function getPopularCalculators() { return CALCULATORS.filter(c => c.popular) }
export function getCalculatorsByCategory(category) {
  if (category === 'all') return CALCULATORS
  return CALCULATORS.filter(c => c.categoria === category)
}
