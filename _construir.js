/* Arma _publicar.html: el dashboard entero en un solo archivo, para publicarlo
   como página web. Se regenera con:  node _construir.js
   No editar _publicar.html a mano: se sobrescribe. */

const fs = require('fs');
const path = require('path');

const dir = __dirname;
const leer = f => fs.readFileSync(path.join(dir, f), 'utf8');

const assets = leer('assets.css');   // tipografía y logo en data URI
const css = leer('estilos.css');
const motion = leer('motion.js');    // Motion (motion.dev), el Framer Motion sin React
const datos = leer('datos.js');
const calendario = leer('calendario.js');
const playbook = leer('playbook.js');
const app = leer('app.js');

// Del index tomamos solo el cuerpo: sin <head>, sin favicon, sin <script src>.
const html = leer('index.html');
const cuerpo = html
  .slice(html.indexOf('<body>') + '<body>'.length, html.lastIndexOf('</body>'))
  .replace(/\s*<script src="[^"]+"><\/script>/g, '')
  .trim();

// Un </script> dentro de un string de JS cerraría la etiqueta antes de tiempo.
const seguro = js => js.replace(/<\/script/gi, '<\\/script');

const salida = [
  // charset y viewport viajaban en el <head> del index; sin el charset se
  // rompen los acentos y sin el viewport el celular renderiza a 980px y achica
  '<meta charset="utf-8">',
  '<meta name="viewport" content="width=device-width, initial-scale=1">',
  '<title>Redalco — Estrategia de mails</title>',
  '<style>',
  assets.trim(),
  '</style>',
  '<style>',
  css.trim(),
  '</style>',
  '',
  cuerpo,
  '',
  '<script>',
  seguro(motion.trim()),
  '</' + 'script>',
  '<script>',
  seguro(datos.trim()),
  '</' + 'script>',
  '<script>',
  seguro(calendario.trim()),
  '</' + 'script>',
  '<script>',
  seguro(playbook.trim()),
  '</' + 'script>',
  '<script>',
  seguro(app.trim()),
  '</' + 'script>',
  ''
].join('\n');

fs.writeFileSync(path.join(dir, '_publicar.html'), salida);
console.log('_publicar.html escrito:', salida.length, 'caracteres');
