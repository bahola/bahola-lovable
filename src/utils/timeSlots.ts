
import { setHours, setMinutes, addMinutes, isBefore, format } from 'date-fns';

export interface TimeSlot {
  time: string;
  value: string;
  available: boolean;
}

// Mock available time slots - in a real app, this would come from an API
export const generateTimeSlots = (date: Date): TimeSlot[] => {
  // Clinic hours: 9 AM to 5 PM
  const slots = [];
  
  // Start at 9 AM
  let currentTime = setHours(setMinutes(new Date(date), 0), 9);
  const endTime = setHours(setMinutes(new Date(date), 0), 17);
  
  while (isBefore(currentTime, endTime)) {
    slots.push({
      time: format(currentTime, "h:mm aa"),
      value: format(currentTime, "HH:mm"),
      available: Math.random() > 0.3 // Simulate some slots being unavailable
    });
    currentTime = addMinutes(currentTime, 30); // 30-minute slots
  }
  
  return slots;
};
