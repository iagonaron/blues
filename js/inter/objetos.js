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
    /* (Iago, 21-oct 19:29) sin velo oscuro en esta interacción: la casa y los primeros planos de los objetos, con su luz */
    const velo = document.getElementById('velo'), veloAntes = velo ? velo.style.background : '';
    const quitaVelo = () => { if (velo) velo.style.background = veloAntes; };
    if (velo) velo.style.background = 'transparent'; ctl.alMorir.push(quitaVelo);
    const calla = () => { const st = document.getElementById('subt'); if (st) st.classList.remove('on'); };   // la frase (abajo) se va al volver a la casa
    const claves = op.lineas ? Object.keys(op.lineas).filter(k => k !== 'fin') : SIN_GUION;
    const lista = op.objetos || claves.map((k, i) => Object.assign({ k, t: k, x: 12 + (i * 13) % 76, y: 30 + (i % 3) * 18 }, OBJ[k] || {}, { k }));
    const enun = U.panel(caja, { left: '3%', bottom: 'calc(var(--u)*10.8)', textAlign: 'left', maxWidth: '40%' });   // (C4) abajo a la izquierda, sobre la tira: ni caras ni fotos de la pared
    enun.innerHTML = '<div class="i-tit">La casa de John</div><div class="i-enun">Mira las cosas de la casa: pulsa cada una.</div><div class="i-marcas" style="justify-content:flex-start;margin-top:calc(var(--u)*.6)">' + lista.map(() => '<i></i>').join('') + '</div>';
    const mk = B.$$('.i-marcas i', enun), vistos = new Set();
    let resolver; const todo = new Promise(r => resolver = r); ctl.alMorir.push(() => resolver());
    let ocupado = false;
    /* (C4, 21-oct; Iago 20-oct 22:48 en el acto 1: «nada de iconos encima de la escena») cada objeto se resalta por su BORDE en la
       propia lámina (o.x, o.y = centro; o.w, o.h = tamaño, en % del plano) y los nombres van en una tira abajo; vale tocar cualquiera de
       los dos. Sin animaciones que se repitan: el borde es fijo y, ya visto, se apaga. */
    const ORO = '#F0D696';
    const tira = B.el('div', 'obj-tira');
    tira.style.cssText = 'position:absolute;left:3%;bottom:calc(var(--u)*7.2);display:flex;gap:calc(var(--u)*.8);flex-wrap:wrap;justify-content:flex-start;max-width:56%;z-index:3';   // abajo a la izquierda: no tapa los objetos
    caja.appendChild(tira);
    const marca = (z, ch, visto) => {
      z.style.borderColor = visto ? 'rgba(240,214,150,.28)' : ORO;
      z.style.boxShadow = visto ? 'none' : '0 0 calc(var(--u)*1) rgba(240,214,150,.55), inset 0 0 calc(var(--u)*.8) rgba(240,214,150,.28)';
      ch.innerHTML = (visto ? '✓ ' : '') + B.esc(ch.dataset.t);
    };
    const tapa = vis => { [tira, enun].concat(B.$$('.obj-zona', caja)).forEach(x => { x.style.transition = 'opacity .4s'; x.style.opacity = vis ? '' : 0; x.style.pointerEvents = vis ? '' : 'none'; }); };
    lista.forEach((o, i) => {
      const z = B.el('button', 'obj-zona'); z.setAttribute('aria-label', o.t); z.dataset.k = o.k;
      z.style.cssText = 'position:absolute;left:' + o.x + '%;top:' + o.y + '%;width:' + (o.w || 9) + '%;height:' + (o.h || 12) + '%;transform:translate(-50%,-50%);' +
        'background:transparent;border:2px solid ' + ORO + ';border-radius:calc(var(--u)*.7);cursor:pointer;padding:0;z-index:2;touch-action:manipulation';
      const ch = B.el('button', 'chapa'); ch.dataset.t = o.t; ch.dataset.k = o.k;
      ch.style.cssText += ';cursor:pointer;font-size:calc(var(--u)*.9)';
      marca(z, ch, false);
      const toca = async e => {
        e.stopPropagation(); if (ocupado) return;
        ocupado = true;
        z.style.background = 'rgba(240,214,150,.16)';
        setTimeout(() => { if (ocupado) tapa(false); }, 450);   // durante el primer plano del objeto, nada encima
        /* (C4, 20-oct) cada objeto suena al tocarlo (o.sfx: Splice) */
        if (o.sfx && B.buf[o.sfx]) B.suena(o.sfx, { vol: o.vol == null ? .8 : o.vol });
        if (o.var && B.motor.ponVariante) B.motor.ponVariante(o.var);   // (Iago, 15:08) su primer plano en el mismo instante del clic
        if (U.hay(op, o.k)) await U.dice(op, o.k, ctl);
        else if (o.l) await U.di(o.l, ctl);
        if (B.motor.ponVariante) B.motor.ponVariante(null);   // vuelve la casa entera para elegir otro
        if (o.hecho) B.motor.abreHecho(o.hecho);
        z.style.background = 'transparent';
        vistos.add(o.k); mk[i].classList.add('ok'); marca(z, ch, true);
        calla(); tapa(true); ocupado = false;
        if (vistos.size === lista.length) resolver();
      };
      z.addEventListener('click', toca); ch.addEventListener('click', toca);
      caja.appendChild(z); tira.appendChild(ch);
    });
    await todo; if (ctl.muerto) return;
    tapa(false);   // vistos todos: fuera bordes, tira y enunciado antes de la última frase
    if (!await U.dice(op, 'fin', ctl)) return;
    await U.seguir(caja, ctl, 'Seguir');
    quitaVelo();
  };
  B.inter.objetos.subtAbajo = true;   // (Iago, 21-oct 19:29) el texto, abajo (ronda 6 del motor)
  B.inter.objetos.OBJ = OBJ;
  B.inter.objetos.voces = Object.keys(OBJ).filter(k => OBJ[k].l).map(k => OBJ[k].l);
  B.inter.objetos.claves = '*';      // cualquier clave = un objeto (más «fin»)
})(window.BLUES);
