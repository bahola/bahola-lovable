
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
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-bahola-blue-500" />
          Select Time Slot
        </CardTitle>
        <CardDescription>
          Choose a 30-minute time slot for your appointment
        </CardDescription>
      </CardHeader>
      <CardContent>
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
                          className={`flex items-center justify-center px-3 py-2 border rounded-md text-sm cursor-pointer ${
                            !slot.available
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : field.value === slot.value
                              ? "bg-bahola-blue-50 border-bahola-blue-500 text-bahola-blue-700"
                              : "hover:bg-bahola-blue-50 hover:border-bahola-blue-300"
                          }`}
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
