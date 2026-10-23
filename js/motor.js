/* ══════════════════════════════════════════════════════════════════════
   BLUES · motor de escenas
   Portada → precarga del día → planos (maestra + variantes «habla X»,
   Ken Burns continuo) → líneas con subtítulos y voz → interacciones →
   fin del día. Espacio/clic = seguir · P/Esc = pausa · ← → = plano
   anterior/siguiente · F = pantalla completa.
   ══════════════════════════════════════════════════════════════════════ */
'use strict';
(function (B) {
  const M = B.motor = {};
  const $ = B.$;
  let escena, pelicula, subt, hechosBox, interBox, cartaBox, controles, tarjeta;
  let dia = null, idx = -1, ctl = null, planoEl = null, planoAct = null;
  let saltable = null;                // función que adelanta lo que esté sonando
  let cilindroAct = null;             // filtro de cilindro compartido (líneas con "cilindro": true)
  let kb = { t0: 0, de: [1, .5, .5], a: [1.06, .5, .5], dur: 30 };
  let foco = { s: 0, x: .5, y: .5, obj: null }, focoObj = { s: 0, x: .5, y: .5 };
  /* (20-oct-2026, Iago: portales por hitos, como La cabaña y el museo) LOS ACTOS SE ABREN EN CLASE. El portal de gp.lmathome.es
     (la medalla u5 y los avisos «Blues · Acto N» de la campana) abre esta página con «#cu=<cuenta>&dias=1.2» (y «&dia=2» desde
     el aviso de ese acto): aquí se quita de la dirección, se guarda en este navegador y la portada solo deja entrar en esos
     actos; los demás, apagados y con candado («se abre en clase»). Lo deciden Supabase (suite_hitos_de) y lo que Iago marca en
     el Diario. El profe (#c=, Protester): todo abierto y puede saltarse los viajes del mapa. Sin cuenta guardada (el ordenador de
     clase, quien llega por la dirección sin más): todo abierto, como hasta hoy. Quitarlo: que HIT devuelva siempre «todo abierto». */
  const BONUS = 5;   // (22-oct) el acto que queda tras la historia principal (actos 1–4); (23-oct, Iago) es la «PRACTICA» y se abre con el 4
  const HIT = (function () {
    const K = 'lm_blues_hitos', UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    let st = null, ir = 0, prof = false;
    try { st = JSON.parse(localStorage.getItem(K) || 'null'); } catch (e) { }
    try { prof = sessionStorage.getItem('lm_blues_prof') === '1'; } catch (e) { }
    try {
      const ps = (location.hash || '').replace(/^#/, '').split('&'), q = {};
      ps.forEach(x => { const i = x.indexOf('='); if (i > 0) { try { q[x.slice(0, i)] = decodeURIComponent(x.slice(i + 1)); } catch (e) { } } });
      /* el cargador de voluntarios (arriba del <head>) ya ha quitado «#c=» de la dirección y la ha guardado en lm_vol_cuenta */
      let volC = ''; try { volC = localStorage.getItem('lm_vol_cuenta') || ''; } catch (e) { }
      if ((q.c && UUID.test(q.c)) || (!q.cu && UUID.test(volC))) { st = null; prof = true; try { localStorage.removeItem(K); sessionStorage.setItem('lm_blues_prof', '1'); } catch (e) { } }
      else if (q.cu && UUID.test(q.cu)) {
        const d = String(q.dias || '').split(/[.,]/).map(Number).filter(n => n >= 1 && n <= 5);
        if (d.length) { st = { cuenta: q.cu.toLowerCase(), dias: d, en: new Date().toISOString() }; try { localStorage.setItem(K, JSON.stringify(st)); } catch (e) { } }
      }
      if (/^[1-5]$/.test(q.dia || '')) ir = +q.dia;
      if ('cu' in q || 'dias' in q || 'dia' in q) {
        const resto = ps.filter(x => x && !/^(cu|dias|dia)=/.test(x)).join('&');
        history.replaceState(history.state, '', location.pathname + location.search + (resto ? '#' + resto : ''));
      }
    } catch (e) { }
    /* (22-oct, Iago: «no quiero que avancen en casa más rápido que lo que hacemos en clase») sin cuenta del portal y sin ser el
       profe, ya NO está todo abierto: solo el acto 1 (antes, quien abría la dirección a pelo lo tenía todo). El profe sigue con
       todo abierto: entra por Protester (#c=) y ese navegador lo recuerda (lm_vol_cuenta). Deshacer: volver a «: null». */
    const ab = prof ? null : (st && Array.isArray(st.dias) && st.dias.length) ? st.dias.map(Number) : [1];   // null = todo abierto
    /* (21-oct, Iago, vía C4) el acto 5 es el «Bonus»: se abre solo en cuanto este navegador ha acabado el acto 4 (fin de la historia principal) */
    const bonus = n => { try { return +n === BONUS && !!B.progreso.leer().dias[BONUS - 1]; } catch (e) { return false; } };
    /* (22-oct 22:56 y 23-oct, Iago, vía C5) el acto 5 (PRACTICA) se abre A LA VEZ QUE EL 4: en cuanto el 4 se ha visto en clase */
    const conCuatro = n => +n === BONUS && !!ab && ab.indexOf(BONUS - 1) >= 0;
    return { activo: () => !!ab, abierto: n => !ab || ab.indexOf(+n) >= 0 || conCuatro(n) || bonus(n), ir: () => { const n = ir; ir = 0; return n; }, prof };
  })();
  B.hitos = HIT; B.prof = HIT.prof;
  const CANDADO = '<svg class="bi-candado-ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/></svg>';
  const capturas = [];
  B.captura = { poner(fn) { capturas.push(fn); return () => { const i = capturas.indexOf(fn); if (i >= 0) capturas.splice(i, 1); }; } };

  /* paletas de las imágenes provisionales (por día y por ambiente) */
  const PAL = {
    atlantico: ['#4A6B86', '#B9874E', '#16212C'], lampara: ['#9A6232', '#3B4C63', '#1B1410'],
    fuego: ['#D9692A', '#5A1E0E', '#120806'], muelle: ['#6F8394', '#3D4E5C', '#151C22'],
    noche_mar: ['#2C4A6E', '#C9A45C', '#070B12'], ocre: ['#B58A4A', '#6E4A26', '#1E140B'],
    caoba: ['#7A3A22', '#C9A45C', '#1A0D08'], neon: ['#A8343A', '#C9A45C', '#0D0A12'],
    club: ['#8C1E26', '#D8B25E', '#120708'], cocina: ['#4F5B3A', '#2A2A1E', '#0E0E09'],
    otono: ['#C98A3A', '#7A4A20', '#20140A'], sepia: ['#A88457', '#5B4026', '#1A120A'],
    farol: ['#D6A04A', '#3A2E5A', '#0B0A14'], madrugada: ['#36506E', '#1E2A3A', '#07090E']
  };
  const PAL_DIA = { 1: 'atlantico', 2: 'ocre', 3: 'neon', 4: 'otono', 5: 'farol' };
  const ESQ = '<svg viewBox="0 0 50 50" fill="none" stroke="#E9CD8A" stroke-width="1"><path d="M2 48V2h46"/><path d="M7 48V7h41"/><path d="M2 2l12 12"/><circle cx="17" cy="17" r="2.2"/><path d="M12 7c0 3 2 5 5 5M7 12c3 0 5 2 5 5"/></svg>';

  /* ══════════ arranque ══════════ */
  M.iniciar = function () {
    escena = $('#escena'); pelicula = $('#pelicula'); subt = $('#subt'); hechosBox = $('#hechos');
    interBox = $('#inter'); cartaBox = $('#carta'); controles = $('#controles'); tarjeta = $('#tarjeta');
    const mide = () => { const w = escena.getBoundingClientRect().width || 1200; document.documentElement.style.setProperty('--u', (w / 100) + 'px'); };
    mide(); addEventListener('resize', mide);
    if (window.ResizeObserver) new ResizeObserver(mide).observe(escena);
    /* (19-oct, punto 26) Si el visor recorta la ventana (el panel del Artifact más estrecho o más bajo que su iframe), la escena se
       encaja en el trozo que SE VE: un testigo de pantalla completa + IntersectionObserver dicen qué parte es visible. En el sitio
       publicado (sin marco alrededor) no hace nada. */
    if (window.IntersectionObserver && window.top !== window) {
      const t = document.createElement('div'), marco = $('#marco'), um = [];
      t.style.cssText = 'position:fixed;left:0;top:0;width:100vw;height:100vh;opacity:0;pointer-events:none;z-index:-1';
      document.body.appendChild(t); for (let i = 0; i <= 100; i++) um.push(i / 100);
      new IntersectionObserver(es => {
        const r = es[es.length - 1].intersectionRect, W = innerWidth, H = innerHeight;
        const recorta = r.width > 200 && r.height > 150 && (r.width < W * .97 || r.height < H * .97);
        marco.style.cssText = recorta ? `left:${r.left}px;top:${r.top}px;width:${r.width}px;height:${r.height}px;right:auto;bottom:auto` : '';
        escena.style.width = recorta ? `${Math.min(r.width, r.height * 16 / 9)}px` : '';
      }, { threshold: um }).observe(t);
    }
    construyeControles();
    teclas();
    /* el ratón enseña los controles; se esconden solos */
    let tOculta = null;
    const ensena = () => { controles.classList.add('ver'); escena.classList.remove('sin-cursor'); clearTimeout(tOculta); tOculta = setTimeout(() => { if (!controles.matches(':hover')) { controles.classList.remove('ver'); if (dia) escena.classList.add('sin-cursor'); } }, 2600); };
    escena.addEventListener('pointermove', ensena);
    escena.addEventListener('pointerdown', ensena);
    /* clic en la escena (fuera de botones e interacciones) = seguir */
    escena.addEventListener('click', e => {
      if (!dia || B.pausado) return;
      if (e.target.closest('button,a,#inter,#controles,#hechos,#tarjeta,#findia,input,.no-seguir')) return;
      M.seguir();
    });
    $('#pausa').addEventListener('click', () => B.pausa(false));
    tarjeta.addEventListener('click', e => { if (e.target === tarjeta) cierraTarjeta(); });
    /* el escenario nunca se desplaza (un foco o un «scrollIntoView» podían moverlo dentro de overflow:hidden) */
    const quieto = el => { if (el && (el.scrollTop || el.scrollLeft)) { el.scrollTop = 0; el.scrollLeft = 0; } };
    document.addEventListener('scroll', e => { const t = e.target; if (t === escena || t === interBox || (t && t.id === 'marco') || (t && t.classList && (t.classList.contains('icaja') || t.classList.contains('plano')))) quieto(t); }, true);
    B.alFotograma(() => { quieto(escena); quieto(interBox); });
    /* (ronda 6, Iago en el aula: «no me aparece el botón de pantalla completa») el botón va SIEMPRE a la vista, abajo a la
       derecha (también en la portada y en la precarga); ya no está dentro de la barra que se esconde */
    const bp = B.el('button', 'bt ico peq bt-pant', ICO.pant);
    bp.dataset.tip = 'Pantalla completa (F)'; bp.setAttribute('aria-label', 'Pantalla completa');
    bp.addEventListener('click', e => { e.stopPropagation(); M.pantallaCompleta(); });
    escena.appendChild(bp);
    /* (ronda 6, Iago: en la pizarra, mantener pulsado saca el menú de copiar/cortar) nada de menú contextual ni selección en el portal */
    escena.addEventListener('contextmenu', e => { if (!(e.target && /^(input|textarea|select)$/i.test(e.target.tagName))) e.preventDefault(); });
    escena.addEventListener('selectstart', e => { if (!(e.target && /^(input|textarea)$/i.test(e.target.tagName))) e.preventDefault(); });
    escena.classList.remove('arrancando');
    preparaPortada().then(puerta).then(() => M.portada());
  };
  /* (21-oct, Iago: «un vídeo de barco para la portada… mi pantalla del aula es limitada: que cargue ANTES de entrar en la
     portada… y el sonido coherente: mar, gaviotas, barco») el vídeo (de C2, Runway: Coruña → Nueva York → Coruña, día y noche, en
     bucle) se baja entero con una barra de carga y se sirve desde la memoria; mientras, nada. Sirve también de fondo de la carta
     del acto 1 (P1.0, «video» en data/dia1.js), que sigue en el mismo punto del bucle. */
  /* WebM (VP9, 3,9 MB) donde se pueda, que carga en la mitad de tiempo; si no, el MP4 (H.264, 8,2 MB) */
  const vpx = (() => { try { const v = document.createElement('video'); return !!(v.canPlayType && v.canPlayType('video/webm; codecs="vp9"')); } catch (e) { return false; } })();
  const PORT = { get video() { return (vpx && B.existe('img/portada/fondo_bucle.webm')) ? 'img/portada/fondo_bucle.webm' : 'img/portada/fondo_bucle.mp4'; }, poster: 'img/portada/fondo_poster.webp',
    amb: [{ src: 'sfx/d1/mar_gaviotas.mp3', vol: .42 }, { src: 'sfx/d1/gaviotas_coruna.mp3', vol: .3 }, { src: 'sfx/d1/motor_lejos.mp3', vol: .32 }], sirena: 'sfx/d1/sirena_vapor.mp3' };
  M.PORT = PORT;
  async function preparaPortada() {
    /* (22-oct) con el mar, las gaviotas y el barco: así la portada suena desde el primer segundo */
    const rutas = [PORT.poster, PORT.video].concat(PORT.amb.map(a => a.src), PORT.sirena).filter(r => B.existe(r) && !B.vid[r] && !B.img[r] && !B.buf[r]);
    if (!rutas.length) return;
    escena.classList.add('precargando');
    const pc = $('#precarga');
    pc.innerHTML = '<div class="pc-caja"><div class="pc-dia">A CORUÑA · NUEVA YORK · 1928</div><div class="pc-tit">Blues</div>' +
      '<div class="pc-barra"><i></i></div><div class="pc-mb">Preparando…</div><div class="pc-det"></div></div>';
    await B.precarga(rutas, pr => {
      const pct = pr.total ? pr.bytes / pr.total : 1;
      $('.pc-barra i', pc).style.width = Math.round(pct * 100) + '%';
      $('.pc-mb', pc).textContent = pr.total ? B.fmtMB(pr.bytes) + ' de ' + B.fmtMB(pr.total) : '';
    });
    escena.classList.remove('precargando');
  }
  /* (22-oct, Iago: «me faltan sonidos ambiente en la portada: barco, gaviotas, mar») el navegador no deja sonar nada hasta el
     primer toque, y si ese toque era ya en un billete la portada no llegaba a sonar nunca. Ahora, la primera vez, la pantalla
     de carga acaba en un botón «Entrar»: ese toque abre el sonido y la portada entra ya con el mar. Si el sonido ya estaba
     abierto (volver de un acto), no sale. Quitarlo: que puerta() devuelva Promise.resolve(). */
  const sonidoListo = () => { try { return B.hayAudio() && B.bus.master.context.state === 'running'; } catch (e) { return false; } };
  function puerta() {
    if (sonidoListo()) return Promise.resolve();
    return new Promise(res => {
      const pc = $('#precarga');
      pc.innerHTML = '<div class="pc-caja"><div class="pc-dia">A CORUÑA · NUEVA YORK · 1928</div><div class="pc-tit">Blues</div>' +
        '<button class="bt prim pc-entrar">' + ICO.play + ' Entrar</button><div class="pc-det">con sonido</div></div>';
      escena.classList.add('precargando');
      let hecho = false;
      const entra = () => {
        if (hecho) return; hecho = true; removeEventListener('keydown', tecla);
        B.ac(); try { B.bus.master.context.resume(); } catch (e) { }
        escena.classList.remove('precargando'); res();
      };
      const tecla = e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); entra(); } };
      $('.pc-entrar', pc).addEventListener('click', entra);
      addEventListener('keydown', tecla);
    });
  }
  /* el vídeo del barco en un contenedor (portada o plano), en el punto del bucle donde se quedó */
  M._tBarco = 0;
  function videoBarco(cls) {
    const url = B.vid[PORT.video]; if (!url) return null;
    const v = document.createElement('video');
    v.className = cls; v.muted = true; v.loop = true; v.playsInline = true; v.autoplay = true; v.setAttribute('playsinline', ''); v.setAttribute('aria-hidden', 'true');
    if (B.img[PORT.poster]) v.poster = B.img[PORT.poster];
    v.src = url;
    const t = M._tBarco || 0;
    v.addEventListener('loadedmetadata', () => { try { v.currentTime = t % (v.duration || 38); } catch (e) { } }, { once: true });
    v.addEventListener('timeupdate', () => { M._tBarco = v.currentTime; });
    const pl = v.play(); if (pl && pl.catch) pl.catch(() => { });
    return v;
  }
  M.videoBarco = videoBarco;
  B.alPausar.push(on => B.$$('video', escena).forEach(v => { try { if (on) v.pause(); else { const pl = v.play(); if (pl && pl.catch) pl.catch(() => { }); } } catch (e) { } }));

  /* ══════════ teclado del ordenador ══════════ */
  function teclas() {
    document.addEventListener('keydown', e => {
      if (e.target && /^(input|textarea|select)$/i.test(e.target.tagName)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (tarjeta.classList.contains('on')) { if (e.key === 'Escape' || e.key === 'p' || e.key === 'P' || e.key === ' ') { e.preventDefault(); cierraTarjeta(); } return; }
      if (!B.pausado) for (let i = capturas.length - 1; i >= 0; i--) { if (capturas[i](e) === true) { e.preventDefault(); return; } }
      const k = e.key;
      if (k === 'p' || k === 'P' || k === 'Escape') { if (dia) { e.preventDefault(); B.pausa(); } return; }
      if (B.pausado) { if (k === ' ') { e.preventDefault(); B.pausa(false); } return; }
      if (k === ' ' || k === 'Enter') { if (dia) { e.preventDefault(); M.seguir(); } }
      else if (k === 'ArrowRight') { if (dia) { e.preventDefault(); M.siguiente(); } }
      else if (k === 'ArrowLeft') { if (dia) { e.preventDefault(); M.anterior(); } }
      else if (k === 'f' || k === 'F') { e.preventDefault(); M.pantallaCompleta(); }
    });
  }
  M.pantallaCompleta = function () {
    try {
      const d = document;
      if (d.fullscreenElement || d.webkitFullscreenElement) (d.exitFullscreen || d.webkitExitFullscreen).call(d);
      else { const r = d.documentElement; (r.requestFullscreen || r.webkitRequestFullscreen).call(r); }
    } catch (e) { }
  };

  /* ══════════ controles ══════════ */
  const ICO = {
    casa: '<svg viewBox="0 0 24 24"><path d="M12 3 2 11h3v9h5v-6h4v6h5v-9h3z"/></svg>',
    ant: '<svg viewBox="0 0 24 24"><path d="M11 6v12L2 12zM21 6v12l-9-6z"/></svg>',
    sig: '<svg viewBox="0 0 24 24"><path d="M13 6v12l9-6zM3 6v12l9-6z"/></svg>',
    pausa: '<svg viewBox="0 0 24 24"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>',
    play: '<svg viewBox="0 0 24 24"><path d="M7 4v16l13-8z"/></svg>',
    pant: '<svg viewBox="0 0 24 24"><path d="M3 3h7v2H5v5H3zM14 3h7v7h-2V5h-5zM3 14h2v5h5v2H3zM19 14h2v7h-7v-2h5z"/></svg>'
  };
  M.ICO = ICO;
  function construyeControles() {
    controles.innerHTML =
      '<button class="bt ico peq" data-a="casa" data-tip="Portada">' + ICO.casa + '</button>' +
      '<span class="ct-dia"></span><span class="ct-sep"></span>' +
      '<button class="bt ico peq" data-a="ant" data-tip="Plano anterior (←)">' + ICO.ant + '</button>' +
      '<button class="bt ico peq" data-a="pausa" data-tip="Pausa (P)">' + ICO.pausa + '</button>' +
      '<button class="bt ico peq" data-a="sig" data-tip="Plano siguiente (→)">' + ICO.sig + '</button>' +
      '<span class="ct-puntos"></span>';   // (ronda 6) la pantalla completa va en su botón fijo (.bt-pant)
    controles.addEventListener('click', e => {
      const b = e.target.closest('[data-a]'); if (!b) return;
      const a = b.dataset.a;
      if (a === 'casa') { M.salir(); M.portada(); }
      else if (a === 'ant') M.anterior();
      else if (a === 'sig') M.siguiente();
      else if (a === 'pausa') B.pausa();
      else if (a === 'pant') M.pantallaCompleta();
    });
    B.alPausar.push(on => { const b = controles.querySelector('[data-a=pausa]'); b.innerHTML = on ? ICO.play : ICO.pausa; b.dataset.tip = on ? 'Seguir (P)' : 'Pausa (P)'; });
  }
  function pintaPuntos() {
    const caja = controles.querySelector('.ct-puntos'); caja.innerHTML = '';
    if (!dia) return;
    const pr = B.progreso.leer();
    dia.planos.forEach((p, i) => {
      const d = B.el('span', 'punto' + (i === idx ? ' act' : '') + (pr.planos[p.id] ? ' hecho' : '') + (p.inter ? ' inter' : ''));
      d.dataset.tip = p.id + (p.nombre ? ' · ' + p.nombre : '') + (p.inter ? ' · ' + B.arr(p.inter).map(x => x.tipo).join(' + ') : '');
      d.addEventListener('click', () => M.irA(i));
      caja.appendChild(d);
    });
    controles.querySelector('.ct-dia').innerHTML = '<b>ACTO ' + dia.n + '</b>' + B.esc(dia.titulo);
  }

  /* ══════════ PORTADA ══════════ */
  const EMBLEMA = {
    1: '<svg viewBox="0 0 60 50"><path d="M30 4v8M26 12h8l-1 30h-6zM24 42h12M27 20h6M27 28h6"/><path d="M8 46c6-3 10-3 16 0s10 3 16 0 10-3 16 0"/><path d="M38 16l14-4M38 20l14 2" opacity=".7"/></svg>',
    2: '<svg viewBox="0 0 60 50"><path d="M6 36h40l6-8V18H34v10H6z"/><path d="M10 18h14v10H10zM40 10h8v8"/><circle cx="14" cy="40" r="4"/><circle cx="28" cy="40" r="4"/><circle cx="42" cy="40" r="4"/><path d="M44 6c4-4 8-2 10-4" opacity=".7"/></svg>',
    3: '<svg viewBox="0 0 60 50"><path d="M8 26h22l8-8h6v18h-6l-8-8H8z"/><path d="M44 18c6 0 10 4 10 9s-4 9-10 9"/><path d="M14 26v-6M20 26v-6M26 26v-6"/></svg>',
    4: '<svg viewBox="0 0 60 50"><path d="M8 22 30 6l22 16"/><path d="M12 20v24h36V20"/><path d="M12 30h36M18 30v14M30 30v14M42 30v14"/><path d="M24 14h12v6H24z" opacity=".7"/></svg>',
    5: '<svg viewBox="0 0 60 50"><path d="M30 6v6"/><path d="M22 12h16l-2 12H24z"/><path d="M24 24h12"/><path d="M6 44c8-8 16-12 24-12s16 4 24 12"/><circle cx="12" cy="16" r="2"/><circle cx="48" cy="16" r="2"/><circle cx="30" cy="40" r="2"/></svg>'
  };
  const COLOR_DIA = { 1: '#3E5E7A', 2: '#9A6A2E', 3: '#8C1E26', 4: '#A0672A', 5: '#3A3466' };
  const TIT_DIA = { 1: 'La nana de Xan', 2: 'Músicos callejeros', 3: 'Glamour y decepción', 4: 'El blues de John', 5: 'El porche' };   // títulos de Iago (19-oct; el 4 desde el 20-oct; el 1 y el 5, ronda 4)
  M.portada = function () {
    dia = null; idx = -1;
    escena.classList.add('en-portada'); escena.classList.remove('precargando', 'sin-cursor');
    $('#findia').classList.remove('on');
    const pr = B.progreso.leer();
    const p = $('#portada');
    /* (19-oct, punto 54) el acto 5 ya visto entra DIRECTO en la sala de práctica (los alumnos lo usan para practicar en casa) */
    const d5 = B.DIAS[5], iPrac = d5 ? d5.planos.findIndex(q => B.arr(q.inter).some(x => x && x.tipo === 'practica')) : -1;
    const vio5 = iPrac > 0 && !!(pr.dias[5] || pr.planos[d5.planos[iPrac].id]);
    /* (ronda 4, Iago: «la portada la veo cutre… hace falta que pongas algo de fondo… no me gusta que los tickets tengan un
       icono, prefiero imágenes de ChatGPT bien hechas») fondo pintado (img/portada/fondo.webp) y una lámina por acto en cada billete */
    let h = '<div class="port-fondo"></div><div class="port-marco"></div>' +
      '<div class="port-cab"><div class="port-ano">A CORUÑA · NUEVA YORK · 1928</div>' +
      '<h1 class="port-tit">BLUES</h1>' +
      '<div class="port-sub">Unidad 5 · El blues y el cifrado americano</div>' +
      '<div class="port-fil"><i></i><b></b><i></i></div></div><div class="billetes">';
    for (let n = 1; n <= 5; n++) {
      const d = B.DIAS[n] || { titulo: TIT_DIA[n], lugar: '' };
      const sigue = pr.ultimo && pr.ultimo.dia === n && !pr.dias[n], cerrado = !HIT.abierto(n);
      h += '<button class="billete' + (pr.dias[n] ? ' hecho' : '') + (sigue && !cerrado ? ' sigue' : '') + (cerrado ? ' cerrado' : '') + '" data-dia="' + n + '" style="--bc:' + COLOR_DIA[n] + '"' + (cerrado ? ' aria-disabled="true"' : '') + '>' +
        '<div class="bi-papel">' + (B.existe('img/portada/billete_' + n + '.webp') ? '<div class="bi-banda bi-foto" style="background-image:url(img/portada/billete_' + n + '.webp)"></div>' : '<div class="bi-banda">' + EMBLEMA[n] + '</div>') +
        '<div class="bi-cuerpo"><div class="bi-dia">ACTO ' + n + '</div><div class="bi-tit">' + B.esc(d.titulo || TIT_DIA[n]) + '</div>' +
        '<div class="bi-lug">' + B.esc(d.lugar || '') + '</div></div>' +
        '<div class="bi-perf"></div><div class="bi-talon"><div class="bi-adm">ADMITE UNO</div><div class="bi-num">Nº 1928·0' + n + '</div></div>' +
        '<div class="bi-sello">' + (n === 5 && vio5 ? 'A PRACTICAR' : 'VISTO') + '</div>' + (n === BONUS ? '<div class="bi-bonus">PRACTICA</div>' : '') +
        (cerrado ? '<div class="bi-cerrado">' + CANDADO + '<span>' + (n === BONUS ? 'Se abre con el acto ' + (BONUS - 1) : 'Se abre en clase') + '</span></div>' : '') + '</div></button>';
    }
    h += '</div><div class="port-pie">';
    if (pr.ultimo && B.DIAS[pr.ultimo.dia] && !(pr.ultimo.fin === 5) && HIT.abierto(pr.ultimo.dia)) {
      const u = pr.ultimo, d = B.DIAS[u.dia];
      h += '<button class="bt prim" id="continuar">' + ICO.play + ' Continuar · Acto ' + u.dia + (u.plano ? ', ' + (d.planos[u.plano] ? d.planos[u.plano].id : '') : '') + '</button>';
    } else h += '<span class="port-nota">Elige un acto · Espacio para seguir · P pausa · F pantalla completa</span>';
    h += '</div>';
    p.innerHTML = h;
    const vb = videoBarco('port-vid'); if (vb) p.querySelector('.port-fondo').appendChild(vb);
    if (M._estrenaBonus) { M._estrenaBonus = false; const b5 = p.querySelector('.billete[data-dia="' + BONUS + '"]'); if (b5) b5.classList.add('estreno'); }   // recién abierto: se destaca una vez
    B.$$('.billete', p).forEach(b => b.addEventListener('click', () => {
      B.ac(); const n = +b.dataset.dia;
      if (!HIT.abierto(n)) { M.aviso(n === BONUS ? 'El acto ' + n + ' (PRACTICA) se abre con el acto ' + (BONUS - 1) + '.' : 'El acto ' + n + ' se abre al acabar la clase en que lo veáis.', 3.2); return; }
      M.empezarDia(n, n === 5 && vio5 ? iPrac : 0, n === 5 && vio5);
    }));
    /* desde el aviso de la campana («&dia=N»): un botón grande para entrar en ESE acto (el clic hace falta para el sonido) */
    const dIr = HIT.ir();
    if (dIr && HIT.abierto(dIr) && B.DIAS[dIr]) {
      const pie = p.querySelector('.port-pie'), v = B.el('div', 'port-directo no-seguir'), antes = pie.innerHTML;
      v.innerHTML = '<button class="bt prim">' + ICO.play + ' Acto ' + dIr + ' · ' + B.esc(B.DIAS[dIr].titulo || TIT_DIA[dIr]) + '</button><button class="bt pd-x">Ver todos los actos</button>';
      pie.innerHTML = ''; pie.appendChild(v);
      v.querySelector('.prim').addEventListener('click', e => { e.stopPropagation(); B.ac(); v.remove(); M.empezarDia(dIr, dIr === 5 && vio5 ? iPrac : 0, dIr === 5 && vio5); });
      v.querySelector('.pd-x').addEventListener('click', e => { e.stopPropagation(); pie.innerHTML = antes; const c2 = $('#continuar', pie); if (c2) c2.addEventListener('click', () => { B.ac(); const u = B.progreso.leer().ultimo; M.empezarDia(u.dia, u.plano || 0); }); });
    }
    const c = $('#continuar', p);
    if (c) c.addEventListener('click', () => { B.ac(); const u = B.progreso.leer().ultimo; M.empezarDia(u.dia, u.plano || 0); });
    /* (21-oct, Iago) el sonido de la portada, coherente con el vídeo: mar, gaviotas y la máquina del vapor; de vez en cuando, su
       sirena. Suena al primer clic o tecla (el navegador no deja sonar antes); los sonidos se bajan mientras se mira la portada */
    const rutasAmb = PORT.amb.map(a => a.src).concat(PORT.sirena).filter(r => B.existe(r));
    const listos = B.precarga(rutasAmb);
    const enPort = () => escena.classList.contains('en-portada');
    const suenaMar = () => listos.then(() => {
      if (!enPort()) return;
      B.ambiente(PORT.amb);
      clearTimeout(M._sirena);
      const sirena = () => { if (!enPort()) return; if (B.buf[PORT.sirena] && !B.pausado) B.suena(PORT.sirena, { bus: B.bus.amb, vol: .28, pan: .35 }); M._sirena = setTimeout(sirena, 26000 + Math.random() * 24000); };
      M._sirena = setTimeout(sirena, 7000 + Math.random() * 6000);
    });
    const amb = () => { p.removeEventListener('pointerdown', amb); removeEventListener('keydown', amb); B.ac(); suenaMar(); };
    p.addEventListener('pointerdown', amb); addEventListener('keydown', amb, { once: true });
    if (B.hayAudio()) suenaMar();
  };
  function paraPortada() {
    if (M._crepita) { M._crepita.parar(); M._crepita = null; }
    clearTimeout(M._sirena); B.musica(null);   // el mar sigue sonando durante la precarga del acto: lo cambia su primer plano
  }

  /* ══════════ empezar un día: precarga y primer plano ══════════ */
  let directoA = -1;   // (punto 54) plano en el que se entra directo a la interacción (sin intro ni frases)
  M.empezarDia = async function (n, desde, directo) {
    if (!HIT.abierto(n)) return;   // (20-oct-2026) acto aún no visto en clase
    directoA = directo ? (desde || 0) : -1;
    const d = B.DIAS[n]; if (!d) return;
    M.salir(true);
    paraPortada();
    dia = d; idx = -1;
    mideRes();
    if (B.banda && B.banda.config) B.banda.config(d.banda);
    escena.classList.remove('en-portada'); escena.classList.add('precargando');
    const pc = $('#precarga');
    pc.innerHTML = '<div class="pc-caja"><div class="pc-dia">ACTO ' + n + '</div><div class="pc-tit">' + B.esc(d.titulo) + '</div>' +
      '<div class="pc-barra"><i></i></div><div class="pc-mb">Preparando…</div><div class="pc-det"></div></div>';
    const rutas = recursosDelDia(d);
    const t0 = performance.now();
    await B.precarga(rutas, pr => {
      const pct = pr.total ? pr.bytes / pr.total : 1;
      $('.pc-barra i', pc).style.width = Math.round(pct * 100) + '%';
      $('.pc-mb', pc).textContent = pr.total ? B.fmtMB(pr.bytes) + ' de ' + B.fmtMB(pr.total) : 'Sin ficheros todavía';
      $('.pc-det', pc).textContent = pr.ficheros + ' ficheros listos · ' + Math.max(0, rutas.length - pr.ficheros) + ' provisionales (imagen, voz o música que aún no está)';
    });
    $('.pc-barra i', pc).style.width = '100%';
    const pasado = performance.now() - t0;
    if (pasado < 900) await new Promise(r => setTimeout(r, 900 - pasado));
    if (dia !== d) return;
    /* (20-oct-2026, Iago) SELECCIONADOR DE VOLUNTARIOS: con la cuenta Protester y en la hora de clase, al acabar la precarga sale
       «Seleccionar voluntario» con la estética del acto (1 el telégrafo del barco, 2 la tabla de lavar, 3 la marquesina de Harlem,
       4 el álbum de fotos de John; el 5 no lleva). El acto empieza al cerrar la ruleta o con «Ahora no». A los alumnos, nada. */
    const VOL = { 1: 'telegrafo', 2: 'tabla', 3: 'marquesina', 4: 'album' };
    if (VOL[n] && !directo && window.LMVoluntarios && window.LMVoluntarios.ofrece) {
      $('.pc-mb', pc).textContent = 'Listo';
      try { await window.LMVoluntarios.ofrece({ tema: VOL[n] }); } catch (e) { }
      if (dia !== d) return;
    }
    escena.classList.remove('precargando');
    correPlano(B.clamp(desde || 0, 0, d.planos.length - 1));
  };
  function recursosDelDia(d) {
    const r = [];
    if (d.carta && d.carta.voz) r.push(d.carta.voz);
    if (d.carta) B.arr(d.carta.lineas).forEach(l => r.push(l.voz));
    d.planos.forEach(p => {
      r.push(rutaImg(p));
      Object.keys(p.var || {}).forEach(q => r.push(rutaVar(p, q)));
      B.arr(p.amb).forEach(a => r.push(a.src));
      if (p.mus) r.push(p.mus.src);
      if (p.salpica) B.arr(p.salpica.sonidos).forEach(x => x && r.push(x.src));
      if (p.video) r.push(/fondo_bucle\./.test(p.video) ? PORT.video : p.video);   // (21-oct) normalmente ya está en memoria desde la portada   // (ronda 6) sonidos sueltos del plano
      if (p.mapa) { if (p.mapa.silbato) r.push(p.mapa.silbato); if (p.mapa.musA) r.push(p.mapa.musA.src); B.arr(p.mapa.sfx).forEach(s => s && r.push(s.src)); if (p.mapa.icono) r.push(resImg(p.mapa.icono)); }
      B.arr(p.lineas).concat(B.arr(p.despues)).forEach(l => { r.push(l.voz); B.arr(l.sfx).forEach(s => r.push(s.src)); });
      B.arr(p.inter).forEach(it => {
        B.arr(it.recursos).forEach(x => r.push(x));
        B.arr(it.antes).forEach(l => r.push(l.voz));
        const L = it.lineas || {}; Object.keys(L).forEach(k => B.arr(L[k]).forEach(l => r.push(l.voz)));
        const mod = B.inter[it.tipo]; if (mod && mod.voces) B.arr(mod.voces).forEach(l => r.push(l.voz || l));
      });
    });
    if (B.inst && B.inst.rutas) r.push.apply(r, B.inst.rutas());
    /* (20-oct) el chisporroteo de verdad del cilindro, si el día tiene cilindro (líneas «cilindro» o la interacción del fonógrafo) */
    if (d.planos.some(p => B.arr(p.lineas).concat(B.arr(p.despues)).some(l => l.cilindro) || B.arr(p.inter).some(it => it.tipo === 'fonografo'))) r.push('sfx/d4/cilindro.mp3');
    if (B.banda && B.banda.rutas && d.banda && d.banda.precarga !== false) r.push.apply(r, B.banda.rutas(d.banda));   // (21-oct) «banda»: {…, «precarga»: false} = no bajar las pistas de banda/ con el acto
    return r.filter(Boolean);
  }
  /* imágenes: img/dN/p1_1.webp (1920) y, si existe, img/dN/1280/p1_1.webp para pantallas pequeñas */
  let pequena = false;
  const mideRes = () => { const w = (escena && escena.getBoundingClientRect().width) || innerWidth || 1600; pequena = w * (window.devicePixelRatio || 1) <= 1400; };
  const resImg = r => { if (!r || !pequena) return r; const a = r.replace(/^img\/(d\d+)\//, 'img/$1/1280/'); return B.existe(a) ? a : r; };
  M.resImg = resImg;
  const rutaImg = p => resImg(p.img || ('img/d' + p.dia + '/' + p.id.toLowerCase().replace('.', '_') + '.webp'));
  const rutaVar = (p, q) => { const v = (p.var || {})[q]; return resImg(typeof v === 'string' ? v : (v && v.img) || ('img/d' + p.dia + '/' + p.id.toLowerCase().replace('.', '_') + '_' + q.toLowerCase() + '.webp')); };

  /* ══════════ salir / navegar ══════════ */
  function limpiaPlano() {
    if (ctl) ctl.matar(); ctl = null; saltable = null;
    if (cilindroAct) { cilindroAct.parar(); cilindroAct = null; }
    B.cortaVivos('plano');
    if (B.banda && B.banda.parar) B.banda.parar();
    if (B.agacha) B.agacha(false);
    subt.classList.remove('on');
    cartaBox.classList.remove('on', 'leyendo'); escena.classList.remove('con-carta');
    interBox.classList.remove('on'); interBox.innerHTML = '';
    escena.classList.remove('con-inter', 'subt-abajo');
    visAnt = null;
    $('#rotulo').innerHTML = '';
  }
  M.salir = function (sinPortada) {
    limpiaPlano();
    B.silencioTotal();
    hechosBox.innerHTML = '';
    $('#findia').classList.remove('on', 'fin-historia'); clearTimeout(M._finH);
    if (B.pausado) B.pausa(false);
    pelicula.innerHTML = ''; planoEl = null; planoAct = null;
    if (!sinPortada) dia = null;
  };
  M.irA = function (i) { if (!dia) return; if (B.pausado) B.pausa(false); correPlano(B.clamp(i, 0, dia.planos.length - 1)); };
  M.siguiente = function () { if (!dia) return; if (idx + 1 < dia.planos.length) M.irA(idx + 1); else finDia(); };
  M.anterior = function () { if (!dia) return; M.irA(Math.max(0, idx - 1)); };
  M.seguir = function () { if (saltable) { const f = saltable; saltable = null; f(); } };
  M.dia = () => dia; M.indice = () => idx;

  /* ══════════ un plano ══════════ */
  async function correPlano(i) {
    limpiaPlano();
    $('#findia').classList.remove('on');
    idx = i;
    const p = dia.planos[i]; planoAct = p; tCambio = -1e9; corteAct = null; ultQuien = null;   // un plano puede ABRIR con un plano recurso
    const directo = directoA === i; directoA = -1;
    const c = ctl = B.control();
    montaPlano(p);
    preparaSig(i + 1);   // (ronda 6) y dejar listas las del plano siguiente
    B.ambiente(p.amb || []);
    salpica(p.salpica, c);
    B.musica(p.mus || null);
    ponHechos(p);
    if (p.pre && !directo) { await esperaSaltable(p.pre, c); if (c.muerto) return; }   // p.pre: segundos de música sola antes de la primera línea
    B.progreso.plano(dia.n, i, null);
    pintaPuntos();
    if (p.titulo && !directo) { await tituloDia(p, c); if (c.muerto) return; }
    if (!directo) for (const l of B.arr(p.lineas)) { await M.di(l, c); if (c.muerto) return; }
    for (const it of B.arr(p.inter)) {
      if (!directo) for (const l of B.arr(it.antes)) { await M.di(l, c); if (c.muerto) return; }
      await M.interaccion(it, c); if (c.muerto) return;
    }
    for (const l of B.arr(p.despues)) { await M.di(l, c); if (c.muerto) return; }
    const sig = dia.planos[i + 1], vis = planoEl && planoEl._vis;
    if (!(sig && vis && B.arr(sig.inter).some(it => it && it.previa === vis))) ponVariante(null);   // (ronda 5) la lata de P1.1 sigue en pantalla hasta abrirla en P1.2
    if (p.mapa && planoEl && planoEl._mapa) { await planoEl._mapa.viaje(c); if (c.muerto) return; }   // (ronda 5) el viaje lo hace el alumno
    B.progreso.plano(dia.n, i, p.id); pintaPuntos();
    const ok = await esperaSaltable(p.mapa ? (p.mapa.tras == null ? 3.2 : p.mapa.tras) : p.espera == null ? 1.4 : p.espera, c);
    if (c.muerto) return;
    if (i + 1 < dia.planos.length) correPlano(i + 1); else finDia();
  }
  /* (ronda 6, Iago en el aula: «más sonidos ambiente en las calderas, hay momentos medio callados: golpes metálicos, aire a
     presión») SALPICADO: sonidos sueltos que salen a ratos y sin orden fijo mientras dura el plano (también en su interacción).
     p.salpica = { cada: [mín, máx] s, sonidos: [{ src, vol: [a, b] }…] }: nunca el mismo dos veces seguidas, con algo de variación
     de tono y repartidos a izquierda y derecha. El reloj se congela en pausa, así que en pausa no suena nada. */
  function salpica(s, c) {
    const L = s ? B.arr(s.sonidos).filter(x => x && B.buf[x.src]) : [];
    if (!L.length) return;
    const cada = s.cada || [2.5, 6], az = (a, b) => a + Math.random() * (b - a);
    let ult = null;
    const uno = () => {
      if (c.muerto) return;
      let x; do { x = L[Math.floor(Math.random() * L.length)]; } while (L.length > 1 && x === ult); ult = x;
      const v = Array.isArray(x.vol) ? az(x.vol[0], x.vol[1]) : (x.vol == null ? .35 : x.vol);
      B.suena(x.src, { bus: B.bus.amb, vol: v, rate: az(.93, 1.05), pan: az(-.7, .7), grupo: 'plano' });
      B.espera(az(cada[0], cada[1]), c).then(ok => { if (ok) uno(); });
    };
    B.espera(az(.8, 2.2), c).then(ok => { if (ok) uno(); });
  }
  function esperaSaltable(seg, c) {
    return new Promise(res => {
      let hecho = false;
      const fin = v => { if (hecho) return; hecho = true; if (saltable === adelanta) saltable = null; res(v); };
      const adelanta = () => fin(true);
      saltable = adelanta;
      B.espera(seg, c).then(fin);
    });
  }

  /* (ronda 6, Iago en el aula: «en bastantes momentos la imagen llega más tarde que el audio») el portal descargaba y
     descodificaba cada lámina en la precarga pero no la guardaba preparada: en un ordenador justo, al enseñarla por primera vez
     había que volver a descodificarla y la voz ya había empezado. Ahora: (1) al montar un plano se descodifican todas sus láminas y
     las del plano siguiente (y se guardan referencias para que el navegador no las suelte); (2) cada frase, si cambia la lámina
     que se ve, espera (como mucho 0,9 s) a que esté descodificada y pintada, y entonces salen a la vez texto, imagen y voz. */
  const prepara = im => { if (im && im.decode && !im._prep) im._prep = im.decode().catch(() => { }); return im && im._prep; };
  const guardadas = [];
  function preparaSig(i) {
    const p = dia && dia.planos[i]; if (!p) return;
    [rutaImg(p)].concat(Object.keys(p.var || {}).map(q => rutaVar(p, q))).forEach(r => {
      if (!r || !B.img[r]) return;
      const im = new Image(); im.src = B.img[r]; prepara(im); guardadas.push(im);
    });
    while (guardadas.length > 30) guardadas.shift();
  }
  let visAnt = null;
  function esperaLamina() {
    if (!planoEl) return null;
    const im = planoEl.querySelector('.lam.var.on') || planoEl.querySelector('.lam.maestra');
    if (!im || im === visAnt) return null;
    visAnt = im;
    const dec = im.decode ? im.decode().catch(() => { }) : Promise.resolve();
    return Promise.race([dec, new Promise(r => setTimeout(r, 900))]).then(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));
  }

  /* montar la imagen del plano: maestra + variantes (o el provisional) */
  function montaPlano(p) {
    const viejo = planoEl;
    const el = B.el('div', 'plano');
    const kbEl = B.el('div', 'kb');
    el.appendChild(kbEl);
    const rM = rutaImg(p);
    const vp = p.video && /fondo_bucle\./.test(p.video) ? videoBarco('lam maestra vid') : null;   // (21-oct) el barco de la portada
    if (vp) kbEl.appendChild(vp);
    else if (B.img[rM]) {
      const im = B.el('img', 'lam maestra'); im.src = B.img[rM]; im.alt = p.desc || p.id; im.draggable = false; kbEl.appendChild(im);
      Object.keys(p.var || {}).forEach(q => {
        const r = rutaVar(p, q);
        if (B.img[r]) { const v = B.el('img', 'lam var'); v.src = B.img[r]; v.dataset.q = q; v.alt = ''; v.draggable = false; kbEl.appendChild(v); }
      });
    } else kbEl.appendChild(provisional(p, rM));
    pelicula.appendChild(el);
    if (B.vida && B.VIDA && !vp) B.vida.pon(el, B.VIDA[p.id]);   // con el vídeo, la vida de la lámina no casa: fuera   // (Iago, 19-oct) fuego, luces, humo, pájaros… (js/vida.js + data/vida.js)
    void el.offsetWidth; el.classList.add('on');
    if (viejo) { viejo.classList.remove('on'); setTimeout(() => viejo.remove(), 1000); }
    planoEl = el; el._kb = kbEl;
    B.$$('.lam', kbEl).forEach(prepara);   // (ronda 6) descodificar ya todas las láminas del plano (gestos, cortes, recursos)
    if (p.mapa) montaMapa(p, kbEl);
    const ip =B.arr(p.inter).find(it => it && it.previa && kbEl.querySelector('.lam.var[data-q="' + it.previa + '"]'));
    if (ip) { el._base = ip.previa; ponVariante(null); }
    /* cámara: si no la trae, una distinta para cada plano */
    const dur = p.cam && p.cam.dur || duracionEstimada(p);
    const alterno = idx % 2 === 0;
    /* (Iago, 19-oct) NADA de movimientos de cámara: el plano está quieto; la vida la ponen los efectos (partículas, humo, fuego…) */
    kb = { de: [1, .5, .5], a: [1, .5, .5], dur };
    kb.t0 = B.ahora();
    focoObj = { s: 0, x: .5, y: .5 }; foco = { s: 0, x: .5, y: .5 };
    aplicaKB(B.ahora());
  }
  /* (Iago, 20-oct) PLANOS-MAPA: la carta náutica (o el mapa del tren) con la ruta dibujándose y, al llegar, el rótulo del destino.
     (ronda 5, Iago: «mapas interactivos en TODOS los viajes») el viaje lo hace EL ALUMNO: primero un cartel de adónde vamos y
     por qué («Continuar»); luego arrastra el barco/tren por la ruta, o mantiene pulsado → / Espacio (vale el mando de clase);
     sin moverlo no se avanza. La música se va fundiendo con la de destino según avanza. Con Protester, un clic lo completa.
     p.mapa = { ruta: [[x, y]…] (fracciones de la lámina), desde, hasta, sub, dur (s que tarda manteniendo la tecla),
                antes: { et, tit, txt } (cartel previo), pista, tras (s tras llegar), encuadre: [escala, cx, cy], etiq, musA, sfx, silbato… } */
  function montaMapa(p, kbEl) {
    const m = p.mapa, NS = 'http://www.w3.org/2000/svg', e = m.encuadre || [1, .5, .5], k = 1 / e[0];
    const mk = (tag, at) => { const n = document.createElementNS(NS, tag); for (const a in at) n.setAttribute(a, at[a]); return n; };
    const capa = B.el('div', 'mapa-capa'); const im = kbEl.querySelector('.lam.maestra'); if (im) capa.appendChild(im);
    capa.style.transform = 'scale(' + e[0] + ') translate(' + ((.5 - e[1]) * 100).toFixed(2) + '%,' + ((.5 - e[2]) * 100).toFixed(2) + '%)';
    const svg = mk('svg', { viewBox: '0 0 100 56.25', class: 'mapa-svg', preserveAspectRatio: 'none' });
    const P = m.ruta.map(q => [q[0] * 100, q[1] * 56.25]);
    let d = 'M' + P[0][0] + ' ' + P[0][1];
    for (let i = 1; i < P.length; i++) {
      const a = P[i - 1], b = P[i], c0 = P[i - 2] || a, c1 = P[i + 1] || b;
      d += ' C' + (a[0] + (b[0] - c0[0]) / 6).toFixed(2) + ' ' + (a[1] + (b[1] - c0[1]) / 6).toFixed(2) + ' ' + (b[0] - (c1[0] - a[0]) / 6).toFixed(2) + ' ' + (b[1] - (c1[1] - a[1]) / 6).toFixed(2) + ' ' + b[0] + ' ' + b[1];
    }
    const tren = m.tipo === 'tren';   // (Iago, 20-oct) en el acto 2, mapa «con personalidad de tren»: vía con traviesas, locomotora y humo
    const sombra = mk('path', { d, class: 'mapa-ruta-sombra', 'stroke-width': 1.3 * k }), ruta = mk('path', { d, class: 'mapa-ruta', 'stroke-width': .6 * k });
    let mascara = null;
    if (tren) {
      const id = 'mm' + Math.random().toString(36).slice(2, 8), defs = mk('defs', {}), mk2 = mk('mask', { id, maskUnits: 'userSpaceOnUse', x: -10, y: -10, width: 120, height: 80 });
      mascara = mk('path', { d, fill: 'none', stroke: '#fff', 'stroke-width': 3.2 * k, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
      mk2.append(mascara); defs.append(mk2); svg.append(defs);
      const g = mk('g', { mask: 'url(#' + id + ')' });
      g.append(sombra, mk('path', { d, class: 'mapa-traviesas', 'stroke-width': 1.5 * k, 'stroke-dasharray': (.24 * k) + ' ' + (.72 * k) }), mk('path', { d, class: 'mapa-rail', 'stroke-width': .42 * k }));
      svg.append(g); ruta.style.opacity = 0; svg.append(ruta);
    } else svg.append(sombra, ruta);
    /* la ruta que falta, en punteado tenue: el alumno ve por dónde tiene que llevarlo */
    const guiaRuta = mk('path', { d, class: 'mapa-ruta-guia', 'stroke-width': .38 * k, 'stroke-dasharray': (.9 * k) + ' ' + (1.1 * k) });
    svg.insertBefore(guiaRuta, svg.firstChild.nextSibling || null);
    const sitio = (q, txt, cls) => {
      const g = mk('g', { class: 'mapa-sitio ' + cls }), o = (m.etiq && m.etiq[cls]) || [1.6, .7];
      g.append(mk('circle', { cx: q[0], cy: q[1], r: .85 * k }));
      const t = mk('text', { x: q[0] + o[0] * k, y: q[1] + o[1] * k, 'font-size': 2.5 * k }); t.textContent = txt; g.append(t); svg.append(g); return g;
    };
    sitio(P[0], m.desde || '', 'desde'); const gB = sitio(P[P.length - 1], m.hasta || '', 'hasta');
    /* (C2, 20-oct) paradas: el nombre de la ciudad sale cuando el tren pasa por el punto i de la ruta */
    const paradas = B.arr(m.paradas).filter(x => x && P[x.i]).map(x => { const g = sitio(P[x.i], x.n || '', 'hasta parada'); g.querySelector('circle').setAttribute('r', .6 * k); g.querySelector('text').setAttribute('font-size', 1.9 * k); return { g, i: x.i, s: 1 }; });
    const barco = mk('g', { class: tren ? 'mapa-barco mapa-loco' : 'mapa-barco' });
    const halo = mk('circle', { r: (tren ? 3.4 : 4.4) * k, class: 'mapa-guia' }); barco.append(halo);   // brilla hasta que el alumno lo mueve
    if (tren) {
      const cuerpo = mk('g', { transform: 'scale(' + (k * 1.35) + ')' });
      cuerpo.append(mk('path', { d: 'M-.9 -.55 H1.6 V.35 H-.9 Z M-1.9 -1.05 H-.9 V.35 H-1.9 Z M.85 -1.15 H1.3 V-.55 H.85 Z M1.6 .35 L2.15 .78 H1.6 Z M-2.1 -1.15 H-.7 V-.98 H-2.1 Z' }));
      [[-1.35, .6, .34], [-.2, .62, .3], [.75, .62, .3]].forEach(w => cuerpo.append(mk('circle', { cx: w[0], cy: w[1], r: w[2], class: 'rueda' })));
      barco.append(cuerpo);
    } else if (m.icono) {   // (ronda 4, Iago: «el icono del barco no me gusta») el vapor pintado (recorte de ChatGPT) en vez del dibujo
      const an = (m.anchoIcono || 9) * k, al = an * (m.proporcionIcono || .5);
      barco.append(mk('image', { href: resImg(m.icono), x: -an / 2, y: -al * .78, width: an, height: al, class: 'mapa-barco-img', preserveAspectRatio: 'xMidYMid meet' }));
    } else barco.append(mk('circle', { r: 2.2 * k, class: 'onda' }), mk('path', { d: 'M-1.6 0 L1.6 0 L1.1 .8 L-1.1 .8 Z M-.25 -1.2 L.35 -1.2 L.35 0 L-.25 0 Z', transform: 'scale(' + k + ')' }));
    svg.append(barco); capa.appendChild(svg); kbEl.appendChild(capa);
    const plano = kbEl.parentNode;
    const cartel = B.el('div', 'mapa-cartel'); cartel.innerHTML = '<div class="mc-lugar"></div><div class="mc-sub"></div>';
    cartel.firstChild.textContent = m.hasta || ''; cartel.lastChild.textContent = m.sub || ''; plano.appendChild(cartel);
    const L = ruta.getTotalLength(); (tren ? [mascara] : [ruta, sombra]).forEach(r => { r.style.strokeDasharray = L; r.style.strokeDashoffset = L; });
    paradas.forEach(pa => { let dm = Infinity; for (let v = 0; v <= 1.0001; v += .002) { const q = ruta.getPointAtLength(L * Math.min(1, v)), dd = Math.hypot(q.x - P[pa.i][0], q.y - P[pa.i][1]); if (dd < dm) { dm = dd; pa.s = v; } } });
    const soloArrastre = m.arrastrar === 'solo';   // (Iago a C2) en el acto 2 el tren solo se mueve arrastrando (Protester puede saltar)
    const T = m.dur || 8;
    let prog = 0, s = 0, ult = B.ahora(), tHumo = 0, activo = false, llego = false, musFija = true, held = false, holdHasta = 0, alLlegar = null;
    const pinta = (ahora) => {
      if (tren) mascara.style.strokeDashoffset = L * (1 - s); else ruta.style.strokeDashoffset = sombra.style.strokeDashoffset = L * (1 - s);
      guiaRuta.style.strokeDashoffset = 0; guiaRuta.style.opacity = s >= .999 ? 0 : '';
      const q = ruta.getPointAtLength(L * s);
      if (tren) {   // la locomotora mira hacia donde va y echa humo mientras corre
        const q2 = ruta.getPointAtLength(Math.min(L, L * s + .5)), q1 = ruta.getPointAtLength(Math.max(0, L * s - .5));
        const ang = Math.atan2(q2.y - q1.y, q2.x - q1.x) * 180 / Math.PI;
        barco.setAttribute('transform', 'translate(' + q.x.toFixed(2) + ' ' + q.y.toFixed(2) + ') rotate(' + ang.toFixed(1) + ')');
        if (activo && s > 0 && s < 1 && Math.abs(prog - s) > .002 && ahora - tHumo > .22) {
          tHumo = ahora; const a = ang * Math.PI / 180, cx = 1.07 * k * 1.35, cy = -1.25 * k * 1.35;
          const h = mk('circle', { cx: (q.x + cx * Math.cos(a) - cy * Math.sin(a)).toFixed(2), cy: (q.y + cx * Math.sin(a) + cy * Math.cos(a)).toFixed(2), r: .8 * k, class: 'mapa-humo' });
          svg.insertBefore(h, barco); setTimeout(() => h.remove(), 1700);
        }
      } else {
        let esp = '';
        if (m.icono) {   // mira hacia donde va (el recorte navega hacia la izquierda) y cabecea un poco con el mar
          const q2 = ruta.getPointAtLength(Math.min(L, L * s + .8)), q1 = ruta.getPointAtLength(Math.max(0, L * s - .8));
          const dx = q2.x - q1.x, ang = B.clamp(Math.atan2(q2.y - q1.y, Math.abs(dx) || .001) * 180 / Math.PI, -14, 14) * (dx > 0 ? 1 : -1) * .5;
          esp = ' rotate(' + (ang + Math.sin(ahora * 1.7) * 1.6).toFixed(2) + ')' + (dx > .05 ? ' scale(-1 1)' : '');
        }
        barco.setAttribute('transform', 'translate(' + q.x.toFixed(2) + ' ' + (q.y + Math.sin(ahora * 2.1) * .12 * k).toFixed(2) + ')' + esp);
      }
      halo.style.display = activo && prog < .04 ? '' : 'none';
      if (!musFija && B.musicaMezcla) B.musicaMezcla(s);
      gB.classList.toggle('on', s >= .98); cartel.classList.toggle('on', s >= .999);
      paradas.forEach(pa => pa.g.classList.toggle('on', s >= pa.s - .004));
    };
    const paso = () => {
      if (!capa.isConnected) return;
      const ahora = B.ahora(), dt = Math.min(.1, Math.max(0, ahora - ult)); ult = ahora;
      if (activo && !B.pausado && (held || ahora < holdHasta)) prog = Math.min(1, prog + dt / T);
      s += (prog - s) * Math.min(1, dt * 6); if (prog >= 1 && 1 - s < .003) s = 1;
      pinta(ahora);
      if (activo && s >= 1 && !llego) { llego = true; if (alLlegar) alLlegar(); }
      requestAnimationFrame(paso);
    };
    requestAnimationFrame(paso);
    /* el viaje, paso a paso: lo llama correPlano */
    plano._mapa = {
      viaje(c) {
        return new Promise(res => {
          const quitar = [], limpia = () => { quitar.splice(0).forEach(f => { try { f(); } catch (er) { } }); if (saltable === salta) saltable = null; };
          let fase = 0, fin = false;
          const acaba = ok => { if (fin) return; fin = true; limpia(); res(ok); };
          c.alMorir.push(() => acaba(false));
          /* 1 · el cartel de adónde vamos y por qué */
          const an = m.antes || (m.cartel ? { tit: m.cartel.titulo, txt: m.cartel.texto, et: m.cartel.et } : {}), pre = B.el('div', 'mapa-previo no-seguir');
          pre.innerHTML = '<div class="mp-et"></div><div class="mp-tit"></div><div class="mp-txt"></div><button class="bt prim mp-bt">Continuar ' + ICO.play + '</button>';
          pre.children[0].textContent = an.et || (tren ? 'Próxima estación' : 'Próxima escala');
          pre.children[1].textContent = an.tit || ('Rumbo a ' + (m.hasta || ''));
          pre.children[2].textContent = an.txt || m.sub || '';
          plano.appendChild(pre); void pre.offsetWidth; pre.classList.add('on');
          quitar.push(() => { pre.classList.remove('on'); setTimeout(() => pre.remove(), 600); });
          const pista = B.el('div', 'mapa-pista'), toque = B.el('div', 'mapa-toque no-seguir');
          pista.innerHTML = m.pista || ('Arrastra ' + (tren ? 'el tren' : 'el barco') + ' hasta <b>' + B.esc(m.hasta || '') + '</b>' + (soloArrastre ? '' : ' · o mantén pulsado <kbd>→</kbd> / <kbd>Espacio</kbd>'));
          const parte = () => {
            if (fase) return; fase = 1; B.ac();
            pre.classList.remove('on');
            activo = true; ult = B.ahora();
            if (m.musA && B.musicaHacia) { B.musicaHacia(m.musA); musFija = false; }
            if (m.silbato && B.buf[m.silbato]) B.suena(m.silbato, { bus: B.bus.sfx, vol: m.volSilbato || .45, t: B.ahora() + .3 });
            B.arr(m.sfx).forEach(x => { if (x && B.buf[x.src] && (x.t || 0) <= 2) B.suena(x.src, { bus: B.bus.sfx, vol: x.vol == null ? .5 : x.vol, t: B.ahora() + (x.t || 0) }); });
            plano.appendChild(toque); plano.appendChild(pista); void pista.offsetWidth; pista.classList.add('on');
            quitar.push(() => { toque.remove(); pista.classList.remove('on'); setTimeout(() => pista.remove(), 500); });
            saltable = salta;
          };
          /* Protester: un clic (o Espacio) completa el viaje; el alumno, no */
          const salta = () => { if (!fase) parte(); else if (B.prof) { prog = 1; } else saltable = salta; };
          saltable = salta;
          pre.querySelector('.mp-bt').addEventListener('click', ev => { ev.stopPropagation(); parte(); });
          /* teclado y mando de clase: → / Espacio / AvPág / Intro. Mantener = avanzar; cada pulsación suelta, un tramo corto */
          const TECLA = /^( |Spacebar|ArrowRight|PageDown|Enter)$/;
          quitar.push(B.captura.poner(ev => {
            if (!TECLA.test(ev.key)) return false;
            if (!fase) { if (!ev.repeat) parte(); return true; }
            if (soloArrastre && !B.prof) return true;   // solo arrastrando (la tecla no hace nada, ni salta el plano)
            held = true; holdHasta = Math.max(holdHasta, B.ahora() + .4); return true;
          }));
          const suelta = ev => { if (TECLA.test(ev.key)) held = false; };
          document.addEventListener('keyup', suelta); quitar.push(() => document.removeEventListener('keyup', suelta));
          const alBlur = () => { held = false; }; addEventListener('blur', alBlur); quitar.push(() => removeEventListener('blur', alBlur));
          /* arrastrar: el barco sigue al dedo/ratón si va por delante, cerca de la ruta (nunca hacia atrás) */
          let arr = false;
          const hacia = ev => {
            const r = svg.getBoundingClientRect(); if (!r.width) return;
            const x = (ev.clientX - r.left) / r.width * 100, y = (ev.clientY - r.top) / r.height * 56.25;
            let mej = -1, dm = Infinity;
            for (let v = prog; v <= Math.min(1, prog + .3) + 1e-9; v += .004) { const q = ruta.getPointAtLength(L * Math.min(1, v)), dd = Math.hypot(q.x - x, q.y - y); if (dd < dm) { dm = dd; mej = Math.min(1, v); } }
            if (mej >= 0 && dm < 9 * k) prog = Math.max(prog, mej > .985 ? 1 : mej);
          };
          toque.addEventListener('pointerdown', ev => { ev.preventDefault(); ev.stopPropagation(); arr = true; toque.classList.add('arrastra'); try { toque.setPointerCapture(ev.pointerId); } catch (er) { } hacia(ev); });
          toque.addEventListener('pointermove', ev => { if (arr) hacia(ev); });
          const fuera = () => { arr = false; toque.classList.remove('arrastra'); };
          toque.addEventListener('pointerup', fuera); toque.addEventListener('pointercancel', fuera);
          toque.addEventListener('click', ev => ev.stopPropagation());
          /* 3 · al llegar: el rótulo del destino, los efectos de llegada y la música de destino sola */
          alLlegar = () => {
            B.arr(m.sfx).forEach(x => { if (x && B.buf[x.src] && (x.t || 0) > 2) B.suena(x.src, { bus: B.bus.sfx, vol: x.vol == null ? .5 : x.vol, t: B.ahora() + .2 }); });
            if (!musFija && B.musicaFija) { musFija = true; B.musicaFija(); }
            acaba(true);
          };
        });
      }
    };
  }
  function duracionEstimada(p) {
    let s = 4;
    B.arr(p.lineas).concat(B.arr(p.despues)).forEach(l => s += durLinea(l) + .3);
    B.arr(p.inter).forEach(it => B.arr(it.antes).forEach(l => s += durLinea(l) + .3));
    if (p.titulo && dia && dia.carta) s += 5 + durTexto(dia.carta.texto);
    if (p.inter) s += 40;
    return Math.max(14, s);
  }
  function provisional(p, ruta) {
    const pal = PAL[p.pal] || PAL[PAL_DIA[p.dia]] || PAL.atlantico;
    const d = B.el('div', 'prov');
    d.style.setProperty('--p1', pal[0]); d.style.setProperty('--p2', pal[1]); d.style.setProperty('--p3', pal[2]);
    const quienes = quienesDe(p);
    d.innerHTML = '<div class="esq a">' + ESQ + '</div><div class="esq b">' + ESQ + '</div><div class="esq c">' + ESQ + '</div><div class="esq d">' + ESQ + '</div>' +
      '<div class="dentro"><div class="pid">' + B.esc(p.id) + '</div><div class="filete"></div>' +
      '<div class="pdesc">' + B.esc(p.desc || '') + '</div>' +
      (quienes.length ? '<div class="chapas">' + quienes.map(q => { const P = B.personaje(q); return '<span class="chapa" data-q="' + q + '" style="--c:' + P.color + '">' + B.esc(P.corto) + '</span>'; }).join('') + '</div>' : '') +
      '</div><div class="falta">PROVISIONAL · falta ' + B.esc(ruta) + '</div>';
    return d;
  }
  function quienesDe(p) {
    const s = [];
    B.arr(p.personajes).forEach(q => { if (s.indexOf(q) < 0) s.push(q); });
    Object.keys(p.var || {}).forEach(q => { if (s.indexOf(q) < 0) s.push(q); });
    B.arr(p.lineas).concat(B.arr(p.despues)).forEach(l => { if (l.quien && l.quien !== 'NARR' && s.indexOf(l.quien) < 0) s.push(l.quien); });
    return s;
  }
  function ponVariante(q) {
    if (!planoEl) return;
    const base = planoEl._base;   // (punto 16) lámina «previa» (el estuche cerrado) hasta que acabe su interacción: manda sobre las de «habla X»
    const corte = !!q && esCorte(planoAct, q);   // un primer plano o un plano recurso manda incluso sobre la lámina «previa»
    const vis = corte ? q : base ? base : (q || null);
    B.$$('.lam.var', planoEl).forEach(v => v.classList.toggle('on', !!vis && v.dataset.q === vis));
    /* (ronda 5) qué lámina se ve: en un plano recurso o un primer plano no hay bocadillo (no se ve a quien habla) y la vida
       del plano general (fuego, lámpara, polvo…) se apaga para no brillar donde no toca */
    const hay = !!vis && !!planoEl.querySelector('.lam.var[data-q="' + vis + '"]');
    planoEl._vis = hay ? vis : null; planoEl._recurso = hay && /^RECURSO_|_CERCA$/.test(vis);
    planoEl.classList.toggle('en-corte', planoEl._recurso);
    B.$$('.chapa', planoEl).forEach(v => v.classList.toggle('habla', !!q && v.dataset.q === q));
    const p = planoAct, f = q && p && ((p.foco && p.foco[q]) || (p.var && p.var[q] && p.var[q].foco));
    focoObj = { s: 0, x: .5, y: .5 };   // (Iago, 19-oct, 22:40) sin acercarse a la cara del que habla: NADA de movimientos de cámara (el foco solo sirve para los bocadillos)
    void f;
  }
  M.ponVariante = ponVariante;

  /* Ken Burns continuo + leve acercamiento al que habla */
  function aplicaKB(t) {
    if (!planoEl || !planoEl._kb) return;
    const e = B.suave((t - kb.t0) / kb.dur);
    foco.s += (focoObj.s - foco.s) * .04; foco.x += (focoObj.x - foco.x) * .04; foco.y += (focoObj.y - foco.y) * .04;
    let s = B.lerp(kb.de[0], kb.a[0], e) + foco.s;
    let cx = B.lerp(kb.de[1], kb.a[1], e), cy = B.lerp(kb.de[2], kb.a[2], e);
    if (foco.s > .001) { const w = foco.s / .045; cx = B.lerp(cx, foco.x, .35 * w); cy = B.lerp(cy, foco.y, .35 * w); }
    s = Math.max(1, s);
    const W = 100, H = 100, lim = (s - 1) / 2;
    const tx = B.clamp(-(cx - .5) * s, -lim, lim) * W, ty = B.clamp(-(cy - .5) * s, -lim, lim) * H;
    planoEl._kb.style.transform = 'translate(' + tx.toFixed(3) + '%,' + ty.toFixed(3) + '%) scale(' + s.toFixed(4) + ')';
  }
  B.alFotograma(aplicaKB);

  /* ══════════ una línea de diálogo ══════════ */
  const durTexto = s => Math.max(1.6, String(s || '').length / 14);
  const durLinea = l => (l.voz && B.buf[l.voz]) ? B.buf[l.voz].duration : durTexto(l.texto);
  M.durLinea = durLinea;
  const conBurbujas = p => !!(p.foco && Object.keys(p.foco).length);   // (Iago, 20-oct) bocadillos en todos los actos, también en el 1
  /* (Iago, 20-oct) ningún plano de menos de 4 s (mejor 5–8): un corte (primer plano «_CERCA» o plano recurso «RECURSO_») solo
     si la frase dura ≥ 4 s y el plano anterior ya lleva ≥ 4 s en pantalla; la lámina de «X habla» (mueve el brazo) solo en frases de ≥ 4 s */
  const MIN_PLANO = 4;
  let tCambio = 0, corteAct = null;
  const esCorte = (p, q) => !!(p && p.var && p.var[q] && /_CERCA$|^RECURSO_/.test(q));
  function eligePlano(v, l, dv) {
    const p = planoAct, t = performance.now() / 1000;
    if (esCorte(p, v)) {
      if (v === corteAct) return v;
      if (l.fijo) { corteAct = v; tCambio = t; return v; }
      if (dv >= MIN_PLANO && t - tCambio >= MIN_PLANO) { corteAct = v; tCambio = t; return v; }
      v = l.quien;
    }
    if (corteAct) { corteAct = null; tCambio = t; }
    if (v === l.quien) return dv >= MIN_PLANO ? v : null;
    return v;
  }
  const focoDe = (p, q) => (p.foco && p.foco[q]) || (p.var && p.var[q] && p.var[q].foco) || null;
  /* (20-oct; ronda 4, Iago: «el triangulito debajo del mentón… o por encima de la frente… vamos a intentar evitar que se
     tapen las caras») dónde va el bocadillo. Cada cara es una caja con su TAMAÑO (3.er número del foco: alto de la cara en
     fracción del alto del encuadre; si no lo hay, 0,14). Se prueban DEBAJO (pico bajo el mentón), ENCIMA (pico sobre la
     frente) y, solo si no caben, a los lados; gana el que no se sale, no tapa ninguna cara ni los «hechos reales».
     Medidas en --u (ancho 100, alto 56,25), como el CSS. Devuelve { lado, dy, dx }. */
  const CARA_H = .14;
  function cajaCara(f) {
    const h = (f[2] || CARA_H) * 56.25, x = f[0] * 100, y = f[1] * 56.25, w = h * .82;
    return [x - w / 2, y - .62 * h, x + w / 2, y + .55 * h];
  }
  function obstaculoHechos() {
    if (!hechosBox || !hechosBox.children.length || !escena) return null;
    const e = escena.getBoundingClientRect(), r = hechosBox.getBoundingClientRect();
    if (!e.width || !r.width) return null;
    const k = 100 / e.width;
    return [(r.left - e.left) * k - .8, (r.top - e.top) * k - .8, (r.right - e.left) * k + .8, (r.bottom - e.top) * k + .8];
  }
  function ladoBurbuja(p, fc, texto, quien) {
    const n = texto.length, lineas = Math.min(4, Math.ceil(n / 34)), H = 3.4 + lineas * 2.15, W = n <= 34 ? Math.max(12, n * 1.02 + 3) : 38;
    const X = fc[0] * 100, Y = fc[1] * 56.25, ax = fc[0] < .3 ? .16 : fc[0] > .7 ? .84 : .5;
    const hc = (fc[2] || CARA_H) * 56.25, PICO = 1.6, AIRE = .5;
    const dyAbajo = .55 * hc + PICO + AIRE, dyArriba = .62 * hc + PICO + AIRE, dxLado = .41 * hc + PICO + AIRE;
    const caras = Object.keys(p.foco || {}).map(k => cajaCara(p.foco[k]));
    const hb = obstaculoHechos(); if (hb) caras.push(hb);
    const ym = Y + .2 * hc;   // a los lados: a la altura de la boca
    const rect = {
      abajo: [X - ax * W, Y + dyAbajo, X + (1 - ax) * W, Y + dyAbajo + H],
      arriba: [X - ax * W, Y - dyArriba - H, X + (1 - ax) * W, Y - dyArriba],
      der: [X + dxLado, ym - .58 * H, X + dxLado + W, ym + .42 * H],
      izq: [X - dxLado - W, ym - .58 * H, X - dxLado, ym + .42 * H] };
    const corte = (a, b) => Math.max(0, Math.min(a[2], b[2]) - Math.max(a[0], b[0])) * Math.max(0, Math.min(a[3], b[3]) - Math.max(a[1], b[1]));
    const fuera = r => (r[2] - r[0]) * (r[3] - r[1]) - corte(r, [1, 1, 99, 55.25]);
    const orden = ['abajo', 'arriba', fc[0] < .5 ? 'der' : 'izq', fc[0] < .5 ? 'izq' : 'der'];
    let mejor = orden[0], coste = Infinity;
    orden.forEach((k, i) => { const r = rect[k]; const c = fuera(r) * 6 + caras.reduce((a, f) => a + corte(r, f), 0) * 3 + i * 4 + (i > 1 ? 40 : 0); if (c < coste) { coste = c; mejor = k; } });
    return { lado: mejor, dy: mejor === 'abajo' ? dyAbajo : dyArriba, dx: dxLado, ym: .2 * hc };
  }
  /* (punto 38) el atril de Pearl (P3.5): los doce compases con el número romano y, al llegar a Sol, el cifrado debajo.
     Cada línea puede traer «atril»: 'vacio' · 'fila1' · 'fila2' · 'fila3' · 'sol' (lo pone parches_musica.py). */
  const ATRIL = ['I7', 'I7', 'I7', 'I7', 'IV7', 'IV7', 'I7', 'I7', 'V7', 'IV7', 'I7', 'V7'], LETRA = { I7: 'G7', IV7: 'C7', V7: 'D7' };
  function ponAtril(paso) {
    if (!planoEl) return;
    let a = planoEl.querySelector('.atril');
    if (!a) {
      a = B.el('div', 'atril'); a.innerHTML = '<div class="at-tit">El blues de doce compases</div><div class="at-rej">' +
        ATRIL.map((r, i) => '<div class="at-c" data-f="' + (1 + (i >> 2)) + '"><b class="at-r">' + r + '</b><i class="at-l">' + LETRA[r] + '</i></div>').join('') + '</div><div class="at-pie">I = uno · IV = cuatro · V = cinco · en Sol: G · C · D</div>';
      planoEl.appendChild(a); void a.offsetWidth;
    }
    const orden = ['vacio', 'fila1', 'fila2', 'fila3', 'sol'], k = orden.indexOf(paso);
    a.classList.add('on'); a.dataset.paso = paso;
    B.$$('.at-c', a).forEach(c => c.classList.toggle('ver', +c.dataset.f <= k));
    a.classList.toggle('sol', k >= 4);
  }
  /* (ronda 4, Iago: «dejaría un poquito más de aire entre las intervenciones… no necesariamente un segundo siempre»)
     antes de cada frase, una pausa corta: 0,2 s si sigue hablando el mismo, 0,5 s si cambia de personaje y 0,15 s más
     si la anterior era una pregunta. Dentro de las interacciones no (llevan su propio ritmo). Con los 0,28 s de
     después de cada frase quedan ~0,5 s (mismo personaje) y ~0,8 s (cambio). */
  let ultQuien = null, ultTexto = '';
  function aireAntes(l, o) {
    if (o.sinAire || ultQuien == null || (escena && escena.classList.contains('con-inter'))) return 0;
    return (ultQuien !== l.quien ? .5 : .2) + (/[?¿]\s*[»"”']?\s*$/.test(ultTexto) ? .15 : 0);
  }
  M.di = function (l, c, o) {
    o = o || {};
    const aire = l ? aireAntes(l, o) : 0;
    if (aire > 0) return B.espera(aire, c).then(ok => ok ? M.di(l, c, Object.assign({}, o, { sinAire: true })) : false);
    return new Promise(res => {
      if (!l || (c && c.muerto)) return res(false);
      ultQuien = l.quien; ultTexto = String(l.texto || '');
      if (l.atril) ponAtril(l.atril);
      const P = B.personaje(l.quien);
      const dv = (l.voz && B.buf[l.voz] ? B.buf[l.voz].duration : durTexto(l.texto)) + (l.espera || 0);
      let v = l.var !== undefined ? l.var : l.quien;
      if (v && v !== '-') v = eligePlano(v, l, dv);
      ponVariante(v && v !== '-' ? v : null);
      const g = esperaLamina();
      if (g) g.then(() => { if (c && c.muerto) return res(false); arranca(); }); else arranca();
      function arranca() {
      $('.subt-quien', subt).textContent = P.nombre;
      subt.style.setProperty('--c', P.color);
      $('.subt-texto', subt).textContent = l.texto || '';
      /* (punto 28) en escenas de grupo, la frase sale en un BOCADILLO junto a la cara de quien habla (el «foco» del plano) */
      const fc = planoAct && conBurbujas(planoAct) && !l.cilindro && l.var !== '-' && !corteAct && !(planoEl && planoEl._recurso) && !escena.classList.contains('con-inter') ? focoDe(planoAct, l.quien) : null;   // en un corte (primer plano o plano recurso) no hay cara pequeña: texto abajo
      subt.classList.toggle('burbuja', !!fc);
      if (fc) {   // (Iago, 20-oct) el bocadillo NUNCA tapa la cara de quien habla: encima de la cabeza si cabe; si no, al lado (hacia el centro)
        const lb = ladoBurbuja(planoAct, fc, String(l.texto || ''), l.quien), lado = lb.lado;
        const lateral = lado === 'der' || lado === 'izq';
        subt.style.setProperty('--bx', fc[0]); subt.style.setProperty('--by', lateral ? fc[1] + lb.ym / 56.25 : fc[1]); subt.style.setProperty('--ax', fc[0] < .3 ? .16 : fc[0] > .7 ? .84 : .5);
        subt.style.setProperty('--dy', lb.dy.toFixed(2)); subt.style.setProperty('--dx', lb.dx.toFixed(2)); subt.dataset.lado = lado;
      }
      subt.classList.add('on');
      let voz = null;
      if (l.cilindro && !cilindroAct && B.sint && B.sint.cilindro) cilindroAct = B.sint.cilindro();
      const bus = l.cilindro && cilindroAct ? cilindroAct.entrada : B.bus.voz;
      if (l.voz && B.buf[l.voz]) { voz = B.suena(l.voz, { bus, vol: l.vol == null ? 1 : l.vol }); B.agacha(true); }
      B.arr(l.sfx).forEach(s => { if (B.buf[s.src]) B.suena(s.src, { t: B.ahora() + (s.t || 0), vol: s.vol == null ? .9 : s.vol }); else if (B.sint && B.sint.efecto) B.enTiempo(B.ahora() + (s.t || 0), () => B.sint.efecto(s.src), c); });
      let dur = (voz ? voz.dur : durTexto(l.texto)) + (o.extra || 0) + (l.espera || 0);   // l.espera: segundos de más tras la línea (p. ej. mientras suena una música que lanza la propia línea)
      if (o.max) dur = Math.min(dur, o.max);
      let hecho = false;
      /* (ronda 6b, Iago: «que tarde 3 segundos… para que pueda escucharlo») durante la espera de después de una frase, la música
         vuelve a su volumen (sin agachar): esa espera es para escucharla */
      if (voz && l.espera > 0) B.espera(voz.dur + .1, c).then(ok => { if (ok && !hecho) B.agacha(false); });
      const fin = (salto) => {
        if (hecho) return; hecho = true;
        if (saltable === adelanta) saltable = null;
        if (salto && voz) voz.parar(.08);
        if (voz) B.agacha(false);   // (ronda 5, Iago) el bocadillo y el subtítulo NO se quitan entre frase y frase: se quedan hasta que cambia el texto o el plano
        B.espera(.28, c).then(() => res(!(c && c.muerto)));
      };
      const adelanta = () => fin(true);
      if (!o.noSaltable) saltable = adelanta;
      B.espera(dur, c).then(ok => { if (!ok) { if (voz) voz.parar(.05); subt.classList.remove('on'); hecho = true; return res(false); } fin(false); });
      }
    });
  };

  M.cilindro = () => { if (!cilindroAct && B.sint && B.sint.cilindro) cilindroAct = B.sint.cilindro(); return cilindroAct; };
  M.paraCilindro = () => { if (cilindroAct) { cilindroAct.parar(); cilindroAct = null; } };

  /* ══════════ título del día y carta de Xan ══════════ */
  async function tituloDia(p, c) {
    const d = dia, ca = d.carta || {};
    /* la carta: por líneas (cada una con su voz, voz/dN/dN_c01.mp3…) o un texto con una sola voz */
    const porLineas = B.arr(ca.lineas).length > 0;
    const frases = porLineas ? ca.lineas.map(l => String(l.texto || '') + ' ') : (String(ca.texto || '').match(/[^.!?…]+[.!?…]*\s*/g) || []);
    cartaBox.innerHTML = '<div class="titulo-dia"><div class="td-n">ACTO ' + d.n + '</div><div class="td-t">' + B.esc(d.titulo) + '</div>' +
      '<div class="td-l">' + B.esc(d.lugar || '') + '</div><div class="td-f"><i></i><b></b><i></i></div></div>' +
      '<div class="papel"><div class="p-enc">' + B.esc(ca.encabezado || 'Nueva York, 1928') + '</div><div class="p-txt">' +
      frases.map(f => '<span>' + B.esc(f) + '</span>').join('') + '</div><div class="p-firma">' + B.esc(ca.firma || 'Xan') + '</div></div>';
    cartaBox.classList.add('on'); escena.classList.add('con-carta');
    let ok = await esperaSaltable(3.6, c); if (c.muerto) return;
    if (!frases.length) { cartaBox.classList.remove('on'); escena.classList.remove('con-carta'); return; }
    cartaBox.classList.add('leyendo');
    await B.espera(.9, c); if (c.muerto) return;
    const spans = B.$$('.p-txt span', cartaBox);
    let saltado = false, voz = null;
    saltable = () => { saltado = true; };
    if (porLineas) {
      for (let k = 0; k < spans.length && !saltado; k++) {
        const l = ca.lineas[k];
        spans[k].classList.add('on');
        voz = (l.voz && B.buf[l.voz]) ? B.suena(l.voz, { bus: B.bus.voz }) : null;
        if (voz) B.agacha(true);
        const t1 = B.ahora() + (voz ? voz.dur + .35 : durTexto(l.texto) * 1.15);
        while (B.ahora() < t1 && !saltado && !c.muerto) await B.espera(.05, c);
        if (voz) { if (saltado || c.muerto) voz.parar(.1); B.agacha(false); }
        if (c.muerto) return;
      }
    } else {
      if (ca.voz && B.buf[ca.voz]) { voz = B.suena(ca.voz, { bus: B.bus.voz }); B.agacha(true); }
      const total = voz ? voz.dur : durTexto(ca.texto) * 1.15;
      const largo = frases.reduce((a, f) => a + f.length, 0) || 1;
      for (let k = 0; k < spans.length; k++) {
        spans[k].classList.add('on');
        const t1 = B.ahora() + total * frases[k].length / largo;
        while (B.ahora() < t1 && !saltado && !c.muerto) await B.espera(.05, c);
        if (c.muerto) { if (voz) voz.parar(.05); return; }
        if (saltado) break;
      }
      if (voz) { if (saltado) voz.parar(.1); B.agacha(false); }
    }
    spans.forEach(s => s.classList.add('on'));
    $('.p-firma', cartaBox).classList.add('on');
    if (!saltado) await esperaSaltable(2.2, c); else await B.espera(.6, c);
    if (c.muerto) return;
    /* (21-oct, Iago) «carta.funde»: la carta NO se retira al acabar; se va con el plano, fundiéndose con el siguiente (en el acto 1,
       así no se ve al barco volviendo a Coruña, que la carta tapaba). La quita limpiaPlano al cambiar de plano, con su fundido. */
    if (ca.funde) return;
    cartaBox.classList.remove('on'); escena.classList.remove('con-carta');
    await B.espera(.7, c);
  }

  /* ══════════ interacciones ══════════ */
  M.interaccion = async function (it, c) {
    const f = B.inter[it.tipo];
    if (!f) { console.warn('Interacción sin módulo:', it.tipo); return; }
    ponVariante(null);
    subt.classList.remove('on');
    escena.classList.add('con-inter');
    escena.classList.toggle('subt-abajo', !!(f.subtAbajo || it.subtAbajo));   // (ronda 6, Iago) el alumno mira abajo, donde toca: el texto, ahí
    interBox.innerHTML = ''; interBox.classList.add('on');
    const caja = B.el('div', 'icaja i-' + it.tipo);
    caja.style.cssText = 'position:absolute;inset:0';
    interBox.appendChild(caja);
    const sub = B.control(); c.alMorir.push(() => sub.matar());
    const muerte = new Promise(r => sub.alMorir.push(r));
    try { await Promise.race([f(caja, Object.assign({}, it, { ctl: sub, plano: planoAct, dia: dia }), sub), muerte]); }
    catch (e) { console.error('Interacción', it.tipo, e); }
    sub.matar();
    if (planoEl && it.previa && planoEl._base === it.previa) { planoEl._base = null; ponVariante(null); }   // corte seco a la lámina de después
    if (c.muerto) return;
    interBox.classList.remove('on'); interBox.innerHTML = '';
    subt.classList.remove('on');
    escena.classList.remove('con-inter', 'subt-abajo');
  };

  /* ══════════ HECHO REAL ══════════ */
  let hechosTok = 0;
  function ponHechos(p) {
    hechosBox.innerHTML = '';
    hechosBox.classList.remove('recogido');
    const vistos = B.lee('blues5_hechos', {});
    const tok = ++hechosTok;
    const lista = B.arr(p.hechos).filter(id => (B.HECHOS || {})[id]);
    /* a los pocos segundos se recogen a su rombo (no tapan la lámina); al pasar el ratón, se despliegan */
    if (lista.length) setTimeout(() => { if (tok === hechosTok) hechosBox.classList.add('recogido'); }, 900 + lista.length * 500 + 6500);
    lista.forEach((id, k) => {
      const h = B.HECHOS[id];
      const chip = B.el('button', 'chip-hecho' + (vistos[id] ? ' visto' : ''), '<span class="rombo"></span><span class="txt">HECHO REAL · <b>' + B.esc(h.titulo) + '</b></span>');
      chip.setAttribute('aria-label', 'Hecho real: ' + h.titulo);
      chip.addEventListener('click', e => { e.stopPropagation(); M.abreHecho(id); chip.classList.add('visto'); });
      hechosBox.appendChild(chip);
      setTimeout(() => chip.classList.add('on'), 900 + k * 500);
    });
  }
  let pausaAntes = false;
  M.abreHecho = function (id) {
    const h = (B.HECHOS || {})[id]; if (!h) return;
    const v = B.lee('blues5_hechos', {}); v[id] = 1; B.guarda('blues5_hechos', v);
    pausaAntes = B.pausado; if (dia && !B.pausado) B.pausa(true);
    tarjeta.innerHTML = '<div class="tj"><button class="bt ico peq tj-x" data-tip="Cerrar (Esc)">✕</button><div class="tj-et">Hecho real' + (h.prov ? '<span class="tj-prov">texto provisional</span>' : '') + '</div>' +
      '<h3>' + B.esc(h.titulo) + '</h3><p>' + B.esc(h.texto) + '</p>' +
      (B.arr(h.fuente).length ? '<div class="tj-f">Fuente: ' + B.arr(h.fuente).map(f => '<a href="' + B.esc(f.url) + '" target="_blank" rel="noopener">' + B.esc(f.t) + '</a>').join(' · ') + '</div>' : '') + '</div>';
    tarjeta.querySelector('.tj-x').addEventListener('click', cierraTarjeta);
    tarjeta.classList.add('on');
  };
  function cierraTarjeta() { tarjeta.classList.remove('on'); tarjeta.innerHTML = ''; if (dia && !pausaAntes) B.pausa(false); }
  M.cierraTarjeta = cierraTarjeta;

  /* ══════════ fin del día ══════════ */
  function finDia() {
    if (!dia) return;
    const n = dia.n;
    limpiaPlano();
    B.progreso.dia(n);
    pintaPuntos();
    const f = $('#findia'); f.classList.remove('fin-historia'); clearTimeout(M._finH);
    const sig = B.DIAS[n + 1];
    /* (21-oct 19:51, Iago, vía C4) al acabar el acto 4: fundido a negro, «Fin de la historia principal» y vuelta sola a la portada,
       con el acto 5 ya abierto y marcado como «Bonus». Quitarlo: borrar este bloque (vuelve la tarjeta de siempre). */
    if (n === BONUS - 1 && sig) {
      f.innerHTML = '<div class="fd-caja"><div class="fd-et">BLUES · A CORUÑA · NUEVA YORK · 1928</div><div class="fd-tit">Fin de la historia principal</div>' +
        '<div class="fd-sig">Y ahora, el acto ' + BONUS + ' · <b>PRACTICA</b> · ' + B.esc(sig.titulo || TIT_DIA[BONUS]) + '</div>' +
        '<div class="fd-bt"><button class="bt prim" data-a="port">' + ICO.casa + ' Portada</button></div></div>';
      f.classList.add('fin-historia', 'on');
      const vuelve = () => { clearTimeout(M._finH); if (!f.classList.contains('fin-historia')) return; M._estrenaBonus = true; M.salir(); M.portada(); };
      f.querySelector('[data-a=port]').addEventListener('click', vuelve);
      M._finH = setTimeout(vuelve, 9000);
      return;
    }
    f.innerHTML = '<div class="fd-caja"><div class="fd-et">FIN DEL ACTO ' + n + '</div><div class="fd-tit">' + B.esc(dia.titulo) + '</div>' +
      '<div class="fd-sig">' + (sig ? 'Próxima sesión: Acto ' + (n + 1) + ' · ' + B.esc(sig.titulo) : 'Fin de la historia. La sala de práctica sigue abierta.') + '</div>' +
      '<div class="fd-bt"><button class="bt" data-a="port">' + ICO.casa + ' Portada</button>' +
      '<button class="bt" data-a="rep">Repetir el acto</button>' +
      (sig && HIT.abierto(n + 1) ? '<button class="bt prim" data-a="sig">Acto ' + (n + 1) + ' ' + ICO.play + '</button>' : sig ? '<span class="fd-cerrado">' + CANDADO + 'El acto ' + (n + 1) + ' se abre en clase</span>' : '') + '</div></div>';
    f.classList.add('on');
    f.querySelector('[data-a=port]').addEventListener('click', () => { M.salir(); M.portada(); });
    f.querySelector('[data-a=rep]').addEventListener('click', () => M.empezarDia(n, 0));
    const s = f.querySelector('[data-a=sig]'); if (s) s.addEventListener('click', () => M.empezarDia(n + 1, 0));
  }
  M.finDia = finDia;

  /* ══════════ avisos y rótulos ══════════ */
  M.aviso = function (html, seg) {
    const a = $('#aviso'); a.innerHTML = html; a.classList.add('on');
    clearTimeout(M._av); M._av = setTimeout(() => a.classList.remove('on'), (seg || 3) * 1000);
  };
  M.rotulo = function (txt) {
    const r = $('#rotulo'); r.innerHTML = ''; const d = B.el('div', 'rt'); d.textContent = txt; if (String(txt).length > 8) d.style.fontSize = 'calc(var(--u)*' + Math.max(5, 11 - (String(txt).length - 8) * .9).toFixed(1) + ')'; r.appendChild(d);
    setTimeout(() => { if (d.parentNode) d.remove(); }, 1700);
  };
})(window.BLUES);
