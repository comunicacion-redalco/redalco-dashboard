// Trae campañas + métricas de Mailchimp y EmailOctopus y las escribe en metricas.js
// Corre local: `npm run sync`. Las API keys viven en .env (nunca se commitea).
// Ver sync/README.md para cómo conseguir las keys y qué hace exactamente.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const RAIZ = dirname(dirname(fileURLToPath(import.meta.url)));

function cargarEnv() {
  const ruta = join(RAIZ, '.env');
  if (!existsSync(ruta)) return;
  for (const linea of readFileSync(ruta, 'utf8').split('\n')) {
    const l = linea.trim();
    if (!l || l.startsWith('#')) continue;
    const igual = l.indexOf('=');
    if (igual === -1) continue;
    const clave = l.slice(0, igual).trim();
    const valor = l.slice(igual + 1).trim().replace(/^["']|["']$/g, '');
    if (!(clave in process.env)) process.env[clave] = valor;
  }
}

// El dashboard solo muestra desde enero 2026 en adelante (ver MESES_PASADOS
// en datos.js): pedir el historial completo campaña por campaña es lento
// (cientos de reportes en serie) y no aporta nada que se vea.
const DESDE = '2026-01-01T00:00:00+00:00';

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
    if (!resp.ok) throw new Error(`Mailchimp /campaigns: ${resp.status} ${await resp.text()}`);
    const datos = await resp.json();
    campanas.push(...datos.campaigns);
    if (datos.campaigns.length < CANTIDAD) break;
    offset += CANTIDAD;
  }

  const reportes = await Promise.all(campanas.map(async c => {
    const rResp = await fetch(`${base}/reports/${c.id}`, { headers: { Authorization: auth } });
    if (!rResp.ok) { console.warn(`  ! sin reporte para ${c.id}: ${rResp.status}`); return null; }
    const r = await rResp.json();
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
      // Solo viene si hay integración de e-commerce conectada a Mailchimp; casi seguro null.
      ingresos: r.ecommerce?.total_revenue ?? null,
    };
  }));
  return reportes.filter(Boolean);
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

  const recientes = campanas.filter(c => {
    const fecha = c.sent_at || c.status?.sent_at;
    return fecha && fecha >= DESDE;
  });

  const reportes = await Promise.all(recientes.map(async c => {
    const rResp = await fetch(`${base}/campaigns/${c.id}/reports/summary`, { headers: { Authorization: auth } });
    if (!rResp.ok) { console.warn(`  ! sin reporte para ${c.id}: ${rResp.status}`); return null; }
    const r = await rResp.json();
    return {
      id: c.id,
      asunto: c.name || '(sin nombre)',
      fechaEnvio: c.sent_at || c.status?.sent_at || null,
      aperturasUnicas: r.opens?.uniqueOpensCount ?? r.opened?.total ?? null,
      clicsUnicos: r.clicks?.uniqueClicksCount ?? r.clicked?.total ?? null,
      rebotes: r.bounced?.total ?? null,
      bajas: r.unsubscribed?.total ?? null,
      // La API de EmailOctopus no devuelve conversión a socio ni plata recaudada:
      // eso se cruza aparte con los links especiales de cada campaña.
      conversion: null,
    };
  }));
  return reportes.filter(Boolean);
}

async function main() {
  cargarEnv();
  const mcKey = process.env.MAILCHIMP_API_KEY;
  const eoKey = process.env.EMAILOCTOPUS_API_KEY;

  if (!mcKey && !eoKey) {
    console.error('Falta .env con MAILCHIMP_API_KEY y/o EMAILOCTOPUS_API_KEY. Ver sync/README.md.');
    process.exit(1);
  }

  const resultado = { generadoEn: new Date().toISOString(), mailchimp: [], emailoctopus: [] };

  if (mcKey) {
    console.log('Mailchimp: trayendo campañas...');
    resultado.mailchimp = await traerMailchimp(mcKey);
    console.log(`Mailchimp: ${resultado.mailchimp.length} campañas.`);
  } else {
    console.log('Mailchimp: MAILCHIMP_API_KEY no está en .env, se salteó.');
  }

  if (eoKey) {
    console.log('EmailOctopus: trayendo campañas...');
    resultado.emailoctopus = await traerEmailOctopus(eoKey);
    console.log(`EmailOctopus: ${resultado.emailoctopus.length} campañas.`);
  } else {
    console.log('EmailOctopus: EMAILOCTOPUS_API_KEY no está en .env, se salteó.');
  }

  const destino = join(RAIZ, 'metricas.js');
  writeFileSync(
    destino,
    `// Generado por sync/sync.mjs — no editar a mano, se pisa en cada sync.\nconst METRICAS = ${JSON.stringify(resultado, null, 2)};\n`
  );
  console.log(`Escrito en ${destino}`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
