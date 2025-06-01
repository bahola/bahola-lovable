
import React from 'react';
import { HelpContentPage } from '@/components/help-center/HelpContentPage';

const RemedyInteractions = () => {
  return (
    <HelpContentPage 
      pageType="remedy_interactions"
      fallbackTitle="Homeopathic Remedy Interactions"
      fallbackDescription="Comprehensive information about potential interactions between remedies and medications"
    />
  );
};

export default RemedyInteractions;
