/* ============================================================================
   REDALCO — Plan de emails Agosto 2026 / Julio 2027
   Fuente del copy: 1_REDALCO_TODOS_LOS_MAILS.md (transcripción literal).
   Foco, objetivo, checklist y notas: derivados del contexto del plan
   (el archivo original solo trae asunto, preview y cuerpo).
   ========================================================================== */

const SEGMENTOS = {
  socios: {
    nombre: 'Socios mensuales activos',
    icono: '🟢',
    color: 'verde',
    conversion: 'Referidos / bajas evitadas',
    nota: 'Nunca se les pide plata: se les agradece, se les muestra y se les pide amplificar o referir.'
  },
  mp: {
    nombre: 'Donantes Misión Platos',
    icono: '🟡',
    color: 'dorado',
    conversion: 'Conversiones a socio mensual',
    nota: 'Cohorte que donó una sola vez en junio. El primer pedido directo recién va en octubre (mes 3).'
  },
  leads: {
    nombre: 'Leads de ferias y eventos',
    icono: '🔵',
    color: 'azul',
    conversion: 'Conversiones (mensual o puntual)',
    nota: 'Objetivo: convertir a socio mensual o, en su defecto, donación puntual. Preferir mensual.'
  },
  ex: {
    nombre: 'Ex socios / pausados / bajas',
    icono: '🔴',
    color: 'rojo',
    conversion: 'Reactivaciones',
    nota: 'Solo 4 mails en TODO el año, muy espaciados. Sin presión, sin reclamo.'
  }
};

const BENCHMARKS = {
  apertura: { min: 25, max: 29, label: 'Apertura ONGs: 25–29%' },
  ctr: { min: 0.59, label: 'CTR fundraising: ~0,59%' },
  roi: { label: 'ROI email marketing: $42 por cada $1' }
};

