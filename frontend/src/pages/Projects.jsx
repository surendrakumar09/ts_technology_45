import React, { useState, useEffect } from 'react';
import { Globe, Search, RefreshCw, AlertCircle } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import { fetchProjects } from '../services/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', 'Web Development', 'Full-Stack Development', 'Custom Software', 'E-Commerce', 'Business Automation', 'UI/UX Design'];

  const loadProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProjects();
      setProjects(data);
    } catch (err) {
      setError('Unable to load projects from the database. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const filteredProjects = projects.filter((proj) => {
    const matchesCategory = selectedCategory === 'All' || proj.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = searchQuery === '' || 
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.technologies.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="projects-page section-padding" style={{ paddingTop: 'calc(var(--header-height) + 40px)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="section-subtitle">
            <Globe size={14} />
            <span>Portfolio Showcase</span>
          </div>
          <h1 className="section-title">
            Our Portfolio & <span className="gradient-text">Case Studies</span>
          </h1>
          <p className="section-desc">
            All project data is dynamically fetched from our Django REST API database backend.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ maxWidth: '500px', margin: '0 auto 24px', position: 'relative' }}>
            <Search size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              className="form-input" 
              placeholder="Search projects by title, technology, or description..."
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
            <p>Loading projects from Django API database...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="card-glass" style={{ padding: '32px', textAlign: 'center', maxWidth: '500px', margin: '0 auto' }}>
            <AlertCircle size={36} style={{ color: '#ef4444', marginBottom: '12px' }} />
            <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>{error}</p>
            <button onClick={loadProjects} className="btn btn-secondary">Retry Loading</button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredProjects.length === 0 && (
          <div className="card-glass" style={{ padding: '48px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>No projects found</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
              No projects matched your search criteria or category filter. Try selecting a different filter.
            </p>
            <button onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }} className="btn btn-secondary">
              Reset Filters
            </button>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && !error && filteredProjects.length > 0 && (
          <div className="projects-grid">
            {filteredProjects.map((proj) => (
              <ProjectCard key={proj.id} project={proj} onSelect={setSelectedProject} />
            ))}
          </div>
        )}

        {/* Modal detail */}
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      </div>
    </div>
  );
};

export default Projects;
