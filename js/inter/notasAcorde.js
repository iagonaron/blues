/* BLUES · notasAcorde (P4.5, fácil): la guitarra de Eli toca los 12 compases; en cada compás se
   encienden las 4 notas del acorde; el alumno pulsa una cuando quiera y suena larga. Todo suena bien. */
'use strict';
(function (B) {
  const U = B.iu;
  B.inter.notasAcorde = async function (caja, op) {
    const ctl = op.ctl;
    U.fondo(caja);
    const arriba = U.panel(caja, { left: '8%', right: '8%', top: '5%' });
    arriba.innerHTML = '<div class="i-tit">Notas del acorde</div><div class="i-enun">Eli toca. Pulsa una de las notas encendidas cuando quieras: todas suenan bien.</div>';
    const rej = U.rejilla(arriba); rej.el.style.marginTop = 'calc(var(--u)*.8)';
    const ac = B.el('div', 'i-estado', ''); ac.style.marginTop = 'calc(var(--u)*.6)'; arriba.appendChild(ac);
    const abajo = U.panel(caja, { left: '8%', right: '8%', bottom: '16%', padding: 'calc(var(--u)*.8)' });   /* (20-oct, p. 10) teclas más largas: el teclado crece 4u y baja un poco */
    const tec = B.teclado(abajo, { desde: 53, hasta: 84, inst: 'acordeon', ctl });
    let pulsadas = 0; tec.alPulsar.push(() => { pulsadas++; if (pulsadas === 3) U.suelta(U.rota(op, 'acierto'), ctl, 3.6); });
    const pcs = { G7: [7, 11, 2, 5], C7: [7, 10, 0, 4], D7: [6, 9, 0, 2] };
    let fin = false;
    const izq = B.el('div', 'i-pie-izq'); caja.appendChild(izq); const pips = U.pips(izq);
    const quitaBanda = B.c4banda ? B.c4banda(ctl) : () => { };   // (Iago, 21-oct) claqueta a mayores, guitarra de Eli más alta, sin acorde final (js/inter/hito.js)
    B.banda.tocar({ ton: 'G', claqueta: true, vueltas: 1, pistas: { guitarra: 'base' },
      alEntrada: k => pips.k(k),
      alCompas: i => { rej.marca(i); const a = B.ACORDES[i]; tec.marcaClases(pcs[a], 'obj'); ac.textContent = a + ': ' + B.NOTAS_ACORDE[a].map(t => B.nombre(B.notaDe(t).midi)).join(' · '); },
      alFin: () => { fin = true; } });
    ctl.alMorir.push(() => B.banda.parar());
    while (!fin && !ctl.muerto) await B.espera(.1, ctl);
    quitaBanda();
    if (ctl.muerto) return;
    tec.limpia(); rej.marca(-1);
    ac.textContent = pulsadas ? '¡Suena bien! (' + pulsadas + ' notas)' : '¡Suena bien! La próxima vez, prueba a tocar tú también.';
    B.motor.rotulo('¡Suena bien!');
    if (!await U.dice(op, 'fin', ctl)) return;
    await U.seguir(caja, ctl, 'Seguir');
  };
  B.inter.notasAcorde.claves = ['acierto', 'fin'];
})(window.BLUES);
