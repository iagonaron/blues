/* BLUES · acordeon (P1.6): el estuche negro; clic en los dos cierres → se abre; arrastrar en
   horizontal para abrir el fuelle (aire y un acorde de Sol al abrirlo). */
'use strict';
(function (B) {
  const U = B.iu;
  B.inter.acordeon = async function (caja, op) {
    const ctl = op.ctl;
    U.fondo(caja);
    const enun = U.panel(caja, { left: '50%', top: '6%', transform: 'translateX(-50%)', textAlign: 'center' });
    enun.innerHTML = '<div class="i-tit">El acordeón de Xan</div><div class="i-enun">Abre los dos cierres del estuche.</div>';
    const est = B.el('div', ''); est.style.cssText = 'position:absolute;left:50%;top:56%;width:calc(var(--u)*38);height:calc(var(--u)*26.5);transform:translate(-50%,-50%)';   // (Iago, 20-oct) el estuche pintado (img/inter/estuche_*.webp)
    est.innerHTML = '<div class="caja" style="position:absolute;left:0;right:0;bottom:0;height:54.5%;background:url(img/inter/d1_estuche_caja.webp) center/100% 100% no-repeat;filter:drop-shadow(0 calc(var(--u)*.8) calc(var(--u)*1.6) rgba(0,0,0,.7))"></div>' +
      '<div class="tapa" style="position:absolute;left:0;right:0;top:0;height:45.5%;background:url(img/inter/d1_estuche_tapa.webp) center/100% 100% no-repeat;transform-origin:top;transition:transform .9s ease;z-index:3"></div>' +
      /* (ronda 5, Iago: «al pulsar los cierres, que se vean moverse o levantarse») cada cierre lleva su lengüeta pintada
         (recortada de la lámina, img/inter/d1_cierre_*.webp) que gira sobre su bisagra y se levanta; debajo queda la grapa */
      [[21.2, 'izq'], [78.8, 'der']].map(([x, l], k) => '<button class="cierre brilla" data-k="' + k + '" aria-label="Cierre ' + (k + 1) + '" style="position:absolute;left:' + x + '%;top:38.6%;width:calc(var(--u)*4.6);height:calc(var(--u)*5.2);margin-left:calc(var(--u)*-2.3);border-radius:calc(var(--u)*.6);border:0;padding:0;background:transparent;cursor:pointer;z-index:4;transition:opacity .3s">' +
        '<i class="lengua" style="position:absolute;left:50%;top:calc(var(--u)*.87);width:calc(var(--u)*1.94);height:calc(var(--u)*3.46);margin-left:calc(var(--u)*-.97);background:url(img/inter/d1_cierre_' + l + '.webp) center/100% 100% no-repeat;transform-origin:50% 4%;transition:transform .38s cubic-bezier(.3,1.5,.5,1),filter .38s;filter:drop-shadow(0 calc(var(--u)*.12) calc(var(--u)*.15) rgba(0,0,0,.6))"></i></button>').join('') +
      '<div class="acc" style="position:absolute;left:50%;top:50%;height:66%;width:62%;transform:translate(-50%,-46%);display:none;align-items:stretch;z-index:2;touch-action:none;cursor:ew-resize;filter:drop-shadow(0 calc(var(--u)*.6) calc(var(--u)*1) rgba(0,0,0,.6))">' +
      '<div style="flex:none;width:calc(var(--u)*10.1);background:url(img/inter/acordeon_teclado.webp) right center/contain no-repeat"></div>' +   // (Iago, 20-oct) el acordeón de Xan pintado, por piezas
      '<div class="fuelle" style="flex:1 1 0;min-width:0;background:url(img/inter/acordeon_fuelle.webp) center/100% 92% no-repeat"></div>' +
      '<div style="flex:none;width:calc(var(--u)*11.7);background:url(img/inter/acordeon_bajos.webp) left center/contain no-repeat"></div></div>';
    caja.appendChild(est);
    const abiertos = new Set();
    await new Promise(res => {
      B.$$('.cierre', est).forEach(b => b.addEventListener('click', e => { e.stopPropagation(); if (abiertos.has(b.dataset.k)) return; const lg = b.querySelector('.lengua'); lg.style.transform = 'perspective(calc(var(--u)*20)) rotateX(-128deg)'; lg.style.filter = 'brightness(.62) drop-shadow(0 calc(var(--u)*-.3) calc(var(--u)*.4) rgba(0,0,0,.6))'; b.classList.remove('brilla'); abiertos.add(b.dataset.k); (B.buf['sfx/d1/estuche_cierre.mp3'] ? B.suena('sfx/d1/estuche_cierre.mp3', { bus: B.bus.sfx, vol: .9 }) : B.sint.metal(B.ahora(), .35)); if (abiertos.size === 2) res(); }));
      ctl.alMorir.push(res);
    });
    if (B.buf['sfx/d1/estuche_abrir.mp3']) B.suena('sfx/d1/estuche_abrir.mp3', { bus: B.bus.sfx, vol: .85 });   // (Iago, 20-oct) sonidos de Splice
    if (ctl.muerto) return;
    await B.espera(.3, ctl);
    est.querySelector('.tapa').style.transform = 'perspective(900px) rotateX(75deg)';
    B.$$('.cierre', est).forEach(b => b.style.opacity = 0);
    const acc = est.querySelector('.acc'), fu = est.querySelector('.fuelle');
    acc.style.display = 'flex';
    enun.querySelector('.i-enun').textContent = 'Arrastra en horizontal para abrir el fuelle.';
    await new Promise(res => {
      let x0 = null, ab = 0, aire = false;
      acc.addEventListener('pointerdown', e => { e.preventDefault(); e.stopPropagation(); x0 = e.clientX; try { acc.setPointerCapture(e.pointerId); } catch (er) { } });
      acc.addEventListener('pointermove', e => {
        if (x0 == null) return;
        ab = B.clamp(Math.abs(e.clientX - x0) / (est.clientWidth * .35), 0, 1);
        fu.style.width = (8 + ab * 40) + '%'; acc.style.width = (62 + ab * 48) + '%';
        if (ab > .2 && !aire) { aire = true; B.sint.fuelle(B.ahora(), .8, .2); }
        if (ab >= .9) { x0 = null; res(); }
      });
      acc.addEventListener('pointerup', () => { x0 = null; });
      ctl.alMorir.push(res);
      B.inter.acordeon.abre = () => { fu.style.width = '48%'; acc.style.width = '110%'; res(); };
    });
    if (ctl.muerto) return;
    [55, 59, 62, 67].forEach((m, k) => B.inst.toca('acordeon', m, { t: B.ahora() + .05 + k * .02, dur: 1.6, vel: .9 }));
    enun.querySelector('.i-enun').textContent = '¡Sol mayor! El acordeón está listo.';
    await B.espera(.8, ctl); if (ctl.muerto) return;
    if (!await U.dice(op, 'abierto', ctl)) return;
    await B.espera(.6, ctl);
  };
  B.inter.acordeon.claves = ['abierto'];
  B.inter.acordeon.voces = ['sfx/d1/estuche_cierre.mp3', 'sfx/d1/estuche_abrir.mp3'];   // se precargan con el acto
})(window.BLUES);
