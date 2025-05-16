
import { PageLayout } from '@/components/PageLayout';
import { ProtectedDoctorRoute } from '@/components/auth/ProtectedDoctorRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const MateriaMedica = () => {
  return (
    <ProtectedDoctorRoute>
      <PageLayout 
        title="Comparative Materia Medica" 
        description="Access detailed comparative studies of homeopathic remedies"
      >
        <div className="max-w-6xl mx-auto mb-10">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-bahola-blue-800">Materia Medica Resources</h2>
            
            <Tabs defaultValue="comparative">
              <TabsList className="mb-6">
                <TabsTrigger value="comparative">Comparative Studies</TabsTrigger>
                <TabsTrigger value="remedies">Remedy Database</TabsTrigger>
                <TabsTrigger value="research">Research Papers</TabsTrigger>
              </TabsList>
              
              <TabsContent value="comparative">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Mental Symptoms Comparison</CardTitle>
                      <CardDescription>Detailed analysis of mental symptoms across similar remedies</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Access our comprehensive guide comparing mental symptoms across major remedies including Natrum Muriaticum, Pulsatilla, and Phosphorus.</p>
                      <a href="#" className="text-bahola-blue-500 font-medium mt-4 inline-block">Access Resource →</a>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Polycrest Remedies</CardTitle>
                      <CardDescription>Comparative study of the most commonly used remedies</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Explore similarities and differences between major polycrest remedies and their clinical applications across various pathologies.</p>
                      <a href="#" className="text-bahola-blue-500 font-medium mt-4 inline-block">Access Resource →</a>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Respiratory Affections</CardTitle>
                      <CardDescription>Comparing remedies for respiratory conditions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>In-depth analysis of remedies indicated for respiratory conditions, with comparative symptomatology and clinical indications.</p>
                      <a href="#" className="text-bahola-blue-500 font-medium mt-4 inline-block">Access Resource →</a>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Constitutional Types</CardTitle>
                      <CardDescription>Comparative study of constitutional remedies</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Detailed comparison of the major constitutional types in homeopathy and their characteristic presentations and tendencies.</p>
                      <a href="#" className="text-bahola-blue-500 font-medium mt-4 inline-block">Access Resource →</a>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="remedies">
                <p className="text-lg mb-6">Our comprehensive remedy database is currently being updated with the latest research. Please check back soon.</p>
              </TabsContent>
              
              <TabsContent value="research">
                <p className="text-lg mb-6">Recent research papers and publications related to Materia Medica will be available here soon.</p>
              </TabsContent>
            </Tabs>
            
            <div className="mt-10 p-4 bg-bahola-blue-50 rounded-lg">
              <h3 className="font-medium mb-2">Professional Note</h3>
              <p>These resources are exclusively available to registered healthcare professionals. For access to additional clinical resources, please contact our professional services team.</p>
            </div>
          </div>
        </div>
      </PageLayout>
    </ProtectedDoctorRoute>
  );
};

export default MateriaMedica;
