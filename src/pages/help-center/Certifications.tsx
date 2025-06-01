
import React from 'react';
import { HelpContentPage } from '@/components/help-center/HelpContentPage';

const Certifications = () => {
  return (
    <HelpContentPage 
      pageType="certifications"
      fallbackTitle="Product Certification and Standards"
      fallbackDescription="Information about the quality standards and certifications of our products"
    />
  );
};

export default Certifications;
