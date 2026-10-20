/* BLUES · pregunta (P1.6, guiada): la armónica de Amos pregunta y acaba en Re;
   el alumno contesta en el teclado (3–6 notas, ritmo libre) y debe acabar en Sol.
   Fin de la respuesta: 1,4 s de silencio o «Listo». 3 rondas. */
'use strict';
(function (B) {
  const U = B.iu;
  const RONDAS = [
    [[67, .5], [69, .5], [71, 1], [74, 2]],                              // Sol La Si | Re
    [[74, .5], [71, .5], [69, .5], [71, .5], [74, 2]],                   // Re Si La Si | Re
    [[67, .5], [71, .5, { bend: 1, bendMs: 160 }], [69, 1], [74, 2]]     // Sol (Si♭→Si) La | Re
  ];
  const ESCALA = [7, 9, 11, 2, 4, 5];   // Sol La Si Re Mi + Fa natural
  const BIEN = [{ quien: 'AMOS', texto: '¡Eso es, gallego! A casa.', voz: 'voz/d1/amos_bien1.mp3' }, { quien: 'AMOS', texto: 'Así se contesta, boy.', voz: 'voz/d1/amos_bien2.mp3' }, { quien: 'AMOS', texto: 'Lord… ¡qué bien suena eso!', voz: 'voz/d1/amos_bien3.mp3' }];
  const CASI = [{ quien: 'AMOS', texto: 'Casi: acaba en Sol, que es casa.', voz: 'voz/d1/amos_casi.mp3' }];
  B.inter.pregunta = async function (caja, op) {
    const ctl = op.ctl;
    U.fondo(caja);
    const arriba = U.panel(caja, { left: '6%', right: '6%', top: '5%' });
    const NR = B.clamp(op.rondas || 3, 1, 3);
    arriba.innerHTML = '<div class="i-tit">Pregunta y respuesta · <span class="ronda">ronda 1 de ' + NR + '</span></div>' +
      '<div class="i-enun">Amos pregunta con la armónica. Contesta tú en el teclado: tu frase tiene que <b style="color:var(--oro-hi)">acabar en Sol</b>.</div>' +
      '<div class="dialogo" style="margin-top:calc(var(--u)*1)"><span class="burbuja" style="--c:#F09A4E">Amos</span><span class="ch-amos"></span>' +
      '<span class="burbuja" style="--c:#86B7E8">Tú</span><span class="ch-tu"></span></div>' +
      '<div class="i-marcas" style="margin-top:calc(var(--u)*1)">' + '<i></i>'.repeat(NR) + '</div>';
    const abajo = U.panel(caja, { left: '6%', right: '6%', bottom: '16%', padding: 'calc(var(--u)*.8)' });   /* (20-oct, p. 10) teclas más largas: el teclado crece 4u y baja un poco */
    const tec = B.teclado(abajo, { desde: 53, hasta: 84, inst: 'acordeon', ctl });
    const pie = B.el('div', 'i-pie'); caja.appendChild(pie);
    const izq = B.el('div', 'i-pie-izq'); caja.appendChild(izq);
    const estado = B.el('span', 'i-estado', ''); izq.appendChild(estado);
    const btListo = U.boton('Listo', '', () => { listoPulsado = true; }); btListo.disabled = true; pie.appendChild(btListo);
    let grabando = false, notas = [], ultima = 0, listoPulsado = false;
    tec.alPulsar.push((m, t) => { if (!grabando) return; notas.push(m); ultima = t; U.chips(arriba.querySelector('.ch-tu'), notas, '#86B7E8'); if (notas.length >= 2) tec.marcaClases([7], 'obj'); });
    const marcas = B.$$('.i-marcas i', arriba);
    for (let r = 0; r < NR; r++) {
      arriba.querySelector('.ronda').textContent = 'ronda ' + (r + 1) + ' de ' + NR;
      marcas.forEach((m, k) => m.classList.toggle('act', k === r));
      let intentos = 0, ok = false;
      while (!ok && intentos < 3) {
        intentos++;
        /* la pregunta de Amos */
        grabando = false; btListo.disabled = true; tec.limpia(); estado.textContent = 'Amos pregunta…';
        arriba.querySelector('.ch-tu').innerHTML = '';
        const q = RONDAS[r], midis = q.map(n => n[0]);
        arriba.querySelector('.ch-amos').innerHTML = '';
        const fr = U.frase(q, { inst: 'armonica', bpm: 96, ctl, alNota: (i, t, m) => { tec.enciende(m, 'otra', .45); U.chips(arriba.querySelector('.ch-amos'), midis.slice(0, i + 1), '#F09A4E', i === midis.length - 1); } });
        if (!await B.espera(fr.fin - B.ahora() + .25, ctl)) return;
        /* la respuesta del alumno */
        tec.marcaClases(ESCALA, 'perm');
        estado.textContent = 'Te toca: contesta y acaba en Sol';
        notas = []; listoPulsado = false; grabando = true; btListo.disabled = false;
        const t0 = B.ahora();
        while (!ctl.muerto) {
          await B.espera(.05, ctl);
          const t = B.ahora();
          if (listoPulsado && notas.length) break;
          if (notas.length >= 3 && t - ultima > 1.4) break;
          if (notas.length >= 6 && t - ultima > .6) break;
          if (!notas.length && t - t0 > 25) break;
        }
        if (ctl.muerto) return;
        grabando = false; btListo.disabled = true; tec.limpia();
        const fin = notas.length ? notas[notas.length - 1] : null;
        U.chips(arriba.querySelector('.ch-tu'), notas, '#86B7E8', true);
        if (fin != null && B.mod12(fin) === 7) {
          ok = true; marcas[r].classList.add('ok'); estado.textContent = '¡Acaba en Sol!';
          B.sint.ho(B.ahora() + .1, .9);
          tec.enciende(fin, 'ok', .8);
          await U.di(U.rota(op, 'acierto_r' + (r + 1)) || U.rota(op, 'acierto') || BIEN[r % BIEN.length], ctl);
        } else {
          estado.textContent = fin == null ? 'No has tocado nada…' : 'Has acabado en ' + B.nombre(fin) + '.';
          if (fin != null) tec.enciende(fin, 'mal', .8);
          await U.di(U.rota(op, 'fallo', CASI), ctl);
          if (intentos === 2 && !ctl.muerto && U.hay(op, 'pista')) await U.di(U.rota(op, 'pista'), ctl);
        }
        if (ctl.muerto) return;
      }
      if (!ok) marcas[r].classList.add('mal');
    }
    estado.textContent = NR === 1 ? 'Pregunta y respuesta.' : NR + ' preguntas, ' + NR + ' respuestas.';
    btListo.remove();
    await U.seguir(caja, ctl, 'Seguir', pie);
  };
  B.inter.pregunta.RONDAS = RONDAS;
  B.inter.pregunta.voces = BIEN.concat(CASI);
  B.inter.pregunta.claves = ['acierto_r1', 'acierto_r2', 'acierto_r3', 'acierto', 'fallo', 'pista'];
  B.inter.pregunta.subtAbajo = true;   // (ronda 6, Iago en el aula) el texto de quien habla, abajo: el alumno mira donde toca
})(window.BLUES);
