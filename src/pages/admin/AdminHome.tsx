
import React from 'react';
import { DollarSign, Package, ShoppingBag, Users } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import StatsCard from '@/components/admin/StatsCard';
import RevenueChart from '@/components/admin/RevenueChart';
import CategorySalesChart from '@/components/admin/CategorySalesChart';
import RecentOrdersTable from '@/components/admin/RecentOrdersTable';
import { salesData, categorySalesData, recentOrders } from '@/components/admin/DashboardData';

const AdminHome = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Overview of your business performance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Total Revenue" 
          value="₹45,231.89" 
          changePercentage={20.1} 
          icon={DollarSign} 
        />
        <StatsCard 
          title="Orders" 
          value="+573" 
          changePercentage={12.2} 
          icon={ShoppingBag} 
        />
        <StatsCard 
          title="Products" 
          value="251" 
          changePercentage={8.1} 
          icon={Package} 
        />
        <StatsCard 
          title="Active Users" 
          value="1,429" 
          changePercentage={5.4} 
          icon={Users} 
        />
      </div>

      <Separator />

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <RevenueChart data={salesData} />
        <CategorySalesChart data={categorySalesData} />
      </div>

      <Separator />

      {/* Recent Orders Table */}
      <RecentOrdersTable orders={recentOrders} />
    </div>
  );
};

export default AdminHome;
