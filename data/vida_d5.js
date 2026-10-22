/* (Iago, 20-oct) los pájaros, SOLO en el cielo del fondo: nunca por delante de una cara.
 BLUES · vida de cada plano (js/vida.js). Posiciones en fracciones de la lámina: x, y de 0 a 1; r y w, fracción del ancho.
   Hechas mirando cada lámina (19-oct). Un plano sin entrada se queda quieto.
   (20-oct, reparto por actos) un fichero por acto: data/vida_d5.js es SOLO del acto 5. */
window.BLUES.VIDA = Object.assign(window.BLUES.VIDA || {}, {
  /* (C5, 22-oct) P5.0 · el porche vacío, la MISMA lámina que P5.1 sin los músicos (Iago: mismo encuadre): mismas luces y chispas */
  'P5.0': [{ t: 'bruma', zona: [0, .1, 1, .95], alfa: 0.035 }, { t: 'luz', x: .11, y: .133, r: .02, k: .8 }, { t: 'luz', x: .265, y: .093, r: .02, k: .8 },
           { t: 'luz', x: .416, y: .155, r: .02, k: .8 }, { t: 'luz', x: .5, y: .16, r: .02, k: .8 }, { t: 'luz', x: .575, y: .142, r: .02, k: .7 },
           { t: 'luz', x: .794, y: .062, r: .02, k: .7 }, { t: 'luz', x: .924, y: .067, r: .02, k: .7 }, { t: 'luz', x: .219, y: .155, r: .022, k: .9 },
           { t: 'luz', x: .783, y: .167, r: .022, k: .9 }, { t: 'luz', x: .569, y: .522, r: .02, k: .8 }, { t: 'luz', x: .119, y: .478, r: .02, k: .8 },
           { t: 'polvo', n: 14, tono: 'brasa', zona: [0, .05, 1, .95] }],
  /* acto 5 · el porche de noche (C5, 20-oct: lámina reencuadrada, músicos en el centro): farolillos que titilan y chispas */
  'P5.1': [{ t: 'bruma', zona: [0, .1, 1, .95], alfa: 0.035 }, { t: 'luz', x: .11, y: .133, r: .02, k: .8 }, { t: 'luz', x: .265, y: .093, r: .02, k: .8 },
           { t: 'luz', x: .416, y: .155, r: .02, k: .8 }, { t: 'luz', x: .5, y: .16, r: .02, k: .8 }, { t: 'luz', x: .575, y: .142, r: .02, k: .7 },
           { t: 'luz', x: .794, y: .062, r: .02, k: .7 }, { t: 'luz', x: .924, y: .067, r: .02, k: .7 }, { t: 'luz', x: .219, y: .155, r: .022, k: .9 },
           { t: 'luz', x: .783, y: .167, r: .022, k: .9 }, { t: 'luz', x: .569, y: .522, r: .02, k: .8 }, { t: 'luz', x: .119, y: .478, r: .02, k: .8 },
           { t: 'polvo', n: 14, tono: 'brasa', zona: [0, .05, 1, .95] }],
});
