
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Cloud, Sun, Thermometer } from "lucide-react";
import { Link } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { Experience } from '@/types/models';
import { filterExperiences } from '@/services/experienceService';
import ExperienceCard from '@/components/ExperienceCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const { toast } = useToast();
  const [todayExperiences, setTodayExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState({
    temp: 28,
    condition: 'Sunny',
    humidity: 65,
  });

  useEffect(() => {
    const loadTodayExperiences = async () => {
      try {
        setLoading(true);
        // In a real app, you would filter by today's date
        const today = new Date().toISOString().split('T')[0];
        const data = await filterExperiences({ date: today, category: 'event' });
        setTodayExperiences(data.slice(0, 6)); // Limit to 6 experiences
        setLoading(false);
      } catch (error) {
        console.error('Error loading experiences:', error);
        toast({
          title: "Error loading experiences",
          description: "Please try again later",
          variant: "destructive",
        });
        setLoading(false);
      }
    };
    
    loadTodayExperiences();
  }, [toast]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-nigel-purple-light to-white">
      <div className="container max-w-4xl px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-3 text-nigel-purple-dark">Nigel</h1>
          <p className="text-xl text-gray-700">Your Global Coliving Companion</p>
        </div>
        
        {/* Weather Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-2">Today's Weather</h2>
              <p className="text-gray-600 mb-1">Selina Jaco, Costa Rica</p>
              <div className="flex items-center text-gray-800 mt-2">
                <Thermometer size={18} className="mr-1" />
                <span>{weather.temp}°C</span>
                <span className="mx-2">•</span>
                <span>Humidity: {weather.humidity}%</span>
              </div>
            </div>
            <div className="flex items-center">
              {weather.condition === 'Sunny' ? (
                <Sun size={48} className="text-amber-500" />
              ) : (
                <Cloud size={48} className="text-blue-400" />
              )}
              <span className="ml-2 text-lg font-medium">{weather.condition}</span>
            </div>
          </div>
        </div>
        
        {/* Today's Experiences Slider */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Today's Experiences</h2>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="w-full">
                  <Skeleton className="h-48 w-full rounded-lg" />
                  <Skeleton className="h-4 w-3/4 mt-2 rounded-md" />
                  <Skeleton className="h-4 w-1/2 mt-2 rounded-md" />
                </div>
              ))}
            </div>
          ) : todayExperiences.length > 0 ? (
            <Carousel className="w-full">
              <CarouselContent>
                {todayExperiences.map((experience) => (
                  <CarouselItem key={experience.id} className="sm:basis-1/2 md:basis-1/3">
                    <div className="p-1">
                      <ExperienceCard experience={experience} design="new" />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-end gap-2 mt-4">
                <CarouselPrevious className="static transform-none" />
                <CarouselNext className="static transform-none" />
              </div>
              <Link to="/explore" className="block text-center mt-4">
                <Button variant="outline" className="border-nigel-purple text-nigel-purple hover:bg-nigel-purple-light">
                  View All Experiences
                  <ArrowRight size={16} className="ml-1" />
                </Button>
              </Link>
            </Carousel>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No experiences available today.</p>
              <Link to="/explore" className="mt-4 inline-block">
                <Button variant="outline" className="border-nigel-purple text-nigel-purple hover:bg-nigel-purple-light">
                  Browse All Experiences
                </Button>
              </Link>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-semibold mb-2">Quick Links</h3>
            <p className="text-gray-600 text-sm mb-4">
              Discover amazing experiences and services
            </p>
            <div className="grid grid-cols-2 gap-3">
              <Link to="/explore" className="w-full">
                <Button className="w-full bg-nigel-purple hover:bg-nigel-purple-dark">
                  Experiences
                  <ArrowRight size={16} className="ml-1" />
                </Button>
              </Link>
              <Link to="/services" className="w-full">
                <Button className="w-full bg-nigel-purple hover:bg-nigel-purple-dark">
                  Services
                  <ArrowRight size={16} className="ml-1" />
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-semibold mb-2">Today's Highlights</h3>
            <p className="text-gray-600 text-sm mb-4">
              Don't miss out on today's special events at Homebase
            </p>
            <Link to="/explore">
              <Button variant="outline" className="w-full border-nigel-purple text-nigel-purple hover:bg-nigel-purple-light">
                See Today's Events
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
