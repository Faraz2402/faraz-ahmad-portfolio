import React from 'react';
import { Composition, registerRoot } from 'remotion';
import { HeroAnalytics } from './HeroAnalytics';
import { P2PFlow } from './P2PFlow';
import { Governance } from './Governance';

const SCENES = { HeroAnalytics, P2PFlow, Governance };

const Root = () => (
  <>
    {Object.entries(SCENES).map(([id, component]) => (
      <Composition key={id} id={id} component={component} durationInFrames={300} fps={30} width={1920} height={1080} />
    ))}
  </>
);

registerRoot(Root);
