import React from 'react';
import {
  Globe,
  Code2,
  Smartphone,
  ShoppingCart,
  ShieldCheck,
  Zap,
  FileText,
  Briefcase,
  TrendingUp,
  Palette,
  GraduationCap,
  Lightbulb,
  Layers
} from 'lucide-react';

const SERVICES_DATA = [
  {
    id: 1,
    title: 'Website Development',
    description: 'Business websites, portfolio websites, e-commerce websites and custom websites.',
    icon: Globe,
  },
  {
    id: 2,
    title: 'Custom Software Development',
    description: 'Tailored software solutions for business requirements, including CRM, billing, inventory and management systems.',
    icon: Code2,
  },
  {
    id: 3,
    title: 'Mobile App Development',
    description: 'Android and iOS applications for businesses, startups and individuals.',
    icon: Smartphone,
  },
  {
    id: 4,
    title: 'E-commerce Solutions',
    description: 'Online stores, payment integration, product management and order management.',
    icon: ShoppingCart,
  },
  {
    id: 5,
    title: 'Website Maintenance',
    description: 'Website updates, security, backups, bug fixes and performance optimization.',
    icon: ShieldCheck,
  },
  {
    id: 6,
    title: 'Business Automation',
    description: 'CRM, billing, inventory, enquiry management and business management automation.',
    icon: Zap,
  },
  {
    id: 7,
    title: 'Resume Creation',
    description: 'Professional and ATS-friendly resumes/CVs designed for job seekers.',
    icon: FileText,
  },
  {
    id: 8,
    title: 'Portfolio Creation',
    description: 'Professional personal and business portfolio websites to showcase skills, projects and achievements.',
    icon: Briefcase,
  },
  {
    id: 9,
    title: 'Digital Marketing',
    description: 'SEO, social media marketing, branding and online growth solutions.',
    icon: TrendingUp,
  },
  {
    id: 10,
    title: 'UI/UX Design',
    description: 'Modern, creative, responsive and user-friendly interface designs.',
    icon: Palette,
  },
  {
    id: 11,
    title: 'IT Training & Guidance',
    description: 'Technical training, internships, project guidance and career-oriented IT support.',
    icon: GraduationCap,
  },
  {
    id: 12,
    title: 'IT Consultation',
    description: 'Technology consulting, business technology planning and digital transformation guidance.',
    icon: Lightbulb,
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="services-section-wrapper section-padding">
      <div className="container">
        {/* Section Header */}
        <div className="services-section-header">
          <div className="section-subtitle">
            <Layers size={14} />
            <span>OUR SERVICES</span>
          </div>
          <h2 className="section-title">
            Complete IT Solutions for <span className="gradient-text">Your Business</span>
          </h2>
          <p className="section-desc">
            We turn your ideas into powerful digital solutions.
          </p>
        </div>

        {/* 12 Services Grid */}
        <div className="services-grid-12">
          {SERVICES_DATA.map((service) => {
            const Icon = service.icon;
            return (
              <div key={service.id} className="service-card-modern">
                <div className="service-card-icon-wrap">
                  <Icon size={26} className="service-card-icon" />
                </div>
                <h3 className="service-card-title">{service.title}</h3>
                <p className="service-card-desc">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
