
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Users } from "lucide-react";
import { Experience } from '@/types/models';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ExperienceCardProps {
  experience: Experience;
  design?: 'default' | 'new';
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, design = 'default' }) => {
  const formatPrice = () => {
    if (experience.is_free) return 'FREE';
    if (experience.included_in_stay) return 'Included with stay';
    return `$${experience.price}`;
  };

  // Format date and time 
  const formatDate = () => {
    if (!experience.date) return '';
    const date = new Date(experience.date);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).toUpperCase();
  };
  
  const formatTime = () => {
    if (!experience.time) return '';
    // Simple format for demo - in real app we'd use a proper time formatter
    return experience.time.replace(/:/g, '').slice(0, 2) + ' AM';
  };

  // Get appropriate tag class
  const getTagClass = (tag: string) => {
    const lowerTag = tag.toLowerCase();
    if (lowerTag.includes('wellness')) return 'tag-wellness';
    if (lowerTag.includes('transport')) return 'tag-transport';
    if (lowerTag.includes('food')) return 'tag-food';
    if (lowerTag.includes('adventure')) return 'tag-adventure';
    return 'bg-gray-100 text-gray-700 ring-gray-500';
  };
  
  // Get icon for tag
  const getTagIcon = (tag: string) => {
    const lowerTag = tag.toLowerCase();
    if (lowerTag.includes('wellness')) return Icons.Infinity;
    if (lowerTag.includes('yoga')) return Icons.Flower;
    if (lowerTag.includes('surf')) return Icons.Waves;
    if (lowerTag.includes('tours')) return Icons.MapPin;
    if (lowerTag.includes('music')) return Icons.Music;
    if (lowerTag.includes('impact')) return Icons.Leaf;
    if (lowerTag.includes('event')) return Icons.PartyPopper;
    return Icons.Circle;
  };

  const renderCardContent = () => {
    if (design === 'new') {
      // New card design based on the provided image
      const TagIcon = getTagIcon(experience.tags[0] || '');
      
      return (
        <div className="bg-white rounded-lg overflow-hidden shadow-sm border">
          <div className="relative">
            <img
              src={experience.image_url || 'https://placehold.co/600x400?text=Experience'}
              alt={experience.name}
              className="w-full h-48 object-cover"
            />
            
            {/* Tag and price overlay */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between p-2">
              <div className="bg-white p-1 rounded-full">
                <TagIcon size={20} className="text-nigel-purple" />
              </div>
              {!experience.is_free && (
                <div className="bg-black text-white font-bold px-3 py-1 rounded">
                  ${experience.price}
                </div>
              )}
              {experience.is_free && (
                <div className="bg-black text-white font-bold px-3 py-1 rounded">
                  FREE
                </div>
              )}
            </div>
          </div>
          
          <div className="p-3">
            <div className="text-xs uppercase font-medium text-gray-500">
              {formatDate()} {formatTime()}
            </div>
            <h3 className="font-bold text-lg mt-1 uppercase leading-tight">
              {experience.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              @{experience.property_name}, {experience.location}
            </p>
          </div>
        </div>
      );
    }

    // Default card design
    return (
      <Card className="overflow-hidden h-full flex flex-col">
        <div className="relative h-40 overflow-hidden">
          <img
            src={experience.image_url || 'https://placehold.co/600x400?text=Experience'}
            alt={experience.name}
            className="w-full h-full object-cover"
          />
          {experience.is_popular && (
            <div className="absolute top-2 right-2 bg-rose-500 text-white text-xs px-2 py-1 rounded-full">
              Popular
            </div>
          )}
        </div>
        <CardContent className="pt-4 flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">{experience.name}</h3>
              <p className="text-sm text-gray-500 flex items-center">
                <MapPin size={14} className="mr-1" />
                {experience.property_name}, {experience.location}
              </p>
            </div>
            <div className="text-right">
              <p className="font-bold text-nigel-purple">{formatPrice()}</p>
            </div>
          </div>
          
          <div className="mt-2 flex flex-wrap gap-1">
            {experience.tags.map((tag) => (
              <span key={tag} className={`tag ${getTagClass(tag)}`}>
                {tag}
              </span>
            ))}
          </div>

          {(experience.date || experience.time) && (
            <div className="flex items-center mt-2 text-sm text-gray-600">
              <Clock size={14} className="mr-1" />
              {formatDate()}
              {experience.time && (
                <span className="ml-1">at {experience.time}</span>
              )}
              {experience.duration && (
                <span className="ml-1">• {experience.duration}</span>
              )}
            </div>
          )}
          
          {experience.available_spots < 5 && experience.available_spots > 0 && (
            <div className="mt-2 text-sm text-amber-600 flex items-center">
              <Users size={14} className="mr-1" />
              Only {experience.available_spots} spots left!
            </div>
          )}
        </CardContent>
        <CardFooter className="pt-0">
          <Link to={`/experience/${experience.id}`} className="w-full">
            <Button className="w-full bg-nigel-purple hover:bg-nigel-purple-dark">
              {experience.category === 'event' ? 'Book Now' : 'Reserve'}
            </Button>
          </Link>
        </CardFooter>
      </Card>
    );
  };

  // Wrap the card with a Dialog component
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer hover:opacity-95 transition-opacity">
          {renderCardContent()}
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{experience.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <img
            src={experience.image_url || 'https://placehold.co/600x400?text=Experience'}
            alt={experience.name}
            className="w-full h-48 object-cover rounded-md"
          />
          
          <div className="grid gap-2">
            <div className="flex items-center">
              <MapPin size={18} className="mr-2 text-gray-500" />
              <p>{experience.property_name}, {experience.location}</p>
            </div>
            
            {(experience.date || experience.time) && (
              <div className="flex items-center">
                <Clock size={18} className="mr-2 text-gray-500" />
                <p>
                  {formatDate()}
                  {experience.time && <span> at {experience.time}</span>}
                  {experience.duration && <span> • {experience.duration}</span>}
                </p>
              </div>
            )}
            
            {experience.available_spots > 0 && (
              <div className="flex items-center">
                <Users size={18} className="mr-2 text-gray-500" />
                <p>{experience.available_spots} spots available</p>
              </div>
            )}
          </div>
          
          <div>
            <h3 className="font-medium mb-1">Description</h3>
            <p className="text-sm text-gray-700">{experience.description || "Experience the beauty and culture of this unique destination with our specially curated activity."}</p>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {experience.tags.map((tag) => (
              <span key={tag} className={`tag ${getTagClass(tag)}`}>
                {tag}
              </span>
            ))}
          </div>
          
          <div className="pt-2">
            <Link to={`/experience/${experience.id}`} className="w-full">
              <Button className="w-full bg-nigel-purple hover:bg-nigel-purple-dark">
                {experience.category === 'event' ? 'Book Now' : 'Reserve'} • {formatPrice()}
              </Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExperienceCard;
