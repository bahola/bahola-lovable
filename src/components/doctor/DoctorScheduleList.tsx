
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Edit, Trash2, Coffee } from 'lucide-react';
import { format, parseISO } from 'date-fns';

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

interface DoctorScheduleListProps {
  schedules: DoctorSchedule[];
  onEdit: (schedule: DoctorSchedule) => void;
  onDelete: (scheduleId: string) => void;
}

export const DoctorScheduleList = ({ schedules, onEdit, onDelete }: DoctorScheduleListProps) => {
  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return format(date, 'h:mm a');
  };

  const formatDate = (dateString: string) => {
    return format(parseISO(dateString), 'MMM dd, yyyy');
  };

  if (schedules.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No schedules found</h3>
          <p className="text-gray-500">Get started by adding your first schedule above.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Your Schedules</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {schedules.map((schedule) => (
          <Card key={schedule.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="h-5 w-5" style={{ color: '#2E86AB' }} />
                  {formatDate(schedule.date)}
                </CardTitle>
                <Badge 
                  variant={schedule.is_available ? "default" : "secondary"}
                  style={{ 
                    backgroundColor: schedule.is_available ? '#D4EDDA' : '#F8D7DA',
                    color: schedule.is_available ? '#155724' : '#721c24',
                    border: 'none'
                  }}
                >
                  {schedule.is_available ? 'Available' : 'Unavailable'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>
                  {formatTime(schedule.start_time)} - {formatTime(schedule.end_time)}
                </span>
              </div>
              
              {schedule.break_start_time && schedule.break_end_time && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Coffee className="h-4 w-4" />
                  <span>
                    Break: {formatTime(schedule.break_start_time)} - {formatTime(schedule.break_end_time)}
                  </span>
                </div>
              )}

              <div className="flex justify-end space-x-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(schedule)}
                  className="flex items-center gap-1"
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDelete(schedule.id)}
                  className="flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
