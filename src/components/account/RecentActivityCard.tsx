
import React from 'react';
import { 
  Card, 
  CardContent
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ERPNextCustomer } from '@/services/erpnext/authService';

interface RecentActivityCardProps {
  customerData: ERPNextCustomer | null;
}

export const RecentActivityCard: React.FC<RecentActivityCardProps> = ({ customerData }) => {
  return (
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
  );
};
