import { useRef, useState, type RefObject } from 'react';
import { Navbar } from './components/layout/Navbar';
import { MobileMenu } from './components/layout/MobileMenu';
import { Footer } from './components/layout/Footer';
import { Home } from './sections/Home/Home';
import { Shows } from './sections/Shows/Shows';
import { About } from './sections/About/About';
import { Contact } from './sections/Contact/Contact';
import { useScrollSpy } from './hooks/useScrollSpy';
import { upcomingConcerts } from './data/concerts';
import { bandMembers } from './data/bandMembers';
import { SectionKey } from './types';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sectionRefs: Record<SectionKey, RefObject<HTMLElement | null>> = {
    home: useRef<HTMLElement>(null),
    shows: useRef<HTMLElement>(null),
    about: useRef<HTMLElement>(null),
    contact: useRef<HTMLElement>(null),
  };

  const activeSection = useScrollSpy(sectionRefs);

  const scrollTo = (section: SectionKey) => {
    sectionRefs[section].current?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div className="app">
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollTo}
        onToggleMobileMenu={() => setMobileMenuOpen((open) => !open)}
      />

      {mobileMenuOpen && (
        <MobileMenu
          activeSection={activeSection}
          onNavigate={scrollTo}
          onClose={() => setMobileMenuOpen(false)}
        />
      )}

      <main>
        <Home ref={sectionRefs.home} onSeeShows={() => scrollTo('shows')} />
        <Shows ref={sectionRefs.shows} concerts={upcomingConcerts} />
        <About ref={sectionRefs.about} bandMembers={bandMembers} />
        <Contact ref={sectionRefs.contact} />
      </main>

      <Footer />
    </div>
  );
}

export default App;
