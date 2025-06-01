
import React from 'react';
import { PageLayout } from '@/components/PageLayout';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Contact: React.FC = () => {
  return (
    <PageLayout title="Contact Us" description="Get in touch with Bahola Labs for support and consultation">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h1 className="text-3xl font-bold mb-6 text-bahola-navy-950">Contact Information</h1>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="text-bahola-blue-600 mr-4 mt-1" size={20} />
                <div>
                  <h3 className="font-semibold mb-1">Address</h3>
                  <p className="text-bahola-neutral-700">
                    2, Tiger Varachari Road, Kalakshetra Colony<br />
                    Besant Nagar, Chennai – 600090
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="text-bahola-blue-600 mr-4 mt-1" size={20} />
                <div>
                  <h3 className="font-semibold mb-1">Phone</h3>
                  <p className="text-bahola-neutral-700">+91 9791035385</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="text-bahola-blue-600 mr-4 mt-1" size={20} />
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-bahola-neutral-700">care@baholalabs.in</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="text-bahola-blue-600 mr-4 mt-1" size={20} />
                <div>
                  <h3 className="font-semibold mb-1">Business Hours</h3>
                  <p className="text-bahola-neutral-700">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 9:00 AM - 1:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-6 text-bahola-navy-950">Send us a Message</h2>
            
            <div className="bg-bahola-blue-50 p-6 rounded-lg">
              <p className="text-bahola-blue-700 mb-4">
                Contact form will be available soon. For now, please reach out to us directly using the contact information provided.
              </p>
              <Button asChild>
                <a href="mailto:care@baholalabs.in">Send Email</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Contact;
