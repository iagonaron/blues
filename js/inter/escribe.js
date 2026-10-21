/* BLUES · escribe (P2.3): Xan apunta el solo de Teddy en su libreta y luego Teddy lo toca de verdad.
   (C2, 20-oct 14:38–14:39 · Iago) «no me gusta la trompeta MIDI»; «una sola página, en vertical, que el pentagrama quepa
   en ella y no en medio de la apertura»; «la trompeta sin sordina»; «Xan escribe de memoria: solo se oye el lápiz, sin las
   notas; luego se oye la melodía con swing sacada de Splice, que se corresponda con lo que escribió Xan».
   La melodía: lick de trompeta de Splice (Basement Freaks · Spaghetti Trumpet, «Jazz Swing 02»), en Sol y re-colocado nota a
   nota en swing 2:1 a 100 bpm (sfx/d2/trompeta_lick.mp3): sol si♭ do do♯ do si♭ sol, dos veces. En la libreta, las mismas
   notas en corcheas iguales y con barra de repetición. Lápiz: Household Source (Splice). */
'use strict';
(function (B) {
  const U = B.iu;
  const LICK = 'sfx/d2/trompeta_lick.mp3', LAPIZ = 'sfx/d2/lapiz_trazo.mp3';
  /* [midi, alteración que se escribe, duración en negras] — lo que «escribe» Xan */
  const SOLO = [[67, '', .5], [70, '♭', .5], [72, '', .5], [73, '♯', .5], [72, '♮', .5], [70, '', .5], [67, '', 1]];
  const NX = [104, 146, 190, 228, 268, 302, 336];
  /* ataques reales en el mp3 (s): compás 1 y su repetición */
  const ATAQ = [.092, .492, .692, 1.092, 1.292, 1.692, 1.892];
  const PASO = { 64: 0, 65: 1, 67: 2, 69: 3, 70: 4, 71: 4, 72: 5, 73: 5, 74: 6 };
  const yDe = m => 96 - PASO[m] * 7;   // pentagrama de 40 a 96 (líneas cada 14)
  const TINTA = '#2b1f14';
  const destello = (el, cls, ms) => { if (!el) return; el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); setTimeout(() => el.classList.remove(cls), ms || 160); };
  function estilo() {
    if (document.getElementById('d2-escribe-css')) return;
    const s = document.createElement('style'); s.id = 'd2-escribe-css';
    s.textContent = '.d2-hoja{position:absolute;left:33%;top:51%;height:90%;aspect-ratio:560/798;transform:translate(-50%,-50%) rotate(-1.5deg);background:url(img/inter/d2_libreta_hoja.webp) center/100% 100% no-repeat;filter:drop-shadow(0 calc(var(--u)*.7) calc(var(--u)*1.4) rgba(0,0,0,.6))}' +
      '.d2-hoja .d2-tit{position:absolute;left:14%;right:8%;top:9%;font-style:italic;color:#6b4e2e;font-size:calc(var(--u)*1.9)}' +
      '.d2-hoja .d2-pauta{position:absolute;left:9%;right:4%;top:23%;aspect-ratio:400/150}.d2-hoja svg{width:100%;height:100%;overflow:visible}' +
      '.d2-hoja .d2-est{position:absolute;left:14%;right:8%;bottom:9%;color:#5b4630;font-size:calc(var(--u)*1.45);font-style:italic;line-height:1.35}' +
      '.d2-hoja .n.toca *{fill:#b5482b;stroke:#b5482b}.d2-hoja .n *{transition:fill .12s,stroke .12s}' +
      '.d2-lapiz{position:absolute;width:calc(var(--u)*10);aspect-ratio:500/283;background:url(img/inter/d2_lapiz.webp) center/contain no-repeat;transform-origin:0% 100%;transform:translate(0,-100%);transition:left .2s ease-out,top .2s ease-out;pointer-events:none;filter:drop-shadow(calc(var(--u)*.3) calc(var(--u)*.4) calc(var(--u)*.3) rgba(0,0,0,.45))}' +
      '.d2-lapiz.raya{transform:translate(0,-100%) rotate(-5deg)}.d2-lapiz.fuera{opacity:0;transition:opacity .5s}' +
      '.d2-trompeta{position:absolute;right:4%;top:64%;width:calc(var(--u)*30);aspect-ratio:686/239;background:url(img/inter/d2_trompeta_abierta.webp) center/contain no-repeat;transition:transform .1s ease-out;transform-origin:15% 60%;filter:drop-shadow(0 calc(var(--u)*.5) calc(var(--u)*.8) rgba(0,0,0,.6))}' +
      '.d2-trompeta.sopla{transform:scale(1.04) rotate(-2deg)}' +
      '.d2-hoja .aparece{animation:d2ap .3s ease-out}@keyframes d2ap{from{opacity:0}to{opacity:1}}';
    document.head.appendChild(s);
  }
  /* las piezas que va escribiendo Xan, en orden (cada una, un trazo de lápiz) */
  function piezas() {
    const P = [];
    P.push({ x: 64, y: 68, h: '<text x="55" y="67" font-size="29" font-weight="700" font-family="Georgia,serif" fill="' + TINTA + '">4</text><text x="55" y="95" font-size="29" font-weight="700" font-family="Georgia,serif" fill="' + TINTA + '">4</text>' });
    const arriba = k => [0, 1].includes(k) || k === 6;          // plicas: sol-si♭ y la negra hacia arriba; el resto, hacia abajo
    SOLO.forEach(([m, alt, d], k) => {
      const x = NX[k], y = yDe(m), up = arriba(k), sx = up ? x + 9.6 : x - 9.6, sy = up ? y - 42 : y + 42;
      let h = '<g class="n" data-i="' + k + '">';
      if (alt) h += '<text x="' + (x - 25) + '" y="' + (y + (alt === '♭' ? 6 : 8)) + '" font-size="24" fill="' + TINTA + '">' + alt + '</text>';
      h += '<ellipse cx="' + x + '" cy="' + y + '" rx="10" ry="7.3" transform="rotate(-20 ' + x + ' ' + y + ')" fill="' + TINTA + '"/>';
      h += '<line x1="' + sx + '" x2="' + sx + '" y1="' + y + '" y2="' + sy + '" stroke="' + TINTA + '" stroke-width="2"/>';
      if (d < 1 && k % 2 === 1) { const xa = NX[k - 1] + (up ? 9.6 : -9.6), ya = yDe(SOLO[k - 1][0]) + (up ? -42 : 42), yb = sy, g = up ? 6 : -6;
        h += '<path d="M' + (xa - 1) + ' ' + ya + 'L' + (sx + 1) + ' ' + yb + 'L' + (sx + 1) + ' ' + (yb + g) + 'L' + (xa - 1) + ' ' + (ya + g) + 'Z" fill="' + TINTA + '"/>'; }
      h += '</g>'; P.push({ x: x + 6, y, h, k });
    });
    P.push({ x: 356, y: 68, h: '<path d="M353 50l8 10.5-6 8 8 10.5c-7-2.3-11.5 1.2-5.8 8-10.5-4.6-7-14 0-10.5l-7-9.3 7-8z" fill="' + TINTA + '"/>' });
    P.push({ x: 384, y: 68, h: '<circle cx="372" cy="61" r="2.8" fill="' + TINTA + '"/><circle cx="372" cy="75" r="2.8" fill="' + TINTA + '"/><line x1="378" x2="378" y1="40" y2="96" stroke="' + TINTA + '" stroke-width="1.6"/><line x1="385" x2="385" y1="40" y2="96" stroke="' + TINTA + '" stroke-width="4.5"/>' });
    return P;
  }
  B.inter.escribe = async function (caja, op) {
    const ctl = op.ctl;
    U.fondo(caja); estilo();
    const hoja = B.el('div', 'd2-hoja'); caja.appendChild(hoja);
    hoja.innerHTML = '<div class="d2-tit">El solo de Teddy</div><div class="d2-pauta"><svg viewBox="0 0 400 150"><g stroke="' + TINTA + '" stroke-opacity=".78" stroke-width="1.2">' +
      [0, 1, 2, 3, 4].map(i => '<line x1="6" x2="392" y1="' + (40 + i * 14) + '" y2="' + (40 + i * 14) + '"/>').join('') + '<line x1="6" x2="6" y1="40" y2="96"/></g>' +
      '<text x="8" y="100" font-size="77" fill="' + TINTA + '" fill-opacity=".88" font-family="Bravura,\'Noto Music\',\'Segoe UI Symbol\',\'Apple Symbols\',serif">𝄞</text><g class="ns"></g></svg><div class="d2-lapiz"></div></div><div class="d2-est"></div>';
    const tr = B.el('div', 'd2-trompeta'); caja.appendChild(tr);
    const ns = hoja.querySelector('.ns'), est = hoja.querySelector('.d2-est'), lapiz = hoja.querySelector('.d2-lapiz');
    const ponLapiz = (x, y) => { lapiz.style.left = (x / 400 * 100) + '%'; lapiz.style.top = (y / 150 * 100) + '%'; };
    ponLapiz(60, 70);
    est.textContent = 'Xan lo apunta de memoria, en corcheas iguales…';
    /* 1) Xan escribe: solo se oye el lápiz */
    await B.espera(.6, ctl); if (ctl.muerto) return;
    for (const p of piezas()) {
      ponLapiz(p.x, p.y); await B.espera(.16, ctl); if (ctl.muerto) return;
      ns.insertAdjacentHTML('beforeend', '<g class="aparece">' + p.h + '</g>'); destello(lapiz, 'raya', 170);
      if (B.buf[LAPIZ]) B.suena(LAPIZ, { vol: .55 + Math.random() * .15, rate: .88 + Math.random() * .26 });
      await B.espera(.26 + Math.random() * .12, ctl); if (ctl.muerto) return;
    }
    lapiz.classList.add('fuera');
    await B.espera(.7, ctl); if (ctl.muerto) return;
    /* 2) Teddy lo toca de verdad (Splice): mismas notas… con swing */
    await U.di(U.rota(op, 'deverdad', B.inter.escribe.voces), ctl); if (ctl.muerto) return;
    const notas = B.$$('.n', ns);
    let h = null;
    const toca = () => {
      if (h) h.parar(.08);
      if (!B.buf[LICK]) return 0;
      const t0 = B.ahora() + .08; h = B.suena(LICK, { t: t0, vol: .95 });
      [0, 2.4].forEach(c => ATAQ.forEach((a, k) => B.enTiempo(t0 + c + a, () => { notas.forEach((n, j) => n.classList.toggle('toca', j === k)); destello(tr, 'sopla', 150); }, ctl)));
      B.enTiempo(t0 + 2.4 + 2.6, () => notas.forEach(n => n.classList.remove('toca')), ctl);
      return B.buf[LICK].duration;
    };
    ctl.alMorir.push(() => { if (h) h.parar(.1); });
    est.textContent = 'Teddy lo toca: las mismas notas… pero no suenan como están escritas.';
    const dur = toca();
    if (!await B.espera(dur + .5, ctl)) return;
    const pie = B.el('div', 'i-pie'); caja.appendChild(pie);
    pie.appendChild(U.boton('Otra vez', 'peq', () => toca()));
    await U.seguir(caja, ctl, 'Seguir', pie);
    if (h) h.parar(.3);
  };
  B.inter.escribe.voces = [{ quien: 'TEDDY', texto: 'Ahora, de verdad.', voz: 'voz/d2/d2_r007.mp3' }];
  B.inter.escribe.claves = ['deverdad'];
})(window.BLUES);

