import React from 'react';

interface StageTypographyProps {
  title: string;
  lightingMode?: 'ultra' | 'studio' | 'neon';
}

export const StageTypography: React.FC<StageTypographyProps> = ({
  title,
  lightingMode = 'ultra',
}) => {
  // Dynamically scale font size if the stage title contains longer phrases
  const isLong = title.length > 8;

  return (
    <div
      className="absolute inset-0 pointer-events-none select-none z-10 overflow-hidden flex flex-col justify-start lg:justify-center items-end px-6 sm:px-10 lg:pr-14 xl:pr-20 pt-20 lg:pt-0"
      aria-hidden="true"
    >
      {/* Dynamic Lighting Projection Aura behind text (strictly on right stage half) */}
      <div className="absolute right-0 lg:right-6 top-1/4 lg:top-1/2 -translate-y-1/2 w-[50vw] lg:w-[40vw] h-[35vh] text-aura-cyan pointer-events-none rounded-full transform -rotate-6 scale-105" />

      {/* Main Display Typography Container - strictly constrained to right quadrant to never collide with left HUD card */}
      <div className="relative w-full max-w-full lg:max-w-[46vw] xl:max-w-[42vw] flex flex-col items-end text-right transform lg:-translate-y-4">
        {/* Subtle mobile watermark / full desktop illuminated title */}
        <h2
          className={`font-['Space_Grotesk'] font-black uppercase tracking-tight text-right transition-all duration-300 ${
            isLong
              ? 'text-3xl sm:text-4xl md:text-5xl lg:text-[4vw] xl:text-[4.5vw] leading-[1.08]'
              : 'text-4xl sm:text-5xl md:text-6xl lg:text-[5vw] xl:text-[5.5vw] leading-[1.04]'
          } ${
            // Mobile: subtle atmospheric watermark so it never collides with HUD card. Desktop: bright illuminated spotlight
            'opacity-20 sm:opacity-30 lg:opacity-95'
          } ${
            lightingMode === 'ultra'
              ? 'text-lighting-cyan-ultra animate-pulse-glow'
              : lightingMode === 'neon'
              ? 'text-lighting-cyan'
              : 'text-lighting-cyan drop-shadow-[0_15px_30px_rgba(0,0,0,0.85)]'
          }`}
        >
          {title}
        </h2>

        {/* Ambient Specular Highlight line underneath (desktop only) */}
        <div className="hidden lg:block mt-3 w-full max-w-[240px] h-[2px] bg-gradient-to-r from-transparent via-cyan-400/75 to-transparent blur-[0.5px]" />
      </div>
    </div>
  );
};
