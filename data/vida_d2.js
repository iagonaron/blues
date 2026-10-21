/* BLUES · vida de cada plano (js/vida.js). Posiciones en fracciones de la lámina: x, y de 0 a 1; r y w, fracción del ancho.
   Hechas mirando cada lámina (19-oct; acto 2 repasado por C2 el 20-oct: todos los planos con vida). Un plano sin entrada se queda quieto.
   (20-oct, reparto por actos) un fichero por acto: data/vida_d2.js es SOLO del acto 2. */
window.BLUES.VIDA = Object.assign(window.BLUES.VIDA || {}, {
  /* acto 2 · estación de Nueva Orleans: lámparas, humo de la locomotora del fondo, reflejos en el andén mojado */
  /* (Iago, 20-oct 13:55: «anima el humo del tren… humo negro por encima y algo en el cielo; vida en los fondos, partículas, nubes sutiles») */
  /* (Iago, 14:28) el tren mira a la IZQUIERDA (lámina volteada) para que la carta, a la derecha, no tape la locomotora: el humo corre hacia la derecha */
  'P2.0': [{ t: 'humo', x: .155, y: .5, w: .028, dir: [1, -.35], vel: .05, dens: 1.6, alfa: .5, color: 'oscuro' }, { t: 'humo', x: .165, y: .49, w: .02, dir: [1, -.5], vel: .035, dens: 1, alfa: .3, color: 'oscuro' },
           { t: 'bruma', zona: [0, 0, 1, .38], alfa: 0.08, n: 6 }, { t: 'luz', x: .8, y: .5, r: .05, k: .55 }, { t: 'polvo', n: 20, zona: [.4, .35, .95, .8] }],
  'P2.1': [{ t: 'bruma', zona: [0, .05, 1, .7], alfa: 0.03 }, { t: 'luz', x: .062, y: .115, r: .02, k: .9 }, { t: 'luz', x: .243, y: .14, r: .02, k: .9 }, { t: 'luz', x: .445, y: .09, r: .018, k: .8 },
           { t: 'humo', x: .565, y: .06, w: .03, dir: [.25, -1], vel: .04, dens: 1.4, alfa: .38, color: 'oscuro' }, { t: 'bruma', zona: [.3, 0, .75, .25], alfa: 0.06, n: 4 }, { t: 'brillos', zona: [.28, .72, .62, .98], n: 4 }],
  /* el vagón de equipajes (P2.2–P2.6): traqueteo, sombras de postes, farol que se balancea, polvo en la luz */
  'P2.2': [{ t: 'bruma', zona: [0, 0, 1, .35], alfa: 0.05, color: 'oscuro', n: 5 }, { t: 'bruma', zona: [0, .1, 1, .95], alfa: 0.035 }, { t: 'tren' }, { t: 'polvo', n: 24, zona: [.14, 0, .48, .62] }, { t: 'farol', x: .615, y: .05, r: .045, k: 1, amp: .006 }],
  'P2.3': [{ t: 'bruma', zona: [0, 0, 1, .35], alfa: 0.05, color: 'oscuro', n: 5 }, { t: 'bruma', zona: [0, .1, 1, .95], alfa: 0.035 }, { t: 'tren' }, { t: 'farol', x: .047, y: .07, r: .04, k: 1, amp: .006 }, { t: 'polvo', n: 16, zona: [.82, 0, 1, .45] }],
  'P2.4': [{ t: 'bruma', zona: [0, 0, 1, .35], alfa: 0.05, color: 'oscuro', n: 5 }, { t: 'bruma', zona: [0, .1, 1, .95], alfa: 0.035 }, { t: 'tren' }, { t: 'farol', x: .176, y: .065, r: .04, k: 1, amp: .006 }, { t: 'polvo', n: 18, zona: [.44, 0, .56, .5] }],
  'P2.5': [{ t: 'bruma', zona: [0, 0, 1, .35], alfa: 0.05, color: 'oscuro', n: 5 }, { t: 'bruma', zona: [0, .1, 1, .95], alfa: 0.035 }, { t: 'tren' }, { t: 'farol', x: .945, y: .16, r: .04, k: 1, amp: .005 }, { t: 'luz', x: .705, y: .13, r: .018, k: .8 }, { t: 'polvo', n: 12, zona: [.08, 0, .3, .3] }],
  'P2.6': [{ t: 'bruma', zona: [0, 0, 1, .35], alfa: 0.05, color: 'oscuro', n: 5 }, { t: 'bruma', zona: [0, .1, 1, .95], alfa: 0.035 }, { t: 'tren' }, { t: 'polvo', n: 20, zona: [.1, 0, .45, .6] }, { t: 'farol', x: .585, y: .06, r: .04, k: 1, amp: .006 }],
  /* Washington: el tren parado (sin traqueteo); farol del vagón y polvo en la luz de la estación */
  'P2.7': [{ t: 'bruma', zona: [0, .1, 1, .95], alfa: 0.035 }, { t: 'bruma', zona: [.72, 0, 1, .55], alfa: 0.06, n: 4 }, { t: 'farol', x: .135, y: .1, r: .035, k: 1, amp: .004 }, { t: 'polvo', n: 14, zona: [.7, .05, 1, .8] }, { t: 'luz', x: .905, y: .23, r: .015, k: .8 }],
  'P2.2a': [{ t: 'bruma', zona: [0, 0, 1, .35], alfa: 0.05, color: 'oscuro', n: 5 }, { t: 'bruma', zona: [0, .1, 1, .95], alfa: 0.035 }, { t: 'polvo', n: 24, zona: [.14, 0, .48, .62] }, { t: 'farol', x: .615, y: .05, r: .045, k: 1, amp: .006 }],   // (14:33) igual que el interior (P2.2): al acabar la puerta ya se ve el vagón
  'P2.8a': [{ t: 'bruma', zona: [0, .1, 1, .95], alfa: 0.035 }, { t: 'bruma', zona: [0, 0, 1, .35], alfa: 0.05, color: 'oscuro', n: 5 }, { t: 'tren' }, { t: 'farol', x: .11, y: .1, r: .035, k: 1, amp: .005 }],
  'P2.8': [{ t: 'bruma', zona: [0, 0, 1, .35], alfa: 0.05, color: 'oscuro', n: 5 }, { t: 'bruma', zona: [.77, .24, .96, .42], alfa: 0.07, n: 3 }, { t: 'bruma', zona: [0, .1, 1, .95], alfa: 0.035 }, { t: 'tren' }, { t: 'farol', x: .11, y: .1, r: .035, k: 1, amp: .005 }, { t: 'brillos', zona: [.76, .25, .96, .66], n: 5 }],
  'P2.9': [{ t: 'bruma', zona: [0, .1, 1, .95], alfa: 0.035 }, { t: 'brillos', zona: [.55, .1, 1, .28], n: 8 }, { t: 'luz', x: .55, y: .06, r: .025, k: .9 }, { t: 'lluvia', n: 75, zona: [.25, 0, 1, 1], alfa: .14 }],
});
