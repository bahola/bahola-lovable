
import React from 'react';
import { ArrowUpRight, ArrowDownRight, LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SummaryCardProps {
  title: string;
  value: string;
  growth: number;
  icon: LucideIcon;
}

const SummaryCard = ({ title, value, growth, icon: Icon }: SummaryCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs flex items-center mt-1 ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {growth >= 0 ? (
            <>
              +{growth}% <ArrowUpRight className="ml-1 h-3 w-3" />
            </>
          ) : (
            <>
              {growth}% <ArrowDownRight className="ml-1 h-3 w-3" />
            </>
          )}
          <span className="ml-1 text-muted-foreground">vs previous period</span>
        </p>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
