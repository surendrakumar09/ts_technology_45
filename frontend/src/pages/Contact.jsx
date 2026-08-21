import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, BookOpen } from 'lucide-react';
import { sendContactMessage } from '../services/api';
import Toast from '../components/Toast';

const Contact = ({ settings, selectedCourse }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: selectedCourse ? `Admission Inquiry: ${selectedCourse.title}` : 'Course Admission Inquiry',
    message: selectedCourse ? `Hello TS Technology team, I would like to enroll / inquire about the ${selectedCourse.title} program.` : ''
  });

  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState('success');
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFieldErrors({});
    setToastMessage(null);

    const errors = {};
    if (!formData.name.trim()) errors.name = "Full Name is required.";
    if (!formData.email.trim()) errors.email = "Email Address is required.";
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters long.";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setLoading(false);
      return;
    }

    try {
      const response = await sendContactMessage(formData);
      setToastType('success');
      setToastMessage(response.message || "Thank you! Your inquiry has been received. Our admission & technology team will contact you soon.");
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: 'Course Admission Inquiry',
        message: ''
      });
    } catch (err) {
      setToastType('error');
      if (err.errors) {
        setFieldErrors(err.errors);
        setToastMessage("Please fix the validation errors below.");
      } else {
        setToastMessage(err.message || "Unable to send message right now. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const phone = settings?.phone || '+1 (800) 555-0199';
  const email = settings?.email || 'contact@tstechnology.com';
  const address = settings?.address || '100 Tech Plaza, Suite 500, Innovation & Learning Hub';
  const hours = settings?.business_hours || 'Mon - Sat: 9:00 AM - 6:00 PM IST';

  return (
    <div className="contact-page section-padding" style={{ paddingTop: 'calc(var(--header-height) + 40px)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="section-subtitle">
            <Mail size={14} />
            <span>Admissions & Contact TS Technology</span>
          </div>
          <h1 className="section-title">
            Inquire for <span className="gradient-text">Admissions & Software Projects</span>
          </h1>
          <p className="section-desc">
            Submit your course admission or software inquiry below. Submissions sync directly to our central Django database.
          </p>
        </div>

        <div className="contact-grid">
          {/* Contact & Institute Details */}
          <div>
            <div className="card-glass" style={{ padding: '36px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.6rem', marginBottom: '16px' }}>Admission & Office Info</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '32px' }}>
                  Reach out to our admission counselors or software engineering team for course schedules, fee structures, and project inquiries.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div className="service-icon-box" style={{ width: '44px', height: '44px', marginBottom: 0, flexShrink: 0 }}>
                      <Phone size={20} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>Helpline & WhatsApp</h4>
                      <a href={`tel:${phone}`} style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {phone}
                      </a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div className="service-icon-box" style={{ width: '44px', height: '44px', marginBottom: 0, flexShrink: 0 }}>
                      <Mail size={20} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>Email Address</h4>
                      <a href={`mailto:${email}`} style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {email}
                      </a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div className="service-icon-box" style={{ width: '44px', height: '44px', marginBottom: 0, flexShrink: 0 }}>
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>Institute Address</h4>
                      <p style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                        {address}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div className="service-icon-box" style={{ width: '44px', height: '44px', marginBottom: 0, flexShrink: 0 }}>
                      <Clock size={20} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>Classroom & Office Hours</h4>
                      <p style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                        {hours}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '36px', paddingTop: '24px', borderTop: '1px solid var(--border-subtle)' }}>
                <p style={{ fontSize: '0.88rem', color: 'var(--primary-cyan)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} />
                  <span>Inquiries sync live to Django Admin database.</span>
                </p>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="card-glass" style={{ padding: '36px' }}>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '24px' }}>Inquiry Form</h3>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input 
                    type="text"
                    name="name"
                    className="form-input"
                    placeholder="e.g. Alexander Vance"
                    value={formData.name}
                    onChange={handleChange}
                    style={{ borderColor: fieldErrors.name ? '#ef4444' : undefined }}
                  />
                  {fieldErrors.name && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>{fieldErrors.name}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input 
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="e.g. alexander@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    style={{ borderColor: fieldErrors.email ? '#ef4444' : undefined }}
                  />
                  {fieldErrors.email && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>{fieldErrors.email}</span>}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Phone / WhatsApp Number</label>
                  <input 
                    type="tel"
                    name="phone"
                    className="form-input"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">College / Organization</label>
                  <input 
                    type="text"
                    name="company"
                    className="form-input"
                    placeholder="e.g. Tech University / Self"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Subject / Inquiry Type *</label>
                <select name="subject" className="form-select" value={formData.subject} onChange={handleChange}>
                  <option value="Course Admission Inquiry">Course Admission Inquiry</option>
                  <option value="Full-Stack Web Development Course">Full-Stack Web Development Course</option>
                  <option value="Python & Django Masterclass">Python & Django Masterclass</option>
                  <option value="React.js Frontend Engineering">React.js Frontend Engineering</option>
                  <option value="Database Solutions & MySQL">Database Solutions & MySQL</option>
                  <option value="Data Science & Machine Learning">Data Science & Machine Learning</option>
                  <option value="Software Development Project Inquiry">Software Development Project Inquiry</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Message / Details *</label>
                <textarea 
                  name="message"
                  className="form-textarea"
                  placeholder="Tell us about your background, preferred batch timings, or project requirements..."
                  value={formData.message}
                  onChange={handleChange}
                  style={{ borderColor: fieldErrors.message ? '#ef4444' : undefined }}
                />
                {fieldErrors.message && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>{fieldErrors.message}</span>}
              </div>

              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ width: '100%', padding: '14px', fontSize: '1rem' }}
                disabled={loading}
              >
                {loading ? (
                  <span>Submitting to Central Database...</span>
                ) : (
                  <>
                    <span>Submit Inquiry</span>
                    <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <Toast message={toastMessage} type={toastType} onClose={() => setToastMessage(null)} />
    </div>
  );
};

export default Contact;
