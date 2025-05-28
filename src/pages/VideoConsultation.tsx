
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
import { VideoConsultationPayment } from '@/components/appointment/VideoConsultationPayment';
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

// Video consultation pricing
const VIDEO_CONSULTATION_PRICE = 800; // ₹800

const VideoConsultation = () => {
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
    // The actual submission is handled by the VideoConsultationPayment component
    console.log("Form validation passed:", values);
  };

  return (
    <PageLayout title="Book Video Consultation" description="Schedule your online homeopathic consultation with our expert physicians">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 p-6 bg-bahola-navy-50 rounded-lg border-l-4 border-bahola-navy-950">
          <h2 className="text-xl font-bold text-bahola-navy-950 mb-2 font-helvetica">Convenient Online Consultation</h2>
          <p className="text-bahola-navy-700 font-serif">Connect with our homeopathic experts from the comfort of your home through secure video consultation.</p>
        </div>
        
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

            <VideoConsultationPayment
              control={form.control}
              watch={form.watch}
              consultationPrice={VIDEO_CONSULTATION_PRICE}
            />
          </form>
        </Form>
      </div>
    </PageLayout>
  );
};

export default VideoConsultation;
