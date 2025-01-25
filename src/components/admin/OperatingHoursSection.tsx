import { useState, useRef } from 'react';
import { FiClock, FiTrash2, FiCheck, FiX } from 'react-icons/fi';
import DatePicker from 'react-datepicker';
import { format, isSameDay } from 'date-fns';
import toast from 'react-hot-toast';
import "react-datepicker/dist/react-datepicker.css";

export interface OperatingHours {
    date: Date;
    openTime: string;
    closeTime: string;
    id: string;
}

interface OperatingHoursSectionProps {
    operatingHours: OperatingHours[];
    onOperatingHoursChange: (hours: OperatingHours[]) => void;
}

export const OperatingHoursSection = ({ operatingHours, onOperatingHoursChange }: OperatingHoursSectionProps) => {
    const [selectedDates, setSelectedDates] = useState<Date[]>([new Date()]);
    const [openTime, setOpenTime] = useState('10:00');
    const [closeTime, setCloseTime] = useState('19:00');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editOpenTime, setEditOpenTime] = useState('');
    const [editCloseTime, setEditCloseTime] = useState('');
    const editOpenTimeRef = useRef<HTMLInputElement>(null);

    // Helper function to check if a date has configured hours
    const hasConfiguredHours = (date: Date) => {
        return operatingHours.some(hours => 
            isSameDay(hours.date, date)
        );
    };

    // Custom day class names to show configured hours
    const getDayClassNames = (date: Date) => {
        return hasConfiguredHours(date) ? "configured-hours" : '';
    };

    const handleDateChange = (date: Date) => {
        if (!date) return;
        
        // Check if date already has configured hours
        if (hasConfiguredHours(date)) {
            toast.error('This date already has operating hours configured');
            return;
        }
        
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

        // Create a separate entry for each selected date
        const newHours = selectedDates.map(date => ({
            date,
            openTime,
            closeTime,
            id: `${Date.now()}-${format(date, 'yyyy-MM-dd')}`
        }));

        onOperatingHoursChange([...operatingHours, ...newHours]);
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

    const handleStartEdit = (hours: OperatingHours) => {
        setEditingId(hours.id);
        setEditOpenTime(hours.openTime);
        setEditCloseTime(hours.closeTime);
        // Set focus after state updates
        setTimeout(() => {
            editOpenTimeRef.current?.focus();
        }, 0);
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditOpenTime('');
        setEditCloseTime('');
    };

    const handleSaveEdit = (id: string) => {
        onOperatingHoursChange(
            operatingHours.map(hours => 
                hours.id === id
                    ? { ...hours, openTime: editOpenTime, closeTime: editCloseTime }
                    : hours
            )
        );
        setEditingId(null);
        toast.success('Operating hours updated');
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
                            dayClassName={getDayClassNames}
                        />
                    </div>
                    <style>{`
                        .configured-hours {
                            background-color: #e5e7eb !important;
                            border-radius: 0.25rem;
                            position: relative;
                        }
                        .configured-hours::after {
                            content: '';
                            position: absolute;
                            bottom: 2px;
                            left: 50%;
                            transform: translateX(-50%);
                            width: 4px;
                            height: 4px;
                            background-color: #3b82f6;
                            border-radius: 50%;
                        }
                    `}</style>
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
                        {operatingHours
                            .sort((a, b) => a.date.getTime() - b.date.getTime())
                            .map((hours) => (
                                <div 
                                    key={hours.id}
                                    className={`flex items-center justify-between p-3 rounded transition-colors ${
                                        editingId === hours.id 
                                            ? 'bg-white border' 
                                            : 'bg-gray-50 hover:bg-gray-100 cursor-pointer'
                                    }`}
                                    onClick={() => {
                                        if (editingId !== hours.id) {
                                            handleStartEdit(hours);
                                        }
                                    }}
                                >
                                    <div className="flex-grow">
                                        <div className="font-medium">
                                            {format(hours.date, 'EEEE, MMMM d, yyyy')}
                                        </div>
                                        {editingId === hours.id ? (
                                            <div className="flex items-center gap-2 mt-1" onClick={e => e.stopPropagation()}>
                                                <input
                                                    type="time"
                                                    ref={editOpenTimeRef}
                                                    value={editOpenTime}
                                                    onChange={(e) => setEditOpenTime(e.target.value)}
                                                    className="p-1 border rounded text-sm"
                                                />
                                                <span className="text-gray-500">-</span>
                                                <input
                                                    type="time"
                                                    value={editCloseTime}
                                                    onChange={(e) => setEditCloseTime(e.target.value)}
                                                    className="p-1 border rounded text-sm"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleSaveEdit(hours.id)}
                                                    className="text-green-500 hover:text-green-700"
                                                >
                                                    <FiCheck />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={handleCancelEdit}
                                                    className="text-gray-500 hover:text-gray-700"
                                                >
                                                    <FiX />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="text-sm text-gray-600">
                                                {hours.openTime} - {hours.closeTime}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteHours(hours.id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <FiTrash2 />
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
}; 