/* ============================================================================
   REDALCO — Calendario del sector: efemérides y campañas de otras ONGs.
   Relevado el 2026-08-04. Cada entrada declara su nivel de certeza:

     fija       fecha igual todos los años (ONU, FAO, feriados)
     calculada  fecha móvil pero determinable (2º domingo de X, Pascua).
                Las de este archivo se calcularon, no se estimaron a ojo.
     estimada   patrón de años anteriores. HAY QUE CONFIRMARLA cada año:
                las ONGs no publican su calendario con tanta anticipación.

   relevancia: qué tanto le toca el tema a Redalco.
     alta   es literalmente nuestro tema (alimentos, desperdicio, pobreza)
     media  se puede enganchar con esfuerzo
     ruido  no es nuestro tema, pero compite por la atención y el bolsillo

   alcance: cómo se dibuja en la grilla.
     dia    un día puntual  → usa `fecha`
     rango  varios días     → de `fecha` a `hasta`
     mes    todo el mes     → va en la franja de arriba de la grilla
   ========================================================================== */

const ORGANIZACIONES = {
  onu:      { nombre: 'ONU y agencias',        corto: 'ONU',      color: '#2f7695' },
  uruguay:  { nombre: 'Uruguay (calendario)',  corto: 'Uruguay',  color: '#55605b' },
  teleton:  { nombre: 'Teletón Uruguay',       corto: 'Teletón',  color: '#cc3366' },
  techo:    { nombre: 'TECHO Uruguay',         corto: 'TECHO',    color: '#dd7626' },
  bda:      { nombre: 'Banco de Alimentos',    corto: 'B. de Alimentos', color: '#9a7b12' },
  sector:   { nombre: 'Todo el sector',        corto: 'Sector',   color: '#7b5ea7' },
  redalco:  { nombre: 'Redalco',               corto: 'Redalco',  color: '#138258' }
};

