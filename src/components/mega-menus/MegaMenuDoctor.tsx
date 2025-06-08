import React from 'react';
import { BadgePlus, Pill, Stethoscope, GraduationCap, Users, BookOpen, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

// For Doctors Mega Menu - Mayo Clinic inspired design
export const MegaMenuDoctor: React.FC<MegaMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const professionalSections = [
    {
      title: "Professional Account",
      items: [
        {
          icon: <GraduationCap size={20} />,
          title: "Sign Up for Professional Account",
          description: "Get exclusive discounts and priority access",
          link: "/register?type=doctor",
          isButton: true
        }
      ]
    },
    {
      title: "Educational Resources",
      items: [
        {
          icon: <Stethoscope size={20} />,
          title: "Comparative Materia Medica",
          description: "Detailed comparative studies of remedies",
          link: "/professional/materia-medica"
        },
        {
          icon: <Pill size={20} />,
          title: "Deep Dive into Remedies",
          description: "In-depth analysis of specific remedies",
          link: "/professional/remedy-deep-dive"
        },
        {
          icon: <BookOpen size={20} />,
          title: "Case Studies",
          description: "Real-world clinical cases and approaches",
          link: "/professional/case-studies"
        }
      ]
    },
    {
      title: "Professional Benefits",
      items: [
        {
          icon: <BadgePlus size={20} />,
          title: "Professional Discounts",
          description: "Exclusive pricing on all products",
          benefit: true
        },
        {
          icon: <Users size={20} />,
          title: "Mentorship Programs",
          description: "Priority access to expert guidance",
          benefit: true
        },
        {
          icon: <GraduationCap size={20} />,
          title: "Certificate Courses",
          description: "Special pricing on educational content",
          benefit: true
        }
      ]
    }
  ];

  return (
    <div className="mega-menu mega-menu-full mega-menu-open">
      <div className="mega-menu-content">
        {/* Header with close button */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-4 rounded-t-lg flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Professional Resources</h2>
            <p className="text-purple-100 text-sm mt-1">Tools and resources for healthcare professionals</p>
          </div>
          <button 
            onClick={onClose}
            className="text-white hover:text-purple-200 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-8">
          <div className="grid grid-cols-3 gap-8 max-w-6xl mx-auto">
            {professionalSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                  {section.title}
                </h3>
                <div className="space-y-4">
                  {section.items.map((item) => (
                    <div key={item.title}>
                      {item.isButton ? (
                        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                          <div className="flex items-start mb-3">
                            <div className="text-purple-600 mr-3 mt-1">
                              {item.icon}
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-800 mb-2">{item.title}</h4>
                              <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                            </div>
                          </div>
                          <Link 
                            to={item.link!} 
                            onClick={onClose}
                            className="inline-flex items-center px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors duration-200 text-sm"
                          >
                            Sign Up Now
                          </Link>
                        </div>
                      ) : item.benefit ? (
                        <div className="flex items-start p-3 bg-gray-50 rounded-lg">
                          <div className="text-purple-600 mr-3 mt-1">
                            {item.icon}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800">{item.title}</h4>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                        </div>
                      ) : (
                        <Link 
                          to={item.link!} 
                          onClick={onClose}
                          className="flex items-start p-3 hover:bg-purple-50 rounded-lg transition-colors duration-200 group"
                        >
                          <div className="text-purple-600 group-hover:text-purple-700 mr-3 mt-1">
                            {item.icon}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800 group-hover:text-purple-700 transition-colors duration-200">
                              {item.title}
                            </h4>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenuDoctor;
