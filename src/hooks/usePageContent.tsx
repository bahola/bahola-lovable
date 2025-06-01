
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
        const { data, error } = await supabase
          .from('website_pages')
          .select('title, content, meta_description, is_published')
          .eq('page_slug', pageSlug)
          .maybeSingle();

        if (error) throw error;
        
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
