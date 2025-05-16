export type Neighborhood = 'Ipanema' | 'Copacabana' | 'Leme' | 'Leblon';

export type PaymentMethod = 'VISA' | 'PIX' | 'PayPal' | 'Crypto';

export interface OperatingHours {
  date: string; // YYYY-MM-DD
  open: string; // HH:MM
  close: string; // HH:MM
}

export interface Barraca {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  hours?: OperatingHours[];
  menuUri?: string;
  paymentsEnabled?: boolean;
  acceptedPayments?: PaymentMethod[];
  neighborhood: Neighborhood;
} 