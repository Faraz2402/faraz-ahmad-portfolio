/* Scene 2 — "Making Procurement Work Smarter"
   Disconnected steps → one flowing system: request, approval, PO and supplier
   cards drift out of order, snap into three lanes feeding three hubs, data
   streams through, and an amber pulse travels the finished pipeline. */
import React, { useMemo } from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { C, W, H, rng, mix, clamp01, ease, inOut, clamp, SharedDefs } from './shared';

const T = {
  gatherStart: 35,
  gatherLen: 75,
  gatherSpread: 50,
  hubs: [85, 145],
  lines: 105,        // lanes start drawing, staggered per segment
  pulse: [195, 278], // amber pulse crosses the four segments
  settle: 268,
};

// Pipeline: off-screen in → three hubs → off-screen out. Four segments, three lanes.
const HUBS = [{ x: 480, y: 540 }, { x: 960, y: 540 }, { x: 1440, y: 540 }];
const NODES = [{ x: -80, y: 540 }, ...HUBS, { x: 2000, y: 540 }];
const LANES = [-150, 0, 150];
const STAGE = ['request', 'approval', 'po', 'supplier'];
const CARD = { w: 128, h: 78 };
const CARD_T = [0.36, 0.68];

function curve(s, lane) {
  const a = NODES[s], b = NODES[s + 1];
  const dx = (b.x - a.x) * 0.38;
  const o = LANES[lane] * 1.33; // bezier midpoint lands on the lane offset
  return [a, { x: a.x + dx, y: a.y + o }, { x: b.x - dx, y: b.y + o }, b];
}
function at([p0, p1, p2, p3], t) {
  const u = 1 - t;
  const k = [u * u * u, 3 * u * u * t, 3 * u * t * t, t * t * t];
  return { x: k[0] * p0.x + k[1] * p1.x + k[2] * p2.x + k[3] * p3.x, y: k[0] * p0.y + k[1] * p1.y + k[2] * p2.y + k[3] * p3.y };
}
const pathD = ([a, b, c, d]) => `M${a.x},${a.y} C${b.x},${b.y} ${c.x},${c.y} ${d.x},${d.y}`;

const SEGMENTS = [0, 1, 2, 3].flatMap((s) => LANES.map((_, lane) => ({ s, lane, pts: curve(s, lane) })));

function buildCards() {
  const rand = rng(48);
  return SEGMENTS.flatMap(({ s, lane, pts }) =>
    CARD_T.map((ct) => {
      const p = at(pts, ct);
      return {
        s, lane, ct, x: p.x, y: p.y, kind: STAGE[s],
        sx: 80 + rand() * (W - 160),
        sy: 90 + rand() * (H - 180),
        rot: (rand() - 0.5) * 50,
        sc: 0.7 + rand() * 0.45,
        ph: rand() * Math.PI * 2,
        delay: (p.x / W) * T.gatherSpread + rand() * 14,
      };
    })
  );
}

// Small type glyph in the card corner (no readable text).
const Glyph = ({ kind, color }) => {
  if (kind === 'request') return <circle r={6} fill="none" stroke={color} strokeWidth={2} />;
  if (kind === 'approval') return <path d="M-6,0 L-2,4 L6,-5" fill="none" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />;
  if (kind === 'po') return <rect x={-5.5} y={-5.5} width={11} height={11} rx={2} fill="none" stroke={color} strokeWidth={2} />;
  return <path d="M0,-7 L7,0 L0,7 L-7,0 Z" fill="none" stroke={color} strokeWidth={2} />;
};
const KIND_COLOR = { request: C.mist, approval: C.cyan, po: C.blue, supplier: C.cyan };

