import React, { useRef, useState, useEffect } from 'react';

interface CinematicProductVideoProps {
  videoSrc?: string;
  posterSrc?: string;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
}

export const CinematicProductVideo: React.FC<CinematicProductVideoProps> = ({
  videoSrc = '/video.mp4',
  posterSrc = '/video-poster.jpg',
  onTimeUpdate,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(22);
  const [viewMode, setViewMode] = useState<'device' | 'focus'>('device');

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 22;
    setCurrentTime(current);
    setDuration(dur);
    onTimeUpdate?.(current, dur);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const targetTime = parseFloat(e.target.value);
    videoRef.current.currentTime = targetTime;
    setCurrentTime(targetTime);
  };

  return (
    <div className="relative w-full max-w-[560px] lg:max-w-[640px] flex flex-col items-center justify-center select-none z-20">
      {/* Cinematic Stage Mask & Frame */}
      <div
        className={`relative w-full overflow-hidden transition-all duration-500 rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] border border-white/15 bg-black/50 backdrop-blur-md ${
          viewMode === 'device'
            ? 'max-w-[340px] md:max-w-[390px] lg:max-w-[420px] aspect-[9/16] max-h-[72vh]'
            : 'max-w-[560px] lg:max-w-[640px] aspect-[16/10]'
        }`}
      >
        {/* Subtle Ambient Radial Backlight */}
        <div
          className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-black/70 pointer-events-none z-10"
          aria-hidden="true"
        />

        {/* Loading Spinner */}
        {isLoading && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-20 transition-opacity duration-300">
            <div className="w-8 h-8 rounded-full border-2 border-amber-400/20 border-t-amber-400 animate-spin" />
          </div>
        )}

        {/* Error Fallback */}
        {hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-20 text-white/70 p-6 text-center">
            <span className="text-amber-400 text-sm font-semibold mb-1">Video Loading</span>
            <span className="text-xs text-white/50">Displaying reference frame</span>
            {posterSrc && (
              <img
                src={posterSrc}
                alt="Canon EOS 60D Reference"
                className="w-full h-full object-cover absolute inset-0 -z-10"
              />
            )}
          </div>
        )}

        {/* Real Product Video Element using video.mp4 */}
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          onCanPlay={() => setIsLoading(false)}
          onWaiting={() => setIsLoading(true)}
          onPlaying={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          onTimeUpdate={handleTimeUpdate}
          className={`w-full h-full relative z-0 transition-all duration-500 ${
            viewMode === 'device'
              ? 'object-contain bg-black'
              : 'object-cover scale-[1.75] translate-y-[6%]'
          }`}
          style={{ opacity: isLoading ? 0.4 : 1 }}
        />

        {/* Edge Vignette Scrim (Natural Blending into Orange Stage) */}
        <div
          className="absolute inset-0 pointer-events-none shadow-[inset_0_0_60px_rgba(15,5,2,0.7)] z-10"
          aria-hidden="true"
        />
      </div>

      {/* Floating Cinematic Audio, Mode & Playback Controls Pill */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-4 pointer-events-auto z-30">
        {/* Play/Pause Toggle */}
        <button
          onClick={togglePlay}
          className="glass-pill px-3.5 py-1.5 rounded-full text-[10px] md:text-[11px] font-bold tracking-wider text-white/90 hover:text-amber-300 transition-all duration-200 cursor-pointer flex items-center gap-1.5"
          aria-label={isPlaying ? 'Pause video.mp4' : 'Play video.mp4'}
        >
          <span className="text-amber-400 font-mono">{isPlaying ? '⏸' : '▶'}</span>
          <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
        </button>

        {/* Real Audio Toggle (Unmute / Mute) */}
        <button
          onClick={toggleMute}
          className={`glass-pill px-3.5 py-1.5 rounded-full text-[10px] md:text-[11px] font-bold tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
            !isMuted ? 'text-amber-300 border-amber-400/50 bg-amber-500/20' : 'text-white/80 hover:text-white'
          }`}
          aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
        >
          <span className="text-amber-400 text-xs">{isMuted ? '🔇' : '🔊'}</span>
          <span>{isMuted ? 'AUDIO OFF' : 'AUDIO ON'}</span>
        </button>

        {/* View Mode Toggle: Device Reel vs Focus Screen */}
        <button
          onClick={() => setViewMode((prev) => (prev === 'device' ? 'focus' : 'device'))}
          className="glass-pill px-3 py-1.5 rounded-full text-[10px] md:text-[11px] font-bold tracking-wider text-white/90 hover:text-amber-300 transition-all duration-200 cursor-pointer flex items-center gap-1.5"
          title="Toggle between full capture and screen zoom"
        >
          <span className="text-amber-400 text-xs">⤢</span>
          <span>{viewMode === 'device' ? 'SCREEN FOCUS' : 'FULL REEL'}</span>
        </button>

        {/* Video Time Scrub Bar */}
        <div className="glass-pill px-3 py-1.5 rounded-full hidden sm:flex items-center gap-2">
          <input
            type="range"
            min={0}
            max={duration || 22}
            step={0.1}
            value={currentTime}
            onChange={handleSeek}
            className="w-16 md:w-24 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-amber-400"
            aria-label="Seek footage"
          />
          <span className="text-[9px] font-mono text-white/60 tabular-nums">
            {Math.floor(currentTime)}s / {Math.floor(duration)}s
          </span>
        </div>
      </div>
    </div>
  );
};
