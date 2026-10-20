/* BLUES · caldera (P1.5) · v3 (ronda 6, 20-oct tarde: prueba de Iago en el aula con la pizarra digital)
   La sala de calderas en PASOS de manipulación, cada gesto con su sonido:
   1) levantar el pestillo (un toque en la pestaña iluminada, con la mano que indica dónde)
   2) abrir la puerta de hierro: arrastrar hacia la izquierda desde CUALQUIER sitio de la pantalla (en la pizarra el dedo se sale
      de la puerta); si se suelta pasada la mitad, termina de abrirse sola. Espacio también la abre.
   3) coger la pala (un toque) · 4) primera palada de prueba: un toque en la casilla del CARBÓN y otro en la de la LLAMA
   5) el canto de trabajo de Suno (Amos canta una frase, el coro la repite): en cada respuesta del coro, un toque en el CARBÓN en su
      primer pulso y otro en la LLAMA en el segundo. Nada de mantener pulsado (en la pizarra, mantener saca el menú de copiar) y
      nada de brillos que laten: casillas fijas con su dibujo (Iago, 20-oct, 17:37). Espacio: la acción que toque.
   6) cerrar la puerta (arrastrar a la derecha, o Espacio).
   Sonidos: los de sfx/d1; si alguno falta, el sintetizado de siempre. */
