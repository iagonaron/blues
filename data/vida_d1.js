/* (Iago, 20-oct) los pájaros, SOLO en el cielo del fondo: nunca por delante de una cara.
 BLUES · vida de cada plano (js/vida.js). Posiciones en fracciones de la lámina: x, y de 0 a 1; r y w, fracción del ancho.
   Hechas mirando cada lámina (19-oct). Un plano sin entrada se queda quieto.
   (20-oct, reparto por actos) un fichero por acto: data/vida_d1.js es SOLO del acto 1. */
window.BLUES.VIDA = Object.assign(window.BLUES.VIDA || {}, {
  'P1.0': [{ t: 'bruma', zona: [0, .5, 1, 1], alfa: .06 }, { t: 'faro', x: .236, y: .108, r: .03, periodo: 6 }, { t: 'sinpajaros', zona: [0, .04, .6, .18], n: 3, tam: .009 },
           { t: 'brillos', zona: [.4, .55, 1, .85], n: 5 }],
  'P1.1': [{ t: 'bruma', zona: [0, 0, .55, .75], alfa: .045 }, { t: 'fuego', x: .02, y: .63, r: .2, k: 1 }, { t: 'luz', x: .968, y: .41, r: .045, k: 1.15 },
           { t: 'polvo', n: 14, zona: [.55, .15, 1, .8] }],
  'P1.2': [{ t: 'bruma', zona: [0, 0, .5, .7], alfa: .04 }, { t: 'fuego', x: .02, y: .38, r: .16, k: .8 }, { t: 'luz', x: .923, y: .6, r: .05, k: 1.15 },
           { t: 'polvo', n: 12, zona: [.6, .25, 1, .9] }],
  'P1.3': [{ t: 'bruma', zona: [0, .15, 1, .8], alfa: .055 }, { t: 'humo', x: .64, y: .05, w: .04, dir: [-.35, -1], dens: .7, alfa: .26 }, { t: 'sinpajaros', zona: [0, .01, .54, .09], n: 2, tam: .008 }],   // (21-oct, Iago) lámina volteada: el barco a la derecha, como en los planos siguientes
  'P1.4': [{ t: 'bruma', zona: [0, .15, 1, .8], alfa: .055 }, { t: 'humo', x: .565, y: .1, w: .05, dir: [.25, -1], dens: .9, color: 'oscuro', alfa: .3 }, { t: 'sinpajaros', zona: [0, .01, .42, .08], n: 2, tam: .008 }],
  'P1.4b': [{ t: 'bruma', zona: [0, .1, 1, .8], alfa: .055 }, { t: 'sinpajaros', zona: [0, 0, .35, .12], n: 3, tam: .009 }, { t: 'humo', x: .32, y: .03, w: .03, dir: [.3, -1], dens: .7, color: 'oscuro', alfa: .3 }],
  'P1.4c': [{ t: 'bruma', zona: [0, 0, 1, 1], alfa: .06, color: 'oscuro' }, { t: 'sinvapor', x: .6, y: .5, dir: [0, -1], cada: 4 }, { t: 'luz', x: .6, y: .52, r: .06, k: 1.1, tint: 1.5 }, { t: 'polvo', n: 10, tono: 'brasa', zona: [.5, .3, .72, .7] }],
  'P1.5': [{ t: 'bruma', zona: [0, 0, 1, 1], alfa: .075, n: 9 }, { t: 'fuego', x: .05, y: .34, r: .22, k: 1.2, chispas: 16 }, { t: 'sinvapor', x: .575, y: .24, dir: [.2, -1], cada: 5 },
           { t: 'luz', x: .61, y: .17, r: .02, k: .8, tint: 2 }, { t: 'polvo', n: 16, tono: 'brasa' }],
  'P1.6': [{ t: 'bruma', zona: [0, 0, 1, 1], alfa: .07, n: 8 }, { t: 'fuego', x: .04, y: .22, r: .17, k: 1.05, chispas: 8 }, { t: 'fuego', x: .72, y: .16, r: .12, k: .7 },
           { t: 'polvo', n: 14, tono: 'brasa' }],
  'P1.7': [{ t: 'bruma', zona: [0, .4, 1, 1], alfa: .05 }, { t: 'luz', x: .06, y: .34, r: .035, k: 1 }, { t: 'brillos', zona: [.78, .45, 1, .95], n: 4, tono: 'frio' }],
  'P1.7b': [{ t: 'bruma', zona: [0, .3, 1, .9], alfa: .045 }, { t: 'polvo', n: 14, zona: [.55, .3, 1, .9] }, { t: 'sinpajaros', zona: [.35, 0, .62, .1], n: 2, tam: .008 }],
  'P1.8': [{ t: 'bruma', zona: [0, .25, 1, .9], alfa: .05 }, { t: 'humo', x: .853, y: .085, w: .022, dir: [.45, -1], dens: .9, color: 'oscuro', alfa: .32 },
           { t: 'humo', x: .873, y: .095, w: .022, dir: [.45, -1], dens: .8, color: 'oscuro', alfa: .28 }, { t: 'sinpajaros', zona: [.3, .02, .78, .11], n: 3, tam: .009 }],
});
