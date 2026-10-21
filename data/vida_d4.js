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

/* (C4, 21-oct; Iago, 19:25) sin paisaje en movimiento por las ventanas del tren («se ve recortado»): basta el traqueteo del vagón.
   (Iago, 20-oct 15:18) en la cocina (la vuelta) la lluvia de la ventana se veía por dentro: fuera la lluvia de todos los planos P4.12… */
(function (B) {
  Object.keys(B.VIDA).forEach(k => { if (/^P4\.12/.test(k)) B.VIDA[k] = B.VIDA[k].filter(o => o.t !== 'lluvia'); });
  /* (Iago, 21-oct 19:33) vida TAMBIÉN en un primer plano: { t: 'enCorte', q: '<variante>', fx: [efectos] } pinta esos efectos solo
     mientras se ve esa lámina (el motor apaga la vida del plano general en los cortes). Envuelve B.vida.pon sin tocar js/vida.js. */
  const V = B.vida;
  if (V && !V._corteC4) {
    V._corteC4 = true;
    const pon = V.pon;
    V.pon = function (el, cfg) {
      const cs = (cfg || []).filter(o => o && o.t === 'enCorte');
      pon.call(this, el, (cfg || []).filter(o => !(o && o.t === 'enCorte')));
      cs.forEach(o => {
        const caja = document.createElement('div'); caja.style.cssText = 'position:absolute;inset:0;pointer-events:none';
        el.appendChild(caja); pon.call(this, caja, o.fx || []);
        const cv = caja.querySelectorAll('canvas');
        const mira = () => { if (!caja.isConnected) return; const on = el._vis === o.q; cv.forEach(c => { c.style.opacity = on ? '1' : '0'; }); requestAnimationFrame(mira); };
        mira();
      });
    };
  }
  /* el primer plano de las manos en el acordeón mientras Xan toca la nana: hojas que caen y polvo en la luz */
  B.VIDA['P4.5'] = (B.VIDA['P4.5'] || []).concat([{ t: 'enCorte', q: 'RECURSO_TECLAS', fx: [{ t: 'hojas', zona: [0, 0, 1, .95], n: 14 }, { t: 'polvo', n: 16, zona: [.1, .05, .9, .7] }] }]);
})(window.BLUES);
