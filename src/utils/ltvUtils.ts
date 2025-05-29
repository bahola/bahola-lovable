
import { supabase } from '@/integrations/supabase/client';

// Function to calculate LTV for a specific customer
export const calculateCustomerLTV = async (customerId: string) => {
  try {
    const { data, error } = await supabase.rpc('calculate_customer_ltv', {
      customer_uuid: customerId
    });

    if (error) {
      console.error('Error calculating LTV:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Unexpected error calculating LTV:', error);
    return { success: false, error: 'Unexpected error occurred' };
  }
};

// Function to get customers by LTV segment
export const getCustomersByLTVSegment = async (segment: 'high' | 'medium' | 'low' | 'new') => {
  try {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('ltv_segment', segment)
      .order('customer_lifetime_value', { ascending: false });

    if (error) {
      console.error('Error fetching customers by LTV segment:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Unexpected error fetching customers:', error);
    return { success: false, error: 'Unexpected error occurred' };
  }
};

// Function to get customers due for marketing (predicted next purchase approaching)
export const getCustomersDueForMarketing = async (daysAhead: number = 7) => {
  try {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + daysAhead);
    
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .not('predicted_next_purchase_date', 'is', null)
      .lte('predicted_next_purchase_date', futureDate.toISOString().split('T')[0])
      .order('marketing_priority', { ascending: true });

    if (error) {
      console.error('Error fetching marketing candidates:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Unexpected error fetching marketing candidates:', error);
    return { success: false, error: 'Unexpected error occurred' };
  }
};

// Function to format LTV value for display
export const formatLTV = (value: number): string => {
  if (value >= 1000000) {
    return `₹${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `₹${(value / 1000).toFixed(1)}K`;
  }
  return `₹${value.toFixed(0)}`;
};

// Function to get LTV segment color
export const getLTVSegmentColor = (segment: string): string => {
  switch (segment) {
    case 'high':
      return 'bg-green-100 text-green-800';
    case 'medium':
      return 'bg-blue-100 text-blue-800';
    case 'low':
      return 'bg-yellow-100 text-yellow-800';
    case 'new':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Function to get marketing priority label and color
export const getMarketingPriority = (priority: number): { label: string; color: string } => {
  switch (priority) {
    case 1:
      return { label: 'High', color: 'bg-red-100 text-red-800' };
    case 2:
      return { label: 'Medium', color: 'bg-orange-100 text-orange-800' };
    case 3:
      return { label: 'Low', color: 'bg-gray-100 text-gray-800' };
    default:
      return { label: 'Low', color: 'bg-gray-100 text-gray-800' };
  }
};
