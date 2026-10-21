/* (Iago, 20-oct) los pájaros, SOLO en el cielo del fondo: nunca por delante de una cara.
 BLUES · vida de cada plano (js/vida.js). Posiciones en fracciones de la lámina: x, y de 0 a 1; r y w, fracción del ancho.
   Hechas mirando cada lámina (19-oct). Un plano sin entrada se queda quieto.
   (20-oct, reparto por actos) un fichero por acto: data/vida_d4.js es SOLO del acto 4. */
window.BLUES.VIDA = Object.assign(window.BLUES.VIDA || {}, {
  /* acto 4 · el porche en otoño: hojas que caen */
  'P4.1': [{ t: 'bruma', zona: [0, .1, 1, .95], alfa: 0.035 }, { t: 'tren' }, { t: 'polvo', n: 16, zona: [.45, .05, 1, .6] }],
  'P4.2': [{ t: 'bruma', zona: [0, .1, 1, .95], alfa: 0.035 }, { t: 'hojas', zona: [0, 0, 1, .9], n: 14 }, { t: 'polvo', n: 12, zona: [.1, .1, .7, .7] }],
  'P4.3': [{ t: 'bruma', zona: [0, .1, 1, .95], alfa: 0.035 }, { t: 'polvo', n: 18, zona: [.0, .0, .45, .7] }, { t: 'luz', x: .38, y: .2, r: .02, k: .6 }],
  'P4.4': [{ t: 'bruma', zona: [0, .1, 1, .95], alfa: 0.035 }, { t: 'polvo', n: 20, zona: [.2, .0, .9, .7] }],
  'P4.6': [{ t: 'bruma', zona: [0, .1, 1, .95], alfa: 0.035 }, { t: 'hojas', zona: [0, 0, 1, .95], n: 9 }, { t: 'polvo', n: 12, zona: [.2, .05, .8, .6] }],
  'P4.11': [{ t: 'bruma', zona: [0, .1, 1, .95], alfa: 0.035 }, { t: 'luz', x: .04, y: .2, r: .025, k: .9 }, { t: 'luz', x: .09, y: .4, r: .02, k: .8 }, { t: 'luz', x: .93, y: .26, r: .025, k: .8 }, { t: 'lluvia', n: 80, zona: [0, 0, .48, 1], alfa: .22 }],
  'P4.12': [{ t: 'bruma', zona: [0, .1, 1, .95], alfa: 0.035 }, { t: 'fuego', x: .03, y: .68, r: .15, k: 1, chispas: 8 }, { t: 'luz', x: .94, y: .47, r: .035, k: 1.1 }, { t: 'polvo', n: 10, tono: 'brasa', zona: [0, .3, .2, .9] },
            { t: 'lluvia', n: 40, zona: [.78, 0, .96, .33], alfa: .25 }],
  'P4.5': [{ t: 'bruma', zona: [0, .1, 1, .95], alfa: 0.035 }, { t: 'hojas', zona: [0, 0, 1, .95], n: 12 }, { t: 'polvo', n: 16, zona: [.2, .05, .8, .6] }],
  'P4.8': [{ t: 'bruma', zona: [0, .1, 1, .95], alfa: 0.035 }, { t: 'hojas', zona: [0, 0, 1, .95], n: 10 }, { t: 'polvo', n: 14, zona: [.15, .05, .85, .6] }],
  'P4.9': [{ t: 'bruma', zona: [0, .1, 1, .95], alfa: 0.035 }, { t: 'hojas', zona: [0, 0, 1, .95], n: 10 }, { t: 'polvo', n: 14, zona: [.15, .05, .85, .6] }],
  'P4.10': [{ t: 'bruma', zona: [0, .1, 1, .95], alfa: 0.035 }, { t: 'hojas', zona: [0, 0, 1, .95], n: 10 }, { t: 'luz', x: .19, y: .42, r: .03, k: .8 }, { t: 'polvo', n: 18, zona: [.15, .05, .9, .6] }],
  /* (C4, 20-oct) planos nuevos: P4.7 usa la lámina de P4.5; las llegadas (P4.7b, P4.8b, P4.9b) usan las de P4.8, P4.9 y P4.10;
     el final (P4.11a, P4.12b…P4.12i), uno por lámina: fuego, luces del quinqué y lluvia en su sitio de cada una */
  'P4.0': [{ t: 'bruma', zona: [0, .1, 1, .95], alfa: 0.035 }, { t: 'polvo', n: 14, zona: [.2, .1, .9, .6] }],
  'P4.7': [{ t: 'bruma', zona: [0, .1, 1, .95], alfa: 0.035 }, { t: 'hojas', zona: [0, 0, 1, .95], n: 12 }, { t: 'polvo', n: 14, zona: [.15, .05, .85, .6] }],
  'P4.7b': [{ t: 'bruma', zona: [0, .1, 1, .95], alfa: 0.035 }, { t: 'hojas', zona: [0, 0, 1, .95], n: 10 }, { t: 'polvo', n: 14, zona: [.15, .05, .85, .6] }],
  'P4.8b': [{ t: 'bruma', zona: [0, .1, 1, .95], alfa: 0.035 }, { t: 'hojas', zona: [0, 0, 1, .95], n: 10 }, { t: 'polvo', n: 14, zona: [.15, .05, .85, .6] }],
  'P4.9b': [{ t: 'bruma', zona: [0, .1, 1, .95], alfa: 0.035 }, { t: 'hojas', zona: [0, 0, 1, .95], n: 10 }, { t: 'luz', x: .19, y: .42, r: .03, k: .8 }, { t: 'polvo', n: 18, zona: [.15, .05, .9, .6] }],
  'P4.11a': [{ t: 'bruma', zona: [0, .1, 1, .95], alfa: 0.035 }, { t: 'lluvia', n: 110, zona: [0, 0, 1, 1], alfa: .2 }, { t: 'luz', x: .14, y: .14, r: .02, k: .8 }],
  'P4.12b': [{ t: 'bruma', zona: [0, .1, 1, .95], alfa: 0.035 }, { t: 'luz', x: .06, y: .3, r: .05, k: .9 }, { t: 'polvo', n: 8, tono: 'brasa', zona: [0, 0, .15, .9] }],
  'P4.12c': [{ t: 'bruma', zona: [0, .1, 1, .95], alfa: 0.035 }, { t: 'luz', x: .23, y: .2, r: .04, k: .9 }, { t: 'luz', x: .97, y: .12, r: .03, k: 1 }],
  'P4.12d': [{ t: 'bruma', zona: [0, .1, 1, .95], alfa: 0.035 }, { t: 'luz', x: .88, y: .13, r: .03, k: 1 }, { t: 'lluvia', n: 40, zona: [.38, 0, .72, .3], alfa: .25 }],
  'P4.12e': [{ t: 'bruma', zona: [0, .1, 1, .95], alfa: 0.035 }, { t: 'fuego', x: .03, y: .78, r: .09, k: 1, chispas: 5 }, { t: 'luz', x: .955, y: .73, r: .03, k: 1.1 }, { t: 'lluvia', n: 50, zona: [.7, 0, 1, .55], alfa: .25 }],
  'P4.12f': [{ t: 'bruma', zona: [0, .1, 1, .95], alfa: 0.035 }, { t: 'fuego', x: .03, y: .68, r: .15, k: 1, chispas: 8 }, { t: 'luz', x: .94, y: .47, r: .035, k: 1.1 }, { t: 'polvo', n: 10, tono: 'brasa', zona: [0, .3, .2, .9] }, { t: 'lluvia', n: 40, zona: [.78, 0, .96, .33], alfa: .25 }],
  'P4.12g': [{ t: 'bruma', zona: [0, .1, 1, .95], alfa: 0.035 }, { t: 'fuego', x: .35, y: .66, r: .2, k: 1, chispas: 14 }, { t: 'polvo', n: 14, tono: 'brasa', zona: [.1, .3, .6, .9] }],
  'P4.12h': [{ t: 'bruma', zona: [0, .1, 1, .95], alfa: 0.035 }, { t: 'hojas', zona: [0, 0, 1, .95], n: 10 }, { t: 'luz', x: .19, y: .42, r: .03, k: .8 }, { t: 'polvo', n: 18, zona: [.15, .05, .9, .6] }],
  'P4.12i': [{ t: 'bruma', zona: [0, .1, 1, .95], alfa: 0.035 }, { t: 'fuego', x: .03, y: .65, r: .08, k: 1, chispas: 4 }, { t: 'luz', x: .965, y: .5, r: .03, k: 1.1 }, { t: 'lluvia', n: 40, zona: [.78, 0, .98, .28], alfa: .25 }],
});

