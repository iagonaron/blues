/* ══════════════════════════════════════════════════════════════════════
   BLUES · la banda del porche
   Bucles de 12 compases: I7 I7 I7 I7 | IV7 IV7 I7 I7 | V7 IV7 I7 V7.
   Pistas: guitarra (Eli) · tabla (Ruby) · contrabajo (Odell) ·
   trompeta (Teddy) · acordeon (Xan) · click. Tonos G · F · Bb.
   Por día (data/diaN.js → "banda"): { "sin": ["acordeon"] } = esa pista no
   suena ese día (día 5: la banda de cuatro, sin Xan). Si falta el acordeón y
   tocaba el tema, lo toma la trompeta de Teddy (trompeta_melodia /
   trompeta_huecos) para que siga habiendo melodía guía.
   Ficheros: banda/<tono>/<pista>_<variante>.mp3, exactamente 12 compases
   a B.TEMPO con B.BANDA_PRE (0,1 s) de silencio delante. Si no están,
   síntesis (la banda provisional, heredera de la del portal viejo).
   Programación con anticipación: encadena sin cortes y avisa en cada
   compás y en cada pulso (para encender la partitura y la rejilla).
   ══════════════════════════════════════════════════════════════════════ */
'use strict';
(function (B) {
  const BD = B.banda = { tocando: false };
  const REJ = [0, 0, 0, 0, 5, 5, 0, 0, 7, 5, 0, 7];            // sobre la tónica
  const DESPL = { G: 0, F: -2, Bb: 3 };                         // la banda respecto a lo escrito (Sol)
  BD.TONOS = { Do: 'G', Sib: 'F', Mib: 'Bb' };
  BD.NOMBRE_TONO = { G: 'Sol', F: 'Fa', Bb: 'Si♭' };
  BD.PISTAS = ['guitarra', 'tabla', 'contrabajo', 'trompeta', 'acordeon', 'click'];
  BD.MUSICO = { guitarra: 'ELI', tabla: 'RUBY', contrabajo: 'ODELL', trompeta: 'TEDDY', acordeon: 'XAN' };
  let sin = [];
  BD.config = function (c) { sin = (c && typeof c === 'object' && Array.isArray(c.sin)) ? c.sin.slice() : []; };
  BD.sin = () => sin.slice();
  /* las pistas que suenan de verdad (quitando las que ese día no están) */
  BD.efectivas = function (p) {
    const o = Object.assign({}, p || {});
    if (sin.indexOf('acordeon') >= 0 && o.acordeon) {
      if ((o.acordeon === 'tema' || o.acordeon === 'huecos') && sin.indexOf('trompeta') < 0) o.trompeta = o.acordeon === 'tema' ? 'melodia' : 'huecos';
      delete o.acordeon;
    }
    sin.forEach(k => { delete o[k]; });
    return o;
  };
  /* quién toca (para las chapas de los músicos) */
  BD.musicos = p => Object.keys(BD.efectivas(p)).map(k => BD.MUSICO[k]).filter(Boolean);
  const ruta = (ton, p, v) => 'banda/' + ton + '/' + p + '_' + v + '.mp3';
  BD.ruta = ruta;
  BD.rutas = function () { return B.RECURSOS ? Object.keys(B.RECURSOS).filter(r => /^banda\//.test(r) && !sin.some(k => r.indexOf('/' + k + '_') >= 0)) : []; };

  let run = null;
  BD.tocar = function (cfg) {
    BD.parar();
    const C = B.ac();
    cfg = Object.assign({ ton: 'G', bpm: B.TEMPO, swing: .67, claqueta: true, vueltas: 0 }, cfg || {});
    const salida = C.createGain(); salida.gain.value = cfg.vol == null ? 1 : cfg.vol; salida.connect(B.bus.banda);
    const gp = {}; BD.PISTAS.forEach(p => { gp[p] = C.createGain(); gp[p].gain.value = 1; gp[p].connect(salida); });
    const r = run = { cfg, salida, gp, idx: 0, t0: 0, vivo: true, fuentes: [], ctl: B.control(), fin: false };
    const pulso = () => 60 / cfg.bpm;
    r.p = pulso();
    let t = C.currentTime + .25;
    if (cfg.claqueta) {
      const p = r.p;
      [[0, 1], [2, 1], [4, .85], [5, .85], [6, .85], [7, .85]].forEach(([b, g], k) => {
        B.sint.baqueta(t + b * p, g, gp.click);
        B.enTiempo(t + b * p, () => { if (r.vivo && cfg.alEntrada) cfg.alEntrada(k); }, r.ctl);
      });
      t += 8 * p;
      B.enTiempo(t - .01, () => { if (r.vivo && cfg.alEntrada) cfg.alEntrada(-1); }, r.ctl);
    }
    r.t0 = t; r.tSig = t;
    BD.tocando = true;
    r.lazo = setInterval(() => tic(r), 25); tic(r);
    if (cfg.alEstado) cfg.alEstado(true);
    return r;
  };
  BD.parar = function () {
    if (!run) return;
    const r = run; run = null; r.vivo = false; clearInterval(r.lazo); r.ctl.matar();
    const C = B.ac(), t = C.currentTime;
    try { r.salida.gain.cancelScheduledValues(t); r.salida.gain.setTargetAtTime(0, t, .03); } catch (e) { }
    r.fuentes.forEach(s => { try { s.stop(t + .2); } catch (e) { } });
    setTimeout(() => { try { r.salida.disconnect(); } catch (e) { } }, 1500);
    BD.tocando = false;
    if (r.cfg.alEstado) r.cfg.alEstado(false);
  };
  BD.mezcla = function (pista, on) { if (run && run.gp[pista]) run.gp[pista].gain.setTargetAtTime(on ? 1 : 0, B.ahora(), .05); };
  BD.ahora = () => run ? { compas: run.compasAct, vuelta: run.vueltaAct } : null;
  BD.run = () => run;

  function pistasDe(r, v) {
    const p = typeof r.cfg.pistas === 'function' ? r.cfg.pistas(v) : r.cfg.pistas;
    return BD.efectivas(p || { guitarra: 'base' });
  }
  function tic(r) {
    if (!r.vivo || B.pausado) return;
    const C = B.ac(), p = r.p, compas = 4 * p;
    while (r.tSig < C.currentTime + .35) {
      const idx = r.idx, i = idx % 12, v = Math.floor(idx / 12), t = r.tSig;
      if (r.cfg.vueltas && v >= r.cfg.vueltas) { if (!r.fin) { r.fin = true; final(r, t); } return; }
      const pistas = pistasDe(r, v);
      if (i === 0) Object.keys(pistas).forEach(k => {      // ficheros: un bucle entero de golpe
        const va = pistas[k]; if (!va) return;
        const rr = ruta(r.cfg.ton, k, va);
        if (B.buf[rr]) { const s = C.createBufferSource(); s.buffer = B.buf[rr]; s.connect(r.gp[k]); s.start(t, B.BANDA_PRE); r.fuentes.push(s); }
      });
      Object.keys(pistas).forEach(k => { const va = pistas[k]; if (va && !B.buf[ruta(r.cfg.ton, k, va)]) sintetiza(r, k, va, i, t); });
      B.enTiempo(t, () => { if (!r.vivo) return; r.compasAct = i; r.vueltaAct = v; if (r.cfg.alCompas) r.cfg.alCompas(i, v, t); }, r.ctl);
      for (let b = 0; b < 4; b++) B.enTiempo(t + b * p, () => { if (r.vivo && r.cfg.alPulso) r.cfg.alPulso(b, i, v, t + b * p); }, r.ctl);
      r.tSig += compas; r.idx++;
    }
  }
  /* ── la banda sintetizada, compás a compás ── */
  function sintetiza(r, pista, va, i, t) {
    const p = r.p, sw = p * r.cfg.swing, d = DESPL[r.cfg.ton] || 0;
    const raiz = B.mod12(7 + REJ[i] + d);                 // clase de altura de la fundamental
    const dest = r.gp[pista];
    const remate = [t + sw, t + p, t + p + sw];           // compás 12: los tres golpes del tema
    if (pista === 'guitarra') {
      const R = 40 + B.mod12(raiz - 4);                   // Mi2…Re♯3
      if (i === 11) { remate.forEach(tt => { [R, R + 7, R + 10].forEach(m => B.inst.toca('guitarra', m, { t: tt, dur: .22, vel: .8, dest })); }); return; }
      const fig = [7, 7, 9, 9, 10, 10, 9, 9];
      for (let k = 0; k < 8; k++) {
        const tt = t + Math.floor(k / 2) * p + (k % 2 ? sw : 0), g = k % 2 ? .55 : .8;
        B.inst.toca('guitarra', R, { t: tt, dur: k % 2 ? p - sw : sw * .95, vel: g, dest });
        B.inst.toca('guitarra', R + fig[k], { t: tt + .004, dur: k % 2 ? p - sw : sw * .95, vel: g * .8, dest });
      }
    } else if (pista === 'tabla') {
      if (i === 11) { remate.forEach(tt => { B.sint.tabla(tt, 'golpe', 1.1, dest); B.sint.tabla(tt, 'raspa', .9, dest); }); return; }
      for (let b = 0; b < 4; b++) {
        const tb = t + b * p;
        B.sint.tabla(tb, b % 2 ? 'golpe' : 'raspa', b % 2 ? 1 : .7, dest);
        B.sint.tabla(tb + sw, 'raspa', .45, dest);
        if (b % 2) B.sint.maleta(tb, 'escoba', .5, dest); else B.sint.maleta(tb, 'bombo', b ? .5 : .7, dest);
      }
    } else if (pista === 'contrabajo') {
      const base = 40 + B.mod12(raiz - 4);
      if (i === 11) { remate.forEach(tt => B.inst.toca('contrabajo', base, { t: tt, dur: p * .42, dest })); return; }
      let notas;
      if (i === 2) notas = [0, 4, 7, 9].map((x, k) => ({ m: base + x, o: k * p, d: p * .94 }));
      else if (i === 3) notas = [10, 9, 7, 4].map((x, k) => ({ m: base + x, o: k * p, d: p * .94 }));
      else notas = [{ m: base, o: 0, d: p * .94 }, { m: base + 4, o: p, d: p * .94 }, { m: base + 5, o: 2 * p, d: p * .94 }, { m: base + 7, o: 3 * p, d: sw * .9 }, { m: base + 5, o: 3 * p + sw, d: (p - sw) * .94 }];
      notas.forEach(n => B.inst.toca('contrabajo', n.m, { t: t + n.o, dur: n.d, vel: .95, dest }));
    } else if (pista === 'trompeta') {
      if (va === 'tema' || va === 'relleno') {
        if (i % 2 === 1 && i !== 11) {                    // contesta en los huecos del tema
          const R = 64 + B.mod12(raiz - 4);
          [[2, 10, .5], [2 + r.cfg.swing, 9, .33], [3, 7, .85]].forEach(([b, x, du], k) => B.inst.toca('trompeta', R + x, { t: t + b * p, dur: du * p, vel: .8, wa: k === 2, bend: k === 2 ? 1 : 0, dest }));
        }
        if (i === 11) remate.forEach(tt => B.inst.toca('trompeta', 64 + B.mod12(raiz - 4) + 7, { t: tt, dur: p * .35, vel: .9, dest }));
      } else if (va === 'solo') {
        if (i % 4 === 0) B.inst.toca('trompeta', 64 + B.mod12(raiz - 4) + 4, { t: t, dur: p * 3.5, vel: .35, wa: true, dest });
      } else if (va === 'melodia' || va === 'huecos') {     // día 5: Teddy toma el tema (sin el acordeón de Xan)
        B.TEMA[i].forEach(e => {
          if (!e.n) return;
          if (va === 'huecos' && B.BORRADOS && B.BORRADOS.includes(i)) return;   // compases borrados: los inventa el alumno
          const tt = t + Math.floor(e.t) * p + (e.t % 1 ? sw : 0);
          B.inst.toca('trompeta', e.n.midi + d, { t: tt, dur: Math.max(.12, e.dur * p * .8), vel: e.ac ? .85 : .7, wa: e.dur >= 2, dest });
        });
      }
    } else if (pista === 'acordeon') {
      if (va === 'tema' || va === 'huecos') {
        B.TEMA[i].forEach(e => {
          if (!e.n) return;
          if (va === 'huecos' && B.BORRADOS && B.BORRADOS.includes(i)) return;   // compases borrados: los inventa el alumno
          const tt = t + Math.floor(e.t) * p + (e.t % 1 ? sw : 0);
          B.inst.toca('acordeon', e.n.midi + d, { t: tt, dur: Math.max(.12, e.dur * p * .82), vel: e.ac ? 1 : .85, dest });
        });
      } else if (va === 'acomp') {
        const v = [4, 10, 7].map(x => { let m = 55 + B.mod12(raiz + x - 55); return m; });
        [[0, 1.6], [2, 1.6]].forEach(([b, du]) => v.forEach(m => B.inst.toca('acordeon', m, { t: t + b * p, dur: du * p, vel: .42, dest })));
      }
    } else if (pista === 'click') {
      for (let b = 0; b < 4; b++) B.sint.baqueta(t + b * p, b ? .45 : .7, dest);
    }
  }
  function final(r, t) {
    const d = DESPL[r.cfg.ton] || 0, raiz = B.mod12(7 + d), R = 40 + B.mod12(raiz - 4), pistas = pistasDe(r, 99);
    if (pistas.guitarra) [R, R + 7, R + 10, R + 16, R + 19].forEach((m, k) => B.inst.toca('guitarra', m, { t: t + k * .025, dur: 2.4, vel: .8, dest: r.gp.guitarra }));
    if (pistas.contrabajo) B.inst.toca('contrabajo', R, { t, dur: 2, dest: r.gp.contrabajo });
    if (pistas.acordeon) [4, 10, 7].forEach(x => B.inst.toca('acordeon', 55 + B.mod12(raiz + x - 55), { t, dur: 2.2, vel: .6, dest: r.gp.acordeon }));
    if (pistas.trompeta) B.inst.toca('trompeta', 64 + B.mod12(raiz - 4) + 7, { t, dur: 2, vel: .7, bend: 1, dest: r.gp.trompeta });
    if (pistas.tabla) for (let k = 0; k < 10; k++) B.sint.tabla(t + k * .03, 'raspa', 1 - k * .08, r.gp.tabla);
    B.enTiempo(t + 2.6, () => { if (run === r) { const f = r.cfg.alFin; BD.parar(); if (f) f(); } }, r.ctl);
  }
})(window.BLUES);
