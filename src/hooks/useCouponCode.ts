import { useState, useCallback } from 'react';
import { useSwellCart } from '@/contexts/SwellCartContext';
import { useToast } from '@/hooks/use-toast';

interface UseCouponCodeReturn {
  couponCode: string;
  setCouponCode: (code: string) => void;
  isApplying: boolean;
  isRemoving: boolean;
  applyCoupon: () => Promise<boolean>;
  removeCoupon: () => Promise<void>;
  appliedCoupon: { code: string; discountTotal: number } | null;
  error: string | null;
}

export const useCouponCode = (): UseCouponCodeReturn => {
  const [couponCode, setCouponCode] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  const {
    applyCoupon: contextApplyCoupon,
    removeCoupon: contextRemoveCoupon,
    appliedCoupon,
  } = useSwellCart();

  const applyCoupon = useCallback(async (): Promise<boolean> => {
    if (!couponCode.trim()) {
      setError('Please enter a coupon code');
      return false;
    }

    setIsApplying(true);
    setError(null);

    try {
      await contextApplyCoupon(couponCode.trim().toUpperCase());
      setCouponCode('');
      toast({
        title: 'Coupon Applied',
        description: `Coupon "${couponCode.toUpperCase()}" has been applied to your order.`,
      });
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Invalid coupon code';
      setError(errorMessage);
      toast({
        title: 'Coupon Error',
        description: errorMessage,
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsApplying(false);
    }
  }, [couponCode, contextApplyCoupon, toast]);

  const removeCoupon = useCallback(async () => {
    setIsRemoving(true);
    setError(null);

    try {
      await contextRemoveCoupon();
      toast({
        title: 'Coupon Removed',
        description: 'The coupon has been removed from your order.',
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to remove coupon';
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsRemoving(false);
    }
  }, [contextRemoveCoupon, toast]);

  return {
    couponCode,
    setCouponCode,
    isApplying,
    isRemoving,
    applyCoupon,
    removeCoupon,
    appliedCoupon,
    error,
  };
};
