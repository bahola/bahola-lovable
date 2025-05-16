
import { PageLayout } from '@/components/PageLayout';
import { ProtectedDoctorRoute } from '@/components/auth/ProtectedDoctorRoute';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { useState } from 'react';

const remedies = [
  {
    name: "Arnica Montana",
    source: "Plant - Leopard's Bane",
    category: "Trauma remedy",
    potencies: "3X to 1M",
    indications: "Trauma, bruising, soreness, post-surgical recovery",
    keyCharacteristics: "\"Feels well\" even when injured; fear of being touched; bruised, sore feeling"
  },
  {
    name: "Belladonna",
    source: "Plant - Deadly Nightshade",
    category: "Acute inflammatory conditions",
    potencies: "6C to 200C",
    indications: "Sudden high fever, throbbing headaches, redness and heat",
    keyCharacteristics: "Sudden onset; intense symptoms; redness, heat, burning; dilated pupils"
  },
  {
    name: "Nux Vomica",
    source: "Plant - Poison Nut",
    category: "Digestive and nervous system remedy",
    potencies: "6C to 30C",
    indications: "Digestive upsets, hangover, irritability, hypersensitivity",
    keyCharacteristics: "Irritable, impatient; chilly; oversensitive; digestive disturbances; type A personality"
  }
];

const RemedyDeepDive = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRemedy, setSelectedRemedy] = useState<typeof remedies[0] | null>(null);

  const filteredRemedies = remedies.filter(remedy => 
    remedy.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ProtectedDoctorRoute>
      <PageLayout 
        title="Deep Dive into Remedies" 
        description="Explore in-depth analysis of specific homeopathic remedies"
      >
        <div className="max-w-6xl mx-auto mb-10">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-bahola-blue-800">Remedy Research Tool</h2>
            
            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bahola-neutral-400" />
                <Input 
                  type="text"
                  placeholder="Search remedies by name..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <h3 className="font-semibold mb-4 text-lg">Remedy List</h3>
                <div className="space-y-2">
                  {filteredRemedies.length > 0 ? (
                    filteredRemedies.map((remedy) => (
                      <Button 
                        key={remedy.name}
                        variant={selectedRemedy?.name === remedy.name ? "default" : "outline"} 
                        className="w-full justify-start"
                        onClick={() => setSelectedRemedy(remedy)}
                      >
                        {remedy.name}
                      </Button>
                    ))
                  ) : (
                    <p className="text-bahola-neutral-500 italic">No remedies found matching "{searchTerm}"</p>
                  )}
                </div>
              </div>
              
              <div className="md:col-span-2">
                {selectedRemedy ? (
                  <div className="border rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-2 text-bahola-blue-700">{selectedRemedy.name}</h2>
                    <p className="text-bahola-neutral-600 mb-6">Source: {selectedRemedy.source}</p>
                    
                    <Tabs defaultValue="overview">
                      <TabsList className="mb-4">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="indications">Clinical Indications</TabsTrigger>
                        <TabsTrigger value="materia">Materia Medica</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="overview" className="space-y-4">
                        <div>
                          <h3 className="font-semibold">Category</h3>
                          <p>{selectedRemedy.category}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold">Common Potencies</h3>
                          <p>{selectedRemedy.potencies}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold">Key Indications</h3>
                          <p>{selectedRemedy.indications}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold">Key Characteristics</h3>
                          <p>{selectedRemedy.keyCharacteristics}</p>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="indications">
                        <p className="italic text-bahola-neutral-500">
                          Detailed clinical indications for {selectedRemedy.name} are available in the 
                          professional version of this database. Please contact our professional 
                          services team for access.
                        </p>
                      </TabsContent>
                      
                      <TabsContent value="materia">
                        <p className="italic text-bahola-neutral-500">
                          Complete Materia Medica for {selectedRemedy.name} is available in the 
                          professional version of this database. Please contact our professional 
                          services team for access.
                        </p>
                      </TabsContent>
                    </Tabs>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full border rounded-lg p-10">
                    <div className="text-center text-bahola-neutral-500">
                      <p className="mb-2">Select a remedy from the list to view details</p>
                      <p className="text-sm">or search for a specific remedy</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-10 p-4 bg-bahola-blue-50 rounded-lg">
              <h3 className="font-medium mb-2">Professional Note</h3>
              <p>This is a limited preview of our remedy database. Healthcare professionals have access to our complete database with detailed remedy relationships, cases, and research.</p>
            </div>
          </div>
        </div>
      </PageLayout>
    </ProtectedDoctorRoute>
  );
};

export default RemedyDeepDive;
