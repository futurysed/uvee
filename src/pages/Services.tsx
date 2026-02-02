
import React, { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Experience } from '@/types/models';
import { Skeleton } from "@/components/ui/skeleton";
import { filterExperiences } from '@/services/experienceService';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  const { toast } = useToast();
  const [services, setServices] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Load services on component mount
  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true);
        
        // Filter experiences by 'service' category
        const data = await filterExperiences({ category: 'service' });
        setServices(data);
        
        setLoading(false);
      } catch (error) {
        console.error('Error loading services:', error);
        toast({
          title: "Error loading services",
          description: "Please try again later",
          variant: "destructive",
        });
        setLoading(false);
      }
    };
    
    loadServices();
  }, [toast]);

  return (
    <div className="w-full mx-auto bg-white">
      {/* Navigation Tabs */}
      <div className="flex px-3 pt-4 pb-4 gap-2">
        <Link 
          to="/explore" 
          className="flex-1"
        >
          <div className="py-3 w-full font-medium text-white bg-[#e4a53f] rounded-md text-center">
            Experiences
          </div>
        </Link>
        <Link 
          to="/services" 
          className="flex-1"
        >
          <div className="py-3 w-full font-medium text-white bg-[#2a544a] rounded-md text-center">
            Services
          </div>
        </Link>
      </div>
      
      {/* Vertical List of Services */}
      <div className="px-4 pt-4 pb-24">
        {loading ? (
          // Loading skeletons for vertical list
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="border rounded-lg overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <div className="p-3">
                  <Skeleton className="h-6 w-1/2 mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-10 w-full rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : services.length > 0 ? (
          // Vertical list of services
          <div className="space-y-4">
            {services.map((service) => (
              <div key={service.id} className="border rounded-lg overflow-hidden">
                <img 
                  src={service.image_url || 'public/lovable-uploads/214e27c0-8b12-4c1c-8cca-a32ea0010a44.png'} 
                  alt={service.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-lg">{service.name}</h3>
                    <span className="bg-black text-white px-2 py-1 rounded text-sm font-bold">
                      ${service.price}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">
                    {service.description || `Explore Canggu on two wheels`}
                  </p>
                  
                  <div className="mb-3">
                    <h4 className="text-xs font-bold uppercase text-gray-500 mb-1">INCLUDES</h4>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-center">
                        <span className="mr-2">•</span> Helmet
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2">•</span> Insurance
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2">•</span> Free delivery
                      </li>
                    </ul>
                  </div>
                  
                  <Button className="w-full bg-green-700 hover:bg-green-800 text-white">
                    Book Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">No services available at this time.</p>
            <button 
              onClick={() => window.location.href = '/explore'}
              className="mt-2 text-nigel-purple hover:underline"
            >
              Explore experiences instead
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
