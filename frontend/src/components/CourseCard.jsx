import React from 'react';
import * as Icons from 'lucide-react';

const CourseCard = ({ course, onSelect }) => {
  const IconComponent = Icons[course.icon] || Icons.BookOpen;

  return (
    <div className="card-glass service-card">
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div className="service-icon-box" style={{ width: '48px', height: '48px', marginBottom: 0 }}>
            <IconComponent size={24} />
          </div>
          <span className="project-badge" style={{ position: 'static' }}>{course.duration}</span>
        </div>

        <h3 className="service-title">{course.title}</h3>
        <p className="service-desc">{course.short_description}</p>

        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <span className="tech-tag" style={{ color: 'var(--primary-cyan)', borderColor: 'rgba(6, 182, 212, 0.3)' }}>
            <Icons.Monitor size={12} style={{ marginRight: '4px' }} />
            {course.mode}
          </span>
        </div>

        {course.module_list && course.module_list.length > 0 && (
          <ul style={{ listStyle: 'none', marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {course.module_list.slice(0, 3).map((mod, idx) => (
              <li key={idx} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Icons.CheckCircle2 size={14} style={{ color: 'var(--accent-emerald)', flexShrink: 0 }} />
                <span>{mod}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button 
        onClick={() => onSelect(course)}
        className="btn btn-primary" 
        style={{ width: '100%', padding: '10px 18px', fontSize: '0.9rem' }}
      >
        <span>View Syllabus & Enroll</span>
        <Icons.ArrowRight size={16} />
      </button>
    </div>
  );
};

export default CourseCard;
