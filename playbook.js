/* ============================================================================
   REDALCO — Playbook por segmento.
   Fuente: "Redalco — Estrategia de Email Marketing. De donante ocasional a
   socio mensual" (31 de julio de 2026), secciones 3, 4, 5, 7, 10 y 11.
   Los conteos de "en el calendario" salen de datos.js y se calculan solos.
   ========================================================================== */

const PLAYBOOK_GENERAL = {
  objetivo: 'Convertir donantes de Misión Platos, leads de eventos y ex donantes en socios mensuales, y retener a los socios actuales, usando el email como el canal principal de relación entre campañas.',

  pilares: [
    { nombre: 'Informar',    para: 'Educar sobre el problema y el modelo', ejemplo: 'Los 125 millones de kilos, el circuito rescate → clasificación → distribución.' },
    { nombre: 'Sensibilizar',para: 'Conexión emocional sin golpe bajo',     ejemplo: 'Un día de rescate en la UAM, la voz de un voluntario.' },
    { nombre: 'Involucrar',  para: 'Comunidad más allá de la plata',        ejemplo: 'Encuestas, invitación a la UAM, pedidos de compartir.' },
    { nombre: 'Convertir',   para: 'Pedir la acción concreta',              ejemplo: 'Un solo CTA: "$250 al mes son 25 platos, todos los meses".' }
  ],

  reglaDeOro: 'De cada 10 envíos al año a una misma audiencia, no más de 3 son pedidos directos de plata. El resto informa, sensibiliza o involucra. Es lo que hace que, cuando llega el pedido, todavía tengas permiso para que te escuchen.',

  restriccion: 'EmailOctopus dispara automatizaciones por el tiempo transcurrido desde que alguien entra a una lista, pero NO por apertura ni por clic. Por eso la segmentación se decide al momento de etiquetar el contacto, no después según cómo se comportó.',

  benchmarks: [
    { m: 'Apertura en ONGs',                 v: '25% – 29%',   f: 'Nonprofit Tech for Good, 2026' },
    { m: 'CTR en fundraising',               v: '≈ 0,59%',     f: 'M+R Benchmarks 2026' },
    { m: 'Ingresos por 1.000 emails',        v: 'USD 54',      f: 'M+R Benchmarks 2026' },
    { m: 'ROI del email',                    v: 'USD 42 : 1',  f: 'Nonprofit Tech for Good, 2026' },
    { m: 'Pérdida anual de contactos',       v: '≈ 16%',       f: 'M+R Benchmarks 2026 (12% bajas + 4% rebotes)' }
  ],

  lecturaBenchmarks: 'El CTR de fundraising es bajo en todo el sector, menos del 1%. La conversión a socio mensual no depende de un email brillante sino de la secuencia completa y de mantener la lista sana.',

  noventaDias: [
    { cuando: 'Semana 1',   que: 'Enviar el pedido de conversión a la base de Misión Platos 2026. No esperar a tener el resto armado: la ventana es ahora.', urgente: true },
    { cuando: 'Semana 1-2', que: 'Crear en EmailOctopus las 4 listas de segmentación y migrar los contactos existentes según su historial.' },
    { cuando: 'Semana 2-3', que: 'Armar la automatización de bienvenida de socios (3 emails) y la de nutrición de leads (4 emails).' },
    { cuando: 'Semana 3-4', que: 'Armar la de reactivación de ex socios y hacer el primer envío a la base histórica.' },
    { cuando: 'Mes 2',      que: 'Lanzar el newsletter mensual con el formato nuevo y medir apertura y clics como línea de base propia.' },
    { cuando: 'Mes 3',      que: 'Revisar las primeras automatizaciones contra los benchmarks y ajustar asuntos y frecuencia.' }
  ]
};

