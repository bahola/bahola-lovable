import React from 'react';
import { Link } from 'react-router-dom';
import { HealthConcernPageLayout } from '@/components/health-concerns/HealthConcernPageLayout';
import { SEO } from '@/components/SEO';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { generateMedicalWebPageSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo-schemas';
import { AlertTriangle, Info, ArrowRight, CheckCircle2, Clock, Heart, Utensils, Activity } from 'lucide-react';

const DigestiveIssuesDetailed = () => {
  const concernData = {
    id: 'digestive-issues',
    name: 'Digestive Issues',
    description: 'Comprehensive homeopathic treatment for digestive disorders, IBS, bloating, indigestion, and gut health problems.',
    category: 'Gut Health',
    icon: '🫃',
    image: '/lovable-uploads/0108ad38-606a-475c-a72b-c841b9ba5dae.png',
    searchVolume: 48000,
    commonRemedies: ['Nux Vomica', 'Lycopodium', 'Carbo Vegetabilis', 'Arsenicum Album'],
    keywords: ['digestive issues', 'IBS', 'bloating', 'indigestion', 'gas', 'stomach problems'],
    lastUpdated: '2024-01-15',
    trending: true
  };

  const faqs = [
    {
      question: "What causes digestive issues?",
      answer: "Digestive issues can arise from multiple factors including dietary habits (high-fat foods, processed foods, excessive caffeine), stress and anxiety which affect the gut-brain axis, imbalances in gut microbiome, food intolerances (lactose, gluten, FODMAPs), certain medications (antibiotics, NSAIDs), infections (bacterial, viral, parasitic), and underlying conditions like IBS, inflammatory bowel disease, or gastroesophageal reflux disease. Lifestyle factors such as lack of exercise, inadequate sleep, and smoking can also contribute to digestive dysfunction."
    },
    {
      question: "How long does it take for homeopathic remedies to work for digestive problems?",
      answer: "The timeline varies based on whether the condition is acute or chronic. For acute digestive issues like sudden indigestion or bloating, homeopathic remedies may provide relief within hours to a few days. For chronic conditions like IBS or long-standing digestive discomfort, improvement typically occurs over 2-4 weeks, with full benefits often seen after 2-3 months of consistent treatment. Constitutional homeopathic treatment addresses root causes and may take longer but provides more lasting results. Individual response varies based on the severity of symptoms, overall health, and adherence to treatment and lifestyle modifications."
    },
    {
      question: "Can homeopathy cure IBS permanently?",
      answer: "Homeopathy takes a holistic approach to IBS, aiming to address the underlying imbalances rather than just suppressing symptoms. Many patients experience significant long-term improvement and even complete resolution of symptoms through constitutional homeopathic treatment combined with lifestyle modifications. However, IBS is a complex functional disorder influenced by multiple factors including stress, diet, and gut microbiome. Homeopathy can help restore digestive balance, reduce symptom frequency and severity, and improve quality of life. The success rate varies individually, and some patients may require ongoing management. A personalized treatment approach with an experienced homeopath yields the best outcomes."
    },
    {
      question: "Are there side effects of homeopathic digestive remedies?",
      answer: "Homeopathic remedies are generally very safe and well-tolerated with minimal risk of side effects when taken as prescribed. They are prepared through a process of dilution and succussion, making them gentle even for children, pregnant women, and elderly patients. Occasionally, some patients may experience a temporary worsening of symptoms (called a homeopathic aggravation) before improvement begins, which is usually mild and short-lived. Unlike conventional medications, homeopathic remedies do not cause dependence, do not interact harmfully with other medications, and do not burden the digestive system further. However, it's important to take remedies under professional guidance for optimal results and proper dosage."
    },
    {
      question: "Can I take homeopathic remedies with my regular medication?",
      answer: "Yes, homeopathic remedies can generally be taken alongside conventional medications safely. There are no known harmful interactions between homeopathic medicines and pharmaceutical drugs. However, it's recommended to maintain a 30-minute gap between taking homeopathic remedies and other medications or food. If you're on prescription medications for digestive conditions, continue them as advised by your doctor and inform both your doctor and homeopath about all medications you're taking. As your digestive health improves with homeopathic treatment, your doctor may gradually reduce conventional medications under proper supervision. Never discontinue prescribed medications without consulting your healthcare provider."
    },
    {
      question: "What is the best homeopathic remedy for bloating?",
      answer: "There is no single 'best' remedy for bloating as homeopathy follows the principle of individualization - the right remedy depends on your specific symptoms, triggers, and overall constitution. Common remedies for bloating include: Carbo Vegetabilis (for severe bloating with gas, worse after eating, feeling of fullness), Lycopodium (for bloating especially in lower abdomen, worse 4-8 PM, craving sweets), China Officinalis (for bloating with no relief from belching, after eating fruits), Nux Vomica (for bloating after overeating, rich foods, or alcohol), and Pulsatilla (for bloating after fatty foods, changeable symptoms). A qualified homeopath will assess your complete symptom picture to prescribe the most suitable remedy for you."
    },
    {
      question: "How can I prevent digestive issues?",
      answer: "Prevention involves multiple lifestyle strategies: eat mindfully by chewing thoroughly and avoiding rushed meals; maintain regular meal times; stay adequately hydrated with 8-10 glasses of water daily; include fiber-rich foods gradually; consume probiotic foods like yogurt and fermented vegetables; limit processed foods, excessive caffeine, and alcohol; identify and avoid personal trigger foods using a food diary; manage stress through yoga, meditation, or deep breathing exercises; exercise regularly (30 minutes daily); ensure 7-9 hours of quality sleep; avoid eating 2-3 hours before bedtime; don't smoke; and maintain good posture while eating. Regular health check-ups can help detect issues early."
    },
    {
      question: "Should I avoid certain foods while taking homeopathic treatment?",
      answer: "While taking homeopathic remedies, it's advisable to avoid strong-smelling or strong-tasting substances that might antidote the remedies. Avoid coffee, mint (including toothpaste with mint), camphor, menthol, and eucalyptus products at least 30 minutes before and after taking your remedy. These substances can potentially interfere with the action of homeopathic medicines. Apart from these, you don't need to follow strict dietary restrictions unless specifically advised by your homeopath based on your condition. However, for digestive issues, it's beneficial to avoid known trigger foods like spicy, fried, or processed foods, excessive dairy if lactose intolerant, and foods that cause gas or discomfort."
    },
    {
      question: "Can children take homeopathic remedies for digestive problems?",
      answer: "Absolutely! Homeopathic remedies are safe and effective for children of all ages, including infants. They are particularly suitable for children because they are gentle, have no side effects, and don't cause drowsiness or affect concentration. Common pediatric digestive issues treated with homeopathy include colic, constipation, diarrhea, teething-related digestive upset, food sensitivities, and stomach aches. The dosage is adjusted based on the child's age and weight. Remedies can be dissolved in water for easy administration to infants and young children. Many parents prefer homeopathy for their children's digestive complaints as it supports the body's natural healing without suppressing symptoms."
    },
    {
      question: "What's the difference between functional and organic digestive disorders?",
      answer: "Functional digestive disorders (like IBS, functional dyspepsia, non-ulcer dyspepsia) occur when the digestive system doesn't work properly despite having no visible structural damage or disease on tests. Symptoms are real but medical tests appear normal. These conditions involve problems with gut-brain communication, motility, or visceral hypersensitivity. Organic digestive disorders (like ulcers, inflammatory bowel disease, gallstones, pancreatitis) involve visible structural changes, inflammation, or damage that can be detected through endoscopy, imaging, or lab tests. Homeopathy is particularly effective for functional disorders, addressing the underlying imbalance. For organic disorders, homeopathy can serve as valuable complementary treatment alongside conventional medical care."
    }
  ];

  const relatedConditions = [
    { name: 'Irritable Bowel Syndrome (IBS)', path: '/diseases-conditions/gut-health/ibs', icon: '🔄', description: 'Chronic digestive disorder with abdominal pain and altered bowel habits' },
    { name: 'Constipation', path: '/diseases-conditions/gut-health/constipation', icon: '🚽', description: 'Difficulty passing stools or infrequent bowel movements' },
    { name: 'Diarrhoea', path: '/diseases-conditions/gut-health/diarrhoea', icon: '💧', description: 'Frequent loose or watery bowel movements' },
    { name: 'Gastritis', path: '/diseases-conditions/gut-health/gastritis', icon: '🔥', description: 'Inflammation of the stomach lining causing pain and discomfort' },
    { name: 'Nausea & Vomiting', path: '/diseases-conditions/gut-health/nausea-vomiting', icon: '🤢', description: 'Feeling sick with urge to vomit, often related to digestive upset' },
    { name: 'Food Allergies', path: '/diseases-conditions/allergies/food-allergies', icon: '🥜', description: 'Immune reactions to specific foods causing digestive symptoms' },
    { name: 'Anxiety & Stress', path: '/diseases-conditions/mental-health/anxiety-stress', icon: '😰', description: 'Mental health conditions affecting gut through gut-brain axis' },
    { name: 'Acne', path: '/diseases-conditions/skin-care/acne-pimples', icon: '✨', description: 'Skin condition often linked to gut health and digestive function' }
  ];

  const caseStudies = [
    {
      title: "Chronic IBS with Alternating Symptoms",
      profile: "32-year-old female software engineer",
      symptoms: "Experienced alternating diarrhea and constipation, severe abdominal bloating, and cramping pain for over 3 years. Symptoms worsened during work deadlines and after eating dairy or spicy foods. Previous treatments provided only temporary relief.",
      remedy: "Nux Vomica 30C initially for acute flare-ups, followed by constitutional remedy Lycopodium 200C",
      outcome: "Within 4 weeks, bowel movements became more regular with reduced cramping. After 8 weeks, experienced 70% overall improvement. At 3 months, symptoms were well-managed with occasional minor discomfort only during high stress. Patient learned to manage stress better and adjusted diet with significant quality of life improvement.",
      testimonial: "I finally have control over my digestive system again. The constant worry about finding bathrooms has disappeared, and I can enjoy social meals without anxiety."
    },
    {
      title: "Post-Meal Bloating and Gas",
      profile: "45-year-old male businessman, frequent traveler",
      symptoms: "Severe bloating and distension after every meal, excessive gas, early satiety, and discomfort that affected work meetings and travel. Symptoms present for 18 months, worsening with irregular eating patterns.",
      remedy: "Carbo Vegetabilis 200C, taken twice daily initially, then as needed",
      outcome: "Noticed significant reduction in bloating within 2 weeks. After 4 weeks, could complete normal meals without discomfort. Gas reduced by 80%. After 6 weeks, occasional use of remedy during travel maintained digestive comfort.",
      testimonial: "I can now enjoy business lunches and dinners without the embarrassing bloating and gas. My confidence in social eating situations is completely restored."
    },
    {
      title: "Stress-Related Indigestion and Nausea",
      profile: "28-year-old female high school teacher",
      symptoms: "Developed persistent nausea, acid reflux, loss of appetite, and burning stomach sensation during exam preparation periods and parent-teacher conferences. Unable to eat breakfast, feeling anxious about stomach symptoms.",
      remedy: "Argentum Nitricum 30C for acute anxiety-related symptoms, combined with stress management techniques and dietary adjustments",
      outcome: "Within 10 days, nausea reduced significantly and appetite improved. After 3 weeks, acid reflux episodes decreased from daily to occasional. After 2 months, complete resolution of symptoms even during typically stressful periods. Patient developed better stress coping mechanisms.",
      testimonial: "My anxiety no longer controls my stomach. I can eat normally even before important meetings, and the constant nausea is gone. It's life-changing."
    }
  ];

  const structuredData = [
    generateMedicalWebPageSchema({
      name: "Digestive Issues - Comprehensive Homeopathic Treatment Guide",
      description: "Complete guide to treating digestive issues, IBS, bloating, indigestion, and gut health problems with homeopathy. Learn about symptoms, causes, natural remedies, lifestyle tips, and when to seek medical care.",
      url: "https://bahola-labs.lovable.app/diseases-conditions/gut-health/digestive-issues",
      datePublished: "2024-01-15",
      dateModified: new Date().toISOString(),
      author: "Bahola Labs Medical Team"
    }),
    generateBreadcrumbSchema({
      items: [
        { name: "Home", url: "https://bahola-labs.lovable.app" },
        { name: "Health Concerns", url: "https://bahola-labs.lovable.app/diseases-conditions" },
        { name: "Gut Health", url: "https://bahola-labs.lovable.app/diseases-conditions/gut-health" },
        { name: "Digestive Issues", url: "https://bahola-labs.lovable.app/diseases-conditions/gut-health/digestive-issues" }
      ]
    }),
    generateFAQSchema({
      questions: faqs.map(faq => ({
        question: faq.question,
        answer: faq.answer
      }))
    }),
    {
      "@context": "https://schema.org",
      "@type": "MedicalCondition",
      "name": "Digestive Issues",
      "alternateName": ["Dyspepsia", "Indigestion", "Digestive Disorders", "Gastrointestinal Problems"],
      "associatedAnatomy": {
        "@type": "AnatomicalStructure",
        "name": "Digestive System"
      },
      "possibleTreatment": {
        "@type": "MedicalTherapy",
        "name": "Homeopathic Treatment for Digestive Disorders"
      },
      "signOrSymptom": [
        { "@type": "MedicalSymptom", "name": "Bloating" },
        { "@type": "MedicalSymptom", "name": "Abdominal Pain" },
        { "@type": "MedicalSymptom", "name": "Gas and Flatulence" },
        { "@type": "MedicalSymptom", "name": "Irregular Bowel Movements" },
        { "@type": "MedicalSymptom", "name": "Indigestion" },
        { "@type": "MedicalSymptom", "name": "Nausea" }
      ]
    }
  ];

  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Health Concerns", url: "/diseases-conditions" },
    { name: "Gut Health", url: "/diseases-conditions/gut-health" },
    { name: "Digestive Issues", url: "/diseases-conditions/gut-health/digestive-issues" }
  ];

  return (
    <>
      <SEO
        title="Digestive Issues: Homeopathic Treatment for IBS, Bloating & Indigestion"
        description="Natural homeopathic solutions for digestive problems including IBS, bloating, gas, constipation, and indigestion. Learn symptoms, causes, remedies, and prevention tips."
        keywords={[...concernData.keywords, 'homeopathic digestive treatment', 'natural gut health', 'IBS remedies', 'bloating relief', 'indigestion cure']}
        structuredData={structuredData}
        breadcrumbs={breadcrumbItems}
      />
      
      <HealthConcernPageLayout concern={concernData}>
        <div className="space-y-8">
          {/* Detailed Symptoms Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">Understanding Digestive Issues: Comprehensive Symptom Guide</CardTitle>
              <CardDescription>
                Digestive issues encompass a wide range of symptoms affecting the gastrointestinal tract, significantly impacting daily life and overall well-being.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold text-foreground mb-3">Primary Symptoms</h3>
                
                <div className="space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Bloating and Abdominal Distension</h4>
                    <p className="text-muted-foreground">
                      Bloating is characterized by an uncomfortable feeling of fullness and tightness in the abdomen, often accompanied by visible swelling. This occurs when excess gas accumulates in the digestive system or when the digestive process slows down. Bloating typically worsens after meals, particularly following consumption of high-fiber foods, fatty or greasy meals, carbonated beverages, or foods you're sensitive to. Many people describe it as feeling like their stomach is stretched or inflated like a balloon. The discomfort can range from mild to severe and may be accompanied by a gurgling sensation.
                    </p>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Abdominal Pain and Cramping</h4>
                    <p className="text-muted-foreground">
                      Digestive pain manifests in various forms - sharp, stabbing pains, dull aches, or cramping sensations that come in waves. The location of pain provides clues about its source: upper abdominal pain often relates to stomach issues like gastritis or indigestion, lower abdominal pain may indicate intestinal problems, and pain around the navel can suggest small intestine involvement. Pain patterns vary significantly - some experience constant discomfort, while others have intermittent cramping. Common triggers include eating certain foods, stress, hormonal changes (particularly in women), and irregular eating patterns. The intensity can range from mild discomfort to severe pain that interferes with daily activities.
                    </p>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Irregular Bowel Movements</h4>
                    <p className="text-muted-foreground">
                      Bowel irregularity is one of the most common digestive complaints. Constipation involves having fewer than three bowel movements per week, passing hard or lumpy stools, experiencing excessive straining, or feeling of incomplete evacuation. This can cause abdominal discomfort, bloating, and reduced appetite. Conversely, diarrhea involves frequent loose or watery stools, often accompanied by urgency and cramping. Some individuals experience alternating patterns - periods of constipation followed by diarrhea - which is characteristic of irritable bowel syndrome (IBS). Normal bowel frequency varies from person to person, but any significant change from your usual pattern warrants attention.
                    </p>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Gas and Flatulence</h4>
                    <p className="text-muted-foreground">
                      Excessive gas production and passage (flatulence) is both uncomfortable and socially distressing. Gas can be trapped in the digestive system, causing sharp, stabbing pains that move around the abdomen and may even be mistaken for heart problems when occurring in the upper left abdomen. Belching (burping) occurs when gas is released from the upper digestive tract, often due to swallowing air while eating or drinking. Intestinal gas results from bacterial fermentation of undigested food in the colon and is released as flatulence. While passing gas 10-20 times daily is normal, excessive or foul-smelling gas may indicate digestive issues, food intolerances, or gut microbiome imbalances.
                    </p>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Indigestion and Dyspepsia</h4>
                    <p className="text-muted-foreground">
                      Indigestion refers to discomfort or burning sensation in the upper abdomen, typically occurring during or shortly after eating. Symptoms include a feeling of uncomfortable fullness even after eating small amounts (early satiety), burning or gnawing sensation in the stomach area, acid reflux where stomach acid flows back into the esophagus causing heartburn, and nausea. Indigestion can be triggered by overeating, eating too quickly, consuming rich, fatty, or spicy foods, drinking alcohol or caffeinated beverages, or stress and anxiety. Some people experience chronic indigestion without any identifiable cause, known as functional dyspepsia.
                    </p>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Associated Symptoms</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-muted-foreground"><strong>• Fatigue and Low Energy:</strong> Digestive problems can impair nutrient absorption, leading to persistent tiredness and weakness.</p>
                    <p className="text-muted-foreground"><strong>• Headaches:</strong> Gut-related headaches often accompany digestive upset, particularly with IBS or food sensitivities.</p>
                    <p className="text-muted-foreground"><strong>• Food Intolerances:</strong> Developing sensitivities to previously tolerated foods, causing symptoms upon consumption.</p>
                    <p className="text-muted-foreground"><strong>• Bad Breath (Halitosis):</strong> Chronic bad breath can stem from digestive issues rather than just oral hygiene problems.</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-muted-foreground"><strong>• Skin Problems:</strong> The gut-skin axis means digestive issues often manifest as acne, rashes, or eczema.</p>
                    <p className="text-muted-foreground"><strong>• Mood Changes:</strong> Gut health significantly affects mental health, with digestive problems linked to irritability, anxiety, and depression.</p>
                    <p className="text-muted-foreground"><strong>• Sleep Disturbances:</strong> Digestive discomfort can disrupt sleep quality, while poor sleep worsens digestive function.</p>
                    <p className="text-muted-foreground"><strong>• Weight Changes:</strong> Unexplained weight loss or gain can accompany chronic digestive disorders.</p>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Duration and Patterns</h3>
                <p className="text-muted-foreground">
                  Digestive issues are classified as acute (sudden onset, lasting days to weeks) or chronic (persistent or recurring over months to years). Acute digestive problems often result from dietary indiscretion, food poisoning, viral gastroenteritis, or temporary stress. Chronic digestive issues suggest underlying conditions like IBS, chronic gastritis, food intolerances, or functional digestive disorders. Symptom patterns vary significantly - some experience constant daily symptoms, others have episodic flare-ups with symptom-free periods, and many notice cyclical patterns related to menstrual cycles, stress levels, seasonal changes, or dietary variations. Understanding your symptom pattern helps in diagnosis and treatment planning.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* When to See a Doctor */}
          <Alert variant="destructive" className="border-destructive">
            <AlertTriangle className="h-5 w-5" />
            <AlertTitle className="text-lg font-semibold">When to Seek Immediate Medical Attention</AlertTitle>
            <AlertDescription className="mt-2 space-y-2">
              <p className="font-semibold">Contact emergency services or visit the emergency room if you experience:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Severe, persistent abdominal pain that doesn't improve</li>
                <li>Blood in stool (bright red blood or black, tarry stools)</li>
                <li>Blood in vomit or vomit that looks like coffee grounds</li>
                <li>Unexplained weight loss of more than 5 kg in 3 months</li>
                <li>Persistent vomiting lasting more than 24 hours</li>
                <li>Difficulty swallowing (dysphagia) or pain when swallowing</li>
                <li>Signs of severe dehydration (dizziness, dark urine, rapid heartbeat)</li>
                <li>Fever above 101°F (38.3°C) with abdominal pain</li>
                <li>Jaundice (yellowing of skin or eyes)</li>
                <li>Severe abdominal tenderness or rigid abdomen</li>
              </ul>
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                Consult a Healthcare Professional
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground">Schedule an appointment with your doctor if you experience:</p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Digestive symptoms persisting for more than 2 weeks despite home remedies</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Symptoms significantly interfering with work, social activities, or quality of life</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Over-the-counter medications not providing adequate relief</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>New or worsening symptoms developing over time</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Family history of digestive diseases (inflammatory bowel disease, colon cancer)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Age over 50 with new digestive symptoms (requires screening for serious conditions)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Chronic use of NSAIDs (ibuprofen, aspirin) or other medications affecting digestion</span>
                </li>
              </ul>

              <Alert className="mt-4 bg-primary/10 border-primary">
                <Heart className="h-4 w-4 text-primary" />
                <AlertTitle className="text-primary">When Homeopathy Can Help</AlertTitle>
                <AlertDescription className="text-muted-foreground mt-2">
                  Homeopathic treatment is particularly effective for functional digestive disorders (IBS, functional dyspepsia), chronic bloating and gas, mild to moderate indigestion and acid reflux, stress-related digestive issues, and as complementary treatment alongside conventional care for various digestive conditions. After ruling out serious organic diseases, homeopathy offers gentle, natural solutions that address root causes rather than just suppressing symptoms.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Homeopathic Treatment Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Homeopathic Treatment Approach</CardTitle>
              <CardDescription>
                Homeopathy treats digestive issues holistically, addressing root causes and individual symptoms
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose max-w-none">
                <p className="text-muted-foreground mb-4">
                  Homeopathic treatment for digestive issues focuses on stimulating the body's natural healing mechanisms to restore digestive balance. Unlike conventional treatments that often suppress symptoms, homeopathy works to correct underlying imbalances in digestive function, gut motility, and the gut-brain connection.
                </p>

                <h3 className="text-lg font-semibold text-foreground mb-3">Key Homeopathic Remedies for Digestive Issues</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Nux Vomica</h4>
                    <Badge className="mb-2">Most Commonly Used</Badge>
                    <p className="text-sm text-muted-foreground">
                      <strong>Best for:</strong> Indigestion from overindulgence in food or alcohol, heartburn, constipation with ineffectual urging, cramping pain.
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      <strong>Typical profile:</strong> Stressed individuals, sedentary lifestyle, irritable temperament, symptoms worse in morning and after eating.
                    </p>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Lycopodium</h4>
                    <Badge variant="secondary" className="mb-2">Bloating Specialist</Badge>
                    <p className="text-sm text-muted-foreground">
                      <strong>Best for:</strong> Bloating especially in lower abdomen, gas and fullness after eating small amounts, symptoms worse 4-8 PM.
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      <strong>Typical profile:</strong> Anticipatory anxiety, craving sweets but worsened by them, early satiety, chronic digestive weakness.
                    </p>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Carbo Vegetabilis</h4>
                    <Badge variant="outline" className="mb-2">Gas Relief</Badge>
                    <p className="text-sm text-muted-foreground">
                      <strong>Best for:</strong> Severe bloating with excessive gas, sluggish digestion, feeling of heaviness after eating, desire for fresh air.
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      <strong>Typical profile:</strong> Weak digestive fire, intolerance to fatty foods, belching provides temporary relief.
                    </p>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Arsenicum Album</h4>
                    <Badge variant="outline" className="mb-2">Anxiety + Digestion</Badge>
                    <p className="text-sm text-muted-foreground">
                      <strong>Best for:</strong> Burning stomach pain, food poisoning, anxiety about health, vomiting and diarrhea together.
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      <strong>Typical profile:</strong> Restless, anxious, fastidious, symptoms worse midnight to 2 AM, better with warmth and sips of warm water.
                    </p>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Pulsatilla</h4>
                    <Badge variant="outline" className="mb-2">Rich Food Intolerance</Badge>
                    <p className="text-sm text-muted-foreground">
                      <strong>Best for:</strong> Indigestion after fatty foods, changeable symptoms, bloating with lack of thirst, gentle personality.
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      <strong>Typical profile:</strong> Emotional, mild, better with company and consolation, symptoms improve with fresh air.
                    </p>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Argentum Nitricum</h4>
                    <Badge variant="outline" className="mb-2">Stress-Related</Badge>
                    <p className="text-sm text-muted-foreground">
                      <strong>Best for:</strong> Anticipatory anxiety causing digestive upset, craving sweets which worsen symptoms, diarrhea before important events.
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      <strong>Typical profile:</strong> Hurried, impulsive, fearful of future events, symptoms worse with sugar and before stressful situations.
                    </p>
                  </div>
                </div>

                <Alert className="mt-6 bg-muted">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Personalized Treatment</AlertTitle>
                  <AlertDescription>
                    The selection of the right homeopathic remedy depends on your individual symptom picture, personality, and overall health status. A qualified homeopath considers not just your digestive symptoms but also your emotional state, stress levels, food preferences, and general constitution to prescribe the most suitable remedy and potency. Self-treatment with over-the-counter homeopathic remedies may help acute symptoms, but constitutional treatment from a professional homeopath provides best long-term results for chronic digestive issues.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>

          {/* Related Conditions Grid */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Related Digestive and Health Conditions</CardTitle>
              <CardDescription>
                Explore interconnected health concerns that may affect or be affected by digestive issues
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {relatedConditions.map((condition, index) => (
                  <Link
                    key={index}
                    to={condition.path}
                    className="group block p-4 rounded-lg border border-border bg-card hover:border-primary hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-3xl">{condition.icon}</span>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1 text-sm">
                          {condition.name}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {condition.description}
                        </p>
                        <div className="flex items-center gap-1 mt-2 text-primary text-xs font-medium">
                          Learn More <ArrowRight className="h-3 w-3" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Lifestyle Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Lifestyle Tips & Prevention Strategies</CardTitle>
              <CardDescription>
                Practical approaches to improve digestive health and prevent future issues
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Utensils className="h-6 w-6 text-primary shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Dietary Recommendations</h3>
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-medium text-foreground mb-1">Foods to Include:</h4>
                          <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
                            <li>Probiotic-rich foods: yogurt, kefir, sauerkraut, kimchi</li>
                            <li>Digestive aids: ginger, peppermint, fennel, chamomile</li>
                            <li>Enzyme-rich foods: papaya, pineapple, mango</li>
                            <li>Fiber sources: whole grains, fruits, vegetables (gradually increase)</li>
                            <li>Lean proteins: chicken, fish, eggs, legumes</li>
                            <li>Healthy fats: olive oil, avocados, nuts in moderation</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-foreground mb-1">Foods to Avoid or Limit:</h4>
                          <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
                            <li>High-fat and fried foods</li>
                            <li>Processed and packaged foods with additives</li>
                            <li>Artificial sweeteners (sorbitol, mannitol, xylitol)</li>
                            <li>Carbonated and caffeinated beverages</li>
                            <li>Alcohol and tobacco</li>
                            <li>Spicy foods if sensitive</li>
                            <li>Dairy if lactose intolerant</li>
                            <li>Gluten if sensitive or celiac</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-foreground mb-1">Eating Habits:</h4>
                          <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
                            <li>Eat mindfully: chew thoroughly, eat slowly</li>
                            <li>Avoid distractions while eating (TV, phone)</li>
                            <li>Eat smaller, more frequent meals (5-6 per day)</li>
                            <li>Maintain regular meal times</li>
                            <li>Don't skip breakfast</li>
                            <li>Stop eating 2-3 hours before bedtime</li>
                            <li>Stay adequately hydrated: 8-10 glasses water daily</li>
                            <li>Keep a food diary to identify triggers</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Activity className="h-6 w-6 text-primary shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Lifestyle Modifications</h3>
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-medium text-foreground mb-1">Stress Management:</h4>
                          <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
                            <li>Practice yoga or tai chi regularly</li>
                            <li>Meditation and mindfulness exercises (10-15 minutes daily)</li>
                            <li>Deep breathing exercises before meals</li>
                            <li>Progressive muscle relaxation</li>
                            <li>Adequate leisure time and hobbies</li>
                            <li>Counseling or therapy if needed</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-foreground mb-1">Physical Activity:</h4>
                          <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
                            <li>30 minutes of moderate exercise daily</li>
                            <li>Walking, especially after meals</li>
                            <li>Swimming or cycling</li>
                            <li>Avoid vigorous exercise immediately after eating</li>
                            <li>Gentle stretching for abdominal muscles</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-foreground mb-1">Sleep Hygiene:</h4>
                          <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
                            <li>7-9 hours of quality sleep nightly</li>
                            <li>Consistent sleep-wake schedule</li>
                            <li>Elevate head of bed if experiencing reflux</li>
                            <li>Avoid heavy meals before bedtime</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-foreground mb-1">Other Important Factors:</h4>
                          <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
                            <li>Quit smoking (impairs digestive function)</li>
                            <li>Maintain healthy weight</li>
                            <li>Proper posture while eating (sit upright)</li>
                            <li>Wear loose, comfortable clothing</li>
                            <li>Regular health check-ups</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Alert className="bg-primary/10 border-primary">
                    <Clock className="h-4 w-4 text-primary" />
                    <AlertTitle className="text-primary">Natural Home Remedies</AlertTitle>
                    <AlertDescription className="text-muted-foreground space-y-1 text-sm">
                      <p>• <strong>Ginger tea:</strong> Natural anti-inflammatory, helps nausea and bloating</p>
                      <p>• <strong>Peppermint tea:</strong> Relieves gas and soothes digestive tract</p>
                      <p>• <strong>Chamomile tea:</strong> Calms digestive system, reduces inflammation</p>
                      <p>• <strong>Warm water with lemon:</strong> Stimulates digestion, morning ritual</p>
                      <p>• <strong>Fennel seeds:</strong> Chew after meals to prevent gas</p>
                      <p>• <strong>Warm compress:</strong> Apply to abdomen for cramping relief</p>
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
              <CardDescription>
                Common questions about digestive issues and homeopathic treatment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left hover:text-primary">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Patient Case Studies */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Patient Success Stories</CardTitle>
              <CardDescription>
                Real-life examples of how homeopathy has helped individuals overcome digestive issues
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {caseStudies.map((study, index) => (
                <div key={index} className="bg-muted/30 rounded-lg p-6 border border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-3">{study.title}</h3>
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <Badge variant="outline" className="mb-2">Patient Profile</Badge>
                      <p className="text-muted-foreground">{study.profile}</p>
                    </div>

                    <div>
                      <p className="font-medium text-foreground mb-1">Presenting Symptoms:</p>
                      <p className="text-muted-foreground">{study.symptoms}</p>
                    </div>

                    <div>
                      <p className="font-medium text-foreground mb-1">Treatment Approach:</p>
                      <p className="text-muted-foreground">{study.remedy}</p>
                    </div>

                    <div>
                      <p className="font-medium text-foreground mb-1">Treatment Outcome:</p>
                      <p className="text-muted-foreground">{study.outcome}</p>
                    </div>

                    <div className="bg-primary/10 border-l-4 border-primary p-3 rounded">
                      <p className="font-medium text-foreground text-xs mb-1">Patient Testimonial:</p>
                      <p className="text-muted-foreground italic">"{study.testimonial}"</p>
                    </div>
                  </div>
                </div>
              ))}

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  <strong>Disclaimer:</strong> These case studies are illustrative examples based on typical treatment patterns. Individual results vary based on the unique characteristics of each case, overall health status, adherence to treatment, and lifestyle factors. These examples are not guarantees of specific outcomes. Always consult with a qualified healthcare professional for personalized diagnosis and treatment.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-semibold text-foreground">Ready for Personalized Treatment?</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  While this guide provides comprehensive information about digestive issues and homeopathic treatments, every individual's condition is unique. Our experienced homeopaths can provide personalized consultations to identify the root causes of your digestive problems and create a customized treatment plan tailored to your specific needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
                  <Link 
                    to="/consultation" 
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Book a Consultation
                  </Link>
                  <Link 
                    to="/diseases-conditions/gut-health" 
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border bg-background text-foreground font-semibold hover:bg-muted transition-colors"
                  >
                    Explore More Gut Health Topics
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </HealthConcernPageLayout>
    </>
  );
};

export default DigestiveIssuesDetailed;
