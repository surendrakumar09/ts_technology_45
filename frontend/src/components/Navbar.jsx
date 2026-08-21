import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';
import logoImg from '../assets/logo.png';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

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

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
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

        <div>
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
