
import React, { useState } from 'react';
import { PageLayout } from '@/components/PageLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tag, Calendar, Percent, Gift, Copy, Check } from 'lucide-react';

// Sample promotional offers data
const promoOffers = [
  {
    id: 'SUMMER25',
    title: 'Summer Special',
    description: 'Get 25% off on all Homeopathy products',
    discount: 25,
    type: 'percentage',
    category: 'Homeopathy',
    minAmount: 1500,
    validUntil: '2025-06-30',
    isActive: true,
    usageLimit: 100,
    usedCount: 23
  },
  {
    id: 'NEWCUST20',
    title: 'New Customer Offer',
    description: 'Flat ₹200 off on your first order',
    discount: 200,
    type: 'fixed',
    category: 'All',
    minAmount: 1000,
    validUntil: '2025-12-31',
    isActive: true,
    usageLimit: 500,
    usedCount: 156
  },
  {
    id: 'WELLNESS10',
    title: 'Wellness Week',
    description: '10% off on all wellness products',
    discount: 10,
    type: 'percentage',
    category: 'Wellness',
    minAmount: 800,
    validUntil: '2025-05-15',
    isActive: true,
    usageLimit: 200,
    usedCount: 45
  },
  {
    id: 'BULK15',
    title: 'Bulk Order Discount',
    description: '15% off on orders above ₹3000',
    discount: 15,
    type: 'percentage',
    category: 'All',
    minAmount: 3000,
    validUntil: '2025-07-31',
    isActive: true,
    usageLimit: 50,
    usedCount: 12
  }
];

const PromoOffers = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOffers = promoOffers.filter(offer =>
    offer.isActive && (
      offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.id.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const copyPromoCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const formatDiscount = (offer: any) => {
    if (offer.type === 'percentage') {
      return `${offer.discount}% OFF`;
    } else {
      return `₹${offer.discount} OFF`;
    }
  };

  const isExpiringSoon = (validUntil: string) => {
    const today = new Date();
    const expiryDate = new Date(validUntil);
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays > 0;
  };

  return (
    <PageLayout title="Promotional Offers" description="Discover amazing deals and discounts on your favorite products">
      <div className="max-w-6xl mx-auto">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Label htmlFor="search">Search Offers</Label>
            <Input
              id="search"
              placeholder="Search by title, description, or code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mt-1"
            />
          </div>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOffers.map((offer) => (
            <Card key={offer.id} className="relative overflow-hidden hover:shadow-lg transition-shadow">
              {isExpiringSoon(offer.validUntil) && (
                <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 text-xs font-medium">
                  Expires Soon
                </div>
              )}
              
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {offer.category}
                  </Badge>
                  <div className="flex items-center text-green-600">
                    <Percent className="h-4 w-4 mr-1" />
                    <span className="font-bold text-lg">{formatDiscount(offer)}</span>
                  </div>
                </div>
                <CardTitle className="text-lg">{offer.title}</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-bahola-neutral-600 text-sm">{offer.description}</p>
                
                {/* Promo Code */}
                <div className="bg-bahola-blue-50 border border-dashed border-bahola-blue-200 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-bahola-blue-600 font-medium">PROMO CODE</p>
                      <p className="font-mono font-bold text-bahola-blue-800">{offer.id}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyPromoCode(offer.id)}
                      className="text-bahola-blue-600 hover:text-bahola-blue-800"
                    >
                      {copiedCode === offer.id ? (
                        <>
                          <Check className="h-4 w-4 mr-1" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-1" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Offer Details */}
                <div className="space-y-2 text-sm text-bahola-neutral-600">
                  <div className="flex items-center">
                    <Tag className="h-4 w-4 mr-2" />
                    <span>Min order: ₹{offer.minAmount}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Valid until: {new Date(offer.validUntil).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Gift className="h-4 w-4 mr-2" />
                    <span>{offer.usageLimit - offer.usedCount} uses remaining</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-bahola-neutral-500">
                    <span>Used</span>
                    <span>{offer.usedCount}/{offer.usageLimit}</span>
                  </div>
                  <div className="w-full bg-bahola-neutral-200 rounded-full h-2">
                    <div 
                      className="bg-bahola-blue-500 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${(offer.usedCount / offer.usageLimit) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <Button className="w-full">
                  Apply Offer
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredOffers.length === 0 && (
          <div className="text-center py-12">
            <Gift className="h-16 w-16 mx-auto text-bahola-neutral-400 mb-4" />
            <h3 className="text-xl font-medium mb-2">No offers found</h3>
            <p className="text-bahola-neutral-600">
              {searchTerm ? 'Try adjusting your search terms.' : 'Check back later for new promotional offers.'}
            </p>
          </div>
        )}

        {/* Terms and Conditions */}
        <div className="mt-12 bg-bahola-neutral-50 rounded-lg p-6">
          <h3 className="font-semibold mb-3">Terms & Conditions</h3>
          <ul className="text-sm text-bahola-neutral-600 space-y-1">
            <li>• Promotional codes cannot be combined with other offers</li>
            <li>• Offers are valid for limited time only</li>
            <li>• Minimum order value requirements must be met</li>
            <li>• Some exclusions may apply</li>
            <li>• Bahola Labs reserves the right to modify or cancel offers</li>
          </ul>
        </div>
      </div>
    </PageLayout>
  );
};

export default PromoOffers;
