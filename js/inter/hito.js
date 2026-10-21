/* BLUES · hito (P4.7–P4.9; n: 1|2|3): el ALUMNO TOCA CON SU INSTRUMENTO.
   Manuscrito en grande (modo según el hito), banda con los músicos que ya hay, claqueta,
   nota encendida, «Otra vez» y «Seguir». Selector Do / Si♭ / Mi♭ (la banda cambia de tono). */
'use strict';
(function (B) {
  const U = B.iu;
  /* (Iago, 21-oct 19:32 y 19:40) en los hitos y en «Notas del acorde»: claqueta A MAYORES (los cuatro pulsos de cada compás, con el
     peso en el 2 y el 4), la guitarra de Eli más alta y SIN el acorde final que sonaba fuerte de golpe al acabar. Sin tocar
     js/banda.js (común): mientras dura la interacción se envuelve B.banda.tocar, y al salir se deja como estaba. */
  B.c4banda = function (ctl, o) {
    o = o || {};
    const orig = B.banda.tocar;
    const quita = () => { if (B.banda.tocar === envuelta) B.banda.tocar = orig; };
    function envuelta(cfg) {
      cfg = Object.assign({}, cfg); const alC = cfg.alCompas, nv = cfg.vueltas || 0;
      let r = null;
      const p = () => 60 / ((r && r.cfg && r.cfg.bpm) || B.TEMPO);
      /* (Iago, 21-oct 19:42) cuando entra Ruby no tiene que sonar batería: el RASCADOR de su tabla de lavar (muestras reales,
         raspado abajo en cada pulso y arriba en la corchea de swing) y un bombo suave en 1 y 3. Si algún día está la pista grabada
         banda/<tono>/tabla_<v>.mp3 (bombo + rascador, de C5), suena esa y esto no hace nada. */
      const RAS = ['sfx/d4/rascador_abajo.mp3', 'sfx/d4/rascador_arriba.mp3'];
      const vt = cfg.pistas && typeof cfg.pistas === 'object' ? cfg.pistas.tabla : null;
      const ruby = !!(vt && B.buf[RAS[0]] && !(B.banda.ruta && B.buf[B.banda.ruta(cfg.ton || 'G', 'tabla', vt)]));
      let gRuby = null;
      const tabla = t0 => {
        if (!ruby || !gRuby) return;
        const P = p(), sw = P * 2 / 3;
        for (let b = 0; b < 4; b++) {
          const t = t0 + b * P;
          B.suena(RAS[0], { t, vol: b % 2 ? .95 : .7, bus: gRuby }); B.suena(RAS[1], { t: t + sw, vol: .5, bus: gRuby });
          if (b % 2 === 0) B.sint.maleta(t, 'bombo', b === 0 ? .85 : .65, gRuby);
        }
      };
      /* (Iago, 19:44) «a partir del hito 3 sí que metemos batería a mayores»: escobillas en cada pulso (peso en 2 y 4, corchea de
         swing suave) y bombo en 1 y 3, por encima de la tabla de Ruby */
      let gBat = null;
      const bateria = t0 => {
        if (!gBat) return;
        const P = p(), sw = P * 2 / 3;
        for (let b = 0; b < 4; b++) {
          const t = t0 + b * P;
          B.sint.maleta(t, 'escoba', b % 2 ? 1 : .6, gBat); B.sint.maleta(t + sw, 'escoba', .32, gBat);
          if (b % 2 === 0) B.sint.maleta(t, 'bombo', b === 0 ? .8 : .6, gBat);
        }
      };
      const clicks = t0 => { if (!r || !r.vivo || !r.gp) return; for (let b = 0; b < 4; b++) B.sint.baqueta(t0 + b * p(), b % 2 ? (o.peso || .9) : (o.suave || .45), r.gp.click); tabla(t0); bateria(t0); };
      cfg.alCompas = (i, v, t) => {
        if (alC) alC(i, v, t);
        if (!r || !r.gp) return;
        if (!(nv && v === nv - 1 && i === 11)) { clicks(t + 4 * p()); return; }
        const tf = t + 4 * p();   // fin del último compás: se apaga todo menos la claqueta (el acorde final ya no suena)
        ['guitarra', 'contrabajo', 'acordeon', 'trompeta', 'tabla', 'ruby', 'bat'].forEach(k => { const g = k === 'ruby' ? gRuby : k === 'bat' ? gBat : r.gp[k]; if (g) { g.gain.setValueAtTime(g.gain.value, tf - .06); g.gain.setTargetAtTime(0, tf - .04, .04); } });
      };
      r = orig.call(B.banda, cfg);
      if (r && r.gp) {
        if (r.gp.guitarra) r.gp.guitarra.gain.value = o.guitarra || 2.2;
        if (ruby && r.salida) { gRuby = B.ac().createGain(); gRuby.connect(r.salida); if (r.gp.tabla) r.gp.tabla.gain.value = 0; }
        if (o.bateria && r.salida) { gBat = B.ac().createGain(); gBat.gain.value = .9; gBat.connect(r.salida); }
        clicks(r.t0);
      }
      return r;
    }
    B.banda.tocar = envuelta; ctl.alMorir.push(quita);
    return quita;
  };
  B.inter.hito = async function (caja, op) {
    const ctl = op.ctl, n = op.n || 1;
    const quitaBanda = B.c4banda(ctl, { bateria: n >= 3 });
    U.fondo(caja);
    let veces = 0;
    const alFin = () => {
      veces++;
      if (ctl.muerto) return;
      if (veces === 1 && U.hay(op, 'otra')) U.dice(op, 'otra', ctl);
      else if (veces <= 2) U.dice(op, 'bien', ctl);
    };
    const v = U.vistaHito(caja, n, ctl, { vueltas: op.vueltas || 2, arriba: '3%', alFin });
    await B.espera(.6, ctl);
    if (op.auto !== false) v.arranca();
    await U.seguir(caja, ctl, 'Seguir', v.pie);
    B.banda.parar(); quitaBanda();
  };
  B.inter.hito.claves = ['otra', 'bien'];
})(window.BLUES);
