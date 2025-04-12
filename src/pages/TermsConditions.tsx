
import React from 'react';
import { PageLayout } from '@/components/PageLayout';

const TermsConditions = () => {
  return (
    <PageLayout title="Terms & Conditions" description="Legal terms for using our website and purchasing products">
      <div className="prose prose-lg max-w-none">
        <h2>Terms & Conditions</h2>
        <p className="lead">
          These Terms & Conditions govern your use of the Bahola Labs website and services. By accessing our website or placing an order, you agree to be bound by these terms.
        </p>
        
        <h3>1. Acceptance of Terms</h3>
        <p>
          By accessing or using www.baholalabs.in ("the Website"), you agree to comply with and be bound by these Terms & Conditions. If you do not agree to these terms, please do not use our Website.
        </p>
        
        <h3>2. Products & Services</h3>
        <p>
          Bahola Labs offers homeopathic remedies, products, and related services. While we strive to provide accurate product information, we do not warrant that product descriptions, images, pricing, or other content is accurate, complete, or current.
        </p>
        
        <h3>3. Medical Disclaimer</h3>
        <p>
          The information provided on our Website is for educational purposes only and is not intended to replace professional medical advice. Always consult a qualified healthcare provider before starting any new health regimen or treatment.
        </p>
        
        <h3>4. User Accounts</h3>
        <p>
          You may need to create an account to access certain features of our Website. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
        </p>
        
        <h3>5. Ordering & Payment</h3>
        <p>
          By placing an order, you agree to provide accurate and complete information. We reserve the right to refuse or cancel any order for any reason, including but not limited to product availability, errors in pricing or product information, or suspected fraud.
        </p>
        
        <h3>6. Privacy Policy</h3>
        <p>
          Your use of our Website is also governed by our Privacy Policy, which can be found <a href="/privacy">here</a>.
        </p>
        
        <h3>7. Intellectual Property</h3>
        <p>
          All content on the Website, including but not limited to text, graphics, logos, images, and software, is the property of Bahola Labs and is protected by copyright, trademark, and other intellectual property laws.
        </p>
        
        <h3>8. Limitation of Liability</h3>
        <p>
          To the fullest extent permitted by law, Bahola Labs shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of the Website or our products.
        </p>
        
        <h3>9. Indemnification</h3>
        <p>
          You agree to indemnify, defend, and hold harmless Bahola Labs, its officers, directors, employees, agents, and suppliers from and against any claims, liabilities, damages, losses, and expenses arising out of or in any way connected with your use of our Website or products.
        </p>
        
        <h3>10. Amendments</h3>
        <p>
          We reserve the right to update or modify these Terms & Conditions at any time without prior notice. Your continued use of the Website following any changes constitutes your acceptance of the revised terms.
        </p>
        
        <h3>11. Governing Law</h3>
        <p>
          These Terms & Conditions shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
        </p>
        
        <h3>12. Contact Information</h3>
        <p>
          For questions about these Terms & Conditions, please contact us at:
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

export default TermsConditions;
