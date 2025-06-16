
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ERPNextItem } from '@/types/erpnext';

interface ItemsPreviewTableProps {
  items: ERPNextItem[];
  selectedItems: Set<string>;
  onSelectAll: (checked: boolean) => void;
  onSelectItem: (itemCode: string, checked: boolean) => void;
}

const ItemsPreviewTable: React.FC<ItemsPreviewTableProps> = ({
  items,
  selectedItems,
  onSelectAll,
  onSelectItem
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="text-sm font-medium">
            Items from ERPNext ({items.length} total)
          </h3>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="selectAll"
              checked={selectedItems.size === items.length}
              onCheckedChange={onSelectAll}
            />
            <Label htmlFor="selectAll">Select All</Label>
          </div>
        </div>
        
        <Badge variant="secondary">
          {selectedItems.size} selected
        </Badge>
      </div>

      <div className="border rounded-md max-h-96 overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Select</TableHead>
              <TableHead>Item Code</TableHead>
              <TableHead>Item Name</TableHead>
              <TableHead>Item Group</TableHead>
              <TableHead>HSN Code</TableHead>
              <TableHead>Rate</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.slice(0, 50).map((item) => (
              <TableRow key={item.item_code}>
                <TableCell>
                  <Checkbox 
                    checked={selectedItems.has(item.item_code)}
                    onCheckedChange={(checked) => onSelectItem(item.item_code, !!checked)}
                  />
                </TableCell>
                <TableCell className="font-mono text-sm">{item.item_code}</TableCell>
                <TableCell>{item.item_name}</TableCell>
                <TableCell>{item.item_group}</TableCell>
                <TableCell>{item.gst_hsn_code || item.hsn_code || '-'}</TableCell>
                <TableCell>₹{item.standard_rate || 0}</TableCell>
                <TableCell>
                  <Badge variant={item.disabled ? "destructive" : "default"}>
                    {item.disabled ? 'Disabled' : 'Active'}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {items.length > 50 && (
          <div className="p-2 text-sm text-gray-500 text-center">
            Showing first 50 items of {items.length} total
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemsPreviewTable;