'use strict';
(function (B) {
  const U = B.iu;
  const SFX = { pestillo: 'sfx/d1/estuche_cierre.mp3', abre: 'sfx/d1/caldera_abrir.mp3', cierra: 'sfx/d1/caldera_cerrar.mp3',
    pala: ['sfx/d1/pala_1.mp3', 'sfx/d1/pala_2.mp3', 'sfx/d1/pala_3.mp3'], fuego: 'sfx/d1/fuego.mp3',
    coge: ['sfx/d1/pala_coge_1.mp3', 'sfx/d1/pala_coge_2.mp3'], echa: 'sfx/d1/pala_echa.mp3' };
  const u = n => 'calc(var(--u)*' + n + ')';
  const suena = (r, o) => B.suena(r, Object.assign({ bus: B.bus.sfx }, o || {}));
  const ICO_CARBON = '<svg viewBox="0 0 40 40"><g fill="#211b17" stroke="#5c524a" stroke-width="1"><ellipse cx="13" cy="25" rx="8" ry="6.5"/><ellipse cx="26" cy="27" rx="8.5" ry="6.5"/><ellipse cx="20" cy="16" rx="7.5" ry="6"/></g>' +
    '<g fill="#8a7f74" opacity=".7"><ellipse cx="10.5" cy="22.5" rx="2.4" ry="1.4"/><ellipse cx="23.5" cy="24.5" rx="2.4" ry="1.4"/><ellipse cx="17.5" cy="13.5" rx="2.2" ry="1.3"/></g></svg>';
  const ICO_LLAMA = '<svg viewBox="0 0 40 40"><path d="M20 3c2 6 9 9 9 19a9 9 0 0 1-18 0c0-5 3-7 4-11 1 3 2 4 4 5-1-5 0-9 1-13z" fill="#F5862A"/>' +
    '<path d="M20 17c1 4 5 5 5 10a5 5 0 0 1-10 0c0-3 2-4 3-7 .5 1.5 1 2 2 2.5 0-2 0-3.5 0-5.5z" fill="#FFD36B"/></svg>';
  const ICO_MANO = '<svg viewBox="0 0 24 24"><path fill="#F6EEDC" stroke="#1b1612" stroke-width=".8" d="M9 11.24V7.5C9 6.12 10.12 5 11.5 5S14 6.12 14 7.5v3.74c1.21-.81 2-2.18 2-3.74C16 5.01 13.99 3 11.5 3S7 5.01 7 7.5c0 1.56.79 2.93 2 3.74zm9.84 4.63l-4.54-2.26c-.17-.07-.35-.11-.54-.11H13v-6c0-.83-.67-1.5-1.5-1.5S10 6.67 10 7.5v10.74l-3.43-.72c-.08-.01-.15-.03-.24-.03-.31 0-.59.13-.79.33l-.79.8 4.94 4.94c.27.27.65.44 1.06.44h6.79c.75 0 1.33-.55 1.44-1.28l.75-5.27c.01-.07.02-.14.02-.2 0-.62-.38-1.16-.91-1.38z"/></svg>';
  const FLECHA = '<svg viewBox="0 0 100 40"><g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M96 20H18M34 4 16 20l18 16" stroke="#1b1612" stroke-width="11"/><path d="M96 20H18M34 4 16 20l18 16" stroke="#F0D696" stroke-width="6"/></g></svg>';
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
      '<div class="cal-puerta"><div class="cal-pestillo"></div></div>' +
      '<div class="cal-mano">' + MANOMETRO + '</div></div>' +
      '<div class="cal-carbon"></div><div class="cal-pala"></div>' +
      '<button class="cal-casilla cal-c-carbon" aria-label="Carbón">' + ICO_CARBON + '</button>' +
      '<button class="cal-casilla cal-c-llama" aria-label="Fuego">' + ICO_LLAMA + '</button>' +
      '<div class="cal-flecha">' + FLECHA + '</div><div class="cal-dedo">' + ICO_MANO + '</div>';
    const enun = U.panel(caja, { left: '50%', top: '3.5%', transform: 'translateX(-50%)', textAlign: 'center', minWidth: u(46), maxWidth: u(64) });
    const paso = (n, txt) => { enun.innerHTML = '<div class="i-tit">La caldera · paso ' + n + ' de 6</div><div class="i-enun">' + txt + '</div>'; B.inter.caldera.paso = n; };
    const $ = s => esc.querySelector(s);
    const puerta = $('.cal-puerta'), luz = $('.cal-luz'), pest = $('.cal-pestillo'), pala = $('.cal-pala'), aguja = $('.aguja');
    const cCarbon = $('.cal-c-carbon'), cLlama = $('.cal-c-llama'), flecha = $('.cal-flecha'), dedo = $('.cal-dedo');
    let rug = null, fuego = null;
    ctl.alMorir.push(() => { if (rug) rug.parar(.4); if (fuego) fuego.parar(.5); });
    /* la mano que señala dónde tocar (fija, sin latir): junto al objeto, abajo a la derecha */
    const señala = el => {
      if (!el) { dedo.classList.remove('on'); return; }
      const r = el.getBoundingClientRect(), e = esc.getBoundingClientRect();
      dedo.style.left = ((r.right - e.left) / e.width * 100 - 1.2).toFixed(2) + '%';
      dedo.style.top = ((r.bottom - e.top) / e.height * 100 - 3).toFixed(2) + '%';
      dedo.classList.add('on');
    };
    /* esperar un toque en un objeto (y un atajo para las pruebas: B.inter.caldera.hazPaso()) */
    const toqueEn = el => new Promise(res => {
      el.classList.add('cal-objetivo'); señala(el);
      const quitaT = B.captura.poner(e => { if (e.key === ' ' || e.key === 'Enter') { fin(); return true; } return false; });
      function fin(e) { if (e) { e.preventDefault(); e.stopPropagation(); } el.removeEventListener('pointerdown', fin); quitaT(); el.classList.remove('cal-objetivo'); señala(null); B.ac(); res(); }
      el.addEventListener('pointerdown', fin); B.inter.caldera.hazPaso = () => fin(); ctl.alMorir.push(() => { quitaT(); res(); });
    });
    /* arrastrar la puerta: sentido −1 abre (izquierda), +1 cierra (derecha); alAvance(0…1). El dedo puede ir por toda la pantalla;
       al soltar pasada la mitad, termina sola (con una transición corta: la pinta la tarjeta gráfica aunque el ordenador vaya justo) */
    const arrastra = (sentido, alAvance) => new Promise(res => {
      let x0 = null, a = 0, hecho = false;
      const W = () => (puerta.clientWidth || 200) * .7;
      puerta.classList.add('cal-objetivo'); flecha.classList.toggle('der', sentido > 0); flecha.classList.add('on');
      const anima = (hasta, ms) => { puerta.style.transition = 'transform ' + ms + 'ms ease-out'; alAvance(hasta); setTimeout(() => { puerta.style.transition = ''; }, ms + 40); };
      const quita = () => { esc.removeEventListener('pointerdown', ab); window.removeEventListener('pointermove', mv); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up); quitaT(); };
      const fin = () => { if (hecho) return; hecho = true; quita(); puerta.classList.remove('cal-objetivo'); flecha.classList.remove('on'); anima(1, 260); res(); };
      const ab = e => { if (hecho) return; e.preventDefault(); x0 = e.clientX; puerta.style.transition = ''; B.ac(); };
      const mv = e => { if (x0 == null || hecho) return; a = B.clamp(sentido * (e.clientX - x0) / W(), 0, 1); alAvance(a); if (a >= .95) fin(); };
      const up = () => { if (x0 == null || hecho) return; x0 = null; if (a >= .45) fin(); else { a = 0; anima(0, 220); } };
      const quitaT = B.captura.poner(e => { if (e.key === ' ' || e.key === 'Enter') { fin(); return true; } return false; });
      esc.addEventListener('pointerdown', ab); window.addEventListener('pointermove', mv); window.addEventListener('pointerup', up); window.addEventListener('pointercancel', up);
      B.inter.caldera.hazPaso = fin; ctl.alMorir.push(() => { quita(); res(); });
    });
    const ponPuerta = a => { puerta.style.transform = 'perspective(900px) rotateY(' + (-a * 74) + 'deg)'; luz.style.opacity = .12 + a * .88; };

    /* 1 · el pestillo */
    paso(1, 'Pulsa el <b>pestillo</b> de la puerta.');
    await toqueEn(pest); if (ctl.muerto) return;
    pest.classList.add('arriba'); if (!suena(SFX.pestillo, { vol: .9 })) B.sint.metal(B.ahora(), .8);

    /* 2 · abrir la puerta */
    paso(2, 'Arrastra la <b>puerta de hierro</b> hacia la izquierda.');
    let chirrio = false;
    await arrastra(-1, a => {
      ponPuerta(a);
      if (a > .12 && !chirrio) { chirrio = true; if (!suena(SFX.abre, { vol: .8 })) B.sint.puerta(B.ahora(), .9); rug = B.sint.rugido(.1); fuego = suena(SFX.fuego, { bucle: true, vol: 0 }); }
      if (rug) rug.vol(.1 + a * .25); if (fuego) fuego.gan.gain.value = .55 * a;
    });
    if (ctl.muerto) return;
    if (!await U.dice(op, 'abierta', ctl)) return;

    /* 3 · coger la pala */
    paso(3, 'Coge la <b>pala</b>.');
    await toqueEn(pala); if (ctl.muerto) return;
    pala.classList.add('mano'); if (!suena(SFX.pala[1], { vol: .6 })) B.sint.metal(B.ahora(), .5);

    /* la palada en dos toques: CARBÓN (la pala baja al montón y sube cargada) y LLAMA (lanza el carbón al fuego).
       tq: cuándo suena (cuadrado al pulso de la canción, si la hay) */
    let nPal = 0;
    const vuela = () => {   // el carbón vuela de la pala a la boca del horno
      for (let k = 0; k < 5; k++) {
        const t = B.el('div', 'cal-vuela'); t.style.left = u(30 + Math.random() * 3); t.style.top = u(28 + Math.random() * 3);
        t.style.setProperty('--dx', u(14 + Math.random() * 8)); t.style.setProperty('--dy', u(2 + Math.random() * 6)); t.style.animationDelay = (k * 0.025) + 's';
        esc.appendChild(t); setTimeout(() => t.remove(), 700);
      }
    };
    const suenaEn = (src, tq, vol) => { if (!B.buf[src]) return false; B.suena(src, { bus: B.bus.sfx, t: tq, vol }); return true; };
    const coge = tq => {
      const ms = Math.max(0, (tq - B.ahora()) * 1000);
      pala.classList.remove('llena', 'lanza'); pala.classList.add('carga');
      if (!suenaEn(SFX.coge[nPal % 2], tq, 1) && !suena(SFX.pala[0], { vol: .7 })) B.sint.pala(B.ahora(), .6);
      setTimeout(() => { pala.classList.remove('carga'); pala.classList.add('llena'); }, ms + 200);
    };
    const echa = tq => {
      const ms = Math.max(0, (tq - B.ahora()) * 1000);
      nPal++;
      setTimeout(() => { pala.classList.remove('llena'); pala.classList.add('lanza'); setTimeout(() => pala.classList.remove('lanza'), 230); }, Math.max(0, ms - 80));
      if (!suenaEn(SFX.echa, tq, 1) && !suena(SFX.pala[2 - (nPal % 2)], { vol: .85 })) B.sint.pala(B.ahora(), .9);
      setTimeout(vuela, ms); setTimeout(() => { luz.classList.add('aviva'); if (rug) rug.vol(.5); }, ms + 160); setTimeout(() => { luz.classList.remove('aviva'); if (rug) rug.vol(.35); }, ms + 800);
    };
    const marca = (el, cls, ms) => { el.classList.add(cls); setTimeout(() => el.classList.remove(cls), ms || 420); };

    /* 4 · la primera palada, de prueba (sin música) */
    esc.classList.add('palear');
    paso(4, 'Pulsa el <b>carbón</b> y después la <b>llama</b>.');
    cCarbon.classList.add('activa'); await toqueEn(cCarbon); if (ctl.muerto) return;
    cCarbon.classList.remove('activa'); coge(B.ahora());
    cLlama.classList.add('activa'); await toqueEn(cLlama); if (ctl.muerto) return;
    cLlama.classList.remove('activa'); echa(B.ahora());
    await B.espera(.5, ctl); if (ctl.muerto) return;

    /* 5 · EL CANTO DE TRABAJO: Amos canta una frase y el coro la repite; en cada respuesta del coro, CARBÓN en su primer pulso y
       LLAMA en el segundo (los dos cuadrados con dibujo en la tira de abajo). Ventana amplia (pizarra y altavoz con retardo). */
    paso(5, 'Cuando contesta el <b>coro</b>: <b>carbón</b> y <b>llama</b>, al pulso.');
    if (!await U.dice(op, 'intro', ctl)) return;
    if (!await U.dice(op, 'cancion', ctl)) return;
    const CAN = CANCION, PU = CAN.pulsos.filter(b => b <= CAN.fin + .01), FR = CAN.frases, FIN = CAN.fin, coros = FR.filter(f => f.quien === 'CORO');
    const cerca = t => PU.reduce((m, b) => Math.abs(b - t) < Math.abs(m - t) ? b : m, PU[0]);
    const golpes = coros.map(f => { const c = cerca(f.s), i = PU.indexOf(c); return { f, c, l: PU[Math.min(PU.length - 1, i + 1)], hc: null, hl: null }; });
    const letra = U.panel(caja, { left: '50%', top: '14%', transform: 'translateX(-50%)', textAlign: 'center', minWidth: u(34), padding: 'calc(var(--u)*.5) calc(var(--u)*1.6)' });
    letra.innerHTML = '<div class="gh-l">&nbsp;</div>';
    const lA = letra.firstChild;
    const pnl = U.panel(caja, { left: '50%', bottom: '2.5%', transform: 'translateX(-50%)', width: '90%', textAlign: 'center', padding: 'calc(var(--u)*.7) calc(var(--u)*1.4)' });
    pnl.innerHTML = '<div class="gh-pista"><div class="gh-fila"></div><div class="gh-cursor"></div></div><div class="i-estado" style="margin-top:calc(var(--u)*.45)">Escucha a Amos…</div>';
    const fila = pnl.querySelector('.gh-fila'), cur = pnl.querySelector('.gh-cursor'), est = pnl.querySelector('.i-estado');
    const T0 = PU[0] - .45, T1 = FIN + .2, X = t => ((t - T0) / (T1 - T0) * 100).toFixed(3) + '%';
    const casC = new Map(), casL = new Map();
    PU.forEach(b => {
      const g = golpes.find(x => x.c === b), h = golpes.find(x => x.l === b);
      const q = B.el('i', 'gh-q' + (g ? ' gh-carbon' : h ? ' gh-llama' : ''), g ? ICO_CARBON : h ? ICO_LLAMA : '');
      q.style.left = X(b); fila.appendChild(q);
      if (g) casC.set(g, q); if (h) casL.set(h, q);
    });
    /* retardo de salida del audio (altavoz bluetooth, etc.): el alumno toca con lo que OYE */
    const lat = () => { const a = B.ac(); return Math.min(.35, (a.outputLatency || 0) + (a.baseLatency || 0)); };
    const VENT = [-.3, .36];
    let t0 = 0, aciertos = 0;
    const tc = () => B.ahora() - t0;
    const alPulso = () => {
      const ahora = B.ahora(); if (!t0) return ahora;
      const b = cerca(ahora - t0), tb = t0 + b;
      return Math.abs(tb - ahora) <= .22 ? Math.max(ahora + .004, tb) : ahora;
    };
    const enVentana = (t, b) => { const d = t - lat() - b; return d >= VENT[0] && d <= VENT[1]; };
    /* un toque en el carbón o en la llama durante la canción */
    const toque = cual => {
      if (!t0) return;
      const t = tc(), llena = pala.classList.contains('llena') || pala.classList.contains('carga');
      if (cual === 'auto') cual = llena ? 'llama' : 'carbon';
      if (cual === 'carbon') {
        coge(alPulso());
        const g = golpes.find(x => enVentana(t, x.c)); if (g && g.hc == null) g.hc = t;
        marca(cCarbon, g ? 'ok' : 'mal');
      } else {
        if (!llena) { marca(cLlama, 'mal'); return; }
        echa(alPulso());
        const g = golpes.find(x => enVentana(t, x.l)); if (g && g.hl == null && g.hc != null) g.hl = t;
        marca(cLlama, g && g.hc != null ? 'ok' : 'mal');
      }
    };
    const enC = e => { e.preventDefault(); e.stopPropagation(); B.ac(); toque('carbon'); };
    const enL = e => { e.preventDefault(); e.stopPropagation(); B.ac(); toque('llama'); };
    cCarbon.addEventListener('pointerdown', enC); cLlama.addEventListener('pointerdown', enL);
    const quitaT = B.captura.poner(e => { if (e.key === ' ' || e.key === 'Enter') { if (!e.repeat) toque('auto'); return true; } return false; });
    const limpia = () => { quitaT(); cCarbon.removeEventListener('pointerdown', enC); cLlama.removeEventListener('pointerdown', enL); };
    ctl.alMorir.push(limpia);
    B.inter.caldera.palada = (cual) => toque(cual || 'auto');   // para las pruebas
    /* la canción, la claqueta en cada pulso (más fuerte en los del carbón y la llama) y la letra */
    const st = document.getElementById('subt'); if (st) st.classList.remove('on');   // durante el canto, la letra va en su panel
    t0 = B.ahora() + .35;
    B.inter.caldera.t0 = t0;
    if (B.buf[CAN.src]) { B.suena(CAN.src, { bus: B.bus.voz, t: t0, vol: 1 }); B.enTiempo(t0, () => B.agacha(true), ctl); B.enTiempo(t0 + FIN + .3, () => B.agacha(false), ctl); ctl.alMorir.push(() => B.agacha(false)); }
    if (B.sint.baqueta) PU.forEach(b => B.sint.baqueta(t0 + b, golpes.some(g => g.c === b || g.l === b) ? .5 : .2));
    FR.forEach(f => B.enTiempo(t0 + f.s - .06, () => {
      lA.textContent = f.texto; lA.className = 'gh-l on ' + (f.quien === 'AMOS' ? 'gh-amos' : 'gh-coro');
      est.textContent = f.quien === 'AMOS' ? 'Amos canta… prepárate.' : '¡Ahora! Carbón… ¡y llama!';
    }, ctl));
    /* qué casilla toca ahora (un cambio de color fijo, sin animación) y el cursor de la tira */
    let actC = false, actL = false;
    const anima = () => {
      if (ctl.muerto || !pnl.isConnected) return;
      const t = tc(); cur.style.left = X(Math.max(T0, Math.min(T1, t)));
      const c = golpes.some(g => t > g.c - .6 && t < g.c + .3), l = golpes.some(g => t > g.l - .5 && t < g.l + .35);
      if (c !== actC) { actC = c; cCarbon.classList.toggle('activa', c); }
      if (l !== actL) { actL = l; cLlama.classList.toggle('activa', l); }
      if (t < T1 + .3) requestAnimationFrame(anima);
    };
    requestAnimationFrame(anima);
    /* al acabar cada respuesta del coro: ¿carbón y llama a tiempo? */
    for (const g of golpes) {
      if (!await B.espera(t0 + g.f.e + .4 - B.ahora(), ctl)) return;
      const okC = g.hc != null, okL = g.hl != null;
      casC.get(g).classList.add(okC ? 'ok' : 'mal'); casL.get(g).classList.add(okL ? 'ok' : 'mal');
      if (okC && okL) { aciertos++; aguja.style.transform = 'rotate(' + (-120 + 240 * aciertos / golpes.length) + 'deg)'; }
    }
    /* el corte después de «¡Y el último, pa' casa!», tapado por un buen golpe de vapor */
    if (B.buf['sfx/d1/vapor_escape.mp3']) B.suena('sfx/d1/vapor_escape.mp3', { bus: B.bus.sfx, vol: 1, t: Math.max(B.ahora(), t0 + FIN - .25) });
    luz.classList.add('aviva'); setTimeout(() => luz.classList.remove('aviva'), 1200);
    if (!await B.espera(t0 + FIN + 1 - B.ahora(), ctl)) return;
    limpia();
    B.inter.caldera.aciertos = aciertos;
    cCarbon.classList.remove('activa'); cLlama.classList.remove('activa'); esc.classList.remove('palear');
    letra.remove(); pnl.remove();
    pala.classList.remove('mano', 'llena', 'carga'); pala.classList.add('suelta'); if (!suena(SFX.pala[1], { vol: .5 })) B.sint.metal(B.ahora(), .4);

    /* 6 · cerrar la puerta */
    paso(6, (aciertos >= 6 ? '¡Presión a tope! ' : '') + aciertos + ' de 8 paladas. Cierra la <b>puerta</b>: arrástrala a la derecha.');
    let golpe = false;
    await arrastra(1, a => { ponPuerta(1 - a); if (rug) rug.vol(.35 * (1 - a) + .08); if (fuego) fuego.gan.gain.value = .55 * (1 - a); if (a >= .9 && !golpe) { golpe = true; if (!suena(SFX.cierra, { vol: .8 })) B.sint.puerta(B.ahora(), .6); } });
    if (ctl.muerto) return;
    pest.classList.remove('arriba');
    if (fuego) { fuego.parar(1.2); fuego = null; }
    if (!await U.dice(op, aciertos >= 6 ? 'acierto' : 'fallo', ctl)) return;
    if (!await U.dice(op, 'fin', ctl)) return;
    await U.seguir(caja, ctl, 'Seguir');
  };
  B.inter.caldera.subtAbajo = true;   // (ronda 6) el texto de Amos, abajo: el alumno mira al carbón y a la caldera
  B.inter.caldera.voces = [SFX.pestillo, SFX.abre, SFX.cierra, SFX.fuego, CANCION.src, 'sfx/d1/vapor_escape.mp3', SFX.echa].concat(SFX.pala, SFX.coge);   // se precargan con el acto
  B.inter.caldera.claves = ['abierta', 'intro', 'llamada1', 'llamada2', 'llamada3', 'llamada4', 'llamada5', 'llamada6', 'llamada7', 'llamada8', 'respuesta', 'cancion', 'acierto', 'fallo', 'fin'];
})(window.BLUES);
