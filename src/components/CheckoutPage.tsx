import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PaymentMethod } from './BarracaList';
import { Footer } from './Footer';

// Payment method icons mapping
const PaymentIcons: Record<PaymentMethod, string> = {
    VISA: '/assets/visa.svg',
    PIX: '/assets/pix.svg',
    PayPal: '/assets/paypal.svg',
    Crypto: '/assets/crypto.svg'
};

interface CheckoutPageProps {
    items: Array<{
        id: number;
        name: string;
        price: number;
        quantity: number;
    }>;
    total: number;
    barracaId: number;
    acceptedPayments: PaymentMethod[];
}

export const CheckoutPage = () => {
    const location = useLocation();
    // const navigate = useNavigate();
    const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);
    const { items, total, barracaId, acceptedPayments } = location.state as CheckoutPageProps;

    const handlePayment = () => {
        if (!selectedPayment) return;
        // Implement payment processing here
        alert(`Processing ${selectedPayment} payment...`);
    };

    const PaymentButton = ({ method }: { method: PaymentMethod }) => (
        <button
            onClick={() => setSelectedPayment(method)}
            className={`w-full p-4 border rounded-lg mb-2 text-left ${
                selectedPayment === method ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
            }`}
        >
            <div className="flex items-center space-x-3">
                <div className="text-gray-600">
                    <img 
                        src={PaymentIcons[method]} 
                        alt={`${method} icon`}
                        className={`${method === 'VISA' ? 'w-16 h-16' : 'w-8 h-8'}`}
                    />
                </div>
                <div className="flex-1">{method}</div>
                {selectedPayment === method && (
                    <div className="text-orange-500">✓</div>
                )}
            </div>
        </button>
    );

    return (
        <div className="container mx-auto px-4 py-12 max-w-2xl pb-24">
            <h1 className="text-2xl font-bold mb-6">Checkout</h1>
            
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                {items.map(item => (
                    <div key={item.id} className="flex justify-between mb-2">
                        <span>{item.quantity}x {item.name}</span>
                        <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                ))}
                <div className="border-t mt-4 pt-4">
                    <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>R$ {total.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                {acceptedPayments?.map(method => (
                    <PaymentButton key={method} method={method} />
                ))}
            </div>

            <Footer 
                leftButton={{
                    to: `/order/${barracaId}`,
                    label: 'Back to Order',
                    icon: true
                }}
                rightButton={{
                    onClick: handlePayment,
                    label: 'Pay Now',
                    disabled: !selectedPayment,
                    className: `px-6 py-2 rounded-lg text-white text-lg font-semibold
                        ${selectedPayment 
                            ? 'bg-orange-500 hover:bg-orange-600' 
                            : 'bg-gray-300 cursor-not-allowed'
                        }`
                }}
            />
        </div>
    );
}; 