export const Info = () => {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-blue-600">About Us</h1>
          <div className="prose prose-lg">
            <p className="text-gray-700">
              Welcome to your one stop shop for all things barracas in Rio de Janeiro. 
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4 text-blue-600">Contact</h2>
            <p className="text-gray-700">
              Have questions or suggestions? Reach out to us at:
              <br />
              Email: <a href="mailto:cariocacoastalclub@gmail.com" className="text-blue-500 hover:text-blue-600">cariocacoastalclub@gmail.com</a>
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4 text-blue-600">How It Works</h2>
            <p className="text-gray-700">
              View barracas and their operating hours. If the barraca you're looking for is not listed, 
              send us an email and we will work on adding it.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4 text-blue-600">Current Features</h2>
            <ul className="list-disc pl-6 mt-2 text-gray-700">
              <li>Real-time barraca availability status</li>
              <li>Digital menu access</li>
              <li>Accurate operating hours</li>
              <li>Comprehensive barraca listings</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-blue-600">Coming Soon</h2>
            <div className="bg-blue-50 p-4 rounded-lg">
              <ul className="list-disc pl-6 text-gray-700">
                <li>Mobile app with push notifications for your favorite barracas</li>
                <li>Customer reviews and ratings</li>
                <li>Direct ordering system</li>
                <li>Loyalty program with exclusive benefits</li>
                <li>Personalized recommendations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };