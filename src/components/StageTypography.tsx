import React from 'react';

interface StageTypographyProps {
  title: string;
  lightingMode?: 'ultra' | 'studio' | 'neon';
}

export const StageTypography: React.FC<StageTypographyProps> = ({
  title,
  lightingMode = 'ultra',
}) => {
  return (
    <div
      className="absolute inset-0 pointer-events-none select-none z-10 overflow-hidden flex flex-col justify-start lg:justify-center items-center lg:items-end px-6 lg:pr-16 xl:pr-24 pt-24 sm:pt-28 lg:pt-0"
      aria-hidden="true"
    >
      {/* Dynamic Lighting Projection Aura behind text (positioned in right stage half) */}
      <div className="absolute right-0 lg:right-10 top-1/3 lg:top-1/2 -translate-y-1/2 w-[60vw] lg:w-[45vw] h-[40vh] text-aura-cyan pointer-events-none rounded-full transform -rotate-6 scale-105" />

      {/* Main Display Typography Container - Constrained to prevent colliding with HUD card */}
      <div className="relative max-w-[90vw] lg:max-w-[52vw] xl:max-w-[48vw] text-center lg:text-right transform lg:-translate-y-6">
        {/* Single Crisp Lighting Surface with Specular Rim and Gradient Lighting (No duplicate overlapping h2) */}
        <h2
          className={`font-['Space_Grotesk'] text-[11vw] sm:text-[9vw] lg:text-[7.5vw] xl:text-[6.8vw] font-black uppercase tracking-[-0.03em] leading-[1.05] whitespace-nowrap overflow-visible ${
            lightingMode === 'ultra'
              ? 'text-lighting-cyan-ultra animate-pulse-glow opacity-85 lg:opacity-95'
              : lightingMode === 'neon'
              ? 'text-lighting-cyan opacity-80 lg:opacity-90'
              : 'text-lighting-cyan drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] opacity-75 lg:opacity-85'
          }`}
        >
          {title}
        </h2>

        {/* Ambient Specular Highlight line underneath */}
        <div className="mt-2 ml-auto w-full max-w-[280px] h-[2px] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent blur-[1px]" />
      </div>
    </div>
  );
};
