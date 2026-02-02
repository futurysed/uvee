
import { Experience, Category, FilterOptions } from '../types/models';

// Mock data for experiences and services
const mockExperiences: Experience[] = [
  {
    id: '1',
    name: 'Sunset Yoga',
    description: 'Join our beachside sunset yoga session, perfect for all levels. Mats provided.',
    property_name: 'Homebase',
    location: 'Sri Lanka',
    image_url: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=2670&auto=format&fit=crop',
    date: '2023-09-15',
    time: '18:00',
    duration: '1 hour',
    price: 0,
    is_free: true,
    included_in_stay: true,
    category: 'event',
    tags: ['Wellness'],
    available_spots: 8,
    total_spots: 12,
    coliving_location_id: 'loc1',
    is_recommended: true,
    is_popular: true
  },
  {
    id: '2',
    name: 'Scooter Rental',
    description: 'Explore the island with our comfortable scooters. Includes helmet and insurance.',
    property_name: 'Homebase',
    location: 'Sri Lanka',
    image_url: 'https://images.unsplash.com/photo-1583430999850-319c9be05465?q=80&w=2574&auto=format&fit=crop',
    date: '',
    time: '',
    duration: 'Daily',
    price: 12,
    is_free: false,
    included_in_stay: false,
    category: 'service',
    tags: ['Transport'],
    available_spots: 5,
    total_spots: 10,
    coliving_location_id: 'loc1',
    is_recommended: true,
    is_popular: false
  },
  {
    id: '3',
    name: 'Community Dinner',
    description: 'A family-style dinner with the entire community. Tonight\'s theme: Local Cuisine!',
    property_name: 'Homebase',
    location: 'Sri Lanka',
    image_url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2670&auto=format&fit=crop',
    date: '2023-09-15',
    time: '19:30',
    duration: '2 hours',
    price: 8,
    is_free: false,
    included_in_stay: false,
    category: 'event',
    tags: ['Food'],
    available_spots: 15,
    total_spots: 20,
    coliving_location_id: 'loc1',
    is_recommended: false,
    is_popular: true
  },
  {
    id: '4',
    name: 'Surf Lesson',
    description: 'Learn to surf with our experienced instructors. All equipment provided.',
    property_name: 'Homebase',
    location: 'Sri Lanka',
    image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2673&auto=format&fit=crop',
    date: '2023-09-16',
    time: '09:00',
    duration: '2 hours',
    price: 25,
    is_free: false,
    included_in_stay: false,
    category: 'event',
    tags: ['Adventure'],
    available_spots: 4,
    total_spots: 6,
    coliving_location_id: 'loc1',
    is_recommended: true,
    is_popular: true
  },
  {
    id: '5',
    name: 'Airport Shuttle',
    description: 'Convenient shuttle service to and from the airport. Book at least 24h in advance.',
    property_name: 'Homebase',
    location: 'Sri Lanka',
    image_url: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2671&auto=format&fit=crop',
    date: '',
    time: '',
    duration: 'On demand',
    price: 15,
    is_free: false,
    included_in_stay: false,
    category: 'service',
    tags: ['Transport'],
    available_spots: 8,
    total_spots: 8,
    coliving_location_id: 'loc1',
    is_recommended: false,
    is_popular: false
  },
  {
    id: '6',
    name: 'Coworking Day Pass',
    description: 'Access to our premium coworking space with high-speed internet and coffee.',
    property_name: 'Homebase',
    location: 'Sri Lanka',
    image_url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2669&auto=format&fit=crop',
    date: '',
    time: '',
    duration: 'Daily 8am-8pm',
    price: 10,
    is_free: false,
    included_in_stay: false,
    category: 'service',
    tags: ['Workspace'],
    available_spots: 12,
    total_spots: 20,
    coliving_location_id: 'loc1',
    is_recommended: false,
    is_popular: true
  },
  {
    id: '7',
    name: 'Waterfall Hike',
    description: 'Guided hike to a stunning local waterfall. Moderate difficulty level.',
    property_name: 'Homebase',
    location: 'Sri Lanka',
    image_url: 'https://images.unsplash.com/photo-1565019011521-254775ab7675?q=80&w=2573&auto=format&fit=crop',
    date: '2023-09-17',
    time: '07:30',
    duration: '4 hours',
    price: 20,
    is_free: false,
    included_in_stay: false,
    category: 'event',
    tags: ['Adventure'],
    available_spots: 8,
    total_spots: 10,
    coliving_location_id: 'loc1',
    is_recommended: true,
    is_popular: true
  },
  {
    id: '8',
    name: 'Morning Meditation',
    description: 'Start your day with a guided meditation session in our garden.',
    property_name: 'Homebase',
    location: 'Sri Lanka',
    image_url: 'https://images.unsplash.com/photo-1536623975707-c4b3b2af565d?q=80&w=2670&auto=format&fit=crop',
    date: '2023-09-16',
    time: '07:00',
    duration: '45 minutes',
    price: 0,
    is_free: true,
    included_in_stay: true,
    category: 'event',
    tags: ['Wellness'],
    available_spots: 10,
    total_spots: 15,
    coliving_location_id: 'loc1',
    is_recommended: false,
    is_popular: false
  }
];

