/* BLUES · bluenote (P4.6): el primer compás con Si natural y con Si♭ (sobre G7); «¿Cuál suena más
   a blues?»; luego un deslizador para doblar una nota larga de la armónica de Si♭ a Si. */
'use strict';
(function (B) {
  const U = B.iu;
  const C1 = b => [[67, .5], [65, .5], [67, .5], [b, .5], [67, 1], [67, 1]];
  B.inter.bluenote = async function (caja, op) {
    const ctl = op.ctl;
    U.fondo(caja);
    const pnl = U.panel(caja, { left: '50%', top: '48%', transform: 'translate(-50%,-50%)', width: '62%', textAlign: 'center', padding: 'calc(var(--u)*2)' });
    pnl.innerHTML = '<div class="i-tit">La blue note</div><div class="i-enun">El mismo compás, dos veces. ¿Cuál suena más a blues?</div><div class="dialogo bts" style="justify-content:center;margin:calc(var(--u)*1.2) 0"></div><div class="i-estado res"></div>' +
      '<div class="desl oculto" style="margin-top:calc(var(--u)*1.4)"><div class="i-enun" style="font-size:calc(var(--u)*1.35)">Ahora dóblala tú: arrastra de Si♭ a Si mientras suena.</div>' +
      '<div style="display:flex;align-items:center;gap:calc(var(--u)*1);justify-content:center;margin-top:calc(var(--u)*.8)"><b>Si♭</b><input type="range" min="0" max="100" value="0" style="width:60%;accent-color:#C9A45C"><b>Si</b></div></div>';
    /* (C4, 20-oct; Iago: «texturas pintadas») el mástil pintado de la guitarra de Eli detrás del panel (op.textura) */
    const tex = op.textura && (B.img[op.textura] || B.img[B.motor.resImg(op.textura)]);
    if (tex) pnl.style.background = 'linear-gradient(rgba(20,14,8,.7),rgba(20,14,8,.86)), url(' + tex + ') center/cover';
    const bts = pnl.querySelector('.bts'), res = pnl.querySelector('.res');
    const toca = b => { [43, 47, 50, 53].forEach(m => B.inst.toca('guitarra', m, { t: B.ahora() + .05, dur: 2.2, vel: .6 })); U.frase(C1(b), { inst: 'armonica', bpm: 96, ctl, t: B.ahora() + .1 }); };
    let oido = new Set();
    const A = U.boton('A · con Si', '', () => { toca(71); oido.add('A'); }), Bb = U.boton('B · con Si♭', '', () => { toca(70); oido.add('B'); });
    bts.appendChild(A); bts.appendChild(Bb);
    const elegir = B.el('div', 'dialogo'); elegir.style.cssText = 'justify-content:center;margin-top:calc(var(--u)*.6)';
    pnl.insertBefore(elegir, res);
    let elegida = null, eleccion = null;
    [['A', 'Me suena más a blues la A'], ['B', 'Me suena más a blues la B']].forEach(([k, t]) => elegir.appendChild(U.boton(t, 'peq', () => { elegida = k; if (eleccion) eleccion(); })));
    for (let intento = 0; intento < 3; intento++) {
      elegida = null;
      await new Promise(r => { eleccion = r; ctl.alMorir.push(r); });
      if (ctl.muerto) return;
      if (elegida === 'B') { await U.dice(op, 'bemol', ctl); break; }
      res.innerHTML = 'Suena bien… pero no llora. Escucha otra vez la <b>B</b>.';
      await U.dice(op, 'natural', ctl);
      if (ctl.muerto) return;
      if (!U.hay(op, 'natural')) break;
    }
    if (ctl.muerto) return;
    res.innerHTML = elegida === 'B' ? '¡Eso es! El <b>Si♭</b> sobre G7 es la <b>blue note</b>: la tercera rebajada.' : 'Suena bien… pero el que tiene el sabor del blues es el <b>Si♭</b>: la tercera rebajada, la <b>blue note</b>.';
    const d = pnl.querySelector('.desl'); d.classList.remove('oculto');
    U.suelta(U.rota(op, 'doblar'), ctl, 6);
    const rango = d.querySelector('input');
    /* para doblar de verdad, la armónica del deslizador es un oscilador propio */
    const C = B.ac(), o = C.createOscillator(), g = C.createGain(), lp = C.createBiquadFilter();
    o.type = 'square'; o.frequency.value = B.frec(70); lp.type = 'lowpass'; lp.frequency.value = 2200; g.gain.value = 0;
    o.connect(lp); lp.connect(g); g.connect(B.bus.inst); o.start(); B.vivo(o);
    ctl.alMorir.push(() => { try { o.stop(); } catch (e) { } });
    rango.addEventListener('pointerdown', e => e.stopPropagation());
    /* (C4, 20-oct) el bend con la ARMÓNICA DE VERDAD (muestra la4 del paquete de instrumentos, subida con playbackRate:
       si♭ = +1 semitono, si = +2); si no está cargada, el oscilador de antes */
    const MUE = 'inst/armonica/69.mp3'; let voz = null, tFin = 0;
    const rate = v => Math.pow(2, (1 + v) / 12);
    ctl.alMorir.push(() => { if (voz) { voz.parar(.1); voz = null; } });
    rango.addEventListener('input', () => {
      const v = +rango.value / 100; B.inter.bluenote.bend = v;
      if (B.buf[MUE]) {
        const ahora = B.ahora();
        if (!voz || ahora > tFin) { voz = B.suena(MUE, { bus: B.bus.inst, vol: .9, fade: .04 }); tFin = ahora + voz.dur / rate(v) - .3; }
        voz.fuente.playbackRate.setTargetAtTime(rate(v), ahora, .03);
        clearTimeout(B.inter.bluenote._t); B.inter.bluenote._t = setTimeout(() => { if (voz) { voz.parar(.25); voz = null; } }, 900);
        return;
      }
      o.frequency.setTargetAtTime(B.frec(70 + v), B.ahora(), .03); g.gain.setTargetAtTime(.07, B.ahora(), .03); clearTimeout(B.inter.bluenote._t); B.inter.bluenote._t = setTimeout(() => g.gain.setTargetAtTime(0, B.ahora(), .15), 700);
    });
    await U.seguir(caja, ctl, 'Seguir');
  };
  B.inter.bluenote.claves = ['bemol', 'natural', 'doblar'];
})(window.BLUES);
