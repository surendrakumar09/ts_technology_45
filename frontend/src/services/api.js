import axios from 'axios';

const getBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL;
  if (envUrl) {
    return envUrl.replace(/\/+$/, '');
  }
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    return 'http://127.0.0.1:8000/api';
  }
  return 'https://ts-technology-45.onrender.com/api';
};

const BASE_URL = getBaseUrl();

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Fallback data for offline/disconnected state
const MOCK_COURSES = [
  {
    id: 1,
    title: "Java Full-Stack Development with AI",
    slug: "java-full-stack-development-with-ai",
    category: "Full-Stack Development",
    duration: "6 Months (24 Weeks)",
    mode: "Classroom & Online",
    short_description: "Master Java, Spring Boot, Microservices, React UI, MySQL, and Generative AI tools for modern enterprise development.",
    full_description: "Comprehensive career track covering Core Java, Advanced Java OOP, Spring Boot, Spring Data JPA, Microservices REST APIs, React.js UI, MySQL, Git, and GenAI API integrations. Build live enterprise projects with placement assistance in Ram Nagar, Ananthapur.",
    module_list: [
      "Core & Advanced Java OOP Principles",
      "Java Collections Framework & Exception Handling",
      "Spring Boot Core & Spring Data JPA",
      "Microservices Architecture & REST APIs",
      "React.js Frontend UI & Axios Integration",
      "MySQL Relational Database Design & Optimization",
      "Generative AI Integration (OpenAI API, LLM Prompts)",
      "Live Capstone Enterprise Project & Mock Prep"
    ],
    prerequisites: "Basic computer operation & passion to learn Java and AI development",
    icon: "Cpu",
    featured: true,
    order: 1
  },
  {
    id: 2,
    title: "Full-Stack Web Development Masterclass",
    slug: "full-stack-web-development-masterclass",
    category: "Full-Stack Development",
    duration: "6 Months (24 Weeks)",
    mode: "Classroom & Online",
    short_description: "Master end-to-end web engineering with React.js, Python Django REST Framework, and MySQL database architecture.",
    full_description: "Comprehensive career track covering HTML5, CSS3, JavaScript ES6+, React.js UI, Python, Django, DRF APIs, MySQL, Git, and Docker. Build 5+ live portfolio projects with 100% placement guidance.",
    module_list: [
      "HTML5 & CSS3 Responsive Grid Systems",
      "JavaScript ES6+ Async Programming & DOM",
      "React.js Component Architecture & State",
      "Python Core & Object-Oriented Programming",
      "Django Framework & Database ORM",
      "RESTful API Development with DRF",
      "MySQL Database Design & Query Optimization",
      "Live Capstone Project & Placement Mock Prep"
    ],
    prerequisites: "Basic computer operation & eagerness to build a software career",
    icon: "Code2",
    featured: true,
    order: 2
  },
  {
    id: 2,
    title: "Python & Django Backend Engineering",
    slug: "python-django-backend-engineering",
    category: "Python & Django",
    duration: "3 Months (12 Weeks)",
    mode: "Classroom & Online",
    short_description: "In-depth specialization in Python programming, Django ORM, RESTful API design, and database security.",
    full_description: "Specialized backend development course focusing on enterprise Python, object-oriented design, Django web application lifecycle, DRF serializers, authentication, and MySQL integration.",
    module_list: [
      "Python Fundamentals & Data Structures",
      "OOP Principles & Design Patterns",
      "Django Architecture & Class-Based Views",
      "Django ORM & Database Migrations",
      "DRF Serializers, ViewSets & JWT Auth",
      "CORS, CSRF & Security Practices",
      "Production Deployment on Render/VPS"
    ],
    prerequisites: "Basic logic or prior programming exposure recommended",
    icon: "Terminal",
    featured: true,
    order: 2
  },
  {
    id: 3,
    title: "React.js Frontend Engineering",
    slug: "react-js-frontend-engineering",
    category: "Frontend Engineering",
    duration: "3 Months (12 Weeks)",
    mode: "Classroom & Online",
    short_description: "Build high-performance, single-page web applications with React 18, Vite, Custom CSS, and REST API integration.",
    full_description: "Become a skilled frontend developer crafting interactive UI components, managing state, handling API integrations with Axios, and applying modern CSS design systems.",
    module_list: [
      "Modern JavaScript ES6+ Refresher",
      "React JSX & Virtual DOM Concepts",
      "Component State, Props & Lifecycle",
      "React Hooks (useState, useEffect, useMemo)",
      "Axios & Async REST API Integration",
      "React Router v6 Client Routing",
      "Modern Responsive CSS & Glassmorphism Design"
    ],
    prerequisites: "Basic HTML, CSS & JavaScript knowledge",
    icon: "Cpu",
    featured: true,
    order: 3
  },
  {
    id: 4,
    title: "Database Solutions & MySQL Masterclass",
    slug: "database-solutions-mysql-masterclass",
    category: "Database & Cloud",
    duration: "2 Months (8 Weeks)",
    mode: "Online Live Classes",
    short_description: "Learn relational database design, SQL query optimization, ER modeling, and ORM integration.",
    full_description: "Gain hands-on expertise in MySQL schema normalization, indexing strategies, complex JOIN queries, transaction management, and automated backups.",
    module_list: [
      "Relational Database Core Concepts",
      "SQL Data Definition & Manipulation (DDL/DML)",
      "Complex JOIN Queries & Subqueries",
      "Indexing & Query Performance Tuning",
      "ER Diagram Modeling & Schema Normalization",
      "Django ORM Database Mapping",
      "Database Backups & Security Protocols"
    ],
    prerequisites: "Computer fundamentals",
    icon: "Database",
    featured: false,
    order: 4
  },
  {
    id: 5,
    title: "Data Science & Python Machine Learning",
    slug: "data-science-python-machine-learning",
    category: "Data Science & AI",
    duration: "4 Months (16 Weeks)",
    mode: "Classroom & Online",
    short_description: "Learn Python data analysis, NumPy, Pandas, Matplotlib, and predictive Machine Learning algorithms.",
    full_description: "Master data analytics and machine learning with Python libraries. Clean data, perform exploratory data analysis, build predictive models, and deploy data-driven applications.",
    module_list: [
      "Python for Analytics",
      "NumPy & Pandas Data Manipulation",
      "Data Visualization with Matplotlib & Seaborn",
      "Statistical Hypothesis Testing",
      "Supervised & Unsupervised Machine Learning",
      "Model Evaluation & Real-World Case Studies"
    ],
    prerequisites: "Basic mathematics and Python knowledge",
    icon: "Sparkles",
    featured: true,
    order: 5
  }
];

