import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { Barraca, BarracaFilters, MenuItem } from '../types/barraca';

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
