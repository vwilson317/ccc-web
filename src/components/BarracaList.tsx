import { getAvailabilityInfo } from '../utils/dateUtils';
import './BarracaDetail.css';
import { barracas } from '../data/barracas';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  setSearchQuery, 
  setFilteredBarracas, 
  setStatusFilter, 
  setNeighborhoodFilter 
} from '../store/barracaSlice';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import debounce from 'lodash/debounce';
import { RootState } from '../store/store';
import { Barraca, Neighborhood } from '../types/barraca';
import { useTranslation } from 'react-i18next';

// Mock auth state - replace with your actual auth logic
const useAuth = () => {
  return { isAuthenticated: true }; // For testing, set to true
};

export const BarracaList = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const [favorites, setFavorites] = useState<number[]>([]);
  const dispatch = useDispatch();
  const { 
    searchQuery, 
    filteredBarracas, 
    statusFilter, 
    neighborhoodFilter 
  } = useSelector((state: RootState) => state.barraca);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    );
  };

  // Filter barracas based on all criteria
  const filterBarracas = useCallback((query: string) => {
    const filtered = barracas
      .filter(barraca => {
        // Text search
        const matchesSearch = query === '' || 
          barraca.title.toLowerCase().includes(query.toLowerCase()) ||
          barraca.description.toLowerCase().includes(query.toLowerCase());
        
        // Status filter
        const availability = getAvailabilityInfo(barraca.hours);
        const matchesStatus = 
          statusFilter === 'all' || 
          (statusFilter === 'open' && availability.isOpen) ||
          (statusFilter === 'closed' && !availability.isOpen);
        
        // Neighborhood filter
        const matchesNeighborhood = 
          neighborhoodFilter === 'all' || 
          barraca.neighborhood === neighborhoodFilter;

        return matchesSearch && matchesStatus && matchesNeighborhood;
      })
      .map(barraca => barraca.id);
    
    dispatch(setFilteredBarracas(filtered));
  }, [dispatch, statusFilter, neighborhoodFilter]);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      filterBarracas(query);
    }, 300),
    [filterBarracas]
  );

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    dispatch(setSearchQuery(query));
    debouncedSearch(query);
  };

  // Handle status filter changes
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setStatusFilter(e.target.value as 'all' | 'open' | 'closed'));
    filterBarracas(searchQuery);
  };

  // Handle neighborhood filter changes
  const handleNeighborhoodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setNeighborhoodFilter(e.target.value as Neighborhood | 'all'));
    filterBarracas(searchQuery);
  };

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  // Apply filters whenever they change
  useEffect(() => {
    filterBarracas(searchQuery);
  }, [filterBarracas, searchQuery]);

  // Get filtered barracas
  const filteredBarracaList = barracas.filter(barraca => 
    filteredBarracas.includes(barraca.id)
  );

  const getNoResultsMessage = () => {
    const parts = [];
    
    if (searchQuery) {
      parts.push(t('barracaList.search.noResults.withSearch', { query: searchQuery }));
    }
    
    if (statusFilter !== 'all') {
      const status = t(`barracaList.filters.status.${statusFilter}`);
      if (searchQuery) {
        parts.push(t('barracaList.search.noResults.andStatus', { status }));
      } else {
        parts.push(t('barracaList.search.noResults.onlyStatus', { status }));
      }
    }
    
    if (neighborhoodFilter !== 'all') {
      const neighborhood = t(`barracaList.filters.neighborhood.${neighborhoodFilter.toLowerCase()}`);
      if (searchQuery || statusFilter !== 'all') {
        parts.push(t('barracaList.search.noResults.inNeighborhood', { neighborhood }));
      } else {
        parts.push(t('barracaList.search.noResults.onlyNeighborhood', { neighborhood }));
      }
    }
    
    return parts.join(' ');
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="mb-8 space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder={t('barracaList.search.placeholder')}
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
        <div className="flex gap-4">
          <select
            value={statusFilter}
            onChange={handleStatusChange}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">{t('barracaList.filters.status.all')}</option>
            <option value="open">{t('barracaList.filters.status.open')}</option>
            <option value="closed">{t('barracaList.filters.status.closed')}</option>
          </select>
          <select
            value={neighborhoodFilter}
            onChange={handleNeighborhoodChange}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">{t('barracaList.filters.neighborhood.all')}</option>
            <option value="Ipanema">Ipanema</option>
            <option value="Copacabana">Copacabana</option>
            <option value="Leme">Leme</option>
            <option value="Leblon">Leblon</option>
          </select>
        </div>
      </div>
      {filteredBarracaList.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            {t('barracaList.search.noResults.title')}
          </h3>
          <p className="text-gray-500">
            {getNoResultsMessage()}
          </p>
          <button
            onClick={() => {
              dispatch(setSearchQuery(''));
              dispatch(setStatusFilter('all'));
              dispatch(setNeighborhoodFilter('all'));
              filterBarracas('');
            }}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            {t('barracaList.search.noResults.clearFilters')}
          </button>
        </div>
      ) : (
        <div className="space-y-12">
          {filteredBarracaList.map((barraca, index) => {
            const availability = getAvailabilityInfo(barraca.hours);
            const isFavorite = favorites.includes(barraca.id);

            const content = (
              <div
                key={barraca.id}
                className={`flex flex-col-reverse ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } gap-4 items-center mb-8`}
              >
                <div className="w-full md:w-1/2 relative group">
                  <div
                    className={`w-full aspect-[3/4] object-cover rounded-lg shadow-lg 
                  cursor-pointer hover:opacity-90 transition-opacity bg-cover bg-center bg-no-repeat ${!availability.isOpen ? 'grayscale' : ''}`}
                    style={{ backgroundImage: `url(${new URL(barraca.imageUrl, import.meta.url).href})` }}
                  >
                    <h2 className="text-1xl font-bold text-white absolute bottom-0 left-0 p-2 bg-black/50">{barraca.title}</h2>
                  </div>
                  <div className="absolute top-0 right-0 p-2 flex items-center gap-2">
                    {
                      availability.isOpen ?
                        <span className="px-3 py-1 rounded-full bg-green-500/85 text-white">
                          {t('barracaList.filters.status.open')}
                        </span> :
                        <span className="px-3 py-1 rounded-full bg-red-500/85 text-white">
                          {t('barracaList.filters.status.closed')}
                        </span>
                    }
                    {isAuthenticated && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleFavorite(barraca.id);
                        }}
                        className="text-yellow-400 hover:text-yellow-300 transition-colors"
                      >
                        {isFavorite ? (
                          <StarSolid className="w-6 h-6" />
                        ) : (
                          <StarOutline className="w-6 h-6" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );

            return availability.isOpen ? (
              <a href={`/barraca/${barraca.id}`} key={barraca.id}>
                {content}
              </a>
            ) : (
              <div key={barraca.id} className="cursor-not-allowed">
                {content}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
