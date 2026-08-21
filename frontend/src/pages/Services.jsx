import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layers, ChevronRight, CheckCircle2, ArrowRight } from 'lucide-react';
import ServiceCard from '../components/ServiceCard';
import { fetchServices } from '../services/api';

const Services = ({ selectedService, onClearSelected }) => {
  const [services, setServices] = useState([]);
  const [activeModalService, setActiveModalService] = useState(selectedService || null);

  useEffect(() => {
    const loadServices = async () => {
      const data = await fetchServices();
      setServices(data);
    };
    loadServices();
  }, []);

  return (
    <div className="services-page section-padding" style={{ paddingTop: 'calc(var(--header-height) + 40px)' }}>
      <div className="container">
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div className="section-subtitle">
            <Layers size={14} />
            <span>Our Services</span>
          </div>
          <h1 className="section-title">
            Enterprise Digital & <span className="gradient-text">Software Engineering</span>
          </h1>
          <p className="section-desc">
            TS Technology offers comprehensive software development, full-stack web engineering, database architecture, and IT strategy.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="services-grid">
          {services.map((service) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              onSelect={(s) => setActiveModalService(s)}
            />
          ))}
        </div>

        {/* Detailed Service Modal */}
        {activeModalService && (
          <div className="modal-overlay" onClick={() => setActiveModalService(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setActiveModalService(null)}>×</button>
              
              <div style={{ marginBottom: '20px' }}>
                <span className="section-subtitle" style={{ marginBottom: '12px' }}>Service Detail</span>
                <h2 style={{ fontSize: '2rem', marginBottom: '12px' }}>{activeModalService.title}</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.7' }}>
                  {activeModalService.full_description}
                </p>
              </div>

              {activeModalService.feature_list && (
                <div style={{ marginBottom: '24px' }}>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '12px', color: 'var(--primary-blue)' }}>Key Capabilities & Deliverables</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                    {activeModalService.feature_list.map((feat, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255, 255, 255, 0.03)', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                        <CheckCircle2 size={16} style={{ color: 'var(--primary-cyan)', flexShrink: 0 }} />
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end', paddingTop: '20px', borderTop: '1px solid var(--border-subtle)' }}>
                <button onClick={() => setActiveModalService(null)} className="btn btn-secondary" style={{ padding: '10px 20px' }}>
                  Close
                </button>
                <Link to="/contact" className="btn btn-primary" style={{ padding: '10px 24px' }}>
                  <span>Request This Service</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
