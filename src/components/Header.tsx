import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Drawer } from './Drawer';

export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-white shadow-lg">
      <div className="flex items-center justify-between px-4 py-2">
        {/* Logo and Title Link */}
        <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
          <svg 
            className="w-8 h-8 text-blue-600" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
          <span className="ml-2 text-xl font-bold text-gray-800">Carioca Coastal Club</span>
        </Link>

        {/* Menu Button */}
        <button 
          onClick={() => setIsDrawerOpen(true)}
          className="p-2 rounded-lg hover:bg-gray-100"
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
      </div>

      <Drawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
      />
    </header>
  );
};