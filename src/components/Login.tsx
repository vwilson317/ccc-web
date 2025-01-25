import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { Footer } from './Footer';
interface User {
    id: string;
    username: string;
    email: string;
    isAdmin: boolean;
}

const mockAdmin = {
    id: '1',
    username: 'vwilson',
    email: 'admin@example.com',
    isAdmin: true
}

export const Login = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // const isValidEmail = (email: string) => {
    //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     return emailRegex.test(email);
    // };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            let user: User;
            if (identifier === mockAdmin.username) {
                user = mockAdmin;
                toast.success('Welcome back, Administrator!');
                navigate('/admin');
            } else {
                user = {
                    id: '1',
                    username: identifier,
                    email: 'admin@example.com',
                    isAdmin: false
                }
                toast.success(`Welcome back, ${identifier}!`);
                navigate('/');
            }

            localStorage.setItem('user', JSON.stringify(user));
        } catch (err) {
            setError('Invalid credentials');
            toast.error('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="container mx-auto px-4 py-12 pb-24">
            <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
                <div className="text-center mb-6">
                    <FiUser className="mx-auto text-4xl text-green-600 mb-2" />
                    <h1 className="text-2xl font-bold text-green-700">Login</h1>
                </div>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username or Email</label>
                        <input 
                            type="text" 
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            placeholder="Enter your username or email"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input 
                            type="password" 
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                        className="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-green-600 hover:text-green-700">
                            Register here
                        </Link>
                    </p>
                </div>
            </div>

            <Footer 
                leftButton={{
                    to: "/",
                    label: "Back to Home",
                    icon: true
                }}
            />
        </div>
    );
};