
import { PageLayout } from '@/components/PageLayout';
import { ProtectedDoctorRoute } from '@/components/auth/ProtectedDoctorRoute';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Clock, Tag } from 'lucide-react';

const CaseStudies = () => {
  return (
    <ProtectedDoctorRoute>
      <PageLayout 
        title="Case Studies" 
        description="Review real-world clinical cases and treatment approaches"
      >
        <div className="max-w-6xl mx-auto mb-10">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-bahola-blue-800">Clinical Case Studies</h2>
            
            <Tabs defaultValue="featured">
              <div className="flex justify-between items-center mb-6">
                <TabsList>
                  <TabsTrigger value="featured">Featured</TabsTrigger>
                  <TabsTrigger value="recent">Recent</TabsTrigger>
                  <TabsTrigger value="popular">Most Viewed</TabsTrigger>
                  <TabsTrigger value="categories">Categories</TabsTrigger>
                </TabsList>
                
                <div className="hidden md:block">
                  <Button variant="outline">Submit Your Case</Button>
                </div>
              </div>
              
              <TabsContent value="featured">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <Badge className="mb-2">Pediatrics</Badge>
                        <div className="flex items-center text-sm text-bahola-neutral-500">
                          <Clock size={14} className="mr-1" /> 15 min read
                        </div>
                      </div>
                      <CardTitle>Constitutional Treatment of Recurrent Ear Infections</CardTitle>
                      <CardDescription>A case study of a 4-year-old with recurring otitis media</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">This case examines the constitutional approach to a child suffering from recurrent ear infections despite multiple courses of antibiotics.</p>
                      <div className="flex gap-2 mb-4">
                        <Badge variant="outline">Calcarea Carbonica</Badge>
                        <Badge variant="outline">Pulsatilla</Badge>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button className="flex items-center">
                        <FileText size={16} className="mr-2" /> Read Full Case
                      </Button>
                      <div className="text-sm text-bahola-neutral-500">By Dr. Sarah Johnson</div>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <Badge className="mb-2">Dermatology</Badge>
                        <div className="flex items-center text-sm text-bahola-neutral-500">
                          <Clock size={14} className="mr-1" /> 12 min read
                        </div>
                      </div>
                      <CardTitle>Chronic Eczema and Its Miasmatic Background</CardTitle>
                      <CardDescription>Long-standing case of atopic dermatitis with constitutional approach</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">Exploring the deep-seated miasmatic factors in a 35-year-old patient with treatment-resistant eczema and its relation to emotional trauma.</p>
                      <div className="flex gap-2 mb-4">
                        <Badge variant="outline">Sulphur</Badge>
                        <Badge variant="outline">Arsenicum Album</Badge>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button className="flex items-center">
                        <FileText size={16} className="mr-2" /> Read Full Case
                      </Button>
                      <div className="text-sm text-bahola-neutral-500">By Dr. Michael Chen</div>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <Badge className="mb-2">Mental Health</Badge>
                        <div className="flex items-center text-sm text-bahola-neutral-500">
                          <Clock size={14} className="mr-1" /> 20 min read
                        </div>
                      </div>
                      <CardTitle>Anxiety and Depression: A Homeopathic Approach</CardTitle>
                      <CardDescription>Case study of anxiety with depressive features and its resolution</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">This case follows a 28-year-old patient with generalized anxiety disorder and depressive episodes, tracking their progress over a one-year treatment period.</p>
                      <div className="flex gap-2 mb-4">
                        <Badge variant="outline">Natrum Muriaticum</Badge>
                        <Badge variant="outline">Aurum Metallicum</Badge>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button className="flex items-center">
                        <FileText size={16} className="mr-2" /> Read Full Case
                      </Button>
                      <div className="text-sm text-bahola-neutral-500">By Dr. Emily Rodriguez</div>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <Badge className="mb-2">Gastroenterology</Badge>
                        <div className="flex items-center text-sm text-bahola-neutral-500">
                          <Clock size={14} className="mr-1" /> 10 min read
                        </div>
                      </div>
                      <CardTitle>IBS Treatment: Beyond Symptomatic Relief</CardTitle>
                      <CardDescription>Holistic management of irritable bowel syndrome</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">A complex case of IBS with alternating constipation and diarrhea, highlighting the importance of addressing emotional and mental aspects alongside physical symptoms.</p>
                      <div className="flex gap-2 mb-4">
                        <Badge variant="outline">Lycopodium</Badge>
                        <Badge variant="outline">Nux Vomica</Badge>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button className="flex items-center">
                        <FileText size={16} className="mr-2" /> Read Full Case
                      </Button>
                      <div className="text-sm text-bahola-neutral-500">By Dr. Robert Patel</div>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="recent">
                <p className="text-center text-lg text-bahola-neutral-500 py-10">
                  Recently published case studies will appear here. Check back soon for updates.
                </p>
              </TabsContent>
              
              <TabsContent value="popular">
                <p className="text-center text-lg text-bahola-neutral-500 py-10">
                  Most viewed case studies will appear here. Check back soon for updates.
                </p>
              </TabsContent>
              
              <TabsContent value="categories">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {['Pediatrics', 'Dermatology', 'Mental Health', 'Gastroenterology', 
                    'Rheumatology', 'Respiratory', 'Gynecology', 'Neurology',
                    'Cardiology', 'Endocrinology', 'Geriatrics', 'Oncology'].map((category) => (
                    <Button key={category} variant="outline" className="h-auto py-6 flex flex-col gap-2">
                      <Tag className="h-5 w-5" />
                      <span>{category}</span>
                    </Button>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="mt-10 p-4 bg-bahola-blue-50 rounded-lg">
              <h3 className="font-medium mb-2">Professional Note</h3>
              <p>These case studies are provided for educational purposes only. They represent real clinical scenarios but patient details have been anonymized to protect privacy.</p>
            </div>
            
            <div className="mt-6 text-center block md:hidden">
              <Button variant="outline">Submit Your Case</Button>
            </div>
          </div>
        </div>
      </PageLayout>
    </ProtectedDoctorRoute>
  );
};

export default CaseStudies;
