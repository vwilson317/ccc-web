import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Footer } from './Footer';
import { useTranslation } from 'react-i18next';
import { init, tx, id } from '@instantdb/react';

// Initialize InstantDB
const APP_ID = import.meta.env.VITE_INSTANTDB_APP_ID || '';
const db = init({ appId: APP_ID });

interface User {
    id: string;
    username: string;
    email: string;
    isAdmin: boolean;
}

export const MagicCodeLogin = () => {
    const [identifier, setIdentifier] = useState('');
    const [magicCode, setMagicCode] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { t } = useTranslation();

    // Query users from InstantDB
    const { data: usersData } = db.useQuery({
        users: {
            where: {
                username: identifier
            }
        }
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            // Verify magic code
            const { data: magicCodeData } = await db.useQuery({
                magicCodes: {
                    where: {
                        code: magicCode,
                        email: identifier,
                        expiresAt: { gt: Date.now() }
                    }
                }
            });

            if (!magicCodeData?.magicCodes?.length) {
                throw new Error('Invalid magic code');
            }

            // Get user data
            const user = usersData?.users?.[0];
            if (!user) {
                throw new Error('User not found');
            }

            // Delete used magic code
            await db.transact(
                tx.magicCodes[magicCodeData.magicCodes[0].id].delete()
            );

            localStorage.setItem('user', JSON.stringify(user));
            toast.success(t('common.login.welcomeBack', { name: user.username }));
            navigate(user.isAdmin ? '/admin' : '/');
        } catch (err) {
            setError(t('errors.invalidCredentials'));
            toast.error(t('errors.loginFailed'));
        }
    };

    const handleMagicCodeRequest = async () => {
        if (!identifier) {
            setError(t('errors.enterEmail'));
            return;
        }

        try {
            // Generate a random 6-digit code
            const code = Math.floor(100000 + Math.random() * 900000).toString();
            const expiresAt = Date.now() + 15 * 60 * 1000; // 15 minutes

            // Store magic code in InstantDB
            await db.transact(
                tx.magicCodes[id()].update({
                    code,
                    email: identifier,
                    expiresAt,
                    createdAt: Date.now()
                })
            );

            // Here you would typically send the code via email
            console.log('Magic code:', code); // For development only
            toast.success(t('common.login.magicCodeSent'));
            setIsCodeSent(true);
        } catch (err) {
            setError(t('errors.magicCodeFailed'));
            toast.error(t('errors.magicCodeFailed'));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        {t('common.login.magicCodeTitle')}
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
                                disabled={isCodeSent}
                            />
                        </div>
                        {isCodeSent && (
                            <div>
                                <input
                                    type="text"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                    placeholder={t('common.login.magicCode')}
                                    value={magicCode}
                                    onChange={(e) => setMagicCode(e.target.value)}
                                />
                            </div>
                        )}
                    </div>

                    {error && <div className="text-red-500 text-sm">{error}</div>}

                    <div className="flex flex-col space-y-4">
                        {!isCodeSent ? (
                            <button
                                type="button"
                                onClick={handleMagicCodeRequest}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                {t('common.login.sendMagicCode')}
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                {t('common.login.verifyMagicCode')}
                            </button>
                        )}
                        
                        {isCodeSent && (
                            <button
                                type="button"
                                onClick={handleMagicCodeRequest}
                                className="text-sm text-blue-600 hover:text-blue-500"
                            >
                                {t('common.login.resendMagicCode')}
                            </button>
                        )}
                    </div>
                </form>
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        {t('common.login.backToLogin')}{' '}
                        <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                            {t('common.login.clickHere')}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}; 