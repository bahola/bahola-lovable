import React, { useState, useEffect } from 'react';
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { CheckCircle, XCircle, Clock, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ProfessionalDetailsFields } from './ProfessionalDetailsFields';

interface PendingProfessional {
  id: string;
  name: string;
  email: string;
  phone: string;
  customer_type: 'doctor' | 'pharmacy' | 'student';
  medical_license?: string;
  specialization?: string;
  clinic?: string;
  years_of_practice?: number;
  pharmacy_license?: string;
  pharmacy_name?: string;
  gst_number?: string;
  student_id?: string;
  institution_name?: string;
  course?: string;
  expected_graduation?: string;
  created_at: string;
}

const TYPE_LABELS: Record<string, string> = {
  doctor: 'Doctor',
  pharmacy: 'Pharmacy',
  student: 'Student',
};

const TYPE_COLORS: Record<string, string> = {
  doctor: 'bg-blue-100 text-blue-800',
  pharmacy: 'bg-green-100 text-green-800',
  student: 'bg-purple-100 text-purple-800',
};

export const DoctorApprovalCard: React.FC = () => {
  const [pending, setPending] = useState<PendingProfessional[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => { fetchPending(); }, []);

  const fetchPending = async () => {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('id, name, email, phone, customer_type, medical_license, specialization, clinic, years_of_practice, pharmacy_license, pharmacy_name, gst_number, student_id, institution_name, course, expected_graduation, created_at')
        .in('customer_type', ['doctor', 'pharmacy', 'student'])
        .eq('verification_status', 'pending')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching pending professionals:', error);
        toast.error('Failed to load pending applications');
        return;
      }

      setPending((data || []) as PendingProfessional[]);
    } catch (error) {
      console.error('Error fetching pending professionals:', error);
      toast.error('Failed to load pending applications');
    } finally {
      setIsLoading(false);
    }
  };

  const updateSwellAccount = async (prof: PendingProfessional, status: 'approved' | 'rejected') => {
    const nameParts = prof.name.split(' ');
    const { data, error } = await supabase.functions.invoke('update-swell-account', {
      body: {
        email: prof.email,
        group: status === 'approved' ? prof.customer_type : undefined,
        verification_status: status,
        first_name: nameParts[0],
        last_name: nameParts.slice(1).join(' ') || '',
        phone: prof.phone,
      }
    });
    if (error) throw new Error(`Failed to update Swell account: ${error.message}`);
    return data;
  };

  const sendNotificationEmail = async (email: string, name: string, status: 'approved' | 'rejected') => {
    const { data, error } = await supabase.functions.invoke('send-doctor-notification', {
      body: { doctorEmail: email, doctorName: name, status, adminEmail: 'admin@baholalabs.in' }
    });
    if (error) { console.error('Email notification error:', error); return null; }
    return data;
  };

  const handleApproval = async (id: string, status: 'approved' | 'rejected') => {
    setProcessingId(id);
    try {
      const prof = pending.find(p => p.id === id);
      if (!prof) { toast.error('Application not found'); return; }
      const label = TYPE_LABELS[prof.customer_type] || prof.customer_type;

      if (status === 'approved') {
        try {
          await updateSwellAccount(prof, 'approved');
          toast.success(`Swell account created/updated with ${label} group`);
        } catch (error) {
          console.error('Failed to update Swell account:', error);
          toast.error('Failed to update Swell account. Please try again.');
          return;
        }
      } else {
        try { await updateSwellAccount(prof, 'rejected'); } catch (e) { console.warn('Swell update for rejection failed:', e); }
      }

      const { error } = await supabase
        .from('customers')
        .update({ verification_status: status })
        .eq('id', id);

      if (error) { toast.error('Failed to update status in database'); return; }

      try {
        await sendNotificationEmail(prof.email, prof.name, status);
        toast.success(`${label} ${status} and notification sent`);
      } catch { toast.success(`${label} ${status} (email notification failed)`); }

      setPending(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    } finally {
      setProcessingId(null);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5" />Pending Professional Approvals</CardTitle>
          <CardDescription>Review and approve professional applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">{[1, 2, 3].map(i => <Skeleton key={i} className="h-32 w-full" />)}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Pending Professional Approvals
          <Badge variant="secondary">{pending.length}</Badge>
        </CardTitle>
        <CardDescription>Review and approve professional applications</CardDescription>
      </CardHeader>
      <CardContent>
        {pending.length === 0 ? (
          <div className="text-center py-8">
            <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No pending professional applications</p>
          </div>
        ) : (
          <div className="space-y-6">
            {pending.map((prof) => (
              <div key={prof.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h4 className="font-medium">{prof.name}</h4>
                    <p className="text-sm text-muted-foreground">{prof.email}</p>
                    <p className="text-sm text-muted-foreground">{prof.phone}</p>
                  </div>
                  <div className="flex gap-2">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${TYPE_COLORS[prof.customer_type] || ''}`}>
                      {TYPE_LABELS[prof.customer_type] || prof.customer_type}
                    </span>
                    <Badge variant="outline">
                      Applied {new Date(prof.created_at).toLocaleDateString()}
                    </Badge>
                  </div>
                </div>

                <ProfessionalDetailsFields professional={prof} />

                <div className="flex gap-2 pt-2">
                  <Button size="sm" onClick={() => handleApproval(prof.id, 'approved')} disabled={processingId === prof.id} className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="h-4 w-4 mr-1" />Approve
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleApproval(prof.id, 'rejected')} disabled={processingId === prof.id}>
                    <XCircle className="h-4 w-4 mr-1" />Reject
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
