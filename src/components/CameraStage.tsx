import React from 'react';
import { CinematicProductVideo } from './CinematicProductVideo';

interface CameraStageProps {
  onVideoTimeUpdate?: (currentTime: number, duration: number) => void;
}

export const CameraStage: React.FC<CameraStageProps> = ({ onVideoTimeUpdate }) => {
  return (
    <div className="relative w-full max-w-[620px] lg:max-w-[700px] flex flex-col items-center justify-center select-none z-20">
      {/* Real Cinematic Product Showcase Video: video.mp4 */}
      <CinematicProductVideo
        videoSrc="/video.mp4"
        posterSrc="/video-poster.jpg"
        onTimeUpdate={onVideoTimeUpdate}
      />
    </div>
  );
};
