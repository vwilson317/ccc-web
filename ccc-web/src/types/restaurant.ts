export interface Restaurant {
  id: string;
  name: string;
  description: string;
  cuisine: string;
  address: string;
  imageUrl: string;
  rating: number;
  priceRange: '€' | '€€' | '€€€';
  isOpen: boolean;
  menuUrl?: string; // PDF menu URL if available
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  available: boolean;
}

export interface MenuCategory {
  name: string;
  items: MenuItem[];
}

export interface RestaurantFilters {
  searchQuery: string;
  cuisine?: string;
  priceRange?: string;
  isOpen?: boolean;
}
