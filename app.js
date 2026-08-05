/* ============================================================================
   REDALCO — Dashboard de emails. Lógica.
   Sin dependencias. Todo se guarda en localStorage del navegador.
   ========================================================================== */

const CLAVE = 'redalco-dashboard-v1';

/* Campos de métricas que se cargan a mano después de cada envío. */
const CAMPOS = [
  { k: 'fecha',    l: 'Fecha de envío', t: 'date' },
  { k: 'enviados', l: 'Enviados',       t: 'number', ph: 'Ej: 1240' },
  { k: 'aperturas',l: 'Aperturas',      t: 'number', ph: 'Ej: 352' },
  { k: 'clics',    l: 'Clics',          t: 'number', ph: 'Ej: 18' },
  { k: 'conv',     l: null,             t: 'number', ph: 'Ej: 4' },   // etiqueta según segmento
  { k: 'monto',    l: '$ generados',    t: 'number', ph: 'Ej: 12500' },
  { k: 'bajas',    l: 'Bajas',          t: 'number', ph: 'Ej: 3' },
  { k: 'rebotes',  l: 'Rebotes',        t: 'number', ph: 'Ej: 7' }
];

/* Meses reales de antes del plan (enero–jul 2026) + los 12 del plan,
   en un solo orden para la navegación (tira, selector, flechas). El
   playbook, el calendario anual y el CSV anual siguen usando MESES solo:
   son cálculos del plan, no de navegación. */
const MESES_NAV = (typeof MESES_PASADOS !== 'undefined' ? MESES_PASADOS : []).concat(MESES);

let estado = cargarEstado();
let mesActual = estado.ultimoMes && MESES_NAV.some(m => m.id === estado.ultimoMes)
  ? estado.ultimoMes
  : MESES[0].id;

/* ------------------------------------------------------------- ESTADO ---- */

/* declaración de función y no const: cargarEstado() corre más arriba en el archivo */
function vacio() {
  return { emails: {}, checks: {}, notas: {}, ultimoMes: null, ultimoRespaldo: null };
}

function cargarEstado() {
  try {
    const bruto = localStorage.getItem(CLAVE);
    if (!bruto) return vacio();
    const s = JSON.parse(bruto);
    return {
      emails: s.emails || {},
      checks: s.checks || {},
      notas: s.notas || {},
      ultimoMes: s.ultimoMes || null,
      ultimoRespaldo: s.ultimoRespaldo || null
    };
  } catch (e) {
    console.warn('No se pudo leer el guardado previo:', e);
    return vacio();
  }
}

let temporizadorGuardado = null;
function guardar(silencioso) {
  estado.ultimoMes = mesActual;
  try {
    localStorage.setItem(CLAVE, JSON.stringify(estado));
  } catch (e) {
    alert('No se pudo guardar en este navegador (¿modo privado o sin espacio?). Descargá el respaldo JSON para no perder los datos.');
    return;
  }
  if (silencioso) return;
  const ind = document.getElementById('guardado');
  ind.textContent = 'Guardado ✓';
  ind.classList.add('visible');
  clearTimeout(temporizadorGuardado);
  temporizadorGuardado = setTimeout(() => ind.classList.remove('visible'), 1400);
}

function datosEmail(id) {
  if (!estado.emails[id]) estado.emails[id] = { m: {} };
  if (!estado.emails[id].m) estado.emails[id].m = {};
  return estado.emails[id];
}

/* Valor vigente de un campo editable: lo editado, o el original del plan. */
function valor(email, campo) {
  const d = estado.emails[email.id];
  return d && d[campo] !== undefined && d[campo] !== null ? d[campo] : email[campo];
}

function fueEditado(email) {
  return ['asunto', 'preview', 'copy'].some(c => valor(email, c) !== email[c]);
}

/* ----------------------------------------------------- MOVIMIENTO -------- */

/* Motion (motion.dev) es la misma librería que Framer Motion, en su versión
   sin React. Si no cargó, todo sigue funcionando: solo no hay animación. */
const MOTION = typeof window !== 'undefined' ? window.Motion : null;
const QUIETO = typeof window !== 'undefined' && window.matchMedia
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : false;

const SALIDA = [0.22, 1, 0.36, 1];

function anim(objetivo, cuadros, opciones) {
  if (!MOTION || !MOTION.animate || QUIETO || !objetivo) return null;
  if (objetivo.length === 0) return null;
  try {
    return MOTION.animate(objetivo, cuadros, opciones);
  } catch (e) {
    console.warn('No se pudo animar:', e);
    return null;
  }
}

/* stagger() cambió de lugar entre versiones de la librería */
function escalonar(segundos) {
  if (MOTION && typeof MOTION.stagger === 'function') return MOTION.stagger(segundos);
  return 0;
}

function contarHasta(el, destino, ms) {
  if (!el) return;
  if (QUIETO) { el.textContent = destino; return; }
  const arranque = performance.now();
  const paso = ahora => {
    const t = Math.min((ahora - arranque) / ms, 1);
    el.textContent = Math.round(destino * (1 - Math.pow(1 - t, 3)));
    if (t < 1) requestAnimationFrame(paso);
  };
  requestAnimationFrame(paso);
}

/* ----------------------------------------------------------- UTILIDADES -- */

const esc = s => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const num = v => {
  if (v === '' || v === null || v === undefined) return null;
  const n = Number(String(v).replace(/[^\d.,-]/g, '').replace(',', '.'));
  return isNaN(n) ? null : n;
};

const pct = (a, b) => (a === null || b === null || b === 0) ? null : (a / b) * 100;
const fmtPct = v => v === null ? '—' : v.toFixed(v < 10 ? 2 : 1).replace('.', ',') + '%';
const fmtNum = v => v === null ? '—' : v.toLocaleString('es-UY');

function fmtFecha(f) {
  if (!f) return null;
  const p = f.split('-');
  return p.length === 3 ? p[2] + '/' + p[1] + '/' + p[0] : f;
}

function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('visible');
  clearTimeout(t._t);
  t._t = setTimeout(() => t.classList.remove('visible'), 1800);
}

