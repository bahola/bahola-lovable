
import React from 'react';

export const TransformationImage = () => {
  return (
    <div className="relative rounded-lg overflow-hidden h-80 mb-16 shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-500/70 to-bahola-blue-500/60 z-10 flex items-center justify-center">
        <h3 className="text-3xl font-bold text-white text-center px-4">Transform Your Health Journey</h3>
      </div>
      <img 
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
        alt="Health transformation" 
        className="w-full h-full object-cover"
      />
    </div>
  );
};
