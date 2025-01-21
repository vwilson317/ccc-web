import { useState } from 'react';
import { FiUpload, FiClock } from 'react-icons/fi';
import toast from 'react-hot-toast';

interface TimeSlot {
    day: string;
    openTime: string;
    closeTime: string;
}

export const AdminDashboard = () => {
    const [menuImage, setMenuImage] = useState<File | null>(null);
    const [schedule, setSchedule] = useState<TimeSlot[]>([
        { day: 'Monday', openTime: '', closeTime: '' },
        { day: 'Tuesday', openTime: '', closeTime: '' },
        { day: 'Wednesday', openTime: '', closeTime: '' },
        { day: 'Thursday', openTime: '', closeTime: '' },
        { day: 'Friday', openTime: '', closeTime: '' },
        { day: 'Saturday', openTime: '', closeTime: '' },
        { day: 'Sunday', openTime: '', closeTime: '' },
    ]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setMenuImage(e.target.files[0]);
            toast.success('Menu image uploaded successfully!');
        }
    };

    const handleTimeChange = (day: string, field: 'openTime' | 'closeTime', value: string) => {
        setSchedule(schedule.map(slot => 
            slot.day === day ? { ...slot, [field]: value } : slot
        ));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle submission to backend
        console.log('Schedule:', schedule);
        console.log('Menu Image:', menuImage);
        
        toast.success('Changes saved successfully!');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Hours Schedule */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <FiClock className="inline" />
                            Operating Hours
                        </h2>
                        {schedule.map((slot) => (
                            <div key={slot.day} className="grid grid-cols-3 gap-4 items-center">
                                <span className="font-medium">{slot.day}</span>
                                <input
                                    type="time"
                                    className="p-2 border rounded"
                                    value={slot.openTime}
                                    onChange={(e) => handleTimeChange(slot.day, 'openTime', e.target.value)}
                                />
                                <input
                                    type="time"
                                    className="p-2 border rounded"
                                    value={slot.closeTime}
                                    onChange={(e) => handleTimeChange(slot.day, 'closeTime', e.target.value)}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Menu Upload */}
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