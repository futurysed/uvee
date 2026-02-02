
export interface Experience {
  id: string;
  name: string;
  description: string;
  property_name: string;
  location: string;
  image_url: string;
  date: string;
  time: string;
  duration: string;
  price: number;
  is_free: boolean;
  included_in_stay: boolean;
  category: 'event' | 'service';
  tags: string[];
  available_spots: number;
  total_spots: number;
  host_contact?: string;
  coliving_location_id: string;
  is_recommended: boolean;
  is_popular: boolean;
}

export type Category = 'all' | 'event' | 'service';

export interface FilterOptions {
  category: Category;
  date?: string;
  time?: string;
  minPrice?: number;
  maxPrice?: number;
  availableNow?: boolean;
  tags?: string[];
  isWeekend?: boolean;
}

export interface Tag {
  name: string;
  iconName: string;
  color: string;
  backgroundColor: string;
}
