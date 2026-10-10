import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { POSTER_COLLECTION } from '../data/portfolioData';
import { PosterItem } from '../types/portfolio';
import { Sparkles, ArrowRight, ArrowLeft, Maximize2, Layers } from 'lucide-react';
import { playPaperRustle, playWhooshSound, playClickSound } from '../utils/audio';

interface PosterPaperStackProps {
  onSelectPoster: (poster: PosterItem) => void;
}

export const PosterPaperStack: React.FC<PosterPaperStackProps> = ({ onSelectPoster }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [manualScrub, setManualScrub] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Calculate active poster from scroll progress
  useEffect(() => {
    if (manualScrub !== null) return;
    const unsubscribe = scrollYProgress.on('change', (progress) => {
      // Divide progress evenly among posters
      const total = POSTER_COLLECTION.length;
      const index = Math.min(Math.floor(progress * total), total - 1);
      if (index !== activeIndex && index >= 0) {
        setActiveIndex(index);
        playPaperRustle(0.4);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, activeIndex, manualScrub]);

  const goToNext = () => {
    playWhooshSound();
    playPaperRustle(0.5);
    setActiveIndex((prev) => (prev + 1) % POSTER_COLLECTION.length);
  };

  const goToPrev = () => {
    playWhooshSound();
    playPaperRustle(0.5);
    setActiveIndex((prev) => (prev - 1 + POSTER_COLLECTION.length) % POSTER_COLLECTION.length);
  };

  const handlePosterSelect = (index: number) => {
    playClickSound();
    playPaperRustle(0.5);
    setActiveIndex(index);
  };

  const activePoster = POSTER_COLLECTION[activeIndex];

  return (
    <section
      id="posters"
      ref={containerRef}
      className="relative min-h-[220vh] bg-[#080808] text-white"
    >
      {/* Ambient Floor Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#ccff00]/5 rounded-full blur-[160px]" />
      </div>

      {/* Pinned Stage for Stack Animation */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-12 px-4 md:px-10 max-w-7xl mx-auto overflow-hidden">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-800/80 pb-5 z-20">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#ccff00] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>04. Dedicated Poster Series</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white">
              POSTER <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-[#ccff00]">
                DESIGN STACK
              </span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-xs font-mono text-neutral-400 max-w-xs">
              Scroll down to peel posters off the physical stack. Posters fly forward in 3D and return on reverse scroll.
            </p>

            {/* Poster Navigation Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={goToPrev}
                className="p-2.5 rounded-lg border border-neutral-800 bg-neutral-900/80 hover:border-[#ccff00] hover:text-[#ccff00] transition-all"
                aria-label="Previous Poster"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <span className="font-mono text-xs px-2 text-[#ccff00]">
                0{activeIndex + 1} / 0{POSTER_COLLECTION.length}
              </span>
              <button
                onClick={goToNext}
                className="p-2.5 rounded-lg border border-neutral-800 bg-neutral-900/80 hover:border-[#ccff00] hover:text-[#ccff00] transition-all"
                aria-label="Next Poster"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 3D Stack Stage: Center-Left Stack & Right Metadata Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto z-10">
          {/* Left: Physical 3D Paper Stack */}
          <div className="lg:col-span-7 flex items-center justify-center relative min-h-[460px] md:min-h-[520px]">
            {/* The 3D Layered Sheets */}
            <div
              className="relative w-64 sm:w-72 md:w-84 aspect-[3/4] preserve-3d"
              style={{ perspective: 1600 }}
            >
              {POSTER_COLLECTION.map((poster, index) => {
                const isSelected = index === activeIndex;
                const isPast = index < activeIndex;
                const isUpcoming = index > activeIndex;

                // 3D positioning calculation
                // Selected poster flies forward (+Z), centers, and tilts slightly
                // Past posters fly off-screen to the left/top
                // Upcoming posters stay in the resting overlapping pile with stacked offsets
                let transformStyle = '';
                let zIndex = 10;
                let opacity = 1;

                if (isSelected) {
                  transformStyle = 'translate3d(20px, -10px, 120px) rotateY(-8deg) rotateX(4deg) scale(1.08)';
                  zIndex = 40;
                } else if (isPast) {
                  // Flown away past posters
                  transformStyle = `translate3d(-240px, -80px, ${-60 * (activeIndex - index)}px) rotateY(-25deg) rotateZ(-12deg) scale(0.85)`;
                  opacity = 0.2;
                  zIndex = 5;
                } else {
                  // Upcoming resting posters in stack
                  const stackOffset = (index - activeIndex);
                  transformStyle = `translate3d(${stackOffset * 14}px, ${stackOffset * 10}px, ${-stackOffset * 40}px) rotateZ(${poster.initialRotation}deg) scale(${1 - stackOffset * 0.04})`;
                  zIndex = 30 - stackOffset;
                  opacity = Math.max(0.4, 1 - stackOffset * 0.2);
                }

                return (
                  <motion.div
                    key={poster.id}
                    onClick={() => handlePosterSelect(index)}
                    className="absolute inset-0 rounded-xl overflow-hidden cursor-pointer transition-all duration-700 ease-out preserve-3d group shadow-2xl"
                    style={{
                      transform: transformStyle,
                      zIndex,
                      opacity,
                    }}
                  >
                    {/* Real Poster Artwork */}
                    <img
                      src={poster.image}
                      alt={poster.title}
                      className="w-full h-full object-cover filter contrast-105 select-none"
                    />

                    {/* Paper Edges & Fold Crease Shading */}
                    <div className="absolute inset-0 pointer-events-none border border-white/20 rounded-xl shadow-[inset_0_0_20px_rgba(0,0,0,0.6)]" />

                    {/* Subtle Plastic/Paper Sheen Gradient */}
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-70" />

                    {/* Corner Tag */}
                    <div className="absolute top-3 left-3 px-2 py-1 bg-black/80 backdrop-blur-md rounded border border-white/20 text-[10px] font-mono text-[#ccff00]">
                      0{index + 1}
                    </div>

                    {/* Hover Inspect Affordance */}
                    {isSelected && (
                      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectPoster(poster);
                          }}
                          className="p-2 rounded-full bg-black/80 text-[#ccff00] border border-[#ccff00]/60 hover:scale-110 transition-transform shadow-lg"
                          title="Open Case Study"
                        >
                          <Maximize2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right: Dynamic Poster Case Details Panel */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePoster.id}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6 md:p-8 shadow-2xl space-y-5"
              >
                {/* Meta Top Line */}
                <div className="flex items-center justify-between text-xs font-mono border-b border-neutral-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[#ccff00] font-bold">POSTER 0{activeIndex + 1}</span>
                    <span className="text-neutral-600">/</span>
                    <span className="text-neutral-400">{activePoster.year}</span>
                  </div>
                  <span className="text-neutral-400 font-mono">{activePoster.dimensions}</span>
                </div>

                {/* Poster Title & Category */}
                <div>
                  <h3 className="font-display font-black text-2xl sm:text-3xl md:text-4xl uppercase text-white tracking-tight">
                    {activePoster.title}
                  </h3>
                  <p className="text-xs font-mono text-[#ccff00] mt-1">
                    {activePoster.software}
                  </p>
                </div>

                {/* Concept Brief */}
                <div className="space-y-2 text-sm text-neutral-300 leading-relaxed font-normal">
                  <p>{activePoster.description}</p>
                  <p className="text-xs text-neutral-400 italic">
                    "{activePoster.concept}"
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {activePoster.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded bg-neutral-800/80 text-[11px] font-mono text-neutral-300 border border-neutral-700/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action CTA */}
                <div className="pt-2">
                  <button
                    onClick={() => onSelectPoster(activePoster)}
                    className="w-full py-3 rounded bg-neutral-800 hover:bg-[#ccff00] hover:text-black font-mono text-xs uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2 group"
                  >
                    <span>View Poster Details</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Interactive Thumbnail Strip */}
        <div className="z-20 pt-4 border-t border-neutral-800/80 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-x-auto py-1">
            <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider hidden sm:inline">
              Collection:
            </span>
            {POSTER_COLLECTION.map((poster, index) => (
              <button
                key={poster.id}
                onClick={() => handlePosterSelect(index)}
                className={`relative px-3 py-1.5 rounded text-xs font-mono transition-all flex items-center gap-2 shrink-0 ${
                  index === activeIndex
                    ? 'bg-[#ccff00] text-black font-bold shadow-[0_0_12px_rgba(204,255,0,0.3)]'
                    : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                }`}
              >
                <span>0{index + 1}</span>
                <span className="hidden md:inline">{poster.title}</span>
              </button>
            ))}
          </div>

          <div className="text-xs font-mono text-neutral-500 hidden sm:flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#ccff00]" />
            <span>Interactive 3D Stack</span>
          </div>
        </div>
      </div>
    </section>
  );
};
