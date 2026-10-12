import React from 'react';

interface BottomControlsProps {
  currentChapter: string;
  totalChapters: string;
  onScrollHintClick?: () => void;
}

export const BottomControls: React.FC<BottomControlsProps> = ({
  currentChapter,
  totalChapters,
  onScrollHintClick,
}) => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between px-4 sm:px-6 md:px-12 py-4 sm:py-6 gap-2 pointer-events-none select-none">
      {/* Bottom Left: Scroll to Discover */}
      <div
        onClick={onScrollHintClick}
        className="pointer-events-auto flex items-center gap-3 text-white/80 hover:text-white transition-colors duration-200 cursor-pointer group"
      >
        <div className="w-5 h-8 rounded-full border border-white/40 flex items-start justify-center p-1 group-hover:border-amber-400 transition-colors shadow-[0_0_10px_rgba(251,191,36,0.3)]">
          <div className="w-1 h-2 rounded-full bg-amber-400 animate-bounce shadow-[0_0_8px_rgba(251,191,36,0.9)]" />
        </div>
        <span className="text-[10px] tracking-[0.24em] uppercase font-bold text-white/90 group-hover:text-lighting-amber transition-colors drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
          SCROLL TO DISCOVER
        </span>
      </div>

      {/* Bottom Right: Pill Badge matching Screenshot 1 (02 / 12  EOS 60D) */}
      <div className="pointer-events-auto glass-pill px-4 py-1.5 rounded-full flex items-center gap-2.5 font-mono text-[10px] tracking-wider text-white">
        <span className="font-extrabold text-lighting-amber tracking-widest">{currentChapter} / {totalChapters}</span>
        <span className="text-white/30">·</span>
        <span className="text-lighting-white uppercase font-sans font-bold tracking-wider">EOS 60D</span>
      </div>
    </footer>
  );
};
