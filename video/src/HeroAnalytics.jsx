/* Scene 1 — "Turning Data into Decisions"
   Chaos → pattern → decision: scattered spend points flow into a dashboard wall
   (Pareto bars, category treemap, supplier network) and the top of the spend
   concentrates in amber. No readable text: the site overlays its own copy. */
import React, { useMemo } from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { C, W, H, rng, mix, clamp01, ease, inOut, SharedDefs } from './shared';

// Timeline (frames @ 30fps)
const T = {
  gatherStart: 50,   // particles begin to flow
  gatherLen: 80,     // each particle's travel time
  gatherSpread: 60,  // stagger left → right
  panels: [140, 200],
  draw: [180, 245],  // pareto line + network spokes
  amber: [195, 240],
  settle: 270,       // camera at rest; hold for scrub end-state
};

/* ---------- dashboard layout ---------- */
const PANELS = [
  { x: 160, y: 140, w: 720, h: 820 },  // Pareto spend by supplier
  { x: 910, y: 140, w: 850, h: 460 },  // category treemap
  { x: 910, y: 625, w: 850, h: 335 },  // supplier network
];

const BAR = { x0: 214, base: 900, max: 640, pitch: 13, cols: 3, slot: 52 };
const BAR_SHARE = [0.95, 0.74, 0.52, 0.4, 0.31, 0.25, 0.2, 0.16, 0.12, 0.09, 0.07, 0.05];

const TREE = [
  { x: 940, y: 200, w: 400, h: 370, amber: true },
  { x: 1352, y: 200, w: 378, h: 214 },
  { x: 1352, y: 426, w: 184, h: 144 },
  { x: 1548, y: 426, w: 182, h: 66 },
  { x: 1548, y: 504, w: 182, h: 66 },
];

const HUB = { x: 1335, y: 800 };
const SATS = Array.from({ length: 14 }, (_, i) => {
  const a = (i / 14) * Math.PI * 2 + 0.2;
  return { x: HUB.x + Math.cos(a) * 340, y: HUB.y + Math.sin(a) * 118, amber: i === 2 || i === 9 };
});

function buildTargets() {
  const out = [];
  // Pareto bars as dot-matrix columns; the top two suppliers carry the spend.
  BAR_SHARE.forEach((s, i) => {
    const rows = Math.round((s * BAR.max) / BAR.pitch);
    for (let c = 0; c < BAR.cols; c++) {
      for (let r = 0; r < rows; r++) {
        out.push({ x: BAR.x0 + i * BAR.slot + c * BAR.pitch, y: BAR.base - r * BAR.pitch, r: 4, color: C.blue, amber: i < 2 });
      }
    }
  });
  // Treemap cells filled with a dot grid.
  TREE.forEach((cell, k) => {
    const p = 18;
    for (let x = cell.x + 14; x < cell.x + cell.w - 8; x += p) {
      for (let y = cell.y + 14; y < cell.y + cell.h - 8; y += p) {
        out.push({ x, y, r: 4.2, color: k % 2 ? C.cyan : C.blue, amber: !!cell.amber });
      }
    }
  });
  // Supplier network: hub ring + satellite rings.
  const ring = (cx, cy, n, rad, amber) => {
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      out.push({ x: cx + Math.cos(a) * rad, y: cy + Math.sin(a) * rad, r: 3.4, color: C.cyan, amber });
    }
  };
  ring(HUB.x, HUB.y, 26, 22, false);
  ring(HUB.x, HUB.y, 10, 9, false);
  SATS.forEach((s) => ring(s.x, s.y, 8, 10, s.amber));
  return out;
}

function buildParticles() {
  const rand = rng(306);
  return buildTargets().map((t) => {
    const z = 0.55 + rand() * 0.9;
    return {
      ...t,
      sx: -160 + rand() * (W + 320),
      sy: -120 + rand() * (H + 240),
      z,
      sr: 0.9 + rand() * 1.8,
      sa: 0.25 + rand() * 0.6,
      ph: rand() * Math.PI * 2,
      w1: 0.6 + rand() * 1.4,
      w2: 0.4 + rand() * 1.1,
      amp: 18 + rand() * 46,
      // Gather left → right, with jitter so it reads as a flow, not a wipe.
      delay: (t.x / W) * T.gatherSpread + rand() * 18,
    };
  });
}

const PARETO = (() => {
  const total = BAR_SHARE.reduce((a, b) => a + b, 0);
  let cum = 0;
  return BAR_SHARE.map((s, i) => {
    cum += s;
    return [BAR.x0 + i * BAR.slot + BAR.pitch, BAR.base - 10 - (cum / total) * (BAR.max + 20)];
  });
})();

