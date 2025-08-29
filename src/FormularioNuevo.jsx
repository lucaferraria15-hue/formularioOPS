import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion' // eslint-disable-line no-unused-vars
import logo from './assets/react.svg'

const STEPS = [
  {
    id: 1,
    title: 'Identificación y demográficos',
    fields: [
      { name: 'provincia', label: 'Provincia/Estado', type: 'text', required: true },
      { name: 'ciudad', label: 'Ciudad y barrio / código postal', type: 'text', required: true },
      { name: 'edad', label: 'Edad', type: 'number', required: true },
      { name: 'genero', label: 'Género', type: 'text', required: true },
      { name: 'ocupacion', label: 'Ocupación actual / rubro', type: 'textarea', required: true },
      {
        name: 'condicionLaboral',
        label: 'Condición laboral',
        type: 'select',
        options: ['Cuenta propia', 'Relación de dependencia', 'Mixto'],
        required: true,
      },
      {
        name: 'estadoCivil',
        label: 'Estado civil / ¿convivís? ¿hijxs?',
        type: 'text',
        required: true,
      },
      {
        name: 'participacionHijos',
        label: 'Si tenés hijxs, ¿participan o influyen en tu rutina/decisiones? ¿Cómo?',
        type: 'textarea',
        required: false,
      },
      {
        name: 'ingresos',
        label: 'Ingresos mensuales aproximados (rango) Opcional',
        type: 'select',
        options: ['<1000', '1000-2000', '2000-3000', '>3000'],
        required: false,
      },
    ],
  },
  {
    id: 2,
    title: 'Situación actual (diagnóstico)',
    fields: [
      {
        name: 'situacionActual',
        label: '¿Cómo describirías tu situación actual en 3–5 frases?',
        type: 'textarea',
        required: true,
      },
      {
        name: 'objetivoPrincipal',
        label: '¿Cuál es hoy tu objetivo principal?',
        type: 'text',
        required: true,
      },
      {
        name: 'metricas',
        label: '¿Qué métricas/indicadores usás para evaluar tu progreso?',
        type: 'text',
        required: true,
      },
      {
        name: 'obstaculos',
        label: '¿Qué obstáculos concretos te frenan hoy?',
        type: 'textarea',
        required: true,
      },
      {
        name: 'intentosUltimos',
        label: '¿Qué intentos hiciste en los últimos 6–12 meses para mejorar?',
        type: 'textarea',
        required: true,
      },
      {
        name: 'funcionoParcial',
        label: '¿Qué funcionó parcialmente y por qué creés que no alcanzó?',
        type: 'textarea',
        required: true,
      },
      {
        name: 'noFunciono',
        label: '¿Qué no funcionó en absoluto y por qué?',
        type: 'textarea',
        required: true,
      },
      {
        name: 'frustracion',
        label: 'En una escala 1–10, ¿qué tan frustrante es tu situación actual?',
        type: 'number',
        required: true,
      },
    ],
  },
  {
    id: 3,
    title: 'Situación deseada (resultado y criterios de éxito)',
    fields: [
      {
        name: 'resultadoDeseado',
        label: 'Describí con precisión cómo querés estar dentro de 90 días.',
        type: 'textarea',
        required: true,
      },
      {
        name: 'cambiosNotar',
        label: '¿Qué cambios concretos notarías en tu día a día si ya hubieras logrado eso?',
        type: 'textarea',
        required: true,
      },
      {
        name: 'metricasExito',
        label: '¿Qué métricas/indicadores confirmarían que llegaste?',
        type: 'text',
        required: true,
      },
      {
        name: 'importanciaAhora',
        label: '¿Por qué es importante lograrlo ahora y no más adelante?',
        type: 'textarea',
        required: true,
      },
      {
        name: 'prioridad',
        label: 'En una escala 1–10, ¿qué prioridad real tiene para vos?',
        type: 'number',
        required: true,
      },
      {
        name: 'inaccion',
        label: '¿Qué pasaría si no hacés nada en los próximos 90 días? (Costo de inacción)',
        type: 'textarea',
        required: true,
      },
    ],
  },
  {
    id: 4,
    title: '“Dolor del dolor del dolor” (triple profundización)',
    fields: [
      {
        name: 'dolor1',
        label: '¿Qué te duele realmente de lo que pasa hoy?',
        type: 'textarea',
        required: true,
      },
      {
        name: 'dolor2',
        label: '¿Por qué eso te duele?',
        type: 'textarea',
        required: true,
      },
      {
        name: 'dolor3',
        label: '¿Y por qué eso te duele?',
        type: 'textarea',
        required: true,
      },
      {
        name: 'consecuencia',
        label: '¿Cuál es la consecuencia más profunda si esto no cambia?',
        type: 'textarea',
        required: true,
      },
      {
        name: 'impacto',
        label: '¿Qué impacto tiene en tu autoestima/relaciones/finanzas/salud?',
        type: 'textarea',
        required: true,
      },
      {
        name: 'frases',
        label: '¿Qué frases te decís cuando esto se repite?',
        type: 'textarea',
        required: true,
      },
    ],
  },
  {
    id: 5,
    title: '“Beneficio del beneficio del beneficio” (triple profundización)',
    fields: [
      {
        name: 'beneficio1',
        label: 'Si lograras tu objetivo principal, ¿cuál sería el primer beneficio visible?',
        type: 'textarea',
        required: true,
      },
      {
        name: 'beneficio2',
        label: '¿Qué beneficio más grande habilita ese primer beneficio?',
        type: 'textarea',
        required: true,
      },
      {
        name: 'beneficio3',
        label: '¿Cuál es el beneficio último (emocional/identitario) detrás de todo?',
        type: 'textarea',
        required: true,
      },
      {
        name: 'autoimagen',
        label: '¿Cómo cambiaría tu autoimagen si ya estuvieras ahí?',
        type: 'textarea',
        required: true,
      },
      {
        name: 'permitir',
        label: '¿Qué harías/serías/permitirías que hoy no hacés?',
        type: 'textarea',
        required: true,
      },
    ],
  },
  {
    id: 6,
    title: 'Intentos previos y aprendizaje',
    fields: [
      {
        name: 'accionesPrevias',
        label: 'Listá 3–5 acciones/servicios/metodologías que probaste (con fechas aprox.).',
        type: 'textarea',
        required: true,
      },
      {
        name: 'aprendizaje',
        label: '¿Qué aprendiste de cada experiencia?',
        type: 'textarea',
        required: true,
      },
      {
        name: 'repetiria',
        label: '¿Qué volverías a hacer igual y qué jamás repetirías?',
        type: 'textarea',
        required: true,
      },
    ],
  },
  {
    id: 7,
    title: 'Creencias, objeciones y barreras',
    fields: [
      {
        name: 'creencias',
        label: '¿Qué creencias internas te frenan y qué barreras externas te condicionan?',
        type: 'textarea',
        required: true,
      },
      {
        name: 'objeciones',
        label: '¿Qué objeciones te surgen al pensar en invertir/comprometerte ahora?',
        type: 'textarea',
        required: true,
      },
      {
        name: 'necesitas',
        label: '¿Qué necesitarías ver/entender para sentirte 100% decididx?',
        type: 'textarea',
        required: true,
      },
      {
        name: 'influye',
        label: '¿Quién más influye en tu decisión?',
        type: 'text',
        required: true,
      },
      {
        name: 'listoDecidir',
        label: 'En una escala 1–10, ¿qué tan listx te sentís para decidir si el camino es claro?',
        type: 'number',
        required: true,
      },
    ],
  },
  {
    id: 8,
    title: 'Contexto de uso / hábitos / frecuencia',
    fields: [
      {
        name: 'habitos',
        label: '¿Qué hábitos actuales sostienen (o sabotean) tu objetivo?',
        type: 'textarea',
        required: true,
      },
      {
        name: 'frecuencia',
        label: 'Frecuencia de práctica/acción relacionada al objetivo (veces por semana/mes).',
        type: 'text',
        required: true,
      },
      {
        name: 'recursos',
        label: '¿Qué recursos/entornos tenés disponibles? (tiempo, herramientas, equipo, presupuesto)',
        type: 'textarea',
        required: true,
      },
      {
        name: 'momentos',
        label: '¿En qué momentos del día rendís/mejor funcionás?',
        type: 'text',
        required: true,
      },
    ],
  },
  {
    id: 9,
    title: 'Preferencias de aprendizaje y soporte',
    fields: [
      {
        name: 'formato',
        label:
          '¿Preferís material grabado, sesiones en vivo, 1:1, grupal, comunidad? ¿Por qué?',
        type: 'textarea',
        required: true,
      },
      {
        name: 'feedback',
        label:
          '¿Qué tipo de feedback necesitás (técnico, estratégico, emocional, accountability)?',
        type: 'textarea',
        required: true,
      },
      {
        name: 'horas',
        label: '¿Cuántas horas semanales podés dedicar con realismo?',
        type: 'number',
        required: true,
      },
      {
        name: 'horario',
        label: '¿En qué franja horaria podés participar (tu huso horario)?',
        type: 'text',
        required: true,
      },
    ],
  },
  {
    id: 10,
    title: 'Perfil de compra y ROI percibido',
    fields: [
      {
        name: 'resultados',
        label: '¿Qué resultados esperás en 30/60/90 días?',
        type: 'textarea',
        required: true,
      },
      {
        name: 'medirRetorno',
        label:
          '¿Cómo medirías el retorno (resultado, experiencia, tiempo ahorrado, ingresos, etc.)?',
        type: 'textarea',
        required: true,
      },
      {
        name: 'presupuesto',
        label: '¿Qué presupuesto estás dispuesto a invertir si el plan es claro?',
        type: 'text',
        required: true,
      },
      {
        name: 'preferenciaPago',
        label: '¿Preferencias de pago? (único/cuotas)',
        type: 'select',
        options: ['Único', 'Cuotas'],
        required: true,
      },
      {
        name: 'condicionSi',
        label: '¿Qué condición te haría decir “sí” hoy?',
        type: 'textarea',
        required: true,
      },
    ],
  },
]

