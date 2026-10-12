import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';

export interface ScrollVideoBackgroundRef {
  seekToProgress: (progress: number) => void;
  getVideoElement: () => HTMLVideoElement | null;
}

interface ScrollVideoBackgroundProps {
  src?: string;
  poster?: string;
  onDurationReady?: (duration: number) => void;
  onTimeUpdate?: (currentTime: number, progress: number) => void;
}

export const ScrollVideoBackground = forwardRef<
  ScrollVideoBackgroundRef,
  ScrollVideoBackgroundProps
>(({ src = '/video.mp4', poster = '/images/detail-cameras.jpg', onDurationReady, onTimeUpdate }, ref) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [duration, setDuration] = useState(22.01);
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);
  const pendingSeekRef = useRef<boolean>(false);
  const rafIdRef = useRef<number | null>(null);

  // Expose imperative handle for zero-rerender seeking
  useImperativeHandle(ref, () => ({
    seekToProgress: (progress: number) => {
      const clamped = Math.max(0, Math.min(1, progress));
      const dur = videoRef.current?.duration || duration || 22.01;
      targetTimeRef.current = clamped * dur;
      scheduleSeek();
    },
    getVideoElement: () => videoRef.current,
  }));

  const scheduleSeek = () => {
    if (rafIdRef.current !== null) return;
    rafIdRef.current = requestAnimationFrame(performSeek);
  };

  const performSeek = () => {
    rafIdRef.current = null;
    const video = videoRef.current;
    if (!video || !isLoaded) return;

    // Check if browser is already processing a seek
    if (video.seeking || isSeekingRef.current) {
      pendingSeekRef.current = true;
      return;
    }

    const diff = Math.abs(video.currentTime - targetTimeRef.current);
    // Seek if difference exceeds 30ms (approx 1 frame at 30fps)
    if (diff > 0.03) {
      try {
        isSeekingRef.current = true;
        video.currentTime = targetTimeRef.current;
        const dur = video.duration || 22.01;
        onTimeUpdate?.(targetTimeRef.current, targetTimeRef.current / dur);
      } catch {
        isSeekingRef.current = false;
      }
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure video is strictly paused
    video.pause();

    const handleLoadedMetadata = () => {
      video.pause();
      const dur = video.duration || 22.01;
      setDuration(dur);
      setIsLoaded(true);
      onDurationReady?.(dur);
      // Initialize to frame 0
      video.currentTime = 0;
    };

    const handleSeeked = () => {
      isSeekingRef.current = false;
      if (pendingSeekRef.current) {
        pendingSeekRef.current = false;
        scheduleSeek();
      }
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('seeked', handleSeeked);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('seeked', handleSeeked);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [onDurationReady]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
      {/* Background Poster fallback */}
      <img
        src={poster}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      />

      {/* Full-Viewport Video Element */}
      <video
        ref={videoRef}
        src={src}
        preload="auto"
        muted
        playsInline
        className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          // Center and scale to cover full viewport with subtle warm tint blending
          objectFit: 'cover',
          objectPosition: 'center 46%',
        }}
      />

      {/* Ambient Atmospheric Radial Vignette Scrim */}
      <div
        className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/75 pointer-events-none z-10"
        aria-hidden="true"
      />
    </div>
  );
});
