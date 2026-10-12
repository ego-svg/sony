import React from 'react';
import { ChapterData, SampleImage } from '../types';
import { SAMPLE_IMAGES } from '../constants/cameraData';

interface HudCardProps {
  data: ChapterData;
  onCtaClick?: () => void;
  isExpanded?: boolean;
  onOpenSampleImage?: (image: SampleImage) => void;
}

export const HudCard: React.FC<HudCardProps> = ({
  data,
  onCtaClick,
  isExpanded = false,
  onOpenSampleImage,
}) => {
  return (
    <aside
      className="glass-panel-ref w-full max-w-[360px] sm:max-w-[400px] max-h-[calc(100vh-170px)] overflow-y-auto rounded-[32px] p-6 sm:p-7 flex flex-col gap-4 text-white pointer-events-auto transition-all duration-300 relative select-none scrollbar-thin"
      aria-labelledby="hud-heading"
    >
      {/* Top Kicker Tag with Amber Dot & Luminous Glow */}
      <div className="flex items-center gap-2 text-[11px] tracking-[0.14em] uppercase font-bold select-none">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_12px_rgba(251,191,36,0.95)]" />
        <span className="text-lighting-amber font-extrabold tracking-[0.16em]">{data.kicker}</span>
      </div>

      {/* Headline: Line 1 Bold Space Grotesk + Line 2 Editorial Italic Serif with Studio Light Bloom (No overlap) */}
      <div className="flex flex-col gap-1 sm:gap-1.5 py-0.5">
        <h1
          id="hud-heading"
          className="font-['Space_Grotesk'] text-[28px] sm:text-[34px] font-extrabold tracking-[-0.02em] text-lighting-white leading-[1.18] sm:leading-[1.2] block pb-0.5"
        >
          {data.headline}
        </h1>
        {data.headlineSecondLine && (
          <span className="font-['Newsreader'] italic font-normal text-[28px] sm:text-[34px] tracking-[-0.01em] text-lighting-white leading-[1.22] sm:leading-[1.25] block pt-0.5">
            {data.headlineSecondLine}
          </span>
        )}
      </div>

      {/* Body Description */}
      <p className="text-[13px] sm:text-[13.5px] leading-[1.54] text-white/80 font-normal">
        {data.body}
      </p>

      {/* Action Glass Pill Button with Downward Arrow */}
      <div className="pt-0.5">
        <button
          onClick={onCtaClick}
          className="glass-pill w-full flex items-center justify-between px-4 py-2.5 rounded-full text-xs font-semibold text-white/95 hover:text-white transition-all duration-200 cursor-pointer group"
        >
          <span>{data.ctaText}</span>
          <span className="text-white/80 group-hover:translate-y-0.5 transition-transform duration-200 text-sm font-mono">
            ↓
          </span>
        </button>
      </div>

      {/* Interactive Photo Specimen Thumbnails Strip (from Reference Scene 4 & 5) */}
      <div className="pt-1 border-t border-white/10 flex flex-col gap-2">
        <div className="flex items-center justify-between text-[10px] tracking-widest uppercase font-bold text-white/50">
          <span>Captured Samples</span>
          <span className="text-amber-400/90 font-mono text-[9px]">3 VERIFIED SHOTS</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {SAMPLE_IMAGES.map((sample) => (
            <button
              key={sample.id}
              onClick={() => onOpenSampleImage?.(sample)}
              className="group relative rounded-xl overflow-hidden border border-white/15 hover:border-amber-400/80 transition-all duration-200 aspect-[4/3] bg-black/40 cursor-pointer focus:outline-none focus:ring-1 focus:ring-amber-400"
              title={`View sample: ${sample.title}`}
            >
              <img
                src={sample.src}
                alt={sample.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />
              <div className="absolute bottom-1 left-1.5 right-1.5 flex justify-between items-center text-[9px] font-mono text-white/90">
                <span className="truncate">{sample.specs.iso}</span>
                <span className="text-amber-300 font-bold">↗</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Expandable Technical Details Drawer */}
      {isExpanded && (
        <div className="pt-2 border-t border-white/10 text-xs text-white/80 space-y-1.5 animate-fadeIn">
          <div className="flex justify-between py-1 border-b border-white/5">
            <span className="text-white/50">Pixel Dimensions</span>
            <span className="font-mono text-amber-300 font-semibold">5184 × 3456 px</span>
          </div>
          <div className="flex justify-between py-1 border-b border-white/5">
            <span className="text-white/50">Pixel Pitch</span>
            <span className="font-mono text-amber-300 font-semibold">4.3 µm square</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-white/50">A/D Conversion</span>
            <span className="font-mono text-amber-300 font-semibold">14-bit high dynamic range</span>
          </div>
        </div>
      )}

      {/* Bottom Spec Metric Strip Matching Reference */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between">
        <div className="flex items-baseline gap-2 select-none">
          <span className="font-['Space_Grotesk'] text-2xl font-black text-lighting-amber tracking-tight">
            {data.specValue || '18.0'}
          </span>
          <span className="text-[10px] tracking-[0.12em] uppercase font-bold text-white/90 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
            {data.specUnit || data.specBadge}
          </span>
        </div>

        <button
          onClick={onCtaClick}
          className="w-7 h-7 rounded-full border border-white/20 hover:border-white/50 hover:bg-white/10 flex items-center justify-center text-xs text-white/80 hover:text-white transition-all cursor-pointer"
          title="Toggle sensor specifications"
          aria-label="Expand technical specs"
        >
          {isExpanded ? '−' : '+'}
        </button>
      </div>
    </aside>
  );
};
