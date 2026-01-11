import React, { useState } from 'react';
import { Calendar, MapPin, Mail, Phone, Instagram, Music } from 'lucide-react';
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
import './App.css';

const concerts = [
  {
    date: 'Jan 10, 2026',
    venue: 'Barsouth Atlanta',
    location: 'Atlanta, GA',
    time: '10:00 PM',
    tickets: 'https://tickets.example.com'
  },
  {
    date: 'Jan 23, 2026',
    venue: 'Barsouth Atlanta',
    location: 'Atlanta, GA',
    time: '10:00 PM',
    tickets: 'https://tickets.example.com'
  },
  {
    date: 'Feb XX, 2026',
    venue: 'XX',
    location: 'Atlanta, GA',
    time: '11:00 PM',
    tickets: 'https://tickets.example.com'
  },
  {
    date: 'Feb 22, 2025',
    venue: 'Le Bataclan',
    location: 'Paris, FR',
    time: '8:30 PM',
    tickets: 'https://tickets.example.com'
  }
];

const bandMembers = [
  { name: 'Hayk Arsenyan', role: 'The Gigga Voice', image: hayk },
  { name: 'William Nudd', role: 'Lead Guitarist', image: nudd },
  { name: 'Charlie Suazo', role: 'Rhythm Guitarist', image: chuck },
  { name: 'Patrick Mombay', role: 'Bass', image: mombay },
  { name: 'Jack Rogers', role: 'Drums', image: jack }
];

function App() {
  const [currentPage, setCurrentPage] = useState('Home');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navbarScrolled, setNavbarScrolled] = useState(false);
  const [hoveredMember, setHoveredMember] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessFlash, setShowSuccessFlash] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavbarScrolled(true);
      } else {
        setNavbarScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleInputChange = (field, value) => {
    // Phone number formatting and validation
    if (field === 'phone') {
      // Remove all non-numeric characters
      const numbers = value.replace(/\D/g, '');

      // Limit to 10 digits (US format)
      const limited = numbers.slice(0, 10);

      // Format as (XXX) XXX-XXXX
      let formatted = limited;
      if (limited.length >= 6) {
        formatted = `(${limited.slice(0, 3)}) ${limited.slice(3, 6)}-${limited.slice(6)}`;
      } else if (limited.length >= 3) {
        formatted = `(${limited.slice(0, 3)}) ${limited.slice(3)}`;
      } else if (limited.length > 0) {
        formatted = `(${limited}`;
      }

      setFormData(prev => ({...prev, [field]: formatted}));
    } else {
      setFormData(prev => ({...prev, [field]: value}));
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    // Validate all fields are filled
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      alert('Please fill out all fields!');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address!');
      return;
    }

    // Validate phone number (must have 10 digits)
    const phoneNumbers = formData.phone.replace(/\D/g, '');
    if (phoneNumbers.length !== 10) {
      alert('Please enter a valid 10-digit phone number!');
      return;
    }

    setIsSubmitting(true);

    try {
      // Using EmailJS to send email
      const serviceID = 'service_6wb4ear';
      const templateID = 'template_gxdjnyk';
      const publicKey = 'w31q2cAQxn6SPi8Qw';

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        from_phone: `+1 ${formData.phone}`,
        message: formData.message
      };

      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: serviceID,
          template_id: templateID,
          user_id: publicKey,
          template_params: templateParams
        })
      });

      if (response.ok) {
        setShowSuccessFlash(true);
        setFormData({ name: '', email: '', phone: '', message: '' });

        setTimeout(() => {
          setShowSuccessFlash(false);
        }, 2000);
      } else {
        const errorText = await response.text();
        console.error('EmailJS error:', errorText);
        throw new Error('Failed to send');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send message. Please try again or email us directly at marsprojectatl@gmail.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  const NavBar = () => (
      <>
        <nav className={`navbar ${navbarScrolled ? 'scrolled' : ''}`}>
          <div className="navbar-content">
            <img
                src={inverted_logo}
                alt="Mars Project Logo"
                className="logo-img"
                onClick={() => setCurrentPage('Home')}
            />
            <div className="nav-links desktop-nav">
              {['Home', 'Shows', 'About', 'Contact'].map(page => (
                  <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`nav-button ${currentPage === page ? 'active' : ''}`}
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
                  {['Home', 'Shows', 'About', 'Contact'].map(page => (
                      <button
                          key={page}
                          onClick={() => {
                            setCurrentPage(page);
                            setMobileMenuOpen(false);
                          }}
                          className={`mobile-nav-button ${currentPage === page ? 'active' : ''}`}
                      >
                        {page}
                      </button>
                  ))}
                </div>
              </div>
            </div>
        )}
      </>
  );

  return (
      <div className="app">
        <NavBar />
        {currentPage === 'Home' && <HomePage setCurrentPage={setCurrentPage} />}
        {currentPage === 'Shows' && <ConcertsPage />}
        {currentPage === 'About' && <AboutPage hoveredMember={hoveredMember} setHoveredMember={setHoveredMember} />}
        {currentPage === 'Contact' && <ContactPage formData={formData} handleInputChange={handleInputChange} handleSubmit={handleSubmit} isSubmitting={isSubmitting} showSuccessFlash={showSuccessFlash} />}

        <a
            href="https://linktr.ee/marsprojectatl"
            target="_blank"
            rel="noopener noreferrer"
            className="linktree-tab"
        >
          <span className="linktree-icon">🔗</span>
          <span className="linktree-text">All Links</span>
        </a>
      </div>
  );
}

