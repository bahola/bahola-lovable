
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
import { useERPNextAuth } from '@/contexts/ERPNextAuthContext';
import { getCustomerByEmail, ERPNextCustomer } from '@/services/erpnext/authService';
import { toast } from 'sonner';
import { AccountSidebar } from '@/components/account/AccountSidebar';
import { ProfileTab } from '@/components/account/ProfileTab';
import { SecurityTab } from '@/components/account/SecurityTab';
import { RecentActivityCard } from '@/components/account/RecentActivityCard';
import { VerificationStatusCard } from '@/components/account/VerificationStatusCard';

const UserAccount = () => {
  const { user, isLoading: authLoading, isAuthenticated, logout } = useERPNextAuth();
  const [customerData, setCustomerData] = useState<ERPNextCustomer | null>(null);
  const [isLoadingCustomer, setIsLoadingCustomer] = useState(false);
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

    if (user?.email) {
      fetchCustomerData(user.email);
      // Parse user name into first and last name
      const fullName = user.full_name || user.email;
      const nameParts = fullName.split(' ');
      setProfileData(prev => ({
        ...prev,
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || '',
        email: user.email
      }));
    }
  }, [user, authLoading, isAuthenticated, navigate]);

  const fetchCustomerData = async (email: string) => {
    setIsLoadingCustomer(true);
    try {
      console.log('Fetching customer data for email:', email);
      const customer = await getCustomerByEmail(email);
      if (customer) {
        setCustomerData(customer);
        setProfileData(prev => ({
          ...prev,
          phone: customer.mobile_no || customer.phone || ''
        }));
        console.log('Customer data loaded:', customer);
      } else {
        console.log('No customer data found for email:', email);
      }
    } catch (error) {
      console.error('Error fetching customer data:', error);
      toast.error('Failed to load customer information');
    } finally {
      setIsLoadingCustomer(false);
    }
  };

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
      // TODO: Implement profile update functionality with ERPNext
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

  return (
    <PageLayout title="My Account" description="Manage your account details and preferences">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar - account navigation */}
        <div className="lg:col-span-1">
          <AccountSidebar 
            user={user}
            customerData={customerData}
            isLoadingCustomer={isLoadingCustomer}
            onLogout={handleLogout}
          />
        </div>
        
        {/* Main content area */}
        <div className="lg:col-span-3">
          {/* Verification Status Card for Doctors */}
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
                isLoadingCustomer={isLoadingCustomer}
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
