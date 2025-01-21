import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Login = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const isEmail = isValidEmail(identifier);
        // Handle authentication based on whether identifier is email or username
        if (isEmail) {
            // Handle email login
            console.log('Logging in with email:', identifier);
        } else {
            // Handle username login
            console.log('Logging in with username:', identifier);
        }
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-6">Login</h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium mb-1">Username or Email</label>
                        <input 
                            type="text" 
                            className="w-full p-2 border rounded-lg"
                            placeholder="Enter your username or email"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input 
                            type="password" 
                            className="w-full p-2 border rounded-lg"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && (
                        <div className="text-red-500 text-sm">{error}</div>
                    )}
                    <button 
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-blue-500 hover:text-blue-600">
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};