/* BLUES · Día 3 · «Glamour y decepción» — datos generados con herramientas/guion2datos.mjs (v3).
   Los textos vienen del guion: para cambiarlos, cambiar el guion y volver a pasar la herramienta.
   Lo demás (img, var, cam, amb, mus, pal, espera, configuración de inter) se puede tocar aquí: la herramienta lo respeta.
   Formato: ver LEEME-motor.md. */
BLUES.dia(3, {
 "titulo": "Glamour y decepción",
 "lugar": "Harlem, Nueva York · diciembre de 1928",
 "carta": {
  "encabezado": "Harlem, decembro de 1928",
  "firma": "Xan",
  "texto": "Querida avoa: onte á noite toquei diante de todos. Ben… tenteino. Nunca me sentira tan pequeno. Nin sequera no fondo do barco. Cóntocho todo, aínda que me custe. Ti ensináchesme que o que doe, cántase.",
  "lineas": [
   {
    "id": "d3_c01",
    "quien": "XAN",
    "texto": "Querida avoa: onte á noite toquei diante de todos. Ben… tenteino.",
    "voz": "voz/d3/d3_c01.mp3"
   },
   {
    "id": "d3_c02",
    "quien": "XAN",
    "texto": "Nunca me sentira tan pequeno. Nin sequera no fondo do barco.",
    "voz": "voz/d3/d3_c02.mp3"
   },
   {
    "id": "d3_c03",
    "quien": "XAN",
    "texto": "Cóntocho todo, aínda que me custe. Ti ensináchesme que o que doe, cántase.",
    "voz": "voz/d3/d3_c03.mp3"
   }
  ],
  "lado": "izq"
 },
 "planos": [
  {
   "id": "P3.0",
   "desc": "Título: Harlem, de noche.",
   "img": "img/d3/p3_0.webp",
   "pal": "neon",
   "amb": [
    {
     "src": "sfx/d3/calle_harlem.mp3",
     "vol": 0.55
    }
   ],
   "lineas": [],
   "nombre": "Título",
   "titulo": true,
   "mus": {
    "src": "mus/d3_calle_jazz.mp3",
    "vol": 0.5,
    "bucle": true
   }
  },
  {
   "id": "P3.1",
   "desc": "Noche en la Séptima Avenida: la marquesina del Teatro Lafayette; a su lado, la entrada del Ivory Room; en la acera, el Árbol de la Esperanza. Limusinas; ricos con pieles entrando por la puerta principal. La cuadrilla va hacia un callejón lateral; Xan, con su estuche grande.",
   "img": "img/d3/p3_1.webp",
   "personajes": [
    "TEDDY",
    "RUBY",
    "XAN",
    "SLIM"
   ],
   "pal": "neon",
   "amb": [
    {
     "src": "sfx/d3/calle_harlem.mp3",
     "vol": 0.6
    }
   ],
   "hechos": [
    "h19",
    "h39",
    "h21"
   ],
   "lineas": [
    {
     "id": "d3_001",
     "quien": "TEDDY",
     "texto": "La Séptima Avenida. Esto es Harlem: el centro del mundo.",
     "voz": "voz/d3/d3_001.mp3",
     "sfx": [
      {
       "src": "sfx/d3/coche_antiguo.mp3",
       "t": 0.3,
       "vol": 0.45
      }
     ]
    },
    {
     "id": "d3_002",
     "quien": "RUBY",
     "texto": "Mira: el Teatro Lafayette. Y ese árbol es el Árbol de la Esperanza.",
     "voz": "voz/d3/d3_002.mp3",
     "var": "RECURSO_LAFAYETTE"
    },
    {
     "id": "d3_003",
     "quien": "XAN",
     "texto": "¿Un árbol con nombre?",
     "voz": "voz/d3/d3_003.mp3",
     "var": "RECURSO_LAFAYETTE"
    },
    {
     "id": "d3_004",
     "quien": "RUBY",
     "texto": "Los artistas lo tocan para tener suerte antes de actuar. Tócalo tú también.",
     "voz": "voz/d3/d3_004.mp3"
    },
    {
     "id": "d3_005",
     "quien": "XAN",
     "texto": "Por si acaso.",
     "voz": "voz/d3/d3_005.mp3"
    },
    {
     "id": "d3_006",
     "quien": "XAN",
     "texto": "¿Lafayette? ¿Como el marqués francés que luchó con Washington?",
     "voz": "voz/d3/d3_006.mp3"
    },
    {
     "id": "d3_007",
     "quien": "TEDDY",
     "texto": "Y como James Armistead, un esclavo que hizo de espía para él. Cuando lo liberaron, se puso su apellido.",
     "voz": "voz/d3/d3_007.mp3",
     "var": "TEDDY_CERCA"
    },
    {
     "id": "d3_008",
     "quien": "SLIM",
     "texto": "Por ahí entran los de las pieles. Nosotros, por la puerta de la cocina.",
     "voz": "voz/d3/d3_008.mp3",
     "espera": 0.4,
     "var": "RECURSO_PIELES",
     "sfx": [
      {
       "src": "sfx/d3/bocina_ford.mp3",
       "t": 0.6,
       "vol": 0.35
      }
     ]
    },
    {
     "id": "d3_009",
     "quien": "TEDDY",
     "texto": "Los músicos negros tocan dentro… pero no se pueden sentar a mirar.",
     "voz": "voz/d3/d3_009.mp3",
     "var": "RECURSO_PIELES"
    }
   ],
   "nombre": "La Séptima Avenida",
   "guion_sonido": {
    "amb": "Calle de noche: coches de época, bocinas, risas, puertas."
   },
   "foco": {
    "TEDDY": [
     0.176,
     0.17,
     0.1
    ],
    "RUBY": [
     0.333,
     0.235,
     0.09
    ],
    "BUSTER": [
     0.486,
     0.2,
     0.1
    ],
    "SLIM": [
     0.653,
     0.21,
     0.09
    ],
    "XAN": [
     0.833,
     0.2,
     0.1
    ]
   },
   "salpica": {
    "cada": [
     7,
     13
    ],
    "sonidos": [
     {
      "src": "sfx/d3/bocina_ford.mp3",
      "vol": [
       0.12,
       0.25
      ]
     },
     {
      "src": "sfx/d3/coche_antiguo.mp3",
      "vol": [
       0.15,
       0.3
      ]
     }
    ]
   },
   "var": {
    "RECURSO_LAFAYETTE": "img/d3/p3_1_recurso_lafayette.webp",
    "TEDDY_CERCA": "img/d3/p3_1_teddy_cerca.webp",
    "RECURSO_PIELES": "img/d3/p3_1_recurso_pieles.webp"
   },
   "mus": {
    "src": "mus/d3_calle_jazz.mp3",
    "vol": 0.55,
    "bucle": true
   }
  },
  {
   "id": "P3.2",
   "desc": "Interior del Ivory Room: arañas de cristal, terciopelo rojo, público blanco elegante bebiendo en tazas de té, camareros que bailan con las bandejas. En el escenario, Miss Pearl Duval canta ante un micrófono de radio; detrás, la orquesta de la casa: piano, contrabajo, batería con escobillas, trompeta con sordina, trombón y clarinete. En primer término, en la puerta de la cocina, en penumbra, la cuadrilla y Xan con su estuche.",
   "img": "img/d3/p3_2.webp",
   "personajes": [
    "RUBY",
    "TEDDY",
    "XAN",
    "BUSTER",
    "PEARL"
   ],
   "pal": "club",
   "amb": [
    {
     "src": "sfx/d3/club_gente.mp3",
     "vol": 0.55
    }
   ],
   "mus": {
    "src": "mus/cancion_pearl.mp3",
    "vol": 0.75,
    "bucle": false
   },
   "hechos": [
    "h24",
    "h23",
    "h22",
    "h27"
   ],
   "lineas": [
    {
     "id": "d3_010",
     "quien": "RUBY",
     "texto": "Mira las tazas. Es champán, no té. Con la Ley Seca, aquí todo se disimula.",
     "voz": "voz/d3/d3_010.mp3",
     "var": "RECURSO_TAZAS",
     "sfx": [
      {
       "src": "sfx/d3/copas.mp3",
       "t": 0.4,
       "vol": 0.55
      }
     ]
    },
    {
     "id": "d3_011",
     "quien": "TEDDY",
     "texto": "Y los camareros bailan con las bandejas. Dicen que en el Small's van hasta en patines.",
     "voz": "voz/d3/d3_011.mp3",
     "var": "RECURSO_TAZAS"
    },
    {
     "id": "d3_012",
     "quien": "XAN",
     "texto": "¿Y ese micrófono tan grande?",
     "voz": "voz/d3/d3_012.mp3"
    },
    {
     "id": "d3_013",
     "quien": "RUBY",
     "texto": "Es de la radio. Lo que canta Miss Pearl lo oye media América desde su salón.",
     "voz": "voz/d3/d3_013.mp3"
    },
    {
     "id": "d3_014",
     "quien": "XAN",
     "texto": "¿Y quién es ella?",
     "voz": "voz/d3/d3_014.mp3"
    },
    {
     "id": "d3_015",
     "quien": "TEDDY",
     "texto": "Miss Pearl Duval, la reina del Ivory Room. Canta como un ángel… y muerde como un perro.",
     "voz": "voz/d3/d3_015.mp3",
     "var": "PEARL_CERCA"
    },
    {
     "id": "d3_016",
     "quien": "RUBY",
     "texto": "Esta noche ella manda en la jam. Si le caes mal, no vuelves a tocar en Harlem.",
     "voz": "voz/d3/d3_016.mp3",
     "var": "PEARL_CERCA"
    },
    {
     "id": "d3_017",
     "quien": "BUSTER",
     "texto": "¿Sabéis cuántos discos vendió Mamie Smith con «Crazy Blues»? ¡Setenta y cinco mil en dos meses!",
     "voz": "voz/d3/d3_017.mp3",
     "var": "BUSTER_CERCA"
    },
    {
     "id": "d3_018",
     "quien": "TEDDY",
     "texto": "Y aquí hay pianistas que tocan con la izquierda como si fueran dos. Le llaman stride.",
     "voz": "voz/d3/d3_018.mp3",
     "var": "RECURSO_STRIDE"
    },
    {
     "id": "d3_019",
     "quien": "RUBY",
     "texto": "Y cuando no hay para el alquiler, se monta una fiesta en casa: pagas unas monedas y la música es gratis.",
     "voz": "voz/d3/d3_019.mp3"
    },
    {
     "id": "d3_020",
     "quien": "PEARL",
     "texto": "Thank you, darlings. Gracias. Y ahora, a casa, que les esperan sus limusinas.",
     "voz": "voz/d3/d3_020.mp3",
     "var": "PEARL_HABLA_CERCA",
     "sfx": [
      {
       "src": "sfx/d3/aplauso.mp3",
       "t": 0,
       "vol": 0.45
      }
     ]
    },
    {
     "id": "d3_021",
     "quien": "PEARL",
     "texto": "Y a los que el jueves vayan al Carnegie Hall a oír al señor Gershwin: díganle que Harlem le manda saludos.",
     "voz": "voz/d3/d3_021.mp3",
     "var": "RECURSO_PUBLICO"
    }
   ],
   "nombre": "El rincón de la cocina",
   "guion_sonido": {
    "amb": "Club: murmullo elegante, copas, cubiertos, risas.",
    "mus": "«Champagne in a Teacup», la canción de Pearl (Suno: su voz con piano, contrabajo, batería con escobillas, trompeta con sordina, trombón y clarinete; nada más): en primer plano al empezar; baja cuando hablan."
   },
   "cam": {
    "de": [
     1.1,
     0.35,
     0.5
    ],
    "a": [
     1.04,
     0.55,
     0.45
    ]
   },
   "foco": {
    "TEDDY": [
     0.1,
     0.12,
     0.09
    ],
    "RUBY": [
     0.17,
     0.235,
     0.09
    ],
    "BUSTER": [
     0.236,
     0.18,
     0.09
    ],
    "SLIM": [
     0.326,
     0.21,
     0.09
    ],
    "XAN": [
     0.29,
     0.47,
     0.09
    ],
    "PEARL": [
     0.79,
     0.1,
     0.08
    ]
   },
   "salpica": {
    "cada": [
     5,
     10
    ],
    "sonidos": [
     {
      "src": "sfx/d3/copas.mp3",
      "vol": [
       0.2,
       0.4
      ]
     },
     {
      "src": "sfx/d3/risas_cortas.mp3",
      "vol": [
       0.08,
       0.16
      ]
     }
    ]
   },
   "var": {
    "RECURSO_TAZAS": "img/d3/p3_2_recurso_tazas.webp",
    "PEARL_CERCA": "img/d3/p3_2_pearl_cerca.webp",
    "BUSTER_CERCA": "img/d3/p3_2_buster_cerca.webp",
    "RECURSO_STRIDE": "img/d3/p3_2_recurso_stride.webp",
    "PEARL_HABLA_CERCA": "img/d3/p3_2_pearl_habla.webp",
    "RECURSO_PUBLICO": "img/d3/p3_2_pearl_publico.webp"
   }
  },
  {
   "id": "P3.3",
   "desc": "Las dos de la madrugada. Los ricos se han ido; sillas sobre las mesas, humo. En el escenario quedan el pianista, el contrabajista y el batería de la casa; músicos de Harlem esperan turno con sus instrumentos en la mano. Pearl, sentada en el borde del escenario como una reina. Slim agarra el brazo de Xan y se lo levanta.",
   "img": "img/d3/p3_3.webp",
   "personajes": [
    "RUBY",
    "XAN",
    "TEDDY",
    "SLIM",
    "PEARL"
   ],
   "pal": "club",
   "amb": [
    {
     "src": "sfx/d3/club_tarde.mp3",
     "vol": 0.5
    }
   ],
   "hechos": [
    "h25",
    "h55",
    "h51"
   ],
   "lineas": [
    {
     "id": "d3_061",
     "quien": "PEARL",
     "texto": "Se acabó el espectáculo para los ricos, darlings. Ahora empieza lo bueno: la jam.",
     "voz": "voz/d3/d3_061.mp3"
    },
    {
     "id": "d3_062",
     "quien": "PEARL",
     "texto": "Quien tenga algo que decir… que suba y lo diga.",
     "voz": "voz/d3/d3_062.mp3"
    },
    {
     "id": "d3_022",
     "quien": "XAN",
     "texto": "¿Qué es exactamente una jam?",
     "voz": "voz/d3/d3_022.mp3"
    },
    {
     "id": "d3_023",
     "quien": "RUBY",
     "texto": "Así lo llaman ahora los músicos. Suben y tocan juntos, sin ensayar. Uno empieza y los demás le siguen.",
     "voz": "voz/d3/d3_023.mp3",
     "var": "RECURSO_JAM"
    },
    {
     "id": "d3_024",
     "quien": "RUBY",
     "texto": "Y a veces es un duelo, un cutting contest: a ver quién corta a quién.",
     "voz": "voz/d3/d3_024.mp3",
     "var": "RECURSO_JAM"
    },
    {
     "id": "d3_025",
     "quien": "TEDDY",
     "texto": "Los pianistas de aquí se baten como espadachines. Gana el que más se atreve.",
     "voz": "voz/d3/d3_025.mp3"
    },
    {
     "id": "d3_026",
     "quien": "XAN",
     "texto": "¿Y si te equivocas?",
     "voz": "voz/d3/d3_026.mp3"
    },
    {
     "id": "d3_027",
     "quien": "SLIM",
     "texto": "Si te equivocas, te comen.",
     "voz": "voz/d3/d3_027.mp3"
    },
    {
     "id": "d3_028",
     "quien": "PEARL",
     "texto": "A ver, trompeta de Nueva Orleans. Sorpréndeme.",
     "voz": "voz/d3/d3_028.mp3"
    }
   ],
   "nombre": "Después del cierre",
   "mus": {
    "src": "mus/d3_jam.mp3",
    "vol": 0.34,
    "bucle": false
   },
   "foco": {
    "TEDDY": [
     0.09,
     0.205,
     0.09
    ],
    "RUBY": [
     0.17,
     0.28,
     0.09
    ],
    "BUSTER": [
     0.25,
     0.22,
     0.09
    ],
    "SLIM": [
     0.333,
     0.26,
     0.09
    ],
    "XAN": [
     0.285,
     0.53,
     0.09
    ],
    "PEARL": [
     0.695,
     0.21,
     0.09
    ]
   },
   "var": {
    "RECURSO_JAM": "img/d3/p3_3_recurso_jam.webp",
    "XAN_BRAZO": "img/d3/p3_3_xan_brazo.webp"
   }
  },
  {
   "id": "P3.3b",
   "desc": "Teddy toca su chorus con la trompeta con sordina; detrás, el trío de la casa.",
   "nombre": "El chorus de Teddy",
   "img": "img/d3/p3_3_teddy_trompeta.webp",
   "pal": "club",
   "personajes": [
    "TEDDY"
   ],
   "amb": [
    {
     "src": "sfx/d3/club_tarde.mp3",
     "vol": 0.35
    }
   ],
   "lineas": [
    {
     "id": "d3_055",
     "quien": "TEDDY",
     "texto": "Esto va por Louis Armstrong, que también es de Nueva Orleans.",
     "voz": "voz/d3/d3_055.mp3",
     "espera": 6.93
    }
   ],
   "hechos": [],
   "espera": 0.3,
   "foco": {
    "TEDDY": [
     0.493,
     0.148,
     0.09
    ]
   },
   "mus": {
    "src": "mus/d3_chorus.mp3",
    "vol": 0.85,
    "bucle": false
   }
  },
  {
   "id": "P3.3b2",
   "desc": "Pearl escucha el solo: medio convencida, sin querer demostrarlo.",
   "nombre": "Pearl escucha",
   "img": "img/d3/p3_3_pearl_reaccion.webp",
   "pal": "club",
   "amb": [
    {
     "src": "sfx/d3/club_tarde.mp3",
     "vol": 0.35
    }
   ],
   "mus": {
    "src": "mus/d3_chorus.mp3",
    "vol": 0.85,
    "bucle": false
   },
   "lineas": [],
   "hechos": [],
   "espera": 4.9
  },
  {
   "id": "P3.3b3",
   "desc": "Teddy toca su chorus con la trompeta con sordina; detrás, el trío de la casa.",
   "nombre": "El final del chorus",
   "img": "img/d3/p3_3_teddy_trompeta.webp",
   "pal": "club",
   "personajes": [
    "TEDDY"
   ],
   "amb": [
    {
     "src": "sfx/d3/club_tarde.mp3",
     "vol": 0.35
    }
   ],
   "lineas": [],
   "hechos": [],
   "espera": 6.87,
   "mus": {
    "src": "mus/d3_chorus.mp3",
    "vol": 0.85,
    "bucle": false
   }
  },
  {
   "id": "P3.3c",
   "desc": "Las dos de la madrugada. Los ricos se han ido; sillas sobre las mesas, humo. En el escenario quedan el pianista, el contrabajista y el batería de la casa; músicos de Harlem esperan turno con sus instrumentos en la mano. Pearl, sentada en el borde del escenario como una reina. Slim agarra el brazo de Xan y se lo levanta.",
   "nombre": "¿Quién más se atreve?",
   "img": "img/d3/p3_3.webp",
   "pal": "club",
   "personajes": [
    "RUBY",
    "XAN",
    "TEDDY",
    "SLIM",
    "PEARL"
   ],
   "var": {
    "XAN_BRAZO": "img/d3/p3_3_xan_brazo.webp"
   },
   "foco": {
    "TEDDY": [
     0.09,
     0.205,
     0.09
    ],
    "RUBY": [
     0.17,
     0.28,
     0.09
    ],
    "BUSTER": [
     0.25,
     0.22,
     0.09
    ],
    "SLIM": [
     0.333,
     0.26,
     0.09
    ],
    "XAN": [
     0.285,
     0.53,
     0.09
    ],
    "PEARL": [
     0.695,
     0.21,
     0.09
    ]
   },
   "amb": [
    {
     "src": "sfx/d3/club_tarde.mp3",
     "vol": 0.5
    }
   ],
   "mus": {
    "src": "mus/d3_trio.mp3",
    "vol": 0.3,
    "bucle": true
   },
   "lineas": [
    {
     "id": "d3_029",
     "quien": "PEARL",
     "texto": "Nada mal, muchacho. Nada mal. ¿Quién más se atreve?",
     "voz": "voz/d3/d3_029.mp3"
    },
    {
     "id": "d3_030",
     "quien": "TEDDY",
     "texto": "¿Lo ves? Esto no se escribe.",
     "voz": "voz/d3/d3_030.mp3"
    },
    {
     "id": "d3_031",
     "quien": "SLIM",
     "texto": "¡Eh, Miss Pearl! ¡El gallego quiere tocar!",
     "voz": "voz/d3/d3_031.mp3",
     "espera": 0.9,
     "var": "XAN_BRAZO"
    },
    {
     "id": "d3_032",
     "quien": "XAN",
     "texto": "¡¿Qué?! ¡No, no, yo no…!",
     "voz": "voz/d3/d3_032.mp3",
     "var": "XAN_BRAZO"
    },
    {
     "id": "d3_033",
     "quien": "PEARL",
     "texto": "¿Un gallego? ¿Eso qué es? ¿Se come?",
     "voz": "voz/d3/d3_033.mp3",
     "sfx": [
      {
       "src": "sfx/d3/risas_cortas.mp3",
       "t": 1.2,
       "vol": 0.45
      }
     ]
    },
    {
     "id": "d3_034",
     "quien": "PEARL",
     "texto": "Que suba. Esta noche estoy de buen humor.",
     "voz": "voz/d3/d3_034.mp3"
    },
    {
     "id": "d3_035",
     "quien": "RUBY",
     "texto": "Coge el acordeón, Xan.",
     "voz": "voz/d3/d3_035.mp3"
    }
   ],
   "hechos": []
  },
  {
   "id": "P3.4",
   "desc": "Xan sube al escenario con las manos vacías; al fondo, su estuche negro y grande, olvidado en una mesa. Pearl le mira de arriba abajo.",
   "img": "img/d3/p3_4.webp",
   "personajes": [
    "PEARL",
    "XAN"
   ],
   "pal": "club",
   "amb": [
    {
     "src": "sfx/d3/club_tarde.mp3",
     "vol": 0.45
    },
    {
     "src": "sfx/d3/risas.mp3",
     "vol": 0.3
    }
   ],
   "lineas": [],
   "nombre": "Sin instrumento",
   "hechos": [
    "h26"
   ],
   "guion_sonido": {
    "sfx": "Pasos en la tarima; risas sueltas."
   },
   "mus": {
    "src": "mus/d3_trio.mp3",
    "vol": 0.3,
    "bucle": true
   },
   "foco": {
    "XAN": [
     0.417,
     0.108,
     0.08
    ],
    "PEARL": [
     0.754,
     0.404,
     0.09
    ]
   },
   "var": {
    "RECURSO_PARTITURA": "img/d3/p3_4_recurso_partitura.webp"
   },
   "inter": {
    "tipo": "acordeonDecide",
    "desc": "Xan mira su acordeón: ¿sube con él o sin él? Con él, Pearl lo manda al piano; sin él, «¿has venido sin instrumento?».",
    "lineas": {
     "si": [
      {
       "id": "d3_068",
       "quien": "PEARL",
       "texto": "¿Y esa caja? ¿Un acordeón? Nada, nada, muchacho: tú, al piano. Esa caja déjala ahí, que luego me sirve para guardar el abrigo.",
       "voz": "voz/d3/d3_068.mp3"
      }
     ],
     "no": [
      {
       "id": "d3_036",
       "quien": "PEARL",
       "texto": "Muchacho, ¿has venido sin instrumento?",
       "voz": "voz/d3/d3_036.mp3"
      }
     ]
    }
   },
   "despues": [
    {
     "id": "d3_037",
     "quien": "XAN",
     "texto": "Sé tocar el piano. Un poco.",
     "voz": "voz/d3/d3_037.mp3"
    },
    {
     "id": "d3_038",
     "quien": "PEARL",
     "texto": "Pues ahí lo tienes. Tócame algo.",
     "voz": "voz/d3/d3_038.mp3",
     "sfx": [
      {
       "src": "sfx/d3/tapa_piano.mp3",
       "t": 2.55,
       "vol": 0.7
      }
     ]
    },
    {
     "id": "d3_039",
     "quien": "XAN",
     "texto": "Pero aquí no hay notas… Solo letras. G7… C7… D7…",
     "voz": "voz/d3/d3_039.mp3",
     "var": "RECURSO_PARTITURA"
    },
    {
     "id": "d3_040",
     "quien": "PEARL",
     "texto": "¿Letras? Cariño, eso es cifrado americano. Lo lee hasta el camarero.",
     "voz": "voz/d3/d3_040.mp3"
    }
   ]
  },
  {
   "id": "P3.5",
   "desc": "Pearl, apoyada en la tapa del piano con la boquilla; Xan, sentado en la banqueta, rígido. Detrás, los músicos miran.",
   "img": "img/d3/p3_5.webp",
   "personajes": [
    "PEARL",
    "XAN"
   ],
   "pal": "club",
   "hechos": [
    "h43"
   ],
   "lineas": [
    {
     "id": "d3_041",
     "quien": "PEARL",
     "texto": "¿Has tocado blues alguna vez, muchacho?",
     "voz": "voz/d3/d3_041.mp3",
     "sfx": [
      {
       "src": "sfx/d3/encendedor.mp3",
       "t": 0.2,
       "vol": 0.5
      }
     ]
    },
    {
     "id": "d3_042",
     "quien": "XAN",
     "texto": "No… Bueno, un fogonero me enseñó a contestar a una armónica.",
     "voz": "voz/d3/d3_042.mp3",
     "espera": 0.3,
     "var": "XAN_CERCA"
    },
    {
     "id": "d3_043",
     "quien": "PEARL",
     "texto": "Un fogonero. Escucha, que lo digo una vez: doce compases.",
     "voz": "voz/d3/d3_043.mp3",
     "var": "PEARL_CERCA"
    },
    {
     "id": "d3_063",
     "quien": "PEARL",
     "texto": "Cuatro compases sobre el uno. Dos sobre el cuatro. Dos sobre el uno.",
     "voz": "voz/d3/d3_063.mp3"
    },
    {
     "id": "d3_044",
     "quien": "PEARL",
     "texto": "Luego el cinco, el cuatro, el uno… y el cinco para volver a empezar.",
     "voz": "voz/d3/d3_044.mp3"
    },
    {
     "id": "d3_064",
     "quien": "PEARL",
     "texto": "Eso vale para cualquier blues, en cualquier tono. Aquí, en Sol: el uno es G7, el cuatro es C7 y el cinco es D7.",
     "voz": "voz/d3/d3_064.mp3",
     "var": "XAN_CERCA"
    },
    {
     "id": "d3_045",
     "quien": "PEARL",
     "texto": "G es Sol, C es Do, D es Re. Y el siete, la séptima menor encima. ¿Fácil? Fácil.",
     "voz": "voz/d3/d3_045.mp3",
     "var": "XAN_CERCA"
    },
    {
     "id": "d3_046",
     "quien": "PEARL",
     "texto": "A es La, B es Si… ¿o eso también es secreto en Europa?",
     "voz": "voz/d3/d3_046.mp3",
     "var": "PEARL_CERCA"
    },
    {
     "id": "d3_047",
     "quien": "PEARL",
     "texto": "Y ahora, a ver si lees más deprisa de lo que piensas.",
     "voz": "voz/d3/d3_047.mp3"
    }
   ],
   "nombre": "Doce compases",
   "amb": [
    {
     "src": "sfx/d3/club_tarde.mp3",
     "vol": 0.4
    }
   ],
   "mus": {
    "src": "mus/d3_trio.mp3",
    "vol": 0.3,
    "bucle": true
   },
   "foco": {
    "XAN": [
     0.264,
     0.36,
     0.11
    ],
    "PEARL": [
     0.68,
     0.151,
     0.1
    ]
   },
   "salpica": {
    "cada": [
     8,
     14
    ],
    "sonidos": [
     {
      "src": "sfx/d3/risas_cortas.mp3",
      "vol": [
       0.06,
       0.12
      ]
     },
     {
      "src": "sfx/d3/copas.mp3",
      "vol": [
       0.1,
       0.2
      ]
     }
    ]
   },
   "var": {
    "XAN_CERCA": "img/d3/p3_5_xan_cerca.webp",
    "PEARL_CERCA": "img/d3/p3_5_pearl_cerca.webp"
   }
  },
  {
   "id": "P3.6",
   "desc": "Primer plano del atril con el cifrado; detrás, borrosos, los músicos y el público de la jam. Las manos de Xan sobre el teclado.",
   "img": "img/d3/p3_5_xan_cerca.webp",
   "personajes": [
    "PEARL"
   ],
   "pal": "club",
   "amb": [
    {
     "src": "sfx/d3/club_tarde.mp3",
     "vol": 0.35
    }
   ],
   "lineas": [],
   "inter": {
    "tipo": "cifrado",
    "desc": "Minijuego hecho para fracasar: R1 letra → nota sin tiempo; R2 con cuenta atrás (8 s, 7, 6…); R3 acordes mayores y menores (−) nota a nota; R4 + y °; R5 sus; R6 Δ y −7. Tres fallos y se acabó.",
    "lineas": {
     "r1": [
      {
       "id": "d3_r001",
       "quien": "PEARL",
       "texto": "Empecemos por lo fácil. Te digo una letra y tú me das la nota.",
       "voz": "voz/d3/d3_r001.mp3"
      }
     ],
     "r1_bien": [
      {
       "id": "d3_r002",
       "quien": "PEARL",
       "texto": "Bien. Mi perro también lo hace, pero bien.",
       "voz": "voz/d3/d3_r002.mp3"
      }
     ],
     "r2": [
      {
       "id": "d3_r003",
       "quien": "PEARL",
       "texto": "Ahora, con reloj. Aquí la música no espera a nadie.",
       "voz": "voz/d3/d3_r003.mp3"
      }
     ],
     "r2_prisa": [
      {
       "id": "d3_r004",
       "quien": "PEARL",
       "texto": "¡Tic, tac, muchacho!",
       "voz": "voz/d3/d3_r004.mp3"
      }
     ],
     "r3": [
      {
       "id": "d3_r005",
       "quien": "PEARL",
       "texto": "La letra sola es un acorde mayor. Con un menos, menor. Tres notas, una detrás de otra.",
       "voz": "voz/d3/d3_r005.mp3"
      }
     ],
     "r4": [
      {
       "id": "d3_r006",
       "quien": "PEARL",
       "texto": "Más difícil: el más es aumentado. El circulito, disminuido.",
       "voz": "voz/d3/d3_r006.mp3"
      }
     ],
     "r5": [
      {
       "id": "d3_r007",
       "quien": "PEARL",
       "texto": "Sus: la tercera se va de vacaciones y viene la cuarta.",
       "voz": "voz/d3/d3_r007.mp3"
      }
     ],
     "r6": [
      {
       "id": "d3_r008",
       "quien": "PEARL",
       "texto": "Y para nota: el triángulo es séptima mayor. Menos siete, menor con séptima. Cuatro notas.",
       "voz": "voz/d3/d3_r008.mp3"
      }
     ],
     "fallo": [
      {
       "id": "d3_r009",
       "quien": "PEARL",
       "texto": "Uy.",
       "voz": "voz/d3/d3_r009.mp3"
      },
      {
       "id": "d3_r010",
       "quien": "PEARL",
       "texto": "¿Eso era un acorde o un estornudo?",
       "voz": "voz/d3/d3_r010.mp3"
      },
      {
       "id": "d3_r011",
       "quien": "PEARL",
       "texto": "Más deprisa, cariño, que se calienta el champán.",
       "voz": "voz/d3/d3_r011.mp3"
      },
      {
       "id": "d3_r012",
       "quien": "PEARL",
       "texto": "Al público se le está acabando la paciencia.",
       "voz": "voz/d3/d3_r012.mp3"
      }
     ],
     "tiempo": [
      {
       "id": "d3_r013",
       "quien": "PEARL",
       "texto": "Se acabó el tiempo. En Harlem, el tiempo es lo único que no se fía.",
       "voz": "voz/d3/d3_r013.mp3"
      }
     ],
     "todo": [
      {
       "id": "d3_r014",
       "quien": "PEARL",
       "texto": "Muy bien, muchacho. Ahora, a tempo. One, two, one-two-three-four!",
       "voz": "voz/d3/d3_r014.mp3"
      }
     ]
    },
    "recursos": [
     "sfx/d3/reloj.mp3",
     "sfx/d3/tension_fondo.mp3",
     "sfx/d3/latido.mp3",
     "sfx/d3/tension_sube.mp3"
    ]
   },
   "nombre": "El atril",
   "hechos": [],
   "guion_sonido": {
    "amb": "Murmullo que va subiendo; risas; un reloj."
   },
   "foco": {}
  },
  {
   "id": "P3.7",
   "desc": "Xan se levanta del piano; risas, algún silbido. Pearl, de espaldas, ya mirando a otro músico. Ruby, al fondo, con el estuche grande de Xan en las manos.",
   "img": "img/d3/p3_7.webp",
   "personajes": [
    "PEARL",
    "SLIM",
    "RUBY"
   ],
   "pal": "club",
   "amb": [
    {
     "src": "sfx/d3/club_tarde.mp3",
     "vol": 0.45
    },
    {
     "src": "sfx/d3/risas.mp3",
     "vol": 0.35
    }
   ],
   "lineas": [
    {
     "id": "d3_048",
     "quien": "PEARL",
     "texto": "Vuelve cuando sepas lo que es un blues, cariño.",
     "voz": "voz/d3/d3_048.mp3",
     "sfx": [
      {
       "src": "sfx/d3/risas_cortas.mp3",
       "t": 2.67,
       "vol": 0.5
      },
      {
       "src": "sfx/d3/badumtss.mp3",
       "t": 3.07,
       "vol": 0.6
      }
     ],
     "var": "-"
    },
    {
     "id": "d3_049",
     "quien": "SLIM",
     "texto": "¡Te lo dije! ¡Te han comido!",
     "voz": "voz/d3/d3_049.mp3",
     "sfx": [
      {
       "src": "sfx/d3/abucheo.mp3",
       "t": 0,
       "vol": 0.35
      }
     ]
    },
    {
     "id": "d3_050",
     "quien": "RUBY",
     "texto": "¡Slim, cállate de una vez!",
     "voz": "voz/d3/d3_050.mp3"
    }
   ],
   "nombre": "Las risas",
   "hechos": [],
   "guion_sonido": {
    "sfx": "Risas, abucheo suave, un platillo burlón."
   },
   "mus": {
    "src": "mus/d3_trio.mp3",
    "vol": 0.3,
    "bucle": true
   },
   "foco": {
    "XAN": [
     0.68,
     0.215,
     0.08
    ],
    "PEARL": [
     0.855,
     0.1,
     0.07
    ],
    "RUBY": [
     0.183,
     0.245,
     0.07
    ],
    "SLIM": [
     0.43,
     0.21,
     0.07
    ],
    "TEDDY": [
     0.088,
     0.19,
     0.07
    ],
    "BUSTER": [
     0.325,
     0.19,
     0.07
    ]
   }
  },
  {
   "id": "P3.8",
   "desc": "Fuera, de madrugada, frío. Xan llora apoyado en el tronco del Árbol de la Esperanza; le asoma de la chaqueta el billete de barco. Un hombre maduro y alto, de pelo y bigote entrecanos, con abrigo y gorra, le pone una mano en el hombro.",
   "img": "img/d3/p3_8.webp",
   "personajes": [
    "XAN"
   ],
   "pal": "madrugada",
   "amb": [
    {
     "src": "sfx/d3/amanecer_lluvia.mp3",
     "vol": 0.6
    }
   ],
   "lineas": [
    {
     "id": "d3_052",
     "quien": "XAN",
     "texto": "Avoa… igual non debín vir.",
     "voz": "voz/d3/d3_052.mp3"
    },
    {
     "id": "d3_053",
     "quien": "XAN",
     "texto": "Non sei que é un blues. Non sei nin quen son aquí.",
     "voz": "voz/d3/d3_053.mp3"
    }
   ],
   "espera": 0.6,
   "nombre": "El Árbol de la Esperanza",
   "hechos": [
    "h20"
   ],
   "guion_sonido": {
    "amb": "Calle vacía, viento, un tren elevado a lo lejos.",
    "mus": "La nana cantada por Xan, a capela y muy bajito (Suno «Blues · Nana cantada por Xan (E)»)."
   },
   "foco": {
    "XAN": [
     0.345,
     0.45,
     0.08
    ]
   }
  },
  {
   "id": "P3.8b",
   "desc": "La nana",
   "nombre": "La nana",
   "img": "img/d3/p3_8_xan_cerca.webp",
   "pal": "madrugada",
   "amb": [
    {
     "src": "sfx/d3/amanecer_lluvia.mp3",
     "vol": 0.6
    }
   ],
   "mus": {
    "src": "mus/nana_xan_arbol.mp3",
    "vol": 0.85,
    "bucle": false
   },
   "lineas": [],
   "hechos": [],
   "espera": 11.5
  },
  {
   "id": "P3.8c",
   "desc": "El billete",
   "nombre": "El billete",
   "img": "img/d3/p3_8_recurso_billete.webp",
   "pal": "madrugada",
   "amb": [
    {
     "src": "sfx/d3/amanecer_lluvia.mp3",
     "vol": 0.6
    }
   ],
   "mus": {
    "src": "mus/nana_xan_arbol.mp3",
    "vol": 0.85,
    "bucle": false
   },
   "lineas": [],
   "hechos": [],
   "espera": 10.5
  },
  {
   "id": "P3.8d",
   "desc": "Amanece",
   "nombre": "Amanece",
   "img": "img/d3/p3_8_recurso_calle.webp",
   "pal": "madrugada",
   "amb": [
    {
     "src": "sfx/d3/amanecer_lluvia.mp3",
     "vol": 0.6
    }
   ],
   "mus": {
    "src": "mus/nana_xan_arbol.mp3",
    "vol": 0.85,
    "bucle": false
   },
   "lineas": [],
   "hechos": [],
   "espera": 11.8
  },
  {
   "id": "P3.8e",
   "desc": "Eli, el hombre del abrigo, se acerca a Xan bajo el Árbol de la Esperanza.",
   "nombre": "Eli",
   "pal": "madrugada",
   "amb": [
    {
     "src": "sfx/d3/amanecer_lluvia.mp3",
     "vol": 0.6
    }
   ],
   "personajes": [
    "XAN",
    "ELI"
   ],
   "lineas": [
    {
     "id": "d3_065",
     "quien": "ELI",
     "texto": "Ese billete que te asoma… A Coruña, ¿verdad?",
     "voz": "voz/d3/d3_065.mp3",
     "espera": 0.9,
     "var": "ELI_CERCA"
    },
    {
     "id": "d3_056",
     "quien": "XAN",
     "texto": "¿Quién… quién es usted?",
     "voz": "voz/d3/d3_056.mp3",
     "var": "ELI_CERCA"
    },
    {
     "id": "d3_057",
     "quien": "ELI",
     "texto": "Alguien que te ha visto ahí dentro. Y lo has hecho bien.",
     "voz": "voz/d3/d3_057.mp3",
     "var": "ELI_CERCA"
    },
    {
     "id": "d3_058",
     "quien": "XAN",
     "texto": "¿Bien? Se han reído de mí.",
     "voz": "voz/d3/d3_058.mp3"
    },
    {
     "id": "d3_066",
     "quien": "ELI",
     "texto": "Se reían porque te veían inseguro. Si tocas sin presión, relajado, nadie se ríe.",
     "voz": "voz/d3/d3_066.mp3"
    },
    {
     "id": "d3_067",
     "quien": "ELI",
     "texto": "Y el talento lo llevas en los genes. Eso lo sé perfectamente.",
     "voz": "voz/d3/d3_067.mp3"
    },
    {
     "id": "d3_060",
     "quien": "ELI",
     "texto": "Lo demás se aprende. Ven conmigo, chaval: te voy a enseñar lo que un día me enseñaron a mí.",
     "voz": "voz/d3/d3_060.mp3",
     "var": "ELI_CERCA"
    }
   ],
   "hechos": [],
   "espera": 3,
   "img": "img/d3/p3_8_dos.webp",
   "var": {
    "ELI_CERCA": "img/d3/p3_8_eli.webp"
   },
   "foco": {
    "ELI": [
     0.368,
     0.139,
     0.09
    ],
    "XAN": [
     0.66,
     0.472,
     0.085
    ]
   },
   "mus": {
    "src": "mus/nana_xan_arbol.mp3",
    "vol": 0.85,
    "bucle": false
   }
  }
 ]
});
