/* BLUES · Día 5 · «A Jam no porche» — datos generados con herramientas/guion2datos.mjs (v3).
   Los textos vienen del guion: para cambiarlos, cambiar el guion y volver a pasar la herramienta.
   Lo demás (img, var, cam, amb, mus, pal, espera, configuración de inter) se puede tocar aquí: la herramienta lo respeta.
   Formato: ver LEEME-motor.md. */
BLUES.dia(5, {
 "titulo": "A Jam no porche",
 "lugar": "Weeksville, Brooklyn · 1929",
 "carta": {
  "encabezado": "A Coruña, 1929",
  "firma": "Xan",
  "texto": "Querido Eli: la avoa ya canta la nana con swing. Dice que no se la toque nadie más. Menos yo. Dale recuerdos a Ruby, a Teddy y a Mr. Odell. Y guárdame el sitio en el porche… …o mejor, déjaselo a quien llegue con un instrumento y ganas de contestar.",
  "lineas": [
   {
    "id": "d5_c03",
    "quien": "XAN",
    "texto": "Querido Eli: la avoa ya canta la nana con swing. Dice que no se la toque nadie más. Menos yo.",
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
    "texto": "…o mejor, déjaselo a quien llegue con un instrumento y ganas de contestar.",
    "voz": "voz/d5/d5_c05.mp3"
   }
  ]
 },
 "planos": [
  {
   "id": "P5.0",
   "desc": "Título del día 5 + la carta de Xan a Eli, desde Coruña: el porche de Weeksville al anochecer, con los farolillos encendidos y un hueco libre en el centro.",
   "img": "img/d5/p5_0.webp",
   "pal": "farol",
   "amb": [
    {
     "src": "sfx/d5/grillos.mp3",
     "vol": 0.45
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
    "ELI": "img/d5/p5_1_eli.webp",
    "RUBY": "img/d5/p5_1_ruby.webp",
    "TEDDY": "img/d5/p5_1_teddy.webp",
    "ODELL": "img/d5/p5_1_odell.webp"
   },
   "personajes": [
    "ELI"
   ],
   "pal": "farol",
   "amb": [
    {
     "src": "sfx/d5/grillos.mp3",
     "vol": 0.3
    }
   ],
   "lineas": [
    {
     "id": "d5_003",
     "quien": "ELI",
     "texto": "Bienvenidos al porche. Esta es la banda.",
     "voz": "voz/d5/d5_003.mp3"
    },
    {
     "id": "d5_004",
     "quien": "ELI",
     "texto": "Ruby, a la tabla. Mr. Odell, al contrabajo. Teddy, a la trompeta. Y yo, a la guitarra.",
     "voz": "voz/d5/d5_004.mp3"
    },
    {
     "id": "d5_009",
     "quien": "ELI",
     "texto": "Ese hueco es vuestro.",
     "voz": "voz/d5/d5_009.mp3"
    },
    {
     "id": "d5_006",
     "quien": "ELI",
     "texto": "«¡Tema!»: todos el tema. «¡Solo!»: os toca a vosotros.",
     "voz": "voz/d5/d5_006.mp3"
    },
    {
     "id": "d5_007",
     "quien": "ELI",
     "texto": "¿Tu instrumento va en si bemol o en mi bemol? Elígelo abajo.",
     "voz": "voz/d5/d5_007.mp3"
    },
    {
     "id": "d5_008",
     "quien": "ELI",
     "texto": "La banda cambia de tono; la partitura sigue en Sol. Y ahora… a practicar.",
     "voz": "voz/d5/d5_008.mp3"
    }
   ],
   "inter": {
    "tipo": "practica",
    "pestana": "paso1",
    "desc": "Sala de práctica: Paso 1 · El tema, Paso 2 · Notas largas, Paso 3 · Finales y Concierto (TEMA/SOLO). Selector Do / Si♭ / Mi♭. Orden de salida por instrumentos.",
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
    }
   },
   "nombre": "A túa vez",
   "hechos": [],
   "guion_sonido": {
    "amb": "Grillos; farolillos que zumban.",
    "mus": "La banda de cuatro (guitarra, tabla de lavar, contrabajo y trompeta con sordina; sin acordeón)."
   },
   "foco": {
    "ELI": [
     0.27,
     0.29
    ],
    "RUBY": [
     0.4,
     0.21
    ],
    "TEDDY": [
     0.66,
     0.17
    ],
    "ODELL": [
     0.82,
     0.17
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
