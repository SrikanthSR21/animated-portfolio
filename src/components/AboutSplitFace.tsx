import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { Sparkles, ArrowRight, Upload, Layers, Eye, RefreshCcw } from 'lucide-react';
import { DESIGNER_HEAD_CUTOUT_IMG, POSTER_COLLECTION } from '../data/portfolioData';
import { PosterItem } from '../types/portfolio';
import { playPaperRustle, playClickSound, playWhooshSound } from '../utils/audio';

interface AboutSplitFaceProps {
  onSelectPoster?: (poster: PosterItem) => void;
}

export const AboutSplitFace: React.FC<AboutSplitFaceProps> = ({ onSelectPoster }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Allow uploading a custom backgroundless head image
  const [headImage, setHeadImage] = useState<string>(DESIGNER_HEAD_CUTOUT_IMG);
  
  // Interactive click split toggle
  const [isSplitToggled, setIsSplitToggled] = useState(false);
  const [manualScrub, setManualScrub] = useState<number | null>(null);

  // Track scroll strictly when the section is pinned into view (start start to end end)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Start at EXACTLY 0 (100% UNIFIED, SOLID, INTACT HEAD IMAGE)
  const rawProgress = useMotionValue(0);
  const smoothProgress = useSpring(rawProgress, { damping: 24, stiffness: 150 });

  useEffect(() => {
    if (manualScrub !== null) {
      rawProgress.set(manualScrub);
      return;
    }

    if (isSplitToggled) {
      rawProgress.set(1);
      return;
    }

    const unsubscribe = scrollYProgress.on('change', (latest) => {
      // Map scroll progress:
      // At scroll 0 (when arriving at About section): mapped is 0.0 -> head is 100% INTACT!
      // When scrolling lightly down inside About (from 0 to 0.5): mapped goes from 0.0 to 1.0 -> splits open!
      const mapped = Math.min(Math.max(latest / 0.45, 0), 1);
      rawProgress.set(mapped);

      if (mapped > 0.05 && mapped < 0.95 && Math.random() > 0.85) {
        playPaperRustle(0.2);
      }
    });

    return () => unsubscribe();
  }, [manualScrub, isSplitToggled, scrollYProgress, rawProgress]);

  // The 4 Square Pieces (Top-Left, Top-Right, Bottom-Left, Bottom-Right)
  // At progress 0: All offsets and rotations are STRICTLY 0 -> Head is 100% intact and complete!
  // At progress 0.8-1.0: Pieces split outward to reveal cards inside
  
  // Piece 1: Top-Left (moves up-left)
  const p1X = useTransform(smoothProgress, [0, 0.7], [0, -135]);
  const p1Y = useTransform(smoothProgress, [0, 0.7], [0, -95]);
  const p1Rotate = useTransform(smoothProgress, [0, 0.7], [0, -10]);

  // Piece 2: Top-Right (moves up-right)
  const p2X = useTransform(smoothProgress, [0, 0.7], [0, 135]);
  const p2Y = useTransform(smoothProgress, [0, 0.7], [0, -95]);
  const p2Rotate = useTransform(smoothProgress, [0, 0.7], [0, 10]);

  // Piece 3: Bottom-Left (moves down-left)
  const p3X = useTransform(smoothProgress, [0, 0.7], [0, -135]);
  const p3Y = useTransform(smoothProgress, [0, 0.7], [0, 95]);
  const p3Rotate = useTransform(smoothProgress, [0, 0.7], [0, -6]);

  // Piece 4: Bottom-Right (moves down-right)
  const p4X = useTransform(smoothProgress, [0, 0.7], [0, 135]);
  const p4Y = useTransform(smoothProgress, [0, 0.7], [0, 95]);
  const p4Rotate = useTransform(smoothProgress, [0, 0.7], [0, 6]);

  // Emerging Poster / Digital Drawing Cards from INSIDE the head
  // At progress 0: scale: 0, opacity: 0 (completely hidden inside the unified head)
  // At progress > 0.15: emerge outward in 3D perspective
  
  // Card 1: Mind Elevation (Emerges Top-Center / Left)
  const card1Scale = useTransform(smoothProgress, [0.1, 0.65], [0, 1]);
  const card1Opacity = useTransform(smoothProgress, [0.1, 0.45], [0, 1]);
  const card1X = useTransform(smoothProgress, [0.1, 0.65], [0, -170]);
  const card1Y = useTransform(smoothProgress, [0.1, 0.65], [0, -30]);
  const card1Rotate = useTransform(smoothProgress, [0.1, 0.65], [0, -14]);

  // Card 2: Breathe Poster (Emerges Right)
  const card2Scale = useTransform(smoothProgress, [0.15, 0.7], [0, 1]);
  const card2Opacity = useTransform(smoothProgress, [0.15, 0.5], [0, 1]);
  const card2X = useTransform(smoothProgress, [0.15, 0.7], [0, 170]);
  const card2Y = useTransform(smoothProgress, [0.15, 0.7], [0, -20]);
  const card2Rotate = useTransform(smoothProgress, [0.15, 0.7], [0, 12]);

  // Card 3: Dream Create Repeat (Emerges Bottom Center)
  const card3Scale = useTransform(smoothProgress, [0.2, 0.75], [0, 1]);
  const card3Opacity = useTransform(smoothProgress, [0.2, 0.55], [0, 1]);
  const card3Y = useTransform(smoothProgress, [0.2, 0.75], [0, 110]);
  const card3Rotate = useTransform(smoothProgress, [0.2, 0.75], [0, 4]);

  // Card 4: One More Shot (Center Float behind)
  const card4Scale = useTransform(smoothProgress, [0.22, 0.8], [0, 0.95]);
  const card4Opacity = useTransform(smoothProgress, [0.22, 0.6], [0, 0.9]);
  const card4Y = useTransform(smoothProgress, [0.22, 0.8], [0, -90]);

  // Info Column Opacity & Translation
  const infoOpacity = useTransform(smoothProgress, [0, 0.3], [0.85, 1]);

  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setHeadImage(url);
      playClickSound();
    }
  };

  const handleToggleSplit = () => {
    playWhooshSound();
    playClickSound();
    const next = !isSplitToggled;
    setIsSplitToggled(next);
    setManualScrub(next ? 1 : 0);
  };

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-[175vh] bg-[#080808] text-white py-20 px-4 md:px-8 overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-[#ccff00]/6 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#00d2ff]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Sticky Stage: Perfectly centered in viewport */}
      <div className="sticky top-16 min-h-[88vh] flex flex-col justify-center max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-neutral-800/80 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#ccff00] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>02. About The Designer</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white">
              MORE THAN <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-[#ccff00]">
                JUST DESIGNS
              </span>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
            {/* Custom Head Image Upload Button */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleCustomUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              onClick={() => {
                playClickSound();
                fileInputRef.current?.click();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-700 bg-neutral-900 hover:border-[#ccff00] text-neutral-300 hover:text-white transition-all shadow-md cursor-pointer"
              title="Upload your backgroundless head image (PNG/JPG)"
            >
              <Upload className="w-3.5 h-3.5 text-[#ccff00]" />
              <span>Upload Head Photo</span>
            </button>

            {headImage !== DESIGNER_HEAD_CUTOUT_IMG && (
              <button
                onClick={() => setHeadImage(DESIGNER_HEAD_CUTOUT_IMG)}
                className="text-neutral-500 hover:text-neutral-300 cursor-pointer"
                title="Reset to default head"
              >
                Reset
              </button>
            )}

            {/* Split / Reunite Instant Button */}
            <button
              onClick={handleToggleSplit}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border text-xs font-mono uppercase transition-all shadow-md cursor-pointer ${
                isSplitToggled
                  ? 'bg-[#ccff00] text-black border-[#ccff00] font-bold shadow-[0_0_15px_rgba(204,255,0,0.3)]'
                  : 'bg-neutral-900 border-neutral-700 text-neutral-300 hover:border-[#ccff00]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{isSplitToggled ? 'Reunite Image' : 'Split & Reveal'}</span>
            </button>

            {/* Split Scrub Slider */}
            <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 rounded-full px-3 py-1 shadow-lg">
              <span className="text-[10px] text-neutral-400 uppercase">Split Scrub:</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={manualScrub !== null ? manualScrub : (isSplitToggled ? 1 : 0)}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setManualScrub(val);
                  setIsSplitToggled(val > 0.5);
                  playPaperRustle(0.2);
                }}
                className="w-20 h-1 bg-neutral-800 rounded appearance-none cursor-pointer accent-[#ccff00]"
                aria-label="Split Scrub Slider"
              />
              {manualScrub !== null && (
                <button
                  onClick={() => {
                    playClickSound();
                    setManualScrub(null);
                    setIsSplitToggled(false);
                    rawProgress.set(0);
                  }}
                  className="text-[10px] text-[#ccff00] underline cursor-pointer"
                  title="Reset to auto scroll"
                >
                  Auto
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Center Grid: 4-Square Head & Emerging Poster Cards + Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left/Center: The 4-Piece Square Split & Emerging Cards Stage */}
          <div className="lg:col-span-7 flex flex-col justify-center items-center py-4">
            
            <div
              onClick={handleToggleSplit}
              className="relative w-72 sm:w-80 md:w-96 aspect-square preserve-3d flex items-center justify-center cursor-pointer group"
              style={{ perspective: 1400 }}
              title="Click photo to split / reunite"
            >
              {/* Outer Ambient Glow */}
              <div className="absolute inset-0 bg-[#ccff00]/10 rounded-2xl blur-xl pointer-events-none group-hover:bg-[#ccff00]/20 transition-colors" />

              {/* --- EMERGING POSTER / DIGITAL DRAWING CARDS (FROM INSIDE THE HEAD) --- */}

              {/* Card 1: Mind Elevation Digital Drawing */}
              <motion.div
                style={{
                  scale: card1Scale,
                  opacity: card1Opacity,
                  x: card1X,
                  y: card1Y,
                  rotate: card1Rotate,
                  zIndex: 25,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  playWhooshSound();
                  if (onSelectPoster) onSelectPoster(POSTER_COLLECTION[0]);
                }}
                className="absolute w-36 sm:w-44 aspect-[3/4] rounded-lg overflow-hidden border border-[#ccff00]/60 shadow-[0_15px_40px_rgba(0,0,0,0.95)] cursor-pointer group/card hover:scale-110 transition-transform bg-neutral-950"
              >
                <img
                  src={POSTER_COLLECTION[0].image}
                  alt={POSTER_COLLECTION[0].title}
                  className="w-full h-full object-cover filter contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-2 inset-x-2 text-[10px] font-mono text-white flex justify-between items-center">
                  <span className="truncate text-[#ccff00]">MIND ELEVATION</span>
                  <span className="text-[9px] text-neutral-400">Digital Art</span>
                </div>
              </motion.div>

              {/* Card 2: Breathe Poster */}
              <motion.div
                style={{
                  scale: card2Scale,
                  opacity: card2Opacity,
                  x: card2X,
                  y: card2Y,
                  rotate: card2Rotate,
                  zIndex: 26,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  playWhooshSound();
                  if (onSelectPoster) onSelectPoster(POSTER_COLLECTION[2]);
                }}
                className="absolute w-36 sm:w-44 aspect-[3/4] rounded-lg overflow-hidden border border-red-500/60 shadow-[0_15px_40px_rgba(0,0,0,0.95)] cursor-pointer group/card hover:scale-110 transition-transform bg-neutral-950"
              >
                <img
                  src={POSTER_COLLECTION[2].image}
                  alt={POSTER_COLLECTION[2].title}
                  className="w-full h-full object-cover filter contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-2 inset-x-2 text-[10px] font-mono text-white flex justify-between items-center">
                  <span className="truncate text-red-400">BREATHE</span>
                  <span className="text-[9px] text-neutral-400">Poster</span>
                </div>
              </motion.div>

              {/* Card 3: Dream Create Repeat */}
              <motion.div
                style={{
                  scale: card3Scale,
                  opacity: card3Opacity,
                  y: card3Y,
                  rotate: card3Rotate,
                  zIndex: 27,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  playWhooshSound();
                  if (onSelectPoster) onSelectPoster(POSTER_COLLECTION[1]);
                }}
                className="absolute w-36 sm:w-44 aspect-[3/4] rounded-lg overflow-hidden border border-[#ccff00]/60 shadow-[0_15px_40px_rgba(0,0,0,0.95)] cursor-pointer group/card hover:scale-110 transition-transform bg-neutral-950"
              >
                <img
                  src={POSTER_COLLECTION[1].image}
                  alt={POSTER_COLLECTION[1].title}
                  className="w-full h-full object-cover filter contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-2 inset-x-2 text-[10px] font-mono text-white flex justify-between items-center">
                  <span className="truncate text-[#ccff00]">DREAM CREATE</span>
                  <span className="text-[9px] text-neutral-400">Streetwear</span>
                </div>
              </motion.div>

              {/* Card 4: One More Shot Key Visual (Floating back center) */}
              <motion.div
                style={{
                  scale: card4Scale,
                  opacity: card4Opacity,
                  y: card4Y,
                  zIndex: 20,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  playWhooshSound();
                  if (onSelectPoster) onSelectPoster(POSTER_COLLECTION[3]);
                }}
                className="absolute w-36 sm:w-44 aspect-[3/4] rounded-lg overflow-hidden border border-cyan-500/50 shadow-[0_15px_40px_rgba(0,0,0,0.95)] cursor-pointer group/card hover:scale-110 transition-transform bg-neutral-950"
              >
                <img
                  src={POSTER_COLLECTION[3].image}
                  alt={POSTER_COLLECTION[3].title}
                  className="w-full h-full object-cover filter contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-2 inset-x-2 text-[10px] font-mono text-white flex justify-between items-center">
                  <span className="truncate text-cyan-400">ONE MORE SHOT</span>
                  <span className="text-[9px] text-neutral-400">Cinema Art</span>
                </div>
              </motion.div>

              {/* --- THE 4 SQUARE PIECES OF THE USER'S HEAD (SEAMLESSLY UNITED AT REST) --- */}

              {/* Piece 1: Top-Left Square */}
              <motion.div
                style={{
                  x: p1X,
                  y: p1Y,
                  rotate: p1Rotate,
                  zIndex: 35,
                }}
                className="absolute top-0 left-0 w-1/2 h-1/2 overflow-hidden border-t border-l border-neutral-700/80 shadow-[0_10px_30px_rgba(0,0,0,0.8)] bg-black rounded-tl-xl transition-shadow"
              >
                <img
                  src={headImage}
                  alt="Head Top-Left Piece"
                  className="absolute top-0 left-0 max-w-none filter contrast-110 select-none"
                  style={{ width: '200%', height: '200%', left: '0%', top: '0%' }}
                />
                <div className="absolute inset-0 border-r border-b border-[#ccff00]/40 pointer-events-none" />
              </motion.div>

              {/* Piece 2: Top-Right Square */}
              <motion.div
                style={{
                  x: p2X,
                  y: p2Y,
                  rotate: p2Rotate,
                  zIndex: 35,
                }}
                className="absolute top-0 left-1/2 w-1/2 h-1/2 overflow-hidden border-t border-r border-neutral-700/80 shadow-[0_10px_30px_rgba(0,0,0,0.8)] bg-black rounded-tr-xl transition-shadow"
              >
                <img
                  src={headImage}
                  alt="Head Top-Right Piece"
                  className="absolute top-0 left-0 max-w-none filter contrast-110 select-none"
                  style={{ width: '200%', height: '200%', left: '-100%', top: '0%' }}
                />
                <div className="absolute inset-0 border-l border-b border-[#ccff00]/40 pointer-events-none" />
              </motion.div>

              {/* Piece 3: Bottom-Left Square */}
              <motion.div
                style={{
                  x: p3X,
                  y: p3Y,
                  rotate: p3Rotate,
                  zIndex: 35,
                }}
                className="absolute top-1/2 left-0 w-1/2 h-1/2 overflow-hidden border-b border-l border-neutral-700/80 shadow-[0_10px_30px_rgba(0,0,0,0.8)] bg-black rounded-bl-xl transition-shadow"
              >
                <img
                  src={headImage}
                  alt="Head Bottom-Left Piece"
                  className="absolute top-0 left-0 max-w-none filter contrast-110 select-none"
                  style={{ width: '200%', height: '200%', left: '0%', top: '-100%' }}
                />
                <div className="absolute inset-0 border-r border-t border-[#ccff00]/40 pointer-events-none" />
              </motion.div>

              {/* Piece 4: Bottom-Right Square */}
              <motion.div
                style={{
                  x: p4X,
                  y: p4Y,
                  rotate: p4Rotate,
                  zIndex: 35,
                }}
                className="absolute top-1/2 left-1/2 w-1/2 h-1/2 overflow-hidden border-b border-r border-neutral-700/80 shadow-[0_10px_30px_rgba(0,0,0,0.8)] bg-black rounded-br-xl transition-shadow"
              >
                <img
                  src={headImage}
                  alt="Head Bottom-Right Piece"
                  className="absolute top-0 left-0 max-w-none filter contrast-110 select-none"
                  style={{ width: '200%', height: '200%', left: '-100%', top: '-100%' }}
                />
                <div className="absolute inset-0 border-l border-t border-[#ccff00]/40 pointer-events-none" />
              </motion.div>
            </div>

            {/* Instruction Cue Below Portrait */}
            <div className="mt-4 flex items-center gap-2 text-xs font-mono text-neutral-400">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-pulse" />
              <span>Scroll down or click photo to split & reveal inner cards</span>
            </div>
          </div>

          {/* Right Column: Creative Narrative & Emerged Cards Info */}
          <motion.div
            style={{ opacity: infoOpacity }}
            className="lg:col-span-5 flex flex-col gap-5"
          >
            {/* Card: Designer Mind & Posters Emerging */}
            <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-6 shadow-2xl relative overflow-hidden group hover:border-[#ccff00]/50 transition-colors">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#ccff00] mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Inside The Creative Mind</span>
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-2">
                Posters & Digital Artworks Released
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed font-normal">
                When you scroll lightly or interact with the portrait, the head separates into 4 square segments, releasing
                the designer's inner visual world: tactile posters and cyberpunk digital drawings.
              </p>
            </div>

            {/* Card: Design Philosophy */}
            <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-6 shadow-2xl relative overflow-hidden group hover:border-[#ccff00]/50 transition-colors">
              <h3 className="text-lg font-display font-bold text-white mb-1">
                Tactile Realism × Bold Typography
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                Every project begins with a raw concept before taking digital form.
                Specializing in poster collections, cybernetic key visuals, streetwear brand aesthetics, and motion design.
              </p>
              <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs font-mono text-neutral-400">
                <span>4 Featured Artworks Inside</span>
                <span className="text-[#ccff00]">Click Cards to Inspect Case Study</span>
              </div>
            </div>

            {/* Direct CTA */}
            <div className="pt-1">
              <button
                onClick={() => {
                  playClickSound();
                  const el = document.getElementById('projects');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-3 rounded-xl bg-neutral-800 hover:bg-[#ccff00] hover:text-black text-xs font-mono uppercase tracking-wider font-semibold text-neutral-200 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Explore Full Portfolio Gallery</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
