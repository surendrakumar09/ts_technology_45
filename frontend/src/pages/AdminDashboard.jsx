import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Mail, BookOpen, Award, Settings, LogOut, Plus, Trash2, 
  Edit3, CheckCircle2, AlertCircle, RefreshCw, UserCheck, ShieldCheck, Users, Activity, Lock, Eye, EyeOff 
} from 'lucide-react';
import { 
  getAdminMe, adminLogout, fetchAdminMessages, updateAdminMessage, deleteAdminMessage,
  fetchAdminCourses, createAdminCourse, updateAdminCourse, deleteAdminCourse,
  fetchAdminPlacements, createAdminPlacement, updateAdminPlacement, deleteAdminPlacement,
  fetchAdminSettings, updateAdminSettings, fetchAdminUsers, createAdminUser, updateAdminUser,
  deleteAdminUser, fetchAuditLogs
} from '../services/adminApi';
import Toast from '../components/Toast';
import logoImg from '../assets/logo.png';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [adminUser, setAdminUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showModalPassword, setShowModalPassword] = useState(false);

  // Data States
  const [messages, setMessages] = useState([]);
  const [courses, setCourses] = useState([]);
  const [placements, setPlacements] = useState([]);
  const [settingsForm, setSettingsForm] = useState(null);
  const [adminUsers, setAdminUsers] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);

  // Modals & UI States
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [courseModal, setCourseModal] = useState({ open: false, mode: 'create', data: null });
  const [placementModal, setPlacementModal] = useState({ open: false, mode: 'create', data: null });
  const [userModal, setUserModal] = useState({ open: false, mode: 'create', data: null });
  
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState('success');

  // Verify Admin Auth Status on Load
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const user = await getAdminMe();
        setAdminUser(user);
        await loadDashboardData(user);
      } catch (err) {
        navigate('/admin/login');
      } finally {
        setLoading(false);
      }
    };
    verifyAuth();
  }, [navigate]);

  const loadDashboardData = async (user = adminUser) => {
    const role = user?.role || (user?.is_superuser ? 'Super Admin' : 'Staff');

    try {
      const promises = [
        fetchAdminMessages().catch(() => []),
        fetchAdminCourses().catch(() => []),
        fetchAdminPlacements().catch(() => []),
        fetchAdminSettings().catch(() => ({}))
      ];

      if (role === 'TS Manager (Super Admin)' || role === 'Super Admin' || user?.is_superuser) {
        promises.push(fetchAdminUsers().catch(() => []));
        promises.push(fetchAuditLogs().catch(() => []));
      } else if (role === 'Viewer') {
        promises.push(Promise.resolve([]));
        promises.push(fetchAuditLogs().catch(() => []));
      }

      const [msgData, courseData, placeData, settsData, usersData, logsData] = await Promise.all(promises);
      setMessages(msgData || []);
      setCourses(courseData || []);
      setPlacements(placeData || []);
      setSettingsForm(settsData || {});
      if (usersData) setAdminUsers(usersData);
      if (logsData) setAuditLogs(logsData);
    } catch (err) {
      setToastType('error');
      setToastMessage('Error loading administrative data.');
    }
  };

  const handleLogout = async () => {
    await adminLogout();
    navigate('/admin/login');
  };

  const userRole = adminUser?.role || (adminUser?.is_superuser ? 'TS Admin' : 'Staff');
  const isSuperAdmin = userRole === 'TS Admin' || userRole === 'Super Admin' || adminUser?.is_superuser;
  const isTSManager = isSuperAdmin || userRole === 'TS Manager';
  const isContentMgr = isTSManager || userRole === 'Content Manager';
  const isSupportMgr = isTSManager || userRole === 'Support Manager';
  const isViewer = userRole === 'Viewer';

  // Message Handlers
  const handleStatusChange = async (msgId, newStatus) => {
    if (!isSupportMgr) {
      setToastType('error');
      setToastMessage('403 Forbidden: Only Support Managers can change inquiry status.');
      return;
    }
    try {
      const updated = await updateAdminMessage(msgId, { status: newStatus });
      setMessages(prev => prev.map(m => m.id === msgId ? updated : m));
      setToastType('success');
      setToastMessage(`Inquiry status updated to ${newStatus}`);
    } catch (err) {
      setToastType('error');
      setToastMessage(err.detail || 'Permission denied.');
    }
  };

  const handleDeleteMessage = async (msgId) => {
    if (!isSupportMgr) {
      setToastType('error');
      setToastMessage('403 Forbidden: Insufficient permissions.');
      return;
    }
    if (!window.confirm('Are you sure you want to delete this inquiry record?')) return;
    try {
      await deleteAdminMessage(msgId);
      setMessages(prev => prev.filter(m => m.id !== msgId));
      if (selectedMessage?.id === msgId) setSelectedMessage(null);
      setToastType('success');
      setToastMessage('Inquiry deleted.');
    } catch (err) {
      setToastType('error');
      setToastMessage('Permission denied.');
    }
  };

  // Course Handlers
  const handleSaveCourse = async (e) => {
    e.preventDefault();
    if (!isContentMgr) {
      setToastType('error');
      setToastMessage('403 Forbidden: Content Manager role required.');
      return;
    }
    const formData = new FormData(e.target);
    const courseData = {
      title: formData.get('title'),
      category: formData.get('category'),
      duration: formData.get('duration'),
      mode: formData.get('mode'),
      short_description: formData.get('short_description'),
      full_description: formData.get('full_description'),
      syllabus: formData.get('syllabus'),
      prerequisites: formData.get('prerequisites'),
      featured: formData.get('featured') === 'on',
      order: parseInt(formData.get('order') || '1')
    };

    try {
      if (courseModal.mode === 'create') {
        const created = await createAdminCourse(courseData);
        setCourses(prev => [...prev, created]);
        setToastMessage('Course created!');
      } else {
        const updated = await updateAdminCourse(courseModal.data.id, courseData);
        setCourses(prev => prev.map(c => c.id === updated.id ? updated : c));
        setToastMessage('Course updated!');
      }
      setToastType('success');
      setCourseModal({ open: false, mode: 'create', data: null });
    } catch (err) {
      setToastType('error');
      setToastMessage('Failed to save course.');
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (!isContentMgr) {
      setToastType('error');
      setToastMessage('403 Forbidden: Insufficient permissions.');
      return;
    }
    if (!window.confirm('Delete this course?')) return;
    try {
      await deleteAdminCourse(courseId);
      setCourses(prev => prev.filter(c => c.id !== courseId));
      setToastType('success');
      setToastMessage('Course deleted.');
    } catch (err) {
      setToastType('error');
      setToastMessage('Failed to delete course.');
    }
  };

  // Placement Handlers
  const handleSavePlacement = async (e) => {
    e.preventDefault();
    if (!isContentMgr) {
      setToastType('error');
      setToastMessage('403 Forbidden: Content Manager role required.');
      return;
    }
    const formData = new FormData(e.target);
    const placeData = {
      student_name: formData.get('student_name'),
      course_taken: formData.get('course_taken'),
      company_name: formData.get('company_name'),
      role: formData.get('role'),
      package: formData.get('package'),
      testimonial_quote: formData.get('testimonial_quote'),
      featured: formData.get('featured') === 'on'
    };

    try {
      if (placementModal.mode === 'create') {
        const created = await createAdminPlacement(placeData);
        setPlacements(prev => [...prev, created]);
        setToastMessage('Placement added!');
      } else {
        const updated = await updateAdminPlacement(placementModal.data.id, placeData);
        setPlacements(prev => prev.map(p => p.id === updated.id ? updated : p));
        setToastMessage('Placement updated!');
      }
      setToastType('success');
      setPlacementModal({ open: false, mode: 'create', data: null });
    } catch (err) {
      setToastType('error');
      setToastMessage('Failed to save placement.');
    }
  };

  const handleDeletePlacement = async (placeId) => {
    if (!isContentMgr) {
      setToastType('error');
      setToastMessage('403 Forbidden: Insufficient permissions.');
      return;
    }
    if (!window.confirm('Delete placement record?')) return;
    try {
      await deleteAdminPlacement(placeId);
      setPlacements(prev => prev.filter(p => p.id !== placeId));
      setToastType('success');
      setToastMessage('Placement deleted.');
    } catch (err) {
      setToastType('error');
      setToastMessage('Failed to delete placement.');
    }
  };

  // User Management Handlers (Super Admin Only)
  const handleSaveUser = async (e) => {
    e.preventDefault();
    if (!isSuperAdmin) {
      setToastType('error');
      setToastMessage('403 Forbidden: Super Admin role required for user management.');
      return;
    }

    const formData = new FormData(e.target);
    const userData = {
      username: formData.get('username'),
      email: formData.get('email'),
      first_name: formData.get('first_name'),
      last_name: formData.get('last_name'),
      role_name: formData.get('role_name'),
      is_active: formData.get('is_active') === 'on'
    };
    if (formData.get('password')) {
      userData.password = formData.get('password');
    }

    try {
      if (userModal.mode === 'create') {
        const created = await createAdminUser(userData);
        setAdminUsers(prev => [created, ...prev]);
        setToastMessage('Staff admin user created successfully!');
      } else {
        const updated = await updateAdminUser(userModal.data.id, userData);
        setAdminUsers(prev => prev.map(u => u.id === updated.id ? updated : u));
        setToastMessage('Staff admin user updated!');
      }
      setToastType('success');
      setUserModal({ open: false, mode: 'create', data: null });
    } catch (err) {
      setToastType('error');
      setToastMessage('Failed to save admin user.');
    }
  };

  const handleToggleUserActive = async (user) => {
    if (!isSuperAdmin) return;
    try {
      const updated = await updateAdminUser(user.id, { is_active: !user.is_active });
      setAdminUsers(prev => prev.map(u => u.id === updated.id ? updated : u));
      setToastType('success');
      setToastMessage(`User ${user.username} is now ${updated.is_active ? 'Active' : 'Disabled'}.`);
    } catch (err) {
      setToastType('error');
      setToastMessage('Failed to toggle user status.');
    }
  };

  // Settings Handlers
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    if (!isTSManager) {
      setToastType('error');
      setToastMessage('403 Forbidden: TS Manager or TS Admin role required to modify website settings.');
      return;
    }
    try {
      const updated = await updateAdminSettings(settingsForm);
      setSettingsForm(updated);
      setToastType('success');
      setToastMessage('Website settings saved!');
    } catch (err) {
      setToastType('error');
      setToastMessage('Failed to save settings.');
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-secondary)' }}>
        <p style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
          <RefreshCw className="spin-anim" size={20} />
          <span>Authenticating Admin Session & Permissions...</span>
        </p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-secondary)' }}>
      {/* Top Bar */}
      <header style={{ background: '#ffffff', borderBottom: '1px solid var(--border-subtle)', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <img src={logoImg} alt="TS Technology Logo" style={{ height: '42px', objectFit: 'contain' }} />
          <span style={{ fontSize: '1.2rem', fontWeight: 800 }}>TS TECHNOLOGY <span style={{ fontSize: '0.8rem', padding: '4px 10px', borderRadius: 'var(--radius-full)', background: 'rgba(37, 99, 235, 0.1)', color: 'var(--primary-blue)', marginLeft: '8px' }}>ADMIN PORTAL</span></span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            <UserCheck size={18} style={{ color: 'var(--accent-emerald)' }} />
            <span>Staff: <strong>{adminUser?.username}</strong> ({userRole})</span>
          </div>

          <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem', color: '#ef4444' }}>
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Admin Layout */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Navigation Sidebar */}
        <aside style={{ width: '260px', background: '#ffffff', borderRight: '1px solid var(--border-subtle)', padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button 
            className={`btn ${activeTab === 'overview' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('overview')}
            style={{ justifyContent: 'flex-start', padding: '12px 16px', width: '100%', fontSize: '0.95rem' }}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard Overview</span>
          </button>

          {(isSupportMgr || isViewer) && (
            <button 
              className={`btn ${activeTab === 'messages' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveTab('messages')}
              style={{ justifyContent: 'flex-start', padding: '12px 16px', width: '100%', fontSize: '0.95rem' }}
            >
              <Mail size={18} />
              <span>Inquiries ({messages.filter(m => m.status === 'New').length} New)</span>
            </button>
          )}

          {(isContentMgr || isViewer) && (
            <>
              <button 
                className={`btn ${activeTab === 'courses' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setActiveTab('courses')}
                style={{ justifyContent: 'flex-start', padding: '12px 16px', width: '100%', fontSize: '0.95rem' }}
              >
                <BookOpen size={18} />
                <span>Manage Courses</span>
              </button>

              <button 
                className={`btn ${activeTab === 'placements' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setActiveTab('placements')}
                style={{ justifyContent: 'flex-start', padding: '12px 16px', width: '100%', fontSize: '0.95rem' }}
              >
                <Award size={18} />
                <span>Manage Placements</span>
              </button>
            </>
          )}

          {isSuperAdmin && (
            <button 
              className={`btn ${activeTab === 'users' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveTab('users')}
              style={{ justifyContent: 'flex-start', padding: '12px 16px', width: '100%', fontSize: '0.95rem' }}
            >
              <Users size={18} />
              <span>Admin Users & Roles</span>
            </button>
          )}

          {(isSuperAdmin || isViewer) && (
            <button 
              className={`btn ${activeTab === 'audit-logs' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveTab('audit-logs')}
              style={{ justifyContent: 'flex-start', padding: '12px 16px', width: '100%', fontSize: '0.95rem' }}
            >
              <Activity size={18} />
              <span>Audit Logs</span>
            </button>
          )}

          {(isSuperAdmin || isTSManager || isViewer) && (
            <button 
              className={`btn ${activeTab === 'settings' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveTab('settings')}
              style={{ justifyContent: 'flex-start', padding: '12px 16px', width: '100%', fontSize: '0.95rem' }}
            >
              <Settings size={18} />
              <span>Institute Settings</span>
            </button>
          )}
        </aside>

        {/* Tab Content */}
        <main style={{ flex: 1, padding: '32px' }}>
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '1.8rem' }}>Executive Dashboard Overview</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                  Authenticated as <strong>{adminUser?.username}</strong> with active role <strong>{userRole}</strong>.
                </p>
              </div>
              
              {/* Metric Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '36px' }}>
                <div className="card-glass" style={{ padding: '24px' }}>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Total Admission Inquiries</p>
                  <h3 style={{ fontSize: '2.2rem', color: 'var(--primary-blue)', marginTop: '8px' }}>{messages.length}</h3>
                </div>

                <div className="card-glass" style={{ padding: '24px' }}>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>New Unhandled Inquiries</p>
                  <h3 style={{ fontSize: '2.2rem', color: '#ef4444', marginTop: '8px' }}>{messages.filter(m => m.status === 'New').length}</h3>
                </div>

                <div className="card-glass" style={{ padding: '24px' }}>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Active IT Courses</p>
                  <h3 style={{ fontSize: '2.2rem', color: 'var(--primary-violet)', marginTop: '8px' }}>{courses.length}</h3>
                </div>

                <div className="card-glass" style={{ padding: '24px' }}>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Student Placement Records</p>
                  <h3 style={{ fontSize: '2.2rem', color: 'var(--accent-emerald)', marginTop: '8px' }}>{placements.length}</h3>
                </div>
              </div>

              {/* Recent Inquiries Table */}
              <div className="card-glass" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Recent Course & Admission Inquiries</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)', textAlign: 'left', color: 'var(--text-muted)' }}>
                      <th style={{ padding: '12px' }}>Applicant Name</th>
                      <th style={{ padding: '12px' }}>Contact Info</th>
                      <th style={{ padding: '12px' }}>Program / Subject</th>
                      <th style={{ padding: '12px' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages.slice(0, 5).map(m => (
                      <tr key={m.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                        <td style={{ padding: '12px', fontWeight: 600 }}>{m.name}</td>
                        <td style={{ padding: '12px' }}>{m.email} <br/><span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{m.phone}</span></td>
                        <td style={{ padding: '12px' }}>{m.subject}</td>
                        <td style={{ padding: '12px' }}>
                          <span style={{ padding: '4px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', background: m.status === 'New' ? '#fef2f2' : '#f0fdf4', color: m.status === 'New' ? '#ef4444' : '#15803d', fontWeight: 600 }}>
                            {m.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: INQUIRIES MANAGEMENT */}
          {activeTab === 'messages' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                  <h2 style={{ fontSize: '1.8rem' }}>Course Admission & Software Inquiries</h2>
                  {isViewer && <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Read-Only Mode (Viewer Role)</p>}
                </div>
                <button className="btn btn-secondary" onClick={() => loadDashboardData()} style={{ padding: '8px 16px' }}>
                  <RefreshCw size={16} />
                  <span>Refresh List</span>
                </button>
              </div>

              <div className="card-glass" style={{ padding: '24px', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)', textAlign: 'left', color: 'var(--text-muted)' }}>
                      <th style={{ padding: '12px' }}>Date</th>
                      <th style={{ padding: '12px' }}>Applicant Name</th>
                      <th style={{ padding: '12px' }}>Contact Info</th>
                      <th style={{ padding: '12px' }}>Program / Subject</th>
                      <th style={{ padding: '12px' }}>Status</th>
                      <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages.map(m => (
                      <tr key={m.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                        <td style={{ padding: '12px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>{new Date(m.created_at).toLocaleDateString()}</td>
                        <td style={{ padding: '12px', fontWeight: 600 }}>{m.name}</td>
                        <td style={{ padding: '12px' }}>
                          <div>{m.email}</div>
                          <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{m.phone}</div>
                        </td>
                        <td style={{ padding: '12px' }}>{m.subject}</td>
                        <td style={{ padding: '12px' }}>
                          {isSupportMgr ? (
                            <select 
                              value={m.status} 
                              onChange={(e) => handleStatusChange(m.id, e.target.value)}
                              className="form-select"
                              style={{ padding: '4px 8px', fontSize: '0.85rem' }}
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Enrolled">Enrolled</option>
                              <option value="Closed">Closed</option>
                            </select>
                          ) : (
                            <span style={{ fontWeight: 600 }}>{m.status}</span>
                          )}
                        </td>
                        <td style={{ padding: '12px', textAlign: 'right' }}>
                          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                            <button className="btn btn-secondary" style={{ padding: '6px 10px', fontSize: '0.8rem' }} onClick={() => setSelectedMessage(m)}>
                              View
                            </button>
                            {isSupportMgr && (
                              <button className="btn btn-secondary" style={{ padding: '6px 10px', fontSize: '0.8rem', color: '#ef4444' }} onClick={() => handleDeleteMessage(m.id)}>
                                <Trash2 size={14} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: COURSES MANAGEMENT */}
          {activeTab === 'courses' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                  <h2 style={{ fontSize: '1.8rem' }}>IT Coaching Courses Catalog</h2>
                  {isViewer && <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Read-Only Mode (Viewer Role)</p>}
                </div>
                {isContentMgr && (
                  <button className="btn btn-primary" onClick={() => setCourseModal({ open: true, mode: 'create', data: null })}>
                    <Plus size={18} />
                    <span>Add New Course</span>
                  </button>
                )}
              </div>

              <div className="services-grid">
                {courses.map(c => (
                  <div key={c.id} className="card-glass" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary-cyan)', textTransform: 'uppercase' }}>{c.category}</span>
                        {c.featured && <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: 'var(--radius-full)', background: 'rgba(37, 99, 235, 0.1)', color: 'var(--primary-blue)', fontWeight: 600 }}>Featured</span>}
                      </div>
                      <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{c.title}</h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '16px' }}>{c.short_description}</p>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        <div><strong>Duration:</strong> {c.duration}</div>
                        <div><strong>Mode:</strong> {c.mode}</div>
                      </div>
                    </div>

                    {isContentMgr && (
                      <div style={{ display: 'flex', gap: '8px', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
                        <button className="btn btn-secondary" style={{ flex: 1, padding: '8px', fontSize: '0.85rem' }} onClick={() => setCourseModal({ open: true, mode: 'edit', data: c })}>
                          <Edit3 size={14} />
                          <span>Edit</span>
                        </button>
                        <button className="btn btn-secondary" style={{ padding: '8px', color: '#ef4444' }} onClick={() => handleDeleteCourse(c.id)}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PLACEMENTS MANAGEMENT */}
          {activeTab === 'placements' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                  <h2 style={{ fontSize: '1.8rem' }}>Student Placement Records</h2>
                  {isViewer && <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Read-Only Mode (Viewer Role)</p>}
                </div>
                {isContentMgr && (
                  <button className="btn btn-primary" onClick={() => setPlacementModal({ open: true, mode: 'create', data: null })}>
                    <Plus size={18} />
                    <span>Add Placement Record</span>
                  </button>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                {placements.map(p => (
                  <div key={p.id} className="card-glass" style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <h3 style={{ fontSize: '1.2rem' }}>{p.student_name}</h3>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent-emerald)' }}>{p.package}</span>
                    </div>
                    <p style={{ color: 'var(--primary-cyan)', fontSize: '0.88rem', fontWeight: 600 }}>{p.role} @ {p.company_name}</p>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '8px 0' }}>Course: {p.course_taken}</p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: '16px' }}>"{p.testimonial_quote}"</p>

                    {isContentMgr && (
                      <div style={{ display: 'flex', gap: '8px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
                        <button className="btn btn-secondary" style={{ flex: 1, padding: '6px', fontSize: '0.8rem' }} onClick={() => setPlacementModal({ open: true, mode: 'edit', data: p })}>
                          Edit
                        </button>
                        <button className="btn btn-secondary" style={{ padding: '6px 12px', color: '#ef4444' }} onClick={() => handleDeletePlacement(p.id)}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: ADMIN USER MANAGEMENT (SUPER ADMIN ONLY) */}
          {activeTab === 'users' && isSuperAdmin && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                  <h2 style={{ fontSize: '1.8rem' }}>Admin User & Role Management</h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>Manage staff accounts, status, and role assignments.</p>
                </div>
                <button className="btn btn-primary" onClick={() => setUserModal({ open: true, mode: 'create', data: null })}>
                  <Plus size={18} />
                  <span>Create Admin User</span>
                </button>
              </div>

              <div className="card-glass" style={{ padding: '24px', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)', textAlign: 'left', color: 'var(--text-muted)' }}>
                      <th style={{ padding: '12px' }}>Username</th>
                      <th style={{ padding: '12px' }}>Email & Name</th>
                      <th style={{ padding: '12px' }}>Assigned Role</th>
                      <th style={{ padding: '12px' }}>Status</th>
                      <th style={{ padding: '12px' }}>Date Joined</th>
                      <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminUsers.map(u => (
                      <tr key={u.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                        <td style={{ padding: '12px', fontWeight: 600 }}>{u.username}</td>
                        <td style={{ padding: '12px' }}>
                          <div>{u.first_name} {u.last_name}</div>
                          <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{u.email}</div>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <span style={{ padding: '4px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', background: 'rgba(37, 99, 235, 0.1)', color: 'var(--primary-blue)', fontWeight: 600 }}>
                            {u.role}
                          </span>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <span style={{ padding: '4px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', background: u.is_active ? '#f0fdf4' : '#fef2f2', color: u.is_active ? '#15803d' : '#ef4444', fontWeight: 600 }}>
                            {u.is_active ? 'Active' : 'Disabled'}
                          </span>
                        </td>
                        <td style={{ padding: '12px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>{new Date(u.date_joined).toLocaleDateString()}</td>
                        <td style={{ padding: '12px', textAlign: 'right' }}>
                          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                            <button className="btn btn-secondary" style={{ padding: '6px 10px', fontSize: '0.8rem' }} onClick={() => setUserModal({ open: true, mode: 'edit', data: u })}>
                              Edit Role
                            </button>
                            <button className="btn btn-secondary" style={{ padding: '6px 10px', fontSize: '0.8rem', color: u.is_active ? '#ef4444' : '#10b981' }} onClick={() => handleToggleUserActive(u)}>
                              {u.is_active ? 'Disable' : 'Enable'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: AUDIT LOGS */}
          {activeTab === 'audit-logs' && (isSuperAdmin || isViewer) && (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '1.8rem' }}>Administrative Audit Logs</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>Track all administrative actions, logins, CRUD operations, and status modifications.</p>
              </div>

              <div className="card-glass" style={{ padding: '24px', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-subtle)', textAlign: 'left', color: 'var(--text-muted)' }}>
                      <th style={{ padding: '12px' }}>Timestamp</th>
                      <th style={{ padding: '12px' }}>Admin User</th>
                      <th style={{ padding: '12px' }}>Action</th>
                      <th style={{ padding: '12px' }}>Object Type</th>
                      <th style={{ padding: '12px' }}>IP Address</th>
                      <th style={{ padding: '12px' }}>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditLogs.map(log => (
                      <tr key={log.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                        <td style={{ padding: '12px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>{new Date(log.timestamp).toLocaleString()}</td>
                        <td style={{ padding: '12px', fontWeight: 600 }}>{log.user}</td>
                        <td style={{ padding: '12px' }}>
                          <span style={{ padding: '2px 8px', borderRadius: '4px', background: '#f1f5f9', color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.78rem' }}>
                            {log.action}
                          </span>
                        </td>
                        <td style={{ padding: '12px', color: 'var(--text-muted)' }}>{log.object_type || 'System'}</td>
                        <td style={{ padding: '12px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>{log.ip_address || '127.0.0.1'}</td>
                        <td style={{ padding: '12px' }}>{log.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 7: SETTINGS MANAGEMENT */}
          {activeTab === 'settings' && (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '1.8rem' }}>Institute Website Settings</h2>
                {!isTSManager && <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Read-Only Mode (TS Manager or TS Admin privileges required to edit)</p>}
              </div>
              
              <div className="card-glass" style={{ padding: '36px', maxWidth: '700px' }}>
                <form onSubmit={handleSaveSettings}>
                  <div className="form-group">
                    <label className="form-label">Institute Name</label>
                    <input 
                      type="text"
                      className="form-input"
                      value={settingsForm?.company_name || ''}
                      onChange={(e) => setSettingsForm(prev => ({ ...prev, company_name: e.target.value }))}
                      disabled={!isTSManager}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Tagline</label>
                    <input 
                      type="text"
                      className="form-input"
                      value={settingsForm?.tagline || ''}
                      onChange={(e) => setSettingsForm(prev => ({ ...prev, tagline: e.target.value }))}
                      disabled={!isTSManager}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Helpline Phone Number</label>
                    <input 
                      type="text"
                      className="form-input"
                      value={settingsForm?.phone || ''}
                      onChange={(e) => setSettingsForm(prev => ({ ...prev, phone: e.target.value }))}
                      disabled={!isTSManager}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Official Email</label>
                    <input 
                      type="email"
                      className="form-input"
                      value={settingsForm?.email || ''}
                      onChange={(e) => setSettingsForm(prev => ({ ...prev, email: e.target.value }))}
                      disabled={!isTSManager}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Institute Location / Address</label>
                    <input 
                      type="text"
                      className="form-input"
                      value={settingsForm?.address || ''}
                      onChange={(e) => setSettingsForm(prev => ({ ...prev, address: e.target.value }))}
                      disabled={!isTSManager}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Classroom & Office Hours</label>
                    <input 
                      type="text"
                      className="form-input"
                      value={settingsForm?.business_hours || ''}
                      onChange={(e) => setSettingsForm(prev => ({ ...prev, business_hours: e.target.value }))}
                      disabled={!isTSManager}
                    />
                  </div>

                  {isTSManager && (
                    <button type="submit" className="btn btn-primary" style={{ marginTop: '16px', width: '100%', padding: '14px' }}>
                      <span>Save Settings to Central MySQL DB</span>
                      <CheckCircle2 size={18} />
                    </button>
                  )}
                </form>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Message Details Modal */}
      {selectedMessage && (
        <div className="modal-overlay" onClick={() => setSelectedMessage(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedMessage(null)}>×</button>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Inquiry Details</h3>
            <p><strong>Name:</strong> {selectedMessage.name}</p>
            <p><strong>Email:</strong> {selectedMessage.email}</p>
            <p><strong>Phone:</strong> {selectedMessage.phone || 'N/A'}</p>
            <p><strong>Organization / College:</strong> {selectedMessage.company || 'N/A'}</p>
            <p><strong>Program / Subject:</strong> {selectedMessage.subject}</p>
            <p style={{ marginTop: '16px' }}><strong>Message:</strong></p>
            <p style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', marginTop: '8px' }}>
              {selectedMessage.message}
            </p>
          </div>
        </div>
      )}

      {/* Course Modal */}
      {courseModal.open && (
        <div className="modal-overlay" onClick={() => setCourseModal({ open: false, mode: 'create', data: null })}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setCourseModal({ open: false, mode: 'create', data: null })}>×</button>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>{courseModal.mode === 'create' ? 'Add New Course' : 'Edit Course'}</h3>
            <form onSubmit={handleSaveCourse}>
              <div className="form-group">
                <label className="form-label">Course Title</label>
                <input type="text" name="title" className="form-input" defaultValue={courseModal.data?.title || ''} required />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <input type="text" name="category" className="form-input" defaultValue={courseModal.data?.category || 'Full-Stack Development'} required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Duration</label>
                  <input type="text" name="duration" className="form-input" defaultValue={courseModal.data?.duration || '6 Months (24 Weeks)'} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Mode</label>
                  <input type="text" name="mode" className="form-input" defaultValue={courseModal.data?.mode || 'Classroom & Online'} required />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Short Description</label>
                <input type="text" name="short_description" className="form-input" defaultValue={courseModal.data?.short_description || ''} required />
              </div>
              <div className="form-group">
                <label className="form-label">Syllabus / Modules</label>
                <textarea name="syllabus" className="form-textarea" defaultValue={courseModal.data?.syllabus || ''} required />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>Save Course</button>
            </form>
          </div>
        </div>
      )}

      {/* Placement Modal */}
      {placementModal.open && (
        <div className="modal-overlay" onClick={() => setPlacementModal({ open: false, mode: 'create', data: null })}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setPlacementModal({ open: false, mode: 'create', data: null })}>×</button>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>{placementModal.mode === 'create' ? 'Add Placement Record' : 'Edit Placement Record'}</h3>
            <form onSubmit={handleSavePlacement}>
              <div className="form-group">
                <label className="form-label">Student Name</label>
                <input type="text" name="student_name" className="form-input" defaultValue={placementModal.data?.student_name || ''} required />
              </div>
              <div className="form-group">
                <label className="form-label">Course Taken</label>
                <input type="text" name="course_taken" className="form-input" defaultValue={placementModal.data?.course_taken || ''} required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Hiring Company</label>
                  <input type="text" name="company_name" className="form-input" defaultValue={placementModal.data?.company_name || ''} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Salary Package</label>
                  <input type="text" name="package" className="form-input" defaultValue={placementModal.data?.package || '6.5 LPA'} required />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Role</label>
                <input type="text" name="role" className="form-input" defaultValue={placementModal.data?.role || 'Software Engineer'} required />
              </div>
              <div className="form-group">
                <label className="form-label">Testimonial Quote</label>
                <textarea name="testimonial_quote" className="form-textarea" defaultValue={placementModal.data?.testimonial_quote || ''} required />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>Save Placement</button>
            </form>
          </div>
        </div>
      )}

      {/* User Management Modal (Super Admin Only) */}
      {userModal.open && isSuperAdmin && (
        <div className="modal-overlay" onClick={() => setUserModal({ open: false, mode: 'create', data: null })}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setUserModal({ open: false, mode: 'create', data: null })}>×</button>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>{userModal.mode === 'create' ? 'Create Staff Admin User' : 'Edit Admin Role & Details'}</h3>
            <form onSubmit={handleSaveUser}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Username *</label>
                  <input type="text" name="username" className="form-input" defaultValue={userModal.data?.username || ''} required disabled={userModal.mode === 'edit'} />
                </div>
                <div className="form-group">
                  <label className="form-label">Email *</label>
                  <input type="email" name="email" className="form-input" defaultValue={userModal.data?.email || ''} required />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">First Name</label>
                  <input type="text" name="first_name" className="form-input" defaultValue={userModal.data?.first_name || ''} />
                </div>
                <div className="form-group">
                  <label className="form-label">Last Name</label>
                  <input type="text" name="last_name" className="form-input" defaultValue={userModal.data?.last_name || ''} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Assign RBAC Role *</label>
                <select name="role_name" className="form-select" defaultValue={userModal.data?.role || 'Viewer'}>
                  <option value="TS Manager (Super Admin)">TS Manager (Super Admin) - Full Access</option>
                  <option value="Content Manager">Content Manager (Courses & Placements)</option>
                  <option value="Support Manager">Support Manager (Admissions & Contact Inquiries)</option>
                  <option value="Viewer">Viewer (Read Only)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">{userModal.mode === 'create' ? 'Password *' : 'New Password (leave blank to keep current)'}</label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <input 
                    type={showModalPassword ? 'text' : 'password'} 
                    name="password" 
                    className="form-input" 
                    placeholder="••••••••••••" 
                    style={{ paddingRight: '42px', width: '100%' }}
                    required={userModal.mode === 'create'} 
                  />
                  <button
                    type="button"
                    onClick={() => setShowModalPassword(prev => !prev)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '4px'
                    }}
                    aria-label={showModalPassword ? 'Hide password' : 'Show password'}
                  >
                    {showModalPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="checkbox" name="is_active" id="is_active_chk" defaultChecked={userModal.data ? userModal.data.is_active : true} />
                <label htmlFor="is_active_chk" className="form-label" style={{ marginBottom: 0 }}>Account Active & Enabled</label>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>
                Save Admin User
              </button>
            </form>
          </div>
        </div>
      )}

      <Toast message={toastMessage} type={toastType} onClose={() => setToastMessage(null)} />
    </div>
  );
};

export default AdminDashboard;
