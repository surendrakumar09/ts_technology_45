import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight, Mail, Phone } from 'lucide-react';
import logoImg from '../assets/logo.png';

const Navbar = ({ settings }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const email = (settings?.email && settings.email !== 'contact@tstechnology.com' && settings.email !== 'tstechnology2000@gmail.com') ? settings.email : 'tssoftwaretechnology@gmail.com';
  const phone = settings?.phone || '8008066034';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-inner">
          <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img 
              src={logoImg} 
              alt="TS Teja Software Technology Logo" 
              style={{ height: '48px', width: 'auto', borderRadius: '6px', objectFit: 'contain' }} 
            />
            <span style={{ fontSize: '1.25rem' }}>TS <span className="gradient-text">TECHNOLOGY</span></span>
          </Link>

          <nav>
            <ul className="nav-links">
              <li>
                <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/courses" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  Courses
                </NavLink>
              </li>
              <li>
                <NavLink to="/placements" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  Placements
                </NavLink>
              </li>
              <li>
                <NavLink to="/technologies" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  Technologies
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  Contact / Admissions
                </NavLink>
              </li>
            </ul>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <a 
              href={`mailto:${email}`} 
              className="navbar-email-btn"
              title={`Email TS Technology at ${email}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.85rem',
                fontWeight: 500,
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                padding: '8px 14px',
                borderRadius: '8px',
                background: 'rgba(37, 99, 235, 0.06)',
                border: '1px solid rgba(37, 99, 235, 0.15)',
                transition: 'all 0.2s ease'
              }}
            >
              <Mail size={15} style={{ color: 'var(--primary-blue)', flexShrink: 0 }} />
              <span className="nav-email-text">{email}</span>
            </a>

            <Link to="/courses" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '0.88rem' }}>
              <span>Enroll Now</span>
              <ChevronRight size={16} />
            </Link>

            <button 
              className="mobile-toggle" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div 
        className={`mobile-overlay ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Drawer Navigation */}
      <aside className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img src={logoImg} alt="TS Teja Software Technology Logo" style={{ height: '40px', objectFit: 'contain' }} />
              <span>TS TECH</span>
            </Link>
            <button onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-muted)' }}>
              <X size={24} />
            </button>
          </div>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <li><NavLink to="/" className="nav-link" style={{ fontSize: '1.1rem' }}>Home</NavLink></li>
            <li><NavLink to="/courses" className="nav-link" style={{ fontSize: '1.1rem' }}>IT Courses</NavLink></li>
            <li><NavLink to="/placements" className="nav-link" style={{ fontSize: '1.1rem' }}>Placements</NavLink></li>
            <li><NavLink to="/technologies" className="nav-link" style={{ fontSize: '1.1rem' }}>Technologies</NavLink></li>
            <li><NavLink to="/about" className="nav-link" style={{ fontSize: '1.1rem' }}>About Institute</NavLink></li>
            <li><NavLink to="/contact" className="nav-link" style={{ fontSize: '1.1rem' }}>Contact & Admissions</NavLink></li>
          </ul>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ padding: '14px', borderRadius: '10px', background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.04em' }}>Get In Touch</div>
            <a 
              href={`mailto:${email}`} 
              style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500, marginBottom: '8px' }}
            >
              <Mail size={15} style={{ color: 'var(--primary-blue)', flexShrink: 0 }} />
              <span style={{ wordBreak: 'break-all' }}>{email}</span>
            </a>
            <a 
              href={`tel:${phone}`} 
              style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500 }}
            >
              <Phone size={15} style={{ color: 'var(--accent-emerald)', flexShrink: 0 }} />
              <span>+91 {phone}</span>
            </a>
          </div>

          <Link to="/contact" className="btn btn-primary" style={{ width: '100%' }}>
            <span>Inquire for Admissions</span>
            <ChevronRight size={18} />
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
