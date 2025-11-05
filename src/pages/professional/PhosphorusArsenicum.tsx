import { PageLayout } from '@/components/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PhosphorusArsenicum = () => {
  return (
    <PageLayout
      title="✨ Phosphorus vs Arsenicum album" 
      description="Comprehensive comparative materia medica analysis"
    >
      <div className="max-w-7xl mx-auto mb-10">
        <Link 
          to="/professional/materia-medica" 
          className="inline-flex items-center gap-2 text-primary hover:underline mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Comparative Materia Medica
        </Link>

        {/* Family Comparison */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>🌿 Family Comparison: Phosphorus Group vs Arsenic Group</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">Family / Source</TableHead>
                    <TableHead className="font-semibold">Representative Remedy</TableHead>
                    <TableHead className="font-semibold">Core Traits</TableHead>
                    <TableHead className="font-semibold">Typical Sphere of Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Elemental / Organic Phosphorus Group</TableCell>
                    <TableCell>Phosphorus</TableCell>
                    <TableCell>Produces weakness, hemorrhagic tendency, open-hearted sympathy, burning pains relieved by cold. Quick exhaustion of vitality, impressionable to light, sound, and emotions.</TableCell>
                    <TableCell>Respiratory tract, nerves, circulation, blood, GI tract.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Mineral / Metallic Oxide Group</TableCell>
                    <TableCell>Arsenicum album</TableCell>
                    <TableCell>Produces extreme restlessness, anxiety, burning pains relieved by heat, and rapid prostration. Fastidious, fearful, and chilly.</TableCell>
                    <TableCell>Mucous membranes, GI tract, skin, kidneys, blood.</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="font-medium mb-2">🌱 Family Insight:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Phosphorus burns with emotional openness, sensitivity, and depletion.</li>
                <li>Arsenicum burns with anxiety, fear, and collapse.</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Main Comparison */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>🩺 Comparative Materia Medica: Phosphorus vs Arsenicum album</CardTitle>
            <p className="text-muted-foreground mt-2">
              <strong>Common Sphere:</strong> Respiratory infections, gastritis, exhaustion, anxiety states, and circulatory collapse.
            </p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold w-1/4">Feature</TableHead>
                    <TableHead className="font-semibold w-3/8">Phosphorus</TableHead>
                    <TableHead className="font-semibold w-3/8">Arsenicum album</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Constitution / Temperament</TableCell>
                    <TableCell>Tall, slender, nervous, open, artistic, impressionable; loves company and sympathy.</TableCell>
                    <TableCell>Lean, chilly, anxious, fastidious, restless; often prematurely aged appearance.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Mind / Emotion</TableCell>
                    <TableCell>Sympathetic, impressionable, fearful of being alone, weeps easily, open-hearted.</TableCell>
                    <TableCell>Anxious, fearful of death and disease, restless, fastidious about order and cleanliness.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Modalities (Aggravations / Ameliorations)</TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div>🔺 <strong>Aggravation:</strong> twilight, evening, thunderstorms, fasting, lying on left side.</div>
                        <div>🔻 <strong>Amelioration:</strong> cold food/drinks, sleep, company.</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div>🔺 <strong>Aggravation:</strong> midnight to 3 a.m., cold air, cold food/drinks, rest.</div>
                        <div>🔻 <strong>Amelioration:</strong> warmth, hot applications, company.</div>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Thermal State</TableCell>
                    <TableCell>Generally hot; desires cold drinks, ice-cold food.</TableCell>
                    <TableCell>Very chilly; craves heat and warm drinks.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Key Physical Symptoms</TableCell>
                    <TableCell>Burning pains better by cold; haemorrhagic tendency; great thirst for cold water but vomits when it becomes warm in stomach.</TableCell>
                    <TableCell>Burning pains better by heat; violent thirst for small, frequent sips; exhaustion after slightest effort.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Gastrointestinal / Hepatic</TableCell>
                    <TableCell>Nausea from smell of food, empty sinking in stomach at 11 a.m., vomiting of liquids as soon as swallowed.</TableCell>
                    <TableCell>Burning in stomach, unquenchable thirst, diarrhoea with anxiety and prostration after food or cold drinks.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Respiratory</TableCell>
                    <TableCell>Dry, tickling cough; blood-streaked sputum; hoarseness; pneumonia with oppression of chest, craving cold drinks.</TableCell>
                    <TableCell>Dyspnoea with great anxiety and restlessness; asthma at night; burning in chest better by heat.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Circulatory / Collapse</TableCell>
                    <TableCell>Rapid pulse, fainting from loss of fluids, haemorrhages bright red.</TableCell>
                    <TableCell>Small, thready pulse, extreme prostration, cold sweat.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Skin / Appearance</TableCell>
                    <TableCell>Pale, waxy, anemic look; bleeding tendency, slow healing.</TableCell>
                    <TableCell>Dry, parchment-like skin; ulcerations, gangrene, offensive discharges.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Clinical Focus</TableCell>
                    <TableCell>Hemorrhagic conditions, pneumonia, nervous exhaustion, emotional depletion.</TableCell>
                    <TableCell>Gastroenteritis, septic states, food poisoning, anxiety, restlessness, collapse.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Differentiating Clincher</TableCell>
                    <TableCell className="bg-primary/5">Burning pains better cold; affectionate and open; thirst for cold drinks.</TableCell>
                    <TableCell className="bg-primary/5">Burning pains better heat; anxious, restless, fastidious; thirst for frequent sips.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Complementary / Inimical Remedies</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div><strong>Complementary:</strong> Arsenicum, Allium cepa, Nat mur.</div>
                        <div><strong>Inimical:</strong> Causticum.</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div><strong>Complementary:</strong> Phosphorus, Carbo veg, China.</div>
                        <div><strong>Inimical:</strong> Lycopodium.</div>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Biochemic Complement</TableCell>
                    <TableCell>Ferrum phos 6X (for inflammation and oxygenation)</TableCell>
                    <TableCell>Kali phos 6X (for nervous exhaustion and anxiety)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="mt-6 p-4 bg-primary/5 rounded-lg">
              <p className="font-medium">💡 Clinical Tip:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>When burning pains are better by cold and the patient is open, affectionate, and thirsty for cold water → <strong>Phosphorus</strong>.</li>
                <li>When burning pains are better by heat and the patient is anxious, chilly, and restless → <strong>Arsenicum album</strong>.</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Trio Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>⚖️ Trio Comparison: Phosphorus – Arsenicum album – China officinalis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">Feature</TableHead>
                    <TableHead className="font-semibold">Phosphorus</TableHead>
                    <TableHead className="font-semibold">Arsenicum album</TableHead>
                    <TableHead className="font-semibold">China officinalis (Cinchona)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Core Theme</TableCell>
                    <TableCell>Sensitivity and depletion</TableCell>
                    <TableCell>Fear and restlessness</TableCell>
                    <TableCell>Exhaustion from fluid loss</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Type of Weakness</TableCell>
                    <TableCell>From emotional drain or illness</TableCell>
                    <TableCell>From anxiety, restlessness, burning</TableCell>
                    <TableCell>From haemorrhage, diarrhoea, fever</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Pains / Modalities</TableCell>
                    <TableCell>Burning better cold</TableCell>
                    <TableCell>Burning better heat</TableCell>
                    <TableCell>Weakness worse touch or motion</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Thirst</TableCell>
                    <TableCell>Large quantities of cold water</TableCell>
                    <TableCell>Small sips, frequent</TableCell>
                    <TableCell>Thirsty for cold but drinks little</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Mind / Emotion</TableCell>
                    <TableCell>Open, affectionate, fears alone</TableCell>
                    <TableCell>Fear of death, order-obsessed</TableCell>
                    <TableCell>Irritable, touchy, hypersensitive to pain</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Circulatory State</TableCell>
                    <TableCell>Active, bright red bleeding</TableCell>
                    <TableCell>Collapsed, cold, weak</TableCell>
                    <TableCell>Collapsed but pale, distended veins</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Clinical Essence</TableCell>
                    <TableCell>Bright, vital, sympathetic collapse</TableCell>
                    <TableCell>Chilly, anxious, fastidious collapse</TableCell>
                    <TableCell>Anemic, fluid-depleted collapse</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="font-medium mb-2">🧩 Triad Tip:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li><strong>Phosphorus</strong> — bright, warm, open-hearted exhaustion (better cold).</li>
                <li><strong>Arsenicum</strong> — anxious, chilly, restless exhaustion (better heat).</li>
                <li><strong>China</strong> — post-illness anaemic exhaustion (better warmth and rest).</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default PhosphorusArsenicum;