const MESES = [
  /* ====================== AGOSTO 2026 ====================== */
  {
    id: 'ago26',
    nombre: 'Agosto 2026',
    corto: 'Ago 26',
    foco: 'Arranque del plan. Se activan los 4 segmentos por primera vez. Nadie recibe un pedido de plata.',
    emails: [
      {
        id: 'ago26-socios',
        seg: 'socios',
        titulo: 'Mail #1 — Pertenencia',
        foco: 'Día del Niño + sensibilizar, sin pedir nada',
        objetivo: 'Retención y sentido de pertenencia. Meta: 30%+ de apertura.',
        asunto: 'Lo que rescatamos alimenta socios cada mes',
        preview: 'Historias de chicos que comen gracias a vos, todos los meses.',
        copy: `Hola [Nombre],

Tu aporte cada mes alimenta chicos como Camila, que ahora hace la tarea con la panza llena. Como Tomás, que juega en la ronda con energía. Como [Nombre], que cocina con frutas frescas por primera vez en meses.

No es una sola vez. Es todos los meses.

Por eso tu aporte importa 12 veces al año, no una.

Gracias por estar del lado correcto.

[CTA: Fotos en Instagram →]`
      },
      {
        id: 'ago26-mp',
        seg: 'mp',
        titulo: 'Mail #1 — Mes 2 de la cohorte',
        foco: 'Día del Niño: mostrar a quién llegó el aporte de junio',
        objetivo: 'Cerrar el círculo del aporte de junio. NO pedir plata todavía. Meta: 28%+ de apertura.',
        asunto: 'Día del Niño: los chicos que comen gracias a tu aporte de junio',
        preview: 'Historias de 4 chicos para los que tu aporte de junio cambió agosto.',
        copy: `Hola [Nombre],

Hace dos meses donaste en Misión Platos. Hoy 16 de agosto es Día del Niño. Te presentamos a quiénes llega tu aporte.

**Camila** hace la tarea sin hambre en la cabeza en [Org A]. **Mateo** come variado cada semana en [Org B]. **Sofía y Bruno** toman zumo fresco todos los viernes en [Org C].

No son números. Son cuatro de los miles de chicos para los que tu aporte de junio fue la diferencia.

¿Querés que esto pase todos los meses, no solo junio?

[CTA: Quiero ser socio mensual →]

Gracias por pensarlo.`
      },
      {
        id: 'ago26-leads',
        seg: 'leads',
        titulo: 'Mail #1 — Primer contacto',
        foco: 'Reencuadre: el dato que justifica que Redalco exista',
        objetivo: 'Recordar quiénes somos y ganarse la apertura del mail #2. Meta: 25%+ de apertura.',
        asunto: '125 millones de kilos se tiran al año en Uruguay',
        preview: 'El número que cuesta creer sobre desperdicio.',
        copy: `Hola [Nombre],

Nos encontramos hace poco en [Evento]. Acá va el número que no queremos que olvides.

En Uruguay se tiran **125 millones de kilos de frutas y verduras cada año**.

Mientras tanto: **250.000 personas no tienen garantizado un plato de comida todos los días.**

No es un detalle. Es una brecha. Nosotros la cerramos hace 10 años.

[CTA: Ver rescates en Instagram →]`
      },
      {
        id: 'ago26-ex',
        seg: 'ex',
        titulo: 'Mail #1 de 4 — Reencuentro',
        foco: 'Contar que Redalco creció. Nada de reclamo.',
        objetivo: 'Reabrir la conversación. Meta: 20%+ de apertura, sin picos de bajas.',
        asunto: 'Te extrañamos — pasaron cosas en Redalco',
        preview: 'No es reclamo. Es: crezcamos juntos de nuevo.',
        copy: `Hola [Nombre],

Fuiste socio/a con nosotros. Se pausó en algún momento. No te escribimos a reclamar, sino a contarte que crecimos.

Hoy llegamos a **400+ organizaciones**. Hace exactamente **10 años** que empezó todo. Cada semana rescatamos más.

¿Vale la pena intentar de nuevo, aunque sea con otro monto?

[CTA: Quiero volver →]

No es el momento? Está bien. Nos alegra que hayas estado.`
      }
    ],
    checklistExtra: [
      'Etiquetar la cohorte MP 2026 en EmailOctopus',
      'Crear y validar las 4 listas de segmentos',
      'Validar plantilla visual (logo, pie, link de baja)',
      'Programar el envío antes del viernes 14 (el 16 es domingo y hay mucho ruido comercial)'
    ],
    notas: [
      'Mes 2 para la cohorte de Misión Platos: todavía NO se pide plata. El primer pedido directo va en octubre.',
      'Es el único mes donde salen los 4 segmentos juntos: revisar que nadie esté en dos listas a la vez.',
      'La fecha del Día del Niño quedó confirmada: en 2026 es el domingo 16 de agosto, tal como dice el copy.',
      'El copy trae placeholders reales sin completar ([Nombre], [Org A/B/C], [Evento]). No enviar sin reemplazarlos.'
    ]
  },

  /* ====================== SEPTIEMBRE 2026 ====================== */
  {
    id: 'sep26',
    nombre: 'Septiembre 2026',
    corto: 'Set 26',
    foco: 'Mes del voluntariado: invitar a ver el rescate con los propios ojos. Sin ex socios este mes.',
    emails: [
      {
        id: 'sep26-socios',
        seg: 'socios',
        titulo: 'Mail #2 — Voluntariado',
        foco: 'Invitación a la UAM, jueves de 15 a 18',
        objetivo: 'Profundizar el vínculo: pasar de donante a participante. Meta: 5+ socios anotados.',
        asunto: 'Voluntariado en la UAM: tocá dónde llega tu aporte',
        preview: 'Todos los jueves, 15 a 18hs. Un jueves. Sin compromiso.',
        copy: `Hola [Nombre],

Sos socio/a desde hace [X tiempo]. Tu aporte llega a organizaciones. ¿Querés verlo con tus ojos?

**Todos los jueves, 15 a 18hs, en la UAM rescatamos frutas.** Vos clasificás, lavás, embalás.

No es invisible. Es real.

Varios socios ya vienen. Dicen que leer "[X] platos" no es lo mismo que verlo pasar entre las manos.

¿Te animás? Un jueves. Sin compromiso.

[CTA: Quiero ir →]`
      },
      {
        id: 'sep26-mp',
        seg: 'mp',
        titulo: 'Mail #2 — Mes 3 de la cohorte',
        foco: 'Día del Estudiante (21/9): quiénes rescatan',
        objetivo: 'Humanizar el equipo y abrir la puerta al voluntariado. Sigue sin pedir plata.',
        asunto: 'Lucas, Camila, Bruno: 3 estudiantes que rescatan cada jueves',
        preview: 'Conocé a quiénes trabajan con nosotros.',
        copy: `Hola [Nombre],

Hoy es Día del Estudiante. Te presentamos a 3 pibes que rescatan con nosotros.

**Lucas (16):** "Hacer algo útil de verdad."

**Camila (14):** Su mamá cocina en una organización. Vino porque quería que lleguen más rescates.

**Bruno (19):** Hace 8 meses que va cada jueves. "Algo que importa."

Tu aporte de junio abrió la puerta. Adentro hay más.

[CTA: Voluntariado en la UAM →]`
      },
      {
        id: 'sep26-leads',
        seg: 'leads',
        titulo: 'Mail #2 — Primer pedido suave',
        foco: 'Una mañana real en una organización que recibe',
        objetivo: 'Primer pedido de socio mensual con monto ancla. Meta: 1%+ de conversión.',
        asunto: 'Así cocinan en las organizaciones que reciben lo que rescatamos',
        preview: 'Una mañana real con [Nombre], que cocina en [Organización].',
        copy: `Hola [Nombre],

Esto es **[Nombre]**, que cocina en [Organización] para 60 personas cada día.

**Antes de Redalco:** cocinaba con lo que el presupuesto permitía.
**Con Redalco:** cocina con fruta fresca todos los jueves.

Para ella es libertad. Para los chicos que comen, es que alguien se importa.

¿Vos querés importarte también?

[CTA: Quiero sumarlme — $250 al mes →]`
      }
    ],
    checklistExtra: [
      'Coordinar con el equipo de la UAM la capacidad de voluntarios por jueves',
      'Armar el formulario / link de anotación al voluntariado',
      'Conseguir la historia real de la cocinera (nombre + organización + foto)',
      'Corregir el typo del CTA de Leads: "sumarlme" → "sumarme"'
    ],
    notas: [
      'Este mes NO va mail a ex socios. El siguiente para ellos es noviembre.',
      'Es el primer pedido de plata del año, y solo a Leads. Socios y MP siguen sin pedido.',
      'Día del Estudiante en Uruguay: 21 de septiembre.'
    ]
  },

  /* ====================== OCTUBRE 2026 ====================== */
  {
    id: 'oct26',
    nombre: 'Octubre 2026',
    corto: 'Oct 26',
    foco: 'Día Mundial de la Alimentación (16/10) y EL PRIMER PEDIDO DIRECTO a la cohorte de Misión Platos.',
    emails: [
      {
        id: 'oct26-socios',
        seg: 'socios',
        titulo: 'Mail #3 — Los números',
        foco: 'Día Mundial de la Alimentación: la ecuación completa',
        objetivo: 'Justificar el aporte con datos duros. Meta: 30%+ de apertura.',
        asunto: '125 millones de kilos se tiran al año — por eso existes',
        preview: 'Cifras del desperdicio que justifican tu aporte 12 meses.',
        copy: `Hola [Nombre],

Hoy 16 de octubre es Día Mundial de la Alimentación.

**Cifras sin filtro:**
- 125 millones de kilos: frutas/verduras descartadas cada año en Uruguay
- 250.000 personas: sin comida garantizada todos los días
- Vos, con tu aporte cada mes: frenas eso 12 veces al año

No es un número. Es la ecuación que frena el desperdicio.

Gracias por ser parte.

[CTA: Fotos en Instagram →]`
      },
      {
        id: 'oct26-mp',
        seg: 'mp',
        destacado: 'PRIMER PEDIDO DIRECTO del año a esta cohorte',
        titulo: 'Mail #3 — EL PEDIDO',
        foco: 'Mes 4: pasar de donación única a mensual',
        objetivo: 'LA métrica del año para este segmento. Meta: 3–5% de conversión a mensual.',
        asunto: 'PRIMER PEDIDO: ¿Y si tu aporte fuera todos los meses?',
        preview: '3 meses después. Ya viste que funciona. ¿Lo probamos mensual?',
        copy: `Hola [Nombre],

Hace 3 meses donaste en Misión Platos. Tu aporte se convirtió en [X] platos.

Desde junio hasta hoy, seguimos rescatando cada semana sin parar. Sin campaña en la tele. Sin matching corporativo.

¿Tu aporte de una sola vez? Valioso.
¿Si fuera todos los meses? Diferencia total.

¿Probamos hacerlo mensual?

No es para toda la vida. Dos meses. Si no te gusta, lo cancelas.

[CTA: Quiero ser socio mensual →]

Gracias por pensarlo.`
      },
      {
        id: 'oct26-leads',
        seg: 'leads',
        titulo: 'Mail #3 — Prueba visual',
        foco: 'Fotos reales de platos hechos esta semana',
        objetivo: 'Segundo pedido con evidencia. Meta: 1%+ de conversión.',
        asunto: 'Fotos reales: así se ven los platos en la realidad',
        preview: 'Comidas hechas esta semana con lo que rescatamos.',
        copy: `Hola [Nombre],

Hace casi un mes te propusimos convertirte en socio. Si ya lo hiciste: ¡gracias! Si no: acá van fotos reales.

**Lechuga fresca en [Org A]:** ensalada para 40 personas.

**Zumo en [Org B]:** servido en desayunos cada viernes.

**Verduras en la UAM:** procesadas para durar todo el año.

No en la teoría. En platos reales. Para gente real.

¿Te animás?

[CTA: Quiero intentar — $250 al mes →]`
      }
    ],
    checklistExtra: [
      'Calcular el [X] de platos real por donante MP (monto ÷ ratio $250 = 25 platos)',
      'Sacar fotos nuevas de platos servidos esta semana (3 organizaciones distintas)',
      'Preparar la landing de socio mensual para el pico de tráfico',
      'Segmentar: excluir del mail de Leads a los que ya se hicieron socios'
    ],
    notas: [
      '⚠️ ES EL MES CLAVE DEL AÑO PARA MISIÓN PLATOS. Todo lo anterior fue construcción de confianza para este pedido.',
      'Si la conversión de MP baja del 2%, revisar antes de repetir el pedido en noviembre.',
      'El copy de MP usa "lo cancelas" (tuteo). Redalco habla de vos: revisar si va "lo cancelás".'
    ]
  },

  /* ====================== NOVIEMBRE 2026 ====================== */
  {
    id: 'nov26',
    nombre: 'Noviembre 2026',
    corto: 'Nov 26',
    foco: 'Mes de Teletón y prueba social. Vuelve el segmento de ex socios (mail 2 de 4).',
    emails: [
      {
        id: 'nov26-socios',
        seg: 'socios',
        titulo: 'Mail #4 — Contraste con Teletón',
        foco: 'Mientras otros recaudaban, acá se rescataba igual',
        objetivo: 'Diferenciación y orgullo de pertenencia. Meta: 30%+ de apertura.',
        asunto: 'Teletón: mientras otros recaudaban, nosotros rescatábamos igual',
        preview: '400+ organizaciones pidieron más comida esta semana.',
        copy: `Hola [Nombre],

Teletón terminó. Fue solidario. Fue necesario.

Mientras, en la UAM rescatábamos igual. Y las 400+ organizaciones pidieron más: durante la Teletón atienden más gente, así piden más rescate.

Tu aporte mensual hizo eso posible. Noviembre fue [X] platos extra.

Gracias por estar.

[CTA: Fotos en Instagram →]`
      },
      {
        id: 'nov26-mp',
        seg: 'mp',
        titulo: 'Mail #4 — Segundo pedido',
        foco: 'Mes 5: balance de junio a noviembre',
        objetivo: 'Reintentar la conversión con números acumulados. Meta: 2–3% de conversión.',
        asunto: '5 meses después: ¿viste todo lo que tu aporte generó?',
        preview: 'Números reales desde junio a noviembre.',
        copy: `Hola [Nombre],

Hace 5 meses donaste en Misión Platos: $[monto] = [X] platos.

Estos 5 meses:
- [X] platos totales
- 400+ organizaciones alcanzadas
- 52 semanas sin parar
- Pibes con zumo fresco por primera vez
- Mamás que pudieron cocinar diferente

Todo desde un aporte de una sola vez.

¿Querés que sea todos los meses?

[CTA: Ser socio mensual →]`
      },
      {
        id: 'nov26-leads',
        seg: 'leads',
        titulo: 'Mail #4 — Prueba social',
        foco: 'Otros como vos ya se sumaron',
        objetivo: 'Conversión por prueba social. Meta: 1%+ de conversión.',
        asunto: '4 meses después: otros como vos ya se sumaron',
        preview: 'Dicen: "Fue curiosidad. Pero ver cada semana qué pasa..."',
        copy: `Hola [Nombre],

Hace 4 meses nos vimos. Otros como vos se hicieron socios mensuales.

Dicen lo mismo: "Al principio curiosidad. Pero seguir viendo cada semana qué pasa, los números, las fotos reales... en algún momento pensé: ¿por qué no?"

¿Vos? $250/mes. Dos meses. Si no te late, lo cancelas.

[CTA: Quiero intentar →]`
      },
      {
        id: 'nov26-ex',
        seg: 'ex',
        titulo: 'Mail #2 de 4 — Los 10 años',
        foco: 'Qué cambió en Redalco desde que se fueron',
        objetivo: 'Reactivación con salida honrosa. Meta: 1%+ de reactivación.',
        asunto: '10 años: esto cambió desde que te fuiste',
        preview: 'Redalco creció. ¿Vale replantearse?',
        copy: `Hola [Nombre],

10 años exactos. Hace [X] que te fuiste.

**352 mil toneladas rescatadas.** 400+ organizaciones. Premios, alianzas, reportes públicos.

¿Vale replantearse?

[CTA: Quiero volver →]
[CTA: Está bien, gracias igual →]`
      }
    ],
    checklistExtra: [
      'Verificar la cifra de "352 mil toneladas" contra la Memoria 2025 antes de enviar',
      'Confirmar la fecha de Teletón 2026 para no enviar el mail antes de que termine',
      'Conseguir 1 testimonio real de socio nuevo para el mail de Leads',
      'Medir el [X] de platos extra de noviembre'
    ],
    notas: [
      'Segundo de los 4 mails del año a ex socios. El próximo recién en marzo.',
      'El mail de ex socios tiene DOS CTA: hay que poder medir cuántos eligen "está bien, gracias igual" (es un dato, no un fracaso).',
      '⚠️ "352 mil toneladas" no coincide con los datos cargados en el proyecto de videos (9.000.000 kg = 9.000 t). Verificar la cifra antes de publicarla.'
    ]
  },

  /* ====================== DICIEMBRE 2026 ====================== */
  {
    id: 'dic26',
    nombre: 'Diciembre 2026',
    corto: 'Dic 26',
    foco: 'Cierre de año: balance para todos y limpieza de lista para Leads.',
    emails: [
      {
        id: 'dic26-socios',
        seg: 'socios',
        titulo: 'Mail #5 — Balance + referidos',
        foco: 'Balance 2026 personalizado y pedido de referidos',
        objetivo: 'Cerrar el año con orgullo y activar referidos. Meta: 20+ referidos.',
        asunto: 'Balance 2026: esto generaste vos',
        preview: '[X] platos + [Y] kilos + 12 meses sin parar.',
        copy: `Hola [Nombre],

Hace [X meses] sos socio:
- [TOTAL] platos
- [X] organizaciones
- Historias reales de pibes que comieron mejor

No es "gracias genérico". Es: vos lo hiciste.

¿Referís a alguien? Gana sorteo.

[CTA: Quiero referir →]`
      },
      {
        id: 'dic26-mp',
        seg: 'mp',
        titulo: 'Mail #5 — Balance de la cohorte',
        foco: 'Mes 6: balance completo del aporte de junio',
        objetivo: 'Última conversión del año calendario. Meta: 2%+ de conversión.',
        asunto: '6 meses después: balance completo de tu aporte',
        preview: 'Desde junio a diciembre — números finales.',
        copy: `Hola [Nombre],

$[monto] en junio = [X] platos.

Desde junio a diciembre, sin campaña, sin tele:
- [X] platos totales
- 400+ organizaciones cada semana
- Historias de pibes y mamás

¿Probamos mensual en 2027?

[CTA: Ser socio mensual →]`
      },
      {
        id: 'dic26-leads',
        seg: 'leads',
        titulo: 'Mail #5 — Preferencias / sunset',
        foco: 'Preguntar cómo seguir en 2027 (o dejar ir)',
        objetivo: 'Limpiar la lista y quedarse con quien quiere estar. Meta: 15%+ de respuesta.',
        asunto: 'Fin de año: ¿seguimos en contacto? (regalo con sentido)',
        preview: 'Decidamos juntos cómo continuar en 2027.',
        copy: `Hola [Nombre],

¿Quieres seguir en contacto?
- [ ] Sí, igual frecuencia
- [ ] Sí, menos emails (1x/mes)
- [ ] No, desuscríbeme
- [ ] Regalar una membresía en Navidad

[CTA: Elegir opción →]`
      }
    ],
    checklistExtra: [
      'Armar las bases y el premio del sorteo de referidos',
      'Configurar en EmailOctopus las 4 opciones de preferencia de Leads',
      'Calcular el balance individual por socio (platos, meses, organizaciones)',
      'Preparar la pieza de "regalar una membresía" para Navidad'
    ],
    notas: [
      'El mail de Leads está en tuteo ("¿Quieres...?", "desuscríbeme"). Pasar a voseo antes de enviar.',
      'La limpieza de lista baja el volumen pero sube la tasa de apertura de 2027: no leerlo como pérdida.',
      'Reservar tiempo: el balance personalizado por socio requiere exportar datos, no es copiar y pegar.'
    ]
  },

  /* ====================== ENERO 2027 ====================== */
  {
    id: 'ene27',
    nombre: 'Enero 2027',
    corto: 'Ene 27',
    foco: 'Verano: mes corto y de baja actividad. Solo socios y donantes MP.',
    emails: [
      {
        id: 'ene27-socios',
        seg: 'socios',
        titulo: 'Mail #6 — El verano no para',
        foco: 'El aporte de enero vale lo mismo que el de junio',
        objetivo: 'Evitar bajas de verano. Meta: mantener la tasa de bajas debajo del 0,5%.',
        asunto: 'Verano: el hambre no se toma vacaciones',
        preview: 'Mientras estás en la playa, acá se sigue rescatando.',
        copy: `Hola [Nombre],

Enero. Playas. Pero: **340.000 kg de frutas al tacho cada día**, igual.

Tu aporte de enero vale lo mismo que el de junio.

Gracias por no perder perspectiva en verano.

[CTA: Fotos en Instagram →]`
      },
      {
        id: 'ene27-mp',
        seg: 'mp',
        titulo: 'Mail #6 — Pedido tranquilo',
        foco: 'Mes 7: la pregunta sin presión',
        objetivo: 'Conversión de baja fricción. Meta: 1–2% de conversión.',
        asunto: '7 meses después: ¿vimos que esto es real?',
        preview: 'Una pregunta sin presión. Solo lúcida.',
        copy: `Hola [Nombre],

Verano. Tiempo de pensar con calma.

Hace 7 meses viste que tu aporte funcionó. ¿Probamos mensual?

Dos meses. Si no te gusta, lo cancelas.

[CTA: Quiero intentar →]`
      }
    ],
    checklistExtra: [
      'Verificar el dato de 340.000 kg/día (el plan anual usa 125 millones de kg/año)',
      'Revisar el asunto de socios: "hambre" no es una palabra que Redalco usa',
      'Programar los envíos antes de las licencias del equipo'
    ],
    notas: [
      '⚠️ El asunto dice "el hambre no se toma vacaciones". La voz de Redalco evita la palabra "hambre" y usa "inseguridad alimentaria". Reescribir antes de enviar.',
      '125 millones de kg / 365 = ~342.000 kg por día: el dato cierra, pero conviene decirlo con la fuente que ya usa Redalco.',
      'Mes de menor apertura del año en todo el sector: no comparar contra octubre y sacar conclusiones.'
    ]
  },

  /* ====================== FEBRERO 2027 ====================== */
  {
    id: 'feb27',
    nombre: 'Febrero 2027',
    corto: 'Feb 27',
    foco: 'Mes de escucha: encuesta a socios para diseñar el resto del año.',
    emails: [
      {
        id: 'feb27-socios',
        seg: 'socios',
        titulo: 'Mail #7 — Encuesta',
        foco: 'Preguntarles qué quieren recibir',
        objetivo: 'Datos para ajustar el plan. Meta: 10%+ de respuestas.',
        asunto: '¿Qué querés ver de Redalco este año? (2 minutos)',
        preview: 'Diseñamos el resto del año pensando en vos.',
        copy: `Hola [Nombre],

- ¿Historias humanas o datos/cifras?
- ¿Fotos de rescates o videos?
- ¿Cada mes o más seguido?
- ¿Cuándo pedimos que referís a alguien?

Respondé y armamos juntos.

[CTA: Responder encuesta →]`
      },
      {
        id: 'feb27-mp',
        seg: 'mp',
        titulo: 'Mail #7 — Pregunta sincera',
        foco: 'Mes 8: ¿cambió algo desde junio?',
        objetivo: 'Última conversión antes de la vuelta a clases. Meta: 1–2% de conversión.',
        asunto: '8 meses después: ¿cambió algo para vos desde junio?',
        preview: 'Una pregunta sin presión, solo sincera.',
        copy: `Hola [Nombre],

¿Cambió algo? ¿Viste que es real y te importa? ¿Probamos como socio mensual?

Si no es el momento, está bien. Pero si algo cambió, acá estamos.

[CTA: Quiero intentar →]`
      }
    ],
    checklistExtra: [
      'Armar la encuesta (Google Forms o Typeform) con las 4 preguntas del copy',
      'Definir qué se hace con los resultados y cuándo se comunican',
      'Preparar el mail de agradecimiento a quienes respondan'
    ],
    notas: [
      'La encuesta solo sirve si después se actúa y se comunica: planificar el mail de devolución para marzo o abril.',
      'Mes sin leads ni ex socios: buen momento para limpiar rebotes duros acumulados.'
    ]
  },

  /* ====================== MARZO 2027 ====================== */
  {
    id: 'mar27',
    nombre: 'Marzo 2027',
    corto: 'Mar 27',
    foco: '8M y vuelta a clases. Tercer mail del año a ex socios.',
    emails: [
      {
        id: 'mar27-socios',
        seg: 'socios',
        titulo: 'Mail #8 — 8 de marzo',
        foco: 'Las mujeres que sostienen la operación',
        objetivo: 'Contenido de valor sin pedido. Meta: 30%+ de apertura.',
        asunto: '5 mujeres que cocinan en Redalco',
        preview: 'Historias del 8 de marzo.',
        copy: `Hola [Nombre],

En Redalco la mayoría que cocina, coordina y lidera son mujeres.

Hoy 5 historias: desde coordinadora de comedor hasta estudiante voluntaria.

Tu aporte les permite hacer esto.

[CTA: Ver historias en Instagram →]`
      },
      {
        id: 'mar27-mp',
        seg: 'mp',
        titulo: 'Mail #8 — Vuelta a clases',
        foco: 'Mes 9: por qué esto importa todo el año',
        objetivo: 'Conversión con gancho de calendario. Meta: 1–2% de conversión.',
        asunto: 'Vuelta a clases: ¿por qué esto importa todo el año?',
        preview: '9 meses después. Rutina. Hambre también.',
        copy: `Hola [Nombre],

Marzo. Rutina nueva. Chicos sin desayunar. Mamás sin presupuesto.

Tu aporte de junio sigue importando. ¿Probamos mensual?

[CTA: Ser socio mensual →]`
      },
      {
        id: 'mar27-ex',
        seg: 'ex',
        titulo: 'Mail #3 de 4 — Otro monto',
        foco: 'Bajar la barrera: volver con lo que se pueda',
        objetivo: 'Reactivación con monto flexible. Meta: 1%+ de reactivación.',
        asunto: 'Volvé a sumarte, aunque sea con otro monto',
        preview: '8 meses sin presión. Pero seguimos aquí.',
        copy: `Hola [Nombre],

Si el monto de antes no cabe, probamos otro. Si es que te fuiste, podemos hablar.

¿Vale intentarlo de nuevo?

[CTA: Quiero volver →]`
      }
    ],
    checklistExtra: [
      'Conseguir y validar las 5 historias reales de mujeres (con su consentimiento)',
      'Coordinar con Instagram para que las historias estén publicadas antes del envío',
      'Revisar el preview de MP: dice "Hambre también"',
      'Habilitar montos bajos en la landing para el mail de ex socios'
    ],
    notas: [
      '⚠️ El preview del mail de MP usa la palabra "hambre". Reemplazar por "inseguridad alimentaria" o reformular.',
      '⚠️ La Semana de Turismo 2027 cae ACÁ (22 al 28 de marzo), no en abril: el mail de amplificación que está puesto en abril hay que adelantarlo a este mes.',
      'Tercer mail del año a ex socios. Queda uno solo, sin fecha asignada en el plan original.',
      'Las historias del 8M necesitan consentimiento explícito de cada persona antes de publicarse.'
    ]
  },

  /* ====================== ABRIL 2027 ====================== */
  {
    id: 'abr27',
    nombre: 'Abril 2027',
    corto: 'Abr 27',
    foco: 'Semana de Turismo y arranque de la previa de Misión Platos 2027.',
    emails: [
      {
        id: 'abr27-socios',
        seg: 'socios',
        destacado: 'Revisar la fecha: en 2027 la Semana de Turismo es en marzo',
        titulo: 'Mail #9 — Amplificación',
        foco: 'Pedir que compartan en stories',
        objetivo: 'Alcance orgánico sin costo. Meta: 30+ stories compartidas.',
        asunto: 'Semana de Turismo: compartí en tus stories si ves Redalco',
        preview: 'Mientras vos viajas, acá seguimos rescatando.',
        copy: `Hola [Nombre],

¿Ves foto de rescate esta semana? Compartila en tus stories.

No es publicidad pesada. Es: mostrar que esto existe todos los días.

[CTA: Seguinos en Instagram →]`
      },
      {
        id: 'abr27-mp',
        seg: 'mp',
        titulo: 'Mail #9 — Previa de MP 2027',
        foco: 'Mes 10: elegir antes de que llegue junio',
        objetivo: 'Anticipar la decisión antes de la campaña. Meta: 2%+ de conversión.',
        asunto: 'Faltan 2 meses para Misión Platos 2027: ¿qué harás vos?',
        preview: '¿Donas de nuevo una sola vez, o probamos mensual desde ahora?',
        copy: `Hola [Nombre],

Junio llega. Misión Platos 2027.

¿Una sola vez de nuevo, o mensual desde ahora?

[CTA: Quiero intentar mensual →]`
      }
    ],
    checklistExtra: [
      'Programar publicaciones de Instagram para que haya material que compartir esa semana',
      'Definir fechas exactas de Misión Platos 2027 con el equipo',
      'Revisar el mail de MP: está en tuteo ("¿qué harás vos?", "¿Donas?")'
    ],
    notas: [
      '⚠️ ERROR DE FECHA: el mail de socios habla de la Semana de Turismo, pero en 2027 esa semana es del 22 al 28 de MARZO (calculado desde la Pascua, que cae el 28/3/2027). Si sale en abril, llega con la semana terminada. Hay que adelantarlo a la tercera semana de marzo o cambiarle el gancho.',
      'A partir de acá todo el plan se ordena alrededor de Misión Platos 2027 (junio).',
      'Con la Semana de Turismo corrida a marzo, abril queda como un mes sin fecha propia: es buen lugar para el Día de la Tierra (22/4) y el ángulo ambiental.'
    ]
  },

  /* ====================== MAYO 2027 ====================== */
  {
    id: 'may27',
    nombre: 'Mayo 2027',
    corto: 'May 27',
    foco: 'Día de la Madre: contenido + la primera campaña de regalo de membresías.',
    emails: [
      {
        id: 'may27-socios-1',
        seg: 'socios',
        titulo: 'Mail #10 — Historias de mamás',
        foco: 'Día de la Madre: quiénes sostienen Redalco',
        objetivo: 'Contenido emocional sin pedido. Meta: 30%+ de apertura.',
        asunto: 'Historias de mamás que cocinan en Redalco',
        preview: '5 historias del Día de la Madre.',
        copy: `Hola [Nombre],

En Redalco las mamás son el núcleo. Coordinadoras, voluntarias, beneficiarias.

Hoy 5 historias. Tu aporte les permite optar.

[CTA: Ver en Instagram →]`
      },
      {
        id: 'may27-socios-2',
        seg: 'socios',
        titulo: 'Mail #11 — Regalar una membresía',
        foco: 'Alternativa a las flores: 50 platos al mes durante un año',
        objetivo: 'Ingreso nuevo + captación de socios por regalo. Meta: 15+ membresías regaladas.',
        asunto: 'Regalá una membresía en nombre de la mamá que admirás',
        preview: 'En lugar de flores: 50 platos al mes durante un año.',
        copy: `Hola [Nombre],

¿Mamá que admirás? Regálale una membresía: $250 una sola vez = 50 platos cada mes, 12 meses, en su nombre.

[CTA: Quiero regalar →]`
      },
      {
        id: 'may27-mp',
        seg: 'mp',
        titulo: 'Mail #10 — Día de la Madre',
        foco: 'Mes 11: a quién llegó el aporte',
        objetivo: 'Conversión emocional previa a junio. Meta: 2%+ de conversión.',
        asunto: 'Día de la Madre: historias de mamás que reciben lo que rescatamos',
        preview: 'Cómo cambió su vida cuando llegó el rescate.',
        copy: `Hola [Nombre],

Mamás que ahora pueden planificar la semana porque hay fruta fresca.

Mamás que cocinan sin calcular peso cada peso.

Tu aporte de junio llegó a ellas. ¿Quieres que llegue todos los meses?

[CTA: Ser socio mensual →]`
      }
    ],
    checklistExtra: [
      'REVISAR EL RATIO del mail de regalo: $250 = 25 platos (una vez), no 50 por mes durante 12 meses',
      'Armar el flujo de regalo: quién recibe el aviso, cómo se le comunica a la mamá',
      'Conseguir las 5 historias de mamás con consentimiento',
      'Confirmar la fecha del Día de la Madre 2027 (segundo domingo de mayo en Uruguay)'
    ],
    notas: [
      '⚠️ ERROR DE DATOS EN EL COPY: el mail de regalo dice "$250 una sola vez = 50 platos cada mes, 12 meses". El ratio real de Redalco es $250 = 25 platos. Corregir antes de enviar: es una promesa que no se puede cumplir.',
      'Dos mails a socios en el mismo mes: espaciarlos al menos 10 días.',
      'El mail de MP usa "¿Quieres...?" (tuteo). Pasar a voseo.'
    ]
  },

  /* ====================== JUNIO 2027 ====================== */
  {
    id: 'jun27',
    nombre: 'Junio 2027',
    corto: 'Jun 27',
    foco: 'Misión Platos 2027 + aniversario de los socios. El mes más cargado del año.',
    emails: [
      {
        id: 'jun27-socios-1',
        seg: 'socios',
        titulo: 'Mail #12 — Aniversario',
        foco: 'Un año como socio: el balance completo',
        objetivo: 'Renovación del compromiso + referidos. Meta: 30%+ de apertura.',
        asunto: 'Hace 1 año sos parte: mirá qué pasó',
        preview: '[X] platos en 12 meses. Vos lo hiciste.',
        copy: `Hola [Nombre],

Hace 1 año:
- [TOTAL] platos
- [X] kilos
- [Z] organizaciones

Eso sos vos.

¿Alguien que se sumaría? Referí y gana sorteo.

[CTA: Quiero referir →]`
      },
      {
        id: 'jun27-socios-2',
        seg: 'socios',
        titulo: 'Mail #13 — Amplificar MP 2027',
        foco: 'A los socios no se les pide plata: se les pide voz',
        objetivo: 'Alcance en la campaña. Meta: 50+ shares del link.',
        asunto: 'Misión Platos 2027 abre hoy: amplificá',
        preview: '1.200.000 platos. 4 días. Necesitamos tu voz.',
        copy: `Hola [Nombre],

Sos socio, así que no pedimos dinero. Pedimos amplificación.

Compartí el link. Etiquetá a 3 amigos. En tu equipo si puedes.

[CTA: Link directo →]`
      },
      {
        id: 'jun27-mp',
        seg: 'mp',
        titulo: 'Mail #11 — Un año exacto',
        foco: 'Mes 12: cierra el ciclo de la cohorte 2026',
        objetivo: 'Redonación o conversión a mensual. Meta: 10%+ de redonación.',
        asunto: 'Un año después: Misión Platos 2027 empieza',
        preview: 'Hace exactamente 1 año donaste. Qué cambió.',
        copy: `Hola [Nombre],

Un año exacto. Junio 2026 → Junio 2027.

¿Donas de nuevo? Genial. ¿Convertís a mensual? Mejor.

Ya sabés que funciona.

[CTA: Donar en MP 2027 →]
[CTA: Ser socio mensual →]`
      }
    ],
    checklistExtra: [
      'Fijar las fechas exactas de Misión Platos 2027 (4 días) y la meta de platos',
      'Preparar el link con UTM propio para medir el aporte de los socios',
      'Calcular el balance de 12 meses por socio',
      'Etiquetar la cohorte MP 2027 apenas cierre la campaña (empieza el ciclo nuevo)'
    ],
    notas: [
      'Tres mails en el mes: ordenar el calendario para que ningún contacto reciba dos en la misma semana.',
      'La meta de 1.200.000 platos figura en el copy: confirmarla con el equipo antes de publicarla.',
      'Al cerrar la campaña arranca el ciclo nuevo: la cohorte MP 2027 entra al plan en julio.'
    ]
  },

  /* ====================== JULIO 2027 ====================== */
  {
    id: 'jul27',
    nombre: 'Julio 2027',
    corto: 'Jul 27',
    foco: 'El ciclo reinicia con la cohorte nueva de Misión Platos 2027. Los mails de acá son la base de agosto 2026, para adaptar.',
    emails: [
      {
        id: 'jul27-socios',
        seg: 'socios',
        derivado: true,
        titulo: 'Base: mail de pertenencia (agosto 2026)',
        foco: 'Reiniciar el ciclo de contenido para socios',
        objetivo: 'Retención. Meta: 30%+ de apertura.',
        asunto: 'Lo que rescatamos alimenta socios cada mes',
        preview: 'Historias de chicos que comen gracias a vos, todos los meses.',
        copy: `Hola [Nombre],

Tu aporte cada mes alimenta chicos como Camila, que ahora hace la tarea con la panza llena. Como Tomás, que juega en la ronda con energía. Como [Nombre], que cocina con frutas frescas por primera vez en meses.

No es una sola vez. Es todos los meses.

Por eso tu aporte importa 12 veces al año, no una.

Gracias por estar del lado correcto.

[CTA: Fotos en Instagram →]`
      },
      {
        id: 'jul27-mp',
        seg: 'mp',
        derivado: true,
        titulo: 'Base: mail #1 de la cohorte (agosto 2026)',
        foco: 'Mes 2 de la cohorte MP 2027: mostrar a quién llegó su aporte',
        objetivo: 'Cerrar el círculo del aporte de junio 2027. Sin pedido de plata.',
        asunto: 'Los chicos que comen gracias a tu aporte de junio',
        preview: 'Historias de 4 chicos para los que tu aporte de junio cambió el mes.',
        copy: `Hola [Nombre],

Hace un mes donaste en Misión Platos 2027. Te presentamos a quiénes llega tu aporte.

**Camila** hace la tarea tranquila en [Org A]. **Mateo** come variado cada semana en [Org B]. **Sofía y Bruno** toman zumo fresco todos los viernes en [Org C].

No son números. Son cuatro de los miles de chicos para los que tu aporte de junio fue la diferencia.

¿Querés que esto pase todos los meses, no solo junio?

[CTA: Quiero ser socio mensual →]

Gracias por pensarlo.`
      },
      {
        id: 'jul27-leads',
        seg: 'leads',
        derivado: true,
        titulo: 'Base: primer contacto (agosto 2026)',
        foco: 'Primer contacto con los leads nuevos de ferias del semestre',
        objetivo: 'Recordar quiénes somos. Meta: 25%+ de apertura.',
        asunto: '125 millones de kilos se tiran al año en Uruguay',
        preview: 'El número que cuesta creer sobre desperdicio.',
        copy: `Hola [Nombre],

Nos encontramos hace poco en [Evento]. Acá va el número que no queremos que olvides.

En Uruguay se tiran **125 millones de kilos de frutas y verduras cada año**.

Mientras tanto: **250.000 personas no tienen garantizado un plato de comida todos los días.**

No es un detalle. Es una brecha. Nosotros la cerramos hace 10 años.

[CTA: Ver rescates en Instagram →]`
      }
    ],
    checklistExtra: [
      'Etiquetar la cohorte MP 2027 en EmailOctopus y separarla de la 2026',
      'Decidir qué pasa con la cohorte MP 2026 que no convirtió (¿pasa a leads? ¿se pausa?)',
      'Adaptar los textos base: cambiar fechas, meses y datos a la cohorte nueva',
      'Actualizar el dashboard con el plan del ciclo 2027–2028'
    ],
    notas: [
      '⚠️ Los 3 mails de este mes son DERIVADOS: el plan original solo dice "repite la estructura de agosto 2026 a diciembre 2026 para los donantes nuevos". Están precargados con el copy de agosto adaptado, para editar, no para enviar tal cual.',
      'Es el momento de rearmar el dashboard con el ciclo siguiente (agosto 2027 en adelante).',
      'Los ex socios no tienen mail asignado: el plan original solo define 4 en el año (agosto, noviembre, marzo y uno sin fecha).'
    ]
  }
];
