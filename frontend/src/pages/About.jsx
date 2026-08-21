import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Target, Eye, Cpu, CheckCircle2, Award, Zap, Code, ArrowRight } from 'lucide-react';
import ProcessTimeline from '../components/ProcessTimeline';

const About = () => {
  return (
    <div className="about-page section-padding" style={{ paddingTop: 'calc(var(--header-height) + 40px)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div className="section-subtitle">
            <Cpu size={14} />
            <span>About TS Technology</span>
          </div>
          <h1 className="section-title">
            Engineering Digital Solutions for a <span className="gradient-text">Smarter Future</span>
          </h1>
          <p className="section-desc">
            TS Technology provides modern digital solutions, web development, software development, business automation, IT services, and technology solutions for businesses and organizations.
          </p>
        </div>

        {/* Who We Are Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', marginBottom: '80px', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '20px' }}>Who We Are</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '16px' }}>
              TS Technology is a technology solutions provider committed to delivering robust, scalable, and secure software applications. We build digital products designed to streamline enterprise workflows, modernize online presences, and enhance client operations.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '24px' }}>
              Our engineering team specializes in clean architecture, coupling React frontends with Python Django microservices and MySQL database layers.
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <div className="card-glass" style={{ padding: '16px 24px', flex: '1' }}>
                <Code size={24} style={{ color: 'var(--primary-blue)', marginBottom: '8px' }} />
                <h4 style={{ fontSize: '1rem' }}>Modern Stack</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>React, Django, MySQL</p>
              </div>
              <div className="card-glass" style={{ padding: '16px 24px', flex: '1' }}>
                <ShieldCheck size={24} style={{ color: 'var(--primary-violet)', marginBottom: '8px' }} />
                <h4 style={{ fontSize: '1rem' }}>Security First</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>CSRF, ORM, Encryption</p>
              </div>
            </div>
          </div>

          <div className="card-glass" style={{ padding: '40px', background: 'var(--gradient-card)', border: '1px solid var(--border-active)' }}>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '24px', color: 'var(--text-primary)' }}>Core Pillars</h3>
            
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
              <div className="service-icon-box" style={{ width: '48px', height: '48px', flexShrink: 0 }}>
                <Target size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '6px' }}>Our Mission</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                  To deliver reliable, high-grade software applications that drive growth and optimize operational workflow for businesses globally.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <div className="service-icon-box" style={{ width: '48px', height: '48px', flexShrink: 0 }}>
                <Eye size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '6px' }}>Our Vision</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                  To be a trusted partner in digital transformation, creating intelligent software architecture that scales seamlessly into the future.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose TS Technology */}
        <div style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 className="section-title">Why Choose TS Technology</h2>
            <p className="section-desc">We prioritize technical excellence, transparent architecture, and business outcomes.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {[
              {
                title: 'Database & Security Rigor',
                desc: 'We enforce strict ORM queries, environment secrets, CSRF controls, and production database normalization.'
              },
              {
                title: 'Clean Architecture',
                desc: 'Separation of concerns between React component trees and RESTful Django backend APIs.'
              },
              {
                title: 'Scalable Engineering',
                desc: 'Built with modular Django applications ready for cloud deployment on Render, Railway, AWS, or VPS.'
              },
              {
                title: 'Dedicated Client Support',
                desc: 'Full documentation, Django Admin management dashboard, and ongoing site maintenance.'
              }
            ].map((item, idx) => (
              <div key={idx} className="card-glass" style={{ padding: '32px' }}>
                <div className="service-icon-box" style={{ width: '44px', height: '44px', marginBottom: '16px' }}>
                  <CheckCircle2 size={22} />
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Process Section */}
        <div style={{ marginBottom: '60px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 className="section-title">Our Approach</h2>
            <p className="section-desc">Disciplined execution from requirement discovery to cloud deployment.</p>
          </div>

          <ProcessTimeline />
        </div>

        {/* Call to Action */}
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <Link to="/contact" className="btn btn-primary">
            <span>Speak With Our Engineers</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
