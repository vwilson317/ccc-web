export const getBarracas = async (filters?: BarracaFilters): Promise<Barraca[]> => {
  try {
    console.log('Fetching barracas...');
    const barracasRef = collection(db, 'barracas');
    let q = query(barracasRef);

    console.log('Executing query...');
    const querySnapshot = await getDocs(q);
    console.log('Query results:', querySnapshot.size);

    const barracas = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Barraca[];

    console.log('Processed barracas:', barracas);

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

export const initializeSampleData = async () => {
  try {
    console.log('Checking for existing barracas...');
    const barracasRef = collection(db, 'barracas');
    const snapshot = await getDocs(barracasRef);
    
    if (snapshot.empty) {
      console.log('No barracas found, adding sample data...');
      for (const barraca of sampleBarracas) {
        await addDoc(barracasRef, barraca);
      }
      console.log('Sample data added successfully');
    } else {
      console.log('Existing barracas found:', snapshot.size);
    }
  } catch (error) {
    console.error('Error initializing sample data:', error);
  }
};
