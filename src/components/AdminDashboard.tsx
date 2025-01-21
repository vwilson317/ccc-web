import { useState } from 'react';
import toast from 'react-hot-toast';
import { OperatingHoursSection, OperatingHours } from './admin/OperatingHoursSection';
import { MenuUploadSection } from './admin/MenuUploadSection';

export const AdminDashboard = () => {
    const [menuImage, setMenuImage] = useState<File | null>(null);
    const [operatingHours, setOperatingHours] = useState<OperatingHours[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Operating Hours:', operatingHours);
        console.log('Menu Image:', menuImage);
        toast.success('Changes saved successfully!');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <OperatingHoursSection 
                        operatingHours={operatingHours}
                        onOperatingHoursChange={setOperatingHours}
                    />

                    <MenuUploadSection 
                        menuImage={menuImage}
                        onMenuImageChange={setMenuImage}
                    />

                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
}; 