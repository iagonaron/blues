/* BLUES · ahoraTu (P1.6, generativa): el alumno toca 4–5 notas con el ritmo que quiera;
   la armónica contesta con el MISMO RITMO (cuantizado con swing suave), el CONTORNO
   INVERTIDO sobre la primera nota ajustado a Sol La Si Re Mi Fa (Do4–Do6), ACABANDO EN
   SOL (o en Re si el alumno acabó en Sol: le devuelve la pregunta) y con UNA NOTA DOBLADA. */
'use strict';
(function (B) {
  const U = B.iu;
  const ESC = [7, 9, 11, 2, 4, 5];
  const BPM = 96, SW = .6;
  function aEscala(m) {
    let mejor = null;
    for (let d = 0; d <= 6 && mejor == null; d++) { if (ESC.indexOf(B.mod12(m - d)) >= 0) mejor = m - d; else if (ESC.indexOf(B.mod12(m + d)) >= 0) mejor = m + d; }
    m = mejor;
    while (m < 60) m += 12; while (m > 84) m -= 12;
    return m;
  }
  function cerca(pc, ref) {   // la nota de clase pc más cercana a ref, dentro de Do4–Do6
    let best = null;
    for (let m = 60; m <= 84; m++) if (B.mod12(m) === pc && (best == null || Math.abs(m - ref) < Math.abs(best - ref))) best = m;
    return best;
  }
  /* entrada: [{m, t}] (t en segundos) → {notas, desp (s desde la primera), bend (índice), acaba} */
  function responde(ent) {
    const p0 = ent[0].m;
    const r = ent.map(n => aEscala(p0 - (n.m - p0)));
    const ultAlumno = ent[ent.length - 1].m;
    const acaba = B.mod12(ultAlumno) === 7 ? 2 : 7;
    r[r.length - 1] = cerca(acaba, r.length > 1 ? r[r.length - 2] : r[0]);
    /* ritmo (Iago, 19-oct, punto 19): Amos le devuelve EXACTAMENTE el mismo ritmo que tocó el alumno (los mismos tiempos,
       sin cuantizar); solo se evita que dos notas se pisen (mínimo 0,1 s entre ataques) */
    const desp = []; ent.forEach((n, i) => desp.push(i ? Math.max(desp[i - 1] + .1, n.t - ent[0].t) : 0));
    /* la nota doblada: un Si que sale de Si♭; si no hay, la penúltima desde un semitono por debajo */
    let bend = -1;
    for (let i = 0; i < r.length - 1; i++) if (B.mod12(r[i]) === 11) { bend = i; break; }
    if (bend < 0) bend = Math.max(0, r.length - 2);
    return { notas: r, desp, bend, acaba };
  }
  B.inter.ahoraTu = async function (caja, op) {
    const ctl = op.ctl;
    U.fondo(caja);
    const arriba = U.panel(caja, { left: '6%', right: '6%', top: '5%' });
    const NR = B.clamp(op.rondas || 3, 1, 5);   // (punto 19) 3 rondas: propone el alumno y Amos le repite el ritmo
    arriba.innerHTML = '<div class="i-tit">Ahora preguntas tú · <span class="ronda">ronda 1 de ' + NR + '</span></div>' +
      '<div class="i-enun">Ahora preguntas tú: toca 4 o 5 notas con el ritmo que quieras. Amos te contestará con <b style="color:var(--oro-hi)">tu mismo ritmo</b>.</div>' +
      '<div class="dialogo" style="margin-top:calc(var(--u)*1)"><span class="burbuja" style="--c:#86B7E8">Tú</span><span class="ch-tu"></span>' +
      '<span class="burbuja" style="--c:#F09A4E">Amos</span><span class="ch-amos"></span></div>' +
      '<div class="i-marcas" style="margin-top:calc(var(--u)*1)">' + '<i></i>'.repeat(NR) + '</div>';
    const abajo = U.panel(caja, { left: '6%', right: '6%', bottom: '16%', padding: 'calc(var(--u)*.8)' });   /* (20-oct, p. 10) teclas más largas: el teclado crece 4u y baja un poco */
    const tec = B.teclado(abajo, { desde: 53, hasta: 84, inst: 'acordeon', ctl });
    const pie = B.el('div', 'i-pie'); caja.appendChild(pie);
    const izq = B.el('div', 'i-pie-izq'); caja.appendChild(izq);
    const estado = B.el('span', 'i-estado', 'Te escucho…'); izq.appendChild(estado);
    let notas = [], escuchando = true, ultima = 0, vueltas = 0;
    tec.marcaClases(ESC, 'perm');
    tec.alPulsar.push((m, t) => { if (!escuchando) return; if (notas.length >= 5) return; notas.push({ m, t }); ultima = t; U.chips(arriba.querySelector('.ch-tu'), notas.map(n => n.m), '#86B7E8'); });
    let seguido = false;
    const ronda = async () => {
      notas = []; escuchando = true;
      while (!ctl.muerto && !seguido) {
        await B.espera(.05, ctl);
        const t = B.ahora();
        if (notas.length >= 5 && t - ultima > .8) break;
        if (notas.length >= 1 && t - ultima > 1.2) break;
      }
      if (ctl.muerto || seguido) return;
      escuchando = false;
      const R = responde(notas);
      B.inter.ahoraTu.ultima = { entrada: notas.map(n => ({ m: n.m, t: n.t })), salida: R };
      estado.textContent = R.acaba === 2 ? 'Acabaste en Sol: Amos te devuelve la pregunta (acaba en Re).' : 'Amos contesta… y acaba en Sol.';
      const t0 = B.ahora() + .35, mostradas = [];
      arriba.querySelector('.ch-amos').innerHTML = '';
      R.notas.forEach((m, i) => {
        const t = t0 + R.desp[i], sig = i + 1 < R.notas.length ? t0 + R.desp[i + 1] : t + .9;
        B.inst.toca('armonica', m, { t, dur: Math.max(.16, (sig - t) * .92), bend: i === R.bend ? 1 : 0, bendMs: 160 });
        B.enTiempo(t, () => { tec.enciende(m, 'otra', Math.max(.25, sig - t)); mostradas.push(m); U.chips(arriba.querySelector('.ch-amos'), mostradas, '#F09A4E', i === R.notas.length - 1); }, ctl);
      });
      await B.espera(R.desp[R.desp.length - 1] + 1.4, ctl);
      if (ctl.muerto) return;
      vueltas++;
      /* reacciones: la primera vez que contesta (respuesta) o que devuelve la pregunta (devuelve); tras la 1.ª, «otra» */
      if (R.acaba === 2 && !dichas.devuelve) { dichas.devuelve = 1; await U.dice(op, 'devuelve', ctl); }
      else if (R.acaba !== 2 && !dichas.respuesta) { dichas.respuesta = 1; await U.dice(op, 'respuesta', ctl); }
      if (vueltas === 1 && !ctl.muerto) await U.dice(op, 'otra', ctl);
      if (ctl.muerto) return;
      estado.textContent = 'Otra: toca tu pregunta.';
      escuchando = true; notas = [];
    };
    const dichas = {}, marcas = B.$$('.i-marcas i', arriba);
    for (let r = 0; r < NR && !ctl.muerto; r++) {
      arriba.querySelector('.ronda').textContent = 'ronda ' + (r + 1) + ' de ' + NR;
      marcas.forEach((m, k) => m.classList.toggle('act', k === r));
      await ronda();
      if (!ctl.muerto && marcas[r]) marcas[r].classList.add('ok');
    }
    if (ctl.muerto) return;
    estado.textContent = NR + ' preguntas tuyas, ' + NR + ' respuestas de Amos.';
    await U.dice(op, 'fin', ctl); if (ctl.muerto) return;
    await U.seguir(caja, ctl, 'Seguir', pie);
  };
  B.inter.ahoraTu.responde = responde;
  B.inter.ahoraTu.claves = ['respuesta', 'devuelve', 'otra', 'fin'];
})(window.BLUES);
