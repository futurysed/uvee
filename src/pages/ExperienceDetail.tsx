
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, MapPin, Clock, Calendar, Users, User } from "lucide-react";
import { getExperienceById, bookExperience } from '@/services/experienceService';
import { Experience } from '@/types/models';
import { Skeleton } from "@/components/ui/skeleton";

const ExperienceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    const loadExperience = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await getExperienceById(id);
        setExperience(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading experience:', error);
        toast({
          title: "Error loading experience details",
          description: "Please try again later",
          variant: "destructive",
        });
        setLoading(false);
      }
    };
    
    loadExperience();
  }, [id, toast]);

  const handleBooking = async () => {
    if (!experience) return;
    
    setBooking(true);
    try {
      const success = await bookExperience(experience.id, 'user123'); // Placeholder user ID
      
      if (success) {
        toast({
          title: "Booking confirmed!",
          description: `You've successfully booked ${experience.name}`,
        });
        
        // Update the local state to reflect booking
        setExperience(prev => {
          if (!prev) return null;
          return {
            ...prev,
            available_spots: prev.available_spots - 1
          };
        });
      } else {
        toast({
          title: "Booking failed",
          description: "This experience may no longer be available",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error booking experience:', error);
      toast({
        title: "Booking failed",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setBooking(false);
    }
  };

  const formatPrice = () => {
    if (!experience) return '';
    if (experience.is_free) return 'Free';
    if (experience.included_in_stay) return 'Included with stay';
    return `€${experience.price}`;
  };
  
  // Format date
  const formatDate = () => {
    if (!experience || !experience.date) return '';
    const date = new Date(experience.date);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Get tag class
  const getTagClass = (tag: string) => {
    const lowerTag = tag.toLowerCase();
    if (lowerTag.includes('wellness')) return 'tag-wellness';
    if (lowerTag.includes('transport')) return 'tag-transport';
    if (lowerTag.includes('food')) return 'tag-food';
    if (lowerTag.includes('adventure')) return 'tag-adventure';
    return 'bg-gray-100 text-gray-700 ring-gray-500';
  };

  return (
    <div className="container max-w-4xl px-4 py-6">
      <Button
        variant="ghost"
        className="mb-4 pl-0"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={16} className="mr-1" /> Back
      </Button>

      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-60 w-full rounded-md" />
          <Skeleton className="h-8 w-3/4 rounded-md" />
          <Skeleton className="h-4 w-2/3 rounded-md" />
          <Skeleton className="h-32 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      ) : experience ? (
        <div>
          <div className="relative h-60 w-full rounded-lg overflow-hidden mb-4">
            <img
              src={experience.image_url || 'https://placehold.co/600x400?text=Experience'}
              alt={experience.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-grow">
              <h1 className="text-2xl font-bold">{experience.name}</h1>
              <p className="text-gray-600 flex items-center mt-1">
                <MapPin size={16} className="mr-1" />
                {experience.property_name}, {experience.location}
              </p>
              
              <div className="mt-3 flex flex-wrap gap-2">
                {experience.tags.map((tag) => (
                  <span key={tag} className={`tag ${getTagClass(tag)}`}>
                    {tag}
                  </span>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              <h2 className="text-lg font-semibold mb-2">About this {experience.category === 'event' ? 'experience' : 'service'}</h2>
              <p className="text-gray-700">{experience.description}</p>
              
              <div className="mt-6 space-y-3">
                {(experience.date || experience.time) && (
                  <div className="flex items-center text-gray-700">
                    <Calendar size={18} className="mr-2" />
                    <div>
                      <p className="font-medium">Date & Time</p>
                      <p>{formatDate()}{experience.time ? ` at ${experience.time}` : ''}</p>
                    </div>
                  </div>
                )}
                
                {experience.duration && (
                  <div className="flex items-center text-gray-700">
                    <Clock size={18} className="mr-2" />
                    <div>
                      <p className="font-medium">Duration</p>
                      <p>{experience.duration}</p>
                    </div>
                  </div>
                )}
                
                {experience.host_contact && (
                  <div className="flex items-center text-gray-700">
                    <User size={18} className="mr-2" />
                    <div>
                      <p className="font-medium">Host contact</p>
                      <p>{experience.host_contact}</p>
                    </div>
                  </div>
                )}
                
                {experience.available_spots > 0 && (
                  <div className="flex items-center text-gray-700">
                    <Users size={18} className="mr-2" />
                    <div>
                      <p className="font-medium">Availability</p>
                      <p>
                        {experience.available_spots} of {experience.total_spots} spots available
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="w-full md:w-1/3">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-bold text-2xl mb-2 text-nigel-purple">
                    {formatPrice()}
                  </h3>
                  
                  {experience.available_spots > 0 ? (
                    <Button 
                      className="w-full bg-nigel-purple hover:bg-nigel-purple-dark mt-4"
                      onClick={handleBooking}
                      disabled={booking}
                    >
                      {booking ? 'Processing...' : experience.category === 'event' ? 'Book Now' : 'Reserve'}
                    </Button>
                  ) : (
                    <Button 
                      className="w-full mt-4" 
                      variant="outline" 
                      disabled
                    >
                      Fully Booked
                    </Button>
                  )}
                  
                  <p className="text-xs text-center text-gray-500 mt-2">
                    {experience.category === 'event' 
                      ? 'Bookings can be canceled up to 24 hours before' 
                      : 'Reservations subject to availability'
                    }
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500">Experience not found</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => navigate('/explore')}
          >
            Browse all experiences
          </Button>
        </div>
      )}
    </div>
  );
};

export default ExperienceDetail;
