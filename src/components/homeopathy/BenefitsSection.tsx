
import React from 'react';

export const HomeopathyBenefitsSection = () => {
  return (
    <>
      <h2 className="text-3xl font-bold text-center mb-12">Why Choose Homeopathy?</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-bahola-blue-50 p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-3 text-bahola-blue-600">Gentle yet Powerful</h3>
          <p>Remedies that work with your body to restore balance.</p>
        </div>
        
        <div className="bg-bahola-blue-50 p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-3 text-bahola-blue-600">Personalized Care</h3>
          <p>No cookie-cutter treatments, only tailored solutions for you.</p>
        </div>
        
        <div className="bg-bahola-blue-50 p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-3 text-bahola-blue-600">Safe for All</h3>
          <p>From newborns to seniors, homeopathy supports every stage of life.</p>
        </div>
        
        <div className="bg-bahola-blue-50 p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-3 text-bahola-blue-600">Holistic Wellness</h3>
          <p>It addresses your mind, body, and emotions as a whole.</p>
        </div>
        
        <div className="md:col-span-2 bg-bahola-blue-50 p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-3 text-bahola-blue-600">Empowering</h3>
          <p>Feel in control of your health, naturally.</p>
        </div>
      </div>
    </>
  );
};
