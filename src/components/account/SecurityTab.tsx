
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface SecurityTabProps {
  onPasswordUpdate: () => void;
}

export const SecurityTab: React.FC<SecurityTabProps> = ({ onPasswordUpdate }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Password & Security</CardTitle>
        <CardDescription>
          Update your password and security settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="currentPassword">Current Password</Label>
          <Input id="currentPassword" type="password" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="newPassword">New Password</Label>
          <Input id="newPassword" type="password" />
          <p className="text-sm text-bahola-neutral-500">
            Password must be at least 8 characters long and include a number and a special character.
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <Input id="confirmPassword" type="password" />
        </div>
        
        <div className="pt-4 border-t">
          <h4 className="font-medium mb-2">Two-Factor Authentication</h4>
          <p className="text-bahola-neutral-600 text-sm mb-4">
            Add an extra layer of security to your account by enabling two-factor authentication.
          </p>
          <Button variant="outline">Enable 2FA</Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-6">
        <Button variant="outline">Cancel</Button>
        <Button onClick={onPasswordUpdate}>Update Password</Button>
      </CardFooter>
    </Card>
  );
};
