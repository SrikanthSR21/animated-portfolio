import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, X, Film, RotateCcw } from 'lucide-react';
import { SHOWREEL_THUMBNAIL_IMG } from '../data/portfolioData';
import { playClickSound, playPaperRustle } from '../utils/audio';

export const VideoShowreel: React.FC = () => {
  const [isPlayingModal, setIsPlayingModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(38); // simulate 38% played

  const openPlayer = () => {
    playClickSound();
    playPaperRustle(0.4);
    setIsPlayingModal(true);
    setIsPlaying(true);
  };

  const closePlayer = () => {
    playClickSound();
    setIsPlayingModal(false);
  };

  return (
    <section id="showreel" className="relative py-28 px-4 md:px-10 bg-[#080808] text-white">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#ccff00] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>06. Motion & Post-Production</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white">
              CINEMATIC <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-[#ccff00]">
                VIDEO SHOWREEL
              </span>
            </h2>
          </div>

          <div className="text-xs font-mono text-neutral-400 max-w-xs">
            Showcasing commercial cuts, animated title sequences, and kinetic typography. Runtime: 02:48.
          </div>
        </div>

        {/* Cinematic Widescreen Frame */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative w-full aspect-[16/9] max-h-[640px] rounded-2xl overflow-hidden border border-neutral-800 group shadow-2xl bg-neutral-950"
        >
          {/* Real Generated Showreel Frame */}
          <img
            src={SHOWREEL_THUMBNAIL_IMG}
            alt="Cinematic Video Showreel Preview"
            className="w-full h-full object-cover filter contrast-110 brightness-95 group-hover:scale-102 transition-transform duration-700 ease-out"
          />

          {/* Vignette & Letterbox Effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60 pointer-events-none" />

          {/* Corner Watermark / Film Reel Info */}
          <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-neutral-800 text-xs font-mono text-neutral-300">
            <Film className="w-3.5 h-3.5 text-[#ccff00]" />
            <span>ALEX DAVIS // REEL 2024</span>
          </div>

          <div className="absolute top-6 right-6 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-neutral-800 text-xs font-mono text-[#ccff00]">
            4K UHD · 24 FPS
          </div>

          {/* Center Play Button with Neon Pulse */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <button
              onClick={openPlayer}
              className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#ccff00] text-black flex items-center justify-center shadow-[0_0_40px_rgba(204,255,0,0.5)] group-hover:scale-110 group-hover:shadow-[0_0_60px_rgba(204,255,0,0.8)] transition-all duration-300"
              aria-label="Play Full Showreel"
            >
              <div className="absolute inset-0 rounded-full border border-white/60 animate-ping opacity-40 pointer-events-none" />
              <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-black translate-x-0.5" />
            </button>
            <div className="mt-5 font-mono text-xs uppercase tracking-widest text-neutral-300 bg-black/60 px-4 py-1 rounded-full backdrop-blur-md border border-neutral-800">
              Watch Full Reel (02:48)
            </div>
          </div>

          {/* Bottom Bar Details */}
          <div className="absolute bottom-6 inset-x-6 flex items-center justify-between text-xs font-mono text-neutral-400">
            <div>Sound Design: Spatial Audio Emulation</div>
            <div className="text-white flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#ccff00]" />
              <span>Full Production Available in 4K</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Cinematic Fullscreen Player Modal */}
      <AnimatePresence>
        {isPlayingModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-5xl aspect-[16/9] bg-neutral-950 rounded-2xl overflow-hidden border border-neutral-800 shadow-[0_0_80px_rgba(0,0,0,0.95)] flex flex-col justify-between"
            >
              {/* Top Controls */}
              <div className="absolute top-0 inset-x-0 p-5 flex items-center justify-between z-20 bg-gradient-to-b from-black/80 to-transparent">
                <div className="flex items-center gap-3">
                  <span className="font-display font-bold text-white text-sm">ALEX DAVIS</span>
                  <span className="text-neutral-600">/</span>
                  <span className="font-mono text-xs text-[#ccff00]">SHOWREEL COMPILATION 2024</span>
                </div>
                <button
                  onClick={closePlayer}
                  className="p-2 rounded-full bg-neutral-900/80 hover:bg-[#ccff00] text-neutral-400 hover:text-black transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video Simulated Canvas / Visual Motion */}
              <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
                <img
                  src={SHOWREEL_THUMBNAIL_IMG}
                  alt="Reel Footage"
                  className={`w-full h-full object-cover filter contrast-125 ${
                    isPlaying ? 'scale-105 transition-transform duration-[12000ms]' : ''
                  }`}
                />
                {/* Cinema Overlay */}
                <div className="absolute inset-0 bg-neutral-950/20" />

                {/* Animated Simulated Film Marker */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                  <div className="font-mono text-xs text-[#ccff00] tracking-widest uppercase bg-black/70 px-4 py-1.5 rounded-full backdrop-blur-md border border-[#ccff00]/30 shadow-2xl">
                    {isPlaying ? '● PLAYING · 4K DIRECT STREAM' : '❚❚ PAUSED'}
                  </div>
                </div>
              </div>

              {/* Bottom Player Scrub & Controls */}
              <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/95 via-black/80 to-transparent z-20 space-y-3">
                {/* Timeline Progress Bar */}
                <div
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const newProgress = Math.round((clickX / rect.width) * 100);
                    setProgress(newProgress);
                  }}
                  className="w-full h-1.5 bg-neutral-800 rounded-full cursor-pointer relative overflow-hidden group"
                >
                  <div
                    className="h-full bg-[#ccff00] transition-all"
                    style={{ width: `${progress}%` }}
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ left: `calc(${progress}% - 6px)` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-neutral-300">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-1.5 text-white hover:text-[#ccff00] transition-colors"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-1.5 text-white hover:text-[#ccff00] transition-colors"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>

                    <span>01:04 / 02:48</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-neutral-500 hidden sm:inline">1080p · ProRes 422</span>
                    <button
                      onClick={() => setProgress(0)}
                      className="p-1.5 text-neutral-400 hover:text-white"
                      title="Replay from beginning"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
