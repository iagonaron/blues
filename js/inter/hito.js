/* BLUES · hito (P4.7–P4.9; n: 1|2|3): el ALUMNO TOCA CON SU INSTRUMENTO.
   Manuscrito en grande (modo según el hito), banda con los músicos que ya hay, claqueta,
   nota encendida, «Otra vez» y «Seguir». Selector Do / Si♭ / Mi♭ (la banda cambia de tono). */
'use strict';
(function (B) {
  const U = B.iu;
  B.inter.hito = async function (caja, op) {
    const ctl = op.ctl, n = op.n || 1;
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
    B.banda.parar();
  };
  B.inter.hito.claves = ['otra', 'bien'];
})(window.BLUES);
