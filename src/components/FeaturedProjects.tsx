import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, ArrowLeft, ExternalLink, Filter } from 'lucide-react';
import { FEATURED_PROJECTS } from '../data/portfolioData';
import { Project } from '../types/portfolio';
import { playClickSound, playWhooshSound } from '../utils/audio';

interface FeaturedProjectsProps {
  onSelectProject: (project: Project) => void;
}

const CATEGORIES = ['All', 'Poster Design', 'Brand Identity', 'Video & Motion'] as const;

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [scrollIndex, setScrollIndex] = useState(0);

  const filteredProjects = activeCategory === 'All'
    ? FEATURED_PROJECTS
    : FEATURED_PROJECTS.filter((p) => p.category === activeCategory);

  const handleFilterClick = (cat: string) => {
    playClickSound();
    setActiveCategory(cat);
    setScrollIndex(0);
  };

  const nextSlide = () => {
    playWhooshSound();
    setScrollIndex((prev) => (prev + 1) % filteredProjects.length);
  };

  const prevSlide = () => {
    playWhooshSound();
    setScrollIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  return (
    <section id="projects" className="relative py-28 px-4 md:px-10 bg-[#080808] text-white">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header with 3-Zone Balance */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#ccff00] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>03. Selected Portfolio</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white">
              FEATURED <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-[#ccff00]">
                PROJECTS
              </span>
            </h2>
          </div>

          {/* Interactive Filter Tabs (Functional buttons as per Constitution) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-900 border border-neutral-800 rounded-lg">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilterClick(cat)}
                className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider rounded-md transition-all whitespace-nowrap shrink-0 ${
                  activeCategory === cat
                    ? 'bg-[#ccff00] text-black font-bold shadow-[0_0_12px_rgba(204,255,0,0.3)]'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel / Grid Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => {
                playClickSound();
                onSelectProject(project);
              }}
              className="group relative rounded-2xl overflow-hidden bg-neutral-900/90 border border-neutral-800 hover:border-[#ccff00]/60 cursor-pointer shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.9)] flex flex-col justify-between"
            >
              {/* Media Preview Box */}
              <div className="relative aspect-[3/4] overflow-hidden bg-neutral-950">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover filter contrast-105 group-hover:scale-108 transition-transform duration-700 ease-out"
                />

                {/* Corner Gradient Accent Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Category Badge on Artwork */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-neutral-700/60 text-[10px] font-mono text-neutral-300">
                  {project.category}
                </div>

                <div className="absolute top-3 right-3 px-2 py-1 rounded bg-black/80 backdrop-blur-md border border-neutral-700/60 text-[10px] font-mono text-[#ccff00]">
                  {project.year}
                </div>

                {/* Hover Quick Action Indicator */}
                <div className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-[#ccff00] text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-200 shadow-[0_0_15px_#ccff00]">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-5 flex flex-col justify-between flex-1 border-t border-neutral-800/80">
                <div>
                  <h3 className="font-display font-black text-xl text-white group-hover:text-[#ccff00] transition-colors uppercase tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-xs font-mono text-neutral-400 mt-1 line-clamp-1">
                    {project.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-800/60 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                  <span>{project.tools[0]}</span>
                  <span className="text-neutral-400 group-hover:text-[#ccff00] transition-colors">
                    Explore Case Study →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
