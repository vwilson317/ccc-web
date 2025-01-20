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
    imageUrl: "/item2.jpg",
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
            <div
              key={barraca.id}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} 
                       gap-8 items-center`}
            >
              <div className="w-full md:w-1/2">
                <Link to={`/barraca/${barraca.id}`}>
                  <img
                    src={barraca.imageUrl}
                    alt={barraca.title}
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                  />
                </Link>

              </div>
              <div className="w-full md:w-1/2 space-y-4">
                <a href={`/barraca/${barraca.id}`}>
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-2xl font-bold">{barraca.title}</h2>
                    <div className={`px-3 py-1 rounded-full text-sm ${availability.isOpen
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
                        className="text-orange-500 hover:text-orange-700"
                      >
                        View menu →
                      </a>
                    ) : (
                      <span className="text-gray-400 text-sm italic">
                        No menu available
                      </span>
                    )}
                  </div>
                </a>

              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};
