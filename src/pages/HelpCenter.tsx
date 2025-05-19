
import React, { useState, useEffect } from 'react';
import { PageLayout } from '@/components/PageLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from '@/components/ui/table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import { 
  Search, 
  BookOpen, 
  FileText, 
  Video, 
  AlertCircle, 
  ExternalLink,
  ArrowRight,
  X
} from 'lucide-react';
import { 
  Alert,
  AlertTitle,
  AlertDescription
} from '@/components/ui/alert';
import { useLocation } from 'react-router-dom';

// Knowledge Base data structure
interface Article {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'guide' | 'tutorial' | 'faq' | 'documentation';
  link: string;
  videoLink?: string;
  updatedAt: string;
}

// Sample knowledge base data
const knowledgeBaseData: Article[] = [
  {
    id: 'guide-001',
    title: 'Getting Started with Homeopathy',
    description: 'Learn the basics of homeopathy and how to incorporate it into your wellness routine.',
    category: 'Guides',
    type: 'guide',
    link: '/guides/getting-started',
    updatedAt: '2025-03-15'
  },
  {
    id: 'guide-002',
    title: 'Understanding Potency in Homeopathic Remedies',
    description: 'A comprehensive guide to different potencies and how to choose the right one.',
    category: 'Guides',
    type: 'guide',
    link: '/guides/potency-guide',
    updatedAt: '2025-02-28'
  },
  {
    id: 'tutorial-001',
    title: 'How to Use Homeopathic Pellets',
    description: 'Step-by-step instructions for taking homeopathic pellets correctly.',
    category: 'Tutorials',
    type: 'tutorial',
    link: '/tutorials/using-pellets',
    videoLink: 'https://example.com/videos/using-pellets',
    updatedAt: '2025-03-20'
  },
  {
    id: 'tutorial-002',
    title: 'Creating a Homeopathic First Aid Kit',
    description: 'Learn how to assemble a comprehensive homeopathic first aid kit for your home.',
    category: 'Tutorials',
    type: 'tutorial',
    link: '/tutorials/first-aid-kit',
    videoLink: 'https://example.com/videos/first-aid-kit',
    updatedAt: '2025-01-15'
  },
  {
    id: 'troubleshoot-001',
    title: 'Troubleshooting Common Issues with Liquid Remedies',
    description: 'Solutions for common problems when using liquid homeopathic remedies.',
    category: 'Troubleshooting',
    type: 'guide',
    link: '/troubleshooting/liquid-remedies',
    updatedAt: '2025-03-05'
  },
  {
    id: 'troubleshoot-002',
    title: 'What to Do If You Don\'t See Results',
    description: 'Guidance on what to do when homeopathic remedies don\'t seem to be working.',
    category: 'Troubleshooting',
    type: 'faq',
    link: '/troubleshooting/no-results',
    updatedAt: '2025-02-10'
  },
  {
    id: 'doc-001',
    title: 'Homeopathy for Children: Safety Guidelines',
    description: 'Important safety information for using homeopathic remedies with children.',
    category: 'Documentation',
    type: 'documentation',
    link: '/docs/children-safety',
    updatedAt: '2025-03-25'
  },
  {
    id: 'doc-002',
    title: 'Homeopathic Remedy Interactions',
    description: 'Comprehensive information about potential interactions between remedies and medications.',
    category: 'Documentation',
    type: 'documentation',
    link: '/docs/interactions',
    updatedAt: '2025-01-30'
  },
  {
    id: 'tutorial-003',
    title: 'How to Use the Bach Flower Remedies Selector Tool',
    description: 'A tutorial on using our online tool to find the right Bach Flower remedy for your needs.',
    category: 'Tutorials',
    type: 'tutorial',
    link: '/tutorials/bach-flower-selector',
    videoLink: 'https://example.com/videos/bach-selector',
    updatedAt: '2025-02-05'
  },
  {
    id: 'guide-003',
    title: 'Seasonal Homeopathic Remedies Guide',
    description: 'Learn which remedies are most useful during different seasons and for seasonal conditions.',
    category: 'Guides',
    type: 'guide',
    link: '/guides/seasonal-remedies',
    updatedAt: '2025-03-10'
  },
  {
    id: 'troubleshoot-003',
    title: 'Shipping and Delivery Issues',
    description: 'Common shipping problems and how to resolve them quickly.',
    category: 'Troubleshooting',
    type: 'faq',
    link: '/troubleshooting/shipping',
    updatedAt: '2025-03-18'
  },
  {
    id: 'doc-003',
    title: 'Product Certification and Standards',
    description: 'Information about the quality standards and certifications of our homeopathic products.',
    category: 'Documentation',
    type: 'documentation',
    link: '/docs/certifications',
    updatedAt: '2025-02-20'
  }
];

