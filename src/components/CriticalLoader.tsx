
import React from 'react';

export const CriticalLoader = () => (
  <div className="min-h-screen bg-white">
    {/* Header skeleton */}
    <div className="bg-bahola-blue-50 py-2">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="h-4 w-32 skeleton-loader rounded"></div>
          <div className="hidden md:block h-4 w-40 skeleton-loader rounded"></div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="h-4 w-16 skeleton-loader rounded"></div>
          <div className="h-4 w-20 skeleton-loader rounded"></div>
        </div>
      </div>
    </div>
    
    {/* Main header skeleton */}
    <div className="bg-white border-b border-gray-200 py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="h-8 w-32 skeleton-loader rounded"></div>
        <div className="h-10 w-64 skeleton-loader rounded"></div>
        <div className="flex items-center space-x-4">
          <div className="h-8 w-8 skeleton-loader rounded"></div>
          <div className="h-8 w-8 skeleton-loader rounded"></div>
        </div>
      </div>
    </div>
    
    {/* Hero section skeleton */}
    <div className="h-96 skeleton-loader"></div>
    
    {/* Content skeleton */}
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <div className="h-8 w-64 skeleton-loader rounded mx-auto"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 skeleton-loader rounded"></div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
