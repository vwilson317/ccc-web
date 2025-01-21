import { useState } from 'react';
import { FiClock, FiTrash2 } from 'react-icons/fi';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import "react-datepicker/dist/react-datepicker.css";

export interface OperatingHours {
    dates: Date[];
    openTime: string;
    closeTime: string;
    id: string;
}

interface OperatingHoursSectionProps {
    operatingHours: OperatingHours[];
    onOperatingHoursChange: (hours: OperatingHours[]) => void;
}

export const OperatingHoursSection = ({ operatingHours, onOperatingHoursChange }: OperatingHoursSectionProps) => {
    const [selectedDates, setSelectedDates] = useState<Date[]>([]);
    const [openTime, setOpenTime] = useState('10:00');
    const [closeTime, setCloseTime] = useState('19:00');

    const handleDateChange = (date: Date) => {
        if (!date) return;
        
        // Check if date is already selected
        const dateExists = selectedDates.some(
            selectedDate => format(selectedDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
        );

        if (dateExists) {
            // Remove date if already selected
            setSelectedDates(selectedDates.filter(
                selectedDate => format(selectedDate, 'yyyy-MM-dd') !== format(date, 'yyyy-MM-dd')
            ));
        } else {
            // Add new date
            setSelectedDates([...selectedDates, date]);
        }
    };

    const handleAddHours = () => {
        if (selectedDates.length === 0 || !openTime || !closeTime) {
            toast.error('Please select dates and operating hours');
            return;
        }

        const newHours: OperatingHours = {
            dates: [...selectedDates],
            openTime,
            closeTime,
            id: Date.now().toString()
        };

        onOperatingHoursChange([...operatingHours, newHours]);
        setSelectedDates([]);
        setOpenTime('10:00');
        setCloseTime('19:00');
        toast.success('Operating hours added successfully!');
    };

    const handleDeleteHours = (id: string) => {
        onOperatingHoursChange(operatingHours.filter(hours => hours.id !== id));
        toast.success('Operating hours removed');
    };

    const handleRemoveSelectedDate = (dateToRemove: Date) => {
        setSelectedDates(selectedDates.filter(date => 
            format(date, 'yyyy-MM-dd') !== format(dateToRemove, 'yyyy-MM-dd')
        ));
    };

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
                <FiClock className="inline" />
                Operating Hours
            </h2>
            
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Select Dates</label>
                    <div className="calendar-wrapper w-full">
                        <DatePicker
                            selected={selectedDates[0] || new Date()}
                            onChange={(date) => handleDateChange(date || new Date())}
                            highlightDates={selectedDates}
                            inline
                            dateFormat="MMMM d, yyyy"
                            calendarClassName="border rounded"
                        />
                    </div>
                    {selectedDates.length > 0 && (
                        <div className="mt-4">
                            <h4 className="text-sm font-medium text-gray-600 mb-2">Selected Dates:</h4>
                            <div className="space-y-2 bg-gray-50 rounded-lg p-3">
                                {selectedDates.map((date, index) => (
                                    <div 
                                        key={index}
                                        className="flex items-center justify-between py-2 px-3 bg-white rounded border"
                                    >
                                        <span className="text-gray-700">
                                            {format(date, 'EEEE, MMMM d, yyyy')}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveSelectedDate(date)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <FiTrash2 />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Open Time</label>
                        <input
                            type="time"
                            className="w-full p-2 border rounded"
                            value={openTime}
                            onChange={(e) => setOpenTime(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Close Time</label>
                        <input
                            type="time"
                            className="w-full p-2 border rounded"
                            value={closeTime}
                            onChange={(e) => setCloseTime(e.target.value)}
                        />
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleAddHours}
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Add Operating Hours
                </button>
            </div>

            {/* Operating Hours Summary */}
            {operatingHours.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-lg font-medium mb-2">Configured Operating Hours</h3>
                    <div className="space-y-2">
                        {operatingHours.map((hours) => (
                            <div 
                                key={hours.id}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded"
                            >
                                <div>
                                    <div className="font-medium">
                                        {hours.dates.map(date => 
                                            format(date, 'MMM dd, yyyy')
                                        ).join(', ')}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        {hours.openTime} - {hours.closeTime}
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleDeleteHours(hours.id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <FiTrash2 />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}; 