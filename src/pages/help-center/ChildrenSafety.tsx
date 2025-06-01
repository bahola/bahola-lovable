
import React from 'react';
import { HelpContentPage } from '@/components/help-center/HelpContentPage';

const ChildrenSafety = () => {
  return (
    <HelpContentPage 
      pageType="children_safety"
      fallbackTitle="Homeopathy for Children: Safety Guidelines"
      fallbackDescription="Important safety information for using homeopathic remedies with children"
    />
  );
};

export default ChildrenSafety;
