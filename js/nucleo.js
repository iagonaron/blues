/* ══════════════════════════════════════════════════════════════════════
   BLUES · núcleo
   Espacio de nombres, reloj, audio (un solo AudioContext), recursos,
   precarga y progreso. Todo el tiempo del portal va con el reloj del
   AudioContext: al pausar se suspende y se congela TODO a la vez
   (voces, música, banda, esperas, Ken Burns e interacciones).
   ══════════════════════════════════════════════════════════════════════ */
'use strict';
window.BLUES = window.BLUES || {};
(function (B) {
  B.VERSION = '2026-10-20';
  B.TEMPO = 100;          // bpm de la banda del porche (shuffle tranquilo)
  B.BANDA_PRE = 0.1;      // silencio que llevan delante los ficheros de banda/
  B.DIAS = {};
  B.inter = B.inter || {};
  B.dia = function (n, d) { d.n = n; (d.planos || []).forEach(p => { p.dia = n; }); B.DIAS[n] = d; };

  /* ── utilidades ─────────────────────────────────────────────── */
  B.$ = (s, c) => (c || document).querySelector(s);
  B.$$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  B.el = function (tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  };
  B.clamp = (v, a, b) => v < a ? a : (v > b ? b : v);
  B.lerp = (a, b, t) => a + (b - a) * t;
  B.mod12 = n => ((n % 12) + 12) % 12;
  B.frec = m => 440 * Math.pow(2, (m - 69) / 12);
  B.azar = (a, b) => a + Math.random() * (b - a);
  B.suave = t => .5 - .5 * Math.cos(Math.PI * B.clamp(t, 0, 1));
  B.arr = x => x == null ? [] : (Array.isArray(x) ? x : [x]);
  /* nombres en español; el blues se escribe con Si♭ y Fa♯ */
  B.NOM = ['Do', 'Do♯', 'Re', 'Mi♭', 'Mi', 'Fa', 'Fa♯', 'Sol', 'La♭', 'La', 'Si♭', 'Si'];
  B.nombre = m => B.NOM[B.mod12(m)];
  B.nombreOct = m => B.NOM[B.mod12(m)] + (Math.floor(m / 12) - 1);
  B.esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  B.fmtMB = b => (b / 1048576).toFixed(1).replace('.', ',') + ' MB';

  /* almacenamiento con red de seguridad (modo privado, previsualizaciones…) */
  B.guarda = function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } };
  B.lee = function (k, def) { try { const v = localStorage.getItem(k); return v == null ? def : JSON.parse(v); } catch (e) { return def; } };

  /* ══════════ AUDIO ══════════ */
  let AC = null;
  B.bus = {};
  B.pausado = false;
  B.ac = function () {
    if (!AC) {
      AC = new (window.AudioContext || window.webkitAudioContext)();
      const master = AC.createGain(); master.gain.value = .9;
      const comp = AC.createDynamicsCompressor();
      comp.threshold.value = -12; comp.knee.value = 20; comp.ratio.value = 3.5;
      comp.attack.value = .005; comp.release.value = .22;
      master.connect(comp); comp.connect(AC.destination);
      B.bus.master = master;
      /* reverberación de sala pequeña (respuesta sintética) */
      let revIn = null;
      try {
        const rev = AC.createConvolver(); rev.buffer = irSala(1.5, 2.8); rev.normalize = true;
        const rg = AC.createGain(); rg.gain.value = .26;
        const hp = AC.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 240;
        const lp = AC.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 5000;
        revIn = AC.createGain();
        revIn.connect(hp); hp.connect(rev); rev.connect(lp); lp.connect(rg); rg.connect(master);
      } catch (e) { revIn = null; }
      B.bus.rev = revIn;
      const mk = (vol, envio, pan) => {
        const g = AC.createGain(); g.gain.value = vol; let sal = g;
        if (pan && AC.createStereoPanner) { const p = AC.createStereoPanner(); p.pan.value = pan; g.connect(p); sal = p; }
        sal.connect(master);
        if (envio && revIn) { const s = AC.createGain(); s.gain.value = envio; sal.connect(s); s.connect(revIn); }
        return g;
      };
      B.bus.voz = mk(1.0, .04);
      B.bus.mus = mk(.85, .05);
      B.bus.amb = mk(.8, 0);
      B.bus.sfx = mk(.9, .08);
      B.bus.inst = mk(.9, .16);
      B.bus.banda = mk(.85, .14);
      /* el agachado de la música cuando habla alguien: −8 dB */
      B.bus.duck = AC.createGain(); B.bus.duck.gain.value = 1;
      B.bus.mus.disconnect(); B.bus.mus.connect(B.bus.duck); B.bus.duck.connect(master);
      B.bus.ambDuck = AC.createGain(); B.bus.ambDuck.gain.value = 1;
      B.bus.amb.disconnect(); B.bus.amb.connect(B.bus.ambDuck); B.bus.ambDuck.connect(master);
      const n = 2 * AC.sampleRate; B.ruidoBuf = AC.createBuffer(1, n, AC.sampleRate);
      const d = B.ruidoBuf.getChannelData(0); for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
    }
    if (AC.state === 'suspended' && !B.pausado) { try { AC.resume(); } catch (e) { } }
    return AC;
  };
  B.hayAudio = () => !!AC;
  function irSala(seg, caida) {
    const sr = AC.sampleRate, n = Math.floor(sr * seg), b = AC.createBuffer(2, n, sr);
    for (let c = 0; c < 2; c++) {
      const d = b.getChannelData(c);
      for (let i = 0; i < n; i++) { const t = i / n; d[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, caida) * (i < sr * .004 ? i / (sr * .004) : 1); }
      [.011, .019, .027, .041, .053].forEach((s, k) => { const p = Math.floor(sr * s) + (c ? 37 : 0); if (p < n) d[p] += (k % 2 ? -1 : 1) * (.55 - k * .08); });
    }
    return b;
  }
  B.agacha = function (on) {
    if (!AC) return;
    const t = AC.currentTime;
    B.bus.duck.gain.cancelScheduledValues(t);
    B.bus.duck.gain.setTargetAtTime(on ? .398 : 1, t, on ? .06 : .25);   // −8 dB
    B.bus.ambDuck.gain.cancelScheduledValues(t);
    B.bus.ambDuck.gain.setTargetAtTime(on ? .7 : 1, t, on ? .08 : .3);
  };
  /* fuente de ruido blanco (para síntesis de percusión, aire, ambiente) */
  B.ruido = function (rate) { const s = B.ac().createBufferSource(); s.buffer = B.ruidoBuf; s.loop = true; s.playbackRate.value = rate || B.azar(.94, 1.06); return s; };

  /* nodos vivos: para poder cortarlos todos al cambiar de plano */
  const vivos = new Set();
  B.vivo = function (n, grupo) { n._grupo = grupo || 'plano'; vivos.add(n); n.onended = () => vivos.delete(n); return n; };
  B.cortaVivos = function (grupo) {
    vivos.forEach(n => { if (!grupo || n._grupo === grupo) { try { n.stop(0); } catch (e) { } vivos.delete(n); } });
  };

  /* reproducir un búfer ya cargado */
  B.suena = function (ruta, o) {
    o = o || {};
    const buf = B.buf[ruta]; if (!buf) return null;
    const C = B.ac(), s = C.createBufferSource(), g = C.createGain();
    s.buffer = buf; s.loop = !!o.bucle;
    if (o.rate) s.playbackRate.value = o.rate;
    const vol = o.vol == null ? 1 : o.vol, t = o.t || C.currentTime;
    if (o.fade) { g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + o.fade); } else g.gain.value = vol;
    s.connect(g); g.connect(o.bus || B.bus.sfx);
    s.start(t, o.offset || 0);
    B.vivo(s, o.grupo);
    return {
      fuente: s, gan: g, dur: buf.duration,
      parar(f) { const tt = C.currentTime; try { g.gain.cancelScheduledValues(tt); g.gain.setValueAtTime(g.gain.value, tt); g.gain.linearRampToValueAtTime(0, tt + (f || .05)); s.stop(tt + (f || .05) + .02); } catch (e) { } }
    };
  };

  /* ambientes en bucle y música, con fundidos entre planos */
  const ambAct = new Map(); let musAct = null;
  B.ambiente = function (lista) {
    if (!AC) return;
    const nuevos = new Map(); B.arr(lista).forEach(a => { if (a && a.src && B.buf[a.src]) nuevos.set(a.src, a); });
    ambAct.forEach((h, src) => { if (!nuevos.has(src)) { h.parar(1.4); ambAct.delete(src); } });
    nuevos.forEach((a, src) => {
      if (ambAct.has(src)) { const h = ambAct.get(src); h.gan.gain.setTargetAtTime(a.vol == null ? .6 : a.vol, AC.currentTime, .4); return; }
      ambAct.set(src, B.suena(src, { bus: B.bus.amb, vol: a.vol == null ? .6 : a.vol, bucle: true, fade: 1.4, grupo: 'amb' }));
    });
  };
  B.musica = function (m) {
    if (!AC) return;
    if (m && musAct && musAct.src === m.src) return;
    if (musAct) { musAct.h.parar(1.6); musAct = null; }
    if (m && m.src && B.buf[m.src]) musAct = { src: m.src, h: B.suena(m.src, { bus: B.bus.mus, vol: m.vol == null ? .8 : m.vol, bucle: !!m.bucle, fade: .8, grupo: 'mus' }) };
  };
  B.silencioTotal = function () { B.ambiente([]); B.musica(null); };

  /* ══════════ RELOJ ══════════
     B.ahora() es el tiempo del AudioContext. Las esperas se resuelven
     cuando ese reloj llega; si se suspende (pausa), se congelan. */
  B.ahora = () => AC ? AC.currentTime : performance.now() / 1000;
  const esperas = new Set(), cuadros = new Set();
  B.control = function () {
    const c = {
      muerto: false, alMorir: [],
      matar() { if (c.muerto) return; c.muerto = true; c.alMorir.splice(0).forEach(f => { try { f(); } catch (e) { console.warn(e); } }); }
    };
    return c;
  };
  B.espera = function (seg, ctl) {
    return new Promise(res => {
      if (ctl && ctl.muerto) return res(false);
      esperas.add({ fin: B.ahora() + Math.max(0, seg), res, ctl });
    });
  };
  /* llama fn cuando el reloj llegue a t (tiempo absoluto del AudioContext) */
  B.enTiempo = function (t, fn, ctl) { esperas.add({ fin: t, res: () => fn(), ctl, cb: true }); };
  B.alFotograma = function (fn) { cuadros.add(fn); return () => cuadros.delete(fn); };
  function revisa() {
    const t = B.ahora();
    esperas.forEach(w => {
      if (w.ctl && w.ctl.muerto) { esperas.delete(w); if (!w.cb) w.res(false); }
      else if (t >= w.fin) { esperas.delete(w); try { w.res(true); } catch (e) { console.error(e); } }
    });
  }
  function bucle() {
    revisa();
    const t = B.ahora();
    cuadros.forEach(f => { try { f(t); } catch (e) { console.error(e); cuadros.delete(f); } });
    requestAnimationFrame(bucle);
  }
  requestAnimationFrame(bucle);
  setInterval(revisa, 25);          // por si el navegador frena requestAnimationFrame

  B.pausa = function (on) {
    if (on == null) on = !B.pausado;
    if (on === B.pausado) return;
    B.pausado = on;
    if (AC) { try { on ? AC.suspend() : AC.resume(); } catch (e) { } }
    const es = document.getElementById('escena');
    if (es) es.classList.toggle('pausado', on);
    (B.alPausar || []).forEach(f => { try { f(on); } catch (e) { } });
  };
  B.alPausar = [];

  /* ══════════ RECURSOS ══════════
     data/recursos.js (lo genera herramientas/inventario.mjs) dice qué
     ficheros existen y cuánto pesan. Lo que no está ahí se da por
     ausente y se sustituye por un provisional: así no hay peticiones
     que fallen ni errores en la consola. */
  B.RECURSOS = B.RECURSOS || null;
  B.buf = {};      // ruta → AudioBuffer
  B.img = {};      // ruta → URL lista para <img>
  /* (19-oct) PAQUETES DE VOZ: las frases de cada acto van juntas en unos pocos mp3 (voz/paq/dN_K.mp3, los
     hace herramientas/paquetes_voz.py) y data/vozpaq.js dice dónde está cada una: frase → [paquete, inicio, duración].
     Se carga el paquete, se recorta cada frase y queda en B.buf con su ruta de siempre: el resto del motor no cambia. */
  B.VOZPAQ = B.VOZPAQ || null;
  const tiene = (o, r) => !!(o && Object.prototype.hasOwnProperty.call(o, r));
  const enPaq = r => { const q = tiene(B.VOZPAQ, r) ? B.VOZPAQ[r] : null; return q && tiene(B.RECURSOS, q[0]) ? q : null; };
  const paqHechos = new Set();
  function recorta(paq, pb) {   // del paquete descodificado, una AudioBuffer por frase (±20 ms de margen: van separadas por 250 ms de silencio)
    const C = B.ac(), sr = pb.sampleRate, nc = pb.numberOfChannels;
    Object.keys(B.VOZPAQ).forEach(f => {
      const q = B.VOZPAQ[f]; if (q[0] !== paq || B.buf[f]) return;
      const i0 = Math.max(0, Math.round((q[1] - .02) * sr)), n = Math.min(pb.length - i0, Math.round((q[2] + .04) * sr));
      if (n <= 0) return;
      const b = C.createBuffer(nc, n, sr);
      for (let c = 0; c < nc; c++) b.getChannelData(c).set(pb.getChannelData(c).subarray(i0, i0 + n));
      B.buf[f] = b;
    });
    paqHechos.add(paq);
  }
  B.existe = r => !!(r && (tiene(B.RECURSOS, r) || enPaq(r)));
  B.esAudio = r => /\.(mp3|ogg|opus|wav|m4a|webm)$/i.test(r);
  B.esImagen = r => /\.(webp|jpe?g|png|avif|gif)$/i.test(r);
  B.precarga = async function (rutas, alProgreso) {
    const lista = Array.from(new Set(rutas.filter(Boolean)));
    const paqs = new Set(lista.filter(r => !B.buf[r] && enPaq(r)).map(r => enPaq(r)[0]).filter(p => !paqHechos.has(p)));
    const hay = lista.filter(r => !enPaq(r) && B.existe(r) && !B.buf[r] && !B.img[r]).concat(Array.from(paqs));
    const total = hay.reduce((a, r) => a + (B.RECURSOS[r] || 0), 0);
    let hecho = 0; const enCurso = {}; let turno = Promise.resolve();
    const avisa = () => { const parcial = Object.values(enCurso).reduce((a, b) => a + b, 0); alProgreso && alProgreso({ bytes: hecho + parcial, total, ficheros: hay.length, faltan: lista.filter(r => !B.existe(r) && !B.buf[r] && !B.img[r]).length }); };
    avisa();
    const cola = hay.slice();
    async function uno(r) {
      try {
        const resp = await fetch(r);
        if (!resp.ok) throw new Error('HTTP ' + resp.status);
        let datos;
        if (resp.body && resp.body.getReader) {
          const lec = resp.body.getReader(), trozos = []; let n = 0;
          for (; ;) { const { done, value } = await lec.read(); if (done) break; trozos.push(value); n += value.length; enCurso[r] = n; avisa(); }
          datos = new Blob(trozos);
        } else datos = await resp.blob();
        if (B.esAudio(r) && paqs.has(r)) {
          const ab = await datos.arrayBuffer();   // los paquetes se descodifican de uno en uno (cada uno ocupa mucha memoria hasta recortarlo)
          await (turno = turno.then(async () => recorta(r, await new Promise((ok, mal) => B.ac().decodeAudioData(ab, ok, mal))))
            .catch(e => console.warn('No se pudo descodificar', r, e && e.message)));
        } else if (B.esAudio(r)) {
          const ab = await datos.arrayBuffer();
          B.buf[r] = await new Promise((ok, mal) => B.ac().decodeAudioData(ab, ok, mal));
        } else if (B.esImagen(r)) {
          const url = URL.createObjectURL(datos);
          const im = new Image(); im.src = url;
          try { await im.decode(); } catch (e) { }
          B.img[r] = url;
        }
      } catch (e) { console.warn('No se pudo cargar', r, e && e.message); }
      delete enCurso[r]; hecho += (B.RECURSOS[r] || 0); avisa();
    }
    const obreros = []; for (let k = 0; k < 4; k++) obreros.push((async () => { while (cola.length) await uno(cola.shift()); })());
    await Promise.all(obreros);
    return { total, ficheros: hay.length };
  };

  /* ══════════ PROGRESO (localStorage, con try/catch) ══════════ */
  const KP = 'blues5_progreso_v1';
  B.progreso = {
    leer() { return B.lee(KP, { dias: {}, planos: {}, ultimo: null }); },
    plano(dia, idx, id) { const p = this.leer(); p.ultimo = { dia, plano: idx }; if (id) p.planos[id] = 1; B.guarda(KP, p); },
    dia(dia) { const p = this.leer(); p.dias[dia] = 1; p.ultimo = { dia: dia < 5 ? dia + 1 : dia, plano: 0, fin: dia }; B.guarda(KP, p); },
    borrar() { try { localStorage.removeItem(KP); } catch (e) { } }
  };
})(window.BLUES);
