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
    const recarga = async () => { pala.classList.add('carga'); if (!suena(SFX.pala[0], { vol: .75, rate: B.azar ? B.azar(.94, 1.06) : 1 })) B.sint.pala(B.ahora(), .7); await B.espera(.24, ctl); pala.classList.add('llena'); pala.classList.remove('carga'); };
    await recarga(); if (ctl.muerto) return;

    /* 5 · el canto de trabajo */
    paso(5, 'Canto de trabajo: Amos llama en el <b>1</b> y el <b>2</b>; tú echas el carbón al fuego en el <b>3</b> (Espacio o clic). ¡Ho!');
    const pnl = U.panel(caja, { left: '50%', bottom: '5%', transform: 'translateX(-50%)', textAlign: 'center' });
    pnl.innerHTML = '<div class="pulsos" style="justify-content:center"><div class="pl">1</div><div class="pl">2</div><div class="pl marca">3</div><div class="pl">4</div></div><div class="i-marcas" style="justify-content:center;margin-top:calc(var(--u)*.9)">' + '<i></i>'.repeat(8) + '</div><div class="i-estado" style="margin-top:calc(var(--u)*.5)">Escucha la primera llamada…</div>';
    const pls = B.$$('.pl', pnl), mks = B.$$('.i-marcas i', pnl), est = pnl.querySelector('.i-estado');
    if (!await U.dice(op, 'intro', ctl)) return;
    const p = 60 / 76, golpes = [];
    let aciertos = 0, nPal = 0;
    const vuela = () => {   // el carbón vuela de la pala a la boca del horno
      for (let k = 0; k < 5; k++) {
        const t = B.el('div', 'cal-vuela'); t.style.left = u(30 + Math.random() * 3); t.style.top = u(28 + Math.random() * 3);
        t.style.setProperty('--dx', u(14 + Math.random() * 8)); t.style.setProperty('--dy', u(2 + Math.random() * 6)); t.style.animationDelay = (k * 0.025) + 's';
        esc.appendChild(t); setTimeout(() => t.remove(), 700);
      }
    };
    const palada = () => {
      const t = B.ahora(); golpes.push(t);
      const llena = pala.classList.contains('llena');
      pala.classList.add('lanza'); setTimeout(() => pala.classList.remove('lanza'), 170);
      if (!suena(SFX.pala[2 - (nPal++ % 2)], { vol: .85 })) B.sint.pala(t, .9);
      if (llena) { pala.classList.remove('llena'); setTimeout(vuela, 90); setTimeout(() => { luz.classList.add('aviva'); if (rug) rug.vol(.5); }, 300); setTimeout(() => { luz.classList.remove('aviva'); if (rug) rug.vol(.35); }, 900); }
    };
    const quita = B.captura.poner(e => { if (e.key === ' ' || e.key === 'Enter') { if (!e.repeat) palada(); return true; } return false; });
    ctl.alMorir.push(quita);
    const alClic = e => { e.preventDefault(); palada(); };
    esc.addEventListener('pointerdown', alClic);
    B.inter.caldera.palada = palada;
    const t0 = B.ahora() + .6;
    B.inter.caldera.t0 = t0; B.inter.caldera.p = p;
    for (let c = 0; c < 8; c++) {
      const tc = t0 + c * 4 * p;
      for (let b = 0; b < 4; b++) B.enTiempo(tc + b * p, () => pls.forEach((x, j) => x.classList.toggle('on', j === b)), ctl);
      if (B.sint.baqueta) for (let b = 0; b < 4; b++) B.sint.baqueta(tc + b * p, b === 0 ? .95 : .42);   // (Iago, 20-oct) claqueta: otra referencia, con el 1 marcado
      const lc = U.rota(op, 'llamada' + (c + 1));
      const ac = lc && lc.acento != null ? lc.acento : .05;   // (Iago, 20-oct) la SÍLABA FUERTE de la llamada, en el pulso 1 (acento: parches_musica.py)
      if (lc) B.enTiempo(tc - ac, () => U.suelta(lc, ctl, 4 * p - .3), ctl);
      if (!(lc && lc.voz && B.buf[lc.voz])) B.sint.canta(LLAMADAS[c], tc, p, .9, c % 2 ? 'o' : 'a');
      const ho = U.rota(op, 'respuesta'), hoS = SFX.ho[c % SFX.ho.length];   // coro de fogoneros (3 tomas que se turnan)
      if (B.buf[hoS]) B.suena(hoS, { bus: B.bus.voz, t: tc + 2 * p - .03, vol: .9 });
      else if (ho && ho.voz && B.buf[ho.voz]) B.suena(ho.voz, { bus: B.bus.voz, t: tc + 2 * p, vol: .8 }); else B.sint.ho(tc + 2 * p, .55);
      B.enTiempo(tc + 2 * p - .2, () => { mks.forEach((m, j) => m.classList.toggle('act', j === c)); }, ctl);
      if (c < 7) B.enTiempo(tc + 3 * p, () => { if (!pala.classList.contains('llena')) recarga(); }, ctl);   // en el 4, la pala vuelve sola al montón
    }
    for (let c = 0; c < 8; c++) {
      const objetivo = t0 + c * 4 * p + 2 * p;
      if (!await B.espera(objetivo + .6 - B.ahora(), ctl)) return;
      const ok = golpes.some(g => Math.abs(g - objetivo) <= .15);
      if (ok) { aciertos++; mks[c].classList.add('ok'); pls[2].classList.add('ok'); aguja.style.transform = 'rotate(' + (-120 + 240 * aciertos / 8) + 'deg)'; } else pls[2].classList.add('mal');
      setTimeout(() => pls[2].classList.remove('ok', 'mal'), 300);
      est.textContent = ok ? '¡Ho! A tiempo.' : 'Sin prisa: el carbón va en el 3.';
    }
    pls.forEach(x => x.classList.remove('on'));
    quita(); esc.removeEventListener('pointerdown', alClic);
    B.inter.caldera.aciertos = aciertos;
    est.textContent = aciertos >= 6 ? '¡Presión a tope! ' + aciertos + ' de 8.' : aciertos + ' de 8. Lo importante: uno llama, todos contestan.';
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
  B.inter.caldera.voces = [SFX.pestillo, SFX.abre, SFX.cierra, SFX.fuego].concat(SFX.pala, SFX.ho);   // se precargan con el acto
  B.inter.caldera.claves = ['abierta', 'intro', 'llamada1', 'llamada2', 'llamada3', 'llamada4', 'llamada5', 'llamada6', 'llamada7', 'llamada8', 'respuesta', 'acierto', 'fallo', 'fin'];
})(window.BLUES);
