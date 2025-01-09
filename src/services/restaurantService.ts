import { collection, query, where, getDocs, doc, getDoc, addDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { Barraca, BarracaFilters, MenuItem } from '../types/restaurant';

// Sample data
const sampleBarracas: Omit<Barraca, 'id'>[] = [
  {
    name: "Barraca do Zé",
    description: "Traditional beach food with the best cheese on bread in Ipanema",
    cuisine: "Brazilian Beach Food",
    address: "Post 9, Ipanema Beach",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2073&q=80",
    rating: 4.8,
    priceRange: "€",
    isOpen: true
  },
  {
    name: "Ponto do Açaí",
    description: "Fresh açaí bowls and tropical smoothies",
    cuisine: "Healthy",
    address: "Post 8, Ipanema Beach",
    imageUrl: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    rating: 4.5,
    priceRange: "€€",
    isOpen: true
  },
  {
    name: "Camarão do Mar",
    description: "Fresh seafood and cold beer",
    cuisine: "Seafood",
    address: "Post 10, Ipanema Beach",
    imageUrl: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2083&q=80",
    rating: 4.7,
    priceRange: "€€€",
    isOpen: true
  }
];

// Function to initialize sample data
export const initializeSampleData = async () => {
  try {
    const barracasRef = collection(db, 'barracas');
    const snapshot = await getDocs(barracasRef);
    
    if (snapshot.empty) {
      console.log('No barracas found, adding sample data...');
      for (const barraca of sampleBarracas) {
        await addDoc(barracasRef, barraca);
      }
      console.log('Sample data added successfully');
    }
  } catch (error) {
    console.error('Error initializing sample data:', error);
  }
};

export const getBarracas = async (filters?: BarracaFilters): Promise<Barraca[]> => {
  try {
    const barracasRef = collection(db, 'barracas');
    let q = query(barracasRef);

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
    const barracas = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Barraca[];

    // Apply text search filter (client-side)
    if (filters?.searchQuery) {
      return barracas.filter(barraca =>
        barraca.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        barraca.cuisine.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }

    return barracas;
  } catch (error) {
    console.error('Error fetching barracas:', error);
    return [];
  }
};

export const getBarracaById = async (id: string): Promise<Barraca | null> => {
  try {
    const docRef = doc(db, 'barracas', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Barraca;
    }
    return null;
  } catch (error) {
    console.error('Error fetching barraca:', error);
    return null;
  }
};

export const getMenuItems = async (barracaId: string): Promise<MenuItem[]> => {
  try {
    const menuRef = collection(db, 'barracas', barracaId, 'menu');
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
