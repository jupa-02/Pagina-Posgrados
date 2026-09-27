import React from 'react';
import { Composition } from 'remotion';
import { VideoInstitucionalPosgrados } from './VideoInstitucionalPosgrados';
import timings from '../public/audio/voice_timings.json';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="VideoInstitucionalPosgrados"
        component={VideoInstitucionalPosgrados}
        durationInFrames={(timings as any).totalFrames || 12368}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
