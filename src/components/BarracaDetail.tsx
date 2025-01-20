import { useParams, Link } from 'react-router-dom';
import { barracas } from './BarracaList'; // We'll need to export the items array

export const BarracaDetail = () => {
  const { id } = useParams();
  const barraca = barracas.find(barraca => barraca.id === Number(id));

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

  return (
    <div className="container mx-auto px-4 py-12">
      <Link to="/" className="text-blue-500 hover:text-blue-700 mb-8 block">
        ← Back to all barracas
      </Link>
      
      <div className="max-w-4xl mx-auto">
        <img 
          src={barraca.imageUrl} 
          alt={barraca.title}
          className="w-full h-96 object-cover rounded-lg shadow-lg mb-8"
        />
        
        <h1 className="text-4xl font-bold mb-4">{barraca.title}</h1>
        <p className="text-gray-600 text-lg">{barraca.description}</p>
      </div>
    </div>
  );
};