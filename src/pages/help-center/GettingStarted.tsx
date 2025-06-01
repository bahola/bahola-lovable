
import React, { useEffect, useState } from 'react';
import { PageLayout } from '@/components/PageLayout';
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

interface HelpContent {
  title: string;
  content: string;
  meta_description: string;
}

const GettingStarted = () => {
  const [content, setContent] = useState<HelpContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data, error } = await supabase
          .from('help_center_content')
          .select('title, content, meta_description')
          .eq('page_type', 'getting_started')
          .eq('is_published', true)
          .single();

        if (error) throw error;
        setContent(data);
      } catch (err) {
        setError('Failed to load content');
        console.error('Error fetching content:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (loading) {
    return (
      <PageLayout title="Getting Started" description="Loading...">
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </PageLayout>
    );
  }

  if (error || !content) {
    return (
      <PageLayout title="Getting Started" description="Help content">
        <Alert>
          <AlertDescription>
            {error || 'Content not found'}
          </AlertDescription>
        </Alert>
      </PageLayout>
    );
  }

  return (
    <PageLayout title={content.title} description={content.meta_description}>
      <div className="prose prose-lg max-w-none">
        <div className="whitespace-pre-wrap">{content.content}</div>
      </div>
    </PageLayout>
  );
};

export default GettingStarted;
