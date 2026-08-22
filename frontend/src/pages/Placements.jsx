import React, { useState, useEffect } from 'react';
import { Award, Briefcase, Building2, User, Star, CheckCircle2 } from 'lucide-react';
import { fetchPlacements, getCachedPlacements } from '../services/api';

const Placements = () => {
  const [placements, setPlacements] = useState(() => getCachedPlacements());
  const [loading, setLoading] = useState(() => getCachedPlacements().length === 0);

  useEffect(() => {
    const loadPlacements = async () => {
      if (placements.length === 0) setLoading(true);
      const data = await fetchPlacements();
      if (data && data.length > 0) setPlacements(data);
      setLoading(false);
    };
    loadPlacements();
  }, []);

  return (
    <div className="placements-page section-padding" style={{ paddingTop: 'calc(var(--header-height) + 40px)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="section-subtitle">
            <Award size={14} />
            <span>Placement & Career Success</span>
          </div>
          <h1 className="section-title">
            Our Students <span className="gradient-text">Hired at Top Companies</span>
          </h1>
          <p className="section-desc">
            Explore recent student placements, job roles, and career transformations achieved through TS Technology coaching.
          </p>
        </div>

        {/* Highlight Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '60px' }}>
          <div className="card-glass" style={{ padding: '24px', textAlign: 'center', borderTop: '3px solid var(--primary-blue)' }}>
            <h3 style={{ fontSize: '2.5rem', color: 'var(--primary-blue)' }}>100%</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Practical Project Curriculum</p>
          </div>
          <div className="card-glass" style={{ padding: '24px', textAlign: 'center', borderTop: '3px solid var(--primary-cyan)' }}>
            <h3 style={{ fontSize: '2.5rem', color: 'var(--primary-cyan)' }}>1:1</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Mock Technical Interviews</p>
          </div>
          <div className="card-glass" style={{ padding: '24px', textAlign: 'center', borderTop: '3px solid var(--primary-violet)' }}>
            <h3 style={{ fontSize: '2.5rem', color: 'var(--primary-violet)' }}>8.0+ LPA</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Top Package Placements</p>
          </div>
        </div>

        {/* Placements Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '28px' }}>
          {placements.map((pl) => (
            <div key={pl.id} className="card-glass" style={{ padding: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '1.35rem', marginBottom: '4px', color: 'var(--text-primary)' }}>{pl.student_name}</h3>
                  <span className="project-badge" style={{ position: 'static' }}>{pl.course_taken}</span>
                </div>
                {pl.package && (
                  <span className="btn btn-secondary" style={{ padding: '4px 12px', fontSize: '0.82rem', color: 'var(--accent-emerald)', borderColor: 'rgba(16, 185, 129, 0.3)', cursor: 'default' }}>
                    {pl.package}
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px', fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Building2 size={16} style={{ color: 'var(--primary-cyan)', flexShrink: 0 }} />
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{pl.company_name}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Briefcase size={16} style={{ color: 'var(--primary-blue)', flexShrink: 0 }} />
                  <span>{pl.role}</span>
                </div>
              </div>

              {pl.testimonial_quote && (
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: '1.6', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
                  "{pl.testimonial_quote}"
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Placements;
