
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Bookings: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container max-w-md px-4 py-6">
      <div className="flex items-center mb-4">
        <button onClick={() => navigate('/')} className="mr-2">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold tracking-wider uppercase">My Bookings</h1>
      </div>
      
      <div className="text-center py-10">
        <p className="text-gray-500">You don't have any bookings yet</p>
        <p className="mt-2">
          <a href="/explore" className="text-nigel-purple hover:underline">
            Explore activities and services
          </a>
        </p>
      </div>
    </div>
  );
};

export default Bookings;
