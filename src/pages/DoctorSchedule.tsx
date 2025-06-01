
import React, { useState, useEffect } from 'react';
import { PageLayout } from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Plus } from 'lucide-react';
import { DoctorScheduleForm } from '@/components/doctor/DoctorScheduleForm';
import { DoctorScheduleList } from '@/components/doctor/DoctorScheduleList';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ProtectedDoctorRoute } from '@/components/auth/ProtectedDoctorRoute';

interface DoctorSchedule {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  is_available: boolean;
  break_start_time?: string;
  break_end_time?: string;
  created_at: string;
  updated_at: string;
}

const DoctorSchedule = () => {
  const [schedules, setSchedules] = useState<DoctorSchedule[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<DoctorSchedule | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchSchedules = async () => {
    try {
      const { data, error } = await supabase
        .from('doctor_schedules')
        .select('*')
        .order('date', { ascending: true });

      if (error) throw error;
      setSchedules(data || []);
    } catch (error) {
      console.error('Error fetching schedules:', error);
      toast({
        title: "Error",
        description: "Failed to fetch schedules",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const handleScheduleSuccess = () => {
    fetchSchedules();
    setShowAddForm(false);
    setEditingSchedule(null);
    toast({
      title: "Success",
      description: "Schedule updated successfully"
    });
  };

  const handleEdit = (schedule: DoctorSchedule) => {
    setEditingSchedule(schedule);
    setShowAddForm(true);
  };

  const handleDelete = async (scheduleId: string) => {
    try {
      const { error } = await supabase
        .from('doctor_schedules')
        .delete()
        .eq('id', scheduleId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Schedule deleted successfully"
      });
      
      fetchSchedules();
    } catch (error) {
      console.error('Error deleting schedule:', error);
      toast({
        title: "Error",
        description: "Failed to delete schedule",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <PageLayout title="Doctor Schedule" description="Manage your availability">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </PageLayout>
    );
  }

  return (
    <ProtectedDoctorRoute>
      <PageLayout title="Doctor Schedule Management" description="Set your available time slots for patient appointments">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header Section */}
          <Card>
            <CardHeader style={{ backgroundColor: '#A8DADC' }} className="rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <Calendar className="h-6 w-6" style={{ color: '#2E86AB' }} />
                Schedule Management
              </CardTitle>
              <CardDescription className="text-gray-700">
                Manage your availability and set working hours for patient consultations
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5" style={{ color: '#2E86AB' }} />
                    <span className="text-gray-700">Total Schedules: {schedules.length}</span>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    setEditingSchedule(null);
                    setShowAddForm(true);
                  }}
                  className="flex items-center gap-2"
                  style={{ backgroundColor: '#2E86AB' }}
                >
                  <Plus className="h-4 w-4" />
                  Add Schedule
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Add/Edit Form */}
          {showAddForm && (
            <Card>
              <CardHeader>
                <CardTitle>
                  {editingSchedule ? 'Edit Schedule' : 'Add New Schedule'}
                </CardTitle>
                <CardDescription>
                  {editingSchedule 
                    ? 'Update your existing schedule' 
                    : 'Set your available time slots for a specific date'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DoctorScheduleForm
                  schedule={editingSchedule}
                  onSuccess={handleScheduleSuccess}
                  onCancel={() => {
                    setShowAddForm(false);
                    setEditingSchedule(null);
                  }}
                />
              </CardContent>
            </Card>
          )}

          {/* Schedules List */}
          <DoctorScheduleList
            schedules={schedules}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </PageLayout>
    </ProtectedDoctorRoute>
  );
};

export default DoctorSchedule;
