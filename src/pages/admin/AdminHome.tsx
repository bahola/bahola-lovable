
import React from 'react';
import { ArrowUpRight, DollarSign, Package, ShoppingBag, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart as RechartsBarChart,
  LineChart as RechartsLineChart,
  AreaChart as RechartsAreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  Bar,
  Area
} from 'recharts';

// Sample data - would be fetched from API in a real app
const salesData = [
  { name: 'Jan', total: 2400 },
  { name: 'Feb', total: 1398 },
  { name: 'Mar', total: 9800 },
  { name: 'Apr', total: 3908 },
  { name: 'May', total: 4800 },
  { name: 'Jun', total: 3800 },
  { name: 'Jul', total: 4300 },
];

const recentOrders = [
  { id: '#ORD-001', customer: 'John Doe', total: '₹1,249.00', status: 'Completed' },
  { id: '#ORD-002', customer: 'Jane Smith', total: '₹2,546.00', status: 'Processing' },
  { id: '#ORD-003', customer: 'Robert Brown', total: '₹899.00', status: 'Pending' },
  { id: '#ORD-004', customer: 'Emily Wilson', total: '₹1,799.00', status: 'Completed' },
  { id: '#ORD-005', customer: 'Michael Davis', total: '₹3,299.00', status: 'Cancelled' },
];

const AdminHome = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Overview of your business performance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹45,231.89</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              +20.1% <ArrowUpRight className="ml-1 h-3 w-3 text-green-500" />
              <span className="ml-1">from last month</span>
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              +12.2% <ArrowUpRight className="ml-1 h-3 w-3 text-green-500" />
              <span className="ml-1">from last month</span>
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">251</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              +8.1% <ArrowUpRight className="ml-1 h-3 w-3 text-green-500" />
              <span className="ml-1">from last month</span>
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,429</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              +5.4% <ArrowUpRight className="ml-1 h-3 w-3 text-green-500" />
              <span className="ml-1">from last month</span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Over Time</CardTitle>
            <CardDescription>Monthly revenue for the current year</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsAreaChart
                data={salesData}
                margin={{
                  top: 5,
                  right: 10,
                  left: 10,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="total" stroke="#3b82f6" fill="#93c5fd" />
              </RechartsAreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Product Categories</CardTitle>
            <CardDescription>Sales by category</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart
                data={[
                  { name: 'Homeopathy', value: 4000 },
                  { name: 'Ayurveda', value: 3000 },
                  { name: 'Supplements', value: 2000 },
                  { name: 'Devices', value: 2780 },
                  { name: 'Books', value: 1890 },
                ]}
                margin={{
                  top: 5,
                  right: 10,
                  left: 10,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Recent customer orders and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-3 text-left font-medium">Order</th>
                  <th className="py-3 text-left font-medium">Customer</th>
                  <th className="py-3 text-left font-medium">Total</th>
                  <th className="py-3 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b">
                    <td className="py-3">{order.id}</td>
                    <td className="py-3">{order.customer}</td>
                    <td className="py-3">{order.total}</td>
                    <td className="py-3">
                      <span 
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium
                          ${order.status === 'Completed' ? 'bg-green-100 text-green-800' : ''}
                          ${order.status === 'Processing' ? 'bg-blue-100 text-blue-800' : ''}
                          ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                          ${order.status === 'Cancelled' ? 'bg-red-100 text-red-800' : ''}
                        `}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminHome;
