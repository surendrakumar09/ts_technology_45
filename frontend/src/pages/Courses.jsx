import React, { useState, useEffect } from 'react';
import { BookOpen, Search, RefreshCw, AlertCircle } from 'lucide-react';
import CourseCard from '../components/CourseCard';
import CourseModal from '../components/CourseModal';
import { fetchCourses, getCachedCourses } from '../services/api';

const Courses = ({ onSelectCourse }) => {
  const [courses, setCourses] = useState(() => getCachedCourses());
  const [loading, setLoading] = useState(() => getCachedCourses().length === 0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourseModal, setSelectedCourseModal] = useState(null);

  const categories = ['All', 'Full-Stack Development', 'Python & Django', 'Frontend Engineering', 'Database & Cloud', 'Data Science & AI'];

  const loadCourses = async (isManualRetry = false) => {
    if (courses.length === 0 || isManualRetry) {
      setLoading(true);
    } else {
      setIsRefreshing(true);
    }
    setError(null);
    try {
      const data = await fetchCourses();
      if (data && data.length > 0) {
        setCourses(data);
      }
    } catch (err) {
      if (courses.length === 0) {
        setError('Unable to load courses from the database.');
      }
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const filteredCourses = courses.filter((course) => {
    const matchesCategory = selectedCategory === 'All' || course.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = searchQuery === '' || 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.short_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.syllabus.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="courses-page section-padding" style={{ paddingTop: 'calc(var(--header-height) + 40px)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="section-subtitle">
            <BookOpen size={14} />
            <span>IT Coaching & Training Programs</span>
          </div>
          <h1 className="section-title">
            Industry-Grade <span className="gradient-text">Software Courses</span>
          </h1>
          <p className="section-desc">
            Gain hands-on coding expertise, build live portfolio projects, and launch your career in software engineering.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ maxWidth: '500px', margin: '0 auto 24px', position: 'relative' }}>
            <Search size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              className="form-input" 
              placeholder="Search courses by technology or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '48px' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`btn ${selectedCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '8px 18px', fontSize: '0.88rem' }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-secondary)' }}>
            <RefreshCw size={36} className="spin" style={{ marginBottom: '16px', color: 'var(--primary-blue)' }} />
            <p>Loading course catalog from database...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="card-glass" style={{ padding: '32px', textAlign: 'center', maxWidth: '500px', margin: '0 auto' }}>
            <AlertCircle size={36} style={{ color: '#ef4444', marginBottom: '12px' }} />
            <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>{error}</p>
            <button onClick={() => loadCourses(true)} className="btn btn-secondary">Retry Loading</button>
          </div>
        )}

        {/* Courses Grid */}
        {!loading && !error && (
          <div className="services-grid">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} onSelect={setSelectedCourseModal} />
            ))}
          </div>
        )}

        {/* Course Syllabus Modal */}
        <CourseModal 
          course={selectedCourseModal} 
          onClose={() => setSelectedCourseModal(null)} 
          onEnroll={onSelectCourse} 
        />
      </div>
    </div>
  );
};

export default Courses;
