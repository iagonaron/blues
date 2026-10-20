/* BLUES · lata (P1.2): la lata cerrada; clic → se abre; salen uno a uno los billetes, el
   billete de barco (a nombre de Xan Laurens), el pase y la nota. Clic en cada cosa o «Seguir». */
'use strict';
(function (B) {
  const U = B.iu;
  const COSAS = [
    { k: 'dinero', t: 'Billetes', h: '<div style="font-family:var(--f-deco);font-size:calc(var(--u)*2.6);color:#2f4a2a">$ 50</div><div style="font-family:var(--f-ui);font-size:calc(var(--u)*.8);letter-spacing:.3em">FIFTY DOLLARS · 1928</div>' , bg: '#cfe0c0' },
    { k: 'barco', t: 'Billete de barco', h: '<div style="font-family:var(--f-ui);font-size:calc(var(--u)*.75);letter-spacing:.3em">PASAJE DE TERCERA</div><div style="font-family:var(--f-deco);font-size:calc(var(--u)*1.9);margin:calc(var(--u)*.3) 0">Xan Laurens</div><div style="font-family:var(--f-carta);font-style:italic;font-size:calc(var(--u)*1.2)">A Coruña → La Habana → Nueva Orleans</div>', bg: '#efe2c4' },
    { k: 'pase', t: 'Un pase', h: '<div style="font-family:var(--f-ui);font-size:calc(var(--u)*.75);letter-spacing:.3em">PASE · ADMIT ONE</div><div style="font-family:var(--f-deco);font-size:calc(var(--u)*1.7);margin-top:calc(var(--u)*.3)">Nº 0712</div>', bg: '#e9c9b2' },
    { k: 'nota', t: 'La nota', h: '<div style="font-family:var(--f-carta);font-style:italic;font-weight:600;font-size:calc(var(--u)*1.75);line-height:1.25">«Ven. Te esperamos.<br>Brooklyn, Nueva York.»</div>', bg: '#f3ead6' }
  ];
  /* reacciones del guion (op.lineas): abrir */
  B.inter.lata = async function (caja, op) {
    const ctl = op.ctl;
    const fondo = U.fondo(caja);
    /* con la lámina de verdad (la lata ya abierta en la imagen), el fondo se desenfoca para no destripar la sorpresa */
    if (document.querySelector('#pelicula .plano.on .lam.maestra')) { fondo.style.background = 'rgba(8,6,4,.55)'; fondo.style.backdropFilter = fondo.style.webkitBackdropFilter = 'blur(calc(var(--u)*.9))'; }
    const enun = U.panel(caja, { left: '50%', top: '6%', transform: 'translateX(-50%)', textAlign: 'center', padding: 'calc(var(--u)*.8) calc(var(--u)*1.8)' });
    enun.innerHTML = '<div class="i-tit">La lata</div><div class="i-enun">Ábrela: haz clic en la tapa.</div>';
    const lata = B.el('div', 'brilla');
    lata.style.cssText = 'position:absolute;left:50%;top:52%;width:calc(var(--u)*30);height:calc(var(--u)*19);transform:translate(-50%,-50%);cursor:pointer';
    /* la lata vieja de galletas, como en la lámina: azul petróleo gastado, adornos dorados, sin letras */
    const flor = (x, y, r) => '<g transform="translate(' + x + ' ' + y + ')" fill="none" stroke="#C9A45C" stroke-width="1.3" opacity=".85"><circle r="' + r + '"/><path d="M0 -' + r * 1.9 + 'Q' + r * .7 + ' 0 0 ' + r * 1.9 + 'Q-' + r * .7 + ' 0 0 -' + r * 1.9 + 'M-' + r * 1.9 + ' 0Q0 ' + r * .7 + ' ' + r * 1.9 + ' 0Q0 -' + r * .7 + ' -' + r * 1.9 + ' 0"/></g>';
    lata.innerHTML = '<svg viewBox="0 0 300 190" style="width:100%;height:100%;overflow:visible"><defs><linearGradient id="lt" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#2f5566"/><stop offset="1" stop-color="#14262f"/></linearGradient>' +
      '<linearGradient id="lt2" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#3a6474"/><stop offset="1" stop-color="#1d3440"/></linearGradient></defs>' +
      '<rect x="20" y="60" width="260" height="120" rx="12" fill="url(#lt)" stroke="#C9A45C" stroke-width="2"/><rect x="32" y="72" width="236" height="96" rx="6" fill="none" stroke="#E9CD8A" stroke-width="1" opacity=".55"/>' +
      '<path d="M32 120h236" stroke="#C9A45C" stroke-width="1" stroke-dasharray="2 5" opacity=".6"/>' + flor(150, 120, 9) + flor(80, 120, 6) + flor(220, 120, 6) +
      '<path d="M40 82q20 10 40 0t40 0t40 0t40 0t40 0t40 0M40 158q20 -10 40 0t40 0t40 0t40 0t40 0t40 0" fill="none" stroke="#C9A45C" stroke-width="1" opacity=".5"/>' +
      '<path d="M30 100l6 6M264 100l6 6M30 150l6-6M264 150l6-6" stroke="#0b1418" stroke-width="3" opacity=".5"/>' +
      '<g class="tapa" style="transition:transform .9s cubic-bezier(.3,1.4,.5,1);transform-origin:40px 60px"><rect x="12" y="38" width="276" height="30" rx="9" fill="url(#lt2)" stroke="#C9A45C" stroke-width="2"/>' +
      '<path d="M40 53q12 -7 24 0t24 0t24 0t24 0t24 0t24 0t24 0t24 0t24 0" fill="none" stroke="#E9CD8A" stroke-width="1" opacity=".7"/>' + flor(150, 53, 5) + '</g></svg>';
    caja.appendChild(lata);
    await new Promise(res => { lata.addEventListener('click', e => { e.stopPropagation(); res(); }, { once: true }); ctl.alMorir.push(res); });
    if (ctl.muerto) return;
    lata.classList.remove('brilla');
    lata.querySelector('.tapa').style.transform = 'rotate(-38deg) translate(-30px,-40px)';
    B.sint.metal(B.ahora() + .05, .9);
    U.suelta(U.rota(op, 'abrir'), ctl, 4);
    enun.querySelector('.i-enun').textContent = '¿Qué hay dentro? Haz clic en cada cosa.';
    await B.espera(.7, ctl);
    lata.style.transition = 'top .8s ease, transform .8s ease'; lata.style.top = '78%'; lata.style.transform = 'translate(-50%,-50%) scale(.7)';
    const fila = B.el('div', ''); fila.style.cssText = 'position:absolute;left:6%;right:6%;top:24%;display:flex;justify-content:center;gap:calc(var(--u)*1.4)';
    caja.appendChild(fila);
    const vistos = new Set();
    let resolver; const todo = new Promise(r => resolver = r); ctl.alMorir.push(() => resolver());
    COSAS.forEach((c, i) => {
      B.espera(.4 + i * .55, ctl).then(ok => {
        if (!ok) return;
        const d = B.el('div', 'aparece', '<div style="font-family:var(--f-ui);font-weight:600;font-size:calc(var(--u)*.7);letter-spacing:.3em;color:#5b4630;margin-bottom:calc(var(--u)*.6)">' + c.t.toUpperCase() + '</div>' + c.h);
        d.dataset.k = c.k;
        d.style.cssText = 'width:calc(var(--u)*17);min-height:calc(var(--u)*13);padding:calc(var(--u)*1.2);text-align:center;color:#2a1e14;background:' + c.bg + ';border-radius:calc(var(--u)*.4);box-shadow:0 calc(var(--u)*.6) calc(var(--u)*1.6) rgba(0,0,0,.55);cursor:pointer;transform:rotate(' + ((i % 2 ? 1 : -1) * (1 + i * .6)) + 'deg);transition:transform .25s,box-shadow .25s;outline:2px solid transparent';
        d.addEventListener('click', e => { e.stopPropagation(); vistos.add(c.k); d.style.transform = 'rotate(0) scale(1.06)'; d.style.outline = '2px solid var(--oro)'; B.sint.fuelle(B.ahora(), .18, .08); if (vistos.size === COSAS.length) resolver(); });
        fila.appendChild(d);
        B.sint.fuelle(B.ahora(), .25, .06);
      });
    });
    await Promise.race([todo, U.seguir(caja, ctl, 'Seguir')]);
  };
  B.inter.lata.claves = ['abrir'];
})(window.BLUES);
