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
    escena.classList.remove('arrancando');
    M.portada();
  };

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
      '<span class="ct-puntos"></span>' +
      '<button class="bt ico peq" data-a="pant" data-tip="Pantalla completa (F)">' + ICO.pant + '</button>';
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
  const TIT_DIA = { 1: 'A nana de Xan', 2: 'Músicos callejeros', 3: 'Glamour y decepción', 4: 'El blues de John', 5: 'A Jam no porche' };   // títulos de Iago (19-oct; el 4, «El blues de John» desde el 20-oct)
  M.portada = function () {
    dia = null; idx = -1;
    escena.classList.add('en-portada'); escena.classList.remove('precargando', 'sin-cursor');
    $('#findia').classList.remove('on');
    const pr = B.progreso.leer();
    const p = $('#portada');
    /* (19-oct, punto 54) el acto 5 ya visto entra DIRECTO en la sala de práctica (los alumnos lo usan para practicar en casa) */
    const d5 = B.DIAS[5], iPrac = d5 ? d5.planos.findIndex(q => B.arr(q.inter).some(x => x && x.tipo === 'practica')) : -1;
    const vio5 = iPrac > 0 && !!(pr.dias[5] || pr.planos[d5.planos[iPrac].id]);
    let h = '<div class="sol-deco"></div><div class="port-marco"></div>' +
      '<div class="port-cab"><div class="port-ano">A CORUÑA · NUEVA YORK · 1928</div>' +
      '<h1 class="port-tit">BLUES</h1>' +
      '<div class="port-sub">Unidad 5 · El blues y el cifrado americano</div>' +
      '<div class="port-fil"><i></i><b></b><i></i></div></div><div class="billetes">';
    for (let n = 1; n <= 5; n++) {
      const d = B.DIAS[n] || { titulo: TIT_DIA[n], lugar: '' };
      const sigue = pr.ultimo && pr.ultimo.dia === n && !pr.dias[n];
      h += '<button class="billete' + (pr.dias[n] ? ' hecho' : '') + (sigue ? ' sigue' : '') + '" data-dia="' + n + '" style="--bc:' + COLOR_DIA[n] + '">' +
        '<div class="bi-papel"><div class="bi-banda">' + EMBLEMA[n] + '</div>' +
        '<div class="bi-cuerpo"><div class="bi-dia">ACTO ' + n + '</div><div class="bi-tit">' + B.esc(d.titulo || TIT_DIA[n]) + '</div>' +
        '<div class="bi-lug">' + B.esc(d.lugar || '') + '</div></div>' +
        '<div class="bi-perf"></div><div class="bi-talon"><div class="bi-adm">ADMITE UNO</div><div class="bi-num">Nº 1928·0' + n + '</div></div>' +
        '<div class="bi-sello">' + (n === 5 && vio5 ? 'A PRACTICAR' : 'VISTO') + '</div></div></button>';
    }
    h += '</div><div class="port-pie">';
    if (pr.ultimo && B.DIAS[pr.ultimo.dia] && !(pr.ultimo.fin === 5)) {
      const u = pr.ultimo, d = B.DIAS[u.dia];
      h += '<button class="bt prim" id="continuar">' + ICO.play + ' Continuar · Acto ' + u.dia + (u.plano ? ', ' + (d.planos[u.plano] ? d.planos[u.plano].id : '') : '') + '</button>';
    } else h += '<span class="port-nota">Elige un acto · Espacio para seguir · P pausa · F pantalla completa</span>';
    h += '</div>';
    p.innerHTML = h;
    B.$$('.billete', p).forEach(b => b.addEventListener('click', () => { B.ac(); const n = +b.dataset.dia; M.empezarDia(n, n === 5 && vio5 ? iPrac : 0, n === 5 && vio5); }));
    const c = $('#continuar', p);
    if (c) c.addEventListener('click', () => { B.ac(); const u = B.progreso.leer().ultimo; M.empezarDia(u.dia, u.plano || 0); });
    /* ambiente suave de portada, al primer clic */
    const amb = () => {
      p.removeEventListener('pointerdown', amb);
      B.ac();
      if (!escena.classList.contains('en-portada')) return;
      if (B.existe('mus/portada.mp3')) B.precarga(['mus/portada.mp3']).then(() => { if (escena.classList.contains('en-portada')) B.musica({ src: 'mus/portada.mp3', vol: .5, bucle: true }); });
      else if (B.sint && !M._crepita) M._crepita = B.sint.crepitar(.5);
    };
    p.addEventListener('pointerdown', amb);
    if (B.hayAudio() && !M._crepita && B.sint && !B.existe('mus/portada.mp3')) M._crepita = B.sint.crepitar(.5);
  };
  function paraPortada() { if (M._crepita) { M._crepita.parar(); M._crepita = null; } B.musica(null); }

  /* ══════════ empezar un día: precarga y primer plano ══════════ */
  let directoA = -1;   // (punto 54) plano en el que se entra directo a la interacción (sin intro ni frases)
  M.empezarDia = async function (n, desde, directo) {
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
    if (B.banda && B.banda.rutas && d.banda) r.push.apply(r, B.banda.rutas(d.banda));
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
    escena.classList.remove('con-inter');
    $('#rotulo').innerHTML = '';
  }
  M.salir = function (sinPortada) {
    limpiaPlano();
    B.silencioTotal();
    hechosBox.innerHTML = '';
    $('#findia').classList.remove('on');
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
    const p = dia.planos[i]; planoAct = p;
    const directo = directoA === i; directoA = -1;
    const c = ctl = B.control();
    montaPlano(p);
    B.ambiente(p.amb || []);
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
    ponVariante(null);
    B.progreso.plano(dia.n, i, p.id); pintaPuntos();
    const ok = await esperaSaltable(p.espera == null ? 1.4 : p.espera, c);
    if (c.muerto) return;
    if (i + 1 < dia.planos.length) correPlano(i + 1); else finDia();
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

  /* montar la imagen del plano: maestra + variantes (o el provisional) */
  function montaPlano(p) {
    const viejo = planoEl;
    const el = B.el('div', 'plano');
    const kbEl = B.el('div', 'kb');
    el.appendChild(kbEl);
    const rM = rutaImg(p);
    if (B.img[rM]) {
      const im = B.el('img', 'lam maestra'); im.src = B.img[rM]; im.alt = p.desc || p.id; im.draggable = false; kbEl.appendChild(im);
      Object.keys(p.var || {}).forEach(q => {
        const r = rutaVar(p, q);
        if (B.img[r]) { const v = B.el('img', 'lam var'); v.src = B.img[r]; v.dataset.q = q; v.alt = ''; v.draggable = false; kbEl.appendChild(v); }
      });
    } else kbEl.appendChild(provisional(p, rM));
    pelicula.appendChild(el);
    if (B.vida && B.VIDA) B.vida.pon(el, B.VIDA[p.id]);   // (Iago, 19-oct) fuego, luces, humo, pájaros… (js/vida.js + data/vida.js)
    void el.offsetWidth; el.classList.add('on');
    if (viejo) { viejo.classList.remove('on'); setTimeout(() => viejo.remove(), 1000); }
    planoEl = el; el._kb = kbEl;
    const ip = B.arr(p.inter).find(it => it && it.previa && kbEl.querySelector('.lam.var[data-q="' + it.previa + '"]'));
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
    B.$$('.lam.var', planoEl).forEach(v => v.classList.toggle('on', base ? v.dataset.q === base : (!!q && v.dataset.q === q)));
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
  const conBurbujas = p => !!(p.foco && (Object.keys(p.foco).length >= 3 || /^P[45]\./.test(p.id)));
  const focoDe = (p, q) => (p.foco && p.foco[q]) || (p.var && p.var[q] && p.var[q].foco) || null;
  /* (20-oct) dónde va el bocadillo: se prueban encima, a los lados y debajo, y gana el que menos tapa CUALQUIER cara del
     plano (no solo la de quien habla) y no se sale de la pantalla. Medidas en --u (ancho 100, alto 56,25), como el CSS. */
  function ladoBurbuja(p, fc, texto, quien) {
    const n = texto.length, lineas = Math.min(4, Math.ceil(n / 34)), H = 3.4 + lineas * 2.15, W = n <= 34 ? Math.max(12, n * 1.02 + 3) : 38;
    const X = fc[0] * 100, Y = fc[1] * 56.25, ax = fc[0] < .3 ? .16 : fc[0] > .7 ? .84 : .5;
    const caras = Object.keys(p.foco || {}).map(k => { const f = p.foco[k]; return [f[0] * 100 - 5.5, f[1] * 56.25 - 6.5, f[0] * 100 + 5.5, f[1] * 56.25 + 5.5]; });
    const rect = { arriba: [X - ax * W, Y - 7 - H, X + (1 - ax) * W, Y - 7], der: [X + 6.6, Y - .58 * H, X + 6.6 + W, Y + .42 * H],
                   izq: [X - 6.6 - W, Y - .58 * H, X - 6.6, Y + .42 * H], abajo: [X - ax * W, Y + 3.6, X + (1 - ax) * W, Y + 3.6 + H] };
    const corte = (a, b) => Math.max(0, Math.min(a[2], b[2]) - Math.max(a[0], b[0])) * Math.max(0, Math.min(a[3], b[3]) - Math.max(a[1], b[1]));
    const fuera = r => (r[2] - r[0]) * (r[3] - r[1]) - corte(r, [1, 1, 99, 55.25]);
    const orden = ['arriba', fc[0] < .5 ? 'der' : 'izq', fc[0] < .5 ? 'izq' : 'der', 'abajo'];
    let mejor = orden[0], coste = Infinity;
    orden.forEach((k, i) => { const r = rect[k]; const c = fuera(r) * 6 + caras.reduce((a, f) => a + corte(r, f), 0) * 3 + i * 4; if (c < coste) { coste = c; mejor = k; } });
    return mejor;
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
  M.di = function (l, c, o) {
    o = o || {};
    return new Promise(res => {
      if (!l || (c && c.muerto)) return res(false);
      if (l.atril) ponAtril(l.atril);
      const P = B.personaje(l.quien);
      const v = l.var !== undefined ? l.var : l.quien;
      ponVariante(v && v !== '-' ? v : null);
      $('.subt-quien', subt).textContent = P.nombre;
      subt.style.setProperty('--c', P.color);
      $('.subt-texto', subt).textContent = l.texto || '';
      /* (punto 28) en escenas de grupo, la frase sale en un BOCADILLO junto a la cara de quien habla (el «foco» del plano) */
      const fc = planoAct && conBurbujas(planoAct) && !l.cilindro && l.var !== '-' && !escena.classList.contains('con-inter') ? focoDe(planoAct, l.var && l.var !== l.quien ? l.var : l.quien) : null;   // un corte a otro encuadre (AMOS_CERCA…) no usa la cara de la maestra: subtítulo abajo
      subt.classList.toggle('burbuja', !!fc);
      if (fc) {   // (Iago, 20-oct) el bocadillo NUNCA tapa la cara de quien habla: encima de la cabeza si cabe; si no, al lado (hacia el centro)
        const lado = ladoBurbuja(planoAct, fc, String(l.texto || ''), l.quien);
        subt.style.setProperty('--bx', fc[0]); subt.style.setProperty('--by', fc[1]); subt.style.setProperty('--ax', fc[0] < .3 ? .16 : fc[0] > .7 ? .84 : .5); subt.dataset.lado = lado;
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
      const fin = (salto) => {
        if (hecho) return; hecho = true;
        if (saltable === adelanta) saltable = null;
        if (salto && voz) voz.parar(.08);
        if (voz) B.agacha(false);
        subt.classList.remove('on');
        B.espera(.28, c).then(() => res(!(c && c.muerto)));
      };
      const adelanta = () => fin(true);
      if (!o.noSaltable) saltable = adelanta;
      B.espera(dur, c).then(ok => { if (!ok) { if (voz) voz.parar(.05); subt.classList.remove('on'); hecho = true; return res(false); } fin(false); });
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
    cartaBox.classList.remove('on'); escena.classList.remove('con-carta');
    await B.espera(.7, c);
  }

  /* ══════════ interacciones ══════════ */
  M.interaccion = async function (it, c) {
    const f = B.inter[it.tipo];
    if (!f) { console.warn('Interacción sin módulo:', it.tipo); return; }
    ponVariante(null);
    escena.classList.add('con-inter');
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
    escena.classList.remove('con-inter');
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
    const f = $('#findia');
    const sig = B.DIAS[n + 1];
    f.innerHTML = '<div class="fd-caja"><div class="fd-et">FIN DEL ACTO ' + n + '</div><div class="fd-tit">' + B.esc(dia.titulo) + '</div>' +
      '<div class="fd-sig">' + (sig ? 'Próxima sesión: Acto ' + (n + 1) + ' · ' + B.esc(sig.titulo) : 'Fin de la historia. La sala de práctica sigue abierta.') + '</div>' +
      '<div class="fd-bt"><button class="bt" data-a="port">' + ICO.casa + ' Portada</button>' +
      '<button class="bt" data-a="rep">Repetir el acto</button>' +
      (sig ? '<button class="bt prim" data-a="sig">Acto ' + (n + 1) + ' ' + ICO.play + '</button>' : '') + '</div></div>';
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
