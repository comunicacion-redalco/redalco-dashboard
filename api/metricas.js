// Endpoint público del dashboard: GET /api/metricas
// Trae en vivo las campañas + reportes de Mailchimp y EmailOctopus y las
// devuelve como JSON. Las API keys viven como variables de entorno en
// Vercel (Project Settings → Environment Variables) — nunca en el repo.
//
// El Cache-Control de abajo hace que Vercel sirva la respuesta cacheada en
// su CDN hasta 5 horas: no hace falta cron ni base de datos para que esto
// "se actualice solo" — el primer pedido después de esas 5 horas dispara un
// fetch nuevo a Mailchimp/EmailOctopus, y ese resultado queda cacheado para
// el resto de las visitas.

// El dashboard solo muestra desde enero 2026 en adelante (ver MESES_PASADOS
// en datos.js): pedir el historial completo de Mailchimp campaña por campaña
// es lento (cientos de reportes en serie) y no aporta nada que se vea. Con
// el filtro de fecha en la propia consulta a Mailchimp alcanza para no
// tardar más de un par de segundos.
const DESDE = '2026-01-01T00:00:00+00:00';

// Mailchimp no manda el segmento como un campo aparte: hay que leerlo del
// texto de "a quién se le mandó" (recipients.segment_text), que trae el tag
// usado. Confirmado con el usuario el 2026-08-05 cuáles tags son cuáles.
const MAPEO_TAGS_MAILCHIMP = {
  'MISIÓN PLATOS 2026': 'mp',
  'Misión Platos acumulado': 'mp',
  'Donantes Mensuales': 'socios',
  'Donantes Pausados': 'ex',
  'Trivia': 'leads',
};

function segmentoDeMailchimp(recipients) {
  const texto = recipients?.segment_text || '';
  const m = texto.match(/tagged\s*<strong>([^<]+)<\/strong>/i);
  const tag = m ? m[1].trim() : null;
  // Sin match de tag = segmento dinámico por comportamiento (ej. "abrió una
  // campaña en los últimos 3 meses"), no uno de los 4 fijos — confirmado con
  // el usuario que esos quedan sin clasificar.
  return { tagCrudo: tag, segmento: tag ? (MAPEO_TAGS_MAILCHIMP[tag] || null) : null };
}

async function traerMailchimp(apiKey) {
  const prefijo = apiKey.split('-').pop();
  const base = `https://${prefijo}.api.mailchimp.com/3.0`;
  const auth = 'Basic ' + Buffer.from('anystring:' + apiKey).toString('base64');

  const campanas = [];
  let offset = 0;
  const CANTIDAD = 1000;
  while (true) {
    const resp = await fetch(
      `${base}/campaigns?count=${CANTIDAD}&offset=${offset}&status=sent&sort_field=send_time&sort_dir=DESC` +
      `&since_send_time=${encodeURIComponent(DESDE)}`,
      { headers: { Authorization: auth } }
    );
    if (!resp.ok) throw new Error(`Mailchimp /campaigns: ${resp.status}`);
    const datos = await resp.json();
    campanas.push(...datos.campaigns);
    if (datos.campaigns.length < CANTIDAD) break;
    offset += CANTIDAD;
  }

  const reportes = await Promise.all(campanas.map(async c => {
    const rResp = await fetch(`${base}/reports/${c.id}`, { headers: { Authorization: auth } });
    if (!rResp.ok) return null;
    const r = await rResp.json();
    const { tagCrudo, segmento } = segmentoDeMailchimp(c.recipients);
    return {
      id: c.id,
      asunto: c.settings?.subject_line || c.settings?.title || '(sin asunto)',
      fechaEnvio: c.send_time || null,
      destinatarios: r.emails_sent ?? null,
      aperturasUnicas: r.opens?.unique_opens ?? null,
      tasaApertura: r.opens?.open_rate ?? null,
      clicsUnicos: r.clicks?.unique_clicks ?? null,
      tasaClics: r.clicks?.click_rate ?? null,
      rebotesDuros: r.bounces?.hard_bounces ?? null,
      rebotesBlandos: r.bounces?.soft_bounces ?? null,
      bajas: r.unsubscribed ?? null,
      ingresos: r.ecommerce?.total_revenue ?? null,
      segmento,
      tagCrudo,
    };
  }));
  return reportes.filter(Boolean);
}

