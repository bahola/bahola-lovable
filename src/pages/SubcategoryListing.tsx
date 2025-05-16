
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageLayout } from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';

interface CategoryWithSubcategories {
  id: string;
  name: string;
  slug: string;
  subcategories: {
    id: string;
    name: string;
    slug: string;
  }[];
}

const SubcategoryListing = () => {
  const [categories, setCategories] = useState<CategoryWithSubcategories[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("all");

  useEffect(() => {
    const fetchCategoriesWithSubcategories = async () => {
      try {
        // Fetch all categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('product_categories')
          .select('*')
          .order('name');
          
        if (categoriesError) throw categoriesError;
        
        if (!categoriesData) {
          setCategories([]);
          setLoading(false);
          return;
        }
        
        // For each category, fetch its subcategories
        const categoriesWithSubs = await Promise.all(
          categoriesData.map(async (category) => {
            const { data: subcategoriesData, error: subcategoriesError } = await supabase
              .from('product_subcategories')
              .select('id, name, slug')
              .eq('category_id', category.id)
              .order('name');
              
            if (subcategoriesError) throw subcategoriesError;
            
            return {
              ...category,
              subcategories: subcategoriesData || []
            };
          })
        );
        
        setCategories(categoriesWithSubs);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesWithSubcategories();
  }, []);

  // Organize alphabetical subcategories (A-Z)
  const renderAlphabeticalSubcategories = (subcategories: any[]) => {
    return (
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-2 mt-4">
        {subcategories.map((subcategory) => (
          <Link 
            key={subcategory.id} 
            to={`/category/${subcategory.slug}`}
            className="flex items-center justify-center p-3 border border-bahola-neutral-200 rounded hover:bg-bahola-blue-50 hover:border-bahola-blue-200 transition-colors"
          >
            {subcategory.name}
          </Link>
        ))}
      </div>
    );
  };

  // Organize health condition subcategories
  const renderConditionSubcategories = (subcategories: any[]) => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-4">
        {subcategories.map((subcategory) => (
          <Link 
            key={subcategory.id} 
            to={`/category/${subcategory.slug}`}
            className="p-3 border border-bahola-neutral-200 rounded hover:bg-bahola-blue-50 hover:border-bahola-blue-200 transition-colors"
          >
            {subcategory.name}
          </Link>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <PageLayout title="Product Categories">
        <div className="flex justify-center items-center min-h-[300px]">
          <p>Loading categories...</p>
        </div>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout title="Product Categories">
        <div className="flex justify-center items-center min-h-[300px]">
          <p className="text-red-500">{error}</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Product Categories" description="Browse all product categories and subcategories">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Categories</TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.slug}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all">
          {categories.map((category) => (
            <Card key={category.id} className="mb-8">
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">{category.name}</h2>
                <Separator className="mb-4" />
                {category.type === 'alphabetical'
                  ? renderAlphabeticalSubcategories(category.subcategories)
                  : renderConditionSubcategories(category.subcategories)
                }
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.slug}>
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">{category.name}</h2>
                <Separator className="mb-4" />
                {category.type === 'alphabetical'
                  ? renderAlphabeticalSubcategories(category.subcategories)
                  : renderConditionSubcategories(category.subcategories)
                }
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </PageLayout>
  );
};

export default SubcategoryListing;
