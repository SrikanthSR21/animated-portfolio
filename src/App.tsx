import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { CustomCursor } from './components/CustomCursor';
import { HeroSection } from './components/HeroSection';
import { AboutSplitFace } from './components/AboutSplitFace';
import { FeaturedProjects } from './components/FeaturedProjects';
import { PosterPaperStack } from './components/PosterPaperStack';
import { SkillsTools } from './components/SkillsTools';
import { VideoShowreel } from './components/VideoShowreel';
import { TestimonialsAchievements } from './components/TestimonialsAchievements';
import { ContactSection } from './components/ContactSection';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { Project, PosterItem } from './types/portfolio';
import { FEATURED_PROJECTS, POSTER_COLLECTION } from './data/portfolioData';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedPoster, setSelectedPoster] = useState<PosterItem | null>(null);

  const handleSelectProject = (project: Project) => {
    setSelectedPoster(null);
    setSelectedProject(project);
  };

  const handleSelectPoster = (poster: PosterItem) => {
    setSelectedProject(null);
    setSelectedPoster(poster);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    setSelectedPoster(null);
  };

  // Next / Prev Project Navigation
  const handleNextProject = () => {
    if (selectedProject) {
      const idx = FEATURED_PROJECTS.findIndex((p) => p.id === selectedProject.id);
      const nextIdx = (idx + 1) % FEATURED_PROJECTS.length;
      setSelectedProject(FEATURED_PROJECTS[nextIdx]);
    } else if (selectedPoster) {
      const idx = POSTER_COLLECTION.findIndex((p) => p.id === selectedPoster.id);
      const nextIdx = (idx + 1) % POSTER_COLLECTION.length;
      setSelectedPoster(POSTER_COLLECTION[nextIdx]);
    }
  };

  const handlePrevProject = () => {
    if (selectedProject) {
      const idx = FEATURED_PROJECTS.findIndex((p) => p.id === selectedProject.id);
      const prevIdx = (idx - 1 + FEATURED_PROJECTS.length) % FEATURED_PROJECTS.length;
      setSelectedProject(FEATURED_PROJECTS[prevIdx]);
    } else if (selectedPoster) {
      const idx = POSTER_COLLECTION.findIndex((p) => p.id === selectedPoster.id);
      const prevIdx = (idx - 1 + POSTER_COLLECTION.length) % POSTER_COLLECTION.length;
      setSelectedPoster(POSTER_COLLECTION[prevIdx]);
    }
  };

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white selection:bg-[#ccff00] selection:text-black relative">
      {/* Custom Precision Neon Cursor */}
      <CustomCursor />

      {/* Global Top Bar Navigation */}
      <Navbar onNavigate={handleScrollToSection} />

      {/* Global Subtle Paper Grain / Noise Background */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.025] z-50 mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Main Flow of Sections (Following Exact Sequence from Brief & Storyboards) */}
      <main className="relative">
        {/* 01. Hero: Left & Right Cinematic Slide-In Alignment */}
        <HeroSection
          onViewWork={() => handleScrollToSection('projects')}
        />

        {/* 02. About: 4-Square Piece Head Split with Emerging Poster & Drawing Cards */}
        <AboutSplitFace onSelectPoster={handleSelectPoster} />

        {/* 03. Featured Projects: Interactive Gallery with Category Filters */}
        <FeaturedProjects
          onSelectProject={handleSelectProject}
        />

        {/* 04. Dedicated Poster Series: Interactive Crumpled Paper Stack Animation */}
        <PosterPaperStack
          onSelectPoster={handleSelectPoster}
        />

        {/* 05. Skills & Software: Circular Progress Dials & Tools Matrix */}
        <SkillsTools />

        {/* 06. Video Showreel: Cinematic Widescreen Frame & 4K Stream Player */}
        <VideoShowreel />

        {/* 07. Testimonials & Verified Achievements */}
        <TestimonialsAchievements />

        {/* 08. Contact & Final Outro */}
        <ContactSection />
      </main>

      {/* Case Study / Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        poster={selectedPoster}
        onClose={handleCloseModal}
        onNext={handleNextProject}
        onPrev={handlePrevProject}
      />
    </div>
  );
}
