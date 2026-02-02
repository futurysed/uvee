
import React, { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import ExperienceCard from '@/components/ExperienceCard';
import TagPill from '@/components/TagPill';
import { Category, Experience, FilterOptions, Tag } from '@/types/models';
import { filterExperiences, getAllTags } from '@/services/experienceService';
import { Skeleton } from "@/components/ui/skeleton";
import { RefreshCw } from "lucide-react";
import { Link } from 'react-router-dom';

const Explore: React.FC = () => {
  const {
    toast
  } = useToast();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    category: 'event',
    tags: []
  });
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [selectedDateFilter, setSelectedDateFilter] = useState<string>("today");
  const [totalExperiences, setTotalExperiences] = useState<number>(0);

  // Load experiences based on filter options
  useEffect(() => {
    const loadExperiences = async () => {
      try {
        setLoading(true);

        // Fetch filtered experiences
        const data = await filterExperiences({
          ...filterOptions,
          category: 'event'
        });
        setExperiences(data);
        setTotalExperiences(data.length);
        setLoading(false);
      } catch (error) {
        console.error('Error loading experiences:', error);
        toast({
          title: "Error loading experiences",
          description: "Please try again later",
          variant: "destructive"
        });
        setLoading(false);
      }
    };
    loadExperiences();
  }, [filterOptions, toast]);

  // Load available tags
  useEffect(() => {
    const loadTags = async () => {
      try {
        const tags = await getAllTags();

        // Transform string tags to Tag objects
        const tagObjects: Tag[] = [{
          name: 'ALL',
          iconName: 'circle',
          color: '#000000',
          backgroundColor: '#FFFFFF'
        }, {
          name: 'WELLNESS',
          iconName: 'infinity',
          color: '#9b87f5',
          backgroundColor: '#E5DEFF'
        }, {
          name: 'YOGA',
          iconName: 'flower',
          color: '#9b87f5',
          backgroundColor: '#E5DEFF'
        }, {
          name: 'EVENTS',
          iconName: 'partyPopper',
          color: '#FF4136',
          backgroundColor: '#FFDFDF'
        }, {
          name: 'MUSIC',
          iconName: 'music',
          color: '#FF4136',
          backgroundColor: '#FFDFDF'
        }, {
          name: 'TOURS',
          iconName: 'mapPin',
          color: '#FF851B',
          backgroundColor: '#FFE9D1'
        }, {
          name: 'SURF',
          iconName: 'waves',
          color: '#0074D9',
          backgroundColor: '#D1E8FF'
        }, {
          name: 'IMPACT',
          iconName: 'leaf',
          color: '#2ECC40',
          backgroundColor: '#D1FFD7'
        }];
        setAvailableTags(tagObjects);
      } catch (error) {
        console.error('Error loading tags:', error);
      }
    };
    loadTags();
  }, []);

  // Handle tag selection
  const handleTagSelect = (tagName: string) => {
    // If ALL is selected, clear all other tag filters
    if (tagName === 'ALL') {
      setFilterOptions(prev => ({
        ...prev,
        tags: []
      }));
      return;
    }

    // Toggle tag selection
    setFilterOptions(prev => {
      const currentTags = prev.tags || [];
      const tagExists = currentTags.includes(tagName);
      if (tagExists) {
        return {
          ...prev,
          tags: currentTags.filter(t => t !== tagName)
        };
      } else {
        return {
          ...prev,
          tags: [...currentTags, tagName]
        };
      }
    });
  };
  
  const handleDateFilterSelect = (filter: string) => {
    setSelectedDateFilter(filter);

    // Apply appropriate date filter
    if (filter === 'today') {
      const today = new Date().toISOString().split('T')[0];
      setFilterOptions(prev => ({
        ...prev,
        date: today
      }));
    } else if (filter === 'tomorrow') {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setFilterOptions(prev => ({
        ...prev,
        date: tomorrow.toISOString().split('T')[0]
      }));
    } else if (filter === 'weekend') {
      setFilterOptions(prev => ({
        ...prev,
        date: undefined,
        isWeekend: true
      }));
    } else {
      setFilterOptions(prev => ({
        ...prev,
        date: undefined,
        isWeekend: false
      }));
    }
  };
  
  const resetFilters = () => {
    setFilterOptions({
      category: 'event',
      tags: []
    });
    setSelectedDateFilter('today');
  };
  
  return <div className="w-full mx-auto bg-white">
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
      
      {/* Date filters */}
      <div className="px-4 overflow-x-auto flex space-x-4 py-4">
        {['today', 'tomorrow', 'weekend', 'chose dates'].map(filter => (
          <button 
            key={filter} 
            className={`px-4 py-1.5 rounded-md ${
              selectedDateFilter === filter 
                ? filter === 'today'
                  ? 'bg-[#ff5137] text-white font-medium' 
                  : 'border border-gray-300 font-medium'
                : 'border border-gray-300 text-gray-500'
            }`}
            onClick={() => handleDateFilterSelect(filter)}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>
      
      {/* Category filters */}
      <div className="grid grid-cols-4 gap-2 px-4 py-4">
        {availableTags.map(tag => <TagPill key={tag.name} tag={tag} isSelected={tag.name === 'ALL' ? filterOptions.tags?.length === 0 : filterOptions.tags?.includes(tag.name)} onSelect={() => handleTagSelect(tag.name)} />)}
      </div>
      
      {/* Filter results */}
      <div className="px-4 pb-4 flex justify-between items-center">
        <span className="text-sm font-medium text-center">
          {totalExperiences} Experiences
        </span>
        <button onClick={resetFilters} className="flex items-center text-sm text-gray-600">
          <RefreshCw size={16} className="mr-1" />
          Reset Dates
        </button>
      </div>
      
      {/* Experience cards in 2 rows grid */}
      <div className="px-4 pb-24">
        {loading ?
      // Loading skeletons for grid
      <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(n => <div key={n} className="space-y-2">
                <Skeleton className="h-36 w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4 rounded-md" />
                <Skeleton className="h-4 w-1/2 rounded-md" />
              </div>)}
          </div> : experiences.length > 0 ? <div className="grid grid-cols-2 gap-4">
            {experiences.map(experience => <div key={experience.id} className="h-full">
                <ExperienceCard experience={experience} design="new" />
              </div>)}
          </div> : <div className="text-center py-10">
            <p className="text-gray-500">No experiences found with the current filters.</p>
            <button onClick={resetFilters} className="mt-2 text-nigel-purple hover:underline">
              Clear all filters
            </button>
          </div>}
      </div>
    </div>;
};

export default Explore;
