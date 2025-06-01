
import React from 'react';
import { HelpContentPage } from '@/components/help-center/HelpContentPage';

const NoResultsTroubleshooting = () => {
  return (
    <HelpContentPage 
      pageType="no_results_troubleshooting"
      fallbackTitle="What to Do If You Don't See Results"
      fallbackDescription="Guidance on what to do when homeopathic remedies don't seem to be working"
    />
  );
};

export default NoResultsTroubleshooting;
