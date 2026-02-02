
import React from 'react';
import { Tag } from '@/types/models';
import * as LucideIcons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface TagPillProps {
  tag: Tag;
  isSelected: boolean;
  onSelect: () => void;
}

const TagPill: React.FC<TagPillProps> = ({ tag, isSelected, onSelect }) => {
  // Get the corresponding icon component
  const iconName = tag.iconName as keyof typeof LucideIcons;
  // Check if the icon exists in LucideIcons and get the component
  const IconComponent = iconName in LucideIcons ? LucideIcons[iconName] as LucideIcon : LucideIcons.Circle;
  
  return (
    <button
      onClick={onSelect}
      className={`flex flex-col items-center justify-center p-2 rounded-full border ${
        isSelected 
          ? tag.name === 'ALL' 
            ? 'bg-black text-white border-black' 
            : `text-${tag.color} bg-${tag.backgroundColor} border-${tag.color}`
          : 'bg-white text-gray-700 border-gray-300'
      }`}
    >
      <div className="rounded-full p-1 flex items-center justify-center">
        <IconComponent 
          size={18} 
          className={isSelected ? 'text-current' : 'text-gray-500'} 
        />
      </div>
      <span className="text-xs font-medium mt-1">{tag.name}</span>
    </button>
  );
};

export default TagPill;
