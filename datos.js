/* ============================================================================
   REDALCO — Plan de emails Agosto 2026 / Julio 2027
   Ago 2026–Ene 2027 reescrito sobre la comunicación real de Redalco (Notion:
   Comunicación 2026, Misión Platos, Ser Socio de Redalco; bases reales
   importadas a EmailOctopus jul–ago 2026) — no sobre 1_REDALCO_TODOS_LOS_MAILS.md,
   que no reflejaba la voz real (usaba "hambre", encuadraba la donación como
   cerrada en el mes). Feb 2027 en adelante sigue siendo el borrador anterior,
   pendiente de revisión.
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
    nombre: 'Misión Platos 2026',
    icono: '🟡',
    color: 'dorado',
    conversion: 'Conversiones a socio mensual',
    nota: 'Donaron una sola vez en junio 2026. El pedido de socio ya se mandó el 13/8 — de acá en más, mostrar impacto y reforzar sin repetirlo hasta diciembre.'
  },
  hist: {
    nombre: 'MP 2021–2025 + Ocasionales',
    icono: '🟠',
    color: 'naranja',
    conversion: 'Conversiones a socio mensual',
    nota: 'Bases fusionadas: Misión Platos histórica (2021–2025) y Donantes Ocasionales son gente que donó una sola vez y nunca se activó — mismo objetivo, mismo mensaje. Primer pedido directo recién en octubre (mes 3).'
  },
  leads: {
    nombre: 'Leads de ferias y eventos',
    icono: '🔵',
    color: 'azul',
    conversion: 'Conversiones (mensual o puntual)',
    nota: 'Objetivo: convertir a socio mensual o, en su defecto, donación puntual. Preferir mensual.'
  },
  ex: {
    nombre: 'Pausados / Baja / Tarjeta con problemas',
    icono: '🔴',
    color: 'rojo',
    conversion: 'Reactivaciones',
    nota: 'Mostrar impacto, nunca solo "te extrañamos". La tarjeta con problemas es un flujo aparte, automático y operativo — no emocional. 3 mails espaciados en el período + el automático.'
  }
};

const BENCHMARKS = {
  apertura: { min: 25, max: 29, label: 'Apertura ONGs: 25–29%' },
  ctr: { min: 0.59, label: 'CTR fundraising: ~0,59%' },
  roi: { label: 'ROI email marketing: $42 por cada $1' }
};

/* Meses reales, anteriores al plan (que arranca en agosto 2026). No tienen
   mails planificados — el panel los muestra con las campañas reales de
   Mailchimp/EmailOctopus de ese mes en vez de tarjetas para editar. */
const MESES_PASADOS = [
  { id: 'ene26', nombre: 'Enero 2026',   corto: 'Ene 26', pasado: true },
  { id: 'feb26', nombre: 'Febrero 2026', corto: 'Feb 26', pasado: true },
  { id: 'mar26', nombre: 'Marzo 2026',   corto: 'Mar 26', pasado: true },
  { id: 'abr26', nombre: 'Abril 2026',   corto: 'Abr 26', pasado: true },
  { id: 'may26', nombre: 'Mayo 2026',    corto: 'May 26', pasado: true },
  { id: 'jun26', nombre: 'Junio 2026',   corto: 'Jun 26', pasado: true },
  { id: 'jul26', nombre: 'Julio 2026',   corto: 'Jul 26', pasado: true }
];

