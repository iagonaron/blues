/* BLUES · cifrado (P3.6), HECHO PARA FRACASAR: atril con un símbolo, teclado Do4–Si5 sin
   nombres (salvo la ronda 1), cuenta atrás, medidor de nervios, murmullo que sube y pullas
   de Pearl. Tres fallos o tiempo agotado = fin. Si alguien lo acaba todo: «Ahora, a tempo»
   y la banda arranca a 300 bpm. */
'use strict';
(function (B) {
  const U = B.iu;
  const LET = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
  const TIPOS = { '': [0, 4, 7], '−': [0, 3, 7], '+': [0, 4, 8], '°': [0, 3, 6], 'sus': [0, 5, 7], 'Δ': [0, 4, 7, 11], '−7': [0, 3, 7, 10], '7': [0, 4, 7, 10], 'Ø': [0, 3, 6, 10], '°7': [0, 3, 6, 9] };
  function analiza(sim) {
    const m = /^([A-G])(♭|♯)?(.*)$/.exec(sim);
    const raiz = B.mod12(LET[m[1]] + (m[2] === '♯' ? 1 : m[2] === '♭' ? -1 : 0));
    return TIPOS[m[3]].map(x => B.mod12(raiz + x));
  }
  const RONDAS = [
    { tit: 'Letra → nota', ayuda: 'Cada letra es una nota: C = Do, D = Re, E = Mi…', items: ['C', 'G', 'E', 'A', 'F'], tiempo: null, nombres: true, nota: true },
    { tit: 'Letra → nota, a contrarreloj', ayuda: 'Lo mismo, pero sin nombres en las teclas… y con prisa.', items: ['D', 'B', 'F', 'C', 'A'], tiempo: [8, 7, 6, 5, 4], nota: true },
    { tit: 'Acordes mayores y menores', ayuda: 'Toca sus tres notas, una detrás de otra: fundamental, 3.ª y 5.ª. «−» es menor.', items: ['C', 'E−', 'F', 'A−'], tiempo: [6, 5, 4.4, 3.8] },
    { tit: 'Aumentados y disminuidos', ayuda: '«+» es aumentado; «°», disminuido.', items: ['F+', 'B°', 'C+', 'D°'], tiempo: [3.4, 2.9, 2.5, 2.1] },
    { tit: 'Cuarta suspendida', ayuda: '«sus»: sin tercera; en su sitio, la cuarta.', items: ['Asus', 'Dsus', 'Gsus'], tiempo: [2, 1.7, 1.5] },
    { tit: 'Cuatríadas', ayuda: '«Δ»: séptima mayor. «−7»: menor con séptima. Cuatro notas.', items: ['CΔ', 'D−7', 'FΔ'], tiempo: [1.6, 1.4, 1.2] }
  ];
  const PULLAS = ['¿Eso es todo lo que sabes hacer, muchacho?', 'En Galicia leéis muy despacio, ¿no?', 'Tic, tac, cariño. El público se aburre.', 'En Europa ahora hacen música sin tonalidad, ¡qué horror! Y tú, sin notas.', 'Más deprisa, muchacho, que esto es Harlem.'].map((t, k) => ({ quien: 'PEARL', texto: t, voz: 'voz/d3/pearl_pulla' + (k + 1) + '.mp3' }));
  const ATEMPO = { quien: 'PEARL', texto: 'Muy bien, muchacho. Ahora, a tempo.', voz: 'voz/d3/pearl_atempo.mp3' };
  B.inter.cifrado = async function (caja, op) {
    const ctl = op.ctl;
    U.fondo(caja);
    /* (C3, 20-oct; criterio del acto 1: texturas pintadas) papel del atril y madera lacada del piano, pintados en ChatGPT */
    const PAPEL = B.existe('img/inter/d3_papel.webp'), MADERA = B.existe('img/inter/d3_madera.webp');
    const TINTA = PAPEL ? '#2a1e14' : '#F6EEDC';
    const atril = U.panel(caja, { left: '20%', right: '20%', top: '11%', height: '41%', padding: '0', background: PAPEL ? 'url(img/inter/d3_papel.webp) center/cover no-repeat, #e9dcc0' : 'linear-gradient(180deg,#2a2017,#16100b)' });
    if (PAPEL) { atril.style.color = TINTA; atril.style.boxShadow = '0 calc(var(--u)*.8) calc(var(--u)*2) rgba(0,0,0,.6)'; }
    atril.innerHTML = '<div style="position:absolute;left:0;right:0;top:0;height:calc(var(--u)*.55);background:rgba(241,230,207,.12)"><i class="cuenta" style="display:block;height:100%;width:100%;background:var(--oro);transform-origin:left;transition:none"></i></div>' +
      '<div style="position:absolute;left:calc(var(--u)*1.6);top:calc(var(--u)*1.4)"><div class="i-tit ronda">Ronda 1</div><div class="i-estado ayuda" style="font-size:calc(var(--u)*1.25);max-width:calc(var(--u)*40)"></div></div>' +
      '<div class="simbolo" style="position:absolute;left:0;right:0;top:34%;text-align:center;font-family:Georgia,\'Times New Roman\',serif;font-weight:700;font-size:calc(var(--u)*9);color:' + TINTA + ';line-height:1"></div>' +
      '<div class="progreso" style="position:absolute;left:0;right:0;bottom:calc(var(--u)*1.2);display:flex;justify-content:center;gap:calc(var(--u)*.5)"></div>';
    const nerv = U.panel(caja, { right: '6%', top: '11%', height: '41%', width: '7%', padding: 'calc(var(--u)*.8)' });
    if (MADERA) nerv.style.background = 'url(img/inter/d3_madera.webp) center/cover no-repeat';
    nerv.innerHTML = '<div class="i-tit" style="font-size:calc(var(--u)*.7);text-align:center">Nervios</div><div style="position:absolute;left:30%;right:30%;top:calc(var(--u)*3);bottom:calc(var(--u)*3.4);border:1px solid var(--oro-a);border-radius:calc(var(--u)*.3);overflow:hidden"><i class="nv" style="position:absolute;left:0;right:0;bottom:0;height:8%;background:linear-gradient(0deg,#86C28C,#E9CD8A 55%,#E0644B);transition:height .4s"></i></div><div class="fallos i-marcas" style="position:absolute;left:0;right:0;bottom:calc(var(--u)*.9);justify-content:center"><i></i><i></i><i></i></div>';
    const abajo = U.panel(caja, { left: '12%', right: '12%', bottom: '16%', padding: 'calc(var(--u)*.8)' });
    if (MADERA) abajo.style.background = 'url(img/inter/d3_madera.webp) center/cover no-repeat';
    if (PAPEL) atril.querySelectorAll('.i-tit,.i-estado').forEach(e => { e.style.color = TINTA; e.style.textShadow = 'none'; });   /* (20-oct, p. 10) teclas más largas: el teclado crece 4u y baja un poco */
    const tec = B.teclado(abajo, { desde: 60, hasta: 83, inst: 'piano', nombres: true, ctl });
    const izq = B.el('div', 'i-pie-izq'); caja.appendChild(izq);
    const estado = B.el('span', 'i-estado', ''); izq.appendChild(estado);
    const SF = { mur: 'sfx/d3/club_tarde.mp3', risas: 'sfx/d3/risas_cortas.mp3', abucheo: 'sfx/d3/abucheo.mp3', reloj: 'sfx/d3/reloj.mp3' };
    const suena = (k, o) => B.buf[SF[k]] ? B.suena(SF[k], Object.assign({ bus: B.bus.sfx }, o)) : null;
    let mur;
    if (B.buf[SF.mur]) { const h = suena('mur', { vol: .12, bucle: true, fade: 1 }); mur = { vol: (v, t) => h && h.gan.gain.setTargetAtTime(Math.min(1, v * 2.2), B.ac().currentTime, (t || .6) / 3), parar: f => h && h.parar(f) }; }
    else mur = B.sint.murmullo(.04);
    ctl.alMorir.push(() => mur.parar(1));
    let reloj = null; const paraReloj = () => { if (reloj) { reloj.parar(.15); reloj = null; } }; ctl.alMorir.push(paraReloj);
    let fallos = 0, nervios = .08, fin = false, tiempoAgotado = false;
    /* (Iago, 21-oct 14:55) TENSIÓN que crece: un fondo (dron grave + cuerdas disonantes) y un latido que suben con las rondas
       y con los nervios (el latido, además, se acelera). Cada vez que suben los nervios: un golpe de tensión y el medidor se
       destaca UNA vez (crece, tiembla y brilla en rojo; sin animaciones en bucle). Sonidos de su biblioteca de Splice. */
    const TEN = { fondo: 'sfx/d3/tension_fondo.mp3', latido: 'sfx/d3/latido.mp3', sube: 'sfx/d3/tension_sube.mp3' };
    const suenaT = (k, o) => B.buf[TEN[k]] ? B.suena(TEN[k], Object.assign({ bus: B.bus.sfx }, o)) : null;
    const tFondo = suenaT('fondo', { vol: 0, bucle: true }), tLat = suenaT('latido', { vol: 0, bucle: true, rate: 1.3 });
    const paraTension = f => { [tFondo, tLat].forEach(h => h && h.parar(f || 1.2)); };
    ctl.alMorir.push(() => paraTension(1.2));
    let rondaT = 0;
    const tension = seg => {
      const T = B.clamp(.13 * rondaT + .55 * nervios, 0, 1), ahora = B.ac().currentTime, tc = (seg || 1.2) / 3;
      if (tFondo) tFondo.gan.gain.setTargetAtTime(T > .03 ? .05 + .55 * T : 0, ahora, tc);
      if (tLat) { tLat.gan.gain.setTargetAtTime(T > .12 ? .12 + .8 * T : 0, ahora, tc); tLat.fuente.playbackRate.setTargetAtTime(1.3 + 1.4 * T, ahora, tc); }
    };
    if (!document.getElementById('d3-nervios-css')) {
      const st = document.createElement('style'); st.id = 'd3-nervios-css';
      st.textContent = '@keyframes d3NvSube{0%{transform:none}16%{transform:scale(1.16) rotate(-2deg)}32%{transform:scale(1.1) rotate(1.5deg)}50%{transform:scale(1.05) rotate(-.6deg)}100%{transform:none}}' +
        '@keyframes d3NvBrillo{0%{box-shadow:0 0 0 0 rgba(224,100,75,0)}18%{box-shadow:0 0 calc(var(--u)*2.8) calc(var(--u)*.6) rgba(224,100,75,.95)}100%{box-shadow:0 0 0 0 rgba(224,100,75,0)}}' +
        '@keyframes d3NvBarra{0%{filter:brightness(2.3) saturate(1.4)}100%{filter:none}}' +
        '.d3-nv-sube{animation:d3NvSube .9s ease-out 1,d3NvBrillo 1.5s ease-out 1}.d3-nv-sube .nv{animation:d3NvBarra 1.3s ease-out 1}' +
        '.d3-nv-alto{outline:2px solid rgba(224,100,75,.9);outline-offset:3px}.d3-nv-alto .i-tit{color:#F0876F!important}';
      document.head.appendChild(st);
    }
    const destaca = fuerte => { nerv.classList.remove('d3-nv-sube'); void nerv.offsetWidth; nerv.classList.add('d3-nv-sube'); suenaT('sube', { vol: fuerte ? 1 : .45 + .45 * nervios }); };
    const ponNervios = v => { nervios = B.clamp(v, 0, 1); nerv.querySelector('.nv').style.height = Math.round(nervios * 100) + '%'; nerv.classList.toggle('d3-nv-alto', nervios >= .6); mur.vol(.04 + nervios * .32, .6); tension(); };
    const fallo = () => { fallos++; suena('risas', { vol: .3 + .25 * fallos }); if (fallos >= 3) suena('abucheo', { vol: .45, t: B.ahora() + .5 }); B.$$('.fallos i', nerv).forEach((m, k) => m.classList.toggle('mal', k < fallos)); ponNervios(Math.max(nervios, .08 + fallos * (.92 / 3)));   /* proporcional: cada fallo sube un tercio (3 fallos = 100 %) */ destaca(fallos >= 3); atril.classList.remove('sacude'); void atril.offsetWidth; atril.classList.add('sacude'); };
    const cuenta = atril.querySelector('.cuenta');
    let pulsadas = [];
    tec.alPulsar.push(m => pulsadas.push(m));
    B.inter.cifrado.estado = () => ({ fallos, nervios, ronda: rondaAct, item: itemAct, objetivo, activo, fin });
    let rondaAct = 0, itemAct = 0, objetivo = null, activo = false;
    for (let r = 0; r < RONDAS.length && !fin; r++) {
      const R = RONDAS[r]; rondaAct = r; rondaT = r; tension(3);   /* cada ronda, un poco más de tensión */
      tec.nombres(!!R.nombres);
      atril.querySelector('.ronda').textContent = 'Ronda ' + (r + 1) + ' de 6 · ' + R.tit;
      atril.querySelector('.ayuda').textContent = R.ayuda;
      const prog = atril.querySelector('.progreso'); prog.innerHTML = R.items.map(() => '<span class="nota-ch" style="min-width:calc(var(--u)*1.2);height:calc(var(--u)*.6);padding:0"></span>').join('');
      /* Pearl presenta la ronda (r1…r6 del guion) o suelta una pulla */
      if (U.hay(op, 'r' + (r + 1))) { if (!await U.dice(op, 'r' + (r + 1), ctl)) return; }
      else if (r > 0) { await U.di(PULLAS[(r - 1) % PULLAS.length], ctl); if (ctl.muerto) return; }
      const fallosAntes = fallos; let prisa = false;
      for (let k = 0; k < R.items.length && !fin; k++) {
        itemAct = k;
        const sim = R.items[k];
        objetivo = R.nota ? analiza(sim).slice(0, 1) : analiza(sim);
        const sp = atril.querySelector('.simbolo'); sp.textContent = sim; sp.classList.remove('aparece'); void sp.offsetWidth; sp.classList.add('aparece');
        pulsadas = []; tec.limpia();
        const lim = R.tiempo ? R.tiempo[k] : null, t0 = B.ahora();
        if (lim && !reloj) { reloj = suena('reloj', { vol: .5, bucle: true }); if (reloj) reloj.fuente.playbackRate.value = 1 + r * .12; }   /* (C3) el reloj corre más deprisa en cada ronda */
        estado.textContent = objetivo.length === 1 ? 'Toca la nota' : 'Toca las ' + objetivo.length + ' notas, una detrás de otra';
        let res = null, vistas = 0; activo = true;
        while (!ctl.muerto && res == null) {
          await B.espera(.03, ctl);
          const t = B.ahora();
          if (lim) cuenta.style.transform = 'scaleX(' + B.clamp(1 - (t - t0) / lim, 0, 1).toFixed(3) + ')'; else cuenta.style.transform = 'scaleX(1)';
          if (lim && r === 1 && !prisa && t - t0 > lim * .5) { prisa = true; U.suelta(U.rota(op, 'r2_prisa'), ctl, 1.8); }
          /* (Iago, 21-oct) cada tecla pulsada se enciende UNA sola vez: antes se volvía a encender cada 30 ms y, en las rondas
             de acordes (3 notas), la primera parpadeaba */
          for (; vistas < pulsadas.length; vistas++) {
            const j = vistas;
            if (B.mod12(pulsadas[j]) !== objetivo[j]) { res = 'mal'; tec.enciende(pulsadas[j], 'mal', .6); break; }
            tec.enciende(pulsadas[j], 'ok', objetivo.length > 1 ? 1.2 : .5);
          }
          if (res == null && pulsadas.length >= objetivo.length) res = 'bien';
          if (res == null && lim && t - t0 > lim) res = 'tiempo';
        }
        activo = false; paraReloj();
        if (ctl.muerto) return;
        const pk = prog.children[k];
        if (res === 'bien') { pk.style.background = 'var(--ok)'; pk.style.borderColor = 'var(--ok)'; ponNervios(nervios - .03); B.sint.palma(B.ahora(), .25); }
        else if (res === 'mal') { pk.style.borderColor = 'var(--mal)'; fallo(); estado.textContent = 'Esa no era…'; await U.di(U.rota(op, 'fallo') || PULLAS[(fallos + 2) % PULLAS.length], ctl); }
        else { tiempoAgotado = true; pk.style.borderColor = 'var(--mal)'; fallo(); fin = true; estado.textContent = 'Se acabó el tiempo.'; await U.dice(op, 'tiempo', ctl); }
        if (ctl.muerto) return;
        if (fallos >= 3) fin = true;
      }
      if (r === 0 && !fin && fallos === fallosAntes) { if (!await U.dice(op, 'r1_bien', ctl)) return; }
    }
    if (ctl.muerto) return;
    cuenta.style.transform = 'scaleX(0)';
    if (!fin) {
      /* lo ha conseguido todo: ahora, a tempo */
      paraTension(1.5);
      await U.di(U.rota(op, 'todo', [ATEMPO]), ctl);
      B.banda.tocar({ ton: 'G', bpm: 300, claqueta: false, vueltas: 1, pistas: { guitarra: 'base', tabla: 'base', contrabajo: 'base', trompeta: 'tema' } });
      ctl.alMorir.push(() => B.banda.parar());
      await B.espera(4.5, ctl); B.banda.parar();
    } else {
      if (nervios < .99) destaca(true);
      { const n0 = nervios; for (let k = 1; k <= 12 && !ctl.muerto; k++) { ponNervios(n0 + (1 - n0) * k / 12); await B.espera(.1, ctl); } }   /* sube poco a poco, no de golpe */
      estado.textContent = tiempoAgotado ? 'El tiempo vuela, las risas suben…' : 'Tres fallos. Las risas suben…';
      /* (Iago, 21-oct) aquí ya NO suena el «ba-dum-tss»: solo después del chiste de Pearl (P3.7, «Vuelve cuando sepas…») */
      await B.espera(1.2, ctl);
    }
    mur.parar(1.5);
    await U.seguir(caja, ctl, fin ? 'Abandonar' : 'Seguir');
  };
  B.inter.cifrado.analiza = analiza;
  B.inter.cifrado.subtAbajo = true;   /* (ronda 6) el alumno mira al teclado: el texto, abajo */
  B.inter.cifrado.RONDAS = RONDAS;
  B.inter.cifrado.voces = ['sfx/d3/club_tarde.mp3', 'sfx/d3/risas_cortas.mp3', 'sfx/d3/abucheo.mp3', 'sfx/d3/tension_fondo.mp3', 'sfx/d3/latido.mp3', 'sfx/d3/tension_sube.mp3'];   /* (C3) las pullas sueltas nunca se grabaron: Pearl usa las del guion (r1…r6, fallo, tiempo, todo) */
  B.inter.cifrado.claves = ['r1', 'r1_bien', 'r2', 'r2_prisa', 'r3', 'r4', 'r5', 'r6', 'fallo', 'tiempo', 'todo'];
})(window.BLUES);

