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
    const est = B.el('div', ''); est.style.cssText = 'position:absolute;left:50%;top:55%;width:calc(var(--u)*36);height:calc(var(--u)*22);transform:translate(-50%,-50%)';
    est.innerHTML = '<div class="caja" style="position:absolute;inset:0;border-radius:calc(var(--u)*1.2);background:linear-gradient(180deg,#26221f,#0c0a09);border:1px solid #4a423a;box-shadow:0 calc(var(--u)*1) calc(var(--u)*2.4) rgba(0,0,0,.7)"></div>' +
      '<div class="tapa" style="position:absolute;left:0;right:0;top:0;height:46%;border-radius:calc(var(--u)*1.2) calc(var(--u)*1.2) 0 0;background:linear-gradient(180deg,#34302c,#171412);border-bottom:2px solid #000;transform-origin:top;transition:transform .9s ease;z-index:3"></div>' +
      [28, 72].map((x, k) => '<button class="cierre brilla" data-k="' + k + '" style="position:absolute;left:' + x + '%;top:42%;width:calc(var(--u)*3.4);height:calc(var(--u)*2.4);margin-left:calc(var(--u)*-1.7);border-radius:calc(var(--u)*.4);border:1px solid #E9CD8A;background:linear-gradient(180deg,#d8b560,#8a6a2f);cursor:pointer;z-index:4;transition:transform .3s"></button>').join('') +
      '<div class="acc" style="position:absolute;left:50%;top:50%;height:68%;width:44%;transform:translate(-50%,-46%);display:none;align-items:stretch;z-index:2;touch-action:none;cursor:ew-resize">' +
      '<div style="width:30%;background:linear-gradient(180deg,#8e1f24,#4c0d10);border:1px solid #C9A45C;border-radius:calc(var(--u)*.5) 0 0 calc(var(--u)*.5)"></div>' +
      '<div class="fuelle" style="width:8%;background:repeating-linear-gradient(90deg,#1b1b1b 0 6px,#e8dcc4 6px 8px);transition:width .05s"></div>' +
      '<div style="width:30%;background:linear-gradient(180deg,#8e1f24,#4c0d10);border:1px solid #C9A45C;border-radius:0 calc(var(--u)*.5) calc(var(--u)*.5) 0;display:flex;flex-direction:column;justify-content:space-evenly;align-items:center">' + '<i style="display:block;width:30%;height:5%;background:#f2ead8;border-radius:2px"></i>'.repeat(6) + '</div></div>';
    caja.appendChild(est);
    const abiertos = new Set();
    await new Promise(res => {
      B.$$('.cierre', est).forEach(b => b.addEventListener('click', e => { e.stopPropagation(); b.style.transform = 'translateY(calc(var(--u)*-.8)) rotate(-25deg)'; b.classList.remove('brilla'); abiertos.add(b.dataset.k); B.sint.metal(B.ahora(), .35); if (abiertos.size === 2) res(); }));
      ctl.alMorir.push(res);
    });
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
        fu.style.width = (8 + ab * 40) + '%'; acc.style.width = (44 + ab * 40) + '%';
        if (ab > .2 && !aire) { aire = true; B.sint.fuelle(B.ahora(), .8, .2); }
        if (ab >= .9) { x0 = null; res(); }
      });
      acc.addEventListener('pointerup', () => { x0 = null; });
      ctl.alMorir.push(res);
      B.inter.acordeon.abre = () => { fu.style.width = '48%'; acc.style.width = '84%'; res(); };
    });
    if (ctl.muerto) return;
    [55, 59, 62, 67].forEach((m, k) => B.inst.toca('acordeon', m, { t: B.ahora() + .05 + k * .02, dur: 1.6, vel: .9 }));
    enun.querySelector('.i-enun').textContent = '¡Sol mayor! El acordeón está listo.';
    await B.espera(.8, ctl); if (ctl.muerto) return;
    if (!await U.dice(op, 'abierto', ctl)) return;
    await B.espera(.6, ctl);
  };
  B.inter.acordeon.claves = ['abierto'];
})(window.BLUES);
