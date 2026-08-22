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
        if created:
            setting.company_name = "TS Technology"
            setting.tagline = "Empowering Minds, Building Digital Solutions for a Smarter Future."
            setting.description = "TS Technology is a premier IT Coaching Centre & Technology Solutions Provider offering industry-grade software courses, live project training, placement assistance, and custom enterprise software development in Ram Nagar, Ananthapur."
            setting.email = "tstechnology2000@gmail.com"
            setting.phone = "8008066034"
            setting.address = "Ram Nagar, Ananthapur"
            setting.business_hours = "Mon - Sat: 9:00 AM - 6:00 PM IST"
            setting.save()
            self.stdout.write(' - Institute settings initialized.')
        else:
            self.stdout.write(' - Institute settings preserved (already exists).')

        # 2. Courses (IT Coaching Programs)
        courses_data = [
            {
                "title": "Java Full-Stack Development with AI",
                "category": "Full-Stack Development",
                "duration": "6 Months (24 Weeks)",
                "mode": "Classroom & Online",
                "short_description": "Master Java, Spring Boot, Microservices, React UI, MySQL, and Generative AI tools for modern enterprise development.",
                "full_description": "Comprehensive career track covering Core Java, Advanced Java OOP, Spring Boot, Spring Data JPA, Microservices REST APIs, React.js UI, MySQL, Git, and GenAI API integrations. Build live enterprise projects with placement assistance in Ram Nagar, Ananthapur.",
                "syllabus": "Core & Advanced Java OOP, Collections & Exception Handling, Spring Boot & Spring MVC, Microservices & REST APIs, React.js Frontend UI & Axios, MySQL Relational Database Design, AI Integration & LLM APIs, Live Capstone Project & Mock Prep",
                "prerequisites": "Basic computer operation & passion to learn Java and AI development",
                "icon": "Cpu",
                "featured": True,
                "order": 1
            },
            {
                "title": "Full-Stack Web Development Masterclass",
                "category": "Full-Stack Development",
                "duration": "6 Months (24 Weeks)",
                "mode": "Classroom & Online",
                "short_description": "Master end-to-end web engineering with React.js, Python Django REST Framework, and MySQL database architecture.",
                "full_description": "Comprehensive career track covering HTML5, CSS3, JavaScript ES6+, React.js UI, Python, Django, DRF APIs, MySQL, Git, and Docker. Build 5+ live portfolio projects with 100% placement guidance.",
                "syllabus": "HTML5 & CSS3 Responsive Grid, JavaScript ES6+ Async Programming, React.js Component Architecture, Python Core & OOP, Django Framework & ORM, REST APIs with DRF, MySQL Database Normalization, Live Project & Placement Prep",
                "prerequisites": "Basic computer operation & eagerness to build a software career",
                "icon": "Code2",
                "featured": True,
                "order": 2
            },
            {
                "title": "Python & Django Backend Engineering",
                "category": "Python & Django",
                "duration": "3 Months (12 Weeks)",
                "mode": "Classroom & Online",
                "short_description": "In-depth specialization in Python programming, Django ORM, RESTful API design, and database security.",
                "full_description": "Specialized backend development course focusing on enterprise Python, object-oriented design, Django web application lifecycle, DRF serializers, authentication, and MySQL integration.",
                "syllabus": "Python Fundamentals & Data Structures, OOP Principles in Python, Django Architecture & Views, Django ORM & Migrations, DRF Serializers & ViewSets, CORS & Security Practices, Deployment on Production Servers",
                "prerequisites": "Basic logic or prior programming exposure recommended",
                "icon": "Terminal",
                "featured": True,
                "order": 3
            },
            {
                "title": "React.js Frontend Engineering",
                "category": "Frontend Engineering",
                "duration": "3 Months (12 Weeks)",
                "mode": "Classroom & Online",
                "short_description": "Build high-performance, single-page web applications with React 18, Vite, Custom CSS, and REST API integration.",
                "full_description": "Become a skilled frontend developer crafting interactive UI components, managing state, handling API integrations with Axios, and applying modern CSS design systems.",
                "syllabus": "Modern JavaScript ES6+ Refresher, React JSX & Virtual DOM, Component State & Props, React Hooks (useState/useEffect), Axios & Async API Consumption, React Router v6 Navigation, Modern Responsive CSS & Animation",
                "prerequisites": "Basic HTML, CSS & JavaScript knowledge",
                "icon": "Layers",
                "featured": True,
                "order": 4
            },
            {
                "title": "Database Solutions & MySQL Masterclass",
                "category": "Database & Cloud",
                "duration": "2 Months (8 Weeks)",
                "mode": "Online Live Classes",
                "short_description": "Learn relational database design, SQL query optimization, ER modeling, and ORM integration.",
                "full_description": "Gain hands-on expertise in MySQL schema normalization, indexing strategies, complex JOIN queries, transaction management, and automated backups.",
                "syllabus": "Relational Database Concepts, SQL Data Definition & Manipulation, Complex Joins & Subqueries, Indexing & Query Tuning, ER Diagram Design, Django ORM Database Mapping, Backup & Security Protocols",
                "prerequisites": "Computer fundamentals",
                "icon": "Database",
                "featured": False,
                "order": 5
            },
            {
                "title": "Data Science & Python Machine Learning",
                "category": "Data Science & AI",
                "duration": "4 Months (16 Weeks)",
                "mode": "Classroom & Online",
                "short_description": "Learn Python data analysis, NumPy, Pandas, Matplotlib, and predictive Machine Learning algorithms.",
                "full_description": "Master data analytics and machine learning with Python libraries. Clean data, perform exploratory data analysis, build predictive models, and deploy data-driven applications.",
                "syllabus": "Python for Data Science, NumPy & Pandas Data Wrangling, Data Visualization with Seaborn, Statistical Methods, Machine Learning Algorithms (Regression/Classification), Real-World Data Case Studies",
                "prerequisites": "Basic mathematics and Python knowledge",
                "icon": "Sparkles",
                "featured": True,
                "order": 6
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
