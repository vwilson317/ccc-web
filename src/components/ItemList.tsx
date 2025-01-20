interface Item {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

const items: Item[] = [
  {
    id: 1,
    title: "Item One",
    description: "This is a detailed description of item one. It showcases the product's features and benefits.",
    imageUrl: "/item1.jpg"
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

export const ItemList = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="space-y-12">
        {items.map((item, index) => (
          <div 
            key={item.id}
            className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} 
                       gap-8 items-center`}
          >
            <div className="w-full md:w-1/2">
              <img 
                src={item.imageUrl} 
                alt={item.title}
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="w-full md:w-1/2 space-y-4">
              <h2 className="text-2xl font-bold">{item.title}</h2>
              <p className="text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
