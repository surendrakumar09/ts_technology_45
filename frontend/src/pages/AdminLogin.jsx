import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, ShieldCheck, AlertCircle, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { adminLogin } from '../services/adminApi';
import logoImg from '../assets/logo.png';

const AdminLogin = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username.trim() || !formData.password) {
      setErrorMessage('Please enter both username and password.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const response = await adminLogin(formData);
      if (onLoginSuccess) onLoginSuccess(response.user);
      navigate('/admin/dashboard');
    } catch (err) {
      setErrorMessage(err.error || 'Invalid admin credentials or inactive account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-secondary)', padding: '24px' }}>
      <div className="card-glass" style={{ maxWidth: '440px', width: '100%', padding: '40px', background: '#ffffff', boxShadow: 'var(--shadow-lg)' }}>
        
        {/* Header Branding */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '16px' }}>
            <img src={logoImg} alt="TS Technology Logo" style={{ height: '52px', objectFit: 'contain' }} />
          </div>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '8px' }}>Staff Admin Portal</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Enter your Django staff credentials to access the TS Technology management dashboard.
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div style={{ padding: '12px 16px', borderRadius: 'var(--radius-sm)', background: '#fef2f2', border: '1px solid #fca5a5', color: '#991b1b', fontSize: '0.9rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <User size={16} />
              <span>Username / Email</span>
            </label>
            <input 
              type="text"
              name="username"
              className="form-input"
              placeholder="e.g. administrator"
              value={formData.username}
              onChange={handleChange}
              autoComplete="username"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Lock size={16} />
              <span>Password</span>
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input 
                type={showPassword ? 'text' : 'password'}
                name="password"
                className="form-input"
                placeholder="••••••••••••"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                style={{ paddingRight: '42px', width: '100%' }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '4px',
                  borderRadius: '4px'
                }}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '14px', marginTop: '12px', fontSize: '1rem' }}
            disabled={loading}
          >
            {loading ? (
              <span>Authenticating with Backend...</span>
            ) : (
              <>
                <span>Login to Dashboard</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid var(--border-subtle)', textAlign: 'center' }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <ShieldCheck size={16} style={{ color: 'var(--primary-blue)' }} />
            <span>Protected by Django RBAC & Audit Middleware</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
