/* BLUES · fonografo (P4.4): dar cuerda a la manivela (arrastrar en círculos) → suena el cilindro:
   la voz de John + su guitarra, con filtro de cilindro (paso banda 300–3000 Hz, ruido y chasquidos). */
'use strict';
(function (B) {
  const U = B.iu;
  const VOZ = 'voz/d4/john_cilindro.mp3';
  const LINEA = { quien: 'JOHN', texto: 'Meu neno Xan… si estás oyendo esto, es que has venido. Este blues es tuyo.' };   // (solo si faltan las líneas del guion; John habla castellano)
  B.inter.fonografo = async function (caja, op) {
    const ctl = op.ctl;
    U.fondo(caja);
    const enun = U.panel(caja, { left: '50%', top: '5%', transform: 'translateX(-50%)', textAlign: 'center' });
    enun.innerHTML = '<div class="i-tit">El fonógrafo de John</div><div class="i-enun">Dale cuerda: gira la manivela en círculos.</div>';
    const f = B.el('div', ''); f.style.cssText = 'position:absolute;left:50%;top:56%;width:calc(var(--u)*34);height:calc(var(--u)*26);transform:translate(-50%,-50%);touch-action:none';
    f.innerHTML = '<svg viewBox="0 0 340 260" style="width:100%;height:100%"><defs><linearGradient id="fm" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#6b4424"/><stop offset="1" stop-color="#3a220f"/></linearGradient></defs>' +
      '<rect x="40" y="150" width="220" height="80" rx="8" fill="url(#fm)" stroke="#C9A45C"/><rect x="70" y="128" width="150" height="26" rx="13" fill="#2a2420" stroke="#C9A45C"/>' +
      '<rect class="cil" x="84" y="132" width="122" height="18" rx="9" fill="#8a6a3a"/><path d="M200 130 C230 90 250 50 300 20 L320 60 C280 70 250 100 214 136Z" fill="#C9A45C" opacity=".9"/>' +
      '<g class="manivela" style="transform-origin:290px 190px"><circle cx="290" cy="190" r="8" fill="#C9A45C"/><rect x="287" y="150" width="6" height="40" fill="#C9A45C"/><circle cx="290" cy="150" r="9" fill="#E9CD8A"/></g>' +
      '<circle cx="290" cy="190" r="48" fill="none" stroke="#E9CD8A" stroke-dasharray="4 6" opacity=".5"/></svg>' +
      '<div class="cuerda" style="position:absolute;left:12%;right:12%;bottom:-8%;height:calc(var(--u)*.5);border:1px solid var(--oro-a);border-radius:2px"><i style="display:block;height:100%;width:0;background:var(--oro)"></i></div>';
    caja.appendChild(f);
    const man = f.querySelector('.manivela'), barra = f.querySelector('.cuerda i');
    const VUELTAS = 3;
    let total = 0;
    await new Promise(res => {
      let ang0 = null;
      const centro = () => { const r = f.getBoundingClientRect(); return { x: r.left + r.width * (290 / 340), y: r.top + r.height * (190 / 260) }; };
      const angulo = e => { const c = centro(); return Math.atan2(e.clientY - c.y, e.clientX - c.x); };
      f.addEventListener('pointerdown', e => { e.preventDefault(); e.stopPropagation(); ang0 = angulo(e); try { f.setPointerCapture(e.pointerId); } catch (er) { } });
      f.addEventListener('pointermove', e => {
        if (ang0 == null) return;
        const a = angulo(e); let d = a - ang0; if (d > Math.PI) d -= 2 * Math.PI; if (d < -Math.PI) d += 2 * Math.PI; ang0 = a;
        total += Math.abs(d);
        man.style.transform = 'rotate(' + (total * 180 / Math.PI) + 'deg)';
        barra.style.width = Math.min(100, total / (VUELTAS * 2 * Math.PI) * 100) + '%';
        if (Math.random() < .2) B.sint.tabla(B.ahora(), 'raspa', .15);
        if (total >= VUELTAS * 2 * Math.PI) { ang0 = null; res(); }
      });
      f.addEventListener('pointerup', () => { ang0 = null; });
      ctl.alMorir.push(res);
      B.inter.fonografo.cuerda = () => { total = VUELTAS * 2 * Math.PI; barra.style.width = '100%'; res(); };
    });
    if (ctl.muerto) return;
    enun.querySelector('.i-enun').textContent = 'Suena el cilindro…';
    const conGuion = B.arr(op.plano && op.plano.despues).some(l => l.cilindro);
    if (conGuion) {
      /* el guion trae las líneas de John (despues, "cilindro": true): suenan por el mismo cilindro, con su guitarra debajo */
      const cil = B.motor.cilindro();
      f.querySelector('.cil').classList.add('brilla');
      const t0 = B.ahora() + .6, p = .62;
      B.TEMA.slice(0, 4).forEach((cp, i) => cp.forEach(e => { if (e.n) B.inst.toca('guitarra', e.n.midi - 12, { t: t0 + (i * 4 + Math.floor(e.t) + (e.t % 1 ? .67 : 0)) * p, dur: e.dur * p, vel: .45, dest: cil.entrada }); }));
      await B.espera(1.4, ctl);
      return;
    }
    const cil = B.sint.cilindro(); ctl.alMorir.push(() => cil.parar());
    f.querySelector('.cil').classList.add('brilla');
    /* la guitarra de John (provisional: los primeros compases del tema) */
    const t0 = B.ahora() + 1.2, p = .62;
    B.TEMA.slice(0, 2).forEach((cp, i) => cp.forEach(e => { if (e.n) B.inst.toca('guitarra', e.n.midi - 12, { t: t0 + 3 + (i * 4 + Math.floor(e.t) + (e.t % 1 ? .67 : 0)) * p, dur: e.dur * p, vel: .8, dest: cil.entrada }); }));
    if (B.buf[VOZ]) B.suena(VOZ, { bus: cil.entrada, t: t0 });
    await B.espera(1.2, ctl);
    await U.di(Object.assign({ voz: null }, LINEA), ctl);
    await B.espera(3.5, ctl);
    cil.parar();
    await U.seguir(caja, ctl, 'Seguir');
  };
  B.inter.fonografo.voces = [VOZ];
  B.inter.fonografo.claves = [];
})(window.BLUES);
