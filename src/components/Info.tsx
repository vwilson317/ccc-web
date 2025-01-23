import { Footer } from './Footer';

export const Info = () => {
    return (
        <div className="container mx-auto px-4 py-12 pb-24">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-green-600">About Us</h1>
                <div className="prose prose-lg">
                    <p className="text-gray-700">
                        Welcome to your one stop shop for all things barracas in Rio de Janeiro.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4 text-green-600">How It Works</h2>
                    <p className="text-gray-700">
                        View barracas and their operating hours. If the barraca you're looking for is not listed,
                        send us an email and we will work on adding it.
                    </p>

                    <div className="mt-8 bg-green-50 p-4 rounded-lg">
                        <h3 className="text-xl font-semibold mb-2 text-green-600">Get Started</h3>
                        <p className="text-gray-700">
                        <a href="/register" className="text-green-600 hover:text-green-700 ml-1">
                                Create an account
                            </a> or
                            <a href="/login" className="text-green-600 hover:text-green-700 ml-1">
                                login
                            </a> to access all our features.
                            <ul className="list-disc pl-6 mt-2 text-gray-700">
                                <li>Save your favorite barracas</li>
                                <li>Receive updates about special events</li>
                            </ul>
                        </p>
                    </div>

                    <h2 className="text-2xl font-bold mt-8 mb-4 text-green-600">Current Features</h2>
                    <ul className="list-disc pl-6 mt-2 text-gray-700">
                        <li>Real-time barraca availability status</li>
                        <li>Digital menu access</li>
                        <li>Accurate operating hours</li>
                        <li>Comprehensive barraca listings</li>
                        <li>User accounts with personalized features</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-8 mb-4 text-green-600">Coming Soon</h2>
                    <div className="bg-green-50 p-4 rounded-lg">
                        <ul className="list-disc pl-6 text-gray-700">
                            <li>Mobile app with push notifications for your favorite barracas</li>
                            <li>Customer reviews and ratings</li>
                            <li>Direct ordering system</li>
                            <li>Loyalty program with exclusive benefits</li>
                            <li>Personalized recommendations</li>
                        </ul>
                    </div>

                    <h2 className="text-2xl font-bold mt-8 mb-4 text-green-600">Contact</h2>
                    <p className="text-gray-700">
                        Have questions or suggestions? Reach out to us at:
                        <br />
                        Email: <a href="mailto:cariocacoastalclub@gmail.com" className="text-green-600 hover:text-green-700">cariocacoastalclub@gmail.com</a>
                    </p>

                </div>
            </div>

            <Footer 
                leftButton={{
                    to: "/",
                    label: "Back to Home",
                    icon: true
                }}
                rightButton={{
                    to: "/register",
                    label: "Get Started"
                }}
            />
        </div>
    );
};