import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import Placements from './pages/Placements';
import Technologies from './pages/Technologies';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';
import { fetchSettings } from './services/api';

const PublicLayout = ({ settings }) => (
  <>
    <Navbar />
    <main style={{ flex: 1 }}>
      <Outlet />
    </main>
    <Footer settings={settings} />
    <WhatsAppButton settings={settings} />
  </>
);

function App() {
  const [settings, setSettings] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [adminUser, setAdminUser] = useState(null);

  useEffect(() => {
    const loadSettings = async () => {
      const data = await fetchSettings();
      setSettings(data);
    };
    loadSettings();
  }, []);

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Routes>
        {/* Admin Directives & Redirects */}
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/login" element={<AdminLogin onLoginSuccess={setAdminUser} />} />
        <Route path="/admin/login/" element={<AdminLogin onLoginSuccess={setAdminUser} />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/dashboard/" element={<AdminDashboard />} />

        {/* Public Website Pages wrapped in PublicLayout */}
        <Route element={<PublicLayout settings={settings} />}>
          <Route path="/" element={<Home onSelectCourse={setSelectedCourse} />} />
          <Route path="/courses" element={<Courses onSelectCourse={setSelectedCourse} />} />
          <Route path="/placements" element={<Placements />} />
          <Route path="/technologies" element={<Technologies />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact settings={settings} selectedCourse={selectedCourse} />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
