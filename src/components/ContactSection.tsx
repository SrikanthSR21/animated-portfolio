import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Mail, MessageSquare, Instagram, Globe, ArrowRight, CheckCircle, Send, Heart } from 'lucide-react';
import { playClickSound, playPaperRustle } from '../utils/audio';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Poster Design',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playClickSound();
    playPaperRustle(0.6);
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 900);
  };

  return (
    <footer id="contact" className="relative pt-28 pb-16 px-4 md:px-10 bg-[#060606] text-white border-t border-neutral-900 overflow-hidden">
      {/* Background Accent Mesh */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#ccff00]/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-20">
        {/* Contact Top Grid: Inquiry Form Left, Direct Reach Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Heading & Interactive Form */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#ccff00] mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>08. Get In Touch</span>
              </div>
              <h2 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight text-white leading-none">
                LET'S CREATE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-[#ccff00]">
                  SOMETHING GREAT
                </span>
              </h2>
              <p className="text-sm md:text-base text-neutral-400 mt-4 max-w-lg font-normal leading-relaxed">
                Have a campaign, poster commission, brand identity, or motion reel in mind?
                Drop your project brief below and I'll respond within 24 hours.
              </p>
            </div>

            {/* Form */}
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-2xl bg-neutral-900/90 border border-[#ccff00]/50 shadow-2xl space-y-4 text-center sm:text-left"
              >
                <div className="w-12 h-12 rounded-full bg-[#ccff00]/20 border border-[#ccff00] flex items-center justify-center text-[#ccff00] mx-auto sm:mx-0">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-2xl text-white">
                  Message Dispatched Successfully!
                </h3>
                <p className="text-xs font-mono text-neutral-300 leading-relaxed">
                  Thanks for reaching out, {formData.name || 'friend'}. Your project brief has been logged.
                  I will review the details and reach back out to {formData.email || 'your email'} shortly.
                </p>
                <button
                  onClick={() => {
                    playClickSound();
                    setSubmitted(false);
                  }}
                  className="px-4 py-2 text-xs font-mono uppercase tracking-wider text-[#ccff00] hover:underline"
                >
                  Send another inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 bg-neutral-900/60 border border-neutral-800 p-6 sm:p-8 rounded-2xl shadow-xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 focus:border-[#ccff00] focus:outline-none transition-colors text-sm font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@studio.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 focus:border-[#ccff00] focus:outline-none transition-colors text-sm font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                    Project Focus
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-neutral-950 border border-neutral-800 text-white focus:border-[#ccff00] focus:outline-none transition-colors text-sm font-mono"
                  >
                    <option value="Poster Design">Poster Design & Editorial</option>
                    <option value="Brand Identity">Brand Identity & Logo</option>
                    <option value="Motion & Video">Motion Graphics & Showreel</option>
                    <option value="Complete Creative Direction">Full Visual Art Direction</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                    Project Brief & Scope *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your vision, timeline, deliverables, or inspiration..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 focus:border-[#ccff00] focus:outline-none transition-colors text-sm font-mono resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-[#ccff00] hover:bg-[#b8e600] text-black font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(204,255,0,0.3)] hover:shadow-[0_0_30px_rgba(204,255,0,0.5)] flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span>Dispatching Brief...</span>
                  ) : (
                    <>
                      <span>Get In Touch</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Direct Channels & Tactile Outro Card */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Connect Box */}
            <div className="bg-neutral-900/80 border border-neutral-800 p-6 sm:p-8 rounded-2xl space-y-6">
              <h3 className="font-display font-bold text-xl text-white">
                Direct Channels
              </h3>

              <div className="space-y-4 text-xs font-mono">
                <a
                  href="mailto:alexdavis.visuals@gmail.com"
                  className="flex items-center gap-3 p-3 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-[#ccff00] text-neutral-300 hover:text-white transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center text-[#ccff00]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-neutral-500 uppercase">Email</div>
                    <div className="text-white group-hover:text-[#ccff00] transition-colors">alexdavis.visuals@gmail.com</div>
                  </div>
                </a>

                <a
                  href="https://wa.me/4915298765432"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-[#ccff00] text-neutral-300 hover:text-white transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center text-[#ccff00]">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-neutral-500 uppercase">WhatsApp Direct</div>
                    <div className="text-white group-hover:text-[#ccff00] transition-colors">+49 152 9876 5432</div>
                  </div>
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-[#ccff00] text-neutral-300 hover:text-white transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center text-[#ccff00]">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-neutral-500 uppercase">Instagram Feed</div>
                    <div className="text-white group-hover:text-[#ccff00] transition-colors">@alexdavis.visuals</div>
                  </div>
                </a>

                <a
                  href="https://behance.net"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-[#ccff00] text-neutral-300 hover:text-white transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center text-[#ccff00]">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-neutral-500 uppercase">Behance Portfolio</div>
                    <div className="text-white group-hover:text-[#ccff00] transition-colors">behance.net/alexdavis</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Signature Paper Fold Outro Note */}
            <div className="relative p-6 rounded-2xl bg-neutral-950 border border-neutral-800/90 shadow-2xl overflow-hidden group">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/10 to-transparent pointer-events-none" />
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded bg-[#ccff00] text-black font-display font-black text-sm flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(204,255,0,0.4)]">
                  AD
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-white">
                    Thanks for visiting!
                  </h4>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                    "Paper doesn't just scroll, it reveals." Crafted with tactile paper physics,
                    custom editorial layouts, and neon accents.
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-neutral-900 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                <span>Berlin · Central European Time</span>
                <span className="text-[#ccff00]">● Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Minimalist Bottom Copyright */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div>
            © {new Date().getFullYear()} ALEX DAVIS. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span>Graphic Design</span>
            <span>·</span>
            <span>Motion Graphics</span>
            <span>·</span>
            <span>Tactile Direction</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
