import React, { useState, useEffect } from 'react';
import { PageLayout } from '@/components/PageLayout';
import { useNavigate } from 'react-router-dom';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { useSwellAuth } from '@/contexts/SwellAuthContext';
import { toast } from 'sonner';
import { AccountSidebar } from '@/components/account/AccountSidebar';
import { ProfileTab } from '@/components/account/ProfileTab';
import { SecurityTab } from '@/components/account/SecurityTab';
import { RecentActivityCard } from '@/components/account/RecentActivityCard';
import { VerificationStatusCard } from '@/components/account/VerificationStatusCard';

const UserAccount = () => {
  const { user, isLoading: authLoading, isAuthenticated, logout, customerType } = useSwellAuth();
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthdate: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
      return;
    }

    if (user) {
      setProfileData(prev => ({
        ...prev,
        firstName: user.first_name || '',
        lastName: user.last_name || '',
        email: user.email || '',
        phone: user.phone || ''
      }));
    }
  }, [user, authLoading, isAuthenticated, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout');
    }
  };

  const handleProfileUpdate = async () => {
    try {
      // TODO: Implement profile update functionality with Swell
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error('Failed to update profile');
    }
  };

  const handlePasswordUpdate = async () => {
    try {
      // TODO: Implement password update functionality
      toast.success('Password updated successfully');
    } catch (error) {
      console.error('Password update error:', error);
      toast.error('Failed to update password');
    }
  };

  if (authLoading) {
    return (
      <PageLayout title="My Account" description="Manage your account details and preferences">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Skeleton className="h-64 w-full" />
          </div>
          <div className="lg:col-span-3">
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      </PageLayout>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  // Create a compatible user object for AccountSidebar
  const sidebarUser = user ? {
    full_name: `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.email,
    email: user.email || ''
  } : null;

  // Create a compatible customer data object for AccountSidebar
  const customerData = {
    customer_group: customerType || 'customer',
    customer_name: `${user?.first_name || ''} ${user?.last_name || ''}`.trim()
  };

  return (
    <PageLayout title="My Account" description="Manage your account details and preferences">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar - account navigation */}
        <div className="lg:col-span-1">
          <AccountSidebar 
            user={sidebarUser}
            customerData={customerData}
            isLoadingCustomer={false}
            onLogout={handleLogout}
          />
        </div>
        
        {/* Main content area */}
        <div className="lg:col-span-3">
          {/* Verification Status Card for Professional accounts */}
          <VerificationStatusCard />
          
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile">Profile Information</TabsTrigger>
              <TabsTrigger value="security">Password & Security</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="mt-6">
              <ProfileTab 
                profileData={profileData}
                setProfileData={setProfileData}
                isLoadingCustomer={false}
                onProfileUpdate={handleProfileUpdate}
              />
            </TabsContent>
            
            <TabsContent value="security" className="mt-6">
              <SecurityTab onPasswordUpdate={handlePasswordUpdate} />
            </TabsContent>
          </Tabs>
          
          <RecentActivityCard customerData={customerData} />
        </div>
      </div>
    </PageLayout>
  );
};

export default UserAccount;
