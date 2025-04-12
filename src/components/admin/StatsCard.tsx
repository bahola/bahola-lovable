
import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  changePercentage: number;
  icon: LucideIcon;
}

const StatsCard = ({ title, value, changePercentage, icon: Icon }: StatsCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground flex items-center mt-1">
          {changePercentage >= 0 ? '+' : ''}{changePercentage}% 
          <ArrowUpRight className={`ml-1 h-3 w-3 ${changePercentage >= 0 ? 'text-green-500' : 'text-red-500'}`} />
          <span className="ml-1">from last month</span>
        </p>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
