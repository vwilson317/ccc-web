import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { init } from '@instantdb/react';

// Initialize InstantDB
const APP_ID = import.meta.env.VITE_INSTANTDB_APP_ID || '';
const db = init({ appId: APP_ID });

export const Login = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // Validate input
            if (!identifier || !password) {
                throw new Error('Please enter both username/email and password');
            }

            // Authenticate user with InstantDB
            const user = await db.auth.getUser(identifier, password);
            if (!user) {
                throw new Error('User not found');
            }

            // Store user data in localStorage (excluding password)
            const userData = {
                id: user.id,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin
            };
            localStorage.setItem('user', JSON.stringify(userData));

            toast.success(t('common.login.welcomeBack', { name: user.username }));
            navigate(user.isAdmin ? '/admin' : '/');
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
            
            // Map error messages to translations
            if (errorMessage === 'User not found') {
                setError(t('errors.userNotFound'));
            } else if (errorMessage === 'Invalid password') {
                setError(t('errors.invalidCredentials'));
            } else if (errorMessage.includes('Please wait')) {
                setError(t('errors.networkError'));
            } else {
                setError(t('errors.loginFailed'));
            }
            
            toast.error(t('errors.loginFailed'));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
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
                                placeholder={t('common.login.username') + ' ' + t('common.or') + ' ' + t('common.email')}
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                disabled={isLoading}
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
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    {error && <div className="text-red-500 text-sm">{error}</div>}

                    <div className="flex flex-col space-y-4">
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isLoading}
                        >
                            {isLoading ? t('common.loading') : t('common.login.submit')}
                        </button>
                        
                        <div className="flex justify-center">
                            <Link
                                to="/forgot-password"
                                className="text-sm text-blue-600 hover:text-blue-500"
                            >
                                {t('common.login.forgotPassword')}
                            </Link>
                        </div>
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
        </div>
    );
};