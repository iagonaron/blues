/* (Iago, 20-oct) los pájaros, SOLO en el cielo del fondo: nunca por delante de una cara.
 BLUES · vida de cada plano (js/vida.js). Posiciones en fracciones de la lámina: x, y de 0 a 1; r y w, fracción del ancho.
   Hechas mirando cada lámina (19-oct). Un plano sin entrada se queda quieto.
   (20-oct, reparto por actos) un fichero por acto: data/vida_d5.js es SOLO del acto 5. */
window.BLUES.VIDA = Object.assign(window.BLUES.VIDA || {}, {
  /* acto 5 · el porche de noche: farolillos que titilan y luciérnagas */
  'P5.1': [{ t: 'bruma', zona: [0, .1, 1, .95], alfa: 0.035 }, { t: 'luz', x: .585, y: .45, r: .03, k: .9 }, { t: 'luz', x: .1, y: .38, r: .025, k: .8 }, { t: 'luz', x: .215, y: .1, r: .025, k: .8 },
           { t: 'luz', x: .79, y: .07, r: .025, k: .8 }, { t: 'luz', x: .42, y: .07, r: .02, k: .7 }, { t: 'luz', x: .67, y: .02, r: .02, k: .7 },
           { t: 'polvo', n: 14, tono: 'brasa', zona: [0, .05, 1, .95] }],
});
