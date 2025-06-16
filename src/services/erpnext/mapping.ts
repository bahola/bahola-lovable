import { ERPNextItem } from '@/types/erpnext';
import { Product } from '@/types/product';
import { CategoryMappingRule, ImportPreviewItem } from './types';
import { supabase } from '@/integrations/supabase/client';
import { analyzeHealthConditions } from './healthConditionMatcher';

/**
 * Map ERPNext item to local product format with enhanced category mapping
 */
export const mapERPNextToLocal = async (
  erpItem: ImportPreviewItem, 
  categoryMapping?: Record<string, string>
): Promise<Partial<Product>> => {
  // Use proposed categories if available, otherwise try to map
  let categoryId: string | null = erpItem.proposedCategoryId || null;
  let subcategoryId: string | null = erpItem.proposedSubcategoryId || null;
  
  // If no proposed category, try legacy mapping
  if (!categoryId && erpItem.item_group) {
    const mappedCategory = categoryMapping?.[erpItem.item_group] || erpItem.item_group;
    try {
      categoryId = await getOrCreateCategory(mappedCategory);
    } catch (error) {
      console.warn(`Failed to create category ${mappedCategory}:`, error);
    }
  }

  // Auto-assign subcategory based on first letter if category exists but no subcategory
  if (categoryId && !subcategoryId) {
    try {
      subcategoryId = await getAlphabeticalSubcategory(categoryId, erpItem.item_name);
    } catch (error) {
      console.warn('Failed to auto-assign subcategory:', error);
    }
  }

  // Determine HSN code from available fields
  const hsnCode = erpItem.gst_hsn_code || erpItem.hsn_code || erpItem.item_code;

  // Determine product type (simple vs variable)
  const productType = erpItem.has_variants ? 'variable' : 'simple';

  const mappedProduct: Partial<Product> = {
    name: erpItem.item_name,
    type: productType,
    description: erpItem.description || '',
    hsnCode: hsnCode,
    price: erpItem.standard_rate || 0,
    stock: erpItem.opening_stock || 0,
    weight: erpItem.weight_per_unit || 0,
    dimensions: '', // Not available in ERPNext Item, could be custom field
    image: erpItem.image || undefined,
    category: categoryId ? undefined : erpItem.item_group, // Use category name if no ID
    subcategory: subcategoryId ? undefined : undefined,
    tax_status: 'taxable' as const,
    tax_class: '5' as const
  };

  return mappedProduct;
};

/**
 * Get or create a category in the local database
 */
export const getOrCreateCategory = async (categoryName: string): Promise<string> => {
  try {
    // First, try to find existing category
    const { data: existingCategory } = await supabase
      .from('product_categories')
      .select('id')
      .eq('name', categoryName)
      .eq('type', 'category')
      .maybeSingle();

    if (existingCategory) {
      return existingCategory.id;
    }

    // Create new category
    const { data: newCategory, error } = await supabase
      .from('product_categories')
      .insert({
        name: categoryName,
        slug: categoryName.toLowerCase().replace(/\s+/g, '-'),
        type: 'category'
      })
      .select('id')
      .single();

    if (error) {
      console.error('Error creating category:', error);
      throw error;
    }

    console.log(`Created new category: ${categoryName}`);
    return newCategory.id;
  } catch (error) {
    console.error(`Error handling category ${categoryName}:`, error);
    throw error;
  }
};

/**
 * Auto-assign subcategory based on first letter of item name
 */
export const getAlphabeticalSubcategory = async (categoryId: string, itemName: string): Promise<string | null> => {
  try {
    const firstLetter = itemName.charAt(0).toUpperCase();
    
    // Try to find existing subcategory with this letter
    const { data: existingSubcategory } = await supabase
      .from('product_subcategories')
      .select('id')
      .eq('category_id', categoryId)
      .eq('name', firstLetter)
      .maybeSingle();

    if (existingSubcategory) {
      return existingSubcategory.id;
    }

    // Create new alphabetical subcategory
    const { data: newSubcategory, error } = await supabase
      .from('product_subcategories')
      .insert({
        name: firstLetter,
        slug: firstLetter.toLowerCase(),
        category_id: categoryId
      })
      .select('id')
      .single();

    if (error) {
      console.error('Error creating alphabetical subcategory:', error);
      return null;
    }

    console.log(`Created new alphabetical subcategory: ${firstLetter}`);
    return newSubcategory.id;
  } catch (error) {
    console.error('Error handling alphabetical subcategory:', error);
    return null;
  }
};

/**
 * Apply category mapping rules to determine category assignment with health condition analysis
 */
export const applyCategoryMappingRules = async (
  item: ERPNextItem, 
  rules: CategoryMappingRule[],
  subcategories: Array<{id: string, name: string, category_id: string}>
): Promise<{ categoryId?: string; subcategoryId?: string; ruleName?: string; suggestedSubcategories?: Array<{id: string, name: string, confidence: number}> }> => {
  
  // Find the highest priority matching rule
  const matchingRule = rules
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

  if (matchingRule) {
    let suggestedSubcategories: Array<{id: string, name: string, confidence: number}> = [];
    
    // If this maps to specialty products, analyze for health conditions
    if (matchingRule.type === 'erpnext-group' && 
        (matchingRule.erpnextItemGroup === 'Drops' || matchingRule.erpnextItemGroup === 'Specialties')) {
      
      const healthSuggestions = analyzeHealthConditions(item.item_name, item.description);
      
      // Match health suggestions with actual subcategories
      suggestedSubcategories = healthSuggestions
        .map(suggestion => {
          const matchedSubcat = subcategories.find(sub => 
            sub.category_id === matchingRule.targetCategoryId && 
            sub.name.toLowerCase().includes(suggestion.name.toLowerCase())
          );
          
          if (matchedSubcat) {
            return {
              id: matchedSubcat.id,
              name: matchedSubcat.name,
              confidence: suggestion.confidence
            };
          }
          
          // If no exact match, return the suggestion without ID for manual selection
          return {
            id: '',
            name: suggestion.name,
            confidence: suggestion.confidence
          };
        })
        .filter(Boolean);
    }
    
    return {
      categoryId: matchingRule.targetCategoryId,
      subcategoryId: matchingRule.targetSubcategoryId,
      ruleName: matchingRule.name,
      suggestedSubcategories
    };
  }

  return {};
};
