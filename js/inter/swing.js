/* BLUES · swing (P2.4): el primer compás del tema (Sol Fa Sol Si en corcheas, Sol Sol en negras)
   escrito en corcheas iguales; «Sin swing» / «Con swing» para oírlo; luego el alumno lo toca sobre la
   claqueta y se mide cada par de corcheas (objetivo ~2:1; swing 1,5–3,2; «recto» < 1,3). 3 intentos. */
'use strict';
(function (B) {
  const U = B.iu;
  const C1 = [[67, .5], [65, .5], [67, .5], [71, .5], [67, 1], [67, 1]];
  function mide(t) {   // t: ataques de las 4 corcheas + la negra siguiente → proporciones de los dos pares
    const r = []; for (let k = 0; k < 2; k++) { const a = t[2 * k + 1] - t[2 * k], b = t[2 * k + 2] - t[2 * k + 1]; r.push(b > 0 ? a / b : 0); }
    return r;
  }
  const juicio = x => x >= 1.5 && x <= 3.2 ? ['ok', '¡con swing!'] : x < 1.3 ? ['mal', 'recto (iguales)'] : x > 3.2 ? ['mal', 'demasiado cojo'] : ['', 'casi'];
  B.inter.swing = async function (caja, op) {
    const ctl = op.ctl;
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
    const oye = sw => { U.frase(C1, { inst: 'acordeon', bpm: 100, swing: sw, ctl, alNota: i => { B.$$('.mn-n', fila).forEach((c, j) => c.classList.toggle('on', j === i)); } }); };
    bts.appendChild(U.boton('Sin swing', 'peq', () => oye(.5)));
    bts.appendChild(U.boton('Con swing', 'peq', () => oye(.67)));
    const abajo = U.panel(caja, { left: '8%', right: '8%', bottom: '16%', padding: 'calc(var(--u)*.8)' });   /* (20-oct, p. 10) teclas más largas: el teclado crece 4u y baja un poco */
    const tec = B.teclado(abajo, { desde: 60, hasta: 79, inst: 'acordeon', ctl });
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
  B.inter.swing.claves = ['recto', 'swing', 'fin'];
})(window.BLUES);
