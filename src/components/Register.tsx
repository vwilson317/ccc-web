import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { init, tx, id } from '@instantdb/react';
import toast from 'react-hot-toast';

// Initialize InstantDB
const APP_ID = import.meta.env.VITE_INSTANTDB_APP_ID || '';
const db = init({ appId: APP_ID });

export const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { t } = useTranslation();

    // Query users from InstantDB at component level
    const { data: existingUsers } = db.useQuery({
        users: {
            where: {
                OR: [
                    { username: formData.username },
                    { email: formData.email }
                ]
            }
        }
    });

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        };

        // Username validation
        if (formData.username.length < 3) {
            newErrors.username = t('errors.usernameLength');
            isValid = false;
        }

        // Email validation
        if (!isValidEmail(formData.email)) {
            newErrors.email = t('errors.invalidEmail');
            isValid = false;
        }

        // Password validation
        if (formData.password.length < 6) {
            newErrors.password = t('errors.passwordLength');
            isValid = false;
        }

        // Confirm password validation
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = t('errors.passwordsDoNotMatch');
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            // Check if username or email already exists
            if (existingUsers?.users && existingUsers.users.length > 0) {
                const existingUser = existingUsers.users[0];
                if (existingUser.username === formData.username) {
                    setErrors(prev => ({ ...prev, username: t('errors.usernameExists') }));
                }
                if (existingUser.email === formData.email) {
                    setErrors(prev => ({ ...prev, email: t('errors.emailExists') }));
                }
                setIsLoading(false);
                return;
            }

            // Create new user
            const newUser = {
                id: id(),
                username: formData.username,
                email: formData.email,
                password: formData.password,
                isAdmin: false,
                createdAt: Date.now()
            };

            await db.transact(
                tx.users[newUser.id].update(newUser)
            );

            toast.success(t('messages.registrationSuccess'));
            navigate('/login');
        } catch (err) {
            console.error('Registration error:', err);
            toast.error(t('errors.registrationFailed'));
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        {t('register.title')}
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <input
                                type="text"
                                name="username"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder={t('register.username')}
                                value={formData.username}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                            {errors.username && (
                                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                            )}
                        </div>
                        <div>
                            <input
                                type="email"
                                name="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder={t('register.email')}
                                value={formData.email}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                            )}
                        </div>
                        <div>
                            <input
                                type="password"
                                name="password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder={t('register.password')}
                                value={formData.password}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                            )}
                        </div>
                        <div>
                            <input
                                type="password"
                                name="confirmPassword"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder={t('register.confirmPassword')}
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isLoading}
                        >
                            {isLoading ? t('common.loading') : t('register.createAccount')}
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        {t('register.haveAccount')}{' '}
                        <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                            {t('register.loginHere')}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}; 