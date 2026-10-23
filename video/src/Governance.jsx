/* Scene 3 — "Building Control, Reducing Risk"
   Hidden risk → caught early → governed ecosystem: the camera glides along a
   contract timeline, four renewals flag amber and are resolved one by one,
   then it pulls back to a calm, all-blue constellation of suppliers. */
import React, { useMemo } from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { C, W, H, rng, mix, clamp01, ease, inOut, clamp, SharedDefs } from './shared';

const AXIS = 600;
const X0 = -520;
const X1 = 2440;
const LANE_Y = [330, 372, 414, 456, 498, 540];
const RING_Y = 760;

const T = {
  alert: [18, 48],         // risks surface
  resolve: [62, 100, 142, 186],
  resolveLen: 16,
  reveal: [165, 255],      // constellation fades in during the pull-back
};

// Camera: glide along the timeline, then pull back to the whole system.
const CAM_F = [0, 168, 262];
const CAM_X = [260, 1460, 960];
const CAM_Y = [570, 570, 540];
const CAM_S = [1.45, 1.45, 0.8];

function buildContracts() {
  const rand = rng(1813);
  const bars = [];
  LANE_Y.forEach((y, lane) => {
    let x = X0 + rand() * 200;
    while (x < X1) {
      const len = 200 + rand() * 340;
      bars.push({ lane, y, x, end: x + len });
      x += len + 40 + rand() * 90;
    }
  });
  // One flagged renewal per glide stop, each in a different lane.
  const targets = [470, 830, 1190, 1540];
  const used = new Set();
  targets.forEach((tx, i) => {
    let best = null;
    bars.forEach((b) => {
      if (used.has(b.lane) || b.end > X1 - 40) return;
      if (!best || Math.abs(b.end - tx) < Math.abs(best.end - tx)) best = b;
    });
    used.add(best.lane);
    best.risk = i;
  });
  return bars;
}

function buildRings(bars) {
  const rand = rng(16000);
  const risks = bars.filter((b) => b.risk !== undefined);
  const rings = [];
  for (let x = X0 + 80; x < X1; x += 170) rings.push({ x, score: 0.62 + rand() * 0.32 });
  // The supplier under each flagged contract scores low until it is resolved.
  risks.forEach((b) => {
    const r = rings.reduce((a, c) => (Math.abs(c.x - b.end) < Math.abs(a.x - b.end) ? c : a));
    r.risk = b.risk;
  });
  return rings;
}

function buildConstellation() {
  const rand = rng(13);
  const nodes = [];
  while (nodes.length < 170) {
    const x = -720 + rand() * 3360;
    const y = -340 + rand() * 1760;
    if (y > 270 && y < 830) continue; // keep the timeline band clear
    nodes.push({ x, y, r: 3 + rand() * 5, ph: rand() * 6.28, d: Math.hypot(x - 960, (y - 540) * 1.6) });
  }
  const seen = new Set();
  const edges = [];
  nodes.forEach((n, i) => {
    nodes
      .map((m, j) => ({ j, d: Math.hypot(m.x - n.x, m.y - n.y) }))
      .filter((e) => e.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 3)
      .forEach(({ j }) => {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (!seen.has(key)) { seen.add(key); edges.push([i, j]); }
      });
  });
  return { nodes, edges };
}

