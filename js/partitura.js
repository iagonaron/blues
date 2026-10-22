/* ══════════════════════════════════════════════════════════════════════
   BLUES · partitura del «Blues de John» (= Blues en Sol del libro)
   SVG: clave de sol, armadura de Sol (fa♯), 4/4, 12 compases en 3
   sistemas de 4, cifrado encima, nota que suena encendida.
   Modos: manuscrito · limpio · notasLargas · finalesBorrados.
   Siempre escrita en Sol, aunque la banda suene en otra tonalidad.
   Los glifos son los del portal viejo (mismo grabado), pasados a SVG.
   ══════════════════════════════════════════════════════════════════════ */
'use strict';
(function (B) {
  /* ── el tema: [nota | null (silencio), duración en negras, grupo de barra, acento] ── */
  const A = [['G4', .5, 1], ['F4', .5, 1], ['G4', .5, 1], ['B4', .5, 1], ['G4', 1], ['G4', 1]];
  const Bc = [['G4', 1], ['F4', .5, 1], ['G4', .5, 1], [null, 2]];
  const TEMA = [
    A, Bc, A,
    [['C5', 1], ['B4', .5, 1], ['G4', .5, 1], [null, 2]],
    [['C5', .5, 1], ['Bb4', .5, 1], ['C5', .5, 1], ['E5', .5, 1], ['C5', 1], ['C5', 1]],
    [['C5', 1], ['Bb4', .5, 1], ['C5', .5, 1], [null, 2]],
    A, Bc,
    [['D5', .5, 1], ['C5', .5, 1], ['D5', .5, 1], ['F#5', .5, 1], ['D5', 1], [null, 1]],
    [['C5', .5, 1], ['Bb4', .5, 1], ['C5', .5, 1], ['E5', .5, 1], ['C5', 1], [null, 1]],
    A,
    [[null, .5], ['D5', .5, 1, 1], ['D5', .5, 1, 1], ['D5', .5, 1, 1], [null, 2]]
  ];
  const ACORDES = ['G7', 'G7', 'G7', 'G7', 'C7', 'C7', 'G7', 'G7', 'D7', 'C7', 'G7', 'D7'];
  const ROMANO = { G7: 'I7', C7: 'IV7', D7: 'V7' };   // (punto 38) el molde de cualquier blues: el número romano encima del cifrado
  B.ROMANO = ROMANO;
  const NOTAS_ACORDE = { G7: ['G4', 'B4', 'D5', 'F5'], C7: ['G4', 'Bb4', 'C5', 'E5'], D7: ['F#4', 'A4', 'C5', 'D5'] };
  const ESCALAS = {   // mixolidios (lo que se puede tocar en cada acorde)
    G7: ['Sol', 'La', 'Si', 'Do', 'Re', 'Mi', 'Fa'], C7: ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si♭'], D7: ['Re', 'Mi', 'Fa♯', 'Sol', 'La', 'Si', 'Do']
  };
  const PC_ESCALA = { G7: [7, 9, 11, 0, 2, 4, 5], C7: [0, 2, 4, 5, 7, 9, 10], D7: [2, 4, 6, 7, 9, 11, 0] };
  const SEMI = [0, 2, 4, 5, 7, 9, 11], LETRAS = 'CDEFGAB';
  function nota(txt) {
    const m = /^([A-G])(#|b)?(\d)$/.exec(txt);
    const l = LETRAS.indexOf(m[1]), alt = m[2] === '#' ? 1 : m[2] === 'b' ? -1 : 0, oct = +m[3];
    return { l, alt, oct, paso: oct * 7 + l, midi: 12 * (oct + 1) + SEMI[l] + alt };
  }
  /* el tema con tiempos: lo usan la banda, los hitos y los ejercicios */
  B.TEMA = TEMA.map(cp => { let t = 0; return cp.map(el => { const o = { n: el[0] ? nota(el[0]) : null, t, dur: el[1], grupo: el[2], ac: el[3] }; t += el[1]; return o; }); });
  B.ACORDES = ACORDES; B.NOTAS_ACORDE = NOTAS_ACORDE; B.ESCALAS = ESCALAS; B.PC_ESCALA = PC_ESCALA; B.notaDe = nota;
  B.BORRADOS = [2, 3, 6, 7, 9];   // (Iago, 19-oct) «finalesBorrados»: se borran ENTEROS los compases 3, 4, 7, 8 y 10, y solo esos
  B.ACORDE_PC = { G7: 7, C7: 0, D7: 2 };

  /* ── glifos (coordenadas del portal viejo, en unidades de espacio s) ── */
  const f2 = v => (Math.round(v * 100) / 100);
  function claveSol(x, y, s) {
    const p = (a, b) => f2(x + a * s) + ' ' + f2(y + b * s);
    return '<path class="pt-tinta-t" fill="none" stroke-width="' + f2(s * .19) + '" stroke-linecap="round" stroke-linejoin="round" d="M' + p(-.6, 2.45) +
      'C' + p(-1, 3.05) + ' ' + p(.12, 3.2) + ' ' + p(.44, 2.3) + 'C' + p(.66, 1.5) + ' ' + p(.32, .5) + ' ' + p(.1, -.4) +
      'C' + p(-.12, -1.4) + ' ' + p(-.32, -2.2) + ' ' + p(-.24, -2.95) + 'C' + p(-.14, -3.86) + ' ' + p(.72, -4.1) + ' ' + p(.82, -3.34) +
      'C' + p(.94, -2.7) + ' ' + p(.2, -2.42) + ' ' + p(-.3, -2) + 'C' + p(-1.1, -1.32) + ' ' + p(-1.42, -.5) + ' ' + p(-1.12, .22) +
      'C' + p(-.86, .98) + ' ' + p(.1, 1.2) + ' ' + p(.6, .7) + 'C' + p(1.05, .24) + ' ' + p(.86, -.5) + ' ' + p(.24, -.58) +
      'C' + p(-.34, -.64) + ' ' + p(-.66, -.1) + ' ' + p(-.34, .26) + 'C' + p(-.14, .48) + ' ' + p(.14, .38) + ' ' + p(.14, .1) + '"/>';
  }
  function linea(x1, y1, x2, y2, w, cls) { return '<line class="' + (cls || 'pt-tinta-t') + '" x1="' + f2(x1) + '" y1="' + f2(y1) + '" x2="' + f2(x2) + '" y2="' + f2(y2) + '" stroke-width="' + f2(w) + '"/>'; }
  function sostenido(x, y, s, cls) {
    return '<g class="' + (cls || '') + '">' + linea(x - .26 * s, y - 1.05 * s, x - .26 * s, y + .96 * s, s * .085) + linea(x + .26 * s, y - 1.18 * s, x + .26 * s, y + .83 * s, s * .085) +
      linea(x - .52 * s, y - .3 * s, x + .52 * s, y - .46 * s, s * .19) + linea(x - .52 * s, y + .4 * s, x + .52 * s, y + .24 * s, s * .19) + '</g>';
  }
  function bemol(x, y, s, cls) {
    const p = (a, b) => f2(x + a * s) + ' ' + f2(y + b * s);
    return '<g class="' + (cls || '') + '">' + linea(x, y - 1.75 * s, x, y + .45 * s, s * .15) +
      '<path class="pt-tinta-f" d="M' + p(0, .42) + 'C' + p(.3, .1) + ' ' + p(.72, -.06) + ' ' + p(.6, -.42) + 'C' + p(.5, -.72) + ' ' + p(.14, -.52) + ' ' + p(0, -.16) + 'Z"/></g>';
  }
  function becuadro(x, y, s, cls) {
    return '<g class="' + (cls || '') + '">' + linea(x - .13 * s, y - 1.1 * s, x - .13 * s, y + .46 * s, s * .095) + linea(x + .29 * s, y - .46 * s, x + .29 * s, y + 1.1 * s, s * .095) +
      linea(x - .13 * s, y - .54 * s, x + .29 * s, y - .67 * s, s * .19) + linea(x - .13 * s, y + .54 * s, x + .29 * s, y + .41 * s, s * .19) + '</g>';
  }
  const alteracion = (alt, x, y, s, cls) => alt === 1 ? sostenido(x, y, s, cls) : alt === -1 ? bemol(x, y, s, cls) : becuadro(x, y, s, cls);
  function elipse(cx, cy, rx, ry, rot) {
    const c = Math.cos(rot), sn = Math.sin(rot), x0 = cx + rx * c, y0 = cy + rx * sn, x1 = cx - rx * c, y1 = cy - rx * sn, d = f2(rot * 180 / Math.PI);
    return 'M' + f2(x0) + ' ' + f2(y0) + 'A' + f2(rx) + ' ' + f2(ry) + ' ' + d + ' 1 0 ' + f2(x1) + ' ' + f2(y1) + 'A' + f2(rx) + ' ' + f2(ry) + ' ' + d + ' 1 0 ' + f2(x0) + ' ' + f2(y0) + 'Z';
  }
  const cabezaLlena = (x, y, s, cls) => '<path class="pt-tinta-f ' + (cls || '') + '" d="' + elipse(x, y, .66 * s, .46 * s, -.32) + '"/>';
  const redonda = (x, y, s, cls) => '<path class="pt-tinta-f ' + (cls || '') + '" fill-rule="evenodd" d="' + elipse(x, y, .72 * s, .5 * s, -.2) + elipse(x, y, .4 * s, .185 * s, -.44) + '"/>';
  function silBlanca(x, y, s) { return '<rect class="pt-tinta-f" x="' + f2(x - .62 * s) + '" y="' + f2(y - .44 * s) + '" width="' + f2(1.24 * s) + '" height="' + f2(.44 * s) + '"/>'; }
  function silNegra(x, y, s) {
    const p = (a, b) => f2(x + a * s) + ' ' + f2(y + b * s);
    return '<path class="pt-tinta-t" fill="none" stroke-width="' + f2(s * .24) + '" stroke-linejoin="round" stroke-linecap="round" d="M' + p(.24, -1.42) + 'L' + p(-.14, -.6) + 'L' + p(.28, -.02) + 'L' + p(-.18, .7) + '"/>' +
      '<path class="pt-tinta-f" d="M' + p(-.18, .7) + 'C' + p(.18, .52) + ' ' + p(.46, .86) + ' ' + p(.3, 1.44) + 'C' + p(.2, .98) + ' ' + p(-.1, 1.02) + ' ' + p(-.34, 1.16) + 'Z"/>';
  }
  function silCorchea(x, y, s) {
    const p = (a, b) => f2(x + a * s) + ' ' + f2(y + b * s);
    return linea(x + .38 * s, y - .8 * s, x - .2 * s, y + .92 * s, s * .145) +
      '<path class="pt-tinta-t" fill="none" stroke-width="' + f2(s * .125) + '" d="M' + p(.38, -.8) + 'C' + p(.2, -.5) + ' ' + p(.04, -.38) + ' ' + p(-.16, -.44) + '"/>' +
      '<circle class="pt-tinta-f" cx="' + f2(x - .28 * s) + '" cy="' + f2(y - .5 * s) + '" r="' + f2(.235 * s) + '"/>';
  }
  function acento(x, y, s) { const p = (a, b) => f2(x + a * s) + ' ' + f2(y + b * s); return '<path class="pt-tinta-t" fill="none" stroke-linecap="round" stroke-width="' + f2(s * .14) + '" d="M' + p(-.44, -.32) + 'L' + p(.44, 0) + 'L' + p(-.44, .32) + '"/>'; }

  /* generador de números «aleatorios» fijos (para manchas del manuscrito) */
  function semilla(n) { return () => { n = (n * 9301 + 49297) % 233280; return n / 233280; }; }

  /* (Iago, 20-oct) UN COMPÁS SUELTO EN PARTITURA (en vez de etiquetas con el nombre de las notas): clave de sol, fa♯ de armadura
     y las notas dadas ([nombre, duración en negras], p. ej. ['G4', .5]); corcheas unidas de dos en dos por pulso y la alteración
     que pida la armadura (fa natural → ♮). Cada nota va en <g class="mn-n">: con la clase «on» se enciende (la que suena). */
  B.compasMini = function (notas, o) {
    o = o || {};
    const s = o.s || 14, W = o.ancho || 560, sy = 3.4 * s, yBase = sy + 4 * s, yDe = p => yBase - (p - 30) * (s / 2), H = Math.round(sy + 4 * s + 3.6 * s);
    const tinta = o.tinta || '#16131C', ARM = { 3: 1 };   // en Sol: fa♯
    let g = '<svg class="pt-mini" viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Compás en partitura">' +
      '<defs><style>.pt-mini .pt-tinta-t{stroke:' + tinta + '}.pt-mini .pt-tinta-f{fill:' + tinta + '}' +
      '.pt-mini .mn-n.on .pt-tinta-f{fill:#B3261E}.pt-mini .mn-n.on .pt-tinta-t{stroke:#B3261E}</style></defs>';
    const x0 = s * .6, x1 = W - s * .6;
    for (let i = 0; i < 5; i++) g += linea(x0, sy + i * s, x1, sy + i * s, s * .075);
    g += claveSol(x0 + s * 1.75, sy + 3 * s, s) + sostenido(x0 + s * 3.75, yDe(38), s) + linea(x1, sy, x1, sy + 4 * s, s * .12);
    const tot = notas.reduce((a, n) => a + n[1], 0), xa = x0 + s * 6.4, xb = x1 - s * 2.2, pos = [];
    let t = 0;
    notas.forEach(([nm, d]) => { const n = nota(nm); pos.push({ x: xa + (t / tot) * (xb - xa), y: yDe(n.paso), d, n, t }); t += d; });
    const arriba = q => q.y >= sy + 2 * s;   // plica arriba si la nota está en la mitad de abajo
    pos.forEach((q, k) => {
      let h = '<g class="mn-n" data-i="' + k + '">';
      for (let p = 28; p >= q.n.paso; p -= 2) h += linea(q.x - s * 1.1, yDe(p), q.x + s * 1.1, yDe(p), s * .1);   // líneas adicionales
      for (let p = 40; p <= q.n.paso; p += 2) h += linea(q.x - s * 1.1, yDe(p), q.x + s * 1.1, yDe(p), s * .1);
      const enArm = ARM[q.n.l] || 0;
      if (q.n.alt !== enArm) h += alteracion(q.n.alt, q.x - s * 1.7, q.y, s);
      h += q.d >= 2 ? redonda(q.x, q.y, s) : cabezaLlena(q.x, q.y, s);
      if (q.d < 4) { const up = arriba(q), xs = q.x + (up ? .6 : -.6) * s; q.xs = xs; q.ys = q.y + (up ? -3.5 : 3.5) * s; q.up = up; h += linea(xs, q.y, xs, q.ys, s * .12); }
      g += h + '</g>';
    });
    // barras: corcheas del mismo pulso, de dos en dos; una corchea sola lleva su corchete
    for (let k = 0; k < pos.length; k++) {
      const q = pos[k]; if (q.d >= 1) continue;
      const r = pos[k + 1];
      if (r && r.d < 1 && Math.floor(r.t + 1e-6) === Math.floor(q.t + 1e-6)) {
        const up = q.up, yb = up ? Math.min(q.ys, r.ys) : Math.max(q.ys, r.ys);
        g += '<path class="pt-tinta-f" d="M' + f2(q.xs) + ' ' + f2(yb) + 'L' + f2(r.xs) + ' ' + f2(yb) + 'L' + f2(r.xs) + ' ' + f2(yb + (up ? .55 : -.55) * s) + 'L' + f2(q.xs) + ' ' + f2(yb + (up ? .55 : -.55) * s) + 'Z"/>';
        if (Math.abs(q.ys - yb) > .5) g += linea(q.xs, q.ys, q.xs, yb, s * .12);
        if (Math.abs(r.ys - yb) > .5) g += linea(r.xs, r.ys, r.xs, yb, s * .12);
        k++;
      } else g += '<path class="pt-tinta-t" fill="none" stroke-width="' + f2(s * .14) + '" d="M' + f2(q.xs) + ' ' + f2(q.ys) + ' q ' + f2(s * 1.1) + ' ' + f2((q.up ? .8 : -.8) * s) + ' ' + f2(s * .5) + ' ' + f2((q.up ? 2.1 : -2.1) * s) + '"/>';
    }
    return g + '</svg>';
  };

  let CONT = 0;
  B.partitura = function (cont, o) {
    o = Object.assign({ modo: 'limpio' }, o || {});
    const caja = B.el('div', 'partitura pt-' + o.modo + (o.manuscrito && o.modo !== 'manuscrito' ? ' pt-manuscrito' : ''));
    cont.appendChild(caja);
    const P = { caja, modo: o.modo, elegidas: {} };
    let sonando = null, compasOn = -1;
    P.dibuja = function () {
      const W = 1600, s = 15, altoSist = o.modo === 'finalesBorrados' ? 14.2 * s : 12.4 * s;
      const cab = o.modo === 'manuscrito' || o.titulo || o.cabecera ? 3.2 * s : 0;
      const H = Math.round(cab + 3 * altoSist + s * 1.2);
      const man = o.modo === 'manuscrito' || o.manuscrito;
      const papel = man ? '#E8D9B5' : '#F6F1E6', tinta = man ? '#3A2414' : '#16131C';
      const uid = 'ptx' + (++CONT);
      let g = '<svg class="' + uid + '" viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Blues de John, en Sol">';
      g += '<defs><style>.' + uid + ' .pt-tinta-t{stroke:' + tinta + '}.' + uid + ' .pt-tinta-f{fill:' + tinta + '}.' + uid + ' .pt-txt{fill:' + tinta + '}</style>';
      if (man) {
        g += '<filter id="manchas' + uid + '" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".008 .012" numOctaves="3" seed="7"/>' +
          '<feColorMatrix values="0 0 0 0 .45  0 0 0 0 .3  0 0 0 0 .12  0 0 0 -2.1 1.25"/></filter>' +
          '<filter id="borron' + uid + '"><feGaussianBlur stdDeviation="9"/></filter>' +
          '<radialGradient id="viejo' + uid + '" cx="50%" cy="45%" r="75%"><stop offset="0" stop-color="#F1E4C2"/><stop offset=".75" stop-color="#E2CFA2"/><stop offset="1" stop-color="#C9AE78"/></radialGradient>';
      }
      g += '</defs>';
      g += '<rect x="0" y="0" width="' + W + '" height="' + H + '" fill="' + (man ? 'url(#viejo' + uid + ')' : papel) + '"/>';
      if (man) g += '<rect x="0" y="0" width="' + W + '" height="' + H + '" filter="url(#manchas' + uid + ')" opacity=".55" pointer-events="none"/>';
      if (cab) {
        const tit = o.titulo ? B.esc(o.titulo) : '<tspan text-decoration="line-through" opacity=".7">Blues de John</tspan>  <tspan fill="#24406e">A nana de Xan</tspan> · 1912';   /* John tachó su título cuando supo que al niño le llamaban Xan */
        g += '<text class="pt-txt" x="' + (W / 2) + '" y="' + f2(cab * .7) + '" text-anchor="middle" font-family="Cormorant Garamond,Georgia,serif" font-style="italic" font-weight="600" font-size="' + f2(s * 1.9) + '">' + tit + '</text>';
      }
      const rnd = semilla(31);
      for (let f = 0; f < 3; f++) {
        const sy = cab + f * altoSist + 4.4 * s, x0 = s * .8, x1 = W - s * .8;
        const yBase = sy + 4 * s, yDe = p => yBase - (p - 30) * (s / 2);
        for (let i = 0; i < 5; i++) g += linea(x0, sy + i * s, x1, sy + i * s, s * .075);
        g += claveSol(x0 + s * 1.75, sy + 3 * s, s);
        g += sostenido(x0 + s * 3.75, yDe(38), s);          // armadura: fa♯
        if (f === 0) {
          g += '<text class="pt-txt" x="' + f2(x0 + s * 5.6) + '" y="' + f2(sy + 1.86 * s) + '" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="' + f2(s * 1.55) + '">4</text>';
          g += '<text class="pt-txt" x="' + f2(x0 + s * 5.6) + '" y="' + f2(sy + 3.86 * s) + '" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="' + f2(s * 1.55) + '">4</text>';
        }
        const xa = x0 + s * (f === 0 ? 7.0 : 5.2), anchoC = (x1 - xa) / 4;
        for (let k = 0; k < 4; k++) {
          const i = f * 4 + k, cx0 = xa + k * anchoC;
          g += '<rect class="pt-compas" data-c="' + i + '" x="' + f2(cx0) + '" y="' + f2(sy - s * 1.2) + '" width="' + f2(anchoC) + '" height="' + f2(6.4 * s) + '" fill="#C9A45C" opacity="0" pointer-events="none"/>';
          if (k) g += linea(cx0, sy, cx0, sy + 4 * s, s * .08);
          if (i === 0 || ACORDES[i] !== ACORDES[i - 1] || o.modo === 'notasLargas') {
            const txt = ACORDES[i];
            if (man) g += '<text class="pt-txt" x="' + f2(cx0 + s * .5) + '" y="' + f2(sy - s * 2.1) + '" font-family="Cormorant Garamond,Georgia,serif" font-style="italic" font-weight="600" font-size="' + f2(s * 1.6) + '">' + txt + '</text>';
            else g += '<rect fill="none" class="pt-tinta-t" stroke-width="1.4" x="' + f2(cx0 + s * .24) + '" y="' + f2(sy - s * 3.5) + '" width="' + f2(s * 2.6) + '" height="' + f2(s * 1.5) + '" rx="2"/>' +
              '<text class="pt-txt" x="' + f2(cx0 + s * 1.54) + '" y="' + f2(sy - s * 2.32) + '" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="' + f2(s * 1.0) + '">' + txt + '</text>';
            if (o.romanos) g += '<text class="pt-rom" x="' + f2(cx0 + s * 1.54) + '" y="' + f2(sy - s * (man ? 3.9 : 4.0)) + '" text-anchor="middle" font-family="Cormorant Garamond,Georgia,serif" font-style="italic" font-weight="700" font-size="' + f2(s * 1.15) + '" fill="#2F5FB0">' + ROMANO[txt] + '</text>';
          }
          g += o.modo === 'notasLargas' ? compasAcorde(i, cx0, anchoC, s, yDe) : compasTema(i, cx0, anchoC, s, yDe, o.modo === 'finalesBorrados', sy);
          if (man && o.modo !== 'finalesBorrados' && rnd() < .55) {   // partes borradas por el tiempo (en los finales borrados, solo se borran los compases elegidos)
            const bx = cx0 + anchoC * (.2 + rnd() * .6), by = sy + s * (rnd() * 4);
            g += '<ellipse cx="' + f2(bx) + '" cy="' + f2(by) + '" rx="' + f2(s * (2 + rnd() * 3)) + '" ry="' + f2(s * (1 + rnd() * 1.4)) + '" fill="#EADCB8" pointer-events="none" opacity="' + f2(.45 + rnd() * .3) + '" filter="url(#borron' + uid + ')"/>';
          }
        }
        if (f === 2) { g += linea(x1 - s * .42, sy, x1 - s * .42, sy + 4 * s, s * .09); g += linea(x1 - s * .1, sy, x1 - s * .1, sy + 4 * s, s * .24); }
      }
      g += '</svg>';
      caja.innerHTML = g;
      caja.querySelector('svg').style.width = '100%';
      if (o.modo === 'notasLargas') B.$$('.pt-elige', caja).forEach(el => el.addEventListener('click', () => {
        const i = +el.dataset.c, m = +el.dataset.m;
        P.elegidas[i] = m; B.$$('.pt-elige[data-c="' + i + '"]', caja).forEach(x => x.classList.toggle('pt-on', +x.dataset.m === m));
        if (o.alElegir) o.alElegir(i, m);
      }));
      sonando = null; if (compasOn >= 0) P.compas(compasOn);
    };
    /* un compás del tema */
    /* compás borrado por el tiempo: las notas casi no se ven y el papel está gastado encima (sin recuadro) */
    function compasTema(i, x0, ancho, s, yDe, borrar, sy) {
      const h = compasTema0(i, x0, ancho, s, yDe, borrar, sy);
      if (!(borrar && B.BORRADOS.includes(i))) return h;
      const y1 = yDe(43), y2 = yDe(22);   // el cifrado de encima se sigue leyendo
      return '<g class="pt-borrado" opacity=".07" style="filter:blur(1.8px)">' + h + '</g>' +
        '<rect x="' + f2(x0 + s * .5) + '" y="' + f2(y1) + '" width="' + f2(ancho - s) + '" height="' + f2(y2 - y1) + '" rx="' + f2(s * 2.4) + '" fill="#E6D5AC" opacity=".6" style="filter:blur(9px)" pointer-events="none"/>' +
        '<rect x="' + f2(x0 + ancho * .15) + '" y="' + f2(y1 + (y2 - y1) * .22) + '" width="' + f2(ancho * .66) + '" height="' + f2((y2 - y1) * .5) + '" rx="' + f2(s * 2) + '" fill="#F2E6C6" opacity=".5" style="filter:blur(6px)" pointer-events="none"/>';
    }
    function compasTema0(i, x0, ancho, s, yDe, borrar, sy) {
      const cp = B.TEMA[i], util = ancho - s * 1.8, xIni = x0 + s * 1.2;
      const alteradas = { 3: 1 };           // armadura: fa♯
      const huecoBorr = false;   // (el recuadro «¿…?» de antes ya no se usa)
      let h = '';
      const puestos = cp.map((el, k) => Object.assign({ k }, el));
      let conAlt = 0;
      puestos.forEach(p => {
        if (!p.n) return;
        const est = alteradas[p.n.l] == null ? 0 : alteradas[p.n.l];
        if (p.n.alt !== est) { p.alt = p.n.alt; alteradas[p.n.l] = p.n.alt; conAlt++; }
        p.y = yDe(p.n.paso);
      });
      const HUECO = s * 1.55, util2 = Math.max(util * .45, util - conAlt * HUECO);
      let extra = 0;
      puestos.forEach(p => { p.x = xIni + (p.t / 4) * util2 + extra; if (p.alt != null) { p.x += HUECO; extra += HUECO; } });
      const yMed = yDe(34);
      const visibles = puestos.filter(p => !(huecoBorr && p.t >= 2));
      if (huecoBorr) {
        const xb = xIni + .5 * util2 + extra * .5 - s * .4, wb = x0 + ancho - xb - s * .5;
        h += '<rect x="' + f2(xb) + '" y="' + f2(yDe(42)) + '" width="' + f2(wb) + '" height="' + f2(s * 6) + '" rx="' + f2(s * .6) + '" fill="#E9DFC9" stroke="#8a7a5a" stroke-dasharray="6 5" stroke-width="1.6" opacity=".95"/>' +
          '<text x="' + f2(xb + wb / 2) + '" y="' + f2(yDe(34) + s * .55) + '" text-anchor="middle" font-family="Limelight,Georgia,serif" font-size="' + f2(s * 1.7) + '" fill="#8a6a2f">¿…?</text>' +
          '<text x="' + f2(xb + wb / 2) + '" y="' + f2(sy + s * 6.9) + '" text-anchor="middle" font-family="Jost,Arial,sans-serif" font-weight="600" font-size="' + f2(s * .86) + '" fill="#6b5338">' + ESCALAS[ACORDES[i]].join(' · ') + '</text>';
      }
      visibles.forEach(p => {
        const id = 'n' + i + '_' + p.k;
        if (!p.n) {
          if (p.dur >= 2) h += silBlanca(p.x + s * 1.4, yMed, s);
          else if (p.dur >= 1) h += silNegra(p.x + s * .35, yMed, s);
          else h += silCorchea(p.x + s * .35, yMed, s);
          return;
        }
        h += '<g class="pt-nota" id="' + id + '">';
        if (p.n.paso <= 28) for (let ls = 28; ls >= p.n.paso; ls -= 2) h += linea(p.x - s * .95, yDe(ls), p.x + s * .95, yDe(ls), s * .085);
        if (p.n.paso >= 40) for (let ls = 40; ls <= p.n.paso; ls += 2) h += linea(p.x - s * .95, yDe(ls), p.x + s * .95, yDe(ls), s * .085);
        if (p.alt != null) h += alteracion(p.alt, p.x - s * 1.42, p.y, s);
        h += '<circle class="pt-halo" cx="' + f2(p.x) + '" cy="' + f2(p.y) + '" r="' + f2(s * 1.35) + '" fill="#2F5FB0" opacity="0" pointer-events="none"/>';
        h += cabezaLlena(p.x, p.y, s);
        if (p.ac) h += acento(p.x, p.y - s * 1.6, s);
        h += '</g>';
      });
      const conNota = visibles.filter(p => p.n);
      if (!conNota.length) return h;
      const medio = conNota.reduce((a, p) => a + p.n.paso, 0) / conNota.length, arriba = medio < 34, dx = (arriba ? .6 : -.6) * s;
      const plica = (p, hasta) => '<line class="pt-tinta-t pt-plica" data-n="n' + i + '_' + p.k + '" x1="' + f2(p.x + dx) + '" y1="' + f2(p.y + (arriba ? -.1 : .1) * s) + '" x2="' + f2(p.x + dx) + '" y2="' + f2(hasta) + '" stroke-width="' + f2(s * .115) + '"/>';
      conNota.filter(p => p.dur >= 1).forEach(p => h += plica(p, p.y + (arriba ? -3.35 : 3.35) * s));
      const grupos = {};
      conNota.filter(p => p.dur < 1).forEach(p => { const k = p.grupo ? p.grupo + ':' + Math.floor(p.t + 1e-6) : ('x' + p.k);   /* (punto 31) una barra por cada pulso de negra: corcheas de 2 en 2 */ (grupos[k] = grupos[k] || []).push(p); });
      Object.keys(grupos).forEach(k => {
        const gr = grupos[k];
        const yv = arriba ? Math.min.apply(null, gr.map(p => p.y)) - 3.35 * s : Math.max.apply(null, gr.map(p => p.y)) + 3.35 * s;
        gr.forEach(p => h += plica(p, yv));
        if (gr.length > 1) { const xa = gr[0].x + dx, xb = gr[gr.length - 1].x + dx; h += '<rect class="pt-tinta-f" x="' + f2(xa - s * .06) + '" y="' + f2(arriba ? yv : yv - s * .48) + '" width="' + f2(xb - xa + s * .12) + '" height="' + f2(s * .48) + '"/>'; }
        else { const p = gr[0], X = p.x + dx; h += '<path class="pt-tinta-t" fill="none" stroke-width="' + f2(s * .15) + '" d="M' + f2(X) + ' ' + f2(yv) + 'C' + f2(X + .85 * s) + ' ' + f2(yv + (arriba ? .42 : -.42) * s) + ' ' + f2(X + .92 * s) + ' ' + f2(yv + (arriba ? 1 : -1) * s) + ' ' + f2(X + .3 * s) + ' ' + f2(yv + (arriba ? 1.45 : -1.45) * s) + '"/>'; }
      });
      return h;
    }
    /* un compás con las cuatro notas del acorde en redondas apiladas */
    function compasAcorde(i, x0, ancho, s, yDe) {
      const ac = ACORDES[i], ns = NOTAS_ACORDE[ac].map(nota).sort((a, b) => a.paso - b.paso);
      const cx = x0 + ancho * .55;
      let h = '', prev = null;
      ns.forEach((n, k) => { n.dx = (prev && n.paso - prev.paso === 1 && !prev.dx) ? s * 1.4 : 0; prev = n; });
      const conAlt = ns.filter(n => (n.l === 3 ? n.alt !== 1 : n.alt !== 0));
      conAlt.forEach((n, k) => { n.ax = cx - s * 1.6 - (conAlt.length - 1 - k) * s * 1.1; });
      ns.forEach(n => {
        const y = yDe(n.paso), X = cx + n.dx;
        h += '<g class="pt-elige pt-nota" data-c="' + i + '" data-m="' + n.midi + '" style="cursor:pointer">';
        h += '<rect x="' + f2(X - s * 1.1) + '" y="' + f2(y - s * .48) + '" width="' + f2(s * 2.2) + '" height="' + f2(s * .96) + '" fill="transparent"/>';
        if (n.paso <= 28) for (let ls = 28; ls >= n.paso; ls -= 2) h += linea(X - s * 1.05, yDe(ls), X + s * 1.05, yDe(ls), s * .085);
        if (n.ax != null) h += alteracion(n.alt, n.ax, y, s);
        h += '<circle class="pt-halo" cx="' + f2(X) + '" cy="' + f2(y) + '" r="' + f2(s * 1.2) + '" fill="#2F5FB0" opacity="0" pointer-events="none"/>';
        h += redonda(X, y, s) + '</g>';
      });
      h += '<text x="' + f2(cx) + '" y="' + f2(yDe(24) + s * .3) + '" text-anchor="middle" font-family="Jost,Arial,sans-serif" font-weight="600" font-size="' + f2(s * .82) + '" fill="#6b5338">' +
        NOTAS_ACORDE[ac].map(t => B.nombre(nota(t).midi)).join(' · ') + '</text>';
      return h;
    }
    /* encender la nota que suena (compás i, elemento k) */
    P.enciende = function (i, k) {
      const id = i == null || k == null ? null : 'n' + i + '_' + k;
      if (id === sonando) return;
      if (sonando) { const el = caja.querySelector('#' + sonando); if (el) { el.classList.remove('pt-on'); const h = el.querySelector('.pt-halo'); if (h) h.setAttribute('opacity', '0'); } B.$$('.pt-plica[data-n="' + sonando + '"]', caja).forEach(x => x.classList.remove('pt-on')); }
      sonando = id;
      if (id) { const el = caja.querySelector('#' + id); if (el) { el.classList.add('pt-on'); const h = el.querySelector('.pt-halo'); if (h) h.setAttribute('opacity', '.22'); } B.$$('.pt-plica[data-n="' + id + '"]', caja).forEach(x => x.classList.add('pt-on')); }
    };
    P.compas = function (i) {
      compasOn = i;
      B.$$('.pt-compas', caja).forEach(r => r.setAttribute('opacity', +r.dataset.c === i ? '.16' : '0'));
      if (o.modo === 'notasLargas') B.$$('.pt-elige', caja).forEach(el => { const h = el.querySelector('.pt-halo'); if (h) h.setAttribute('opacity', +el.dataset.c === i ? '.12' : '0'); });
      if (o.modo === 'finalesBorrados') {   /* la escala que se puede usar, abajo, en la interfaz (no escrita en la partitura) */
        let e = caja.querySelector('.pt-escala');
        if (!e) { e = B.el('div', 'pt-escala'); e.style.cssText = 'text-align:center;font-family:Jost,Arial,sans-serif;font-weight:600;letter-spacing:.05em;color:var(--oro,#C9A45C);margin-top:calc(var(--u)*.6);font-size:calc(var(--u)*1.25)'; caja.appendChild(e); }
        const ac = ACORDES[i >= 0 ? i : 0];
        e.textContent = 'Escala disponible (' + ac + '): ' + ESCALAS[ac].join(' · ');
      }
    };
    /* qué nota del tema suena en el compás i, pulso b (0–4) */
    P.notaEn = function (i, b) {
      if (i < 0 || !B.TEMA[i]) return null;
      let r = null; B.TEMA[i].forEach((e, k) => { if (e.n && b >= e.t - .04 && b < e.t + e.dur - .02) r = k; });
      return r;
    };
    P.sigue = function (i, b) { P.compas(i); if (o.modo === 'notasLargas') return; let k = P.notaEn(i, b); if (o.modo === 'finalesBorrados' && B.BORRADOS.includes(i)) k = null; P.enciende(k == null ? null : i, k); };
    P.apaga = function () { P.enciende(null); P.compas(-1); };
    P.dibuja();
    if (o.modo === 'finalesBorrados') P.compas(-1);   // que la escala disponible se vea desde el principio
    return P;
  };
})(window.BLUES);
