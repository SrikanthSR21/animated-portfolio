import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Quote, Award, CheckCircle } from 'lucide-react';
import { TESTIMONIALS, ACHIEVEMENTS } from '../data/portfolioData';

export const TestimonialsAchievements: React.FC = () => {
  return (
    <section className="relative py-28 px-4 md:px-10 bg-[#080808] text-white">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Testimonials Block */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-800/80 pb-6 mb-12">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#ccff00] mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>07. Collaborations & Trust</span>
              </div>
              <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white">
                CLIENT & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-[#ccff00]">
                  DIRECTOR FEEDBACK
                </span>
              </h2>
            </div>
            <div className="text-xs font-mono text-neutral-400 max-w-xs">
              Endorsements from studio directors, labels, and creative collaborators.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-7 flex flex-col justify-between shadow-xl hover:border-[#ccff00]/40 transition-colors group"
              >
                <div>
                  <Quote className="w-8 h-8 text-[#ccff00]/60 mb-4 group-hover:text-[#ccff00] transition-colors" />
                  <p className="text-sm text-neutral-300 leading-relaxed font-normal">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-neutral-800/80 flex items-center justify-between text-xs font-mono">
                  <div>
                    <h4 className="font-display font-bold text-white text-sm">{t.name}</h4>
                    <span className="text-neutral-400">{t.role} · {t.company}</span>
                  </div>
                  <span className="text-[#ccff00] text-[11px]">{t.year}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Achievements Strip */}
        <div className="p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#ccff00] mb-6">
            <Award className="w-4 h-4" />
            <span>Honors & Milestones</span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {ACHIEVEMENTS.map((ach) => (
              <div key={ach.title} className="space-y-1">
                <div className="text-[11px] font-mono text-[#ccff00] flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{ach.badge}</span>
                </div>
                <h4 className="font-display font-bold text-base text-white">
                  {ach.title}
                </h4>
                <p className="text-xs font-mono text-neutral-400">
                  {ach.organization} ({ach.year})
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
