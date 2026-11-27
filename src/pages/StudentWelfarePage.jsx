import { ChevronRight } from 'lucide-react';
import SmartLink from '../components/ui/SmartLink';
import Button from '../components/ui/Button';
import AboutSection from '../components/swo/AboutSection';
import ActivitiesShowcase from '../components/swo/ActivitiesShowcase';
import HelpdeskSection from '../components/swo/HelpdeskSection';
import usePageTitle from '../lib/usePageTitle';
import banner from '../assets/gallery/sanskruthi-2025.webp';

export default function StudentWelfarePage() {
  usePageTitle('Student Welfare Office — Dr. Ambedkar Institute of Technology');
  return (
    <>
      <section id="top" className="relative isolate overflow-hidden bg-navy-950 pb-20 pt-36 text-white sm:pb-24 sm:pt-44">
        <img src={banner} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-40" fetchPriority="high" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950 via-navy-950/80 to-navy-950/40" />
        <div className="container-site">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-white/60">
            <SmartLink to="/" className="hover:text-white">Home</SmartLink>
            <ChevronRight className="h-3 w-3" aria-hidden />
            <span>Campus Life</span>
            <ChevronRight className="h-3 w-3" aria-hidden />
            <span className="text-white">Student Welfare Office</span>
          </nav>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-6xl">
            Student Welfare <span className="text-gold-300">Office</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            A platform for students to showcase their talents, connect with like-minded peers and grow — personally and professionally.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/student-welfare#clubs" variant="gold" size="lg">Explore activities</Button>
            <Button to="/student-welfare#helpdesk" variant="glass" size="lg">Student helpdesk</Button>
          </div>
        </div>
      </section>
      <AboutSection />
      <ActivitiesShowcase />
      <HelpdeskSection />
    </>
  );
}