const HomePage = ({ setCurrentPage }) => (
    <div className="page home-page">
      <div className="home-background" style={{backgroundImage: `url(${mars_home})`}}></div>
      <div className="home-overlay"></div>
      <div className="home-content">
        <img
            src={logo}
            alt="Mars Project Logo"
            className="home-logo"
        />
        <p className="home-subtitle">
          Just some kids making music out of Atlanta, Georgia. Got great things coming! Wanna hear us live?
        </p>
        <button onClick={() => setCurrentPage('Shows')} className="btn-primary">
          SEE NEXT DATES
        </button>
      </div>
      <footer className="home-footer">
        <p>© 2026 Mars Project. All rights reserved.</p>
      </footer>
    </div>
);

const ConcertsPage = () => (
    <div className="page concerts-page">
      <div className="shows-page-background">
        <img src={mars_shows} alt="Mars Project Shows" className="shows-page-bg-img" />
        <div className="shows-page-overlay"></div>
      </div>

      <div className="page-container">
        <h2 className="page-title">Upcoming Shows</h2>
        <div className="concerts-list">
          {concerts.map((concert, idx) => (
              <div key={idx} className="concert-card">
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
                <a
                    href={concert.tickets}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-tickets"
                >
                  GET TICKETS
                </a>
              </div>
          ))}
        </div>
      </div>
      <footer className="page-footer">
        <p>© 2026 Mars Project. All rights reserved.</p>
      </footer>
    </div>
);

const AboutPage = ({ hoveredMember, setHoveredMember }) => (
    <div className="page about-page">
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
        <h2 className="page-title">Mars Project, this is us.</h2>

        <div className="about-text-marquee">
          <div className="marquee-bulbs"></div>
          <div className="about-text">
            <p className="story-text">
              Mars Project is a vibe. We don't like to describe us as an indie, rock or country band. We enjoy the magic of music,
              the magic of pushing the limits of our message, our sound and our style.
              Formed in 2025, we blend the groove and the melody into all sorts of modern genres with the goal of obtaining that
              "Mars level" sound, and create music that transports you to another dimension.
            </p>
            <p className="story-text">
              We are the resident band at Barsouth Buckhead in Atlanta, GA. There, we perform a few times every month. We have also performed
              in other events and venues, with the later highlights being: our last concert at Mercedes Benz Stadium Lot at the Georgia vs Georgia Tech
              official tailgate, where we played joined by The Gringos; then, our first out of town performance at Barsouth Athens, where we
              performed joined by our friends and fellow band, Flatline Drive. We are currently growing, learning and moving toward our mission
              of exploring our sound until the very last drop of music can be squeezed out. We want each performance to be a journey, an expedition
              to the red planet and beyond.
            </p>
          </div>
        </div>

        <h3 className="section-title">The Boys</h3>
        <div className="band-members">
          {bandMembers.map((member, idx) => (
              <div
                  key={idx}
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
          ))}
        </div>
      </div>
      <footer className="page-footer">
        <p>© 2026 Mars Project. All rights reserved.</p>
      </footer>
    </div>
);

const ContactPage = ({ formData, handleInputChange, handleSubmit, isSubmitting, showSuccessFlash }) => (
    <div className="page contact-page">
      {showSuccessFlash && (
          <div className="success-flash">
            <div className="success-message">
              <div className="success-icon">✓</div>
              <h3>Message Sent!</h3>
              <p>We'll get back to you soon 🎸</p>
            </div>
          </div>
      )}

      <div className="contact-page-background">
        <img src={logo} alt="Mars Project Logo" className="contact-page-bg-img" />
      </div>

      <div className="page-container-small">
        <h2 className="page-title">Interested in Bookings?</h2>
        <p className="page-subtitle">Wanna know something else?</p>

        <div className="contact-section">
          <div className="contact-info card">
            <h3 className="section-title">Reach out :)</h3>
            <div className="contact-items">
              <a href="mailto:marsprojectatl@gmail.com" className="contact-item-link">
                <div className="contact-item">
                  <Mail className="contact-icon" />
                  <div className="contact-details">
                    <p className="contact-label">Email</p>
                    <span className="contact-link">
                    marsprojectatl@gmail.com
                  </span>
                  </div>
                </div>
              </a>

              <a href="tel:+12345678900" className="contact-item-link">
                <div className="contact-item">
                  <Phone className="contact-icon" />
                  <div className="contact-details">
                    <p className="contact-label">Phone</p>
                    <span className="contact-link">
                    +1 (234) 567-8900
                  </span>
                  </div>
                </div>
              </a>

              <a href="https://instagram.com/marsprojectatl" target="_blank" rel="noopener noreferrer" className="contact-item-link">
                <div className="contact-item">
                  <Instagram className="contact-icon" />
                  <div className="contact-details">
                    <p className="contact-label">Instagram</p>
                    <span className="contact-link">
                    @marsprojectatl
                  </span>
                  </div>
                </div>
              </a>
            </div>
          </div>

          <div className="message-form card">
            <h3 className="section-title">Send us a message</h3>
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
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleSubmit(e);
                  }}
                  className="btn-submit"
                  disabled={isSubmitting}
              >
                {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <footer className="page-footer">
        <p>© 2026 Mars Project. All rights reserved.</p>
      </footer>
    </div>
);

export default App;