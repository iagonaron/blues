/* ══════════════════════════════════════════════════════════════════════
   BLUES · piezas comunes de las interacciones
   Cada interacción es B.inter.<tipo>(contenedor, opciones) → Promise.
   opciones.ctl es su control: al cambiar de plano se «mata» y todo lo
   que registró en ctl.alMorir se limpia (sonidos, teclas, bucles).
   ══════════════════════════════════════════════════════════════════════ */
'use strict';
(function (B) {
  const U = B.iu = {};
  U.panel = function (caja, pos, cls) {
    const p = B.el('div', 'ipanel ' + (cls || ''));
    Object.keys(pos || {}).forEach(k => p.style[k] = pos[k]);
    caja.appendChild(p); return p;
  };
  U.boton = function (txt, cls, fn) {
    const b = B.el('button', 'bt ' + (cls || ''), txt);
    if (fn) b.addEventListener('click', e => { e.stopPropagation(); B.ac(); fn(e); });
    return b;
  };
  U.fondo = caja => { const f = B.el('div', 'ifondo'); caja.appendChild(f); return f; };
  /* botón «Seguir» (también con Espacio/Intro); devuelve una promesa */
  U.seguir = function (caja, ctl, txt, donde) {
    return new Promise(res => {
      const pie = donde || caja.querySelector('.i-pie') || (() => { const p = B.el('div', 'i-pie'); caja.appendChild(p); return p; })();
      const b = U.boton((txt || 'Seguir') + ' ' + B.motor.ICO.play, 'prim aparece');
      b.dataset.seguir = '1';
      let hecho = false;
      const fin = () => { if (hecho) return; hecho = true; quita(); res(true); };
      b.addEventListener('click', e => { e.stopPropagation(); fin(); });
      pie.appendChild(b);
      const quita = B.captura.poner(e => { if (e.key === ' ' || e.key === 'Enter') { fin(); return true; } return false; });
      ctl.alMorir.push(() => { quita(); res(false); });
    });
  };
  /* decir líneas desde una interacción (subtítulo + voz si está) */
  U.di = (l, ctl) => B.motor.di(l, ctl, { noSaltable: false });
  U.lineas = function (op, clave, def) { const L = (op.lineas && op.lineas[clave]) || def; return B.arr(L).map(x => typeof x === 'string' ? { quien: 'NARR', texto: x } : x); };
  U.unaDe = (op, clave, def) => { const L = U.lineas(op, clave, def); return L[Math.floor(Math.random() * L.length)]; };
  /* reacciones del guion: op.lineas[clave] = [líneas] (las pone guion2datos.mjs desde «reacciones»).
     U.hay: ¿hay alguna? · U.rota: la siguiente de la lista (vuelve a empezar) · U.dice: las dice todas, en orden */
  U.hay = (op, clave) => !!(op.lineas && B.arr(op.lineas[clave]).length);
  U.rota = function (op, clave, def) {
    const L = U.lineas(op, clave, def); if (!L.length) return null;
    op._rota = op._rota || {}; const k = op._rota[clave] || 0; op._rota[clave] = k + 1; return L[k % L.length];
  };
  U.dice = async function (op, clave, ctl, def, o) {
    for (const l of U.lineas(op, clave, def)) { await B.motor.di(l, ctl, o); if (ctl.muerto) return false; }
    return true;
  };
  /* una línea «de paso» mientras sigue la interacción (no espera; dura como mucho «max» s) */
  U.suelta = (l, ctl, max) => { if (l) B.motor.di(l, ctl, { max: max || 3.2 }); };
  /* esperar a que el reloj (que se congela en pausa) llegue */
  U.espera = (s, ctl) => B.espera(s, ctl);
  /* tocar una frase: [[midi, pulsos, {bend}], …], con swing; alNota(i, t) al sonar cada nota */
  U.frase = function (notas, o) {
    o = Object.assign({ bpm: 96, swing: .64, inst: 'armonica', t: B.ahora() + .15 }, o || {});
    const p = 60 / o.bpm; let b = 0; const tiempos = [];
    notas.forEach((n, i) => {
      const [m, dur, x] = n;
      const fr = b % 1, tb = Math.floor(b) + (Math.abs(fr - .5) < .01 ? o.swing : fr);
      const t = o.t + tb * p;
      tiempos.push(t);
      if (m != null) {
        B.inst.toca(o.inst, m, Object.assign({ t, dur: Math.max(.14, dur * p * .9), vel: o.vel || .95, dest: o.dest }, x || {}));
        if (o.alNota) B.enTiempo(t, () => o.alNota(i, t, m), o.ctl);
      }
      b += dur;
    });
    return { tiempos, fin: o.t + b * p };
  };
  /* chips de notas (para ver la conversación) */
  U.chips = function (cont, midis, color, fin) {
    cont.innerHTML = '';
    midis.forEach((m, i) => { const c = B.el('span', 'nota-ch' + (fin && i === midis.length - 1 ? ' fin' : ''), B.nombre(m)); c.style.setProperty('--c', color); cont.appendChild(c); });
  };
  /* selector Do / Si♭ / Mi♭ (la banda cambia de tono; la partitura no) */
  U.transp = function (cont, alCambiar) {
    const caja = B.el('div', 'i-transp');
    caja.style.cssText = 'display:flex;align-items:center;gap:calc(var(--u)*.4)';
    const et = B.el('span', '', 'Tu instrumento'); et.style.cssText = 'font-family:var(--f-ui);font-size:calc(var(--u)*.75);letter-spacing:.2em;text-transform:uppercase;color:var(--crema3);margin-right:calc(var(--u)*.3)';
    caja.appendChild(et);
    const act = B.lee('blues5_transp', 'Do');
    [['Do', 'Do'], ['Sib', 'Si♭'], ['Mib', 'Mi♭']].forEach(([k, t]) => {
      const b = U.boton(t, 'peq' + (k === act ? ' sel' : ''), () => { B.guarda('blues5_transp', k); B.$$('button', caja).forEach(x => x.classList.toggle('sel', x === b)); alCambiar && alCambiar(k); });
      b.dataset.tip = k === 'Do' ? 'Instrumento en Do: la banda en Sol' : k === 'Sib' ? 'Instrumento en Si♭: la banda en Fa' : 'Instrumento en Mi♭: la banda en Si♭';
      b.dataset.k = k; caja.appendChild(b);
    });
    cont.appendChild(caja);
    return () => B.lee('blues5_transp', 'Do');
  };
  U.tono = () => B.banda.TONOS[B.lee('blues5_transp', 'Do')] || 'G';
  /* rejilla de 12 compases */
  U.rejilla = function (cont) {
    const r = B.el('div', 'rejilla');
    B.ACORDES.forEach((a, i) => { const c = B.el('div', 'rc', a); c.dataset.i = i; r.appendChild(c); });
    cont.appendChild(r);
    return { el: r, marca(i) { B.$$('.rc', r).forEach(c => c.classList.toggle('on', +c.dataset.i === i)); } };
  };
  /* pips de la claqueta (dos blancas y cuatro negras) */
  U.pips = function (cont) {
    const p = B.el('div', 'pulsos pips'); p.style.gap = 'calc(var(--u)*.35)';
    for (let k = 0; k < 6; k++) { const d = B.el('div', 'pl'); d.style.cssText = 'width:calc(var(--u)*' + (k < 2 ? 2.4 : 1.4) + ');height:calc(var(--u)*1.4);font-size:0'; p.appendChild(d); }
    cont.appendChild(p);
    return { el: p, k(k) { B.$$('.pl', p).forEach((d, j) => d.classList.toggle('on', k >= 0 && j <= k)); } };
  };
  /* de un tiempo real dentro del compás (en pulsos) al tiempo escrito (corcheas iguales) */
  U.escrito = function (b, swing) {
    const e = Math.floor(b), f = b - e, s = swing || .67;
    return e + (f < s ? f * (.5 / s) : .5 + (f - s) * (.5 / (1 - s)));
  };

  /* ══════════ vista de un hito (también la usan los pasos de la sala de práctica) ══════════ */
  const HITOS = {
    1: { modo: 'manuscrito', tit: 'Hito 1 · El tema con swing', enun: 'Toca el tema con tu instrumento, con swing, junto a Eli y Xan.', pistas: { guitarra: 'base', acordeon: 'tema' }, musicos: ['ELI', 'XAN'] },
    2: { modo: 'notasLargas', tit: 'Hito 2 · Notas largas', enun: 'En cada compás, elige una nota del acorde y tócala larga (una redonda).', pistas: { guitarra: 'base', tabla: 'base', acordeon: 'tema' }, musicos: ['ELI', 'RUBY', 'XAN'] },
    3: { modo: 'finalesBorrados', tit: 'Hito 3 · Los finales', enun: 'Toca el tema; donde está borrado, inventa tú el final con las notas de la escala.', pistas: { guitarra: 'base', tabla: 'base', contrabajo: 'base', acordeon: 'huecos' }, musicos: ['ELI', 'RUBY', 'ODELL', 'XAN'] }
  };
  U.HITOS = HITOS;
  U.vistaHito = function (caja, n, ctl, o) {
    o = o || {};
    const H = HITOS[n];
    const papel = U.panel(caja, { left: '5%', right: '5%', top: o.arriba || '4%', padding: 'calc(var(--u)*1.1) calc(var(--u)*1.4)' });
    const cab = B.el('div', '', '<div class="i-tit">' + H.tit + '</div><div class="i-enun" style="font-size:calc(var(--u)*1.45)">' + H.enun + '</div>');
    cab.style.marginBottom = 'calc(var(--u)*.7)';
    papel.appendChild(cab);
    const pt = B.partitura(papel, { modo: H.modo, manuscrito: true, cabecera: true });   // título: «Blues de John» tachado + «A nana de Xan» · 1912
    pt.caja.style.borderRadius = 'calc(var(--u)*.3)'; pt.caja.style.overflow = 'hidden';
    const barra = B.el('div', 'i-pie-izq'); caja.appendChild(barra);
    const pips = U.pips(barra);
    const musicos = B.el('div', 'dialogo'); barra.appendChild(musicos);
    (B.banda.musicos ? B.banda.musicos(H.pistas) : H.musicos).forEach(q => { const P = B.personaje(q); const c = B.el('span', 'chapa', P.corto); c.style.setProperty('--c', P.color); c.style.fontSize = 'calc(var(--u)*.75)'; musicos.appendChild(c); });
    const pie = B.el('div', 'i-pie'); caja.appendChild(pie);
    const transp = U.transp(pie, () => { if (B.banda.tocando) arranca(); });
    const btTocar = U.boton(B.motor.ICO.play + ' Tocar con la banda', '', () => { if (B.banda.tocando) { B.banda.parar(); } else arranca(); });
    const btOtra = U.boton('↺', 'ico', () => arranca()); btOtra.dataset.tip = 'Otra vez';
    pie.appendChild(btOtra); pie.appendChild(btTocar);
    let tC = 0, iC = -1, p = 60 / B.TEMPO, vueltasHechas = 0;
    const quitaF = B.alFotograma(t => {
      if (!B.banda.tocando || iC < 0) return;
      const b = (t - tC) / p;
      if (b >= 0 && b < 4.05) pt.sigue(iC, U.escrito(b));
    });
    ctl.alMorir.push(() => { quitaF(); B.banda.parar(); });
    function arranca() {
      B.banda.tocar({
        ton: U.tono(), bpm: B.TEMPO, claqueta: true, vueltas: o.vueltas || 2, pistas: H.pistas,
        alEntrada: k => pips.k(k),
        alCompas: (i, v, t) => { iC = i; tC = t; pt.compas(i); if (i === 0 && v > 0) vueltasHechas = v; },
        alEstado: on => { btTocar.innerHTML = on ? '■ Parar' : B.motor.ICO.play + ' Tocar con la banda'; btTocar.classList.toggle('sel', on); if (!on) { pt.apaga(); iC = -1; pips.k(-1); } },
        alFin: () => { vueltasHechas++; if (o.alFin) o.alFin(); }
      });
    }
    return { pt, pie, barra, arranca, papel };
  };
})(window.BLUES);
