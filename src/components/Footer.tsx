
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="bg-bahola-neutral-100 text-bahola-neutral-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-bahola-navy-950">Bahola Labs</h3>
            <address className="not-italic">
              <p className="flex items-start mb-2">
                <MapPin size={18} className="mr-2 mt-1 flex-shrink-0 text-bahola-blue-600" />
                <span className="text-bahola-neutral-700">2, Tiger Varachari Road, Kalakshetra Colony, Besant Nagar, Chennai – 600090</span>
              </p>
              <p className="flex items-center mb-2">
                <Phone size={18} className="mr-2 text-bahola-blue-600" />
                <a href="tel:+919791035385" className="hover:text-bahola-blue-600 text-bahola-neutral-700">+91 9791035385</a>
              </p>
              <p className="flex items-center">
                <Mail size={18} className="mr-2 text-bahola-blue-600" />
                <a href="mailto:care@baholalabs.in" className="hover:text-bahola-blue-600 text-bahola-neutral-700">care@baholalabs.in</a>
              </p>
            </address>
            
            <div className="flex space-x-4 mt-6">
              <a href="#" className="h-10 w-10 rounded-full bg-bahola-blue-100 flex items-center justify-center hover:bg-bahola-blue-500 hover:text-white transition-colors">
                <Facebook size={18} className="text-bahola-blue-600" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-bahola-blue-100 flex items-center justify-center hover:bg-bahola-blue-500 hover:text-white transition-colors">
                <Twitter size={18} className="text-bahola-blue-600" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-bahola-blue-100 flex items-center justify-center hover:bg-bahola-blue-500 hover:text-white transition-colors">
                <Instagram size={18} className="text-bahola-blue-600" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-bahola-blue-100 flex items-center justify-center hover:bg-bahola-blue-500 hover:text-white transition-colors">
                <Youtube size={18} className="text-bahola-blue-600" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-bahola-navy-950">Shop By Concern</h3>
            <ul className="space-y-2">
              <li><Link to="/search?concern=Allergies" className="hover:text-bahola-blue-600 text-bahola-neutral-700">Allergies</Link></li>
              <li><Link to="/search?concern=Digestive%20Health" className="hover:text-bahola-blue-600 text-bahola-neutral-700">Digestive Health</Link></li>
              <li><Link to="/search?concern=Respiratory%20Care" className="hover:text-bahola-blue-600 text-bahola-neutral-700">Respiratory Care</Link></li>
              <li><Link to="/search?concern=Skin%20Care" className="hover:text-bahola-blue-600 text-bahola-neutral-700">Skin Care</Link></li>
              <li><Link to="/search?concern=Sleep%20%26%20Stress" className="hover:text-bahola-blue-600 text-bahola-neutral-700">Sleep & Stress</Link></li>
              <li><Link to="/search?concern=Immunity%20Support" className="hover:text-bahola-blue-600 text-bahola-neutral-700">Immunity Support</Link></li>
              <li><Link to="/categories" className="hover:text-bahola-blue-600 text-bahola-neutral-700">View All Concerns</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-bahola-navy-950">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-bahola-blue-600 text-bahola-neutral-700">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-bahola-blue-600 text-bahola-neutral-700">Consult a Homeopath</Link></li>
              <li><Link to="/i-love-homeopathy" className="hover:text-bahola-blue-600 text-bahola-neutral-700">I ❤️ HOMEOPATHY</Link></li>
              <li><Link to="/reviews" className="hover:text-bahola-blue-600 text-bahola-neutral-700">Customer Reviews</Link></li>
              <li><Link to="/faq" className="hover:text-bahola-blue-600 text-bahola-neutral-700">FAQs</Link></li>
              <li><Link to="/help-center" className="hover:text-bahola-blue-600 text-bahola-neutral-700">Help Center</Link></li>
              <li><Link to="/shipping" className="hover:text-bahola-blue-600 text-bahola-neutral-700">Shipping Policy</Link></li>
              <li><Link to="/return-policy" className="hover:text-bahola-blue-600 text-bahola-neutral-700">Refund Policy</Link></li>
              <li><Link to="/terms" className="hover:text-bahola-blue-600 text-bahola-neutral-700">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="hover:text-bahola-blue-600 text-bahola-neutral-700">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-bahola-navy-950">Newsletter</h3>
            <p className="mb-4 text-bahola-neutral-700">Subscribe to receive updates on new products and special promotions.</p>
            <div className="flex mb-4">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-2 rounded-l-lg bg-white border border-bahola-neutral-300 text-bahola-neutral-800 focus:outline-none focus:ring-1 focus:ring-bahola-blue-400 w-full"
              />
              <Button className="bg-bahola-blue-500 hover:bg-bahola-blue-600 rounded-r-lg rounded-l-none">
                Subscribe
              </Button>
            </div>
            <p className="text-sm text-bahola-neutral-600">By subscribing, you agree to our <Link to="/privacy" className="underline hover:text-bahola-blue-600">Privacy Policy</Link> and consent to receive updates from Bahola Labs.</p>
            
            <div className="mt-6">
              <h3 className="text-lg font-bold mb-2 text-bahola-navy-950">Find Us</h3>
              <Link to="/stores" className="flex items-center text-bahola-blue-600 hover:underline">
                <MapPin size={16} className="mr-1" /> Store Locations
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-bahola-neutral-300 mt-12 pt-6 text-bahola-neutral-600 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© 2025 Bahola Labs. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="hover:text-bahola-blue-600">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-bahola-blue-600">Terms of Service</Link>
              <Link to="/contact" className="hover:text-bahola-blue-600">Contact Us</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
