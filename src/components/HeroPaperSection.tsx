import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useVelocity } from 'motion/react';
import { ArrowDown, Sparkles, RefreshCw, Eye, Send } from 'lucide-react';
import { HERO_DESIGNER_IMG, PAPER_SHEET_IMG } from '../data/portfolioData';
import { TechnicalPhotoBackdrop } from './TechnicalPhotoBackdrop';
import { playPaperRustle, playClickSound } from '../utils/audio';

interface HeroPaperSectionProps {
  onViewWork: () => void;
}

export const HeroPaperSection: React.FC<HeroPaperSectionProps> = ({ onViewWork }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track if paper has reached 100% open state (persists until next page reload)
  const [hasFullyOpened, setHasFullyOpened] = useState(false);
  const [manualScrub, setManualScrub] = useState<number | null>(null);

  // Scroll tracking
  const { scrollYProgress, scrollY } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Scroll velocity for dynamic paper flutter / shaking when scrolling fast
  const scrollVelocity = useVelocity(scrollY);
  const flutterSpring = useSpring(0, { damping: 14, stiffness: 180 });

  // Progress motion value with smooth spring physics
  const rawProgress = useMotionValue(0);
  const smoothProgress = useSpring(rawProgress, { damping: 20, stiffness: 130 });

  // Interactive 3D mouse tilt when flat
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hasFullyOpened) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseTilt({ x: x * 6, y: -y * 6 });
  };

  const handleMouseLeave = () => {
    setMouseTilt({ x: 0, y: 0 });
  };

  useEffect(() => {
    if (hasFullyOpened) {
      rawProgress.set(1);
      return;
    }

    if (manualScrub !== null) {
      rawProgress.set(manualScrub);
      if (manualScrub >= 0.98) {
        setHasFullyOpened(true);
      }
      return;
    }

    const unsubscribeProgress = scrollYProgress.on('change', (latest) => {
      // Map 0 -> 0.65 scroll distance to 0 -> 1 unfold progress
      const mapped = Math.min(Math.max(latest / 0.65, 0), 1);
      rawProgress.set(mapped);

      if (mapped >= 0.98 && !hasFullyOpened) {
        setHasFullyOpened(true);
        playPaperRustle(0.7);
      }
    });

    const unsubscribeVelocity = scrollVelocity.on('change', (latestVel) => {
      // Flutter / shake intensity proportional to scroll speed
      const flutterAmount = Math.min(Math.max(latestVel / 160, -7), 7);
      flutterSpring.set(flutterAmount);

      if (Math.abs(latestVel) > 40 && Math.random() > 0.75) {
        playPaperRustle(Math.min(Math.abs(latestVel) / 800, 0.5));
      }
    });

    return () => {
      unsubscribeProgress();
      unsubscribeVelocity();
    };
  }, [scrollYProgress, scrollVelocity, manualScrub, hasFullyOpened, rawProgress, flutterSpring]);

  // Unified Paper Sheet 3D Transforms:
  // Starts crumpled, crushed in center (scale 0.42, 3D tilt, heavy shadow relief)
  // Smooths out, unrolls, and flattens into clean flat sheet filling container
  const paperScale = useTransform(smoothProgress, [0, 0.4, 0.8, 1], [0.42, 0.68, 0.92, 1]);
  const paperRotateX = useTransform(smoothProgress, [0, 0.5, 1], [38, 14, 0]);
  const paperRotateY = useTransform(smoothProgress, [0, 0.5, 1], [-28, -8, 0]);
  const paperRotateZ = useTransform(smoothProgress, [0, 0.5, 1], [12, 3, 0]);

  // Origami Corner Flaps peeling outward as user scrolls
  const flapTLRotate = useTransform(smoothProgress, [0, 0.5, 0.85], [-115, -45, 0]);
  const flapTRRotate = useTransform(smoothProgress, [0, 0.5, 0.85], [115, 45, 0]);
  const flapBLRotate = useTransform(smoothProgress, [0, 0.5, 0.85], [115, 45, 0]);
  const flapBRRotate = useTransform(smoothProgress, [0, 0.5, 0.85], [-115, -45, 0]);
  const flapOpacity = useTransform(smoothProgress, [0, 0.65, 0.95], [0.95, 0.6, 0]);

  // Central crease and crumple shadow intensity
  const creaseOpacity = useTransform(smoothProgress, [0, 0.55, 1], [0.95, 0.38, 0.05]);

  // Content clarity & filter as paper straightens out
  const contentFilter = useTransform(
    smoothProgress,
    [0, 0.35, 1],
    ['blur(3px) contrast(140%) brightness(85%)', 'blur(1px) contrast(115%) brightness(95%)', 'blur(0px) contrast(100%) brightness(100%)']
  );
  const contentOpacity = useTransform(smoothProgress, [0.15, 0.5, 1], [0.2, 0.8, 1]);

  const handleResetToCrumpled = () => {
    playClickSound();
    playPaperRustle(0.8);
    setHasFullyOpened(false);
    setManualScrub(0);
    rawProgress.set(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setManualScrub(null);
    }, 600);
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className={`relative w-full ${hasFullyOpened ? 'min-h-screen' : 'min-h-[200vh]'} bg-[#080808] overflow-hidden`}
    >
      {/* Clean, Minimalist Dark Background (Ensures Crumpled Paper Stands Out) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft centered depth spotlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-[#ccff00]/4 rounded-full blur-[180px]" />
        {/* Subtle architectural dot grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />
      </div>

      {/* Sticky Hero Stage */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center px-4 md:px-8 py-8 overflow-hidden">
        
        {/* 3D Paper Shadow on Floor */}
        <motion.div
          style={{
            scale: paperScale,
            opacity: useTransform(smoothProgress, [0, 1], [0.8, 0.4]),
          }}
          className="absolute w-72 sm:w-96 md:w-[600px] h-36 bg-black/90 rounded-full blur-3xl pointer-events-none -bottom-8"
        />

        {/* UNIFIED 3D PAPER SHEET CONTAINER */}
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            scale: paperScale,
            rotateX: hasFullyOpened ? mouseTilt.y : paperRotateX,
            rotateY: hasFullyOpened ? mouseTilt.x : paperRotateY,
            rotateZ: paperRotateZ,
            perspective: 1600,
          }}
          className="relative w-full max-w-6xl h-[86vh] max-h-[780px] preserve-3d transition-transform duration-100 ease-out"
        >
          {/* Scroll Velocity Flutter Physics */}
          <motion.div
            style={{
              rotateZ: flutterSpring,
            }}
            className="relative w-full h-full rounded-2xl overflow-hidden bg-[#0d0d0d] border border-neutral-800 shadow-[0_30px_100px_rgba(0,0,0,0.95)] preserve-3d"
          >
            {/* Real Wrinkled Paper Sheet Texture */}
            <div className="absolute inset-0 pointer-events-none z-10 opacity-35 mix-blend-screen select-none">
              <img
                src={PAPER_SHEET_IMG}
                alt="Paper Texture"
                className="w-full h-full object-cover filter contrast-125 brightness-110"
              />
            </div>

            {/* --- 4 ORIGAMI FOLD FLAPS (FOLDED INWARD AT REST, PEELING OPEN ON SCROLL) --- */}
            {/* Top-Left Fold Flap */}
            <motion.div
              style={{
                rotateY: flapTLRotate,
                opacity: flapOpacity,
                transformOrigin: 'top left',
              }}
              className="absolute top-0 left-0 w-1/2 h-1/2 z-40 pointer-events-none overflow-hidden"
            >
              <div className="w-full h-full bg-gradient-to-br from-neutral-800 via-neutral-900 to-black shadow-2xl border-r border-b border-white/10 opacity-90">
                <svg className="w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <polygon points="0,0 100,0 0,100" fill="rgba(255,255,255,0.15)" />
                  <line x1="0" y1="0" x2="100" y2="100" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
                </svg>
              </div>
            </motion.div>

            {/* Top-Right Fold Flap */}
            <motion.div
              style={{
                rotateY: flapTRRotate,
                opacity: flapOpacity,
                transformOrigin: 'top right',
              }}
              className="absolute top-0 right-0 w-1/2 h-1/2 z-40 pointer-events-none overflow-hidden"
            >
              <div className="w-full h-full bg-gradient-to-bl from-neutral-800 via-neutral-900 to-black shadow-2xl border-l border-b border-white/10 opacity-90">
                <svg className="w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <polygon points="100,0 0,0 100,100" fill="rgba(255,255,255,0.15)" />
                  <line x1="100" y1="0" x2="0" y2="100" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
                </svg>
              </div>
            </motion.div>

            {/* Bottom-Left Fold Flap */}
            <motion.div
              style={{
                rotateX: flapBLRotate,
                opacity: flapOpacity,
                transformOrigin: 'bottom left',
              }}
              className="absolute bottom-0 left-0 w-1/2 h-1/2 z-40 pointer-events-none overflow-hidden"
            >
              <div className="w-full h-full bg-gradient-to-tr from-neutral-800 via-neutral-900 to-black shadow-2xl border-r border-t border-white/10 opacity-90">
                <svg className="w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <polygon points="0,100 100,100 0,0" fill="rgba(255,255,255,0.15)" />
                  <line x1="0" y1="100" x2="100" y2="0" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
                </svg>
              </div>
            </motion.div>

            {/* Bottom-Right Fold Flap */}
            <motion.div
              style={{
                rotateX: flapBRRotate,
                opacity: flapOpacity,
                transformOrigin: 'bottom right',
              }}
              className="absolute bottom-0 right-0 w-1/2 h-1/2 z-40 pointer-events-none overflow-hidden"
            >
              <div className="w-full h-full bg-gradient-to-tl from-neutral-800 via-neutral-900 to-black shadow-2xl border-l border-t border-white/10 opacity-90">
                <svg className="w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <polygon points="100,100 0,100 100,0" fill="rgba(255,255,255,0.15)" />
                  <line x1="100" y1="100" x2="0" y2="0" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
                </svg>
              </div>
            </motion.div>

            {/* Dynamic Crumpled Creases & Shading Overlay */}
            <motion.div
              style={{ opacity: creaseOpacity }}
              className="absolute inset-0 pointer-events-none z-30 transition-opacity"
            >
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="foldGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#000000" stopOpacity="0.85" />
                    <stop offset="50%" stopColor="#ffffff" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#000000" stopOpacity="0.9" />
                  </linearGradient>
                  <linearGradient id="foldGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#000000" stopOpacity="0.75" />
                    <stop offset="70%" stopColor="#ffffff" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#000000" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                <polygon points="0,0 50,40 20,80 0,100" fill="url(#foldGrad1)" />
                <polygon points="50,40 100,0 80,60 50,45" fill="url(#foldGrad2)" />
                <polygon points="20,80 50,45 80,95 0,100" fill="url(#foldGrad1)" />
                <polygon points="50,45 80,60 100,100 80,95" fill="url(#foldGrad2)" />
                <line x1="0" y1="20" x2="100" y2="85" stroke="rgba(255,255,255,0.25)" strokeWidth="0.5" />
                <line x1="15" y1="0" x2="85" y2="100" stroke="rgba(0,0,0,0.7)" strokeWidth="0.8" />
              </svg>
            </motion.div>

            {/* Paper Edge Highlight Border */}
            <div className="absolute inset-0 z-20 pointer-events-none border border-white/10 rounded-2xl shadow-[inset_0_0_35px_rgba(0,0,0,0.85)]" />

            {/* --- REVEALED PRIMARY HERO CONTENT (EMBEDDED INSIDE THE UNFOLDED SHEET) --- */}
            <motion.div
              style={{
                filter: contentFilter,
                opacity: contentOpacity,
              }}
              className="relative w-full h-full flex flex-col justify-between p-6 sm:p-10 md:p-14 z-20"
            >
              {/* Top Kicker Bar */}
              <div className="flex items-center justify-between text-xs font-mono border-b border-neutral-800/80 pb-4 text-neutral-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse" />
                  <span className="text-white font-medium uppercase tracking-wider">Available for Commissions</span>
                  <span className="text-neutral-600">/</span>
                  <span className="text-neutral-400">2024–2025</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-neutral-500 hidden sm:inline">Tactile Visual Direction</span>
                  <span className="text-[#ccff00] font-bold">ALEX DAVIS</span>
                </div>
              </div>

              {/* Central Grid Split: Headline Left, Embedded Artwork & Technical Backdrop Right */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
                {/* Left Column: Designer Name & Headline */}
                <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
                  <div>
                    <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#ccff00] mb-2">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Alex Davis Portfolio</span>
                    </div>
                    {/* Headline requested: "Creative Graphic Designer & Visual Artist" */}
                    <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[0.95] text-white uppercase">
                      CREATIVE GRAPHIC <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] via-[#d4ff33] to-white">
                        DESIGNER & ARTIST
                      </span>
                    </h1>
                  </div>

                  <p className="text-sm sm:text-base md:text-lg text-neutral-400 max-w-xl font-normal leading-relaxed">
                    Turning abstract concepts into high-impact visual stories. Specializing in brutalist editorial typography,
                    analog paper textures, brand identity systems, and motion key visuals.
                  </p>

                  {/* Call-To-Action (CTA) buttons requested: "View Projects" & "Get in Touch" */}
                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <button
                      onClick={() => {
                        playClickSound();
                        onViewWork();
                      }}
                      className="px-6 py-3.5 rounded bg-[#ccff00] hover:bg-[#b8e600] text-black font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(204,255,0,0.3)] hover:shadow-[0_0_30px_rgba(204,255,0,0.5)] flex items-center gap-2 group cursor-pointer"
                    >
                      <span>View Projects</span>
                      <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                    </button>

                    <button
                      onClick={() => {
                        playClickSound();
                        const el = document.getElementById('contact');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-5 py-3.5 rounded border border-neutral-700 hover:border-[#ccff00]/60 text-neutral-300 hover:text-white font-mono text-xs uppercase tracking-wider transition-all bg-neutral-900/50 flex items-center gap-2 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5 text-[#ccff00]" />
                      <span>Get in Touch</span>
                    </button>
                  </div>
                </div>

                {/* Right Column: Hero Portfolio Image / Featured Artwork embedded with Technical Backdrop */}
                <div className="lg:col-span-5 flex justify-center lg:justify-end">
                  <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center">
                    
                    {/* Technical HUD Animation Engine in background of photo */}
                    <TechnicalPhotoBackdrop />

                    {/* Featured Artwork / Portfolio Image Box */}
                    <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl group bg-neutral-950">
                      <img
                        src={HERO_DESIGNER_IMG}
                        alt="Alex Davis - Creative Graphic Designer & Visual Artist"
                        className="w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      {/* Corner Matrix Index */}
                      <div className="absolute top-0 right-0 w-8 h-8 bg-neutral-900/90 border-b border-l border-[#ccff00]/40 flex items-center justify-center">
                        <span className="font-mono text-[9px] text-[#ccff00]">01</span>
                      </div>
                      {/* Bottom Info Scrim */}
                      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end justify-between">
                        <span className="font-mono text-[11px] text-neutral-300 uppercase tracking-widest">
                          Visual Artist · Key Visuals
                        </span>
                        <span className="font-mono text-[10px] text-[#ccff00]">
                          #01 / 2024
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Footer Indicator */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-neutral-500 border-t border-neutral-800/80 pt-4">
                <div className="flex items-center gap-4">
                  <span>Poster Art</span>
                  <span>/</span>
                  <span>Editorial Typography</span>
                  <span>/</span>
                  <span>Key Visuals</span>
                </div>

                <div className="flex items-center gap-2 text-neutral-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00]" />
                  <span>{hasFullyOpened ? 'Canvas Unfolded · Scroll to explore portfolio' : 'Scroll down to unfold paper canvas'}</span>
                  <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#ccff00]" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Unfold Status & Re-Crumple Control */}
        <div className="absolute bottom-4 right-4 z-40 flex items-center gap-3 bg-neutral-950/90 border border-neutral-800 px-3.5 py-1.5 rounded-full text-xs font-mono shadow-2xl backdrop-blur-md">
          <span className="text-[10px] text-[#ccff00] font-bold">
            {hasFullyOpened ? '100% CANVAS' : 'SCROLL-DRIVEN'}
          </span>
          <span className="text-neutral-700">|</span>
          <button
            onClick={handleResetToCrumpled}
            className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            title="Re-crumple back into 3D crushed paper"
          >
            <RefreshCw className="w-3 h-3" />
            <span className="text-[10px] uppercase">Re-Crumple</span>
          </button>
        </div>
      </div>
    </section>
  );
};
