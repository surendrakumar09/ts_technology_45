import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Github, Instagram, Facebook, ShieldCheck } from 'lucide-react';
import logoImg from '../assets/logo.png';

const Footer = ({ settings }) => {
  const companyName = settings?.company_name || 'TS Technology';
  const tagline = settings?.tagline || 'Empowering Minds, Building Digital Solutions for a Smarter Future.';
  const email = settings?.email || 'tstechnology2000@gmail.com';
  const phone = settings?.phone || '8008066034';
  const address = settings?.address || 'Ram Nagar, Ananthapur';

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div>
            <Link to="/" className="logo" style={{ marginBottom: '20px', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
              <img src={logoImg} alt="TS Teja Software Technology Logo" style={{ height: '46px', objectFit: 'contain', borderRadius: '6px' }} />
              <span>TS <span className="gradient-text">TECHNOLOGY</span></span>
            </Link>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '24px', lineHeight: '1.7' }}>
              "{tagline}"
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a href={settings?.social_linkedin || "https://linkedin.com"} target="_blank" rel="noreferrer" className="service-icon-box" style={{ width: '40px', height: '40px', marginBottom: 0 }} aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href={settings?.social_github || "https://github.com"} target="_blank" rel="noreferrer" className="service-icon-box" style={{ width: '40px', height: '40px', marginBottom: 0 }} aria-label="GitHub">
                <Github size={18} />
              </a>
              <a href={settings?.social_instagram || "https://instagram.com"} target="_blank" rel="noreferrer" className="service-icon-box" style={{ width: '40px', height: '40px', marginBottom: 0 }} aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="service-icon-box" style={{ width: '40px', height: '40px', marginBottom: 0 }} aria-label="Facebook">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '20px', color: 'var(--text-primary)' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><Link to="/" className="nav-link" style={{ padding: 0 }}>Home</Link></li>
              <li><Link to="/courses" className="nav-link" style={{ padding: 0 }}>IT Courses</Link></li>
              <li><Link to="/placements" className="nav-link" style={{ padding: 0 }}>Placements</Link></li>
              <li><Link to="/technologies" className="nav-link" style={{ padding: 0 }}>Technologies</Link></li>
              <li><Link to="/about" className="nav-link" style={{ padding: 0 }}>About Us</Link></li>
              <li><Link to="/contact" className="nav-link" style={{ padding: 0 }}>Contact / Admissions</Link></li>
              <li>
                <Link to="/admin/login" className="nav-link" style={{ padding: 0, color: 'var(--primary-blue)', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
                  <ShieldCheck size={16} />
                  <span>Staff Admin Portal</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Core Programs */}
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '20px', color: 'var(--text-primary)' }}>Training Programs</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              <li>Java Full-Stack with AI</li>
              <li>Python & Django Engineering</li>
              <li>React.js Frontend Development</li>
              <li>Database Solutions & MySQL</li>
              <li>Data Science & AI</li>
              <li>Placement Preparation</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '20px', color: 'var(--text-primary)' }}>Contact Info</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <MapPin size={20} style={{ color: 'var(--primary-blue)', flexShrink: 0 }} />
                <span>{address}</span>
              </li>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Phone size={18} style={{ color: 'var(--primary-blue)', flexShrink: 0 }} />
                <a href={`tel:${phone}`}>{phone}</a>
              </li>
              <li style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Mail size={18} style={{ color: 'var(--primary-blue)', flexShrink: 0 }} />
                <a href={`mailto:${email}`}>{email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 {companyName}. All Rights Reserved.</p>
          <div style={{ display: 'flex', gap: '24px' }}>
            <Link to="/admin/login" style={{ color: 'var(--text-muted)' }}>Staff Admin Portal</Link>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
