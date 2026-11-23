import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import ClubsShowcase from './components/ClubsShowcase';
import TeamShowcase from './components/TeamShowcase';
import ActivitiesGallery from './components/ActivitiesGallery';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import { useLenis } from './hooks/useLenis';

export default function App() {
  // Initialize Lenis smooth scroll
  useLenis();

  return (
    <div className="min-h-screen flex flex-col bg-ivory text-charcoal font-sans selection:bg-lavender selection:text-plum">
      {/* Subtle Custom Cursor for Desktop */}
      <CustomCursor />

      {/* Editorial Navigation */}
      <Navbar />

      {/* Main Content Landmark */}
      <main className="flex-grow">
        {/* Milestone 1: Editorial Hero Section */}
        <Hero />

        {/* Section 2: About SWO & Welfare Charter */}
        <AboutSection />

        {/* Section 3: Student Communities & Hybrid Clubs Showcase */}
        <ClubsShowcase />

        {/* Section 4: Governance & Leadership Showcase */}
        <TeamShowcase />

        {/* Section 5: Campus Life & Activities Gallery */}
        <ActivitiesGallery />

        {/* Section 6: Student Helpdesk & Contact Section */}
        <ContactSection />
      </main>

      {/* Editorial Footer */}
      <Footer />
    </div>
  );
}
