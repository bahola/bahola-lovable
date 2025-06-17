
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { User, Package, CreditCard, Heart, Bell, LogOut, Home } from 'lucide-react';
import { ERPNextUser, ERPNextCustomer } from '@/services/erpnext/authService';

interface AccountSidebarProps {
  user: ERPNextUser | null;
  customerData: ERPNextCustomer | null;
  isLoadingCustomer: boolean;
  onLogout: () => void;
}

export const AccountSidebar: React.FC<AccountSidebarProps> = ({
  user,
  customerData,
  isLoadingCustomer,
  onLogout
}) => {
  const displayName = user?.full_name || user?.email || 'User';

  return (
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
          onClick={onLogout}
        >
          <LogOut className="h-5 w-5 mr-2" />
          <span>Log Out</span>
        </Button>
      </CardFooter>
    </Card>
  );
};
