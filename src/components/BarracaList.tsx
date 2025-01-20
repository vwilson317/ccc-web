import { Link } from "react-router-dom";

interface Barraca {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

export const barracas: Barraca[] = [
  {
    id: 1,
    title: "Uruguay (#80)",
    description: "Creators personal favorite. They're always super friendly and wont rip gringos off :)",
    imageUrl: '/assets/barraca-80.jpg'
  },
  {
    id: 2,
    title: "Item Two",
    description: "This is a detailed description of item two. It explains why this item is special and unique.",
    imageUrl: "/item2.jpg"
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
        {barracas.map((barraca, index) => (
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
              <h2 className="text-2xl font-bold">{barraca.title}</h2>
              <p className="text-gray-600">{barraca.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