/* (C4, 20-oct; Iago: «que a través de las ventanas se produzca ese movimiento, para que dé la sensación de que el tren se mueve»)
   PAISAJE QUE PASA por las ventanas del tren: la lámina p4_1 lleva las ventanas transparentes (alfa) y por detrás corre, en bucle,
   una vista larga de los tejados de Brooklyn. Efecto { t: 'paisaje', src, alto (fracción del alto del plano), dur (s por vuelta), blur (px) }.
   Envuelve B.vida.pon sin tocar js/vida.js (común). Si C1 lo quiere para otros actos, puede pasarlo tal cual a vida.js. */
(function (B) {
  const V = B.vida; if (!V || V._paisajeC4) return; V._paisajeC4 = true;
  const pon = V.pon, vivos = new Set();
  const limpia = () => vivos.forEach(a => { const t = a.effect && a.effect.target; if (!t || !t.isConnected) { try { a.cancel(); } catch (e) { } vivos.delete(a); } });
  V.pon = function (el, cfg) {
    pon.apply(this, arguments);
    const o = (cfg || []).find(x => x && x.t === 'paisaje'); if (!o || !el) return;
    limpia();
    const kb = el.querySelector('.kb') || el, r = (B.motor && B.motor.resImg) ? B.motor.resImg(o.src) : o.src;
    const url = (B.img && (B.img[r] || B.img[o.src])) || r;
    const caja = document.createElement('div'); caja.className = 'c4-paisaje';
    caja.style.cssText = 'position:absolute;left:0;top:0;width:100%;height:' + ((o.alto || .6) * 100) + '%;overflow:hidden;pointer-events:none' + (o.blur ? ';filter:blur(' + o.blur + 'px)' : '');
    const cinta = document.createElement('div'); cinta.style.cssText = 'position:absolute;left:0;top:0;height:100%;display:flex;will-change:transform';
    for (let i = 0; i < 2; i++) { const im = document.createElement('img'); im.src = url; im.alt = ''; im.draggable = false; im.style.cssText = 'height:100%;width:auto;max-width:none;display:block;flex:none'; cinta.appendChild(im); }
    caja.appendChild(cinta); kb.insertBefore(caja, kb.firstChild);
    const an = cinta.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-50%)' }], { duration: (o.dur || 18) * 1000, iterations: Infinity });
    if (B.pausado) an.pause(); vivos.add(an);
  };
  (B.alPausar = B.alPausar || []).push(on => { limpia(); vivos.forEach(a => { try { on ? a.pause() : a.play(); } catch (e) { } }); });
  /* (Iago, 15:18) en la cocina (la vuelta) la lluvia de la ventana se veía por dentro: fuera la lluvia de todos los planos P4.12… */
  Object.keys(B.VIDA).forEach(k => { if (/^P4\.12/.test(k)) B.VIDA[k] = B.VIDA[k].filter(o => o.t !== 'lluvia'); });
  B.VIDA['P4.1'] = (B.VIDA['P4.1'] || []).concat([{ t: 'paisaje', src: 'img/d4/p4_1_paisaje.webp', alto: .6, dur: 18, blur: 0 }]);
})(window.BLUES);
