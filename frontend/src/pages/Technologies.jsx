import React, { useState } from 'react';
import { Code2, Server, Database, Wrench, CheckCircle2 } from 'lucide-react';

const techData = [
  // Frontend
  { name: 'HTML5', category: 'Frontend', desc: 'Semantic markup structure for accessibility and modern web standards.', icon: 'Layout' },
  { name: 'CSS3', category: 'Frontend', desc: 'Custom CSS design systems, animations, glassmorphism, and responsive layouts.', icon: 'Palette' },
  { name: 'JavaScript (ES6+)', category: 'Frontend', desc: 'Modern async/await logic, dynamic state management, and API integrations.', icon: 'Code' },
  { name: 'React.js', category: 'Frontend', desc: 'Component-driven SPA frontend architecture with optimized virtual DOM rendering.', icon: 'Cpu' },
  { name: 'Tailwind CSS', category: 'Frontend', desc: 'Utility-first CSS framework for ultra-fast, responsive styling.', icon: 'Zap' },

  // Backend
  { name: 'Python', category: 'Backend', desc: 'High-level, readable, and robust language powering core enterprise logic.', icon: 'Terminal' },
  { name: 'Django', category: 'Backend', desc: 'High-level Python web framework enforcing security, ORM integrity, and Admin management.', icon: 'ShieldCheck' },
  { name: 'Django REST Framework', category: 'Backend', desc: 'Powerful RESTful API toolkit with serializers, viewsets, and JSON routing.', icon: 'Share2' },
  { name: 'Node.js', category: 'Backend', desc: 'Asynchronous event-driven JavaScript runtime for real-time backend services.', icon: 'Server' },

  // Database
  { name: 'MySQL', category: 'Database', desc: 'Production relational database with normalized schema design, foreign keys, and indexes.', icon: 'Database' },
  { name: 'PostgreSQL', category: 'Database', desc: 'Advanced open-source relational database supporting JSON queries and spatial data.', icon: 'Database' },

  // Tools
  { name: 'Git', category: 'Tools', desc: 'Distributed version control system ensuring clean commit history and branch management.', icon: 'GitBranch' },
  { name: 'GitHub', category: 'Tools', desc: 'Cloud repository hosting, code review workflows, and automated CI/CD deployment pipelines.', icon: 'Github' },
  { name: 'Docker', category: 'Tools', desc: 'Containerized deployment infrastructure for consistent development and production environments.', icon: 'Box' },
  { name: 'REST APIs', category: 'Tools', desc: 'Standardized HTTP protocols for seamless frontend to backend multi-device data sync.', icon: 'Globe' }
];

const Technologies = () => {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Frontend', 'Backend', 'Database', 'Tools'];

  const filteredTech = filter === 'All' 
    ? techData 
    : techData.filter(t => t.category === filter);

  return (
    <div className="technologies-page section-padding" style={{ paddingTop: 'calc(var(--header-height) + 40px)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="section-subtitle">
            <Code2 size={14} />
            <span>Technologies & Stack</span>
          </div>
          <h1 className="section-title">
            Our Enterprise <span className="gradient-text">Technology Stack</span>
          </h1>
          <p className="section-desc">
            We build software using modern, production-tested languages, frameworks, databases, and developer tooling.
          </p>
        </div>

        {/* Filter Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '40px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`btn ${filter === cat ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '8px 20px', fontSize: '0.9rem' }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tech Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
          {filteredTech.map((tech, idx) => (
            <div key={idx} className="card-glass" style={{ padding: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span className="project-badge" style={{ position: 'static' }}>{tech.category}</span>
                <CheckCircle2 size={18} style={{ color: 'var(--primary-cyan)' }} />
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '10px' }}>{tech.name}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                {tech.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Technologies;
