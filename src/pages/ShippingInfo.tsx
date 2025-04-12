
import React from 'react';
import { PageLayout } from '@/components/PageLayout';

const ShippingInfo = () => {
  return (
    <PageLayout title="Shipping Information" description="Details about our shipping methods, costs, and delivery times">
      <div className="prose prose-lg max-w-none">
        <h2>Shipping & Delivery</h2>
        <p>
          At Bahola Labs, we strive to deliver your homeopathic remedies quickly and efficiently. Our shipping partners are carefully selected to ensure your products arrive safely and in perfect condition.
        </p>
        
        <h3>Shipping Methods</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="text-left">Shipping Method</th>
                <th className="text-left">Delivery Time</th>
                <th className="text-left">Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Standard Shipping</td>
                <td>3-5 business days</td>
                <td>₹50 (Free on orders above ₹500)</td>
              </tr>
              <tr>
                <td>Express Shipping</td>
                <td>1-2 business days</td>
                <td>₹150</td>
              </tr>
              <tr>
                <td>Same-Day Delivery</td>
                <td>Within 24 hours (select cities only)</td>
                <td>₹250</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <h3>Order Processing</h3>
        <ul>
          <li>Orders are processed within 24 hours of receipt (excluding weekends and holidays)</li>
          <li>You will receive an email confirmation once your order is processed</li>
          <li>A tracking number will be provided when your order ships</li>
        </ul>
        
        <h3>Shipping Coverage</h3>
        <p>
          We currently ship to all major cities and regions across India. International shipping is available to select countries. Please contact customer service for international shipping details.
        </p>
        
        <h4>Areas with Express Shipping Available:</h4>
        <ul>
          <li>Delhi NCR</li>
          <li>Mumbai</li>
          <li>Chennai</li>
          <li>Bangalore</li>
          <li>Hyderabad</li>
          <li>Kolkata</li>
          <li>Pune</li>
        </ul>
        
        <h4>Areas with Same-Day Delivery:</h4>
        <ul>
          <li>Chennai (select pin codes)</li>
          <li>Delhi (select pin codes)</li>
          <li>Mumbai (select pin codes)</li>
        </ul>
        
        <h3>Shipping Restrictions</h3>
        <p>
          Some products may have shipping restrictions due to regulatory requirements. We will notify you if any items in your order cannot be shipped to your location.
        </p>
        
        <h3>Order Tracking</h3>
        <p>
          You can track your order at any time by:
        </p>
        <ul>
          <li>Logging into your account and viewing your order history</li>
          <li>Using the tracking number provided in your shipping confirmation email</li>
          <li>Contacting our customer service team</li>
        </ul>
        
        <h3>Delivery Issues</h3>
        <p>
          If you experience any issues with your delivery, please contact us immediately at care@baholalabs.in or call +91 9791035385. We will work with our shipping partners to resolve any problems as quickly as possible.
        </p>
      </div>
    </PageLayout>
  );
};

export default ShippingInfo;
