# Métricas en vivo (Vercel)

`api/metricas.js` es una función serverless: `GET /api/metricas` devuelve un
JSON con las campañas y reportes de Mailchimp + EmailOctopus, en vivo, cacheado
5 horas en el borde de Vercel. Reemplaza a `sync/sync.mjs` para el uso diario
— ese script local sigue sirviendo para debug manual, pero esto es lo que
hace que "se actualice solo" sin correr nada a mano.

Esto necesita que el sitio esté desplegado en **Vercel** (GitHub Pages no
corre funciones serverless). Pasos, una sola vez:

## 1. Crear cuenta y conectar el repo

1. Entrar a **vercel.com** e iniciar sesión con la cuenta de GitHub
   `comunicacion-redalco`.
2. **Add New… → Project** → elegir el repo `redalco-dashboard`.
3. Framework Preset: **Other**. No hace falta build command ni output
   directory — se sirve tal cual, y Vercel detecta solo `api/metricas.js`.
4. Deploy.

## 2. Cargar las API keys

En el proyecto ya creado: **Settings → Environment Variables**. Agregar,
para los tres entornos (Production, Preview, Development):

- `MAILCHIMP_API_KEY`
- `EMAILOCTOPUS_API_KEY`

(Mismas keys que en `.env` para el script local — ver `sync/README.md` para
dónde sacarlas si todavía no las generaste.) Después de cargarlas hay que
volver a desplegar (**Deployments → ⋯ → Redeploy**) para que la función las
vea.

## 3. Confirmar que funciona

Abrir `https://<tu-proyecto>.vercel.app/api/metricas` en el navegador. Tiene
que devolver JSON con `mailchimp` y `emailoctopus` como listas (o mensajes en
`errores` si algo falta).

## Lo que queda pendiente

- **El dashboard todavía no consume este endpoint** — no agregué el fetch
  desde `app.js` ni una vista para mostrar los números, porque no estaba
  definido dónde/cómo se ven (¿por mail? ¿un resumen mensual?). Es el
  próximo paso, a definir.
- **El link publicado cambia**: hoy es
  `https://comunicacion-redalco.github.io/redalco-dashboard/` (GitHub
  Pages). Si se pasa todo a Vercel, el sitio pasa a vivir en
  `https://<tu-proyecto>.vercel.app` — decidir si se mantienen los dos o se
  deja solo uno.
- Conversión a socio / plata recaudada sigue sin resolver (ver
  `sync/README.md`).