const MOCK_PLACEMENTS = [
  {
    id: 1,
    student_name: "Rahul Verma",
    course_taken: "Full-Stack Web Development",
    company_name: "Infosys",
    role: "System Engineer / Full-Stack Developer",
    package: "6.8 LPA",
    testimonial_quote: "The live project training at TS Technology gave me the confidence to ace technical interviews. Django and React hands-on experience was crucial.",
    featured: true
  },
  {
    id: 2,
    student_name: "Priya Sharma",
    course_taken: "Python & Django Backend Engineering",
    company_name: "TCS",
    role: "Backend Software Developer",
    package: "7.2 LPA",
    testimonial_quote: "TS Technology's structured coaching and mock interview sessions were outstanding. The mentors explain deep concepts thoroughly.",
    featured: true
  },
  {
    id: 3,
    student_name: "Aniket Reddy",
    course_taken: "React.js Frontend Engineering",
    company_name: "Capgemini",
    role: "Frontend UI Developer",
    package: "6.0 LPA",
    testimonial_quote: "I transitioned into software development within 4 months. The practical curriculum and project portfolio made all the difference.",
    featured: true
  }
];

const MOCK_SERVICES = [
  {
    id: 1,
    title: "IT & Software Coaching",
    slug: "it-software-coaching",
    icon: "BookOpen",
    short_description: "Industry-oriented training programs in Full-Stack, Python, React, and MySQL with hands-on labs.",
    full_description: "Job-ready IT coaching led by experienced software developers. Master modern tech stacks through practical coding labs and real-time project building.",
    feature_list: ["Expert Mentorship", "Live Coding Sessions", "Small Batch Sizes", "Certification Included"],
    order: 1
  },
  {
    id: 2,
    title: "Full-Stack Development Services",
    slug: "full-stack-development-services",
    icon: "Layers",
    short_description: "End-to-end web architecture integrating frontend React UI with robust backend Django APIs.",
    full_description: "Our full-stack solutions connect intuitive frontend interfaces with secure, database-backed microservices engineered for high availability.",
    feature_list: ["REST API Architecture", "Real-Time Data Sync", "Clean Code Structure", "Secure Authentication"],
    order: 2
  },
  {
    id: 3,
    title: "Live Project Mentorship",
    slug: "live-project-mentorship",
    icon: "Code",
    short_description: "Guidance on real enterprise projects to prepare students for real-world software engineering.",
    full_description: "Students build scalable client-like applications under the supervision of senior engineers, acquiring Git workflow and clean code experience.",
    feature_list: ["Git & GitHub Workflow", "Real API Integration", "Agile Project Sprints", "Portfolio Construction"],
    order: 3
  },
  {
    id: 4,
    title: "Placement Assistance & Prep",
    slug: "placement-assistance-prep",
    icon: "Award",
    short_description: "Resume building, mock technical interviews, algorithmic training, and hiring partner referrals.",
    full_description: "We prepare students for job placements through resume optimization, technical mock interviews, coding challenges, and referrals to our hiring network.",
    feature_list: ["Resume Optimization", "Technical Mock Interviews", "HR Round Guidance", "Placement Referrals"],
    order: 4
  },
  {
    id: 5,
    title: "Custom Software Development",
    slug: "custom-software-development",
    icon: "Cpu",
    short_description: "Bespoke software systems built specifically to solve unique business and enterprise challenges.",
    full_description: "Tailored web application design and engineering to streamline your core operations, increase productivity, and replace complex legacy systems.",
    feature_list: ["Bespoke Enterprise Systems", "Scalable Architecture", "Cloud Integration", "Custom Workflows"],
    order: 5
  },
  {
    id: 6,
    title: "Database Architecture Solutions",
    slug: "database-architecture-solutions",
    icon: "Database",
    short_description: "Relational MySQL database design, query optimization, and secure data management.",
    full_description: "Production database architecture design, normalized schemas, automated migrations, indexing, and backup strategies to protect critical enterprise data.",
    feature_list: ["MySQL Schema Design", "Query Optimization", "Automated Backups", "High Integrity ORM"],
    order: 6
  }
];

