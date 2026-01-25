
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Truck, MapPin, Calculator } from 'lucide-react';
import { useShippingCalculation } from '@/hooks/useShippingCalculation';

interface ShippingCalculatorProps {
  onShippingUpdate?: (cost: number, zone?: string) => void;
  defaultPincode?: string;
  className?: string;
}

const ShippingCalculator: React.FC<ShippingCalculatorProps> = ({
  onShippingUpdate,
  defaultPincode = '',
  className = ''
}) => {
  const [pincode, setPincode] = useState(defaultPincode);
  const [checkPincode, setCheckPincode] = useState(defaultPincode);
  
  const { 
    shippingZone, 
    shippingRate, 
    shippingCost, 
    totalWeight,
    loading, 
    error 
  } = useShippingCalculation(checkPincode);

  const handleCheckShipping = () => {
    if (pincode.length === 6 && /^\d{6}$/.test(pincode)) {
      setCheckPincode(pincode);
      if (onShippingUpdate) {
        onShippingUpdate(shippingCost, shippingZone?.name);
      }
    }
  };

  const handlePincodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setPincode(value);
  };

  return (
    <div className={`bg-white rounded-lg border p-4 ${className}`}>
      <div className="flex items-center mb-4">
        <Truck className="h-5 w-5 text-bahola-blue-500 mr-2" />
        <h3 className="font-semibold">Shipping Calculator</h3>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <Label htmlFor="pincode">Enter Pincode</Label>
            <div className="flex mt-1">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="pincode"
                  placeholder="Enter 6-digit pincode"
                  value={pincode}
                  onChange={handlePincodeChange}
                  className="pl-10"
                  maxLength={6}
                />
              </div>
              <Button 
                onClick={handleCheckShipping}
                disabled={pincode.length !== 6 || loading}
                className="ml-2"
                size="sm"
              >
                <Calculator className="h-4 w-4 mr-1" />
                Check
              </Button>
            </div>
          </div>
        </div>

        {loading && (
          <div className="text-sm text-bahola-neutral-600">
            Calculating shipping cost...
          </div>
        )}

        {error && (
          <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
            {error}
          </div>
        )}

        {shippingZone && shippingRate && checkPincode && !loading && !error && (
          <div className="space-y-2 bg-green-50 p-3 rounded">
            <div className="flex justify-between font-semibold">
              <span>Shipping Cost:</span>
              <span className="text-bahola-blue-600">₹{shippingCost}</span>
            </div>
            
            <div className="text-xs text-bahola-neutral-500">
              Estimated delivery: 2-5 business days
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShippingCalculator;