/* ---------- scene ---------- */
export const HeroAnalytics = () => {
  const frame = useCurrentFrame();
  const particles = useMemo(buildParticles, []);
  const t = frame / 30;

  const push = interpolate(frame, [0, T.settle], [0, 1], { easing: inOut, extrapolateRight: 'clamp' });
  const scale = 1 + push * 0.12;
  const camX = interpolate(push, [0, 1], [40, -24]);
  const camY = interpolate(push, [0, 1], [18, -6]);

  const panelIn = interpolate(frame, T.panels, [0, 1], { easing: ease, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const draw = interpolate(frame, T.draw, [0, 1], { easing: inOut, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const amber = interpolate(frame, T.amber, [0, 1], { easing: ease, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pulse = 0.82 + 0.18 * Math.sin((frame - T.amber[1]) / 9);
  const glow = amber * (frame > T.amber[1] ? pulse : 1);

  const paretoD = PARETO.map((p, i) => `${i ? 'L' : 'M'}${p[0]},${p[1]}`).join(' ');

  return (
    <AbsoluteFill style={{ background: C.ink }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <defs>
          <SharedDefs />
        </defs>

        <rect width={W} height={H} fill="url(#room)" />

        <g transform={`translate(${W / 2 + camX} ${H / 2 + camY}) scale(${scale}) translate(${-W / 2} ${-H / 2})`}>
          <rect x={-200} y={-200} width={W + 400} height={H + 400} fill="url(#grid)" opacity={0.5 + panelIn * 0.5} />
          <ellipse cx={1180} cy={520} rx={900} ry={520} fill="url(#blueGlow)" opacity={0.5 + panelIn * 0.5} />

          {/* Dashboard wall */}
          <g opacity={panelIn}>
            {PANELS.map((p, i) => (
              <g key={i} transform={`translate(0 ${(1 - panelIn) * 24})`}>
                <rect x={p.x} y={p.y} width={p.w} height={p.h} rx={18} fill={C.navy2} fillOpacity={0.45} stroke={C.blue} strokeOpacity={0.22} />
                {/* header chrome: unreadable "label" hairlines */}
                <rect x={p.x + 24} y={p.y + 22} width={p.w * 0.22} height={5} rx={2.5} fill={C.mist} fillOpacity={0.35} />
                <rect x={p.x + 24} y={p.y + 34} width={p.w * 0.12} height={4} rx={2} fill={C.mist} fillOpacity={0.18} />
                <circle cx={p.x + p.w - 30} cy={p.y + 28} r={4} fill={i === 0 ? C.amber : C.cyan} fillOpacity={0.7} />
              </g>
            ))}
            <line x1={BAR.x0 - 16} x2={BAR.x0 + BAR_SHARE.length * BAR.slot} y1={BAR.base + 14} y2={BAR.base + 14} stroke={C.mist} strokeOpacity={0.3} />
            {TREE.map((c, i) => (
              <rect key={i} x={c.x} y={c.y} width={c.w} height={c.h} rx={8} fill="none"
                stroke={c.amber ? mix(C.blue, C.amber, amber) : C.blue} strokeOpacity={c.amber ? 0.3 + amber * 0.45 : 0.25} />
            ))}
          </g>

          {/* Amber concentration bloom behind the highlighted data */}
          <g opacity={glow}>
            <ellipse cx={BAR.x0 + BAR.slot} cy={560} rx={190} ry={380} fill="url(#amberGlow)" />
            <ellipse cx={1140} cy={385} rx={290} ry={260} fill="url(#amberGlow)" />
          </g>

          {/* Network spokes */}
          <g opacity={panelIn}>
            {SATS.map((s, i) => {
              const len = Math.hypot(s.x - HUB.x, s.y - HUB.y);
              const d = clamp01(draw * 1.6 - (i / SATS.length) * 0.6);
              return (
                <line key={i} x1={HUB.x} y1={HUB.y} x2={s.x} y2={s.y}
                  stroke={s.amber ? mix(C.blue, C.amber, amber) : C.blue}
                  strokeOpacity={s.amber ? 0.35 + amber * 0.4 : 0.3} strokeWidth={1.4}
                  strokeDasharray={len} strokeDashoffset={len * (1 - d)} />
              );
            })}
          </g>

          {/* Particles: chaos → pattern */}
          <g filter="url(#bloom)">
            {particles.map((p, i) => {
              const g = ease(clamp01((frame - T.gatherStart - p.delay) / T.gatherLen));
              // Free drift while scattered; parallax by depth against the camera push.
              const dx = Math.sin(t * p.w1 + p.ph) * p.amp + t * 14 * (p.z - 1);
              const dy = Math.cos(t * p.w2 + p.ph * 1.3) * p.amp * 0.6;
              const par = 1 + (p.z - 1) * 0.35 * push;
              const fx = W / 2 + (p.sx + dx - W / 2) * par;
              const fy = H / 2 + (p.sy + dy - H / 2) * par;
              const x = fx + (p.x - fx) * g;
              const y = fy + (p.y - fy) * g;
              const base = mix(C.mist, p.color, g);
              const fill = p.amber ? mix(p.color, C.amber, amber) : base;
              const r = p.sr * p.z + (p.r - p.sr * p.z) * g;
              const a = p.sa * p.z * 0.9 + (0.92 - p.sa * p.z * 0.9) * g;
              return <circle key={i} cx={x} cy={y} r={r} fill={p.amber && amber > 0 ? fill : base} fillOpacity={clamp01(a)} />;
            })}
          </g>

          {/* Cumulative spend (Pareto) line */}
          <g opacity={panelIn}>
            <path d={paretoD} fill="none" stroke={C.cyan} strokeWidth={2.4} strokeLinejoin="round"
              pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw} filter="url(#bloom)" />
            {PARETO.map((p, i) => (
              <circle key={i} cx={p[0]} cy={p[1]} r={4.5} fill={C.ink} stroke={C.cyan} strokeWidth={2}
                opacity={clamp01(draw * PARETO.length - i)} />
            ))}
          </g>
        </g>
      </svg>
    </AbsoluteFill>
  );
};
