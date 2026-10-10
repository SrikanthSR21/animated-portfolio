import React from 'react';
import { motion } from 'motion/react';

export const TechnicalPhotoBackdrop: React.FC = () => {
  return (
    <div className="absolute inset-0 -m-8 sm:-m-12 md:-m-16 pointer-events-none flex items-center justify-center overflow-visible z-0">
      {/* Outer Neon Glow Aura */}
      <div className="absolute w-80 h-80 sm:w-96 sm:h-96 md:w-[480px] md:h-[480px] rounded-full bg-[#ccff00]/10 blur-[60px]" />

      {/* Layer 1: Outer Rotating Calibration Ring with Degree Ticks */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
        className="absolute w-72 h-72 sm:w-88 sm:h-88 md:w-[440px] md:h-[440px] rounded-full border border-[#ccff00]/25"
      >
        {/* Ticks at 0, 45, 90, 135, 180, 225, 270, 315 deg */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <div
            key={deg}
            className="absolute top-0 left-1/2 -translate-x-1/2 origin-bottom h-full w-[1px] pointer-events-none"
            style={{ transform: `rotate(${deg}deg)` }}
          >
            <div className="w-[1.5px] h-3 bg-[#ccff00]/60 mx-auto" />
            <div className="text-[7px] font-mono text-[#ccff00]/70 select-none text-center mt-0.5">
              {deg}°
            </div>
          </div>
        ))}
      </motion.div>

      {/* Layer 2: Counter-Rotating Dashed Tech Reticle */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute w-64 h-64 sm:w-80 sm:h-80 md:w-[400px] md:h-[400px] rounded-full border border-dashed border-[#ccff00]/40"
      />

      {/* Layer 3: Concentric Geometric Polygon / Hexagon Reticle */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
        className="absolute w-56 h-56 sm:w-72 sm:h-72 md:w-[360px] md:h-[360px] rounded-full border border-cyan-400/20"
      >
        {/* 4 Corner Crosshairs */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#ccff00]" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#ccff00]" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#ccff00]" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#ccff00]" />
      </motion.div>

      {/* Layer 4: Animated Radar Sweep Line */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        className="absolute w-72 h-72 sm:w-96 sm:h-96 md:w-[460px] md:h-[460px] rounded-full pointer-events-none overflow-hidden"
      >
        <div
          className="w-1/2 h-1/2 origin-bottom-right"
          style={{
            background: 'conic-gradient(from 0deg at 100% 100%, rgba(204,255,0,0.3) 0deg, transparent 60deg)',
          }}
        />
      </motion.div>

      {/* Layer 5: Vertical Laser Scan Beam */}
      <motion.div
        animate={{
          y: [-160, 160, -160],
          opacity: [0.2, 0.7, 0.2],
        }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-72 sm:w-88 md:w-[440px] h-[1.5px] bg-gradient-to-r from-transparent via-[#ccff00] to-transparent shadow-[0_0_12px_#ccff00]"
      />

      {/* Layer 6: Technical Telemetry Data Annotations */}
      <div className="absolute -top-3 left-4 font-mono text-[9px] text-[#ccff00]/80 tracking-widest bg-black/60 px-2 py-0.5 rounded border border-[#ccff00]/30 backdrop-blur-sm">
        SYS.VECTOR // 45.2°
      </div>

      <div className="absolute -bottom-3 right-4 font-mono text-[9px] text-cyan-400/80 tracking-widest bg-black/60 px-2 py-0.5 rounded border border-cyan-500/30 backdrop-blur-sm">
        MATRIX [1024:768] · ACTIVE
      </div>

      <div className="absolute top-1/2 -left-6 -translate-y-1/2 -rotate-90 font-mono text-[8px] text-neutral-400 tracking-wider">
        CORE_FREQ 432Hz
      </div>

      <div className="absolute top-1/2 -right-6 -translate-y-1/2 rotate-90 font-mono text-[8px] text-neutral-400 tracking-wider">
        OPTICAL_PASS 0.98
      </div>

      {/* Layer 7: Animated Equalizer / Waveform Bars (Bottom Left) */}
      <div className="absolute bottom-2 left-6 flex items-end gap-1 h-6">
        {[0.4, 0.9, 0.6, 1, 0.5, 0.8, 0.3].map((heightRatio, i) => (
          <motion.div
            key={i}
            animate={{
              height: ['20%', `${heightRatio * 100}%`, '20%'],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.15,
              ease: 'easeInOut',
            }}
            className="w-1 bg-[#ccff00]/80 rounded-t-sm shadow-[0_0_4px_#ccff00]"
          />
        ))}
      </div>
    </div>
  );
};
