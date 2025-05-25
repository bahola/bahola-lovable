
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { CalendarIcon } from 'lucide-react';
import { addDays, isBefore, isAfter } from 'date-fns';
import { Control } from 'react-hook-form';

interface AppointmentDatePickerProps {
  control: Control<any>;
  selectedDate: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
}

export const AppointmentDatePicker = ({ control, selectedDate, onDateSelect }: AppointmentDatePickerProps) => {
  // Function to disable past dates and weekends
  const disabledDates = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Disable past dates
    if (isBefore(date, today)) {
      return true;
    }
    
    // Disable dates more than 30 days in the future
    const maxDate = addDays(today, 30);
    if (isAfter(date, maxDate)) {
      return true;
    }
    
    // Optionally disable weekends (0 is Sunday, 6 is Saturday)
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-bahola-blue-500" />
          Select Appointment Date
        </CardTitle>
        <CardDescription>
          Choose a date for your in-person consultation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormField
          control={control}
          name="appointmentDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormControl>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={onDateSelect}
                  disabled={disabledDates}
                  className="p-3 pointer-events-auto"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};
