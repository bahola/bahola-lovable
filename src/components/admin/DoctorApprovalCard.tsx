import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { CheckCircle, XCircle, Clock, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface PendingDoctor {
  id: string;
  name: string;
  email: string;
  phone: string;
  medical_license: string;
  specialization: string;
  clinic?: string;
  years_of_practice?: number;
  created_at: string;
}

export const DoctorApprovalCard: React.FC = () => {
  const [pendingDoctors, setPendingDoctors] = useState<PendingDoctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => {
    fetchPendingDoctors();
  }, []);

  const fetchPendingDoctors = async () => {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('id, name, email, phone, medical_license, specialization, clinic, years_of_practice, created_at')
        .eq('customer_type', 'doctor')
        .eq('verification_status', 'pending')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching pending doctors:', error);
        toast.error('Failed to load pending doctor applications');
        return;
      }

      // Filter and map data to ensure required fields exist
      const validDoctors = (data || [])
        .filter(doc => doc.medical_license && doc.specialization)
        .map(doc => ({
          id: doc.id,
          name: doc.name,
          email: doc.email,
          phone: doc.phone,
          medical_license: doc.medical_license!,
          specialization: doc.specialization!,
          clinic: doc.clinic,
          years_of_practice: doc.years_of_practice,
          created_at: doc.created_at,
        }));

      setPendingDoctors(validDoctors);
    } catch (error) {
      console.error('Error fetching pending doctors:', error);
      toast.error('Failed to load pending doctor applications');
    } finally {
      setIsLoading(false);
    }
  };

  const updateSwellAccount = async (email: string, status: 'approved' | 'rejected') => {
    console.log(`Updating Swell account for ${email} with status: ${status}`);
    
    const { data, error } = await supabase.functions.invoke('update-swell-account', {
      body: {
        email,
        group: status === 'approved' ? 'doctor' : undefined,
        verification_status: status
      }
    });

    if (error) {
      console.error('Swell account update error:', error);
      throw new Error(`Failed to update Swell account: ${error.message}`);
    }

    console.log('Swell account update response:', data);
    return data;
  };

  const sendNotificationEmail = async (doctorEmail: string, doctorName: string, status: 'approved' | 'rejected') => {
    console.log(`Sending ${status} notification email to ${doctorEmail}`);
    
    const { data, error } = await supabase.functions.invoke('send-doctor-notification', {
      body: {
        doctorEmail,
        doctorName,
        status,
        adminEmail: 'admin@baholalabs.in' // Admin notification recipient
      }
    });

    if (error) {
      console.error('Email notification error:', error);
      // Don't throw - email failure shouldn't block the approval flow
      return null;
    }

    console.log('Email notification response:', data);
    return data;
  };

  const handleApproval = async (doctorId: string, status: 'approved' | 'rejected') => {
    setProcessingId(doctorId);
    
    try {
      const doctor = pendingDoctors.find(d => d.id === doctorId);
      if (!doctor) {
        toast.error('Doctor not found');
        return;
      }

      // Update Swell account first
      if (status === 'approved') {
        console.log('Approving doctor - updating Swell account...');
        try {
          await updateSwellAccount(doctor.email, 'approved');
          toast.success('Swell account updated to doctor group');
        } catch (error) {
          console.error('Failed to update Swell account:', error);
          toast.error('Failed to update Swell account. Please try again.');
          return;
        }
      } else {
        // For rejection, also update Swell to mark as rejected
        try {
          await updateSwellAccount(doctor.email, 'rejected');
        } catch (error) {
          console.warn('Failed to update Swell account for rejection:', error);
          // Continue with Supabase update even if Swell update fails for rejection
        }
      }

      // Update the status in Supabase
      const { error } = await supabase
        .from('customers')
        .update({ verification_status: status })
        .eq('id', doctorId);

      if (error) {
        console.error('Error updating doctor status:', error);
        toast.error('Failed to update doctor status in database');
        return;
      }

      // Send notification email
      try {
        await sendNotificationEmail(doctor.email, doctor.name, status);
        toast.success(`Doctor ${status === 'approved' ? 'approved' : 'rejected'} and notification email sent`);
      } catch (emailError) {
        console.warn('Email notification failed:', emailError);
        toast.success(`Doctor ${status === 'approved' ? 'approved' : 'rejected'} (email notification failed)`);
      }
      
      // Remove the doctor from the pending list
      setPendingDoctors(prev => prev.filter(doc => doc.id !== doctorId));
    } catch (error) {
      console.error('Error updating doctor status:', error);
      toast.error('Failed to update doctor status');
    } finally {
      setProcessingId(null);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Pending Doctor Approvals
          </CardTitle>
          <CardDescription>Review and approve healthcare professional applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Pending Doctor Approvals
          <Badge variant="secondary">{pendingDoctors.length}</Badge>
        </CardTitle>
        <CardDescription>Review and approve healthcare professional applications</CardDescription>
      </CardHeader>
      <CardContent>
        {pendingDoctors.length === 0 ? (
          <div className="text-center py-8">
            <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No pending doctor applications</p>
          </div>
        ) : (
          <div className="space-y-6">
            {pendingDoctors.map((doctor) => (
              <div key={doctor.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h4 className="font-medium">{doctor.name}</h4>
                    <p className="text-sm text-muted-foreground">{doctor.email}</p>
                    <p className="text-sm text-muted-foreground">{doctor.phone}</p>
                  </div>
                  <Badge variant="outline">
                    Applied {new Date(doctor.created_at).toLocaleDateString()}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Medical License:</span>
                    <p className="text-muted-foreground">{doctor.medical_license}</p>
                  </div>
                  <div>
                    <span className="font-medium">Specialization:</span>
                    <p className="text-muted-foreground">{doctor.specialization}</p>
                  </div>
                  {doctor.clinic && (
                    <div>
                      <span className="font-medium">Clinic/Hospital:</span>
                      <p className="text-muted-foreground">{doctor.clinic}</p>
                    </div>
                  )}
                  {doctor.years_of_practice && (
                    <div>
                      <span className="font-medium">Years of Practice:</span>
                      <p className="text-muted-foreground">{doctor.years_of_practice}</p>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    onClick={() => handleApproval(doctor.id, 'approved')}
                    disabled={processingId === doctor.id}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleApproval(doctor.id, 'rejected')}
                    disabled={processingId === doctor.id}
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
