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
});
