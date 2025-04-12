
import React, { useState } from 'react';
import { BarChart, Calendar, Download, Filter, ShoppingCart, Receipt } from 'lucide-react';
import { Button } from "@/components/ui/button";

// Import data
import { 
  monthlySalesData, 
  categorySalesData, 
  customerCategoryData, 
  topSellingProducts,
  COLORS
} from '@/components/admin/SalesAnalyticsData';

// Import components
import TimeRangeSelector from '@/components/admin/TimeRangeSelector';
import SummaryCard from '@/components/admin/SummaryCard';
import SalesOverviewChart from '@/components/admin/SalesOverviewChart';
import CategorySalesPieChart from '@/components/admin/CategorySalesPieChart';
import CustomerSalesChart from '@/components/admin/CustomerSalesChart';
import TopSellingProductsTable from '@/components/admin/TopSellingProductsTable';

const SalesAnalytics = () => {
  const [timeRange, setTimeRange] = useState('yearly');
  
  // These would typically be calculated from the data
  const totalSales = 645000;
  const totalOrders = 4250;
  const averageOrderValue = Math.round(totalSales / totalOrders);
  const salesGrowth = 15.2;
  const ordersGrowth = 8.5;
  const aovGrowth = 6.7;
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Sales Analytics</h2>
          <p className="text-muted-foreground">Analyze your sales performance and trends</p>
        </div>
        
        <TimeRangeSelector 
          timeRange={timeRange} 
          onTimeRangeChange={setTimeRange} 
        />
      </div>
      
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <SummaryCard 
          title="Total Sales" 
          value={`₹${totalSales.toLocaleString()}`} 
          growth={salesGrowth} 
          icon={BarChart} 
        />
        
        <SummaryCard 
          title="Total Orders" 
          value={totalOrders.toLocaleString()} 
          growth={ordersGrowth} 
          icon={ShoppingCart} 
        />
        
        <SummaryCard 
          title="Average Order Value" 
          value={`₹${averageOrderValue.toLocaleString()}`} 
          growth={aovGrowth} 
          icon={Receipt} 
        />
      </div>
      
      {/* Main Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <SalesOverviewChart data={monthlySalesData} />
        
        <CategorySalesPieChart 
          data={categorySalesData}
          colors={COLORS}
          title="Sales by Category"
          description="Distribution of sales across product categories"
        />
        
        <CustomerSalesChart data={customerCategoryData} />
      </div>
      
      {/* Top Selling Products */}
      <TopSellingProductsTable products={topSellingProducts} />
    </div>
  );
};

export default SalesAnalytics;
