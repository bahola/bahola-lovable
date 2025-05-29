import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type CustomerType = Database['public']['Enums']['customer_type'];

export interface CustomerData {
  name: string;
  email: string;
  phone?: string;
  customer_type: CustomerType;
  source?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  notes?: string;
}

// Function to create a customer record when a user registers
export const createCustomerFromRegistration = async (customerData: CustomerData) => {
  try {
    const insertData = {
      customer_id: '', // This will be overwritten by the database trigger
      name: customerData.name,
      email: customerData.email,
      phone: customerData.phone || '',
      customer_type: customerData.customer_type,
      source: customerData.source || 'signup',
      address: customerData.address || null,
      city: customerData.city || null,
      state: customerData.state || null,
      pincode: customerData.pincode || null,
      notes: customerData.notes || null
    };

    const { data, error } = await supabase
      .from('customers')
      .insert(insertData)
      .select()
      .single();

    if (error) {
      console.error('Error creating customer record:', error);
      return { success: false, error: error.message };
    }

    console.log('Customer record created:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Unexpected error creating customer:', error);
    return { success: false, error: 'Unexpected error occurred' };
  }
};

// Function to get customer by email
export const getCustomerByEmail = async (email: string) => {
  try {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (error) {
      console.error('Error fetching customer:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Unexpected error fetching customer:', error);
    return { success: false, error: 'Unexpected error occurred' };
  }
};

// Function to update customer statistics after an order
export const updateCustomerOrderStats = async (
  customerId: string, 
  orderAmount: number,
  orderDate: string
) => {
  try {
    // First get current stats
    const { data: customer, error: fetchError } = await supabase
      .from('customers')
      .select('total_orders, total_spent, first_order_date')
      .eq('id', customerId)
      .single();

    if (fetchError) {
      console.error('Error fetching customer stats:', fetchError);
      return { success: false, error: fetchError.message };
    }

    // Calculate if this is the first order
    const isFirstOrder = !customer.first_order_date;
    const newFirstOrderDate = isFirstOrder ? orderDate : customer.first_order_date;

    // Update with new stats
    const { data, error } = await supabase
      .from('customers')
      .update({
        total_orders: (customer.total_orders || 0) + 1,
        total_spent: (customer.total_spent || 0) + orderAmount,
        last_order_date: orderDate,
        first_order_date: newFirstOrderDate
      })
      .eq('id', customerId)
      .select()
      .single();

    if (error) {
      console.error('Error updating customer stats:', error);
      return { success: false, error: error.message };
    }

    // The trigger will automatically calculate LTV metrics when we update the order stats
    console.log('Customer stats updated, LTV metrics will be recalculated automatically');
    
    return { success: true, data };
  } catch (error) {
    console.error('Unexpected error updating customer stats:', error);
    return { success: false, error: 'Unexpected error occurred' };
  }
};

// Function to manually recalculate LTV for a customer
export const recalculateCustomerLTV = async (customerId: string) => {
  try {
    const { data, error } = await supabase.rpc('calculate_customer_ltv', {
      customer_uuid: customerId
    });

    if (error) {
      console.error('Error recalculating LTV:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Unexpected error recalculating LTV:', error);
    return { success: false, error: 'Unexpected error occurred' };
  }
};
