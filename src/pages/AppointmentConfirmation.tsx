
import React from 'react';
import { PageLayout } from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle, Calendar, MapPin, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const AppointmentConfirmation = () => {
  // In a real app, these values would come from the booking process or URL params
  const mockAppointmentData = {
    date: "May 25, 2025",
    time: "10:30 AM",
    doctor: "Dr. Sharma",
    location: "Bahola Labs Clinic, 123 Health Street, Mumbai",
    bookingReference: "BL-2025052501"
  };

  return (
    <PageLayout title="Appointment Confirmed" description="Your appointment has been successfully booked">
      <div className="max-w-3xl mx-auto text-center">
        <div className="mb-8">
          <CheckCircle className="h-20 w-20 mx-auto text-green-500" />
          <h2 className="text-2xl font-bold mt-4 text-bahola-neutral-800">
            Your appointment has been confirmed!
          </h2>
          <p className="text-bahola-neutral-600 mt-2">
            We have sent a confirmation email with all the details
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader className="bg-bahola-blue-50">
            <CardTitle>Appointment Details</CardTitle>
            <CardDescription>Please arrive 10 minutes before your scheduled time</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-bahola-blue-500" />
                <div>
                  <p className="text-sm text-bahola-neutral-500">Date</p>
                  <p className="font-medium">{mockAppointmentData.date}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-bahola-blue-500" />
                <div>
                  <p className="text-sm text-bahola-neutral-500">Time</p>
                  <p className="font-medium">{mockAppointmentData.time}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-bahola-blue-500" />
                <div>
                  <p className="text-sm text-bahola-neutral-500">Location</p>
                  <p className="font-medium">{mockAppointmentData.location}</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="pt-2">
                <p className="text-sm text-bahola-neutral-500">Booking Reference</p>
                <p className="font-mono font-medium">{mockAppointmentData.bookingReference}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col space-y-2">
            <Button variant="outline" className="w-full" asChild>
              <a href="#" download="appointment.ics">
                Add to Calendar
              </a>
            </Button>
            <Button variant="outline" className="w-full">
              View in Google Maps
            </Button>
          </CardFooter>
        </Card>

        <div className="bg-bahola-blue-50 p-6 rounded-lg">
          <h3 className="font-semibold text-lg mb-2">Prepare for your visit</h3>
          <ul className="text-bahola-neutral-700 text-sm space-y-2 text-left list-disc pl-5 mb-4">
            <li>Bring any previous medical reports or test results</li>
            <li>Note down any symptoms you've been experiencing</li>
            <li>List all current medications and supplements</li>
            <li>Arrive 10 minutes before your scheduled appointment time</li>
          </ul>
          
          <p className="text-sm text-bahola-neutral-600 mt-4">
            Need to reschedule? Please contact us at least 24 hours before your appointment
          </p>
        </div>

        <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center">
          <Button asChild>
            <Link to="/">Back to Home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default AppointmentConfirmation;
