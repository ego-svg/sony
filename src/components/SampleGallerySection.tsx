import React from 'react';
import { SampleImage } from '../types';
import { SAMPLE_IMAGES } from '../constants/cameraData';

interface SampleGallerySectionProps {
  onSelectImage: (image: SampleImage) => void;
}

export const SampleGallerySection: React.FC<SampleGallerySectionProps> = ({
  onSelectImage,
}) => {
  return (
    <section className="relative w-full py-24 px-6 md:px-16 lg:px-24 bg-gradient-to-b from-[#0c0402] via-[#140804] to-black border-t border-white/15">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2 text-xs tracking-[0.25em] uppercase font-bold">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_10px_rgba(251,191,36,0.9)]" />
              <span className="text-lighting-amber font-extrabold">Authentic Visual Proof</span>
            </div>
            <h2 className="font-['Space_Grotesk'] text-3xl md:text-5xl font-black text-lighting-white tracking-tight">
              Captured Detail &amp; Hardware Specimens
            </h2>
            <p className="text-white/80 text-sm md:text-base leading-relaxed">
              Real high-resolution assets showcasing optical lens resolution, fabric textures,
              low-light sensor noise control, and physical camera engineering.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-white/50">
            <span className="text-amber-400 font-bold">03</span>
            <span>SPECIMENS LOADED</span>
          </div>
        </div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SAMPLE_IMAGES.map((sample, idx) => (
            <div
              key={sample.id}
              className="glass-panel-ref rounded-[28px] overflow-hidden flex flex-col group hover:border-amber-400/40 transition-all duration-300"
            >
              {/* Image Preview Area */}
              <div
                className="relative aspect-[4/5] bg-black/60 overflow-hidden cursor-pointer"
                onClick={() => onSelectImage(sample)}
              >
                <img
                  src={sample.src}
                  alt={sample.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Gradient Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#120a06] via-transparent to-black/30 pointer-events-none" />

                {/* Category Pill Tag */}
                <div className="absolute top-4 left-4 glass-pill px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider text-amber-300 z-10">
                  {sample.category}
                </div>

                {/* Index Pill */}
                <div className="absolute top-4 right-4 glass-pill w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-mono font-bold text-white/80 z-10">
                  0{idx + 1}
                </div>

                {/* Hover Inspect Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200 pointer-events-none">
                  <span className="glass-pill px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-xl">
                    Inspect Resolution ↗
                  </span>
                </div>
              </div>

              {/* Text & Metadata Container */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-2">
                  <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                    {sample.title}
                  </h3>
                  <p className="text-white/70 text-xs leading-relaxed line-clamp-3">
                    {sample.description}
                  </p>
                </div>

                {/* EXIF Mini Badges */}
                <div className="space-y-3 pt-3 border-t border-white/10">
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.04]">
                      <span className="text-white/40">ISO</span>
                      <span className="text-white font-medium">{sample.specs.iso}</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.04]">
                      <span className="text-white/40">SHUTTER</span>
                      <span className="text-white font-medium">{sample.specs.shutter}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectImage(sample)}
                    className="w-full glass-pill py-2.5 rounded-full text-xs font-semibold text-white/90 hover:text-white flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <span>View Capture Specs</span>
                    <span className="text-amber-300">→</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
