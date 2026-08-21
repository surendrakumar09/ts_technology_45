import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, CheckCircle2, Clock, Monitor, BookOpen, ArrowRight } from 'lucide-react';

const CourseModal = ({ course, onClose, onEnroll }) => {
  const navigate = useNavigate();

  if (!course) return null;

  const handleInquire = () => {
    onClose();
    if (onEnroll) {
      onEnroll(course);
    }
    navigate('/contact');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={24} />
        </button>

        <div style={{ marginBottom: '20px' }}>
          <span className="section-subtitle" style={{ marginBottom: '10px' }}>{course.category}</span>
          <h2 style={{ fontSize: '2rem', marginBottom: '12px' }}>{course.title}</h2>
          <div style={{ display: 'flex', gap: '16px', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '16px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={16} style={{ color: 'var(--primary-blue)' }} /> {course.duration}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Monitor size={16} style={{ color: 'var(--primary-cyan)' }} /> {course.mode}
            </span>
          </div>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '1.02rem' }}>
            {course.full_description}
          </p>
        </div>

        {course.module_list && course.module_list.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '14px', color: 'var(--primary-blue)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookOpen size={18} />
              <span>Syllabus Modules</span>
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px' }}>
              {course.module_list.map((mod, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255, 255, 255, 0.03)', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--accent-emerald)', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.88rem', color: 'var(--text-primary)' }}>{mod}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginBottom: '24px', background: 'rgba(59, 130, 246, 0.08)', padding: '16px 20px', borderRadius: '10px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
          <h4 style={{ fontSize: '0.95rem', color: 'var(--primary-cyan)', marginBottom: '4px' }}>Prerequisites</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{course.prerequisites}</p>
        </div>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
          <button onClick={onClose} className="btn btn-secondary" style={{ padding: '10px 20px' }}>
            Close
          </button>
          <button onClick={handleInquire} className="btn btn-primary" style={{ padding: '10px 24px' }}>
            <span>Inquire / Enroll in Course</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseModal;
