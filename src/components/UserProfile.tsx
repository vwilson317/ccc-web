import { FiUser } from 'react-icons/fi';

interface User {
    id: string;
    username: string;
    email: string;
    isAdmin: boolean;
}

export const UserProfile = () => {
    const userString = localStorage.getItem('user');
    const user: User = userString ? JSON.parse(userString) : null;

    if (!user) {
        return <div>Please log in to view your profile.</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
                <div className="text-center mb-6">
                    <FiUser className="mx-auto text-4xl text-blue-500 mb-2" />
                    <h1 className="text-2xl font-bold">User Profile</h1>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Username</label>
                        <p className="mt-1 p-2 w-full bg-gray-50 rounded">{user.username}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Email</label>
                        <p className="mt-1 p-2 w-full bg-gray-50 rounded">{user.email}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Account Type</label>
                        <p className="mt-1 p-2 w-full bg-gray-50 rounded">
                            {user.isAdmin ? 'Administrator' : 'Regular User'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}; 