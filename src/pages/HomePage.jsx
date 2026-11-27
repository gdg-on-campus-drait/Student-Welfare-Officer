import Hero from '../components/home/Hero';
import About from '../components/home/About';
import Academics from '../components/home/Academics';
import Departments from '../components/home/Departments';
import Placements from '../components/home/Placements';
import Research from '../components/home/Research';
import NewsNotices from '../components/home/NewsNotices';
import EventsCalendar from '../components/home/EventsCalendar';
import CampusLife from '../components/home/CampusLife';
import Gallery from '../components/home/Gallery';
import Alumni from '../components/home/Alumni';
import Contact from '../components/home/Contact';
import usePageTitle from '../lib/usePageTitle';

export default function HomePage() {
  usePageTitle('Dr. Ambedkar Institute of Technology, Bengaluru');
  return (
    <>
      <Hero />
      <About />
      <Academics />
      <Departments />
      <Placements />
      <NewsNotices />
      <Research />
      <EventsCalendar />
      <CampusLife />
      <Gallery />
      <Alumni />
      <Contact />
    </>
  );
}