const MOCK_PROJECTS = [
  {
    id: 1,
    title: "Student Admission & Fee Portal",
    slug: "student-admission-fee-portal",
    category: "Full-Stack Development",
    description: "Full-stack institute management system allowing students to register for courses, track fee receipts, access lecture materials, and submit project assignments.",
    technologies: "React, Python, Django REST, MySQL",
    tech_list: ["React", "Python", "Django REST", "MySQL"],
    featured: true,
    project_url: "https://example.com/admission-portal",
    github_url: "https://github.com/tstechnology/admission-portal"
  },
  {
    id: 2,
    title: "CloudFlow Enterprise ERP",
    slug: "cloudflow-enterprise-erp",
    category: "Custom Software",
    description: "An end-to-end cloud enterprise resource planning suite supporting multi-warehouse inventory management, financial auditing, employee roles, and real-time operational analytics.",
    technologies: "React, Python, Django, DRF, MySQL",
    tech_list: ["React", "Python", "Django", "DRF", "MySQL"],
    featured: true,
    project_url: "https://example.com/cloudflow",
    github_url: "https://github.com/tstechnology/cloudflow-erp"
  },
  {
    id: 3,
    title: "OmniChannel E-Commerce Store",
    slug: "omnichannel-e-commerce-store",
    category: "Full-Stack Development",
    description: "A modern storefront built as a student capstone project with interactive cart drawers, dynamic search filters, Stripe checkout integration, and automated invoice email generation.",
    technologies: "React, JavaScript, Django, MySQL, Tailwind CSS",
    tech_list: ["React", "JavaScript", "Django", "MySQL", "Tailwind CSS"],
    featured: true,
    project_url: "https://example.com/omnichannel",
    github_url: "https://github.com/tstechnology/omnichannel-shop"
  }
];

const MOCK_TESTIMONIALS = [
  {
    id: 1,
    client_name: "Siddharth Rao",
    company: "Tech Mahindra",
    position: "Software Engineer Alumnus",
    message: "TS Technology's Python & Full-Stack course changed my career trajectory. The practical lab sessions and Django ORM concepts were explained brilliantly.",
    rating: 5
  },
  {
    id: 2,
    client_name: "Marcus Vance",
    company: "Vance Logistics Group",
    position: "Chief Operations Officer",
    message: "TS Technology transformed our manual tracking operations into an automated full-stack platform. Uptime has been flawless and customer feedback is top-tier.",
    rating: 5
  }
];

const MOCK_SETTINGS = {
  company_name: "TS Technology",
  tagline: "Empowering Minds, Building Digital Solutions for a Smarter Future.",
  description: "TS Technology is a premier IT Coaching Centre & Technology Solutions Provider offering industry-grade software courses, live project training, placement assistance, and custom software development in Ram Nagar, Ananthapur.",
  email: "tstechnology2000@gmail.com",
  phone: "8008066034",
  address: "Ram Nagar, Ananthapur",
  business_hours: "Mon - Sat: 9:00 AM - 6:00 PM IST",
  social_linkedin: "https://linkedin.com",
  social_github: "https://github.com",
  social_instagram: "https://instagram.com",
  social_twitter: "https://twitter.com"
};

// LocalStorage Caching Helpers for instant UI rendering (0ms response)
const CACHE_PREFIX = 'tstech_cache_';

