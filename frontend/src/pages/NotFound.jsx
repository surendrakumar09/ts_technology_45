import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="section-padding" style={{ paddingTop: 'calc(var(--header-height) + 80px)', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <div className="card-glass" style={{ maxWidth: '600px', margin: '0 auto', padding: '60px 40px' }}>
          <div className="service-icon-box" style={{ width: '70px', height: '70px', margin: '0 auto 24px', color: '#f59e0b', background: 'rgba(245, 158, 11, 0.1)', borderColor: 'rgba(245, 158, 11, 0.3)' }}>
            <AlertTriangle size={36} />
          </div>
          <h1 style={{ fontSize: '4rem', marginBottom: '16px', color: 'var(--text-primary)' }}>404</h1>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '16px' }}>Page Not Found</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', lineHeight: '1.7' }}>
            The page you are looking for does not exist or has been moved. Please navigate back to the TS Technology home page.
          </p>
          <Link to="/" className="btn btn-primary" style={{ padding: '12px 28px' }}>
            <Home size={18} />
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
