
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageLayout } from '@/components/PageLayout';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { format, addDays, addMinutes, setHours, setMinutes, isBefore, isAfter, parseISO } from 'date-fns';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Calendar as CalendarIcon, Clock, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

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

// Mock available time slots - in a real app, this would come from an API
const generateTimeSlots = (date: Date) => {
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

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // In a real app, this would call an API to process payment and create the appointment
    console.log("Form values:", values);

    // Show loading toast
    toast.loading("Processing payment...");

    // Simulate payment processing
    setTimeout(() => {
      toast.dismiss();
      toast.success("Payment successful! Appointment confirmed.");
      
      // Redirect to confirmation page
      navigate("/appointment-confirmation");
    }, 2000);
  };

  return (
    <PageLayout title="Book In-Person Appointment" description="Schedule your homeopathic consultation with our expert physicians">
      <div className="max-w-4xl mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Calendar Section */}
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
                    control={form.control}
                    name="appointmentDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormControl>
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={handleDateSelect}
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

              {/* Time Slots Section */}
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
                      control={form.control}
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
            </div>

            {/* Patient Information */}
            <Card>
              <CardHeader>
                <CardTitle>Patient Information</CardTitle>
                <CardDescription>
                  Enter your details for the appointment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="john.doe@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+91 98765 43210" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Consultation Details & Payment Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-bahola-blue-500" />
                  Consultation & Payment Details
                </CardTitle>
                <CardDescription>
                  Complete payment to confirm your appointment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="bg-bahola-blue-50 p-6 rounded-lg mb-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-bahola-blue-700 font-medium">Homeopathic Consultation</p>
                        <p className="text-2xl font-bold text-bahola-blue-800">₹{APPOINTMENT_PRICE.toLocaleString()}</p>
                      </div>
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    </div>
                    
                    <div className="space-y-2 text-sm text-bahola-blue-600">
                      <p className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        30-minute in-person consultation
                      </p>
                      <p className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Expert homeopathic physician assessment
                      </p>
                      <p className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Personalized treatment plan
                      </p>
                      <p className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <strong>15-day follow-up reviews included</strong>
                      </p>
                    </div>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Method</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="card" id="card" />
                              <Label htmlFor="card" className="flex items-center gap-2">
                                <CreditCard className="h-4 w-4" />
                                Credit/Debit Card
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="upi" id="upi" />
                              <Label htmlFor="upi">UPI Payment</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {form.watch("paymentMethod") === "card" && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input id="cardName" placeholder="John Doe" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="mt-1" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" className="mt-1" />
                      </div>
                    </div>
                  </div>
                )}

                {form.watch("paymentMethod") === "upi" && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="upiId">UPI ID</Label>
                      <Input id="upiId" placeholder="yourname@upi" className="mt-1" />
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full bg-bahola-blue-500 hover:bg-bahola-blue-600">
                  Pay ₹{APPOINTMENT_PRICE.toLocaleString()} & Confirm Appointment
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>
    </PageLayout>
  );
};

export default AppointmentBooking;
