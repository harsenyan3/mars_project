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

function App() {
  const [currentPage, setCurrentPage] = useState('Home');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navbarScrolled, setNavbarScrolled] = useState(false);
  const [hoveredMember, setHoveredMember] = useState(null);

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

  const handleSubmit = () => {
    alert(`Message sent! Name: ${formData.name}, Email: ${formData.email}`);
    setFormData({ name: '', email: '', message: '' });
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

  const HomePage = () => (
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

  const AboutPage = () => (
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

  const ContactPage = () => (
      <div className="page contact-page">
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
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="form-input"
                />
                <input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="form-input"
                />
                <textarea
                    placeholder="Your Message"
                    rows="5"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="form-textarea"
                ></textarea>
                <button onClick={handleSubmit} className="btn-submit">
                  SEND MESSAGE
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

  return (
      <div className="app">
        <NavBar />
        {currentPage === 'Home' && <HomePage />}
        {currentPage === 'Shows' && <ConcertsPage />}
        {currentPage === 'About' && <AboutPage />}
        {currentPage === 'Contact' && <ContactPage />}

        {/* Fixed Linktree Tab */}
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

export default App;