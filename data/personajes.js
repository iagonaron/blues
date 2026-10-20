/* BLUES · personajes: nombre en los subtítulos y su color (ver biblia §2) */
BLUES.PERSONAJES = {
  XAN:    { nombre: 'Xan',             corto: 'Xan',    color: '#86B7E8' },
  AVOA:   { nombre: 'Avoa Maruxa',     corto: 'Avoa',   color: '#E8A985' },
  JOHN:   { nombre: 'John Laurens',    corto: 'John',   color: '#D2B07A' },
  SOBRE:  { nombre: 'Mr. Hodges',      corto: 'Hodges', color: '#A9BCD0' },
  AMOS:   { nombre: 'Amos',            corto: 'Amos',   color: '#F09A4E' },
  GEORGE: { nombre: 'George',          corto: 'George', color: '#EDE3CF' },
  TEDDY:  { nombre: 'Teddy',           corto: 'Teddy',  color: '#EBC85E' },
  RUBY:   { nombre: 'Ruby',            corto: 'Ruby',   color: '#F27C78' },
  BUSTER: { nombre: 'Buster',          corto: 'Buster', color: '#9BCB8E' },
  SLIM:   { nombre: 'Slim',            corto: 'Slim',   color: '#D9D27E' },
  PEARL:  { nombre: 'Miss Pearl Duval', corto: 'Pearl', color: '#D8CFF2' },
  ELI:    { nombre: 'Eli',             corto: 'Eli',    color: '#6DCDB9' },
  ODELL:  { nombre: 'Mr. Odell',       corto: 'Odell',  color: '#BBA8DC' },
  FOGONEROS: { nombre: 'Los fogoneros', corto: 'Fogoneros', color: '#C9B8A6' },
  REVISOR: { nombre: 'El revisor',      corto: 'Revisor', color: '#A9BCD0' },
  NARR:   { nombre: '',                corto: '',       color: '#E9CD8A' }
};
BLUES.personaje = function (q) { return BLUES.PERSONAJES[q] || { nombre: q || '', corto: q || '', color: '#E9CD8A' }; };
