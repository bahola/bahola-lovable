
import React from 'react';
import { HelpContentPage } from '@/components/help-center/HelpContentPage';

const FirstAidKit = () => {
  return (
    <HelpContentPage 
      pageType="first_aid_kit"
      fallbackTitle="Creating a Homeopathic First Aid Kit"
      fallbackDescription="Learn how to assemble a comprehensive homeopathic first aid kit"
    />
  );
};

export default FirstAidKit;
