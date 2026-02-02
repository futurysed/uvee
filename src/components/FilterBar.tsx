
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CheckIcon, FilterIcon, CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FilterOptions } from '@/types/models';

interface FilterBarProps {
  onFilterChange: (filters: Partial<FilterOptions>) => void;
  availableTags: string[];
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange, availableTags }) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [availableNow, setAvailableNow] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
    
    if (newDate) {
      const formattedDate = newDate.toISOString().split('T')[0];
      onFilterChange({ date: formattedDate });
    } else {
      onFilterChange({ date: undefined });
    }
  };

  const handleAvailableNowChange = (checked: boolean) => {
    setAvailableNow(checked);
    onFilterChange({ availableNow: checked });
  };

  const handleTagChange = (tag: string, checked: boolean) => {
    const newSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter(t => t !== tag);
      
    setSelectedTags(newSelectedTags);
    onFilterChange({ tags: newSelectedTags.length > 0 ? newSelectedTags : undefined });
  };

  const clearFilters = () => {
    setDate(undefined);
    setAvailableNow(false);
    setSelectedTags([]);
    onFilterChange({
      date: undefined,
      availableNow: false,
      tags: undefined
    });
  };

  const hasActiveFilters = date !== undefined || availableNow || selectedTags.length > 0;

  return (
    <div className="flex items-center space-x-2 py-2 overflow-x-auto no-scrollbar">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <CalendarIcon size={16} />
            <span>{date ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Date'}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className={`flex items-center gap-1 ${hasActiveFilters ? 'bg-nigel-purple-light border-nigel-purple text-nigel-purple-dark' : ''}`}
          >
            <FilterIcon size={16} />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="ml-1 bg-nigel-purple text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {(date ? 1 : 0) + (availableNow ? 1 : 0) + selectedTags.length}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72" align="start">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Filters</h4>
              {hasActiveFilters && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters}
                  className="text-sm text-nigel-purple hover:text-nigel-purple-dark"
                >
                  Clear all
                </Button>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="available-now" 
                  checked={availableNow}
                  onCheckedChange={(checked) => handleAvailableNowChange(checked as boolean)}
                />
                <Label htmlFor="available-now" className="cursor-pointer">Available now</Label>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="text-sm font-medium">Categories</h5>
              <div className="grid grid-cols-2 gap-2">
                {availableTags.map((tag) => (
                  <div key={tag} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`tag-${tag}`} 
                      checked={selectedTags.includes(tag)}
                      onCheckedChange={(checked) => handleTagChange(tag, checked as boolean)}
                    />
                    <Label htmlFor={`tag-${tag}`} className="cursor-pointer">{tag}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FilterBar;
