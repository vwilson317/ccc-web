import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { barracas } from './BarracaList';

interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl?: string;
}

// Mock menu items - you'll want to replace this with real data from your backend
const mockMenuItems: Record<number, MenuItem[]> = {
    80: [
        {
            id: 1,
            name: "Açaí Bowl",
            description: "Fresh açaí with granola and banana",
            price: 25.00,
            // imageUrl: "/assets/acai-bowl.jpg"
            imageUrl: "https://pub-db19578f977b43e184c45b5084d7c029.r2.dev/acai-temp-sm.jpg"
        },
        {
            id: 2,
            name: "Caipirinha",
            description: "Traditional Brazilian cocktail",
            price: 20.00,
            // imageUrl: "/assets/caipirinha.jpg"
            imageUrl: "https://pub-db19578f977b43e184c45b5084d7c029.r2.dev/cap-temp-sm.jpeg"
        }
    ]
};

export const OrderPage = () => {
    const { id } = useParams<{ id: string }>();
    const barracaId = parseInt(id || '0');
    const barraca = barracas.find(b => b.id === barracaId);
    const menuItems = mockMenuItems[barracaId] || [];
    const [quantities, setQuantities] = useState<Record<number, number>>({});
    const navigate = useNavigate();

    const updateQuantity = (itemId: number, delta: number) => {
        setQuantities(prev => ({
            ...prev,
            [itemId]: Math.max(0, (prev[itemId] || 0) + delta)
        }));
    };

    const total = menuItems.reduce((sum, item) => sum + (quantities[item.id] || 0) * item.price, 0);

    const handleCheckout = () => {
        const itemsToCheckout = menuItems
            .filter(item => quantities[item.id] > 0)
            .map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: quantities[item.id]
            }));

        navigate(`/checkout`, {
            state: {
                items: itemsToCheckout,
                total,
                barracaId,
                acceptedPayments: barraca.acceptedPayments
            }
        });
    };

    if (!barraca) {
        return <div className="container mx-auto px-4 py-12">Barraca not found</div>;
    }
    return (
        <div className="container mx-auto px-4 py-12">
            <Link to={`/barraca/${id}`}>
            <h1 className="text-3xl font-bold mb-8">{barraca.title}</h1>

            </Link>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {menuItems.map(item => (
                    <div key={item.id} className="border rounded-lg p-4 shadow-sm">
                        {item.imageUrl && (
                            <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                        )}
                        <h3 className="text-xl font-semibold">{item.name}</h3>
                        <p className="text-gray-600 mb-2">{item.description}</p>
                        <p className="text-lg font-bold mb-4">R$ {item.price.toFixed(2)}</p>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="bg-gray-200 px-3 py-1 rounded"
                            >
                                -
                            </button>
                            <span>{quantities[item.id] || 0}</span>
                            <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="bg-gray-200 px-3 py-1 rounded"
                            >
                                +
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {total > 0 && (
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
                    <div className="container mx-auto flex justify-between items-center">
                        <div className="text-xl font-bold">
                            Total: R$ {total.toFixed(2)}
                        </div>
                        <button
                            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
                            onClick={handleCheckout}
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};