
import React from 'react';
import { Button } from "@/components/ui/button";
import { Category } from '@/types/models';

interface CategoryFilterProps {
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="flex space-x-2 overflow-x-auto pb-2 no-scrollbar">
      <Button
        variant={selectedCategory === 'all' ? 'default' : 'outline'}
        className={`rounded-full ${
          selectedCategory === 'all' ? 'bg-nigel-purple' : ''
        }`}
        onClick={() => onSelectCategory('all')}
      >
        All
      </Button>
      <Button
        variant={selectedCategory === 'event' ? 'default' : 'outline'}
        className={`rounded-full ${
          selectedCategory === 'event' ? 'bg-nigel-purple' : ''
        }`}
        onClick={() => onSelectCategory('event')}
      >
        Events & Experiences
      </Button>
      <Button
        variant={selectedCategory === 'service' ? 'default' : 'outline'}
        className={`rounded-full ${
          selectedCategory === 'service' ? 'bg-nigel-purple' : ''
        }`}
        onClick={() => onSelectCategory('service')}
      >
        Services
      </Button>
    </div>
  );
};

export default CategoryFilter;
