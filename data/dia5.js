/* BLUES · Día 5 · «El porche» — datos generados con herramientas/guion2datos.mjs (v3).
   Los textos vienen del guion: para cambiarlos, cambiar el guion y volver a pasar la herramienta.
   Lo demás (img, var, cam, amb, mus, pal, espera, configuración de inter) se puede tocar aquí: la herramienta lo respeta.
   Formato: ver LEEME-motor.md. */
BLUES.dia(5, {
 "titulo": "El porche",
 "lugar": "Weeksville, Brooklyn · 1929",
 "carta": {
  "encabezado": "A Coruña, 1929",
  "firma": "Xan",
  "texto": "Querido Eli: la avoa ya canta la nana con swing. ¡Hasta lleva el compás con el pie! Dale recuerdos a Ruby, a Teddy y a Mr. Odell. Y guárdame el sitio en el porche… …o mejor, déjaselo a quien llegue con un instrumento y ganas de improvisar.",
  "lineas": [
   {
    "id": "d5_c03",
    "quien": "XAN",
    "texto": "Querido Eli: la avoa ya canta la nana con swing. ¡Hasta lleva el compás con el pie!",
    "voz": "voz/d5/d5_c03.mp3"
   },
   {
    "id": "d5_c04",
    "quien": "XAN",
    "texto": "Dale recuerdos a Ruby, a Teddy y a Mr. Odell. Y guárdame el sitio en el porche…",
    "voz": "voz/d5/d5_c04.mp3"
   },
   {
    "id": "d5_c05",
    "quien": "XAN",
    "texto": "…o mejor, déjaselo a quien llegue con un instrumento y ganas de improvisar.",
    "voz": "voz/d5/d5_c05.mp3"
   }
  ]
 },
 "planos": [
  {
   "id": "P5.0",
   "desc": "Título del día 5 + la carta de Xan a Eli, desde Coruña: el porche de Weeksville al anochecer, vacío, con los farolillos encendidos y los instrumentos esperando (la misma lámina que P5.1, sin los músicos).",
   "img": "img/d5/p5_0.webp",
   "pal": "farol",
   "amb": [
    {
     "src": "sfx/d5/grillos.mp3",
     "vol": 0.4
    },
    {
     "src": "sfx/d5/porche.mp3",
     "vol": 0.35
    }
   ],
   "lineas": [],
   "nombre": "Título",
   "titulo": true
  },
  {
   "id": "P5.1",
   "desc": "El porche de noche con farolillos: la banda de cuatro —Eli (guitarra), Ruby (tabla de lavar), Mr. Odell (contrabajo) y Teddy (trompeta con sordina)— espera. Un hueco libre en el centro del porche: el sitio de Xan.",
   "img": "img/d5/p5_1.webp",
   "var": {
    "ELI_CERCA": "img/d5/p5_1_eli_cerca.webp",
    "RECURSO_SILLA": "img/d5/p5_1_recurso_silla.webp"
   },
   "personajes": [
    "ELI"
   ],
   "pal": "farol",
   "amb": [
    {
     "src": "sfx/d5/grillos.mp3",
     "vol": 0.28
    },
    {
     "src": "sfx/d5/porche.mp3",
     "vol": 0.3
    }
   ],
   "lineas": [
    {
     "id": "d5_003",
     "quien": "ELI",
     "texto": "Bienvenidos al porche. Esta es la banda.",
     "voz": "voz/d5/d5_003.mp3",
     "sfx": [
      {
       "src": "sfx/d5/pres_guitarra.mp3",
       "vol": 0.3,
       "t": 2.9
      }
     ]
    },
    {
     "id": "d5_004",
     "quien": "ELI",
     "texto": "Ruby, a la tabla. Mr. Odell, al contrabajo. Teddy, a la trompeta. Y yo, a la guitarra.",
     "voz": "voz/d5/d5_004.mp3",
     "sfx": [
      {
       "src": "sfx/d5/pres_tabla.mp3",
       "vol": 0.5,
       "t": 1.15
      },
      {
       "src": "sfx/d5/pres_contrabajo.mp3",
       "vol": 0.6,
       "t": 3.05
      },
      {
       "src": "sfx/d5/pres_guitarra.mp3",
       "vol": 0.55,
       "t": 6.45
      }
     ]
    },
    {
     "id": "d5_009",
     "quien": "ELI",
     "texto": "Ese hueco es vuestro.",
     "voz": "voz/d5/d5_009.mp3",
     "var": "RECURSO_SILLA",
     "fijo": true
    },
    {
     "id": "d5_006",
     "quien": "ELI",
     "texto": "«¡Tema!»: todos el tema. «¡Solo!»: os toca a vosotros.",
     "voz": "voz/d5/d5_006.mp3",
     "var": "RECURSO_SILLA"
    },
    {
     "id": "d5_007",
     "quien": "ELI",
     "texto": "Vamos a tocar para instrumentos en Do. Pero si tu instrumento va en si bemol o en mi bemol, selecciónalo abajo.",
     "voz": "voz/d5/d5_007.mp3"
    },
    {
     "id": "d5_008",
     "quien": "ELI",
     "texto": "La banda cambia de tono; la partitura sigue en Sol. Y ahora… a practicar.",
     "voz": "voz/d5/d5_008.mp3",
     "var": "ELI_CERCA"
    }
   ],
   "inter": {
    "tipo": "practica",
    "desc": "Sala de práctica: SOLO el Concierto (Iago, 22-oct): TEMA e IMPRO alternándose en bucle con la banda del porche. Selector Do / Si♭ / Mi♭. Con Protester: orden de salida por transpositor (Do → Si♭ → Mi♭) con sorteo a tiza en la pizarra del porche y carrusel «Te toca / Después».",
    "lineas": {
     "tema": [
      {
       "id": "d5_r001",
       "quien": "ELI",
       "texto": "¡Tema!",
       "voz": "voz/d5/d5_r001.mp3"
      }
     ],
     "solo": [
      {
       "id": "d5_r002",
       "quien": "ELI",
       "texto": "¡Solo!",
       "voz": "voz/d5/d5_r002.mp3"
      }
     ],
     "otra_vez": [
      {
       "id": "d5_r003",
       "quien": "ELI",
       "texto": "¡Otra vuelta!",
       "voz": "voz/d5/d5_r003.mp3"
      }
     ],
     "ultimo": [
      {
       "id": "d5_r004",
       "quien": "ELI",
       "texto": "¡Último tema!",
       "voz": "voz/d5/d5_r004.mp3"
      }
     ],
     "final": [
      {
       "id": "d5_r005",
       "quien": "ELI",
       "texto": "¡Y… final!",
       "voz": "voz/d5/d5_r005.mp3"
      }
     ],
     "orden": [
      {
       "id": "d5_r015",
       "quien": "ELI",
       "texto": "Os llamo por instrumentos: así la banda no cambia de tono a cada rato.",
       "voz": "voz/d5/d5_r015.mp3"
      }
     ],
     "do": [
      {
       "id": "d5_r006",
       "quien": "ELI",
       "texto": "Preparad los instrumentos en Do.",
       "voz": "voz/d5/d5_r006.mp3"
      }
     ],
     "sib": [
      {
       "id": "d5_r007",
       "quien": "ELI",
       "texto": "Ahora, los de si bemol. La banda se pasa a Fa.",
       "voz": "voz/d5/d5_r007.mp3"
      }
     ],
     "mib": [
      {
       "id": "d5_r008",
       "quien": "ELI",
       "texto": "Y ahora, los de mi bemol. La banda se pasa a si bemol.",
       "voz": "voz/d5/d5_r008.mp3"
      }
     ],
     "siguiente": [
      {
       "id": "d5_r009",
       "quien": "ELI",
       "texto": "¡Siguiente solista!",
       "voz": "voz/d5/d5_r009.mp3"
      }
     ],
     "aplauso": [
      {
       "id": "d5_r010",
       "quien": "RUBY",
       "texto": "¡Eso es!",
       "voz": "voz/d5/d5_r010.mp3"
      },
      {
       "id": "d5_r011",
       "quien": "TEDDY",
       "texto": "¡Eso no se escribe!",
       "voz": "voz/d5/d5_r011.mp3"
      },
      {
       "id": "d5_r012",
       "quien": "ODELL",
       "texto": "Tiene orejas, sí señor.",
       "voz": "voz/d5/d5_r012.mp3"
      }
     ],
     "cierre": [
      {
       "id": "d5_r013",
       "quien": "ELI",
       "texto": "Esto no se escribe… ¿cómo era, Teddy?",
       "voz": "voz/d5/d5_r013.mp3"
      },
      {
       "id": "d5_r016",
       "quien": "TEDDY",
       "texto": "¡Se siente!",
       "voz": "voz/d5/d5_r016.mp3"
      }
     ]
    },
    "recursos": [
     "img/inter/d5_pizarra.webp",
     "sfx/d5/tiza.mp3",
     "sfx/d5/tabla_raspa.mp3",
     "sfx/d5/tabla_golpe.mp3",
     "sfx/d5/aplauso.mp3",
     "mus/d5_porche_v5_G.mp3",
     "mus/d5_porche_v5_G_fin.mp3",
     "mus/d5_porche_v5_F.mp3",
     "mus/d5_porche_v5_F_fin.mp3",
     "mus/d5_porche_v5_Bb.mp3",
     "mus/d5_porche_v5_Bb_fin.mp3"
    ]
   },
   "nombre": "A túa vez",
   "hechos": [],
   "guion_sonido": {
    "amb": "Grillos; farolillos que zumban.",
    "mus": "La banda del porche (Suno, cover de nuestra guía de 12 compases, remezclada desde sus stems: guitarra, contrabajo, tabla de lavar, bombo y trompeta con sordina; sin piano) y, encima, el rascador de Ruby (tabla de lavar de Splice, sutil, pegado a los platillos de la banda). Una base por tono (Sol, Fa, Si♭)."
   },
   "foco": {
    "ELI": [
     0.278,
     0.4,
     0.075
    ],
    "RUBY": [
     0.4,
     0.356,
     0.075
    ],
    "TEDDY": [
     0.64,
     0.285,
     0.075
    ],
    "ODELL": [
     0.785,
     0.3,
     0.075
    ]
   }
  }
 ],
 "banda": {
  "sin": [
   "acordeon"
  ]
 }
});
