import { useParams, Link } from 'react-router-dom';
import { barracas } from './BarracaList';
import { getAvailabilityInfo } from '../utils/dateUtils';

export const BarracaDetail = () => {
  const { id } = useParams();
  const barraca = barracas.find(item => item.id === Number(id));

  if (!barraca) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Barraca not found</h2>
          <Link to="/" className="text-blue-500 hover:text-blue-700">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  const availability = getAvailabilityInfo(barraca.hours);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <Link to="/" className="text-blue-500 hover:text-blue-700">
          ← Back to all barracas
        </Link>
        {barraca.menuUri ? (
          <a 
            href={barraca.menuUri}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            <span className="mr-2">View Menu</span>
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
              />
            </svg>
          </a>
        ) : (
          <div className="px-4 py-2 bg-gray-100 text-gray-500 rounded-lg inline-flex items-center">
            <svg 
              className="w-4 h-4 mr-2" 
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
            <span>No menu available</span>
          </div>
        )}
      </div>
      
      <div className="max-w-4xl mx-auto">
        {/* Mobile-first layout: Details above image */}
        <div className="flex flex-col md:flex-col-reverse">
          {/* Details Section */}
          <div className="mb-6 md:mt-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-4xl font-bold">{barraca.title}</h1>
              <div className={`px-4 py-2 rounded-full ${
                availability.isOpen 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {availability.message}
              </div>
            </div>

            <p className="text-gray-600 text-lg mb-6">{barraca.description}</p>

            {barraca.hours && barraca.hours.length > 0 && (
              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Operating Hours</h2>
                <div className="space-y-2">
                  {barraca.hours.map((hour, index) => (
                    <div key={index} className="flex justify-between border-b py-2">
                      <span className="font-medium">
                        {new Date(hour.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                      </span>
                      <span>{hour.open} - {hour.close}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Image Section */}
          <div className="mb-6 md:mb-0">
            <img 
              src={new URL(barraca.imageUrl, import.meta.url).href} 
              alt={barraca.title}
              className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
            //   onClick={() => handleImageClick(barraca.imageUrl)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};