
import React, { useState } from 'react';
import { BarChart, Calendar, Download, Filter, ArrowUpRight, ArrowDownRight, ShoppingCart, Receipt } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Chart as ChartComponent,
  Line,
  Bar, 
  Area,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart
} from 'recharts';

// Sample data
const monthlySalesData = [
  { name: 'Jan', sales: 24000, orders: 120 },
  { name: 'Feb', sales: 13980, orders: 90 },
  { name: 'Mar', sales: 98000, orders: 300 },
  { name: 'Apr', sales: 39080, orders: 180 },
  { name: 'May', sales: 48000, orders: 240 },
  { name: 'Jun', sales: 38000, orders: 190 },
  { name: 'Jul', sales: 43000, orders: 220 },
];

const categorySalesData = [
  { name: 'Homeopathy', value: 400000 },
  { name: 'Ayurveda', value: 300000 },
  { name: 'Supplements', value: 200000 },
  { name: 'Devices', value: 150000 },
  { name: 'Books', value: 89000 },
];

const topSellingProducts = [
  { id: 1, name: 'Arnica Montana 30C', category: 'Homeopathy', sales: 58500, growth: 12.4 },
  { id: 2, name: 'Ashwagandha Capsules', category: 'Ayurveda', sales: 45700, growth: 8.2 },
  { id: 3, name: 'Nux Vomica 200C', category: 'Homeopathy', sales: 38900, growth: 15.6 },
  { id: 4, name: 'Vitamin D3 Supplements', category: 'Supplements', sales: 35200, growth: -3.1 },
  { id: 5, name: 'Digital Thermometer', category: 'Devices', sales: 27800, growth: 5.7 },
];

const customerCategoryData = [
  { name: 'Gold', value: 250000 },
  { name: 'Silver', value: 180000 },
  { name: 'Bronze', value: 120000 },
  { name: 'New', value: 95000 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

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
        
        <div className="flex items-center gap-2">
          <Tabs defaultValue="yearly" value={timeRange} onValueChange={setTimeRange}>
            <TabsList>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Button>
          
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalSales.toLocaleString()}</div>
            <p className={`text-xs flex items-center mt-1 ${salesGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {salesGrowth >= 0 ? (
                <>
                  +{salesGrowth}% <ArrowUpRight className="ml-1 h-3 w-3" />
                </>
              ) : (
                <>
                  {salesGrowth}% <ArrowDownRight className="ml-1 h-3 w-3" />
                </>
              )}
              <span className="ml-1 text-muted-foreground">vs previous period</span>
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders.toLocaleString()}</div>
            <p className={`text-xs flex items-center mt-1 ${ordersGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {ordersGrowth >= 0 ? (
                <>
                  +{ordersGrowth}% <ArrowUpRight className="ml-1 h-3 w-3" />
                </>
              ) : (
                <>
                  {ordersGrowth}% <ArrowDownRight className="ml-1 h-3 w-3" />
                </>
              )}
              <span className="ml-1 text-muted-foreground">vs previous period</span>
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{averageOrderValue.toLocaleString()}</div>
            <p className={`text-xs flex items-center mt-1 ${aovGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {aovGrowth >= 0 ? (
                <>
                  +{aovGrowth}% <ArrowUpRight className="ml-1 h-3 w-3" />
                </>
              ) : (
                <>
                  {aovGrowth}% <ArrowDownRight className="ml-1 h-3 w-3" />
                </>
              )}
              <span className="ml-1 text-muted-foreground">vs previous period</span>
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>Monthly sales and orders for the current year</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <ChartComponent
                data={monthlySalesData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="sales" name="Sales (₹)" fill="#8884d8" />
                <Line yAxisId="right" type="monotone" dataKey="orders" name="Orders" stroke="#82ca9d" />
              </ChartComponent>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>Distribution of sales across product categories</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categorySalesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categorySalesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`₹${value.toLocaleString()}`, 'Sales']}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Sales by Customer Category</CardTitle>
            <CardDescription>Distribution of sales by customer segments</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <ChartComponent
                data={customerCategoryData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`₹${value.toLocaleString()}`, 'Sales']}
                />
                <Legend />
                <Bar dataKey="value" name="Sales (₹)" fill="#82ca9d" />
              </ChartComponent>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* Top Selling Products */}
      <Card>
        <CardHeader>
          <CardTitle>Top Selling Products</CardTitle>
          <CardDescription>Products generating the highest revenue</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-3 text-left font-medium">Rank</th>
                  <th className="py-3 text-left font-medium">Product</th>
                  <th className="py-3 text-left font-medium">Category</th>
                  <th className="py-3 text-right font-medium">Sales</th>
                  <th className="py-3 text-right font-medium">Growth</th>
                </tr>
              </thead>
              <tbody>
                {topSellingProducts.map((product, index) => (
                  <tr key={product.id} className="border-b">
                    <td className="py-3">{index + 1}</td>
                    <td className="py-3 font-medium">{product.name}</td>
                    <td className="py-3">{product.category}</td>
                    <td className="py-3 text-right">₹{product.sales.toLocaleString()}</td>
                    <td className={`py-3 text-right ${product.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      <span className="flex items-center justify-end">
                        {product.growth >= 0 ? (
                          <>
                            +{product.growth}% <ArrowUpRight className="ml-1 h-3 w-3" />
                          </>
                        ) : (
                          <>
                            {product.growth}% <ArrowDownRight className="ml-1 h-3 w-3" />
                          </>
                        )}
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

export default SalesAnalytics;
