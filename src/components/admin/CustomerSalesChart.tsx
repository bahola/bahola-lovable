
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface CustomerData {
  name: string;
  value: number;
}

interface CustomerSalesChartProps {
  data: CustomerData[];
}

const CustomerSalesChart = ({ data }: CustomerSalesChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales by Customer Category</CardTitle>
        <CardDescription>Distribution of sales by customer segments</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart
            data={data}
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
          </RechartsBarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CustomerSalesChart;
