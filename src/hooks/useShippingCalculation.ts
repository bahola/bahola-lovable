
import { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { shippingService, ShippingZone, ShippingRate } from '@/services/shippingService';

export const useShippingCalculation = (pincode?: string) => {
  const { items } = useCart();
  const [shippingZone, setShippingZone] = useState<ShippingZone | null>(null);
  const [shippingRate, setShippingRate] = useState<ShippingRate | null>(null);
  const [shippingCost, setShippingCost] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate total weight of cart items
  const calculateTotalWeight = (): number => {
    return items.reduce((total, item) => {
      // Base weight from product (assuming weight is in grams)
      const itemWeight = 50; // Default weight if not specified
      return total + (itemWeight * item.quantity);
    }, 0);
  };

  // Update shipping cost when pincode changes
  useEffect(() => {
    const updateShippingCost = async () => {
      if (!pincode || pincode.length < 6) {
        setShippingCost(0);
        setShippingZone(null);
        setShippingRate(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Get shipping zone by pincode
        const zone = await shippingService.getShippingZoneByPincode(pincode);
        if (!zone) {
          throw new Error('Shipping not available for this pincode');
        }

        setShippingZone(zone);

        // Get shipping rate for the zone
        const rate = await shippingService.getShippingRate(zone.id);
        if (!rate) {
          throw new Error('Shipping rates not configured for this zone');
        }

        setShippingRate(rate);

        // Calculate shipping cost
        const totalWeight = calculateTotalWeight();
        if (totalWeight > 0) {
          const cost = shippingService.calculateShippingCost(totalWeight, rate);
          setShippingCost(cost);
        } else {
          setShippingCost(0);
        }

      } catch (err) {
        console.error('Error calculating shipping:', err);
        setError(err instanceof Error ? err.message : 'Failed to calculate shipping');
        setShippingCost(0);
      } finally {
        setLoading(false);
      }
    };

    updateShippingCost();
  }, [pincode, items]);

  return {
    shippingZone,
    shippingRate,
    shippingCost,
    totalWeight: calculateTotalWeight(),
    loading,
    error,
    calculateShippingForPincode: async (newPincode: string) => {
      const zone = await shippingService.getShippingZoneByPincode(newPincode);
      if (zone) {
        const rate = await shippingService.getShippingRate(zone.id);
        if (rate) {
          const totalWeight = calculateTotalWeight();
          return shippingService.calculateShippingCost(totalWeight, rate);
        }
      }
      return 0;
    }
  };
};
