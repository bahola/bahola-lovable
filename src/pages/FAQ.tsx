
import React, { useState, useEffect } from 'react';
import { PageLayout } from '@/components/PageLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import { Search, HelpCircle, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

// FAQ data organized by topics
const faqData = {
  'Homeopathy Basics': [
    {
      question: 'What is Homeopathy?',
      answer: 'Homeopathy is a natural system of medicine developed over 200 years ago by German physician Dr. Samuel Hahnemann. It is based on the principle of "like cures like" (similia similibus curentur), meaning that a substance that can cause symptoms in a healthy person can be used to treat similar symptoms in an ill person when given in highly diluted doses.'
    },
    {
      question: 'How does Homeopathy work?',
      answer: `Homeopathy works on three fundamental principles:

• Law of Similars: Substances that produce symptoms in healthy individuals can treat similar symptoms in sick individuals
• Minimum Dose: The healing effect is enhanced when the medicine is given in the smallest possible dose
• Individualization: Treatment is tailored to each person's unique symptom pattern, constitution, and circumstances

The medicines are prepared through a process of serial dilution and succussion (vigorous shaking), which is believed to enhance the therapeutic properties while minimizing side effects.`
    },
    {
      question: 'Is Homeopathy scientifically proven?',
      answer: `The scientific evidence for homeopathy includes:

• Clinical trials: Various studies showing positive results for specific conditions
• Systematic reviews: Mixed findings with some showing benefits
• Observational studies: Real-world effectiveness data
• Laboratory research: Studies on ultra-molecular dilutions

While debate continues in the scientific community, millions of patients worldwide report benefits from homeopathic treatment.`
    }
  ],
  'Safety and Side Effects': [
    {
      question: 'Is Homeopathy safe?',
      answer: `Yes, homeopathy is generally considered very safe when practiced by qualified practitioners. The medicines are:

• Highly diluted: Reducing the risk of toxic effects
• Non-addictive: No risk of dependency
• Gentle: Suitable for all age groups, including infants, pregnant women, and elderly
• No known drug interactions: Can be safely used alongside conventional medications

However, it's important to consult with a qualified homeopathic practitioner for proper diagnosis and treatment.`
    },
    {
      question: 'Are there any side effects?',
      answer: `Homeopathic medicines are generally free from side effects due to their highly diluted nature. However, some patients may experience:

• Initial aggravation: Temporary worsening of symptoms before improvement begins
• Proving symptoms: Rare occurrence of new symptoms if the wrong remedy is taken repeatedly
• Detox reactions: Mild symptoms as the body eliminates toxins

These reactions are typically mild and temporary. Always consult your homeopath if you experience any unusual symptoms.`
    },
    {
      question: 'Can children and pregnant women use Homeopathy?',
      answer: `Yes, homeopathy is particularly beneficial for:

Children:
• Safe and gentle for all ages, including newborns
• Effective for common childhood ailments
• Helps build natural immunity
• No risk of antibiotic resistance

Pregnant Women:
• Safe during pregnancy and breastfeeding
• Helps with pregnancy-related discomforts
• Supports natural childbirth
• Aids in postpartum recovery

Always consult a qualified homeopathic practitioner for appropriate remedies and dosages.`
    }
  ],
  'Treatment and Conditions': [
    {
      question: 'What conditions can Homeopathy treat?',
      answer: `Homeopathy can be effective for a wide range of acute and chronic conditions, including:

Acute Conditions:
• Common cold and flu
• Fever and infections
• Digestive issues
• Injuries and trauma
• Allergic reactions

Chronic Conditions:
• Arthritis and joint pain
• Skin conditions (eczema, psoriasis)
• Respiratory disorders (asthma, bronchitis)
• Mental and emotional issues (anxiety, depression)
• Hormonal imbalances
• Autoimmune disorders`
    },
    {
      question: 'How long does Homeopathic treatment take?',
      answer: `The duration of treatment varies depending on:

• Nature of the condition: Acute conditions may respond within hours to days, while chronic conditions may take weeks to months
• Individual response: Each person responds differently based on their vital force and constitution
• Severity and duration: Long-standing conditions typically require longer treatment periods
• Patient compliance: Following the prescribed regimen consistently affects outcomes

Generally, patients may notice initial improvements within 2-4 weeks of starting treatment.`
    },
    {
      question: 'Can Homeopathy cure serious diseases?',
      answer: `Homeopathy can be beneficial for serious conditions as:

• Complementary treatment: Supporting conventional care
• Palliative care: Improving quality of life
• Preventive medicine: Strengthening immunity
• Chronic management: Long-term symptom control

However, for life-threatening conditions, conventional medical care should be the primary treatment, with homeopathy as supportive therapy.`
    }
  ],
  'Usage and Consultation': [
    {
      question: 'How should Homeopathic medicines be taken?',
      answer: `General Guidelines:

• Take medicines on an empty stomach (30 minutes before or after meals)
• Avoid strong flavors, coffee, mint, and camphor during treatment
• Let pills dissolve under the tongue rather than swallowing
• Store medicines in a cool, dry place away from strong odors
• Follow the specific dosage and frequency prescribed by your homeopath

Important: Never self-medicate or change dosages without consulting your practitioner.`
    },
    {
      question: 'What should I expect during a Homeopathic consultation?',
      answer: `A typical homeopathic consultation involves:

Initial Consultation (60-90 minutes):
• Detailed case history including physical, mental, and emotional symptoms
• Past medical history and family history
• Lifestyle factors, preferences, and personality traits
• Physical examination if necessary
• Remedy selection based on totality of symptoms

Follow-up Consultations (30-45 minutes):
• Assessment of progress
• Adjustment of treatment plan
• Address any concerns or new symptoms`
    },
    {
      question: 'How do I choose a qualified Homeopathic practitioner?',
      answer: `Look for practitioners who have:

• Formal education from recognized homeopathic institutions
• Valid registration with homeopathic medical boards
• Experience in treating your specific condition
• Good reputation and patient testimonials
• Proper clinical setup and ethical practices`
    },
    {
      question: 'What should I avoid during Homeopathic treatment?',
      answer: `Substances to avoid:
• Strong coffee and tea
• Mint and menthol products
• Camphor and eucalyptus
• Strong perfumes and aromatics
• Recreational drugs and excessive alcohol

Lifestyle factors:
• Maintain regular meal and sleep schedules
• Avoid excessive stress
• Follow prescribed dietary guidelines
• Continue gentle exercise as tolerated`
    }
  ],
  'Medicine Preparation and Integration': [
    {
      question: 'How are Homeopathic medicines prepared?',
      answer: `Homeopathic medicines are prepared through:

• Source Selection: Plant, mineral, or animal substances
• Mother Tincture: Initial extraction in alcohol
• Serial Dilution: Progressive dilution in specific ratios
• Succussion: Vigorous shaking between dilutions
• Potentization: Process that increases therapeutic effect
• Final Form: Pills, liquids, or tablets

This process ensures safety while maintaining therapeutic efficacy.`
    },
    {
      question: 'Can Homeopathy be used with conventional medicine?',
      answer: `Yes, homeopathy can safely complement conventional medical treatment. Many patients use homeopathy alongside:

• Prescription medications
• Surgical procedures
• Other complementary therapies

However, it's essential to inform both your homeopath and conventional doctor about all treatments you're receiving to ensure optimal care coordination.`
    },
    {
      question: 'What is the difference between Homeopathy and other alternative medicines?',
      answer: `Key differences:

Homeopathy:
• Principle: Like cures like
• Medicines: Highly diluted
• Approach: Individualized
• Side effects: Minimal

Ayurveda:
• Principle: Balance of doshas
• Medicines: Herbal preparations
• Approach: Constitutional
• Side effects: Possible

Allopathy:
• Principle: Opposite cures opposite
• Medicines: Chemical compounds
• Approach: Disease-specific
• Side effects: Common`
    }
  ],
  'Cost and Contact': [
    {
      question: 'How much does Homeopathic treatment cost?',
      answer: `The cost of homeopathic treatment varies based on:

• Consultation fees: Initial and follow-up visits
• Medicine costs: Generally affordable compared to conventional drugs
• Treatment duration: Longer for chronic conditions
• Practitioner experience: Senior practitioners may charge more
• Location: Urban areas typically cost more

Many patients find homeopathy cost-effective due to its gentle approach and reduced need for additional medications.`
    }
  ]
};

