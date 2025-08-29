import { useCallback, useEffect, useRef, useState } from "react";
import { motion as Motion } from "framer-motion";

// SOP – DESCARGA COMPLETA DEL SISTEMA DE ENTREGA DEL SERVICIO (6 pasos)
const STEPS = [
  {
    id: "estructura",
    title: "Estructura general",
    fields: [
      { name: "duracion_programa", label: "¿Cuánto dura el programa?", type: "textarea", required: true },
      { name: "organizacion_contenido", label: "¿Cómo está organizado el contenido? (semanas, módulos, niveles, fases)", type: "textarea", required: true },
      { name: "diferencias_clientes", label: "¿Hay diferencias entre tipos de clientes? (VIP, grupos, 1:1… ¿qué cambia?)", type: "textarea", required: true },
    ],
  },
  {
    id: "contenido",
    title: "Contenido que se entrega",
    fields: [
      { name: "recibe_por_semana", label: "¿Qué recibe exactamente el cliente en cada semana/módulo?", type: "textarea", required: true },
      { name: "tipos_materiales", label: "¿Qué materiales se entregan? (videos, PDFs, formularios, tareas)", type: "textarea", required: true },
      { name: "plataformas", label: "¿Qué plataformas se utilizan? (Drive, Notion, Kajabi, etc.)", type: "textarea", required: true },
      { name: "comunidad_soporte", label: "¿Existe comunidad/grupo de soporte? ¿Quién modera y cada cuánto se interactúa?", type: "textarea", required: true },
    ],
  },
  {
    id: "sesiones",
    title: "Sesiones en vivo",
    fields: [
      { name: "sesiones_vivo", label: "¿Se brindan sesiones en vivo? ¿Individuales, grupales o mixtas?", type: "textarea", required: true },
      { name: "frecuencia_sesiones", label: "¿Con qué frecuencia?", type: "textarea", required: true },
      { name: "quien_dicta", label: "¿Quién las dicta y cuánto duran?", type: "textarea", required: true },
      { name: "grabaciones", label: "¿Se graban y envían? ¿Cómo acceden las personas?", type: "textarea", required: true },
    ],
  },
  {
    id: "soporte",
    title: "Soporte y acompañamiento",
    fields: [
      { name: "canales_dudas", label: "¿Por dónde se responden dudas? (WhatsApp, Telegram, email…)", type: "textarea", required: true },
      { name: "responsables_horarios", label: "¿Quién responde y en qué horario?", type: "textarea", required: true },
      { name: "seguimiento_individual", label: "¿Hay seguimiento individualizado o general? ¿Cómo se hace?", type: "textarea", required: true },
      { name: "onboarding", label: "¿Se hace onboarding? (videos, llamadas, correos, automatizaciones; manual/automatizado)", type: "textarea", required: true },
    ],
  },
  {
    id: "seguimiento_control",
    title: "Seguimiento y control del avance",
    fields: [
      { name: "sistema_trackeo", label: "¿Se utiliza algún sistema para trackear el avance?", type: "textarea", required: true },
      { name: "seguimiento_tareas", label: "¿Se hace seguimiento de tareas/compromisos? ¿Cómo?", type: "textarea", required: true },
      { name: "metricas_progreso", label: "¿Existen métricas para medir progreso? ¿Cuáles y cómo se evalúan?", type: "textarea", required: true },
    ],
  },
  {
    id: "estado_actual",
    title: "Estado actual del delivery",
    fields: [
      { name: "funciona_bien", label: "¿Qué partes están funcionando bien hoy? (lista concreta)", type: "textarea", required: true },
      { name: "pendientes_desorden", label: "¿Qué partes están pendientes/desordenadas/no se hacen?", type: "textarea", required: true },
      { name: "intentos_previos", label: "¿Qué cosas se intentaron y se dejaron? (ideas, campañas, dinámicas)", type: "textarea", required: true },
      { name: "faltantes", label: "¿Qué falta hoy? ¿Qué piden seguido los clientes y no está resuelto?", type: "textarea", required: true },
    ],
  },
];