// Function to filter experiences based on filter options
export const filterExperiences = (
  filterOptions: FilterOptions
): Promise<Experience[]> => {
  return new Promise((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      let filteredExperiences = [...mockExperiences];

      // Filter by category
      if (filterOptions.category !== 'all') {
        filteredExperiences = filteredExperiences.filter(
          (exp) => exp.category === filterOptions.category
        );
      }

      // Filter by date if provided
      if (filterOptions.date) {
        filteredExperiences = filteredExperiences.filter(
          (exp) => !exp.date || exp.date === filterOptions.date
        );
      }

      // Filter by time if provided
      if (filterOptions.time) {
        filteredExperiences = filteredExperiences.filter(
          (exp) => !exp.time || exp.time >= filterOptions.time
        );
      }

      // Filter by price range if provided
      if (filterOptions.minPrice !== undefined) {
        filteredExperiences = filteredExperiences.filter(
          (exp) => exp.is_free || exp.price >= (filterOptions.minPrice || 0)
        );
      }

      if (filterOptions.maxPrice !== undefined) {
        filteredExperiences = filteredExperiences.filter(
          (exp) => exp.is_free || exp.price <= (filterOptions.maxPrice || Number.MAX_VALUE)
        );
      }

      // Filter by available now
      if (filterOptions.availableNow) {
        const now = new Date();
        const today = now.toISOString().split('T')[0];
        const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now
          .getMinutes()
          .toString()
          .padStart(2, '0')}`;

        filteredExperiences = filteredExperiences.filter(
          (exp) => 
            // Services with no specific date/time
            (exp.category === 'service' && (!exp.date || !exp.time)) ||
            // Events happening today at a later time
            (exp.date === today && exp.time >= currentTime) ||
            // Future events
            exp.date > today
        );
      }

      // Filter by tags if provided
      if (filterOptions.tags && filterOptions.tags.length > 0) {
        filteredExperiences = filteredExperiences.filter((exp) =>
          exp.tags.some((tag) => filterOptions.tags?.includes(tag))
        );
      }

      // Sort experiences - today's first, then by time, then future dates
      filteredExperiences.sort((a, b) => {
        const today = new Date().toISOString().split('T')[0];
        
        // Services (always available) should come after today's events
        if (a.category === 'service' && b.category !== 'service') return 1;
        if (a.category !== 'service' && b.category === 'service') return -1;
        
        // Today's events first
        if (a.date === today && b.date !== today) return -1;
        if (a.date !== today && b.date === today) return 1;
        
        // Sort by time for same day events
        if (a.date === b.date && a.time && b.time) {
          return a.time.localeCompare(b.time);
        }
        
        // Sort by date for future events
        if (a.date && b.date) {
          return a.date.localeCompare(b.date);
        }
        
        return 0;
      });

      resolve(filteredExperiences);
    }, 300);
  });
};

// Function to get a specific experience by ID
export const getExperienceById = (id: string): Promise<Experience | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const experience = mockExperiences.find((exp) => exp.id === id);
      resolve(experience || null);
    }, 300);
  });
};

// Function to book an experience
export const bookExperience = (
  experienceId: string,
  userId: string
): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate booking logic
      const experience = mockExperiences.find((exp) => exp.id === experienceId);
      
      if (experience && experience.available_spots > 0) {
        // In a real app, we would update the database here
        experience.available_spots -= 1;
        resolve(true);
      } else {
        resolve(false);
      }
    }, 500);
  });
};

// Function to get all available tags
export const getAllTags = (): Promise<string[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const uniqueTags = Array.from(
        new Set(mockExperiences.flatMap((exp) => exp.tags))
      );
      resolve(uniqueTags);
    }, 200);
  });
};

// Get recommended experiences
export const getRecommendedExperiences = (): Promise<Experience[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const recommended = mockExperiences.filter((exp) => exp.is_recommended);
      resolve(recommended);
    }, 200);
  });
};

// Get popular experiences
export const getPopularExperiences = (): Promise<Experience[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const popular = mockExperiences.filter((exp) => exp.is_popular);
      resolve(popular);
    }, 200);
  });
};
