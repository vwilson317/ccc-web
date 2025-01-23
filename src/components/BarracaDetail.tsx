import { useParams, Link } from 'react-router-dom';
import { barracas } from './BarracaList';
import { getAvailabilityInfo } from '../utils/dateUtils';
import { Footer } from './Footer';

export const BarracaDetail = () => {
  const { id } = useParams();
  const barraca = barracas.find(item => item.id === Number(id));

  if (!barraca) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Barraca not found</h2>
          <Link to="/" className="text-green-600 hover:text-green-700">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  const availability = getAvailabilityInfo(barraca.hours);

  return (
    <div className="container mx-auto px-4 py-12 pb-24">
      <div className="max-w-4xl mx-auto">
        {/* Mobile-first layout: Details above image */}
        <div className="flex flex-col md:flex-col-reverse">
          {/* Details Section */}
          <div className="mb-6 md:mt-8">
            {/* Title and status section */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h1 className="text-4xl font-bold mb-2 md:mb-0">{barraca.title}</h1>
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

      <Footer 
        leftButton={{
          to: "/",
          label: "Back to all barracas",
          icon: true
        }}
        rightButton={barraca.menuUri ? {
          to: `/order/${id}`,
          label: "Order Now",
        } : undefined}
      />
    </div>
  );
};