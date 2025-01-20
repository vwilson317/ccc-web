import { Link } from "react-router-dom";

import { getAvailabilityInfo } from '../utils/dateUtils';

interface OperatingHours {
  date: string; // YYYY-MM-DD
  open: string; // HH:MM
  close: string; // HH:MM
}

interface Barraca {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  hours?: OperatingHours[];
  menuUri?: string;
}

export const barracas: Barraca[] = [
  {
    id: 1,
    title: "Uruguay (#80)",
    description: "Creators personal favorite. They're always super friendly and wont rip gringos off :)",
    imageUrl: '/assets/barraca-80.jpg',
    hours: [
      { date: "2025-01-20", open: "09:00", close: "20:00" },
      { date: "2025-01-21", open: "09:00", close: "17:00" },
      { date: "2025-01-22", open: "09:00", close: "17:00" },
      { date: "2025-01-28", open: "09:00", close: "17:00" }
    ],
    menuUri: "./assets/80-menu.jpg"
  },
  {
    id: 2,
    title: "Rasta (#20)",
    description: "Another one of our favorites. If you're in leme it's always a good vibe.",
    imageUrl: '/assets/20-default.jpeg',
    hours: []
  },
  {
    id: 3,
    title: "Item Three",
    description: "This is a detailed description of item three. It highlights the main selling points of this item.",
    imageUrl: "/item3.jpg"
  }
];

export const BarracaList = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="space-y-12">
        {barracas.map((barraca, index) => {
          const availability = getAvailabilityInfo(barraca.hours);

          return (
            <a href={`/barraca/${barraca.id}`}> 
              <div
                key={barraca.id}
                className={`flex flex-col-reverse ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } gap-8 items-center`}
              >
                {/* Image Section */}
                <div className="w-full md:w-1/2 relative group">
                  <img
                    src={barraca.imageUrl}
                    alt={barraca.title}
                    className="w-full h-64 object-cover rounded-lg shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
                  // onClick={() => handleImageClick(barraca.imageUrl)}
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg text-sm">
                      Click to view full image
                    </span>
                  </div>
                </div>

                {/* Details Section */}
                <div className="w-full md:w-1/2 space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0 mb-2">
                    <h2 className="text-2xl font-bold">{barraca.title}</h2>
                    <div className={`px-3 py-1 rounded-full text-sm self-start md:self-auto ${availability.isOpen
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                      }`}>
                      {availability.message}
                    </div>
                  </div>
                  <p className="text-gray-600">{barraca.description}</p>
                  <div className="flex items-center space-x-4">
                    {barraca.menuUri ? (
                      <a
                        href={barraca.menuUri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-500 hover:text-orange-700 z-1"
                      >
                        View menu →
                      </a>
                    ) : (
                      <span className="text-gray-400 text-sm italic">
                        No menu available
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};
