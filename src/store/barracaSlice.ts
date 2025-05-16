import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Neighborhood } from '../types/barraca';

interface BarracaState {
  searchQuery: string;
  filteredBarracas: number[]; // Array of barraca IDs that match the search
  statusFilter: 'all' | 'open' | 'closed';
  neighborhoodFilter: Neighborhood | 'all';
}

const initialState: BarracaState = {
  searchQuery: '',
  filteredBarracas: [],
  statusFilter: 'all',
  neighborhoodFilter: 'all',
};

export const barracaSlice = createSlice({
  name: 'barraca',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setFilteredBarracas: (state, action: PayloadAction<number[]>) => {
      state.filteredBarracas = action.payload;
    },
    setStatusFilter: (state, action: PayloadAction<'all' | 'open' | 'closed'>) => {
      state.statusFilter = action.payload;
    },
    setNeighborhoodFilter: (state, action: PayloadAction<Neighborhood | 'all'>) => {
      state.neighborhoodFilter = action.payload;
    },
  },
});

export const { 
  setSearchQuery, 
  setFilteredBarracas, 
  setStatusFilter, 
  setNeighborhoodFilter 
} = barracaSlice.actions;

export default barracaSlice.reducer; 