function Field({ f, isFirst, value, onChange, firstFieldRef }) {
  const base =
    "w-full rounded-2xl bg-black/40 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/80 focus:border-white/80 transition p-4 placeholder-white/40 text-white";

  const handleChange = useCallback(
    (e) => onChange(f.name, e.target.value),
    [onChange, f.name]
  );

  const commonProps = {
    id: f.name,
    name: f.name,
    required: f.required,
    value,
    onChange: handleChange,
    autoComplete: "off",
    ...(isFirst ? { ref: firstFieldRef } : {}),
  };

  if (f.type === "textarea") {
    return (
      <textarea
        className={`${base} min-h-[140px] resize-vertical`}
        {...commonProps}
      />
    );
  }

  return <input className={base} type={f.type} {...commonProps} />;
}

export default function SOPWizard() {
  const [stepIndex, setStepIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState(() => {
    const initial = {};
    STEPS.forEach((s) => s.fields.forEach((f) => (initial[f.name] = "")));
    return initial;
  });

  // progreso real sobre 6 pasos
  const progress = Math.round(((stepIndex + 1) / STEPS.length) * 100);

  // foco explícito sólo cuando cambia de paso (no en cada tecla)
  const firstFieldRef = useRef(null);
  useEffect(() => {
    firstFieldRef.current?.focus();
  }, [stepIndex]);

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateStep = () => {
    const step = STEPS[stepIndex];
    return step.fields.every((f) => !f.required || String(form[f.name]).trim() !== "");
  };

  const next = () => {
    if (!validateStep()) return;
    if (stepIndex < STEPS.length - 1) setStepIndex((i) => i + 1);
    else setSubmitted(true);
  };

  const back = () => setStepIndex((i) => Math.max(0, i - 1));

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-neutral-900 text-white p-6">
      <div className="w-full max-w-2xl bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
        <div className="px-8 pt-8 pb-4 flex flex-col items-center justify-center text-center gap-2">
          <img src="/logo_ops.png" alt="OPS" className="h-10" />
          <div className="uppercase tracking-widest text-xs text-white/60">OPS</div>
          <span className="text-xs text-white/60">SOP – Descarga completa</span>
        </div>

        <div className="px-8 pb-6">
          <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
            <Motion.div
              key={stepIndex} // sólo cambia cuando cambia de paso
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: `${progress}%`, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="h-full bg-white"
            />
          </div>
          <div className="flex justify-between mt-2 text-[11px] text-white/60">
            <span>Paso {stepIndex + 1} de {STEPS.length}</span>
            <span>{progress}%</span>
          </div>
        </div>

        <div className="px-8 pb-8">
          {submitted ? (
            <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
              <h2 className="text-2xl font-semibold mb-3">Gracias, recibimos tu info</h2>
              <p className="text-white/70">Nos pondremos en contacto a la brevedad.</p>
            </Motion.div>
          ) : (
            <div>
              {STEPS.length > 0 && (
                <Motion.div
                  key={STEPS[stepIndex].id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <h2 className="text-lg font-semibold mb-4">{STEPS[stepIndex].title}</h2>
                  <div className="space-y-4">
                    {STEPS[stepIndex].fields.map((f, idx) => (
                      <div key={f.name} className="space-y-2">
                        <label className="text-sm text-white/80" htmlFor={f.name}>{f.label}</label>
                        <Field
                          f={f}
                          isFirst={idx === 0}
                          value={form[f.name] ?? ""}
                          onChange={handleChange}
                          firstFieldRef={firstFieldRef}
                        />
                      </div>
                    ))}
                  </div>
                </Motion.div>
              )}

              <div className="mt-8 flex items-center gap-3">
                <Motion.button
                  whileTap={{ scale: 0.98, opacity: 0.9 }}
                  onClick={back}
                  disabled={stepIndex === 0}
                  className="px-5 py-3 rounded-2xl border border-white/20 text-white/80 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/10 transition"
                >
                  Atrás
                </Motion.button>
                <Motion.button
                  whileTap={{ scale: 0.98, opacity: 0.9 }}
                  onClick={next}
                  className="ml-auto px-6 py-3 rounded-2xl bg-white text-black font-medium hover:bg-white/90 transition"
                >
                  {stepIndex < STEPS.length - 1 ? "Siguiente" : "Enviar"}
                </Motion.button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
