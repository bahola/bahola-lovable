
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { useUserVerification } from '@/hooks/useUserVerification';

export const VerificationStatusCard: React.FC = () => {
  const { verificationStatus, customerType, isLoading, medicalLicense, specialization, clinic, yearsOfPractice } = useUserVerification();

  if (isLoading || customerType !== 'doctor') {
    return null;
  }

  const getStatusIcon = () => {
    switch (verificationStatus) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusBadge = () => {
    switch (verificationStatus) {
      case 'approved':
        return <Badge variant="default" className="bg-green-100 text-green-800">Verified</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending Verification</Badge>;
    }
  };

  const getStatusMessage = () => {
    switch (verificationStatus) {
      case 'approved':
        return 'Your healthcare professional account has been verified and you have access to all professional features.';
      case 'rejected':
        return 'Your healthcare professional verification was rejected. Please contact support for more information.';
      default:
        return 'Your healthcare professional account is under review. Our team will verify your credentials and professional information. This process typically takes 1-2 business days.';
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            {getStatusIcon()}
            Professional Verification Status
          </CardTitle>
          {getStatusBadge()}
        </div>
        <CardDescription>
          Healthcare Professional Account Verification
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {getStatusMessage()}
        </p>
        
        {verificationStatus === 'pending' && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Submitted Information:</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {medicalLicense && (
                <div>
                  <span className="font-medium">Medical License:</span>
                  <p className="text-muted-foreground">{medicalLicense}</p>
                </div>
              )}
              {specialization && (
                <div>
                  <span className="font-medium">Specialization:</span>
                  <p className="text-muted-foreground">{specialization}</p>
                </div>
              )}
              {clinic && (
                <div>
                  <span className="font-medium">Clinic/Hospital:</span>
                  <p className="text-muted-foreground">{clinic}</p>
                </div>
              )}
              {yearsOfPractice && (
                <div>
                  <span className="font-medium">Years of Practice:</span>
                  <p className="text-muted-foreground">{yearsOfPractice}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
