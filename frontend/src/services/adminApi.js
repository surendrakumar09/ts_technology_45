import axios from 'axios';

const getBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  const hostname = window.location.hostname || 'localhost';
  return `http://${hostname}:8000/api`;
};

const adminClient = axios.create({
  baseURL: `${getBaseUrl()}/admin`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

function getCsrfToken() {
  const cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('csrftoken='))
    ?.split('=')[1];
  return cookieValue || '';
}

adminClient.interceptors.request.use((config) => {
  const token = getCsrfToken();
  if (token) {
    config.headers['X-CSRFToken'] = token;
  }
  return config;
});

adminClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      return Promise.reject({
        error: 'Unable to connect to the server. Please check that Django is running on port 8000 and accessible on your network.'
      });
    }

    const status = error.response.status;
    const backendErr = error.response.data?.error || error.response.data?.detail;

    if (status === 401) {
      return Promise.reject({ error: backendErr || 'Invalid username or password.' });
    } else if (status === 403) {
      return Promise.reject({ error: backendErr || 'Access denied. You do not have permission to access the admin portal.' });
    } else if (status === 404) {
      return Promise.reject({ error: 'API endpoint not found. Please verify backend URL configuration.' });
    } else if (status >= 500) {
      return Promise.reject({ error: 'Internal server error occurred. Please try again later.' });
    }

    return Promise.reject({ error: backendErr || 'An unexpected authentication error occurred.' });
  }
);

// CSRF Cookie Initialization
export const ensureAdminCsrf = async () => {
  try {
    await adminClient.get('/csrf/');
  } catch (err) {
    // Ignore error if already present
  }
};

// Admin Authentication APIs
export const adminLogin = async (credentials) => {
  await ensureAdminCsrf();
  const response = await adminClient.post('/login/', credentials);
  return response.data;
};

export const adminLogout = async () => {
  try {
    const response = await adminClient.post('/logout/');
    return response.data;
  } catch (error) {
    return { message: 'Logged out.' };
  }
};

export const getAdminMe = async () => {
  const response = await adminClient.get('/me/');
  return response.data;
};

// Admin Messages / Inquiries Management
export const fetchAdminMessages = async () => {
  const response = await adminClient.get('/messages/');
  return response.data;
};

export const updateAdminMessage = async (id, data) => {
  const response = await adminClient.patch(`/messages/${id}/`, data);
  return response.data;
};

export const deleteAdminMessage = async (id) => {
  const response = await adminClient.delete(`/messages/${id}/`);
  return response.data;
};

// Admin Courses Management
export const fetchAdminCourses = async () => {
  const response = await adminClient.get('/courses/');
  return response.data;
};

export const createAdminCourse = async (data) => {
  const response = await adminClient.post('/courses/', data);
  return response.data;
};

export const updateAdminCourse = async (id, data) => {
  const response = await adminClient.put(`/courses/${id}/`, data);
  return response.data;
};

export const deleteAdminCourse = async (id) => {
  const response = await adminClient.delete(`/courses/${id}/`);
  return response.data;
};

// Admin Placements Management
export const fetchAdminPlacements = async () => {
  const response = await adminClient.get('/placements/');
  return response.data;
};

export const createAdminPlacement = async (data) => {
  const response = await adminClient.post('/placements/', data);
  return response.data;
};

export const updateAdminPlacement = async (id, data) => {
  const response = await adminClient.put(`/placements/${id}/`, data);
  return response.data;
};

export const deleteAdminPlacement = async (id) => {
  const response = await adminClient.delete(`/placements/${id}/`);
  return response.data;
};

// Admin Settings Management
export const fetchAdminSettings = async () => {
  const response = await adminClient.get('/settings/');
  return response.data;
};

export const updateAdminSettings = async (data) => {
  const response = await adminClient.put('/settings/', data);
  return response.data;
};

// Admin Users Management (Super Admin only)
export const fetchAdminUsers = async () => {
  const response = await adminClient.get('/users/');
  return response.data;
};

export const createAdminUser = async (data) => {
  const response = await adminClient.post('/users/', data);
  return response.data;
};

export const updateAdminUser = async (id, data) => {
  const response = await adminClient.put(`/users/${id}/`, data);
  return response.data;
};

export const deleteAdminUser = async (id) => {
  const response = await adminClient.delete(`/users/${id}/`);
  return response.data;
};

// Audit Logs Management
export const fetchAuditLogs = async () => {
  const response = await adminClient.get('/audit-logs/');
  return response.data;
};