/* ══════════ (C2, 20-oct · Iago: «alguna interacción más, aunque no sea musical: abrir puertas y cosas así, sin alargar»)
   tres interacciones cortas del acto 2. Viven en este fichero (del acto 2) porque index.html, que es común, solo carga
   los módulos que ya existen. ══════════ */
(function (B) {
  const U = B.iu;
  const destello = (el, cls, ms) => { if (!el) return; el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); setTimeout(() => el.classList.remove(cls), ms || 160); };
  const suena = (src, o) => B.buf[src] ? B.suena(src, Object.assign({ t: B.ahora() }, o || {})) : null;
  function estilo() {
    if (document.getElementById('d2-extra-css')) return;
    const s = document.createElement('style'); s.id = 'd2-extra-css';
    s.textContent =
      '.d2-full{position:absolute;inset:0;background:center/cover no-repeat}' +
      '.d2-puerta{cursor:grab;touch-action:none;box-shadow:calc(var(--u)*-1.5) 0 calc(var(--u)*2) rgba(0,0,0,.7)}.d2-puerta.suelta{transition:transform .75s cubic-bezier(.3,.1,.2,1)}' +
      '.d2-pista{position:absolute;left:50%;bottom:7%;transform:translateX(-50%);padding:calc(var(--u)*.6) calc(var(--u)*1.6);background:rgba(12,9,6,.72);border:1px solid var(--oro-a);border-radius:calc(var(--u)*.5);color:var(--crema);font-size:calc(var(--u)*1.45);white-space:nowrap;pointer-events:none;transition:opacity .4s}' +
      '.d2-vent{position:absolute;left:0;top:0;width:1000px;height:1000px;transform-origin:0 0;pointer-events:none}.d2-vent .d2-estor{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:auto}' +
      '.d2-estor{position:absolute;background:url(img/inter/d2_estor.webp) center bottom/100% 100% no-repeat;cursor:grab;touch-action:none;filter:drop-shadow(0 calc(var(--u)*.4) calc(var(--u)*.5) rgba(0,0,0,.55))}.d2-estor.suelta{transition:height .6s cubic-bezier(.3,.1,.2,1)}' +
      '.d2-diario{position:absolute;left:50%;top:47%;transform:translate(-50%,-50%);width:calc(var(--u)*66);aspect-ratio:var(--ard,1.6);background:url(img/inter/d2_periodico.webp) left center/50% 100% no-repeat,url(img/inter/d2_periodico.webp) right center/50% 100% no-repeat;filter:drop-shadow(0 calc(var(--u)*.8) calc(var(--u)*1.4) rgba(0,0,0,.65))}' +
      '.d2-cab{position:absolute;left:6%;right:6%;top:5%;padding:calc(var(--u)*.5) 0;background:#efe4c9;border-top:3px double #5b4a35;border-bottom:3px double #5b4a35;text-align:center;font-family:Georgia,serif;color:#241a10;letter-spacing:.06em}.d2-cab b{display:block;font-size:calc(var(--u)*3);font-weight:900;text-transform:uppercase}.d2-cab i{font-size:calc(var(--u)*1.1)}' +
      '.d2-recortes{position:absolute;left:6%;right:6%;top:27%;bottom:9%;display:flex;gap:calc(var(--u)*1.6)}' +
      '.d2-recorte{flex:1;background:#efe4c9;border:1px solid #b9a77f;padding:calc(var(--u)*1.1);cursor:pointer;color:#241a10;font-family:Georgia,serif;box-shadow:0 calc(var(--u)*.3) calc(var(--u)*.6) rgba(0,0,0,.35);transition:transform .18s,box-shadow .18s,opacity .3s;transform:rotate(var(--r,0deg));position:relative}' +
      '.d2-recorte h4{margin:0 0 calc(var(--u)*.8);font-size:calc(var(--u)*1.55);line-height:1.12;text-transform:uppercase;font-weight:900}' +
      '.d2-recorte .txt{height:52%;background:repeating-linear-gradient(#5b4a35 0 1px,transparent 1px calc(var(--u)*.85));opacity:.45}' +
      '.d2-recorte:hover,.d2-recorte.leyendo{transform:rotate(0deg) scale(1.07);box-shadow:0 calc(var(--u)*.8) calc(var(--u)*1.6) rgba(0,0,0,.5);z-index:2}' +
      '.d2-recorte.leido{opacity:.55}.d2-recorte.leido::after{content:"✓";position:absolute;right:calc(var(--u)*.6);bottom:calc(var(--u)*.2);font-size:calc(var(--u)*3);color:#7a2e1c;transform:rotate(-12deg)}' +
      '.d2-diario.ocupado .d2-recorte:not(.leyendo){pointer-events:none}' +
      /* (Iago 14:42: «que las noticias tengan alguna imagen, al menos al pulsar») op.fotos[k] = foto de periódico del recorte: aparece al pulsarlo y se queda */
      '.d2-recorte .foto{position:relative;height:0;margin:0;background:center/cover no-repeat;filter:grayscale(1) sepia(.3) contrast(1.12);border:1px solid rgba(36,26,16,.5);opacity:0;transition:height .55s cubic-bezier(.3,.1,.2,1),margin .55s,opacity .55s}' +
      '.d2-recorte .foto::after{content:"";position:absolute;inset:0;background:radial-gradient(rgba(20,14,8,.32) 28%,transparent 31%) 0 0/3px 3px;mix-blend-mode:multiply}' +
      '.d2-recorte.con-foto .foto{height:44%;margin-bottom:calc(var(--u)*.7);opacity:1}.d2-recorte .txt{transition:height .55s}.d2-recorte.con-foto .txt{height:18%}';
    document.head.appendChild(s);
  }
  /* arrastre genérico: llama a mueve(fracción 0–1) y, al soltar por encima de «umbral» (o con Espacio/clic sin arrastrar), abre */
  function arrastre(el, eje, tam, mueve, umbral, ctl) {
    return new Promise(res => {
      let ini = null, f = 0, hecho = false;
      const abre = () => { if (hecho) return; hecho = true; quita(); res(true); };
      const quita = B.captura.poner(e => { if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowRight' || e.key === 'ArrowUp') { if (!e.repeat) abre(); return true; } return false; });
      ctl.alMorir.push(() => { quita(); res(false); });
      el.addEventListener('pointerdown', e => { e.preventDefault(); ini = eje === 'x' ? e.clientX : e.clientY; el.setPointerCapture(e.pointerId); el.style.cursor = 'grabbing'; });
      el.addEventListener('pointermove', e => { if (ini == null || hecho) return; const d = eje === 'x' ? e.clientX - ini : ini - e.clientY; f = Math.max(0, Math.min(1, d / tam())); mueve(f); });
      el.addEventListener('pointerup', () => { if (ini == null) return; ini = null; el.style.cursor = ''; if (f >= umbral || f < .02) abre(); else mueve(0, true); });
    });
  }

  /* P2.2a · la puerta corredera del vagón de equipajes, EN 3D (Iago, 20-oct: «que sea por modelaje 3D o algo así, no un barrido
     de toda la imagen»): una escena con perspectiva real — el interior del vagón al fondo (a «prof» px), la pared con su hueco,
     el grosor del marco (jambas) y la hoja de la puerta por delante, en su carril. El alumno arrastra la hoja (o Espacio/clic);
     al abrirse, la luz del farol sale por el hueco y la cámara avanza, entra por la puerta y acaba dentro del vagón, encuadrado
     igual que la lámina del plano siguiente (P2.2), sin corte. op.muro (pared con el hueco transparente), op.hoja (la hoja
     recortada) y op.hueco [x0, y0, x1, y1] (fracciones del encuadre) salen de la lámina de P2.2a. */
  B.inter.puerta = async function (caja, op) {
    const ctl = op.ctl; estilo();
    const H = op.hueco || [.4, 0, 1, 1], P = 1000, PROF = op.prof || 450;
    /* perspectiva calculada a mano (más fiable que preserve-3d dentro del escenario escalado): cada capa es un plano a su
       profundidad z; escala aparente s = P / (P − z_efectiva), centrada en el centro de la pantalla */
    if (!document.getElementById('d2-puerta3d-css')) { const s = document.createElement('style'); s.id = 'd2-puerta3d-css';
      s.textContent = '.d2p-vista{position:absolute;inset:0;overflow:hidden;background:#000;touch-action:none;cursor:grab}' +
        '.d2p-capa{position:absolute;inset:0;background:center/100% 100% no-repeat;transform-origin:50% 50%;will-change:transform}' +
        '.d2p-borde{position:absolute;pointer-events:none}.d2p-borde.t{left:0;right:0;top:0;height:22%;background:linear-gradient(#000,transparent)}.d2p-borde.b{left:0;right:0;bottom:0;height:22%;background:linear-gradient(transparent,#000)}.d2p-borde.l{top:0;bottom:0;left:0;width:16%;background:linear-gradient(90deg,#000,transparent)}.d2p-borde.r{top:0;bottom:0;right:0;width:16%;background:linear-gradient(270deg,#000,transparent)}' +
        '.d2p-sombra{position:absolute;inset:0;background:radial-gradient(60% 70% at 50% 45%,rgba(255,170,80,.10),rgba(0,0,0,.85) 75%)}' +
        '.d2p-marco{position:absolute;box-shadow:inset calc(var(--u)*2.4) 0 calc(var(--u)*2.2) rgba(0,0,0,.85),inset 0 calc(var(--u)*1.6) calc(var(--u)*1.6) rgba(0,0,0,.7);will-change:transform}' +
        '.d2p-hoja{position:absolute;background:center/100% 100% no-repeat;box-shadow:calc(var(--u)*-1.4) 0 calc(var(--u)*1.8) rgba(0,0,0,.75);will-change:transform}' +
        '.d2p-luz{position:absolute;pointer-events:none;background:radial-gradient(50% 60% at 50% 40%,rgba(255,190,110,.55),rgba(255,150,60,0) 70%);mix-blend-mode:screen;opacity:0}';
      document.head.appendChild(s); }
    const vista = B.el('div', 'd2p-vista'); caja.appendChild(vista);
    const W = () => vista.clientWidth, Hh = () => vista.clientHeight;
    const dentro = B.el('div', 'd2p-capa'); dentro.style.backgroundImage = 'url(' + (op.dentro || 'img/d2/p2_2.webp') + ')'; vista.appendChild(dentro);
    const sombra = B.el('div', 'd2p-sombra'); dentro.appendChild(sombra);
    const bordes = ['t', 'b', 'l', 'r'].map(k => { const d = B.el('div', 'd2p-borde ' + k); dentro.appendChild(d); return d; });   // el borde del interior se funde con la oscuridad del vagón
    const muro = B.el('div', 'd2p-capa'); muro.style.backgroundImage = 'url(' + (op.muro || 'img/inter/d2_puerta_muro.webp') + ')'; vista.appendChild(muro);
    const pct = v => (v * 100) + '%';
    const enHueco = cls => { const d = B.el('div', cls); d.style.left = pct(H[0]); d.style.top = pct(H[1]); d.style.width = pct(H[2] - H[0]); d.style.height = pct(H[3] - H[1]); vista.appendChild(d); return d; };
    const marco = enHueco('d2p-marco');
    const hoja = enHueco('d2p-hoja'); hoja.style.backgroundImage = 'url(' + (op.hoja || 'img/inter/d2_puerta_hoja.webp') + ')';
    const luz = B.el('div', 'd2p-luz'); luz.style.left = pct(H[0] - .05); luz.style.top = pct(H[1]); luz.style.width = pct(H[2] - H[0] + .1); luz.style.height = pct(Math.min(1, H[3] - H[1] + .25)); vista.appendChild(luz);
    const pista = B.el('div', 'd2-pista'); pista.textContent = op.pista || 'Arrastra la puerta para subir al vagón'; caja.appendChild(pista);
    let abierto = 0, cam = 0;
    const cx = (.5 - (H[0] + H[2]) / 2), cy = (.5 - (H[1] + H[3]) / 2);
    /* un plano a profundidad z, desplazado (dx, dy) en su propio plano: escala y posición vistas desde la cámara */
    function plano(el, z, dx, dy, x0, y0) {
      const w = W(), h = Hh(), zEf = z + PROF * cam, s = P / Math.max(1, P - zEf);
      el.style.transformOrigin = (w / 2 - x0) + 'px ' + (h / 2 - y0) + 'px';
      el.style.transform = 'translate(' + (dx * s) + 'px,' + (dy * s) + 'px) scale(' + s + ')';
      return s;
    }
    function pinta() {
      const w = W(), h = Hh(), e = cam, sx = cx * w * e, sy = cy * h * e;
      plano(dentro, -PROF, 0, 0, 0, 0);
      plano(muro, 0, sx, sy, 0, 0);
      plano(marco, 0, sx, sy, H[0] * w, H[1] * h);
      plano(luz, 0, sx, sy, (H[0] - .05) * w, H[1] * h);
      plano(hoja, 6, sx + abierto * (H[2] - H[0]) * w * 1.02, sy, H[0] * w, H[1] * h);
      sombra.style.opacity = String(1 - .9 * Math.max(abierto * .4, e));
      bordes.forEach(d => d.style.opacity = String(Math.max(0, 1 - e * 1.15)));
      luz.style.opacity = String(Math.min(1, abierto * 1.2) * (1 - e));
      const fuera = String(e > .8 ? Math.max(0, 1 - (e - .8) / .15) : 1);
      muro.style.opacity = hoja.style.opacity = marco.style.opacity = fuera;
    }
    pinta(); const rz = () => pinta(); addEventListener('resize', rz); ctl.alMorir.push(() => removeEventListener('resize', rz));
    let ruido = null;
    const suenaPuerta = () => { if (!ruido) ruido = suena('sfx/d2/puerta_corredera.mp3', { vol: .85 }); };
    /* (Iago, 20-oct 14:32) al abrir, entra con fade in la música que tocan ellos dentro; sigue sin corte en P2.2 (misma pista) */
    const MUS = op.musica || { src: 'mus/musica_tren.mp3', vol: .45 };
    const musica = v => { if (B.buf[MUS.src]) B.musica({ src: MUS.src, vol: Math.max(.02, v), bucle: true }); };
    const ok = await new Promise(res => {
      let x0 = null, hecho = false;
      const fin = () => { if (hecho) return; hecho = true; quita(); res(true); };
      const quita = B.captura.poner(e => { if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowRight') { if (!e.repeat) fin(); return true; } return false; });
      ctl.alMorir.push(() => { quita(); res(false); });
      vista.addEventListener('pointerdown', e => { e.preventDefault(); x0 = e.clientX; try { vista.setPointerCapture(e.pointerId); } catch (er) { } vista.style.cursor = 'grabbing'; });
      vista.addEventListener('pointermove', e => { if (x0 == null || hecho) return; abierto = Math.max(0, Math.min(1, (e.clientX - x0) / (W() * (H[2] - H[0]) * .9))); if (abierto > .03) { suenaPuerta(); musica(MUS.vol * .55 * abierto); } pinta(); });
      vista.addEventListener('pointerup', () => { if (x0 == null) return; x0 = null; vista.style.cursor = ''; if (abierto >= .22 || abierto < .02) fin(); else { abierto = 0; pinta(); } });
    });
    if (!ok || ctl.muerto) return;
    suenaPuerta(); pista.style.opacity = 0; musica(MUS.vol * .5);
    /* la hoja termina de correr por su carril (con un pequeño tope) y la cámara entra */
    const anima = (dur, f) => new Promise(r => { const t0 = performance.now(); const paso = () => { if (ctl.muerto) return r(); const k = Math.min(1, (performance.now() - t0) / (dur * 1000)); f(k); pinta(); k < 1 ? requestAnimationFrame(paso) : r(); }; requestAnimationFrame(paso); });
    const a0 = abierto, suave = k => k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
    await anima(.7 * (1 - a0) + .25, k => { abierto = a0 + (1 - a0) * (1 - Math.pow(1 - k, 3)); });
    suena('sfx/d2/tabla_golpe.mp3', { vol: .5 });
    suena('sfx/d2/tren_arranca.mp3', { vol: .5, t: B.ahora() + .9 });
    await B.espera(.35, ctl); if (ctl.muerto) return;
    musica(MUS.vol);
    await anima(2.1, k => { cam = suave(k); });
    await B.espera(.15, ctl);
  };

  /* P2.8a · el estor de la ventanilla: se sube arrastrando y aparece Manhattan */
  /* (Iago 14:45: «el estor se ve completamente horizontal y no está adecuado al ángulo de la imagen») el estor vive en el
     plano de la ventana: op.quad = 4 esquinas del cristal en la lámina [sup-izq, sup-der, inf-der, inf-izq] y una
     homografía (matrix3d) lleva el rectángulo del estor a ese cuadrilátero; al subirlo, sube en perspectiva. */
  function homografia(q, W, H) {
    const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = q;
    const dx1 = x1 - x2, dx2 = x3 - x2, dx3 = x0 - x1 + x2 - x3, dy1 = y1 - y2, dy2 = y3 - y2, dy3 = y0 - y1 + y2 - y3;
    const den = dx1 * dy2 - dx2 * dy1, g = (dx3 * dy2 - dx2 * dy3) / den, h = (dx1 * dy3 - dx3 * dy1) / den;
    const a = x1 - x0 + g * x1, b = x3 - x0 + h * x3, d = y1 - y0 + g * y1, e = y3 - y0 + h * y3;
    return 'matrix3d(' + [a / W, d / W, 0, g / W, b / H, e / H, 0, h / H, 0, 0, 1, 0, x0, y0, 0, 1].join(',') + ')';
  }
  B.inter.ventana = async function (caja, op) {
    const ctl = op.ctl; estilo();
    const z = op.zona || [.742, .19, .968, .665];
    const Q = op.quad || [[z[0], z[1]], [z[2], z[1]], [z[2], z[3]], [z[0], z[3]]];
    const vent = B.el('div', 'd2-vent'); caja.appendChild(vent);
    const es = B.el('div', 'd2-estor'); vent.appendChild(es);
    const coloca = () => { const w = caja.clientWidth, h = caja.clientHeight; vent.style.transform = homografia(Q.map(([x, y]) => [x * w, y * h]), 1000, 1000); };
    coloca(); const ro = new ResizeObserver(coloca); ro.observe(caja); ctl.alMorir.push(() => ro.disconnect());
    const pista = B.el('div', 'd2-pista'); pista.textContent = op.pista || 'Sube el estor de la ventanilla'; caja.appendChild(pista);
    const alto = () => caja.clientHeight * (Math.max(Q[2][1], Q[3][1]) - Math.min(Q[0][1], Q[1][1]));
    const mueve = (f, vuelve) => { es.classList.toggle('suelta', !!vuelve); es.style.height = (100 * (1 - .9 * f)) + '%'; };
    const ok = await arrastre(es, 'y', () => alto() * .8, mueve, .35, ctl); if (!ok || ctl.muerto) return;
    pista.style.opacity = 0; es.classList.add('suelta'); es.style.height = '10%';
    const r = suena('sfx/d2/tren_marcha.mp3', { vol: .0001, offset: 3 });
    if (r) { const t = B.ahora(); r.gan.gain.setValueAtTime(.0001, t); r.gan.gain.linearRampToValueAtTime(.55, t + .4); r.gan.gain.linearRampToValueAtTime(0, t + 3.4); r.fuente.stop(t + 3.6); }
    await B.espera(1.6, ctl);
  };

  /* P2.5 · el periódico de ayer: el alumno elige qué recorte se lee (cada uno con sus frases, en el orden que quiera) */
  const RECORTES = [
    { k: 'schoenberg', t: 'Berlín: abuchean otra vez a Schoenberg', r: '-2deg' },
    { k: 'cinta', t: 'Alemania: patentan una cinta que guarda el sonido', r: '1.5deg' },
    { k: 'gershwin', t: 'Gershwin estrena en el Carnegie Hall… con bocinas de taxi', r: '-1deg' }];
  B.inter.periodico = async function (caja, op) {
    const ctl = op.ctl; estilo(); U.fondo(caja);
    const di = B.el('div', 'd2-diario'); caja.appendChild(di);
    if (B.inter.periodico.ard) di.style.setProperty('--ard', B.inter.periodico.ard);
    di.innerHTML = '<div class="d2-cab"><b>' + B.esc(op.cabecera || 'Noticias del mundo') + '</b><i>' + B.esc(op.fecha || 'Lunes, 10 de diciembre de 1928') + '</i></div><div class="d2-recortes">' +
      RECORTES.filter(x => U.hay(op, x.k)).map(x => '<div class="d2-recorte" data-k="' + x.k + '" style="--r:' + x.r + '"><h4>' + B.esc(x.t) + '</h4>' + (op.fotos && op.fotos[x.k] ? '<div class="foto" style="background-image:url(' + op.fotos[x.k] + ')"></div>' : '') + '<div class="txt"></div></div>').join('') + '</div>';
    const pista = B.el('div', 'd2-pista'); pista.textContent = 'Elige un recorte para leerlo'; caja.appendChild(pista);
    const rs = B.$$('.d2-recorte', di); let quedan = rs.length;
    await new Promise(res => {
      ctl.alMorir.push(() => res());
      rs.forEach(el => el.addEventListener('click', async () => {
        if (di.classList.contains('ocupado') || el.classList.contains('leido')) return;
        di.classList.add('ocupado'); el.classList.add('leyendo'); pista.style.opacity = 0; if (el.querySelector('.foto')) el.classList.add('con-foto');
        const p = suena('sfx/d2/papel.mp3', { vol: .5 }); if (p) p.fuente.stop(B.ahora() + 1.2);
        for (const l of U.lineas(op, el.dataset.k)) { await U.di(l, ctl); if (ctl.muerto) return res(); }
        el.classList.remove('leyendo'); el.classList.add('leido'); di.classList.remove('ocupado');
        if (--quedan <= 0) res(); else { pista.textContent = quedan === 1 ? 'Queda uno' : 'Elige otro'; pista.style.opacity = 1; }
      }));
    });
    if (ctl.muerto) return;
    await U.seguir(caja, ctl, 'Seguir');
  };
  B.inter.periodico.claves = ['schoenberg', 'cinta', 'gershwin'];
})(window.BLUES);

/* ══════════ (C2, 21-oct · Iago 14:41) PORTADA DEL ACTO 2 EN VÍDEO
   «que pase el tren llegando a la estación del acto 2 y luego se quede quieto el último fotograma, ya sin el tren, con sonido
   ambiente». Vídeo de Runway (img/d2/p2_0_tren.mp4, 8 s) que empieza y acaba en la misma estación vacía: la lámina del plano
   (img/d2/p2_0.webp) ES ese último fotograma, así que al terminar el vídeo se funde y queda la imagen quieta con el ambiente
   del andén (amb del plano) y la vida. El sonido del tren va aparte (sfx/d2/tren_llega.mp3), por Web Audio (bus de efectos),
   sincronizado con el vídeo. Si el vídeo no carga, no pasa nada: se ve la lámina. Datos: plano P2.0 → "video": {src, sonido}. */
(function (B) {
  const PLANO = 'P2.0';
  let bufSon = null, cargando = null;
  const carga = async src => {
    if (bufSon) return bufSon; if (cargando) return cargando;
    cargando = fetch(src).then(r => r.arrayBuffer()).then(a => B.ac().decodeAudioData(a)).then(b => (bufSon = b)).catch(() => null);
    return cargando;
  };
  const datos = () => { try { const d = B.motor.dia(); if (!d || d.n !== 2) return null; const p = d.planos[B.motor.indice()]; return p && p.id === PLANO && p.video ? p.video : null; } catch (e) { return null; } };
  function pon(planoEl, v) {
    if (planoEl._d2video) return; planoEl._d2video = true;
    const kb = planoEl.querySelector('.kb') || planoEl;
    const vid = document.createElement('video');
    vid.muted = true; vid.playsInline = true; vid.setAttribute('playsinline', ''); vid.preload = 'auto'; vid.src = v.src;
    vid.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:opacity .7s;pointer-events:none;opacity:0';
    kb.appendChild(vid);
    let fuente = null;
    const para = () => { try { if (fuente) { fuente.gan.gain.setTargetAtTime(0, B.ac().currentTime, .15); fuente.src.stop(B.ac().currentTime + .6); } } catch (e) { } fuente = null; };
    const suena = async () => {
      if (!v.sonido) return; const b = await carga(v.sonido); if (!b || !planoEl.isConnected) return;
      const C = B.ac(), s = C.createBufferSource(), g = C.createGain(); s.buffer = b; g.gain.value = v.vol == null ? .9 : v.vol;
      s.connect(g); g.connect(B.bus.sfx || C.destination); s.start(C.currentTime, Math.min(b.duration - .05, vid.currentTime || 0));
      fuente = { src: s, gan: g };
    };
    vid.addEventListener('playing', () => { vid.style.opacity = 1; if (!fuente) suena(); }, { once: true });
    vid.addEventListener('ended', () => { vid.style.opacity = 0; setTimeout(() => vid.remove(), 900); });
    vid.addEventListener('error', () => vid.remove());
    const p = vid.play(); if (p && p.catch) p.catch(() => vid.remove());
    /* si se cambia de plano antes de acabar, fuera el sonido */
    const obs = new MutationObserver(() => { if (!planoEl.isConnected || !planoEl.classList.contains('on')) { para(); obs.disconnect(); } });
    obs.observe(planoEl.parentNode || document.body, { childList: true, subtree: false, attributes: true, attributeFilter: ['class'] });
  }
  function vigila() {
    const pel = document.getElementById('pelicula'); if (!pel) return setTimeout(vigila, 500);
    new MutationObserver(ms => {
      for (const m of ms) for (const n of m.addedNodes) {
        if (n.nodeType !== 1 || !n.classList.contains('plano')) continue;
        setTimeout(() => { const v = datos(); if (v) pon(n, v); }, 30);
      }
    }).observe(pel, { childList: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', vigila); else vigila();
  /* que el sonido esté listo antes de llegar al acto 2 */
  document.addEventListener('click', e => { if (e.target.closest && e.target.closest('.billete[data-dia="2"]')) { try { const d = B.DIAS && B.DIAS[2]; const p = d && d.planos && d.planos.find(x => x.id === PLANO); if (p && p.video && p.video.sonido) carga(p.video.sonido); } catch (er) { } } }, true);
})(window.BLUES);
