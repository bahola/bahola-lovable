import React, { useState, useMemo } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit3, Save, X } from 'lucide-react';
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
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [loadingCategories, setLoadingCategories] = useState(false);

  React.useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoadingCategories(true);
    try {
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('product_categories')
        .select('id, name')
        .eq('type', 'category');

      if (categoriesError) throw categoriesError;

      const { data: subcategoriesData, error: subcategoriesError } = await supabase
        .from('product_subcategories')
        .select('id, name, category_id');

      if (subcategoriesError) throw subcategoriesError;

      const categoryOptions: CategoryOption[] = (categoriesData || []).map(cat => ({
        id: cat.id,
        name: cat.name,
        subcategories: (subcategoriesData || [])
          .filter(sub => sub.category_id === cat.id)
          .map(sub => ({ id: sub.id, name: sub.name }))
      }));

      setCategories(categoryOptions);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoadingCategories(false);
    }
  };

  // Apply mapping rules to determine proposed categories with health condition analysis
  const itemsWithProposedCategories = useMemo(() => {
    return items.map(item => {
      // Find the highest priority matching rule
      const matchingRule = mappingRules
        .filter(rule => rule.isActive)
        .sort((a, b) => b.priority - a.priority)
        .find(rule => {
          if (rule.type === 'pattern' && rule.pattern) {
            try {
              const regex = new RegExp(rule.pattern, 'i');
              return regex.test(item.item_name) || regex.test(item.item_code);
            } catch (e) {
              console.warn('Invalid regex pattern:', rule.pattern);
              return false;
            }
          }
          
          if (rule.type === 'erpnext-group' && rule.erpnextItemGroup) {
            return item.item_group === rule.erpnextItemGroup;
          }
          
          return false;
        });

      let proposedCategoryId = item.proposedCategoryId;
      let proposedSubcategoryId = item.proposedSubcategoryId;
      let mappingRuleName = item.mappingRule;
      let suggestedSubcategories: Array<{id: string, name: string, confidence: number}> = [];

      if (matchingRule) {
        proposedCategoryId = matchingRule.targetCategoryId;
        proposedSubcategoryId = matchingRule.targetSubcategoryId;
        mappingRuleName = matchingRule.name;

        // For ERPNext groups (Drops/Specialties), provide health condition suggestions
        if (matchingRule.type === 'erpnext-group' && 
            (matchingRule.erpnextItemGroup === 'Drops' || matchingRule.erpnextItemGroup === 'Specialties')) {
          
          // Import health condition analyzer
          import('@/services/erpnext/healthConditionMatcher').then(({ analyzeHealthConditions }) => {
            const healthSuggestions = analyzeHealthConditions(item.item_name, item.description);
            
            // Match with actual subcategories
            const category = categories.find(c => c.id === proposedCategoryId);
            if (category) {
              suggestedSubcategories = healthSuggestions
                .map(suggestion => {
                  const matchedSubcat = category.subcategories.find(sub => 
                    sub.name.toLowerCase().includes(suggestion.name.toLowerCase()) ||
                    suggestion.name.toLowerCase().includes(sub.name.toLowerCase())
                  );
                  
                  return matchedSubcat ? {
                    id: matchedSubcat.id,
                    name: matchedSubcat.name,
                    confidence: suggestion.confidence
                  } : null;
                })
                .filter(Boolean) as Array<{id: string, name: string, confidence: number}>;
            }
          });
        }

        // Auto-assign subcategory based on first letter if not specified and no health suggestions
        if (!proposedSubcategoryId && proposedCategoryId && suggestedSubcategories.length === 0) {
          const category = categories.find(c => c.id === proposedCategoryId);
          if (category) {
            const firstLetter = item.item_name.charAt(0).toUpperCase();
            const alphabetSubcat = category.subcategories.find(s => 
              s.name === firstLetter || s.name.toLowerCase() === firstLetter.toLowerCase()
            );
            if (alphabetSubcat) {
              proposedSubcategoryId = alphabetSubcat.id;
            }
          }
        }
      }

      const proposedCategory = categories.find(c => c.id === proposedCategoryId);
      const proposedSubcategory = proposedCategory?.subcategories.find(s => s.id === proposedSubcategoryId);

      return {
        ...item,
        proposedCategoryId,
        proposedSubcategoryId,
        proposedCategoryName: proposedCategory?.name,
        proposedSubcategoryName: proposedSubcategory?.name,
        mappingRule: mappingRuleName,
        suggestedSubcategories
      };
    });
  }, [items, mappingRules, categories]);

  const handleSaveCategoryAssignment = (item: ImportPreviewItem, categoryId: string, subcategoryId?: string) => {
    onCategoryAssignmentChange(item.item_code, categoryId, subcategoryId);
    setEditingItem(null);
  };

  const categorizedCount = itemsWithProposedCategories.filter(item => item.proposedCategoryId).length;
  const uncategorizedCount = itemsWithProposedCategories.length - categorizedCount;

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
          <Badge variant="secondary">{categorizedCount} categorized</Badge>
          {uncategorizedCount > 0 && (
            <Badge variant="destructive">{uncategorizedCount} uncategorized</Badge>
          )}
        </div>
      </div>

      <div className="border rounded-md max-h-96 overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Select</TableHead>
              <TableHead>Item Code</TableHead>
              <TableHead>Item Name</TableHead>
              <TableHead>HSN Code</TableHead>
              <TableHead>Rate</TableHead>
              <TableHead>Proposed Category</TableHead>
              <TableHead>Health Suggestions</TableHead>
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
                  {editingItem === item.item_code ? (
                    <CategoryEditor
                      item={item}
                      categories={categories}
                      onSave={handleSaveCategoryAssignment}
                      onCancel={() => setEditingItem(null)}
                    />
                  ) : (
                    <div className="space-y-1">
                      {item.proposedCategoryName ? (
                        <div>
                          <Badge variant="outline">
                            {item.proposedCategoryName}
                            {item.proposedSubcategoryName && ` → ${item.proposedSubcategoryName}`}
                          </Badge>
                          {item.mappingRule && (
                            <p className="text-xs text-muted-foreground">
                              Rule: {item.mappingRule}
                            </p>
                          )}
                        </div>
                      ) : (
                        <Badge variant="destructive">Uncategorized</Badge>
                      )}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  {item.suggestedSubcategories && item.suggestedSubcategories.length > 0 ? (
                    <div className="space-y-1">
                      {item.suggestedSubcategories.slice(0, 2).map((suggestion, idx) => (
                        <Badge 
                          key={idx} 
                          variant="secondary" 
                          className="text-xs"
                          title={`Confidence: ${Math.round(suggestion.confidence * 100)}%`}
                        >
                          {suggestion.name}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <span className="text-muted-foreground text-xs">No suggestions</span>
                  )}
                </TableCell>
                <TableCell>
                  {editingItem === item.item_code ? null : (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingItem(item.item_code)}
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

interface CategoryEditorProps {
  item: ImportPreviewItem;
  categories: CategoryOption[];
  onSave: (item: ImportPreviewItem, categoryId: string, subcategoryId?: string) => void;
  onCancel: () => void;
}

const CategoryEditor: React.FC<CategoryEditorProps> = ({ item, categories, onSave, onCancel }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(item.proposedCategoryId || 'no-category');
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(item.proposedSubcategoryId || 'auto-assign');

  const selectedCategory = categories.find(c => c.id === selectedCategoryId);

  const handleSave = () => {
    if (selectedCategoryId && selectedCategoryId !== 'no-category') {
      const subcategoryId = selectedSubcategoryId === 'auto-assign' ? undefined : selectedSubcategoryId;
      onSave(item, selectedCategoryId, subcategoryId);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Select value={selectedCategoryId} onValueChange={setSelectedCategoryId}>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
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
        onValueChange={setSelectedSubcategoryId}
        disabled={!selectedCategoryId || selectedCategoryId === 'no-category'}
      >
        <SelectTrigger className="w-24">
          <SelectValue placeholder="Sub" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="auto-assign">Auto</SelectItem>
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
