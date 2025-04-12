
import React from 'react';
import { PageLayout } from '@/components/PageLayout';

const PrivacyPolicy = () => {
  return (
    <PageLayout title="Privacy Policy" description="How we collect, use, and protect your information">
      <div className="prose prose-lg max-w-none">
        <h2>Privacy Policy</h2>
        <p className="lead">
          At Bahola Labs, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase.
        </p>
        
        <h3>1. Information We Collect</h3>
        <p>
          We may collect the following types of information:
        </p>
        <ul>
          <li>
            <strong>Personal Information:</strong> Name, email address, phone number, shipping address, billing address, and payment information.
          </li>
          <li>
            <strong>Account Information:</strong> Username, password, and account preferences.
          </li>
          <li>
            <strong>Transaction Information:</strong> Products purchased, date of purchase, and payment method.
          </li>
          <li>
            <strong>Technical Information:</strong> IP address, browser type, device information, and browsing patterns.
          </li>
        </ul>
        
        <h3>2. How We Use Your Information</h3>
        <p>
          We use your information for various purposes, including:
        </p>
        <ul>
          <li>Processing and fulfilling your orders</li>
          <li>Managing your account and providing customer support</li>
          <li>Communicating with you about products, services, and promotions</li>
          <li>Improving our website, products, and services</li>
          <li>Ensuring the security of our website and protecting against fraud</li>
          <li>Complying with legal obligations</li>
        </ul>
        
        <h3>3. Information Sharing</h3>
        <p>
          We may share your information with:
        </p>
        <ul>
          <li>
            <strong>Service Providers:</strong> Third-party vendors who help us operate our business, such as payment processors, shipping companies, and IT service providers.
          </li>
          <li>
            <strong>Business Partners:</strong> Trusted partners who help us provide products and services.
          </li>
          <li>
            <strong>Legal Authorities:</strong> When required by law or to protect our rights and safety.
          </li>
        </ul>
        <p>
          We do not sell your personal information to third parties.
        </p>
        
        <h3>4. Data Security</h3>
        <p>
          We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
        </p>
        
        <h3>5. Your Rights</h3>
        <p>
          Depending on your location, you may have certain rights regarding your personal information, including:
        </p>
        <ul>
          <li>Accessing and reviewing your information</li>
          <li>Correcting inaccurate information</li>
          <li>Deleting your information</li>
          <li>Restricting or objecting to processing</li>
          <li>Data portability</li>
          <li>Withdrawing consent</li>
        </ul>
        <p>
          To exercise these rights, please contact us using the information provided at the end of this policy.
        </p>
        
        <h3>6. Cookies and Tracking Technologies</h3>
        <p>
          We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and personalize content. You can control cookies through your browser settings, but disabling cookies may limit your ability to use certain features of our website.
        </p>
        
        <h3>7. Children's Privacy</h3>
        <p>
          Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
        </p>
        
        <h3>8. Changes to This Privacy Policy</h3>
        <p>
          We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
        </p>
        
        <h3>9. Contact Us</h3>
        <p>
          If you have any questions or concerns about this Privacy Policy, please contact us at:
        </p>
        <address>
          Bahola Labs<br />
          2, Tiger Varadachari Road,<br />
          Kalakshetra Colony, Besant Nagar,<br />
          Chennai - 600090, India<br />
          Email: care@baholalabs.in<br />
          Phone: +91 9791035385
        </address>
        
        <p className="text-sm text-gray-600 mt-8">
          Last Updated: April 12, 2025
        </p>
      </div>
    </PageLayout>
  );
};

export default PrivacyPolicy;
