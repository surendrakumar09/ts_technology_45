import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TestimonialSlider = ({ testimonials = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!testimonials || testimonials.length === 0) return null;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <div className="card-glass" style={{ padding: '40px', position: 'relative' }}>
      <Quote size={48} style={{ color: 'rgba(59, 130, 246, 0.2)', position: 'absolute', top: '24px', right: '32px' }} />
      
      <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
        {[...Array(current.rating || 5)].map((_, i) => (
          <Star key={i} size={18} fill="#f59e0b" color="#f59e0b" />
        ))}
      </div>

      <p style={{ fontSize: '1.15rem', color: 'var(--text-primary)', lineHeight: '1.7', marginBottom: '28px', fontStyle: 'italic' }}>
        "{current.message}"
      </p>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h4 style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>{current.client_name}</h4>
          <p style={{ fontSize: '0.88rem', color: 'var(--primary-cyan)' }}>
            {current.position ? `${current.position}, ` : ''}{current.company}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={prevSlide} 
            className="btn btn-secondary" 
            style={{ width: '40px', height: '40px', padding: 0 }}
            aria-label="Previous Testimonial"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={nextSlide} 
            className="btn btn-secondary" 
            style={{ width: '40px', height: '40px', padding: 0 }}
            aria-label="Next Testimonial"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;
