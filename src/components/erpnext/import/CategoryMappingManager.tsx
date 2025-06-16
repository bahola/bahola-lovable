import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, Save } from 'lucide-react';
import { CategoryMappingRule } from '@/services/erpnext/types';
import { supabase } from '@/integrations/supabase/client';

interface CategoryOption {
  id: string;
  name: string;
  subcategories: { id: string; name: string; }[];
}

interface CategoryMappingManagerProps {
  rules: CategoryMappingRule[];
  onRulesChange: (rules: CategoryMappingRule[]) => void;
}

const CategoryMappingManager: React.FC<CategoryMappingManagerProps> = ({ rules, onRulesChange }) => {
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [editingRule, setEditingRule] = useState<CategoryMappingRule | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
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
    }
  };

  const createNewRule = (): CategoryMappingRule => ({
    id: `rule_${Date.now()}`,
    name: '',
    type: 'pattern',
    pattern: '',
    targetCategoryId: '',
    priority: 1,
    isActive: true
  });

  const handleAddRule = () => {
    setEditingRule(createNewRule());
    setShowAddForm(true);
  };

  const handleSaveRule = () => {
    if (!editingRule) return;

    const existingIndex = rules.findIndex(r => r.id === editingRule.id);
    let updatedRules;

    if (existingIndex >= 0) {
      updatedRules = [...rules];
      updatedRules[existingIndex] = editingRule;
    } else {
      updatedRules = [...rules, editingRule];
    }

    onRulesChange(updatedRules);
    setEditingRule(null);
    setShowAddForm(false);
  };

  const handleDeleteRule = (ruleId: string) => {
    const updatedRules = rules.filter(r => r.id !== ruleId);
    onRulesChange(updatedRules);
  };

  const getPresetRules = (): Partial<CategoryMappingRule>[] => [
    {
      name: 'Mother Tinctures (MT suffix)',
      type: 'pattern',
      pattern: '.*MT$|.*Mother Tincture.*',
      priority: 10
    },
    {
      name: 'Dilutions (Potency patterns)',
      type: 'pattern', 
      pattern: '.*(30C|200C|1M|10M|30|200).*',
      priority: 9
    },
    {
      name: 'Bach Flower',
      type: 'pattern',
      pattern: '.*Bach.*|.*Flower.*',
      priority: 8
    },
    {
      name: 'Tissue Salts',
      type: 'pattern',
      pattern: '.*Tissue.*Salt.*|.*Biochemic.*',
      priority: 7
    }
  ];

  const handleAddPresetRule = (preset: Partial<CategoryMappingRule>) => {
    const newRule: CategoryMappingRule = {
      id: `preset_${Date.now()}`,
      name: preset.name || '',
      type: preset.type || 'pattern',
      pattern: preset.pattern || '',
      targetCategoryId: '',
      priority: preset.priority || 1,
      isActive: true
    };
    setEditingRule(newRule);
    setShowAddForm(true);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Category Mapping Rules</CardTitle>
        <CardDescription>
          Configure how ERPNext items should be mapped to your website categories
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Existing Rules */}
        <div className="space-y-2">
          <Label>Active Mapping Rules</Label>
          {rules.length === 0 ? (
            <p className="text-sm text-muted-foreground">No mapping rules configured</p>
          ) : (
            <div className="space-y-2">
              {rules
                .sort((a, b) => b.priority - a.priority)
                .map((rule) => (
                  <div key={rule.id} className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{rule.name}</span>
                        <Badge variant={rule.type === 'pattern' ? 'default' : 'secondary'}>
                          {rule.type}
                        </Badge>
                        <Badge variant="outline">Priority: {rule.priority}</Badge>
                        {!rule.isActive && <Badge variant="destructive">Inactive</Badge>}
                      </div>
                      {rule.pattern && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Pattern: {rule.pattern}
                        </p>
                      )}
                      {rule.targetCategoryId && (
                        <p className="text-sm text-muted-foreground">
                          Target: {categories.find(c => c.id === rule.targetCategoryId)?.name}
                          {rule.targetSubcategoryId && 
                            ` → ${categories
                              .find(c => c.id === rule.targetCategoryId)
                              ?.subcategories.find(s => s.id === rule.targetSubcategoryId)?.name}`
                          }
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingRule(rule);
                          setShowAddForm(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteRule(rule.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Add New Rule */}
        {!showAddForm && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Button onClick={handleAddRule}>
                <Plus className="h-4 w-4 mr-2" />
                Add Custom Rule
              </Button>
            </div>
            
            {/* Preset Rules */}
            <div className="space-y-2">
              <Label>Quick Start - Add Preset Rules</Label>
              <div className="grid grid-cols-2 gap-2">
                {getPresetRules().map((preset, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddPresetRule(preset)}
                  >
                    {preset.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Edit/Add Form */}
        {showAddForm && editingRule && (
          <Card>
            <CardHeader>
              <CardTitle>{editingRule.id.startsWith('rule_') && rules.some(r => r.id === editingRule.id) ? 'Edit' : 'Add'} Mapping Rule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Rule Name</Label>
                  <Input
                    value={editingRule.name}
                    onChange={(e) => setEditingRule({ ...editingRule, name: e.target.value })}
                    placeholder="e.g., Mother Tinctures"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Rule Type</Label>
                  <Select
                    value={editingRule.type}
                    onValueChange={(value: 'pattern' | 'manual' | 'default') => 
                      setEditingRule({ ...editingRule, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pattern">Pattern Matching</SelectItem>
                      <SelectItem value="manual">Manual Assignment</SelectItem>
                      <SelectItem value="default">Default Rule</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {editingRule.type === 'pattern' && (
                <div className="space-y-2">
                  <Label>Pattern (Regular Expression)</Label>
                  <Input
                    value={editingRule.pattern || ''}
                    onChange={(e) => setEditingRule({ ...editingRule, pattern: e.target.value })}
                    placeholder="e.g., .*MT$|.*Mother Tincture.*"
                  />
                  <p className="text-xs text-muted-foreground">
                    Examples: .*30C.* (contains 30C), .*MT$ (ends with MT), .*Bach.* (contains Bach)
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Target Category</Label>
                  <Select
                    value={editingRule.targetCategoryId}
                    onValueChange={(value) => setEditingRule({ 
                      ...editingRule, 
                      targetCategoryId: value,
                      targetSubcategoryId: undefined 
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
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
                    value={editingRule.targetSubcategoryId || ''}
                    onValueChange={(value) => setEditingRule({ 
                      ...editingRule, 
                      targetSubcategoryId: value || undefined 
                    })}
                    disabled={!editingRule.targetCategoryId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select subcategory" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Auto-assign by name</SelectItem>
                      {categories
                        .find(c => c.id === editingRule.targetCategoryId)
                        ?.subcategories.map((subcategory) => (
                          <SelectItem key={subcategory.id} value={subcategory.id}>
                            {subcategory.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Priority (1-10)</Label>
                  <Input
                    type="number"
                    min="1"
                    max="10"
                    value={editingRule.priority}
                    onChange={(e) => setEditingRule({ 
                      ...editingRule, 
                      priority: parseInt(e.target.value) || 1 
                    })}
                  />
                </div>
                <div className="flex items-center space-x-2 pt-6">
                  <Checkbox
                    id="isActive"
                    checked={editingRule.isActive}
                    onCheckedChange={(checked) => setEditingRule({ 
                      ...editingRule, 
                      isActive: !!checked 
                    })}
                  />
                  <Label htmlFor="isActive">Rule is active</Label>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button onClick={handleSaveRule}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Rule
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setEditingRule(null);
                    setShowAddForm(false);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};

export default CategoryMappingManager;
