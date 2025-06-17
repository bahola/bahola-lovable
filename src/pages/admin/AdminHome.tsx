
import React from 'react';
import { RevenueChart } from '@/components/admin/RevenueChart';
import { SummaryCard } from '@/components/admin/SummaryCard';
import { StatsCard } from '@/components/admin/StatsCard';
import { TopSellingProductsTable } from '@/components/admin/TopSellingProductsTable';
import { RecentOrdersTable } from '@/components/admin/RecentOrdersTable';
import { DoctorApprovalCard } from '@/components/admin/DoctorApprovalCard';
import { 
  Users, 
  ShoppingCart, 
  DollarSign, 
  Package,
  TrendingUp,
  AlertCircle 
} from 'lucide-react';

const AdminHome = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </div>

      {/* Doctor Approval Section */}
      <DoctorApprovalCard />

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Revenue"
          value="₹45,231"
          change="+20.1%"
          icon={DollarSign}
          trend="up"
        />
        <StatsCard
          title="Orders"
          value="1,234"
          change="+15.2%"
          icon={ShoppingCart}
          trend="up"
        />
        <StatsCard
          title="Customers"
          value="456"
          change="+8.5%"
          icon={Users}
          trend="up"
        />
        <StatsCard
          title="Products"
          value="89"
          change="+2.1%"
          icon={Package}
          trend="up"
        />
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <SummaryCard
          title="Monthly Growth"
          value="12.5%"
          description="Compared to last month"
          icon={TrendingUp}
          color="green"
        />
        <SummaryCard
          title="Pending Orders"
          value="23"
          description="Require attention"
          icon={AlertCircle}
          color="orange"
        />
        <SummaryCard
          title="Active Products"
          value="67"
          description="Currently in stock"
          icon={Package}
          color="blue"
        />
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
        <RevenueChart />
        <div className="space-y-4">
          <TopSellingProductsTable />
        </div>
      </div>

      {/* Recent Orders */}
      <RecentOrdersTable />
    </div>
  );
};

export default AdminHome;
