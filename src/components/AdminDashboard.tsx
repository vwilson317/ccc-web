import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { OperatingHoursSection, OperatingHours } from './admin/OperatingHoursSection';
import { MenuUploadSection } from './admin/MenuUploadSection';

export const AdminDashboard = () => {
    const [menuImage, setMenuImage] = useState<File | null>(null);
    const [operatingHours, setOperatingHours] = useState<OperatingHours[]>([]);
    const [hasChanges, setHasChanges] = useState(false);

    // Track changes whenever operatingHours or menuImage changes
    useEffect(() => {
        // Check if there are any operating hours or a menu image
        setHasChanges(operatingHours.length > 0 || menuImage !== null);
    }, [operatingHours, menuImage]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!hasChanges) return;

        console.log('Operating Hours:', operatingHours);
        console.log('Menu Image:', menuImage);
        toast.success('Changes saved successfully!');
        setHasChanges(false);
    };

    return (
        <div className="container mx-auto px-4 py-8 pb-24">
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
                </form>
            </div>

            {/* Sticky Save Button */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
                <div className="container mx-auto max-w-2xl">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={!hasChanges}
                        className={`w-full p-3 rounded-lg shadow-lg ${
                            hasChanges 
                                ? 'bg-green-500 hover:bg-green-600 text-white' 
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                        {hasChanges ? 'Save Changes' : 'No Changes to Save'}
                    </button>
                </div>
            </div>
        </div>
    );
}; 