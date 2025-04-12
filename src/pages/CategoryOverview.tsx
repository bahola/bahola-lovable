
import React from 'react';
import { PageLayout } from '@/components/PageLayout';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, ChevronRight, Filter, Grid2X2, List } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const CategoryOverview = () => {
  // This would typically come from an API or database
  const categories = [
    {
      id: 'mother-tinctures',
      name: 'Mother Tinctures',
      description: 'The foundation of homeopathic remedies, our mother tinctures are prepared from the finest raw materials.',
      image: '/placeholder.svg',
      count: 120
    },
    {
      id: 'dilutions',
      name: 'Dilutions',
      description: 'Potentized homeopathic remedies in various dilutions for different therapeutic needs.',
      image: '/placeholder.svg',
      count: 230
    },
    {
      id: 'biochemics',
      name: 'Biochemics',
      description: 'Cell salts that help restore mineral balance in the body for optimal cellular function.',
      image: '/placeholder.svg',
      count: 35
    },
    {
      id: 'lm-potencies',
      name: 'LM Potencies',
      description: 'Gentle yet powerful remedies suitable for chronic conditions and sensitive patients.',
      image: '/placeholder.svg',
      count: 85
    },
    {
      id: 'bach-flower',
      name: 'Bach Flower Remedies',
      description: 'Natural solutions for emotional and mental wellbeing based on Dr. Bach\'s flower essences.',
      image: '/placeholder.svg',
      count: 38
    },
    {
      id: 'combinations',
      name: 'Combination Remedies',
      description: 'Carefully formulated remedy combinations targeting specific ailments and health concerns.',
      image: '/placeholder.svg',
      count: 45
    }
  ];

  // Featured products
  const featuredProducts = [
    {
      title: "Arnica Montana 30C",
      description: "Relief for bruises, muscle soreness and trauma",
      price: 8.99,
      imageSrc: "/placeholder.svg",
      discountPercentage: 10,
      rating: 4.8,
      reviewCount: 120,
      url: "/product/arnica-30c"
    },
    {
      title: "Nux Vomica 200C",
      description: "Digestive support and relief from overindulgence",
      price: 9.99,
      imageSrc: "/placeholder.svg",
      discountPercentage: 0,
      rating: 4.7,
      reviewCount: 85,
      url: "/product/nux-vomica-200c"
    },
    {
      title: "Biochemic Cell Salt Kit",
      description: "Complete set of 12 essential cell salts",
      price: 24.99,
      imageSrc: "/placeholder.svg",
      discountPercentage: 15,
      rating: 4.9,
      reviewCount: 230,
      url: "/product/biochemic-kit"
    },
    {
      title: "Rescue Remedy Drops",
      description: "Bach flower remedy for stress and anxiety",
      price: 12.99,
      imageSrc: "/placeholder.svg",
      discountPercentage: 0,
      rating: 4.6,
      reviewCount: 178,
      url: "/product/rescue-remedy"
    },
  ];

  // Health concerns with icons
  const healthConcerns = [
    { name: 'Allergies', icon: '🌼' },
    { name: 'Digestive Health', icon: '🍃' },
    { name: 'Respiratory Care', icon: '🫁' },
    { name: 'Skin Care', icon: '🧴' },
    { name: 'Sleep & Stress', icon: '😴' },
    { name: 'Immunity Support', icon: '🛡️' },
    { name: 'Joint & Muscle', icon: '💪' },
    { name: 'Children\'s Health', icon: '👶' },
  ];

  const quickFilters = ['New Arrivals', 'Bestsellers', 'Sale Items', 'Practitioner Recommended'];

  return (
    <PageLayout title="Shop Homeopathic Products" description="Browse our complete range of homeopathic remedies and natural solutions">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center text-sm text-bahola-neutral-600 mb-6">
        <Link to="/" className="hover:text-bahola-blue-500">Home</Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="font-medium">Shop All Categories</span>
      </div>

      {/* View Controls and Quick Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex items-center gap-4">
          <Tabs defaultValue="grid" className="w-auto">
            <TabsList className="h-9">
              <TabsTrigger value="grid" className="px-3">
                <Grid2X2 className="h-4 w-4 mr-2" />
                Grid
              </TabsTrigger>
              <TabsTrigger value="list" className="px-3">
                <List className="h-4 w-4 mr-2" />
                List
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Button variant="outline" size="sm" className="h-9">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
          {quickFilters.map((filter) => (
            <Button 
              key={filter} 
              variant="outline" 
              size="sm" 
              className="whitespace-nowrap"
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>

      {/* Featured Products Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link to="/search?featured=true" className="text-bahola-blue-500 hover:underline flex items-center">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <ProductCard 
              key={index}
              title={product.title}
              description={product.description}
              price={product.price}
              imageSrc={product.imageSrc}
              discountPercentage={product.discountPercentage}
              rating={product.rating}
              reviewCount={product.reviewCount}
              url={product.url}
            />
          ))}
        </div>
      </section>

      {/* Main Categories Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card key={category.id} className="overflow-hidden hover:shadow-lg transition-shadow border-bahola-neutral-200">
              <Link to={`/category/${category.id}`} className="block h-full">
                <div className="aspect-video overflow-hidden bg-bahola-neutral-50">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardContent className="p-5">
                  <div className="mb-2">
                    <h3 className="text-xl font-bold text-bahola-neutral-800">{category.name}</h3>
                    <p className="text-sm text-bahola-neutral-500">{category.count} products</p>
                  </div>
                  <p className="text-bahola-neutral-600 mb-4 line-clamp-2">{category.description}</p>
                  <div className="flex justify-end">
                    <span className="text-bahola-blue-500 font-medium flex items-center">
                      Browse Products <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </section>

      {/* Shop by Health Concern Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Shop by Health Concern</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {healthConcerns.map((concern) => (
            <Link 
              key={concern.name} 
              to={`/search?concern=${encodeURIComponent(concern.name)}`}
              className="flex flex-col items-center p-4 bg-white border border-bahola-neutral-200 rounded-lg hover:shadow-md transition-shadow text-center"
            >
              <span className="text-3xl mb-2">{concern.icon}</span>
              <span className="font-medium text-bahola-neutral-800">{concern.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white border border-bahola-neutral-200 rounded-lg p-6 mb-12">
        <h2 className="text-2xl font-bold mb-4">Common Questions About Homeopathy</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left">What is homeopathy?</AccordionTrigger>
            <AccordionContent>
              Homeopathy is a natural form of medicine used by over 200 million people worldwide to treat both acute and chronic conditions. It's based on the principle of 'like cures like' – in other words, a substance that can cause symptoms when taken in large doses, can be used in small amounts to treat similar symptoms.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-left">How do homeopathic remedies work?</AccordionTrigger>
            <AccordionContent>
              Homeopathic medicines stimulate the body's natural ability to heal itself. They work by gently triggering the body's own healing mechanisms to restore balance and health, rather than suppressing symptoms.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-left">How do I choose the right remedy?</AccordionTrigger>
            <AccordionContent>
              Selecting the correct homeopathic remedy involves matching your specific symptoms to the remedy that would produce similar symptoms in a healthy person. Our experts are available to guide you in finding the right remedy for your condition.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Assistance Section */}
      <section className="bg-bahola-blue-50 p-6 rounded-lg">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 mb-6 md:mb-0 md:mr-8">
            <h2 className="text-2xl font-bold mb-2">Need Help Finding the Right Product?</h2>
            <p className="text-bahola-neutral-700 mb-4">
              With hundreds of homeopathic remedies available, finding the right one for your specific
              health concern can be challenging. Let our experts guide you to the perfect solution.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button 
                className="bg-bahola-blue-500 hover:bg-bahola-blue-600 text-white"
              >
                Contact Our Experts
              </Button>
              <Button 
                variant="outline"
                className="border-bahola-blue-400 text-bahola-blue-500 hover:bg-bahola-blue-50"
              >
                Take Our Remedy Finder Quiz
              </Button>
            </div>
          </div>
          <div className="md:w-1/3">
            <img 
              src="/placeholder.svg" 
              alt="Homeopathic consultation" 
              className="rounded-lg"
            />
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default CategoryOverview;