async function traerListasEmailOctopus(base, auth) {
  // El objeto de campaña solo trae el id de la lista (to: [id]), no el
  // nombre — hace falta este llamado aparte para poder mostrarlo.
  const nombres = {};
  let siguiente = null;
  while (true) {
    const url = new URL(`${base}/lists`);
    url.searchParams.set('limit', '100');
    if (siguiente) url.searchParams.set('starting_after', siguiente);
    const resp = await fetch(url, { headers: { Authorization: auth } });
    if (!resp.ok) break;
    const datos = await resp.json();
    const pagina = datos.data ?? datos;
    pagina.forEach(l => { nombres[l.id] = l.name; });
    siguiente = datos.paging?.next?.starting_after;
    if (!siguiente) break;
  }
  return nombres;
}

async function traerEmailOctopus(apiKey) {
  const base = 'https://api.emailoctopus.com';
  const auth = `Bearer ${apiKey}`;

  const campanas = [];
  // El cursor de paginación viene en paging.next.starting_after — no es el
  // id de la última campaña (eso rompía la página 2 con un 400).
  let siguiente = null;
  while (true) {
    const url = new URL(`${base}/campaigns`);
    url.searchParams.set('limit', '100');
    if (siguiente) url.searchParams.set('starting_after', siguiente);
    const resp = await fetch(url, { headers: { Authorization: auth } });
    if (!resp.ok) throw new Error(`EmailOctopus /campaigns: ${resp.status} ${await resp.text()}`);
    const datos = await resp.json();
    const pagina = datos.data ?? datos;
    campanas.push(...pagina);
    siguiente = datos.paging?.next?.starting_after;
    if (!siguiente) break;
  }

  // EmailOctopus no documenta un filtro de fecha en /campaigns (a diferencia
  // de Mailchimp), así que se filtra acá antes de pedir reportes: evita
  // llamadas de más si el historial crece.
  const recientes = campanas.filter(c => {
    const fecha = c.sent_at || c.status?.sent_at;
    return fecha && fecha >= DESDE;
  });

  const nombresLista = recientes.length ? await traerListasEmailOctopus(base, auth) : {};

  const reportes = await Promise.all(recientes.map(async c => {
    const rResp = await fetch(`${base}/campaigns/${c.id}/reports/summary`, { headers: { Authorization: auth } });
    if (!rResp.ok) return null;
    const r = await rResp.json();
    return {
      id: c.id,
      asunto: c.name || '(sin nombre)',
      fechaEnvio: c.sent_at || c.status?.sent_at || null,
      aperturasUnicas: r.opens?.uniqueOpensCount ?? r.opened?.total ?? null,
      clicsUnicos: r.clicks?.uniqueClicksCount ?? r.clicked?.total ?? null,
      rebotes: r.bounced?.total ?? null,
      bajas: r.unsubscribed?.total ?? null,
      // La API no trae conversión a socio ni plata recaudada: pendiente
      // definir el cruce con los links especiales por campaña.
      conversion: null,
      // EmailOctopus no expone tags por campaña como Mailchimp — solo la
      // lista a la que se mandó. Sin mapeo automático a segmento todavía.
      listaNombre: (c.to || []).map(id => nombresLista[id]).filter(Boolean).join(', ') || null,
      segmento: null,
    };
  }));
  return reportes.filter(Boolean);
}

module.exports = async (req, res) => {
  const mcKey = process.env.MAILCHIMP_API_KEY;
  const eoKey = process.env.EMAILOCTOPUS_API_KEY;

  const resultado = { generadoEn: new Date().toISOString(), mailchimp: [], emailoctopus: [], errores: [] };

  await Promise.all([
    (async () => {
      if (!mcKey) return resultado.errores.push('MAILCHIMP_API_KEY no está configurada en Vercel.');
      try {
        resultado.mailchimp = await traerMailchimp(mcKey);
      } catch (e) {
        resultado.errores.push(`Mailchimp: ${e.message}`);
      }
    })(),
    (async () => {
      if (!eoKey) return resultado.errores.push('EMAILOCTOPUS_API_KEY no está configurada en Vercel.');
      try {
        resultado.emailoctopus = await traerEmailOctopus(eoKey);
      } catch (e) {
        resultado.errores.push(`EmailOctopus: ${e.message}`);
      }
    })(),
  ]);

  res.setHeader('Cache-Control', 's-maxage=18000, stale-while-revalidate=3600');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.status(200).json(resultado);
};
