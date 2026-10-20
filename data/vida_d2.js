/* (Iago, 20-oct) los pájaros, SOLO en el cielo del fondo: nunca por delante de una cara.
 BLUES · vida de cada plano (js/vida.js). Posiciones en fracciones de la lámina: x, y de 0 a 1; r y w, fracción del ancho.
   Hechas mirando cada lámina (19-oct). Un plano sin entrada se queda quieto.
   (20-oct, reparto por actos) un fichero por acto: data/vida_d2.js es SOLO del acto 2. */
window.BLUES.VIDA = Object.assign(window.BLUES.VIDA || {}, {
  /* acto 2 · el vagón (lámina de prueba; al llegar la nueva, revisar posiciones): traqueteo, sombras de postes, polvo en la luz */
  'P2.2': [{ t: 'bruma', zona: [0, .1, 1, .95], alfa: 0.035 }, { t: 'tren' }, { t: 'polvo', n: 24, zona: [.14, 0, .48, .62] }, { t: 'farol', x: .615, y: .05, r: .045, k: 1, amp: .006 }],
  'P2.6': [{ t: 'bruma', zona: [0, .1, 1, .95], alfa: 0.035 }, { t: 'tren' }, { t: 'polvo', n: 20, zona: [.1, 0, .45, .6] }, { t: 'farol', x: .585, y: .06, r: .04, k: 1, amp: .006 }],
  'P2.8': [{ t: 'bruma', zona: [0, .1, 1, .95], alfa: 0.035 }, { t: 'tren' }, { t: 'farol', x: .11, y: .1, r: .035, k: 1, amp: .005 }, { t: 'brillos', zona: [.76, .25, .96, .66], n: 5 }],
  'P2.9': [{ t: 'bruma', zona: [0, .1, 1, .95], alfa: 0.035 }, { t: 'brillos', zona: [.55, .1, 1, .28], n: 8 }, { t: 'luz', x: .55, y: .06, r: .025, k: .9 }, { t: 'lluvia', n: 50, zona: [.4, 0, 1, 1], alfa: .12 }],
  'P2.7': [{ t: 'bruma', zona: [0, .1, 1, .95], alfa: 0.035 }, { t: 'farol', x: .135, y: .1, r: .035, k: 1, amp: .004 }, { t: 'sinvapor', x: .82, y: .5, dir: [.1, -1], cada: 6 }, { t: 'polvo', n: 14, zona: [.7, .05, 1, .8] }],
});
