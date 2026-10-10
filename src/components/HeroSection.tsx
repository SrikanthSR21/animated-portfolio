import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Sparkles, Send, Eye } from 'lucide-react';
import { HERO_DESIGNER_IMG } from '../data/portfolioData';
import { TechnicalPhotoBackdrop } from './TechnicalPhotoBackdrop';
import { playClickSound } from '../utils/audio';

interface HeroSectionProps {
  onViewWork: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onViewWork }) => {
  // Subtle 3D mouse parallax on the portrait card
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseTilt({ x: x * 8, y: -y * 8 });
  };

  const handleMouseLeave = () => {
    setMouseTilt({ x: 0, y: 0 });
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen bg-[#080808] flex items-center justify-center pt-24 pb-16 px-6 md:px-12 overflow-hidden"
    >
      {/* Background Ambient Spotlights & Tech Grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-[#ccff00]/4 rounded-full blur-[180px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#00d2ff]/4 rounded-full blur-[160px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />
      </div>

      <div className="relative w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ============================================================ */}
          {/* LEFT SIDE: Content slides in from LEFT (x: -80 -> 0)         */}
          {/* ============================================================ */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-center space-y-6"
          >
            {/* Kicker Badge */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 text-xs font-mono w-fit"
            >
              <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse" />
              <span className="text-white font-medium uppercase tracking-wider text-[11px]">
                Available for Commissions
              </span>
              <span className="text-neutral-600">/</span>
              <span className="text-[#ccff00] font-mono text-[11px]">2024–2025</span>
            </motion.div>

            {/* Giant Editorial Headline */}
            <div className="space-y-2">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#ccff00]"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Hi, I'm Alex Davis</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.92] text-white uppercase"
              >
                CREATIVE GRAPHIC <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] via-[#d4ff33] to-white">
                  DESIGNER & ARTIST
                </span>
              </motion.h1>
            </div>

            {/* Tagline / Narrative Prose */}
            <motion.p
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl text-neutral-400 max-w-xl font-normal leading-relaxed"
            >
              Turning ideas into high-impact visual stories. Specializing in brutalist editorial typography,
              analog poster textures, brand identity systems, and kinetic motion design.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <button
                onClick={() => {
                  playClickSound();
                  onViewWork();
                }}
                className="px-7 py-3.5 rounded bg-[#ccff00] hover:bg-[#b8e600] text-black font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(204,255,0,0.3)] hover:shadow-[0_0_30px_rgba(204,255,0,0.5)] flex items-center gap-2 group cursor-pointer"
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
                className="px-6 py-3.5 rounded border border-neutral-700 hover:border-[#ccff00]/60 text-neutral-300 hover:text-white font-mono text-xs uppercase tracking-wider transition-all bg-neutral-900/60 flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-[#ccff00]" />
                <span>Get in Touch</span>
              </button>
            </motion.div>

            {/* Quick Metadata Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.65 }}
              className="pt-6 border-t border-neutral-800/80 flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-500"
            >
              <div className="flex items-center gap-2 text-neutral-400">
                <span>BERLIN</span>
                <span>·</span>
                <span>TOKYO</span>
                <span>·</span>
                <span>NYC</span>
              </div>
              <span className="text-neutral-700">|</span>
              <div>Poster Design · Brand Identity · Motion Reel</div>
            </motion.div>
          </motion.div>

          {/* ============================================================ */}
          {/* RIGHT SIDE: Photo & HUD slide in from RIGHT (x: +80 -> 0)   */}
          {/* ============================================================ */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-72 h-72 sm:w-88 sm:h-88 md:w-[420px] md:h-[420px] flex items-center justify-center transition-transform duration-150 ease-out"
              style={{
                transform: `perspective(1000px) rotateX(${mouseTilt.y}deg) rotateY(${mouseTilt.x}deg)`,
              }}
            >
              {/* Technical HUD Animation Engine in background of portrait */}
              <TechnicalPhotoBackdrop />

              {/* Main Designer Profile Image Card */}
              <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden border border-neutral-800 shadow-[0_20px_60px_rgba(0,0,0,0.9)] group bg-neutral-950">
                <img
                  src={HERO_DESIGNER_IMG}
                  alt="Alex Davis - Creative Graphic Designer & Artist"
                  className="w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out select-none"
                />

                {/* Corner Cyber Matrix Tag */}
                <div className="absolute top-0 right-0 w-8 h-8 bg-neutral-900/90 border-b border-l border-[#ccff00]/40 flex items-center justify-center">
                  <span className="font-mono text-[9px] text-[#ccff00]">01</span>
                </div>

                {/* Bottom Scrim & Metadata */}
                <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/95 via-black/50 to-transparent flex items-end justify-between">
                  <div>
                    <span className="font-display font-bold text-white text-sm block">
                      Alex Davis
                    </span>
                    <span className="font-mono text-[11px] text-neutral-400">
                      Visual Direction · Key Art
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-[#ccff00] bg-black/60 px-2 py-0.5 rounded border border-[#ccff00]/30">
                    EST. 2021
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Floating Scroll Down Prompt */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs font-mono text-neutral-400 pointer-events-none"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-ping" />
        <span>Scroll to explore portfolio</span>
        <ArrowDown className="w-3.5 h-3.5 text-[#ccff00] animate-bounce" />
      </motion.div>
    </section>
  );
};
