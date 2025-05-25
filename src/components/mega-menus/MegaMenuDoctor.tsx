
import React from 'react';
import { BadgePlus, Pill, Stethoscope } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MegaMenuProps {
  isOpen: boolean;
}

// For Doctors Mega Menu
export const MegaMenuDoctor: React.FC<MegaMenuProps> = ({ isOpen }) => {
  return (
    <div className={`mega-menu mega-menu-full ${isOpen ? 'mega-menu-open' : ''}`}>
      <div className="p-6 bg-gradient-to-br from-blue-50 to-white shadow-lg border-t-4 border-blue-500">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-bahola-neutral-800">Professional Account</h3>
              <div className="bg-bahola-blue-50 p-6 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold mb-3 text-bahola-blue-800">Sign up for a Professional account</h4>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <span className="h-5 w-5 rounded-full bg-bahola-blue-500 text-white flex items-center justify-center text-xs mr-2 mt-0.5">✓</span>
                    <span>Exclusive professional discounts</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-5 w-5 rounded-full bg-bahola-blue-500 text-white flex items-center justify-center text-xs mr-2 mt-0.5">✓</span>
                    <span>Special pricing for certificate courses</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-5 w-5 rounded-full bg-bahola-blue-500 text-white flex items-center justify-center text-xs mr-2 mt-0.5">✓</span>
                    <span>Priority access to mentorship programs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-5 w-5 rounded-full bg-bahola-blue-500 text-white flex items-center justify-center text-xs mr-2 mt-0.5">✓</span>
                    <span>Exclusive webinars and conference discounts</span>
                  </li>
                </ul>
                <Link to="/register?type=doctor" className="btn-bahola w-full block text-center">Sign Up Now</Link>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4 text-bahola-neutral-800">Professional Resources</h3>
              <div className="space-y-4">
                <Link to="/professional/materia-medica" className="block p-4 border border-bahola-neutral-200 rounded-lg hover:border-bahola-blue-300 hover:bg-bahola-blue-50 transition-colors bg-white/70 shadow-sm">
                  <div className="flex items-center">
                    <div className="mr-4 text-bahola-blue-500">
                      <Stethoscope size={28} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-bahola-neutral-800">Comparative Materia Medica</h4>
                      <p className="text-sm text-bahola-neutral-600">Access detailed comparative studies of homeopathic remedies</p>
                    </div>
                  </div>
                </Link>
                
                <Link to="/professional/remedy-deep-dive" className="block p-4 border border-bahola-neutral-200 rounded-lg hover:border-bahola-blue-300 hover:bg-bahola-blue-50 transition-colors bg-white/70 shadow-sm">
                  <div className="flex items-center">
                    <div className="mr-4 text-bahola-blue-500">
                      <Pill size={28} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-bahola-neutral-800">Deep Dive into a Remedy</h4>
                      <p className="text-sm text-bahola-neutral-600">Explore in-depth analysis of specific remedies</p>
                    </div>
                  </div>
                </Link>
                
                <Link to="/professional/case-studies" className="block p-4 border border-bahola-neutral-200 rounded-lg hover:border-bahola-blue-300 hover:bg-bahola-blue-50 transition-colors bg-white/70 shadow-sm">
                  <div className="flex items-center">
                    <div className="mr-4 text-bahola-blue-500">
                      <BadgePlus size={28} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-bahola-neutral-800">Case Studies</h4>
                      <p className="text-sm text-bahola-neutral-600">Review real-world clinical cases and treatment approaches</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenuDoctor;
