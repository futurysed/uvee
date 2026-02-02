
import React from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
  fullWidth?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, fullWidth = false }) => {
  return (
    <div className="min-h-screen bg-background pb-16">
      <header className="border-b border-gray-200 py-4 px-4 flex justify-center">
        <img 
          src="/lovable-uploads/8e4b7965-e522-44d0-94e4-d5a0c125529b.png" 
          alt="Guide Nigel" 
          className="h-10"
        />
      </header>
      <main className={`mx-auto ${fullWidth ? 'max-w-lg' : 'max-w-md'} bg-white min-h-screen`}>
        {children}
      </main>
      <Navbar />
    </div>
  );
};

export default Layout;
