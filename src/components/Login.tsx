import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { Footer } from './Footer';
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation();

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
                toast.success(t('common.login.welcomeAdmin'));
                navigate('/admin');
            } else {
                user = {
                    id: '1',
                    username: identifier,
                    email: 'admin@example.com',
                    isAdmin: false
                }
                toast.success(t('common.login.welcomeBack', { name: identifier }));
                navigate('/');
            }

            localStorage.setItem('user', JSON.stringify(user));
        } catch (err) {
            setError(t('errors.invalidCredentials'));
            toast.error(t('errors.loginFailed'));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        {t('common.login.title')}
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <input
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder={t('common.login.username')}
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder={t('common.login.password')}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && <div className="text-red-500 text-sm">{error}</div>}

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            {t('common.login.submit')}
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        {t('common.login.noAccount')}{' '}
                        <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                            {t('common.login.createAccount')}
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