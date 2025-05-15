import { getAvailabilityInfo } from '../utils/dateUtils';
import './BarracaDetail.css';
import { barracas } from '../data/barracas';

interface OperatingHours {
  date: string; // YYYY-MM-DD
  open: string; // HH:MM
  close: string; // HH:MM
}

export type PaymentMethod = 'VISA' | 'PIX' | 'PayPal' | 'Crypto';

export interface Barraca {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  hours?: OperatingHours[];
  menuUri?: string;
  paymentsEnabled?: boolean;
  acceptedPayments?: PaymentMethod[];
}

export const BarracaList = () => {
  return (
    <div className="container mx-auto px-4 py-4">
      <div className="space-y-12">
        {barracas.map((barraca, index) => {
          const availability = getAvailabilityInfo(barraca.hours);

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
                <div className="absolute top-0 right-0 p-2">
                  {
                    availability.isOpen ?
                      <span className="px-3 py-1 rounded-full bg-green-500/85 text-white">Open</span> :
                      <span className="px-3 py-1 rounded-full bg-red-500/85 text-white">Closed</span>
                  }
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
    </div>
  );
};
