
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, User } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'text-nigel-purple' : 'text-gray-600 hover:text-nigel-purple';
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
      <div className="container max-w-4xl mx-auto">
        <div className="flex justify-around items-center h-16">
          <Link to="/explore" className={`flex flex-col items-center px-2 py-1 ${isActive('/explore')}`}>
            <Compass size={20} />
            <span className="text-xs mt-1">Explore</span>
          </Link>
          <Link to="/profile" className={`flex flex-col items-center px-2 py-1 ${isActive('/profile')}`}>
            <User size={20} />
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
