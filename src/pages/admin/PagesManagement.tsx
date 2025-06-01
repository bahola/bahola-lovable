
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Edit, Save, Eye, EyeOff } from 'lucide-react';

interface WebsitePage {
  id: string;
  page_slug: string;
  title: string;
  content: string;
  meta_description: string;
  is_published: boolean;
}

const PagesManagement = () => {
  const [pages, setPages] = useState<WebsitePage[]>([]);
  const [editingPage, setEditingPage] = useState<WebsitePage | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const pageLabels: Record<string, string> = {
    about: 'About Us',
    contact: 'Contact Us',
    reviews: 'Customer Reviews',
    shipping: 'Shipping Information',
    'store-locator': 'Store Locator'
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const { data, error } = await supabase
        .from('website_pages')
        .select('*')
        .order('page_slug');

      if (error) throw error;
      setPages(data || []);
    } catch (error) {
      console.error('Error fetching pages:', error);
      toast.error('Failed to load pages');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (page: WebsitePage) => {
    setEditingPage({ ...page });
  };

  const handleSave = async () => {
    if (!editingPage) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('website_pages')
        .update({
          title: editingPage.title,
          content: editingPage.content,
          meta_description: editingPage.meta_description,
          is_published: editingPage.is_published,
          updated_at: new Date().toISOString()
        })
        .eq('id', editingPage.id);

      if (error) throw error;

      setPages(pages.map(p => 
        p.id === editingPage.id ? editingPage : p
      ));
      setEditingPage(null);
      toast.success('Page updated successfully');
    } catch (error) {
      console.error('Error updating page:', error);
      toast.error('Failed to update page');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditingPage(null);
  };

  const togglePublished = async (page: WebsitePage) => {
    try {
      const { error } = await supabase
        .from('website_pages')
        .update({ 
          is_published: !page.is_published,
          updated_at: new Date().toISOString()
        })
        .eq('id', page.id);

      if (error) throw error;

      setPages(pages.map(p => 
        p.id === page.id ? { ...p, is_published: !p.is_published } : p
      ));
      toast.success(`Page ${!page.is_published ? 'published' : 'unpublished'}`);
    } catch (error) {
      console.error('Error toggling published status:', error);
      toast.error('Failed to update published status');
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Pages Management</h2>
          <p className="text-muted-foreground">Manage website pages content</p>
        </div>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Pages Management</h2>
        <p className="text-muted-foreground">Manage and edit website pages content</p>
      </div>

      {editingPage ? (
        <Card>
          <CardHeader>
            <CardTitle>Edit: {pageLabels[editingPage.page_slug] || editingPage.page_slug}</CardTitle>
            <CardDescription>Update the content for this page</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={editingPage.title}
                onChange={(e) => setEditingPage({
                  ...editingPage,
                  title: e.target.value
                })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="meta_description">Meta Description</Label>
              <Input
                id="meta_description"
                value={editingPage.meta_description || ''}
                onChange={(e) => setEditingPage({
                  ...editingPage,
                  meta_description: e.target.value
                })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content (Markdown supported)</Label>
              <Textarea
                id="content"
                value={editingPage.content}
                onChange={(e) => setEditingPage({
                  ...editingPage,
                  content: e.target.value
                })}
                rows={12}
                className="min-h-[300px]"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                checked={editingPage.is_published}
                onCheckedChange={(checked) => setEditingPage({
                  ...editingPage,
                  is_published: checked
                })}
              />
              <Label>Published</Label>
            </div>

            <div className="flex space-x-2">
              <Button onClick={handleSave} disabled={saving}>
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {pages.map((page) => (
            <Card key={page.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{pageLabels[page.page_slug] || page.page_slug}</CardTitle>
                    <CardDescription>{page.title}</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => togglePublished(page)}
                    >
                      {page.is_published ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <EyeOff className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(page)}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  {page.meta_description}
                </p>
                <p className="text-sm">
                  Status: {page.is_published ? (
                    <span className="text-green-600">Published</span>
                  ) : (
                    <span className="text-gray-500">Draft</span>
                  )}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PagesManagement;
