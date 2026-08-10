# Taller de Blues · Unidad 5

Portal interactivo para *El blues y el cifrado americano*. Funciona con doble clic en
`index.html` (sin internet) y también subido a GitHub Pages. Todo el sonido está
sintetizado dentro de la propia página: no hay ni un solo archivo de audio.

---

## Qué hay dentro

**1 · El blues** — un **mapa interactivo del Atlántico**: África, Norteamérica y Europa, con
las flechas convergiendo en el delta del Misisipi. Pulsa un continente y se enciende su
tarjeta. La *máquina del swing* enseña a la vez lo escrito y
lo que suena, con la equivalencia de manual (dos corcheas = tresillo de negra + corchea, que
solo aparece con el swing puesto) y dos botones que cambian al instante: con swing y sin
swing. Y el responsorial, donde el coro contesta con **otra melodía**, no con un acorde — y
donde puedes lanzar tú la llamada desde el teclado y oír cómo te la devuelven.

**2 · La estructura** — el visor de los doce compases. Arranca en **grados romanos**, y con
un botón pasas a los nombres: el grande en letras normales (*Sol 7*) y el cifrado americano
abajo a la derecha (*G7*). Cambias la tonalidad y se adapta todo. Se puede ver en grados romanos, pulsar un compás suelto para oír solo ese
acorde, o darle a **Escuchar** y ver por dónde va la banda en cada momento.

**3 · Cifrado americano** — los diez acordes del libro, con la misma estructura y el mismo
cifrado, pero **cada uno sobre una tónica distinta** (C, E-, F+, B°, Asus, G7, D-7, B♭Δ,
C♯Ø, F♯°7) para que no sea un calco de la página 23. Al pulsar una tarjeta el acorde se
construye nota a nota, se van revelando los intervalos y se oye. No hay ejercicios.

**4 · Impro+** — el proyecto de la unidad. Dos tarjetas, una encima de otra, con la misma
estructura: la **rejilla de doce compases** integrada en las dos.

Arriba, el **tema del libro**, transcrito nota a nota (compases 1 a 12; el cuarto pentagrama
de los apuntes son las escalas, y ese no entra). Se transporta solo a Do, Si♭ o Mi♭ y **se va
encendiendo la nota que toca sonar**.

Abajo, el **teclado**: en azul las notas que puedes usar sobre el acorde de ese compás,
apagadas las que no. Cambian solas compás a compás — sobre C7 se apaga el Si y se enciende
el Si♭.

Se enciende la tarjeta que toca y **la pantalla baja o sube sola** hasta ella: cuando entra
la vuelta de improvisar te lleva al teclado, y cuando vuelve el tema te sube a la partitura.
El cambio se adelanta a **los dos últimos pulsos del compás 12**, para que dé tiempo a verlo
venir en vez de pillarte de golpe.

El botón de tocar y parar, la claqueta y el acorde que suena están **repetidos dentro de cada
tarjeta**, así que da igual dónde estés mirando: siempre tienes el mando a mano. Y el título,
la rejilla y el botón no se apagan nunca aunque la tarjeta no sea la activa.

Tres modos: **TEMA · IMPRO · TEMA** (las tres vueltas del proyecto), **solo el tema** en
bucle y **solo improvisar** en bucle. Y al darle a tocar entra una claqueta de dos compases
—dos blancas y cuatro negras— para que sepas cuándo empezar.

---

## La banda

Batería —con ride, charles, crash y splash al abrir cada frase, y redoble al final de la
primera y la segunda—, contrabajo y piano. **No hay guitarra a propósito**: es el instrumento
que peor aguanta la síntesis y prefería quitarlo antes que meter algo que suene a teclado
barato.

- En Impro+ va a **110 bpm** con el swing en el tresillo exacto; en la pestaña 2 puedes
  moverle el tempo si quieres verlo más despacio en clase.
- Puedes **apagar cualquier instrumento**: si el alumno va a tocar acordes, quita el
  piano; si toca el bajo, quita el contrabajo.
- **Esc** o el botón *Parar todo* cortan cualquier sonido en cualquier momento.

---

## Los vídeos

La carpeta `videos/` está vacía a propósito. Los botones del portal buscan estos archivos y,
si están, los reproducen ahí mismo — sin YouTube y sin anuncios:

**Ya van tres puestos**, sacados de tus propias carpetas de *VÍDEOS 2GP*:

| Archivo | Qué es | Dónde suena |
|---|---|---|
| `videos/blues.mp3` | el audio de tu *ejemplo blues* | 1.4 |
| `videos/africa.mp3` | *1-Canto de trabajo* (unidad 6, carpeta JAZZ) | 1.1 · de África |
| `videos/responsorial.mp3` | *2-Espiritual + Responsorial* (unidad 6, carpeta JAZZ) | 1.3 |

Falta uno: `videos/vaudeville.mp4`, para la tarjeta de Estados Unidos. La de Europa no lleva
nada a propósito.

Cada botón busca **primero el vídeo y luego el audio**, así que si mañana encuentras un vídeo
para cualquiera de los tres, déjalo con el mismo nombre y extensión de vídeo —
`africa.mp4`, por ejemplo— y el portal lo cogerá antes que el mp3, sin tocar nada.
Cuando lo que suena es un audio se ve el **espectro en vivo** en lugar de un cuadro negro.

Valen también `.webm`, `.m4v` y `.mov`. Si un vídeo no está, el botón sigue funcionando y
te ofrece buscarlo en YouTube. Recorta un minuto largo de cada uno y no pasarás de 8 MB
por archivo.

Para recortar sin recomprimir (mantiene la calidad original):

```bash
ffmpeg -ss 00:01:12 -i original.mp4 -t 70 -c copy -movflags +faststart africa.mp4
```

---

## Subirlo a GitHub Pages

1. Crea un repositorio nuevo, público.
2. **Add file → Upload files** y arrastra *el contenido* de esta carpeta, no la carpeta
   entera: `index.html`, `manifest.webmanifest`, `portada.jpg`, los iconos y la carpeta
   `videos`.
3. **Settings → Pages → Branch: main / (root) → Save.**
4. En un minuto tendrás la dirección. Ábrela en la pantalla de clase, y en Chrome usa
   *Instalar aplicación* (o *Compartir → Añadir a pantalla de inicio* en iPad) para dejar
   el icono a la vista.

Límites de GitHub, por si acaso: 25 MB por archivo subiéndolo desde el navegador, 100 MB
como tope duro, y 1 GB de sitio publicado. Son por archivo y por repositorio, nunca por
cuenta.

---

## Notas

- El tema está **transcrito de los apuntes** (páginas 20, 21 y 22) y se dibuja aquí mismo,
  no es una imagen: por eso se puede transportar a las tres tonalidades y por eso se puede
  encender la nota que toca sonar. Si ves alguna errata, dímela y la corrijo en una línea.
- La línea del contrabajo en los compases 3 y 4 es el boogie de siempre —Sol Si Re Mi ·
  Fa Mi Re Si— y el compás 12 lo rematan los tres golpes con los que acaba el tema.
- Los diez acordes de la sección 3 mantienen exactamente los cifrados y las cajas de
  intervalos del libro (`3M / 5J / 7m`…), solo cambia la tónica de cada uno.
- Si algún día quieres tocar otro grado o cambiar la rejilla, está en una sola línea al
  principio del código: `const REJILLA=[0,0,0,0, 5,5,0,0, 7,5,0,7];`
