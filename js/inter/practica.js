/* BLUES · practica (P5.1–P5.2): pestañas «Paso 1 · El tema», «Paso 2 · Notas largas»,
   «Paso 3 · Finales», «Concierto». Concierto: la banda de cinco en bucle:
   claqueta → TEMA → SOLO ×N → TEMA → final; rótulo grande y voz de Eli con dos pulsos de
   antelación; en TEMA la partitura, en SOLO las tres escalas mixolidias con las notas que se
   pueden tocar encendidas; rejilla de 12 compases siempre en una esquina; selector Do/Si♭/Mi♭.
   orden: orden de salida por transpositor (Supabase suite_blues_turnos) con SORTEO a tiza en la pizarra del porche y
   carrusel «Te toca / Después»; al cambiar de grupo la banda cambia de tono (C5, 20-oct). Sin cuenta, en lmathome.es no sale.
   Reacciones del guion (op.lineas): tema solo otra_vez ultimo final orden do sib mib siguiente aplauso cierre.
   Día 5: la banda de cuatro (data/dia5.js → "banda": { "sin": ["acordeon"] }): el tema lo lleva la trompeta. */
'use strict';
(function (B) {
  const U = B.iu;
  /* Supabase: la misma URL y la misma clave pública (anon) que usa lm-voluntarios.js (gp.lmathome.es/voluntarios) */
  B.SB_URL = B.SB_URL || 'https://woiptkyrxkbpnvioypit.supabase.co';
  B.SB_ANON = B.SB_ANON || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvaXB0a3lyeGticG52aW95cGl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0NzI2ODYsImV4cCI6MjA5MjA0ODY4Nn0.B2nKgj5rD0rkdLeMIrd9KgD8lUPWsBT4Y7aCtmnvbjA';
  /* la cuenta, como lm-voluntarios.js: «#c=<uuid>» en la dirección (se guarda y se quita) o localStorage.lm_vol_cuenta */
  const CLAVE_CUENTA = 'lm_vol_cuenta';
  function leeCuenta() {
    let c = null;
    try {
      const m = /(?:^#|&)c=([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i.exec(location.hash || '');
      if (m) {
        c = m[1].toLowerCase(); localStorage.setItem(CLAVE_CUENTA, c);
        const h = (location.hash || '').replace(/^#/, '').split('&').filter(p => p && !/^c=/.test(p)).join('&');
        history.replaceState(history.state, '', location.pathname + location.search + (h ? '#' + h : ''));
      }
    } catch (e) { }
    if (!c) { try { c = localStorage.getItem(CLAVE_CUENTA); } catch (e) { } }
    return /^[0-9a-f-]{36}$/i.test(c || '') ? c : null;
  }
  B.inter.practica_cuenta = leeCuenta;
  const PESTANAS = [['paso1', 'Paso 1 · El tema'], ['paso2', 'Paso 2 · Notas largas'], ['paso3', 'Paso 3 · Finales'], ['concierto', 'Concierto']];
  B.inter.practica = async function (caja, op) {
    const ctl = op.ctl;
    /* (Iago, 20-oct, 14:10) también en Paso 1–3 suena la base de Suno de cada tono, SIN melodía (nada de trompeta MIDI):
       mientras la sala está abierta, toda banda que se pida (también la de U.vistaHito, que es común) va sin pistas
       sintetizadas y con la base. Al salir se deja B.banda.tocar como estaba. */
    const tocarOrig = B.banda.tocar;
    B.banda.tocar = function (cfg) {
      cfg = cfg || {};
      const ton = cfg.ton || 'G';
      if (cfg._c5 || !B.buf[BASE(ton)]) return tocarOrig.call(this, cfg);
      const r = tocarOrig.call(this, Object.assign({}, cfg, { pistas: {} }));
      if (r) base(r, ton);
      return r;
    };
    ctl.alMorir.push(() => { B.banda.tocar = tocarOrig; });
    U.fondo(caja);
    const tabs = B.el('div', 'pestanas'); tabs.style.cssText = 'position:absolute;left:5%;top:2.2%;z-index:6';
    caja.appendChild(tabs);
    const zona = B.el('div', ''); zona.style.cssText = 'position:absolute;inset:0;top:7.5%'; caja.appendChild(zona);
    let sub = null;
    /* (C5, 21-oct) los pasos usan la vista de los hitos del acto 4 (común); en el porche toca la banda de cuatro, sin Xan */
    const retoca = (v, z) => {
      const t = v.papel.querySelector('.i-tit'); if (t) t.textContent = t.textContent.replace(/^Hito (\d)/, 'Paso $1');
      const e = v.papel.querySelector('.i-enun'); if (e) e.textContent = e.textContent.replace('junto a Eli y Xan', 'junto a la banda');
      const d = z.querySelector('.i-pie-izq .dialogo'); if (!d) return;
      d.innerHTML = '';
      ['ELI', 'RUBY', 'ODELL', 'TEDDY'].forEach(q => { const P = B.personaje(q); const c = B.el('span', 'chapa', P.corto); c.style.setProperty('--c', P.color); c.style.fontSize = 'calc(var(--u)*.75)'; d.appendChild(c); });
    };
    const abre = k => {
      if (sub) sub.matar(); B.banda.parar();
      sub = B.control(); ctl.alMorir.push(() => sub && sub.matar());
      zona.innerHTML = '';
      B.$$('button', tabs).forEach(b => b.classList.toggle('sel', b.dataset.k === k));
      if (k === 'concierto') concierto(zona, sub, op);
      else { const v = U.vistaHito(zona, +k.slice(-1), sub, { vueltas: 0, arriba: '1%' }); v.papel.style.maxHeight = '74%'; retoca(v, zona); }
      B.guarda('blues5_pestana', k);
    };
    PESTANAS.forEach(([k, t]) => { const b = U.boton(t, 'peq', () => abre(k)); b.dataset.k = k; tabs.appendChild(b); });
    abre(op.pestana || 'paso1');
    if (!enVivo()) {      // solo en el artifact de revisión, nunca en blues.gp.lmathome.es
      const vv = B.el('div', 'i-transp'); vv.style.cssText = 'position:absolute;right:calc(var(--u)*11.5);top:2.2%;z-index:6;opacity:.85';
      [['alumno', 'Vista alumno'], ['profe', 'Vista Protester (prueba)']].forEach(([k, t]) => {
        const b = U.boton(t, 'peq' + (B.lee('blues5_vista', 'profe') === k ? ' sel' : ''), () => { B.guarda('blues5_vista', k); B.$$('button', vv).forEach(x => x.classList.toggle('sel', x === b)); abre('concierto'); });
        vv.appendChild(b);
      });
      caja.appendChild(vv);
    }
    const pieG = B.el('div', ''); pieG.style.cssText = 'position:absolute;right:calc(var(--u)*1.6);top:calc(var(--u)*1.6);z-index:6'; caja.appendChild(pieG);
    await U.seguir(caja, ctl, 'Salir', pieG);
    if (sub) sub.matar(); B.banda.parar();
    if (!ctl.muerto) await U.dice(op, 'cierre', ctl);
  };

  function concierto(zona, ctl, op) {
    op = op || {};
    estilos();
    /* columna izquierda: TEMA (partitura) o SOLO (escalas) */
    /* (Iago, 20-oct, 14:26) el papel, del mismo tamaño y en el mismo sitio que en el Paso 1 */
    const escenario = U.panel(zona, { left: '5%', right: '5%', top: '1%', padding: 'calc(var(--u)*1.1) calc(var(--u)*1.4)' });
    escenario.style.maxHeight = '74%';
    const vTema = B.el('div', ''); escenario.appendChild(vTema);
    /* (Iago, 20-oct, 14:18) la misma partitura manuscrita que en los pasos (papel, cabecera de Xan) */
    const pt = B.partitura(vTema, { modo: 'manuscrito', manuscrito: true, cabecera: true });
    pt.caja.style.borderRadius = 'calc(var(--u)*.3)'; pt.caja.style.overflow = 'hidden';
    const vSolo = B.el('div', 'oculto'); escenario.appendChild(vSolo);
    /* (punto 56) el SOLO, en el mismo papel manuscrito que el tema: el aviso, el acorde que suena (romano + cifrado), su
       escala escrita a mano y las tres filas, cambiando con la banda */
    const MODO = { G7: 'Sol mixolidio', C7: 'Do mixolidio', D7: 'Re mixolidio' };
    vSolo.innerHTML = '<div class="ps-papel"><div class="ps-cab"><span class="ps-aviso">Solo</span><span class="ps-turno"></span><span class="ps-comp"></span></div>' +
      '<div class="ps-acorde"><i class="ps-rom">I7</i><b class="ps-let">G7</b><span class="ps-modo">Sol mixolidio</span></div>' +
      '<div class="ps-notas">' + B.ESCALAS.G7.join(' · ') + '</div><div class="ps-filas">' +
      ['G7', 'C7', 'D7'].map(a => '<b data-a="' + a + '">' + (B.ROMANO ? B.ROMANO[a] + ' · ' : '') + a + '</b><span data-a="' + a + '">' + B.ESCALAS[a].join(' · ') + '</span>').join('') + '</div></div>';
    const tecC = B.el('div', ''); tecC.style.marginTop = 'calc(var(--u)*.8)'; vSolo.appendChild(tecC);
    const tec = B.teclado(tecC, { desde: 55, hasta: 79, inst: 'piano', ctl });
    tec.caja.style.height = 'calc(var(--u)*11)';   /* (20-oct, p. 10) teclas más largas (antes 8u) */
    const ordenBox = B.el('div', 'pzc oculto'); zona.appendChild(ordenBox);   // (20-oct, C5) la tira de tiza del carrusel
    /* barra inferior: claqueta y, pequeñitos, los doce compases y la vuelta */
    const barra = B.el('div', 'i-pie-izq'); zona.appendChild(barra);
    const pips = U.pips(barra);
    const mini = B.el('div', 'mini12'); barra.appendChild(mini);
    B.ACORDES.forEach((a, i) => { const c = B.el('i', '', ''); c.dataset.i = i; c.title = (i + 1) + ' · ' + a; mini.appendChild(c); });
    const rej = { marca(i) { B.$$('i', mini).forEach(c => c.classList.toggle('on', +c.dataset.i === i)); } };
    const vueltaEt = B.el('div', 'mini12-v', ''); barra.appendChild(vueltaEt);
    const info = B.el('div', '');                                // (ya no se ve: lo dicen el rótulo y la partitura)
    const pie = B.el('div', 'i-pie'); pie.style.right = 'calc(var(--u)*12)'; zona.appendChild(pie);
    U.transp(pie, k => { U.suelta(U.rota(op, AVISO_T[k]), ctl, 4); if (B.banda.tocando) empieza(); });
    /* (Iago, 20-oct, 13:11) La banda ALTERNA TODO EL RATO: TEMA · IMPRO · TEMA · IMPRO… (la pantalla cambia con ella: la
       partitura en el tema; la escala y las teclas que se pueden usar en la impro). ALUMNO (sin Protester): en bucle hasta
       «Parar». PROTESTER: una impro por alumno, con el tema entre medias, y tema final (2·N + 1 vueltas). */
    let N = 3, alumno = true;
    const btMas = U.boton('+ Impro', 'peq', () => { N++; plan(); if (B.banda.tocando) U.suelta(U.rota(op, 'otra_vez'), ctl, 2); }); btMas.dataset.tip = 'Una impro más (y su tema)';
    const btFin = U.boton('Último tema', 'peq', () => { const r = B.banda.run(); if (r) { const v = r.vueltaAct || 0; r.cfg.vueltas = v % 2 ? v + 2 : v + 1; N = (r.cfg.vueltas - 1) / 2; U.suelta(U.rota(op, 'ultimo'), ctl, 2.4); } });
    const btTocar = U.boton(B.motor.ICO.play + ' Empezar', 'prim', () => { if (B.banda.tocando) B.banda.parar(); else empieza(); });
    btMas.style.display = btFin.style.display = 'none';
    pie.appendChild(btMas); pie.appendChild(btFin); pie.appendChild(btTocar);
    const tipo = v => v % 2 ? 'SOLO' : 'TEMA';
    const vueltas = () => alumno ? 0 : 2 * N + 1;
    function plan() { const r = B.banda.run(); if (r) r.cfg.vueltas = vueltas(); }
    function vista(t) {
      vTema.classList.toggle('oculto', t !== 'TEMA'); vSolo.classList.toggle('oculto', t !== 'SOLO');
    }
    /* «¡Tema!» «¡Solo!» (y «¡Y… final!»): la voz de Eli del guion (tema/solo/final) o la de siempre, o un grito sintetizado */
    function anuncia(t, clave) {
      B.motor.rotulo(clave === 'final' ? '¡FINAL!' : '¡' + t + '!');
      const l = U.rota(op, clave || t.toLowerCase());
      const r = l && l.voz && B.buf[l.voz] ? l.voz : 'voz/d5/eli_' + t.toLowerCase() + '.mp3';
      if (B.buf[r]) B.suena(r, { bus: B.bus.voz });
      else B.sint.voz(t === 'TEMA' ? 50 : 52, B.ahora(), .3, .5, t === 'TEMA' ? 'e' : 'o');
    }
    let tC = 0, iC = -1, vC = 0;
    const p = 60 / B.TEMPO;
    const quitaF = B.alFotograma(t => { if (!B.banda.tocando || iC < 0 || tipo(vC) !== 'TEMA') return; const b = (t - tC) / p; if (b >= 0 && b < 4.05) pt.sigue(iC, U.escrito(b)); });
    ctl.alMorir.push(() => { quitaF(); B.banda.parar(); });
    function marcaSolo(i) {
      const a = B.ACORDES[i];
      B.$$('.ps-filas [data-a]', vSolo).forEach(f => f.classList.toggle('on', f.dataset.a === a));
      vSolo.querySelector('.ps-rom').textContent = B.ROMANO ? B.ROMANO[a] : ''; vSolo.querySelector('.ps-let').textContent = a;
      vSolo.querySelector('.ps-modo').textContent = MODO[a]; vSolo.querySelector('.ps-notas').textContent = B.ESCALAS[a].join(' · ');
      vSolo.querySelector('.ps-comp').textContent = 'compás ' + (i + 1) + ' de 12';
      vSolo.querySelector('.ps-turno').textContent = turnoAct ? 'Te toca: ' + turnoAct : '';
      tec.marcaClases(B.PC_ESCALA[a], 'perm'); tec.marcaClases([B.ACORDE_PC[a]], 'obj');
    }
    function empieza() {
      if (O) { N = Math.max(1, O.lista().length - O.desfase); O.pinta('tema'); }
      const conBase = !!B.buf[BASE(U.tono())];
      const r = B.banda.tocar({
        _c5: true, ton: U.tono(), bpm: B.TEMPO, claqueta: true, vueltas: vueltas(),
        /* (Iago, 20-oct) todos tocan siempre; la trompeta ya no hace la melodía «de MIDI»: en el tema, contestaciones en los
           huecos (banda/<tono>/trompeta_tema.mp3, licks de Splice); en la impro calla y deja sitio */
        pistas: v => conBase ? {} : (tipo(v) === 'TEMA' ? { guitarra: 'base', tabla: 'base', contrabajo: 'base', trompeta: 'tema' } : { guitarra: 'base', tabla: 'base', contrabajo: 'base' }),
        alEntrada: k => { pips.k(k); if (k === 3) { anuncia('TEMA'); vista('TEMA'); } },
        alCompas: (i, v, t) => {
          iC = i; vC = v; tC = t; rej.marca(i);
          if (i === 0 && O) O.vuelta(v, tipo(v), v > 0 && v + 1 >= vueltas());
          vueltaEt.textContent = (v + 1) + (alumno ? '' : '/' + vueltas()) + ' · ' + (tipo(v) === 'SOLO' ? 'impro' : 'tema');
          info.textContent = tipo(v) === 'TEMA' ? 'Todos: el tema.' : (turnoAct ? 'Improvisa: ' + turnoAct : 'Improvisa con estas notas.');
          if (tipo(v) === 'SOLO') { pt.apaga(); marcaSolo(i); } else pt.compas(i);
          if (i === 0) vista(tipo(v));
          if (i === 0 && v > 0 && tipo(v - 1) === 'SOLO') U.suelta(U.rota(op, 'aplauso'), ctl, 2.4);
        },
        alPulso: (b, i, v) => { if (i === 11 && b === 2) { const tot = (B.banda.run() || { cfg: {} }).cfg.vueltas || 0; if (!tot || v + 1 < tot) anuncia(tipo(v + 1)); else if (U.hay(op, 'final')) anuncia('TEMA', 'final'); } },
        alEstado: on => { btTocar.innerHTML = on ? '■ Parar' : B.motor.ICO.play + ' Empezar'; if (!on) { rej.marca(-1); pt.apaga(); pips.k(-1); iC = -1; } },
        alFin: () => {
          info.textContent = '¡Bravo! Final.'; B.motor.rotulo('¡BRAVO!');
          if (B.buf['sfx/d5/aplauso.mp3']) B.suena('sfx/d5/aplauso.mp3', { vol: .55 });
          if (O) O.fin();
        }
      });
      if (conBase && r) base(r, U.tono());
    }
    /* ── orden de salida: la pizarra y el carrusel ── */
    let turnoAct = '', O = null;
    turnos(ctl).then(datos => {
      if (ctl.muerto || !datos) return;
      alumno = false; btMas.style.display = btFin.style.display = '';
      O = ordenDeSalida(zona, ordenBox, ctl, op, datos, {
        alTurno: t => { turnoAct = t ? t.nombre + ' (' + t.instrumento + ')' : ''; if (iC >= 0 && tipo(vC) === 'SOLO') marcaSolo(iC); },
        tocando: () => B.banda.tocando,
        empieza: () => empieza(),
        solos: n => { N = n; plan(); }
      });
    });
  }
  B.inter.practica.concierto = concierto;

  /* (C5, 20-oct; Iago: «una base de blues que suene genuinamente en cada tono») LA BANDA DEL PORCHE DE SUNO: una vuelta de
     12 compases por tono (mus/d5_porche_<v>_G|F|Bb.mp3: cover de Suno de nuestra guía —guitarra, contrabajo, tabla, bombo y
     trompeta—, remezclada desde sus stems sin piano, con el compás 1 en el sitio y puesta a 100 bpm, con 0,1 s delante)
     que se repite sin cortes, y su final (mus/d5_porche_<v>_<tono>_fin.mp3, desde el c. 11 del
     último ciclo de Suno), que sustituye a los dos últimos compases del tema final. Suenan dentro de la banda (r.gp.guitarra)
     para que «Parar» las funda; la banda sintetizada no suena (pistas vacías: solo la claqueta y el reloj de compases). */
  /* la base de cada tono: mus/d5_porche_<versión>_<tono>.mp3 (y _fin). Al cambiar la grabación se cambia la versión. */
  const BASE_V = 'v4';
  const BASE = (ton, fin) => 'mus/d5_porche_' + BASE_V + '_' + ton + (fin ? '_fin' : '') + '.mp3';
  B.inter.practica.base = BASE;
  function base(r, ton) {
    const C = B.ac(), L = 48 * 60 / B.TEMPO, PRE = B.BANDA_PRE || .1;
    const ruta = BASE(ton), rutaF = BASE(ton, true);
    let v = 0, fin = null, iv = 0;
    const p = 60 / B.TEMPO;
    /* (Iago, 20-oct, 14:51) la claqueta entera: dos golpes largos y cuatro cortos. La anacrusa de la banda (el último
       pulso de la vuelta) suena con el último golpe, justo antes del compás 1 */
    if (r.t0 - p > C.currentTime) { const a = C.createBufferSource(); a.buffer = B.buf[ruta]; a.connect(r.gp.guitarra); a.start(r.t0 - p, PRE + L - p); r.fuentes.push(a); }
    const cancelaFin = () => { if (!fin) return; try { fin.g.gain.cancelScheduledValues(0); fin.g.gain.setValueAtTime(1, C.currentTime); fin.f.stop(); } catch (e) { } fin = null; };
    const pon = () => {
      if (!r.vivo) { clearInterval(iv); return; }
      const tot = r.cfg.vueltas || 0;
      if (fin && (!tot || fin.v !== tot - 1) && C.currentTime < fin.tf) cancelaFin();      // «+ Impro» después de programar el final
      while (r.t0 + v * L < C.currentTime + 1.5) {
        if (tot && v >= tot) return;
        const t = r.t0 + v * L, g = C.createGain(), s = C.createBufferSource();
        s.buffer = B.buf[ruta]; s.connect(g); g.connect(r.gp.guitarra);
        if (t >= C.currentTime) s.start(t, PRE); else s.start(C.currentTime, PRE + (C.currentTime - t));
        r.fuentes.push(s);
        if (tot && v === tot - 1 && B.buf[rutaF]) {            // el tema final: a partir del c. 11, el final de verdad
          const tf = t + L * 10 / 12, f = C.createBufferSource();
          g.gain.setValueAtTime(1, tf - .005); g.gain.linearRampToValueAtTime(0, tf + .05);
          f.buffer = B.buf[rutaF]; f.connect(r.gp.guitarra); f.start(tf, PRE); r.fuentes.push(f);
          fin = { v, tf, g, f };
        }
        v++;
      }
    };
    iv = setInterval(pon, 200); pon();
    r.ctl.alMorir.push(() => clearInterval(iv));
  }

  /* ══ (20-oct, C5) ORDEN DE SALIDA: el sorteo en la pizarra del porche ══
     Turnos de suite_blues_turnos (solo Protester, con #c=…), por transpositor Do → Si♭ → Mi♭ y, dentro de cada grupo,
     A SUERTES (el sorteo del día se guarda: al volver no se repite; 🎲 lo repite). La pizarra pintada
     (img/inter/d5_pizarra.webp) con el sorteo animado a tiza al pulso de la banda: en cada nombre, un pulso barajando
     (raspa la tabla de Ruby) y otro escribiéndolo (tiza + golpe). Luego el carrusel en una pizarrita: «Te toca» /
     «Después»; cada SOLO es de uno; al acabar un grupo, «Siguiente grupo» cambia la banda de tono (Si♭ → Fa, Mi♭ → Si♭).
     Fuera de lmathome.es y sin cuenta (el artifact de revisión) sale una lista de prueba con nombres inventados. */
  const GRUPOS = ['Do', 'Sib', 'Mib'];
  const NOM_T = { Do: 'Do', Sib: 'Si♭', Mib: 'Mi♭' };
  const AVISO_T = { Do: 'do', Sib: 'sib', Mib: 'mib' };
  const tz = s => B.esc(s).replace(/♭/g, '<span class="bm">b</span>');   // la tiza no tiene «♭»: una b pequeña, a mano
  const TIZA = [0, 3.65, 4.7, 5.85];                     // trozos con trazos de sfx/d5/tiza.mp3
  const ICO_DADO = '<svg viewBox="0 0 24 24"><path fill-rule="evenodd" d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm3 3a1.6 1.6 0 1 0 0 3.2A1.6 1.6 0 0 0 8 6zm8 8.8a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2zm-4-4.4a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2z"/></svg>';
  const ICO_PIZ = '<svg viewBox="0 0 24 24"><path fill-rule="evenodd" d="M2 4h20v14H2zm2 2v10h16V6zm2 2h8v1.6H6zm0 3h5v1.6H6zM7 19h2l-1 3H6zm8 0h2l1 3h-2z"/></svg>';
  const ICO_X = '<svg viewBox="0 0 24 24"><path d="M5.6 4.2 12 10.6l6.4-6.4 1.4 1.4-6.4 6.4 6.4 6.4-1.4 1.4-6.4-6.4-6.4 6.4-1.4-1.4 6.4-6.4-6.4-6.4z"/></svg>';
  const RUIDO = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='f'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' seed='4'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 -2.4 1.85'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23f)'/%3E%3C/svg%3E\")";
  function estilos() {
    if (document.getElementById('pz-css')) return;
    const s = document.createElement('style'); s.id = 'pz-css';
    s.textContent = "@font-face{font-family:'Tiza';src:url(fonts/caveat-latin-600-normal.woff2) format('woff2');font-weight:600;font-display:block}" +
      '.pz{position:absolute;inset:0;z-index:5;background:#1f2924 url(img/inter/d5_pizarra.webp) center/100% 100% no-repeat;border-radius:calc(var(--u)*.6);opacity:0;transition:opacity .45s ease;box-shadow:0 calc(var(--u)*.6) calc(var(--u)*2.4) rgba(0,0,0,.6)}' +
      '.pz.ver{opacity:1}' +
      '.pz-in{position:absolute;left:11%;right:11%;top:12%;bottom:21%;display:flex;flex-direction:column}' +
      '.tz{font-family:Tiza,"Cormorant Garamond",cursive;font-weight:600;color:rgba(247,246,240,.93);text-shadow:0 0 1px rgba(255,255,255,.55),0 0 calc(var(--u)*.5) rgba(255,255,255,.12);-webkit-mask-image:' + RUIDO + ';mask-image:' + RUIDO + ';-webkit-mask-size:calc(var(--u)*8);mask-size:calc(var(--u)*8)}' +
      '.bm{font-size:.8em;position:relative;top:-.14em;margin-left:.03em}' +
      '.pz-tit{text-align:center;font-size:calc(var(--u)*4.3);line-height:1;transform:rotate(-1.2deg)}' +
      '.pz-cols{flex:1;display:flex;justify-content:center;gap:calc(var(--u)*3.2);margin-top:calc(var(--u)*1.8);min-height:0}' +
      '.pz-col{display:flex;flex-direction:column;align-items:stretch;min-width:0}' +
      '.pz-cab{text-align:center;font-size:calc(var(--u)*3.5);line-height:1.05;padding-bottom:calc(var(--u)*.35);border-bottom:calc(var(--u)*.16) solid rgba(247,246,240,.6)}' +
      '.pz-cab small{font-size:.5em;opacity:.72;margin-left:.45em}' +
      '.pz-col.vacio{opacity:.38}' +
      '.pz-lis{flex:1;display:grid;grid-auto-flow:column;grid-auto-columns:max-content;justify-content:center;column-gap:calc(var(--u)*3.4);margin-top:calc(var(--u)*.9);align-content:start}' +
      '.pz-f{font-size:calc(var(--u)*3.1);line-height:1.12;height:calc(var(--u)*3.9);white-space:nowrap;overflow:hidden;display:flex;align-items:baseline;gap:.3em;position:relative}' +
      '.pz-f .n{display:inline-block;clip-path:inset(-20% 100% -20% 0)}' +
      '.pz-f .n i{font-style:normal;opacity:.62;font-size:.68em;margin-left:.3em}' +
      '.pz-f.esc .n{clip-path:inset(-20% -5% -20% 0);transition:clip-path .5s linear}' +
      '.pz-f.baraja .n{clip-path:none;opacity:.4}' +
      '.pz-f.ya .n::after{content:"";position:absolute;left:1.2em;right:0;top:55%;height:calc(var(--u)*.16);background:rgba(247,246,240,.75);transform:rotate(-2deg)}' +
      '.pz-f.ya{opacity:.55}' +
      '.pz-f.act .n{outline:calc(var(--u)*.16) solid rgba(247,246,240,.75);outline-offset:calc(var(--u)*.25);border-radius:40%/60%}' +
      '.pz-pie{position:absolute;right:4.5%;bottom:3.2%;display:flex;gap:calc(var(--u)*.6);align-items:center}' +
      /* el carrusel: una tira de pizarra entre el papel y la barra de abajo */
      '.pzc{position:absolute;left:50%;transform:translateX(-50%);bottom:calc(var(--u)*10.1);display:flex;align-items:center;gap:calc(var(--u)*1.3);padding:calc(var(--u)*.45) calc(var(--u)*.6) calc(var(--u)*.45) calc(var(--u)*1.6);background:#1f2924 url(img/inter/d5_pizarra.webp) center/cover no-repeat;border-radius:calc(var(--u)*.4);box-shadow:0 calc(var(--u)*.3) calc(var(--u)*1.2) rgba(0,0,0,.55);z-index:5;max-width:88%;white-space:nowrap}' +
      '.pzc-cab{font-size:calc(var(--u)*1.35);opacity:.75}' +
      '.pzc-te{font-size:calc(var(--u)*1.35);opacity:.75}' +
      '.pzc-nom{font-size:calc(var(--u)*2.3);line-height:1}' +
      '.pzc-ins{font-size:calc(var(--u)*1.3);opacity:.7}' +
      '.pzc-des{font-size:calc(var(--u)*1.35);opacity:.75}' +
      '.pzc-bts{display:flex;gap:calc(var(--u)*.4)}' +
      /* los doce compases, pequeñitos, junto a la claqueta */
      '.mini12{display:grid;grid-template-columns:repeat(12,calc(var(--u)*1.05));gap:calc(var(--u)*.16);margin-left:calc(var(--u)*.8)}' +
      '.mini12 i{height:calc(var(--u)*1.05);border:1px solid var(--oro-a);border-radius:calc(var(--u)*.18)}' +
      '.mini12 i:nth-child(4n+1){margin-left:calc(var(--u)*.2)}' +
      '.mini12 i.on{background:var(--oro);border-color:var(--oro)}' +
      '.mini12-v{font-size:calc(var(--u)*.95);letter-spacing:.12em;text-transform:uppercase;color:var(--oro-hi);opacity:.85;min-width:calc(var(--u)*6)}';
    document.head.appendChild(s);
  }
  const rnd = () => { try { const u = new Uint32Array(1); crypto.getRandomValues(u); return u[0] / 4294967296; } catch (e) { return Math.random(); } };
  const baraja = n => { const a = Array.from({ length: n }, (_, i) => i); for (let i = n - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const hoy = () => { const d = new Date(); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); };
  /* la lista de prueba (nombres inventados): solo fuera de lmathome.es y sin cuenta */
  const enVivo = () => /(^|\.)lmathome\.es$/i.test(location.hostname);
  function prueba() {
    if (enVivo() || B.lee('blues5_vista', 'profe') !== 'profe') return null;
    const L = [['Uxía', 'violín'], ['Breixo', 'violín'], ['Antía', 'violín'], ['Mateo', 'violín'], ['Sabela', 'violín'], ['Brais', 'violonchelo'], ['Noa', 'violonchelo'], ['Lara', 'violonchelo'], ['Xiana', 'canto'], ['Hugo', 'piano']]
      .map(([n, i]) => ({ nombre: n, instrumento: i, transp: 'Do' }));
    L.push({ nombre: 'Iria', instrumento: 'clarinete', transp: 'Sib' }, { nombre: 'Martín', instrumento: 'trompeta', transp: 'Sib' }, { nombre: 'Olalla', instrumento: 'saxo alto', transp: 'Mib' });
    return { ok: true, grupo: 'Prueba', turnos: L, prueba: true };
  }
  async function turnos(ctl) {
    const cuenta = leeCuenta();
    if (!cuenta || !B.SB_URL || !B.SB_ANON) return prueba();      // sin cuenta: en lmathome.es el panel no sale
    let datos = null;
    const ab = typeof AbortController === 'function' ? new AbortController() : null, tm = ab && setTimeout(() => ab.abort(), 12000);
    try {
      const r = await fetch(B.SB_URL + '/rest/v1/rpc/suite_blues_turnos', {
        method: 'POST', cache: 'no-store', signal: ab && ab.signal,
        headers: { apikey: B.SB_ANON, Authorization: 'Bearer ' + B.SB_ANON, 'Content-Type': 'application/json' },
        body: JSON.stringify({ p_cuenta_id: cuenta })
      });
      if (r.ok) datos = await r.json();
    } catch (e) { datos = null; }
    finally { if (tm) clearTimeout(tm); }
    if (ctl.muerto || !datos || !datos.ok || !Array.isArray(datos.turnos) || !datos.turnos.length) return null;
    return datos;
  }
  B.inter.practica.turnos = turnos;

  function ordenDeSalida(zona, box, ctl, op, datos, cb) {
    estilos();
    const P = 60 / B.TEMPO, SW = P * .67;
    const firma = datos.turnos.map(t => t.transp + '|' + t.nombre + '|' + t.instrumento).sort().join(';');
    const grupo = datos.grupo || '';
    /* el sorteo: { Do: [turno…], Sib: […], Mib: […] } */
    let G = null;
    const sortea = () => {
      const g = {};
      GRUPOS.forEach(k => { const L = datos.turnos.filter(t => (t.transp || 'Do') === k); g[k] = baraja(L.length).map(i => L[i]); });
      // instrumentos que no sean Do/Sib/Mib: con los de Do
      const raros = datos.turnos.filter(t => GRUPOS.indexOf(t.transp) < 0); if (raros.length) g.Do = g.Do.concat(baraja(raros.length).map(i => raros[i]));
      G = g;
      B.guarda('blues5_sorteo', { dia: hoy(), grupo, firma, orden: GRUPOS.map(k => G[k].map(t => datos.turnos.indexOf(t))) });
    };
    const guardado = B.lee('blues5_sorteo', null);
    const yaSorteado = !!(guardado && guardado.dia === hoy() && guardado.grupo === grupo && guardado.firma === firma && Array.isArray(guardado.orden));
    if (yaSorteado) { G = {}; GRUPOS.forEach((k, j) => { G[k] = (guardado.orden[j] || []).map(i => datos.turnos[i]).filter(Boolean); }); }
    const llenos = () => GRUPOS.filter(k => G && G[k].length);
    let gi = 0, desfase = 0, solo = -1, estado = 'antes';   // estado: antes · tema · solo · fin
    const gk = () => llenos()[gi] || 'Do';
    const lista = () => (G && G[gk()]) || [];
    /* pone el selector Do/Si♭/Mi♭ en el grupo (sin decir nada) */
    const ponTono = k => { B.guarda('blues5_transp', k); B.$$('.i-transp button').forEach(x => x.classList.toggle('sel', x.dataset.k === k)); };

    /* ── la pizarra grande ── */
    let pz = null, quitaTecla = null, sub = null;
    function cierra() {
      if (sub) { sub.matar(); sub = null; }
      if (quitaTecla) { quitaTecla(); quitaTecla = null; }
      if (pz) { const v = pz; pz = null; v.classList.remove('ver'); setTimeout(() => v.remove(), 480); }
    }
    ctl.alMorir.push(cierra);
    function pizarra(animar) {
      cierra();
      pz = B.el('div', 'pz'); zona.appendChild(pz);
      const filas = Math.max(5, Math.min(7, Math.ceil(Math.max.apply(null, GRUPOS.map(k => G[k].length)) / 2) || 5));
      let html = '<div class="pz-in"><div class="tz pz-tit">Jam en el porche' + (grupo && !datos.prueba ? ' · ' + B.esc(grupo) : '') + '</div><div class="pz-cols">';
      GRUPOS.forEach(k => {
        const n = G[k].length, nc = Math.max(1, Math.ceil(n / filas));
        html += '<div class="pz-col' + (n ? '' : ' vacio') + '" style="flex:' + nc + ' 1 0"><div class="tz pz-cab">' + tz(NOM_T[k]) + '<small>banda en ' + tz(B.banda.NOMBRE_TONO[B.banda.TONOS[k]]) + '</small></div>' +
          '<div class="pz-lis" style="grid-template-rows:repeat(' + Math.max(1, Math.min(n, filas)) + ',auto)">' +
          (n ? G[k].map((t, i) => '<div class="tz pz-f" data-k="' + k + '" data-i="' + i + '"><span class="n">' + (i + 1) + '. ' + B.esc(t.nombre) + '<i>' + B.esc(t.instrumento || '') + '</i></span></div>').join('') : '<div class="tz pz-f esc"><span class="n">—</span></div>') +
          '</div></div>';
      });
      pz.innerHTML = html + '</div></div>';
      const pie = B.el('div', 'pz-pie'); pz.appendChild(pie);
      const btDado = U.boton(ICO_DADO, 'peq ico', () => { sortea(); gi = 0; desfase = 0; solo = -1; estado = 'antes'; pizarra(true); pinta(); });
      btDado.dataset.tip = 'Volver a sortear';
      const btSaltar = U.boton(B.motor.ICO.sig, 'peq ico', () => termina()); btSaltar.dataset.tip = 'Escribirlo todo ya';
      const btTocar = U.boton('¡A tocar! ' + B.motor.ICO.play, 'prim'); btTocar.style.display = 'none';
      btTocar.addEventListener('click', e => { e.stopPropagation(); B.ac(); vamos(); });
      const btCerrar = U.boton(ICO_X, 'peq ico', () => cierra()); btCerrar.dataset.tip = 'Cerrar la pizarra';
      if (!cb.tocando()) pie.appendChild(btDado);
      pie.appendChild(btSaltar);
      pie.appendChild(cb.tocando() ? btCerrar : btTocar);
      requestAnimationFrame(() => pz && pz.classList.add('ver'));
      const filasEl = B.$$('.pz-f[data-k]', pz);
      const marca = () => {
        const gAct = gk(), L = lista();
        const hechos = estado === 'solo' ? solo + desfase : (estado === 'final' || estado === 'fin') ? L.length : desfase;
        filasEl.forEach(f => {
          const k = f.dataset.k, i = +f.dataset.i;
          f.classList.toggle('ya', GRUPOS.indexOf(k) < GRUPOS.indexOf(gAct) || (k === gAct && i < hechos));
          f.classList.toggle('act', k === gAct && estado === 'solo' && i === solo + desfase);
        });
      };
      let hecho = false;
      function termina() {
        if (sub) { sub.matar(); sub = null; }
        filasEl.forEach(f => { f.classList.remove('baraja'); f.classList.add('esc'); const k = f.dataset.k, i = +f.dataset.i, t = G[k][i]; f.querySelector('.n').innerHTML = (i + 1) + '. ' + B.esc(t.nombre) + '<i>' + B.esc(t.instrumento || '') + '</i>'; });
        if (hecho) return; hecho = true;
        btSaltar.style.display = 'none'; btTocar.style.display = ''; marca();
        if (animar) U.suelta(U.rota(op, AVISO_T[gk()]), ctl, 3.4);
      }
      function vamos() { cierra(); ponTono(gk()); cb.empieza(); }
      quitaTecla = B.captura.poner(e => { if (e.key === ' ' || e.key === 'Enter') { if (!hecho) termina(); else if (cb.tocando()) cierra(); else vamos(); return true; } return false; });
      if (!animar) { termina(); return; }
      /* el sorteo, al pulso: un pulso barajando (raspa) y otro escribiendo (tiza + golpe) */
      sub = B.control();
      U.suelta(U.rota(op, 'orden'), ctl, 4.6);
      const t0 = B.ahora() + .5;
      filasEl.forEach((f, s) => {
        const k = f.dataset.k, i = +f.dataset.i, L = G[k];
        const tb = t0 + s * 2 * P;
        B.enTiempo(tb, () => {
          f.classList.add('baraja'); const n = f.querySelector('.n'); let c = 0;
          const iv = setInterval(() => { const o = L[(i + 1 + (c++)) % L.length] || L[i]; n.innerHTML = B.esc(o.nombre); }, 75);
          sub.alMorir.push(() => clearInterval(iv));
          if (B.buf['sfx/d5/tabla_raspa.mp3']) { B.suena('sfx/d5/tabla_raspa.mp3', { vol: .45, rate: .96 + rnd() * .08 }); B.suena('sfx/d5/tabla_raspa.mp3', { vol: .3, t: B.ahora() + SW }); }
          B.enTiempo(tb + P, () => {
            clearInterval(iv); f.classList.remove('baraja');
            n.innerHTML = (i + 1) + '. ' + B.esc(L[i].nombre) + '<i>' + B.esc(L[i].instrumento || '') + '</i>';
            void n.offsetWidth; f.classList.add('esc');
            if (B.buf['sfx/d5/tabla_golpe.mp3']) B.suena('sfx/d5/tabla_golpe.mp3', { vol: .8 });
            if (B.buf['sfx/d5/tiza.mp3']) { const h = B.suena('sfx/d5/tiza.mp3', { vol: .9, offset: TIZA[s % TIZA.length], fade: .02 }); if (h) setTimeout(() => h.parar(.12), 560); }
            if (s === filasEl.length - 1) B.enTiempo(tb + 2 * P, () => termina(), sub);
          }, sub);
        }, sub);
      });
      if (!filasEl.length) termina();
    }

    /* ── el carrusel (la pizarrita de la derecha) ── */
    function pinta() {
      const L = lista(), k = gk(), n = B.banda.NOMBRE_TONO[B.banda.TONOS[k]];
      box.classList.remove('oculto');
      const idx = estado === 'solo' ? solo + desfase : (estado === 'tema' ? solo + 1 + desfase : desfase);
      const t = L[idx], d = L[idx + 1];
      const sig = llenos()[gi + 1];
      let html = '<div class="tz pzc-cab">' + tz(NOM_T[k]) + ' · banda en ' + tz(n) + '</div>';
      if (estado === 'final') html += '<div class="tz pzc-te">Todos</div><div class="tz pzc-nom">Tema final</div><div class="tz pzc-des">' + (sig ? 'Después: los de ' + tz(NOM_T[sig]) : '¡Y… final!') + '</div>';
      else if (estado === 'fin' && sig) html += '<div class="tz pzc-te">Siguiente grupo</div><div class="tz pzc-nom">' + tz(NOM_T[sig]) + '</div><div class="tz pzc-ins">la banda se pasa a ' + tz(B.banda.NOMBRE_TONO[B.banda.TONOS[sig]]) + '</div>';
      else if (estado === 'fin') html += '<div class="tz pzc-te">¡Bravo!</div><div class="tz pzc-nom">Fin de la jam</div>';
      else if (estado === 'solo' && !t) html += '<div class="tz pzc-te">Improvisa</div><div class="tz pzc-nom">¡Todos!</div>';
      else html += '<div class="tz pzc-te">' + (estado === 'solo' ? 'Improvisa' : (solo >= 0 ? 'Tema · después improvisa' : 'Primera impro')) + '</div><div class="tz pzc-nom">' + B.esc(t ? t.nombre : '—') + '</div><div class="tz pzc-ins">' + B.esc(t ? t.instrumento : '') + '</div>' +
        '<div class="tz pzc-des">' + (d ? 'Después: ' + B.esc(d.nombre) : (sig ? 'Después: los de ' + tz(NOM_T[sig]) : 'Después: tema final')) + '</div>';
      box.innerHTML = html;
      const bts = B.el('div', 'pzc-bts'); box.appendChild(bts);
      if (estado === 'fin' && sig) {
        const b = U.boton(NOM_T[sig] + ' ' + B.motor.ICO.play, 'prim peq', () => siguienteGrupo()); b.dataset.tip = 'La banda se pasa a ' + B.banda.NOMBRE_TONO[B.banda.TONOS[sig]]; bts.appendChild(b);
      } else if (estado !== 'fin' && estado !== 'final') {
        const b = U.boton(B.motor.ICO.sig, 'peq ico', () => { if (idx + 1 < L.length || estado === 'solo') { desfase++; pinta(); U.suelta(U.rota(op, 'siguiente'), ctl, 2); } }); b.dataset.tip = 'Siguiente solista'; bts.appendChild(b);
      }
      const bp = U.boton(ICO_PIZ, 'peq ico', () => { pizarra(false); }); bp.dataset.tip = 'Ver la pizarra'; bts.appendChild(bp);
      cb.alTurno(estado === 'solo' ? (t || { nombre: 'todos', instrumento: 'libre' }) : null);
      if (pz) pizarra(false);
    }
    async function siguienteGrupo() {
      const sig = llenos()[gi + 1]; if (!sig) return;
      gi++; desfase = 0; solo = -1; estado = 'antes';
      ponTono(sig); pinta();
      B.motor.aviso('Cambio de tono: la banda pasa a ' + B.banda.NOMBRE_TONO[B.banda.TONOS[sig]], 3);
      U.suelta(U.rota(op, AVISO_T[sig]), ctl, 4);
      await B.espera(3.6, ctl); if (ctl.muerto) return;
      cb.empieza();
    }
    /* lo que llama el concierto */
    const api = {
      lista, get desfase() { return desfase; },
      pinta: e => { estado = e === 'tema' ? 'tema' : estado; solo = -1; pinta(); },
      vuelta: (v, tp, ultima) => { if (tp === 'SOLO') { estado = 'solo'; solo = (v - 1) / 2; } else if (ultima) estado = 'final'; else { estado = 'tema'; solo = v / 2 - 1; } pinta(); },
      fin: () => { estado = 'fin'; pinta(); }
    };
    if (!yaSorteado) sortea();
    ponTono(llenos()[0] || 'Do');
    pinta();
    if (!yaSorteado && !cb.tocando()) pizarra(true);
    return api;
  }
  B.inter.practica.orden = ordenDeSalida;
  B.inter.practica.voces = ['voz/d5/eli_tema.mp3', 'voz/d5/eli_solo.mp3'];
  B.inter.practica.claves = ['tema', 'solo', 'otra_vez', 'ultimo', 'final', 'orden', 'do', 'sib', 'mib', 'siguiente', 'aplauso', 'cierre'];
})(window.BLUES);
