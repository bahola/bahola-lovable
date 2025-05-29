
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Target, TrendingUp, Calendar } from 'lucide-react';
import { getCustomersDueForMarketing } from '@/utils/ltvUtils';
import { useToast } from "@/components/ui/use-toast";

interface MarketingCustomer {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  predicted_next_purchase_date: string;
  marketing_priority: number;
  customer_lifetime_value: number;
  ltv_segment: string;
}

const MarketingInsightsCard: React.FC = () => {
  const [marketingCustomers, setMarketingCustomers] = useState<MarketingCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchMarketingCustomers = async () => {
    try {
      setLoading(true);
      const result = await getCustomersDueForMarketing(7); // Next 7 days
      
      if (result.success && result.data) {
        setMarketingCustomers(result.data as MarketingCustomer[]);
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch marketing insights",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error fetching marketing customers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketingCustomers();
  }, []);

  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 1: return 'bg-red-100 text-red-800';
      case 2: return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDaysFromNow = (dateString: string) => {
    const today = new Date();
    const targetDate = new Date(dateString);
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Target className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold">Marketing Insights</h3>
        </div>
        <div className="text-center py-8">Loading marketing insights...</div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold">Marketing Insights</h3>
        </div>
        <Button 
          onClick={fetchMarketingCustomers} 
          variant="outline" 
          size="sm"
        >
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <TrendingUp className="h-6 w-6 text-blue-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-blue-900">{marketingCustomers.length}</p>
          <p className="text-sm text-blue-700">Customers Due</p>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <Mail className="h-6 w-6 text-green-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-green-900">
            {marketingCustomers.filter(c => c.marketing_priority === 1).length}
          </p>
          <p className="text-sm text-green-700">High Priority</p>
        </div>
        
        <div className="bg-orange-50 rounded-lg p-4 text-center">
          <Calendar className="h-6 w-6 text-orange-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-orange-900">
            {marketingCustomers.filter(c => getDaysFromNow(c.predicted_next_purchase_date) <= 0).length}
          </p>
          <p className="text-sm text-orange-700">Overdue</p>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="font-medium text-gray-900">Customers to Target (Next 7 Days)</h4>
        
        {marketingCustomers.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            No customers due for marketing in the next 7 days
          </div>
        ) : (
          <div className="max-h-64 overflow-y-auto space-y-2">
            {marketingCustomers.slice(0, 10).map((customer) => {
              const daysFromNow = getDaysFromNow(customer.predicted_next_purchase_date);
              
              return (
                <div key={customer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm">{customer.name}</p>
                      <Badge className={getPriorityColor(customer.marketing_priority)}>
                        P{customer.marketing_priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600">{customer.email}</p>
                    <p className="text-xs text-gray-500">
                      LTV: ₹{customer.customer_lifetime_value?.toFixed(0) || 0}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-xs font-medium">
                      {daysFromNow > 0 
                        ? `In ${daysFromNow}d` 
                        : daysFromNow === 0 
                          ? 'Today' 
                          : `${Math.abs(daysFromNow)}d overdue`
                      }
                    </p>
                    <Button size="sm" variant="outline" className="mt-1">
                      <Mail className="h-3 w-3 mr-1" />
                      Contact
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Card>
  );
};

export default MarketingInsightsCard;
