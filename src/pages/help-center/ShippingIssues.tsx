
import React from 'react';
import { HelpContentPage } from '@/components/help-center/HelpContentPage';

const ShippingIssues = () => {
  return (
    <HelpContentPage 
      pageType="shipping_issues"
      fallbackTitle="Shipping and Delivery Issues"
      fallbackDescription="Common shipping problems and how to resolve them quickly"
    />
  );
};

export default ShippingIssues;
