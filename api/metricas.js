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

async function traerMailchimp(apiKey) {
  const prefijo = apiKey.split('-').pop();
  const base = `https://${prefijo}.api.mailchimp.com/3.0`;
  const auth = 'Basic ' + Buffer.from('anystring:' + apiKey).toString('base64');

  const campanas = [];
  let offset = 0;
  const CANTIDAD = 1000;
  while (true) {
    const resp = await fetch(
      `${base}/campaigns?count=${CANTIDAD}&offset=${offset}&status=sent&sort_field=send_time&sort_dir=DESC`,
      { headers: { Authorization: auth } }
    );
    if (!resp.ok) throw new Error(`Mailchimp /campaigns: ${resp.status}`);
    const datos = await resp.json();
    campanas.push(...datos.campaigns);
    if (datos.campaigns.length < CANTIDAD) break;
    offset += CANTIDAD;
  }

  const resultado = [];
  for (const c of campanas) {
    const rResp = await fetch(`${base}/reports/${c.id}`, { headers: { Authorization: auth } });
    if (!rResp.ok) continue;
    const r = await rResp.json();
    resultado.push({
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
    });
  }
  return resultado;
}

async function traerEmailOctopus(apiKey) {
  const base = 'https://api.emailoctopus.com';
  const auth = `Bearer ${apiKey}`;

  const campanas = [];
  let siguiente = null;
  while (true) {
    const url = new URL(`${base}/campaigns`);
    url.searchParams.set('limit', '100');
    if (siguiente) url.searchParams.set('starting_after', siguiente);
    const resp = await fetch(url, { headers: { Authorization: auth } });
    if (!resp.ok) throw new Error(`EmailOctopus /campaigns: ${resp.status}`);
    const datos = await resp.json();
    const pagina = datos.data ?? datos;
    campanas.push(...pagina);
    if (!datos.paging?.next) break;
    siguiente = pagina[pagina.length - 1]?.id;
    if (!siguiente) break;
  }

  const resultado = [];
  for (const c of campanas) {
    const rResp = await fetch(`${base}/campaigns/${c.id}/reports/summary`, { headers: { Authorization: auth } });
    if (!rResp.ok) continue;
    const r = await rResp.json();
    resultado.push({
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
    });
  }
  return resultado;
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
