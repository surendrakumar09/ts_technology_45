import React from 'react';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';

const ProjectCard = ({ project, onSelect }) => {
  return (
    <div className="card-glass project-card">
      <div className="project-img-container">
        {project.image ? (
          <img src={project.image} alt={project.title} />
        ) : (
          <div style={{ 
            width: '100%', 
            height: '100%', 
            background: 'linear-gradient(135deg, #0d121f 0%, #1e293b 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--primary-blue)',
            fontWeight: 700,
            fontSize: '1.2rem',
            letterSpacing: '1px'
          }}>
            {project.title.substring(0, 18)}...
          </div>
        )}
        <span className="project-badge">{project.category}</span>
      </div>

      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.description}</p>

        <div className="project-tech-tags">
          {project.tech_list && project.tech_list.length > 0 ? (
            project.tech_list.map((tech, idx) => (
              <span key={idx} className="tech-tag">{tech}</span>
            ))
          ) : (
            project.technologies?.split(',').map((tech, idx) => (
              <span key={idx} className="tech-tag">{tech.strip ? tech.strip() : tech}</span>
            ))
          )}
        </div>

        <button 
          onClick={() => onSelect(project)} 
          className="btn btn-secondary" 
          style={{ width: '100%', padding: '10px 16px', fontSize: '0.9rem' }}
        >
          <span>View Project Details</span>
          <ArrowUpRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
