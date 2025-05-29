
import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, MapPin, Package, Truck, Map } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { shippingService } from '@/services/shippingService';
import type { ShippingZone, ShippingRate, ShippingArea } from '@/services/shippingService';

const ShippingManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('zones');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'zone' | 'rate' | 'area'>('zone');
  
  // State for shipping data
  const [zones, setZones] = useState<ShippingZone[]>([]);
  const [rates, setRates] = useState<ShippingRate[]>([]);
  const [areas, setAreas] = useState<ShippingArea[]>([]);
  const [selectedZone, setSelectedZone] = useState<string>('');
  
  // Form data for dialogs
  const [formData, setFormData] = useState({
    // Zone form
    zoneName: '',
    zoneDescription: '',
    // Rate form
    zoneId: '',
    basePrice: '',
    baseWeight: '500',
    incrementalRate: '',
    incrementalWeight: '500',
    minWeight: '0',
    maxWeight: '',
    // Area form
    areaZoneId: '',
    areaName: '',
    pincode: '',
    state: '',
    city: ''
  });

  // Load shipping data
  useEffect(() => {
    loadShippingData();
  }, []);

  const loadShippingData = async () => {
    try {
      const zonesData = await shippingService.getAllShippingZones();
      setZones(zonesData);
      
      // Load rates for each zone
      const allRates: ShippingRate[] = [];
      const allAreas: ShippingArea[] = [];
      
      for (const zone of zonesData) {
        const rate = await shippingService.getShippingRate(zone.id);
        if (rate) allRates.push(rate);
        
        const areasData = await shippingService.getShippingAreas(zone.id);
        allAreas.push(...areasData);
      }
      
      setRates(allRates);
      setAreas(allAreas);
    } catch (error) {
      console.error('Error loading shipping data:', error);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const openDialog = (type: 'zone' | 'rate' | 'area') => {
    setDialogType(type);
    setFormData({
      zoneName: '',
      zoneDescription: '',
      zoneId: '',
      basePrice: '',
      baseWeight: '500',
      incrementalRate: '',
      incrementalWeight: '500',
      minWeight: '0',
      maxWeight: '',
      areaZoneId: '',
      areaName: '',
      pincode: '',
      state: '',
      city: ''
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    console.log('Submitting form:', dialogType, formData);
    // Here you would implement the actual submission logic to Supabase
    setIsDialogOpen(false);
    // Reload data after submission
    loadShippingData();
  };

  const filteredZones = zones.filter(zone => 
    zone.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    zone.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredRates = rates.filter(rate => {
    const zone = zones.find(z => z.id === rate.zone_id);
    return zone?.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const filteredAreas = areas.filter(area => 
    area.area_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    area.pincode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    area.state?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    area.city?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Shipping Management</h2>
          <p className="text-muted-foreground">Manage shipping zones, rates, and delivery areas</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => openDialog('zone')}>
              <Plus className="h-4 w-4 mr-2" />
              Add Shipping Configuration
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {dialogType === 'zone' && 'Create New Shipping Zone'}
                {dialogType === 'rate' && 'Add Shipping Rate'}
                {dialogType === 'area' && 'Add Delivery Area'}
              </DialogTitle>
              <DialogDescription>
                Configure shipping settings for your delivery network.
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4 space-y-4">
              {dialogType === 'zone' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="zoneName">Zone Name *</Label>
                    <Input 
                      id="zoneName"
                      placeholder="e.g. Mumbai Metro, Delhi NCR" 
                      value={formData.zoneName}
                      onChange={(e) => setFormData({...formData, zoneName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zoneDescription">Description</Label>
                    <Input 
                      id="zoneDescription"
                      placeholder="Brief description of the zone" 
                      value={formData.zoneDescription}
                      onChange={(e) => setFormData({...formData, zoneDescription: e.target.value})}
                    />
                  </div>
                </>
              )}
              
              {dialogType === 'rate' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="zoneSelect">Shipping Zone *</Label>
                    <select 
                      id="zoneSelect"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                      value={formData.zoneId}
                      onChange={(e) => setFormData({...formData, zoneId: e.target.value})}
                    >
                      <option value="">Select a zone</option>
                      {zones.map(zone => (
                        <option key={zone.id} value={zone.id}>{zone.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="basePrice">Base Price (₹) *</Label>
                      <Input 
                        id="basePrice"
                        type="number" 
                        placeholder="50" 
                        value={formData.basePrice}
                        onChange={(e) => setFormData({...formData, basePrice: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="baseWeight">Base Weight (grams) *</Label>
                      <Input 
                        id="baseWeight"
                        type="number" 
                        placeholder="500" 
                        value={formData.baseWeight}
                        onChange={(e) => setFormData({...formData, baseWeight: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="incrementalRate">Additional Rate (₹) *</Label>
                      <Input 
                        id="incrementalRate"
                        type="number" 
                        placeholder="10" 
                        value={formData.incrementalRate}
                        onChange={(e) => setFormData({...formData, incrementalRate: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="incrementalWeight">Per Weight (grams) *</Label>
                      <Input 
                        id="incrementalWeight"
                        type="number" 
                        placeholder="500" 
                        value={formData.incrementalWeight}
                        onChange={(e) => setFormData({...formData, incrementalWeight: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="minWeight">Min Weight (grams)</Label>
                      <Input 
                        id="minWeight"
                        type="number" 
                        placeholder="0" 
                        value={formData.minWeight}
                        onChange={(e) => setFormData({...formData, minWeight: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxWeight">Max Weight (grams)</Label>
                      <Input 
                        id="maxWeight"
                        type="number" 
                        placeholder="Leave blank for no limit" 
                        value={formData.maxWeight}
                        onChange={(e) => setFormData({...formData, maxWeight: e.target.value})}
                      />
                    </div>
                  </div>
                </>
              )}
              
              {dialogType === 'area' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="areaZoneSelect">Shipping Zone *</Label>
                    <select 
                      id="areaZoneSelect"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                      value={formData.areaZoneId}
                      onChange={(e) => setFormData({...formData, areaZoneId: e.target.value})}
                    >
                      <option value="">Select a zone</option>
                      {zones.map(zone => (
                        <option key={zone.id} value={zone.id}>{zone.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="areaName">Area Name *</Label>
                    <Input 
                      id="areaName"
                      placeholder="e.g. Andheri East, Connaught Place" 
                      value={formData.areaName}
                      onChange={(e) => setFormData({...formData, areaName: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="pincode">Pincode</Label>
                      <Input 
                        id="pincode"
                        placeholder="400001" 
                        value={formData.pincode}
                        onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input 
                        id="state"
                        placeholder="Maharashtra" 
                        value={formData.state}
                        onChange={(e) => setFormData({...formData, state: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input 
                      id="city"
                      placeholder="Mumbai" 
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                    />
                  </div>
                </>
              )}
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSubmit}>
                {dialogType === 'zone' && 'Create Zone'}
                {dialogType === 'rate' && 'Add Rate'}
                {dialogType === 'area' && 'Add Area'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Summary Cards */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Shipping Zones</CardTitle>
            <Map className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{zones.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Active zones</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Shipping Rates</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rates.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Configured rates</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Delivery Areas</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{areas.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Covered areas</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg. Base Rate</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{rates.length > 0 ? Math.round(rates.reduce((sum, rate) => sum + rate.base_price, 0) / rates.length) : 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Average base price</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search zones, areas, or rates..." 
          className="pl-10"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      
      {/* Tabs for different sections */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="zones">Shipping Zones</TabsTrigger>
            <TabsTrigger value="rates">Shipping Rates</TabsTrigger>
            <TabsTrigger value="areas">Delivery Areas</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => openDialog('zone')}>
              <Plus className="h-4 w-4 mr-1" />
              Add Zone
            </Button>
            <Button variant="outline" size="sm" onClick={() => openDialog('rate')}>
              <Plus className="h-4 w-4 mr-1" />
              Add Rate
            </Button>
            <Button variant="outline" size="sm" onClick={() => openDialog('area')}>
              <Plus className="h-4 w-4 mr-1" />
              Add Area
            </Button>
          </div>
        </div>
        
        <TabsContent value="zones">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Zone Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Areas Count</TableHead>
                  <TableHead>Base Rate</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredZones.map((zone) => {
                  const zoneAreas = areas.filter(area => area.zone_id === zone.id);
                  const zoneRate = rates.find(rate => rate.zone_id === zone.id);
                  
                  return (
                    <TableRow key={zone.id}>
                      <TableCell className="font-medium">{zone.name}</TableCell>
                      <TableCell>{zone.description || '-'}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{zoneAreas.length} areas</Badge>
                      </TableCell>
                      <TableCell>
                        {zoneRate ? `₹${zoneRate.base_price}` : 'Not configured'}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
        
        <TabsContent value="rates">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Zone</TableHead>
                  <TableHead>Base Price</TableHead>
                  <TableHead>Base Weight</TableHead>
                  <TableHead>Additional Rate</TableHead>
                  <TableHead>Weight Limits</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRates.map((rate) => {
                  const zone = zones.find(z => z.id === rate.zone_id);
                  
                  return (
                    <TableRow key={rate.id}>
                      <TableCell className="font-medium">{zone?.name}</TableCell>
                      <TableCell>₹{rate.base_price}</TableCell>
                      <TableCell>{rate.base_weight_grams}g</TableCell>
                      <TableCell>₹{rate.incremental_rate}/{rate.incremental_weight_grams}g</TableCell>
                      <TableCell>
                        <span className="text-xs">
                          {rate.min_weight_grams}g - {rate.max_weight_grams ? `${rate.max_weight_grams}g` : 'No limit'}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
        
        <TabsContent value="areas">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Area Name</TableHead>
                  <TableHead>Zone</TableHead>
                  <TableHead>Pincode</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>State</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAreas.map((area) => {
                  const zone = zones.find(z => z.id === area.zone_id);
                  
                  return (
                    <TableRow key={area.id}>
                      <TableCell className="font-medium">{area.area_name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{zone?.name}</Badge>
                      </TableCell>
                      <TableCell>{area.pincode || '-'}</TableCell>
                      <TableCell>{area.city || '-'}</TableCell>
                      <TableCell>{area.state || '-'}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ShippingManagement;
