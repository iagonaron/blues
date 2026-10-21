/* BLUES · Día 4 · «El blues de John» — datos generados con herramientas/guion2datos.mjs (v3).
   Los textos vienen del guion: para cambiarlos, cambiar el guion y volver a pasar la herramienta.
   Lo demás (img, var, cam, amb, mus, pal, espera, configuración de inter) se puede tocar aquí: la herramienta lo respeta.
   Formato: ver LEEME-motor.md. */
BLUES.dia(4, {
 "titulo": "El blues de John",
 "lugar": "Weeksville, Brooklyn · diciembre de 1928",
 "carta": {
  "encabezado": "Brooklyn, decembro de 1928",
  "firma": "Xan",
  "texto": "Querida avoa: teño que contarche unha cousa do avó. E non sei como. Así que cha conto como ma contaron a min: amodo, nun porche, cunha guitarra.",
  "lineas": [
   {
    "id": "d4_c01",
    "quien": "XAN",
    "texto": "Querida avoa: teño que contarche unha cousa do avó. E non sei como.",
    "voz": "voz/d4/d4_c01.mp3"
   },
   {
    "id": "d4_c02",
    "quien": "XAN",
    "texto": "Así que cha conto como ma contaron a min: amodo, nun porche, cunha guitarra.",
    "voz": "voz/d4/d4_c02.mp3"
   }
  ]
 },
 "planos": [
  {
   "id": "P4.0",
   "desc": "Título: Brooklyn por la mañana, luz de otoño.",
   "img": "img/d4/p4_0.webp",
   "pal": "otono",
   "amb": [
    {
     "src": "sfx/d4/ciudad_manana.mp3",
     "vol": 0.4
    },
    {
     "src": "sfx/d4/tren_lejos.mp3",
     "vol": 0.3
    },
    {
     "src": "sfx/d4/pajaros.mp3",
     "vol": 0.15
    }
   ],
   "lineas": [],
   "nombre": "Título",
   "titulo": true
  },
  {
   "id": "P4.1",
   "desc": "Vagón del tren elevado de Brooklyn por la mañana: Eli (unos cincuenta años, pelo y bigote entrecanos) y Xan, con las manos vacías, sentados juntos; por la ventanilla, tejados y depósitos de agua.",
   "img": "img/d4/p4_1.webp",
   "personajes": [
    "ELI",
    "XAN"
   ],
   "pal": "otono",
   "amb": [
    {
     "src": "sfx/d4/tren_dentro.mp3",
     "vol": 0.45
    },
    {
     "src": "sfx/d4/tren_elevado.mp3",
     "vol": 0.35
    }
   ],
   "lineas": [
    {
     "id": "d4_001",
     "quien": "ELI",
     "texto": "Me llamo Eli. Y antes de que preguntes: no, no soy tu abuelo.",
     "voz": "voz/d4/d4_001.mp3",
     "var": "ELI_CERCA"
    },
    {
     "id": "d4_002",
     "quien": "XAN",
     "texto": "Ya. El avó tendría ya sesenta y tantos. ¿Cómo sabía quién era yo?",
     "voz": "voz/d4/d4_002.mp3",
     "var": "XAN_CERCA"
    },
    {
     "id": "d4_003",
     "quien": "ELI",
     "texto": "Anoche estaba en el club, al fondo. Te vi subir. No supe que eras tú hasta que vi tu billete.",
     "voz": "voz/d4/d4_003.mp3",
     "var": "RECURSO_BILLETE"
    },
    {
     "id": "d4_004",
     "quien": "ELI",
     "texto": "Ese billete lo compré yo.",
     "voz": "voz/d4/d4_004.mp3"
    },
    {
     "id": "d4_005",
     "quien": "XAN",
     "texto": "¿Usted? Pero la lata… creíamos que…",
     "voz": "voz/d4/d4_005.mp3"
    },
    {
     "id": "d4_006",
     "quien": "ELI",
     "texto": "Lo sé. Te lo explico en casa. En casa de John.",
     "voz": "voz/d4/d4_006.mp3"
    }
   ],
   "nombre": "El tren elevado",
   "hechos": [],
   "guion_sonido": {
    "amb": "Tren elevado: traqueteo metálico, frenos, puertas."
   },
   "foco": {
    "ELI": [
     0.36,
     0.25,
     0.33
    ],
    "XAN": [
     0.67,
     0.26,
     0.3
    ]
   },
   "var": {
    "RECURSO_BILLETE": "img/d4/p4_1_recurso_billete.webp",
    "ELI_CERCA": "img/d4/p4_1_eli_cerca.webp",
    "XAN_CERCA": "img/d4/p4_1_xan_cerca.webp"
   }
  },
  {
   "id": "P4.1m",
   "nombre": "Mapa del tren: Harlem → Weeksville",
   "desc": "Mapa antiguo de Nueva York: el tren elevado baja de Harlem a Weeksville, en Brooklyn.",
   "img": "img/d4/mapa_tren.webp",
   "pal": "otono",
   "amb": [
    {
     "src": "sfx/d4/tren_elevado.mp3",
     "vol": 0.45
    },
    {
     "src": "sfx/d4/tren_dentro.mp3",
     "vol": 0.22
    }
   ],
   "espera": 2,
   "hechos": [],
   "personajes": [],
   "mapa": {
    "tipo": "tren",
    "ruta": [
     [
      0.41,
      0.1
     ],
     [
      0.42,
      0.16
     ],
     [
      0.41,
      0.3
     ],
     [
      0.375,
      0.45
     ],
     [
      0.35,
      0.57
     ],
     [
      0.37,
      0.645
     ],
     [
      0.43,
      0.68
     ],
     [
      0.52,
      0.72
     ],
     [
      0.62,
      0.76
     ],
     [
      0.72,
      0.8
     ],
     [
      0.82,
      0.82
     ],
     [
      0.885,
      0.83
     ]
    ],
    "desde": "Harlem",
    "hasta": "Weeksville",
    "sub": "Brooklyn · el barrio de John",
    "dur": 6,
    "etiq": {
     "desde": [
      1.8,
      0.6
     ],
     "hasta": [
      -11,
      -2.8
     ]
    },
    "antes": {
     "tit": "Rumbo a Weeksville",
     "txt": "A la mañana siguiente, Eli lleva a Xan en el tren elevado desde Harlem, donde lo encontró la noche antes en el club, hasta Weeksville, en Brooklyn: el barrio donde vivió John."
    }
   }
  },
  {
   "id": "P4.2",
   "desc": "Calle de tierra con casas de madera con porche; árboles de otoño, hojas en el suelo. Eli y Xan llegan andando.",
   "img": "img/d4/p4_2.webp",
   "personajes": [
    "ELI"
   ],
   "pal": "otono",
   "amb": [
    {
     "src": "sfx/d4/pajaros.mp3",
     "vol": 0.3
    },
    {
     "src": "sfx/d4/pasos_camino.mp3",
     "vol": 0.35
    },
    {
     "src": "sfx/d4/pisadas_hojas.mp3",
     "vol": 0.3
    }
   ],
   "hechos": [
    "h28",
    "h54"
   ],
   "lineas": [
    {
     "id": "d4_012",
     "quien": "ELI",
     "texto": "Weeksville. Lo fundaron negros libres hace noventa años, cuando en el Sur aún había esclavitud.",
     "voz": "voz/d4/d4_012.mp3",
     "var": "RECURSO_WEEKSVILLE"
    },
    {
     "id": "d4_014",
     "quien": "ELI",
     "texto": "Y esta es la casa de John. Hunterfly Road.",
     "voz": "voz/d4/d4_014.mp3"
    }
   ],
   "nombre": "Weeksville",
   "guion_sonido": {
    "amb": "Pájaros, hojas, un carro."
   },
   "foco": {
    "ELI": [
     0.285,
     0.16,
     0.12
    ],
    "XAN": [
     0.435,
     0.22,
     0.11
    ]
   },
   "var": {
    "RECURSO_WEEKSVILLE": "img/d4/p4_2_recurso_weeksville.webp"
   }
  },
  {
   "id": "P4.3",
   "desc": "Interior humilde y ordenado. En la pared, tres fotos: John y Maruxa jóvenes ante la Torre de Hércules (1890); el muelle de Coruña en 1913, con John sosteniendo un acordeón pequeño, Maruxa y su hija con el bebé Xan en brazos; y John mayor en este porche (1925) con el mismo acordeón. Sobre una repisa, ese acordeón pequeño, viejo y artesanal. Un fonógrafo de cilindros, una radio, partituras y un cajón entreabierto lleno de cartas.",
   "img": "img/d4/p4_3.webp",
   "personajes": [
    "ELI",
    "XAN"
   ],
   "pal": "sepia",
   "amb": [
    {
     "src": "sfx/d4/reloj.mp3",
     "vol": 0.3
    },
    {
     "src": "sfx/d4/madera.mp3",
     "vol": 0.3
    }
   ],
   "hechos": [
    "h29"
   ],
   "lineas": [
    {
     "id": "d4_015",
     "quien": "ELI",
     "texto": "Siéntate, Xan. John murió este verano.",
     "voz": "voz/d4/d4_015.mp3",
     "sfx": [
      {
       "src": "sfx/d4/pasos_casa.mp3",
       "vol": 0.6
      },
      {
       "src": "sfx/d4/puerta.mp3",
       "vol": 0.45
      }
     ]
    },
    {
     "id": "d4_016",
     "quien": "XAN",
     "texto": "Pero… entonces… ¿quién mandó la lata?",
     "voz": "voz/d4/d4_016.mp3"
    },
    {
     "id": "d4_017",
     "quien": "ELI",
     "texto": "Yo. Cuando John volvió de Coruña, en 1913, yo tenía treinta y cinco años y nadie en el mundo.",
     "voz": "voz/d4/d4_017.mp3"
    },
    {
     "id": "d4_019",
     "quien": "ELI",
     "texto": "Antes de morir me pidió una cosa: «Que Xan conozca esto. Que sepa de dónde viene».",
     "voz": "voz/d4/d4_019.mp3",
     "var": "ELI_CERCA"
    },
    {
     "id": "d4_020",
     "quien": "ELI",
     "texto": "Así que junté lo que pude y te mandé el billete. De ida y vuelta: él quería que volvieras.",
     "voz": "voz/d4/d4_020.mp3"
    },
    {
     "id": "d4_021",
     "quien": "XAN",
     "texto": "Pero yo vine por él.",
     "voz": "voz/d4/d4_021.mp3"
    },
    {
     "id": "d4_022",
     "quien": "ELI",
     "texto": "Y lo vas a conocer. Mira a tu alrededor.",
     "voz": "voz/d4/d4_022.mp3"
    }
   ],
   "inter": {
    "tipo": "objetos",
    "desc": "El alumno pulsa cada objeto de la casa; Eli cuenta su historia o sale un HECHO.",
    "lineas": {
     "foto3": [
      {
       "id": "d4_r031",
       "quien": "XAN",
       "texto": "Y esta… ¡es el muelle de Coruña! Y ese bebé…",
       "voz": "voz/d4/d4_r031.mp3",
       "var": "RECURSO_FOTO3",
       "fijo": true
      },
      {
       "id": "d4_r032",
       "quien": "ELI",
       "texto": "Eres tú, Xan. El día que John se marchó. Mira lo que lleva en la mano.",
       "voz": "voz/d4/d4_r032.mp3",
       "var": "RECURSO_FOTO3",
       "fijo": true
      }
     ],
     "acordeon": [
      {
       "id": "d4_r003",
       "quien": "ELI",
       "texto": "Se lo regaló tu abuela ese mismo día, en el muelle. Mira lo que pone.",
       "voz": "voz/d4/d4_r003.mp3",
       "var": "RECURSO_ACORDEON",
       "fijo": true
      },
      {
       "id": "d4_r004",
       "quien": "XAN",
       "texto": "«Para cando volvas». Para cuando vuelvas…",
       "voz": "voz/d4/d4_r004.mp3",
       "var": "RECURSO_ACORDEON",
       "fijo": true
      },
      {
       "id": "d4_r033",
       "quien": "ELI",
       "texto": "John lo dejó dicho: este acordeón es para ti. Que vuelvas con él a Coruña… y le toques algo a tu abuela.",
       "voz": "voz/d4/d4_r033.mp3",
       "var": "RECURSO_ACORDEON",
       "fijo": true
      }
     ],
     "cartas": [
      {
       "id": "d4_r012",
       "quien": "ELI",
       "texto": "Cartas a tu abuela. Una cada mes, durante quince años. No mandó ninguna.",
       "voz": "voz/d4/d4_r012.mp3",
       "var": "RECURSO_CAJON",
       "fijo": true
      },
      {
       "id": "d4_r013",
       "quien": "ELI",
       "texto": "Le daba vergüenza no haber vuelto. Primero la guerra, luego el dinero, luego la salud.",
       "voz": "voz/d4/d4_r013.mp3",
       "var": "RECURSO_CAJON",
       "fijo": true
      },
      {
       "id": "d4_r014",
       "quien": "ELI",
       "texto": "Cada año decía: «el que viene».",
       "voz": "voz/d4/d4_r014.mp3",
       "var": "RECURSO_CAJON",
       "fijo": true
      },
      {
       "id": "d4_r034",
       "quien": "ELI",
       "texto": "Llévaselas tú. Ya va siendo hora de que lleguen.",
       "voz": "voz/d4/d4_r034.mp3",
       "var": "RECURSO_CAJON",
       "fijo": true
      }
     ],
     "fin": [
      {
       "id": "d4_r019",
       "quien": "ELI",
       "texto": "Queda una cosa. Un cilindro con tu nombre.",
       "voz": "voz/d4/d4_r019.mp3"
      }
     ]
    },
    "objetos": [
     {
      "k": "foto3",
      "t": "La foto del muelle",
      "x": 67.6,
      "y": 18.5,
      "sfx": "sfx/d4/marco.mp3",
      "w": 18,
      "h": 37,
      "var": "RECURSO_FOTO3"
     },
     {
      "k": "acordeon",
      "t": "El acordeón pequeño",
      "x": 65.7,
      "y": 50,
      "sfx": "sfx/d4/acordeon_toque.mp3",
      "w": 15.5,
      "h": 16,
      "var": "RECURSO_ACORDEON"
     },
     {
      "k": "cartas",
      "t": "El cajón de las cartas",
      "x": 73.5,
      "y": 89.5,
      "sfx": "sfx/d4/cartas.mp3",
      "w": 15,
      "h": 10,
      "var": "RECURSO_CAJON"
     }
    ],
    "nota_objetos": "(20-oct) posiciones ajustadas a la lámina nueva (img/oleada3/d4_p4_3.png, recorte 0,3)",
    "nota_recorte": "(C4, 20-oct) recorte B de Iago: fuera radio, apellido y fonógrafo (−41 s). Para deshacer: ~/trab/antes/dia4.js o el commit anterior.",
    "recursos": [
     "sfx/d4/acordeon_toque.mp3",
     "sfx/d4/cartas.mp3",
     "sfx/d4/marco.mp3"
    ]
   },
   "nombre": "La casa de John",
   "guion_sonido": {
    "amb": "Reloj, madera que cruje."
   },
   "foco": {
    "ELI": [
     0.178,
     0.16,
     0.14
    ],
    "XAN": [
     0.29,
     0.36,
     0.14
    ]
   },
   "var": {
    "RECURSO_ACORDEON": "img/d4/p4_3_recurso_acordeon.webp",
    "RECURSO_CAJON": "img/d4/p4_3_recurso_cajon.webp",
    "RECURSO_FOTO3": "img/d4/p4_3_recurso_foto3.webp",
    "ELI_CERCA": "img/d4/p4_3_eli_cerca.webp"
   }
  },
  {
   "id": "P4.4",
   "desc": "Primer plano del fonógrafo de cilindros con su bocina; Eli pone el cilindro con cuidado; Xan, delante, aguanta la respiración.",
   "img": "img/d4/p4_4.webp",
   "personajes": [
    "ELI",
    "XAN"
   ],
   "pal": "sepia",
   "hechos": [],
   "lineas": [
    {
     "id": "d4_023",
     "quien": "ELI",
     "texto": "Dale cuerda. Despacio, que es viejo.",
     "voz": "voz/d4/d4_023.mp3"
    }
   ],
   "nombre": "El cilindro",
   "guion_sonido": {
    "sfx": "Manivela; el cilindro: soplido y chasquidos."
   },
   "var": {
    "JOHN": "img/d4/p4_4_john.webp",
    "RECURSO_CILINDRO": "img/d4/p4_4_recurso_cilindro.webp"
   },
   "despues": [
    {
     "id": "d4_024",
     "quien": "JOHN",
     "texto": "Meu neno Xan… si estás oyendo esto, es que has venido.",
     "voz": "voz/d4/d4_024.mp3",
     "cilindro": true
    },
    {
     "id": "d4_025",
     "quien": "JOHN",
     "texto": "Perdóname por no volver. Quise hacerlo muchas veces… y la vida, ya sabes.",
     "voz": "voz/d4/d4_025.mp3",
     "cilindro": true
    },
    {
     "id": "d4_026",
     "quien": "JOHN",
     "texto": "Dile a tu abuela que la quise siempre. Y que su nana… me la sé de memoria.",
     "voz": "voz/d4/d4_026.mp3",
     "cilindro": true
    },
    {
     "id": "d4_027",
     "quien": "JOHN",
     "texto": "Ahora escucha. Esto es tuyo…",
     "voz": "voz/d4/d4_027.mp3",
     "cilindro": true
    },
    {
     "id": "d4_028",
     "quien": "ELI",
     "texto": "Ahí se acaba. Al cilindro se le acabó la cera antes que la canción. Nunca supe qué quería tocarte.",
     "voz": "voz/d4/d4_028.mp3",
     "var": "RECURSO_CILINDRO"
    }
   ],
   "inter": {
    "tipo": "fonografo",
    "desc": "Dar cuerda a la manivela del fonógrafo (como en el portal del Fonógrafo) para oír el cilindro.",
    "sfxManivela": "sfx/d4/manivela.mp3",
    "recursos": [
     "img/d4/p4_4_recurso_cilindro.webp",
     "sfx/d4/manivela.mp3"
    ],
    "textura": "img/d4/p4_4_recurso_cilindro.webp"
   },
   "foco": {
    "XAN": [
     0.44,
     0.21,
     0.247
    ]
   },
   "amb": [
    {
     "src": "sfx/d4/reloj.mp3",
     "vol": 0.3
    },
    {
     "src": "sfx/d4/madera.mp3",
     "vol": 0.25
    }
   ]
  },
  {
   "id": "P4.5",
   "desc": "Porche de la casa de John, mañana dorada de otoño. Eli, en una silla con la guitarra; Xan, en los escalones con el acordeón pequeño de John.",
   "img": "img/d4/p4_5.webp",
   "personajes": [
    "ELI",
    "XAN"
   ],
   "pal": "otono",
   "amb": [
    {
     "src": "sfx/d4/porche.mp3",
     "vol": 0.35
    },
    {
     "src": "sfx/d4/hojas_viento.mp3",
     "vol": 0.3
    },
    {
     "src": "sfx/d4/mecedora.mp3",
     "vol": 0.1
    }
   ],
   "lineas": [
    {
     "id": "d4_029",
     "quien": "ELI",
     "texto": "Vamos fuera. Y coge el acordeón de John, que hay que probarlo.",
     "voz": "voz/d4/d4_029.mp3",
     "sfx": [
      {
       "src": "sfx/d4/puerta.mp3",
       "vol": 0.5,
       "t": 0.2
      }
     ]
    },
    {
     "id": "d4_030",
     "quien": "ELI",
     "texto": "Te enseño algo fácil. Yo toco los acordes: G7, C7, D7. Tú elige una nota de las que brillan. Cualquiera.",
     "voz": "voz/d4/d4_030.mp3",
     "var": "RECURSO_GUITARRA"
    }
   ],
   "inter": {
    "tipo": "notasAcorde",
    "desc": "Juego fácil: la guitarra de Eli toca los 12 compases y en cada compás brillan las cuatro notas de su acorde; el alumno pulsa la que quiera.",
    "lineas": {
     "acierto": [
      {
       "id": "d4_r020",
       "quien": "ELI",
       "texto": "¿Ves? Todas suenan bien. Porque son del acorde.",
       "voz": "voz/d4/d4_r020.mp3"
      }
     ],
     "fin": [
      {
       "id": "d4_r021",
       "quien": "ELI",
       "texto": "Así se empieza a improvisar: eligiendo, no adivinando.",
       "voz": "voz/d4/d4_r021.mp3"
      }
     ]
    }
   },
   "despues": [
    {
     "id": "d4_031",
     "quien": "ELI",
     "texto": "Ahora tú solo. ¿Por qué no tocas algo que sepas?",
     "voz": "voz/d4/d4_031.mp3"
    },
    {
     "id": "d4_032",
     "quien": "XAN",
     "texto": "Solo me sé… una nana. La de mi abuela.",
     "voz": "voz/d4/d4_032.mp3"
    },
    {
     "id": "d4_033",
     "quien": "ELI",
     "texto": "Pues tócala.",
     "voz": "voz/d4/d4_033.mp3",
     "sfx": [
      {
       "src": "mus/d4_nana_acordeon.mp3",
       "t": 0.8,
       "vol": 0.95
      }
     ],
     "espera": 22.4,
     "var": "RECURSO_TECLAS",
     "fijo": true
    },
    {
     "id": "d4_034",
     "quien": "ELI",
     "texto": "Para. Para, para… ¿Dónde has aprendido eso?",
     "voz": "voz/d4/d4_034.mp3"
    },
    {
     "id": "d4_035",
     "quien": "XAN",
     "texto": "Me la cantaba mi abuela. Dice que era del avó, pero que ella la arregló.",
     "voz": "voz/d4/d4_035.mp3"
    },
    {
     "id": "d4_036",
     "quien": "ELI",
     "texto": "Esa es la canción de John. La tocaba cada domingo en este porche. Pero así…",
     "voz": "voz/d4/d4_036.mp3",
     "var": "ELI_CERCA"
    },
    {
     "id": "d4_037",
     "quien": "ELI",
     "texto": "¡Eso era lo que quería tocarte en el cilindro!",
     "voz": "voz/d4/d4_037.mp3"
    }
   ],
   "nombre": "El porche",
   "hechos": [],
   "guion_sonido": {
    "amb": "Porche: pájaros, hojas, madera.",
    "mus": "La guitarra de Eli; cuando Xan toca la nana, SOLO el acordeón pequeño (la nana de la abuela, con adornos; arreglo MIDI en Sol)."
   },
   "cam": {
    "de": [
     1,
     0.5,
     0.5
    ],
    "a": [
     1.08,
     0.42,
     0.42
    ]
   },
   "foco": {
    "ELI": [
     0.42,
     0.15,
     0.104
    ],
    "XAN": [
     0.6,
     0.34,
     0.104
    ]
   },
   "var": {
    "ELI_CERCA": "img/d4/p4_5_eli_cerca.webp",
    "RECURSO_GUITARRA": "img/d4/p4_5_recurso_guitarra.webp",
    "RECURSO_TECLAS": "img/d4/p4_5_recurso_teclas.webp"
   }
  },
  {
   "id": "P4.6",
   "desc": "Eli despliega un papel amarillento sobre las rodillas de Xan: una partitura escrita a mano, con manchas y partes borradas. Arriba, el título «Blues de John» tachado y, encima, con otra tinta: «A nana de Xan»; debajo: «Para o meu neto John · Coruña, 1912». A su lado, el acordeón pequeño de John.",
   "img": "img/d4/p4_6.webp",
   "personajes": [
    "ELI",
    "XAN"
   ],
   "pal": "sepia",
   "hechos": [
    "h43"
   ],
   "lineas": [
    {
     "id": "d4_038",
     "quien": "ELI",
     "texto": "Mira. Lo guardaba dentro de la caja del acordeón.",
     "voz": "voz/d4/d4_038.mp3",
     "sfx": [
      {
       "src": "sfx/d4/caja_abrir.mp3",
       "vol": 0.7,
       "t": 0.3
      }
     ]
    },
    {
     "id": "d4_039",
     "quien": "XAN",
     "texto": "«Blues de John»… tachado. Y encima: «A nana de Xan». Abajo: «Para o meu neto John. Coruña, 1912».",
     "voz": "voz/d4/d4_039.mp3",
     "var": "RECURSO_MANUSCRITO",
     "sfx": [
      {
       "src": "sfx/d4/papel.mp3",
       "vol": 0.5
      }
     ]
    },
    {
     "id": "d4_098",
     "quien": "ELI",
     "texto": "Para ti. Quería que te llamaras como él. Se marchó pensando que eras John.",
     "voz": "voz/d4/d4_098.mp3"
    },
    {
     "id": "d4_099",
     "quien": "ELI",
     "texto": "Años después, un marinero de Coruña le contó que en tu casa todos te llamaban Xan.",
     "voz": "voz/d4/d4_099.mp3"
    },
    {
     "id": "d4_100",
     "quien": "ELI",
     "texto": "Esa noche tachó el título y escribió encima: «A nana de Xan».",
     "voz": "voz/d4/d4_100.mp3",
     "var": "RECURSO_JOHN",
     "sfx": [
      {
       "src": "sfx/d4/pluma.mp3",
       "vol": 0.6,
       "t": 0.6
      }
     ]
    },
    {
     "id": "d4_041",
     "quien": "ELI",
     "texto": "Y tu abuela te la cantó cada noche desde entonces.",
     "voz": "voz/d4/d4_041.mp3"
    },
    {
     "id": "d4_042",
     "quien": "ELI",
     "texto": "Ella la hizo nana. Él la hizo blues. Es la misma canción, Xan. Y tú eres esa canción.",
     "voz": "voz/d4/d4_042.mp3"
    },
    {
     "id": "d4_043",
     "quien": "ELI",
     "texto": "¿Sabes qué? Tu abuela la cantaba en seis por ocho, meciéndote: taaa-ta, taaa-ta.",
     "voz": "voz/d4/d4_043.mp3",
     "var": "RECURSO_CUNA"
    },
    {
     "id": "d4_044",
     "quien": "ELI",
     "texto": "Eso es swing, gallego. Swing a cámara lenta. Tu abuela tenía swing y no lo sabía.",
     "voz": "voz/d4/d4_044.mp3"
    },
    {
     "id": "d4_045",
     "quien": "XAN",
     "texto": "Pero hay algo distinto. La avoa canta fa sostenido. Aquí pone fa natural.",
     "voz": "voz/d4/d4_045.mp3",
     "var": "XAN_CERCA"
    },
    {
     "id": "d4_046",
     "quien": "ELI",
     "texto": "Ahí está el truco. La armadura dice Sol mayor: un sostenido. Pero John tocaba fa natural: la séptima de G7.",
     "voz": "voz/d4/d4_046.mp3",
     "var": "RECURSO_MANUSCRITO"
    },
    {
     "id": "d4_101",
     "quien": "ELI",
     "texto": "Sol con fa natural: eso es el modo mixolidio. El modo del blues.",
     "voz": "voz/d4/d4_101.mp3"
    },
    {
     "id": "d4_047",
     "quien": "ELI",
     "texto": "Y en el compás cinco, sobre C7, mira: si bemol. La séptima de Do.",
     "voz": "voz/d4/d4_047.mp3"
    },
    {
     "id": "d4_048",
     "quien": "ELI",
     "texto": "Y cuando la guitarra hace un bend, estirando la cuerda del si bemol al si… eso es una blue note. Una nota azul.",
     "voz": "voz/d4/d4_048.mp3",
     "var": "RECURSO_BEND"
    }
   ],
   "inter": {
    "tipo": "bluenote",
    "desc": "Oír el primer compás con si natural y con si bemol sobre G7 y elegir cuál suena «más blues»; luego hacer un bend: estirar una nota larga de si bemol a si con un deslizador.",
    "lineas": {
     "bemol": [
      {
       "id": "d4_r022",
       "quien": "ELI",
       "texto": "Eso es. Esa nota tiene morriña.",
       "voz": "voz/d4/d4_r022.mp3"
      }
     ],
     "natural": [
      {
       "id": "d4_r023",
       "quien": "ELI",
       "texto": "Esa es correcta… pero no llora. Prueba la otra.",
       "voz": "voz/d4/d4_r023.mp3"
      }
     ],
     "doblar": [
      {
       "id": "d4_r024",
       "quien": "ELI",
       "texto": "Ahora haz tú el bend, despacito, de si bemol a si. ¿Lo oyes? Eso es el blues.",
       "voz": "voz/d4/d4_r024.mp3"
      }
     ]
    },
    "textura": "img/d4/p4_6_recurso_bend.webp",
    "recursos": [
     "img/d4/p4_6_recurso_bend.webp"
    ]
   },
   "nombre": "El manuscrito",
   "guion_sonido": {
    "sfx": "Papel viejo que se despliega."
   },
   "foco": {
    "ELI": [
     0.4,
     0.14,
     0.14
    ],
    "XAN": [
     0.56,
     0.28,
     0.14
    ]
   },
   "amb": [
    {
     "src": "sfx/d4/porche.mp3",
     "vol": 0.35
    },
    {
     "src": "sfx/d4/hojas_viento.mp3",
     "vol": 0.3
    },
    {
     "src": "sfx/d4/mecedora.mp3",
     "vol": 0.12
    }
   ],
   "var": {
    "XAN_CERCA": "img/d4/p4_6_xan_cerca.webp",
    "RECURSO_MANUSCRITO": "img/d4/p4_6_recurso_manuscrito.webp",
    "RECURSO_JOHN": "img/d4/p4_6_recurso_john_escribe.webp",
    "RECURSO_CUNA": "img/d4/p4_6_recurso_cuna.webp",
    "RECURSO_BEND": "img/d4/p4_6_recurso_bend.webp"
   }
  },
  {
   "id": "P4.7",
   "desc": "El manuscrito medio borrado ocupa la pantalla. Detrás, el porche: Eli con la guitarra y Xan con el acordeón pequeño de John.",
   "img": "img/d4/p4_5.webp",
   "personajes": [
    "ELI",
    "RUBY",
    "XAN"
   ],
   "pal": "sepia",
   "lineas": [
    {
     "id": "d4_051",
     "quien": "ELI",
     "texto": "Ahora te toca a ti. Sí, a ti: al que está ahí delante con su instrumento.",
     "voz": "voz/d4/d4_051.mp3"
    },
    {
     "id": "d4_052",
     "quien": "ELI",
     "texto": "Toca el tema del manuscrito con swing. Yo, con la guitarra; Xan, con el acordeón de John.",
     "voz": "voz/d4/d4_052.mp3"
    },
    {
     "id": "d4_053",
     "quien": "ELI",
     "texto": "Taaa-ta, taaa-ta. Y el peso, en el dos y en el cuatro.",
     "voz": "voz/d4/d4_053.mp3"
    }
   ],
   "inter": {
    "tipo": "hito",
    "n": 1,
    "desc": "Hito 1: el alumno toca el tema del manuscrito con su instrumento, con swing, sobre la guitarra y el acordeón. Se puede repetir.",
    "lineas": {
     "otra": [
      {
       "id": "d4_r025",
       "quien": "ELI",
       "texto": "Otra vez, que la primera es para calentar.",
       "voz": "voz/d4/d4_r025.mp3"
      }
     ],
     "bien": [
      {
       "id": "d4_r026",
       "quien": "ELI",
       "texto": "¡Eso suena a porche!",
       "voz": "voz/d4/d4_r026.mp3"
      }
     ]
    },
    "vueltas": 1
   },
   "nombre": "Hito 1 · El tema",
   "hechos": [],
   "guion_sonido": {
    "mus": "Banda del porche: guitarra (Eli) y acordeón pequeño (Xan)."
   },
   "foco": {
    "ELI": [
     0.42,
     0.15,
     0.104
    ],
    "XAN": [
     0.6,
     0.34,
     0.104
    ]
   },
   "nota_img": "(20-oct) usa la lámina de P4.5: es el mismo porche esa misma mañana; el manuscrito tapa casi todo",
   "amb": [
    {
     "src": "sfx/d4/porche.mp3",
     "vol": 0.35
    },
    {
     "src": "sfx/d4/hojas_viento.mp3",
     "vol": 0.3
    }
   ]
  },
  {
   "id": "P4.7b",
   "nombre": "Llega Ruby",
   "desc": "Ruby llega al porche con su tabla de lavar y se sienta con Eli y Xan.",
   "img": "img/d4/p4_8.webp",
   "pal": "sepia",
   "amb": [
    {
     "src": "sfx/d4/porche.mp3",
     "vol": 0.35
    },
    {
     "src": "sfx/d4/hojas_viento.mp3",
     "vol": 0.3
    }
   ],
   "foco": {
    "RUBY": [
     0.27,
     0.14,
     0.1
    ],
    "ELI": [
     0.48,
     0.21,
     0.102
    ],
    "XAN": [
     0.68,
     0.39,
     0.102
    ]
   },
   "personajes": [
    "RUBY",
    "ELI",
    "XAN"
   ],
   "lineas": [
    {
     "id": "d4_054",
     "quien": "RUBY",
     "texto": "¡Xan! ¡Sabía que eras tú! ¡Esa música se oye desde la casa de mi tía!",
     "voz": "voz/d4/d4_054.mp3"
    },
    {
     "id": "d4_055",
     "quien": "XAN",
     "texto": "¡Ruby!",
     "voz": "voz/d4/d4_055.mp3"
    },
    {
     "id": "d4_056",
     "quien": "RUBY",
     "texto": "Te dejaste esto en el club. Sin él, no eres tú.",
     "voz": "voz/d4/d4_056.mp3"
    },
    {
     "id": "d4_057",
     "quien": "RUBY",
     "texto": "¿Me puedo sumar?",
     "voz": "voz/d4/d4_057.mp3"
    },
    {
     "id": "d4_058",
     "quien": "ELI",
     "texto": "En este porche nunca sobra nadie.",
     "voz": "voz/d4/d4_058.mp3"
    }
   ],
   "espera": 0.8
  },
  {
   "id": "P4.8",
   "desc": "El manuscrito: en cada compás, las cuatro notas del acorde. En el porche, Eli (guitarra), Xan (acordeón pequeño de John) y Ruby (tabla de lavar).",
   "img": "img/d4/p4_8.webp",
   "personajes": [
    "ELI",
    "RUBY",
    "ODELL"
   ],
   "pal": "sepia",
   "lineas": [
    {
     "id": "d4_059",
     "quien": "ELI",
     "texto": "Ahora, notas largas. Una por compás, que dure todo el compás: una redonda.",
     "voz": "voz/d4/d4_059.mp3"
    },
    {
     "id": "d4_060",
     "quien": "ELI",
     "texto": "Elige una de las cuatro notas del acorde. En G7: sol, si, re, fa.",
     "voz": "voz/d4/d4_060.mp3"
    },
    {
     "id": "d4_061",
     "quien": "ELI",
     "texto": "En C7: sol, si bemol, do, mi. Y en D7: fa sostenido, la, do, re.",
     "voz": "voz/d4/d4_061.mp3"
    },
    {
     "id": "d4_062",
     "quien": "ELI",
     "texto": "No hay notas malas. Solo notas largas.",
     "voz": "voz/d4/d4_062.mp3"
    }
   ],
   "inter": {
    "tipo": "hito",
    "n": 2,
    "desc": "Hito 2: una nota larga (redonda) por compás, a elegir entre las cuatro del acorde. G7: sol, si, re, fa · C7: sol, si bemol, do, mi · D7: fa sostenido, la, do, re.",
    "lineas": {
     "bien": [
      {
       "id": "d4_r027",
       "quien": "ELI",
       "texto": "¿Oyes cómo tu nota se queda pegada al acorde?",
       "voz": "voz/d4/d4_r027.mp3"
      },
      {
       "id": "d4_r028",
       "quien": "RUBY",
       "texto": "¡Y yo te pongo el ritmo debajo!",
       "voz": "voz/d4/d4_r028.mp3"
      }
     ]
    },
    "vueltas": 1
   },
   "nombre": "Hito 2 · Notas largas",
   "hechos": [],
   "guion_sonido": {
    "mus": "Banda: guitarra, tabla de lavar y acordeón pequeño (con el tema)."
   },
   "foco": {
    "RUBY": [
     0.27,
     0.14,
     0.1
    ],
    "ELI": [
     0.48,
     0.21,
     0.102
    ],
    "XAN": [
     0.68,
     0.39,
     0.102
    ]
   },
   "amb": [
    {
     "src": "sfx/d4/porche.mp3",
     "vol": 0.35
    },
    {
     "src": "sfx/d4/hojas_viento.mp3",
     "vol": 0.3
    }
   ]
  },
  {
   "id": "P4.8b",
   "nombre": "Llega Mr. Odell",
   "desc": "Mr. Odell, el vecino, se suma con su contrabajo.",
   "img": "img/d4/p4_9.webp",
   "pal": "sepia",
   "amb": [
    {
     "src": "sfx/d4/porche.mp3",
     "vol": 0.35
    },
    {
     "src": "sfx/d4/hojas_viento.mp3",
     "vol": 0.3
    }
   ],
   "foco": {
    "RUBY": [
     0.285,
     0.15,
     0.089
    ],
    "ELI": [
     0.48,
     0.26,
     0.089
    ],
    "XAN": [
     0.645,
     0.4,
     0.089
    ],
    "ODELL": [
     0.8,
     0.12,
     0.089
    ]
   },
   "personajes": [
    "RUBY",
    "ELI",
    "XAN",
    "ODELL"
   ],
   "lineas": [
    {
     "id": "d4_063",
     "quien": "ODELL",
     "texto": "Llevo cuarenta años esperando a que alguien toque en este porche una nota decente.",
     "voz": "voz/d4/d4_063.mp3"
    },
    {
     "id": "d4_064",
     "quien": "ODELL",
     "texto": "Con permiso. Un blues sin contrabajo es un barco sin quilla.",
     "voz": "voz/d4/d4_064.mp3"
    },
    {
     "id": "d4_065",
     "quien": "ELI",
     "texto": "Mr. Odell, el vecino. Tocó con John más de diez años.",
     "voz": "voz/d4/d4_065.mp3"
    }
   ],
   "espera": 0.8
  },
  {
   "id": "P4.9",
   "desc": "El manuscrito, con el final de cada frase borrado y, debajo, las notas de la escala. En el porche: Eli (guitarra), Xan (acordeón pequeño), Ruby (tabla de lavar) y Mr. Odell (contrabajo).",
   "img": "img/d4/p4_9.webp",
   "personajes": [
    "ELI",
    "ODELL",
    "TEDDY",
    "XAN"
   ],
   "pal": "sepia",
   "lineas": [
    {
     "id": "d4_066",
     "quien": "ELI",
     "texto": "Último paso. En el manuscrito, el final de cada frase se ha borrado con los años.",
     "voz": "voz/d4/d4_066.mp3"
    },
    {
     "id": "d4_067",
     "quien": "ELI",
     "texto": "Esos finales los vas a poner tú. Pregunta y respuesta: John pregunta, tú contestas.",
     "voz": "voz/d4/d4_067.mp3"
    },
    {
     "id": "d4_068",
     "quien": "ELI",
     "texto": "Usa las notas que tienes debajo: la escala de cada acorde. Y si te pierdes, vuelve al Sol.",
     "voz": "voz/d4/d4_068.mp3"
    }
   ],
   "inter": {
    "tipo": "hito",
    "n": 3,
    "desc": "Hito 3: el tema con el final de cada frase borrado; el alumno lo improvisa con las notas de la escala del acorde (Sol, Do y Re mixolidio).",
    "lineas": {
     "bien": [
      {
       "id": "d4_r029",
       "quien": "ELI",
       "texto": "¡Eso es tuyo! Nadie lo había tocado así antes.",
       "voz": "voz/d4/d4_r029.mp3"
      },
      {
       "id": "d4_r030",
       "quien": "ODELL",
       "texto": "El chaval tiene orejas.",
       "voz": "voz/d4/d4_r030.mp3"
      }
     ]
    },
    "vueltas": 1
   },
   "nombre": "Hito 3 · Los finales",
   "hechos": [],
   "guion_sonido": {
    "mus": "Banda: guitarra, tabla de lavar, contrabajo y acordeón pequeño."
   },
   "foco": {
    "RUBY": [
     0.285,
     0.15,
     0.089
    ],
    "ELI": [
     0.48,
     0.26,
     0.089
    ],
    "XAN": [
     0.645,
     0.4,
     0.089
    ],
    "ODELL": [
     0.8,
     0.12,
     0.089
    ]
   },
   "amb": [
    {
     "src": "sfx/d4/porche.mp3",
     "vol": 0.35
    },
    {
     "src": "sfx/d4/hojas_viento.mp3",
     "vol": 0.3
    }
   ]
  },
  {
   "id": "P4.9b",
   "nombre": "Llega Teddy",
   "desc": "Teddy llega con su trompeta: la banda del porche, completa.",
   "img": "img/d4/p4_10.webp",
   "pal": "sepia",
   "amb": [
    {
     "src": "sfx/d4/porche.mp3",
     "vol": 0.35
    },
    {
     "src": "sfx/d4/hojas_viento.mp3",
     "vol": 0.3
    }
   ],
   "foco": {
    "TEDDY": [
     0.258,
     0.19,
     0.071
    ],
    "ELI": [
     0.414,
     0.29,
     0.071
    ],
    "XAN": [
     0.54,
     0.18,
     0.071
    ],
    "RUBY": [
     0.683,
     0.225,
     0.071
    ],
    "ODELL": [
     0.836,
     0.17,
     0.071
    ]
   },
   "personajes": [
    "TEDDY",
    "ELI",
    "XAN",
    "RUBY",
    "ODELL"
   ],
   "lineas": [
    {
     "id": "d4_069",
     "quien": "TEDDY",
     "texto": "Vale, vale… vengo a buscar a Ruby y me encuentro una fiesta.",
     "voz": "voz/d4/d4_069.mp3"
    },
    {
     "id": "d4_070",
     "quien": "TEDDY",
     "texto": "Gallego, lo de anoche no fue justo. Lo de hoy, sí.",
     "voz": "voz/d4/d4_070.mp3"
    },
    {
     "id": "d4_071",
     "quien": "TEDDY",
     "texto": "Tú ganas. ¿Hay sitio para una trompeta?",
     "voz": "voz/d4/d4_071.mp3"
    },
    {
     "id": "d4_072",
     "quien": "XAN",
     "texto": "Esto no se escribe… se siente.",
     "voz": "voz/d4/d4_072.mp3"
    },
    {
     "id": "d4_073",
     "quien": "TEDDY",
     "texto": "¡Y encima me roba las frases!",
     "voz": "voz/d4/d4_073.mp3"
    }
   ],
   "espera": 0.8
  },
  {
   "id": "P4.10",
   "desc": "Atardecer en el porche: la banda completa —Eli (guitarra), Xan (acordeón pequeño de John), Ruby (tabla de lavar), Mr. Odell (contrabajo) y Teddy (trompeta con sordina)—. En primer plano, el fonógrafo grabando un cilindro nuevo.",
   "img": "img/d4/p4_10.webp",
   "personajes": [
    "ELI",
    "XAN"
   ],
   "pal": "farol",
   "amb": [
    {
     "src": "sfx/d4/porche.mp3",
     "vol": 0.35
    },
    {
     "src": "sfx/d4/hojas_viento.mp3",
     "vol": 0.3
    }
   ],
   "lineas": [
    {
     "id": "d4_074",
     "quien": "ELI",
     "texto": "Una vez más. Todos. Y esta vez la grabamos en un cilindro.",
     "voz": "voz/d4/d4_074.mp3"
    },
    {
     "id": "d4_083",
     "quien": "ELI",
     "texto": "Para que te lleves la banda a Coruña.",
     "voz": "voz/d4/d4_083.mp3"
    },
    {
     "id": "d4_076",
     "quien": "XAN",
     "texto": "Avoa… esta é a túa nana. E a do avó. E agora tamén é miña.",
     "voz": "voz/d4/d4_076.mp3"
    },
    {
     "id": "d4_084",
     "quien": "ELI",
     "texto": "Mañana sale tu barco, Xan. Ida y vuelta, ¿recuerdas? Llévale la canción.",
     "voz": "voz/d4/d4_084.mp3",
     "var": "RECURSO_BILLETE"
    },
    {
     "id": "d4_085",
     "quien": "ELI",
     "texto": "Y vosotros, los de ahí delante: el porche se queda abierto.",
     "voz": "voz/d4/d4_085.mp3"
    },
    {
     "id": "d4_078",
     "quien": "ELI",
     "texto": "Traed vuestro instrumento. La banda os espera.",
     "voz": "voz/d4/d4_078.mp3"
    }
   ],
   "espera": 5,
   "nombre": "La banda del porche",
   "hechos": [],
   "guion_sonido": {
    "mus": "La banda completa toca el tema (guitarra, tabla de lavar, contrabajo, trompeta con sordina y acordeón pequeño)."
   },
   "foco": {
    "TEDDY": [
     0.258,
     0.19,
     0.071
    ],
    "ELI": [
     0.414,
     0.29,
     0.071
    ],
    "XAN": [
     0.54,
     0.18,
     0.071
    ],
    "RUBY": [
     0.683,
     0.225,
     0.071
    ],
    "ODELL": [
     0.836,
     0.17,
     0.071
    ]
   },
   "mus": {
    "src": "mus/d4_banda_porche.mp3",
    "vol": 0.45,
    "bucle": false
   },
   "var": {
    "RECURSO_BILLETE": "img/d4/p4_1_recurso_billete.webp"
   }
  },
  {
   "id": "P4.11a",
   "nombre": "Coruña, enero de 1929",
   "desc": "El puerto de A Coruña una tarde de enero de 1929, lluvia fina: Xan ha vuelto.",
   "img": "img/d4/p4_11a.webp",
   "pal": "atlantico",
   "amb": [
    {
     "src": "sfx/d4/mar_gaviotas.mp3",
     "vol": 0.35
    },
    {
     "src": "sfx/d4/cocina_lluvia.mp3",
     "vol": 0.3
    }
   ],
   "lineas": [
    {
     "id": "d4_086",
     "quien": "XAN",
     "texto": "Volví a Coruña en enero de 1929. Del viaje no me acuerdo: solo quería llegar.",
     "voz": "voz/d4/d4_086.mp3",
     "var": "-",
     "sfx": [
      {
       "src": "sfx/d4/puerta.mp3",
       "vol": 0.7,
       "t": 5.5
      }
     ]
    }
   ],
   "espera": 0.2
  },
  {
   "id": "P4.11",
   "img": "img/d4/p4_11.webp",
   "pal": "atlantico",
   "amb": [
    {
     "src": "sfx/d4/mar_gaviotas.mp3",
     "vol": 0.35
    },
    {
     "src": "sfx/d4/cocina_lluvia.mp3",
     "vol": 0.3
    }
   ],
   "lineas": [
    {
     "id": "d4_087",
     "quien": "AVOA",
     "texto": "Ai… meu neno. Meu neno.",
     "voz": "voz/d4/d4_087.mp3"
    },
    {
     "id": "d4_088",
     "quien": "XAN",
     "texto": "Xa volvín, avoa.",
     "voz": "voz/d4/d4_088.mp3"
    },
    {
     "id": "d4_089",
     "quien": "AVOA",
     "texto": "E o avó?",
     "voz": "voz/d4/d4_089.mp3"
    },
    {
     "id": "d4_091",
     "quien": "AVOA",
     "texto": "«Para cando volvas»…",
     "voz": "voz/d4/d4_091.mp3"
    },
    {
     "id": "d4_092",
     "quien": "XAN",
     "texto": "Senta, avoa. Primeiro teño que tocarche unha cousa.",
     "voz": "voz/d4/d4_092.mp3"
    }
   ],
   "nombre": "De vuelta",
   "desc": "A Coruña, una tarde de enero de 1929, lluvia fina. La puerta de la casa de la abuela, abierta: Xan, con su estuche grande a la espalda y el acordeón pequeño de John en las manos; la abuela, en el umbral, con el mandil. Se abrazan.",
   "personajes": [
    "AVOA",
    "XAN"
   ],
   "hechos": [],
   "guion_sonido": {
    "amb": "Lluvia fina, gaviotas lejos, el mar."
   },
   "espera": 1,
   "foco": {
    "XAN": [
     0.547,
     0.19,
     0.18
    ],
    "AVOA": [
     0.656,
     0.15,
     0.22
    ]
   }
  },
  {
   "id": "P4.12",
   "nombre": "A nana do avó",
   "desc": "La cocina de la abuela, de noche, la lareira encendida, como el primer día. Xan toca el acordeón pequeño de John; la abuela, a su lado, escucha emocionada. Sobre la mesa, un paquete de cartas atado con un cordel.",
   "img": "img/d4/p4_12.webp",
   "pal": "lampara",
   "amb": [
    {
     "src": "sfx/d4/cocina_lluvia.mp3",
     "vol": 0.22
    },
    {
     "src": "sfx/d4/lareira.mp3",
     "vol": 0.3
    }
   ],
   "mus": {
    "src": "mus/d4_nana_final.mp3",
    "vol": 0.62,
    "bucle": false
   },
   "lineas": [
    {
     "id": "d4_093",
     "quien": "AVOA",
     "texto": "Así a tocaba el. Exactamente así.",
     "voz": "voz/d4/d4_093.mp3",
     "espera": 2.5
    }
   ],
   "foco": {
    "AVOA": [
     0.297,
     0.25,
     0.14
    ],
    "XAN": [
     0.7,
     0.26,
     0.14
    ]
   },
   "personajes": [
    "AVOA"
   ],
   "hechos": [],
   "pre": 4,
   "espera": 0.3
  },
  {
   "id": "P4.12b",
   "nombre": "O acordeón",
   "desc": "O acordeón",
   "img": "img/d4/p4_12b.webp",
   "pal": "lampara",
   "amb": [
    {
     "src": "sfx/d4/cocina_lluvia.mp3",
     "vol": 0.22
    },
    {
     "src": "sfx/d4/lareira.mp3",
     "vol": 0.3
    }
   ],
   "mus": {
    "src": "mus/d4_nana_final.mp3",
    "vol": 0.62,
    "bucle": false
   },
   "lineas": [],
   "espera": 7
  },
  {
   "id": "P4.12c",
   "nombre": "As mans",
   "desc": "As mans",
   "img": "img/d4/p4_12c.webp",
   "pal": "lampara",
   "amb": [
    {
     "src": "sfx/d4/cocina_lluvia.mp3",
     "vol": 0.22
    },
    {
     "src": "sfx/d4/lareira.mp3",
     "vol": 0.3
    }
   ],
   "mus": {
    "src": "mus/d4_nana_final.mp3",
    "vol": 0.62,
    "bucle": false
   },
   "lineas": [
    {
     "id": "d4_103",
     "quien": "XAN",
     "texto": "Avoa… o avó morreu este verán.",
     "voz": "voz/d4/d4_103.mp3",
     "espera": 1.2
    }
   ],
   "espera": 0.3
  },
  {
   "id": "P4.12d",
   "nombre": "As cartas",
   "desc": "As cartas",
   "img": "img/d4/p4_12d.webp",
   "pal": "lampara",
   "amb": [
    {
     "src": "sfx/d4/cocina_lluvia.mp3",
     "vol": 0.22
    },
    {
     "src": "sfx/d4/lareira.mp3",
     "vol": 0.3
    }
   ],
   "mus": {
    "src": "mus/d4_nana_final.mp3",
    "vol": 0.62,
    "bucle": false
   },
   "lineas": [
    {
     "id": "d4_104",
     "quien": "XAN",
     "texto": "Gardaba isto para ti. Escribíache cada semana… e nunca as mandou.",
     "voz": "voz/d4/d4_104.mp3",
     "sfx": [
      {
       "src": "sfx/d4/cartas.mp3",
       "vol": 0.6,
       "t": 0.3
      }
     ]
    }
   ],
   "espera": 0.5
  },
  {
   "id": "P4.12e",
   "nombre": "Sempre",
   "desc": "Sempre",
   "img": "img/d4/p4_12e.webp",
   "pal": "lampara",
   "amb": [
    {
     "src": "sfx/d4/cocina_lluvia.mp3",
     "vol": 0.22
    },
    {
     "src": "sfx/d4/lareira.mp3",
     "vol": 0.3
    }
   ],
   "mus": {
    "src": "mus/d4_nana_final.mp3",
    "vol": 0.62,
    "bucle": false
   },
   "lineas": [
    {
     "id": "d4_105",
     "quien": "AVOA",
     "texto": "Sempre se acordou de min…",
     "voz": "voz/d4/d4_105.mp3"
    },
    {
     "id": "d4_106",
     "quien": "AVOA",
     "texto": "E de ti, meu neno. De ti tamén.",
     "voz": "voz/d4/d4_106.mp3"
    }
   ],
   "espera": 0.9
  },
  {
   "id": "P4.12f",
   "nombre": "Esa noche",
   "desc": "Esa noche",
   "img": "img/d4/p4_12.webp",
   "pal": "lampara",
   "amb": [
    {
     "src": "sfx/d4/cocina_lluvia.mp3",
     "vol": 0.22
    },
    {
     "src": "sfx/d4/lareira.mp3",
     "vol": 0.3
    }
   ],
   "mus": {
    "src": "mus/d4_nana_final.mp3",
    "vol": 0.62,
    "bucle": false
   },
   "lineas": [
    {
     "id": "d4_094",
     "quien": "XAN",
     "texto": "Esa noche le toqué la canción del avó con su acordeón.",
     "voz": "voz/d4/d4_094.mp3",
     "var": "-"
    },
    {
     "id": "d4_107",
     "quien": "XAN",
     "texto": "Ella no cantó: escuchaba con los ojos cerrados, como si los dos volvieran a cantarla juntos.",
     "voz": "voz/d4/d4_107.mp3",
     "var": "-"
    }
   ],
   "foco": {
    "AVOA": [
     0.297,
     0.25,
     0.14
    ],
    "XAN": [
     0.7,
     0.26,
     0.14
    ]
   },
   "espera": 0.3
  },
  {
   "id": "P4.12g",
   "nombre": "A lareira",
   "desc": "A lareira",
   "img": "img/d4/p4_12g.webp",
   "pal": "lampara",
   "amb": [
    {
     "src": "sfx/d4/cocina_lluvia.mp3",
     "vol": 0.22
    },
    {
     "src": "sfx/d4/lareira.mp3",
     "vol": 0.3
    }
   ],
   "mus": {
    "src": "mus/d4_nana_final.mp3",
    "vol": 0.62,
    "bucle": false
   },
   "lineas": [
    {
     "id": "d4_095",
     "quien": "XAN",
     "texto": "Así lo recuerdo: la lareira, la lluvia, las cartas… y la avoa llorando y riendo a la vez.",
     "voz": "voz/d4/d4_095.mp3",
     "var": "-"
    }
   ],
   "espera": 0.3
  },
  {
   "id": "P4.12h",
   "nombre": "O porche",
   "desc": "O porche",
   "img": "img/d4/p4_10.webp",
   "pal": "lampara",
   "amb": [
    {
     "src": "sfx/d4/cocina_lluvia.mp3",
     "vol": 0.22
    },
    {
     "src": "sfx/d4/lareira.mp3",
     "vol": 0.3
    }
   ],
   "mus": {
    "src": "mus/d4_nana_final.mp3",
    "vol": 0.62,
    "bucle": false
   },
   "lineas": [
    {
     "id": "d4_079",
     "quien": "XAN",
     "texto": "No encontré al avó. Encontré su porche, su banda y su canción. Y me encontré a mí.",
     "voz": "voz/d4/d4_079.mp3",
     "var": "-"
    }
   ],
   "foco": {},
   "espera": 0.3
  },
  {
   "id": "P4.12i",
   "nombre": "Fin",
   "desc": "Fin",
   "img": "img/d4/p4_12i.webp",
   "pal": "lampara",
   "amb": [
    {
     "src": "sfx/d4/cocina_lluvia.mp3",
     "vol": 0.22
    },
    {
     "src": "sfx/d4/lareira.mp3",
     "vol": 0.3
    }
   ],
   "mus": {
    "src": "mus/d4_nana_final.mp3",
    "vol": 0.62,
    "bucle": false
   },
   "lineas": [
    {
     "id": "d4_096",
     "quien": "XAN",
     "texto": "El blues es cuando te duele algo y lo cantas para que duela menos. La avoa ya lo sabía.",
     "voz": "voz/d4/d4_096.mp3"
    }
   ],
   "foco": {
    "XAN": [
     0.625,
     0.32,
     0.14
    ]
   },
   "personajes": [
    "XAN"
   ],
   "espera": 10.6
  }
 ],
 "banda": true
});