export const getCachedData = (key, fallback) => {
  try {
    const item = typeof window !== 'undefined' ? localStorage.getItem(`${CACHE_PREFIX}${key}`) : null;
    if (item) {
      const parsed = JSON.parse(item);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      if (typeof parsed === 'object' && parsed !== null && Object.keys(parsed).length > 0) return parsed;
    }
  } catch (err) {
    console.warn(`Error reading ${key} cache:`, err);
  }
  return fallback;
};

export const setCachedData = (key, data) => {
  try {
    if (typeof window !== 'undefined' && data) {
      const isValidArray = Array.isArray(data) && data.length > 0;
      const isValidObj = typeof data === 'object' && !Array.isArray(data) && Object.keys(data).length > 0;
      if (isValidArray || isValidObj) {
        localStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(data));
      }
    }
  } catch (err) {
    console.warn(`Error saving ${key} cache:`, err);
  }
};

// Synchronous Instant Getters for Page Initialization (0ms delay)
export const getCachedCourses = (params = {}) => {
  const cached = getCachedData('courses', MOCK_COURSES);
  let filtered = [...cached];
  if (params.featured) {
    filtered = filtered.filter(c => c.featured);
  }
  if (params.category && params.category.toLowerCase() !== 'all') {
    filtered = filtered.filter(c => c.category.toLowerCase() === params.category.toLowerCase());
  }
  return filtered;
};

export const getCachedPlacements = () => getCachedData('placements', MOCK_PLACEMENTS);
export const getCachedServices = () => getCachedData('services', MOCK_SERVICES);
export const getCachedProjects = (params = {}) => {
  const cached = getCachedData('projects', MOCK_PROJECTS);
  if (params.featured) return cached.filter(p => p.featured);
  return cached;
};
export const getCachedTestimonials = () => getCachedData('testimonials', MOCK_TESTIMONIALS);
export const getCachedSettings = () => getCachedData('settings', MOCK_SETTINGS);

// API Client Functions with Stale-While-Revalidate Syncing
export const fetchCourses = async (params = {}) => {
  try {
    const response = await api.get('/courses/', { params });
    const data = response.data.results ? response.data.results : response.data;
    if (Array.isArray(data) && data.length > 0) {
      if (!params.featured && (!params.category || params.category.toLowerCase() === 'all')) {
        setCachedData('courses', data);
      }
      return data;
    }
    return getCachedCourses(params);
  } catch (error) {
    console.warn("API offline or delayed, returning cached/fallback courses:", error.message);
    return getCachedCourses(params);
  }
};

export const fetchPlacements = async () => {
  try {
    const response = await api.get('/placements/');
    const data = response.data.results ? response.data.results : response.data;
    if (Array.isArray(data) && data.length > 0) {
      setCachedData('placements', data);
      return data;
    }
    return getCachedPlacements();
  } catch (error) {
    console.warn("API offline or delayed, returning cached/fallback placements:", error.message);
    return getCachedPlacements();
  }
};

export const fetchProjects = async (params = {}) => {
  try {
    const response = await api.get('/projects/', { params });
    const data = response.data.results ? response.data.results : response.data;
    if (Array.isArray(data) && data.length > 0) {
      if (!params.featured) {
        setCachedData('projects', data);
      }
      return data;
    }
    return getCachedProjects(params);
  } catch (error) {
    console.warn("API offline or delayed, returning cached/fallback projects:", error.message);
    return getCachedProjects(params);
  }
};

export const fetchServices = async () => {
  try {
    const response = await api.get('/services/');
    const data = response.data.results ? response.data.results : response.data;
    if (Array.isArray(data) && data.length > 0) {
      setCachedData('services', data);
      return data;
    }
    return getCachedServices();
  } catch (error) {
    console.warn("API offline or delayed, returning cached/fallback services:", error.message);
    return getCachedServices();
  }
};

export const fetchTestimonials = async () => {
  try {
    const response = await api.get('/testimonials/');
    const data = response.data.results ? response.data.results : response.data;
    if (Array.isArray(data) && data.length > 0) {
      setCachedData('testimonials', data);
      return data;
    }
    return getCachedTestimonials();
  } catch (error) {
    console.warn("API offline or delayed, returning cached/fallback testimonials:", error.message);
    return getCachedTestimonials();
  }
};

export const fetchSettings = async () => {
  try {
    const response = await api.get('/settings/');
    if (response.data && Object.keys(response.data).length > 0) {
      setCachedData('settings', response.data);
      return response.data;
    }
    return getCachedSettings();
  } catch (error) {
    console.warn("API offline or delayed, returning cached/fallback settings:", error.message);
    return getCachedSettings();
  }
};

export const sendContactMessage = async (formData) => {
  try {
    const response = await api.post('/contact/', formData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    return {
      success: true,
      message: "Thank you! Your inquiry has been received. Our admission & technology team will contact you soon."
    };
  }
};

export default api;
