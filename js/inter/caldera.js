/* BLUES · caldera (P1.5) · v2 (19-oct, puntos 13–17 de Iago): la sala de calderas con PASOS de manipulación, dibujados de
   forma conceptual («que no se tienen que ver muy bien»), y cada gesto con su sonido:
   1) levantar el pestillo (clic) · 2) abrir la puerta de hierro (arrastrar a la izquierda: chirrido, luz y rugido del fuego)
   3) coger la pala (clic) · 4) meterla en el carbón (clic en el montón)
   5) canto de trabajo, 8 compases a ~76 bpm: Amos llama en el 1 y el 2; el alumno echa el carbón al fuego en el 3
      (Espacio o clic, ±150 ms) y la pala vuelve sola al montón en el 4. Cada palada a tiempo aviva el fuego y sube la
      aguja del manómetro. · 6) cerrar la puerta (arrastrar a la derecha). · (Iago, 20-oct) la puerta se abre hacia la IZQUIERDA y hay claqueta
   Sonidos: los de sfx/d1 (receta_sfx.json); si alguno falta, el sintetizado de siempre. */
'use strict';
(function (B) {
  const U = B.iu;
  const LLAMADAS = [[50, 53], [53, 55], [50, 48], [55, 53], [50, 53], [57, 55], [53, 50], [50, 43]];
  const SFX = { pestillo: 'sfx/d1/estuche_cierre.mp3', abre: 'sfx/d1/caldera_abrir.mp3', cierra: 'sfx/d1/caldera_cerrar.mp3',
    pala: ['sfx/d1/pala_1.mp3', 'sfx/d1/pala_2.mp3', 'sfx/d1/pala_3.mp3'], fuego: 'sfx/d1/fuego.mp3',
    coge: ['sfx/d1/pala_coge_1.mp3', 'sfx/d1/pala_coge_2.mp3'], echa: 'sfx/d1/pala_echa.mp3',   // (ronda 4) Splice: más contundentes
    ho: ['sfx/d1/ho_1.mp3', 'sfx/d1/ho_2.mp3', 'sfx/d1/ho_3.mp3'] };   // (Iago, 19-oct) el «¡Ho!» lo contestan HOMBRES, no un acorde
  const u = n => 'calc(var(--u)*' + n + ')';
  const suena = (r, o) => B.suena(r, Object.assign({ bus: B.bus.sfx }, o || {}));
  const PALA = '<svg viewBox="0 0 220 60" style="width:100%;height:100%;overflow:visible">' +
    '<rect x="6" y="27" width="150" height="7" rx="3" fill="#7a5232" stroke="#3b2414" stroke-width="2"/>' +
    '<rect x="2" y="21" width="16" height="19" rx="5" fill="#5a3a22" stroke="#2c1a0e" stroke-width="2"/>' +
    '<path d="M150 22 L158 18 L216 8 L214 54 L158 44 L150 40 Z" fill="#6f6a64" stroke="#2e2b28" stroke-width="2.5"/>' +
    '<g class="terrones"><circle cx="176" cy="22" r="7" fill="#1b1714"/><circle cx="192" cy="28" r="8" fill="#211b17"/><circle cx="180" cy="36" r="7.5" fill="#15110f"/><circle cx="202" cy="20" r="6" fill="#1b1714"/><circle cx="198" cy="40" r="6.5" fill="#1d1815"/></g></svg>';
  const CARBON = '<svg viewBox="0 0 200 90" style="width:100%;height:100%;overflow:visible"><path d="M4 88 Q30 34 70 30 Q100 6 132 28 Q174 34 196 88 Z" fill="#14100e"/>' +
    [[40, 60, 9], [62, 44, 10], [88, 30, 9], [112, 40, 11], [140, 52, 10], [160, 70, 9], [76, 66, 11], [118, 68, 10], [30, 78, 8], [96, 54, 8], [134, 32, 7], [60, 80, 8], [150, 82, 8]]
      .map(([x, y, r]) => '<ellipse cx="' + x + '" cy="' + y + '" rx="' + r + '" ry="' + (r * .78) + '" fill="#231c18"/><ellipse cx="' + (x - r * .3) + '" cy="' + (y - r * .35) + '" rx="' + (r * .32) + '" ry="' + (r * .2) + '" fill="#5c524a" opacity=".55"/>').join('') + '</svg>';
  const MANOMETRO = '<svg viewBox="0 0 100 100" style="width:100%;height:100%"><circle cx="50" cy="50" r="46" fill="#3a332c" stroke="#C9A45C" stroke-width="4"/>' +
    '<circle cx="50" cy="50" r="38" fill="#E8DFC9"/><path d="M78 66 A30 30 0 0 0 80 44" fill="none" stroke="#B3261E" stroke-width="7"/>' +
    [-120, -80, -40, 0, 40, 80, 120].map(a => '<line x1="50" y1="16" x2="50" y2="23" stroke="#3a2a1a" stroke-width="2.4" transform="rotate(' + a + ' 50 50)"/>').join('') +
    '<text x="50" y="76" font-size="9" text-anchor="middle" fill="#3a2a1a" font-family="Jost,Arial,sans-serif" letter-spacing="1">PRESIÓN</text>' +
    '<g class="aguja" style="transform-origin:50px 50px;transform:rotate(-120deg);transition:transform .5s cubic-bezier(.3,1.6,.5,1)"><path d="M48 52 L50 18 L52 52 Z" fill="#B3261E"/></g><circle cx="50" cy="50" r="5" fill="#2a221c"/></svg>';

  /* (Iago, 20-oct) el canto de Suno (mus/canto_amos.mp3, cortado tras «¡Y el último, pa' casa!»): pulsos y frases sacados del propio audio
     (librosa: ~74 bpm; una frase = 2 pulsos; Amos con una sola voz, el coro sin altura clara) */
  const CANCION = { src: 'mus/canto_amos.mp3', fin: 27.19,
    pulsos: [0.95, 1.79, 2.62, 3.46, 4.30, 5.11, 5.92, 6.76, 7.57, 8.36, 9.20, 10.03, 10.84, 11.66, 12.49, 13.31, 14.12, 14.93, 15.74, 16.58, 17.41, 18.23, 19.04, 19.88, 20.67, 21.48, 22.27, 23.10, 23.94, 24.75, 25.57, 26.38, 27.19],
    frases: [
      { quien: 'AMOS', texto: "¡Carbón pa'l fuego!", s: 0.95, e: 2.62 },
      { quien: 'CORO', texto: "¡Carbón pa'l fuego!", s: 2.62, e: 4.30 },
      { quien: 'AMOS', texto: "¡Fuego en la panza!", s: 4.30, e: 5.92 },
      { quien: 'CORO', texto: "¡Fuego en la panza!", s: 5.92, e: 7.57 },
      { quien: 'AMOS', texto: "¡Agua en la caldera!", s: 7.57, e: 9.20 },
      { quien: 'CORO', texto: "¡Agua en la caldera!", s: 9.20, e: 10.84 },
      { quien: 'AMOS', texto: "¡Vapor pa' la hélice!", s: 10.84, e: 12.49 },
      { quien: 'CORO', texto: "¡Vapor pa' la hélice!", s: 12.49, e: 14.12 },
      { quien: 'AMOS', texto: "¡La hélice en la mar!", s: 14.12, e: 15.74 },
      { quien: 'CORO', texto: "¡La hélice en la mar!", s: 15.74, e: 17.41 },
      { quien: 'AMOS', texto: "¡La mar hasta Nueva Orleans!", s: 17.41, e: 19.04 },
      { quien: 'CORO', texto: "¡La mar hasta Nueva Orleans!", s: 19.04, e: 20.67 },
      { quien: 'AMOS', texto: "¡Uno más, muchachos!", s: 20.67, e: 22.27 },
      { quien: 'CORO', texto: "¡Uno más, muchachos!", s: 22.27, e: 23.94 },
      { quien: 'AMOS', texto: "¡Y el último, pa' casa!", s: 23.94, e: 25.57 },
      { quien: 'CORO', texto: "¡Y el último, pa' casa!", s: 25.57, e: 27.19 }] };
  B.inter.caldera = async function (caja, op) {
    const ctl = op.ctl;
    U.fondo(caja);
    const esc = B.el('div', 'cal-esc'); caja.appendChild(esc);
    esc.innerHTML =
      '<div class="cal-horno"><div class="cal-frente"></div><div class="cal-boca"><div class="cal-luz"></div></div>' +
      '<div class="cal-puerta"><svg viewBox="0 0 100 80" style="position:absolute;inset:10%;width:80%;height:80%"><g fill="#8a8178">' +
      [10, 30, 50, 70, 90].map(x => '<circle cx="' + x + '" cy="6" r="2.4"/><circle cx="' + x + '" cy="74" r="2.4"/>').join('') +
      '</g><rect x="18" y="22" width="56" height="36" rx="6" fill="none" stroke="#8a8178" stroke-width="2"/><path d="M26 40h40" stroke="#8a8178" stroke-width="2"/></svg>' +
      '<div class="cal-pestillo"></div></div>' +
      '<div class="cal-mano">' + MANOMETRO + '</div></div>' +
      '<div class="cal-carbon">' + CARBON + '</div><div class="cal-pala">' + PALA + '</div>';
    const enun = U.panel(caja, { left: '50%', top: '3.5%', transform: 'translateX(-50%)', textAlign: 'center', minWidth: u(46), maxWidth: u(64) });
    const paso = (n, txt) => { enun.innerHTML = '<div class="i-tit">La caldera · paso ' + n + ' de 6</div><div class="i-enun">' + txt + '</div>'; B.inter.caldera.paso = n; };
    const $ = s => esc.querySelector(s);
    const puerta = $('.cal-puerta'), luz = $('.cal-luz'), pest = $('.cal-pestillo'), pala = $('.cal-pala'), carbon = $('.cal-carbon'), aguja = $('.aguja');
    let rug = null, fuego = null;
    ctl.alMorir.push(() => { if (rug) rug.parar(.4); if (fuego) fuego.parar(.5); });
    /* esperar un clic en un objeto (y un atajo para las pruebas: B.inter.caldera.hazPaso()) */
    const clicEn = el => new Promise(res => {
      el.classList.add('cal-objetivo');
      const fin = e => { if (e) { e.preventDefault(); e.stopPropagation(); } el.removeEventListener('pointerdown', fin); el.classList.remove('cal-objetivo'); B.ac(); res(); };
      el.addEventListener('pointerdown', fin); B.inter.caldera.hazPaso = () => fin(); ctl.alMorir.push(res);
    });
    /* arrastrar la puerta: sentido −1 abre (izquierda), +1 cierra (derecha); alAvance(0…1) */
    const arrastra = (sentido, alAvance) => new Promise(res => {
      let x0 = null, hecho = false;
      puerta.classList.add('cal-objetivo');
      const fin = () => { if (hecho) return; hecho = true; puerta.classList.remove('cal-objetivo'); puerta.removeEventListener('pointerdown', ab); puerta.removeEventListener('pointermove', mv); alAvance(1); res(); };
      const ab = e => { e.preventDefault(); e.stopPropagation(); x0 = e.clientX; try { puerta.setPointerCapture(e.pointerId); } catch (er) { } B.ac(); };
      const mv = e => { if (x0 == null) return; const a = B.clamp(sentido * (e.clientX - x0) / (puerta.clientWidth * .7), 0, 1); alAvance(a); if (a >= .95) fin(); };
      puerta.addEventListener('pointerdown', ab); puerta.addEventListener('pointermove', mv);
      puerta.addEventListener('pointerup', () => { x0 = null; });
      B.inter.caldera.hazPaso = fin; ctl.alMorir.push(res);
    });
    const ponPuerta = a => { puerta.style.transform = 'perspective(900px) rotateY(' + (-a * 74) + 'deg)'; luz.style.opacity = .12 + a * .88; };

    /* 1 · el pestillo */
    paso(1, 'Levanta el <b>pestillo</b> de la puerta.');
    await clicEn(pest); if (ctl.muerto) return;
    pest.classList.add('arriba'); if (!suena(SFX.pestillo, { vol: .9 })) B.sint.metal(B.ahora(), .8);

    /* 2 · abrir la puerta */
    paso(2, 'Arrastra la <b>puerta de hierro</b> hacia la izquierda para abrirla.');
    let chirrio = false;
    await arrastra(-1, a => {
      ponPuerta(a);
      if (a > .12 && !chirrio) { chirrio = true; if (!suena(SFX.abre, { vol: .8 })) B.sint.puerta(B.ahora(), .9); rug = B.sint.rugido(.1); fuego = suena(SFX.fuego, { bucle: true, vol: 0 }); }
      if (rug) rug.vol(.1 + a * .25); if (fuego) fuego.gan.gain.value = .55 * a;
    });
    if (ctl.muerto) return;
    if (!await U.dice(op, 'abierta', ctl)) return;

    /* 3 · coger la pala · 4 · cargar carbón */
    paso(3, 'Coge la <b>pala</b>.');
    await clicEn(pala); if (ctl.muerto) return;
    pala.classList.add('mano'); if (!suena(SFX.pala[1], { vol: .6 })) B.sint.metal(B.ahora(), .5);
    paso(4, 'Mete la pala en el <b>carbón</b>.');
    await clicEn(carbon); if (ctl.muerto) return;
    const recarga = async () => { pala.classList.add('carga'); if (!suena(SFX.coge[0], { vol: .9, rate: B.azar ? B.azar(.96, 1.04) : 1 }) && !suena(SFX.pala[0], { vol: .75 })) B.sint.pala(B.ahora(), .7); await B.espera(.24, ctl); pala.classList.add('llena'); pala.classList.remove('carga'); };
    await recarga(); if (ctl.muerto) return;

    /* 5 · (Iago, 20-oct) EL CANTO DE TRABAJO de Suno, tal cual hasta «¡Y el último, pa' casa!»: Amos canta una frase y el coro la
       repite. El alumno MANTIENE pulsado (Espacio o clic) mientras canta el coro, como un «Guitar Hero» de un solo botón: abajo, una
       fila de cuadrados (uno por pulso) con los del coro en amarillo y unidos; arriba, la letra (Amos en blanco, el coro en amarillo). */
    paso(5, '<b>Mantén pulsado</b> mientras canta el <b>coro</b> (cuadrados amarillos).');
    if (!await U.dice(op, 'intro', ctl)) return;
    if (!await U.dice(op, 'cancion', ctl)) return;
    const CAN = CANCION, PU = CAN.pulsos.filter(b => b <= CAN.fin + .01), FR = CAN.frases, FIN = CAN.fin, coros = FR.filter(f => f.quien === 'CORO');
    const letra = U.panel(caja, { left: '50%', top: '12.5%', transform: 'translateX(-50%)', textAlign: 'center', minWidth: u(34), padding: 'calc(var(--u)*.5) calc(var(--u)*1.6)' });
    letra.innerHTML = '<div class="gh-l">&nbsp;</div>';
    const lA = letra.firstChild, lC = lA;   // una sola línea: blanca cuando canta Amos, amarilla cuando repite el coro
    const pnl = U.panel(caja, { left: '50%', bottom: '2.5%', transform: 'translateX(-50%)', width: '90%', textAlign: 'center', padding: 'calc(var(--u)*.7) calc(var(--u)*1.4)' });
    pnl.innerHTML = '<div class="gh-pista"><div class="gh-fila"></div><div class="gh-cursor"></div></div><div class="i-estado" style="margin-top:calc(var(--u)*.45)">Escucha a Amos…</div>';
    const fila = pnl.querySelector('.gh-fila'), cur = pnl.querySelector('.gh-cursor'), est = pnl.querySelector('.i-estado');
    const T0 = PU[0] - .45, T1 = FIN + .2, X = t => ((t - T0) / (T1 - T0) * 100).toFixed(3) + '%';
    PU.forEach(b => { const q = B.el('i', 'gh-q'); q.style.left = X(b); fila.appendChild(q); });
    const barras = coros.map(f => { const dv = B.el('div', 'gh-barra'); dv.style.left = X(f.s); dv.style.width = ((f.e - f.s) / (T1 - T0) * 100).toFixed(3) + '%'; dv.innerHTML = '<span></span>'; fila.appendChild(dv); return dv; });
    const golpes = [];
    let aciertos = 0, nPal = 0;
    const vuela = () => {   // el carbón vuela de la pala a la boca del horno
      for (let k = 0; k < 5; k++) {
        const t = B.el('div', 'cal-vuela'); t.style.left = u(30 + Math.random() * 3); t.style.top = u(28 + Math.random() * 3);
        t.style.setProperty('--dx', u(14 + Math.random() * 8)); t.style.setProperty('--dy', u(2 + Math.random() * 6)); t.style.animationDelay = (k * 0.025) + 's';
        esc.appendChild(t); setTimeout(() => t.remove(), 700);
      }
    };
    /* (ronda 4, Iago: «que el sonido de coger el carbón y el de soltarlo coincidan con los pulsos que suenan… para que, si
       el alumno lo hace bien, vaya con golpes de música») cada sonido se cuadra con el pulso más cercano de la canción
       (hasta 0,22 s antes o después): si llega antes, espera al pulso; si llega un poco tarde, suena ya. */
    const alPulso = () => {
      const ahora = B.ahora(); if (!t0) return ahora;
      let mejor = null; PU.forEach(b => { const tb = t0 + b; if (mejor === null || Math.abs(tb - ahora) < Math.abs(mejor - ahora)) mejor = tb; });
      return mejor !== null && Math.abs(mejor - ahora) <= .22 ? Math.max(ahora + .004, mejor) : ahora;
    };
    const suenaEn = (src, tq, vol) => { if (!B.buf[src]) return false; B.suena(src, { bus: B.bus.sfx, t: tq, vol }); return true; };
    const palada = () => {
      const t = B.ahora(), tq = alPulso(); golpes.push(t);
      const llena = pala.classList.contains('llena'), ms = Math.max(0, (tq - t) * 1000);
      setTimeout(() => { pala.classList.add('lanza'); setTimeout(() => pala.classList.remove('lanza'), 170); }, Math.max(0, ms - 90));
      if (!suenaEn(SFX.echa, tq, 1) && !suena(SFX.pala[2 - (nPal++ % 2)], { vol: .85 })) B.sint.pala(t, .9);
      if (llena) { pala.classList.remove('llena'); setTimeout(vuela, ms); setTimeout(() => { luz.classList.add('aviva'); if (rug) rug.vol(.5); }, ms + 160); setTimeout(() => { luz.classList.remove('aviva'); if (rug) rug.vol(.35); }, ms + 800); }
    };
    /* mantener pulsado: al bajar, la pala se hunde en el carbón y sube cargada; al soltar, lanza el carbón al fuego */
    let pulsado = false, hIni = 0, t0 = 0;
    const tramos = [], tc = () => B.ahora() - t0;
    const baja = () => {
      if (pulsado || !t0) return; pulsado = true; hIni = tc();
      pala.classList.remove('llena'); pala.classList.add('carga');
      if (!suenaEn(SFX.coge[nPal % 2], alPulso(), 1) && !suena(SFX.pala[0], { vol: .7 })) B.sint.pala(B.ahora(), .6);
      setTimeout(() => { if (pulsado) { pala.classList.remove('carga'); pala.classList.add('llena', 'sube'); } }, 230);
    };
    const sube = () => { if (!pulsado) return; pulsado = false; tramos.push([hIni, tc()]); pala.classList.remove('carga', 'sube'); if (!pala.classList.contains('llena')) pala.classList.add('llena'); palada(); };
    const quita = B.captura.poner(e => { if (e.key === ' ' || e.key === 'Enter') { if (!e.repeat) baja(); return true; } return false; });
    const alSoltarT = e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); sube(); } };
    const alBajar = e => { e.preventDefault(); baja(); }, alSubir = () => sube();
    window.addEventListener('keyup', alSoltarT, true); esc.addEventListener('pointerdown', alBajar); window.addEventListener('pointerup', alSubir);
    const limpia = () => { quita(); window.removeEventListener('keyup', alSoltarT, true); esc.removeEventListener('pointerdown', alBajar); window.removeEventListener('pointerup', alSubir); };
    ctl.alMorir.push(limpia);
    B.inter.caldera.palada = () => { baja(); setTimeout(sube, 900); };
    /* cuánto del tramo [a, b] estuvo pulsado (contando lo que se mantiene ahora) */
    const pulsadoEn = (a, b, hasta) => {
      let s = 0; const lista = tramos.concat(pulsado ? [[hIni, hasta]] : []);
      lista.forEach(([x, y]) => { s += Math.max(0, Math.min(b, y) - Math.max(a, x)); }); return s;
    };
    /* la canción, la claqueta en cada pulso (más fuerte donde entra el coro) y la letra */
    t0 = B.ahora() + .35;
    B.inter.caldera.t0 = t0;
    if (B.buf[CAN.src]) { B.suena(CAN.src, { bus: B.bus.voz, t: t0, vol: 1 }); B.enTiempo(t0, () => B.agacha(true), ctl); B.enTiempo(t0 + FIN + .3, () => B.agacha(false), ctl); ctl.alMorir.push(() => B.agacha(false)); }   // (ronda 4) +3,5 dB y el ambiente agachado
    if (B.sint.baqueta) PU.forEach(b => B.sint.baqueta(t0 + b, coros.some(f => Math.abs(f.s - b) < .05) ? .55 : .2));
    FR.forEach(f => B.enTiempo(t0 + f.s - .06, () => {
      lA.textContent = f.texto; lA.className = 'gh-l on ' + (f.quien === 'AMOS' ? 'gh-amos' : 'gh-coro');
      est.textContent = f.quien === 'AMOS' ? 'Amos canta… prepárate.' : '¡Ahora! Mantén mientras canta el coro.';
    }, ctl));
    const anima = () => {
      if (ctl.muerto || !pnl.isConnected) return;
      const t = tc(); cur.style.left = X(Math.max(T0, Math.min(T1, t)));
      coros.forEach((f, i) => { if (t > f.s) barras[i].firstChild.style.width = (Math.min(1, pulsadoEn(f.s, Math.min(t, f.e), t) / (f.e - f.s)) * 100).toFixed(1) + '%'; });
      if (t < T1 + .3) requestAnimationFrame(anima);
    };
    requestAnimationFrame(anima);
    /* al acabar cada frase del coro: ¿se mantuvo casi toda y no se aporreó durante la de Amos? */
    for (let i = 0; i < coros.length; i++) {
      const f = coros[i], prev = FR[FR.indexOf(f) - 1];
      if (!await B.espera(t0 + f.e + .08 - B.ahora(), ctl)) return;
      const cub = pulsadoEn(f.s, f.e, tc()) / (f.e - f.s), antes = prev ? pulsadoEn(prev.s + .3, prev.e - .3, tc()) / Math.max(.1, prev.e - prev.s - .6) : 0;
      const ok = cub >= .6 && antes < .5;
      barras[i].classList.add(ok ? 'ok' : 'mal');
      if (ok) { aciertos++; aguja.style.transform = 'rotate(' + (-120 + 240 * aciertos / coros.length) + 'deg)'; }
    }
    /* el corte después de «¡Y el último, pa' casa!», tapado por un buen golpe de vapor y la compuerta */
    if (B.buf['sfx/d1/vapor_escape.mp3']) B.suena('sfx/d1/vapor_escape.mp3', { bus: B.bus.sfx, vol: 1, t: Math.max(B.ahora(), t0 + FIN - .25) });
    luz.classList.add('aviva'); setTimeout(() => luz.classList.remove('aviva'), 1200);
    if (!await B.espera(t0 + FIN + 1 - B.ahora(), ctl)) return;
    if (pulsado) sube();
    limpia();
    B.inter.caldera.aciertos = aciertos;
    lA.classList.remove('on');
    est.textContent = aciertos >= 6 ? '¡Presión a tope! ' + aciertos + ' de 8.' : aciertos + ' de 8. Lo importante: uno canta y todos contestan.';
    pala.classList.remove('mano', 'llena'); pala.classList.add('suelta'); if (!suena(SFX.pala[1], { vol: .5 })) B.sint.metal(B.ahora(), .4);

    /* 6 · cerrar la puerta */
    paso(6, 'Cierra la <b>puerta</b>: arrástrala hacia la derecha.');
    let golpe = false;
    await arrastra(1, a => { ponPuerta(1 - a); if (rug) rug.vol(.35 * (1 - a) + .08); if (fuego) fuego.gan.gain.value = .55 * (1 - a); if (a >= .9 && !golpe) { golpe = true; if (!suena(SFX.cierra, { vol: .8 })) B.sint.puerta(B.ahora(), .6); } });
    if (ctl.muerto) return;
    pest.classList.remove('arriba');
    if (fuego) { fuego.parar(1.2); fuego = null; }
    if (!await U.dice(op, aciertos >= 6 ? 'acierto' : 'fallo', ctl)) return;
    if (!await U.dice(op, 'fin', ctl)) return;
    await U.seguir(caja, ctl, 'Seguir');
  };
  B.inter.caldera.voces = [SFX.pestillo, SFX.abre, SFX.cierra, SFX.fuego, CANCION.src, 'sfx/d1/vapor_escape.mp3', SFX.echa].concat(SFX.pala, SFX.coge);   // se precargan con el acto
  B.inter.caldera.claves = ['abierta', 'intro', 'llamada1', 'llamada2', 'llamada3', 'llamada4', 'llamada5', 'llamada6', 'llamada7', 'llamada8', 'respuesta', 'cancion', 'acierto', 'fallo', 'fin'];
})(window.BLUES);
