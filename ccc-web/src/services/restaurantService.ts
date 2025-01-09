import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { Restaurant, RestaurantFilters, MenuItem } from '../types/restaurant';

export const getRestaurants = async (filters?: RestaurantFilters): Promise<Restaurant[]> => {
  try {
    const restaurantsRef = collection(db, 'restaurants');
    let q = query(restaurantsRef);

    // Apply filters if they exist
    if (filters?.cuisine) {
      q = query(q, where('cuisine', '==', filters.cuisine));
    }
    if (filters?.priceRange) {
      q = query(q, where('priceRange', '==', filters.priceRange));
    }
    if (filters?.isOpen !== undefined) {
      q = query(q, where('isOpen', '==', filters.isOpen));
    }

    const querySnapshot = await getDocs(q);
    const restaurants = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Restaurant[];

    // Apply text search filter (client-side)
    if (filters?.searchQuery) {
      return restaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }

    return restaurants;
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    return [];
  }
};

export const getRestaurantById = async (id: string): Promise<Restaurant | null> => {
  try {
    const docRef = doc(db, 'restaurants', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Restaurant;
    }
    return null;
  } catch (error) {
    console.error('Error fetching restaurant:', error);
    return null;
  }
};

export const getMenuItems = async (restaurantId: string): Promise<MenuItem[]> => {
  try {
    const menuRef = collection(db, 'restaurants', restaurantId, 'menu');
    const querySnapshot = await getDocs(menuRef);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as MenuItem[];
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return [];
  }
};
