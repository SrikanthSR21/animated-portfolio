import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowLeft, ArrowRight, Layers, CheckCircle2, Share2, Sparkles } from 'lucide-react';
import { Project, PosterItem } from '../types/portfolio';
import { playClickSound, playPaperRustle } from '../utils/audio';

interface ProjectDetailModalProps {
  project: Project | null;
  poster: PosterItem | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  poster,
  onClose,
  onNext,
  onPrev,
}) => {
  const item = project || poster;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  if (!item) return null;

  const isProject = !!project;
  const title = item.title;
  const image = isProject ? (item as Project).coverImage : (item as PosterItem).image;
  const year = item.year;
  const category = isProject ? (item as Project).category : 'Poster Series';
  const software = isProject ? (item as Project).tools.join(', ') : (item as PosterItem).software;
  const description = item.description;
  const fullDesc = isProject ? (item as Project).fullDescription : (item as PosterItem).concept;
  const process = isProject ? (item as Project).process : [
    'Hand-sketched composition layout & hierarchy passes',
    'Analog print scan, texture distressing, and photocopy degradation',
    'Vector typography refinement and kerning balancing',
    'Final color timing and physical paper crease integration'
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 overflow-y-auto">
        {/* Backdrop Scrim */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-xl"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-5xl bg-[#0e0e0e] border border-neutral-800 rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden z-10 my-auto"
        >
          {/* Top Bar with Navigation Controls & Close */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-900/70">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-[#ccff00] font-bold">CASE STUDY</span>
              <span className="text-neutral-700">/</span>
              <span className="font-mono text-xs text-neutral-400">{category}</span>
              <span className="text-neutral-700">·</span>
              <span className="font-mono text-xs text-neutral-400">{year}</span>
            </div>

            <div className="flex items-center gap-2">
              {onPrev && (
                <button
                  onClick={() => {
                    playClickSound();
                    onPrev();
                  }}
                  className="p-1.5 rounded-md hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
                  title="Previous project (←)"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}
              {onNext && (
                <button
                  onClick={() => {
                    playClickSound();
                    onNext();
                  }}
                  className="p-1.5 rounded-md hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
                  title="Next project (→)"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => {
                  playClickSound();
                  onClose();
                }}
                className="p-1.5 ml-2 rounded-md hover:bg-neutral-800 text-neutral-400 hover:text-[#ccff00] transition-colors"
                title="Close modal (ESC)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Body: Split between Artwork Left and Case Narrative Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[80vh] overflow-y-auto">
            {/* Left: Full Artwork View */}
            <div className="lg:col-span-6 p-6 sm:p-8 bg-neutral-950 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-neutral-800">
              <div className="relative w-full max-w-md aspect-[3/4] rounded-xl overflow-hidden shadow-2xl border border-neutral-800 group">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover filter contrast-105"
                />
                <div className="absolute inset-0 border border-white/10 pointer-events-none rounded-xl" />
              </div>
              <div className="mt-4 text-center font-mono text-[11px] text-neutral-500">
                Hi-Res Master Artwork · 300 DPI Fine Art Archive
              </div>
            </div>

            {/* Right: Project Narrative & Design Process */}
            <div className="lg:col-span-6 p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
                  {title}
                </h2>
                <p className="font-mono text-xs text-[#ccff00] mt-1">
                  Tools: {software}
                </p>
              </div>

              {/* Creative Brief */}
              <div className="space-y-2">
                <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#ccff00]" />
                  <span>Creative Brief & Intent</span>
                </h4>
                <p className="text-sm text-neutral-300 leading-relaxed font-normal">
                  {fullDesc}
                </p>
              </div>

              {/* Design Process Steps */}
              <div className="space-y-3 pt-2">
                <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-400 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#ccff00]" />
                  <span>Design Execution Process</span>
                </h4>
                <div className="space-y-2">
                  {process.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                      <CheckCircle2 className="w-4 h-4 text-[#ccff00] shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Client & Proof Details */}
              {isProject && (item as Project).client && (
                <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800/80 space-y-1 text-xs font-mono">
                  <div className="text-neutral-400">Client / Commission:</div>
                  <div className="text-white font-medium">{(item as Project).client}</div>
                  {(item as Project).metrics && (
                    <div className="text-[#ccff00] text-[11px] pt-1">
                      {(item as Project).metrics}
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 flex items-center gap-3">
                <button
                  onClick={() => {
                    playPaperRustle(0.4);
                    navigator.clipboard?.writeText(window.location.href);
                  }}
                  className="px-4 py-2.5 rounded-lg border border-neutral-700 hover:border-[#ccff00] text-xs font-mono text-neutral-300 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Project</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-lg bg-[#ccff00] hover:bg-[#b8e600] text-black font-mono text-xs font-bold uppercase transition-all shadow-[0_0_15px_rgba(204,255,0,0.3)] ml-auto"
                >
                  Close Case Study
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
