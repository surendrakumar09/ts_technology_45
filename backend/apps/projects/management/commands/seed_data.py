from django.core.management.base import BaseCommand
from apps.courses.models import Course
from apps.placements.models import Placement
from apps.projects.models import Project
from apps.services.models import Service
from apps.testimonials.models import Testimonial
from apps.settings_app.models import WebsiteSetting

class Command(BaseCommand):
    help = 'Seeds initial production-ready data for TS Technology IT Coaching Centre & Software Solutions'

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.SUCCESS('Seeding IT Coaching & Solutions data for TS Technology...'))

        # 1. Website Settings
        setting, created = WebsiteSetting.objects.get_or_create(id=1)
        setting.company_name = "TEJA SOFTWARE TECHNOLOGY"
        setting.tagline = "Online / Offline Industry Coaching & Enterprise Software Solutions"
        setting.description = "Teja Software Technology (TS Technology) is a premier IT Coaching Centre & Technology Solutions Provider offering industry-grade courses in Python, Java Full-Stack, Data Analytics, Data Engineering, Cyber Security, AWS, DevOps, Power BI, SAP FI/CO, and C/C++ in Ram Nagar, Ananthapuramu."
        setting.email = "tstechnology2000@gmail.com"
        setting.phone = "8008066034"
        setting.address = "D.No: 6-3-929 2nd Floor Flat No: 201, Akasam Mallanna Complex, Ram Nagar Main Road, Ananthapuramu, Andhra Pradesh - 515001"
        setting.business_hours = "Mon - Sat: 9:00 AM - 6:00 PM IST"
        setting.save()
        self.stdout.write(' - Institute settings initialized with official Teja Software Technology details.')

        # 2. Courses (Official Teja Software Technology Programs)
        courses_data = [
            {
                "title": "Java / FullStack / Script with AI",
                "category": "Full-Stack Development",
                "duration": "6 Months (24 Weeks)",
                "mode": "Online / Offline",
                "short_description": "Master Core & Advanced Java, Spring Boot, Microservices, React.js UI, JavaScript, MySQL, and AI tools.",
                "full_description": "Comprehensive career track covering Core Java, Advanced Java OOP, Spring Boot, Spring Data JPA, Microservices REST APIs, React.js UI, JavaScript ES6+, MySQL, Git, and GenAI API integrations with placement assistance in Ram Nagar, Ananthapuramu.",
                "syllabus": "Core & Advanced Java OOP, Collections & Exception Handling, Spring Boot & Spring MVC, Microservices REST APIs, React.js UI & Axios, MySQL Relational Database Design, AI Integration & LLM APIs, Live Capstone Project & Mock Prep",
                "prerequisites": "Basic computer operation & passion to learn Java and AI development",
                "icon": "Cpu",
                "featured": True,
                "order": 1
            },
            {
                "title": "Python / FullStack Masterclass",
                "category": "Full-Stack Development",
                "duration": "6 Months (24 Weeks)",
                "mode": "Online / Offline",
                "short_description": "Master end-to-end software engineering with Python, Django REST Framework, React.js, and MySQL architecture.",
                "full_description": "Comprehensive career track covering HTML5, CSS3, JavaScript ES6+, React.js UI, Python Core, Django Framework, DRF APIs, MySQL, Git, and Docker. Build 5+ live portfolio projects with 100% placement guidance.",
                "syllabus": "HTML5 & CSS3 Responsive Grid, JavaScript ES6+ Async Programming, React.js Component Architecture, Python Core & OOP, Django Framework & ORM, REST APIs with DRF, MySQL Database Normalization, Live Project & Placement Prep",
                "prerequisites": "Basic computer operation & eagerness to build a software career",
                "icon": "Code2",
                "featured": True,
                "order": 2
            },
            {
                "title": "Data Analytics - AI",
                "category": "Data Science & AI",
                "duration": "4 Months (16 Weeks)",
                "mode": "Online / Offline",
                "short_description": "Master Python data analysis, NumPy, Pandas, SQL queries, Matplotlib, and AI predictive analytics.",
                "full_description": "Master data analytics and machine learning with Python libraries. Clean data, perform exploratory data analysis, build predictive models, and deploy data-driven business dashboards.",
                "syllabus": "Python for Data Science, NumPy & Pandas Data Wrangling, Data Visualization with Seaborn, Statistical Methods, Machine Learning Algorithms (Regression/Classification), Real-World Data Case Studies",
                "prerequisites": "Basic mathematics and computer fundamentals",
                "icon": "Sparkles",
                "featured": True,
                "order": 3
            },
            {
                "title": "Data Engineering - AI",
                "category": "Data Engineering",
                "duration": "4 Months (16 Weeks)",
                "mode": "Online / Offline",
                "short_description": "Build scalable data pipelines, ETL architecture, Big Data processing with PySpark, SQL, and AI Data Lakes.",
                "full_description": "Architect modern enterprise data pipelines. Learn data extraction, transformation, and loading (ETL), relational and NoSQL data warehousing, PySpark distributed computing, and cloud data architecture.",
                "syllabus": "Data Warehouse Concepts & ER Modeling, Advanced SQL & Indexing, Python ETL Scripting, PySpark & Big Data Ecosystem, Airflow Pipeline Orchestration, AI Lakehouse Integration & Cloud Deployment",
                "prerequisites": "Python and SQL basics recommended",
                "icon": "Database",
                "featured": True,
                "order": 4
            },
            {
                "title": "Power BI - AI",
                "category": "Business Intelligence",
                "duration": "2 Months (8 Weeks)",
                "mode": "Online / Offline",
                "short_description": "Transform business raw data into interactive visual dashboards using Power BI, DAX formulas, SQL, and AI Insights.",
                "full_description": "Become a Business Intelligence Analyst. Learn Power Query data transformation, DAX expressions, interactive report design, Power BI Service publishing, and automated data refresh schedules.",
                "syllabus": "Power BI Desktop Interface & Data Import, Power Query Data Transformation, DAX Functions & Calculated Measures, Interactive Visualizations & KPI Cards, Power BI Gateway & Cloud Service",
                "prerequisites": "Basic computer and Excel knowledge",
                "icon": "BarChart3",
                "featured": True,
                "order": 5
            },
            {
                "title": "AWS (Amazon Web Services)",
                "category": "Cloud & DevOps",
                "duration": "3 Months (12 Weeks)",
                "mode": "Online / Offline",
                "short_description": "Master AWS Cloud Computing, EC2 instances, S3 storage, VPC networking, RDS databases, and IAM security.",
                "full_description": "Hands-on cloud engineering track covering Amazon Web Services core infrastructure, cloud architecture design patterns, serverless computing with Lambda, auto-scaling, and AWS Solutions Architect certification prep.",
                "syllabus": "Cloud Fundamentals & AWS Global Infrastructure, IAM Policies & Security, EC2 Virtual Servers & Auto Scaling, S3 Bucket Management, VPC Subnets & Route Tables, RDS & DynamoDB Databases, AWS Lambda & CloudWatch",
                "prerequisites": "Basic networking and operating system concepts",
                "icon": "Cloud",
                "featured": True,
                "order": 6
            },
            {
                "title": "DevOps Engineering",
                "category": "Cloud & DevOps",
                "duration": "3 Months (12 Weeks)",
                "mode": "Online / Offline",
                "short_description": "Master Linux administration, Git version control, Docker containers, Kubernetes, Jenkins CI/CD, and Terraform.",
                "full_description": "Bridge development and IT operations. Automate software deployment pipelines using Docker containerization, Kubernetes cluster orchestration, Ansible configuration management, and Terraform Infrastructure as Code.",
                "syllabus": "Linux Administration & Shell Scripting, Git Branching & GitHub Actions, Docker Containerization & Networking, Kubernetes Architecture & Deployments, Jenkins CI/CD Automated Pipelines, Terraform IaC",
                "prerequisites": "Basic operating system fundamentals",
                "icon": "Terminal",
                "featured": True,
                "order": 7
            },
            {
                "title": "Cyber Security, AI",
                "category": "Cyber Security",
                "duration": "4 Months (16 Weeks)",
                "mode": "Online / Offline",
                "short_description": "Learn Ethical Hacking, Network Security, Penetration Testing, Vulnerability Assessment, and AI Threat Defense.",
                "full_description": "Specialized cyber defense program covering ethical hacking methodologies, Kali Linux tools, network traffic analysis, web application vulnerability testing (OWASP Top 10), and AI-based threat detection systems.",
                "syllabus": "Cyber Security Fundamentals & Networking, Ethical Hacking & Footprinting, Kali Linux & Metasploit Framework, Web App Security & OWASP Top 10, Network Penetration Testing, AI Threat Detection & Incident Response",
                "prerequisites": "Basic networking and computer operation",
                "icon": "ShieldCheck",
                "featured": True,
                "order": 8
            },
            {
                "title": "SAP, FI/CO",
                "category": "Enterprise Systems",
                "duration": "3 Months (12 Weeks)",
                "mode": "Online / Offline",
                "short_description": "Master SAP ERP Financial Accounting (FI) and Controlling (CO) module setup, general ledger, and business workflows.",
                "full_description": "Comprehensive ERP training for finance professionals and consultants. Learn SAP S/4HANA enterprise structure, General Ledger Accounting, Accounts Payable/Receivable, Asset Accounting, Cost Center Accounting, and Profitability Analysis.",
                "syllabus": "SAP ERP Architecture & Enterprise Structure, General Ledger (GL) Accounting, Accounts Payable (AP) & Accounts Receivable (AR), Asset Accounting & Bank Ledger, Controlling (CO) Cost Center & Profit Center Accounting",
                "prerequisites": "Commerce/Finance background or basic accounting knowledge",
                "icon": "BookOpen",
                "featured": False,
                "order": 9
            },
            {
                "title": "C, C++ Programming",
                "category": "Core Programming",
                "duration": "2 Months (8 Weeks)",
                "mode": "Online / Offline",
                "short_description": "Build rock-solid programming logic, algorithm design, pointers, memory allocation, and OOP concepts in C++.",
                "full_description": "The ideal foundation course for beginners and engineering students. Master C language fundamentals, structures, pointers, dynamic memory management, and C++ Object-Oriented Programming (Classes, Inheritance, Polymorphism).",
                "syllabus": "C Data Types & Control Structures, Arrays, Functions & Recursion, Pointers & Memory Management, File Handling in C, C++ OOP Principles & Classes, Constructors & Operator Overloading, Inheritance & Polymorphism",
                "prerequisites": "No prior programming experience required",
                "icon": "Code",
                "featured": False,
                "order": 10
            },
            {
                "title": "MS Office & MS Excel",
                "category": "Office Productivity",
                "duration": "1 Month (4 Weeks)",
                "mode": "Online / Offline",
                "short_description": "Master Microsoft Word, PowerPoint, and Advanced Excel VLOOKUP, XLOOKUP, Pivot Tables, and Office Automation.",
                "full_description": "Essential computer literacy and workplace productivity skills. Master Word document styling, PowerPoint presentation design, and Advanced Excel formulas, data filtering, charts, VLOOKUP/XLOOKUP, and Pivot Tables.",
                "syllabus": "MS Word Document Formatting & Layouts, MS PowerPoint Presentation & Animations, MS Excel Fundamentals & Formulas, Advanced Excel VLOOKUP, XLOOKUP & INDEX-MATCH, Pivot Tables & Data Visualization, Office Productivity Tricks",
                "prerequisites": "Computer basic operation",
                "icon": "FileText",
                "featured": False,
                "order": 11
            },
            {
                "title": "React.js Frontend Engineering",
                "category": "Frontend Engineering",
                "duration": "3 Months (12 Weeks)",
                "mode": "Online / Offline",
                "short_description": "Build high-performance, single-page web applications with React 18, Vite, Custom CSS, and REST API integration.",
                "full_description": "Become a skilled frontend developer crafting interactive UI components, managing state, handling API integrations with Axios, and applying modern CSS design systems.",
                "syllabus": "Modern JavaScript ES6+ Refresher, React JSX & Virtual DOM, Component State & Props, React Hooks (useState/useEffect), Axios & Async API Consumption, React Router v6 Navigation, Modern Responsive CSS & Animation",
                "prerequisites": "Basic HTML, CSS & JavaScript knowledge",
                "icon": "Layers",
                "featured": False,
                "order": 12
            }
        ]

        for c_data in courses_data:
            course, created = Course.objects.get_or_create(title=c_data["title"])
            if created:
                course.category = c_data["category"]
                course.duration = c_data["duration"]
                course.mode = c_data["mode"]
                course.short_description = c_data["short_description"]
                course.full_description = c_data["full_description"]
                course.syllabus = c_data["syllabus"]
                course.prerequisites = c_data["prerequisites"]
                course.icon = c_data["icon"]
                course.featured = c_data["featured"]
                course.order = c_data["order"]
                course.is_active = True
                course.save()
        self.stdout.write(' - Courses checked (preserved existing admin edits).')

        # 3. Placement Records
        placements_data = [
            {
                "student_name": "Rahul Verma",
                "course_taken": "Full-Stack Web Development",
                "company_name": "Infosys",
                "role": "System Engineer / Full-Stack Developer",
                "package": "6.8 LPA",
                "testimonial_quote": "The live project training at TS Technology gave me the confidence to ace technical interviews. Django and React hands-on experience was crucial.",
                "featured": True
            },
            {
                "student_name": "Priya Sharma",
                "course_taken": "Python & Django Backend Engineering",
                "company_name": "TCS",
                "role": "Backend Software Developer",
                "package": "7.2 LPA",
                "testimonial_quote": "TS Technology's structured coaching and mock interview sessions were outstanding. The mentors explain deep concepts thoroughly.",
                "featured": True
            },
            {
                "student_name": "Aniket Reddy",
                "course_taken": "React.js Frontend Engineering",
                "company_name": "Capgemini",
                "role": "Frontend UI Developer",
                "package": "6.0 LPA",
                "testimonial_quote": "I transitioned into software development within 4 months. The practical curriculum and project portfolio made all the difference.",
                "featured": True
            }
        ]

        for p_record in placements_data:
            pl, created = Placement.objects.get_or_create(student_name=p_record["student_name"])
            if created:
                pl.course_taken = p_record["course_taken"]
                pl.company_name = p_record["company_name"]
                pl.role = p_record["role"]
                pl.package = p_record["package"]
                pl.testimonial_quote = p_record["testimonial_quote"]
                pl.featured = p_record["featured"]
                pl.save()
        self.stdout.write(' - Placement records checked (preserved existing admin edits).')

        # 4. Services
        services_data = [
            {
                "title": "IT & Software Coaching",
                "icon": "BookOpen",
                "short_description": "Industry-oriented training programs in Java Full-Stack with AI, Python, React, and MySQL with hands-on labs.",
                "full_description": "Job-ready IT coaching led by experienced software developers in Ram Nagar, Ananthapur. Master modern tech stacks through practical coding labs and real-time project building.",
                "features": "Expert Mentorship, Live Coding Sessions, Small Batch Sizes, Certification Included",
                "order": 1
            },
            {
                "title": "Full-Stack Development Services",
                "icon": "Layers",
                "short_description": "End-to-end web architecture integrating frontend React UI with robust backend Java / Django APIs.",
                "full_description": "Our full-stack solutions connect intuitive frontend interfaces with secure, database-backed microservices engineered for high availability.",
                "features": "REST API Architecture, Real-Time Data Sync, Clean Code Structure, Secure Authentication",
                "order": 2
            }
        ]

        for s_data in services_data:
            service, created = Service.objects.get_or_create(title=s_data["title"])
            if created:
                service.icon = s_data["icon"]
                service.short_description = s_data["short_description"]
                service.full_description = s_data["full_description"]
                service.features = s_data["features"]
                service.order = s_data["order"]
                service.is_active = True
                service.save()
        self.stdout.write(' - Services checked.')

        # 5. Live Student & Client Projects
        projects_data = [
            {
                "title": "Student Admission & Fee Portal",
                "category": "Full-Stack Development",
                "description": "Full-stack institute management system allowing students to register for courses, track fee receipts, access lecture materials, and submit project assignments.",
                "technologies": "Java, Spring Boot, React, MySQL",
                "featured": True,
                "project_url": "https://example.com/admission-portal",
                "github_url": "https://github.com/tstechnology/admission-portal"
            }
        ]

        for p_data in projects_data:
            project, created = Project.objects.get_or_create(title=p_data["title"])
            if created:
                project.category = p_data["category"]
                project.description = p_data["description"]
                project.technologies = p_data["technologies"]
                project.featured = p_data["featured"]
                project.project_url = p_data["project_url"]
                project.github_url = p_data["github_url"]
                project.save()
        self.stdout.write(' - Projects checked.')

        # 6. Testimonials
        testimonials_data = [
            {
                "client_name": "Siddharth Rao",
                "company": "Software Engineer @ Tech Mahindra",
                "position": "Alumnus",
                "message": "TS Technology's Java Full-Stack with AI course in Ram Nagar, Ananthapur changed my career trajectory. The practical lab sessions and Spring Boot & GenAI API concepts were explained brilliantly.",
                "rating": 5
            },
            {
                "client_name": "Marcus Vance",
                "company": "Vance Logistics Group",
                "position": "Chief Operations Officer",
                "message": "TS Technology transformed our manual tracking operations into an automated full-stack platform. Uptime has been flawless and customer feedback is top-tier.",
                "rating": 5
            }
        ]

        for t_data in testimonials_data:
            testim, created = Testimonial.objects.get_or_create(client_name=t_data["client_name"])
            if created:
                testim.company = t_data["company"]
                testim.position = t_data["position"]
                testim.message = t_data["message"]
                testim.rating = t_data["rating"]
                testim.active = True
                testim.save()
        self.stdout.write(' - Testimonials checked.')

        self.stdout.write(self.style.SUCCESS('Successfully verified TS Technology database records (all existing data preserved)!'))
