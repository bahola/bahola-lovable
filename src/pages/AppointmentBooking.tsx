
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageLayout } from '@/components/PageLayout';
import { Form } from '@/components/ui/form';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppointmentDatePicker } from '@/components/appointment/AppointmentDatePicker';
import { AppointmentTimeSlots } from '@/components/appointment/AppointmentTimeSlots';
import { PatientInformationForm } from '@/components/appointment/PatientInformationForm';
import { ConsultationPayment } from '@/components/appointment/ConsultationPayment';
import { generateTimeSlots } from '@/utils/timeSlots';

// Form schema for validation
const formSchema = z.object({
  appointmentDate: z.date({
    required_error: "Please select a date for your appointment",
  }),
  appointmentTime: z.string({
    required_error: "Please select a time slot",
  }),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  paymentMethod: z.enum(["card", "upi"], {
    required_error: "Please select a payment method",
  }),
});

// Appointment pricing
const APPOINTMENT_PRICE = 1000; // ₹1,000

const AppointmentBooking = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [timeSlots, setTimeSlots] = useState(selectedDate ? generateTimeSlots(selectedDate) : []);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      paymentMethod: "card",
    },
  });
  
  // Generate new time slots when the selected date changes
  React.useEffect(() => {
    if (selectedDate) {
      setTimeSlots(generateTimeSlots(selectedDate));
      form.setValue("appointmentDate", selectedDate);
      form.resetField("appointmentTime"); // Reset time slot selection when date changes
    }
  }, [selectedDate, form]);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  // Form submission is now handled by the payment component
  // This is just for form validation
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // The actual submission is handled by the ConsultationPayment component
    console.log("Form validation passed:", values);
  };

  return (
    <PageLayout title="Book In-Person Appointment" description="Schedule your homeopathic consultation with our expert physicians">
      <div className="max-w-4xl mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AppointmentDatePicker
                control={form.control}
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
              />
              
              <AppointmentTimeSlots
                control={form.control}
                selectedDate={selectedDate}
                timeSlots={timeSlots}
              />
            </div>

            <PatientInformationForm control={form.control} />

            <ConsultationPayment
              control={form.control}
              watch={form.watch}
              appointmentPrice={APPOINTMENT_PRICE}
            />
          </form>
        </Form>
      </div>
    </PageLayout>
  );
};

export default AppointmentBooking;
