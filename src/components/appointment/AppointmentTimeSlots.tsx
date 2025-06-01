
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Clock } from 'lucide-react';
import { Control } from 'react-hook-form';
import { TimeSlot } from '@/utils/timeSlots';

interface AppointmentTimeSlotsProps {
  control: Control<any>;
  selectedDate: Date | undefined;
  timeSlots: TimeSlot[];
}

export const AppointmentTimeSlots = ({ control, selectedDate, timeSlots }: AppointmentTimeSlotsProps) => {
  return (
    <Card>
      <CardHeader style={{ backgroundColor: '#A8DADC' }} className="rounded-t-lg">
        <CardTitle className="flex items-center gap-2 text-gray-800">
          <Clock className="h-5 w-5" style={{ color: '#2E86AB' }} />
          Select Time Slot
        </CardTitle>
        <CardDescription className="text-gray-700">
          Choose a 30-minute time slot for your appointment
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {selectedDate ? (
          <FormField
            control={control}
            name="appointmentTime"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="grid grid-cols-2 gap-2"
                  >
                    {timeSlots.map((slot) => (
                      <div key={slot.value}>
                        <RadioGroupItem
                          value={slot.value}
                          id={slot.value}
                          disabled={!slot.available}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={slot.value}
                          className={`flex items-center justify-center px-3 py-2 border rounded-md text-sm cursor-pointer transition-all ${
                            !slot.available
                              ? "cursor-not-allowed text-gray-600"
                              : field.value === slot.value
                              ? "text-white font-medium"
                              : "text-gray-700 hover:border-gray-400"
                          }`}
                          style={{
                            backgroundColor: !slot.available 
                              ? '#F8D7DA'  // Booked (Soft Red)
                              : field.value === slot.value 
                              ? '#0066CC'  // Selected
                              : '#D4EDDA', // Available (Soft Green)
                            borderColor: !slot.available 
                              ? '#F8D7DA' 
                              : field.value === slot.value 
                              ? '#0066CC' 
                              : '#D4EDDA'
                          }}
                        >
                          {slot.time}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <p className="text-center text-muted-foreground">
            Please select a date first
          </p>
        )}
      </CardContent>
    </Card>
  );
};
