import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, Edit3, Save, X } from 'lucide-react';
import { CategoryMappingRule } from '@/services/erpnext/types';
import { supabase } from '@/integrations/supabase/client';

interface CategoryMappingManagerProps {
  rules: CategoryMappingRule[];
  onRulesChange: (rules: CategoryMappingRule[]) => void;
}

const CategoryMappingManager: React.FC<CategoryMappingManagerProps> = ({
  rules,
  onRulesChange
}) => {
  const [categories, setCategories] = useState<Array<{id: string, name: string}>>([]);
  const [subcategories, setSubcategories] = useState<Array<{id: string, name: string, category_id: string}>>([]);
  const [editingRule, setEditingRule] = useState<string | null>(null);
  const [newRule, setNewRule] = useState<Partial<CategoryMappingRule>>({
    name: '',
    type: 'pattern',
    pattern: '',
    targetCategoryId: '',
    priority: 1,
    isActive: true
  });

  React.useEffect(() => {
    fetchCategoriesAndSubcategories();
    // Auto-create ERPNext group mapping rules if they don't exist
    initializeERPNextGroupRules();
  }, []);

  const initializeERPNextGroupRules = async () => {
    const hasDropsRule = rules.some(rule => rule.type === 'erpnext-group' && rule.erpnextItemGroup === 'Drops');
    const hasSpecialtiesRule = rules.some(rule => rule.type === 'erpnext-group' && rule.erpnextItemGroup === 'Specialties');
    
    if (!hasDropsRule || !hasSpecialtiesRule) {
      // Find "Specialty Products" category (or similar)
      const specialtyCategory = categories.find(cat => 
        cat.name.toLowerCase().includes('specialty') || 
        cat.name.toLowerCase().includes('problem') ||
        cat.name.toLowerCase().includes('health')
      );
      
      if (specialtyCategory) {
        const newRules = [];
        
        if (!hasDropsRule) {
          newRules.push({
            id: `erpnext-drops-${Date.now()}`,
            name: 'ERPNext Drops → Health Conditions',
            type: 'erpnext-group' as const,
            erpnextItemGroup: 'Drops',
            targetCategoryId: specialtyCategory.id,
            priority: 10,
            isActive: true
          });
        }
        
        if (!hasSpecialtiesRule) {
          newRules.push({
            id: `erpnext-specialties-${Date.now()}`,
            name: 'ERPNext Specialties → Health Conditions',
            type: 'erpnext-group' as const,
            erpnextItemGroup: 'Specialties', 
            targetCategoryId: specialtyCategory.id,
            priority: 10,
            isActive: true
          });
        }
        
        if (newRules.length > 0) {
          onRulesChange([...rules, ...newRules]);
        }
      }
    }
  };

  const fetchCategoriesAndSubcategories = async () => {
    try {
      const { data: categoriesData } = await supabase
        .from('product_categories')
        .select('id, name')
        .eq('type', 'category');

      const { data: subcategoriesData } = await supabase
        .from('product_subcategories')
        .select('id, name, category_id');

      // Filter out any items with empty or null IDs
      const validCategories = (categoriesData || []).filter(cat => cat.id && cat.id.trim() !== '');
      const validSubcategories = (subcategoriesData || []).filter(sub => sub.id && sub.id.trim() !== '');

      setCategories(validCategories);
      setSubcategories(validSubcategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const addRule = () => {
    if (!newRule.name || !newRule.targetCategoryId) return;

    const rule: CategoryMappingRule = {
      id: Date.now().toString(),
      name: newRule.name,
      type: newRule.type || 'pattern',
      pattern: newRule.pattern,
      erpnextItemGroup: newRule.erpnextItemGroup,
      targetCategoryId: newRule.targetCategoryId,
      targetSubcategoryId: newRule.targetSubcategoryId,
      priority: newRule.priority || 1,
      isActive: true
    };

    onRulesChange([...rules, rule]);
    setNewRule({
      name: '',
      type: 'pattern',
      pattern: '',
      targetCategoryId: '',
      priority: 1,
      isActive: true
    });
  };

  const updateRule = (ruleId: string, updates: Partial<CategoryMappingRule>) => {
    const updatedRules = rules.map(rule =>
      rule.id === ruleId ? { ...rule, ...updates } : rule
    );
    onRulesChange(updatedRules);
  };

  const deleteRule = (ruleId: string) => {
    onRulesChange(rules.filter(rule => rule.id !== ruleId));
  };

  const getAvailableSubcategories = (categoryId: string) => {
    return subcategories.filter(sub => sub.category_id === categoryId);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Category Mapping Rules</CardTitle>
          <CardDescription>
            Create rules to automatically assign ERPNext items to website categories. 
            Drops and Specialties will be automatically mapped to health condition subcategories.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add New Rule Form */}
          <div className="border rounded-lg p-4 space-y-4">
            <h4 className="font-medium">Add New Mapping Rule</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Rule Name</Label>
                <Input
                  placeholder="e.g., Drops Pattern"
                  value={newRule.name || ''}
                  onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Rule Type</Label>
                <Select
                  value={newRule.type || 'pattern'}
                  onValueChange={(value) => setNewRule({ ...newRule, type: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select rule type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pattern">Pattern Matching</SelectItem>
                    <SelectItem value="erpnext-group">ERPNext Item Group</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {newRule.type === 'pattern' && (
                <div className="space-y-2">
                  <Label>Pattern (Regex)</Label>
                  <Input
                    placeholder="e.g., .*drops.*"
                    value={newRule.pattern || ''}
                    onChange={(e) => setNewRule({ ...newRule, pattern: e.target.value })}
                  />
                </div>
              )}
              
              {newRule.type === 'erpnext-group' && (
                <div className="space-y-2">
                  <Label>ERPNext Item Group</Label>
                  <Select
                    value={newRule.erpnextItemGroup || 'select-group'}
                    onValueChange={(value) => {
                      setNewRule({ ...newRule, erpnextItemGroup: value === 'select-group' ? '' : value });
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select item group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="select-group">Select item group</SelectItem>
                      <SelectItem value="Drops">Drops</SelectItem>
                      <SelectItem value="Specialties">Specialties</SelectItem>
                      <SelectItem value="Mother Tinctures">Mother Tinctures</SelectItem>
                      <SelectItem value="Bach Flower">Bach Flower</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              <div className="space-y-2">
                <Label>Target Category</Label>
                <Select
                  value={newRule.targetCategoryId || 'select-category'}
                  onValueChange={(value) => {
                    if (value !== 'select-category') {
                      setNewRule({ ...newRule, targetCategoryId: value, targetSubcategoryId: undefined });
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="select-category">Select a category</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Target Subcategory (Optional)</Label>
                <Select
                  value={newRule.targetSubcategoryId || 'auto-assign-sub'}
                  onValueChange={(value) => {
                    setNewRule({ 
                      ...newRule, 
                      targetSubcategoryId: value === 'auto-assign-sub' ? undefined : value 
                    });
                  }}
                  disabled={!newRule.targetCategoryId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Auto-assign by name" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto-assign-sub">Auto-assign by name</SelectItem>
                    {getAvailableSubcategories(newRule.targetCategoryId || '').map((subcategory) => (
                      <SelectItem key={subcategory.id} value={subcategory.id}>
                        {subcategory.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Priority</Label>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={newRule.priority || 1}
                  onChange={(e) => setNewRule({ ...newRule, priority: parseInt(e.target.value) || 1 })}
                />
              </div>
              
              <div className="flex items-center justify-end">
                <Button 
                  onClick={addRule}
                  disabled={!newRule.name || !newRule.targetCategoryId}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Rule
                </Button>
              </div>
            </div>
          </div>

          {/* Existing Rules */}
          {rules.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium">Existing Rules</h4>
              {rules.map((rule) => (
                <div key={rule.id} className="border rounded-lg p-4">
                  {editingRule === rule.id ? (
                    <EditRuleForm
                      rule={rule}
                      categories={categories}
                      subcategories={subcategories}
                      onSave={(updates) => {
                        updateRule(rule.id, updates);
                        setEditingRule(null);
                      }}
                      onCancel={() => setEditingRule(null)}
                    />
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{rule.name}</span>
                          <Badge variant={rule.isActive ? "default" : "secondary"}>
                            {rule.isActive ? "Active" : "Inactive"}
                          </Badge>
                          <Badge variant="outline">Priority: {rule.priority}</Badge>
                          <Badge variant="secondary">{rule.type}</Badge>
                        </div>
                        {rule.type === 'pattern' && rule.pattern && (
                          <p className="text-sm text-muted-foreground">
                            Pattern: <code>{rule.pattern}</code>
                          </p>
                        )}
                        {rule.type === 'erpnext-group' && rule.erpnextItemGroup && (
                          <p className="text-sm text-muted-foreground">
                            ERPNext Group: <code>{rule.erpnextItemGroup}</code>
                          </p>
                        )}
                        <p className="text-sm text-muted-foreground">
                          Target: {categories.find(c => c.id === rule.targetCategoryId)?.name}
                          {rule.targetSubcategoryId && (
                            <> → {subcategories.find(s => s.id === rule.targetSubcategoryId)?.name}</>
                          )}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={rule.isActive}
                          onCheckedChange={(checked) => updateRule(rule.id, { isActive: checked })}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingRule(rule.id)}
                        >
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteRule(rule.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

interface EditRuleFormProps {
  rule: CategoryMappingRule;
  categories: Array<{id: string, name: string}>;
  subcategories: Array<{id: string, name: string, category_id: string}>;
  onSave: (updates: Partial<CategoryMappingRule>) => void;
  onCancel: () => void;
}

const EditRuleForm: React.FC<EditRuleFormProps> = ({
  rule,
  categories,
  subcategories,
  onSave,
  onCancel
}) => {
  const [editedRule, setEditedRule] = useState(rule);

  const getAvailableSubcategories = (categoryId: string) => {
    return subcategories.filter(sub => sub.category_id === categoryId);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Rule Name</Label>
          <Input
            value={editedRule.name}
            onChange={(e) => setEditedRule({ ...editedRule, name: e.target.value })}
          />
        </div>
        
        <div className="space-y-2">
          <Label>Rule Type</Label>
          <Select
            value={editedRule.type}
            onValueChange={(value) => setEditedRule({ ...editedRule, type: value as any })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select rule type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pattern">Pattern Matching</SelectItem>
              <SelectItem value="erpnext-group">ERPNext Item Group</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {editedRule.type === 'pattern' && (
          <div className="space-y-2">
            <Label>Pattern (Regex)</Label>
            <Input
              value={editedRule.pattern || ''}
              onChange={(e) => setEditedRule({ ...editedRule, pattern: e.target.value })}
            />
          </div>
        )}
        
        {editedRule.type === 'erpnext-group' && (
          <div className="space-y-2">
            <Label>ERPNext Item Group</Label>
            <Select
              value={editedRule.erpnextItemGroup || 'select-group'}
              onValueChange={(value) => {
                setEditedRule({ ...editedRule, erpnextItemGroup: value === 'select-group' ? '' : value });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select item group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="select-group">Select item group</SelectItem>
                <SelectItem value="Drops">Drops</SelectItem>
                <SelectItem value="Specialties">Specialties</SelectItem>
                <SelectItem value="Mother Tinctures">Mother Tinctures</SelectItem>
                <SelectItem value="Bach Flower">Bach Flower</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
        
        <div className="space-y-2">
          <Label>Target Category</Label>
          <Select
            value={editedRule.targetCategoryId || 'select-category'}
            onValueChange={(value) => {
              if (value !== 'select-category') {
                setEditedRule({ ...editedRule, targetCategoryId: value, targetSubcategoryId: undefined });
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="select-category">Select a category</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Target Subcategory</Label>
          <Select
            value={editedRule.targetSubcategoryId || 'auto-assign-sub'}
            onValueChange={(value) => {
              setEditedRule({ 
                ...editedRule, 
                targetSubcategoryId: value === 'auto-assign-sub' ? undefined : value 
              });
            }}
            disabled={!editedRule.targetCategoryId}
          >
            <SelectTrigger>
              <SelectValue placeholder="Auto-assign by name" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="auto-assign-sub">Auto-assign by name</SelectItem>
              {getAvailableSubcategories(editedRule.targetCategoryId || '').map((subcategory) => (
                <SelectItem key={subcategory.id} value={subcategory.id}>
                  {subcategory.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Priority</Label>
          <Input
            type="number"
            min="1"
            max="10"
            value={editedRule.priority}
            onChange={(e) => setEditedRule({ ...editedRule, priority: parseInt(e.target.value) || 1 })}
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2 justify-end">
        <Button variant="outline" onClick={onCancel}>
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
        <Button onClick={() => onSave(editedRule)}>
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
      </div>
    </div>
  );
};

export default CategoryMappingManager;