// Group articles by category
const groupArticlesByCategory = (articles: Article[]): Record<string, Article[]> => {
  return articles.reduce((acc, article) => {
    const category = article.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(article);
    return acc;
  }, {} as Record<string, Article[]>);
};

const HelpCenter: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState('All');
  
  // Get unique categories for tabs
  const categories = ['All', ...new Set(knowledgeBaseData.map(item => item.category))];
  
  // Filter articles based on search query and active tab
  const filteredArticles = knowledgeBaseData.filter(article => {
    const matchesSearch = searchQuery === '' || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeTab === 'All' || article.category === activeTab;
    
    return matchesSearch && matchesCategory;
  });

  // Group articles by category for the browse section
  const articlesByCategory = groupArticlesByCategory(knowledgeBaseData);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled by the state change
  };

  const clearSearch = () => setSearchQuery('');

  // Update search if query parameter changes
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('q');
    if (query) {
      setSearchQuery(query);
    }
  }, [location.search]);

  return (
    <PageLayout 
      title="Help Center & Knowledge Base" 
      description="Find guides, tutorials, and documentation to help you make the most of our products"
    >
      <div className="max-w-5xl mx-auto">
        {/* Search Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Search for guides, tutorials, or documentation..."
                className="pl-10 pr-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <Button 
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 p-0"
                  onClick={clearSearch}
                >
                  <X size={16} />
                </Button>
              )}
            </div>
            <Button type="submit">Search</Button>
          </form>
        </div>

        {/* Popular Resources (shown when not searching) */}
        {!searchQuery && activeTab === 'All' && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Popular Resources</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="bg-bahola-blue-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="text-bahola-blue-600" size={24} />
                </div>
                <h3 className="font-semibold mb-2">Beginner's Guide</h3>
                <p className="text-sm text-bahola-neutral-600 mb-4">
                  New to homeopathy? Start here to learn the basics and common remedies.
                </p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href="/guides/getting-started">
                    Read Guide <ArrowRight size={16} className="ml-1" />
                  </a>
                </Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="bg-bahola-blue-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Video className="text-bahola-blue-600" size={24} />
                </div>
                <h3 className="font-semibold mb-2">Video Tutorials</h3>
                <p className="text-sm text-bahola-neutral-600 mb-4">
                  Watch step-by-step tutorials on using homeopathic remedies correctly.
                </p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href="/tutorials">
                    Watch Tutorials <ArrowRight size={16} className="ml-1" />
                  </a>
                </Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="bg-bahola-blue-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <AlertCircle className="text-bahola-blue-600" size={24} />
                </div>
                <h3 className="font-semibold mb-2">Troubleshooting</h3>
                <p className="text-sm text-bahola-neutral-600 mb-4">
                  Solutions for common problems and answers to frequent questions.
                </p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href="/troubleshooting">
                    View Solutions <ArrowRight size={16} className="ml-1" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Category Sections (shown when not searching) */}
        {!searchQuery && activeTab === 'All' && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Browse by Category</h2>
            
            {Object.entries(articlesByCategory).map(([category, articles]) => (
              <div key={category} className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-medium">{category}</h3>
                  <Button variant="ghost" size="sm" asChild>
                    <a href={`#${category.toLowerCase()}`} onClick={() => setActiveTab(category)}>
                      View All <ArrowRight size={16} className="ml-1" />
                    </a>
                  </Button>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  {articles.map(article => (
                    <a 
                      key={article.id} 
                      href={article.link}
                      className="block bg-white p-4 rounded-md border border-gray-100 hover:border-bahola-blue-200 hover:shadow-sm transition-all"
                    >
                      <div className="flex items-start mb-2">
                        {article.type === 'guide' && <BookOpen size={18} className="mr-2 text-bahola-blue-500 flex-shrink-0 mt-1" />}
                        {article.type === 'tutorial' && <Video size={18} className="mr-2 text-bahola-green-500 flex-shrink-0 mt-1" />}
                        {article.type === 'documentation' && <FileText size={18} className="mr-2 text-bahola-purple-500 flex-shrink-0 mt-1" />}
                        {article.type === 'faq' && <AlertCircle size={18} className="mr-2 text-bahola-amber-500 flex-shrink-0 mt-1" />}
                        <h4 className="font-medium leading-tight">{article.title}</h4>
                      </div>
                      <p className="text-sm text-bahola-neutral-600 mb-2 line-clamp-2">
                        {article.description}
                      </p>
                      <div className="text-xs text-bahola-neutral-500">
                        Updated: {article.updatedAt}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tabbed Article List (shown when tab is selected or searching) */}
        {(searchQuery || activeTab !== 'All') && (
          <div>
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-6 flex flex-wrap justify-start gap-2">
                {categories.map((category) => (
                  <TabsTrigger 
                    key={category} 
                    value={category}
                    className="px-4 py-2 rounded-md"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <TabsContent value={activeTab}>
                {searchQuery ? (
                  <h2 className="text-xl font-semibold mb-4">
                    Search Results ({filteredArticles.length})
                  </h2>
                ) : (
                  <h2 className="text-xl font-semibold mb-4">
                    {activeTab === 'All' ? 'All Resources' : activeTab}
                  </h2>
                )}
                
                {filteredArticles.length > 0 ? (
                  <div className="bg-white rounded-lg border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[400px]">Title</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead className="text-right">Updated</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredArticles.map((article) => (
                          <TableRow key={article.id}>
                            <TableCell className="font-medium">
                              <a 
                                href={article.link} 
                                className="flex items-start hover:text-bahola-blue-600"
                              >
                                {article.title}
                                {article.videoLink && (
                                  <Video size={16} className="ml-2 text-bahola-neutral-400" />
                                )}
                              </a>
                              <p className="text-sm text-bahola-neutral-500 mt-1 line-clamp-1">
                                {article.description}
                              </p>
                            </TableCell>
                            <TableCell>{article.category}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                article.type === 'guide' ? 'bg-bahola-blue-50 text-bahola-blue-700' :
                                article.type === 'tutorial' ? 'bg-bahola-green-50 text-bahola-green-700' :
                                article.type === 'documentation' ? 'bg-bahola-purple-50 text-bahola-purple-700' :
                                'bg-bahola-amber-50 text-bahola-amber-700'
                              }`}>
                                {article.type.charAt(0).toUpperCase() + article.type.slice(1)}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              {article.updatedAt}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <AlertCircle className="mx-auto mb-4 text-bahola-neutral-400" size={48} />
                    <p className="text-bahola-neutral-600">No resources matching your search were found.</p>
                    <p className="text-bahola-neutral-500 text-sm mt-2">Try different keywords or browse categories.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Need Further Help Section */}
        <Alert className="mt-12 bg-bahola-blue-50">
          <AlertTitle className="text-bahola-blue-700">Need further assistance?</AlertTitle>
          <AlertDescription className="text-bahola-blue-600">
            <p className="mb-4">
              If you couldn't find the information you're looking for, our customer support team is ready to help.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild>
                <a href="/contact">Contact Support</a>
              </Button>
              <Button variant="outline" className="bg-white" asChild>
                <a href="/faq">
                  View FAQs <ExternalLink size={16} className="ml-2" />
                </a>
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    </PageLayout>
  );
};

export default HelpCenter;
