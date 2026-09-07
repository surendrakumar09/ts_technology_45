import React from 'react';
import ServicesSection from '../components/ServicesSection';

const Services = () => {
  return (
    <div className="services-page" style={{ paddingTop: 'calc(var(--header-height) + 20px)' }}>
      <ServicesSection />
    </div>
  );
};

export default Services;
