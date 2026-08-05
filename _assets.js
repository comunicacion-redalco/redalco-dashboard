/* Genera assets.css: la tipografía display y el logo, embebidos como data URI
   para que la página funcione sin conexión y sin cargar nada externo.
   Se regenera con:  node _assets.js */
const fs = require('fs');
const path = require('path');

const SCRATCH = '/private/tmp/claude-501/-Users-nick/cb5ff13c-0b1c-41a4-9704-684a145a5109/scratchpad';
const fuente = fs.readFileSync(path.join(SCRATCH, 'bitter-600.woff2')).toString('base64');
const logo = fs.readFileSync('/Users/nick/redalco-videos/public/redalco-logo-horizontal-blanco.png').toString('base64');
// el ícono blanco pesa 3 KB contra 46 KB del de color, y siempre va sobre verde
const icono = fs.readFileSync('/Users/nick/redalco-videos/public/redalco-logo-icono-blanco.png').toString('base64');

const css = `/* GENERADO POR _assets.js — no editar a mano.
   Bitter 600 (SIL Open Font License) como respaldo de Superclarendon, que es
   la display real de redalco.org y viene con macOS.
   Logo REDALCO extraído del manual de marca oficial. */

@font-face {
  font-family: "Bitter";
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url(data:font/woff2;base64,${fuente}) format("woff2");
}

:root {
  --logo-blanco: url("data:image/png;base64,${logo}");
  --logo-icono: url("data:image/png;base64,${icono}");
}
`;

fs.writeFileSync(path.join(__dirname, 'assets.css'), css);
console.log('assets.css:', (css.length / 1024).toFixed(0) + ' KB');
