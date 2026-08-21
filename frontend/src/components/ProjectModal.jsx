import React from 'react';
import { X, ExternalLink, Github, Layers, Calendar, Tag } from 'lucide-react';

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={24} />
        </button>

        <div style={{ marginBottom: '24px' }}>
          <span className="project-badge" style={{ position: 'static', display: 'inline-block', marginBottom: '12px' }}>
            {project.category}
          </span>
          <h2 style={{ fontSize: '2rem', marginBottom: '12px' }}>{project.title}</h2>
        </div>

        {project.image && (
          <div style={{ borderRadius: '12px', overflow: 'hidden', marginBottom: '24px', maxHeight: '300px' }}>
            <img src={project.image} alt={project.title} style={{ width: '100%', objectFit: 'cover' }} />
          </div>
        )}

        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '1.1rem', marginBottom: '8px', color: 'var(--primary-blue)' }}>Project Overview</h4>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1rem' }}>
            {project.description}
          </p>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '1.1rem', marginBottom: '12px', color: 'var(--primary-blue)' }}>Technologies Used</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {project.tech_list && project.tech_list.length > 0 ? (
              project.tech_list.map((tech, idx) => (
                <span key={idx} className="btn btn-secondary" style={{ padding: '6px 14px', fontSize: '0.85rem', cursor: 'default' }}>
                  <Tag size={14} style={{ color: 'var(--primary-cyan)' }} />
                  {tech}
                </span>
              ))
            ) : (
              <span className="btn btn-secondary" style={{ padding: '6px 14px', fontSize: '0.85rem' }}>{project.technologies}</span>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
          {project.project_url && (
            <a href={project.project_url} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
              <ExternalLink size={16} />
              <span>Live Demo</span>
            </a>
          )}
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
              <Github size={16} />
              <span>GitHub Repository</span>
            </a>
          )}
          <button onClick={onClose} className="btn btn-secondary" style={{ padding: '10px 20px', fontSize: '0.9rem', marginLeft: 'auto' }}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
