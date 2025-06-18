
import React from 'react';
import RevenueChart from '@/components/admin/RevenueChart';
import SummaryCard from '@/components/admin/SummaryCard';
import StatsCard from '@/components/admin/StatsCard';
import TopSellingProductsTable from '@/components/admin/TopSellingProductsTable';
import RecentOrdersTable from '@/components/admin/RecentOrdersTable';
import { DoctorApprovalCard } from '@/components/admin/DoctorApprovalCard';
import { 
  Users, 
  ShoppingCart, 
  DollarSign, 
  Package,
  TrendingUp,
  AlertCircle 
} from 'lucide-react';

// Sample data for the components
const sampleRevenueData = [
  { name: 'Jan', total: 12000 },
  { name: 'Feb', total: 15000 },
  { name: 'Mar', total: 18000 },
  { name: 'Apr', total: 22000 },
  { name: 'May', total: 25000 },
  { name: 'Jun', total: 28000 },
];

const sampleTopProducts = [
  { id: 1, name: 'Arnica Montana', category: 'Pain Relief', sales: 15000, growth: 12.5 },
  { id: 2, name: 'Belladonna', category: 'Fever', sales: 12000, growth: 8.3 },
  { id: 3, name: 'Nux Vomica', category: 'Digestive', sales: 10000, growth: -2.1 },
  { id: 4, name: 'Pulsatilla', category: 'Women\'s Health', sales: 9500, growth: 15.7 },
  { id: 5, name: 'Rhus Tox', category: 'Joint Pain', sales: 8800, growth: 6.9 },
];

const sampleRecentOrders = [
  { id: 'ORD-001', customer: 'Dr. Sarah Wilson', total: '₹2,340', status: 'Completed' },
  { id: 'ORD-002', customer: 'Dr. Raj Kumar', total: '₹1,890', status: 'Processing' },
  { id: 'ORD-003', customer: 'Dr. Emily Chen', total: '₹3,200', status: 'Pending' },
  { id: 'ORD-004', customer: 'Dr. Michael Brown', total: '₹1,560', status: 'Completed' },
  { id: 'ORD-005', customer: 'Dr. Priya Sharma', total: '₹2,780', status: 'Processing' },
];

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
          changePercentage={20.1}
          icon={DollarSign}
        />
        <StatsCard
          title="Orders"
          value="1,234"
          changePercentage={15.2}
          icon={ShoppingCart}
        />
        <StatsCard
          title="Customers"
          value="456"
          changePercentage={8.5}
          icon={Users}
        />
        <StatsCard
          title="Products"
          value="89"
          changePercentage={2.1}
          icon={Package}
        />
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <SummaryCard
          title="Monthly Growth"
          value="12.5%"
          growth={12.5}
          icon={TrendingUp}
        />
        <SummaryCard
          title="Pending Orders"
          value="23"
          growth={-5.2}
          icon={AlertCircle}
        />
        <SummaryCard
          title="Active Products"
          value="67"
          growth={8.1}
          icon={Package}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
        <RevenueChart data={sampleRevenueData} />
        <div className="space-y-4">
          <TopSellingProductsTable products={sampleTopProducts} />
        </div>
      </div>

      {/* Recent Orders */}
      <RecentOrdersTable orders={sampleRecentOrders} />
    </div>
  );
};

export default AdminHome;
