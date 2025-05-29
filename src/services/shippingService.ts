
import { supabase } from '@/integrations/supabase/client';

export interface ShippingZone {
  id: string;
  name: string;
  description: string;
}

export interface ShippingRate {
  id: string;
  zone_id: string;
  base_weight_grams: number;
  base_price: number;
  incremental_weight_grams: number;
  incremental_rate: number;
  min_weight_grams: number;
  max_weight_grams: number;
}

export interface ShippingArea {
  id: string;
  zone_id: string;
  area_name: string;
  pincode: string;
  state: string;
  city: string;
}

export const shippingService = {
  // Get shipping zone by pincode
  async getShippingZoneByPincode(pincode: string): Promise<ShippingZone | null> {
    try {
      const { data: area, error } = await supabase
        .from('shipping_areas')
        .select(`
          *,
          shipping_zones(*)
        `)
        .or(`pincode.like.%${pincode}%,pincode.is.null`)
        .order('pincode', { ascending: false, nullsLast: true })
        .limit(1)
        .single();

      if (error || !area) {
        console.log('No specific zone found, using default zone');
        // Return default zone (Rest of India)
        const { data: defaultZone, error: defaultError } = await supabase
          .from('shipping_zones')
          .select('*')
          .eq('name', 'Rest of India')
          .single();
        
        return defaultError ? null : defaultZone;
      }

      return area.shipping_zones;
    } catch (error) {
      console.error('Error fetching shipping zone:', error);
      return null;
    }
  },

  // Get shipping rate for a zone
  async getShippingRate(zoneId: string): Promise<ShippingRate | null> {
    try {
      const { data, error } = await supabase
        .from('shipping_rates')
        .select('*')
        .eq('zone_id', zoneId)
        .single();

      if (error) {
        console.error('Error fetching shipping rate:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error fetching shipping rate:', error);
      return null;
    }
  },

  // Calculate shipping cost based on weight and zone
  calculateShippingCost(weightGrams: number, shippingRate: ShippingRate): number {
    if (weightGrams <= 0) return 0;

    // Check if weight exceeds maximum
    if (shippingRate.max_weight_grams && weightGrams > shippingRate.max_weight_grams) {
      throw new Error(`Weight exceeds maximum limit of ${shippingRate.max_weight_grams}g`);
    }

    // Check if weight is below minimum
    if (weightGrams < shippingRate.min_weight_grams) {
      throw new Error(`Weight below minimum limit of ${shippingRate.min_weight_grams}g`);
    }

    let cost = shippingRate.base_price;

    // Calculate additional cost for weight over base weight
    if (weightGrams > shippingRate.base_weight_grams) {
      const additionalWeight = weightGrams - shippingRate.base_weight_grams;
      const incrementalUnits = Math.ceil(additionalWeight / shippingRate.incremental_weight_grams);
      cost += incrementalUnits * shippingRate.incremental_rate;
    }

    return Math.round(cost);
  },

  // Get all shipping zones
  async getAllShippingZones(): Promise<ShippingZone[]> {
    try {
      const { data, error } = await supabase
        .from('shipping_zones')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching shipping zones:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching shipping zones:', error);
      return [];
    }
  },

  // Get shipping areas for a zone
  async getShippingAreas(zoneId: string): Promise<ShippingArea[]> {
    try {
      const { data, error } = await supabase
        .from('shipping_areas')
        .select('*')
        .eq('zone_id', zoneId)
        .order('area_name');

      if (error) {
        console.error('Error fetching shipping areas:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching shipping areas:', error);
      return [];
    }
  }
};
