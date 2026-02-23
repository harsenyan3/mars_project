import React, { useState, useEffect, useRef } from 'react';
import { Calendar, MapPin, Mail, Phone, Instagram } from 'lucide-react';
import logo from './mars_logo.png';
import inverted_logo from './mars_logo (1).png';
import mars_home from './mars_home.jpg';
import about_mars from './mars_members.jpg';
import mars_shows from './mars_shows.png';
import hayk from './hayk.png';
import nudd from './nudd.jpg';
import chuck from './chuck.JPEG';
import mombay from './mombay.JPEG';
import jack from './jack.jpeg';
import dom from './dom.png';
import './App.css';

const concerts = [
  {
    date: 'Mar 5, 2026',
    venue: 'UGA Sigma Chi',
    location: 'Athens, GA',
    time: '8:00 PM',
    ticketed: false,
  },
  {
    date: 'Mar 13, 2026',
    venue: 'Lost Dog Tavern',
    location: 'Atlanta, GA',
    time: '9:00 PM',
    ticketed: false,
  },
  {
    date: 'Mar 14, 2026',
    venue: 'Georgia Tech SAE',
    location: 'Atlanta, GA',
    time: '10:00 PM',
    ticketed: false,
  },
  {
    date: 'April 10, 2026',
    venue: 'Georgia Tech Porchfest',
    location: 'Atlanta, GA',
    time: '4:00 PM',
    ticketed: false,
  },
  {
    date: 'April 11, 2026',
    venue: 'Barsouth Buckhead',
    location: 'Atlanta, GA',
    time: '11:00 PM',
    ticketed: false,
  }
];

const bandMembers = [
  { name: 'Hayk Arsenyan', role: 'Lead Singer', image: hayk },
  { name: 'William Nudd', role: 'Guitarist', image: nudd },
  { name: 'Charlie Suazo', role: 'Guitarist', image: chuck },
  { name: 'Patrick Mombay', role: 'Bass', image: mombay },
  { name: 'Jack Rogers', role: 'Drummer', image: jack },
  { name: 'Dom Peric', role: 'Drummer', image: dom },
];

// Global scroll direction tracker
let lastScrollY = window.scrollY;
let scrollDirection = 'down';
window.addEventListener('scroll', () => {
  scrollDirection = window.scrollY > lastScrollY ? 'down' : 'up';
  lastScrollY = window.scrollY;
}, { passive: true });

function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px', ...options });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return [ref, inView];
}

function AnimatedSection({ children, className = '', delay = 0, direction = 'up' }) {
  const [ref, inView] = useInView();
  const [exitDir, setExitDir] = useState(direction);

  useEffect(() => {
    if (!inView) {
      // When leaving, set exit direction based on scroll
      if (direction === 'left' || direction === 'right') {
        setExitDir(direction); // horizontal stays same
      } else {
        // vertical: exit up if scrolling down past it, down if scrolling back up
        setExitDir(scrollDirection === 'down' ? 'down' : 'up');
      }
    }
  }, [inView, direction]);

  const transforms = {
    up: 'translateY(45px)',
    down: 'translateY(-45px)',
    left: 'translateX(-45px)',
    right: 'translateX(45px)',
    fade: 'scale(0.94)',
  };

  return (
      <div
          ref={ref}
          className={className}
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'none' : transforms[inView ? direction : exitDir],
            transition: inView
                ? `opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`
                : `opacity 0.4s cubic-bezier(0.4, 0, 1, 1) 0s, transform 0.4s cubic-bezier(0.4, 0, 1, 1) 0s`,
            willChange: 'opacity, transform',
          }}
      >
        {children}
      </div>
  );
}

