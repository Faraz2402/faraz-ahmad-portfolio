/* ==========================================================================
   FARAZ AHMAD — interaction layer
   GSAP + ScrollTrigger + Lenis (CDN). Vanilla JS only.
   ========================================================================== */
(() => {
  'use strict';

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const root = document.documentElement;

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(pointer: fine)').matches;
  const hasGSAP = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
  const isDesktop = () => window.innerWidth > 768;

  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const smooth = (t) => t * t * (3 - 2 * t);
  const mulberry = (seed) => () => {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let r = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };

  const C = {
    blue: [76, 141, 255], cyan: [111, 227, 255], amber: [255, 180, 92], ivory: [242, 238, 230], mist: [154, 166, 195],
  };
  const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
  const mix = (c1, c2, t) => [lerp(c1[0], c2[0], t), lerp(c1[1], c2[1], t), lerp(c1[2], c2[2], t)];

  const mouse = { x: -9999, y: -9999 };
  window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });

  /* ------------------------------------------------------------------------
     Canvas scenes (hero network + video stand-ins for the three pillars)
     ------------------------------------------------------------------------ */
  const scenes = [];

  class Scene {
    constructor(canvas, painter) {
      this.c = canvas;
      this.ctx = canvas.getContext('2d');
      this.painter = painter;
      this.p = 0; this.target = 0; this.t = 0;
      this.auto = false; this.visible = false;
      this.resize();
      new IntersectionObserver(([e]) => { this.visible = e.isIntersecting; }, { rootMargin: '120px' }).observe(canvas);
      scenes.push(this);
    }
    resize() {
      const r = this.c.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      this.w = r.width; this.h = r.height;
      this.c.width = Math.round(r.width * dpr); this.c.height = Math.round(r.height * dpr);
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      this.painter.resize && this.painter.resize(this.w, this.h);
    }
    tick(dt) {
      if (!this.visible || document.hidden || !this.w) return;
      this.t += dt;
      if (this.auto) this.target = Math.min(1, (this.t * 0.09) % 1.35);
      this.p += (this.target - this.p) * Math.min(1, dt * 6);
      const { ctx, w, h } = this;
      ctx.clearRect(0, 0, w, h);
      this.painter.draw(ctx, w, h, this.p, this.t, this);
    }
  }

  // Shared layout: scene lives on the right on desktop, top area on mobile
  const sceneArea = (w, h) => w > 1100
    ? { x: w * 0.42, y: h * 0.36, w: w * 0.5, h: h * 0.42 }
    : { x: w * 0.07, y: h * 0.2, w: w * 0.86, h: h * 0.3 };

  function dust(ctx, w, h, t, rnd, list) {
    if (!list.length) for (let i = 0; i < 60; i++) list.push({ x: rnd(), y: rnd(), s: rnd() * 1.2 + 0.3, v: rnd() * 0.02 + 0.005 });
    for (const d of list) {
      const y = ((d.y - t * d.v) % 1 + 1) % 1;
      ctx.fillStyle = rgba(C.ivory, 0.12 * d.s);
      ctx.fillRect(d.x * w, y * h, d.s, d.s);
    }
  }

  /* Hero — drifting supplier network that leans away from the cursor */
  function heroPainter() {
    const rnd = mulberry(24);
    let nodes = [];
    return {
      resize(w, h) {
        const n = Math.min(110, Math.round((w * h) / 15000));
        nodes = Array.from({ length: n }, () => ({
          x: rnd() * w, y: rnd() * h, vx: (rnd() - 0.5) * 0.25, vy: (rnd() - 0.5) * 0.25,
          r: rnd() * 1.6 + 0.8, amber: rnd() < 0.06, ox: 0, oy: 0,
        }));
      },
      draw(ctx, w, h, p, t, scene) {
        const rect = scene.c.getBoundingClientRect();
        const mx = mouse.x - rect.left, my = mouse.y - rect.top;
        const R = 140;
        for (const n of nodes) {
          n.x += n.vx; n.y += n.vy;
          if (n.x < -20) n.x = w + 20; if (n.x > w + 20) n.x = -20;
          if (n.y < -20) n.y = h + 20; if (n.y > h + 20) n.y = -20;
          const dx = n.x - mx, dy = n.y - my, d = Math.hypot(dx, dy);
          const push = d < 180 ? (1 - d / 180) * 26 : 0;
          n.ox = lerp(n.ox, d ? (dx / d) * push : 0, 0.08);
          n.oy = lerp(n.oy, d ? (dy / d) * push : 0, 0.08);
        }
        ctx.lineWidth = 1;
        for (let i = 0; i < nodes.length; i++) {
          const a = nodes[i];
          for (let j = i + 1; j < nodes.length; j++) {
            const b = nodes[j];
            const d = Math.hypot(a.x + a.ox - b.x - b.ox, a.y + a.oy - b.y - b.oy);
            if (d < R) {
              ctx.strokeStyle = rgba(C.blue, (1 - d / R) * 0.35);
              ctx.beginPath(); ctx.moveTo(a.x + a.ox, a.y + a.oy); ctx.lineTo(b.x + b.ox, b.y + b.oy); ctx.stroke();
            }
          }
        }
        for (const n of nodes) {
          const x = n.x + n.ox, y = n.y + n.oy;
          if (n.amber) {
            const pulse = 0.5 + 0.5 * Math.sin(t * 2 + n.x);
            ctx.fillStyle = rgba(C.amber, 0.15 * pulse);
            ctx.beginPath(); ctx.arc(x, y, 10 + pulse * 6, 0, Math.PI * 2); ctx.fill();
          }
          ctx.fillStyle = n.amber ? rgba(C.amber, 0.95) : rgba(C.cyan, 0.75);
          ctx.beginPath(); ctx.arc(x, y, n.r, 0, Math.PI * 2); ctx.fill();
        }
      },
    };
  }

  /* Scene 1 — scattered spend points organise into a clear chart */
  function analyticsPainter() {
    const rnd = mulberry(7);
    const heights = [0.34, 0.5, 0.42, 0.96, 0.62, 0.47, 0.3, 0.56, 0.38, 0.26, 0.2];
    const HOT = 3;
    const pts = Array.from({ length: 320 }, (_, i) => ({
      sx: rnd(), sy: rnd(), b: i % heights.length, k: rnd(), tx: rnd(), ph: rnd() * 6.28, sp: 0.3 + rnd() * 0.7,
    }));
    const motes = [];
    return {
      draw(ctx, w, h, p, t) {
        const A = sceneArea(w, h);
        const n = heights.length, gap = A.w * 0.018, bw = (A.w - gap * (n - 1)) / n;
        const base = A.y + A.h;
        const e = smooth(clamp((p - 0.06) / 0.55));
        const frame = smooth(clamp((p - 0.5) / 0.2));
        const trend = clamp((p - 0.62) / 0.28);

        dust(ctx, w, h, t, rnd, motes);

        // grid
        ctx.lineWidth = 1;
        for (let i = 0; i <= 4; i++) {
          const y = base - (A.h * i) / 4;
          ctx.strokeStyle = rgba(C.blue, 0.05 + 0.07 * frame);
          ctx.beginPath(); ctx.moveTo(A.x, y); ctx.lineTo(A.x + A.w, y); ctx.stroke();
        }

        // bars
        if (frame > 0) {
          heights.forEach((hv, i) => {
            const x = A.x + i * (bw + gap), bh = hv * A.h * frame;
            const col = i === HOT ? C.amber : C.blue;
            const g = ctx.createLinearGradient(0, base - bh, 0, base);
            g.addColorStop(0, rgba(col, 0.28 * frame)); g.addColorStop(1, rgba(col, 0.02));
            ctx.fillStyle = g; ctx.fillRect(x, base - bh, bw, bh);
            ctx.fillStyle = rgba(col, 0.9 * frame); ctx.fillRect(x, base - bh, bw, 2);
          });
        }

        // points
        for (const pt of pts) {
          const bx = A.x + pt.b * (bw + gap) + pt.tx * bw;
          const by = base - pt.k * heights[pt.b] * A.h;
          const sx = pt.sx * w + Math.sin(t * pt.sp + pt.ph) * 24;
          const sy = pt.sy * h + Math.cos(t * pt.sp * 0.8 + pt.ph) * 18;
          const x = lerp(sx, bx, e), y = lerp(sy, by, e);
          const hot = pt.b === HOT;
          ctx.fillStyle = hot ? rgba(mix(C.cyan, C.amber, e), 0.9) : rgba(C.cyan, 0.35 + 0.45 * e);
          const s = hot ? 2.2 : 1.6;
          ctx.fillRect(x - s / 2, y - s / 2, s, s);
        }

        // trend line over bar tops
        if (trend > 0) {
          ctx.strokeStyle = rgba(C.ivory, 0.85); ctx.lineWidth = 1.5;
          ctx.beginPath();
          const last = trend * (n - 1);
          for (let i = 0; i <= Math.ceil(last); i++) {
            const f = Math.min(i, last);
            const i0 = Math.floor(f), i1 = Math.min(n - 1, i0 + 1), fr = f - i0;
            const x = A.x + lerp(i0, i1, fr) * (bw + gap) + bw / 2;
            const y = base - lerp(heights[i0], heights[i1], fr) * A.h * 0.82 - 14;
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          }
          ctx.stroke();
        }

        // concentration callout
        const call = smooth(clamp((p - 0.75) / 0.2));
        if (call > 0) {
          const cx = A.x + HOT * (bw + gap) + bw / 2, cy = base - heights[HOT] * A.h - 30;
          const pulse = 0.5 + 0.5 * Math.sin(t * 3);
          ctx.strokeStyle = rgba(C.amber, call * (0.5 + 0.4 * pulse)); ctx.lineWidth = 1;
          ctx.beginPath(); ctx.arc(cx, cy, 10 + pulse * 4, 0, Math.PI * 2); ctx.stroke();
          ctx.fillStyle = rgba(C.amber, call);
          ctx.font = '500 11px "JetBrains Mono", monospace';
          ctx.fillText('CONCENTRATION', cx + 20, cy + 4);
        }
      },
    };
  }

  /* Scene 2 — disconnected P2P steps snap into one flowing pipeline */
  function p2pPainter() {
    const rnd = mulberry(42);
    const labels = ['REQUEST', 'APPROVAL', 'PO', 'RECEIPT', 'INVOICE'];
    const cards = labels.map((l) => ({ l, sx: 0.1 + rnd() * 0.8, sy: 0.1 + rnd() * 0.8, rot: (rnd() - 0.5) * 0.8 }));
    const hubs = ['PROCUREMENT', 'FINANCE', 'SUPPLIERS'];
    const motes = [];
    const roundRect = (ctx, x, y, w, h, r) => {
      ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
    };
    return {
      draw(ctx, w, h, p, t) {
        const A = sceneArea(w, h);
        const n = cards.length, gap = A.w * 0.05;
        const cw = Math.min(150, (A.w - gap * (n - 1)) / n), ch = cw * 0.66;
        const rowW = cw * n + gap * (n - 1), x0 = A.x + (A.w - rowW) / 2, y0 = A.y + A.h * 0.18;
        const e = smooth(clamp((p - 0.04) / 0.5));
        const link = clamp((p - 0.42) / 0.3);
        const hubIn = smooth(clamp((p - 0.66) / 0.2));
        const flow = smooth(clamp((p - 0.78) / 0.15));

        dust(ctx, w, h, t, rnd, motes);

        const pos = cards.map((c, i) => {
          const tx = x0 + i * (cw + gap), ty = y0;
          const sx = A.x + c.sx * (A.w - cw) + Math.sin(t * 0.6 + i) * 10;
          const sy = (w > 1100 ? h * 0.15 : h * 0.12) + c.sy * (w > 1100 ? h * 0.6 : h * 0.4) + Math.cos(t * 0.5 + i) * 10;
          return { x: lerp(sx, tx, e), y: lerp(sy, ty, e), r: lerp(c.rot, 0, e) };
        });

        // links between steps
        ctx.lineWidth = 1.5;
        for (let i = 0; i < n - 1; i++) {
          const lp = clamp(link * (n - 1) - i);
          if (lp <= 0) continue;
          const a = pos[i], b = pos[i + 1];
          const ax = a.x + cw, ay = a.y + ch / 2, bx = b.x, by = b.y + ch / 2;
          ctx.strokeStyle = rgba(C.cyan, 0.8);
          ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(lerp(ax, bx, lp), lerp(ay, by, lp)); ctx.stroke();
        }

        // hubs underneath, wired to the pipeline
        if (hubIn > 0) {
          const hy = y0 + ch + A.h * 0.42;
          hubs.forEach((label, i) => {
            const hx = x0 + rowW * (0.17 + i * 0.33);
            const src = pos[[0, 2, 4][i]];
            ctx.strokeStyle = rgba(C.blue, 0.45 * hubIn); ctx.lineWidth = 1;
            ctx.setLineDash([3, 5]);
            ctx.beginPath(); ctx.moveTo(src.x + cw / 2, src.y + ch); ctx.lineTo(hx, lerp(src.y + ch, hy - 14, hubIn)); ctx.stroke();
            ctx.setLineDash([]);
            ctx.fillStyle = rgba(C.blue, 0.12 * hubIn); ctx.strokeStyle = rgba(C.cyan, 0.7 * hubIn);
            ctx.beginPath(); ctx.arc(hx, hy, 14, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
            ctx.fillStyle = rgba(C.mist, hubIn);
            ctx.font = '500 10px "JetBrains Mono", monospace'; ctx.textAlign = 'center';
            ctx.fillText(label, hx, hy + 32); ctx.textAlign = 'start';
          });
        }

        // cards
        pos.forEach((q, i) => {
          const connected = clamp(link * (n - 1) - i + 1) >= 1 || (i === n - 1 && link >= 1);
          ctx.save();
          ctx.translate(q.x + cw / 2, q.y + ch / 2); ctx.rotate(q.r); ctx.translate(-cw / 2, -ch / 2);
          roundRect(ctx, 0, 0, cw, ch, 10);
          ctx.fillStyle = 'rgba(17,26,51,0.9)'; ctx.fill();
          ctx.strokeStyle = connected ? rgba(C.cyan, 0.6) : rgba(C.mist, 0.25); ctx.lineWidth = 1; ctx.stroke();
          ctx.fillStyle = rgba(C.ivory, 0.9);
          ctx.font = `500 ${Math.max(8, Math.round(cw / 14))}px "JetBrains Mono", monospace`;
          ctx.fillText(cards[i].l, cw * 0.12, ch * 0.32);
          ctx.fillStyle = rgba(C.mist, 0.25);
          ctx.fillRect(cw * 0.12, ch * 0.52, cw * 0.62, 3);
          ctx.fillRect(cw * 0.12, ch * 0.68, cw * 0.42, 3);
          ctx.fillStyle = connected ? rgba(C.cyan, 1) : rgba(C.amber, 0.9);
          ctx.beginPath(); ctx.arc(cw * 0.86, ch * 0.28, 3.5, 0, Math.PI * 2); ctx.fill();
          ctx.restore();
        });

        // amber pulse travelling through the finished workflow
        if (flow > 0) {
          const f = (t * 0.22) % 1;
          const x = lerp(x0 - 20, x0 + rowW + 20, f), y = y0 + ch / 2;
          const g = ctx.createRadialGradient(x, y, 0, x, y, 26);
          g.addColorStop(0, rgba(C.amber, 0.9 * flow)); g.addColorStop(1, rgba(C.amber, 0));
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, 26, 0, Math.PI * 2); ctx.fill();
        }
      },
    };
  }

  /* Scene 3 — a contract timeline is scanned; risks resolve; suppliers connect */
  function governancePainter() {
    const rnd = mulberry(91);
    const N = 26;
    const contracts = Array.from({ length: N }, (_, i) => ({ f: i / (N - 1), tick: 6 + rnd() * 22, renew: rnd() < 0.25 }));
    const alerts = new Set([3, 8, 13, 17, 22]);
    const suppliers = Array.from({ length: 16 }, (_, i) => ({ a: rnd(), up: i % 2 === 0, d: 0.35 + rnd() * 0.6, link: Math.floor(rnd() * N) }));
    const motes = [];
    return {
      draw(ctx, w, h, p, t) {
        const A = sceneArea(w, h);
        const ty = A.y + A.h * 0.5;
        const scan = clamp((p - 0.06) / 0.62);
        const sx = A.x + A.w * scan;
        const net = smooth(clamp((p - 0.6) / 0.3));

        dust(ctx, w, h, t, rnd, motes);

        // supplier constellation
        suppliers.forEach((s) => {
          const x = A.x + s.a * A.w;
          const y = s.up ? ty - s.d * A.h * 0.5 : ty + s.d * A.h * 0.5;
          const c = contracts[s.link], cx = A.x + c.f * A.w;
          if (net > 0) {
            ctx.strokeStyle = rgba(C.blue, 0.35 * net); ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(cx, ty); ctx.lineTo(lerp(cx, x, net), lerp(ty, y, net)); ctx.stroke();
          }
          ctx.fillStyle = rgba(C.cyan, 0.2 + 0.6 * net);
          ctx.beginPath(); ctx.arc(x, y, 2.4, 0, Math.PI * 2); ctx.fill();
        });

        // timeline axis
        ctx.strokeStyle = rgba(C.mist, 0.3); ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(A.x, ty); ctx.lineTo(A.x + A.w, ty); ctx.stroke();
        ctx.strokeStyle = rgba(C.cyan, 0.9); ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(A.x, ty); ctx.lineTo(sx, ty); ctx.stroke();

        // contracts, renewals, alerts
        contracts.forEach((c, i) => {
          const x = A.x + c.f * A.w;
          const scanned = sx >= x;
          ctx.strokeStyle = rgba(C.blue, scanned ? 0.7 : 0.3); ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(x, ty - c.tick); ctx.lineTo(x, ty); ctx.stroke();
          if (c.renew) {
            ctx.fillStyle = rgba(C.ivory, scanned ? 0.7 : 0.3);
            ctx.save(); ctx.translate(x, ty + 12); ctx.rotate(Math.PI / 4); ctx.fillRect(-3, -3, 6, 6); ctx.restore();
          }
          if (alerts.has(i)) {
            const resolved = clamp((sx - x) / 40);
            const col = mix(C.amber, C.cyan, resolved);
            const pulse = 0.5 + 0.5 * Math.sin(t * 4 + i);
            if (resolved < 1) {
              ctx.fillStyle = rgba(C.amber, (1 - resolved) * 0.2 * pulse);
              ctx.beginPath(); ctx.arc(x, ty - c.tick, 14 + pulse * 6, 0, Math.PI * 2); ctx.fill();
            }
            ctx.fillStyle = rgba(col, 1);
            ctx.beginPath(); ctx.arc(x, ty - c.tick, 4.5, 0, Math.PI * 2); ctx.fill();
            if (resolved >= 1) {
              ctx.strokeStyle = rgba(C.cyan, 0.9); ctx.lineWidth = 1.5;
              ctx.beginPath(); ctx.moveTo(x - 3, ty - c.tick - 14); ctx.lineTo(x - 0.5, ty - c.tick - 11.5); ctx.lineTo(x + 4, ty - c.tick - 17); ctx.stroke();
            }
          } else {
            ctx.fillStyle = rgba(C.cyan, scanned ? 0.9 : 0.35);
            ctx.beginPath(); ctx.arc(x, ty - c.tick, 2.2, 0, Math.PI * 2); ctx.fill();
          }
        });

        // scanner beam
        if (scan > 0 && scan < 1) {
          const g = ctx.createLinearGradient(sx - 60, 0, sx, 0);
          g.addColorStop(0, rgba(C.cyan, 0)); g.addColorStop(1, rgba(C.cyan, 0.18));
          ctx.fillStyle = g; ctx.fillRect(sx - 60, A.y, 60, A.h);
          ctx.strokeStyle = rgba(C.cyan, 0.8); ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(sx, A.y); ctx.lineTo(sx, A.y + A.h); ctx.stroke();
        }

        ctx.font = '500 10px "JetBrains Mono", monospace';
        ctx.fillStyle = rgba(C.mist, 0.7);
        ctx.fillText('CONTRACT PORTFOLIO', A.x, A.y - 8);
        const open = [...alerts].filter((i) => sx < A.x + contracts[i].f * A.w + 40).length;
        ctx.fillStyle = open ? rgba(C.amber, 0.95) : rgba(C.cyan, 0.95);
        ctx.textAlign = 'end';
        ctx.fillText(open ? `${open} RISKS OPEN` : 'ALL RISKS GOVERNED', A.x + A.w, A.y - 8);
        ctx.textAlign = 'start';
      },
    };
  }

  const painters = { analytics: analyticsPainter, p2p: p2pPainter, governance: governancePainter };
  const heroCanvas = $('[data-hero-canvas]');
  const heroScene = heroCanvas ? new Scene(heroCanvas, heroPainter()) : null;
  const chapterScenes = $$('.chapter__canvas').map((cv) => new Scene(cv, painters[cv.dataset.scene]()));

  let last = performance.now();
  (function loop(now) {
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    scenes.forEach((s) => s.tick(dt));
    requestAnimationFrame(loop);
  })(last);

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => scenes.forEach((s) => s.resize()), 150);
  });

  /* ------------------------------------------------------------------------
     Videos — activate automatically once the generated clips exist
     ------------------------------------------------------------------------ */
  function loadVideo(v, preload = 'auto') {
    if (!v || v.dataset.loading) return Promise.resolve(false);
    v.dataset.loading = '1';
    return new Promise((resolve) => {
      v.addEventListener('loadeddata', () => { v.classList.add('is-ready'); resolve(true); }, { once: true });
      v.addEventListener('error', () => resolve(false), { once: true });
      v.preload = preload;
      v.src = v.dataset.video;
      v.load();
    });
  }

  const heroVideo = $('.hero__video');
  const chapterVideos = $$('.chapter__video').map((v) => ({ v, ready: false, target: 0, current: 0 }));

  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      const cv = chapterVideos.find((c) => c.v === e.target);
      if (!cv) return;
      if (e.isIntersecting) {
        loadVideo(cv.v).then((ok) => {
          cv.ready = ok || cv.ready;
          if (ok && !isDesktop() && !reduced) { cv.v.loop = true; cv.v.play().catch(() => {}); }
        });
        if (cv.ready && !isDesktop() && !reduced) cv.v.play().catch(() => {});
      } else if (cv.ready && !isDesktop()) {
        cv.v.pause();
      }
    });
  }, { rootMargin: '100% 0px' });
  chapterVideos.forEach((c) => videoObserver.observe(c.v));

  /* ------------------------------------------------------------------------
     Without GSAP (offline / blocked CDN) the page stays fully readable
     ------------------------------------------------------------------------ */
  if (!hasGSAP) {
    root.classList.add('is-loaded');
    chapterScenes.forEach((s) => { s.auto = true; });
    if (heroVideo && !reduced) loadVideo(heroVideo, 'metadata').then((ok) => ok && heroVideo.play().catch(() => {}));
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* ------------------------------------------------------------------------
     Text splitting (keeps nested <em>, <mark> etc.)
     ------------------------------------------------------------------------ */
  function splitText(el, mode) {
    const build = (src, dest) => {
      [...src.childNodes].forEach((node) => {
        if (node.nodeType === 3) {
          node.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { dest.appendChild(document.createTextNode(' ')); return; }
            const w = document.createElement('span');
            if (mode === 'chars') {
              w.className = 'w';
              [...part].forEach((ch) => {
                const c = document.createElement('span'); c.className = 'c'; c.textContent = ch; w.appendChild(c);
              });
            } else if (mode === 'light') {
              w.className = 'lw'; w.textContent = part;
            } else {
              w.className = 'w';
              const i = document.createElement('span'); i.className = 'wi'; i.textContent = part; w.appendChild(i);
            }
            dest.appendChild(w);
          });
        } else if (node.nodeType === 1) {
          const clone = node.cloneNode(false);
          dest.appendChild(clone);
          build(node, clone);
        }
      });
    };
    const frag = document.createDocumentFragment();
    build(el, frag);
    el.textContent = '';
    el.appendChild(frag);
    return el;
  }

  $$('[data-split]').forEach((el) => splitText(el, el.dataset.split));
  $$('[data-lightup]').forEach((el) => splitText(el, 'light'));

  /* ------------------------------------------------------------------------
     Lenis smooth scroll
     ------------------------------------------------------------------------ */
  let lenis = null;
  if (!reduced && typeof window.Lenis !== 'undefined') {
    lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    lenis.stop();
  }

  const scrollToTarget = (target) => {
    if (lenis) lenis.scrollTo(target, { duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) });
    else (typeof target === 'number' ? window.scrollTo(0, target) : target.scrollIntoView());
  };
  $$('[data-scroll-to]').forEach((a) => a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (!id || id[0] !== '#') return;
    e.preventDefault();
    scrollToTarget(id === '#top' ? 0 : $(id));
  }));

  /* ------------------------------------------------------------------------
     Preloader → hero intro
     ------------------------------------------------------------------------ */
  const heroChars = $$('.hero__title .c');
  const heroFades = $$('[data-hero-fade]');
  const nav = $('[data-nav]');

  if (!reduced) {
    gsap.set(heroChars, { yPercent: 115 });
    gsap.set(heroFades, { autoAlpha: 0, y: 24 });
    gsap.set(nav, { autoAlpha: 0, y: -20 });
    gsap.set('.hero__media', { scale: 1.12, autoAlpha: 0 });
  }

  function heroIntro() {
    if (reduced) return;
    gsap.timeline({ defaults: { ease: 'power4.out' } })
      .to('.hero__media', { scale: 1, autoAlpha: 1, duration: 2.2, ease: 'expo.out' }, 0)
      .to(heroChars, { yPercent: 0, duration: 1.3, stagger: 0.028 }, 0.15)
      .to(heroFades, { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.1 }, 0.7)
      .to(nav, { autoAlpha: 1, y: 0, duration: 1, clearProps: 'transform' }, 0.9);
  }

  function preloader() {
    const countEl = $('[data-preload-count]');
    const bar = $('.preloader__bar span');
    const counter = { v: 0 };
    const fonts = Promise.race([document.fonts ? document.fonts.ready : Promise.resolve(), new Promise((r) => setTimeout(r, 2500))]);
    // resolve manually: a GSAP tween is itself thenable, so tween.then() never settles cleanly
    const counted = new Promise((resolve) => gsap.to(counter, {
      v: 100, duration: reduced ? 0.2 : 1.6, ease: 'power2.inOut',
      onUpdate: () => { countEl.textContent = Math.round(counter.v); bar.style.transform = `scaleX(${counter.v / 100})`; },
      onComplete: resolve,
    }));
    Promise.all([fonts, counted]).then(() => {
      root.classList.add('is-loaded');
      if (lenis) lenis.start();
      ScrollTrigger.refresh();
      heroIntro();
      if (heroVideo && !reduced) loadVideo(heroVideo, isDesktop() ? 'auto' : 'metadata').then((ok) => ok && heroVideo.play().catch(() => {}));
    });
  }

  /* ------------------------------------------------------------------------
     Global scroll UI: progress bar, nav state
     ------------------------------------------------------------------------ */
  function scrollUI() {
    const bar = $('.progress span');
    ScrollTrigger.create({
      start: 0, end: 'max',
      onUpdate: (self) => {
        bar.style.transform = `scaleX(${self.progress})`;
        const y = self.scroll();
        nav.classList.toggle('is-glass', y > 80);
        nav.classList.toggle('is-hidden', self.direction === 1 && y > 300);
      },
    });
  }

  /* ------------------------------------------------------------------------
     Generic reveals
     ------------------------------------------------------------------------ */
  function reveals() {
    if (reduced) return;
    $$('[data-reveal]').forEach((el) => {
      gsap.from(el, { y: 40, autoAlpha: 0, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
    });
    $$('[data-split]').forEach((el) => {
      if (el.closest('.hero')) return;
      const parts = $$('.c, .wi', el);
      gsap.from(parts, {
        yPercent: 115, duration: 1.2, ease: 'power4.out', stagger: el.dataset.split === 'chars' ? 0.025 : 0.06,
        scrollTrigger: { trigger: el, start: 'top 88%' },
      });
    });
  }

  /* ------------------------------------------------------------------------
     Hero scroll-out
     ------------------------------------------------------------------------ */
  function heroScroll() {
    if (reduced) return;
    const st = { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true };
    gsap.to('.hero__content', { yPercent: -18, autoAlpha: 0.15, ease: 'none', scrollTrigger: st });
    gsap.to('.hero__title', { scale: 0.94, transformOrigin: 'left bottom', ease: 'none', scrollTrigger: st });
    gsap.to('.hero__media', { yPercent: 18, ease: 'none', scrollTrigger: st });
  }

  /* ------------------------------------------------------------------------
     Stats: counters + velocity marquees
     ------------------------------------------------------------------------ */
  function stats() {
    $$('[data-count]').forEach((el) => {
      const end = parseFloat(el.dataset.count);
      const pre = el.dataset.prefix || '', suf = el.dataset.suffix || '';
      const fmt = (v) => pre + Math.round(v).toLocaleString('en-US') + suf;
      if (reduced) { el.textContent = fmt(end); return; }
      const o = { v: 0 };
      el.textContent = fmt(0);
      ScrollTrigger.create({
        trigger: el, start: 'top 90%', once: true,
        onEnter: () => gsap.to(o, { v: end, duration: 2.2, ease: 'power3.out', onUpdate: () => { el.textContent = fmt(o.v); } }),
      });
    });

    $$('[data-marquee]').forEach((m) => {
      const track = $('.marquee__track', m);
      const original = track.innerHTML;
      while (track.scrollWidth < window.innerWidth * 2.2) track.insertAdjacentHTML('beforeend', original);
      track.insertAdjacentHTML('beforeend', track.innerHTML);
      const baseDir = parseFloat(m.dataset.marquee) || 1;
      let x = 0, dir = 1;
      if (reduced) return;
      gsap.ticker.add((_, delta) => {
        const vel = lenis ? lenis.velocity : 0;
        if (lenis && lenis.direction) dir = lenis.direction;
        const half = track.scrollWidth / 2;
        x -= (0.045 * delta + Math.abs(vel) * 0.35) * baseDir * dir;
        if (x <= -half) x += half;
        if (x > 0) x -= half;
        track.style.transform = `translate3d(${x}px,0,0)`;
      });
    });
  }

  /* ------------------------------------------------------------------------
     Mission: words light up as you read
     ------------------------------------------------------------------------ */
  function mission() {
    const words = $$('.mission .lw');
    const marks = $$('.mission mark');
    if (reduced) { marks.forEach((m) => m.classList.add('is-lit')); return; }
    gsap.fromTo(words, { opacity: 0.14 }, {
      opacity: 1, ease: 'none', stagger: 0.05,
      scrollTrigger: { trigger: '.mission', start: 'top 70%', end: 'bottom 70%', scrub: true },
    });
    marks.forEach((m) => ScrollTrigger.create({
      trigger: m, start: 'top 62%', onEnter: () => m.classList.add('is-lit'), onLeaveBack: () => m.classList.remove('is-lit'),
    }));
  }

  /* ------------------------------------------------------------------------
     Pillars: pinned chapters, scroll-scrubbed video + canvas, letterbox wipes
     ------------------------------------------------------------------------ */
  function pillars(mm) {
    const chapters = $$('.chapter');

    mm.add('(min-width: 769px) and (prefers-reduced-motion: no-preference)', () => {
      chapterScenes.forEach((s) => { s.auto = false; });
      chapterVideos.forEach((c) => { c.v.loop = false; c.v.pause(); });

      chapters.forEach((ch, i) => {
        const scene = chapterScenes[i], cv = chapterVideos[i];
        const bars = $$('.letterbox i', ch);

        if (i > 0) {
          gsap.fromTo(bars, { scaleY: 1 }, {
            scaleY: 0, ease: 'none',
            scrollTrigger: { trigger: ch, start: 'top 70%', end: 'top top', scrub: true },
          });
        }

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: ch, start: 'top top', end: '+=220%', pin: true, scrub: true,
            onUpdate: (self) => {
              scene.target = clamp(self.progress / 0.85);
              if (cv.ready && cv.v.duration) cv.target = clamp(self.progress / 0.9) * (cv.v.duration - 0.05);
            },
          },
        });
        tl.fromTo($('.chapter__index', ch), { autoAlpha: 0, x: -60 }, { autoAlpha: 1, x: 0, duration: 0.12 }, 0)
          .fromTo($('.chapter__card', ch), { autoAlpha: 0, y: 80 }, { autoAlpha: 1, y: 0, duration: 0.14, ease: 'power2.out' }, 0.04)
          .fromTo($('.chapter__quote', ch), { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.12 }, 0.5)
          .fromTo($('.chapter__rail span', ch), { scaleY: 0 }, { scaleY: 1, duration: 1 }, 0);
        if (i < chapters.length - 1) tl.to(bars, { scaleY: 1, duration: 0.1 }, 0.9);
        else tl.to({}, { duration: 0 }, 1);
      });

      // frame-accurate scrubbing with a little inertia to hide seek jank
      const scrub = () => {
        chapterVideos.forEach((c) => {
          if (!c.ready) return;
          c.current += (c.target - c.current) * 0.15;
          if (Math.abs(c.v.currentTime - c.current) > 0.012) c.v.currentTime = c.current;
        });
      };
      gsap.ticker.add(scrub);
      return () => gsap.ticker.remove(scrub);
    });

    mm.add('(max-width: 768px), (prefers-reduced-motion: reduce)', () => {
      chapterScenes.forEach((s) => {
        if (reduced) { s.auto = false; s.target = 1; s.p = 1; } else { s.auto = true; s.t = 0; }
      });
      chapterVideos.forEach((c) => {
        if (c.ready && !reduced) { c.v.loop = true; c.v.play().catch(() => {}); }
      });
      if (reduced) return;
      chapters.forEach((ch) => {
        gsap.from($('.chapter__card', ch), { y: 60, autoAlpha: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: ch, start: 'top 55%' } });
        gsap.from($('.chapter__index', ch), { x: -40, autoAlpha: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: ch, start: 'top 70%' } });
      });
    });
  }

  /* ------------------------------------------------------------------------
     Story: portrait reveal + timeline draw
     ------------------------------------------------------------------------ */
  function story(mm) {
    if (reduced) return;
    const frame = $('.story__frame');
    gsap.fromTo(frame, { clipPath: 'inset(100% 0% 0% 0%)' }, {
      clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'expo.inOut',
      scrollTrigger: { trigger: frame, start: 'top 80%' },
    });
    gsap.fromTo($('img', frame), { yPercent: -8 }, {
      yPercent: -15, ease: 'none', scrollTrigger: { trigger: '.story', start: 'top bottom', end: 'bottom top', scrub: true },
    });

    const tlLine = $('.timeline__line span');
    const items = $$('.timeline__item');
    mm.add('(min-width: 1025px)', () => {
      gsap.fromTo(tlLine, { scaleX: 0, scaleY: 1 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '.timeline', start: 'top 80%', end: 'top 30%', scrub: true } });
    });
    mm.add('(max-width: 1024px)', () => {
      gsap.fromTo(tlLine, { scaleY: 0, scaleX: 1 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.timeline', start: 'top 75%', end: 'bottom 60%', scrub: true } });
    });
    items.forEach((it, i) => {
      gsap.from(it, { y: 30, autoAlpha: 0, duration: 1, ease: 'power3.out', delay: isDesktop() ? i * 0.08 : 0, scrollTrigger: { trigger: it, start: 'top 85%' } });
    });
  }

  /* ------------------------------------------------------------------------
     Approach: stacking cards
     ------------------------------------------------------------------------ */
  function approach(mm) {
    if (reduced) return;
    mm.add('(min-width: 769px)', () => {
      const steps = $$('.step');
      steps.forEach((s, i) => {
        const next = steps[i + 1];
        if (!next) return;
        gsap.to(s, {
          scale: 0.94, opacity: 0.55, ease: 'none',
          scrollTrigger: { trigger: next, start: 'top 85%', end: 'top 30%', scrub: true },
        });
      });
    });
    gsap.from('.pills li', {
      y: 20, autoAlpha: 0, duration: 0.8, ease: 'power3.out', stagger: 0.03,
      scrollTrigger: { trigger: '.toolkit', start: 'top 85%' },
    });
  }

  /* ------------------------------------------------------------------------
     Work: horizontal pinned gallery + card tilt
     ------------------------------------------------------------------------ */
  function work(mm) {
    const track = $('[data-work-track]');
    const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);
    mm.add('(min-width: 769px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.to(track, {
        x: () => -dist(), ease: 'none',
        scrollTrigger: { trigger: '.work', start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 1, invalidateOnRefresh: true },
      });
    });
    mm.add('(max-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      $$('.case').forEach((c) => gsap.from(c, { y: 50, autoAlpha: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: c, start: 'top 88%' } }));
    });

    if (!finePointer || reduced) return;
    $$('.case').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(card, { rotateY: px * 8, rotateX: -py * 8, transformPerspective: 900, duration: 0.6, ease: 'power3.out' });
      });
      card.addEventListener('mouseleave', () => gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.9, ease: 'elastic.out(1, .5)' }));
    });
  }

  /* ------------------------------------------------------------------------
     Final CTA: glow follows cursor
     ------------------------------------------------------------------------ */
  function finalCTA() {
    if (reduced) return;
    const cta = $('.cta'), glow = $('.cta__glow');
    gsap.from('.cta__button', { scale: 0.4, autoAlpha: 0, rotate: -30, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: '.cta__title', start: 'top 70%' } });
    if (!finePointer) return;
    const gx = gsap.quickTo(glow, 'x', { duration: 1.2, ease: 'power3.out' });
    const gy = gsap.quickTo(glow, 'y', { duration: 1.2, ease: 'power3.out' });
    cta.addEventListener('mousemove', (e) => {
      const r = cta.getBoundingClientRect();
      gx((e.clientX - r.left - r.width / 2) * 0.45);
      gy((e.clientY - r.top - r.height / 2) * 0.45);
    });
  }

  /* ------------------------------------------------------------------------
     Cursor + magnetic buttons (desktop only)
     ------------------------------------------------------------------------ */
  function cursor() {
    if (!finePointer || reduced) return;
    root.classList.add('has-cursor');
    const el = $('.cursor'), dot = $('.cursor__dot'), ring = $('.cursor__ring'), label = $('.cursor__label');
    const pos = { x: innerWidth / 2, y: innerHeight / 2 }, r = { ...pos };
    gsap.ticker.add(() => {
      r.x += (mouse.x - r.x) * 0.15; r.y += (mouse.y - r.y) * 0.15;
      dot.style.transform = `translate3d(${mouse.x}px,${mouse.y}px,0)`;
      ring.style.transform = `translate3d(${r.x}px,${r.y}px,0)`;
    });
    document.addEventListener('mouseover', (e) => {
      const t = e.target.closest('a, button, [data-cursor], .pills li, .stat');
      const text = t && t.dataset.cursor;
      el.classList.toggle('is-hover', !!t && !text);
      el.classList.toggle('is-label', !!text);
      if (text) label.textContent = text;
    });
    document.addEventListener('mouseleave', () => { mouse.x = -100; mouse.y = -100; });
  }

  function magnetic() {
    if (!finePointer || reduced) return;
    $$('[data-magnetic]').forEach((el) => {
      const strength = el.classList.contains('cta__button') ? 0.45 : 0.3;
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * strength, y: (e.clientY - r.top - r.height / 2) * strength, duration: 0.5, ease: 'power3.out' });
      });
      el.addEventListener('mouseleave', () => gsap.to(el, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, .4)' }));
    });
  }

  /* ------------------------------------------------------------------------
     Boot
     ------------------------------------------------------------------------ */
  function boot() {
    const mm = gsap.matchMedia();
    preloader();
    scrollUI();
    heroScroll();
    stats();
    mission();
    pillars(mm);
    story(mm);
    approach(mm);
    work(mm);
    finalCTA();
    reveals();
    cursor();
    magnetic();

    if (heroScene) heroScene.auto = false;
    window.addEventListener('load', () => ScrollTrigger.refresh());
    if (document.fonts) document.fonts.ready.then(() => ScrollTrigger.refresh());
  }

  boot();
})();
