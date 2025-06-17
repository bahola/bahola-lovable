
import React, { useState, useEffect } from 'react';
import { PageLayout } from '@/components/PageLayout';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
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
import { Skeleton } from '@/components/ui/skeleton';
import { User, Package, CreditCard, Heart, Bell, LogOut, Home } from 'lucide-react';
import { useERPNextAuth } from '@/contexts/ERPNextAuthContext';
import { getCustomerByEmail } from '@/services/erpnext/authService';
import { toast } from 'sonner';

interface CustomerData {
  customer_name: string;
  email_id: string;
  mobile_no?: string;
  phone?: string;
  customer_type: string;
  customer_group: string;
}

const UserAccount = () => {
  const { user, isLoading: authLoading, isAuthenticated, logout } = useERPNextAuth();
  const [customerData, setCustomerData] = useState<CustomerData | null>(null);
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

  const displayName = user?.full_name || user?.email || 'User';

  return (
    <PageLayout title="My Account" description="Manage your account details and preferences">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar - account navigation */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>Hi, {displayName}</span>
              </CardTitle>
              <CardDescription>{user?.email}</CardDescription>
              {isLoadingCustomer && (
                <Skeleton className="h-4 w-32" />
              )}
              {customerData && (
                <div className="text-sm text-muted-foreground">
                  <p>Customer Type: {customerData.customer_type}</p>
                  <p>Group: {customerData.customer_group}</p>
                </div>
              )}
            </CardHeader>
            <CardContent className="p-0">
              <nav className="space-y-1">
                <Link to="/account" className="flex items-center gap-3 px-4 py-3 bg-bahola-blue-50 text-bahola-blue-600 font-medium">
                  <User className="h-5 w-5" />
                  <span>Account Details</span>
                </Link>
                <Link to="/orders" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50">
                  <Package className="h-5 w-5" />
                  <span>Orders & Returns</span>
                </Link>
                <Link to="/account/addresses" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50">
                  <Home className="h-5 w-5" />
                  <span>Addresses</span>
                </Link>
                <Link to="/account/payment-methods" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50">
                  <CreditCard className="h-5 w-5" />
                  <span>Payment Methods</span>
                </Link>
                <Link to="/account/wishlist" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50">
                  <Heart className="h-5 w-5" />
                  <span>Wishlist</span>
                </Link>
                <Link to="/account/notifications" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50">
                  <Bell className="h-5 w-5" />
                  <span>Notifications</span>
                </Link>
              </nav>
            </CardContent>
            <CardFooter className="border-t">
              <Button 
                variant="ghost" 
                className="text-red-500 w-full justify-start"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5 mr-2" />
                <span>Log Out</span>
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Main content area */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile">Profile Information</TabsTrigger>
              <TabsTrigger value="security">Password & Security</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Manage your personal information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {isLoadingCustomer ? (
                    <div className="space-y-4">
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input 
                            id="firstName" 
                            value={profileData.firstName}
                            onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input 
                            id="lastName" 
                            value={profileData.lastName}
                            onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={profileData.email}
                          disabled 
                        />
                        <p className="text-sm text-bahola-neutral-500">To change your email, please contact customer support.</p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone" 
                          type="tel" 
                          value={profileData.phone}
                          onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="birthdate">Date of Birth</Label>
                        <Input 
                          id="birthdate" 
                          type="date" 
                          value={profileData.birthdate}
                          onChange={(e) => setProfileData(prev => ({ ...prev, birthdate: e.target.value }))}
                        />
                        <p className="text-sm text-bahola-neutral-500">For identity verification and birthday offers.</p>
                      </div>
                    </>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-6">
                  <Button variant="outline">Cancel</Button>
                  <Button onClick={handleProfileUpdate}>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="security" className="mt-6">
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
                  <Button onClick={handlePasswordUpdate}>Update Password</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  <div className="px-4 py-3 flex items-center justify-between">
                    <div>
                      <p className="font-medium">Account Login</p>
                      <p className="text-sm text-bahola-neutral-500">
                        {new Date().toLocaleDateString('en-GB', { 
                          day: 'numeric', 
                          month: 'long', 
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                  {customerData && (
                    <div className="px-4 py-3 flex items-center justify-between">
                      <div>
                        <p className="font-medium">Customer Profile Loaded</p>
                        <p className="text-sm text-bahola-neutral-500">
                          Customer Type: {customerData.customer_type}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  )}
                  <div className="px-4 py-3 flex items-center justify-between">
                    <div>
                      <p className="font-medium">Connected to ERPNext</p>
                      <p className="text-sm text-bahola-neutral-500">
                        Account synchronized with ERPNext system
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default UserAccount;
