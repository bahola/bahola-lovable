
import React from 'react';
import { PageLayout } from '@/components/PageLayout';

const ReturnPolicy = () => {
  return (
    <PageLayout title="Return & Refund Policy" description="Our comprehensive return and refund policies">
      <div className="prose prose-lg max-w-none">
        <h2>Return Policy</h2>
        <p>
          At Bahola Labs, we want you to be completely satisfied with your purchase. If for any reason you're not happy with your order, we offer a straightforward return policy to ensure your shopping experience remains positive.
        </p>
        
        <h3>Return Eligibility</h3>
        <ul>
          <li>Products must be returned within 14 days of receipt</li>
          <li>Items must be unused, unopened, and in their original packaging</li>
          <li>Receipt or proof of purchase is required for all returns</li>
          <li>Certain products, including opened medicines, cannot be returned due to health and safety regulations</li>
        </ul>
        
        <h3>How to Initiate a Return</h3>
        <ol>
          <li>Contact our customer service team at care@baholalabs.in or call +91 9791035385</li>
          <li>Provide your order number, the items you wish to return, and the reason for return</li>
          <li>Our team will guide you through the return process and provide a return authorization</li>
        </ol>
        
        <h2>Refund Policy</h2>
        <p>
          Once we receive and inspect your return, we will notify you about the status of your refund.
        </p>
        
        <h3>Refund Process</h3>
        <ul>
          <li>If approved, your refund will be processed within 7-10 business days</li>
          <li>Refunds will be issued using the original payment method</li>
          <li>Shipping charges are non-refundable unless the return is due to our error</li>
          <li>In case of damaged or defective products, we will cover the return shipping costs</li>
        </ul>
        
        <h3>Exceptions</h3>
        <p>
          The following items cannot be returned or refunded:
        </p>
        <ul>
          <li>Products with broken seals or opened packaging</li>
          <li>Personalized or custom-made products</li>
          <li>Digital products or downloaded content</li>
          <li>Products purchased during clearance sales (unless damaged or defective)</li>
        </ul>
        
        <h2>Exchange Policy</h2>
        <p>
          If you wish to exchange a product for a different item or variety, please follow the same procedure as returns. We will process your exchange once we receive the original product.
        </p>
        
        <h3>Contact Us</h3>
        <p>
          If you have any questions about our return and refund policies, please contact our customer service team:
        </p>
        <ul>
          <li>Email: care@baholalabs.in</li>
          <li>Phone: +91 9791035385</li>
          <li>Hours: Monday to Friday, 9:00 AM to 6:00 PM</li>
        </ul>
      </div>
    </PageLayout>
  );
};

export default ReturnPolicy;
