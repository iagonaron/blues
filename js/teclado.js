/* ══════════════════════════════════════════════════════════════════════
   BLUES · teclado de piano en pantalla (el acordeón de teclado de Xan)
   B.teclado(contenedor, {desde:53 (Fa3), hasta:84 (Do6), nombres:true,
     inst:'acordeon', sonar:true, base:60, alPulsar(m,t), alSoltar(m,t)})
   Ratón y táctil (multitáctil), teclado del ordenador
   (A W S E D F T G Y H U J K = Do…Do, Z/X cambian de octava) y Web MIDI.
   Clases de luz: perm (permitidas) · obj (objetivo) · ok · mal · otra.
   ══════════════════════════════════════════════════════════════════════ */
'use strict';
(function (B) {
  const NEGRA = [1, 3, 6, 8, 10];
  const MAPA = { a: 0, w: 1, s: 2, e: 3, d: 4, f: 5, t: 6, g: 7, y: 8, h: 9, u: 10, j: 11, k: 12 };
  const LUCES = ['perm', 'obj', 'ok', 'mal', 'otra'];
  let midiPedido = false; const oyentesMidi = new Set();
  function pideMidi() {
    if (midiPedido || !navigator.requestMIDIAccess) return; midiPedido = true;
    try {
      navigator.requestMIDIAccess().then(acc => {
        const engancha = p => { p.onmidimessage = ev => { const [st, m, v] = ev.data; const tipo = st & 0xF0; oyentesMidi.forEach(f => f(tipo === 0x90 && v > 0 ? 'on' : (tipo === 0x80 || (tipo === 0x90 && v === 0)) ? 'off' : null, m, v)); }; };
        acc.inputs.forEach(engancha);
        acc.onstatechange = e => { if (e.port && e.port.type === 'input' && e.port.state === 'connected') engancha(e.port); };
      }).catch(() => { });
    } catch (e) { }
  }

  B.teclado = function (cont, o) {
    o = Object.assign({ desde: 53, hasta: 84, nombres: true, inst: 'acordeon', sonar: true, base: 60, vel: .9 }, o || {});
    const caja = B.el('div', 'teclado' + (o.nombres ? '' : ' sin-nombres'));
    const dentro = B.el('div', 'tk-dentro'); caja.appendChild(dentro);
    cont.appendChild(caja);
    const teclas = {};
    const blancas = []; for (let m = o.desde; m <= o.hasta; m++) if (NEGRA.indexOf(B.mod12(m)) < 0) blancas.push(m);
    const w = 100 / blancas.length;
    blancas.forEach((m, i) => {
      const d = B.el('div', 'tk bl'); d.style.left = (i * w) + '%'; d.style.width = 'calc(' + w + '% - 2px)'; d.style.marginLeft = '1px';
      d.dataset.m = m; d.innerHTML = '<span class="tk-n">' + B.nombre(m) + (B.mod12(m) === 0 ? '<sub style="font-size:.7em;opacity:.6">' + (Math.floor(m / 12) - 1) + '</sub>' : '') + '</span>';
      dentro.appendChild(d); teclas[m] = d;
    });
    for (let m = o.desde; m <= o.hasta; m++) {
      if (NEGRA.indexOf(B.mod12(m)) < 0) continue;
      const iz = blancas.indexOf(m - 1); if (iz < 0) continue;
      const d = B.el('div', 'tk ng'); d.style.left = ((iz + 1) * w - w * .31) + '%'; d.style.width = (w * .62) + '%';
      d.dataset.m = m; d.innerHTML = '<span class="tk-n">' + B.nombre(m) + '</span>';
      dentro.appendChild(d); teclas[m] = d;
    }
    const sonando = {};   // midi → voz
    const pulsadas = {};  // midi → número de fuentes que la mantienen
    const T = {
      caja, teclas, o, base: o.base, activo: true,
      alPulsar: [], alSoltar: [],
      noteOn(m, vel) {
        if (!T.activo) return; if (!teclas[m] && !o.fueraDeRango) return;
        pulsadas[m] = (pulsadas[m] || 0) + 1;
        if (pulsadas[m] > 1) return;
        const t = B.ahora();
        if (teclas[m]) teclas[m].classList.add('pulsada');
        if (o.sonar) { if (sonando[m]) sonando[m].parar(); sonando[m] = B.inst.toca(o.inst, m, { vel: vel || o.vel }); sonando[m]._t = t; }
        T.alPulsar.forEach(f => f(m, t)); if (o.alPulsar) o.alPulsar(m, t);
      },
      noteOff(m) {
        if (!pulsadas[m]) return;
        pulsadas[m]--; if (pulsadas[m] > 0) return;
        const t = B.ahora();
        if (teclas[m]) teclas[m].classList.remove('pulsada');
        if (sonando[m]) { const v = sonando[m]; v.parar(Math.max(t, (v._t || 0) + .14)); delete sonando[m]; }
        T.alSoltar.forEach(f => f(m, t)); if (o.alSoltar) o.alSoltar(m, t);
      },
      sueltaTodo() { Object.keys(pulsadas).forEach(m => { pulsadas[m] = 1; T.noteOff(+m); }); },
      marca(midis, clase, solo) {
        if (solo !== false) T.limpia(clase);
        B.arr(midis).forEach(m => { if (teclas[m]) teclas[m].classList.add(clase); });
      },
      marcaClases(pcs, clase) {   // por clase de altura (todas las octavas)
        T.limpia(clase);
        Object.keys(teclas).forEach(k => { if (pcs.indexOf(B.mod12(+k)) >= 0) teclas[k].classList.add(clase); });
      },
      limpia(clase) { Object.values(teclas).forEach(d => { (clase ? [clase] : LUCES).forEach(c => d.classList.remove(c)); }); },
      enciende(m, clase, seg) { const d = teclas[m]; if (!d) return; d.classList.add(clase); B.espera(seg || .3).then(() => d.classList.remove(clase)); },
      nombres(on) { caja.classList.toggle('sin-nombres', !on); },
      destruir() { T.activo = false; T.sueltaTodo(); quitaCaptura(); document.removeEventListener('keyup', alSoltarTecla); oyentesMidi.delete(alMidi); caja.remove(); }
    };
    /* ratón y dedos */
    const porPuntero = {};
    const teclaEn = e => { const el = document.elementFromPoint(e.clientX, e.clientY); return el && el.closest && el.closest('.tk') && caja.contains(el) ? +el.closest('.tk').dataset.m : null; };
    caja.addEventListener('pointerdown', e => {
      const m = teclaEn(e); if (m == null) return;
      e.preventDefault(); B.ac();
      try { caja.setPointerCapture(e.pointerId); } catch (er) { }
      porPuntero[e.pointerId] = m; T.noteOn(m);
    });
    caja.addEventListener('pointermove', e => {
      if (porPuntero[e.pointerId] == null) return;
      const m = teclaEn(e); if (m == null || m === porPuntero[e.pointerId]) return;
      T.noteOff(porPuntero[e.pointerId]); porPuntero[e.pointerId] = m; T.noteOn(m);
    });
    const fuera = e => { if (porPuntero[e.pointerId] != null) { T.noteOff(porPuntero[e.pointerId]); delete porPuntero[e.pointerId]; } };
    caja.addEventListener('pointerup', fuera); caja.addEventListener('pointercancel', fuera); caja.addEventListener('lostpointercapture', fuera);
    /* teclado del ordenador */
    const porTecla = {};
    const quitaCaptura = B.captura.poner(e => {
      if (!T.activo) return false;
      const k = (e.key || '').toLowerCase();
      if (k === 'z' && !e.repeat) { T.base = Math.max(36, T.base - 12); B.motor && B.motor.aviso && B.motor.aviso('Teclas del ordenador: A = ' + B.nombreOct(T.base), 1.6); return true; }
      if (k === 'x' && !e.repeat) { T.base = Math.min(84, T.base + 12); B.motor && B.motor.aviso && B.motor.aviso('Teclas del ordenador: A = ' + B.nombreOct(T.base), 1.6); return true; }
      if (!(k in MAPA)) return false;
      if (e.repeat) return true;
      const m = T.base + MAPA[k]; porTecla[k] = m; B.ac(); T.noteOn(m); return true;
    });
    function alSoltarTecla(e) { const k = (e.key || '').toLowerCase(); if (porTecla[k] != null) { T.noteOff(porTecla[k]); delete porTecla[k]; } }
    document.addEventListener('keyup', alSoltarTecla);
    /* Web MIDI */
    function alMidi(tipo, m, v) { if (!T.activo || !tipo) return; if (tipo === 'on') { B.ac(); T.noteOn(m, .4 + v / 200); } else T.noteOff(m); }
    oyentesMidi.add(alMidi); pideMidi();
    if (o.ctl) o.ctl.alMorir.push(() => T.destruir());
    return T;
  };
})(window.BLUES);
