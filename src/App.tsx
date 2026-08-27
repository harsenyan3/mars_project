import { useRef, useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { MobileMenu } from './components/layout/MobileMenu';
import { Footer } from './components/layout/Footer';
import { SuccessFlash } from './components/common/SuccessFlash';
import { Home } from './pages/Home/Home';
import { Shows } from './pages/Shows/Shows';
import { About } from './pages/About/About';
import { Contact } from './pages/Contact/Contact';
import { useScrollSpy } from './hooks/useScrollSpy';
import { concerts } from './data/concerts';
import { bandMembers } from './data/bandMembers';
import { ContactFormData, SectionKey } from './types';
import './App.css';

const EMPTY_FORM: ContactFormData = { name: '', email: '', phone: '', message: '' };

// EmailJS project identifiers. These are the client-side "public key" style
// EmailJS IDs (not secrets), matching what was previously inlined in App.js.
const EMAILJS_SERVICE_ID = 'service_6wb4ear';
const EMAILJS_TEMPLATE_ID = 'template_gxdjnyk';
const EMAILJS_USER_ID = 'w31q2cAQxn6SPi8Qw';

function App() {
  const [formData, setFormData] = useState<ContactFormData>(EMPTY_FORM);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessFlash, setShowSuccessFlash] = useState(false);

  const sectionRefs: Record<SectionKey, React.RefObject<HTMLElement | null>> = {
    home: useRef<HTMLElement>(null),
    shows: useRef<HTMLElement>(null),
    about: useRef<HTMLElement>(null),
    contact: useRef<HTMLElement>(null),
  };

  const { navbarScrolled, activeSection } = useScrollSpy(sectionRefs);

  const scrollTo = (section: SectionKey) => {
    sectionRefs[section].current?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    if (field === 'phone') {
      const numbers = value.replace(/\D/g, '').slice(0, 10);
      let formatted = numbers;
      if (numbers.length >= 6) {
        formatted = `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6)}`;
      } else if (numbers.length >= 3) {
        formatted = `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
      } else if (numbers.length > 0) {
        formatted = `(${numbers}`;
      }
      setFormData((prev) => ({ ...prev, phone: formatted }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      alert('Please fill out all fields!');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address!');
      return;
    }
    if (formData.phone.replace(/\D/g, '').length !== 10) {
      alert('Please enter a valid 10-digit phone number!');
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_USER_ID,
          template_params: {
            from_name: formData.name,
            from_email: formData.email,
            from_phone: `+1 ${formData.phone}`,
            message: formData.message,
          },
        }),
      });
      if (response.ok) {
        setShowSuccessFlash(true);
        setFormData(EMPTY_FORM);
        setTimeout(() => setShowSuccessFlash(false), 2000);
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      alert('Failed to send message. Please try again or email us directly at marsprojectatl@gmail.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="app">
      <Navbar
        scrolled={navbarScrolled}
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

      <SuccessFlash show={showSuccessFlash} />

      <Home ref={sectionRefs.home} onSeeShows={() => scrollTo('shows')} />
      <Shows ref={sectionRefs.shows} concerts={concerts} />
      <About
        ref={sectionRefs.about}
        bandMembers={bandMembers}
        hoveredMember={hoveredMember}
        onHoverMember={setHoveredMember}
      />
      <Contact
        ref={sectionRefs.contact}
        formData={formData}
        onFieldChange={handleInputChange}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />

      <Footer />
    </div>
  );
}

export default App;
