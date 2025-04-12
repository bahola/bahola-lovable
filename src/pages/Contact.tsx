
import React from 'react';
import { PageLayout } from '@/components/PageLayout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would be connected to a form submission API in a real implementation
    console.log('Contact form submitted');
    // Display success message or redirect
  };

  return (
    <PageLayout title="Contact Us" description="Get in touch with Bahola Labs">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Information */}
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-bold mb-6">Reach Out to Us</h2>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <MapPin className="h-6 w-6 text-bahola-blue-500 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Head Office</h3>
                <p className="text-bahola-neutral-600">
                  2, Tiger Varadachari Road,<br />
                  Kalakshetra Colony, Besant Nagar,<br />
                  Chennai - 600090, India
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Phone className="h-6 w-6 text-bahola-blue-500 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Phone</h3>
                <p className="text-bahola-neutral-600">+91 9791035385</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Mail className="h-6 w-6 text-bahola-blue-500 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Email</h3>
                <p className="text-bahola-neutral-600">Customer Care: care@baholalabs.in</p>
                <p className="text-bahola-neutral-600">Sales Enquiries: sales@baholalabs.in</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Clock className="h-6 w-6 text-bahola-blue-500 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Business Hours</h3>
                <p className="text-bahola-neutral-600">
                  Monday - Friday: 9:00 AM - 6:00 PM<br />
                  Saturday: 9:00 AM - 1:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input id="name" placeholder="Enter your full name" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="Enter your email" required />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" placeholder="Enter your phone number" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="What is your message about?" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <textarea 
                id="message" 
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bahola-blue-400"
                placeholder="How can we help you?"
                required
              ></textarea>
            </div>
            
            <div className="flex items-center">
              <input type="checkbox" id="consent" className="mr-2" required />
              <Label htmlFor="consent" className="text-sm">
                I agree to the processing of my personal data in accordance with the <a href="/privacy" className="text-bahola-blue-500 hover:underline">Privacy Policy</a>
              </Label>
            </div>
            
            <Button type="submit" className="w-full md:w-auto">
              Submit Message
            </Button>
          </form>
        </div>
      </div>
    </PageLayout>
  );
};

export default Contact;
