/* BLUES · vida en las láminas (19-oct, puntos 2 y 27 de Iago). NADA de mover la cámara: la vida la ponen efectos sobre
   la imagen quieta, como en Atonalidad (vida.js), La cabaña y el Magnetófono: fuego que se aviva, lámparas que respiran y
   titilan, polvo y brasas en el aire, humo y vapor, pájaros al fondo, destellos en el agua, el faro… y, en el tren, el
   traqueteo y las sombras de los postes. Cada plano trae su lista en data/vida.js (B.VIDA['P1.5'] = [{ t: 'fuego', … }]),
   con posiciones en fracciones de la lámina (x, y de 0 a 1; r, w en fracción del ancho).
   Dos lienzos a media resolución dentro del plano: «luz» (mezcla screen: fuego, halos, brasas, polvo, destellos) y «mate»
   (normal: humo, vapor, pájaros, sombras). Se paran con la pausa y al cambiar de plano; con «reducir movimiento», solo luz quieta. */
'use strict';
(function (B) {
  const V = B.vida = {};
  const RED = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
  const K = .5, az = (a, b) => a + Math.random() * (b - a), TAU = Math.PI * 2;
  const sprite = (stops) => { const c = document.createElement('canvas'); c.width = c.height = 128; const x = c.getContext('2d');
    const g = x.createRadialGradient(64, 64, 0, 64, 64, 64); stops.forEach(([o, col]) => g.addColorStop(o, col)); x.fillStyle = g; x.fillRect(0, 0, 128, 128); return c; };
  const S = {
    halo: sprite([[0, 'rgba(255,205,135,1)'], [.3, 'rgba(255,175,95,.45)'], [1, 'rgba(255,150,70,0)']]),
    fuego: sprite([[0, 'rgba(255,170,70,1)'], [.35, 'rgba(255,110,30,.5)'], [1, 'rgba(200,60,10,0)']]),
    blanco: sprite([[0, 'rgba(255,250,230,1)'], [.25, 'rgba(255,240,205,.5)'], [1, 'rgba(255,230,190,0)']]),
    frio: sprite([[0, 'rgba(220,235,255,1)'], [.3, 'rgba(180,205,240,.45)'], [1, 'rgba(150,180,230,0)']]),
    humo: sprite([[0, 'rgba(200,196,188,.9)'], [.55, 'rgba(180,176,168,.35)'], [1, 'rgba(160,156,150,0)']]),
    humoOsc: sprite([[0, 'rgba(58,52,48,.9)'], [.55, 'rgba(50,45,42,.35)'], [1, 'rgba(40,36,34,0)']]),
    vapor: sprite([[0, 'rgba(240,240,236,.9)'], [.5, 'rgba(230,230,226,.32)'], [1, 'rgba(220,220,216,0)']])
  };
  const vivos = new Set();
  let corre = false, ult = 0;

  /* ── los efectos: cada uno es { paso(dt, t, W, H), pinta(luz, mate, W, H) } ── */
  const FX = {
    luz(o) {   // lámpara/farol/ventana: halo cálido que respira y, de vez en cuando, titila un instante
      const f1 = az(.22, .6), f2 = az(.9, 1.8), p1 = az(0, TAU), p2 = az(0, TAU), tint = o.tint || 1;
      let prox = az(1.5, 11) / tint, ev = 0, nivel = 1;
      return {
        paso(dt, t) { prox -= dt; if (prox <= 0) { ev = az(.08, .32); prox = az(2, 12) / tint; } if (ev > 0) { ev -= dt; nivel = az(.35, .75); } else nivel = 1; this.v = (o.k || 1) * (.84 + .1 * Math.sin(t * f1 + p1) + .05 * Math.sin(t * f2 + p2)) * nivel; },
        pinta(L, M, W, H) { const R = (o.r || .04) * W * 2.6; L.globalAlpha = Math.min(1, .46 * this.v); L.drawImage(o.frio ? S.frio : S.halo, (o.x * W - R) * K, (o.y * H - R) * K, 2 * R * K, 2 * R * K); }
      };
    },
    fuego(o) {   // fuego que se aviva: parpadeo cálido rápido + brasas que suben
      const ph = [az(0, TAU), az(0, TAU), az(0, TAU)], chis = [];
      return {
        paso(dt, t, W, H) {
          this.v = (o.k || 1) * (.72 + .12 * Math.sin(t * 7.3 + ph[0]) + .09 * Math.sin(t * 12.1 + ph[1]) + .07 * Math.sin(t * 3.1 + ph[2]) + az(-.05, .05));
          const n = o.chispas || 0;
          if (n && chis.length < n && Math.random() < dt * n * .6) chis.push({ x: o.x + az(-.4, .4) * (o.r || .1), y: o.y + az(-.1, .2) * (o.r || .1), vx: az(-.012, .012), vy: az(-.06, -.025), vida: az(1.2, 3), t: 0, s: az(1, 2.4) });
          for (let i = chis.length - 1; i >= 0; i--) { const c = chis[i]; c.t += dt; c.x += (c.vx + .006 * Math.sin(t * 2 + i)) * dt; c.y += c.vy * dt * (W / H); if (c.t > c.vida) chis.splice(i, 1); }
        },
        pinta(L, M, W, H) {
          const R = (o.r || .1) * W * (1.25 + .08 * this.v);
          L.globalAlpha = Math.min(1, .48 * this.v); L.drawImage(S.fuego, (o.x * W - R) * K, (o.y * H - R) * K, 2 * R * K, 2 * R * K);
          chis.forEach(c => { const a = Math.sin(Math.PI * c.t / c.vida); L.globalAlpha = .9 * a; L.fillStyle = a > .6 ? '#FFD27A' : '#FF8A3A'; L.fillRect(c.x * W * K, c.y * H * K, c.s * K * 1.6, c.s * K * 1.6); });
        }
      };
    },
    faro(o) {   // el faro de la Torre: un destello que barre cada «periodo» segundos
      return {
        paso(dt, t) { const f = ((t % (o.periodo || 6)) / (o.periodo || 6)); this.v = .12 + .7 * Math.pow(Math.max(0, Math.cos(TAU * (f - .5) / 2.2 * 2)), 10); },
        pinta(L, M, W, H) { const R = (o.r || .05) * W * (1.4 + this.v * 1.8); L.globalAlpha = Math.min(1, this.v); L.drawImage(S.blanco, (o.x * W - R) * K, (o.y * H - R) * K, 2 * R * K, 2 * R * K); }
      };
    },
    polvo(o) {   // motas que flotan donde da la luz (o brasas diminutas en la sala de calderas)
      const z = o.zona || [0, 0, 1, 1], ms = [], n = o.n || 30, brasa = o.tono === 'brasa';
      const nueva = () => ({ x: az(z[0], z[2]), y: az(z[1], z[3]), vx: az(-.004, .004), vy: brasa ? az(-.012, -.003) : az(-.002, .005), s: az(.6, 1.9), f: az(.5, 2), p: az(0, TAU) });
      for (let i = 0; i < n; i++) ms.push(nueva());
      return {
        paso(dt, t) { ms.forEach((m, i) => { m.x += (m.vx + .0025 * Math.sin(t * .7 + m.p)) * dt; m.y += m.vy * dt; if (m.x < z[0] || m.x > z[2] || m.y < z[1] || m.y > z[3]) ms[i] = nueva(); }); this.t = t; },
        pinta(L, M, W, H) { L.fillStyle = brasa ? '#FFB066' : '#FFF1D2'; ms.forEach(m => { L.globalAlpha = (brasa ? .55 : .38) * (.55 + .45 * Math.sin(this.t * m.f + m.p)); L.fillRect(m.x * W * K, m.y * H * K, m.s * K * 1.5, m.s * K * 1.5); }); }
      };
    },
    brillos(o) {   // destellos del sol o de la luna en el agua
      const z = o.zona || [0, .6, 1, 1], bs = [], n = o.n || 14;
      return {
        paso(dt) { if (bs.length < n && Math.random() < dt * n * 1.4) bs.push({ x: az(z[0], z[2]), y: az(z[1], z[3]), t: 0, vida: az(.35, 1.1), s: az(.006, .016) }); for (let i = bs.length - 1; i >= 0; i--) { bs[i].t += dt; if (bs[i].t > bs[i].vida) bs.splice(i, 1); } },
        pinta(L, M, W, H) { bs.forEach(b => { const a = Math.sin(Math.PI * b.t / b.vida), R = b.s * W; L.globalAlpha = .6 * a; L.drawImage(o.tono === 'frio' ? S.frio : S.blanco, (b.x * W - R) * K, (b.y * H - R) * K, 2 * R * K, 2 * R * K); }); }
      };
    },
    bruma(o) {   // (Iago, 20-oct) neblina/humo de ambiente: velos grandes, casi transparentes y CONSTANTES que derivan muy despacio
      const z = o.zona || [0, 0, 1, 1], n = o.n || 7, ps = [];
      for (let i = 0; i < n; i++) ps.push({ x: az(z[0], z[2]), y: az(z[1], z[3]), r: az(.16, .32), v: az(.004, .01) * (Math.random() < .5 ? -1 : 1), f: az(0, 6.28), t: az(0, 30) });
      return {
        paso(dt) { ps.forEach(p => { p.t += dt; p.x += p.v * dt; if (p.x < z[0] - .25) p.x = z[2] + .2; if (p.x > z[2] + .25) p.x = z[0] - .2; }); },
        pinta(L, M, W, H) {
          const sp = o.color === 'oscuro' ? S.humoOsc : S.humo;
          ps.forEach(p => { const R = p.r * W * (1 + .08 * Math.sin(p.t * .2 + p.f)); M.globalAlpha = (o.alfa || .06) * (.7 + .3 * Math.sin(p.t * .15 + p.f)); M.drawImage(sp, (p.x * W - R) * K, (p.y * H + Math.sin(p.t * .1 + p.f) * .012 * H - R * .55) * K, 2 * R * K, 1.1 * R * K); });
        }
      };
    },
    humo(o) {   // humo que sube y se deshace (chimeneas, cigarros, la caldera) · (Iago, 20-oct) más sutil y continuo: muchas volutas tenues, no bolas
      const ps = [], dir = o.dir || [.15, -1], w = o.w || .05, ritmo = 6.5 * (o.dens || 1);
      const L0 = Math.hypot(dir[0], dir[1]) || 1, dx = dir[0] / L0, dy = dir[1] / L0, vel = (o.vel || .025) * .7;
      for (let i = 0; i < 40; i++) ps.push({ x: o.x + az(-.5, .5) * w, y: o.y, t: az(0, 9), vida: az(7, 11), g: az(.8, 1.3) });
      return {
        paso(dt) {
          if (Math.random() < dt * ritmo) ps.push({ x: o.x + az(-.5, .5) * w, y: o.y, t: 0, vida: az(7, 11), g: az(.8, 1.3) });
          for (let i = ps.length - 1; i >= 0; i--) { const p = ps[i]; p.t += dt; const k = p.t / p.vida; p.x += (dx * vel * (1 - k * .4) + .01 * k) * dt; p.y += dy * vel * 1.6 * (1 - k * .5) * dt; if (p.t > p.vida) ps.splice(i, 1); }
        },
        pinta(L, M, W, H) {
          const sp = o.color === 'oscuro' ? S.humoOsc : S.humo;
          ps.forEach(p => { const k = p.t / p.vida, R = w * W * (.9 + 3.6 * k) * p.g; M.globalAlpha = (o.alfa || .3) * .32 * Math.sin(Math.PI * Math.min(1, k * 1.2)) * (1 - k * .3); M.drawImage(sp, (p.x * W - R) * K, (p.y * H - R) * K, 2 * R * K, 2 * R * K); });
        }
      };
    },
    vapor(o) {   // escapes de vapor a presión: ráfagas cada pocos segundos
      const ps = [], dir = o.dir || [.1, -1], L0 = Math.hypot(dir[0], dir[1]) || 1, dx = dir[0] / L0, dy = dir[1] / L0;
      let prox = az(1, o.cada || 6), chorro = 0;
      return {
        paso(dt) {
          prox -= dt; if (prox <= 0) { chorro = az(.6, 1.2); prox = az(.7, 1.3) * (o.cada || 6); if (B.sfx && o.sonido) B.sfx(o.sonido, { vol: .35 }); }
          if (chorro > 0) { chorro -= dt; for (let i = 0; i < 3; i++) ps.push({ x: o.x + az(-.006, .006), y: o.y, t: 0, vida: az(1.2, 2.4), v: az(.09, .16), g: az(.8, 1.3) }); }
          for (let i = ps.length - 1; i >= 0; i--) { const p = ps[i]; p.t += dt; const fr = 1 - p.t / p.vida * .7; p.x += (dx * p.v * fr + .01) * dt; p.y += dy * p.v * 1.7 * fr * dt; if (p.t > p.vida) ps.splice(i, 1); }
        },
        pinta(L, M, W, H) { ps.forEach(p => { const k = p.t / p.vida, R = W * (.008 + .07 * k) * p.g; M.globalAlpha = .34 * (1 - k); M.drawImage(S.vapor, (p.x * W - R) * K, (p.y * H - R) * K, 2 * R * K, 2 * R * K); }); }
      };
    },
    pajaros(o) {   // gaviotas lejanas: planean y, a ratos, aletean
      const z = o.zona || [0, 0, 1, .3], ps = [], n = o.n || 3, tam = o.tam || .011;
      const nuevo = (dentro) => { const izq = Math.random() < .5; return { x: dentro ? az(z[0], z[2]) : (izq ? z[0] - .03 : z[2] + .03), y: az(z[1], z[3]), vx: (izq ? 1 : -1) * az(.008, .02), fase: az(0, TAU), ale: 0, prox: az(1, 5), s: tam * az(.7, 1.25), espera: dentro ? 0 : az(2, 9) }; };
      for (let i = 0; i < n; i++) ps.push(nuevo(true));
      return {
        paso(dt, t) { ps.forEach((p, i) => { if (p.espera > 0) { p.espera -= dt; return; } p.x += p.vx * dt; p.y += .004 * Math.sin(t * .6 + p.fase) * dt; p.prox -= dt; if (p.prox <= 0) { p.ale = az(.8, 1.6); p.prox = az(3, 8); } if (p.ale > 0) p.ale -= dt; if (p.x < z[0] - .05 || p.x > z[2] + .05) ps[i] = nuevo(false); }); this.t = t; },
        pinta(L, M, W, H) {
          M.strokeStyle = o.color || 'rgba(28,26,30,.8)'; M.lineCap = 'round';
          ps.forEach(p => { if (p.espera > 0) return; const s = p.s * W * K, x = p.x * W * K, y = p.y * H * K, a = p.ale > 0 ? Math.sin(this.t * 11 + p.fase) * .55 : .18;
            M.globalAlpha = 1; M.lineWidth = Math.max(1, s * .16); M.beginPath(); M.moveTo(x - s, y - s * a); M.quadraticCurveTo(x - s * .4, y - s * .35, x, y); M.quadraticCurveTo(x + s * .4, y - s * .35, x + s, y - s * a); M.stroke(); });
        }
      };
    },
    tren(o, el) {   // el tren en marcha sin mover la cámara: traqueteo (vibración sutil al ritmo de las vías) y sombras de postes
      el.classList.add('vida-tren');
      let prox = az(.4, 1.2), sombras = [];
      return {
        paso(dt) { prox -= dt; if (prox <= 0) { sombras.push({ x: 1.15, v: az(2.6, 3.4), a: az(.1, .2), w: az(.03, .06) }); prox = az(.55, 1.6); } sombras.forEach(s => s.x -= s.v * dt); sombras = sombras.filter(s => s.x > -.2); },
        pinta(L, M, W, H) { sombras.forEach(s => { const g = M.createLinearGradient((s.x - s.w) * W * K, 0, (s.x + s.w) * W * K, 0); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(.5, 'rgba(0,0,0,' + s.a + ')'); g.addColorStop(1, 'rgba(0,0,0,0)'); M.globalAlpha = 1; M.fillStyle = g; M.fillRect((s.x - s.w) * W * K, 0, 2 * s.w * W * K, H * K); }); }
      };
    },
    hojas(o) {   // hojas de otoño que caen girando (el porche de Weeksville)
      const z = o.zona || [0, 0, 1, 1], n = o.n || 8, hs = [], COL = ['#B5652A', '#C98A3A', '#8E4A1E', '#D9A04A'];
      const nueva = dentro => ({ x: az(z[0], z[2]), y: dentro ? az(z[1], z[3]) : z[1] - .03, vy: az(.025, .06), fase: az(0, TAU), giro: az(1.5, 4), s: az(.008, .014), col: COL[Math.random() * 4 | 0] });
      for (let i = 0; i < n; i++) hs.push(nueva(true));
      return {
        paso(dt, t) { hs.forEach((h, i) => { h.y += h.vy * dt; h.x += .022 * Math.sin(t * 1.3 + h.fase) * dt; if (h.y > z[3] + .03) hs[i] = nueva(false); }); this.t = t; },
        pinta(L, M, W, H) { hs.forEach(h => { const s = h.s * W * K, a = Math.sin(this.t * h.giro + h.fase); M.save(); M.translate(h.x * W * K, h.y * H * K); M.rotate(a * 1.2); M.scale(1, .35 + .65 * Math.abs(a)); M.globalAlpha = .92; M.fillStyle = h.col; M.beginPath(); M.ellipse(0, 0, s, s * .55, 0, 0, TAU); M.fill(); M.restore(); }); }
      };
    },
    farol(o) {   // farol que se balancea (tren, barco): la luz va y viene
      const per = o.periodo || 2.2, ph = az(0, TAU);
      return {
        paso(dt, t) { this.dx = (o.amp || .012) * Math.sin(TAU * t / per + ph); this.v = (o.k || 1) * (.86 + .08 * Math.sin(t * 5.1 + ph)); },
        pinta(L, M, W, H) { const R = (o.r || .05) * W * 2.6; L.globalAlpha = Math.min(1, .6 * this.v); L.drawImage(S.halo, ((o.x + this.dx) * W - R) * K, (o.y * H - R) * K, 2 * R * K, 2 * R * K); }
      };
    },
    lluvia(o) {   // (20-oct) lluvia fina en diagonal (la vuelta a Coruña)
      const z = o.zona || [0, 0, 1, 1], n = o.n || 70, gs = [];
      const nueva = arriba => ({ x: az(z[0] - .05, z[2]), y: arriba ? z[1] - az(0, .1) : az(z[1], z[3]), v: az(.6, .95), l: az(.018, .04) });
      for (let i = 0; i < n; i++) gs.push(nueva(false));
      return {
        paso(dt) { gs.forEach((g, i) => { g.y += g.v * dt; g.x += g.v * .16 * dt; if (g.y > z[3]) gs[i] = nueva(true); }); },
        pinta(L, M, W, H) { M.save(); M.strokeStyle = '#D9E4F2'; M.lineWidth = Math.max(1, K * .9); M.globalAlpha = o.alfa || .2; M.beginPath(); gs.forEach(g => { M.moveTo(g.x * W * K, g.y * H * K); M.lineTo((g.x - g.l * .16) * W * K, (g.y - g.l * 1.7) * H * K); }); M.stroke(); M.restore(); }
      };
    }
  };

  /* ── montar en un plano ── */
  V.pon = function (el, cfg) {
    if (!el || !cfg || !cfg.length) return;
    const luz = document.createElement('canvas'), mate = document.createElement('canvas');
    luz.className = 'vida vida-luz'; mate.className = 'vida vida-mate';
    el.appendChild(mate); el.appendChild(luz);
    const v = { el, luz, mate, L: luz.getContext('2d'), M: mate.getContext('2d'), fx: [], W: 0, H: 0, t: az(0, 50) };
    cfg.forEach(o => { const f = FX[o.t]; if (f) { const e = f(o, el); e.H = 0; v.fx.push(e); } });
    if (!v.fx.length) return;
    vivos.add(v);
    if (!corre) { corre = true; ult = performance.now(); requestAnimationFrame(bucle); }
  };
  function mide(v) {
    const w = v.el.clientWidth || 1280, h = v.el.clientHeight || 720;
    if (w !== v.W || h !== v.H) { v.W = w; v.H = h; [v.luz, v.mate].forEach(c => { c.width = Math.max(2, Math.round(w * K)); c.height = Math.max(2, Math.round(h * K)); }); v.fx.forEach(e => e.H = h); }
  }
  /* (ronda 6, rendimiento en el aula) los efectos se pintan a ~30 fotogramas por segundo, no a 60: se ven igual y el ordenador
     respira (las láminas, la voz y las interacciones van primero) */
  function bucle(ahora) {
    if (ahora - ult < 30) { if (vivos.size) requestAnimationFrame(bucle); else corre = false; return; }
    const dt = Math.min(.1, (ahora - ult) / 1000); ult = ahora;
    vivos.forEach(v => {
      if (!v.el.isConnected) { vivos.delete(v); return; }
      if (B.pausado) return;
      mide(v);
      const d = RED ? 0 : dt; v.t += d;
      v.L.clearRect(0, 0, v.luz.width, v.luz.height); v.M.clearRect(0, 0, v.mate.width, v.mate.height);
      v.fx.forEach(e => { try { e.paso(d, v.t, v.W, v.H); e.pinta(v.L, v.M, v.W, v.H); } catch (er) { } });
      v.L.globalAlpha = 1; v.M.globalAlpha = 1;
    });
    if (vivos.size) requestAnimationFrame(bucle); else corre = false;
  }
})(window.BLUES);
