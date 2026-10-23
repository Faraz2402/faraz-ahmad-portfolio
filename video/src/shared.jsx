/* Shared palette, timing helpers and SVG defs for all three scenes.
   Colours mirror the site's "Night Ledger" tokens in style.css. */
import React from 'react';
import { Easing } from 'remotion';

export const C = {
  ink: '#05070D',
  navy: '#0A1020',
  navy2: '#111A33',
  mist: '#9AA6C3',
  blue: '#4C8DFF',
  cyan: '#6FE3FF',
  amber: '#FFB45C',
};

export const W = 1920;
export const H = 1080;

export function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
export const mix = (a, b, t) => {
  const A = hex(a), B = hex(b);
  return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(',')})`;
};
export const clamp01 = (v) => Math.min(1, Math.max(0, v));
export const ease = Easing.bezier(0.22, 1, 0.36, 1);
export const inOut = Easing.bezier(0.65, 0, 0.35, 1);
export const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' };

// Gradients, bloom and grid used by every scene; place inside <defs>.
export const SharedDefs = () => (
  <>
    <radialGradient id="room" cx="58%" cy="42%" r="75%">
      <stop offset="0%" stopColor={C.navy2} />
      <stop offset="55%" stopColor={C.navy} />
      <stop offset="100%" stopColor={C.ink} />
    </radialGradient>
    <radialGradient id="amberGlow">
      <stop offset="0%" stopColor={C.amber} stopOpacity="0.55" />
      <stop offset="100%" stopColor={C.amber} stopOpacity="0" />
    </radialGradient>
    <radialGradient id="blueGlow">
      <stop offset="0%" stopColor={C.blue} stopOpacity="0.35" />
      <stop offset="100%" stopColor={C.blue} stopOpacity="0" />
    </radialGradient>
    <filter id="bloom" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3.2" result="b" />
      <feMerge>
        <feMergeNode in="b" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" fill="none" stroke={C.blue} strokeOpacity="0.07" strokeWidth="1" />
    </pattern>
  </>
);
