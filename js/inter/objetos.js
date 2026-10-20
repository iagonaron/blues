/* BLUES · objetos (P4.3): clic en cada objeto de la casa de John → sus líneas (Eli, Xan…) del guion;
   cuando se han visto todos, la línea «fin» y «Seguir».
   Los objetos salen de las reacciones del guion (op.lineas: foto1, acordeon, fonografo, radio, cartas,
   apellido, foto2… y «fin»). Posición y etiqueta: tabla OBJ (en % del plano) o opciones.objetos
   ([{ k, t, x, y }]): AJUSTARLAS cuando esté la lámina de la casa. Sin guion, usa los de OBJ con su línea. */
'use strict';
(function (B) {
  const U = B.iu;
  const OBJ = {
    foto1:     { t: 'La foto de la Torre',    x: 22, y: 28, l: { quien: 'ELI', texto: 'John y tu abuela, junto a la Torre de Hércules.', voz: 'voz/d4/eli_fotos.mp3' } },
    foto3:     { t: 'La foto del muelle',     x: 38, y: 24 },
    acordeon:  { t: 'El acordeón pequeño',    x: 70, y: 56, l: { quien: 'ELI', texto: 'Mira lo que lleva grabado: «Para cando volvas».', voz: 'voz/d4/eli_acordeon.mp3' } },
    fonografo: { t: 'El fonógrafo',           x: 46, y: 64 },
    radio:     { t: 'La radio y el periódico', x: 84, y: 34 },
    cartas:    { t: 'El cajón de las cartas', x: 30, y: 74 },
    apellido:  { t: 'El marco',               x: 60, y: 22 },
    foto2:     { t: 'La foto del porche',     x: 12, y: 46 },
    papeles:   { t: 'Papeles de música',      x: 32, y: 70, l: { quien: 'ELI', texto: 'Escribía en cifrado: letras encima, como en el club.', voz: 'voz/d4/eli_papeles.mp3' } }
  };
  const SIN_GUION = ['foto1', 'acordeon', 'papeles'];
  B.inter.objetos = async function (caja, op) {
    const ctl = op.ctl;
    const claves = op.lineas ? Object.keys(op.lineas).filter(k => k !== 'fin') : SIN_GUION;
    const lista = op.objetos || claves.map((k, i) => Object.assign({ k, t: k, x: 12 + (i * 13) % 76, y: 30 + (i % 3) * 18 }, OBJ[k] || {}, { k }));
    const enun = U.panel(caja, { left: '50%', top: '4%', transform: 'translateX(-50%)', textAlign: 'center' });
    enun.innerHTML = '<div class="i-tit">La casa de John</div><div class="i-enun">Mira las cosas de la casa: haz clic en cada una.</div><div class="i-marcas" style="justify-content:center;margin-top:calc(var(--u)*.6)">' + lista.map(() => '<i></i>').join('') + '</div>';
    const mk = B.$$('.i-marcas i', enun), vistos = new Set();
    let resolver; const todo = new Promise(r => resolver = r); ctl.alMorir.push(() => resolver());
    let ocupado = false;
    lista.forEach((o, i) => {
      const b = B.el('button', 'chapa brilla', '◆ ' + B.esc(o.t));
      b.style.cssText += ';position:absolute;left:' + o.x + '%;top:' + o.y + '%;transform:translate(-50%,-50%);cursor:pointer;font-size:calc(var(--u)*.85)';
      b.dataset.k = o.k;
      b.addEventListener('click', async e => {
        e.stopPropagation(); if (ocupado) return;
        ocupado = true; b.classList.remove('brilla'); b.classList.add('habla'); b.style.setProperty('--c', '#C9A45C');
        B.$$('button.chapa', caja).forEach(x => { if (x !== b) x.style.opacity = .45; });
        if (U.hay(op, o.k)) await U.dice(op, o.k, ctl);
        else if (o.l) await U.di(o.l, ctl);
        if (o.hecho) B.motor.abreHecho(o.hecho);
        B.$$('button.chapa', caja).forEach(x => { x.style.opacity = ''; });
        ocupado = false;
        vistos.add(o.k); mk[i].classList.add('ok');
        if (vistos.size === lista.length) resolver();
      });
      caja.appendChild(b);
    });
    await todo; if (ctl.muerto) return;
    if (!await U.dice(op, 'fin', ctl)) return;
    await U.seguir(caja, ctl, 'Seguir');
  };
  B.inter.objetos.OBJ = OBJ;
  B.inter.objetos.voces = Object.keys(OBJ).filter(k => OBJ[k].l).map(k => OBJ[k].l);
  B.inter.objetos.claves = '*';      // cualquier clave = un objeto (más «fin»)
})(window.BLUES);
