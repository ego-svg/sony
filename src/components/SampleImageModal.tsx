import React, { useEffect } from 'react';
import { SampleImage } from '../types';

interface SampleImageModalProps {
  image: SampleImage | null;
  onClose: () => void;
  onSelectImage?: (img: SampleImage) => void;
  allImages?: SampleImage[];
}

export const SampleImageModal: React.FC<SampleImageModalProps> = ({
  image,
  onClose,
  onSelectImage,
  allImages = [],
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (!image || allImages.length === 0) return;
      const currentIndex = allImages.findIndex((img) => img.id === image.id);
      if (e.key === 'ArrowRight' && onSelectImage) {
        const next = allImages[(currentIndex + 1) % allImages.length];
        onSelectImage(next);
      } else if (e.key === 'ArrowLeft' && onSelectImage) {
        const prev = allImages[(currentIndex - 1 + allImages.length) % allImages.length];
        onSelectImage(prev);
      }
    };

    if (image) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [image, allImages, onClose, onSelectImage]);

  if (!image) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="sample-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-xl animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="glass-panel-ref w-full max-w-5xl rounded-[32px] overflow-hidden flex flex-col md:flex-row border border-white/20 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close image preview"
          className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white border border-white/20 flex items-center justify-center transition-colors cursor-pointer"
        >
          ✕
        </button>

        {/* Left Side: High-Resolution Visual Stage */}
        <div className="relative md:w-3/5 bg-black/50 flex items-center justify-center p-4 sm:p-6 min-h-[340px] md:min-h-[520px]">
          <img
            src={image.src}
            alt={image.title}
            className="max-h-[70vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl"
          />

          {/* Category Chip Overlay */}
          <div className="absolute bottom-6 left-6 glass-pill px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider text-amber-300">
            {image.category}
          </div>
        </div>

        {/* Right Side: Editorial Info & Technical Specs */}
        <div className="md:w-2/5 p-6 md:p-8 flex flex-col justify-between space-y-6 bg-gradient-to-b from-white/[0.03] to-transparent">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-amber-400">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>Authentic Captured Asset</span>
            </div>

            <h3
              id="sample-modal-title"
              className="font-['Space_Grotesk'] text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-snug"
            >
              {image.title}
            </h3>

            <p className="text-white/75 text-xs md:text-sm leading-relaxed">
              {image.description}
            </p>

            {/* Spec Sheet Grid */}
            <div className="pt-2">
              <h4 className="text-[10px] tracking-widest uppercase font-bold text-white/50 mb-2">
                Capture Metadata & Sensor Parameters
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 flex flex-col">
                  <span className="text-white/45 text-[10px] uppercase tracking-wider">Aperture</span>
                  <span className="font-mono text-white font-semibold">{image.specs.aperture}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 flex flex-col">
                  <span className="text-white/45 text-[10px] uppercase tracking-wider">Shutter Speed</span>
                  <span className="font-mono text-white font-semibold">{image.specs.shutter}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 flex flex-col">
                  <span className="text-white/45 text-[10px] uppercase tracking-wider">Sensitivity</span>
                  <span className="font-mono text-white font-semibold">{image.specs.iso}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 flex flex-col">
                  <span className="text-white/45 text-[10px] uppercase tracking-wider">Sensor Payload</span>
                  <span className="font-mono text-amber-300 font-semibold">{image.specs.format}</span>
                </div>
              </div>
            </div>

            {/* Lens System */}
            <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs flex justify-between items-center">
              <span className="text-white/50">Mounted Optics:</span>
              <span className="font-mono text-white/90 font-medium">{image.specs.lens}</span>
            </div>
          </div>

          {/* Bottom Thumbnails Carousel Switcher */}
          {allImages.length > 1 && onSelectImage && (
            <div className="pt-4 border-t border-white/10 space-y-2">
              <div className="text-[10px] tracking-wider uppercase text-white/50 font-bold">
                Select Specimen
              </div>
              <div className="flex items-center gap-2">
                {allImages.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onSelectImage(item)}
                    className={`relative w-14 h-14 rounded-xl overflow-hidden border transition-all cursor-pointer ${
                      item.id === image.id
                        ? 'border-amber-400 ring-2 ring-amber-400/30 scale-105'
                        : 'border-white/20 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
