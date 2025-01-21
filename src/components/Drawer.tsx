import { FiUser, FiHome, FiInfo, FiLogIn, FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

interface User {
    id: string;
    username: string;
    email: string;
    isAdmin: boolean;
}

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export const Drawer = ({ isOpen, onClose }: DrawerProps) => {
    const userString = localStorage.getItem('user');
    const user: User | null = userString ? JSON.parse(userString) : null;

    const handleLogout = () => {
        localStorage.removeItem('user');
        toast.success('Successfully logged out!');
        onClose();
        window.location.href = '/';
    };

    return (
        <div
            className={`fixed inset-y-0 right-0 w-64 bg-white shadow-lg transform ${
                isOpen ? 'translate-x-0' : 'translate-x-full'
            } transition-transform duration-300 ease-in-out z-50`}
        >
            <div className="h-full flex flex-col">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    ×
                </button>

                {/* User Profile Section */}
                {user && (
                    <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center space-x-3 mb-4">
                            <FiUser className="text-2xl text-blue-500" />
                            <div>
                                <h3 className="font-medium">{user.username}</h3>
                                <p className="text-sm text-gray-500">{user.email}</p>
                            </div>
                        </div>
                        {/* <div className="text-sm text-gray-600">
                            Account Type: {user.isAdmin ? 'Administrator' : 'Regular User'}
                        </div> */}
                    </div>
                )}

                {/* Navigation Menu */}
                <nav className="flex-1 p-4">
                    <ul className="space-y-2">
                        <li>
                            <Link
                                to="/"
                                className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded"
                                onClick={onClose}
                            >
                                <FiHome />
                                <span>Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/info"
                                className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded"
                                onClick={onClose}
                            >
                                <FiInfo />
                                <span>Info</span>
                            </Link>
                        </li>
                        {user?.isAdmin && (
                            <li>
                                <Link
                                    to="/admin"
                                    className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded"
                                    onClick={onClose}
                                >
                                    <FiUser />
                                    <span>Admin Dashboard</span>
                                </Link>
                            </li>
                        )}
                        {!user ? (
                            <li>
                                <Link
                                    to="/login"
                                    className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded"
                                    onClick={onClose}
                                >
                                    <FiLogIn />
                                    <span>Login</span>
                                </Link>
                            </li>
                        ) : (
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded w-full text-left text-red-500"
                                >
                                    <FiLogOut />
                                    <span>Logout</span>
                                </button>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </div>
    );
};