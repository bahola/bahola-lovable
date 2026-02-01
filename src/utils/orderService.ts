import { supabase } from '@/integrations/supabase/client';

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  addressType: 'home' | 'work';
}

export interface OrderData {
  orderNumber: string;
  swellOrderId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: ShippingAddress;
  items: OrderItem[];
  subtotal: number;
  discountAmount: number;
  shippingCost: number;
  total: number;
  couponCode?: string;
  gstin?: string;
  paymentMethod: 'cod' | 'razorpay';
  paymentStatus: 'pending' | 'completed' | 'failed';
  orderStatus: 'processing' | 'shipped' | 'delivered';
  notes?: string;
}

// Generate a unique order number: BL + YYYYMMDD + sequence
export const generateOrderNumber = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `BL${year}${month}${day}${random}`;
};

// Save order to Supabase
export const saveOrder = async (orderData: OrderData): Promise<{ success: boolean; error?: string }> => {
  try {
    // Type cast is necessary because Supabase types may not be updated yet
    const insertData = {
      order_number: orderData.orderNumber,
      swell_order_id: orderData.swellOrderId || null,
      customer_name: orderData.customerName,
      customer_email: orderData.customerEmail,
      customer_phone: orderData.customerPhone,
      shipping_address: orderData.shippingAddress,
      items: orderData.items,
      subtotal: orderData.subtotal,
      discount_amount: orderData.discountAmount,
      shipping_cost: orderData.shippingCost,
      total: orderData.total,
      coupon_code: orderData.couponCode || null,
      gstin: orderData.gstin || null,
      payment_method: orderData.paymentMethod,
      payment_status: orderData.paymentStatus,
      order_status: orderData.orderStatus,
      notes: orderData.notes || null,
    };

    // Use type assertion since the types file may not be updated yet
    const { error } = await (supabase.from('orders') as any).insert(insertData);

    if (error) {
      console.error('[OrderService] Error saving order:', error);
      return { success: false, error: error.message };
    }

    console.log('[OrderService] Order saved successfully:', orderData.orderNumber);
    return { success: true };
  } catch (err) {
    console.error('[OrderService] Exception saving order:', err);
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
};

// Retrieve order by order number
export const getOrderByNumber = async (orderNumber: string): Promise<OrderData | null> => {
  try {
    // Use type assertion since the types file may not be updated yet
    const { data, error } = await (supabase.from('orders') as any)
      .select('*')
      .eq('order_number', orderNumber)
      .single();

    if (error || !data) {
      console.error('[OrderService] Error fetching order:', error);
      return null;
    }

    return {
      orderNumber: data.order_number,
      swellOrderId: data.swell_order_id ?? undefined,
      customerName: data.customer_name,
      customerEmail: data.customer_email,
      customerPhone: data.customer_phone,
      shippingAddress: data.shipping_address as ShippingAddress,
      items: data.items as OrderItem[],
      subtotal: Number(data.subtotal),
      discountAmount: Number(data.discount_amount),
      shippingCost: Number(data.shipping_cost),
      total: Number(data.total),
      couponCode: data.coupon_code ?? undefined,
      gstin: data.gstin ?? undefined,
      paymentMethod: data.payment_method as 'cod' | 'razorpay',
      paymentStatus: data.payment_status as 'pending' | 'completed' | 'failed',
      orderStatus: data.order_status as 'processing' | 'shipped' | 'delivered',
      notes: data.notes ?? undefined,
    };
  } catch (err) {
    console.error('[OrderService] Exception fetching order:', err);
    return null;
  }
};

// Store order in localStorage for confirmation page
export const storeOrderLocally = (orderData: OrderData): void => {
  localStorage.setItem('last_order', JSON.stringify(orderData));
};

// Get order from localStorage
export const getLocalOrder = (): OrderData | null => {
  const stored = localStorage.getItem('last_order');
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
};

// Clear stored order
export const clearLocalOrder = (): void => {
  localStorage.removeItem('last_order');
};
