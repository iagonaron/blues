/* ══════════════════════════════════════════════════════════════════════
   BLUES · instrumentos
   B.inst.toca(nombre, midi, {t, dur, vel, bend, bendMs, wa, dest}) → voz
   con .parar(t). Si hay muestras en inst/<nombre>/<midi>.mp3 se usa la
   más cercana con playbackRate; si no, síntesis provisional.
   Instrumentos: acordeon · armonica · piano · guitarra · trompeta ·
   contrabajo. Más B.sint: percusiones, efectos y ambientes sintéticos.
   ══════════════════════════════════════════════════════════════════════ */
'use strict';
(function (B) {
  const I = B.inst = {};
  const S = B.sint = {};
  const reg = n => B.vivo(n, 'plano');

  /* ── muestreador ─────────────────────────────────────────────── */
  /* (20-oct) las muestras pueden venir sueltas (B.RECURSOS) o empaquetadas como la voz (data/instpaq.js → B.VOZPAQ) */
  const claves = () => Object.keys(B.RECURSOS || {}).concat(Object.keys(B.VOZPAQ || {}));
  function muestras(nombre) {
    if (!B.RECURSOS) return [];
    const re = new RegExp('^inst/' + nombre + '/(\\d+)\\.(mp3|ogg|opus|wav)$');
    return claves().map(r => { const m = r.match(re); return m ? { m: +m[1], r } : null; }).filter(Boolean);
  }
  I.rutas = () => B.RECURSOS ? claves().filter(r => /^inst\/(?!paq\/)[^/]+\/[\w-]+\.\w+$/.test(r) && B.existe(r)) : [];   // notas y golpes sueltos (los paquetes los carga y recorta nucleo.js)
  /* volumen de cada muestra para que suene como la síntesis de antes (RMS de cada paquete ≈ 0,09) */
  const GAN = { acordeon: .54, armonica: .46, piano: .76, guitarra: .86, trompeta: .42, contrabajo: .6 };
  function porMuestra(nombre, midi, o) {
    const lista = muestras(nombre).filter(x => B.buf[x.r]);
    if (!lista.length) return null;
    let mejor = lista[0]; lista.forEach(x => { if (Math.abs(x.m - midi) < Math.abs(mejor.m - midi)) mejor = x; });
    const C = B.ac(), t = o.t || C.currentTime, s = C.createBufferSource(), g = C.createGain();
    s.buffer = B.buf[mejor.r];
    const rate = Math.pow(2, (midi - mejor.m) / 12);
    if (o.bend) { s.playbackRate.setValueAtTime(rate * Math.pow(2, -o.bend / 12), t); s.playbackRate.exponentialRampToValueAtTime(rate, t + (o.bendMs || 150) / 1000); }
    else s.playbackRate.value = rate;
    const v = (o.vel == null ? 1 : o.vel) * (GAN[nombre] || .6);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v, t + .01);
    s.connect(g); g.connect(o.dest || B.bus.inst); s.start(t, B.VOZPAQ && B.VOZPAQ[mejor.r] ? .02 : 0); reg(s);   // (las recortadas de un paquete traen 20 ms de margen delante)
    const voz = { parar(tt) { tt = Math.max(tt || C.currentTime, t + .02); g.gain.setTargetAtTime(0, tt, .06); try { s.stop(tt + .5); } catch (e) { } } };
    if (o.dur) voz.parar(t + o.dur);
    return voz;
  }

  /* ── utilidades de síntesis ─────────────────────────────────── */
  function env(g, t, at, v) { g.gain.cancelScheduledValues(t); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v, t + at); }
  function vozDe(C, nodos, g, t, rel) {
    let parada = false;
    const voz = {
      parar(tt) {
        if (parada) return; parada = true;
        tt = Math.max(tt || C.currentTime, t + .02);
        g.gain.cancelScheduledValues(tt); g.gain.setTargetAtTime(0, tt, rel || .05);
        nodos.forEach(n => { try { n.stop(tt + (rel || .05) * 8 + .05); } catch (e) { } });
      }
    };
    return voz;
  }
  function osc(C, tipo, f, t) { const o = C.createOscillator(); o.type = tipo; o.frequency.setValueAtTime(f, t); reg(o); return o; }
  function aplicaBend(o, f, t, bend, ms) {
    if (!bend) return;
    o.frequency.setValueAtTime(f * Math.pow(2, -bend / 12), t);
    o.frequency.exponentialRampToValueAtTime(f, t + (ms || 150) / 1000);
  }

  /* ── acordeón: dos dientes de sierra desafinados + filtro + trémolo ── */
  function acordeon(m, o) {
    const C = B.ac(), t = o.t || C.currentTime, f = B.frec(m), v = .13 * (o.vel == null ? 1 : o.vel);
    const g = C.createGain(), lp = C.createBiquadFilter(), pk = C.createBiquadFilter(), tg = C.createGain();
    lp.type = 'lowpass'; lp.frequency.value = Math.min(5200, f * 5 + 700); lp.Q.value = .8;
    pk.type = 'peaking'; pk.frequency.value = 1350; pk.gain.value = 5; pk.Q.value = 1.1;
    tg.gain.value = 1;
    const o1 = osc(C, 'sawtooth', f * .9966, t), o2 = osc(C, 'sawtooth', f * 1.0034, t), o3 = osc(C, 'square', f / 2, t);
    const g3 = C.createGain(); g3.gain.value = .18;
    aplicaBend(o1, f * .9966, t, o.bend, o.bendMs); aplicaBend(o2, f * 1.0034, t, o.bend, o.bendMs);
    const lfo = osc(C, 'sine', 5.6, t), lg = C.createGain(); lg.gain.value = .11; lfo.connect(lg); lg.connect(tg.gain);
    o1.connect(lp); o2.connect(lp); o3.connect(g3); g3.connect(lp); lp.connect(pk); pk.connect(tg); tg.connect(g); g.connect(o.dest || B.bus.inst);
    env(g, t, .035, v); g.gain.setTargetAtTime(v * .88, t + .06, .2);
    [o1, o2, o3, lfo].forEach(n => n.start(t));
    const voz = vozDe(C, [o1, o2, o3, lfo], g, t, .045);
    if (o.dur) voz.parar(t + o.dur);
    return voz;
  }
  /* ── armónica: cuadrada filtrada, vibrato, aire y bend ── */
  function armonica(m, o) {
    const C = B.ac(), t = o.t || C.currentTime, f = B.frec(m), v = .16 * (o.vel == null ? 1 : o.vel);
    const g = C.createGain(), lp = C.createBiquadFilter(), bp = C.createBiquadFilter();
    lp.type = 'lowpass'; lp.frequency.value = Math.min(3600, f * 3.2 + 400); lp.Q.value = 1.2;
    bp.type = 'peaking'; bp.frequency.value = 1100; bp.gain.value = 7; bp.Q.value = 1.4;
    const o1 = osc(C, 'square', f, t), o2 = osc(C, 'sawtooth', f * 1.002, t), g2 = C.createGain(); g2.gain.value = .35;
    aplicaBend(o1, f, t, o.bend, o.bendMs); aplicaBend(o2, f * 1.002, t, o.bend, o.bendMs);
    const lfo = osc(C, 'sine', 5.2, t), lg = C.createGain();
    lg.gain.setValueAtTime(0, t); lg.gain.linearRampToValueAtTime(f * .012, t + .45);
    lfo.connect(lg); lg.connect(o1.frequency); lg.connect(o2.frequency);
    const r = B.ruido(), rb = C.createBiquadFilter(), rg = C.createGain(); rb.type = 'bandpass'; rb.frequency.value = 2400; rb.Q.value = .9; rg.gain.value = .05;
    r.connect(rb); rb.connect(rg); rg.connect(g); reg(r);
    o1.connect(lp); o2.connect(g2); g2.connect(lp); lp.connect(bp); bp.connect(g); g.connect(o.dest || B.bus.inst);
    env(g, t, .045, v); g.gain.setTargetAtTime(v * .82, t + .08, .25);
    [o1, o2, lfo, r].forEach(n => n.start(t));
    const voz = vozDe(C, [o1, o2, lfo, r], g, t, .06);
    if (o.dur) voz.parar(t + o.dur);
    return voz;
  }
  /* ── piano (el del portal viejo: parciales con caída + macillo) ── */
  const PARC = [[1, 1, 1], [2, .36, .74], [3, .15, .58], [4, .082, .45], [5, .04, .35], [6, .022, .29], [8, .011, .22]];
  function piano(m, o) {
    const C = B.ac(), t = o.t || C.currentTime, f0 = B.frec(m), v = .2 * (o.vel == null ? 1 : o.vel), dur = o.dur || 1.2;
    const out = C.createGain(); out.gain.value = 1;
    const lp = C.createBiquadFilter(); lp.type = 'lowpass'; lp.Q.value = .35;
    lp.frequency.setValueAtTime(Math.min(9500, f0 * 15), t); lp.frequency.exponentialRampToValueAtTime(Math.max(760, f0 * 4.2), t + Math.min(2.4, dur + .9));
    out.connect(lp); lp.connect(o.dest || B.bus.inst);
    const nodos = [];
    PARC.forEach(([mul, amp, dk]) => {
      const fr = f0 * mul * Math.sqrt(1 + .00042 * mul * mul); if (fr > 17000) return;
      const os = osc(C, 'sine', fr, t), ga = C.createGain();
      ga.gain.setValueAtTime(0, t); ga.gain.linearRampToValueAtTime(v * amp, t + .005);
      ga.gain.exponentialRampToValueAtTime(Math.max(.00002, v * amp * .0009), t + (dur + 1.25) * dk);
      os.connect(ga); ga.connect(out); os.start(t); os.stop(t + (dur + 1.3) * dk + .05); nodos.push(os);
    });
    const s = B.ruido(), bp = C.createBiquadFilter(), ng = C.createGain();
    bp.type = 'bandpass'; bp.frequency.value = Math.min(6200, f0 * 5.5);
    ng.gain.setValueAtTime(0, t); ng.gain.linearRampToValueAtTime(v * .55, t + .002); ng.gain.exponentialRampToValueAtTime(.0001, t + .05);
    s.connect(bp); bp.connect(ng); ng.connect(out); s.start(t); s.stop(t + .08); reg(s);
    return { parar(tt) { tt = Math.max(tt || C.currentTime, t + .05); out.gain.setTargetAtTime(0, tt, .12); } };
  }
  /* ── guitarra acústica: Karplus-Strong precalculado (cacheado por nota) ── */
  const KS = {};
  function bufKS(m) {
    if (KS[m]) return KS[m];
    const C = B.ac(), sr = C.sampleRate, f = B.frec(m), N = Math.max(2, Math.round(sr / f));
    const largo = Math.floor(sr * 2.6), d = new Float32Array(largo);
    const dec = Math.pow(.001, 1 / (sr * (m < 50 ? 3.2 : m < 64 ? 2.4 : 1.7)));   // caída en el tiempo
    for (let i = 0; i < N; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / N * .3);
    let lp = 0; for (let i = 0; i < N; i++) { lp = lp * .5 + d[i] * .5; d[i] = lp; }      // púa un poco blanda
    for (let i = N; i < largo; i++) d[i] = (d[i - N] * .5 + d[i - N + 1 < i ? i - N + 1 : i - N] * .5) * dec;
    const b = C.createBuffer(1, largo, sr); b.copyToChannel ? b.copyToChannel(d, 0) : b.getChannelData(0).set(d);
    KS[m] = { b, rate: f * N / sr };
    return KS[m];
  }
  function guitarra(m, o) {
    const C = B.ac(), t = o.t || C.currentTime, k = bufKS(m), v = .55 * (o.vel == null ? 1 : o.vel);
    const s = C.createBufferSource(), g = C.createGain(), cu = C.createBiquadFilter(), hs = C.createBiquadFilter();
    s.buffer = k.b; s.playbackRate.value = k.rate;
    if (o.bend) { s.playbackRate.setValueAtTime(k.rate * Math.pow(2, -o.bend / 12), t + .02); s.playbackRate.exponentialRampToValueAtTime(k.rate, t + .02 + (o.bendMs || 160) / 1000); }
    cu.type = 'peaking'; cu.frequency.value = 210; cu.gain.value = 5; cu.Q.value = 1.2;
    hs.type = 'highshelf'; hs.frequency.value = 3800; hs.gain.value = -7;
    g.gain.value = v; s.connect(cu); cu.connect(hs); hs.connect(g); g.connect(o.dest || B.bus.inst);
    s.start(t); reg(s);
    const voz = { parar(tt) { tt = Math.max(tt || C.currentTime, t + .03); g.gain.setTargetAtTime(0, tt, .08); try { s.stop(tt + .6); } catch (e) { } } };
    if (o.dur) voz.parar(t + o.dur);
    return voz;
  }
  /* ── trompeta con sordina de desatascador (wa-wa) ── */
  function trompeta(m, o) {
    const C = B.ac(), t = o.t || C.currentTime, f = B.frec(m), v = .12 * (o.vel == null ? 1 : o.vel);
    const g = C.createGain(), lp = C.createBiquadFilter(), wa = C.createBiquadFilter(), hp = C.createBiquadFilter();
    const o1 = osc(C, 'sawtooth', f, t);
    aplicaBend(o1, f, t, o.bend, o.bendMs || 170);
    const lfo = osc(C, 'sine', 5.6, t), lg = C.createGain();
    lg.gain.setValueAtTime(0, t); lg.gain.linearRampToValueAtTime(f * .009, t + .35); lfo.connect(lg); lg.connect(o1.frequency);
    lp.type = 'lowpass'; lp.Q.value = 2;
    lp.frequency.setValueAtTime(f * 1.5, t); lp.frequency.exponentialRampToValueAtTime(Math.min(7000, f * 7), t + .06); lp.frequency.setTargetAtTime(Math.min(5200, f * 4.5), t + .08, .15);
    wa.type = 'bandpass'; wa.Q.value = 2.6;
    if (o.wa) { wa.frequency.setValueAtTime(600, t); wa.frequency.exponentialRampToValueAtTime(1700, t + Math.min(.5, (o.dur || .4) * .7)); }
    else wa.frequency.value = 1500;
    hp.type = 'highpass'; hp.frequency.value = 280;
    o1.connect(lp); lp.connect(wa); wa.connect(hp); hp.connect(g); g.connect(o.dest || B.bus.inst);
    env(g, t, .035, v * 2.2); g.gain.setTargetAtTime(v * 1.7, t + .05, .1);
    o1.start(t); lfo.start(t);
    const voz = vozDe(C, [o1, lfo], g, t, .05);
    if (o.dur) voz.parar(t + o.dur);
    return voz;
  }
  /* ── contrabajo (el del portal viejo) ── */
  function contrabajo(m, o) {
    const C = B.ac(), t = o.t || C.currentTime, f0 = B.frec(m), v = .33 * (o.vel == null ? 1 : o.vel), dur = o.dur || .5;
    const out = C.createGain(); out.gain.value = 1;
    const lp = C.createBiquadFilter(); lp.type = 'lowpass'; lp.Q.value = 2.6;
    lp.frequency.setValueAtTime(Math.min(2800, f0 * 18), t); lp.frequency.exponentialRampToValueAtTime(Math.max(170, f0 * 3.2), t + .22);
    const cu = C.createBiquadFilter(); cu.type = 'peaking'; cu.frequency.value = 108; cu.Q.value = 1; cu.gain.value = 4.5;
    out.connect(lp); lp.connect(cu); cu.connect(o.dest || B.bus.inst);
    const a = C.createGain(); a.gain.value = 0; a.connect(out);
    a.gain.setValueAtTime(0, t); a.gain.linearRampToValueAtTime(v, t + .016); a.gain.setTargetAtTime(v * .52, t + .06, .1); a.gain.setTargetAtTime(0, t + dur * .74, dur * .15);
    const o1 = osc(C, 'triangle', f0 * 1.045, t), o2 = osc(C, 'sawtooth', f0 * 1.045, t), g2 = C.createGain(); g2.gain.value = .26;
    [o1, o2].forEach(x => { x.frequency.exponentialRampToValueAtTime(f0, t + .05); x.start(t); x.stop(t + dur + .4); });
    o1.connect(a); o2.connect(g2); g2.connect(a);
    const s = B.ruido(), bp = C.createBiquadFilter(), ng = C.createGain(); bp.type = 'bandpass'; bp.frequency.value = 1400; bp.Q.value = .8;
    ng.gain.setValueAtTime(0, t); ng.gain.linearRampToValueAtTime(v * .3, t + .002); ng.gain.exponentialRampToValueAtTime(.0002, t + .05);
    s.connect(bp); bp.connect(ng); ng.connect(out); s.start(t); s.stop(t + .07); reg(s);
    return { parar() { } };
  }
  const SINT = { acordeon, armonica, piano, guitarra, trompeta, contrabajo };
  I.toca = function (nombre, midi, o) {
    o = o || {};
    try { return porMuestra(nombre, midi, o) || (SINT[nombre] || piano)(midi, o); }
    catch (e) { console.warn(e); return { parar() { } }; }
  };
  I.NOMBRES = Object.keys(SINT);

  /* ══════════ percusiones y efectos sintéticos ══════════ */
  function golpeRuido(t, o) {
    const C = B.ac(), s = B.ruido(o.rate), f = C.createBiquadFilter(), g = C.createGain();
    f.type = o.tipo || 'bandpass'; f.frequency.value = o.f || 2000; f.Q.value = o.q || .8;
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(o.v, t + (o.at || .002)); g.gain.exponentialRampToValueAtTime(.0003, t + (o.dec || .1));
    s.connect(f); f.connect(g); g.connect(o.dest || B.bus.banda); s.start(t); s.stop(t + (o.dec || .1) + .05); reg(s);
  }
  /* tabla de lavar: raspado (rizos metálicos) o golpe de dedal */
  S.tabla = function (t, tipo, vel, dest) {
    const v = (vel == null ? 1 : vel);
    if (tipo === 'golpe') {
      const C = B.ac();
      [3150, 4720, 6930].forEach((fr, k) => {
        const o = osc(C, 'square', fr * B.azar(.99, 1.01), t), g = C.createGain();
        g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.025 * v / (k + 1), t + .001); g.gain.exponentialRampToValueAtTime(.0002, t + .05);
        o.connect(g); g.connect(dest || B.bus.banda); o.start(t); o.stop(t + .07);
      });
      golpeRuido(t, { v: .12 * v, f: 5200, q: 1.2, dec: .035, dest });
    } else {
      for (let k = 0; k < 7; k++) golpeRuido(t + k * .009, { v: (.07 - k * .006) * v, f: 3600, q: 1.1, dec: .018 + k * .002, dest });
    }
  };
  /* la maleta de Buster con escobillas */
  S.maleta = function (t, tipo, vel, dest) {
    const C = B.ac(), v = (vel == null ? 1 : vel);
    if (tipo === 'bombo') {
      const o = osc(C, 'sine', 95, t), g = C.createGain();
      o.frequency.exponentialRampToValueAtTime(48, t + .09);
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.55 * v, t + .004); g.gain.exponentialRampToValueAtTime(.0005, t + .22);
      o.connect(g); g.connect(dest || B.bus.banda); o.start(t); o.stop(t + .25);
      golpeRuido(t, { v: .1 * v, f: 420, q: .7, dec: .06, dest, tipo: 'lowpass' });
    } else golpeRuido(t, { v: .1 * v, f: 2600, q: .5, at: .018, dec: .2, dest });
  };
  S.palma = function (t, vel, dest) { const v = (vel == null ? 1 : vel); [0, .007, .015].forEach((d, k) => golpeRuido(t + d, { v: (.32 - k * .07) * v, f: 1150 + k * 160, q: 1.4, dec: .06 + k * .01, dest: dest || B.bus.sfx })); };
  S.baqueta = function (t, vel, dest) {
    const C = B.ac(), v = (vel == null ? 1 : vel) * .42;
    golpeRuido(t, { v, f: 2450, q: 2.4, dec: .075, dest: dest || B.bus.banda });
    const o = osc(C, 'triangle', 880, t), b = C.createGain(); o.frequency.exponentialRampToValueAtTime(520, t + .04);
    b.gain.setValueAtTime(0, t); b.gain.linearRampToValueAtTime(v * .55, t + .002); b.gain.exponentialRampToValueAtTime(.0004, t + .06);
    o.connect(b); b.connect(dest || B.bus.banda); o.start(t); o.stop(t + .08);
  };
  S.pala = function (t, vel) {
    const v = (vel == null ? 1 : vel);
    for (let k = 0; k < 9; k++) golpeRuido(t + k * .018 + Math.random() * .01, { v: (.22 - k * .018) * v, f: 900 + Math.random() * 1500, q: .9, dec: .05, dest: B.bus.sfx });
    golpeRuido(t, { v: .18 * v, f: 2900, q: 3, dec: .16, dest: B.bus.sfx });
  };
  S.metal = function (t, vel) {
    const C = B.ac(), v = (vel == null ? 1 : vel);
    [523, 1213, 1987, 2890].forEach((fr, k) => { const o = osc(C, 'sine', fr, t), g = C.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.09 * v / (k + 1), t + .002); g.gain.exponentialRampToValueAtTime(.0002, t + .55 - k * .08); o.connect(g); g.connect(B.bus.sfx); o.start(t); o.stop(t + .6); });
    golpeRuido(t, { v: .2 * v, f: 3000, q: .8, dec: .05, dest: B.bus.sfx });
  };
  const VOC = { a: [730, 1090, 2440], e: [530, 1840, 2480], i: [270, 2290, 3010], o: [570, 840, 2410], u: [300, 870, 2240] };
  S.voz = function (m, t, dur, vel, vocal, dest) {
    const C = B.ac(), f0 = B.frec(m), v = (vel == null ? 1 : vel) * .5, F = VOC[vocal || 'o'];
    const o = osc(C, 'sawtooth', f0, t), mez = C.createGain(); mez.gain.value = 0;
    F.forEach((fr, i) => { const bp = C.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = fr; bp.Q.value = 8 - i * 2; const gg = C.createGain(); gg.gain.value = [1, .42, .18][i]; o.connect(bp); bp.connect(gg); gg.connect(mez); });
    const lp = C.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 3400; mez.connect(lp); lp.connect(dest || B.bus.sfx);
    mez.gain.setValueAtTime(0, t); mez.gain.linearRampToValueAtTime(v, t + .05); mez.gain.setTargetAtTime(v * .85, t + .1, .2); mez.gain.setTargetAtTime(0, t + dur * .8, dur * .18);
    o.frequency.setValueAtTime(f0 * 1.04, t); o.frequency.exponentialRampToValueAtTime(f0, t + .08);
    o.start(t); o.stop(t + dur + .4);
  };
  /* «¡Ho!» de los fogoneros: un coro grave, corto */
  S.ho = function (t, vel) { [43, 47, 50, 55, 38].forEach((m, k) => S.voz(m + (Math.random() < .5 ? 0 : 0), t + k * .012, .36, (vel == null ? 1 : vel) * (.55 - k * .05), 'o')); };
  /* Amos canta la llamada (una sílaba larga y otra corta) */
  S.canta = function (notas, t, dur, vel, vocal) { notas.forEach((m, k) => S.voz(m, t + k * dur, dur * .95, vel, vocal || 'a', B.bus.sfx)); };
  /* puerta de hierro que chirría al abrirse */
  S.puerta = function (t, dur) {
    const C = B.ac(), o = osc(C, 'sawtooth', 70, t), bp = C.createBiquadFilter(), g = C.createGain();
    o.frequency.setValueAtTime(70, t); o.frequency.linearRampToValueAtTime(140, t + dur * .6); o.frequency.linearRampToValueAtTime(95, t + dur);
    bp.type = 'bandpass'; bp.frequency.setValueAtTime(700, t); bp.frequency.linearRampToValueAtTime(1300, t + dur); bp.Q.value = 9;
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.16, t + .08); g.gain.setTargetAtTime(0, t + dur * .85, .08);
    o.connect(bp); bp.connect(g); g.connect(B.bus.sfx); o.start(t); o.stop(t + dur + .3);
    golpeRuido(t + dur, { v: .3, f: 180, q: .7, dec: .25, dest: B.bus.sfx, tipo: 'lowpass' });
  };
  /* aire del fuelle */
  S.fuelle = function (t, dur, vol) { golpeRuido(t, { v: (vol || .25), f: 650, q: .6, at: dur * .4, dec: dur, dest: B.bus.sfx }); };
  /* bucles continuos: rugido de calderas, murmullo de público, crepitar de disco */
  function bucleRuido(o) {
    const C = B.ac(), s = B.ruido(o.rate), f = C.createBiquadFilter(), g = C.createGain(), am = C.createGain();
    f.type = o.tipo || 'lowpass'; f.frequency.value = o.f; f.Q.value = o.q || .7;
    am.gain.value = 1;
    const lfo = osc(C, 'sine', o.lfo || .3, C.currentTime), lg = C.createGain(); lg.gain.value = o.prof || .2; lfo.connect(lg); lg.connect(am.gain);
    g.gain.setValueAtTime(0, C.currentTime); g.gain.linearRampToValueAtTime(o.vol, C.currentTime + (o.fade || 1));
    s.connect(f); f.connect(am); am.connect(g); g.connect(o.dest || B.bus.amb); s.start(); lfo.start();
    return { gan: g, vol(v, tc) { g.gain.setTargetAtTime(v, B.ahora(), tc || .5); }, parar(fd) { const tt = B.ahora(); g.gain.setTargetAtTime(0, tt, (fd || .6) / 3); try { s.stop(tt + (fd || .6) * 2); lfo.stop(tt + (fd || .6) * 2); } catch (e) { } } };
  }
  S.rugido = vol => bucleRuido({ f: 260, q: .9, lfo: .17, prof: .35, vol: vol == null ? .35 : vol, rate: .6 });
  S.murmullo = vol => bucleRuido({ f: 520, q: .5, tipo: 'bandpass', lfo: 1.7, prof: .45, vol: vol == null ? .2 : vol, dest: B.bus.sfx });
  S.crepitar = function (vol) {
    const C = B.ac(); let vivo = true;
    const silb = bucleRuido({ f: 5200, q: .4, tipo: 'bandpass', lfo: .08, prof: .1, vol: .018 * (vol || 1), fade: 2 });
    function chasquido() {
      if (!vivo) return;
      const t = C.currentTime + .05;
      if (!B.pausado) golpeRuido(t, { v: B.azar(.02, .09) * (vol || 1), f: B.azar(1800, 6000), q: 1.5, dec: B.azar(.004, .012), dest: B.bus.amb });
      setTimeout(chasquido, B.azar(40, 260));
    }
    chasquido();
    return { parar() { vivo = false; silb.parar(1); } };
  };
  /* filtro de cilindro de cera: paso banda 300–3000 Hz + ruido + chasquidos */
  S.cilindro = function () {
    const C = B.ac(), ent = C.createGain(), hp = C.createBiquadFilter(), lp = C.createBiquadFilter(), pk = C.createBiquadFilter();
    hp.type = 'highpass'; hp.frequency.value = 300; hp.Q.value = .9; lp.type = 'lowpass'; lp.frequency.value = 3000; lp.Q.value = .9;
    pk.type = 'peaking'; pk.frequency.value = 1400; pk.gain.value = 6; pk.Q.value = .8;
    ent.connect(hp); hp.connect(lp); lp.connect(pk); pk.connect(B.bus.sfx);
    /* (20-oct, punto 59) el chisporroteo del cilindro, de verdad (sfx/d4/cilindro.mp3) si está cargado; si no, el sintético */
    if (B.buf && B.buf['sfx/d4/cilindro.mp3']) { const h = B.suena('sfx/d4/cilindro.mp3', { bus: B.bus.sfx, vol: .55, bucle: true, fade: .3 }); return { entrada: ent, parar() { if (h && h.parar) h.parar(.5); } }; }
    const cr = S.crepitar(1.6), sopl = bucleRuido({ f: 1800, q: .5, tipo: 'bandpass', lfo: .9, prof: .3, vol: .05, dest: B.bus.sfx });
    return { entrada: ent, parar() { cr.parar(); sopl.parar(.5); } };
  };
  /* efectos que faltan: silencio (como dice la especificación) */
  S.efecto = function () { };

  /* (20-oct, punto 59 de Iago: «nada sintetizado provisional») percusión con MUESTRAS si están (inst/perc/<golpe>_<n>.mp3,
     de herramientas/muestras_perc.py): tabla de lavar, maleta con escobillas, palmas y baquetas. Si no hay, la síntesis de antes. */
  const GP = { tabla_golpe: .35, tabla_raspa: .45, maleta_bombo: .8, maleta_escoba: .45, palma: .7, baqueta: .55 };
  function golpe(n) { const L = claves().filter(r => r.indexOf('inst/perc/' + n + '_') === 0 && B.buf[r]); return L.length ? L[Math.floor(Math.random() * L.length)] : null; }
  function suenaGolpe(r, t, v, dest) {
    const C = B.ac(), s = C.createBufferSource(), g = C.createGain(); s.buffer = B.buf[r]; g.gain.value = v;
    s.playbackRate.value = B.azar ? B.azar(.985, 1.015) : 1; s.connect(g); g.connect(dest); s.start(t || C.currentTime, B.VOZPAQ && B.VOZPAQ[r] ? .02 : 0); reg(s);
  }
  ['tabla', 'maleta'].forEach(k => { const f = S[k]; S[k] = function (t, tipo, vel, dest) { const n = k + '_' + tipo, r = golpe(n); if (!r) return f.apply(this, arguments); suenaGolpe(r, t, (vel == null ? 1 : vel) * GP[n], dest || B.bus.banda); }; });
  ['palma', 'baqueta'].forEach(k => { const f = S[k]; S[k] = function (t, vel, dest) { const r = golpe(k); if (!r) return f.apply(this, arguments); suenaGolpe(r, t, (vel == null ? 1 : vel) * GP[k], dest || (k === 'palma' ? B.bus.sfx : B.bus.banda)); }; });
})(window.BLUES);
