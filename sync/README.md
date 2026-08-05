# Sync de Mailchimp + EmailOctopus

Trae campañas enviadas y sus métricas (aperturas, clics, rebotes, bajas) y las
escribe en `metricas.js`, en la raíz del proyecto. No toca `datos.js` — el
contenido de los mails se sigue editando a mano ahí, esto solo agrega los
números reales de lo que ya se mandó.

## 1. Conseguir las API keys

**Mailchimp**: entrar a la cuenta → ícono de perfil → **Extras → API keys** →
**Create A Key**. Copiar el valor completo, tiene forma
`<32 caracteres>-usNN` (el sufijo -usNN es el prefijo de servidor).

**EmailOctopus**: entrar a la cuenta → **Account → Integrations & API → API
Keys** → **Create an API Key**.

## 2. Configurar

```
cp .env.example .env
```

Completar `.env` con las dos keys. **Nunca se commitea** (ya está en
`.gitignore`) — vive solo en esta computadora, como se decidió el
2026-08-05.

## 3. Correr

```
npm run sync
```

Escribe/pisa `metricas.js`. Se puede correr cuantas veces haga falta; no
sincroniza sola en segundo plano — hay que ejecutar el comando (a mano, o
programado con `launchd`/`cron` si en algún momento se decide dejarlo
automático — no está configurado así todavía, hay que pedirlo explícitamente
porque toca la configuración de la máquina).

## Lo que NO hace todavía

- **No cruza campañas con mails específicos de `datos.js`**: ninguna campaña
  de este plan (ago 2026 – jul 2027) se mandó aún, así que no hay
  `campaignId` para linkear. Cuando empiecen los envíos, agregar un campo
  (ej. `campanaMailchimpId` / `campanaOctopusId`) a cada mail en `datos.js` y
  extender `app.js` para que busque el match en `metricas.js`.
- **No trae conversión a socio ni plata recaudada**: ninguna de las dos APIs
  la tiene. Eso depende de los links especiales por campaña que se van a usar
  para trackear conversión — falta definir con qué plataforma de donación se
  cruzan esos clics (pendiente, 2026-08-05).
- **`metricas.js` no se commitea** (está en `.gitignore`): son datos reales
  de campañas (aperturas, clics, y potencialmente ingresos si Mailchimp tiene
  e-commerce conectado), y el repo es público. Si en algún momento se quiere
  que el dashboard publicado en GitHub Pages muestre estos números, hay que
  decidirlo a propósito — no quedó incluido por default.
