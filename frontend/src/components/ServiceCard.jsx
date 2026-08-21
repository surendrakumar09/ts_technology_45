import React from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';

const ServiceCard = ({ service, onSelect }) => {
  const IconComponent = Icons[service.icon] || Icons.Code;

  return (
    <div className="card-glass service-card">
      <div>
        <div className="service-icon-box">
          <IconComponent size={28} />
        </div>
        <h3 className="service-title">{service.title}</h3>
        <p className="service-desc">{service.short_description}</p>
        
        {service.feature_list && service.feature_list.length > 0 && (
          <ul style={{ listStyle: 'none', marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {service.feature_list.slice(0, 3).map((feat, idx) => (
              <li key={idx} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Icons.CheckCircle2 size={14} style={{ color: 'var(--primary-cyan)', flexShrink: 0 }} />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button 
        onClick={() => onSelect ? onSelect(service) : null}
        className="btn btn-secondary" 
        style={{ width: '100%', padding: '10px 18px', fontSize: '0.9rem' }}
      >
        <span>Learn More</span>
        <Icons.ArrowRight size={16} />
      </button>
    </div>
  );
};

export default ServiceCard;
