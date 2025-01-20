import { useState } from 'react';
import { Drawer } from './Drawer';

export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <header className="fixed top-0 right-0 z-30 p-4">
      <button 
        onClick={() => setIsDrawerOpen(true)}
        className="p-2 rounded-lg bg-white shadow-lg hover:bg-gray-50"
      >
        <svg 
          className="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M4 6h16M4 12h16m-7 6h7" 
          />
        </svg>
      </button>

      <Drawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
      />
    </header>
  );
};