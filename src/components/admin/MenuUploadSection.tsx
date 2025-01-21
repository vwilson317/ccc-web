import { FiUpload } from 'react-icons/fi';
import toast from 'react-hot-toast';

interface MenuUploadSectionProps {
    menuImage: File | null;
    onMenuImageChange: (file: File | null) => void;
}

export const MenuUploadSection = ({ menuImage, onMenuImageChange }: MenuUploadSectionProps) => {
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            onMenuImageChange(e.target.files[0]);
            toast.success('Menu image uploaded successfully!');
        }
    };

    return (
        <div className="space-y-2">
            <h2 className="text-xl font-semibold flex items-center gap-2">
                <FiUpload className="inline" />
                Menu Upload
            </h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="menu-upload"
                />
                <label
                    htmlFor="menu-upload"
                    className="cursor-pointer block text-center"
                >
                    <div className="space-y-2">
                        <p className="text-gray-600">
                            {menuImage ? menuImage.name : 'Click to upload menu image'}
                        </p>
                        <button
                            type="button"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Choose File
                        </button>
                    </div>
                </label>
            </div>
        </div>
    );
};