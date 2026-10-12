/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { TopNav } from './components/TopNav';
import { HudCard } from './components/HudCard';
import { StageTypography } from './components/StageTypography';
import { ScrollVideoBackground, ScrollVideoBackgroundRef } from './components/ScrollVideoBackground';
import { BottomControls } from './components/BottomControls';
import { TechSpecsModal } from './components/TechSpecsModal';
import { SampleGallerySection } from './components/SampleGallerySection';
import { SampleImageModal } from './components/SampleImageModal';
import { CHAPTERS, TECH_SPECS, SAMPLE_IMAGES } from './constants/cameraData';
import { SampleImage } from './types';

export default function App() {
  const [activeNav, setActiveNav] = useState('sensor');
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  const [isHudExpanded, setIsHudExpanded] = useState(false);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedSampleImage, setSelectedSampleImage] = useState<SampleImage | null>(null);
  const [lightingMode, setLightingMode] = useState<'ultra' | 'neon' | 'studio'>('ultra');

  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const videoBgRef = useRef<ScrollVideoBackgroundRef>(null);
  const rafIdRef = useRef<number | null>(null);

  // Map scroll progress to active chapter index across 12 chapters
  const calculateChapterIndex = (p: number): number => {
    return Math.min(11, Math.max(0, Math.floor(p * 12)));
  };

  const handleScroll = useCallback(() => {
    if (rafIdRef.current !== null) return;

    rafIdRef.current = requestAnimationFrame(() => {
      rafIdRef.current = null;
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      // Calculate normalized progress [0.0, 1.0]
      const rawProgress = -rect.top / totalScrollable;
      const progress = Math.max(0, Math.min(1, rawProgress));

      // Seek video background imperatively (avoids React re-render overhead)
      videoBgRef.current?.seekToProgress(progress);

      // Update state for progress display
      setScrollProgress(progress);

      // Check if chapter changed
      const newIndex = calculateChapterIndex(progress);
      setCurrentChapterIndex((prev) => (prev !== newIndex ? newIndex : prev));
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    // Initial calculation on mount
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [handleScroll]);

  const activeChapter = CHAPTERS[currentChapterIndex] || CHAPTERS[0];

  // Smooth scroll to chapter target
  const scrollToChapter = (targetProgress: number) => {
    if (!containerRef.current) return;
    const totalScrollable = containerRef.current.clientHeight - window.innerHeight;
    const targetY = containerRef.current.offsetTop + targetProgress * totalScrollable;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  const handleSelectNav = (id: string) => {
    setActiveNav(id);
    if (id === 'sensor') {
      scrollToChapter(0.0);
    } else if (id === 'video') {
      scrollToChapter(0.48); // Jump to CREATE / LCD screen chapter
    } else if (id === 'af') {
      scrollToChapter(0.78); // Jump to Exploded internal architecture chapter
    } else if (id === 'samples') {
      if (galleryRef.current) {
        galleryRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleScrollHintClick = () => {
    if (scrollProgress >= 0.95) {
      if (galleryRef.current) {
        galleryRef.current.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      scrollToChapter(scrollProgress + 0.18);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#0c0402] text-white selection:bg-amber-400 selection:text-black">
      {/* Top Persistent Chrome Navigation */}
      <TopNav
        activeNav={activeNav}
        onSelectNav={handleSelectNav}
        onOpenSpecs={() => setIsSpecsOpen(true)}
        lightingMode={lightingMode}
        onToggleLighting={() =>
          setLightingMode((prev) =>
            prev === 'ultra' ? 'neon' : prev === 'neon' ? 'studio' : 'ultra'
          )
        }
      />

      {/* =========================================================================
          SECTION 1: SCROLL-DRIVEN CINEMATIC EXPERIENCE CONTAINER (Height: 650vh)
          ========================================================================= */}
      <section
        ref={containerRef}
        className="relative w-full h-[650vh]"
        aria-label="Canon EOS 60D Interactive Scroll Story"
      >
        {/* Sticky Full-Viewport Stage Frame */}
        <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between">
          {/* Full-Screen Scroll Video Background Layer */}
          <ScrollVideoBackground
            ref={videoBgRef}
            src="/video.mp4"
            poster="/images/detail-cameras.jpg"
          />

          {/* Giant Cyan Display Typography Background Layer with Luminous Stage Lighting */}
          <StageTypography title={activeChapter.stageTitle} lightingMode={lightingMode} />

          {/* Main Content Area (Glass HUD & Story Stage) */}
          <main className="relative flex-1 w-full max-w-[1520px] mx-auto px-4 sm:px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between pt-20 sm:pt-24 pb-16 sm:pb-20 z-20 overflow-hidden pointer-events-none">
            {/* Left Side: Floating Dark Obsidian Glass HUD Card */}
            <div className="w-full lg:w-auto flex justify-start items-center z-30 pt-2 lg:pt-0 pointer-events-auto">
              <HudCard
                data={activeChapter}
                isExpanded={isHudExpanded}
                onCtaClick={() => setIsHudExpanded((prev) => !prev)}
                onOpenSampleImage={(img) => setSelectedSampleImage(img)}
              />
            </div>

            {/* Right Side: Interactive HUD Spatial Indicator Pill with Glowing Lighting */}
            <div className="w-full lg:flex-1 hidden md:flex justify-end items-end pb-4 z-20 pointer-events-auto">
              <div className="glass-pill px-4 py-2 rounded-full flex items-center gap-3 text-xs tracking-wider uppercase font-semibold text-white/90">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
                <span className="text-lighting-white">SCROLL SCRUB: {Math.round(scrollProgress * 100)}%</span>
                <span className="text-white/40">|</span>
                <span className="text-lighting-amber font-mono font-bold">FRAME LOCKED</span>
              </div>
            </div>
          </main>

          {/* Bottom Persistent Chrome Controls */}
          <BottomControls
            currentChapter={activeChapter.chapterNumber}
            totalChapters={activeChapter.totalChapters}
            onScrollHintClick={handleScrollHintClick}
          />

          {/* Subtle Bottom Scrub Progress Indicator Bar */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-40 pointer-events-none"
            aria-hidden="true"
          >
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-cyan-400 transition-all duration-75 ease-out"
              style={{ width: `${Math.round(scrollProgress * 100)}%` }}
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: AUTHENTIC VISUAL PROOF & HARDWARE SPECIMENS (USER ASSETS)
          ========================================================================= */}
      <div ref={galleryRef}>
        <SampleGallerySection
          onSelectImage={(img) => setSelectedSampleImage(img)}
        />
      </div>

      {/* =========================================================================
          SECTION 3: ENGINEERING BREAKDOWN & SPECIFICATIONS
          ========================================================================= */}
      <section className="relative z-30 w-full min-h-screen bg-black/95 border-t border-white/15 px-6 md:px-16 lg:px-24 py-24 flex flex-col justify-center">
        <div className="max-w-6xl mx-auto w-full space-y-16">
          {/* Section Kicker & Title */}
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2 text-xs tracking-[0.24em] uppercase font-bold text-amber-400">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Full Engineering Breakdown</span>
            </div>
            <h2 className="font-['Space_Grotesk'] text-4xl md:text-5xl font-black text-white tracking-tight">
              Master the Craft of Precision Imaging
            </h2>
            <p className="text-white/70 text-base leading-relaxed">
              From the 18.0 megapixel APS-C CMOS sensor to the articulated Clear View LCD and
              rugged ergonomics, the EOS 60D empowers photographers to discover new angles.
            </p>
          </div>

          {/* Specification Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TECH_SPECS.slice(0, 3).map((spec) => (
              <div
                key={spec.title}
                className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4 hover:border-amber-400/30 transition-colors"
              >
                <h3 className="text-xs uppercase tracking-widest font-bold text-amber-300 border-b border-white/10 pb-2">
                  {spec.title}
                </h3>
                <div className="space-y-3 text-xs">
                  {spec.items.map((item) => (
                    <div key={item.label} className="flex flex-col gap-0.5">
                      <span className="text-white/50 text-[11px]">{item.label}</span>
                      <span className="text-white font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Outro Action Strip */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="font-['Space_Grotesk'] text-2xl font-bold tracking-tight text-white">
                eos 60d
              </span>
              <span className="text-xs text-white/50 tracking-widest uppercase">
                A Legacy in Every Shot
              </span>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => scrollToChapter(0.0)}
                className="glass-pill px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white hover:text-amber-300 transition-colors cursor-pointer"
              >
                ↑ Back to Opening
              </button>
              <button
                onClick={() => setIsSpecsOpen(true)}
                className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500 hover:bg-amber-400 text-black transition-colors cursor-pointer"
              >
                View Full Specs ↗
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications Full Modal */}
      <TechSpecsModal
        isOpen={isSpecsOpen}
        onClose={() => setIsSpecsOpen(false)}
      />

      {/* High-Resolution Sample Image Inspector Modal */}
      <SampleImageModal
        image={selectedSampleImage}
        onClose={() => setSelectedSampleImage(null)}
        onSelectImage={setSelectedSampleImage}
        allImages={SAMPLE_IMAGES}
      />
    </div>
  );
}
