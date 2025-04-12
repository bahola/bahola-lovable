
import React, { useState } from 'react';
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
import { Search, HelpCircle } from 'lucide-react';

// FAQ data organized by topics
const faqData = {
  'Products and Usage': [
    {
      question: 'What is homeopathy?',
      answer: 'Homeopathy is a medical system based on the belief that the body can cure itself. It uses tiny amounts of natural substances, like plants and minerals, to stimulate the healing process. Founded in the late 18th century by Samuel Hahnemann, homeopathy follows the principle that "like cures like."'
    },
    {
      question: 'Are homeopathic products safe to use?',
      answer: 'Yes, homeopathic products are generally considered safe due to their high dilution. They have minimal side effects and are suitable for people of all ages, including infants, pregnant women, and the elderly. However, it\'s always advisable to consult with a healthcare provider before starting any new treatment.'
    },
    {
      question: 'How should I store homeopathic products?',
      answer: 'Store homeopathic remedies in a cool, dry place away from direct sunlight, strong smells, and electrical appliances. Keep them in their original containers, tightly closed. Avoid handling the tablets directly; instead, tip them into the cap of the container or a clean paper. Store away from food items and out of reach of children.'
    },
    {
      question: 'Can I take multiple homeopathic remedies together?',
      answer: 'While it\'s possible to take multiple homeopathic remedies together, it\'s best to consult with a qualified homeopath who can recommend the appropriate combination based on your specific health needs. Self-prescription of multiple remedies might reduce their effectiveness.'
    }
  ],
  'Ordering and Shipping': [
    {
      question: 'How long does shipping take?',
      answer: 'Domestic orders are typically processed within 1-2 business days and delivered within 3-5 business days, depending on your location. International shipping can take 7-14 business days. You\'ll receive tracking information once your order is dispatched.'
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship internationally to select countries. Shipping costs and delivery times vary based on location. Please note that international orders may be subject to customs duties and taxes, which are the responsibility of the recipient.'
    },
    {
      question: 'What if my order arrives damaged?',
      answer: 'If your order arrives damaged, please contact our customer service team within 48 hours of receiving the package. Include your order number and photos of the damaged items. We\'ll arrange for a replacement or refund as soon as possible.'
    },
    {
      question: 'Can I modify or cancel my order after placing it?',
      answer: 'You can modify or cancel your order within 1 hour of placing it by contacting our customer service team. After this period, orders enter our processing system and cannot be modified or canceled. Please ensure your order details are correct before confirming.'
    }
  ],
  'Returns and Refunds': [
    {
      question: 'What is your return policy?',
      answer: 'We accept returns within 30 days of purchase for unopened products in their original packaging. To initiate a return, please contact our customer service team with your order number and reason for return. Return shipping costs are the responsibility of the customer unless the return is due to our error.'
    },
    {
      question: 'How long does it take to process a refund?',
      answer: 'Once we receive your returned items and verify their condition, refunds are processed within 5-7 business days. The refund will be issued to the original payment method used for the purchase. You\'ll receive an email notification once the refund is processed.'
    },
    {
      question: 'Can I exchange a product instead of returning it?',
      answer: 'Yes, we offer exchanges for products of equal or lesser value within 30 days of purchase. If you wish to exchange for a product of higher value, you\'ll need to pay the difference. Contact our customer service team to arrange an exchange.'
    },
    {
      question: 'Do you offer a satisfaction guarantee?',
      answer: 'Yes, we stand behind the quality of our products with a 100% satisfaction guarantee. If you\'re not completely satisfied with your purchase, please contact our customer service team within 30 days of receiving your order to discuss a return, exchange, or refund options.'
    }
  ],
  'Account and Orders': [
    {
      question: 'How do I create an account?',
      answer: 'To create an account, click on the "Sign Up" button at the top of our website. You\'ll need to provide your email address, create a password, and fill in your basic information. Having an account allows you to track orders, save favorite products, and enjoy a smoother checkout process.'
    },
    {
      question: 'How can I track my order?',
      answer: 'Once your order is dispatched, you\'ll receive a shipping confirmation email with a tracking number and link. You can also track your order by logging into your account and viewing your order history. If you don\'t see a tracking number, your order may still be processing.'
    },
    {
      question: 'I forgot my password. How can I reset it?',
      answer: 'To reset your password, click on the "Sign In" button, then select "Forgot Password." Enter the email address associated with your account, and we\'ll send you a password reset link. If you don\'t receive the email, check your spam folder or contact customer service for assistance.'
    },
    {
      question: 'Can I view my order history?',
      answer: 'Yes, you can view your order history by logging into your account and navigating to the "Order History" section. This provides details of all your past orders, including product information, order status, and tracking numbers for recent orders.'
    }
  ],
  'Prescriptions and Consultations': [
    {
      question: 'Do I need a prescription for homeopathic remedies?',
      answer: 'Most homeopathic remedies do not require a prescription and are available over-the-counter. However, for personalized treatment plans or specific health conditions, we recommend consulting with a qualified homeopath who can recommend the appropriate remedies for your needs.'
    },
    {
      question: 'How can I consult with a homeopath?',
      answer: 'You can schedule a consultation with one of our qualified homeopaths through our website\'s "Consult a Homeopath" page. We offer both in-person and virtual consultations. During the consultation, the homeopath will assess your health concerns and recommend suitable remedies.'
    },
    {
      question: 'What should I expect during a homeopathic consultation?',
      answer: 'A homeopathic consultation typically lasts 60-90 minutes for a first visit. The homeopath will ask detailed questions about your symptoms, medical history, lifestyle, and emotional state. This comprehensive approach helps identify the most appropriate remedies for your specific health needs.'
    },
    {
      question: 'How often will I need follow-up consultations?',
      answer: 'Follow-up consultations are usually scheduled 4-6 weeks after the initial consultation to assess your progress and make any necessary adjustments to your treatment plan. The frequency of subsequent follow-ups depends on your individual health situation and response to the remedies.'
    }
  ]
};

// Convert all FAQ data to a searchable array
const allFaqs = Object.entries(faqData).flatMap(([category, questions]) => 
  questions.map(q => ({ ...q, category }))
);

const FAQ: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('Products and Usage');
  
  // Filter FAQs based on search query
  const filteredFaqs = searchQuery 
    ? allFaqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled by the state change
  };

  return (
    <PageLayout title="Frequently Asked Questions" description="Find answers to common questions about our products and services">
      <div className="max-w-4xl mx-auto">
        {/* Search Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Search FAQ..."
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit">Search</Button>
          </form>
        </div>

        {/* Show search results if searching */}
        {searchQuery && (
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
                    <AccordionContent className="text-bahola-neutral-700">
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
        {!searchQuery && (
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
                      <AccordionContent className="text-bahola-neutral-700">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
            ))}
          </Tabs>
        )}

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
