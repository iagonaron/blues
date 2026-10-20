/* (Iago, 20-oct) los pájaros, SOLO en el cielo del fondo: nunca por delante de una cara.
 BLUES · vida de cada plano (js/vida.js). Posiciones en fracciones de la lámina: x, y de 0 a 1; r y w, fracción del ancho.
   Hechas mirando cada lámina (19-oct). Un plano sin entrada se queda quieto.
   (20-oct, reparto por actos) un fichero por acto: data/vida_d3.js es SOLO del acto 3. */
window.BLUES.VIDA = Object.assign(window.BLUES.VIDA || {}, {
  /* acto 3 · el club: arañas que titilan, humo de cigarros, polvo en el foco */
  'P3.1': [{ t: 'bruma', zona: [0, .1, 1, .95], alfa: 0.06 }, { t: 'brillos', zona: [.3, .04, .52, .3], n: 9 }, { t: 'luz', x: .2, y: .11, r: .025, k: .9 }, { t: 'luz', x: .635, y: .17, r: .025, k: .9 }, { t: 'luz', x: .89, y: .06, r: .025, k: .8 },
           { t: 'luz', x: .155, y: .45, r: .02, k: .8 }],
  'P3.2': [{ t: 'bruma', zona: [0, .1, 1, .95], alfa: 0.06 }, { t: 'luz', x: .56, y: .02, r: .04, k: .8, tint: 1.2 }, { t: 'luz', x: .79, y: .01, r: .035, k: .7 }, { t: 'luz', x: .885, y: .1, r: .03, k: .7 },
           { t: 'luz', x: .97, y: .03, r: .03, k: .6 },
           /* (Iago, 20-oct) más humo de cigarros y destellos en las tazas, la bandeja y las lentejuelas de Pearl */
           { t: 'humo', x: .62, y: .8, w: .08, dir: [.3, -1], dens: .6, alfa: .2, vel: .012 }, { t: 'humo', x: .84, y: .7, w: .06, dir: [.2, -1], dens: .5, alfa: .18, vel: .011 },
           { t: 'humo', x: .55, y: .6, w: .05, dir: [.25, -1], dens: .45, alfa: .16, vel: .01 }, { t: 'humo', x: .95, y: .56, w: .05, dir: [-.1, -1], dens: .4, alfa: .15, vel: .01 },
           { t: 'brillos', zona: [.6, .7, .86, .88], n: 5 }, { t: 'brillos', zona: [.88, .47, 1, .56], n: 3 }, { t: 'brillos', zona: [.735, .16, .83, .5], n: 7 },
           { t: 'polvo', n: 20, zona: [.5, .1, .85, .6] }],
  'P3.3': [{ t: 'bruma', zona: [0, .1, 1, .95], alfa: 0.06 }, { t: 'humo', x: .6, y: .45, w: .08, dir: [.2, -1], dens: .5, alfa: .16, vel: .01 }, { t: 'humo', x: .9, y: .15, w: .03, dir: [.1, -1], dens: .6, alfa: .2, vel: .012 },
           { t: 'polvo', n: 18, zona: [.5, 0, .8, .5] }, { t: 'luz', x: .015, y: .69, r: .025, k: .9 }],
  'P3.4': [{ t: 'bruma', zona: [0, .1, 1, .95], alfa: 0.06 }, { t: 'humo', x: .885, y: .32, w: .02, dir: [.05, -1], dens: .8, alfa: .22, vel: .012 }, { t: 'luz', x: .025, y: .12, r: .03, k: .9 }, { t: 'luz', x: .03, y: .85, r: .03, k: .9 },
           { t: 'luz', x: .62, y: .95, r: .03, k: .9 }, { t: 'polvo', n: 16, zona: [.35, 0, .75, .5] }],
  'P3.5': [{ t: 'bruma', zona: [0, .1, 1, .95], alfa: 0.06 }, { t: 'humo', x: .88, y: .24, w: .02, dir: [.05, -1], dens: .8, alfa: .22, vel: .012 }, { t: 'luz', x: .015, y: .72, r: .03, k: .9 }, { t: 'luz', x: .95, y: .76, r: .03, k: .9 }, { t: 'polvo', n: 14, zona: [.3, 0, .8, .45] }],
  'P3.6': [{ t: 'bruma', zona: [0, .1, 1, .95], alfa: 0.06 }, { t: 'polvo', n: 14, zona: [.3, 0, 1, .5] }, { t: 'luz', x: .27, y: .5, r: .025, k: .8 }],
  'P3.7': [{ t: 'bruma', zona: [0, .1, 1, .95], alfa: 0.06 }, { t: 'polvo', n: 14, zona: [.3, 0, .9, .5] }, { t: 'luz', x: .02, y: .72, r: .03, k: .9 }, { t: 'luz', x: .98, y: .45, r: .025, k: .8 }],
  'P3.8': [{ t: 'bruma', zona: [0, .1, 1, .95], alfa: 0.06 }, { t: 'lluvia', n: 60, zona: [0, 0, 1, 1], alfa: .14 }, { t: 'hojas', zona: [0, 0, .5, .8], n: 4 }],
});
