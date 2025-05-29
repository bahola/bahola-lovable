
import React from 'react';
import { Card } from "@/components/ui/card";
import { formatLTV, getLTVSegmentColor, getMarketingPriority } from '@/utils/ltvUtils';

interface LTVMetricsCardProps {
  customer: {
    customer_lifetime_value?: number;
    average_order_value?: number;
    purchase_frequency?: number;
    ltv_segment?: string;
    marketing_priority?: number;
    predicted_next_purchase_date?: string;
    days_between_orders?: number;
  };
}

const LTVMetricsCard: React.FC<LTVMetricsCardProps> = ({ customer }) => {
  const marketingPriority = getMarketingPriority(customer.marketing_priority || 3);
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not available';
    return new Date(dateString).toLocaleDateString();
  };

  const getDaysUntilNextPurchase = () => {
    if (!customer.predicted_next_purchase_date) return null;
    const today = new Date();
    const nextPurchase = new Date(customer.predicted_next_purchase_date);
    const diffTime = nextPurchase.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntilNext = getDaysUntilNextPurchase();

  return (
    <Card className="p-4">
      <h4 className="font-medium mb-3 text-lg">Customer Value Metrics</h4>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-md p-3 border">
          <p className="text-muted-foreground text-xs">Lifetime Value</p>
          <p className="text-xl font-bold text-green-600">
            {formatLTV(customer.customer_lifetime_value || 0)}
          </p>
        </div>
        <div className="bg-white rounded-md p-3 border">
          <p className="text-muted-foreground text-xs">Average Order Value</p>
          <p className="text-xl font-bold">
            ₹{(customer.average_order_value || 0).toFixed(0)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-md p-3 border">
          <p className="text-muted-foreground text-xs">Purchase Frequency</p>
          <p className="text-lg font-semibold">
            {(customer.purchase_frequency || 0).toFixed(1)}/month
          </p>
        </div>
        <div className="bg-white rounded-md p-3 border">
          <p className="text-muted-foreground text-xs">Days Between Orders</p>
          <p className="text-lg font-semibold">
            {(customer.days_between_orders || 0).toFixed(0)} days
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Value Segment:</span>
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium capitalize ${
            getLTVSegmentColor(customer.ltv_segment || 'new')
          }`}>
            {customer.ltv_segment || 'new'}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Marketing Priority:</span>
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${marketingPriority.color}`}>
            {marketingPriority.label}
          </span>
        </div>

        <div className="bg-blue-50 rounded-md p-3">
          <p className="text-sm font-medium text-blue-900 mb-1">Next Purchase Prediction</p>
          <p className="text-sm text-blue-700">
            Expected: {formatDate(customer.predicted_next_purchase_date)}
          </p>
          {daysUntilNext !== null && (
            <p className="text-xs text-blue-600 mt-1">
              {daysUntilNext > 0 
                ? `In ${daysUntilNext} days` 
                : daysUntilNext === 0 
                  ? 'Today!' 
                  : `${Math.abs(daysUntilNext)} days overdue`
              }
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default LTVMetricsCard;
