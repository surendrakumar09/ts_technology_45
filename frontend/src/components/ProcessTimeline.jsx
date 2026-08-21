import React from 'react';
import { Search, Compass, Layout, Code2, ShieldCheck, Rocket } from 'lucide-react';

const steps = [
  {
    num: '01',
    title: 'Discover',
    icon: Search,
    desc: 'Understand the client\'s requirements, business objectives, target audience, and project scope.'
  },
  {
    num: '02',
    title: 'Plan',
    icon: Compass,
    desc: 'Create architecture, choose technology stack, design database models, and map development milestones.'
  },
  {
    num: '03',
    title: 'Design',
    icon: Layout,
    desc: 'Build modern, user-friendly UI/UX interfaces with high fidelity prototypes and aesthetic component systems.'
  },
  {
    num: '04',
    title: 'Develop',
    icon: Code2,
    desc: 'Engineer responsive frontend React views, high-throughput Django REST APIs, and production MySQL schemas.'
  },
  {
    num: '05',
    title: 'Test',
    icon: ShieldCheck,
    desc: 'Perform exhaustive functionality, security audits, cross-device responsiveness, and API latency testing.'
  },
  {
    num: '06',
    title: 'Deploy',
    icon: Rocket,
    desc: 'Deploy production-ready code with SSL, CI/CD pipelines, containerized Docker environments, and monitoring.'
  }
];

const ProcessTimeline = () => {
  return (
    <div className="process-steps">
      {steps.map((step, idx) => {
        const IconComp = step.icon;
        return (
          <div key={idx} className="card-glass process-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span className="process-step-num">{step.num}</span>
              <div className="service-icon-box" style={{ width: '44px', height: '44px', marginBottom: 0 }}>
                <IconComp size={20} />
              </div>
            </div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '10px' }}>{step.title}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6' }}>
              {step.desc}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default ProcessTimeline;