export const Governance = () => {
  const frame = useCurrentFrame();
  const bars = useMemo(buildContracts, []);
  const rings = useMemo(() => buildRings(bars), [bars]);
  const { nodes, edges } = useMemo(buildConstellation, []);
  const t = frame / 30;

  const fx = interpolate(frame, CAM_F, CAM_X, { easing: inOut, ...clamp });
  const fy = interpolate(frame, CAM_F, CAM_Y, { easing: inOut, ...clamp });
  const s = interpolate(frame, CAM_F, CAM_S, { easing: inOut, ...clamp });

  const alertIn = interpolate(frame, T.alert, [0, 1], { easing: ease, ...clamp });
  const resolved = (i) => ease(clamp01((frame - T.resolve[i]) / T.resolveLen));
  const revealAt = (d) => ease(clamp01((frame - T.reveal[0] - (d / 1900) * 50) / (T.reveal[1] - T.reveal[0] - 50)));

  return (
    <AbsoluteFill style={{ background: C.ink }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <defs>
          <SharedDefs />
        </defs>
        <rect width={W} height={H} fill="url(#room)" />

        <g transform={`translate(${W / 2} ${H / 2}) scale(${s}) translate(${-fx} ${-fy})`}>
          <rect x={-1000} y={-800} width={4000} height={2800} fill="url(#grid)" />
          <ellipse cx={fx} cy={560} rx={1100} ry={360} fill="url(#blueGlow)" />

          {/* Constellation (revealed on pull-back) */}
          <g>
            {edges.map(([a, b], i) => {
              const A = nodes[a], B = nodes[b];
              return <line key={i} x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke={C.blue} strokeWidth={1.2}
                strokeOpacity={0.42 * Math.min(revealAt(A.d), revealAt(B.d))} />;
            })}
            {nodes.map((n, i) => {
              const o = revealAt(n.d);
              return (
                <circle key={i} cx={n.x} cy={n.y} r={n.r * (0.6 + 0.4 * o)} fill={i % 3 ? C.blue : C.cyan}
                  opacity={o * (0.7 + 0.25 * Math.sin(t * 1.4 + n.ph))} filter="url(#bloom)" />
              );
            })}
          </g>

          {/* Timeline axis + month ticks */}
          {/* A filter on a zero-height line renders nothing, so the glow is a wider faint stroke underneath */}
          <line x1={X0} x2={X1} y1={AXIS} y2={AXIS} stroke={C.cyan} strokeOpacity={0.12} strokeWidth={8} />
          <line x1={X0} x2={X1} y1={AXIS} y2={AXIS} stroke={C.cyan} strokeOpacity={0.7} strokeWidth={1.6} />
          {Array.from({ length: Math.floor((X1 - X0) / 80) + 1 }, (_, i) => (
            <line key={i} x1={X0 + i * 80} x2={X0 + i * 80} y1={AXIS} y2={AXIS + (i % 3 ? 8 : 18)} stroke={C.mist} strokeOpacity={0.35} />
          ))}

          {/* Contracts: duration bars, renewal markers, drop lines */}
          {bars.map((b, i) => {
            const risk = b.risk !== undefined;
            const r = risk ? resolved(b.risk) : 1;
            const a = risk ? alertIn * (1 - r) : 0; // amber while unresolved
            const col = mix(C.blue, C.amber, a);
            const mark = mix(C.cyan, C.amber, a);
            return (
              <g key={i}>
                <rect x={b.x} y={b.y - 6} width={b.end - b.x} height={12} rx={6} fill={col} fillOpacity={0.22 + 0.2 * a} stroke={col} strokeOpacity={0.5} />
                <line x1={b.end} x2={b.end} y1={b.y + 6} y2={AXIS} stroke={mark} strokeOpacity={0.25 + 0.35 * a} strokeDasharray="3 5" />
                <circle cx={b.end} cy={b.y} r={5.5} fill={mark} filter="url(#bloom)" />
                <path d={`M${b.end},${AXIS - 7} L${b.end + 7},${AXIS} L${b.end},${AXIS + 7} L${b.end - 7},${AXIS} Z`} fill={C.navy} stroke={mark} strokeWidth={1.6} />
              </g>
            );
          })}

          {/* Risk alerts: ripples while open, a touch burst when resolved */}
          {bars.filter((b) => b.risk !== undefined).map((b) => {
            const r = resolved(b.risk);
            const since = frame - T.resolve[b.risk];
            return (
              <g key={b.risk}>
                <circle cx={b.end} cy={b.y} r={90} fill="url(#amberGlow)" opacity={alertIn * (1 - r) * (0.75 + 0.25 * Math.sin(t * 5))} />
                {[0, 0.5].map((k) => {
                  const p = (t * 0.9 + k) % 1;
                  return <circle key={k} cx={b.end} cy={b.y} r={8 + p * 34} fill="none" stroke={C.amber} strokeWidth={1.6}
                    opacity={alertIn * (1 - r) * (1 - p)} />;
                })}
                {since >= 0 && since < 26 && (
                  <circle cx={b.end} cy={b.y} r={10 + (since / 26) * 70} fill="none" stroke={C.cyan} strokeWidth={2.5}
                    opacity={1 - since / 26} filter="url(#bloom)" />
                )}
              </g>
            );
          })}

          {/* Supplier performance rings */}
          {rings.map((g, i) => {
            const risk = g.risk !== undefined;
            const r = risk ? resolved(g.risk) : 1;
            const a = risk ? alertIn * (1 - r) : 0;
            const score = risk ? 0.34 + (0.86 - 0.34) * r : g.score;
            const col = mix(i % 2 ? C.blue : C.cyan, C.amber, a);
            return (
              <g key={i} transform={`translate(${g.x} ${RING_Y})`}>
                <line x1={0} x2={0} y1={-(RING_Y - AXIS) + 10} y2={-32} stroke={C.mist} strokeOpacity={0.15} />
                <circle r={26} fill={C.navy2} fillOpacity={0.7} stroke={C.mist} strokeOpacity={0.18} strokeWidth={5} />
                <circle r={26} fill="none" stroke={col} strokeWidth={5} strokeLinecap="round" transform="rotate(-90)"
                  pathLength={1} strokeDasharray={`${score} 1`} filter="url(#bloom)" />
                <circle r={4} fill={col} />
                <rect x={-22} y={42} width={44} height={4} rx={2} fill={C.mist} fillOpacity={0.3} />
              </g>
            );
          })}
        </g>
      </svg>
    </AbsoluteFill>
  );
};
