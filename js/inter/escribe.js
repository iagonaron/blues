/* BLUES · escribe (P2.3, opcional y corta): las notas del solo de Teddy aparecen en la libreta de Xan
   mientras suena «escrito» (recto); luego Teddy lo toca de verdad (swing y nota doblada). */
'use strict';
(function (B) {
  const U = B.iu;
  const SOLO = [[70, .5], [67, .5], [70, .5], [72, .5], [74, 1], [72, .5], [70, .5], [67, 2]];
  B.inter.escribe = async function (caja, op) {
    const ctl = op.ctl;
    U.fondo(caja);
    const lib = U.panel(caja, { left: '14%', right: '14%', top: '16%', background: '#EFE6D0', color: '#2b1f14' });
    lib.innerHTML = '<div class="i-tit" style="color:#6b4e2e">La libreta de Xan</div><svg viewBox="0 0 800 140" style="width:100%;margin-top:calc(var(--u)*.6)"><g stroke="#3a2a1a" stroke-width="1.2">' + [0, 1, 2, 3, 4].map(i => '<line x1="10" x2="790" y1="' + (40 + i * 14) + '" y2="' + (40 + i * 14) + '"/>').join('') + '</g><g class="ns"></g></svg><div class="i-estado est" style="color:#5b4630"></div>';
    const ns = lib.querySelector('.ns'), est = lib.querySelector('.est');
    const yDe = m => { const paso = { 67: 4, 70: 6, 72: 7, 74: 8 }[m] || 4; return 96 - paso * 7; };
    est.textContent = 'Teddy toca… y Xan lo apunta en corcheas iguales.';
    /* (punto 31) corcheas unidas de dos en dos: una barra por cada pulso de negra; la blanca, hueca */
    const ini = []; SOLO.reduce((t, n, k) => (ini[k] = t, t + n[1]), 0);
    const pulso = k => SOLO[k][1] < 1 ? Math.floor(ini[k] + 1e-6) : null;
    const delPulso = k => SOLO.map((n, j) => j).filter(j => pulso(j) !== null && pulso(j) === pulso(k));
    const X = k => 60 + k * 90, TOP = k => yDe(SOLO[k][0]) - 40;
    function pinta(k, m) {
      const x = X(k), y = yDe(m), d = SOLO[k][1], gr = d < 1 ? delPulso(k) : [];
      let h = '<g class="aparece"><ellipse cx="' + x + '" cy="' + y + '" rx="8" ry="6" transform="rotate(-18 ' + x + ' ' + y + ')" ' +
        (d >= 2 ? 'fill="#EFE6D0" stroke="#2b1f14" stroke-width="2.2"' : 'fill="#2b1f14"') + '/>' +
        '<line x1="' + (x + 8) + '" x2="' + (x + 8) + '" y1="' + y + '" y2="' + TOP(k) + '" stroke="#2b1f14" stroke-width="2"/>';
      if (d < 1 && gr.length < 2) h += '<path d="M' + (x + 8) + ' ' + TOP(k) + ' q 16 10 8 28" fill="none" stroke="#2b1f14" stroke-width="2.4"/>';
      if (d < 1 && gr.length > 1 && k === gr[gr.length - 1]) { const a = gr[0], xa = X(a) + 7, xb = x + 9, ya = TOP(a), yb = TOP(k);
        h += '<path d="M' + xa + ' ' + ya + 'L' + xb + ' ' + yb + 'L' + xb + ' ' + (yb + 7) + 'L' + xa + ' ' + (ya + 7) + 'Z" fill="#2b1f14"/>'; }
      ns.insertAdjacentHTML('beforeend', h + '</g>');
    }
    const f = U.frase(SOLO, { inst: 'trompeta', bpm: 100, swing: .5, ctl, alNota: (i, t, m) => pinta(i, m) });
    if (!await B.espera(f.fin - B.ahora() + .8, ctl)) return;
    await U.di(U.rota(op, 'deverdad', B.inter.escribe.voces), ctl); if (ctl.muerto) return;
    est.textContent = 'Así suena de verdad: con swing y con un bend. No se parece a lo escrito.';
    const real = SOLO.map((n, i) => i === 4 ? [n[0], n[1], { bend: 1.5, bendMs: 220, wa: true }] : i === 7 ? [n[0], n[1], { wa: true }] : n);
    const g = U.frase(real, { inst: 'trompeta', bpm: 100, swing: .7, ctl });
    if (!await B.espera(g.fin - B.ahora() + .6, ctl)) return;
    const pie = B.el('div', 'i-pie'); caja.appendChild(pie);
    pie.appendChild(U.boton('Escrito', 'peq', () => U.frase(SOLO, { inst: 'trompeta', bpm: 100, swing: .5, ctl })));
    pie.appendChild(U.boton('De verdad', 'peq', () => U.frase(real, { inst: 'trompeta', bpm: 100, swing: .7, ctl })));
    await U.seguir(caja, ctl, 'Seguir', pie);
  };
  B.inter.escribe.voces = [{ quien: 'TEDDY', texto: 'Ahora, de verdad.', voz: 'voz/d2/teddy_deverdad.mp3' }];
  B.inter.escribe.claves = ['deverdad'];
})(window.BLUES);
