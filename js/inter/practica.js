/* BLUES · practica (P5.1–P5.2): pestañas «Paso 1 · El tema», «Paso 2 · Notas largas»,
   «Paso 3 · Finales», «Concierto». Concierto: la banda de cinco en bucle:
   claqueta → TEMA → SOLO ×N → TEMA → final; rótulo grande y voz de Eli con dos pulsos de
   antelación; en TEMA la partitura, en SOLO las tres escalas mixolidias con las notas que se
   pueden tocar encendidas; rejilla de 12 compases siempre en una esquina; selector Do/Si♭/Mi♭.
   orden: orden de salida por instrumentos (Supabase suite_blues_turnos); sin cuenta, no sale.
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
    U.fondo(caja);
    const tabs = B.el('div', 'pestanas'); tabs.style.cssText = 'position:absolute;left:5%;top:2.2%;z-index:6';
    caja.appendChild(tabs);
    const zona = B.el('div', ''); zona.style.cssText = 'position:absolute;inset:0;top:7.5%'; caja.appendChild(zona);
    let sub = null;
    const abre = k => {
      if (sub) sub.matar(); B.banda.parar();
      sub = B.control(); ctl.alMorir.push(() => sub && sub.matar());
      zona.innerHTML = '';
      B.$$('button', tabs).forEach(b => b.classList.toggle('sel', b.dataset.k === k));
      if (k === 'concierto') concierto(zona, sub, op);
      else { const v = U.vistaHito(zona, +k.slice(-1), sub, { vueltas: 0, arriba: '1%' }); v.papel.style.maxHeight = '74%'; }
      B.guarda('blues5_pestana', k);
    };
    PESTANAS.forEach(([k, t]) => { const b = U.boton(t, 'peq', () => abre(k)); b.dataset.k = k; tabs.appendChild(b); });
    abre(op.pestana || 'paso1');
    const pieG = B.el('div', ''); pieG.style.cssText = 'position:absolute;right:calc(var(--u)*1.6);top:calc(var(--u)*1.6);z-index:6'; caja.appendChild(pieG);
    await U.seguir(caja, ctl, 'Salir', pieG);
    if (sub) sub.matar(); B.banda.parar();
    if (!ctl.muerto) await U.dice(op, 'cierre', ctl);
  };

  function concierto(zona, ctl, op) {
    op = op || {};
    /* columna izquierda: TEMA (partitura) o SOLO (escalas) */
    const escenario = U.panel(zona, { left: '5%', width: '66%', top: '2%', bottom: '19%', padding: 'calc(var(--u)*1)' });
    const vTema = B.el('div', ''); escenario.appendChild(vTema);
    const pt = B.partitura(vTema, { modo: 'limpio', romanos: true });
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
    /* columna derecha: rejilla + orden de salida */
    const lado = U.panel(zona, { right: '5%', width: '22%', top: '2%', padding: 'calc(var(--u)*1)' });
    lado.innerHTML = '<div class="i-tit" style="margin-bottom:calc(var(--u)*.6)">Doce compases</div>';
    const rej = U.rejilla(lado);
    const info = B.el('div', 'i-estado', 'Pulsa «Empezar».'); info.style.cssText = 'margin-top:calc(var(--u)*.9);font-size:calc(var(--u)*1.3)'; lado.appendChild(info);
    const vueltaEt = B.el('div', 'i-tit', ''); vueltaEt.style.marginTop = 'calc(var(--u)*.6)'; lado.appendChild(vueltaEt);
    const ordenBox = U.panel(zona, { right: '5%', width: '22%', bottom: '19%', padding: 'calc(var(--u)*1)', display: 'none' });
    /* barra inferior */
    const barra = B.el('div', 'i-pie-izq'); zona.appendChild(barra);
    const pips = U.pips(barra);
    const pie = B.el('div', 'i-pie'); pie.style.right = 'calc(var(--u)*12)'; zona.appendChild(pie);
    const AVISO_T = { Do: 'do', Sib: 'sib', Mib: 'mib' };
    U.transp(pie, k => { U.suelta(U.rota(op, AVISO_T[k]), ctl, 4); if (B.banda.tocando) empieza(); });
    let N = 3;
    const btMas = U.boton('+ Solo', 'peq', () => { N++; plan(); if (B.banda.tocando) U.suelta(U.rota(op, 'otra_vez'), ctl, 2); }); btMas.dataset.tip = 'Una vuelta más de SOLO';
    const btFin = U.boton('Último tema', 'peq', () => { const r = B.banda.run(); if (r) { N = Math.max(0, (r.vueltaAct || 0)); r.cfg.vueltas = N + 2; plan(); U.suelta(U.rota(op, 'ultimo'), ctl, 2.4); } });
    const btTocar = U.boton(B.motor.ICO.play + ' Empezar', 'prim', () => { if (B.banda.tocando) B.banda.parar(); else empieza(); });
    pie.appendChild(btMas); pie.appendChild(btFin); pie.appendChild(btTocar);
    const tipo = v => (v === 0 || v === N + 1) ? 'TEMA' : 'SOLO';
    function plan() { const r = B.banda.run(); if (r) r.cfg.vueltas = N + 2; }
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
      B.banda.tocar({
        ton: U.tono(), bpm: B.TEMPO, claqueta: true, vueltas: N + 2,
        pistas: v => tipo(v) === 'TEMA' ? { guitarra: 'base', tabla: 'base', contrabajo: 'base', trompeta: 'tema', acordeon: 'tema' } : { guitarra: 'base', tabla: 'base', contrabajo: 'base', trompeta: 'solo', acordeon: 'acomp' },
        alEntrada: k => { pips.k(k); if (k === 3) { anuncia('TEMA'); vista('TEMA'); } },
        alCompas: (i, v, t) => {
          iC = i; vC = v; tC = t; rej.marca(i);
          vueltaEt.textContent = 'Vuelta ' + (v + 1) + ' de ' + (N + 2) + ' · ' + tipo(v);
          info.textContent = tipo(v) === 'TEMA' ? 'Todos: el tema.' : (turnoAct ? 'Solo: ' + turnoAct : 'Solo: improvisa con la escala.');
          if (tipo(v) === 'SOLO') { pt.apaga(); marcaSolo(i); } else pt.compas(i);
          if (i === 0) vista(tipo(v));
          if (i === 0 && v > 0 && tipo(v - 1) === 'SOLO') U.suelta(U.rota(op, 'aplauso'), ctl, 2.4);
        },
        alPulso: (b, i, v) => { if (i === 11 && b === 2) { if (v + 1 < N + 2) anuncia(tipo(v + 1)); else if (U.hay(op, 'final')) anuncia('TEMA', 'final'); } },
        alEstado: on => { btTocar.innerHTML = on ? '■ Parar' : B.motor.ICO.play + ' Empezar'; if (!on) { rej.marca(-1); pt.apaga(); pips.k(-1); iC = -1; } },
        alFin: () => { info.textContent = '¡Bravo! Final.'; B.motor.rotulo('¡BRAVO!'); }
      });
    }
    /* ── orden de salida por instrumentos ── */
    let turnoAct = '';
    orden(ordenBox, ctl, (t) => { turnoAct = t ? t.nombre + ' (' + t.instrumento + ')' : ''; }, k => U.suelta(U.rota(op, k), ctl, 4));
  }
  B.inter.practica.concierto = concierto;

  async function orden(box, ctl, alTurno, alAviso) {
    const cuenta = leeCuenta();
    if (!cuenta || !B.SB_URL || !B.SB_ANON) return;      // sin cuenta o sin conexión: el panel no sale
    /* suite_blues_turnos aún NO existe: un 404, un error o una respuesta rara → el panel no sale y no se dice nada */
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
    if (ctl.muerto || !datos || !datos.ok || !Array.isArray(datos.turnos) || !datos.turnos.length) return;
    const ORD = ['Do', 'Sib', 'Mib'];
    const turnos = datos.turnos.slice().sort((a, b) => (ORD.indexOf(a.transp) - ORD.indexOf(b.transp)) || String(a.instrumento).localeCompare(String(b.instrumento), 'es') || String(a.nombre).localeCompare(String(b.nombre), 'es'));
    box.style.display = '';
    let k = 0;
    const pinta = () => {
      const t = turnos[k];
      box.innerHTML = '<div class="i-tit">Orden de salida' + (datos.grupo ? ' · ' + B.esc(datos.grupo) : '') + '</div>' +
        '<div style="font-family:var(--f-carta);font-weight:600;font-size:calc(var(--u)*1.6);margin:calc(var(--u)*.5) 0">' + B.esc(t.nombre) + '</div>' +
        '<div class="i-estado" style="font-size:calc(var(--u)*1.1)">' + B.esc(t.instrumento) + ' · en ' + ({ Do: 'Do', Sib: 'Si♭', Mib: 'Mi♭' }[t.transp] || t.transp) + '</div>' +
        '<div class="i-estado" style="font-size:calc(var(--u)*.95);margin-top:calc(var(--u)*.4)">Turno ' + (k + 1) + ' de ' + turnos.length + (turnos[k + 1] ? ' · después: ' + B.esc(turnos[k + 1].nombre) : '') + '</div>';
      const b = U.boton('Siguiente', 'peq', () => {
        const antes = turnos[k].transp; k = Math.min(turnos.length - 1, k + 1); pinta();
        if (turnos[k].transp !== antes) { B.guarda('blues5_transp', turnos[k].transp); B.$$('.i-transp button').forEach(x => x.classList.toggle('sel', x.dataset.k === turnos[k].transp)); B.motor.aviso('Cambio de tono: la banda pasa a ' + B.banda.NOMBRE_TONO[B.banda.TONOS[turnos[k].transp]], 3); if (alAviso) alAviso({ Do: 'do', Sib: 'sib', Mib: 'mib' }[turnos[k].transp]); }
        else if (alAviso) alAviso('siguiente');
      });
      b.style.marginTop = 'calc(var(--u)*.8)'; box.appendChild(b);
      alTurno(t);
      B.guarda('blues5_transp', t.transp);
    };
    pinta();
    if (alAviso) alAviso('orden');
  }
  B.inter.practica.orden = orden;
  B.inter.practica.voces = ['voz/d5/eli_tema.mp3', 'voz/d5/eli_solo.mp3'];
  B.inter.practica.claves = ['tema', 'solo', 'otra_vez', 'ultimo', 'final', 'orden', 'do', 'sib', 'mib', 'siguiente', 'aplauso', 'cierre'];
})(window.BLUES);