const PLAYBOOK = [

  /* ─────────────────────────────── SOCIOS ─────────────────────────────── */
  {
    seg: 'socios',
    quienes: 'Ya tomaron la decisión más difícil: dan todos los meses. El trabajo ya no es convencerlos de donar.',
    objetivo: 'Que no se vayan, que con el tiempo aporten más y que traigan gente.',
    estrategia: 'A los socios no se les pide plata: se les muestra qué hizo la suya. La retención se juega en el hábito —una unidad de impacto repetida todos los meses, siempre igual, hasta que sea reconocible— y en pasar de donante a participante invitándolos a la UAM. El pedido, cuando llega, es de amplificación o de referidos, no de dinero.',
    cadenciaEstrategia: 17,
    automatizadas: 3,
    metricaClave: { nombre: 'Tasa de bajas', meta: 'Debajo de 0,5% por envío', porQue: 'Es la única métrica que mide si los estás perdiendo. Una baja de socio cuesta doce veces más que una de lista.' },
    metricaSecundaria: { nombre: 'Apertura', meta: '30%+', porQue: 'Arriba del sector: si tu propia gente no te abre, algo del formato no funciona.' },
    reglas: [
      'Nunca pedirles plata en un envío de calendario. En Misión Platos se les pide voz, no aporte.',
      'Repetir siempre la misma unidad de impacto ($10 = 1 plato) para que se vuelva reconocible.',
      'El aniversario de alta es el email más importante del año para este segmento.'
    ],
    noHacer: 'Mandarles el mismo mail que a los donantes de campaña. Ya donaron: pedirles de nuevo lo que ya hacen es la vía más rápida a una baja.',
    automatizacion: { nombre: 'Bienvenida socios nuevos', tag: 'SOC-NUEVO-[mes-año]', emails: '3 (días 0, 3 y 10)', disparador: 'Alta en la lista "Socios nuevos", al confirmarse el primer cobro' },
    faltante: 'La serie de bienvenida de 3 emails y los envíos trimestrales de "La Ruta del Rescate" no están en el calendario: son automáticos y se disparan cuando entra cada socio.'
  },

  /* ───────────────────────────── DONANTES MP ──────────────────────────── */
  {
    seg: 'mp',
    quienes: 'Donaron una sola vez durante la campaña de junio, muchos por impulso, prensa o el efecto del matching. Es la base más grande y la de mayor potencial.',
    objetivo: 'Convertirlos en socios mensuales, dándole tiempo a la relación.',
    estrategia: 'Este es el segmento donde se gana o se pierde el año. La apuesta es contraintuitiva: no pedir nada durante los primeros tres meses. Primero se demuestra que la donación se convirtió en algo real —a dónde fue, quién comió— y recién en el mes 3 llega el primer pedido. Después, cada pedido cambia de ángulo: primero el impacto propio, después la prueba social de cuántos ya son socios.',
    cadenciaEstrategia: 17,
    automatizadas: 7,
    metricaClave: { nombre: 'Conversión a socio mensual', meta: '3–5% en el pedido de octubre', porQue: 'Es LA métrica del año. Todo lo anterior existe para que este número exista.' },
    metricaSecundaria: { nombre: 'Apertura', meta: '28%+', porQue: 'Si cae por debajo del sector antes del pedido, el pedido no va a rendir: hay que corregir antes.' },
    reglas: [
      'El primer pedido directo no va antes del mes 3. Adelantarlo quema la base.',
      'Cada pedido posterior cambia de ángulo, no repite el mismo argumento.',
      'Siempre nombrar el monto exacto y qué compra: "$250 al mes = 25 platos".'
    ],
    noHacer: 'Pedir en agosto porque "ya pasaron dos meses". La estrategia fija el mes 3 y el plan de mails lo respeta: el pedido va en octubre.',
    automatizacion: { nombre: 'Post-Misión Platos', tag: 'MP-[año]', emails: '7 (días 1-2, 15, 30, 45, 60, 90 y 110-120)', disparador: 'Etiquetado como donante apenas cierra la campaña' },
    faltante: 'Los 7 emails de los primeros 4 meses son automáticos y se cuentan aparte del calendario. Si no están configurados en EmailOctopus, la cohorte llega al pedido de octubre sin haber recibido la mitad del recorrido.'
  },

  /* ─────────────────────────────── LEADS ──────────────────────────────── */
  {
    seg: 'leads',
    quienes: 'Dejaron su contacto en un stand o evento y todavía no donaron nunca. Conocen la marca, no necesariamente la causa.',
    objetivo: 'Que la primera donación sea directamente mensual, con un monto de entrada bajo.',
    estrategia: 'Es el vínculo más frío, así que primero se educa y después se pide. La secuencia de los primeros 25 días hace todo el trabajo: reconocer dónde se conocieron, el dato que sorprende, una historia real y recién ahí el pedido. La clave es que el primer pedido sea de bajo compromiso —$250, cancelable cuando quiera— porque la barrera acá no es el monto sino la desconfianza.',
    cadenciaEstrategia: 16,
    automatizadas: 6,
    metricaClave: { nombre: 'Conversión a socio', meta: '1%+ por pedido', porQue: 'Es una base fría: 1% ya es bueno. Lo que importa es el acumulado del año, no cada envío.' },
    metricaSecundaria: { nombre: 'Bajas', meta: 'Debajo de 1%', porQue: 'Si se van rápido, el problema es que el evento captó contactos sin interés real, no el copy.' },
    reglas: [
      'La secuencia arranca en los días siguientes al evento, no meses después: el recuerdo se enfría rápido.',
      'El monto de entrada siempre es el más bajo ($250), nunca el promedio.',
      'Etiquetar por evento (LEAD-ExpoPrado-2026) para saber qué feria trae gente que convierte.'
    ],
    noHacer: 'Meterlos en el newsletter general apenas los cargás. Sin la secuencia de entrada, un lead frío no entiende qué hace Redalco y se da de baja al segundo envío.',
    automatizacion: { nombre: 'Nutrición de leads', tag: 'LEAD-[evento]-[año]', emails: '6 (días 0, 7, 14, 25 + mes 2-3 y mes 6)', disparador: 'Carga de los contactos del evento, con el tag del evento' },
    faltante: 'Es el segmento con la brecha más grande. El calendario cubre poco porque casi todo su recorrido son los 6 emails automáticos de entrada, que dependen de cuándo fue cada feria.'
  },

  /* ────────────────────────────── EX SOCIOS ───────────────────────────── */
  {
    seg: 'ex',
    quienes: 'Ya fueron parte y se fueron: tarjeta vencida, baja voluntaria o migración desde otra plataforma. Tienen contexto y también un motivo para haberse ido.',
    objetivo: 'Reactivar sin culpa ni presión, y limpiar la lista de quien ya no quiere estar.',
    estrategia: 'Poco y espaciado. Cuatro contactos en todo el año, porque un ritmo más alto se siente invasivo con alguien que ya decidió irse una vez. El argumento no es "volvé" sino "mirá lo que cambió": los 10 años, las 400 organizaciones, los premios. Y siempre con salida honrosa: el que dice que no también está dando una respuesta útil.',
    cadenciaEstrategia: 4,
    automatizadas: 4,
    metricaClave: { nombre: 'Reactivaciones', meta: '1%+ en el año', porQue: 'Recuperar a alguien que ya conoce la organización cuesta mucho menos que conseguir a alguien nuevo.' },
    metricaSecundaria: { nombre: 'Apertura', meta: '20%+', porQue: 'Más baja que el resto y está bien: es una base que ya se enfrió.' },
    reglas: [
      'Cuatro contactos en el año y ni uno más.',
      'Nunca reclamar ni recordar que se fueron.',
      'El cuarto envío es de limpieza: quien no abrió nada en todo el año sale de la lista.'
    ],
    noHacer: 'Tratarlos como leads. Ya conocen Redalco: repetirles la explicación básica del problema suena a que nadie se acuerda de que estuvieron.',
    automatizacion: { nombre: 'Reactivación de bajas y pausados', tag: 'EXSOC-BAJA / EXSOC-PAUSADO', emails: '4 (meses 1, 4-5, 8 y 11)', disparador: 'Exportar mensualmente quién canceló y sumarlo a la lista' },
    faltante: 'El plan tiene 3 de los 4 contactos. Falta el de limpieza de lista del mes 11, que es el que protege la entregabilidad de toda la base.'
  }
];
