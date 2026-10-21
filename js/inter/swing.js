/* BLUES · swing (P2.4): el primer compás del tema (Sol Fa Sol Si en corcheas, Sol Sol en negras)
   escrito en corcheas iguales; «Sin swing» / «Con swing» para oírlo; luego el alumno lo toca sobre la
   claqueta y se mide cada par de corcheas (objetivo ~2:1; swing 1,5–3,2; «recto» < 1,3). 3 intentos. */
'use strict';
(function (B) {
  /* (C2, 20-oct · Iago: «instrumentos con muestras reales») acordeón de Splice del acto 2 (inst/d2/acordeon/64 y 69.mp3); si no está, el común */
  const INST = () => B.buf['inst/d2/acordeon/69.mp3'] ? 'd2/acordeon' : 'acordeon';
  const U = B.iu;
  const C1 = [[67, .5], [65, .5], [67, .5], [71, .5], [67, 1], [67, 1]];
  function mide(t) {   // t: ataques de las 4 corcheas + la negra siguiente → proporciones de los dos pares
    const r = []; for (let k = 0; k < 2; k++) { const a = t[2 * k + 1] - t[2 * k], b = t[2 * k + 2] - t[2 * k + 1]; r.push(b > 0 ? a / b : 0); }
    return r;
  }
  const juicio = x => x >= 1.5 && x <= 3.2 ? ['ok', '¡con swing!'] : x < 1.3 ? ['mal', 'recto (iguales)'] : x > 3.2 ? ['mal', 'demasiado cojo'] : ['', 'casi'];
  /* (Iago 14:41: «cuando estén explicando lo del tresillo, una animación didáctica por encima: dos corcheas = tresillo de
     negra y corchea, antes de tocar con swing») las frases d2_037–042 van en op.lineas.explica y, mientras se dicen,
     una ficha de papel lo dibuja paso a paso: corcheas → recto (iguales) → swing (larga y corta) → tresillo con las dos
     primeras ligadas → ♫ = ³(♩♪). Un cursor recorre los pulsos a 100 bpm para VER la diferencia. */
  const TINTA = '#2b1f14';
  const cab = (x, y, hueca) => '<ellipse cx="' + x + '" cy="' + y + '" rx="9" ry="6.6" transform="rotate(-20 ' + x + ' ' + y + ')" ' + (hueca ? 'fill="none" stroke="' + TINTA + '" stroke-width="2.4"' : 'fill="' + TINTA + '"') + '/>';
  const plica = (x, y, l) => '<line x1="' + (x + 8.4) + '" x2="' + (x + 8.4) + '" y1="' + (y - 2) + '" y2="' + (y - (l || 46)) + '" stroke="' + TINTA + '" stroke-width="2.2"/>';
  const barra = (xa, xb, y) => '<path d="M' + (xa + 7.3) + ' ' + y + 'H' + (xb + 9.5) + 'v7.5H' + (xa + 7.3) + 'Z" fill="' + TINTA + '"/>';
  const corcheas = (xs, y) => { let h = ''; for (let k = 0; k < xs.length; k += 2) h += cab(xs[k], y) + cab(xs[k + 1], y) + plica(xs[k], y) + plica(xs[k + 1], y) + barra(xs[k], xs[k + 1], y - 46); return h; };
  const tresillo = (x0, x1, y, txt) => '<path d="M' + x0 + ' ' + (y + 8) + 'V' + y + 'H' + (x1 - (x1 - x0) / 2 - 9) + 'M' + (x1 - (x1 - x0) / 2 + 9) + ' ' + y + 'H' + x1 + 'V' + (y + 8) + '" fill="none" stroke="' + TINTA + '" stroke-width="1.6"/><text x="' + ((x0 + x1) / 2) + '" y="' + (y + 5) + '" font-size="17" font-style="italic" text-anchor="middle" fill="' + TINTA + '">' + (txt || 3) + '</text>';
  const liga = (xa, xb, y) => '<path d="M' + (xa + 2) + ' ' + (y + 10) + 'Q' + ((xa + xb) / 2) + ' ' + (y + 26) + ' ' + (xb - 2) + ' ' + (y + 10) + 'Q' + ((xa + xb) / 2) + ' ' + (y + 20) + ' ' + (xa + 2) + ' ' + (y + 10) + 'Z" fill="' + TINTA + '"/>';
  /* cajas de un compás de dos pulsos (ancho 2·P): «partes» = fracciones de pulso de cada nota */
  const P = 150, X0 = 150;
  const cajas = (y, partes, txt, cls) => { let x = X0, h = ''; partes.forEach((p, k) => { const w = p * P; h += '<g class="sx-c ' + cls + '" data-t="' + ((x - X0) / P) + '"><rect x="' + (x + 2) + '" y="' + y + '" width="' + (w - 4) + '" height="30" rx="5"/><text x="' + (x + w / 2) + '" y="' + (y + 21) + '" text-anchor="middle">' + txt[k] + '</text></g>'; x += w; }); return h; };
  function estiloExplica() {
    if (document.getElementById('sw-explica-css')) return;
    const s = document.createElement('style'); s.id = 'sw-explica-css';
    s.textContent = '.sw-explica{position:absolute;left:50%;bottom:17%;transform:translateX(-50%);width:calc(var(--u)*60);background:#F6F1E6;border-radius:calc(var(--u)*.9);box-shadow:0 calc(var(--u)*.8) calc(var(--u)*2.4) rgba(0,0,0,.55);padding:calc(var(--u)*.6) calc(var(--u)*1);opacity:0;transition:opacity .5s}' +
      '.sw-explica.on{opacity:1}.sw-explica svg{width:100%;display:block;overflow:visible}.sw-explica .sx-p{opacity:0;transition:opacity .45s}.sw-explica .sx-p.on{opacity:1}' +
      '.sw-explica text{font-family:inherit;fill:' + TINTA + '}.sw-explica .sx-l{font-size:17px;font-style:italic;opacity:.75}.sw-explica .sx-t{font-size:22px;font-weight:600}' +
      '.sx-c rect{fill:rgba(43,31,20,.07);stroke:rgba(43,31,20,.45);stroke-width:1.3;transition:fill .08s}.sx-c text{font-size:16px;font-weight:600}.sx-c.dale rect{fill:rgba(201,138,43,.75)}' +
      '.sx-cur{stroke:#b5482b;stroke-width:2.5}';
    document.head.appendChild(s);
  }
  async function explica(caja, op, ctl) {
    const L = U.lineas(op, 'explica'); if (!L.length) return;
    estiloExplica();
    const xs = [X0 + 10, X0 + 85, X0 + 160, X0 + 235];                       // corcheas «rectas» (media parte de pulso cada una)
    const xw = [X0 + 10, X0 + 110, X0 + 160, X0 + 260];                      // con swing: 2/3 y 1/3 de pulso
    const x3 = [X0 + 10, X0 + 60, X0 + 110, X0 + 160, X0 + 210, X0 + 260];   // la rejilla del tresillo
    const ficha = B.el('div', 'sw-explica'); caja.appendChild(ficha);
    ficha.innerHTML = '<svg viewBox="0 0 600 190">' +
      '<g class="sx-p" data-p="0"><text class="sx-l" x="20" y="72">se escribe</text>' + corcheas(xs, 80) + '<text class="sx-t" x="470" y="72">¿cómo?</text></g>' +
      '<g class="sx-p" data-p="1"><text class="sx-l" x="20" y="146">recto</text>' + cajas(124, [.5, .5, .5, .5], ['ta', 'ta', 'ta', 'ta'], 'r') + '<text class="sx-l" x="470" y="146">iguales</text></g>' +
      '<g class="sx-p" data-p="2"><text class="sx-l" x="20" y="182">swing</text>' + cajas(160, [2 / 3, 1 / 3, 2 / 3, 1 / 3], ['taaa', 'ta', 'taaa', 'ta'], 's') + '<text class="sx-l" x="470" y="182">larga y corta</text></g>' +
      '<g class="sx-p" data-p="3">' + x3.map((x, k) => '<line x1="' + (X0 + k * P / 3) + '" x2="' + (X0 + k * P / 3) + '" y1="156" y2="194" stroke="#b5482b" stroke-width="1.2" stroke-dasharray="3 3" opacity=".7"/>').join('') + '</g>' +
      '<line class="sx-cur" x1="' + X0 + '" x2="' + X0 + '" y1="116" y2="194" opacity="0"/>' +
      '</svg>';
    const svg = ficha.querySelector('svg'), cur = ficha.querySelector('.sx-cur');
    const pon = (...ps) => B.$$('.sx-p', ficha).forEach(g => g.classList.toggle('on', ps.includes(+g.dataset.p)));
    /* paso 3: el tresillo (tres corcheas, las dos primeras ligadas) en lugar de las corcheas escritas */
    const tres = '<g class="sx-p" data-p="4"><text class="sx-l" x="20" y="72">tresillo</text>' +
      [0, 3].map(o => cab(x3[o], 80) + cab(x3[o + 1], 80) + cab(x3[o + 2], 80) + plica(x3[o], 80) + plica(x3[o + 1], 80) + plica(x3[o + 2], 80) + '<path d="M' + (x3[o] + 7.3) + ' 34H' + (x3[o + 2] + 9.5) + 'v7.5H' + (x3[o] + 7.3) + 'Z" fill="' + TINTA + '"/>' + tresillo(x3[o] + 2, x3[o + 2] + 16, 14) + liga(x3[o], x3[o + 1], 80)).join('') + '<text class="sx-t" x="470" y="62">1.ª y 2.ª</text><text class="sx-t" x="470" y="88">pegadas</text></g>';
    /* paso 4: la equivalencia que se pone al principio de las partituras de swing */
    const igual = '<g class="sx-p" data-p="5"><text class="sx-l" x="70" y="18">se escribe</text>' + corcheas([90, 140], 100) +
      '<text x="215" y="92" font-size="40" text-anchor="middle" fill="' + TINTA + '">=</text><text class="sx-l" x="296" y="18">se toca</text>' +
      cab(285, 100) + plica(285, 100) + cab(345, 100) + plica(345, 100) + '<path d="M353.4 54q16 9 9 26" fill="none" stroke="' + TINTA + '" stroke-width="2.6"/>' + tresillo(285, 362, 38) +
      '<text class="sx-t" x="410" y="80">negra + corchea</text><text class="sx-t" x="410" y="108">en tresillo</text></g>';
    svg.insertAdjacentHTML('beforeend', tres + igual);
    /* cursor a 100 bpm sobre las cajas visibles */
    let vivo = true, fila = null; const t0 = performance.now();
    (function bucle() {
      if (!vivo) return; requestAnimationFrame(bucle);
      if (!fila) { cur.setAttribute('opacity', 0); return; }
      const b = ((performance.now() - t0) / 600) % 2, x = X0 + b * P;
      cur.setAttribute('x1', x); cur.setAttribute('x2', x); cur.setAttribute('opacity', 1);
      B.$$('.sx-c.' + fila, ficha).forEach(c => { const t = +c.dataset.t, d = b - t; c.classList.toggle('dale', d >= 0 && d < .16); });
    })();
    ctl.alMorir.push(() => { vivo = false; });
    requestAnimationFrame(() => ficha.classList.add('on'));
    const pasos = [() => { pon(0); fila = null; }, () => { pon(0, 1); fila = 'r'; }, () => { pon(0, 1, 2); fila = 's'; }, () => { pon(4, 1, 2, 3); fila = 's'; }, () => { pon(5); fila = null; }, () => { pon(5); fila = null; }];
    for (let k = 0; k < L.length; k++) { (pasos[k] || pasos[pasos.length - 1])(); await U.di(L[k], ctl); if (ctl.muerto) { vivo = false; return; } }
    await B.espera(.8, ctl); ficha.classList.remove('on'); await B.espera(.5, ctl); vivo = false; ficha.remove();
  }
  B.inter.swing = async function (caja, op) {
    const ctl = op.ctl;
    await explica(caja, op, ctl); if (ctl.muerto) return;
    U.fondo(caja);
    const arriba = U.panel(caja, { left: '8%', right: '8%', top: '5%' });
    arriba.innerHTML = '<div class="i-tit">Tocar con swing</div><div class="i-enun">Está escrito en corcheas iguales… pero se toca largo-corto.</div><div class="sw-ind" style="display:flex;align-items:center;gap:calc(var(--u)*.8);margin-top:calc(var(--u)*.6);color:var(--oro-hi,#E9CD8A)"><span style="font-size:calc(var(--u)*1.1);letter-spacing:.14em;font-weight:600">SWING</span><svg viewBox="0 0 110 46" style="height:calc(var(--u)*3.4)" fill="currentColor" stroke="currentColor"><ellipse cx="12" cy="38" rx="5.6" ry="4" transform="rotate(-20 12 38)" stroke="none"/><ellipse cx="32" cy="38" rx="5.6" ry="4" transform="rotate(-20 32 38)" stroke="none"/><path d="M17 37V12M37 37V12" stroke-width="1.6" fill="none"/><rect x="16.2" y="11" width="21.6" height="4.4" stroke="none"/><path d="M47 23h10M47 29h10" stroke-width="1.6" fill="none"/><ellipse cx="72" cy="38" rx="5.6" ry="4" transform="rotate(-20 72 38)" stroke="none"/><ellipse cx="94" cy="38" rx="5.6" ry="4" transform="rotate(-20 94 38)" stroke="none"/><path d="M77 37V14M99 37V14" stroke-width="1.6" fill="none"/><path d="M99 14q9 6 5 16" stroke-width="2" fill="none"/><path d="M71 9V5h9M91 5h10v4" stroke-width="1.2" fill="none"/><text x="85.5" y="9" font-size="9" font-style="italic" text-anchor="middle" stroke="none">3</text></svg><span style="font-size:calc(var(--u)*1.2);opacity:.85">dos corcheas escritas se tocan como negra + corchea en tresillo</span></div>' +
      '<div class="notas-c" style="display:flex;gap:calc(var(--u)*.5);margin:calc(var(--u)*1) 0"></div><div class="i-estado res"></div>';
    const fila = arriba.querySelector('.notas-c');
    /* (Iago, 20-oct) en PARTITURA, no con etiquetas de nombres de nota */
    const NOMB = { 65: 'F4', 67: 'G4', 69: 'A4', 71: 'B4', 72: 'C5', 74: 'D5' };
    fila.style.display = 'block'; fila.style.maxWidth = 'calc(var(--u)*42)'; fila.style.background = '#F6F1E6'; fila.style.borderRadius = 'calc(var(--u)*.6)'; fila.style.padding = 'calc(var(--u)*.4) calc(var(--u)*.8)';
    fila.innerHTML = B.compasMini(C1.map(([m, d]) => [NOMB[m] || 'G4', d]));
    const bts = B.el('div', 'dialogo'); arriba.appendChild(bts);
    const oye = sw => { U.frase(C1, { inst: INST(), bpm: 100, swing: sw, ctl, alNota: i => { B.$$('.mn-n', fila).forEach((c, j) => c.classList.toggle('on', j === i)); } }); };
    bts.appendChild(U.boton('Sin swing', 'peq', () => oye(.5)));
    bts.appendChild(U.boton('Con swing', 'peq', () => oye(.67)));
    const abajo = U.panel(caja, { left: '8%', right: '8%', bottom: '16%', padding: 'calc(var(--u)*.8)' });   /* (20-oct, p. 10) teclas más largas: el teclado crece 4u y baja un poco */
    const tec = B.teclado(abajo, { desde: 60, hasta: 79, inst: INST(), ctl });
    tec.marca([65, 67, 71], 'perm');
    const pie = B.el('div', 'i-pie'); caja.appendChild(pie);
    const res = arriba.querySelector('.res');
    let intentos = 0, ataques = null;
    tec.alPulsar.push((m, t) => { if (ataques) ataques.push(t); });
    const intenta = async () => {
      intentos++;
      res.textContent = 'Claqueta… y entra en el 1. (Intento ' + intentos + ' de 3)';
      const p = .6, t0 = B.ahora() + .3;
      for (let b = 0; b < 4; b++) B.sint.baqueta(t0 + b * p, b ? .6 : .9);
      const tIni = t0 + 4 * p;
      for (let b = 0; b < 4; b++) B.sint.baqueta(tIni + b * p, .35);
      await B.espera(tIni - B.ahora() - .25, ctl); ataques = [];
      await B.espera(4 * p + .4, ctl);
      if (ctl.muerto) return;
      const t = ataques; ataques = null;
      if (t.length < 5) { res.textContent = 'Necesito al menos las cinco primeras notas (Sol Fa Sol Si Sol).'; return; }
      const r = mide(t);
      B.inter.swing.ultima = r;
      const js = r.map(juicio);
      if (js.every(j => j[0] === 'ok')) U.suelta(U.rota(op, 'swing'), ctl, 4);
      else if (js.some(j => j[1].indexOf('recto') === 0)) U.suelta(U.rota(op, 'recto'), ctl, 4.5);
      res.innerHTML = r.map((x, k) => { const j = juicio(x); return 'Par ' + (k + 1) + ': <b style="color:' + (j[0] === 'ok' ? 'var(--ok)' : j[0] === 'mal' ? 'var(--mal)' : 'var(--oro-hi)') + '">' + x.toFixed(1).replace('.', ',') + ' : 1 · ' + j[1] + '</b>'; }).join(' &nbsp; ');
    };
    const bt = U.boton('Probar yo', '', async () => { bt.disabled = true; await intenta(); bt.disabled = intentos >= 3; });
    pie.appendChild(bt);
    if (!await U.seguir(caja, ctl, 'Seguir', pie)) return;
    await U.dice(op, 'fin', ctl);
  };
  B.inter.swing.mide = mide;
  B.inter.swing.claves = ['explica', 'recto', 'swing', 'fin'];
  B.inter.swing.subtAbajo = true;   // (C1, ronda 6) el teclado está abajo: la frase de quien habla, abajo también
})(window.BLUES);
