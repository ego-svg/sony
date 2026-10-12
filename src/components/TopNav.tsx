import React from 'react';
import { NAV_ITEMS } from '../constants/cameraData';

interface TopNavProps {
  activeNav: string;
  onSelectNav: (id: string) => void;
  onOpenSpecs: () => void;
  lightingMode?: 'ultra' | 'studio' | 'neon';
  onToggleLighting?: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeNav,
  onSelectNav,
  onOpenSpecs,
  lightingMode = 'ultra',
  onToggleLighting,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 pointer-events-auto">
      {/* Brand Zone: EOS Wordmark with Luminous White Lighting + Micro Kicker */}
      <div className="flex items-center gap-3 select-none">
        <div className="flex items-center gap-1.5">
          <span className="font-['Space_Grotesk'] text-2xl md:text-3xl font-extrabold tracking-tight text-lighting-white leading-none">
            eos
          </span>
          <span className="w-2 h-2 rounded-full bg-amber-400 mt-1 shadow-[0_0_12px_rgba(251,191,36,0.95)]" />
        </div>
        <div className="hidden sm:flex flex-col gap-0.5 text-[9px] tracking-[0.22em] uppercase font-bold text-white/70 leading-normal border-l border-white/20 pl-3">
          <span className="text-lighting-white">A Study In</span>
          <span className="text-lighting-amber">Vision</span>
        </div>
      </div>

      {/* Center-Right Nav Pills + Action Button */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Navigation Pills */}
        <nav className="hidden lg:flex items-center gap-2" aria-label="Feature navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'specs') {
                    onOpenSpecs();
                  } else {
                    onSelectNav(item.id);
                  }
                }}
                className={`glass-pill px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-wider transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'text-lighting-amber border-amber-400/50 bg-amber-500/20'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Text Lighting Mode Toggle Button */}
        {onToggleLighting && (
          <button
            onClick={onToggleLighting}
            className="glass-pill px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer flex items-center gap-1.5 border-cyan-400/40 bg-cyan-950/30 text-cyan-200 hover:text-white"
            title="Switch typography lighting style (Ultra, Neon, Studio)"
            aria-label="Toggle typography lighting"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
            <span className="text-lighting-cyan font-mono">{lightingMode.toUpperCase()}<span className="hidden sm:inline"> LIGHT</span></span>
          </button>
        )}

        {/* Tech Specs Action Button */}
        <button
          onClick={onOpenSpecs}
          className="glass-pill px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase text-white hover:text-amber-300 transition-all duration-200 cursor-pointer flex items-center gap-1.5"
          aria-label="Open camera technical specifications"
        >
          <span>TECH SPECS</span>
          <span className="text-[10px] text-amber-400 font-mono">↗</span>
        </button>
      </div>
    </header>
  );
};
