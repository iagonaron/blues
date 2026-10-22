/* BLUES · palmas (P2.4): groove de swing (tabla + maleta) a ~100 bpm; palmas en el 2 y el 4.
   Dos compases con Ruby (guía) y cuatro solo. «¡Ya lo tienes!» con 6 de 8.
   (19-oct, punto 33 de Iago) Con MICRÓFONO: el alumno da palmas de verdad y se detectan los golpes; antes, 4 palmas con
   un clic para medir el retraso del micro y lo fuerte que suenan (márgenes amplios: ±130 ms). Si no hay micrófono, se
   deniega o no se le oye bien: Espacio o clic, como siempre (±90 ms). Espacio/clic valen también con el micro. */
'use strict';
(function (B) {
  const U = B.iu;
  /* el micrófono: golpes por encima de un umbral (pico de la ventana), con 140 ms de «sordera» tras cada golpe */
  async function abreMic(ctl) {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !window.isSecureContext) return null;
    let st;
    try { st = await Promise.race([navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: false, autoGainControl: false } }), new Promise((_, no) => setTimeout(() => no(new Error('tarde')), 9000))]); }
    catch (e) { return null; }
    if (ctl.muerto) { st.getTracks().forEach(t => t.stop()); return null; }
    const C = B.ac(), src = C.createMediaStreamSource(st), an = C.createAnalyser(); an.fftSize = 512; src.connect(an);
    const buf = new Float32Array(an.fftSize), oyentes = new Set();
    const M = { ruido: .01, umbral: null, lat: 0 };
    let ultimo = -1;
    const iv = setInterval(() => {
      an.getFloatTimeDomainData(buf);
      let pk = 0; for (let i = 0; i < buf.length; i++) { const a = buf[i] < 0 ? -buf[i] : buf[i]; if (a > pk) pk = a; }
      const t = C.currentTime - buf.length / C.sampleRate / 2, thr = M.umbral != null ? M.umbral : Math.max(.08, M.ruido * 6);
      if (pk > thr && t - ultimo > .14) { ultimo = t; oyentes.forEach(f => f(t, pk)); } else M.ruido = M.ruido * .985 + pk * .015;
    }, 8);
    M.oye = f => { oyentes.add(f); return () => oyentes.delete(f); };
    M.cierra = () => { clearInterval(iv); try { src.disconnect(); } catch (e) { } st.getTracks().forEach(t => t.stop()); };
    ctl.alMorir.push(M.cierra);
    return M;
  }
  /* 4 palmas con un clic (100 bpm): retraso del micro (mediana) y umbral (40 % del golpe mediano) */
  async function calibra(M, est, ctl) {
    const p = .6, t0 = B.ahora() + .8, oidos = [];
    const quita = M.oye((t, pk) => oidos.push([t, pk]));
    est.textContent = 'Primero, 4 palmas con el clic: 1… 2… 3… 4…';
    for (let k = 0; k < 4; k++) B.sint.baqueta ? B.sint.baqueta(t0 + k * p, .8) : B.sint.palma(t0 + k * p, .5);
    if (!await B.espera(4 * p + 1.1, ctl)) { quita(); return false; }
    quita();
    const des = [], picos = [];
    for (let k = 0; k < 4; k++) { const c = t0 + k * p, o = oidos.filter(([t]) => Math.abs(t - c) < .28).sort((a, b) => Math.abs(a[0] - c) - Math.abs(b[0] - c))[0]; if (o) { des.push(o[0] - c); picos.push(o[1]); } }
    if (des.length < 3) return false;
    const med = a => a.slice().sort((x, y) => x - y)[a.length >> 1];
    M.lat = med(des); M.umbral = Math.max(M.ruido * 4, .4 * med(picos));
    return true;
  }
  /* (C2, 20-oct · Iago: «interacciones con texturas pintadas, sonidos contundentes y los objetos se mueven al tocarlos»)
     tabla de lavar, manos y maleta pintadas (img/inter/d2_*.webp) que se mueven con cada golpe; sonidos de Splice del acto 2 */
  const PALMAS = ['sfx/d2/palma_1.mp3', 'sfx/d2/palma_2.mp3', 'sfx/d2/palma_3.mp3'];   // (Iago 14:40) palmas de verdad (packs de Splice), alternadas
  const SFX = { palma: 'sfx/d2/palma_1.mp3', golpe: 'sfx/d2/tabla_golpe.mp3', arriba: 'sfx/d2/tabla_raspa_arriba.mp3', abajo: 'sfx/d2/tabla_raspa_abajo.mp3' };
  let rr = 0;
  const toca = (k, t, vol, alt) => {
    if (k === 'palma') { const hay = PALMAS.filter(f => B.buf[f]); if (hay.length) return B.suena(hay[rr++ % hay.length], { t, vol: vol * (.9 + Math.random() * .1) }); }
    return B.buf[SFX[k]] ? B.suena(SFX[k], { t, vol }) : alt();
  };
  const destello = (el, cls, ms) => { if (!el) return; el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); setTimeout(() => el.classList.remove(cls), ms || 120); };
  function estilo() {
    if (document.getElementById('d2-palmas-css')) return;
    const s = document.createElement('style'); s.id = 'd2-palmas-css';
    s.textContent = '.d2-instr{display:flex;justify-content:center;align-items:flex-end;gap:calc(var(--u)*2.6);margin:calc(var(--u)*1.1) 0 calc(var(--u)*.3)}' +
      '.d2-obj{background:center/contain no-repeat;transition:transform .08s ease-out,filter .12s;filter:drop-shadow(0 calc(var(--u)*.35) calc(var(--u)*.5) rgba(0,0,0,.6))}' +
      '.d2-tabla{width:calc(var(--u)*8.5);height:calc(var(--u)*11);background-image:url(img/inter/d2_tabla.webp)}' +
      '.d2-manos{width:calc(var(--u)*13);height:calc(var(--u)*9.75);background-image:url(img/inter/d2_manos.webp)}' +
      '.d2-maleta{width:calc(var(--u)*12);height:calc(var(--u)*9.5);background-image:url(img/inter/d2_maleta.webp)}' +
      '.d2-obj.golpe{transform:translateY(calc(var(--u)*.4)) scale(1.05,.95)}.d2-obj.raspa{transform:rotate(-2.5deg)}' +
      '.d2-manos.activa{cursor:pointer;filter:drop-shadow(0 0 calc(var(--u)*.12) var(--oro-hi,#f2c46a)) drop-shadow(0 0 calc(var(--u)*.12) var(--oro-hi,#f2c46a)) drop-shadow(0 calc(var(--u)*.35) calc(var(--u)*.5) rgba(0,0,0,.6))}' +
      '.icaja-toca{cursor:pointer}' +
      '.d2-manos.palma{transform:scale(1.13)}.d2-manos.tuya{filter:drop-shadow(0 0 calc(var(--u)*1.1) rgba(255,214,140,.9))}';
    document.head.appendChild(s);
  }
  B.inter.palmas = async function (caja, op) {
    const ctl = op.ctl;
    U.fondo(caja); estilo();
    const pnl = U.panel(caja, { left: '50%', top: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center', padding: 'calc(var(--u)*2) calc(var(--u)*3)' });
    pnl.innerHTML = '<div class="i-tit">Palmas en el 2 y el 4</div><div class="i-enun">Primero Ruby da las palmas contigo. Luego, tú solo. <b style="color:var(--oro-hi)">Toca las manos</b> (o pulsa Espacio).</div>' +
      '<div class="d2-instr"><div class="d2-obj d2-tabla"></div><div class="d2-obj d2-manos"></div><div class="d2-obj d2-maleta"></div></div>' +
      '<div class="pulsos" style="justify-content:center;margin:calc(var(--u)*1.2) 0"><div class="pl">1</div><div class="pl marca">2</div><div class="pl">3</div><div class="pl marca">4</div></div>' +
      '<div class="i-marcas" style="justify-content:center">' + '<i></i>'.repeat(8) + '</div><div class="i-estado" style="margin-top:calc(var(--u)*.8)">Escucha el groove…</div>';
    const oTabla = pnl.querySelector('.d2-tabla'), oManos = pnl.querySelector('.d2-manos'), oMaleta = pnl.querySelector('.d2-maleta');
    const pls = B.$$('.pl', pnl), mks = B.$$('.i-marcas i', pnl), est = pnl.querySelector('.i-estado'), enun = pnl.querySelector('.i-enun');
    /* micrófono (si lo hay y se deja): palmas de verdad */
    est.textContent = 'Si te lo pide, dale permiso al micrófono: darás palmas de verdad.';
    let mic = await abreMic(ctl); if (ctl.muerto) return;
    if (mic && !await calibra(mic, est, ctl)) { if (ctl.muerto) return; mic.cierra(); mic = null; est.textContent = 'No te oigo bien: da las palmas tocando las manos (o con Espacio).'; await B.espera(1.6, ctl); }
    if (ctl.muerto) return;
    if (mic) enun.innerHTML = 'Primero Ruby da las palmas contigo. Luego, tú solo. <b style="color:var(--oro-hi)">Palmas de verdad</b>: el micrófono te escucha (también vale tocar las manos).';
    const MARGEN = mic ? .13 : .09;
    B.inter.palmas.mic = !!mic;
    const ronda = async () => {
      const p = 60 / 100, sw = p * .67, t0 = B.ahora() + .5, golpes = [];
      mks.forEach(m => m.classList.remove('ok', 'mal', 'act'));
      const palma = () => { const t = B.ahora(); golpes.push(t); toca('palma', t, 1, () => B.sint.palma(t, .9)); destello(oManos, 'palma'); destello(oManos, 'tuya', 220); };
      const quita = B.captura.poner(e => { if (e.key === ' ' || e.key === 'Enter') { if (!e.repeat) palma(); return true; } return false; });
      /* (Iago, 22-oct: «no sé dónde tengo que pulsar… en la imagen de las palmas no funciona») vale tocar en cualquier sitio
         de la interacción, manos incluidas (la capa de antes quedaba debajo del panel); los botones no cuentan */
      const alTocar = e => { if (e.target.closest && e.target.closest('button, .i-pie')) return; e.preventDefault(); palma(); };
      caja.addEventListener('pointerdown', alTocar, true); caja.classList.add('icaja-toca'); oManos.classList.add('activa');
      const zona = { remove: () => { caja.removeEventListener('pointerdown', alTocar, true); caja.classList.remove('icaja-toca'); oManos.classList.remove('activa'); } };
      ctl.alMorir.push(() => zona.remove());
      const sinMic = mic ? mic.oye(t => { golpes.push(t - mic.lat); destello(oManos, 'palma'); destello(oManos, 'tuya', 220); pls.forEach(x => x.classList.contains('on') && x.classList.add('golpe')); setTimeout(() => pls.forEach(x => x.classList.remove('golpe')), 140); }) : null;
      if (sinMic) ctl.alMorir.push(sinMic);
      B.inter.palmas.palma = palma; B.inter.palmas.t0 = t0; B.inter.palmas.p = p;
      ctl.alMorir.push(quita);
      for (let c = 0; c < 6; c++) for (let b = 0; b < 4; b++) {
        const t = t0 + (c * 4 + b) * p;
        toca(b % 2 ? 'golpe' : 'abajo', t, b % 2 ? .9 : .6, () => B.sint.tabla(t, b % 2 ? 'golpe' : 'raspa', b % 2 ? .9 : .6));
        toca('arriba', t + sw, .45, () => B.sint.tabla(t + sw, 'raspa', .4));
        B.sint.maleta(t, b % 2 ? 'escoba' : 'bombo', .6);
        if (c < 2 && b % 2) toca('palma', t, .75, () => B.sint.palma(t, .7));
        B.enTiempo(t, () => { destello(oTabla, b % 2 ? 'golpe' : 'raspa'); destello(oMaleta, 'golpe'); if (c < 2 && b % 2) destello(oManos, 'palma'); }, ctl);
        B.enTiempo(t + sw, () => destello(oTabla, 'raspa', 90), ctl);
        B.enTiempo(t, () => { pls.forEach((x, j) => x.classList.toggle('on', j === b)); if (b === 0) est.textContent = c < 2 ? 'Con Ruby: 2… y 4…' : 'Tú solo'; }, ctl);
      }
      let ok = 0, enUno = false;
      for (let k = 0; k < 8; k++) {
        const c = 2 + Math.floor(k / 2), b = k % 2 ? 3 : 1, obj = t0 + (c * 4 + b) * p;
        if (!await B.espera(obj + .2 - B.ahora(), ctl)) { quita(); zona.remove(); if (sinMic) sinMic(); return 0; }
        const bien = golpes.some(g => Math.abs(g - obj) <= MARGEN);
        mks[k].classList.add(bien ? 'ok' : 'mal'); if (bien) ok++;
        if (golpes.some(g => Math.abs(g - (obj - p)) <= MARGEN)) enUno = true;     // palmas en el 1 o en el 3
      }
      B.inter.palmas.enUno = enUno; ronda.enUno = enUno;
      await B.espera(.6, ctl);
      quita(); if (sinMic) sinMic(); zona.remove(); pls.forEach(x => x.classList.remove('on'));
      return ok;
    };
    const reacciona = async ok => {
      if (ok >= 6) return U.dice(op, 'acierto', ctl);
      if (ronda.enUno && U.hay(op, 'fallo')) { await U.di(U.rota(op, 'fallo'), ctl); if (ctl.muerto) return; }
      if (U.hay(op, 'pista')) await U.di(U.rota(op, 'pista'), ctl);
    };
    let ok = await ronda(); if (ctl.muerto) return;
    B.inter.palmas.aciertos = ok;
    await reacciona(ok); if (ctl.muerto) return;
    est.textContent = ok >= 6 ? '¡Ya lo tienes! ' + ok + ' de 8.' : ok + ' de 8. El peso va en el 2 y el 4. ¿Otra vez?';
    const pie = B.el('div', 'i-pie'); caja.appendChild(pie);
    if (ok < 6) { const b = U.boton('↺ Otra vez', '', async () => { b.disabled = true; ok = await ronda(); est.textContent = ok >= 6 ? '¡Ya lo tienes! ' + ok + ' de 8.' : ok + ' de 8.'; await reacciona(ok); b.disabled = false; }); pie.appendChild(b); }
    await U.seguir(caja, ctl, 'Seguir', pie);
  };
  B.inter.palmas.claves = ['acierto', 'fallo', 'pista'];
})(window.BLUES);