function App() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [navbarScrolled, setNavbarScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredMember, setHoveredMember] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessFlash, setShowSuccessFlash] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const sectionRefs = {
    home: useRef(null),
    shows: useRef(null),
    about: useRef(null),
    contact: useRef(null),
  };

  useEffect(() => {
    const handleScroll = () => {
      setNavbarScrolled(window.scrollY > 50);

      // Determine active section
      const scrollPos = window.scrollY + 120;
      for (const [key, ref] of Object.entries(sectionRefs)) {
        if (ref.current) {
          const top = ref.current.offsetTop;
          const bottom = top + ref.current.offsetHeight;
          if (scrollPos >= top && scrollPos < bottom) {
            setActiveSection(key);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const scrollTo = (section) => {
    sectionRefs[section].current?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleInputChange = (field, value) => {
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
      setFormData(prev => ({ ...prev, [field]: formatted }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
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
          service_id: 'service_6wb4ear',
          template_id: 'template_gxdjnyk',
          user_id: 'w31q2cAQxn6SPi8Qw',
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
        setFormData({ name: '', email: '', phone: '', message: '' });
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
        {/* NAVBAR */}
        <nav className={`navbar ${navbarScrolled ? 'scrolled' : ''}`}>
          <div className="navbar-content">
            <img
                src={inverted_logo}
                alt="Mars Project Logo"
                className="logo-img"
                onClick={() => scrollTo('home')}
            />
            <div className="nav-links desktop-nav">
              {['home', 'shows', 'about', 'contact'].map(page => (
                  <button
                      key={page}
                      onClick={() => scrollTo(page)}
                      className={`nav-button ${activeSection === page ? 'active' : ''}`}
                  >
                    {page}
                  </button>
              ))}
            </div>
            <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <div className="hamburger-line"></div>
              <div className="hamburger-line"></div>
              <div className="hamburger-line"></div>
            </button>
          </div>
        </nav>

        {mobileMenuOpen && (
            <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}>
              <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
                <button className="mobile-menu-close" onClick={() => setMobileMenuOpen(false)}>✕</button>
                <div className="mobile-nav-links">
                  {['home', 'shows', 'about', 'contact'].map(page => (
                      <button
                          key={page}
                          onClick={() => scrollTo(page)}
                          className={`mobile-nav-button ${activeSection === page ? 'active' : ''}`}
                      >
                        {page}
                      </button>
                  ))}
                </div>
              </div>
            </div>
        )}

        {/* SUCCESS FLASH */}
        {showSuccessFlash && (
            <div className="success-flash">
              <div className="success-message">
                <div className="success-icon">✓</div>
                <h3>Message Sent!</h3>
                <p>We'll get back to you soon 🎸</p>
              </div>
            </div>
        )}

        {/* ===================== HOME SECTION ===================== */}
        <section ref={sectionRefs.home} className="section home-section">
          <div className="home-background" style={{ backgroundImage: `url(${mars_home})` }}></div>
          <div className="home-overlay"></div>
          <div className="home-content">
            <img src={logo} alt="Mars Project Logo" className="home-logo" />
            <p className="home-subtitle">
              Just some kids making music out of Atlanta, Georgia. Ready to hear us live?
            </p>
            <button onClick={() => scrollTo('shows')} className="btn-primary">
              SEE NEXT DATES
            </button>
          </div>
          <div className="scroll-indicator" onClick={() => scrollTo('shows')}>
            <div className="scroll-arrow"></div>
          </div>
        </section>

        {/* ===================== SHOWS SECTION ===================== */}
        <section ref={sectionRefs.shows} className="section shows-section">
          <div className="shows-page-background">
            <img src={mars_shows} alt="Mars Project Shows" className="shows-page-bg-img" />
            <div className="shows-page-overlay"></div>
          </div>

          <div className="page-container">
            <AnimatedSection>
              <h2 className="page-title">Upcoming Shows</h2>
            </AnimatedSection>
            <div className="concerts-list">
              {concerts.map((concert, idx) => (
                  <AnimatedSection key={idx} delay={idx * 0.12} direction="left">
                    <div className="concert-card">
                      <div className="concert-info">
                        <div className="concert-date">
                          <Calendar className="icon" />
                          <span className="date-text">{concert.date}</span>
                          <span className="separator">•</span>
                          <span className="time-text">{concert.time}</span>
                        </div>
                        <h3 className="concert-venue">{concert.venue}</h3>
                        <div className="concert-location">
                          <MapPin className="icon-small" />
                          <span>{concert.location}</span>
                        </div>
                      </div>
                      {concert.ticketed ? (
                          <a
                              href={concert.tickets}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-tickets"
                          >
                            GET TICKETS
                          </a>
                      ) : (
                          <span className="btn-tickets-free">FREE ENTRY</span>
                      )}
                    </div>
                  </AnimatedSection>
              ))}
            </div>
          </div>

        </section>

        {/* ===================== ABOUT SECTION ===================== */}
        <section ref={sectionRefs.about} className="section about-section">
          <div className="about-page-background">
            <img src={about_mars} alt="Mars Project Band" className="about-page-bg-img" />
            <div className="about-page-overlay"></div>
          </div>

          {hoveredMember && (
              <div className="member-hover-background">
                <img src={hoveredMember} alt="Band Member" className="member-hover-img" />
                <div className="member-hover-overlay"></div>
              </div>
          )}

          <div className="page-container">

            <AnimatedSection delay={0.1} direction="fade">
              <div className="manifesto-block">
                <div className="manifesto-declarations">
                  <div className="manifesto-line crossed">We are not indie.</div>
                  <div className="manifesto-line crossed">We are not rock.</div>
                  <div className="manifesto-line crossed">We are not country.</div>
                  <div className="manifesto-line crossed">We are not pop.</div>
                  <div className="manifesto-line highlight">We are MARS.</div>
                </div>

                <div className="manifesto-body">
                  <p>Just a bunch of kids grooving, watching this movement get bigger every time we hit the stage. Pushing our message. Stretching our sound. Finding new colors in the music.</p>
                  <p>Established in 2025 in Atlanta, GA. We've shared stages at Mercedes Benz Stadium, Barsouth Athens — alongside The Gringos, Flatline Drive, and more.</p>
                  <p>Every performance is a journey. An expedition to the red planet and beyond.</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h3 className="section-title">The Boys</h3>
            </AnimatedSection>

            <div className="band-members">
              {bandMembers.map((member, idx) => (
                  <AnimatedSection key={idx} delay={idx * 0.08} direction="up">
                    <div
                        className="member-card card"
                        onMouseEnter={() => setHoveredMember(member.image)}
                        onMouseLeave={() => setHoveredMember(null)}
                    >
                      <div className="member-photo">
                        <img src={member.image} alt={member.name} className="member-img" />
                      </div>
                      <h4 className="member-name">{member.name}</h4>
                      <p className="member-role">{member.role}</p>
                    </div>
                  </AnimatedSection>
              ))}
            </div>
          </div>

        </section>

        {/* ===================== CONTACT SECTION ===================== */}
        <section ref={sectionRefs.contact} className="section contact-section">
          <div className="contact-page-background">
            <img src={logo} alt="Mars Project Logo" className="contact-page-bg-img" />
          </div>

          <div className="page-container-small">
            <AnimatedSection>
              <h2 className="page-title">Interested in Bookings?</h2>
              <p className="page-subtitle">Wanna know something else?</p>
            </AnimatedSection>

            <div className="contact-section-grid">
              <AnimatedSection delay={0.1} direction="left">
                <div className="contact-info card">
                  <h3 className="card-title">Reach out :)</h3>
                  <div className="contact-items">
                    <a href="mailto:marsprojectatl@gmail.com" className="contact-item-link">
                      <div className="contact-item">
                        <Mail className="contact-icon" />
                        <div className="contact-details">
                          <p className="contact-label">Email</p>
                          <span className="contact-link">marsprojectatl@gmail.com</span>
                        </div>
                      </div>
                    </a>
                    <a href="tel:+12345678900" className="contact-item-link">
                      <div className="contact-item">
                        <Phone className="contact-icon" />
                        <div className="contact-details">
                          <p className="contact-label">Phone</p>
                          <span className="contact-link">+1 (234) 567-8900</span>
                        </div>
                      </div>
                    </a>
                    <a href="https://instagram.com/marsprojectatl" target="_blank" rel="noopener noreferrer" className="contact-item-link">
                      <div className="contact-item">
                        <Instagram className="contact-icon" />
                        <div className="contact-details">
                          <p className="contact-label">Instagram</p>
                          <span className="contact-link">@marsprojectatl</span>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2} direction="right">
                <div className="message-form card">
                  <h3 className="card-title">Send us a message</h3>
                  <div className="form-fields">
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="form-input"
                    />
                    <input
                        type="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="form-input"
                    />
                    <input
                        type="tel"
                        placeholder="Your Phone Number"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="form-input"
                        maxLength="14"
                    />
                    <textarea
                        placeholder="Your Message"
                        rows="5"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        className="form-textarea"
                    ></textarea>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="btn-submit"
                        disabled={isSubmitting}
                    >
                      {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                    </button>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>

        </section>

        {/* ===================== GLOBAL FOOTER ===================== */}
        <footer className="global-footer">
          <div className="footer-inner">
            <div className="footer-socials">
              <a
                  href="https://instagram.com/marsprojectatl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  aria-label="Instagram"
              >
                {/* Instagram SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="footer-social-icon">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
                <span>@marsprojectatl</span>
              </a>

              <a
                  href="https://tiktok.com/@marsprojectatl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  aria-label="TikTok"
              >
                {/* TikTok SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="footer-social-icon">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
                </svg>
                <span>@marsprojectatl</span>
              </a>

              <a
                  href="https://linktr.ee/marsprojectatl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link footer-linktree"
                  aria-label="All Links"
              >
                <span className="footer-link-emoji">🔗</span>
                <span>All Links</span>
              </a>
            </div>

            <p className="footer-copy">© 2026 Mars Project. All rights reserved.</p>
          </div>
        </footer>
      </div>
  );
}

export default App;