const MESES = [
  /* ====================== AGOSTO 2026 ====================== */
  {
    id: 'ago26',
    nombre: 'Agosto 2026',
    corto: 'Ago 26',
    foco: 'Arranque de la estrategia real: 5 segmentos, sobre la voz real de Redalco. El pedido de socio a MP 2026 ya salió el 13/8, por fuera de este calendario.',
    emails: [
      {
        id: 'ago26-socios',
        seg: 'socios',
        titulo: 'Mail #1 — Pertenencia',
        foco: 'Día del Niño + impacto colectivo, sin pedir nada',
        objetivo: 'Retención y sentido de pertenencia. Meta: 30%+ de apertura.',
        asunto: 'Hoy es Día del Niño. Esto es lo que hacés posible cada mes',
        preview: 'Gracias a socios como vos, esto no depende de un solo mes.',
        copy: `Hola [Nombre],

Hoy es Día del Niño en Uruguay. Y hoy, como todos los meses, la red que sostenés con tu aporte sigue funcionando: frutas y verduras que llegan a CAIF, clubes de niños, centros juveniles y merenderos de todo el país.

Sos parte de un grupo de 460 personas que decidieron que esto no dependa de una sola vez. Cada mes, sin pausa.

No hace falta que hagas nada hoy. Solo queríamos que lo supieras: lo que armaste con tu aporte sigue en pie.

Gracias por estar.

[CTA: Ver el trabajo del mes en Instagram →]`
      },
      {
        id: 'ago26-mp',
        seg: 'mp',
        titulo: 'Mail #1 — Refuerzo de impacto (post-pedido del 13/8)',
        foco: 'El pedido de socio ya salió el 13/8. Este mail no lo repite: muestra en qué se usó el aporte de junio.',
        objetivo: 'Sostener el vínculo sin insistir con el pedido. Meta: 28%+ de apertura.',
        asunto: 'Así se usó lo que donaste en Misión Platos',
        preview: 'Dos meses después, tu aporte de junio sigue en movimiento.',
        copy: `Hola [Nombre],

En junio fuiste parte de Misión Platos. Con $250 garantizaste 50 platos ese fin de semana, porque las empresas duplicaron cada donación.

Ese aporte no se gastó de una vez. Entró a una red que todavía hoy —agosto— sigue rescatando frutas y verduras, clasificándolas y llevándolas a organizaciones de todo el país.

$10 rescatan 500 gramos de frutas y verduras: lo que la OMS recomienda comer por día. A eso le decimos un plato Redalco.

Gracias por haber sido parte. Sigue viva.

[CTA: Conocé cómo trabajamos →]`
      },
      {
        id: 'ago26-hist',
        seg: 'hist',
        titulo: 'Mail 1 de 6 — Reconexión',
        foco: 'Primer contacto con la base fusionada MP 2021–2025 + Ocasionales. No pedir nada.',
        objetivo: 'Reabrir el vínculo mostrando en qué se convirtió Redalco. Meta: 22%+ de apertura.',
        asunto: 'Lo que empezó cuando donaste, todavía sigue',
        preview: 'Un repaso de en qué se convirtió Redalco desde tu aporte.',
        copy: `Hola [Nombre],

En algún momento fuiste parte de Redalco con una donación. Puede que haya sido en Misión Platos, puede que haya sido en otro momento. De cualquier forma, fuiste parte.

Hoy Redalco es una red de más de 400 organizaciones y 460 socios mensuales que sostienen el rescate de frutas y verduras en todo Uruguay, mes a mes.

Quisimos contarte en qué se convirtió eso que empezaste.

[CTA: Ver el mapa de organizaciones →]`
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
        titulo: 'Mail 1 de 3 — Impacto, sin pedir nada',
        foco: 'No es "te extrañamos": es un dato de lo que la red sigue haciendo.',
        objetivo: 'Reabrir el canal sin generar culpa. Meta: 20%+ de apertura, sin picos de bajas.',
        asunto: 'Esto es lo que la red sigue haciendo',
        preview: 'No te escribimos para pedirte nada. Solo para contarte esto.',
        copy: `Hola [Nombre],

Sabemos que en algún momento pausaste o diste de baja tu aporte. No te escribimos para pedirte que vuelvas.

Te escribimos para contarte que la red que ayudaste a construir sigue funcionando: este mes, gracias a socios activos, se rescataron [X] kilos de frutas y verduras que llegaron a organizaciones de todo el país.

Si alguna vez querés volver a ser parte, la puerta sigue abierta. Mientras tanto, gracias por lo que ya construiste.

[CTA: Ver en qué estamos trabajando →]`
      },
      {
        id: 'ago26-ex-tarjeta',
        seg: 'ex',
        automatizado: true,
        titulo: 'Automático — Tarjeta con problemas',
        foco: 'Se dispara cuando falla un cobro, no en una fecha fija del calendario. Tono operativo, no emocional.',
        objetivo: 'Recuperar el cobro sin fricción. Meta: 30%+ actualiza el medio de pago.',
        asunto: 'Hubo un problema con tu último cobro',
        preview: 'Nada grave — solo hay que actualizar un dato.',
        copy: `Hola [Nombre],

Notamos que tu último aporte mensual no se pudo procesar. Puede ser algo simple: la tarjeta venció, cambió el límite, o hubo un error de la operadora.

Si querés, podés actualizar el medio de pago en menos de un minuto y tu aporte sigue como si nada hubiera pasado.

Gracias por seguir siendo parte.

[CTA: Actualizar medio de pago →]`
      }
    ],
    checklistExtra: [
      'Confirmar con Silvia (donaciones@redalco.org) si "MP 2021-2025" y "Donantes Ocasionales" ya están en una sola lista de EmailOctopus o hay que fusionarlas a mano',
      'Etiquetar la cohorte MP 2026 que ya recibió el pedido de socio el 13/8, para no reenviarlo',
      'Validar plantilla visual (logo, pie, link de baja)',
      'Programar el envío antes del viernes 14 (el 16 es domingo)'
    ],
    notas: [
      'El pedido de socio a MP 2026 ya se mandó el 13/8, por fuera de este calendario — no repetirlo en este mail.',
      'Primer mes del segmento Histórico (MP 2021-2025 + Ocasionales): todavía no se pide nada, recién en octubre.',
      'El mail de tarjeta con problemas es automático (se dispara por evento), no de calendario — puede caer cualquier mes.',
      'La fecha del Día del Niño 2026 está confirmada: domingo 16 de agosto.'
    ]
  },

  /* ====================== SEPTIEMBRE 2026 ====================== */
  {
    id: 'sep26',
    nombre: 'Septiembre 2026',
    corto: 'Set 26',
    foco: 'Día Internacional de Concientización sobre la Pérdida y el Desperdicio de Alimentos (29/9, ONU) — hueco real del calendario anterior, ahora cubierto. Sin Pausados/Baja este mes.',
    emails: [
      {
        id: 'sep26-socios',
        seg: 'socios',
        titulo: 'Mail #2 — Comunidad',
        foco: 'Mención breve del 29/9, sin pedir nada',
        objetivo: 'Mantener el vínculo con contenido de valor. Meta: 28%+ de apertura.',
        asunto: 'El 29 de septiembre es nuestro día, todo el año',
        preview: 'Por qué un día de la ONU nos importa 365 días.',
        copy: `Hola [Nombre],

El 29 de septiembre la ONU dedica un día a la pérdida y el desperdicio de alimentos. Nosotros lo trabajamos los 365.

Este mes, gracias a socios como vos, la red rescató frutas y verduras que iban a tirarse y llegaron a organizaciones de todo el país.

No hace falta que hagas nada. Solo queríamos que lo supieras.

Gracias por sostenerlo.

[CTA: Ver el trabajo del mes en Instagram →]`
      },
      {
        id: 'sep26-mp',
        seg: 'mp',
        titulo: 'Mail #2 — 29 de septiembre',
        foco: 'Día Internacional contra el desperdicio: por qué les importa a ellos también',
        objetivo: 'Sostener el vínculo con un dato relevante. Meta: 26%+ de apertura.',
        asunto: 'El 29 de septiembre es, literalmente, nuestro tema',
        preview: 'Por qué este día le importa a alguien que ya donó una vez.',
        copy: `Hola [Nombre],

El 29 de septiembre, la ONU dedica un día entero a algo que en Redalco trabajamos los 365: la pérdida y el desperdicio de alimentos.

En Uruguay se desperdician 125 millones de kilos de frutas y verduras por año — no por estar en mal estado, sino por su forma, tamaño o exceso de producción.

Vos ya hiciste algo con eso en junio. Hoy, esa misma red sigue rescatando, clasificando y entregando, todos los días del año, no solo cuatro.

[CTA: Así se ve un día de rescate →]`
      },
      {
        id: 'sep26-hist',
        seg: 'hist',
        titulo: 'Mail 2 de 6 — Historia de impacto',
        foco: 'Mes 2 de la secuencia. Aún sin pedir nada.',
        objetivo: 'Profundizar la reconexión con un dato concreto. Meta: 22%+ de apertura.',
        asunto: 'A dónde llega una fruta que no se tira',
        preview: 'El recorrido completo, desde que se rescata hasta que llega a un plato.',
        copy: `Hola [Nombre],

Una fruta que iba a tirarse por su forma o su tamaño entra a la red de Redalco, se clasifica y llega a una organización en menos de 48 horas.

Eso pasa todas las semanas, en todo Uruguay, con o sin campaña puntual de por medio.

Vos fuiste parte de esto en algún momento. Quisimos que supieras cómo sigue funcionando.

[CTA: Ver el mapa de organizaciones →]`
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
      'Confirmar que el segmento Histórico tiene trazabilidad real (~48h) del rescate antes de prometerlo en el copy',
      'Coordinar con el equipo de la UAM la capacidad de voluntarios por jueves',
      'Conseguir la historia real de la cocinera (nombre + organización + foto)',
      'Corregir el typo del CTA de Leads: "sumarlme" → "sumarme"'
    ],
    notas: [
      'Este mes no va mail a Pausados/Baja (cadencia espaciada) ni pedido al Histórico — recién en octubre.',
      'Es el primer pedido de plata del período, y solo a Leads. Socios, MP 2026 e Histórico siguen sin pedido.',
      'Día Internacional de Concientización sobre la Pérdida y el Desperdicio de Alimentos: 29 de septiembre (ONU).'
    ]
  },

  /* ====================== OCTUBRE 2026 ====================== */
  {
    id: 'oct26',
    nombre: 'Octubre 2026',
    corto: 'Oct 26',
    foco: 'Día Mundial de la Alimentación (16/10) y EL PRIMER PEDIDO DIRECTO al segmento Histórico (MP 2021-2025 + Ocasionales).',
    emails: [
      {
        id: 'oct26-socios',
        seg: 'socios',
        titulo: 'Mail #3 — Los números',
        foco: 'Día Mundial de la Alimentación: la ecuación completa, sin pedir nada',
        objetivo: 'Reforzar el sentido del aporte con datos reales. Meta: 30%+ de apertura.',
        asunto: 'Hoy es el Día Mundial de la Alimentación',
        preview: 'Los números detrás de tu aporte mensual.',
        copy: `Hola [Nombre],

Hoy 16 de octubre es el Día Mundial de la Alimentación.

En Uruguay se desperdician 125 millones de kilos de frutas y verduras por año. Con $10 rescatamos 500 gramos — lo que la OMS recomienda comer por día. Eso es un plato Redalco.

Tu aporte hace ese cálculo posible, mes a mes, no una vez al año.

Gracias por ser parte.

[CTA: Ver el trabajo del mes en Instagram →]`
      },
      {
        id: 'oct26-mp',
        seg: 'mp',
        titulo: 'Mail #3 — Impacto + comunidad',
        foco: 'Impacto continuo + mención suave de los socios mensuales, sin insistir',
        objetivo: 'Sostener el vínculo y sembrar la idea de socio sin repetir el pedido. Meta: 26%+ de apertura.',
        asunto: 'Hoy es el Día Mundial de la Alimentación — así seguimos',
        preview: 'Tu aporte de junio y el trabajo de todos los días.',
        copy: `Hola [Nombre],

Hoy es el Día Mundial de la Alimentación. En Redalco lo vivimos como cualquier otro día: rescatando, clasificando, entregando.

Tu aporte de junio sigue siendo parte de esa red. Y hay 460 personas que decidieron que ese trabajo no dependa de una sola vez al año, sino de todos los meses.

[CTA: Conocé cómo trabajamos →]`
      },
      {
        id: 'oct26-hist',
        seg: 'hist',
        destacado: 'PRIMER PEDIDO DIRECTO del período a este segmento',
        titulo: 'Mail 3 de 6 — Primer pedido directo',
        foco: 'Mes 3 de la secuencia: pasar de donación única a socio mensual',
        objetivo: 'La métrica clave de este segmento. Meta: 2–3% de conversión a mensual.',
        asunto: '¿Y si tu próximo aporte no fuera el último?',
        preview: '460 personas ya decidieron que esto sea todos los meses.',
        copy: `Hola [Nombre],

Hace un tiempo elegiste donar en Redalco. Esta vez te proponemos algo distinto: que no sea una vez más, sino todos los meses.

Con $10 rescatamos 500 gramos de frutas y verduras — un plato Redalco. Como socio mensual, ese plato se repite, mes a mes, sin que tengas que volver a pensarlo.

Hoy somos 460. La meta es 1.000 antes de que termine el año.

[CTA: Quiero ser socio mensual →]`
      },
      {
        id: 'oct26-ex',
        seg: 'ex',
        titulo: 'Mail 2 de 3 — Invitación suave',
        foco: 'Día Mundial de la Alimentación: puerta abierta, sin presión',
        objetivo: 'Reabrir la puerta sin generar culpa. Meta: 1%+ de reactivación.',
        asunto: 'Hoy es el Día Mundial de la Alimentación',
        preview: 'Si alguna vez quisiste volver, hoy es un buen día.',
        copy: `Hola [Nombre],

Hoy es el Día Mundial de la Alimentación. En Redalco lo vivimos rescatando frutas y verduras que, de otra forma, se hubieran tirado.

No sabemos por qué pausaste tu aporte, y está bien. Si en algún momento la situación cambió y querés volver a ser parte, es tan simple como un click.

[CTA: Quiero retomar mi aporte →]`
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
      'Calcular el dato real de kilos/platos del mes para reemplazar en el copy antes de enviar',
      'Sacar fotos nuevas de platos servidos esta semana (3 organizaciones distintas)',
      'Preparar la landing de socio mensual para el pico de tráfico del segmento Histórico',
      'Segmentar: excluir del mail de Leads a quienes ya se hicieron socios'
    ],
    notas: [
      'Mes clave para el segmento Histórico: todo agosto y septiembre fue construir confianza para este pedido.',
      'MP 2026 NO recibe un segundo pedido este mes — el próximo es en diciembre.',
      'Si la conversión del Histórico baja de 2%, revisar el ángulo antes de repetir en noviembre.'
    ]
  },

  /* ====================== NOVIEMBRE 2026 ====================== */
  {
    id: 'nov26',
    nombre: 'Noviembre 2026',
    corto: 'Nov 26',
    foco: 'Previa de GivingTuesday y prueba social para quienes todavía no convirtieron. Sin Pausados/Baja este mes.',
    emails: [
      {
        id: 'nov26-socios',
        seg: 'socios',
        titulo: 'Mail #4 — Previa de GivingTuesday',
        foco: 'Impacto + adelanto de GivingTuesday, sin pedir nada a socios',
        objetivo: 'Mantener el vínculo antes del pico de diciembre. Meta: 28%+ de apertura.',
        asunto: 'Se viene GivingTuesday — y vos ya estás adentro',
        preview: 'Mientras el resto se suma por un día, vos ya sostenés todo el año.',
        copy: `Hola [Nombre],

El 1 de diciembre es GivingTuesday, el día en que mucha gente dona por primera vez.

Vos ya lo hacés todos los meses. Este mes, gracias a socios como vos, la red volvió a sostenerse sin pausa.

Gracias por estar antes de que sea tendencia.

[CTA: Ver el trabajo del mes en Instagram →]`
      },
      {
        id: 'nov26-mp',
        seg: 'mp',
        titulo: 'Mail #4 — Prueba social',
        foco: 'Impacto + cuántos ya son socios, antes del segundo pedido de diciembre',
        objetivo: 'Sembrar la conversión de diciembre con prueba social. Meta: 26%+ de apertura.',
        asunto: '460 personas ya decidieron que sea todos los meses',
        preview: 'Tu aporte de junio, y lo que decidieron otros después.',
        copy: `Hola [Nombre],

Desde junio, tu aporte sigue siendo parte de la red que rescata frutas y verduras en todo Uruguay.

Mientras tanto, otros que empezaron como vos —con una sola donación— decidieron sumarse como socios mensuales. Hoy son 460.

En diciembre te vamos a volver a preguntar. Mientras tanto, gracias por seguir siendo parte.

[CTA: Conocé cómo trabajamos →]`
      },
      {
        id: 'nov26-hist',
        seg: 'hist',
        titulo: 'Mail 4 de 6 — Otro ángulo',
        foco: 'Para quienes no convirtieron en octubre: otra historia, sin insistir con el mismo pedido',
        objetivo: 'Segunda oportunidad de conversión con un ángulo distinto. Meta: 1–2% de conversión.',
        asunto: 'Una red de más de 400 organizaciones',
        preview: 'Cómo se conecta lo que donaste con el resto de Redalco.',
        copy: `Hola [Nombre],

Cuando donaste, tu aporte se sumó a una red de más de 400 organizaciones: CAIF, clubes de niños, centros juveniles, merenderos.

Esa red no funciona por una donación aislada. Funciona porque cada mes hay gente que decide sostenerla.

Si todavía lo estás pensando, no hay apuro. La puerta sigue abierta.

[CTA: Quiero ser socio mensual →]`
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
      }
    ],
    checklistExtra: [
      'Confirmar la fecha exacta del envío de GivingTuesday (1/12) para la previa de socios',
      'Conseguir 1 testimonio real de socio nuevo para reforzar la prueba social',
      'Preparar el segundo pedido de MP 2026 e Histórico para diciembre',
      'Medir cuántos del Histórico convirtieron en octubre antes de escribir el mail de noviembre'
    ],
    notas: [
      'Este mes no va mail a Pausados/Baja (cadencia espaciada) — el siguiente es en diciembre.',
      'MP 2026 todavía no recibe el segundo pedido: es en diciembre. Este mail es puente, no ask.',
      'El segmento Histórico usa un ángulo distinto al de octubre para no sonar repetitivo con quien no convirtió.'
    ]
  },

  /* ====================== DICIEMBRE 2026 ====================== */
  {
    id: 'dic26',
    nombre: 'Diciembre 2026',
    corto: 'Dic 26',
    foco: 'Balance del año y segundo (y último) pedido directo para MP 2026 e Histórico. Tercer y último mail del período a Pausados/Baja.',
    emails: [
      {
        id: 'dic26-socios',
        seg: 'socios',
        titulo: 'Mail #5 — Balance del año',
        foco: 'Balance 2026 + gracias. El único CTA es referir, no donar.',
        objetivo: 'Cerrar el año con orgullo de pertenencia. Meta: 20+ referidos.',
        asunto: 'Balance 2026: esto hicimos juntos',
        preview: 'Un año de aportes, mes a mes, sin pausa.',
        copy: `Hola [Nombre],

Este año, socios como vos sostuvieron la red de Redalco mes a mes: frutas y verduras rescatadas, clasificadas y entregadas a organizaciones de todo Uruguay, sin depender de una campaña puntual.

Eso lo hiciste vos, doce veces este año.

Si conocés a alguien que quiera sumarse, esta es una buena semana para invitarlo.

[CTA: Invitar a alguien →]`
      },
      {
        id: 'dic26-mp',
        seg: 'mp',
        titulo: 'Mail #4 — Balance + segundo pedido',
        foco: 'Balance de 6 meses + segundo pedido directo de socio',
        objetivo: 'Última conversión del período para este segmento. Meta: 2%+ de conversión.',
        asunto: 'Seis meses después: así siguió tu aporte de junio',
        preview: 'El balance completo, y una propuesta para 2027.',
        copy: `Hola [Nombre],

En junio donaste en Misión Platos. Seis meses después, ese aporte sigue siendo parte de una red que no paró: rescates cada semana, en todo Uruguay, sin campaña de por medio.

Te lo preguntamos una vez más antes de que termine el año: ¿lo hacemos mensual en 2027?

$10 rescatan 500 gramos de frutas y verduras — un plato Redalco. Como socio, ese plato se repite solo, mes a mes.

[CTA: Quiero ser socio mensual →]`
      },
      {
        id: 'dic26-hist',
        seg: 'hist',
        titulo: 'Mail 5 de 6 — Balance + segundo pedido',
        foco: 'Balance del año + invitación a empezar 2027 siendo socio',
        objetivo: 'Segundo y último pedido directo del período. Meta: 2%+ de conversión.',
        asunto: '¿Empezamos 2027 con vos adentro?',
        preview: 'La red sigue creciendo. La pregunta sigue en pie.',
        copy: `Hola [Nombre],

Este año la red de Redalco llegó a más de 400 organizaciones y 460 socios mensuales.

Vos fuiste parte con tu aporte. Te proponemos una última vez antes de que termine el año: que 2027 empiece con vos ya adentro, no como una donación más.

[CTA: Quiero ser socio mensual →]`
      },
      {
        id: 'dic26-ex',
        seg: 'ex',
        titulo: 'Mail 3 de 3 — Balance, puerta abierta',
        foco: 'Cierre del año, sin presión, con un dato concreto',
        objetivo: 'Dejar la puerta abierta sin generar culpa. Meta: 1%+ de reactivación.',
        asunto: 'Así cerramos el año en Redalco',
        preview: 'Un balance corto, sin pedirte nada.',
        copy: `Hola [Nombre],

Este año la red que ayudaste a construir llegó a más de 400 organizaciones en todo Uruguay.

No te escribimos para pedirte que vuelvas. Si en algún momento querés ser parte de nuevo, la puerta sigue abierta, sin vueltas.

Gracias por lo que ya construiste.

[CTA: Ver en qué estamos trabajando →]`
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
      'Calcular el balance real del año por segmento (platos, kilos, organizaciones) antes de completar los copy',
      'Coordinar que MP 2026 e Histórico no reciban el pedido en la misma semana',
      'Armar las bases y el premio del sorteo de referidos de socios',
      'Configurar en EmailOctopus las opciones de preferencia de Leads para 2027'
    ],
    notas: [
      'Segundo y último pedido directo del período tanto para MP 2026 como para Histórico — no repetir un tercero en enero.',
      'A socios nunca se les pide plata: el CTA de este mes es referir, no donar.',
      'Tercer y último mail del período a Pausados/Baja — el próximo, si se agrega, recién en 2027.',
      'El mail de Leads está en tuteo ("¿Quieres...?", "desuscríbeme"). Pasar a voseo antes de enviar.'
    ]
  },

  /* ====================== ENERO 2027 ====================== */
  {
    id: 'ene27',
    nombre: 'Enero 2027',
    corto: 'Ene 27',
    foco: 'Verano y bienvenida a 2027. Cierre de la primera secuencia de conversión para MP 2026 e Histórico. Sin Pausados/Baja este mes (ya van 3 en el período).',
    emails: [
      {
        id: 'ene27-socios',
        seg: 'socios',
        titulo: 'Mail #6 — Bienvenida a 2027',
        foco: 'El aporte de enero vale lo mismo que el de junio, sin pedir nada',
        objetivo: 'Evitar bajas de verano. Meta: mantener la tasa de bajas debajo del 0,5%.',
        asunto: 'Enero también cuenta',
        preview: 'Mientras estás de vacaciones, la red sigue funcionando.',
        copy: `Hola [Nombre],

Enero. Vacaciones para casi todos. Para la red de Redalco, no: este mes también se rescataron frutas y verduras que llegaron a organizaciones de todo el país.

Tu aporte de enero vale exactamente lo mismo que el de junio.

Gracias por no perder el ritmo en verano.

[CTA: Ver el trabajo del mes en Instagram →]`
      },
      {
        id: 'ene27-mp',
        seg: 'mp',
        titulo: 'Mail #5 — Cierre de la secuencia',
        foco: 'Pieza corta antes de que el ciclo de Misión Platos 2027 empiece en junio',
        objetivo: 'Última pieza de esta secuencia, sin insistir con el pedido. Meta: mantener el vínculo.',
        asunto: 'Siete meses después, seguimos acá',
        preview: 'Un cierre corto antes de que llegue junio otra vez.',
        copy: `Hola [Nombre],

Siete meses pasaron desde que donaste en Misión Platos. La red que ayudaste a construir en junio sigue funcionando hoy, en enero, sin pausa.

No te vamos a insistir. Si en algún momento querés que sea todos los meses, la puerta sigue abierta.

[CTA: Quiero ser socio mensual →]`
      },
      {
        id: 'ene27-hist',
        seg: 'hist',
        titulo: 'Mail 6 de 6 — Cierre de la secuencia',
        foco: 'Pieza final, corta y directa, de esta primera secuencia',
        objetivo: 'Cerrar el ciclo inicial dejando la puerta abierta. Meta: mantener el vínculo.',
        asunto: 'Una última vez, sin vueltas',
        preview: 'Si te mueve, todavía podés ser parte.',
        copy: `Hola [Nombre],

No te vamos a volver a preguntar todos los meses. Pero antes de cerrar esta primera etapa, una vez más: si te mueve, podés ser parte de la red, no solo de una donación.

[CTA: Quiero ser socio mensual →]`
      }
    ],
    checklistExtra: [
      'Revisar que ningún mail de este mes repita el pedido ya hecho dos veces a MP 2026/Histórico',
      'Programar los envíos antes de las licencias del equipo',
      'Definir si el segmento Histórico pasa a un flujo de mantenimiento (sin pedido) a partir de febrero'
    ],
    notas: [
      'Cierra la primera secuencia de conversión para MP 2026 e Histórico: no se repite un tercer pedido en este mes.',
      'Mes de menor apertura del año en todo el sector: no comparar contra octubre y sacar conclusiones.',
      'A partir de febrero, este calendario queda fuera del alcance de esta revisión — feb27 en adelante sigue siendo el borrador anterior, pendiente.'
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
