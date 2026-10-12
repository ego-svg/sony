import React, { useEffect } from 'react';
import { TECH_SPECS } from '../constants/cameraData';

interface TechSpecsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TechSpecsModal: React.FC<TechSpecsModalProps> = ({
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/75 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="glass-panel w-full max-w-3xl max-h-[85vh] rounded-3xl p-6 md:p-10 overflow-y-auto relative text-white border border-white/20 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div>
            <div className="text-[10px] tracking-[0.2em] uppercase font-bold text-amber-400">
              Technical Specifications
            </div>
            <h2
              id="modal-title"
              className="font-['Space_Grotesk'] text-2xl md:text-3xl font-extrabold text-white mt-1"
            >
              Canon EOS 60D Specifications
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-white/20 hover:border-white/50 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
            aria-label="Close specifications modal"
          >
            ✕
          </button>
        </div>

        {/* Spec Categories */}
        <div className="mt-6 space-y-8">
          {TECH_SPECS.map((cat) => (
            <div key={cat.title} className="space-y-3">
              <h3 className="text-xs uppercase tracking-widest font-bold text-amber-300/90 border-b border-white/10 pb-1">
                {cat.title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {cat.items.map((item) => (
                  <div
                    key={item.label}
                    className="p-3 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-1"
                  >
                    <span className="text-white/50">{item.label}</span>
                    <span className="font-medium text-white/95">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="glass-pill px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white hover:text-amber-400 cursor-pointer"
          >
            Close Specs
          </button>
        </div>
      </div>
    </div>
  );
};
