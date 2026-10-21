/* BLUES · fonografo (P4.4): dar cuerda a la manivela (arrastrar en círculos) → suena el cilindro:
   la voz de John + su guitarra, con filtro de cilindro (paso banda 300–3000 Hz, ruido y chasquidos). */
'use strict';
(function (B) {
  const U = B.iu;
  const VOZ = 'voz/d4/john_cilindro.mp3';
  const LINEA = { quien: 'JOHN', texto: 'Meu neno Xan… si estás oyendo esto, es que has venido. Este blues es tuyo.' };   // (solo si faltan las líneas del guion; John habla castellano)
  /* (Iago, 21-oct 19:31) «hay que recrear el sonido del fonógrafo»: la guitarra de John entra al cilindro un poco saturada
     (las voces de John ya vienen con menos graves y algo de distorsión en sus mp3; el chisporroteo es sfx/d4/cilindro.mp3) */
  const sucio = dest => {
    const C = B.ac(), pre = C.createGain(), sh = C.createWaveShaper(), post = C.createGain(), n = 1024, cur = new Float32Array(n);
    for (let i = 0; i < n; i++) { const x = i * 2 / n - 1; cur[i] = Math.tanh(2.6 * x) / Math.tanh(2.6); }
    sh.curve = cur; pre.gain.value = 2.2; post.gain.value = .5; pre.connect(sh); sh.connect(post); post.connect(dest);
    return pre;
  };
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
    /* (C4, 20-oct; Iago: «interacciones con texturas pintadas») si el plano trae la lámina del fonógrafo (op.textura), se pinta
       en el marco y la manivela dorada queda a la derecha; sin lámina, el dibujo de antes */
    const tex = op.textura && (B.img[op.textura] || B.img[B.motor.resImg(op.textura)]);
    if (tex) {
      const sv = f.querySelector('svg');
      B.$$('rect, path', sv).forEach(x => x.remove());
      sv.insertAdjacentHTML('afterbegin', '<defs><clipPath id="fm-clip"><rect x="0" y="8" width="236" height="244" rx="10"/></clipPath></defs>' +
        '<image href="' + tex + '" x="-60" y="8" width="356" height="244" preserveAspectRatio="xMidYMid slice" clip-path="url(#fm-clip)"/>' +
        '<rect x="0" y="8" width="236" height="244" rx="10" fill="none" stroke="#C9A45C" stroke-width="2"/>' +
        '<g class="manivela-eje"><rect x="236" y="182" width="54" height="16" rx="4" fill="#5a3a1c" stroke="#C9A45C"/></g>');
      f.style.width = 'calc(var(--u)*50)'; f.style.height = 'calc(var(--u)*38)';
      const ci = sv.querySelector('circle[stroke-dasharray]'); if (ci) { ci.setAttribute('opacity', '.85'); ci.setAttribute('stroke-width', '2'); }
      const g = sv.querySelector('.manivela'); g.innerHTML = '<circle cx="290" cy="190" r="10" fill="#C9A45C"/><rect x="286" y="146" width="8" height="44" rx="3" fill="#C9A45C"/><circle cx="290" cy="146" r="12" fill="#E9CD8A" stroke="#8a6a3a"/>';
    }
    const man = f.querySelector('.manivela'), barra = f.querySelector('.cuerda i');
    /* sonido de la manivela de verdad (Splice, sfx/d4/manivela.mp3): suena mientras se gira y se apaga al parar */
    const SFX = op.sfxManivela || 'sfx/d4/manivela.mp3';
    let girando = null, tPara = 0;
    const suenaGiro = () => {
      if (!B.buf[SFX]) { if (Math.random() < .2) B.sint.tabla(B.ahora(), 'raspa', .15); return; }
      if (!girando) { girando = B.suena(SFX, { vol: .85, bucle: true, fade: .05 }); ctl.alMorir.push(() => { if (girando) { girando.parar(.1); girando = null; } }); }
      clearTimeout(tPara); tPara = setTimeout(() => { if (girando) { girando.parar(.15); girando = null; } }, 180);
    };
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
        suenaGiro();
        if (total >= VUELTAS * 2 * Math.PI) { ang0 = null; clearTimeout(tPara); if (girando) { girando.parar(.3); girando = null; } res(); }
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
      { const ci = f.querySelector('.cil'); if (ci) ci.classList.add('brilla'); }
      const t0 = B.ahora() + .6, p = .62, gtr = sucio(cil.entrada);
      B.TEMA.slice(0, 4).forEach((cp, i) => cp.forEach(e => { if (e.n) B.inst.toca('guitarra', e.n.midi - 12, { t: t0 + (i * 4 + Math.floor(e.t) + (e.t % 1 ? .67 : 0)) * p, dur: e.dur * p, vel: .45, dest: gtr }); }));
      /* (Iago, 20-oct) el chisporroteo del cilindro se calla cuando se acaba la voz de John: en cuanto el motor va a decir
         la primera frase SIN cilindro (Eli: «Ahí se acaba…»), se para el cilindro. Se envuelve B.motor.di solo mientras dura este plano. */
      const di = B.motor.di; let hubo = false;
      const suelta = () => { if (B.motor.di === envuelto) B.motor.di = di; };
      const plano = op.plano, enPlano = () => { try { const d = B.motor.dia(); const q = d && d.planos[B.motor.indice()]; return !!(q && plano && q.id === plano.id); } catch (e) { return false; } };
      const envuelto = function (l) {
        if (!enPlano()) { suelta(); return di.apply(this, arguments); }   // ya en otro plano: fuera el envoltorio
        if (l && l.cilindro) hubo = true;
        else if (l && hubo) { suelta(); if (B.motor.paraCilindro) B.motor.paraCilindro(); }
        return di.apply(this, arguments);
      };
      B.motor.di = envuelto;   // (no con ctl.alMorir: el control de la interacción muere antes de las frases de John)
      await B.espera(1.4, ctl);
      return;
    }
    const cil = B.sint.cilindro(); ctl.alMorir.push(() => cil.parar());
    { const ci = f.querySelector('.cil'); if (ci) ci.classList.add('brilla'); }
    /* la guitarra de John (provisional: los primeros compases del tema) */
    const t0 = B.ahora() + 1.2, p = .62, gtr = sucio(cil.entrada);
    B.TEMA.slice(0, 2).forEach((cp, i) => cp.forEach(e => { if (e.n) B.inst.toca('guitarra', e.n.midi - 12, { t: t0 + 3 + (i * 4 + Math.floor(e.t) + (e.t % 1 ? .67 : 0)) * p, dur: e.dur * p, vel: .8, dest: gtr }); }));
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
