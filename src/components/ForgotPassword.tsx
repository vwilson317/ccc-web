import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
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

export const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [magicCode, setMagicCode] = useState('');
    const [resetToken, setResetToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [isTokenSent, setIsTokenSent] = useState(false);
    const [isTokenVerified, setIsTokenVerified] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { t } = useTranslation();

    // Query users from InstantDB
    const { data: usersData } = db.useQuery({
        users: {
            where: {
                email: email
            }
        }
    });

    const handleMagicCodeRequest = async () => {
        if (!email) {
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
                    email,
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

    const handleResetTokenRequest = async () => {
        if (!email) {
            setError(t('errors.enterEmail'));
            return;
        }

        try {
            // Generate a random token
            const token = Math.random().toString(36).substring(2, 15);
            const expiresAt = Date.now() + 15 * 60 * 1000; // 15 minutes

            // Store reset token in InstantDB
            await db.transact(
                tx.resetTokens[id()].update({
                    token,
                    email,
                    expiresAt,
                    createdAt: Date.now()
                })
            );

            // Here you would typically send the token via email
            console.log('Reset token:', token); // For development only
            toast.success(t('common.login.resetTokenSent'));
            setIsTokenSent(true);
        } catch (err) {
            setError(t('errors.resetTokenFailed'));
            toast.error(t('errors.resetTokenFailed'));
        }
    };

    const handleMagicCodeVerification = async () => {
        try {
            // Verify magic code
            const { data: magicCodeData } = await db.useQuery({
                magicCodes: {
                    where: {
                        code: magicCode,
                        email: email,
                        expiresAt: { gt: Date.now() }
                    }
                }
            });

            if (!magicCodeData?.magicCodes?.length) {
                throw new Error('Invalid magic code');
            }

            // Delete used magic code
            await db.transact(
                tx.magicCodes[magicCodeData.magicCodes[0].id].delete()
            );

            toast.success(t('common.login.magicCodeVerified'));
            navigate('/login');
        } catch (err) {
            setError(t('errors.invalidMagicCode'));
            toast.error(t('errors.invalidMagicCode'));
        }
    };

    const handleResetTokenVerification = async () => {
        try {
            // Verify reset token
            const { data: tokenData } = await db.useQuery({
                resetTokens: {
                    where: {
                        token: resetToken,
                        email: email,
                        expiresAt: { gt: Date.now() }
                    }
                }
            });

            if (!tokenData?.resetTokens?.length) {
                throw new Error('Invalid reset token');
            }

            setIsTokenVerified(true);
        } catch (err) {
            setError(t('errors.invalidResetToken'));
            toast.error(t('errors.invalidResetToken'));
        }
    };

    const handlePasswordReset = async () => {
        if (newPassword !== confirmPassword) {
            setError(t('errors.passwordsDoNotMatch'));
            return;
        }

        try {
            const user = usersData?.users?.[0];
            if (!user) {
                throw new Error('User not found');
            }

            // Update user's password
            await db.transact(
                tx.users[user.id].update({
                    password: newPassword
                })
            );

            // Delete used reset token
            const { data: tokenData } = await db.useQuery({
                resetTokens: {
                    where: {
                        token: resetToken,
                        email: email
                    }
                }
            });

            if (tokenData?.resetTokens?.[0]) {
                await db.transact(
                    tx.resetTokens[tokenData.resetTokens[0].id].delete()
                );
            }

            toast.success(t('common.login.passwordResetSuccess'));
            navigate('/login');
        } catch (err) {
            setError(t('errors.passwordResetFailed'));
            toast.error(t('errors.passwordResetFailed'));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        {t('common.login.forgotPassword')}
                    </h2>
                </div>

                {!isCodeSent && !isTokenSent && !isTokenVerified && (
                    <div className="mt-8 space-y-6">
                        <div>
                            <input
                                type="email"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder={t('common.email')}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {error && <div className="text-red-500 text-sm">{error}</div>}

                        <div className="flex flex-col space-y-4">
                            <button
                                type="button"
                                onClick={handleResetTokenRequest}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                {t('common.login.resetPassword')}
                            </button>

                            <div className="text-center">
                                <Link
                                    to="/magic-code-login"
                                    className="text-sm text-blue-600 hover:text-blue-500"
                                >
                                    {t('common.login.useMagicCode')}
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                {isCodeSent && !isTokenSent && !isTokenVerified && (
                    <div className="mt-8 space-y-6">
                        <div>
                            <input
                                type="text"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder={t('common.login.magicCode')}
                                value={magicCode}
                                onChange={(e) => setMagicCode(e.target.value)}
                            />
                        </div>

                        {error && <div className="text-red-500 text-sm">{error}</div>}

                        <div className="flex flex-col space-y-4">
                            <button
                                type="button"
                                onClick={handleMagicCodeVerification}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                {t('common.login.verifyMagicCode')}
                            </button>

                            <button
                                type="button"
                                onClick={handleMagicCodeRequest}
                                className="text-sm text-blue-600 hover:text-blue-500"
                            >
                                {t('common.login.resendMagicCode')}
                            </button>
                        </div>
                    </div>
                )}

                {isTokenSent && !isTokenVerified && (
                    <div className="mt-8 space-y-6">
                        <div>
                            <input
                                type="text"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder={t('common.login.resetToken')}
                                value={resetToken}
                                onChange={(e) => setResetToken(e.target.value)}
                            />
                        </div>

                        {error && <div className="text-red-500 text-sm">{error}</div>}

                        <div className="flex flex-col space-y-4">
                            <button
                                type="button"
                                onClick={handleResetTokenVerification}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                {t('common.login.verifyResetToken')}
                            </button>

                            <button
                                type="button"
                                onClick={handleResetTokenRequest}
                                className="text-sm text-green-600 hover:text-green-500"
                            >
                                {t('common.login.resendResetToken')}
                            </button>
                        </div>
                    </div>
                )}

                {isTokenVerified && (
                    <div className="mt-8 space-y-6">
                        <div className="space-y-4">
                            <div>
                                <input
                                    type="password"
                                    required
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                    placeholder={t('common.login.newPassword')}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    required
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                    placeholder={t('common.login.confirmPassword')}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        {error && <div className="text-red-500 text-sm">{error}</div>}

                        <div className="flex flex-col space-y-4">
                            <button
                                type="button"
                                onClick={handlePasswordReset}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                {t('common.login.resetPassword')}
                            </button>
                        </div>
                    </div>
                )}

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