# Dashboard Redalco — Plan de emails Agosto 2026 / Julio 2027

Panel interno para planificar, editar y medir los 35 mails del plan anual.

## Cómo abrirlo

Doble clic en **`Abrir dashboard.command`**. Se abre una ventana de terminal
(dejala abierta) y el dashboard en el navegador.

Al terminar, cerrá esa ventana.

> También podés abrir `index.html` con doble clic, sin la terminal. Anda igual,
> pero algunos navegadores no guardan los datos entre sesiones cuando se abre
> así. Si lo hacés y al volver no ves lo que cargaste, usá el `.command`.

## Qué hace

- **Un mes por pantalla.** Elegís el mes arriba y se actualiza todo. También
  funcionan las flechas ← → del teclado.
- **Los mails son editables.** Asunto, preview y cuerpo. Lo que escribís queda
  guardado. El botón *Restaurar original* vuelve al texto del plan.
- **Copiar y pegar a EmailOctopus.** *Copiar todo* incluye asunto y preview;
  *Solo el cuerpo* copia nada más el texto.
- **Métricas de cada envío.** Cargás enviados, aperturas, clics, conversiones,
  plata, bajas y rebotes. La apertura, el CTR, el CTOR y la conversión se
  calculan solos y se comparan con el benchmark del sector.
- **Checklist por mes**, con las tareas que se arman solas según los mails de
  ese mes.
- **Informe del mes descargable**, en `.html` (se abre en el navegador y podés
  guardarlo como PDF), `.md` o `.csv`.
- **Calendario del sector**: una grilla mes por mes con las fechas y las
  campañas de otras ONGs, para no pedir plata la semana que todo el país mira
  otra cosa. Está en el botón "Calendario del año" de la barra, y además cada
  mes del panel de mails lleva abajo su propia lista de fechas.
  - Se puede **filtrar por organización** con los botones de arriba: ONU,
    Teletón, TECHO, Banco de Alimentos, etc.
  - **Tus propios envíos aparecen en la grilla** en cuanto cargás la fecha de
    envío de un mail, con el borde doble.
  - Pasando el mouse por cada fecha se ve qué conviene hacer con ella.

## El calendario y sus fechas

Está en `calendario.js`. Cada fecha dice de dónde salió y cuánta confianza
tiene:

- **fija** — es la misma todos los años (ONU, FAO, feriados).
- **calculada** — se movía, pero se calculó: Pascua, los segundos domingos,
  GivingTuesday. No están puestas a ojo.
- **estimada** — sale del patrón de años anteriores porque las ONGs no publican
  su calendario con anticipación. **Estas hay que confirmarlas cada año**, y el
  dashboard las marca con un cartel "Fecha a confirmar".

Y cada una dice si sirve para usar (es nuestro tema), si es ruido (compite por
la atención y el bolsillo) o si es solo contexto.

Para agregar una fecha, copiá un bloque de `calendario.js` y cambiá el `mes`
por el id del mes correspondiente (`ago26`, `sep26`, …).

## Dónde se guardan los datos

En el navegador de esta computadora. **Si limpiás el caché, se pierde todo.**

Por eso está el botón **Descargar respaldo** abajo de todo: te baja un archivo
`.json` con todo lo cargado. Guardalo en Drive o donde tengas respaldo. Si
pasan más de dos semanas sin bajar una copia, el dashboard te lo recuerda en
rojo.

Para recuperar: **Importar respaldo** y elegís ese `.json`.

## Cómo cambiar el contenido

Todo el copy, los focos, los objetivos, las checklists y las notas están en
**`datos.js`**, que es un archivo de texto común. Cada mes es un bloque; cada
mail, un bloque adentro. Se edita directo ahí.

Ojo: editar `datos.js` cambia el texto *original*. Si un mail ya lo editaste
desde el dashboard, sigue mandando tu versión editada hasta que le des
*Restaurar original*.

Los colores están arriba de todo en `estilos.css`, en `:root`.

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | La página: portada + panel |
| `datos.js` | **Todo el contenido**: mails, focos, checklists, notas |
| `calendario.js` | Fechas del sector y campañas de otras ONGs |
| `playbook.js` | Estrategia por segmento (del documento de estrategia) |
| `estilos.css` | Colores y diseño |
| `app.js` | La lógica: guardado, cálculos, informes, animaciones |
| `assets.css` | Tipografía y logo embebidos (generado, no editar) |
| `motion.js` | Librería de animación (copia de `node_modules/motion`) |
| `Abrir dashboard.command` | El lanzador de doble clic |
| `_construir.js` / `_publicar.html` | Arman la versión de un solo archivo para publicar |
| `_assets.js` | Regenera `assets.css` |

## Diseño

La dirección visual sale de **redalco.org**, relevada del sitio real y no a ojo:
verde `#138258`, dorado `#EAC03B`, naranja `#DD7626` para los botones de
acción, y **Superclarendon** en los titulares, que es la tipografía que usa el
sitio y viene con macOS. Para quien lo abra desde Windows o Linux queda
**Bitter**, embebida en `assets.css`, que es libre y muy parecida.

El logo es el oficial, extraído del manual de marca.

Las animaciones usan **Motion** (motion.dev), que es la misma librería que
Framer Motion en su versión sin React. Si no cargara, la página funciona
igual: solo no habría animación. Se respeta `prefers-reduced-motion`.

Para regenerar la versión publicable después de cambiar algo:

```
node _construir.js
```

## Cosas del contenido que quedaron marcadas para revisar

Están todas dentro del dashboard, en las notas de cada mes:

- **Mayo 2027:** el mail de regalo promete "$250 = 50 platos cada mes durante
  12 meses". El ratio real es $250 = 25 platos, una vez. Es una promesa que no
  se puede cumplir.
- **Enero y marzo 2027:** el copy usa la palabra "hambre", que Redalco no usa.
  Va "inseguridad alimentaria".
- **Noviembre 2026:** "352 mil toneladas rescatadas" no coincide con los datos
  del proyecto de videos (9.000.000 kg). Verificar antes de publicarlo.
- **Varios meses:** hay copy en tuteo ("¿Quieres?", "lo cancelas", "¿Donas?")
  mezclado con el voseo de la marca.
- **Septiembre 2026:** el CTA dice "Quiero sumarlme".
- **Agosto 2026:** el mail dice que el Día del Niño es el 16/8. Conviene
  confirmar la fecha 2026.
- **Julio 2027:** los 3 mails son derivados de agosto 2026. El plan original
  solo dice "repite la estructura". Están para adaptar, no para enviar.
- **Abril 2027:** el mail habla de la Semana de Turismo, pero en 2027 esa
  semana cae del 22 al 28 de **marzo** (calculado desde la Pascua, 28/3/2027).
  Si sale en abril, llega con la semana terminada.
- **Septiembre 2026:** falta el 29 de septiembre, Día Internacional de
  Concienciación sobre la Pérdida y el Desperdicio de Alimentos. Es
  exactamente el tema de Redalco y no hay ninguna pieza prevista.
- **Diciembre 2026:** falta GivingTuesday (1 de diciembre), el único día del
  año en que la gente espera que le pidan.

Ya resuelto: la fecha del Día del Niño 2026 quedó confirmada, es el domingo 16
de agosto, tal como decía el copy.
