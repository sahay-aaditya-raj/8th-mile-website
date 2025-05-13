import React, { ReactNode } from 'react';

interface PageWrapperProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  backgroundImage?: string;
}

export function PageWrapper({ 
  children, 
  title, 
  subtitle,
  backgroundImage = "/homepageimages/12.png" 
}: PageWrapperProps) {
  return (
    <div 
      className="relative min-h-screen bg-cover bg-center p-6" 
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"></div>
      
      <div className="relative z-10 flex flex-col items-center space-y-6 pt-20">
        <div className="max-w-4xl w-full text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-400 mb-4">{title}</h1>
          <p className="text-lg md:text-xl text-white mb-8">
            {subtitle}
          </p>
          
          {children}
        </div>
      </div>
    </div>
  );
}