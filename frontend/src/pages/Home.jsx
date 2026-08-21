import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, BookOpen, Cpu, Code2, Sparkles, Award, Building2 } from 'lucide-react';
import CourseCard from '../components/CourseCard';
import CourseModal from '../components/CourseModal';
import ProcessTimeline from '../components/ProcessTimeline';
import { fetchCourses, fetchPlacements } from '../services/api';

const Home = ({ onSelectCourse }) => {
  const [courses, setCourses] = useState([]);
  const [placements, setPlacements] = useState([]);
  const [selectedCourseModal, setSelectedCourseModal] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const [coursesData, placementsData] = await Promise.all([
        fetchCourses({ featured: true }),
        fetchPlacements()
      ]);
      setCourses(coursesData);
      setPlacements(placementsData);
    };
    loadData();
  }, []);

  return (
    <div className="home-page">
      {/* Background Orbs */}
      <div className="bg-glow-orb" style={{ top: '10%', left: '5%', width: '400px', height: '400px', background: 'var(--primary-blue)' }} />
      <div className="bg-glow-orb" style={{ top: '40%', right: '5%', width: '500px', height: '500px', background: 'var(--primary-violet)' }} />

      {/* Hero Section */}
      <section className="hero bg-grid-pattern">
        <div className="container hero-grid">
          <div>
            <div className="section-subtitle">
              <Sparkles size={14} />
              <span>Premier IT Coaching & Training Institute</span>
            </div>
            <h1 className="hero-title">
              Empowering Careers & Building <span className="gradient-text">High-Tech Developers</span>
            </h1>
            <p className="hero-description">
              TS Technology provides industry-leading IT coaching, hands-on full-stack software training, student placement assistance, and 1:1 career mentorship in Ram Nagar, Ananthapur.
            </p>
            <div className="hero-actions">
              <Link to="/courses" className="btn btn-primary">
                <span>Explore IT Courses</span>
                <ChevronRight size={18} />
              </Link>
              <Link to="/contact" className="btn btn-secondary">
                <span>Inquire for Admissions</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card-preview">
              <div className="code-preview-bar">
                <span className="code-dot dot-red" />
                <span className="code-dot dot-yellow" />
                <span className="code-dot dot-green" />
              </div>
              <div className="code-content">
                <p><span style={{ color: '#f472b6' }}>const</span> <span style={{ color: '#60a5fa' }}>institute</span> = <span style={{ color: '#34d399' }}>'TS Technology'</span>;</p>
                <p><span style={{ color: '#f472b6' }}>const</span> <span style={{ color: '#60a5fa' }}>courses</span> = [<span style={{ color: '#34d399' }}>'Java Full-Stack AI'</span>, <span style={{ color: '#34d399' }}>'Python Django'</span>, <span style={{ color: '#34d399' }}>'React'</span>];</p>
                <br/>
                <p style={{ color: '#94a3b8' }}>// Training hands-on developers</p>
                <p><span style={{ color: '#f472b6' }}>async function</span> <span style={{ color: '#fbbf24' }}>launchCareer</span>() &#123;</p>
                <p style={{ paddingLeft: '20px' }}>await <span style={{ color: '#60a5fa' }}>buildLiveProjects</span>(&#123;</p>
                <p style={{ paddingLeft: '40px', color: '#a7f3d0' }}>practicalLabs: <span style={{ color: '#38bdf8' }}>'100% Hands-On'</span>,</p>
                <p style={{ paddingLeft: '40px', color: '#a7f3d0' }}>placementPrep: <span style={{ color: '#38bdf8' }}>'Mock Interviews & Resume'</span></p>
                <p style={{ paddingLeft: '20px' }}>&#125;);</p>
                <p style={{ paddingLeft: '20px', color: '#34d399' }}>return 'High Paying Career Placement';</p>
                <p>&#125;</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div className="section-subtitle">
              <BookOpen size={14} />
              <span>Career Programs</span>
            </div>
            <h2 className="section-title">Popular IT Coaching Programs</h2>
            <p className="section-desc">
              Industry-grade courses with practical coding labs, expert mentorship, and project portfolio guidance.
            </p>
          </div>

          <div className="services-grid">
            {courses.slice(0, 3).map((course) => (
              <CourseCard key={course.id} course={course} onSelect={setSelectedCourseModal} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/courses" className="btn btn-primary">
              <span>View All Training Programs</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Placement Highlights */}
      <section className="section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div className="section-subtitle">
              <Award size={14} />
              <span>Student Placements</span>
            </div>
            <h2 className="section-title">Recent Placement Success Stories</h2>
            <p className="section-desc">
              Our students achieve successful software development placements at leading technology companies.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {placements.slice(0, 3).map((pl) => (
              <div key={pl.id} className="card-glass" style={{ padding: '28px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>{pl.student_name}</h3>
                  <span className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '0.8rem', color: 'var(--accent-emerald)', borderColor: 'rgba(16, 185, 129, 0.3)' }}>{pl.package}</span>
                </div>
                <p style={{ color: 'var(--primary-cyan)', fontSize: '0.9rem', marginBottom: '8px', fontWeight: 600 }}>{pl.role}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '16px' }}>
                  <Building2 size={16} />
                  <span>Placed @ {pl.company_name}</span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', fontStyle: 'italic' }}>
                  "{pl.testimonial_quote}"
                </p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <Link to="/placements" className="btn btn-secondary">
              <span>View All Placements</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Technologies Grid */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div className="section-subtitle">
              <Code2 size={14} />
              <span>Technologies Taught & Used</span>
            </div>
            <h2 className="section-title">Modern Stack Expertise</h2>
          </div>

          <div className="tech-grid">
            {[
              { name: 'Java', category: 'Backend' },
              { name: 'Spring Boot', category: 'Backend' },
              { name: 'Generative AI', category: 'AI Tools' },
              { name: 'HTML5', category: 'Frontend' },
              { name: 'CSS3', category: 'Frontend' },
              { name: 'JavaScript', category: 'Frontend' },
              { name: 'React.js', category: 'Frontend' },
              { name: 'Python', category: 'Backend' },
              { name: 'Django', category: 'Backend' },
              { name: 'MySQL', category: 'Database' }
            ].map((tech, idx) => (
              <div key={idx} className="tech-item">
                <span style={{ fontSize: '0.75rem', color: 'var(--primary-cyan)', fontWeight: 600 }}>{tech.category}</span>
                <h4 className="tech-name">{tech.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6-Step Learning Process */}
      <section className="section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div className="section-subtitle">
              <Cpu size={14} />
              <span>Career & Learning Roadmap</span>
            </div>
            <h2 className="section-title">Our Learning & Placement Roadmap</h2>
          </div>

          <ProcessTimeline />
        </div>
      </section>

      {/* Call To Action Banner */}
      <section className="section-padding">
        <div className="container">
          <div className="card-glass" style={{ padding: '60px 40px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(13, 18, 31, 0.95) 100%)', border: '1px solid var(--border-active)' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '16px', color: '#ffffff' }}>Ready to Upgrade Your Tech Career?</h2>
            <p style={{ color: '#cbd5e1', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 32px' }}>
              Inquire today for Java Full-Stack AI, Python Django, and React course admissions & batch schedules in Ram Nagar, Ananthapur.
            </p>
            <Link to="/contact" className="btn btn-primary" style={{ padding: '16px 36px', fontSize: '1.05rem' }}>
              <span>Inquire for Admissions</span>
              <ChevronRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Modal */}
      <CourseModal course={selectedCourseModal} onClose={() => setSelectedCourseModal(null)} onEnroll={onSelectCourse} />
    </div>
  );
};

export default Home;
