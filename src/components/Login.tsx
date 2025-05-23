import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { init } from '@instantdb/react';

// Initialize InstantDB
const APP_ID = import.meta.env.VITE_INSTANTDB_APP_ID || '';
const db = init({ appId: APP_ID });

export const Login = () => {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [sentEmail, setSentEmail] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleSendCode = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            if (!email) {
                throw new Error('Please enter your email');
            }

            await db.auth.sendMagicCode({ email });
            setSentEmail(email);
            toast.success(t('messages.magicCodeSent'));
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
            setError(errorMessage);
            toast.error(t('errors.magicCodeFailed'));
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyCode = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            if (!code) {
                throw new Error('Please enter the magic code');
            }

            await db.auth.signInWithMagicCode({ email: sentEmail, code });
            toast.success(t('messages.loginSuccess'));
            navigate('/');
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
            setError(errorMessage);
            toast.error(t('errors.invalidCode'));
        } finally {
            setIsLoading(false);
        }
    };

    if (!sentEmail) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            {t('common.login.title')}
                        </h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSendCode}>
                        <div className="rounded-md shadow-sm">
                            <div>
                                <input
                                    type="email"
                                    required
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                    placeholder={t('common.email')}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                {isLoading ? t('common.loading') : t('magicCode.sendCode')}
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
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        {t('magicCode.title')}
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        {t('magicCode.codeSent', { email: sentEmail })}
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleVerifyCode}>
                    <div className="rounded-md shadow-sm">
                        <div>
                            <input
                                type="text"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder={t('magicCode.codePlaceholder')}
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
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
                            {isLoading ? t('common.loading') : t('magicCode.verifyCode')}
                        </button>
                        
                        <button
                            type="button"
                            onClick={() => setSentEmail('')}
                            className="text-sm text-blue-600 hover:text-blue-500"
                        >
                            {t('magicCode.backToLogin')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};