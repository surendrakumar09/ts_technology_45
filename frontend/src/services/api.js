import axios from 'axios';

const getBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL;
  if (envUrl) {
    return envUrl.replace(/\/+$/, '');
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
    title: "Java / FullStack / Script with AI",
    slug: "java-fullstack-script-with-ai",
    category: "Full-Stack Development",
    duration: "6 Months (24 Weeks)",
    mode: "Online / Offline",
    short_description: "Master Core & Advanced Java, Spring Boot, Microservices, React.js UI, JavaScript, MySQL, and AI tools.",
    full_description: "Comprehensive career track covering Core Java, Advanced Java OOP, Spring Boot, Spring Data JPA, Microservices REST APIs, React.js UI, JavaScript ES6+, MySQL, Git, and GenAI API integrations with placement assistance in Ram Nagar, Ananthapuramu.",
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
    title: "Python / FullStack Masterclass",
    slug: "python-fullstack-masterclass",
    category: "Full-Stack Development",
    duration: "6 Months (24 Weeks)",
    mode: "Online / Offline",
    short_description: "Master end-to-end software engineering with Python, Django REST Framework, React.js, and MySQL architecture.",
    full_description: "Comprehensive career track covering HTML5, CSS3, JavaScript ES6+, React.js UI, Python Core, Django Framework, DRF APIs, MySQL, Git, and Docker. Build 5+ live portfolio projects with 100% placement guidance.",
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
    id: 3,
    title: "Data Analytics - AI",
    slug: "data-analytics-ai",
    category: "Data Science & AI",
    duration: "4 Months (16 Weeks)",
    mode: "Online / Offline",
    short_description: "Master Python data analysis, NumPy, Pandas, SQL queries, Matplotlib, and AI predictive analytics.",
    full_description: "Master data analytics and machine learning with Python libraries. Clean data, perform exploratory data analysis, build predictive models, and deploy data-driven business dashboards.",
    module_list: [
      "Python for Data Analytics",
      "NumPy & Pandas Data Wrangling",
      "SQL Data Extraction & Queries",
      "Data Visualization with Seaborn & Matplotlib",
      "Statistical Analysis & Exploratory Data Analysis",
      "Machine Learning Algorithms (Regression/Classification)",
      "AI Insights & Business Case Studies"
    ],
    prerequisites: "Basic mathematics and computer fundamentals",
    icon: "Sparkles",
    featured: true,
    order: 3
  },
  {
    id: 4,
    title: "Data Engineering - AI",
    slug: "data-engineering-ai",
    category: "Data Engineering",
    duration: "4 Months (16 Weeks)",
    mode: "Online / Offline",
    short_description: "Build scalable data pipelines, ETL architecture, Big Data processing with PySpark, SQL, and AI Data Lakes.",
    full_description: "Architect modern enterprise data pipelines. Learn data extraction, transformation, and loading (ETL), relational and NoSQL data warehousing, PySpark distributed computing, and cloud data architecture.",
    module_list: [
      "Data Warehouse Concepts & ER Modeling",
      "Advanced SQL & Database Indexing",
      "Python ETL Pipeline Development",
      "PySpark & Big Data Distributed Processing",
      "Airflow Workflow Orchestration",
      "Cloud Data Lakes & AI Integration"
    ],
    prerequisites: "Python and SQL basics recommended",
    icon: "Database",
    featured: true,
    order: 4
  },
  {
    id: 5,
    title: "Power BI - AI",
    slug: "power-bi-ai",
    category: "Business Intelligence",
    duration: "2 Months (8 Weeks)",
    mode: "Online / Offline",
    short_description: "Transform business raw data into interactive visual dashboards using Power BI, DAX formulas, SQL, and AI Insights.",
    full_description: "Become a Business Intelligence Analyst. Learn Power Query data transformation, DAX expressions, interactive report design, Power BI Service publishing, and automated data refresh schedules.",
    module_list: [
      "Power BI Desktop Interface & Data Import",
      "Power Query Data Transformation",
      "DAX Functions & Calculated Measures",
      "Interactive Visualizations & KPI Cards",
      "Power BI Gateway & Cloud Service Publishing"
    ],
    prerequisites: "Basic computer and Excel knowledge",
    icon: "BarChart3",
    featured: true,
    order: 5
  },
  {
    id: 6,
    title: "AWS (Amazon Web Services)",
    slug: "aws-amazon-web-services",
    category: "Cloud & DevOps",
    duration: "3 Months (12 Weeks)",
    mode: "Online / Offline",
    short_description: "Master AWS Cloud Computing, EC2 instances, S3 storage, VPC networking, RDS databases, and IAM security.",
    full_description: "Hands-on cloud engineering track covering Amazon Web Services core infrastructure, cloud architecture design patterns, serverless computing with Lambda, auto-scaling, and AWS Solutions Architect certification prep.",
    module_list: [
      "Cloud Fundamentals & AWS Global Infrastructure",
      "IAM Security & Access Policies",
      "EC2 Compute & Auto-Scaling",
      "S3 Storage & Bucket Policies",
      "VPC Networking & Security Groups",
      "RDS & DynamoDB Database Services",
      "AWS Lambda Serverless Computing"
    ],
    prerequisites: "Basic networking and operating system concepts",
    icon: "Cloud",
    featured: true,
    order: 6
  },
  {
    id: 7,
    title: "DevOps Engineering",
    slug: "devops-engineering",
    category: "Cloud & DevOps",
    duration: "3 Months (12 Weeks)",
    mode: "Online / Offline",
    short_description: "Master Linux administration, Git version control, Docker containers, Kubernetes, Jenkins CI/CD, and Terraform.",
    full_description: "Bridge development and IT operations. Automate software deployment pipelines using Docker containerization, Kubernetes cluster orchestration, Ansible configuration management, and Terraform Infrastructure as Code.",
    module_list: [
      "Linux Systems & Shell Scripting",
      "Git & GitHub Actions Automation",
      "Docker Containerization & Networking",
      "Kubernetes Cluster Deployment",
      "Jenkins CI/CD Pipeline Automation",
      "Terraform Infrastructure as Code"
    ],
    prerequisites: "Basic operating system fundamentals",
    icon: "Terminal",
    featured: true,
    order: 7
  },
  {
    id: 8,
    title: "Cyber Security, AI",
    slug: "cyber-security-ai",
    category: "Cyber Security",
    duration: "4 Months (16 Weeks)",
    mode: "Online / Offline",
    short_description: "Learn Ethical Hacking, Network Security, Penetration Testing, Vulnerability Assessment, and AI Threat Defense.",
    full_description: "Specialized cyber defense program covering ethical hacking methodologies, Kali Linux tools, network traffic analysis, web application vulnerability testing (OWASP Top 10), and AI-based threat detection systems.",
    module_list: [
      "Cyber Security & Network Fundamentals",
      "Ethical Hacking Methodologies",
      "Kali Linux & Metasploit Testing",
      "Web App Security & OWASP Top 10",
      "Network Traffic Analysis & Wireshark",
      "AI Threat Detection & Incident Response"
    ],
    prerequisites: "Basic networking and computer operation",
    icon: "ShieldCheck",
    featured: true,
    order: 8
  },
  {
    id: 9,
    title: "SAP, FI/CO",
    slug: "sap-fico",
    category: "Enterprise Systems",
    duration: "3 Months (12 Weeks)",
    mode: "Online / Offline",
    short_description: "Master SAP ERP Financial Accounting (FI) and Controlling (CO) module setup, general ledger, and business workflows.",
    full_description: "Comprehensive ERP training for finance professionals and consultants. Learn SAP S/4HANA enterprise structure, General Ledger Accounting, Accounts Payable/Receivable, Asset Accounting, Cost Center Accounting, and Profitability Analysis.",
    module_list: [
      "SAP ERP Architecture & Enterprise Structure",
      "General Ledger (GL) Accounting",
      "Accounts Payable & Receivable (AP/AR)",
      "Asset Accounting & Bank Ledger",
      "Controlling (CO) Cost Center & Profitability Analysis"
    ],
    prerequisites: "Commerce/Finance background or basic accounting knowledge",
    icon: "BookOpen",
    featured: false,
    order: 9
  },
  {
    id: 10,
    title: "C, C++ Programming",
    slug: "c-c-plus-plus-programming",
    category: "Core Programming",
    duration: "2 Months (8 Weeks)",
    mode: "Online / Offline",
    short_description: "Build rock-solid programming logic, algorithm design, pointers, memory allocation, and OOP concepts in C++.",
    full_description: "The ideal foundation course for beginners and engineering students. Master C language fundamentals, structures, pointers, dynamic memory management, and C++ Object-Oriented Programming (Classes, Inheritance, Polymorphism).",
    module_list: [
      "C Data Types, Variables & Loops",
      "Functions, Arrays & Strings",
      "Pointers & Dynamic Memory Allocation",
      "Structures & File Handling",
      "C++ Classes, Objects & Constructors",
      "Inheritance, Polymorphism & Templates"
    ],
    prerequisites: "No prior programming experience required",
    icon: "Code",
    featured: false,
    order: 10
  },
  {
    id: 11,
    title: "MS Office & MS Excel",
    slug: "ms-office-ms-excel",
    category: "Office Productivity",
    duration: "1 Month (4 Weeks)",
    mode: "Online / Offline",
    short_description: "Master Microsoft Word, PowerPoint, and Advanced Excel VLOOKUP, XLOOKUP, Pivot Tables, and Office Automation.",
    full_description: "Essential computer literacy and workplace productivity skills. Master Word document styling, PowerPoint presentation design, and Advanced Excel formulas, data filtering, charts, VLOOKUP/XLOOKUP, and Pivot Tables.",
    module_list: [
      "MS Word Document Formatting & Layouts",
      "MS PowerPoint Slide Design & Presentations",
      "MS Excel Basics, Formulas & Formatting",
      "Advanced Excel VLOOKUP, XLOOKUP & INDEX-MATCH",
      "Pivot Tables, Charts & Dashboard Creation"
    ],
    prerequisites: "Computer basic operation",
    icon: "FileText",
    featured: false,
    order: 11
  },
  {
    id: 12,
    title: "React.js Frontend Engineering",
    slug: "react-js-frontend-engineering",
    category: "Frontend Engineering",
    duration: "3 Months (12 Weeks)",
    mode: "Online / Offline",
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
    icon: "Layers",
    featured: false,
    order: 12
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
    throw {
      message: "Network error: Unable to connect to backend server. Please check your connection and try again."
    };
  }
};

export default api;
