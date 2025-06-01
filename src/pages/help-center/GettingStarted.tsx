
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

        if (error) {
          console.log('Database error:', error);
          throw error;
        }
        
        console.log('Fetched content:', data);
        setContent(data);
      } catch (err) {
        console.log('Error fetching content, using fallback:', err);
        setError('Failed to load content');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const fallbackContent = {
    title: "Getting Started with Homeopathy",
    content: `# Beginner's Guide to Homeopathy

Welcome to your introduction to homeopathy! Whether you're completely new to this healing system or looking to deepen your understanding, this guide will help you get started on your homeopathic journey.

## What is Homeopathy?

Homeopathy is a system of natural medicine founded over 200 years ago by German physician Dr. Samuel Hahnemann. It's based on the principle of "like cures like" (similia similibus curentur), which means that a substance that causes symptoms in a healthy person can, when highly diluted, treat similar symptoms in someone who is unwell.

## Key Principles of Homeopathy

### 1. The Law of Similars
The fundamental principle that substances causing certain symptoms can treat those same symptoms when properly prepared.

### 2. Minimum Dose
Homeopathic remedies are prepared through a process of serial dilution and succussion (vigorous shaking), making them extremely gentle yet effective.

### 3. Individualization
Each person is treated as unique, with remedies selected based on their specific symptoms, constitution, and overall health picture.

### 4. Holistic Approach
Homeopathy treats the whole person - mind, body, and spirit - rather than just isolated symptoms.

## How Do Homeopathic Remedies Work?

Homeopathic remedies are prepared through a careful process of:

- **Dilution**: The original substance is diluted in water or alcohol
- **Succussion**: Vigorous shaking at each dilution stage
- **Potentization**: This process is believed to enhance the remedy's healing properties

The remedies stimulate your body's own healing mechanisms, working gently to restore balance and health.

## Common Homeopathic Remedies for Beginners

Here are some frequently used remedies that are helpful to know:

### For Acute Conditions

**Arnica Montana**
- **Best for**: Bruises, muscle soreness, shock, trauma
- **When to use**: After falls, accidents, overexertion, or any physical trauma

**Belladonna**
- **Best for**: Sudden onset fevers, headaches, inflammation
- **When to use**: High fever with hot, red skin and throbbing sensations

**Nux Vomica**
- **Best for**: Digestive issues, overindulgence, stress
- **When to use**: After rich food, alcohol, or when feeling irritable and chilly

**Pulsatilla**
- **Best for**: Colds, emotional upset, digestive issues
- **When to use**: When feeling weepy, wanting comfort, or with thick yellow discharge

**Rhus Toxicodendron**
- **Best for**: Joint stiffness, skin conditions, restlessness
- **When to use**: Stiffness that improves with movement, poison ivy reactions

### For Everyday Health

**Chamomilla**
- **Best for**: Teething, irritability, pain
- **When to use**: Especially helpful for children who are inconsolable

**Gelsemium**
- **Best for**: Flu, anxiety, weakness
- **When to use**: Feeling drowsy, weak, and trembling

**Apis Mellifica**
- **Best for**: Swelling, stinging pains, allergic reactions
- **When to use**: Puffy swelling that's better with cold applications

## Understanding Potencies

Homeopathic remedies come in different potencies (strengths):

- **6X, 12X, 30X**: Lower potencies, good for beginners and physical symptoms
- **6C, 12C, 30C**: Medium potencies, commonly used for general symptoms
- **200C and higher**: Higher potencies, typically used by experienced practitioners

For beginners, we recommend starting with 6C or 30C potencies.

## How to Take Homeopathic Remedies

### Basic Guidelines

- **Clean mouth**: Avoid eating, drinking, or brushing teeth 15 minutes before and after taking the remedy
- **Avoid strong flavors**: No mint, coffee, or strong spices around dosing times
- **Let it dissolve**: Place pellets under your tongue and let them dissolve naturally
- **Don't touch**: Pour pellets into the cap, then into your mouth to avoid contaminating them

### Dosage Instructions

- **Acute conditions**: Take every 15 minutes to 2 hours as needed
- **Chronic conditions**: Usually 1-3 times daily
- **Stop when improved**: Discontinue once symptoms begin to improve

## What to Expect

### Timeline for Results

- **Acute conditions**: Often see improvement within minutes to hours
- **Chronic conditions**: May take days to weeks for noticeable changes
- **Constitutional treatment**: Long-term improvements over months

### Signs the Remedy is Working

- Symptoms begin to improve
- You feel more energetic
- Sleep improves
- Mood becomes more balanced
- Overall sense of well-being increases

## Safety and Precautions

Homeopathic remedies are generally very safe because of their highly diluted nature. However:

- Always consult healthcare providers for serious conditions
- Don't stop prescribed medications without medical supervision
- Seek professional help for chronic or complex health issues
- Store remedies away from strong electromagnetic fields and extreme temperatures

## When to Consult a Professional Homeopath

Consider professional consultation for:

- Chronic health conditions
- Complex or multiple symptoms
- Constitutional treatment
- Children's health issues
- Mental/emotional concerns
- When self-treatment isn't providing results

## Getting Started: Your First Steps

1. **Start Simple**: Begin with a basic remedy kit containing 10-12 common remedies
2. **Learn Gradually**: Focus on understanding a few remedies well rather than many superficially
3. **Keep Records**: Note what remedies you try and their effects
4. **Read More**: Invest in a good homeopathic reference book
5. **Find Support**: Connect with local homeopathy groups or online communities

## Building Your Home Remedy Kit

Essential remedies for beginners:

- Arnica Montana (trauma, bruises)
- Belladonna (fever, inflammation)
- Nux Vomica (digestive issues)
- Pulsatilla (colds, emotional upset)
- Rhus Tox (joint stiffness)
- Chamomilla (irritability, teething)
- Apis Mellifica (swelling, stings)
- Gelsemium (flu, anxiety)
- Aconitum (sudden onset, shock)
- Bryonia (worse from movement)

## Frequently Asked Questions

**Q: Can homeopathic remedies be taken with conventional medicine?**
A: Generally yes, but always inform all your healthcare providers about what you're taking.

**Q: Are there any side effects?**
A: Homeopathic remedies are extremely diluted and rarely cause side effects. Occasionally, there may be a temporary worsening of symptoms before improvement.

**Q: How long do remedies last?**
A: When stored properly, homeopathic remedies can last for many years without losing potency.

**Q: Can children take homeopathic remedies?**
A: Yes, homeopathy is very gentle and safe for children when used appropriately.

## Next Steps in Your Homeopathic Journey

Once you're comfortable with the basics:

- Study remedy pictures in more depth
- Learn about constitutional types
- Explore the mental/emotional aspects of remedies
- Consider formal training or certification
- Join study groups or professional organizations

---

**Remember**: This guide provides general information about homeopathy. For serious health conditions or persistent symptoms, always consult with qualified healthcare professionals. Homeopathy works best as part of a comprehensive approach to health and wellness.

Ready to begin? Browse our remedy selection or contact our homeopathic consultants for personalized guidance on your healing journey.`,
    meta_description: "Your complete beginner's guide to homeopathy"
  };

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

  // Use fallback content if there's an error or no content from database
  const displayContent = content || fallbackContent;

  return (
    <PageLayout title={displayContent.title} description={displayContent.meta_description}>
      <div className="max-w-4xl mx-auto">
        {error && (
          <Alert className="mb-6">
            <AlertDescription>
              Content loaded from fallback. To edit this content, please use the admin panel.
            </AlertDescription>
          </Alert>
        )}
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <div className="prose prose-lg max-w-none">
            <div className="whitespace-pre-wrap">{displayContent.content}</div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default GettingStarted;
