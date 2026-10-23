// Render scenes and encode them all-intra (every frame a keyframe) so the site
// can scrub them with scroll. Usage: npm run build [-- SceneId ...]
import { execSync } from 'node:child_process';

const SCENES = {
  HeroAnalytics: 'scene-1-analytics',
  P2PFlow: 'scene-2-p2p',
  Governance: 'scene-3-governance',
};

const run = (cmd) => execSync(cmd, { stdio: 'inherit' });
const ids = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(SCENES);

for (const id of ids) {
  const name = SCENES[id];
  if (!name) throw new Error(`Unknown scene "${id}". Choose from: ${Object.keys(SCENES).join(', ')}`);
  const raw = `out/${name}-raw.mp4`;
  run(`npx remotion render src/index.js ${id} ${raw}`);
  run(`npx remotion ffmpeg -y -loglevel error -i ${raw} -c:v libx264 -preset slow -crf 32 -g 1 -keyint_min 1 -pix_fmt yuv420p -movflags +faststart -an ../assets/video/${name}.mp4`);
}
