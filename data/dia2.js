/* BLUES · Día 2 · «Músicos callejeros» — datos generados con herramientas/guion2datos.mjs (v3).
   Los textos vienen del guion: para cambiarlos, cambiar el guion y volver a pasar la herramienta.
   Lo demás (img, var, cam, amb, mus, pal, espera, configuración de inter) se puede tocar aquí: la herramienta lo respeta.
   Formato: ver LEEME-motor.md. */
BLUES.dia(2, {
 "titulo": "Músicos callejeros",
 "lugar": "De Nueva Orleans a Nueva York · diciembre de 1928",
 "carta": {
  "encabezado": "No tren, decembro de 1928",
  "firma": "Xan",
  "texto": "Querida avoa: aquí os trens teñen dúas portas, dúas salas de espera e dúas maneiras de mirarte. A min míranme raro nas dúas. Nunha, por moreno; na outra, por galego. Pero no vagón do fume coñecín xente que fai música cunha táboa de lavar. Cunha táboa de lavar, avoa!",
  "lineas": [
   {
    "id": "d2_c01",
    "quien": "XAN",
    "texto": "Querida avoa: aquí os trens teñen dúas portas, dúas salas de espera e dúas maneiras de mirarte.",
    "voz": "voz/d2/d2_c01.mp3"
   },
   {
    "id": "d2_c02",
    "quien": "XAN",
    "texto": "A min míranme raro nas dúas. Nunha, por moreno; na outra, por galego.",
    "voz": "voz/d2/d2_c02.mp3"
   },
   {
    "id": "d2_c03",
    "quien": "XAN",
    "texto": "Pero no vagón do fume coñecín xente que fai música cunha táboa de lavar.",
    "voz": "voz/d2/d2_c03.mp3"
   },
   {
    "id": "d2_c04",
    "quien": "XAN",
    "texto": "Cunha táboa de lavar, avoa!",
    "voz": "voz/d2/d2_c04.mp3"
   }
  ]
 },
 "planos": [
  {
   "id": "P2.0",
   "desc": "Título: el tren cruza el Sur entre campos de algodón.",
   "img": "img/d2/p2_0.webp",
   "pal": "ocre",
   "amb": [
    {
     "src": "sfx/d2/tren.mp3",
     "vol": 0.5
    }
   ],
   "lineas": [],
   "nombre": "Título",
   "titulo": true
  },
  {
   "id": "P2.1",
   "desc": "Estación de Nueva Orleans: dos salas de espera con carteles «WHITE» y «COLORED». En el andén, el lujoso Crescent Limited (todo coches Pullman); al fondo, un tren corriente con un vagón viejo de equipajes y pasajeros pegado a la locomotora. George, con chaqueta blanca de mozo, encuentra a Xan, que carga su estuche grande.",
   "img": "img/d2/p2_1.webp",
   "var": {
    "GEORGE": "img/d2/p2_1_george.webp",
    "XAN": "img/d2/p2_1_xan.webp"
   },
   "personajes": [
    "GEORGE",
    "XAN"
   ],
   "pal": "ocre",
   "amb": [
    {
     "src": "sfx/d2/estacion.mp3",
     "vol": 0.5
    }
   ],
   "hechos": [
    "h13",
    "h11"
   ],
   "lineas": [
    {
     "id": "d2_001",
     "quien": "GEORGE",
     "texto": "¿Tú eres el gallego de Amos? A ver esa nota.",
     "voz": "voz/d2/d2_001.mp3"
    },
    {
     "id": "d2_002",
     "quien": "GEORGE",
     "texto": "«Este chico contesta bien». Con eso me basta.",
     "voz": "voz/d2/d2_002.mp3"
    },
    {
     "id": "d2_003",
     "quien": "GEORGE",
     "texto": "Ese de ahí es el Crescent Limited: todo coches Pullman. Camas, manteles blancos, cubiertos de plata.",
     "voz": "voz/d2/d2_003.mp3"
    },
    {
     "id": "d2_004",
     "quien": "GEORGE",
     "texto": "Yo trabajo en él. Pero tú y yo no viajamos en él.",
     "voz": "voz/d2/d2_004.mp3"
    },
    {
     "id": "d2_005",
     "quien": "GEORGE",
     "texto": "Tu tren es ese. Y tu vagón, el primero, pegado a la locomotora: mitad equipajes, mitad personas.",
     "voz": "voz/d2/d2_005.mp3"
    },
    {
     "id": "d2_006",
     "quien": "XAN",
     "texto": "¿Por qué el primero?",
     "voz": "voz/d2/d2_006.mp3"
    },
    {
     "id": "d2_007",
     "quien": "GEORGE",
     "texto": "Porque es el que se traga el humo. Aquí nada es casualidad, chico.",
     "voz": "voz/d2/d2_007.mp3"
    },
    {
     "id": "d2_008",
     "quien": "REVISOR",
     "texto": "All aboard!",
     "voz": "voz/d2/d2_008.mp3",
     "var": "-"
    }
   ],
   "nombre": "Dos puertas",
   "guion_sonido": {
    "amb": "Estación: vapor, campana de locomotora, gente, carritos.",
    "sfx": "Silbato; el grito del revisor."
   }
  },
  {
   "id": "P2.2",
   "desc": "El peor vagón del tren: coche de equipajes pegado a la locomotora, casi sin ventanas (solo una, pequeña); cajas, sacos y maletas; un farol de queroseno; humo que se cuela por las rendijas. En su rincón, felices, la cuadrilla —Teddy (trompeta), Ruby (tabla de lavar), Buster (maleta con escobillas) y Slim (banjo)— toca. Un ratón asoma entre los sacos. Xan, apartado, sentado sobre su estuche grande.",
   "img": "img/d2/p2_2.webp",
   "var": {
    "TEDDY": "img/d2/p2_2_teddy.webp",
    "RUBY": "img/d2/p2_2_ruby.webp",
    "SLIM": "img/d2/p2_2_slim.webp",
    "XAN": "img/d2/p2_2_xan.webp",
    "BUSTER": "img/d2/p2_2_buster.webp"
   },
   "personajes": [
    "RUBY",
    "XAN",
    "SLIM",
    "TEDDY",
    "BUSTER"
   ],
   "pal": "ocre",
   "amb": [
    {
     "src": "sfx/d2/tren_dentro.mp3",
     "vol": 0.5
    }
   ],
   "mus": {
    "src": "mus/musica_tren.mp3",
    "vol": 0.7,
    "bucle": false
   },
   "hechos": [
    "h15",
    "h50"
   ],
   "lineas": [
    {
     "id": "d2_009",
     "quien": "RUBY",
     "texto": "¡Eh, el del baúl negro! ¿Qué llevas ahí, un muerto?",
     "voz": "voz/d2/d2_009.mp3"
    },
    {
     "id": "d2_010",
     "quien": "XAN",
     "texto": "Un acordeón.",
     "voz": "voz/d2/d2_010.mp3"
    },
    {
     "id": "d2_011",
     "quien": "SLIM",
     "texto": "¿Un acordeón? ¿Vas a una boda polaca?",
     "voz": "voz/d2/d2_011.mp3"
    },
    {
     "id": "d2_012",
     "quien": "TEDDY",
     "texto": "Déjalo, Slim. Yo soy Teddy, trompeta.",
     "voz": "voz/d2/d2_012.mp3"
    },
    {
     "id": "d2_013",
     "quien": "TEDDY",
     "texto": "Esta es Ruby, la reina de la tabla de lavar.",
     "voz": "voz/d2/d2_013.mp3"
    },
    {
     "id": "d2_014",
     "quien": "RUBY",
     "texto": "Y ese grandullón es Buster. Toca la maleta. Literal.",
     "voz": "voz/d2/d2_014.mp3"
    },
    {
     "id": "d2_015",
     "quien": "BUSTER",
     "texto": "Dentro llevo los calcetines. Fuera, el ritmo.",
     "voz": "voz/d2/d2_015.mp3"
    },
    {
     "id": "d2_016",
     "quien": "TEDDY",
     "texto": "Y Slim toca el banjo… y las narices.",
     "voz": "voz/d2/d2_016.mp3"
    },
    {
     "id": "d2_017",
     "quien": "SLIM",
     "texto": "Alguien tiene que hacerlo.",
     "voz": "voz/d2/d2_017.mp3"
    },
    {
     "id": "d2_077",
     "quien": "BUSTER",
     "texto": "Tranquila, que es de la casa. Viaja con nosotros desde Nueva Orleans.",
     "voz": "voz/d2/d2_077.mp3"
    },
    {
     "id": "d2_086",
     "quien": "SLIM",
     "texto": "Es el único de este vagón que no paga billete.",
     "voz": "voz/d2/d2_086.mp3"
    },
    {
     "id": "d2_018",
     "quien": "XAN",
     "texto": "Yo soy Xan. De Coruña, en España.",
     "voz": "voz/d2/d2_018.mp3"
    },
    {
     "id": "d2_019",
     "quien": "RUBY",
     "texto": "¿Y a qué vas a Nueva York, Xan de Coruña?",
     "voz": "voz/d2/d2_019.mp3"
    },
    {
     "id": "d2_020",
     "quien": "XAN",
     "texto": "A buscar a mi abuelo.",
     "voz": "voz/d2/d2_020.mp3"
    },
    {
     "id": "d2_021",
     "quien": "RUBY",
     "texto": "Nosotros, a buscar fortuna. Desde la riada del año pasado, en casa no queda nada que buscar.",
     "voz": "voz/d2/d2_021.mp3"
    },
    {
     "id": "d2_079",
     "quien": "RUBY",
     "texto": "Mira: pases para tocar después del cierre en el Ivory Room. ¡En Harlem! Una «jam», lo llaman ahora.",
     "voz": "voz/d2/d2_079.mp3"
    },
    {
     "id": "d2_022",
     "quien": "TEDDY",
     "texto": "Cuando se van los ricos, suben los músicos de verdad. Allí uno se hace famoso en una noche.",
     "voz": "voz/d2/d2_022.mp3"
    },
    {
     "id": "d2_023",
     "quien": "SLIM",
     "texto": "O se hunde en un minuto.",
     "voz": "voz/d2/d2_023.mp3"
    }
   ],
   "nombre": "El vagón del humo",
   "guion_sonido": {
    "amb": "Traqueteo del tren, chirridos de madera, viento por las rendijas.",
    "mus": "La música loca y festiva de la cuadrilla (Suno: trompeta con sordina, banjo, tabla de lavar y escobillas sobre una maleta; nada más). Baja cuando hablan."
   },
   "cam": {
    "de": [
     1.08,
     0.35,
     0.45
    ],
    "a": [
     1.08,
     0.65,
     0.45
    ]
   },
   "foco": {
    "XAN": [
     0.2,
     0.33,
     0.113
    ],
    "TEDDY": [
     0.37,
     0.2,
     0.113
    ],
    "RUBY": [
     0.6,
     0.25,
     0.113
    ],
    "BUSTER": [
     0.74,
     0.37,
     0.124
    ],
    "SLIM": [
     0.87,
     0.15,
     0.107
    ]
   }
  },
  {
   "id": "P2.3",
   "desc": "Mismo vagón, a la luz del farol. Teddy, de pie entre los sacos, toca un solo con la sordina de desatascador; Xan escribe a toda prisa en su libreta de pentagramas; Ruby mira por encima de su hombro.",
   "img": "img/d2/p2_3.webp",
   "var": {
    "TEDDY": "img/d2/p2_3_teddy.webp",
    "XAN": "img/d2/p2_3_xan.webp",
    "RUBY": "img/d2/p2_3_ruby.webp"
   },
   "personajes": [
    "TEDDY",
    "XAN",
    "RUBY"
   ],
   "pal": "ocre",
   "amb": [
    {
     "src": "sfx/d2/tren_dentro.mp3",
     "vol": 0.4
    }
   ],
   "hechos": [
    "h18"
   ],
   "lineas": [
    {
     "id": "d2_024",
     "quien": "TEDDY",
     "texto": "¿Qué haces, gallego? ¿Me estás haciendo un retrato?",
     "voz": "voz/d2/d2_024.mp3"
    },
    {
     "id": "d2_025",
     "quien": "XAN",
     "texto": "Estoy escribiendo tu solo. Para no olvidarlo.",
     "voz": "voz/d2/d2_025.mp3"
    },
    {
     "id": "d2_026",
     "quien": "TEDDY",
     "texto": "¿Escribiendo? ¿Para qué escribes? Esto no se escribe, se siente.",
     "voz": "voz/d2/d2_026.mp3"
    },
    {
     "id": "d2_027",
     "quien": "XAN",
     "texto": "Todo se puede escribir. Mira: sol, si bemol, si, re…",
     "voz": "voz/d2/d2_027.mp3"
    },
    {
     "id": "d2_028",
     "quien": "TEDDY",
     "texto": "A ver, tócalo tal cual.",
     "voz": "voz/d2/d2_028.mp3"
    }
   ],
   "inter": {
    "tipo": "escribe",
    "desc": "Las notas del solo aparecen en la libreta de Xan; suena «tal cual está escrito» (rígido) y después Teddy lo toca de verdad, con swing y un bend: no se parece."
   },
   "despues": [
    {
     "id": "d2_029",
     "quien": "TEDDY",
     "texto": "¿Lo oyes? Lo tuyo son las notas. Lo mío es cómo van. Eso no cabe en tu libreta.",
     "voz": "voz/d2/d2_029.mp3"
    },
    {
     "id": "d2_030",
     "quien": "XAN",
     "texto": "Pues habrá que hacer una libreta más grande.",
     "voz": "voz/d2/d2_030.mp3"
    },
    {
     "id": "d2_031",
     "quien": "RUBY",
     "texto": "¡Me cae bien el gallego!",
     "voz": "voz/d2/d2_031.mp3"
    }
   ],
   "nombre": "Esto no se escribe",
   "guion_sonido": {
    "sfx": "Solo de trompeta con sordina («wa-wa»)."
   }
  },
  {
   "id": "P2.4",
   "desc": "En el rincón del vagón, Ruby, sentada sobre una caja frente a Xan, da palmas; Buster marca con las escobillas en la maleta; los demás miran.",
   "img": "img/d2/p2_4.webp",
   "var": {
    "RUBY": "img/d2/p2_4_ruby.webp",
    "XAN": "img/d2/p2_4_xan.webp",
    "BUSTER": "img/d2/p2_4_buster.webp",
    "TEDDY": "img/d2/p2_4_teddy.webp"
   },
   "personajes": [
    "RUBY",
    "XAN",
    "BUSTER",
    "TEDDY"
   ],
   "pal": "ocre",
   "amb": [
    {
     "src": "sfx/d2/tren_dentro.mp3",
     "vol": 0.3
    }
   ],
   "hechos": [
    "h17",
    "h16"
   ],
   "lineas": [
    {
     "id": "d2_032",
     "quien": "RUBY",
     "texto": "A ver, Xan. ¿Dónde das tú las palmas?",
     "voz": "voz/d2/d2_032.mp3"
    },
    {
     "id": "d2_033",
     "quien": "XAN",
     "texto": "Pues… en el uno y en el tres. Como la banda de música en el Cantón.",
     "voz": "voz/d2/d2_033.mp3"
    },
    {
     "id": "d2_034",
     "quien": "RUBY",
     "texto": "Aquí, en el dos y en el cuatro. Escucha a Buster.",
     "voz": "voz/d2/d2_034.mp3"
    },
    {
     "id": "d2_035",
     "quien": "BUSTER",
     "texto": "Un… ¡DOS!… tres… ¡CUATRO!",
     "voz": "voz/d2/d2_035.mp3"
    },
    {
     "id": "d2_036",
     "quien": "RUBY",
     "texto": "Prueba tú: palmas en el dos y en el cuatro.",
     "voz": "voz/d2/d2_036.mp3"
    }
   ],
   "inter": [
    {
     "tipo": "palmas",
     "desc": "Palmas en el 2 y el 4 sobre el ritmo de la tabla y la maleta: dos compases con Ruby de guía y luego solo.",
     "lineas": {
      "acierto": [
       {
        "id": "d2_r001",
        "quien": "RUBY",
        "texto": "¡Ya lo tienes! Ahora sí que pareces de Harlem.",
        "voz": "voz/d2/d2_r001.mp3"
       }
      ],
      "fallo": [
       {
        "id": "d2_r002",
        "quien": "RUBY",
        "texto": "¡No, en el uno no! El uno es para las bandas de uniforme.",
        "voz": "voz/d2/d2_r002.mp3"
       }
      ],
      "pista": [
       {
        "id": "d2_r003",
        "quien": "BUSTER",
        "texto": "Escucha la maleta: ¡pum en el dos, pum en el cuatro!",
        "voz": "voz/d2/d2_r003.mp3"
       }
      ]
     }
    },
    {
     "tipo": "swing",
     "desc": "El primer compás del tema (sol fa sol si, sol sol): oírlo sin swing y con swing; luego el alumno lo toca en el teclado y se le dice, par a par de corcheas, si va «recto» o «con swing».",
     "antes": [
      {
       "id": "d2_037",
       "quien": "RUBY",
       "texto": "Y ahora, lo importante. Cuando escribes dos corcheas, ¿cómo las tocas?",
       "voz": "voz/d2/d2_037.mp3"
      },
      {
       "id": "d2_038",
       "quien": "XAN",
       "texto": "Iguales. Ta-ta, ta-ta.",
       "voz": "voz/d2/d2_038.mp3"
      },
      {
       "id": "d2_039",
       "quien": "RUBY",
       "texto": "Qué aburrido. Aquí van así: taaa-ta, taaa-ta. Larga y corta.",
       "voz": "voz/d2/d2_039.mp3"
      },
      {
       "id": "d2_040",
       "quien": "TEDDY",
       "texto": "Más o menos como un tresillo con las dos primeras notas pegadas.",
       "voz": "voz/d2/d2_040.mp3"
      },
      {
       "id": "d2_041",
       "quien": "XAN",
       "texto": "O sea: se escriben dos corcheas… pero se tocan como un tresillo de negra y corchea. ¡Eso se puede escribir!",
       "voz": "voz/d2/d2_041.mp3"
      },
      {
       "id": "d2_042",
       "quien": "TEDDY",
       "texto": "Escribirlo, sí. Sentirlo, a ver si eres capaz.",
       "voz": "voz/d2/d2_042.mp3"
      }
     ],
     "lineas": {
      "recto": [
       {
        "id": "d2_r004",
        "quien": "RUBY",
        "texto": "Muy correcto… y muy recto. ¡Bailemos, no desfilemos!",
        "voz": "voz/d2/d2_r004.mp3"
       }
      ],
      "swing": [
       {
        "id": "d2_r005",
        "quien": "RUBY",
        "texto": "¡Eso! ¿Ves cómo se mueve? Eso tiene swing.",
        "voz": "voz/d2/d2_r005.mp3"
       }
      ],
      "fin": [
       {
        "id": "d2_r006",
        "quien": "TEDDY",
        "texto": "Bueno… no está mal para un gallego.",
        "voz": "voz/d2/d2_r006.mp3"
       }
      ]
     }
    }
   ],
   "nombre": "Larga y corta",
   "guion_sonido": {
    "amb": "Traqueteo del tren."
   }
  },
  {
   "id": "P2.5",
   "desc": "George entra en el vagón por la puerta corredera del fondo con una bandeja: pan blanco, tarta de nueces y dos periódicos. Detrás de él, por la puerta abierta, se ve el pasillo hacia los coches Pullman: luz cálida, caoba y latón.",
   "img": "img/d2/p2_5.webp",
   "var": {
    "GEORGE": "img/d2/p2_5_george.webp",
    "BUSTER": "img/d2/p2_5_buster.webp",
    "XAN": "img/d2/p2_5_xan.webp",
    "TEDDY": "img/d2/p2_5_teddy.webp",
    "SLIM": "img/d2/p2_5_slim.webp",
    "RUBY": "img/d2/p2_5_ruby.webp"
   },
   "personajes": [
    "GEORGE",
    "BUSTER",
    "XAN",
    "TEDDY",
    "SLIM",
    "RUBY"
   ],
   "pal": "caoba",
   "amb": [
    {
     "src": "sfx/d2/tren_dentro.mp3",
     "vol": 0.4
    }
   ],
   "hechos": [
    "h14",
    "h49",
    "h34",
    "h32",
    "h33"
   ],
   "lineas": [
    {
     "id": "d2_043",
     "quien": "GEORGE",
     "texto": "Servicio especial para el vagón del humo: lo que sobró en el coche restaurante.",
     "voz": "voz/d2/d2_043.mp3"
    },
    {
     "id": "d2_044",
     "quien": "BUSTER",
     "texto": "¡Pan blanco y tarta de nueces! Los ricos comen como reyes.",
     "voz": "voz/d2/d2_044.mp3"
    },
    {
     "id": "d2_045",
     "quien": "XAN",
     "texto": "Gracias, señor George.",
     "voz": "voz/d2/d2_045.mp3"
    },
    {
     "id": "d2_046",
     "quien": "GEORGE",
     "texto": "Me llamo Walter. Pero a todos los mozos nos llaman George, como al señor Pullman, el dueño.",
     "voz": "voz/d2/d2_046.mp3"
    },
    {
     "id": "d2_047",
     "quien": "GEORGE",
     "texto": "Hace tres años nos juntamos en un sindicato. Para empezar, que nos llamen por nuestro nombre.",
     "voz": "voz/d2/d2_047.mp3"
    },
    {
     "id": "d2_048",
     "quien": "GEORGE",
     "texto": "Y el periódico de ayer: un caballero del Pullman lo ha dejado entre las migas.",
     "voz": "voz/d2/d2_048.mp3"
    },
    {
     "id": "d2_080",
     "quien": "GEORGE",
     "texto": "Y este otro lo repartimos a escondidas: el Chicago Defender. Trabajos en el Norte.",
     "voz": "voz/d2/d2_080.mp3"
    },
    {
     "id": "d2_049",
     "quien": "TEDDY",
     "texto": "«Berlín. Otra vez abuchean la música de un tal Schoenberg: música sin tonalidad».",
     "voz": "voz/d2/d2_049.mp3"
    },
    {
     "id": "d2_050",
     "quien": "SLIM",
     "texto": "¿Sin tonalidad? ¿Y cómo saben cuándo se acaba?",
     "voz": "voz/d2/d2_050.mp3"
    },
    {
     "id": "d2_051",
     "quien": "RUBY",
     "texto": "«Alemania. Un inventor patenta una cinta que guarda el sonido».",
     "voz": "voz/d2/d2_051.mp3"
    },
    {
     "id": "d2_052",
     "quien": "BUSTER",
     "texto": "¿Sonido en papel? Que me guarden a mí la tarta.",
     "voz": "voz/d2/d2_052.mp3"
    },
    {
     "id": "d2_053",
     "quien": "TEDDY",
     "texto": "«El jueves, el señor Gershwin estrena en el Carnegie Hall una obra con bocinas de taxi de París».",
     "voz": "voz/d2/d2_053.mp3"
    },
    {
     "id": "d2_054",
     "quien": "SLIM",
     "texto": "¿Bocinas de taxi? ¡Eso lo tocamos nosotros en la calle, gratis!",
     "voz": "voz/d2/d2_054.mp3"
    }
   ],
   "nombre": "Las sobras del Pullman",
   "guion_sonido": {
    "sfx": "Puerta corredera, vajilla; el tren más fuerte al abrir."
   }
  },
  {
   "id": "P2.6",
   "desc": "Xan, animado, saca su acordeón de teclado (de tamaño medio) para tocar con ellos. Al fondo del vagón, en la penumbra, Slim, sin mirarle. Ruby, a su lado.",
   "img": "img/d2/p2_6.webp",
   "var": {
    "SLIM": "img/d2/p2_6_slim.webp",
    "RUBY": "img/d2/p2_6_ruby.webp",
    "XAN": "img/d2/p2_6_xan.webp",
    "TEDDY": "img/d2/p2_6_teddy.webp"
   },
   "personajes": [
    "XAN",
    "TEDDY",
    "SLIM",
    "RUBY"
   ],
   "pal": "ocre",
   "amb": [
    {
     "src": "sfx/d2/tren_dentro.mp3",
     "vol": 0.4
    }
   ],
   "lineas": [
    {
     "id": "d2_055",
     "quien": "XAN",
     "texto": "¿Puedo tocar con vosotros?",
     "voz": "voz/d2/d2_055.mp3"
    },
    {
     "id": "d2_056",
     "quien": "TEDDY",
     "texto": "Venga, a ver ese cajón.",
     "voz": "voz/d2/d2_056.mp3"
    },
    {
     "id": "d2_057",
     "quien": "SLIM",
     "texto": "Ese instrumento no pega mucho, ¿no?",
     "voz": "voz/d2/d2_057.mp3"
    },
    {
     "id": "d2_058",
     "quien": "RUBY",
     "texto": "No le hagas caso. Slim cree que el banjo lo inventó él.",
     "voz": "voz/d2/d2_058.mp3"
    },
    {
     "id": "d2_059",
     "quien": "RUBY",
     "texto": "A mí me gusta. Suena a barco.",
     "voz": "voz/d2/d2_059.mp3"
    },
    {
     "id": "d2_060",
     "quien": "XAN",
     "texto": "Suena a mi abuela.",
     "voz": "voz/d2/d2_060.mp3"
    },
    {
     "id": "d2_061",
     "quien": "RUBY",
     "texto": "Pues tu abuela suena bien.",
     "voz": "voz/d2/d2_061.mp3"
    },
    {
     "id": "d2_062",
     "quien": "XAN",
     "texto": "¿Y esto está muy lejos de Harlem? «Hunterfly Road, Weeksville».",
     "voz": "voz/d2/d2_062.mp3"
    },
    {
     "id": "d2_063",
     "quien": "RUBY",
     "texto": "¡Es la calle de mi tía Hattie, en Brooklyn! El mundo es un pañuelo.",
     "voz": "voz/d2/d2_063.mp3"
    },
    {
     "id": "d2_064",
     "quien": "RUBY",
     "texto": "Si te pierdes, pregunta por la tía Hattie. Todo Weeksville la conoce.",
     "voz": "voz/d2/d2_064.mp3"
    }
   ],
   "nombre": "No pega",
   "hechos": [],
   "foco": {
    "XAN": [
     0.37,
     0.2,
     0.113
    ],
    "RUBY": [
     0.58,
     0.28,
     0.113
    ],
    "TEDDY": [
     0.15,
     0.22,
     0.113
    ],
    "BUSTER": [
     0.755,
     0.28,
     0.109
    ],
    "SLIM": [
     0.89,
     0.07,
     0.113
    ]
   }
  },
  {
   "id": "P2.6m",
   "nombre": "Mapa del tren: Nueva Orleans → Washington",
   "desc": "Mapa ferroviario antiguo: la vía se dibuja de Nueva Orleans a Washington, con la locomotora echando humo.",
   "img": "img/d2/mapa_tren.webp",
   "pal": "tren",
   "amb": [
    {
     "src": "sfx/d2/tren_marcha.mp3",
     "vol": 0.5
    }
   ],
   "espera": 9.5,
   "hechos": [],
   "personajes": [],
   "mapa": {
    "tipo": "tren",
    "ruta": [
     [
      0.265,
      0.75
     ],
     [
      0.32,
      0.66
     ],
     [
      0.38,
      0.595
     ],
     [
      0.445,
      0.6
     ],
     [
      0.51,
      0.56
     ],
     [
      0.555,
      0.53
     ],
     [
      0.6,
      0.465
     ],
     [
      0.625,
      0.43
     ],
     [
      0.685,
      0.37
     ]
    ],
    "desde": "Nueva Orleans",
    "hasta": "Washington",
    "sub": "Treinta horas de vía después · cambio de vagón",
    "dur": 6.5,
    "silbato": "sfx/d2/silbato_vapor.mp3",
    "etiq": {
     "desde": [
      -13.5,
      3.2
     ],
     "hasta": [
      1.6,
      1.0
     ]
    },
    "volSilbato": 0.5
   }
  },
  {
   "id": "P2.7",
   "desc": "Por la puerta corredera abierta del vagón, el andén de Washington: viajeros que se cambian de vagón. La cuadrilla, en su rincón, no se mueve.",
   "img": "img/d2/p2_7.webp",
   "var": {
    "RUBY": "img/d2/p2_7_ruby.webp",
    "TEDDY": "img/d2/p2_7_teddy.webp",
    "BUSTER": "img/d2/p2_7_buster.webp",
    "XAN": "img/d2/p2_7_xan.webp"
   },
   "personajes": [
    "RUBY",
    "TEDDY",
    "BUSTER",
    "XAN"
   ],
   "pal": "ocre",
   "amb": [
    {
     "src": "sfx/d2/estacion.mp3",
     "vol": 0.4
    }
   ],
   "hechos": [
    "h12"
   ],
   "lineas": [
    {
     "id": "d2_065",
     "quien": "RUBY",
     "texto": "¡Washington! Desde aquí cada uno se sienta donde quiere.",
     "voz": "voz/d2/d2_065.mp3"
    },
    {
     "id": "d2_081",
     "quien": "TEDDY",
     "texto": "Podríamos cambiarnos a un vagón con ventanas de verdad.",
     "voz": "voz/d2/d2_081.mp3"
    },
    {
     "id": "d2_082",
     "quien": "BUSTER",
     "texto": "¿Y dejar solo al ratón? Ni hablar.",
     "voz": "voz/d2/d2_082.mp3"
    },
    {
     "id": "d2_083",
     "quien": "RUBY",
     "texto": "Nos quedamos. Este rincón es nuestro.",
     "voz": "voz/d2/d2_083.mp3"
    },
    {
     "id": "d2_067",
     "quien": "XAN",
     "texto": "¿Y por qué se acaba aquí?",
     "voz": "voz/d2/d2_067.mp3"
    },
    {
     "id": "d2_068",
     "quien": "RUBY",
     "texto": "Porque aquí se acaba el Sur. Por lo menos, en los papeles.",
     "voz": "voz/d2/d2_068.mp3"
    }
   ],
   "nombre": "Washington",
   "guion_sonido": {
    "sfx": "Frenos, vapor, andén."
   },
   "foco": {
    "TEDDY": [
     0.14,
     0.27,
     0.129
    ],
    "RUBY": [
     0.25,
     0.18,
     0.107
    ],
    "BUSTER": [
     0.4,
     0.16,
     0.118
    ],
    "SLIM": [
     0.56,
     0.16,
     0.093
    ],
    "XAN": [
     0.53,
     0.43,
     0.118
    ]
   }
  },
  {
   "id": "P2.7m",
   "nombre": "Mapa del tren: Washington → Nueva York",
   "desc": "El mapa ferroviario, más cerca: la vía sigue de Washington a Nueva York por Baltimore y Filadelfia.",
   "img": "img/d2/mapa_tren.webp",
   "pal": "tren",
   "amb": [
    {
     "src": "sfx/d2/tren_marcha.mp3",
     "vol": 0.5
    }
   ],
   "espera": 9,
   "hechos": [],
   "personajes": [],
   "mapa": {
    "tipo": "tren",
    "ruta": [
     [
      0.685,
      0.37
     ],
     [
      0.7,
      0.34
     ],
     [
      0.715,
      0.31
     ],
     [
      0.727,
      0.29
     ],
     [
      0.74,
      0.255
     ],
     [
      0.755,
      0.222
     ]
    ],
    "desde": "Washington",
    "hasta": "Nueva York",
    "sub": "Manhattan, al atardecer",
    "dur": 5.5,
    "silbato": "sfx/d2/silbato_vapor.mp3",
    "encuadre": [
     2.3,
     0.72,
     0.3
    ],
    "etiq": {
     "desde": [
      1.4,
      1.2
     ],
     "hasta": [
      -11.5,
      -1.6
     ]
    },
    "volSilbato": 0.5
   }
  },
  {
   "id": "P2.8",
   "desc": "Por la única ventanita del vagón, los rascacielos de Manhattan al atardecer; las caras de todos apretadas contra el cristal.",
   "img": "img/d2/p2_8.webp",
   "var": {
    "TEDDY": "img/d2/p2_8_teddy.webp",
    "XAN": "img/d2/p2_8_xan.webp",
    "RUBY": "img/d2/p2_8_ruby.webp",
    "SLIM": "img/d2/p2_8_slim.webp"
   },
   "personajes": [
    "XAN",
    "TEDDY",
    "RUBY",
    "SLIM"
   ],
   "pal": "madrugada",
   "amb": [
    {
     "src": "sfx/d2/tren_frena.mp3",
     "vol": 0.4
    }
   ],
   "lineas": [
    {
     "id": "d2_069",
     "quien": "XAN",
     "texto": "Avoa… si vieras esto. Edificios más altos que la Torre de Hércules… ¡y en fila!",
     "voz": "voz/d2/d2_069.mp3"
    },
    {
     "id": "d2_070",
     "quien": "TEDDY",
     "texto": "¡Nueva York! Quitaos el polvo, que vamos a un sitio de mucho glamour.",
     "voz": "voz/d2/d2_070.mp3"
    },
    {
     "id": "d2_071",
     "quien": "RUBY",
     "texto": "Toma, límpiate la cara. Pareces un fogonero.",
     "voz": "voz/d2/d2_071.mp3"
    },
    {
     "id": "d2_084",
     "quien": "SLIM",
     "texto": "En la radio de Nashville hay uno que imita ese silbido con la armónica. ¡Tal cual!",
     "voz": "voz/d2/d2_084.mp3"
    }
   ],
   "nombre": "Manhattan",
   "hechos": [
    "h48"
   ],
   "guion_sonido": {
    "sfx": "Silbato largo; el tren frena."
   },
   "foco": {
    "TEDDY": [
     0.27,
     0.32,
     0.242
    ],
    "BUSTER": [
     0.48,
     0.2,
     0.22
    ],
    "SLIM": [
     0.63,
     0.29,
     0.187
    ],
    "RUBY": [
     0.47,
     0.47,
     0.176
    ],
    "XAN": [
     0.66,
     0.64,
     0.307
    ]
   }
  },
  {
   "id": "P2.9",
   "desc": "Harlem de noche, desde la acera de enfrente: la entrada iluminada de un club elegante, limusinas, abrigos de piel. La cuadrilla y Xan, sucios del viaje y con sus instrumentos (Xan, con su estuche grande), miran.",
   "img": "img/d2/p2_9.webp",
   "personajes": [
    "TEDDY",
    "SLIM",
    "RUBY"
   ],
   "pal": "neon",
   "amb": [
    {
     "src": "sfx/d2/calle_noche.mp3",
     "vol": 0.5
    }
   ],
   "lineas": [
    {
     "id": "d2_073",
     "quien": "TEDDY",
     "texto": "Ahí lo tenéis. El Ivory Room.",
     "voz": "voz/d2/d2_073.mp3"
    },
    {
     "id": "d2_074",
     "quien": "SLIM",
     "texto": "Ivory: marfil. Como las teclas del piano… y como el público.",
     "voz": "voz/d2/d2_074.mp3"
    },
    {
     "id": "d2_085",
     "quien": "RUBY",
     "texto": "Pues en el Savoy, más arriba, se baila sin mirar el color. ¡Algún día iremos!",
     "voz": "voz/d2/d2_085.mp3"
    },
    {
     "id": "d2_075",
     "quien": "RUBY",
     "texto": "Esta noche, Xan. Esta noche se cumple todo.",
     "voz": "voz/d2/d2_075.mp3"
    },
    {
     "id": "d2_076",
     "quien": "XAN",
     "texto": "Esa noche no se cumplió nada de lo que esperaba. Te lo cuento mañana, avoa.",
     "voz": "voz/d2/d2_076.mp3",
     "var": "-"
    }
   ],
   "espera": 3.5,
   "nombre": "El Ivory Room",
   "hechos": [
    "h52"
   ],
   "guion_sonido": {
    "amb": "Calle de noche: coches antiguos, bocinas de época; música amortiguada que sale del club."
   },
   "var": {
    "TEDDY": "img/d2/p2_9_teddy.webp",
    "SLIM": "img/d2/p2_9_slim.webp",
    "RUBY": "img/d2/p2_9_ruby.webp"
   },
   "foco": {
    "TEDDY": [
     0.12,
     0.2,
     0.073
    ],
    "RUBY": [
     0.24,
     0.23,
     0.073
    ],
    "SLIM": [
     0.36,
     0.15,
     0.073
    ],
    "XAN": [
     0.31,
     0.38,
     0.073
    ],
    "BUSTER": [
     0.43,
     0.38,
     0.073
    ]
   }
  }
 ]
});