function descargar(nombre, contenido, tipo) {
  const blob = new Blob([contenido], { type: tipo + ';charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = nombre;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

function autoAlto(el) {
  el.style.height = 'auto';
  el.style.height = Math.max(el.scrollHeight + 2, 120) + 'px';
}

/* --------------------------------------------------------- CÁLCULOS ----- */

/* Devuelve los indicadores derivados de las métricas cargadas a mano. */
function calcular(email) {
  const m = datosEmail(email.id).m;
  const env = num(m.enviados), ap = num(m.aperturas), cl = num(m.clics);
  const cv = num(m.conv), ba = num(m.bajas), mo = num(m.monto);

  const or = pct(ap, env), ctr = pct(cl, env), ctor = pct(cl, ap);
  const conv = pct(cv, env), tbaja = pct(ba, env);

  const b = BENCHMARKS;
  const notaOr = or === null ? ['—', 'neutro']
    : or < b.apertura.min ? ['Debajo del benchmark', 'bajo']
    : or > b.apertura.max ? ['Arriba del benchmark', 'ok']
    : ['En rango del sector', 'ok'];
  const notaCtr = ctr === null ? ['—', 'neutro']
    : ctr < b.ctr.min ? ['Debajo de 0,59%', 'bajo'] : ['Arriba de 0,59%', 'ok'];

  return [
    { lbl: 'Apertura',      val: fmtPct(or),   nota: notaOr[0],  clase: notaOr[1] },
    { lbl: 'CTR',           val: fmtPct(ctr),  nota: notaCtr[0], clase: notaCtr[1] },
    { lbl: 'CTOR',          val: fmtPct(ctor), nota: 'Clics sobre aperturas', clase: 'neutro' },
    { lbl: 'Conversión',    val: fmtPct(conv), nota: SEGMENTOS[email.seg].conversion, clase: 'neutro' },
    { lbl: 'Tasa de bajas', val: fmtPct(tbaja),nota: tbaja !== null && tbaja > 0.5 ? 'Alta: revisar' : 'Sana debajo de 0,5%', clase: tbaja !== null && tbaja > 0.5 ? 'alto' : 'neutro' },
    { lbl: '$ generados',   val: mo === null ? '—' : '$ ' + fmtNum(mo), nota: 'Cargado a mano', clase: 'neutro' }
  ];
}

/* --------------------------------------------------------- CHECKLIST ---- */

/* La lista se arma sola desde los mails del mes + las tareas propias del mes.
   Cada tarea lleva un id fijo: así el tilde sobrevive aunque se edite el asunto. */
function tareasDe(mes) {
  const t = [
    { id: 'base-vars',  texto: 'Reemplazar variables ([Nombre], [X], [Org], montos) por datos reales' },
    { id: 'base-movil', texto: 'Revisar asunto y preview en móvil (menos de 45 caracteres el asunto)' },
    { id: 'base-test',  texto: 'Test de envío al equipo antes de la lista real' }
  ];
  (mes.checklistExtra || []).forEach((x, i) => t.push({ id: 'extra-' + i, texto: x }));
  mes.emails.forEach(e => t.push({
    id: 'envio-' + e.id,
    texto: 'Enviar — ' + SEGMENTOS[e.seg].nombre + ': "' + valor(e, 'asunto') + '"'
  }));
  t.push({ id: 'base-metricas', texto: 'Cargar las métricas de todos los envíos (a las 72 h)' });
  t.push({ id: 'base-informe',  texto: 'Descargar el informe del mes y compartirlo con el equipo' });
  return t;
}

const claveCheck = (mesId, idTarea) => mesId + '::' + idTarea;

/* ------------------------------------------------------------- RENDER --- */

function estadoMes(mes) {
  if (mes.pasado) return 'pasado';
  const conDatos = mes.emails.filter(e => {
    const m = estado.emails[e.id] && estado.emails[e.id].m;
    return m && (m.enviados || m.fecha);
  }).length;
  if (conDatos === 0) return 'vacio';
  return conDatos === mes.emails.length ? 'completo' : 'parcial';
}

function renderTiraAnio() {
  document.getElementById('tira').innerHTML = MESES_NAV.map(m => {
    const est = estadoMes(m);
    return '<button class="chip-mes' + (m.id === mesActual ? ' activo' : '') + '" data-mes="' + m.id + '">' +
      '<i class="chip-punto ' + est + '"></i>' + esc(m.corto) + '</button>';
  }).join('');

  document.querySelectorAll('#tira .chip-mes').forEach(b => {
    b.addEventListener('click', () => irA(b.dataset.mes));
  });
}

function renderSelector() {
  const sel = document.getElementById('mes-select');
  const opt = m => '<option value="' + m.id + '">' + esc(m.nombre) + '</option>';
  const pasados = MESES_NAV.filter(m => m.pasado);
  sel.innerHTML =
    (pasados.length ? '<optgroup label="Antes del plan">' + pasados.map(opt).join('') + '</optgroup>' : '') +
    '<optgroup label="Plan de mails">' + MESES.map(opt).join('') + '</optgroup>';
  sel.value = mesActual;
  sel.addEventListener('change', () => irA(sel.value));
}

function tarjetaEmail(email) {
  const seg = SEGMENTOS[email.seg];
  const d = datosEmail(email.id);

  const campos = CAMPOS.map(c => {
    const etiqueta = c.l || seg.conversion;
    const v = d.m[c.k] === undefined ? '' : d.m[c.k];
    return '<label class="campo"><span>' + esc(etiqueta) + '</span>' +
      '<input type="' + c.t + '" data-metrica="' + c.k + '" value="' + esc(v) + '"' +
      (c.ph ? ' placeholder="' + esc(c.ph) + '"' : '') + (c.t === 'number' ? ' min="0" step="any"' : '') + '></label>';
  }).join('');

  const kpis = calcular(email).map(k =>
    '<div class="kpi"><div class="kpi-lbl">' + esc(k.lbl) + '</div>' +
    '<div class="kpi-val' + (k.val === '—' ? ' vacio' : '') + '">' + esc(k.val) + '</div>' +
    '<div class="kpi-nota ' + k.clase + '">' + esc(k.nota) + '</div></div>'
  ).join('');

  return '' +
  '<article class="tarjeta seg-' + seg.color + (fueEditado(email) ? ' editado' : '') + '" data-email="' + email.id + '">' +
    '<header class="tarjeta-header">' +
      '<span>' + seg.icono + '</span>' +
      '<div style="flex:1;min-width:150px">' +
        '<div class="seg-nombre">' + esc(seg.nombre) + '</div>' +
        '<div class="seg-titulo">' + esc(email.titulo) + '</div>' +
      '</div>' +
      (email.destacado ? '<span class="badge badge-alerta">' + esc(email.destacado) + '</span>' : '') +
      (email.derivado ? '<span class="badge">Derivado — adaptar</span>' : '') +
    '</header>' +
    '<div class="tarjeta-body">' +

      '<dl class="meta-fila">' +
        '<dt>Foco</dt><dd>' + esc(email.foco) + '</dd>' +
        '<dt>Objetivo</dt><dd>' + esc(email.objetivo) + '</dd>' +
      '</dl>' +

      '<div class="bloque">' +
        '<div class="bloque-header">' +
          '<span class="bloque-titulo">El mail</span>' +
          '<span class="pill-editado">Editado</span>' +
          '<button class="btn btn-chico" data-accion="copiar-todo">Copiar todo</button>' +
          '<button class="btn btn-chico" data-accion="copiar-cuerpo">Solo el cuerpo</button>' +
          '<button class="btn btn-chico" data-accion="restaurar">Restaurar original</button>' +
        '</div>' +
        '<div class="bloque-body">' +
          '<label class="campo"><span>Asunto</span>' +
            '<input type="text" data-editable="asunto" value="' + esc(valor(email, 'asunto')) + '"></label>' +
          '<label class="campo"><span>Preview / preheader</span>' +
            '<input type="text" data-editable="preview" value="' + esc(valor(email, 'preview')) + '"></label>' +
          '<label class="campo"><span>Cuerpo del mail</span>' +
            '<textarea class="copy" data-editable="copy" spellcheck="false">' + esc(valor(email, 'copy')) + '</textarea></label>' +
        '</div>' +
      '</div>' +

      '<div class="bloque">' +
        '<div class="bloque-header"><span class="bloque-titulo">Lo que dio el envío</span></div>' +
        '<div class="bloque-body">' +
          '<div class="grilla-metricas">' + campos + '</div>' +
          '<label class="campo"><span>Notas del envío (qué funcionó, qué no)</span>' +
            '<textarea class="notas" data-metrica="obs" placeholder="Ej: el asunto con número rindió mejor que el emocional.">' + esc(d.m.obs || '') + '</textarea></label>' +
        '</div>' +
        '<div class="calculadas">' + kpis + '</div>' +
      '</div>' +

    '</div>' +
  '</article>';
}

function render() {
  const mes = MESES_NAV.find(m => m.id === mesActual) || MESES[0];

  document.getElementById('mes-select').value = mes.id;
  document.getElementById('btn-prev').disabled = MESES_NAV[0].id === mes.id;
  document.getElementById('btn-next').disabled = MESES_NAV[MESES_NAV.length - 1].id === mes.id;
  document.querySelector('.toolbar .grupo-btn').hidden = !!mes.pasado;
  renderTiraAnio();
  avisoRespaldo();

  if (mes.pasado) {
    if (!historico && !historicoCargando) { cargarHistorico(false); return; }
    renderMesPasado(mes);
    return;
  }

  const cont = document.getElementById('contenido');

  const tareas = tareasDe(mes);
  const hechas = tareas.filter(t => estado.checks[claveCheck(mes.id, t.id)]).length;
  const enviados = mes.emails.filter(e => {
    const m = estado.emails[e.id] && estado.emails[e.id].m;
    return m && m.enviados;
  }).length;

  cont.innerHTML = '' +
    '<div class="foco-mes">' +
      '<div class="foco-texto">' +
        '<h2>' + esc(mes.nombre) + '</h2>' +
        '<p>' + esc(mes.foco) + '</p>' +
      '</div>' +
      '<div class="resumen-mes">' +
        '<div class="resumen-item"><div class="resumen-num">' + mes.emails.length + '</div><div class="resumen-lbl">Mails</div></div>' +
        '<div class="resumen-item"><div class="resumen-num">' + enviados + '</div><div class="resumen-lbl">Con datos</div></div>' +
        '<div class="resumen-item"><div class="resumen-num">' + hechas + '/' + tareas.length + '</div><div class="resumen-lbl">Tareas</div></div>' +
      '</div>' +
    '</div>' +

    '<div class="grilla">' + mes.emails.map(tarjetaEmail).join('') + '</div>' +

    seccionCalendarioMes(mes) +

    '<section class="seccion">' +
      '<div class="seccion-header">' +
        '<h3>✅ Checklist — ' + esc(mes.nombre) + '</h3>' +
        '<div class="barra-progreso"><i style="transform:scaleX(' + (tareas.length ? hechas / tareas.length : 0) + ')"></i></div>' +
        '<span class="progreso-txt">' + hechas + ' de ' + tareas.length + '</span>' +
      '</div>' +
      '<div class="lista-check">' + tareas.map(t => {
        const on = !!estado.checks[claveCheck(mes.id, t.id)];
        return '<label class="item-check' + (on ? ' hecho' : '') + '">' +
          '<input type="checkbox" data-check="' + esc(t.id) + '"' + (on ? ' checked' : '') + '>' +
          '<span>' + esc(t.texto) + '</span></label>';
      }).join('') + '</div>' +
    '</section>' +

    '<section class="seccion">' +
      '<div class="seccion-header"><h3>⚠️ Notas del mes</h3></div>' +
      '<div class="notas-mes">' +
        mes.notas.map(n => '<div class="nota-item' + (n.indexOf('⚠️') === 0 ? ' alerta' : '') + '">' + esc(n) + '</div>').join('') +
        '<label class="campo" style="margin-top:12px"><span>Tus notas de este mes</span>' +
          '<textarea class="notas" id="notas-mes" placeholder="Lo que quieras recordar del mes.">' + esc(estado.notas[mes.id] || '') + '</textarea></label>' +
      '</div>' +
    '</section>' +

    '<section class="seccion">' +
      '<div class="seccion-header"><h3>📊 Benchmarks del sector</h3></div>' +
      '<div class="benchmarks">' +
        '<div class="bench"><b>25–29%</b><span>Apertura esperada en ONGs</span></div>' +
        '<div class="bench"><b>0,59%</b><span>CTR esperado en fundraising</span></div>' +
        '<div class="bench"><b>$42 : $1</b><span>ROI del email marketing</span></div>' +
      '</div>' +
    '</section>';

  document.querySelectorAll('textarea.copy').forEach(autoAlto);
  conectarEventos();
  animarMes();
}

/* Las tarjetas del mes entran escalonadas: da a entender que son varias piezas
   distintas de un mismo mes, no un bloque único. */
function animarMes() {
  anim(document.querySelectorAll('.foco-mes, .grilla > .tarjeta, .seccion'),
    { opacity: [0, 1], transform: ['translateY(14px)', 'translateY(0)'] },
    { duration: 0.5, delay: escalonar(0.055), ease: SALIDA });
}

function irA(id) {
  mesActual = id;
  guardar(true);
  render();
  const panel = document.getElementById('panel');
  if (panel && !panel.hidden) window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ------------------------------------------------------------- EVENTOS -- */

function conectarEventos() {
  const mes = MESES.find(m => m.id === mesActual);

  document.querySelectorAll('.tarjeta').forEach(tarjeta => {
    const email = mes.emails.find(e => e.id === tarjeta.dataset.email);
    const d = datosEmail(email.id);

    tarjeta.querySelectorAll('[data-editable]').forEach(el => {
      el.addEventListener('input', () => {
        d[el.dataset.editable] = el.value;
        if (el.tagName === 'TEXTAREA') autoAlto(el);
        tarjeta.classList.toggle('editado', fueEditado(email));
        guardar();
      });
    });

    tarjeta.querySelectorAll('[data-metrica]').forEach(el => {
      el.addEventListener('input', () => {
        d.m[el.dataset.metrica] = el.value;
        guardar();
        if (el.dataset.metrica !== 'obs') {
          const cont = tarjeta.querySelector('.calculadas');
          cont.innerHTML = calcular(email).map(k =>
            '<div class="kpi"><div class="kpi-lbl">' + esc(k.lbl) + '</div>' +
            '<div class="kpi-val' + (k.val === '—' ? ' vacio' : '') + '">' + esc(k.val) + '</div>' +
            '<div class="kpi-nota ' + k.clase + '">' + esc(k.nota) + '</div></div>'
          ).join('');
          renderTiraAnio();
        }
      });
    });

    tarjeta.querySelectorAll('[data-accion]').forEach(btn => {
      btn.addEventListener('click', () => {
        const acc = btn.dataset.accion;
        if (acc === 'restaurar') {
          if (!confirm('¿Volver al texto original del plan? Se pierde lo que hayas editado en este mail.')) return;
          delete d.asunto; delete d.preview; delete d.copy;
          guardar(); render(); toast('Texto original restaurado');
          return;
        }
        const cuerpo = valor(email, 'copy');
        const texto = acc === 'copiar-todo'
          ? 'Asunto: ' + valor(email, 'asunto') + '\nPreview: ' + valor(email, 'preview') + '\n\n' + cuerpo
          : cuerpo;
        copiar(texto, btn);
      });
    });
  });

  document.querySelectorAll('[data-check]').forEach(cb => {
    cb.addEventListener('change', () => {
      const k = claveCheck(mes.id, cb.dataset.check);
      if (cb.checked) estado.checks[k] = true; else delete estado.checks[k];
      cb.closest('.item-check').classList.toggle('hecho', cb.checked);
      guardar();
      const tareas = tareasDe(mes);
      const hechas = tareas.filter(t => estado.checks[claveCheck(mes.id, t.id)]).length;
      document.querySelector('.barra-progreso i').style.transform = 'scaleX(' + (hechas / tareas.length) + ')';
      document.querySelector('.progreso-txt').textContent = hechas + ' de ' + tareas.length;
      document.querySelectorAll('.resumen-num')[2].textContent = hechas + '/' + tareas.length;
    });
  });

  const nm = document.getElementById('notas-mes');
  if (nm) nm.addEventListener('input', () => { estado.notas[mes.id] = nm.value; guardar(); });
}

function copiar(texto, btn) {
  const ok = () => {
    const antes = btn.textContent;
    btn.textContent = '¡Copiado!';
    setTimeout(() => { btn.textContent = antes; }, 1200);
  };
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(texto).then(ok, () => copiarFallback(texto, ok));
  } else {
    copiarFallback(texto, ok);
  }
}

function copiarFallback(texto, ok) {
  const ta = document.createElement('textarea');
  ta.value = texto;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); ok(); } catch (e) { alert('No se pudo copiar. Seleccioná el texto a mano.'); }
  document.body.removeChild(ta);
}

/* -------------------------------------------------------------- INFORME - */

function filasInforme(mes) {
  return mes.emails.map(e => {
    const d = datosEmail(e.id);
    const m = d.m;
    const env = num(m.enviados), ap = num(m.aperturas), cl = num(m.clics), cv = num(m.conv);
    return {
      email: e,
      seg: SEGMENTOS[e.seg],
      asunto: valor(e, 'asunto'),
      preview: valor(e, 'preview'),
      copy: valor(e, 'copy'),
      editado: fueEditado(e),
      fecha: fmtFecha(m.fecha) || 'Sin enviar',
      enviados: env, aperturas: ap, clics: cl, conv: cv,
      monto: num(m.monto), bajas: num(m.bajas), rebotes: num(m.rebotes),
      or: pct(ap, env), ctr: pct(cl, env), ctor: pct(cl, ap), tconv: pct(cv, env),
      obs: m.obs || ''
    };
  });
}

function informeHTML(mes) {
  const filas = filasInforme(mes);
  const tareas = tareasDe(mes);
  const hechas = tareas.filter(t => estado.checks[claveCheck(mes.id, t.id)]);
  const hoy = new Date().toLocaleDateString('es-UY', { day: '2-digit', month: 'long', year: 'numeric' });

  const totEnv = filas.reduce((a, f) => a + (f.enviados || 0), 0);
  const totAp = filas.reduce((a, f) => a + (f.aperturas || 0), 0);
  const totCl = filas.reduce((a, f) => a + (f.clics || 0), 0);
  const totCv = filas.reduce((a, f) => a + (f.conv || 0), 0);
  const totMo = filas.reduce((a, f) => a + (f.monto || 0), 0);

  const tabla = filas.map(f =>
    '<tr>' +
      '<td><b>' + esc(f.seg.nombre) + '</b><br><span class="mini">' + esc(f.asunto) + '</span></td>' +
      '<td>' + esc(f.fecha) + '</td>' +
      '<td class="n">' + fmtNum(f.enviados) + '</td>' +
      '<td class="n">' + fmtNum(f.aperturas) + '</td>' +
      '<td class="n"><b>' + fmtPct(f.or) + '</b></td>' +
      '<td class="n">' + fmtNum(f.clics) + '</td>' +
      '<td class="n"><b>' + fmtPct(f.ctr) + '</b></td>' +
      '<td class="n">' + fmtNum(f.conv) + '</td>' +
      '<td class="n">' + (f.monto === null ? '—' : '$ ' + fmtNum(f.monto)) + '</td>' +
    '</tr>'
  ).join('');

  const detalle = filas.map(f =>
    '<section class="det">' +
      '<h3><span class="tag tag-' + f.seg.color + '">' + esc(f.seg.nombre) + '</span> ' + esc(f.email.titulo) +
        (f.editado ? ' <span class="mini">(texto editado)</span>' : '') + '</h3>' +
      '<p class="mini"><b>Foco:</b> ' + esc(f.email.foco) + ' &nbsp;·&nbsp; <b>Objetivo:</b> ' + esc(f.email.objetivo) + '</p>' +
      '<p><b>Asunto:</b> ' + esc(f.asunto) + '<br><b>Preview:</b> ' + esc(f.preview) + '</p>' +
      '<pre>' + esc(f.copy) + '</pre>' +
      '<table class="chica"><tbody>' +
        '<tr><th>Enviado</th><td>' + esc(f.fecha) + '</td><th>Enviados</th><td>' + fmtNum(f.enviados) + '</td></tr>' +
        '<tr><th>Apertura</th><td>' + fmtNum(f.aperturas) + ' · <b>' + fmtPct(f.or) + '</b></td><th>Clics</th><td>' + fmtNum(f.clics) + ' · <b>' + fmtPct(f.ctr) + '</b></td></tr>' +
        '<tr><th>CTOR</th><td>' + fmtPct(f.ctor) + '</td><th>' + esc(f.seg.conversion) + '</th><td>' + fmtNum(f.conv) + ' · ' + fmtPct(f.tconv) + '</td></tr>' +
        '<tr><th>Bajas</th><td>' + fmtNum(f.bajas) + '</td><th>Rebotes</th><td>' + fmtNum(f.rebotes) + '</td></tr>' +
        '<tr><th>$ generados</th><td colspan="3">' + (f.monto === null ? '—' : '$ ' + fmtNum(f.monto)) + '</td></tr>' +
      '</tbody></table>' +
      (f.obs ? '<p class="obs"><b>Notas del envío:</b> ' + esc(f.obs) + '</p>' : '') +
    '</section>'
  ).join('');

  return '<!DOCTYPE html><html lang="es"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<meta name="color-scheme" content="light">' +
    '<title>Informe Redalco — ' + esc(mes.nombre) + '</title><style>' +
    /* misma paleta y misma display que el panel: el informe es la cara que
       ve el resto del equipo */
    ':root{color-scheme:light}html{background:#fff}' +
    'body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;background:#fff;color:#2a3330;max-width:940px;margin:0 auto;padding:34px 22px 60px;line-height:1.55}' +
    'h1,h2,h3{font-family:Superclarendon,Georgia,serif;font-weight:600}' +
    'h1{font-size:27px;margin:0 0 4px;letter-spacing:-.01em}' +
    'h2{font-size:14px;text-transform:uppercase;letter-spacing:.1em;color:#55605b;margin:34px 0 12px;border-bottom:2px solid #138258;padding-bottom:6px}' +
    'h3{font-size:15px;margin:0 0 6px}.sub{color:#808a85;font-size:13px;margin:0 0 6px}' +
    '.foco{background:#f6f8f6;border-left:4px solid #eac03b;padding:11px 15px;border-radius:6px;font-size:14px;margin:14px 0 0}' +
    'table{width:100%;border-collapse:collapse;font-size:13px;margin:0 0 8px;font-variant-numeric:tabular-nums}' +
    '.scroll{overflow-x:auto}.scroll table{min-width:720px}.scroll td:first-child{min-width:210px}' +
    'th,td{border:1px solid #dfe5e1;padding:7px 9px;text-align:left;vertical-align:top}' +
    'thead th{background:#138258;color:#fff;font-size:11.5px;text-transform:uppercase;letter-spacing:.06em}' +
    'td.n,th.n{text-align:right;white-space:nowrap}tfoot td{background:#f6f8f6;font-weight:700}' +
    '.mini{color:#808a85;font-size:12px}' +
    '.det{border:1px solid #dfe5e1;border-radius:9px;padding:15px 17px;margin-bottom:14px;page-break-inside:avoid}' +
    'pre{background:#fcfdfc;border:1px solid #dfe5e1;border-radius:6px;padding:12px;font-size:12.5px;white-space:pre-wrap;line-height:1.65;overflow-x:auto}' +
    'table.chica th{background:#f6f8f6;width:14%;font-size:11.5px;text-transform:uppercase;letter-spacing:.06em;color:#55605b}' +
    '.tag{display:inline-block;padding:2px 9px;border-radius:999px;font-size:11px;font-weight:700;color:#fff;vertical-align:middle}' +
    '.tag-verde{background:#138258}.tag-dorado{background:#9a7b12}.tag-azul{background:#2f7695}.tag-rojo{background:#cc3366}' +
    '.obs{background:#fdfaf0;border:1px solid #f0e4bf;border-radius:6px;padding:9px 12px;font-size:13px}' +
    'ul{margin:6px 0 0;padding-left:20px;font-size:13.5px}li{margin-bottom:3px}' +
    '.aviso{background:#fdf0f1;border:1px solid #f2c6ca;border-radius:6px;padding:9px 12px;font-size:13px;margin-bottom:8px}' +
    '@media print{body{padding:0}}' +
    '</style></head><body>' +

    '<h1>Informe de emails — ' + esc(mes.nombre) + '</h1>' +
    '<p class="sub">Redalco · Plan Agosto 2026 – Julio 2027 · Generado el ' + esc(hoy) + '</p>' +
    '<div class="foco"><b>Foco del mes:</b> ' + esc(mes.foco) + '</div>' +

    '<h2>Resumen</h2>' +
    '<div class="scroll">' +
    '<table><thead><tr><th>Segmento / asunto</th><th>Envío</th><th class="n">Enviados</th><th class="n">Aperturas</th>' +
    '<th class="n">Apertura</th><th class="n">Clics</th><th class="n">CTR</th><th class="n">Conv.</th><th class="n">$</th></tr></thead>' +
    '<tbody>' + tabla + '</tbody>' +
    '<tfoot><tr><td colspan="2">TOTAL DEL MES</td><td class="n">' + fmtNum(totEnv) + '</td><td class="n">' + fmtNum(totAp) + '</td>' +
    '<td class="n">' + fmtPct(pct(totAp, totEnv)) + '</td><td class="n">' + fmtNum(totCl) + '</td>' +
    '<td class="n">' + fmtPct(pct(totCl, totEnv)) + '</td><td class="n">' + fmtNum(totCv) + '</td>' +
    '<td class="n">$ ' + fmtNum(totMo) + '</td></tr></tfoot></table></div>' +
    '<p class="mini">Referencia del sector: apertura 25–29% · CTR ~0,59% · ROI $42 por cada $1.</p>' +

    '<h2>Detalle por mail</h2>' + detalle +

    '<h2>Checklist</h2>' +
    '<p class="mini">' + hechas.length + ' de ' + tareas.length + ' tareas completadas.</p>' +
    '<ul>' + tareas.map(t => '<li>' + (estado.checks[claveCheck(mes.id, t.id)] ? '☑' : '☐') + ' ' + esc(t.texto) + '</li>').join('') + '</ul>' +

    '<h2>Notas del mes</h2>' +
    mes.notas.map(n => '<div class="' + (n.indexOf('⚠️') === 0 ? 'aviso' : 'obs') + '">' + esc(n) + '</div>').join('') +
    (estado.notas[mes.id] ? '<div class="obs" style="margin-top:8px"><b>Notas del equipo:</b> ' + esc(estado.notas[mes.id]) + '</div>' : '') +

    (fechasDe(mes.id).length
      ? '<h2>Qué más pasa este mes</h2>' +
        '<table><thead><tr><th style="width:130px">Cuándo</th><th>Qué</th><th>Qué hacer con eso</th></tr></thead><tbody>' +
        fechasDe(mes.id).map(f =>
          '<tr><td><b>' + esc(f.dia) + '</b>' + (f.certeza === 'estimada' ? '<br><span class="mini">a confirmar</span>' : '') + '</td>' +
          '<td><b>' + esc(f.titulo) + '</b><br><span class="mini">' + esc(ETIQUETA_TIPO[f.tipo]) + ' · ' + esc(f.fuente) + '</span></td>' +
          '<td>' + esc(f.queHacer) + '</td></tr>').join('') +
        '</tbody></table>'
      : '') +

    '</body></html>';
}

function informeMD(mes) {
  const filas = filasInforme(mes);
  const tareas = tareasDe(mes);
  const hoy = new Date().toLocaleDateString('es-UY');
  let s = '# Informe de emails — ' + mes.nombre + '\n\n';
  s += 'Redalco · Plan Agosto 2026 – Julio 2027 · Generado el ' + hoy + '\n\n';
  s += '**Foco del mes:** ' + mes.foco + '\n\n## Resumen\n\n';
  s += '| Segmento | Asunto | Envío | Enviados | Apertura | CTR | Conv. | $ |\n';
  s += '|---|---|---|---|---|---|---|---|\n';
  filas.forEach(f => {
    s += '| ' + f.seg.nombre + ' | ' + f.asunto + ' | ' + f.fecha + ' | ' + fmtNum(f.enviados) +
         ' | ' + fmtPct(f.or) + ' | ' + fmtPct(f.ctr) + ' | ' + fmtNum(f.conv) +
         ' | ' + (f.monto === null ? '—' : '$ ' + fmtNum(f.monto)) + ' |\n';
  });
  s += '\n## Detalle por mail\n';
  filas.forEach(f => {
    s += '\n### ' + f.seg.nombre + ' — ' + f.email.titulo + (f.editado ? ' (editado)' : '') + '\n\n';
    s += '- **Foco:** ' + f.email.foco + '\n- **Objetivo:** ' + f.email.objetivo + '\n';
    s += '- **Asunto:** ' + f.asunto + '\n- **Preview:** ' + f.preview + '\n\n';
    s += '```\n' + f.copy + '\n```\n\n';
    s += '| Métrica | Valor |\n|---|---|\n';
    s += '| Fecha de envío | ' + f.fecha + ' |\n| Enviados | ' + fmtNum(f.enviados) + ' |\n';
    s += '| Aperturas | ' + fmtNum(f.aperturas) + ' (' + fmtPct(f.or) + ') |\n';
    s += '| Clics | ' + fmtNum(f.clics) + ' (' + fmtPct(f.ctr) + ') |\n| CTOR | ' + fmtPct(f.ctor) + ' |\n';
    s += '| ' + f.seg.conversion + ' | ' + fmtNum(f.conv) + ' (' + fmtPct(f.tconv) + ') |\n';
    s += '| Bajas | ' + fmtNum(f.bajas) + ' |\n| Rebotes | ' + fmtNum(f.rebotes) + ' |\n';
    s += '| $ generados | ' + (f.monto === null ? '—' : '$ ' + fmtNum(f.monto)) + ' |\n';
    if (f.obs) s += '\n**Notas del envío:** ' + f.obs + '\n';
  });
  s += '\n## Checklist\n\n';
  tareas.forEach(t => { s += '- [' + (estado.checks[claveCheck(mes.id, t.id)] ? 'x' : ' ') + '] ' + t.texto + '\n'; });
  s += '\n## Notas del mes\n\n';
  mes.notas.forEach(n => { s += '- ' + n + '\n'; });
  if (estado.notas[mes.id]) s += '\n**Notas del equipo:** ' + estado.notas[mes.id] + '\n';
  return s;
}

function informeCSV(meses) {
  const cab = ['Mes', 'Segmento', 'Mail', 'Asunto', 'Fecha de envío', 'Enviados', 'Aperturas',
    'Apertura %', 'Clics', 'CTR %', 'CTOR %', 'Conversiones', 'Conversión %', 'Bajas', 'Rebotes', '$ generados', 'Notas'];
  const q = v => '"' + String(v === null || v === undefined ? '' : v).replace(/"/g, '""') + '"';
  const dec = v => v === null ? '' : String(v.toFixed(2)).replace('.', ',');
  const filas = [cab.map(q).join(';')];
  meses.forEach(mes => {
    filasInforme(mes).forEach(f => {
      filas.push([
        mes.nombre, f.seg.nombre, f.email.titulo, f.asunto, f.fecha,
        f.enviados === null ? '' : f.enviados, f.aperturas === null ? '' : f.aperturas, dec(f.or),
        f.clics === null ? '' : f.clics, dec(f.ctr), dec(f.ctor),
        f.conv === null ? '' : f.conv, dec(f.tconv),
        f.bajas === null ? '' : f.bajas, f.rebotes === null ? '' : f.rebotes,
        f.monto === null ? '' : f.monto, f.obs
      ].map(q).join(';'));
    });
  });
  return '﻿' + filas.join('\r\n');
}

/* ------------------------------------------------------ RESPALDO JSON --- */

/* Los datos viven en el navegador: si se limpia el caché, se pierde el año.
   El aviso avisa cuándo hace mucho que no se baja una copia. */
/* Abierto con doble clic sobre el .html (file://) algunos navegadores no
   conservan localStorage entre sesiones. No se puede detectar de antemano,
   así que se avisa cómo darse cuenta. */
function avisoProtocolo() {
  if (location.protocol !== 'file:') return;
  const el = document.getElementById('aviso-protocolo');
  if (!el) return;
  el.innerHTML = 'Estás abriendo el archivo directo. Si al volver a abrirlo no ves tus datos, ' +
    'usá <b>Abrir dashboard.command</b> en la misma carpeta.';
  el.hidden = false;
}

function avisoRespaldo() {
  const el = document.getElementById('aviso-respaldo');
  if (!el) return;

  const hayDatos = Object.keys(estado.emails).some(id => {
    const e = estado.emails[id];
    return e && e.m && Object.keys(e.m).some(k => e.m[k]);
  });
  if (!hayDatos) { el.textContent = ''; el.className = 'aviso-respaldo'; return; }

  if (!estado.ultimoRespaldo) {
    el.textContent = '⚠ Todavía no bajaste ninguna copia de tus datos.';
    el.className = 'aviso-respaldo urgente';
    return;
  }
  const dias = Math.floor((Date.now() - estado.ultimoRespaldo) / 86400000);
  el.textContent = dias < 1 ? 'Última copia: hoy.'
    : 'Última copia: hace ' + dias + (dias === 1 ? ' día.' : ' días.');
  el.className = 'aviso-respaldo' + (dias >= 14 ? ' urgente' : '');
}

function exportarJSON() {
  descargar('respaldo-dashboard-redalco.json', JSON.stringify(estado, null, 2), 'application/json');
  estado.ultimoRespaldo = Date.now();
  guardar(true);
  avisoRespaldo();
  toast('Respaldo descargado');
}

function importarJSON(archivo) {
  const lector = new FileReader();
  lector.onload = () => {
    try {
      const s = JSON.parse(lector.result);
      if (!s || typeof s !== 'object') throw new Error('formato');
      if (!confirm('Esto reemplaza todo lo que tengas cargado en este navegador. ¿Seguir?')) return;
      estado = {
        emails: s.emails || {}, checks: s.checks || {}, notas: s.notas || {},
        ultimoMes: s.ultimoMes || null, ultimoRespaldo: s.ultimoRespaldo || null
      };
      guardar(true); render(); toast('Respaldo importado');
    } catch (e) {
      alert('Ese archivo no es un respaldo válido del dashboard.');
    }
  };
  lector.readAsText(archivo);
}

/* ------------------------------------------------------------ CALENDARIO */

const CAL = typeof CALENDARIO !== 'undefined' ? CALENDARIO : [];

const ETIQUETA_TIPO = { efemeride: 'Fecha', campana: 'Campaña de otra ONG', contexto: 'Contexto' };

function fechasDe(mesId) { return CAL.filter(f => f.mes === mesId); }

function itemCalendario(f) {
  return '<li class="fecha' + (f.destacado ? ' destacada' : '') + ' rel-' + f.relevancia + '">' +
    '<div class="fecha-dia">' + esc(f.dia) + '</div>' +
    '<div class="fecha-cuerpo">' +
      '<div class="fecha-titulo">' + esc(f.titulo) +
        '<span class="fecha-tipo tipo-' + f.tipo + '">' + esc(ETIQUETA_TIPO[f.tipo]) + '</span>' +
        (f.certeza === 'estimada' ? '<span class="fecha-tipo tipo-estimada">Fecha a confirmar</span>' : '') +
      '</div>' +
      '<p class="fecha-que">' + esc(f.queHacer) + '</p>' +
      '<p class="fecha-fuente">' + esc(f.fuente) + '</p>' +
    '</div>' +
  '</li>';
}

/* Bloque de contexto dentro del mes: qué más pasa afuera mientras mandás. */
function seccionCalendarioMes(mes) {
  const fechas = fechasDe(mes.id);
  if (!fechas.length) return '';
  const compiten = fechas.filter(f => f.relevancia === 'ruido').length;
  return '<section class="seccion">' +
    '<div class="seccion-header">' +
      '<h3>Qué más pasa este mes</h3>' +
      '<span class="progreso-txt">' + fechas.length + (fechas.length === 1 ? ' fecha' : ' fechas') +
        (compiten ? ' · ' + compiten + ' compite' + (compiten > 1 ? 'n' : '') + ' por la atención' : '') + '</span>' +
    '</div>' +
    '<ul class="lista-fechas">' + fechas.map(itemCalendario).join('') + '</ul>' +
  '</section>';
}

/* ---- grilla de calendario de verdad ------------------------------------- */

const MES_NUM = { ene: 0, feb: 1, mar: 2, abr: 3, may: 4, jun: 5, jul: 6, ago: 7, sep: 8, oct: 9, nov: 10, dic: 11 };
const DIAS_SEMANA = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

function anioMesDe(mesId) {
  return { anio: 2000 + Number(mesId.slice(3)), mes: MES_NUM[mesId.slice(0, 3)] };
}

const diaDe = iso => Number(iso.slice(8, 10));

/* Los envíos ya cargados también son eventos: el calendario sirve para ver
   dónde caen tus mails, no solo lo de afuera. */
function enviosDe(mesId) {
  const mes = MESES.find(m => m.id === mesId);
  if (!mes) return [];
  return mes.emails.map(e => {
    const m = estado.emails[e.id] && estado.emails[e.id].m;
    if (!m || !m.fecha) return null;
    const ym = anioMesDe(mesId);
    const d = new Date(m.fecha + 'T12:00:00');
    if (d.getFullYear() !== ym.anio || d.getMonth() !== ym.mes) return null;
    return {
      org: 'redalco', alcance: 'dia', fecha: m.fecha, propio: true,
      titulo: SEGMENTOS[e.seg].nombre + ': ' + valor(e, 'asunto'),
      queHacer: 'Envío propio ya registrado.'
    };
  }).filter(Boolean);
}

let filtroOrg = null;

const pasaFiltro = ev => !filtroOrg || ev.org === filtroOrg;

function chipEvento(ev, dentroDeRango) {
  const org = ORGANIZACIONES[ev.org] || ORGANIZACIONES.sector;
  const apagado = filtroOrg && ev.org !== filtroOrg ? ' apagado' : '';
  return '<span class="cal-chip' + apagado + (ev.propio ? ' propio' : '') + (dentroDeRango ? ' cont' : '') + '"' +
    ' style="--org:' + org.color + '"' +
    ' title="' + esc(org.nombre + ' — ' + ev.titulo + '\n\n' + ev.queHacer) + '">' +
    esc(ev.titulo) + '</span>';
}

function grillaDeMes(mesId) {
  const { anio, mes } = anioMesDe(mesId);
  const eventos = fechasDe(mesId).concat(enviosDe(mesId));

  const delMes = eventos.filter(e => e.alcance === 'mes');
  const puntuales = eventos.filter(e => e.alcance !== 'mes');

  const diasEnMes = new Date(anio, mes + 1, 0).getDate();
  const primerDia = (new Date(anio, mes, 1).getDay() + 6) % 7;   // lunes primero

  let celdas = '';
  for (let i = 0; i < primerDia; i++) celdas += '<div class="cal-dia fuera"></div>';

  for (let d = 1; d <= diasEnMes; d++) {
    const hoy = puntuales.filter(e => {
      const ini = diaDe(e.fecha);
      const fin = e.hasta ? diaDe(e.hasta) : ini;
      return d >= ini && d <= fin;
    });
    const visibles = hoy.filter(pasaFiltro);
    const finde = (primerDia + d - 1) % 7 >= 5;

    celdas += '<div class="cal-dia' + (finde ? ' finde' : '') + (visibles.length ? ' con-evento' : '') + '">' +
      '<span class="cal-num">' + d + '</span>' +
      hoy.map(e => chipEvento(e, e.hasta && diaDe(e.fecha) !== d)).join('') +
    '</div>';
  }

  const franja = delMes.length
    ? '<div class="cal-franja">' + delMes.map(e => chipEvento(e, false)).join('') + '</div>'
    : '';

  const detalle = fechasDe(mesId).filter(pasaFiltro);

  return '<article class="cal-mes" data-mes="' + mesId + '">' +
    '<header class="cal-mes-header">' +
      '<h3>' + esc(MESES.find(m => m.id === mesId).nombre) + '</h3>' +
      '<button class="btn btn-chico" data-ir="' + mesId + '">Ver los mails del mes</button>' +
    '</header>' +
    franja +
    '<div class="cal-grilla">' +
      DIAS_SEMANA.map(d => '<div class="cal-cab">' + d + '</div>').join('') +
      celdas +
    '</div>' +
    (detalle.length
      ? '<ul class="lista-fechas compacta">' + detalle.map(itemCalendario).join('') + '</ul>'
      : '<p class="cal-vacio">Sin fechas de esta organización en este mes.</p>') +
  '</article>';
}

/* Vista anual: doce grillas, con filtro por organización. */
function renderCalendarioAnual() {
  const usadas = {};
  CAL.forEach(f => { usadas[f.org] = (usadas[f.org] || 0) + 1; });

  const chips = '<button class="filtro' + (filtroOrg === null ? ' activo' : '') + '" data-org="">' +
      'Todas <b>' + CAL.length + '</b></button>' +
    Object.keys(ORGANIZACIONES).filter(k => usadas[k] || k === 'redalco').map(k =>
      '<button class="filtro' + (filtroOrg === k ? ' activo' : '') + '" data-org="' + k + '"' +
        ' style="--org:' + ORGANIZACIONES[k].color + '">' +
        '<i></i>' + esc(ORGANIZACIONES[k].nombre) +
        (usadas[k] ? ' <b>' + usadas[k] + '</b>' : '') +
      '</button>').join('');

  document.getElementById('contenido-calendario').innerHTML =
    '<div class="foco-mes">' +
      '<div class="foco-texto">' +
        '<h2>Calendario del año</h2>' +
        '<p>Las fechas del sector y tus propios envíos, día por día. Sirve para dos cosas: ' +
        'no pedir plata la semana que todo el país mira otra cosa, y no dejar pasar las fechas ' +
        'en las que el tema de Redalco es el tema del día.</p>' +
      '</div>' +
      '<div class="resumen-mes">' +
        '<div class="resumen-item"><div class="resumen-num">' + CAL.filter(f => f.relevancia === 'alta').length + '</div><div class="resumen-lbl">Para usar</div></div>' +
        '<div class="resumen-item"><div class="resumen-num">' + CAL.filter(f => f.relevancia === 'ruido').length + '</div><div class="resumen-lbl">Compiten</div></div>' +
        '<div class="resumen-item"><div class="resumen-num">' + CAL.filter(f => f.certeza === 'estimada').length + '</div><div class="resumen-lbl">A confirmar</div></div>' +
      '</div>' +
    '</div>' +

    '<div class="filtros" role="group" aria-label="Filtrar por organización">' + chips + '</div>' +
    '<div class="calendario">' + MESES.map(m => grillaDeMes(m.id)).join('') + '</div>';

  document.querySelectorAll('#contenido-calendario [data-ir]').forEach(b => {
    b.addEventListener('click', () => { verVista('mes'); irA(b.dataset.ir); });
  });
  document.querySelectorAll('#contenido-calendario .filtro').forEach(b => {
    b.addEventListener('click', () => {
      filtroOrg = b.dataset.org || null;
      renderCalendarioAnual();
      anim(document.querySelectorAll('#contenido-calendario .cal-mes'),
        { opacity: [0.35, 1] }, { duration: 0.3, delay: escalonar(0.02), ease: SALIDA });
    });
  });
}

/* -------------------------------------------------------------- PLAYBOOK */

const PB = typeof PLAYBOOK !== 'undefined' ? PLAYBOOK : [];
const PBG = typeof PLAYBOOK_GENERAL !== 'undefined' ? PLAYBOOK_GENERAL : null;

/* Cuántos mails tiene cada segmento en el calendario real, para contrastarlo
   con la cadencia que pide la estrategia. */
function conteoDe(seg) {
  const meses = [];
  let n = 0;
  MESES.forEach(m => m.emails.forEach(e => {
    if (e.seg === seg) { n++; if (meses.indexOf(m.corto) < 0) meses.push(m.corto); }
  }));
  return { n: n, meses: meses };
}

function fichaSegmento(p) {
  const seg = SEGMENTOS[p.seg];
  const c = conteoDe(p.seg);
  const brecha = p.cadenciaEstrategia - c.n;

  return '<article class="ficha seg-' + seg.color + '">' +
    '<header class="tarjeta-header">' +
      '<span>' + seg.icono + '</span>' +
      '<div style="flex:1;min-width:150px">' +
        '<div class="seg-nombre">' + esc(seg.nombre) + '</div>' +
        '<div class="seg-titulo">' + esc(p.quienes) + '</div>' +
      '</div>' +
    '</header>' +

    '<div class="ficha-body">' +

      '<div class="ficha-objetivo">' +
        '<h4 class="col-titulo">El objetivo</h4>' +
        '<p class="objetivo-txt">' + esc(p.objetivo) + '</p>' +
      '</div>' +

      '<div>' +
        '<h4 class="col-titulo">La estrategia</h4>' +
        '<p class="ficha-p">' + esc(p.estrategia) + '</p>' +
      '</div>' +

      /* solo tres cifras: sumar los automáticos al calendario da un número
         falso, porque en algunos segmentos son los mismos envíos */
      '<div class="ficha-numeros">' +
        '<div class="num"><b>' + c.n + '</b><span>Hay en el calendario</span></div>' +
        '<div class="num"><b>' + p.cadenciaEstrategia + '</b><span>Pide la estrategia</span></div>' +
        '<div class="num' + (brecha > 0 ? ' alerta' : '') + '"><b>' + (brecha > 0 ? '−' + brecha : '✓') + '</b><span>' + (brecha > 0 ? 'Falta cubrir' : 'Cubierto') + '</span></div>' +
      '</div>' +
      '<p class="ficha-nota">' + esc(p.faltante) + '</p>' +

      '<div class="ficha-metricas">' +
        '<div class="metrica clave">' +
          '<span class="metrica-tag">Métrica clave</span>' +
          '<b>' + esc(p.metricaClave.nombre) + '</b>' +
          '<span class="metrica-meta">' + esc(p.metricaClave.meta) + '</span>' +
          '<p>' + esc(p.metricaClave.porQue) + '</p>' +
        '</div>' +
        '<div class="metrica">' +
          '<span class="metrica-tag">Y además</span>' +
          '<b>' + esc(p.metricaSecundaria.nombre) + '</b>' +
          '<span class="metrica-meta">' + esc(p.metricaSecundaria.meta) + '</span>' +
          '<p>' + esc(p.metricaSecundaria.porQue) + '</p>' +
        '</div>' +
      '</div>' +

      '<div class="ficha-cols">' +
        '<div>' +
          '<h4 class="col-titulo">Reglas</h4>' +
          '<ul class="lista-puntos">' + p.reglas.map(r => '<li>' + esc(r) + '</li>').join('') + '</ul>' +
        '</div>' +
        '<div>' +
          '<h4 class="col-titulo">La automatización</h4>' +
          '<dl class="meta-fila">' +
            '<dt>Serie</dt><dd>' + esc(p.automatizacion.nombre) + '</dd>' +
            '<dt>Etiqueta</dt><dd><code>' + esc(p.automatizacion.tag) + '</code></dd>' +
            '<dt>Emails</dt><dd>' + esc(p.automatizacion.emails) + '</dd>' +
            '<dt>Arranca</dt><dd>' + esc(p.automatizacion.disparador) + '</dd>' +
          '</dl>' +
        '</div>' +
      '</div>' +

      '<p class="ficha-nohacer"><b>Lo que no hay que hacer:</b> ' + esc(p.noHacer) + '</p>' +

      '<p class="ficha-meses"><b>Meses con envío en el plan:</b> ' + esc(c.meses.join(' · ')) + '</p>' +

    '</div>' +
  '</article>';
}

function renderPlaybook() {
  if (!PBG) return;
  const totalPlan = PB.reduce((a, p) => a + conteoDe(p.seg).n, 0);
  const totalPide = PB.reduce((a, p) => a + p.cadenciaEstrategia, 0);

  document.getElementById('contenido-playbook').innerHTML =
    '<div class="foco-mes">' +
      '<div class="foco-texto">' +
        '<h2>Playbook por segmento</h2>' +
        '<p>' + esc(PBG.objetivo) + '</p>' +
      '</div>' +
      '<div class="resumen-mes">' +
        '<div class="resumen-item"><div class="resumen-num">' + totalPlan + '</div><div class="resumen-lbl">En el plan</div></div>' +
        '<div class="resumen-item"><div class="resumen-num">' + totalPide + '</div><div class="resumen-lbl">Pide la estrategia</div></div>' +
        '<div class="resumen-item"><div class="resumen-num">4</div><div class="resumen-lbl">Segmentos</div></div>' +
      '</div>' +
    '</div>' +

    '<section class="seccion">' +
      '<div class="seccion-header"><h3>La regla que ordena todo</h3></div>' +
      '<div class="notas-mes">' +
        '<div class="nota-item">' + esc(PBG.reglaDeOro) + '</div>' +
        '<div class="pilares">' + PBG.pilares.map(p =>
          '<div class="pilar"><b>' + esc(p.nombre) + '</b><span>' + esc(p.para) + '</span><i>' + esc(p.ejemplo) + '</i></div>').join('') + '</div>' +
      '</div>' +
    '</section>' +

    '<div class="fichas">' + PB.map(fichaSegmento).join('') + '</div>' +

    '<section class="seccion">' +
      '<div class="seccion-header"><h3>Contra qué se compara</h3></div>' +
      '<div class="notas-mes">' +
        '<div class="tabla-bench">' + PBG.benchmarks.map(b =>
          '<div class="bench-fila"><b>' + esc(b.v) + '</b><span>' + esc(b.m) + '</span><i>' + esc(b.f) + '</i></div>').join('') + '</div>' +
        '<div class="nota-item" style="margin-top:12px">' + esc(PBG.lecturaBenchmarks) + '</div>' +
      '</div>' +
    '</section>' +

    '<section class="seccion">' +
      '<div class="seccion-header"><h3>Los primeros 90 días</h3></div>' +
      '<ol class="ruta">' + PBG.noventaDias.map(p =>
        '<li' + (p.urgente ? ' class="urgente"' : '') + '><b>' + esc(p.cuando) + '</b><span>' + esc(p.que) + '</span></li>').join('') + '</ol>' +
    '</section>' +

    '<section class="seccion">' +
      '<div class="seccion-header"><h3>La restricción técnica que define todo</h3></div>' +
      '<div class="notas-mes"><div class="nota-item alerta">' + esc(PBG.restriccion) + '</div></div>' +
    '</section>';
}

/* -------------------------------------------------------------- HISTÓRICO */

/* Meses reales (enero–julio 2026, antes de que arranque el plan): en vez de
   tarjetas para editar, muestran las campañas reales de Mailchimp +
   EmailOctopus de ese mes específico, traídas en vivo de /api/metricas.
   Esa ruta solo existe si el sitio corre en Vercel (ver api/README.md) —
   en GitHub Pages o abriendo el .html local, el fetch falla y se avisa por
   qué en vez de romper la vista. */

let historico = null;
let historicoCargando = false;

async function cargarHistorico(forzar) {
  if (historico && !forzar) { render(); return; }
  historicoCargando = true;
  render();
  try {
    const resp = await fetch('/api/metricas', { cache: 'no-store' });
    if (!resp.ok) throw new Error('HTTP ' + resp.status);
    historico = await resp.json();
  } catch (e) {
    historico = { error: true, mensaje: e.message };
  }
  historicoCargando = false;
  render();
}

function filaCampana(c) {
  const rebotes = c.rebotes != null ? c.rebotes : (c.rebotesDuros != null || c.rebotesBlandos != null
    ? (c.rebotesDuros || 0) + (c.rebotesBlandos || 0) : null);
  const tasaAp = c.tasaApertura != null ? ' · ' + fmtPct(c.tasaApertura * 100) : '';
  const tasaCl = c.tasaClics != null ? ' · ' + fmtPct(c.tasaClics * 100) : '';
  return '<div class="fila-campana">' +
    '<div class="fc-asunto">' + esc(c.asunto) +
      '<span class="fc-fecha">' + esc(fmtFecha(c.fechaEnvio ? c.fechaEnvio.slice(0, 10) : null) || 'Sin fecha') + '</span>' +
    '</div>' +
    '<div class="fc-metricas">' +
      '<div class="fc-m"><b>' + fmtNum(c.aperturasUnicas) + '</b><span>Aperturas' + tasaAp + '</span></div>' +
      '<div class="fc-m"><b>' + fmtNum(c.clicsUnicos) + '</b><span>Clics' + tasaCl + '</span></div>' +
      '<div class="fc-m"><b>' + fmtNum(rebotes) + '</b><span>Rebotes</span></div>' +
      '<div class="fc-m"><b>' + fmtNum(c.bajas) + '</b><span>Bajas</span></div>' +
    '</div>' +
  '</div>';
}

function renderMesPasado(mes) {
  const cont = document.getElementById('contenido');

  if (historicoCargando) {
    cont.innerHTML = '<div class="foco-mes"><div class="foco-texto"><h2>' + esc(mes.nombre) + '</h2>' +
      '<p>Cargando campañas reales de Mailchimp y EmailOctopus…</p></div></div>';
    return;
  }

  if (!historico || historico.error) {
    const detalle = historico && historico.mensaje ? ' (' + esc(historico.mensaje) + ')' : '';
    cont.innerHTML = '<div class="foco-mes"><div class="foco-texto"><h2>' + esc(mes.nombre) + '</h2>' +
      '<p>No se pudo conectar con <code>/api/metricas</code>' + detalle + '. Esto solo funciona abriendo el ' +
      'dashboard publicado en Vercel — no en GitHub Pages ni con el archivo local.</p>' +
      '<button class="btn btn-chico" id="btn-reintentar-pasado" style="margin-top:10px">Reintentar</button>' +
      '</div></div>';
    const btn = document.getElementById('btn-reintentar-pasado');
    if (btn) btn.addEventListener('click', () => cargarHistorico(true));
    return;
  }

  const { anio, mes: mesIdx } = anioMesDe(mes.id);
  const clave = anio + '-' + String(mesIdx + 1).padStart(2, '0');
  const filtra = c => c.fechaEnvio && c.fechaEnvio.slice(0, 7) === clave;
  const mc = (historico.mailchimp || []).filter(filtra);
  const eo = (historico.emailoctopus || []).filter(filtra);
  const errores = (historico.errores || []).length
    ? '<div class="nota-item alerta">' + historico.errores.map(esc).join('<br>') + '</div>' : '';

  cont.innerHTML =
    '<div class="foco-mes">' +
      '<div class="foco-texto">' +
        '<h2>' + esc(mes.nombre) + '</h2>' +
        '<p>Mes anterior al plan: acá se ven las campañas que ya se mandaron de verdad, traídas en vivo ' +
        'de Mailchimp y EmailOctopus. No hay mails para editar porque el plan todavía no había arrancado.</p>' +
      '</div>' +
      '<div class="resumen-mes">' +
        '<div class="resumen-item"><div class="resumen-num">' + mc.length + '</div><div class="resumen-lbl">Mailchimp</div></div>' +
        '<div class="resumen-item"><div class="resumen-num">' + eo.length + '</div><div class="resumen-lbl">EmailOctopus</div></div>' +
      '</div>' +
    '</div>' +
    errores +
    '<section class="seccion">' +
      '<div class="seccion-header"><h3>Mailchimp</h3></div>' +
      (mc.length
        ? '<div class="lista-campanas">' + mc.map(filaCampana).join('') + '</div>'
        : '<p class="cal-vacio">Sin campañas de Mailchimp en ' + esc(mes.nombre.toLowerCase()) + '.</p>') +
    '</section>' +
    '<section class="seccion">' +
      '<div class="seccion-header"><h3>EmailOctopus</h3></div>' +
      (eo.length
        ? '<div class="lista-campanas">' + eo.map(filaCampana).join('') + '</div>'
        : '<p class="cal-vacio">Todavía no hay campañas de EmailOctopus.</p>') +
    '</section>';

  anim(document.querySelectorAll('#contenido .foco-mes, #contenido .seccion'),
    { opacity: [0, 1], transform: ['translateY(14px)', 'translateY(0)'] },
    { duration: 0.45, delay: escalonar(0.05), ease: SALIDA });
}

/* ------------------------------------------------------------- VISTAS --- */

function verVista(cual) {
  const vistas = {
    mes: document.getElementById('contenido'),
    calendario: document.getElementById('contenido-calendario'),
    playbook: document.getElementById('contenido-playbook')
  };
  if (!vistas[cual]) cual = 'mes';

  if (cual === 'calendario') renderCalendarioAnual();
  if (cual === 'playbook') renderPlaybook();

  Object.keys(vistas).forEach(k => { vistas[k].hidden = k !== cual; });
  /* la tira de meses y el selector son navegación del panel de mails:
     fuera de esa vista no controlan nada */
  document.querySelector('.toolbar').hidden = cual !== 'mes';
  document.querySelector('.tira-anio').hidden = cual !== 'mes';
  document.querySelectorAll('.vista-btn').forEach(b => {
    b.classList.toggle('activo', b.dataset.vista === cual);
  });

  if (cual === 'calendario') {
    anim(document.querySelectorAll('#contenido-calendario .foco-mes, #contenido-calendario .cal-mes'),
      { opacity: [0, 1], transform: ['translateY(14px)', 'translateY(0)'] },
      { duration: 0.45, delay: escalonar(0.03), ease: SALIDA });
  } else if (cual === 'playbook') {
    anim(document.querySelectorAll('#contenido-playbook .foco-mes, #contenido-playbook .ficha, #contenido-playbook .seccion'),
      { opacity: [0, 1], transform: ['translateY(14px)', 'translateY(0)'] },
      { duration: 0.45, delay: escalonar(0.05), ease: SALIDA });
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* -------------------------------------------------------------- PORTADA - */

function animarPortada() {
  const total = MESES.reduce((a, m) => a + m.emails.length, 0);
  const cifra = document.getElementById('cifra-mails');
  if (cifra) cifra.textContent = '0';

  anim(document.querySelectorAll('#portada [data-entra]'),
    { opacity: [0, 1], transform: ['translateY(22px)', 'translateY(0)'] },
    { duration: 0.75, delay: escalonar(0.09), ease: SALIDA });

  setTimeout(() => contarHasta(cifra, total, 1100), 300);
}

/* La promesa .finished de Motion no resuelve de forma confiable en esta
   versión, así que el encadenado va por tiempo: anda igual sin la librería. */
const MS_SALIDA = 350;

function entrarAlPanel() {
  const portada = document.getElementById('portada');
  const panel = document.getElementById('panel');

  const mostrar = () => {
    portada.hidden = true;
    portada.style.opacity = '';
    portada.style.transform = '';
    panel.hidden = false;
    window.scrollTo(0, 0);
    anim(panel, { opacity: [0, 1] }, { duration: 0.4, ease: SALIDA });
    animarMes();
    const foco = document.getElementById('mes-select');
    if (foco) foco.focus({ preventScroll: true });
  };

  const animo = anim(portada,
    { opacity: [1, 0], transform: ['scale(1)', 'scale(1.03)'] },
    { duration: MS_SALIDA / 1000, ease: 'easeIn' });

  setTimeout(mostrar, animo ? MS_SALIDA : 0);
}

function volverAPortada() {
  const portada = document.getElementById('portada');
  const panel = document.getElementById('panel');
  panel.hidden = true;
  portada.hidden = false;
  portada.style.opacity = '';
  portada.style.transform = '';
  window.scrollTo(0, 0);
  animarPortada();
}

/* -------------------------------------------------------------- ARRANQUE */

function iniciar() {
  renderSelector();
  render();
  avisoProtocolo();
  animarPortada();

  document.getElementById('btn-entrar').addEventListener('click', entrarAlPanel);
  document.getElementById('btn-portada').addEventListener('click', volverAPortada);
  document.querySelectorAll('.vista-btn').forEach(b => {
    b.addEventListener('click', () => verVista(b.dataset.vista));
  });

  const mesDe = () => MESES_NAV.find(m => m.id === mesActual);
  const idx = () => MESES_NAV.findIndex(m => m.id === mesActual);

  document.getElementById('btn-prev').addEventListener('click', () => { if (idx() > 0) irA(MESES_NAV[idx() - 1].id); });
  document.getElementById('btn-next').addEventListener('click', () => { if (idx() < MESES_NAV.length - 1) irA(MESES_NAV[idx() + 1].id); });

  document.getElementById('btn-informe').addEventListener('click', () => {
    const mes = mesDe();
    descargar('informe-redalco-' + mes.id + '.html', informeHTML(mes), 'text/html');
    toast('Informe descargado — abrilo y guardá como PDF si lo necesitás');
  });
  document.getElementById('btn-md').addEventListener('click', () => {
    const mes = mesDe();
    descargar('informe-redalco-' + mes.id + '.md', informeMD(mes), 'text/markdown');
    toast('Informe .md descargado');
  });
  document.getElementById('btn-csv').addEventListener('click', () => {
    const mes = mesDe();
    descargar('metricas-redalco-' + mes.id + '.csv', informeCSV([mes]), 'text/csv');
    toast('Métricas .csv descargadas');
  });
  document.getElementById('btn-csv-anual').addEventListener('click', () => {
    descargar('metricas-redalco-anual.csv', informeCSV(MESES), 'text/csv');
    toast('Métricas del año descargadas');
  });
  document.getElementById('btn-exportar').addEventListener('click', exportarJSON);
  document.getElementById('btn-importar').addEventListener('click', () => document.getElementById('file-importar').click());
  document.getElementById('file-importar').addEventListener('change', function () {
    if (this.files[0]) importarJSON(this.files[0]);
    this.value = '';
  });

  document.addEventListener('keydown', e => {
    if (e.target.matches('input, textarea, select')) return;
    if (document.getElementById('panel').hidden) return;  // en la portada no aplica
    if (e.key === 'ArrowLeft' && idx() > 0) irA(MESES_NAV[idx() - 1].id);
    if (e.key === 'ArrowRight' && idx() < MESES_NAV.length - 1) irA(MESES_NAV[idx() + 1].id);
  });
}

document.addEventListener('DOMContentLoaded', iniciar);
