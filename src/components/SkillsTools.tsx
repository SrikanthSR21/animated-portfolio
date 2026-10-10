import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Terminal, Wrench } from 'lucide-react';
import { SKILLS_LIST, SOFTWARE_TOOLS } from '../data/portfolioData';
import { ToolItem } from '../types/portfolio';
import { playClickSound } from '../utils/audio';

export const SkillsTools: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<ToolItem | null>(SOFTWARE_TOOLS[0]);

  return (
    <section id="skills" className="relative py-28 px-4 md:px-10 bg-[#080808] text-white">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#ccff00] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>05. Technical Capabilities</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white">
              SKILLS & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-[#ccff00]">
                SOFTWARE TOOLS
              </span>
            </h2>
          </div>

          <p className="text-xs font-mono text-neutral-400 max-w-xs">
            Proven proficiency across industry-standard creative software, physical mixed-media techniques, and motion suites.
          </p>
        </div>

        {/* Circular Proficiency Dials */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {SKILLS_LIST.map((skill, index) => {
            const radius = 42;
            const circumference = 2 * Math.PI * radius;
            const strokeDashoffset = circumference - (skill.percentage / 100) * circumference;

            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6 flex flex-col items-center text-center shadow-xl hover:border-[#ccff00]/50 transition-colors group"
              >
                {/* Circular Progress SVG */}
                <div className="relative w-28 h-28 flex items-center justify-center my-2">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    {/* Background Track */}
                    <circle
                      cx="50"
                      cy="50"
                      r={radius}
                      fill="transparent"
                      stroke="#222222"
                      strokeWidth="6"
                    />
                    {/* Progress Indicator */}
                    <motion.circle
                      cx="50"
                      cy="50"
                      r={radius}
                      fill="transparent"
                      stroke="#ccff00"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      initial={{ strokeDashoffset: circumference }}
                      whileInView={{ strokeDashoffset }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.2 + index * 0.1, ease: 'easeOut' }}
                      style={{
                        filter: 'drop-shadow(0 0 6px rgba(204, 255, 0, 0.4))',
                      }}
                    />
                  </svg>

                  {/* Percentage in Center */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center font-display font-black text-2xl text-white group-hover:text-[#ccff00] transition-colors">
                    <span>{skill.percentage}%</span>
                  </div>
                </div>

                <h3 className="font-display font-bold text-base text-white mt-2">
                  {skill.name}
                </h3>
                <span className="text-[11px] font-mono text-[#ccff00] mt-0.5">
                  {skill.category}
                </span>
                <p className="text-xs text-neutral-400 mt-2 line-clamp-2 leading-relaxed">
                  {skill.highlight}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Software Suite Showcase */}
        <div className="bg-neutral-900/70 border border-neutral-800 rounded-2xl p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#ccff00] mb-1">
                <Wrench className="w-3.5 h-3.5" />
                <span>Primary Software Stack</span>
              </div>
              <h3 className="font-display font-bold text-2xl text-white">
                Tools I Use Daily
              </h3>
            </div>
            <div className="text-xs font-mono text-neutral-400">
              Click any tool icon below to inspect creative workflows
            </div>
          </div>

          {/* Software Tool Badges */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-4">
            {SOFTWARE_TOOLS.map((tool) => {
              const isSelected = selectedTool?.name === tool.name;

              return (
                <button
                  key={tool.name}
                  onClick={() => {
                    playClickSound();
                    setSelectedTool(tool);
                  }}
                  className={`flex flex-col items-center p-4 rounded-xl border transition-all ${
                    isSelected
                      ? 'border-[#ccff00] bg-neutral-800/90 shadow-[0_0_20px_rgba(204,255,0,0.25)] scale-105'
                      : 'border-neutral-800 bg-neutral-950/80 hover:border-neutral-700 hover:bg-neutral-900'
                  }`}
                >
                  <div
                    className="w-14 h-14 rounded-lg flex items-center justify-center font-display font-black text-xl shadow-inner transition-transform group-hover:scale-105"
                    style={{
                      backgroundColor: tool.color,
                      color: tool.textColor || '#ffffff',
                    }}
                  >
                    {tool.abbr}
                  </div>
                  <span className="font-mono text-xs text-neutral-200 mt-2.5 font-medium truncate w-full text-center">
                    {tool.name}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500">
                    {tool.category.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected Tool Details Callout */}
          {selectedTool && (
            <motion.div
              key={selectedTool.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-5 rounded-xl bg-neutral-950 border border-neutral-800/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-md flex items-center justify-center font-display font-bold text-sm shrink-0"
                  style={{
                    backgroundColor: selectedTool.color,
                    color: selectedTool.textColor || '#ffffff',
                  }}
                >
                  {selectedTool.abbr}
                </div>
                <div>
                  <h4 className="text-sm font-display font-bold text-white flex items-center gap-2">
                    <span>{selectedTool.name}</span>
                    <span className="text-neutral-600">·</span>
                    <span className="text-xs font-mono text-[#ccff00]">{selectedTool.category}</span>
                  </h4>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    {selectedTool.description}
                  </p>
                </div>
              </div>

              <div className="text-[11px] font-mono text-neutral-500 whitespace-nowrap">
                Production Standard Workflow
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
