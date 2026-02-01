import { supabase } from '@/integrations/supabase/client';

export type SwellCoupon = {
  id: string;
  name: string;
  active: boolean;
  codes?: Array<{ code: string }>;
  date_created?: string;
  date_updated?: string;
  date_valid?: string;
  date_expired?: string;
  description?: string | null;
};

export type SwellCouponListResponse = {
  count: number;
  results: SwellCoupon[];
  page?: number;
  pages?: Record<string, { start: number; end: number }>;
};

export async function listSwellCoupons(params?: {
  active?: boolean;
  limit?: number;
  page?: number;
}): Promise<SwellCouponListResponse> {
  const { data, error } = await supabase.functions.invoke('swell-admin', {
    body: { action: 'list_coupons', ...params },
  });

  if (error) throw error;
  return data as SwellCouponListResponse;
}
