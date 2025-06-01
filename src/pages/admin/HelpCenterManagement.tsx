
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Edit, Save, Eye, EyeOff } from 'lucide-react';

interface HelpContent {
  id: string;
  page_type: string;
  title: string;
  content: string;
  meta_description: string;
  is_published: boolean;
}

const HelpCenterManagement = () => {
  const [contents, setContents] = useState<HelpContent[]>([]);
  const [editingContent, setEditingContent] = useState<HelpContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const pageTypeLabels: Record<string, string> = {
    getting_started: 'Getting Started',
    potency_guide: 'Potency Guide',
    using_pellets: 'Using Pellets',
    first_aid_kit: 'First Aid Kit',
    liquid_remedies_troubleshooting: 'Liquid Remedies Troubleshooting',
    no_results_troubleshooting: 'No Results Troubleshooting',
    children_safety: 'Children Safety',
    remedy_interactions: 'Remedy Interactions',
    bach_flower_selector: 'Bach Flower Selector',
    seasonal_remedies: 'Seasonal Remedies',
    shipping_issues: 'Shipping Issues',
    certifications: 'Certifications'
  };

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    try {
      const { data, error } = await supabase
        .from('help_center_content')
        .select('*')
        .order('page_type');

      if (error) throw error;
      setContents(data || []);
    } catch (error) {
      console.error('Error fetching contents:', error);
      toast.error('Failed to load help center contents');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (content: HelpContent) => {
    setEditingContent({ ...content });
  };

  const handleSave = async () => {
    if (!editingContent) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('help_center_content')
        .update({
          title: editingContent.title,
          content: editingContent.content,
          meta_description: editingContent.meta_description,
          is_published: editingContent.is_published,
          updated_at: new Date().toISOString()
        })
        .eq('id', editingContent.id);

      if (error) throw error;

      setContents(contents.map(c => 
        c.id === editingContent.id ? editingContent : c
      ));
      setEditingContent(null);
      toast.success('Content updated successfully');
    } catch (error) {
      console.error('Error updating content:', error);
      toast.error('Failed to update content');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditingContent(null);
  };

  const togglePublished = async (content: HelpContent) => {
    try {
      const { error } = await supabase
        .from('help_center_content')
        .update({ 
          is_published: !content.is_published,
          updated_at: new Date().toISOString()
        })
        .eq('id', content.id);

      if (error) throw error;

      setContents(contents.map(c => 
        c.id === content.id ? { ...c, is_published: !c.is_published } : c
      ));
      toast.success(`Content ${!content.is_published ? 'published' : 'unpublished'}`);
    } catch (error) {
      console.error('Error toggling published status:', error);
      toast.error('Failed to update published status');
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Help Center Management</h2>
          <p className="text-muted-foreground">Manage help center content</p>
        </div>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Help Center Management</h2>
        <p className="text-muted-foreground">Manage and edit help center content</p>
      </div>

      {editingContent ? (
        <Card>
          <CardHeader>
            <CardTitle>Edit: {pageTypeLabels[editingContent.page_type]}</CardTitle>
            <CardDescription>Update the content for this help center page</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={editingContent.title}
                onChange={(e) => setEditingContent({
                  ...editingContent,
                  title: e.target.value
                })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="meta_description">Meta Description</Label>
              <Input
                id="meta_description"
                value={editingContent.meta_description || ''}
                onChange={(e) => setEditingContent({
                  ...editingContent,
                  meta_description: e.target.value
                })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={editingContent.content}
                onChange={(e) => setEditingContent({
                  ...editingContent,
                  content: e.target.value
                })}
                rows={12}
                className="min-h-[300px]"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                checked={editingContent.is_published}
                onCheckedChange={(checked) => setEditingContent({
                  ...editingContent,
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
          {contents.map((content) => (
            <Card key={content.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{pageTypeLabels[content.page_type] || content.page_type}</CardTitle>
                    <CardDescription>{content.title}</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => togglePublished(content)}
                    >
                      {content.is_published ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <EyeOff className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(content)}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  {content.meta_description}
                </p>
                <p className="text-sm">
                  Status: {content.is_published ? (
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

export default HelpCenterManagement;
