
import React from 'react';
import { HelpContentPage } from '@/components/help-center/HelpContentPage';

const SeasonalRemedies = () => {
  return (
    <HelpContentPage 
      pageType="seasonal_remedies"
      fallbackTitle="Seasonal Homeopathic Remedies Guide"
      fallbackDescription="Learn which remedies are most useful during different seasons"
    />
  );
};

export default SeasonalRemedies;
