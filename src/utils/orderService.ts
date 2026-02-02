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

// Save order via secure edge function
export const saveOrder = async (orderData: OrderData): Promise<{ success: boolean; error?: string }> => {
  try {
    const response = await fetch(
      `https://vjkhsdwavbswcoyfgyvg.supabase.co/functions/v1/create-order`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      }
    );

    if (!response.ok) {
      const { error } = await response.json();
      return { success: false, error: error || 'Failed to save order' };
    }

    console.log('[OrderService] Order saved successfully:', orderData.orderNumber);
    return { success: true };
  } catch (err) {
    console.error('[OrderService] Exception saving order:', err);
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
};

// Retrieve order by order number (legacy - direct DB access)
export const getOrderByNumber = async (orderNumber: string): Promise<OrderData | null> => {
  console.warn('[OrderService] getOrderByNumber is deprecated, use getOrderByNumberSecure');
  return null;
};

// Retrieve order securely via edge function (requires email verification)
export const getOrderByNumberSecure = async (
  orderNumber: string,
  email: string
): Promise<OrderData | null> => {
  try {
    const response = await fetch(
      `https://vjkhsdwavbswcoyfgyvg.supabase.co/functions/v1/get-order`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderNumber, email }),
      }
    );

    if (!response.ok) return null;

    const { order } = await response.json();
    if (!order) return null;

    return {
      orderNumber: order.order_number,
      swellOrderId: order.swell_order_id ?? undefined,
      customerName: order.customer_name,
      customerEmail: order.customer_email,
      customerPhone: order.customer_phone,
      shippingAddress: order.shipping_address as ShippingAddress,
      items: order.items as OrderItem[],
      subtotal: Number(order.subtotal),
      discountAmount: Number(order.discount_amount),
      shippingCost: Number(order.shipping_cost),
      total: Number(order.total),
      couponCode: order.coupon_code ?? undefined,
      gstin: order.gstin ?? undefined,
      paymentMethod: order.payment_method as 'cod' | 'razorpay',
      paymentStatus: order.payment_status as 'pending' | 'completed' | 'failed',
      orderStatus: order.order_status as 'processing' | 'shipped' | 'delivered',
      notes: order.notes ?? undefined,
    };
  } catch (err) {
    console.error('[OrderService] Error fetching order securely:', err);
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
