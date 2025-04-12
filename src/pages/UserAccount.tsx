
import React from 'react';
import { PageLayout } from '@/components/PageLayout';
import { Link } from 'react-router-dom';
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
import { User, Package, CreditCard, Heart, Bell, LogOut, Home } from 'lucide-react';

const UserAccount = () => {
  return (
    <PageLayout title="My Account" description="Manage your account details and preferences">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar - account navigation */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>Hi, John Doe</span>
              </CardTitle>
              <CardDescription>john.doe@example.com</CardDescription>
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
              <Button variant="ghost" className="text-red-500 w-full justify-start">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Doe" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" disabled />
                    <p className="text-sm text-bahola-neutral-500">To change your email, please contact customer support.</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue="+91 98765 43210" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="birthdate">Date of Birth</Label>
                    <Input id="birthdate" type="date" defaultValue="1990-01-01" />
                    <p className="text-sm text-bahola-neutral-500">For identity verification and birthday offers.</p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-6">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
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
                  <Button>Update Password</Button>
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
                      <p className="font-medium">Password Changed</p>
                      <p className="text-sm text-bahola-neutral-500">10 April 2025, 15:30</p>
                    </div>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                  <div className="px-4 py-3 flex items-center justify-between">
                    <div>
                      <p className="font-medium">New Order Placed</p>
                      <p className="text-sm text-bahola-neutral-500">5 April 2025, 12:15</p>
                    </div>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                  <div className="px-4 py-3 flex items-center justify-between">
                    <div>
                      <p className="font-medium">Login from New Device</p>
                      <p className="text-sm text-bahola-neutral-500">1 April 2025, 09:45</p>
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
