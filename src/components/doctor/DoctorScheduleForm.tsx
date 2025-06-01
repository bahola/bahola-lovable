
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const scheduleSchema = z.object({
  date: z.string().min(1, "Date is required"),
  start_time: z.string().min(1, "Start time is required"),
  end_time: z.string().min(1, "End time is required"),
  is_available: z.boolean().default(true),
  break_start_time: z.string().optional(),
  break_end_time: z.string().optional(),
}).refine((data) => {
  if (data.start_time >= data.end_time) {
    return false;
  }
  if (data.break_start_time && data.break_end_time) {
    return data.break_start_time < data.break_end_time &&
           data.break_start_time >= data.start_time &&
           data.break_end_time <= data.end_time;
  }
  if ((data.break_start_time && !data.break_end_time) || (!data.break_start_time && data.break_end_time)) {
    return false;
  }
  return true;
}, {
  message: "Invalid time configuration",
  path: ["end_time"]
});

interface DoctorScheduleFormProps {
  schedule?: {
    id: string;
    date: string;
    start_time: string;
    end_time: string;
    is_available: boolean;
    break_start_time?: string;
    break_end_time?: string;
  } | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export const DoctorScheduleForm = ({ schedule, onSuccess, onCancel }: DoctorScheduleFormProps) => {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof scheduleSchema>>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      date: schedule?.date || '',
      start_time: schedule?.start_time || '09:00',
      end_time: schedule?.end_time || '17:00',
      is_available: schedule?.is_available ?? true,
      break_start_time: schedule?.break_start_time || '',
      break_end_time: schedule?.break_end_time || '',
    },
  });

  const onSubmit = async (values: z.infer<typeof scheduleSchema>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to manage schedules",
          variant: "destructive"
        });
        return;
      }

      const scheduleData = {
        doctor_id: user.id,
        date: values.date,
        start_time: values.start_time,
        end_time: values.end_time,
        is_available: values.is_available,
        break_start_time: values.break_start_time || null,
        break_end_time: values.break_end_time || null,
      };

      let error;
      if (schedule) {
        // Update existing schedule
        const result = await supabase
          .from('doctor_schedules')
          .update(scheduleData)
          .eq('id', schedule.id);
        error = result.error;
      } else {
        // Create new schedule
        const result = await supabase
          .from('doctor_schedules')
          .insert([scheduleData]);
        error = result.error;
      }

      if (error) throw error;

      onSuccess();
    } catch (error: any) {
      console.error('Error saving schedule:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to save schedule",
        variant: "destructive"
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="is_available"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Available</FormLabel>
                  <div className="text-sm text-muted-foreground">
                    Mark this schedule as available for bookings
                  </div>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="start_time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="end_time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="break_start_time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Break Start Time (Optional)</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="break_end_time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Break End Time (Optional)</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" style={{ backgroundColor: '#2E86AB' }}>
            {schedule ? 'Update Schedule' : 'Add Schedule'}
          </Button>
        </div>
      </form>
    </Form>
  );
};
