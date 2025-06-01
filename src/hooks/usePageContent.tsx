
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface PageContent {
  title: string;
  content: string;
  meta_description?: string;
  is_published: boolean;
}

export const usePageContent = (pageSlug: string) => {
  const [pageData, setPageData] = useState<PageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPageContent = async () => {
      try {
        console.log('Fetching page content for slug:', pageSlug);
        
        const { data, error } = await supabase
          .from('website_pages')
          .select('title, content, meta_description, is_published')
          .eq('page_slug', pageSlug)
          .eq('is_published', true)
          .maybeSingle();

        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }
        
        console.log('Fetched data:', data);
        setPageData(data);
      } catch (err) {
        console.error('Error fetching page content:', err);
        setError('Failed to load page content');
      } finally {
        setLoading(false);
      }
    };

    fetchPageContent();
  }, [pageSlug]);

  return { pageData, loading, error };
};