export const P2PFlow = () => {
  const frame = useCurrentFrame();
  const cards = useMemo(buildCards, []);
  const t = frame / 30;

  const q = interpolate(frame, [0, T.settle], [0, 1], { easing: inOut, ...clamp });
  const scale = 1.32 - 0.32 * q;  // crane up / reveal
  const camX = 330 * (1 - q);      // lateral track, left → centre
  const camY = -40 + 50 * q;

  const hubIn = interpolate(frame, T.hubs, [0, 1], { easing: ease, ...clamp });
  const P = interpolate(frame, T.pulse, [0, 4], { easing: inOut, ...clamp });

  return (
    <AbsoluteFill style={{ background: C.ink }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <defs>
          <SharedDefs />
        </defs>
        <rect width={W} height={H} fill="url(#room)" />

        <g transform={`translate(${W / 2 + camX} ${H / 2 + camY}) scale(${scale}) translate(${-W / 2} ${-H / 2})`}>
          <rect x={-300} y={-300} width={W + 600} height={H + 600} fill="url(#grid)" />
          <ellipse cx={960} cy={540} rx={1000} ry={420} fill="url(#blueGlow)" opacity={0.4 + hubIn * 0.6} />

          {/* Lanes draw in left → right, then stream */}
          {SEGMENTS.map(({ s, lane, pts }, i) => {
            const d = ease(clamp01((frame - T.lines - s * 14 - lane * 4) / 46));
            const local = clamp01(P - s);
            return (
              <g key={i}>
                <path d={pathD(pts)} fill="none" stroke={C.blue} strokeOpacity={0.45} strokeWidth={1.6}
                  pathLength={1} strokeDasharray={1} strokeDashoffset={1 - d} />
                {local > 0 && (
                  <path d={pathD(pts)} fill="none" stroke={C.amber} strokeOpacity={0.85} strokeWidth={2.6}
                    pathLength={1} strokeDasharray={1} strokeDashoffset={1 - local} filter="url(#bloom)" />
                )}
                {[0, 1, 2, 3].map((k) => {
                  const tt = (t * 0.75 + k / 4 + lane * 0.13 + s * 0.07) % 1;
                  const p = at(pts, tt);
                  return <circle key={k} cx={p.x} cy={p.y} r={3} fill={C.cyan} opacity={d > 0.98 ? 0.85 : 0} />;
                })}
              </g>
            );
          })}

          {/* Hubs */}
          {HUBS.map((h, i) => {
            // Rings flash amber as the pulse passes, then settle back to cyan with a warm halo.
            const flash = Math.max(0, 1 - Math.abs(P - (i + 1)) * 2.5);
            const halo = Math.max(flash, P >= i + 1 ? 0.4 : 0);
            const col = mix(C.cyan, C.amber, flash);
            return (
              <g key={i} transform={`translate(${h.x} ${h.y}) scale(${0.6 + 0.4 * hubIn})`} opacity={hubIn}>
                <circle r={150} fill="url(#blueGlow)" />
                <circle r={130} fill="url(#amberGlow)" opacity={halo} />
                <circle r={64} fill="none" stroke={col} strokeOpacity={0.5} strokeWidth={1.5} strokeDasharray="6 10"
                  transform={`rotate(${frame * (i % 2 ? -0.6 : 0.6)})`} />
                <circle r={46} fill={C.navy2} fillOpacity={0.85} stroke={col} strokeWidth={2.2} filter="url(#bloom)" />
                <circle r={14} fill={col} filter="url(#bloom)" />
              </g>
            );
          })}

          {/* Pulse heads */}
          {P > 0 && P < 4 && SEGMENTS.filter(({ s }) => P - s > 0 && P - s < 1).map(({ s, lane, pts }) => {
            const p = at(pts, P - s);
            return (
              <g key={`${s}-${lane}`}>
                <circle cx={p.x} cy={p.y} r={70} fill="url(#amberGlow)" />
                <circle cx={p.x} cy={p.y} r={7} fill={C.amber} filter="url(#bloom)" />
              </g>
            );
          })}

          {/* Cards: scattered → aligned on the lanes */}
          {cards.map((c, i) => {
            const g = ease(clamp01((frame - T.gatherStart - c.delay) / T.gatherLen));
            const fx = c.sx + Math.sin(t * 0.7 + c.ph) * 26;
            const fy = c.sy + Math.cos(t * 0.55 + c.ph) * 18;
            const x = fx + (c.x - fx) * g;
            const y = fy + (c.y - fy) * g;
            const rot = c.rot * (1 - g);
            const sc = c.sc + (1 - c.sc) * g;
            const lit = Math.max(0, 1 - Math.abs(P - c.s - c.ct) * 5);
            const kc = KIND_COLOR[c.kind];
            return (
              <g key={i} transform={`translate(${x} ${y}) rotate(${rot}) scale(${sc})`} opacity={0.5 + 0.5 * g}>
                <rect x={-CARD.w / 2} y={-CARD.h / 2} width={CARD.w} height={CARD.h} rx={10}
                  fill={C.navy2} fillOpacity={0.88} stroke={mix(C.blue, C.amber, lit)} strokeOpacity={0.45 + 0.4 * Math.max(g, lit)} strokeWidth={1.4} />
                <rect x={-CARD.w / 2 + 14} y={-22} width={52} height={5} rx={2.5} fill={C.mist} fillOpacity={0.55} />
                <rect x={-CARD.w / 2 + 14} y={-6} width={84} height={4} rx={2} fill={C.mist} fillOpacity={0.25} />
                <rect x={-CARD.w / 2 + 14} y={6} width={64} height={4} rx={2} fill={C.mist} fillOpacity={0.25} />
                <rect x={-CARD.w / 2 + 14} y={20} width={36} height={6} rx={3} fill={kc} fillOpacity={0.55} />
                <g transform={`translate(${CARD.w / 2 - 20} -20)`}>
                  <Glyph kind={c.kind} color={mix(kc, C.amber, lit)} />
                </g>
              </g>
            );
          })}
        </g>
      </svg>
    </AbsoluteFill>
  );
};