/* BLUES · acto 3 · (Iago, 20-oct 14:56) «Xan mira el acordeón»: el alumno decide si sube al escenario con el acordeón o sin él.
   Sin él: lo de siempre («Muchacho, ¿has venido sin instrumento?»). Con él: Pearl lo despacha («tú, al piano; esa caja, para
   el abrigo»). Las dos ramas acaban en el piano (op.lineas.si / op.lineas.no, del guion de datos). Vive aquí porque este fichero
   ya lo carga la página y es del acto 3 (no hace falta tocar index.html). */
(function (B) {
  const U = B.iu;
  B.inter.acordeonDecide = async function (caja, op) {
    const ctl = op.ctl;
    const fondo = U.fondo(caja);
    const PAPEL = B.existe('img/inter/d3_papel.webp');
    const tit = B.el('div', ''); tit.style.cssText = 'position:absolute;left:0;right:0;top:10%;text-align:center;color:var(--crema);text-shadow:0 2px 12px rgba(0,0,0,.8)';
    tit.innerHTML = '<div class="i-tit" style="font-size:calc(var(--u)*1.05);letter-spacing:.35em">XAN MIRA SU ACORDEÓN</div>' +
      '<div style="font-family:var(--f-carta);font-style:italic;font-size:calc(var(--u)*2.6);margin-top:calc(var(--u)*.6)">¿Subes con él al escenario?</div>';
    caja.appendChild(tit);
    const fila = B.el('div', ''); fila.style.cssText = 'position:absolute;left:50%;top:56%;transform:translate(-50%,-50%);display:flex;gap:calc(var(--u)*5);align-items:flex-end';
    caja.appendChild(fila);
    const carta = (html, pie) => {
      const b = B.el('button', 'd3-elige'); b.type = 'button';
      b.style.cssText = 'all:unset;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:calc(var(--u)*1.2);transition:transform .25s ease,filter .25s ease;filter:drop-shadow(0 calc(var(--u)*.8) calc(var(--u)*1.6) rgba(0,0,0,.7))';
      b.innerHTML = html + '<div style="font-family:var(--f-ui);font-weight:600;letter-spacing:.18em;font-size:calc(var(--u)*1.05);color:var(--oro-hi);text-transform:uppercase">' + pie + '</div>';
      b.addEventListener('pointerenter', () => { b.style.transform = 'translateY(calc(var(--u)*-.8)) rotate(-1.5deg)'; });
      b.addEventListener('pointerleave', () => { b.style.transform = ''; });
      fila.appendChild(b); return b;
    };
    /* el estuche pintado del acto 1 (img/inter/estuche_*.webp) */
    const conA = carta('<div style="position:relative;width:calc(var(--u)*24);height:calc(var(--u)*16.7)">' +
      '<div style="position:absolute;left:0;right:0;bottom:0;height:54.5%;background:url(img/inter/estuche_caja.webp) center/100% 100% no-repeat"></div>' +
      '<div class="tapa" style="position:absolute;left:0;right:0;top:0;height:45.5%;background:url(img/inter/estuche_tapa.webp) center/100% 100% no-repeat;transform-origin:bottom;transition:transform .35s"></div></div>',
      'Coger el acordeón');
    const sinA = carta('<div style="width:calc(var(--u)*20);height:calc(var(--u)*14);box-sizing:border-box;padding:calc(var(--u)*1.6);display:flex;flex-direction:column;justify-content:center;align-items:center;gap:calc(var(--u)*1);' +
      'background:' + (PAPEL ? 'url(img/inter/d3_papel.webp) center/cover' : '#E9DCBF') + ';color:#2a1e14;transform:rotate(1.5deg)">' +
      '<div style="font-family:var(--f-carta);font-style:italic;font-size:calc(var(--u)*2.2);text-align:center;line-height:1.2">Subir con las<br>manos vacías</div>' +
      '<div style="display:flex;gap:2px;height:calc(var(--u)*3.4)">' + Array.from({ length: 10 }, (_, i) => '<i style="display:block;width:calc(var(--u)*1.1);background:#f4eedf;border:1px solid #6b5a44;position:relative">' + ([0, 1, 3, 4, 5, 7, 8].indexOf(i) >= 0 ? '<b style="position:absolute;right:-35%;top:0;width:70%;height:60%;background:#1a1410;z-index:1"></b>' : '') + '</i>').join('') + '</div></div>',
      'Subir sin él');
    const eleccion = await new Promise(res => {
      conA.addEventListener('click', e => { e.stopPropagation(); B.ac(); res('si'); });
      sinA.addEventListener('click', e => { e.stopPropagation(); B.ac(); res('no'); });
      ctl.alMorir.push(() => res(null));
    });
    if (!eleccion || ctl.muerto) return;
    B.inter.acordeonDecide.eleccion = eleccion;
    const elegida = eleccion === 'si' ? conA : sinA, otra = eleccion === 'si' ? sinA : conA;
    otra.style.transition = 'opacity .4s'; otra.style.opacity = '0'; elegida.style.pointerEvents = 'none';
    if (eleccion === 'si') {   // el estuche se levanta y suena el cierre, contundente
      elegida.style.transform = 'translateY(calc(var(--u)*-2)) rotate(-4deg)';
      if (B.buf['sfx/d1/estuche_cierre.mp3']) B.suena('sfx/d1/estuche_cierre.mp3', { bus: B.bus.sfx, vol: 1 });
    } else {
      elegida.style.transform = 'scale(1.06)';
    }
    if (B.buf['sfx/d3/pasos_tarima.mp3']) B.suena('sfx/d3/pasos_tarima.mp3', { bus: B.bus.sfx, vol: 1, t: B.ahora() + .35 });
    await B.espera(1.4, ctl); if (ctl.muerto) return;
    tit.style.transition = fila.style.transition = fondo.style.transition = 'opacity .5s'; tit.style.opacity = fila.style.opacity = fondo.style.opacity = '0';
    /* (Iago, 21-oct) en cuanto decide, el plano se ve BIEN (sin oscurecer) y Pearl habla en su bocadillo, como en el resto del acto */
    const esc = document.getElementById('escena'); if (esc) esc.classList.remove('con-inter', 'subt-abajo');
    /* (Iago, 22-oct 22:34) la frase de cada rama puede traer su lámina («var»: con el acordeón, Xan en el escenario con el estuche);
       la frase empieza mientras se funde el velo, para que lo primero que se vea tras decidir sea ya ese plano */
    await U.dice(op, eleccion, ctl);
  };
  B.inter.acordeonDecide.subtAbajo = true;
  B.inter.acordeonDecide.voces = ['sfx/d1/estuche_cierre.mp3', 'sfx/d3/pasos_tarima.mp3'];
})(window.BLUES);

/* BLUES · acto 3 · (Iago, 20-oct 14:51) la carta del título a la IZQUIERDA para que se vea el local durante la intro.
   Lo oficial es la opción `carta.lado` en el motor (petición a C1 con su parche); mientras no esté, esto lo hace desde aquí:
   cuando el título del día pone la carta y el día trae carta.lado = 'izq', marca #carta y añade la regla de estilo.
   Si C1 mete el parche, esto no estorba (pone el mismo atributo). */
(function (B) {
  const css = '#carta[data-lado="izq"] .papel{right:auto;left:7%;transform:rotate(1.2deg) translateY(calc(var(--u)*2))}' +
    '#carta[data-lado="izq"].leyendo .papel{transform:rotate(1.2deg)}';
  function arranca() {
    const carta = document.getElementById('carta'); if (!carta) return;
    const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    new MutationObserver(() => {
      let lado = '';
      try { const d = B.motor && B.motor.dia && B.motor.dia(); lado = (d && d.carta && d.carta.lado) || ''; } catch (e) { }
      if ((carta.dataset.lado || '') !== lado) carta.dataset.lado = lado;
    }).observe(carta, { childList: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', arranca); else arranca();
})(window.BLUES);
