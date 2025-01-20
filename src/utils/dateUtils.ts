interface OperatingHours {
  date: string;  // YYYY-MM-DD
  open: string;  // HH:MM
  close: string; // HH:MM
}

interface AvailabilityInfo {
  isOpen: boolean;
  message: string;
  nextOpenDate: Date | null;
  nextOpenHours: OperatingHours | null;
}

export const getAvailabilityInfo = (hours?: OperatingHours[]): AvailabilityInfo => {
  if (!hours || hours.length === 0) {
    return {
      isOpen: false,
      message: "Hours unavailable",
      nextOpenDate: null,
      nextOpenHours: null
    };
  }

  const now = new Date();
  const currentDate = now.toISOString().split('T')[0];  // YYYY-MM-DD
  const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  // Sort hours by date
  const sortedHours = [...hours].sort((a, b) => a.date.localeCompare(b.date));

  // Check if open today
  const todayHours = sortedHours.find(h => h.date === currentDate);
  
  if (todayHours) {
    // Convert times to comparable numbers (HHMM)
    const currentTimeNum = parseInt(currentTime.replace(':', ''));
    const openTimeNum = parseInt(todayHours.open.replace(':', ''));
    const closeTimeNum = parseInt(todayHours.close.replace(':', ''));

    // Check if currently open
    if (currentTimeNum >= openTimeNum && currentTimeNum < closeTimeNum) {
      return {
        isOpen: true,
        message: `Open today until ${todayHours.close}`,
        nextOpenDate: now,
        nextOpenHours: todayHours
      };
    }

    // Check if opening later today
    if (currentTimeNum < openTimeNum) {
      return {
        isOpen: false,
        message: `Opens today at ${todayHours.open}`,
        nextOpenDate: now,
        nextOpenHours: todayHours
      };
    }
  }

  // Find next open date
  const nextOpenDay = sortedHours.find(h => h.date > currentDate);
  
  if (nextOpenDay) {
    const nextDate = new Date(nextOpenDay.date);
    return {
      isOpen: false,
      message: `Next open ${formatDate(nextDate)} at ${nextOpenDay.open}`,
      nextOpenDate: nextDate,
      nextOpenHours: nextOpenDay
    };
  }

  return {
    isOpen: false,
    message: "No upcoming dates",
    nextOpenDate: null,
    nextOpenHours: null
  };
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });
};