import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Drawer = ({ isOpen, onClose }: DrawerProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed right-0 top-0 h-full w-4/5 max-w-sm bg-white z-50 shadow-xl"
          >
            <div className="p-4 flex flex-col h-full">
              {/* Close button */}
              <button 
                onClick={onClose}
                className="self-end p-2"
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
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              </button>

              {/* Menu items */}
              <nav className="flex-1 mt-8">
                <ul className="space-y-4">
                  <li>
                    <Link 
                      to="/" 
                      className="block p-2 hover:bg-gray-100 rounded-lg"
                      onClick={onClose}
                    >
                      Barracas
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/info" 
                      className="block p-2 hover:bg-gray-100 rounded-lg"
                      onClick={onClose}
                    >
                      Info
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/login" 
                      className="block p-2 hover:bg-gray-100 rounded-lg"
                      onClick={onClose}
                    >
                      Login
                    </Link>
                  </li>
                </ul>
              </nav>

              {/* Footer */}
              <div className="mt-auto p-4 text-sm text-gray-500">
                <p>© 2025 Carioca Coastal Club</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};