// Convert all FAQ data to a searchable array
const allFaqs = Object.entries(faqData).flatMap(([category, questions]) => 
  questions.map(q => ({ ...q, category }))
);

const FAQ: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState('Homeopathy Basics');
  
  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchQuery]);
  
  // Update URL when debounced search value changes
  useEffect(() => {
    if (debouncedSearchQuery.trim() !== initialQuery) {
      const newParams = new URLSearchParams(location.search);
      
      if (debouncedSearchQuery.trim()) {
        newParams.set('q', debouncedSearchQuery);
      } else {
        newParams.delete('q');
      }
      
      const newSearch = newParams.toString();
      const queryString = newSearch ? `?${newSearch}` : '';
      navigate(`${location.pathname}${queryString}`, { replace: true });
    }
  }, [debouncedSearchQuery, navigate, location.pathname, location.search, initialQuery]);
  
  // Filter FAQs based on search query
  const filteredFaqs = debouncedSearchQuery 
    ? allFaqs.filter(faq => 
        faq.question.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      )
    : [];
  
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
      setDebouncedSearchQuery(query);
    }
  }, [location.search]);

  return (
    <PageLayout title="Frequently Asked Questions About Homeopathy" description="Find comprehensive answers to common questions about homeopathy, treatment, safety, and more">
      <div className="max-w-4xl mx-auto">
        {/* Search Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Search FAQ..."
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

        {/* Show search results if searching */}
        {debouncedSearchQuery && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Search Results ({filteredFaqs.length})</h2>
            {filteredFaqs.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`search-${index}`}>
                    <AccordionTrigger className="text-left">
                      <div>
                        <span className="font-medium">{faq.question}</span>
                        <span className="text-sm text-bahola-neutral-500 block mt-1">
                          Category: {faq.category}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-bahola-neutral-700 whitespace-pre-line">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <HelpCircle className="mx-auto mb-4 text-bahola-neutral-400" size={48} />
                <p className="text-bahola-neutral-600">No FAQs matching your search were found.</p>
                <p className="text-bahola-neutral-500 text-sm mt-2">Try different keywords or browse categories below.</p>
              </div>
            )}
          </div>
        )}

        {/* FAQ Categories and Questions */}
        {!debouncedSearchQuery && (
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6 flex flex-wrap justify-start gap-2">
              {Object.keys(faqData).map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="px-4 py-2 rounded-md"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {Object.entries(faqData).map(([category, questions]) => (
              <TabsContent key={category} value={category}>
                <h2 className="text-xl font-semibold mb-4">{category}</h2>
                <Accordion type="single" collapsible className="w-full">
                  {questions.map((faq, index) => (
                    <AccordionItem key={index} value={`${category}-${index}`}>
                      <AccordionTrigger className="text-left font-medium">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-bahola-neutral-700 whitespace-pre-line">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
            ))}
          </Tabs>
        )}

        {/* Disclaimer Section */}
        <div className="mt-12 bg-amber-50 p-6 rounded-lg border border-amber-200">
          <h3 className="text-lg font-semibold mb-2 text-amber-800">Important Information</h3>
          <p className="text-amber-700 mb-4">
            For more information about homeopathic treatment and Bahola products, please consult with qualified homeopathic practitioners or contact authorized Bahola distributors in your area.
          </p>
          <p className="text-sm text-amber-600">
            <strong>Disclaimer:</strong> This information is for educational purposes only and should not replace professional medical advice. Always consult qualified healthcare practitioners for proper diagnosis and treatment.
          </p>
        </div>

        {/* Related Resources Section */}
        <div className="mt-12 bg-bahola-blue-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Related Resources</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-md shadow-sm">
              <h3 className="font-medium mb-2">Help Center</h3>
              <p className="text-sm text-bahola-neutral-600 mb-3">
                Explore our detailed guides, tutorials, and documentation.
              </p>
              <Button variant="outline" asChild className="w-full">
                <a href="/help-center">Visit Help Center</a>
              </Button>
            </div>
            <div className="bg-white p-4 rounded-md shadow-sm">
              <h3 className="font-medium mb-2">Contact Support</h3>
              <p className="text-sm text-bahola-neutral-600 mb-3">
                Couldn't find what you're looking for? Our support team is here to help.
              </p>
              <Button variant="outline" asChild className="w-full">
                <a href="/contact">Contact Us</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default FAQ;