const CALENDARIO = [

  /* ───────────────────────────── AGOSTO 2026 ─────────────────────────── */
  {
    mes: 'ago26', fecha: '2026-08-12', alcance: 'dia', dia: '12 ago', org: 'onu',
    titulo: 'Día Internacional de la Juventud',
    tipo: 'efemeride', certeza: 'fija', relevancia: 'media', fuente: 'ONU',
    queHacer: 'Los voluntarios de la UAM son en buena parte estudiantes. Sirve para el contenido de voluntariado, no para pedir plata.'
  },
  {
    mes: 'ago26', fecha: '2026-08-16', alcance: 'dia', dia: '16 ago', org: 'uruguay',
    titulo: 'Día del Niño (Uruguay)',
    tipo: 'efemeride', certeza: 'calculada', relevancia: 'alta', fuente: 'Verificado: en 2026 cae domingo 16',
    queHacer: 'Es la fecha que ya usan los mails de agosto a socios y a donantes MP. Mucho ruido comercial ese fin de semana: mandar antes del viernes 14.'
  },
  {
    mes: 'ago26', fecha: '2026-08-01', hasta: '2026-08-31', alcance: 'mes', dia: 'Todo el mes', org: 'techo',
    titulo: 'TECHO Uruguay — campaña anual de recaudación',
    tipo: 'campana', certeza: 'estimada', relevancia: 'ruido', fuente: 'uruguay.techo.org (años anteriores)',
    queHacer: 'Una de las campañas más visibles del año y compite por el mismo donante individual. Otra razón para que agosto no lleve pedido de plata.'
  },

  /* ──────────────────────────── SEPTIEMBRE 2026 ──────────────────────── */
  {
    mes: 'sep26', fecha: '2026-09-21', alcance: 'dia', dia: '21 set', org: 'uruguay',
    titulo: 'Día del Estudiante (Uruguay)',
    tipo: 'efemeride', certeza: 'fija', relevancia: 'media', fuente: 'Uruguay',
    queHacer: 'Ya lo usa el mail de donantes MP con los 3 estudiantes que rescatan.'
  },
  {
    mes: 'sep26', fecha: '2026-09-29', alcance: 'dia', dia: '29 set', org: 'onu',
    titulo: 'Día Int. de Concienciación sobre la Pérdida y el Desperdicio de Alimentos',
    tipo: 'efemeride', certeza: 'fija', relevancia: 'alta', fuente: 'ONU / PNUMA',
    destacado: true,
    queHacer: 'ES LA FECHA DEL AÑO PARA REDALCO: el tema del día es exactamente lo que hace la organización. Hoy NO está en el plan de mails. Es la mejor oportunidad de prensa y de contenido con dato duro de todo el calendario.'
  },

  /* ───────────────────────────── OCTUBRE 2026 ────────────────────────── */
  {
    mes: 'oct26', fecha: '2026-10-13', alcance: 'dia', dia: '13 oct', org: 'teleton',
    titulo: 'Teletón — La Carrera de Todos',
    tipo: 'campana', certeza: 'estimada', relevancia: 'ruido', fuente: 'teleton.org.uy (en 2025 fue el 13 de octubre)',
    queHacer: 'Arranca la previa de Teletón. La atención solidaria del país empieza a concentrarse ahí.'
  },
  {
    mes: 'oct26', fecha: '2026-10-15', alcance: 'dia', dia: '15 oct', org: 'onu',
    titulo: 'Día Internacional de las Mujeres Rurales',
    tipo: 'efemeride', certeza: 'fija', relevancia: 'media', fuente: 'ONU',
    queHacer: 'Engancha con las productoras de la UAM. Material para Instagram más que para mail.'
  },
  {
    mes: 'oct26', fecha: '2026-10-16', alcance: 'dia', dia: '16 oct', org: 'onu',
    titulo: 'Día Mundial de la Alimentación',
    tipo: 'efemeride', certeza: 'fija', relevancia: 'alta', fuente: 'FAO',
    destacado: true,
    queHacer: 'Ya lo usa el mail de socios de octubre. Es la fecha en que la prensa uruguaya sí publica sobre alimentación: tener el dato de los 125 millones de kg listo para periodistas.'
  },
  {
    mes: 'oct26', fecha: '2026-10-17', alcance: 'dia', dia: '17 oct', org: 'onu',
    titulo: 'Día Int. para la Erradicación de la Pobreza',
    tipo: 'efemeride', certeza: 'fija', relevancia: 'alta', fuente: 'ONU',
    queHacer: 'Al día siguiente de Alimentación. Se pueden encadenar los dos como una sola semana temática en vez de gastar dos piezas separadas.'
  },

  /* ──────────────────────────── NOVIEMBRE 2026 ───────────────────────── */
  {
    mes: 'nov26', fecha: '2026-11-06', hasta: '2026-11-07', alcance: 'rango', dia: '6 y 7 nov', org: 'teleton',
    titulo: 'TELETÓN URUGUAY',
    tipo: 'campana', certeza: 'estimada', relevancia: 'ruido', fuente: 'Documento de estrategia (31/7/2026); confirmar en teleton.org.uy',
    destacado: true,
    queHacer: 'El evento solidario más grande del país: 25 horas en todos los canales. Es el peor fin de semana del año para pedir plata. El mail de socios de noviembre ya está pensado para salir DESPUÉS. Confirmar la fecha 2026 apenas se publique.'
  },
  {
    mes: 'nov26', fecha: '2026-11-20', alcance: 'dia', dia: '20 nov', org: 'onu',
    titulo: 'Día Mundial de la Infancia',
    tipo: 'efemeride', certeza: 'fija', relevancia: 'media', fuente: 'ONU / UNICEF',
    queHacer: 'La mayoría de las organizaciones que reciben los rescates trabajan con chicos. Sirve para mostrar destinatarios sin pedir nada.'
  },

  /* ──────────────────────────── DICIEMBRE 2026 ───────────────────────── */
  {
    mes: 'dic26', fecha: '2026-12-01', alcance: 'dia', dia: '1 dic', org: 'sector',
    titulo: 'GivingTuesday',
    tipo: 'campana', certeza: 'calculada', relevancia: 'alta', fuente: 'Martes siguiente al 4º jueves de noviembre',
    destacado: true,
    queHacer: 'El día mundial de dar. A diferencia de Teletón, acá no competís: es una fecha en la que la gente ESPERA que le pidan. Hoy no está en el plan. Es el mejor día del año para el pedido a leads.'
  },
  {
    mes: 'dic26', fecha: '2026-12-05', alcance: 'dia', dia: '5 dic', org: 'onu',
    titulo: 'Día Internacional de los Voluntarios',
    tipo: 'efemeride', certeza: 'fija', relevancia: 'alta', fuente: 'ONU',
    queHacer: 'Para agradecer a los voluntarios de la UAM por nombre. Contenido de comunidad, sin pedido.'
  },
  {
    mes: 'dic26', fecha: '2026-12-10', alcance: 'dia', dia: '10 dic', org: 'onu',
    titulo: 'Día de los Derechos Humanos',
    tipo: 'efemeride', certeza: 'fija', relevancia: 'media', fuente: 'ONU',
    queHacer: 'La alimentación como derecho es el encuadre que ya usa el pilar "alimentación segura" de los videos.'
  },
  {
    mes: 'dic26', fecha: '2026-12-01', hasta: '2026-12-31', alcance: 'mes', dia: 'Todo el mes', org: 'sector',
    titulo: 'Campañas navideñas de todo el sector',
    tipo: 'campana', certeza: 'estimada', relevancia: 'ruido', fuente: 'Patrón del sector',
    queHacer: 'Todas las ONGs piden en diciembre y las casillas se saturan. El mail de leads de diciembre es de preferencias, no de plata: buena decisión, mantenerla.'
  },

  /* ───────────────────────────── ENERO 2027 ──────────────────────────── */
  {
    mes: 'ene27', fecha: '2027-01-01', hasta: '2027-01-31', alcance: 'mes', dia: 'Todo el mes', org: 'sector',
    titulo: 'Vacaciones: el sector entero baja los brazos',
    tipo: 'contexto', certeza: 'fija', relevancia: 'alta', fuente: 'Uruguay',
    queHacer: 'Casi ninguna ONG comunica en enero. Es el mes de MENOS competencia por la atención del año: la apertura baja, pero lo poco que mandes no compite con nadie.'
  },

  /* ──────────────────────────── FEBRERO 2027 ─────────────────────────── */
  {
    mes: 'feb27', fecha: '2027-02-15', hasta: '2027-02-28', alcance: 'rango', dia: '15 al 28 feb', org: 'uruguay',
    titulo: 'Previa de la vuelta a clases',
    tipo: 'contexto', certeza: 'fija', relevancia: 'alta', fuente: 'Uruguay',
    queHacer: 'Las familias arman el presupuesto de marzo. Las organizaciones que reciben rescates pasan a atender más gente: buen momento para pedirles datos reales de demanda.'
  },

  /* ───────────────────────────── MARZO 2027 ──────────────────────────── */
  {
    mes: 'mar27', fecha: '2027-03-08', alcance: 'dia', dia: '8 mar', org: 'onu',
    titulo: 'Día Internacional de la Mujer',
    tipo: 'efemeride', certeza: 'fija', relevancia: 'alta', fuente: 'ONU',
    queHacer: 'Ya lo usa el mail de socios con las 5 historias. Ojo: es una fecha con mucho volumen de comunicación, hay que salir con algo propio o no salir.'
  },
  {
    mes: 'mar27', fecha: '2027-03-22', hasta: '2027-03-28', alcance: 'rango', dia: '22 al 28 mar', org: 'uruguay',
    titulo: 'SEMANA DE TURISMO 2027',
    tipo: 'contexto', certeza: 'calculada', relevancia: 'alta', fuente: 'Calculada desde Pascua 2027 (28 de marzo)',
    destacado: true,
    queHacer: 'ATENCIÓN: en 2027 la Semana de Turismo cae en MARZO, no en abril. El plan de mails tiene el mail de Semana de Turismo en abril, o sea que llegaría con la semana terminada. Hay que adelantarlo.'
  },

  /* ───────────────────────────── ABRIL 2027 ──────────────────────────── */
  {
    mes: 'abr27', fecha: '2027-04-07', alcance: 'dia', dia: '7 abr', org: 'onu',
    titulo: 'Día Mundial de la Salud',
    tipo: 'efemeride', certeza: 'fija', relevancia: 'media', fuente: 'OMS',
    queHacer: 'Enganche con alimentación saludable: fruta y verdura fresca contra la comida ultraprocesada barata.'
  },
  {
    mes: 'abr27', fecha: '2027-04-22', alcance: 'dia', dia: '22 abr', org: 'onu',
    titulo: 'Día de la Tierra',
    tipo: 'efemeride', certeza: 'fija', relevancia: 'alta', fuente: 'ONU',
    queHacer: 'El ángulo ambiental del rescate: las 1.290 toneladas de CO2 evitadas que ya están cargadas en el proyecto de videos. Es el dato que mejor funciona con público nuevo.'
  },

  /* ────────────────────────────── MAYO 2027 ──────────────────────────── */
  {
    mes: 'may27', fecha: '2027-05-01', alcance: 'dia', dia: '1 may', org: 'uruguay',
    titulo: 'Día de los Trabajadores',
    tipo: 'contexto', certeza: 'fija', relevancia: 'ruido', fuente: 'Uruguay',
    queHacer: 'Feriado y fin de semana largo: no programar envíos.'
  },
  {
    mes: 'may27', fecha: '2027-05-09', alcance: 'dia', dia: '9 may', org: 'uruguay',
    titulo: 'Día de la Madre (Uruguay)',
    tipo: 'efemeride', certeza: 'calculada', relevancia: 'alta', fuente: '2º domingo de mayo',
    destacado: true,
    queHacer: 'Los dos mails de mayo dependen de esta fecha. Es una fecha comercial muy saturada: la campaña de regalar una membresía tiene que salir con 10 días de anticipación, no el mismo fin de semana.'
  },

  /* ────────────────────────────── JUNIO 2027 ─────────────────────────── */
  {
    mes: 'jun27', fecha: '2027-06-05', alcance: 'dia', dia: '5 jun', org: 'onu',
    titulo: 'Día Mundial del Medio Ambiente',
    tipo: 'efemeride', certeza: 'fija', relevancia: 'alta', fuente: 'ONU / PNUMA',
    destacado: true,
    queHacer: 'Cae justo cuando arranca Misión Platos 2027. El ángulo ambiental sirve para llegar a empresas y prensa que no se mueven por el ángulo social.'
  },
  {
    mes: 'jun27', fecha: '2027-06-01', hasta: '2027-06-30', alcance: 'mes', dia: 'Todo el mes', org: 'bda',
    titulo: 'Banco de Alimentos Uruguay — campaña de maíz',
    tipo: 'campana', certeza: 'estimada', relevancia: 'ruido', fuente: 'bancodealimentos.org.uy',
    queHacer: 'La organización más parecida a Redalco en Uruguay, pidiendo en el mismo mes que Misión Platos. Conviene diferenciar bien el mensaje: ellos piden producto, nosotros rescatamos lo que se descarta.'
  },

  /* ────────────────────────────── JULIO 2027 ─────────────────────────── */
  {
    mes: 'jul27', fecha: '2027-07-11', alcance: 'dia', dia: '11 jul', org: 'uruguay',
    titulo: 'Día del Padre (Uruguay)',
    tipo: 'efemeride', certeza: 'calculada', relevancia: 'media', fuente: '2º domingo de julio',
    queHacer: 'Espejo del Día de la Madre: si la campaña de regalar membresías funciona en mayo, se repite acá.'
  },
  {
    mes: 'jul27', fecha: '2027-07-05', hasta: '2027-07-18', alcance: 'rango', dia: '5 al 18 jul', org: 'uruguay',
    titulo: 'Vacaciones de invierno',
    tipo: 'contexto', certeza: 'estimada', relevancia: 'media', fuente: 'Uruguay (la fecha exacta la fija la ANEP cada año)',
    queHacer: 'Los comedores y clubes de niños cambian de ritmo y muchos aumentan la demanda porque los chicos no tienen la comida de la escuela. Dato fuerte si se consigue el número real.'
  }
];
