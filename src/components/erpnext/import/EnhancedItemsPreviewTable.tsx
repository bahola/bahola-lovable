
import React, { useState, useMemo } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit3, Save, X, AlertTriangle } from 'lucide-react';
import { ImportPreviewItem, CategoryMappingRule } from '@/services/erpnext/types';
import { supabase } from '@/integrations/supabase/client';

interface CategoryOption {
  id: string;
  name: string;
  subcategories: { id: string; name: string; }[];
}

interface EnhancedItemsPreviewTableProps {
  items: ImportPreviewItem[];
  selectedItems: Set<string>;
  mappingRules: CategoryMappingRule[];
  onSelectAll: (checked: boolean) => void;
  onSelectItem: (itemCode: string, checked: boolean) => void;
  onCategoryAssignmentChange: (itemCode: string, categoryId: string, subcategoryId?: string) => void;
}

const EnhancedItemsPreviewTable: React.FC<EnhancedItemsPreviewTableProps> = ({
  items,
  selectedItems,
  mappingRules,
  onSelectAll,
  onSelectItem,
  onCategoryAssignmentChange
}) => {
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [editingItems, setEditingItems] = useState<Set<string>>(new Set());
  const [loadingCategories, setLoadingCategories] = useState(false);

  React.useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoadingCategories(true);
    try {
      console.log('Fetching categories and subcategories...');
      
      // Fetch all categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('product_categories')
        .select('id, name, type');

      if (categoriesError) {
        console.error('Error fetching categories:', categoriesError);
        throw categoriesError;
      }

      console.log('Categories fetched:', categoriesData);

      const { data: subcategoriesData, error: subcategoriesError } = await supabase
        .from('product_subcategories')
        .select('id, name, category_id');

      if (subcategoriesError) {
        console.error('Error fetching subcategories:', subcategoriesError);
        throw subcategoriesError;
      }

      console.log('Subcategories fetched:', subcategoriesData);

      const categoryOptions: CategoryOption[] = (categoriesData || []).map(cat => {
        const categorySubcategories = (subcategoriesData || [])
          .filter(sub => sub.category_id === cat.id)
          .map(sub => ({ id: sub.id, name: sub.name }));
        
        console.log(`Category "${cat.name}" has ${categorySubcategories.length} subcategories:`, categorySubcategories);
        
        return {
          id: cat.id,
          name: cat.name,
          subcategories: categorySubcategories
        };
      });

      console.log('Final category options:', categoryOptions);
      setCategories(categoryOptions);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoadingCategories(false);
    }
  };

  // Enhanced items with better mapping display
  const itemsWithProposedCategories = useMemo(() => {
    return items.map(item => {
      const proposedCategory = categories.find(c => c.id === item.proposedCategoryId);
      const proposedSubcategory = proposedCategory?.subcategories.find(s => s.id === item.proposedSubcategoryId);

      return {
        ...item,
        proposedCategoryName: proposedCategory?.name,
        proposedSubcategoryName: proposedSubcategory?.name,
      };
    });
  }, [items, categories]);

  const handleSaveCategoryAssignment = (item: ImportPreviewItem, categoryId: string, subcategoryId?: string) => {
    console.log(`Saving category assignment for ${item.item_code}: categoryId=${categoryId}, subcategoryId=${subcategoryId}`);
    onCategoryAssignmentChange(item.item_code, categoryId, subcategoryId);
    setEditingItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(item.item_code);
      return newSet;
    });
  };

  const handleEditItem = (itemCode: string) => {
    console.log(`Starting edit for item: ${itemCode}`);
    setEditingItems(prev => {
      const newSet = new Set(prev);
      newSet.add(itemCode);
      return newSet;
    });
  };

  const handleCancelEdit = (itemCode: string) => {
    console.log(`Canceling edit for item: ${itemCode}`);
    setEditingItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(itemCode);
      return newSet;
    });
  };

  const categorizedCount = itemsWithProposedCategories.filter(item => item.proposedCategoryId && item.proposedSubcategoryId).length;
  const requiresManualCount = itemsWithProposedCategories.filter(item => item.requiresManualSelection).length;
  const uncategorizedCount = itemsWithProposedCategories.length - categorizedCount;

  // Find any category that contains health condition subcategories for bulk assignment
  const categoryWithHealthConditions = categories.find(c => 
    c.subcategories.some(sub => 
      ['Digestive Health', 'Respiratory Health', 'Heart Health', 'Mental Health & Anxiety', 'Skin Care'].includes(sub.name)
    )
  );
  
  console.log('Category with health conditions found:', categoryWithHealthConditions);
  console.log('Available categories:', categories.map(c => c.name));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="text-sm font-medium">
            Import Preview ({items.length} total)
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
        
        <div className="flex items-center gap-2">
          <Badge variant="default">{selectedItems.size} selected</Badge>
          <Badge variant="secondary">{categorizedCount} fully mapped</Badge>
          {requiresManualCount > 0 && (
            <Badge variant="outline" className="border-orange-300 text-orange-700">
              <AlertTriangle className="w-3 h-3 mr-1" />
              {requiresManualCount} need subcategory
            </Badge>
          )}
          {uncategorizedCount > 0 && (
            <Badge variant="destructive">{uncategorizedCount} unmapped</Badge>
          )}
        </div>
      </div>

      {categoryWithHealthConditions && categoryWithHealthConditions.subcategories.length > 0 && requiresManualCount > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <h4 className="text-sm font-medium mb-2">Quick Bulk Assignment</h4>
          <p className="text-xs text-gray-600 mb-2">
            Assign all Drops/Specialties products to a health condition subcategory:
          </p>
          <BulkSubcategoryAssigner 
            subcategories={categoryWithHealthConditions.subcategories}
            items={itemsWithProposedCategories.filter(item => 
              item.requiresManualSelection && 
              item.proposedCategoryId === categoryWithHealthConditions.id
            )}
            onBulkAssign={(subcategoryId) => {
              itemsWithProposedCategories
                .filter(item => item.requiresManualSelection && item.proposedCategoryId === categoryWithHealthConditions.id)
                .forEach(item => {
                  onCategoryAssignmentChange(item.item_code, categoryWithHealthConditions.id, subcategoryId);
                });
            }}
          />
        </div>
      )}

      {loadingCategories && (
        <div className="text-center py-4 text-gray-500">
          Loading categories...
        </div>
      )}

      <div className="border rounded-md max-h-96 overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Select</TableHead>
              <TableHead>Item Code</TableHead>
              <TableHead>Item Name</TableHead>
              <TableHead>HSN Code</TableHead>
              <TableHead>Rate</TableHead>
              <TableHead>Category Assignment</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {itemsWithProposedCategories.slice(0, 50).map((item) => (
              <TableRow key={item.item_code}>
                <TableCell>
                  <Checkbox 
                    checked={selectedItems.has(item.item_code)}
                    onCheckedChange={(checked) => onSelectItem(item.item_code, !!checked)}
                  />
                </TableCell>
                <TableCell className="font-mono text-sm">{item.item_code}</TableCell>
                <TableCell>{item.item_name}</TableCell>
                <TableCell>{item.gst_hsn_code || item.hsn_code || '-'}</TableCell>
                <TableCell>₹{item.standard_rate || 0}</TableCell>
                <TableCell>
                  {editingItems.has(item.item_code) ? (
                    <CategoryEditor
                      item={item}
                      categories={categories}
                      onSave={handleSaveCategoryAssignment}
                      onCancel={() => handleCancelEdit(item.item_code)}
                    />
                  ) : (
                    <div className="space-y-1">
                      {item.proposedCategoryName ? (
                        <div>
                          <Badge variant="outline">
                            {item.proposedCategoryName}
                            {item.proposedSubcategoryName && ` → ${item.proposedSubcategoryName}`}
                          </Badge>
                          {item.requiresManualSelection && !item.proposedSubcategoryName && (
                            <div className="flex items-center gap-1 mt-1">
                              <AlertTriangle className="w-3 h-3 text-orange-500" />
                              <span className="text-xs text-orange-600">Needs subcategory</span>
                            </div>
                          )}
                          {item.mappingRule && (
                            <p className="text-xs text-muted-foreground">
                              Rule: {item.mappingRule}
                            </p>
                          )}
                        </div>
                      ) : (
                        <Badge variant="destructive">Unmapped</Badge>
                      )}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  {editingItems.has(item.item_code) ? null : (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditItem(item.item_code)}
                    >
                      <Edit3 className="h-3 w-3" />
                    </Button>
                  )}
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

interface BulkSubcategoryAssignerProps {
  subcategories: { id: string; name: string; }[];
  items: ImportPreviewItem[];
  onBulkAssign: (subcategoryId: string) => void;
}

const BulkSubcategoryAssigner: React.FC<BulkSubcategoryAssignerProps> = ({
  subcategories,
  items,
  onBulkAssign
}) => {
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string>('');

  console.log('BulkSubcategoryAssigner subcategories:', subcategories);

  return (
    <div className="flex items-center gap-2">
      <Select value={selectedSubcategoryId} onValueChange={setSelectedSubcategoryId}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Select health condition" />
        </SelectTrigger>
        <SelectContent className="max-h-60 overflow-auto">
          {subcategories.map((subcategory) => (
            <SelectItem key={subcategory.id} value={subcategory.id}>
              {subcategory.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button 
        size="sm" 
        onClick={() => selectedSubcategoryId && onBulkAssign(selectedSubcategoryId)}
        disabled={!selectedSubcategoryId}
      >
        Assign to {items.length} items
      </Button>
    </div>
  );
};

interface CategoryEditorProps {
  item: ImportPreviewItem;
  categories: CategoryOption[];
  onSave: (item: ImportPreviewItem, categoryId: string, subcategoryId?: string) => void;
  onCancel: () => void;
}

const CategoryEditor: React.FC<CategoryEditorProps> = ({ item, categories, onSave, onCancel }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(item.proposedCategoryId || 'no-category');
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(item.proposedSubcategoryId || 'no-subcategory');

  const selectedCategory = categories.find(c => c.id === selectedCategoryId);

  const handleSave = () => {
    if (selectedCategoryId && selectedCategoryId !== 'no-category') {
      const subcategoryId = selectedSubcategoryId === 'no-subcategory' ? undefined : selectedSubcategoryId;
      console.log(`CategoryEditor saving: categoryId=${selectedCategoryId}, subcategoryId=${subcategoryId}`);
      onSave(item, selectedCategoryId, subcategoryId);
    }
  };

  console.log('CategoryEditor selectedCategory:', selectedCategory);
  console.log('CategoryEditor available categories:', categories);

  return (
    <div className="flex items-center gap-2">
      <Select value={selectedCategoryId} onValueChange={(value) => {
        console.log(`CategoryEditor category changed to: ${value}`);
        setSelectedCategoryId(value);
        setSelectedSubcategoryId('no-subcategory');
      }}>
        <SelectTrigger className="w-36">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent className="z-50 bg-white">
          <SelectItem value="no-category">No Category</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select 
        value={selectedSubcategoryId} 
        onValueChange={(value) => {
          console.log(`CategoryEditor subcategory changed to: ${value}`);
          setSelectedSubcategoryId(value);
        }}
        disabled={!selectedCategoryId || selectedCategoryId === 'no-category'}
      >
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Subcategory" />
        </SelectTrigger>
        <SelectContent className="max-h-60 overflow-auto z-50 bg-white">
          <SelectItem value="no-subcategory">None</SelectItem>
          {selectedCategory?.subcategories.map((subcategory) => (
            <SelectItem key={subcategory.id} value={subcategory.id}>
              {subcategory.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSave}
          disabled={!selectedCategoryId || selectedCategoryId === 'no-category'}
        >
          <Save className="h-3 w-3" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onCancel}
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export default EnhancedItemsPreviewTable;
