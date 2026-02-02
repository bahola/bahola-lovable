import { useState, useEffect, useCallback } from 'react';
import { useSwellCart } from '@/contexts/SwellCartContext';

interface ShippingService {
  id: string;
  name: string;
  price: number;
  description?: string;
}

export const useSwellShipping = (pincode?: string) => {
  const { 
    getShippingRates, 
    setShippingService,
    shippingTotal,
    shippingServices: contextServices,
    selectedShippingService,
    subtotal,
  } = useSwellCart();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [services, setServices] = useState<ShippingService[]>([]);

  // Fetch shipping rates when pincode is valid
  const fetchRates = useCallback(async () => {
    if (!pincode || pincode.length !== 6) {
      setServices([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const rates = await getShippingRates();
      setServices(rates);
      
      // Auto-select first service if available and none selected
      if (rates.length > 0 && !selectedShippingService) {
        await setShippingService(rates[0].id);
      }
    } catch (err) {
      console.error('[useSwellShipping] Error fetching rates:', err);
      setError(err instanceof Error ? err.message : 'Failed to get shipping rates');
      setServices([]);
    } finally {
      setLoading(false);
    }
  }, [pincode, getShippingRates, setShippingService, selectedShippingService]);

  useEffect(() => {
    fetchRates();
  }, [fetchRates]);

  const selectService = useCallback(async (serviceId: string) => {
    try {
      setLoading(true);
      await setShippingService(serviceId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to set shipping service');
    } finally {
      setLoading(false);
    }
  }, [setShippingService]);

  // Check if free shipping applies
  const isFreeShipping = shippingTotal === 0 && services.length > 0;

  return {
    services: contextServices.length > 0 ? contextServices : services,
    shippingCost: shippingTotal,
    selectedService: selectedShippingService,
    isFreeShipping,
    loading,
    error,
    fetchRates,
    selectService,
  };
};