const initialForm = STEPS.reduce((acc, step) => {
  step.fields.forEach(f => {
    acc[f.name] = ''
  })
  return acc
}, {})

export default function FormularioNuevo() {
  const [form, setForm] = useState(initialForm)
  const [stepIndex, setStepIndex] = useState(0)

  const handleChange = (name, value) => {
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const validateStep = () => {
    const current = STEPS[stepIndex]
    return current.fields.every(f => {
      if (!f.required) return true
      if (f.name === 'participacionHijos' && !form.estadoCivil?.toLowerCase().includes('hij'))
        return true
      return form[f.name] && form[f.name].toString().trim() !== ''
    })
  }

  const nextStep = () => {
    if (validateStep() && stepIndex < STEPS.length - 1) setStepIndex(i => i + 1)
  }
  const prevStep = () => {
    if (stepIndex > 0) setStepIndex(i => i - 1)
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (validateStep()) {
      console.log(form)
    }
  }

  const step = STEPS[stepIndex]
  const progress = ((stepIndex + 1) / STEPS.length) * 100
  const isLast = stepIndex === STEPS.length - 1

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-neutral-900 text-white p-6">
      <div className="max-w-2xl w-full bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
        <div className="flex flex-col items-center gap-2 py-6 border-b border-white/10">
          <img src={logo} alt="logo" className="h-10" />
          <span className="uppercase tracking-widest text-xs text-white/60">Marca</span>
          <span className="text-xs text-white/60">Subtítulo</span>
        </div>
        <div className="px-6 py-4">
          <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden mb-3">
            <motion.div
              className="h-full bg-white"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: `${progress}%`, opacity: 1 }}
              transition={{ duration: 0.6 }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-white/60 mb-6">
            <span>
              Paso {stepIndex + 1} / {STEPS.length}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={step.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col gap-4"
              >
                <h2 className="text-xl text-white mb-2">{step.title}</h2>
                {step.fields.map(field => {
                  if (
                    field.name === 'participacionHijos' &&
                    !form.estadoCivil?.toLowerCase().includes('hij')
                  )
                    return null
                  if (field.type === 'textarea') {
                    return (
                      <textarea
                        key={field.name}
                        name={field.name}
                        value={form[field.name]}
                        onChange={e => handleChange(field.name, e.target.value)}
                        placeholder={field.label}
                        className="w-full rounded-2xl bg-black/40 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/80 focus:border-white/80 transition p-4 placeholder-white/40 text-white min-h-[140px] resize-vertical"
                        required={field.required}
                      />
                    )
                  }
                  if (field.type === 'select') {
                    return (
                      <select
                        key={field.name}
                        name={field.name}
                        value={form[field.name]}
                        onChange={e => handleChange(field.name, e.target.value)}
                        className="w-full rounded-2xl bg-black/40 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/80 focus:border-white/80 transition p-4 text-white"
                        required={field.required}
                      >
                        <option value="" className="text-black">
                          {field.label}
                        </option>
                        {field.options?.map(opt => (
                          <option key={opt} value={opt} className="text-black">
                            {opt}
                          </option>
                        ))}
                      </select>
                    )
                  }
                  return (
                    <input
                      key={field.name}
                      type={field.type}
                      name={field.name}
                      value={form[field.name]}
                      onChange={e => handleChange(field.name, e.target.value)}
                      placeholder={field.label}
                      className="w-full rounded-2xl bg-black/40 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/80 focus:border-white/80 transition p-4 placeholder-white/40 text-white"
                      required={field.required}
                    />
                  )
                })}
                <div className="flex gap-4 mt-6">
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={stepIndex === 0}
                    className="px-5 py-3 rounded-2xl border border-white/20 text-white/80 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/10 transition"
                  >
                    Atrás
                  </button>
                  <button
                    type={isLast ? 'submit' : 'button'}
                    onClick={isLast ? handleSubmit : nextStep}
                    className="ml-auto px-6 py-3 rounded-2xl bg-white text-black font-medium hover:bg-white/90 transition"
                  >
                    {isLast ? 'Enviar' : 'Siguiente'}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </form>
        </div>
      </div>
    </div>
  )
}
