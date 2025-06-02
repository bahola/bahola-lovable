
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  category: string;
}

interface RelatedArticlesWidgetProps {
  healthConcern?: string;
  productCategory?: string;
  articles?: Article[];
  className?: string;
}

export const RelatedArticlesWidget: React.FC<RelatedArticlesWidgetProps> = ({
  healthConcern,
  productCategory,
  articles = [],
  className = ''
}) => {
  // Default articles based on health concerns - these would come from your blog API
  const defaultArticles: Article[] = [
    {
      id: '1',
      title: 'Understanding Homeopathic Potencies: A Complete Guide',
      excerpt: 'Learn how different potencies work and which one might be right for your condition.',
      slug: 'understanding-homeopathic-potencies',
      category: 'Education'
    },
    {
      id: '2',
      title: 'Natural Anxiety Relief: Homeopathic Approaches',
      excerpt: 'Discover gentle, natural ways to manage anxiety and stress with homeopathy.',
      slug: 'natural-anxiety-relief-homeopathic-approaches',
      category: 'Mental Health'
    },
    {
      id: '3',
      title: 'Building Your Homeopathic First Aid Kit',
      excerpt: 'Essential remedies every household should have for common ailments.',
      slug: 'homeopathic-first-aid-kit',
      category: 'First Aid'
    }
  ];

  const displayArticles = articles.length > 0 ? articles : defaultArticles;
  const blogBaseUrl = 'https://lovable.dev/projects/90f95490-dd0f-4544-953c-3fada8daac1b';

  return (
    <Card className={`bg-gradient-to-br from-red-50 to-pink-50 border-red-100 ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-700">
          <Heart size={20} className="text-red-500" />
          Related Articles from I ❤️ HOMEOPATHY
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayArticles.slice(0, 3).map((article) => (
            <div key={article.id} className="border-l-2 border-red-200 pl-4">
              <h4 className="font-semibold text-gray-900 mb-1">{article.title}</h4>
              <p className="text-sm text-gray-600 mb-2">{article.excerpt}</p>
              <Button 
                asChild 
                variant="ghost" 
                size="sm"
                className="p-0 h-auto text-red-600 hover:text-red-700"
              >
                <a 
                  href={`${blogBaseUrl}#${article.slug}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1"
                >
                  Read More
                  <ArrowRight size={14} />
                </a>
              </Button>
            </div>
          ))}
          
          <div className="pt-4 border-t border-red-100">
            <Button 
              asChild 
              className="w-full bg-red-600 hover:bg-red-700"
            >
              <a 
                href={blogBaseUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2"
              >
                <Heart size={16} />
                Visit I ❤️ HOMEOPATHY Blog
                <ArrowRight size={16} />
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
