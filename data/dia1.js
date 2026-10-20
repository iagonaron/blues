/* BLUES · Día 1 · «La nana de Xan» — datos generados con herramientas/guion2datos.mjs (v3).
   Los textos vienen del guion: para cambiarlos, cambiar el guion y volver a pasar la herramienta.
   Lo demás (img, var, cam, amb, mus, pal, espera, configuración de inter) se puede tocar aquí: la herramienta lo respeta.
   Formato: ver LEEME-motor.md. */
BLUES.dia(1, {
 "titulo": "La nana de Xan",
 "lugar": "A Coruña · noviembre de 1928",
 "carta": {
  "encabezado": "No barco, novembro de 1928",
  "firma": "O teu neto, Xan",
  "texto": "Querida avoa: escríboche dende o fondo dun barco, coas mans negras de carbón. Aquí abaixo ninguén sabe onde queda A Coruña. E eu xa non sei moi ben onde estou. Pero cada noite, antes de durmir, sáeme a túa nana. A de sempre. A triste. Cóntoche como comezou todo. Por se un día alguén che pregunta por que marchei.",
  "lineas": [
   {
    "id": "d1_c01",
    "quien": "XAN",
    "texto": "Querida avoa: escríboche dende o fondo dun barco, coas mans negras de carbón.",
    "voz": "voz/d1/d1_c01.mp3"
   },
   {
    "id": "d1_c02",
    "quien": "XAN",
    "texto": "Aquí abaixo ninguén sabe onde queda A Coruña. E eu xa non sei moi ben onde estou.",
    "voz": "voz/d1/d1_c02.mp3"
   },
   {
    "id": "d1_c03",
    "quien": "XAN",
    "texto": "Pero cada noite, antes de durmir, sáeme a túa nana. A de sempre. A triste.",
    "voz": "voz/d1/d1_c03.mp3"
   },
   {
    "id": "d1_c04",
    "quien": "XAN",
    "texto": "Cóntoche como comezou todo. Por se un día alguén che pregunta por que marchei.",
    "voz": "voz/d1/d1_c04.mp3"
   }
  ]
 },
 "planos": [
  {
   "id": "P1.0",
   "desc": "La Torre de Hércules y las galerías de la Marina al atardecer; mar picado, gaviotas.",
   "img": "img/d1/p1_0.webp",
   "pal": "atlantico",
   "amb": [
    {
     "src": "sfx/d1/mar_gaviotas.mp3",
     "vol": 0.45
    },
    {
     "src": "sfx/d1/gaviotas_coruna.mp3",
     "vol": 0.6
    },
    {
     "src": "sfx/d1/viento.mp3",
     "vol": 0.3
    }
   ],
   "mus": {
    "src": "mus/nana_tarareada.mp3",
    "vol": 0.5,
    "bucle": false
   },
   "hechos": [
    "h3"
   ],
   "lineas": [],
   "nombre": "Título",
   "personajes": [],
   "guion_sonido": {
    "amb": "Mar contra las rocas, gaviotas, viento.",
    "mus": "La nana tarareada, muy lejos (la voz de la abuela, sin instrumentos)."
   },
   "cam": {
    "de": [
     1,
     0.55,
     0.5
    ],
    "a": [
     1.09,
     0.36,
     0.42
    ]
   },
   "titulo": true
  },
  {
   "id": "P1.1",
   "desc": "Cocina de piedra, de noche: lareira encendida, lámpara de aceite, lluvia en la ventana. La abuela, junto al fuego, canta sin ningún instrumento; Xan, en la mesa. Sobre la mesa, una lata vieja de galletas, cerrada. En un rincón, el estuche del acordeón de Xan: negro, grande y profundo.",
   "img": "img/d1/p1_1.webp",
   "var": {
    "AVOA": "img/d1/p1_1_avoa.webp",
    "XAN": "img/d1/p1_1_xan.webp",
    "AVOA_CERCA": "img/d1/p1_1_avoa_cerca.webp",
    "XAN_CERCA": "img/d1/p1_1_xan_cerca.webp",
    "RECURSO_LUME": "img/d1/p1_1_recurso_lume.webp",
    "RECURSO_LATA": "img/d1/p1_1_recurso_lata.webp"
   },
   "personajes": [
    "AVOA",
    "XAN"
   ],
   "pal": "lampara",
   "amb": [
    {
     "src": "sfx/d1/cocina_lluvia.mp3",
     "vol": 0.5
    },
    {
     "src": "sfx/d1/fuego.mp3",
     "vol": 0.4
    },
    {
     "src": "sfx/d1/reloj.mp3",
     "vol": 0.25
    },
    {
     "src": "sfx/d1/fuego_splice.mp3",
     "vol": 0.22
    }
   ],
   "mus": {
    "src": "mus/nana_avoa.mp3",
    "vol": 0.8,
    "bucle": false
   },
   "hechos": [
    "h2",
    "h41"
   ],
   "lineas": [
    {
     "id": "d1_001",
     "quien": "XAN",
     "texto": "Avoa, que xa non son un neno. Teño dezaseis anos.",
     "voz": "voz/d1/d1_001.mp3"
    },
    {
     "id": "d1_002",
     "quien": "AVOA",
     "texto": "E eu teño sesenta, e aínda me canta o mar. Cala e escoita.",
     "voz": "voz/d1/d1_002.mp3"
    },
    {
     "id": "d1_003",
     "quien": "XAN",
     "texto": "Por que é tan triste esa canción?",
     "voz": "voz/d1/d1_003.mp3"
    },
    {
     "id": "d1_004",
     "quien": "AVOA",
     "texto": "Porque é dalguén que se foi.",
     "voz": "voz/d1/d1_004.mp3"
    },
    {
     "id": "d1_005",
     "quien": "AVOA",
     "texto": "Era do teu avó, sabes? Pero eu arranxeina.",
     "voz": "voz/d1/d1_005.mp3"
    },
    {
     "id": "d1_007",
     "quien": "AVOA",
     "texto": "El tocábaa coa guitarra… rápida, cun balanceo que daba gusto.",
     "voz": "voz/d1/d1_007.mp3",
     "var": "RECURSO_LUME"
    },
    {
     "id": "d1_008",
     "quien": "AVOA",
     "texto": "Eu fíxena lenta, para durmirte. As nanas non se bailan, meu neno.",
     "voz": "voz/d1/d1_008.mp3",
     "var": "AVOA_CERCA"
    },
    {
     "id": "d1_011",
     "quien": "AVOA",
     "texto": "O teu avó quería chamarte John, coma el. Cando marchou, eu dixen: John, en galego, é Xan. E Xan quedaches.",
     "voz": "voz/d1/d1_011.mp3"
    },
    {
     "id": "d1_012",
     "quien": "AVOA",
     "texto": "Tes o seu pelo, sabes? Eses rizos non son desta familia.",
     "voz": "voz/d1/d1_012.mp3",
     "var": "XAN_CERCA"
    },
    {
     "id": "d1_013",
     "quien": "AVOA",
     "texto": "Marchou para a súa América en 1913. Prometeu volver. E aquí sigo: viúva de vivo.",
     "voz": "voz/d1/d1_013.mp3"
    },
    {
     "id": "d1_014",
     "quien": "XAN",
     "texto": "E esa lata?",
     "voz": "voz/d1/d1_014.mp3"
    },
    {
     "id": "d1_015",
     "quien": "AVOA",
     "texto": "Chegou esta mañá. Sen remite… e co teu nome.",
     "voz": "voz/d1/d1_015.mp3",
     "var": "RECURSO_LATA",
     "espera": 0.8
    }
   ],
   "nombre": "La nana",
   "guion_sonido": {
    "amb": "Lluvia en la ventana, fuego de leña, reloj de pared.",
    "mus": "«Nana triste de Xan» cantada por la abuela a capela (Suno, solo voz): primera estrofa al empezar el plano; luego, de fondo."
   },
   "cam": {
    "de": [
     1,
     0.5,
     0.5
    ],
    "a": [
     1.05,
     0.52,
     0.45
    ]
   },
   "foco": {
    "AVOA": [
     0.28,
     0.16,
     0.16
    ],
    "XAN": [
     0.72,
     0.21,
     0.15
    ]
   }
  },
  {
   "id": "P1.2",
   "desc": "La mesa de la cocina, de cerca: la lata abierta en primer término; dentro, billetes de dólar, un billete de barco de ida y vuelta y una nota doblada. Detrás, Xan y la abuela inclinados sobre ella.",
   "img": "img/d1/p1_2.webp",
   "var": {
    "AVOA": "img/d1/p1_2_avoa.webp",
    "XAN": "img/d1/p1_2_xan.webp",
    "RECURSO_LUME": "img/d1/p1_1_recurso_lume.webp",
    "RECURSO_LATA": "img/d1/p1_1_recurso_lata.webp"
   },
   "personajes": [
    "XAN",
    "AVOA"
   ],
   "pal": "lampara",
   "amb": [
    {
     "src": "sfx/d1/cocina_lluvia.mp3",
     "vol": 0.35
    },
    {
     "src": "sfx/d1/fuego.mp3",
     "vol": 0.3
    },
    {
     "src": "sfx/d1/fuego_splice.mp3",
     "vol": 0.2
    }
   ],
   "lineas": [],
   "inter": {
    "tipo": "lata",
    "desc": "El alumno abre la lata con un clic y saca las cosas una a una: los dólares, el billete de barco y la nota.",
    "lineas": {
     "abrir": [
      {
       "id": "d1_r001",
       "quien": "XAN",
       "texto": "Pesa… aquí dentro hai algo máis ca galletas.",
       "voz": "voz/d1/d1_r001.mp3"
      }
     ]
    },
    "previa": "RECURSO_LATA"
   },
   "despues": [
    {
     "id": "d1_016",
     "quien": "XAN",
     "texto": "Dólares… dólares de verdade!",
     "voz": "voz/d1/d1_016.mp3"
    },
    {
     "id": "d1_017",
     "quien": "XAN",
     "texto": "E un billete de barco: «Xan Laurens. A Coruña – La Habana – Nueva Orleans». De ida e volta!",
     "voz": "voz/d1/d1_017.mp3"
    },
    {
     "id": "d1_018",
     "quien": "XAN",
     "texto": "E unha nota: «Ven. Te esperamos. Hunterfly Road, Weeksville. Brooklyn, Nueva York».",
     "voz": "voz/d1/d1_018.mp3",
     "var": "RECURSO_LATA"
    },
    {
     "id": "d1_019",
     "quien": "XAN",
     "texto": "Non asina ninguén. Pero só pode ser el. É o avó!",
     "voz": "voz/d1/d1_019.mp3"
    },
    {
     "id": "d1_020",
     "quien": "AVOA",
     "texto": "Quince anos sen unha carta… e agora mándache un barco.",
     "voz": "voz/d1/d1_020.mp3"
    },
    {
     "id": "d1_021",
     "quien": "AVOA",
     "texto": "Ai, John. Sempre tan teu.",
     "voz": "voz/d1/d1_021.mp3"
    },
    {
     "id": "d1_022",
     "quien": "XAN",
     "texto": "Déixasme ir?",
     "voz": "voz/d1/d1_022.mp3"
    },
    {
     "id": "d1_023",
     "quien": "AVOA",
     "texto": "Deixarte? Media Coruña marcha para América coa túa idade, e con menos.",
     "voz": "voz/d1/d1_023.mp3",
     "var": "RECURSO_LUME"
    },
    {
     "id": "d1_024",
     "quien": "AVOA",
     "texto": "Vai, meu neno. Vai coñecer de onde vés.",
     "voz": "voz/d1/d1_024.mp3"
    },
    {
     "id": "d1_025",
     "quien": "AVOA",
     "texto": "E se o ves… dille que a nana a sigo cantando. Pero á miña maneira.",
     "voz": "voz/d1/d1_025.mp3"
    }
   ],
   "nombre": "La lata",
   "hechos": [
    "h1"
   ],
   "guion_sonido": {
    "sfx": "Tapa de lata metálica, papeles, billetes."
   },
   "cam": {
    "de": [
     1.12,
     0.5,
     0.62
    ],
    "a": [
     1.02,
     0.5,
     0.45
    ]
   },
   "foco": {
    "AVOA": [
     0.31,
     0.32,
     0.19
    ],
    "XAN": [
     0.6,
     0.27,
     0.17
    ]
   }
  },
  {
   "id": "P1.3",
   "desc": "Muelle de A Coruña, mañana gris. El vapor; emigrantes con baúles y fardos. A la izquierda, los pasajeros de primera suben por su propia pasarela con mozos y abrigos de piel. Xan carga su estuche de acordeón: negro, grande y profundo, casi un baúl.",
   "img": "img/d1/p1_3.webp",
   "var": {
    "AVOA": "img/d1/p1_3_avoa.webp",
    "RECURSO_MUELLE": "img/d1/p1_3_recurso_muelle.webp"
   },
   "personajes": [
    "AVOA",
    "XAN"
   ],
   "pal": "muelle",
   "amb": [
    {
     "src": "sfx/d1/muelle_gente.mp3",
     "vol": 0.5
    },
    {
     "src": "sfx/d1/gaviotas_coruna.mp3",
     "vol": 0.45
    },
    {
     "src": "sfx/d1/mar_gaviotas.mp3",
     "vol": 0.25
    }
   ],
   "hechos": [],
   "lineas": [
    {
     "id": "d1_026",
     "quien": "AVOA",
     "texto": "Levas pan, que no mar non hai panadarías. E marmelo.",
     "voz": "voz/d1/d1_026.mp3"
    },
    {
     "id": "d1_027",
     "quien": "XAN",
     "texto": "Avoa, levo tres pans.",
     "voz": "voz/d1/d1_027.mp3"
    },
    {
     "id": "d1_028",
     "quien": "AVOA",
     "texto": "Pois catro. E a bufanda, que en América tamén fai frío.",
     "voz": "voz/d1/d1_028.mp3"
    },
    {
     "id": "d1_029",
     "quien": "XAN",
     "texto": "Mira eses, avoa. A eses súbenlles os baúis os mozos.",
     "voz": "voz/d1/d1_029.mp3",
     "var": "RECURSO_MUELLE",
     "espera": 0.6
    },
    {
     "id": "d1_030",
     "quien": "AVOA",
     "texto": "Eses van arriba, co champaña. Ti vas abaixo, cos teus. E que non che dea vergoña.",
     "voz": "voz/d1/d1_030.mp3"
    },
    {
     "id": "d1_031",
     "quien": "XAN",
     "texto": "E se non o atopo?",
     "voz": "voz/d1/d1_031.mp3"
    },
    {
     "id": "d1_032",
     "quien": "AVOA",
     "texto": "Se te perdes, toca a nana. Alguén a recoñecerá.",
     "voz": "voz/d1/d1_032.mp3"
    },
    {
     "id": "d1_033",
     "quien": "AVOA",
     "texto": "Volve, ¿eh? Que eu xa sei o que é esperar.",
     "voz": "voz/d1/d1_033.mp3"
    }
   ],
   "nombre": "El muelle",
   "guion_sonido": {
    "amb": "Muelle: gentío, gaviotas, olas contra la piedra, cuerdas y cadenas.",
    "sfx": "La sirena grave del barco (dos veces)."
   },
   "foco": {
    "AVOA": [
     0.41,
     0.33,
     0.11
    ],
    "XAN": [
     0.57,
     0.13,
     0.11
    ]
   }
  },
  {
   "id": "P1.4",
   "desc": "Mesa del sobrecargo al pie de la pasarela; el libro del manifiesto abierto, con una columna «Race or People». Xan, delante, con su estuche grande a los pies.",
   "img": "img/d1/p1_4.webp",
   "var": {
    "SOBRE": "img/d1/p1_4_sobre.webp",
    "XAN": "img/d1/p1_4_xan.webp",
    "SOBRE_CERCA": "img/d1/p1_4_sobre_cerca.webp",
    "RECURSO_SELLO": "img/d1/p1_4_recurso_sello.webp"
   },
   "personajes": [
    "SOBRE",
    "XAN"
   ],
   "pal": "muelle",
   "amb": [
    {
     "src": "sfx/d1/murmullo.mp3",
     "vol": 0.4
    },
    {
     "src": "sfx/d1/gaviotas_coruna.mp3",
     "vol": 0.3
    },
    {
     "src": "sfx/d1/motor_lejos.mp3",
     "vol": 0.25
    }
   ],
   "hechos": [
    "h4",
    "h9",
    "h36"
   ],
   "lineas": [
    {
     "id": "d1_034",
     "quien": "SOBRE",
     "texto": "Next. Name?",
     "voz": "voz/d1/d1_034.mp3"
    },
    {
     "id": "d1_035",
     "quien": "XAN",
     "texto": "Xan. Xan Laurens.",
     "voz": "voz/d1/d1_035.mp3"
    },
    {
     "id": "d1_036",
     "quien": "SOBRE",
     "texto": "Lau-rens. Eso no es gallego.",
     "voz": "voz/d1/d1_036.mp3"
    },
    {
     "id": "d1_037",
     "quien": "XAN",
     "texto": "Es de mi abuelo. John Laurens, de Carolina del Sur.",
     "voz": "voz/d1/d1_037.mp3"
    },
    {
     "id": "d1_039",
     "quien": "SOBRE",
     "texto": "Race or people… «African».",
     "voz": "voz/d1/d1_039.mp3",
     "var": "RECURSO_SELLO",
     "espera": 1.3
    },
    {
     "id": "d1_040",
     "quien": "XAN",
     "texto": "¿Cómo dice?",
     "voz": "voz/d1/d1_040.mp3"
    },
    {
     "id": "d1_041",
     "quien": "SOBRE",
     "texto": "Nada. Formalidades del Tío Sam. ¿Motivo del viaje?",
     "voz": "voz/d1/d1_041.mp3"
    },
    {
     "id": "d1_093",
     "quien": "XAN",
     "texto": "Visitar a mi abuelo. Tengo billete de vuelta.",
     "voz": "voz/d1/d1_093.mp3"
    },
    {
     "id": "d1_042",
     "quien": "SOBRE",
     "texto": "Usted duerme abajo, junto a las calderas. Con la cuadrilla de obreros.",
     "voz": "voz/d1/d1_042.mp3",
     "var": "SOBRE_CERCA"
    },
    {
     "id": "d1_043",
     "quien": "XAN",
     "texto": "Pero mi billete…",
     "voz": "voz/d1/d1_043.mp3",
     "var": "SOBRE_CERCA"
    },
    {
     "id": "d1_044",
     "quien": "SOBRE",
     "texto": "Laurens… Su billete dice que sube a bordo. No dice dónde duerme. Next!",
     "voz": "voz/d1/d1_044.mp3",
     "var": "SOBRE_CERCA"
    }
   ],
   "nombre": "El manifiesto",
   "guion_sonido": {
    "amb": "Murmullo del muelle, más lejos.",
    "sfx": "Pluma rascando el papel; un sello de goma."
   },
   "foco": {
    "XAN": [
     0.44,
     0.08,
     0.09
    ],
    "SOBRE": [
     0.82,
     0.3,
     0.11
    ]
   }
  },
  {
   "id": "P1.4b",
   "nombre": "La pasarela",
   "desc": "La pasarela de tercera, empinada, sube por el casco negro del vapor hasta una escotilla oscura; emigrantes con fardos y baúles; Xan, a media pasarela, encorvado bajo su estuche enorme, mira hacia arriba.",
   "img": "img/d1/p1_4b.webp",
   "pal": "muelle",
   "amb": [
    {
     "src": "sfx/d1/muelle_gente.mp3",
     "vol": 0.35
    },
    {
     "src": "sfx/d1/gaviotas_coruna.mp3",
     "vol": 0.3
    },
    {
     "src": "sfx/d1/mar_gaviotas.mp3",
     "vol": 0.25
    },
    {
     "src": "sfx/d1/pasos_pasarela.mp3",
     "vol": 0.85
    },
    {
     "src": "sfx/d1/sirena_vapor.mp3",
     "vol": 0.5
    }
   ],
   "espera": 4.2,
   "cam": {
    "de": [
     1,
     0.5,
     0.62
    ],
    "a": [
     1.07,
     0.5,
     0.42
    ],
    "dur": 5.5
   },
   "hechos": [],
   "personajes": []
  },
  {
   "id": "P1.4c",
   "nombre": "Hacia abajo",
   "desc": "Dentro del barco: un pasillo estrecho de hierro remachado y bombillas desnudas; Xan, con el estuche a cuestas, baja por una escalerilla de hierro hacia el resplandor naranja y el vapor de las calderas.",
   "img": "img/d1/p1_4c.webp",
   "pal": "fuego",
   "amb": [
    {
     "src": "sfx/d1/calderas_lejos.mp3",
     "vol": 0.5
    },
    {
     "src": "sfx/d1/sala_maquinas.mp3",
     "vol": 0.3
    },
    {
     "src": "sfx/d1/pasos_dentro.mp3",
     "vol": 0.9
    },
    {
     "src": "sfx/d1/barco_cruje.mp3",
     "vol": 0.35
    }
   ],
   "espera": 4.2,
   "cam": {
    "de": [
     1,
     0.5,
     0.4
    ],
    "a": [
     1.08,
     0.5,
     0.6
    ],
    "dur": 5.5
   },
   "hechos": [],
   "personajes": []
  },
  {
   "id": "P1.5",
   "desc": "Bodega del barco: bocas de fuego naranjas, montañas de carbón, vapor, tuberías; fogoneros negros tiznados y sudados. Amos se gira hacia Xan, que baja asustado por una escalera de hierro cargando su estuche grande.",
   "img": "img/d1/p1_5.webp",
   "var": {
    "AMOS": "img/d1/p1_5_amos.webp",
    "XAN": "img/d1/p1_5_xan.webp",
    "AMOS_CERCA": "img/d1/p1_5_amos_cerca.webp",
    "XAN_CERCA": "img/d1/p1_5_xan_cerca.webp",
    "RECURSO_CALDERA": "img/d1/p1_5_recurso_caldera.webp",
    "RECURSO_RATON": "img/d1/p1_6_recurso_raton.webp"
   },
   "personajes": [
    "AMOS",
    "XAN"
   ],
   "pal": "fuego",
   "amb": [
    {
     "src": "sfx/d1/calderas.mp3",
     "vol": 0.55
    },
    {
     "src": "sfx/d1/sala_maquinas.mp3",
     "vol": 0.45
    },
    {
     "src": "sfx/d1/vapor_silbidos.mp3",
     "vol": 0.55
    },
    {
     "src": "sfx/d1/fuego_splice.mp3",
     "vol": 0.18
    }
   ],
   "hechos": [
    "h5",
    "h35",
    "h6"
   ],
   "lineas": [
    {
     "id": "d1_045",
     "quien": "AMOS",
     "texto": "Well, well… ¿y tú quién eres, boy? Aquí abajo no bajan pasajeros.",
     "voz": "voz/d1/d1_045.mp3",
     "var": "RECURSO_RATON"
    },
    {
     "id": "d1_046",
     "quien": "XAN",
     "texto": "Me han mandado aquí. Por mi apellido.",
     "voz": "voz/d1/d1_046.mp3"
    },
    {
     "id": "d1_048",
     "quien": "XAN",
     "texto": "Laurens.",
     "voz": "voz/d1/d1_048.mp3",
     "espera": 1.2
    },
    {
     "id": "d1_049",
     "quien": "AMOS",
     "texto": "Laurens… Lord. En Carolina del Sur hay más Laurens que algodón.",
     "voz": "voz/d1/d1_049.mp3",
     "var": "AMOS_CERCA"
    },
    {
     "id": "d1_050",
     "quien": "AMOS",
     "texto": "Me llamo Amos. Y estos son la cuadrilla negra. Por el hollín. ¿Por qué iba a ser, si no?",
     "voz": "voz/d1/d1_050.mp3"
    },
    {
     "id": "d1_051",
     "quien": "XAN",
     "texto": "¿Puedo ayudar?",
     "voz": "voz/d1/d1_051.mp3"
    },
    {
     "id": "d1_052",
     "quien": "AMOS",
     "texto": "Aquí come caliente el que trabaja. Abre esa puerta. Con cuidado, que muerde.",
     "voz": "voz/d1/d1_052.mp3",
     "var": "RECURSO_CALDERA"
    }
   ],
   "inter": {
    "tipo": "caldera",
    "desc": "1) Arrastrar para abrir la puerta de hierro de la caldera. 2) Canto de trabajo (Suno): Amos canta y el coro repite; el alumno mantiene pulsado mientras canta el coro (fila de pulsos con los del coro en amarillo, tipo Guitar Hero de un botón). Ocho frases.",
    "lineas": {
     "abierta": [
      {
       "id": "d1_r002",
       "quien": "AMOS",
       "texto": "Eso es. Ahora, la pala. Pero no a lo loco: aquí se palea cantando.",
       "voz": "voz/d1/d1_r002.mp3"
      }
     ],
     "intro": [
      {
       "id": "d1_r003",
       "quien": "AMOS",
       "texto": "Lo aprendí de chaval, cargando vapores en el Misisipi: uno pregunta y todos contestan.",
       "voz": "voz/d1/d1_r003.mp3"
      }
     ],
     "llamada1": [
      {
       "id": "d1_r004",
       "quien": "AMOS",
       "texto": "¡Carbón pa'l fuego…!",
       "voz": "voz/d1/d1_r004.mp3",
       "acento": 0.344
      }
     ],
     "llamada2": [
      {
       "id": "d1_r005",
       "quien": "AMOS",
       "texto": "¡Fuego en la panza…!",
       "voz": "voz/d1/d1_r005.mp3",
       "acento": 0.433
      }
     ],
     "llamada3": [
      {
       "id": "d1_r006",
       "quien": "AMOS",
       "texto": "¡Agua en la caldera…!",
       "voz": "voz/d1/d1_r006.mp3",
       "acento": 0.111
      }
     ],
     "llamada4": [
      {
       "id": "d1_r007",
       "quien": "AMOS",
       "texto": "¡Vapor pa' la hélice…!",
       "voz": "voz/d1/d1_r007.mp3",
       "acento": 0.422
      }
     ],
     "llamada5": [
      {
       "id": "d1_r008",
       "quien": "AMOS",
       "texto": "¡La hélice en la mar…!",
       "voz": "voz/d1/d1_r008.mp3",
       "acento": 0.365
      }
     ],
     "llamada6": [
      {
       "id": "d1_r009",
       "quien": "AMOS",
       "texto": "¡La mar hasta Nueva Orleans…!",
       "voz": "voz/d1/d1_r009.mp3",
       "acento": 0.343
      }
     ],
     "llamada7": [
      {
       "id": "d1_r010",
       "quien": "AMOS",
       "texto": "¡Uno más, muchachos…!",
       "voz": "voz/d1/d1_r010.mp3",
       "acento": 0.212
      }
     ],
     "llamada8": [
      {
       "id": "d1_r011",
       "quien": "AMOS",
       "texto": "¡Y el último, pa' casa…!",
       "voz": "voz/d1/d1_r011.mp3",
       "acento": 0.402
      }
     ],
     "respuesta": [
      {
       "id": "d1_r012",
       "quien": "FOGONEROS",
       "texto": "¡Ho!",
       "voz": "voz/d1/d1_r012.mp3",
       "var": "-"
      }
     ],
     "acierto": [
      {
       "id": "d1_r013",
       "quien": "AMOS",
       "texto": "¡Eso es, boy! Ya eres de la cuadrilla.",
       "voz": "voz/d1/d1_r013.mp3"
      }
     ],
     "fallo": [
      {
       "id": "d1_r014",
       "quien": "AMOS",
       "texto": "Con el canto, gallego, con el canto. La pala va en la respuesta.",
       "voz": "voz/d1/d1_r014.mp3"
      }
     ],
     "fin": [
      {
       "id": "d1_r015",
       "quien": "AMOS",
       "texto": "Así se aguantan doce horas aquí abajo: cantando.",
       "voz": "voz/d1/d1_r015.mp3"
      }
     ],
     "cancion": {
      "id": "d1_099",
      "quien": "AMOS",
      "texto": "Boy, ahora canto yo… y tú das el palazo al ritmo del coro.",
      "voz": "voz/d1/d1_099.mp3"
     }
    },
    "recursos": [
     "mus/canto_amos.mp3",
     "sfx/d1/vapor_escape.mp3"
    ]
   },
   "despues": [
    {
     "id": "d1_053",
     "quien": "AMOS",
     "texto": "Mis padres nacieron esclavos. En Carolina del Sur.",
     "voz": "voz/d1/d1_053.mp3",
     "var": "AMOS_CERCA",
     "espera": 0.7
    },
    {
     "id": "d1_054",
     "quien": "AMOS",
     "texto": "Yo nací libre, pero de niño recogía algodón de sol a sol.",
     "voz": "voz/d1/d1_054.mp3",
     "var": "AMOS_CERCA"
    },
    {
     "id": "d1_055",
     "quien": "AMOS",
     "texto": "Y para aguantar, cantábamos. Uno lanzaba la pregunta y todos contestaban.",
     "voz": "voz/d1/d1_055.mp3"
    },
    {
     "id": "d1_056",
     "quien": "AMOS",
     "texto": "Eso vino de África, en los barcos. Y luego se metió en la iglesia: el predicador pregunta y la gente responde.",
     "voz": "voz/d1/d1_056.mp3"
    },
    {
     "id": "d1_057",
     "quien": "AMOS",
     "texto": "Pregunta y respuesta, boy. Sin eso no hay blues.",
     "voz": "voz/d1/d1_057.mp3"
    },
    {
     "id": "d1_058",
     "quien": "XAN",
     "texto": "¿Blues?",
     "voz": "voz/d1/d1_058.mp3"
    },
    {
     "id": "d1_059",
     "quien": "AMOS",
     "texto": "El blues es cuando echas de menos algo que dejaste lejos… te duele, y lo cantas para que duela menos.",
     "voz": "voz/d1/d1_059.mp3",
     "var": "AMOS_CERCA"
    },
    {
     "id": "d1_060",
     "quien": "XAN",
     "texto": "En Galicia, a eso lo llamamos morriña.",
     "voz": "voz/d1/d1_060.mp3",
     "var": "XAN_CERCA",
     "espera": 1.3
    },
    {
     "id": "d1_061",
     "quien": "AMOS",
     "texto": "¿Morri…ña? Me gusta. Suena a blues.",
     "voz": "voz/d1/d1_061.mp3"
    }
   ],
   "nombre": "La sala de calderas",
   "guion_sonido": {
    "amb": "Rugido de calderas, máquinas, vapor; palas en el carbón."
   },
   "cam": {
    "de": [
     1,
     0.5,
     0.5
    ],
    "a": [
     1.06,
     0.45,
     0.4
    ]
   },
   "foco": {
    "XAN": [
     0.78,
     0.17,
     0.08
    ],
    "AMOS": [
     0.46,
     0.25,
     0.09
    ],
    "FOGONEROS": [
     0.22,
     0.19,
     0.09
    ]
   }
  },
  {
   "id": "P1.6",
   "desc": "Rincón de la sala de calderas, de noche: Amos, sentado en un cajón con la armónica; Xan, delante de su estuche grande abierto, con su acordeón de teclado (de tamaño medio). El fuego, al fondo.",
   "img": "img/d1/p1_6.webp",
   "var": {
    "AMOS": "img/d1/p1_6_amos.webp",
    "XAN": "img/d1/p1_6_xan.webp",
    "CERRADO": "img/d1/p1_6_cerrado.webp",
    "RECURSO_RATON": "img/d1/p1_6_recurso_raton.webp",
    "RECURSO_CALDERA": "img/d1/p1_5_recurso_caldera.webp",
    "RECURSO_ESTUCHE": "img/d1/p1_6_recurso_estuche.webp"
   },
   "personajes": [
    "AMOS",
    "XAN"
   ],
   "pal": "fuego",
   "amb": [
    {
     "src": "sfx/d1/calderas_lejos.mp3",
     "vol": 0.35
    },
    {
     "src": "sfx/d1/sala_maquinas.mp3",
     "vol": 0.22
    },
    {
     "src": "sfx/d1/vapor_silbidos.mp3",
     "vol": 0.3
    },
    {
     "src": "sfx/d1/barco_cruje.mp3",
     "vol": 0.28
    }
   ],
   "hechos": [
    "h7",
    "h8",
    "h47"
   ],
   "lineas": [
    {
     "id": "d1_062",
     "quien": "AMOS",
     "texto": "A ver ese cajón que llevas a todas partes. ¿Es un ataúd para gatos?",
     "voz": "voz/d1/d1_062.mp3",
     "var": "RECURSO_ESTUCHE",
     "espera": 0.5
    },
    {
     "id": "d1_063",
     "quien": "XAN",
     "texto": "Es un acordeón.",
     "voz": "voz/d1/d1_063.mp3"
    }
   ],
   "inter": [
    {
     "tipo": "acordeon",
     "desc": "El alumno abre los cierres del estuche (clic) y abre el fuelle arrastrando en horizontal: suena el aire y un acorde de Sol. Aparece el teclado.",
     "lineas": {
      "abierto": [
       {
        "id": "d1_r016",
        "quien": "AMOS",
        "texto": "¡Un acordeón de teclas de piano! Mira tú.",
        "voz": "voz/d1/d1_r016.mp3"
       }
      ]
     },
     "previa": "RECURSO_ESTUCHE"
    },
    {
     "tipo": "pregunta",
     "desc": "Pregunta y respuesta guiada, 3 rondas: la armónica pregunta (acaba en Re) y el alumno contesta en el teclado como quiera, pero acabando en Sol. Brillan suave las notas de la escala (sol, la, si, re, mi y fa natural).",
     "antes": [
      {
       "id": "d1_065",
       "quien": "AMOS",
       "texto": "Y esta es la mía: una Hohner, alemana. Cuesta menos que un plato de comida.",
       "voz": "voz/d1/d1_065.mp3"
      },
      {
       "id": "d1_066",
       "quien": "AMOS",
       "texto": "Juguemos. Yo pregunto con la armónica y tú me contestas con tus teclas.",
       "voz": "voz/d1/d1_066.mp3"
      },
      {
       "id": "d1_067",
       "quien": "AMOS",
       "texto": "Mi pregunta acaba en Re: se queda en el aire, ¿lo oyes? Tu respuesta tiene que acabar en Sol: en casa.",
       "voz": "voz/d1/d1_067.mp3"
      }
     ],
     "lineas": {
      "acierto_r1": [
       {
        "id": "d1_r017",
        "quien": "AMOS",
        "texto": "¡Eso es! Has cerrado la puerta.",
        "voz": "voz/d1/d1_r017.mp3"
       }
      ],
      "acierto_r2": [
       {
        "id": "d1_r018",
        "quien": "AMOS",
        "texto": "Yes, sir. Eso es una respuesta.",
        "voz": "voz/d1/d1_r018.mp3"
       }
      ],
      "acierto_r3": [
       {
        "id": "d1_r019",
        "quien": "AMOS",
        "texto": "¿Oíste ese bend en mi pregunta, la nota que se estira? Ya hablaremos de ella.",
        "voz": "voz/d1/d1_r019.mp3"
       }
      ],
      "fallo": [
       {
        "id": "d1_r020",
        "quien": "AMOS",
        "texto": "Casi. Acaba en Sol, que es casa.",
        "voz": "voz/d1/d1_r020.mp3"
       },
       {
        "id": "d1_r021",
        "quien": "AMOS",
        "texto": "Te has quedado en la calle, boy. Vuelve a casa: al Sol.",
        "voz": "voz/d1/d1_r021.mp3"
       }
      ],
      "pista": [
       {
        "id": "d1_r022",
        "quien": "AMOS",
        "texto": "Las notas que brillan son las buenas. Y el Sol, la que más.",
        "voz": "voz/d1/d1_r022.mp3"
       }
      ]
     }
    },
    {
     "tipo": "ahoraTu",
     "desc": "«Ahora tú, Xan»: el alumno toca 4–5 notas con el ritmo que quiera y la armónica le contesta con el mismo ritmo y el contorno al revés, acabando en Sol (o le devuelve la pregunta acabando en Re si el alumno acabó en Sol), con una nota doblada.",
     "antes": [
      {
       "id": "d1_068",
       "quien": "AMOS",
       "texto": "Bien. Ahora, al revés: pregunta tú, Xan. Y yo te contesto.",
       "voz": "voz/d1/d1_068.mp3"
      }
     ],
     "lineas": {
      "respuesta": [
       {
        "id": "d1_r023",
        "quien": "AMOS",
        "texto": "¿Lo ves? Tu mismo ritmo, pero al revés. Y acabo en casa.",
        "voz": "voz/d1/d1_r023.mp3"
       }
      ],
      "devuelve": [
       {
        "id": "d1_r024",
        "quien": "AMOS",
        "texto": "Ah, ¿acabaste en Sol? Pues te devuelvo la pregunta, boy. ¡Contesta!",
        "voz": "voz/d1/d1_r024.mp3"
       }
      ],
      "otra": [
       {
        "id": "d1_r025",
        "quien": "AMOS",
        "texto": "Otra. Esto es una conversación, no un examen.",
        "voz": "voz/d1/d1_r025.mp3"
       }
      ],
      "fin": [
       {
        "id": "d1_r026",
        "quien": "AMOS",
        "texto": "Hablas mi idioma, gallego. Aunque sea con un cajón de teclas.",
        "voz": "voz/d1/d1_r026.mp3"
       }
      ]
     }
    }
   ],
   "despues": [
    {
     "id": "d1_069",
     "quien": "XAN",
     "texto": "¿Y ese bend? La nota que se estira y suena… como torcida.",
     "voz": "voz/d1/d1_069.mp3"
    },
    {
     "id": "d1_070",
     "quien": "AMOS",
     "texto": "Esa es una nota azul. Una nota triste. Pregúntale a tu abuelo por ella cuando lo veas.",
     "voz": "voz/d1/d1_070.mp3"
    }
   ],
   "nombre": "Pregunta y respuesta",
   "guion_sonido": {
    "amb": "Calderas al fondo (más bajas), crujidos del barco."
   },
   "foco": {
    "AMOS": [
     0.28,
     0.11,
     0.19
    ],
    "XAN": [
     0.72,
     0.16,
     0.15
    ]
   }
  },
  {
   "id": "P1.7",
   "desc": "Cubierta de tercera, de noche. Arriba, tras las ventanas iluminadas del salón de primera clase, parejas elegantes bailan el charlestón; se ve la orquesta: trompeta, clarinete, banjo, tuba y batería. Amos y Xan miran desde abajo, apoyados en la barandilla.",
   "img": "img/d1/p1_7.webp",
   "var": {
    "AMOS": "img/d1/p1_7_amos.webp",
    "XAN": "img/d1/p1_7_xan.webp"
   },
   "personajes": [
    "AMOS",
    "XAN"
   ],
   "pal": "noche_mar",
   "amb": [
    {
     "src": "sfx/d1/mar_noche.mp3",
     "vol": 0.5
    },
    {
     "src": "sfx/d1/motor_lejos.mp3",
     "vol": 0.35
    },
    {
     "src": "sfx/d1/barco_cruje.mp3",
     "vol": 0.3
    }
   ],
   "mus": {
    "src": "mus/charleston_salon.mp3",
    "vol": 0.32,
    "bucle": true
   },
   "lineas": [
    {
     "id": "d1_071",
     "quien": "XAN",
     "texto": "Arriba suena una orquesta.",
     "voz": "voz/d1/d1_071.mp3"
    },
    {
     "id": "d1_072",
     "quien": "AMOS",
     "texto": "Primera clase. Bailan charlestón con champán.",
     "voz": "voz/d1/d1_072.mp3"
    },
    {
     "id": "d1_073",
     "quien": "AMOS",
     "texto": "Bailan nuestra música, boy… y no nos dejarían subir ni a recoger las copas.",
     "voz": "voz/d1/d1_073.mp3"
    },
    {
     "id": "d1_074",
     "quien": "XAN",
     "texto": "Eso no es justo.",
     "voz": "voz/d1/d1_074.mp3"
    },
    {
     "id": "d1_075",
     "quien": "AMOS",
     "texto": "No. Pero la música sube sola por las escaleras. A ella no la para nadie.",
     "voz": "voz/d1/d1_075.mp3"
    },
    {
     "id": "d1_098",
     "quien": "AMOS",
     "texto": "Ve a descansar, boy. Te lo has ganado.",
     "voz": "voz/d1/d1_098.mp3",
     "espera": 1.0
    }
   ],
   "nombre": "Arriba y abajo",
   "hechos": [],
   "guion_sonido": {
    "amb": "Mar abierto contra el casco, viento.",
    "mus": "La orquesta de primera (trompeta, clarinete, banjo, tuba y batería; nada más), lejos y filtrada (Suno)."
   },
   "foco": {
    "AMOS": [
     0.33,
     0.35,
     0.22
    ],
    "XAN": [
     0.59,
     0.42,
     0.18
    ]
   }
  },
  {
   "id": "P1.7m",
   "nombre": "Mapa: A Coruña → La Habana",
   "desc": "Carta náutica antigua del Atlántico: la ruta del barco se dibuja desde A Coruña hasta La Habana.",
   "img": "img/d1/mapa.webp",
   "pal": "atlantico",
   "amb": [
    {
     "src": "sfx/d1/mar_noche.mp3",
     "vol": 0.4
    },
    {
     "src": "sfx/d1/motor_lejos.mp3",
     "vol": 0.32
    },
    {
     "src": "sfx/d1/barco_cruje.mp3",
     "vol": 0.15
    }
   ],
   "espera": 11,
   "hechos": [],
   "personajes": [],
   "mapa": {
    "ruta": [
     [
      0.861,
      0.33
     ],
     [
      0.8,
      0.405
     ],
     [
      0.66,
      0.5
     ],
     [
      0.5,
      0.55
     ],
     [
      0.36,
      0.57
     ],
     [
      0.27,
      0.585
     ],
     [
      0.22,
      0.6
     ],
     [
      0.186,
      0.61
     ]
    ],
    "desde": "A Coruña",
    "hasta": "La Habana",
    "sub": "Al amanecer · parada para repostar carbón",
    "dur": 8,
    "etiq": {
     "desde": [
      -10.5,
      -1.6
     ],
     "hasta": [
      -3.5,
      3.6
     ]
    },
    "musA": {
     "src": "mus/son_habana.mp3",
     "vol": 0.6,
     "bucle": true
    },
    "sfx": [
     {
      "src": "sfx/d1/sirena_vapor.mp3",
      "vol": 0.35,
      "t": 0.6
     }
    ],
    "icono": "img/inter/barco_mapa.webp",
    "proporcionIcono": 0.355,
    "anchoIcono": 10
   },
   "mus": {
    "src": "mus/charleston_salon.mp3",
    "vol": 0.32,
    "bucle": true
   }
  },
  {
   "id": "P1.7b",
   "img": "img/d1/p1_7b.webp",
   "pal": "ocre",
   "amb": [
    {
     "src": "sfx/d1/puerto.mp3",
     "vol": 0.5
    },
    {
     "src": "sfx/d1/muelle_gente.mp3",
     "vol": 0.35
    },
    {
     "src": "sfx/d1/playa_gaviotas.mp3",
     "vol": 0.32
    }
   ],
   "lineas": [
    {
     "id": "d1_076",
     "quien": "AMOS",
     "texto": "La Habana. Aquí a muchos españoles los llaman «gallegos», ¿sabías? Habéis venido tantos…",
     "voz": "voz/d1/d1_076.mp3"
    },
    {
     "id": "d1_077",
     "quien": "XAN",
     "texto": "¡Pues conmigo aciertan!",
     "voz": "voz/d1/d1_077.mp3"
    },
    {
     "id": "d1_078",
     "quien": "AMOS",
     "texto": "Escucha a esos del muelle. Otra pregunta y respuesta: el tambor de África y la guitarra de España, juntos.",
     "voz": "voz/d1/d1_078.mp3"
    },
    {
     "id": "d1_081",
     "quien": "AMOS",
     "texto": "Pero eso es otra historia, gallego. Hoy tenemos un blues que llevar a Nueva Orleans.",
     "voz": "voz/d1/d1_081.mp3"
    }
   ],
   "nombre": "La Habana",
   "desc": "Muelle de La Habana a mediodía: sol fuerte, fachadas de colores, sacos de azúcar. En el muelle, tres músicos tocan y cantan un son con tres, bongó y claves (nada más). Amos y Xan miran desde la borda.",
   "personajes": [
    "AMOS",
    "XAN"
   ],
   "hechos": [
    "h45",
    "h46"
   ],
   "guion_sonido": {
    "amb": "Puerto tropical: gente, carros, gaviotas.",
    "mus": "El son del muelle (Suno: tres, bongó, claves y voces; nada más)."
   },
   "var": {
    "AMOS": "img/d1/p1_7b_amos.webp",
    "XAN": "img/d1/p1_7b_xan.webp"
   },
   "mus": {
    "src": "mus/son_habana.mp3",
    "vol": 0.6,
    "bucle": true
   },
   "foco": {
    "AMOS": [
     0.38,
     0.23,
     0.2
    ],
    "XAN": [
     0.65,
     0.32,
     0.18
    ]
   }
  },
  {
   "id": "P1.8m",
   "nombre": "Mapa: La Habana → Nueva Orleans",
   "desc": "Carta náutica antigua del golfo de México: el barco sale de La Habana, cruza el golfo y remonta el Misisipi hasta Nueva Orleans.",
   "img": "img/d1/mapa_golfo.webp",
   "pal": "atlantico",
   "amb": [
    {
     "src": "sfx/d1/mar_noche.mp3",
     "vol": 0.3
    },
    {
     "src": "sfx/d1/motor_lejos.mp3",
     "vol": 0.3
    },
    {
     "src": "sfx/d1/mar_gaviotas.mp3",
     "vol": 0.12
    }
   ],
   "mus": {
    "src": "mus/son_habana.mp3",
    "vol": 0.6,
    "bucle": true
   },
   "espera": 10.5,
   "hechos": [],
   "personajes": [],
   "mapa": {
    "ruta": [
     [
      0.706,
      0.661
     ],
     [
      0.7,
      0.62
     ],
     [
      0.64,
      0.5
     ],
     [
      0.575,
      0.385
     ],
     [
      0.52,
      0.31
     ],
     [
      0.497,
      0.284
     ],
     [
      0.478,
      0.245
     ],
     [
      0.465,
      0.212
     ],
     [
      0.453,
      0.18
     ]
    ],
    "desde": "La Habana",
    "hasta": "Nueva Orleans",
    "sub": "Dos días después, Misisipi arriba",
    "dur": 8,
    "etiq": {
     "desde": [
      1.6,
      2.4
     ],
     "hasta": [
      -8.6,
      -3.9
     ]
    },
    "musA": {
     "src": "mus/jazz_nueva_orleans.mp3",
     "vol": 0.5,
     "bucle": true
    },
    "sfx": [
     {
      "src": "sfx/d1/sirena_vapor.mp3",
      "vol": 0.3,
      "t": 8.4
     }
    ],
    "icono": "img/inter/barco_mapa.webp",
    "proporcionIcono": 0.355,
    "anchoIcono": 8.5
   }
  },
  {
   "id": "P1.8",
   "desc": "Puerto de Nueva Orleans al amanecer: grúas, balas de algodón, un vapor de ruedas. Amos y Xan, en la pasarela; Xan con su estuche grande.",
   "img": "img/d1/p1_8.webp",
   "var": {
    "AMOS": "img/d1/p1_8_amos.webp",
    "XAN": "img/d1/p1_8_xan.webp"
   },
   "personajes": [
    "AMOS",
    "XAN"
   ],
   "pal": "ocre",
   "amb": [
    {
     "src": "sfx/d1/puerto.mp3",
     "vol": 0.5
    }
   ],
   "hechos": [
    "h10"
   ],
   "lineas": [
    {
     "id": "d1_082",
     "quien": "AMOS",
     "texto": "Nueva Orleans, boy. Aquí nació el jazz. Y aquí se separan nuestros caminos.",
     "voz": "voz/d1/d1_082.mp3"
    },
    {
     "id": "d1_083",
     "quien": "XAN",
     "texto": "¿Cómo llego a Nueva York?",
     "voz": "voz/d1/d1_083.mp3"
    },
    {
     "id": "d1_084",
     "quien": "AMOS",
     "texto": "En tren. Dos días. Busca el vagón de delante, el pegado a la locomotora: allí tengo amigos. Músicos… como tú.",
     "voz": "voz/d1/d1_084.mp3"
    },
    {
     "id": "d1_085",
     "quien": "AMOS",
     "texto": "Toma: una nota para mi primo George. Es mozo de los coches Pullman. Él te cuidará.",
     "voz": "voz/d1/d1_085.mp3"
    },
    {
     "id": "d1_086",
     "quien": "AMOS",
     "texto": "Trágate el humo y canta, Xan Laurens. Y cuando encuentres a tu abuelo, pregúntale por la nota azul.",
     "voz": "voz/d1/d1_086.mp3"
    },
    {
     "id": "d1_087",
     "quien": "XAN",
     "texto": "Gracias, Amos.",
     "voz": "voz/d1/d1_087.mp3"
    },
    {
     "id": "d1_089",
     "quien": "XAN",
     "texto": "Así me despedí de Amos. Mañana, el tren.",
     "voz": "voz/d1/d1_089.mp3",
     "var": "-"
    }
   ],
   "nombre": "Nueva Orleans",
   "guion_sonido": {
    "amb": "Puerto: campana de barco, gaviotas, sirena de un vapor de ruedas, gente trabajando."
   },
   "foco": {
    "AMOS": [
     0.32,
     0.15,
     0.2
    ],
    "XAN": [
     0.67,
     0.25,
     0.15
    ]
   },
   "mus": {
    "src": "mus/jazz_nueva_orleans.mp3",
    "vol": 0.36,
    "bucle": true
   }
  }
 ]
});
