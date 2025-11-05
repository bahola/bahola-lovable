import { PageLayout } from '@/components/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const NuxVomicaSulphur = () => {
  return (
    <PageLayout
      title="🔥 Nux vomica vs Sulphur" 
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
            <CardTitle>🌿 Family Comparison: Loganiaceae vs Elemental Group (Sulphur Series)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">Family / Group</TableHead>
                    <TableHead className="font-semibold">Representative Remedy</TableHead>
                    <TableHead className="font-semibold">Core Traits</TableHead>
                    <TableHead className="font-semibold">Typical Sphere of Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Loganiaceae (Strychnos family)</TableCell>
                    <TableCell>Nux vomica</TableCell>
                    <TableCell>Acts on nervous system, digestive tract, and liver. Produces irritability, oversensitivity, spasmodic reactions, and gastric disorders.</TableCell>
                    <TableCell>Digestive system, liver, spine, nerves.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Elemental Group (Sulphur, Phosphorus, etc.)</TableCell>
                    <TableCell>Sulphur</TableCell>
                    <TableCell>Acts deeply on metabolism, skin, circulation, and glandular activity. Produces heat, burning, uncleanliness, and philosophic indifference.</TableCell>
                    <TableCell>Skin, mucous membranes, circulation, digestion, intellect.</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="font-medium mb-2">🌱 Family Insight:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Loganiaceae expresses nervous irritability and overdrive — "action and reaction."</li>
                <li>Elemental remedies like Sulphur show sluggish reaction, heat, and internal burning — "philosophy and inertia."</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Main Comparison */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>🩺 Comparative Materia Medica: Nux vomica vs Sulphur</CardTitle>
            <p className="text-muted-foreground mt-2">
              <strong>Common Sphere:</strong> Digestive and hepatic disorders, chronic constipation, gastric acidity, headaches from overwork, early stages of chronic disease.
            </p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold w-1/4">Feature</TableHead>
                    <TableHead className="font-semibold w-3/8">Nux vomica</TableHead>
                    <TableHead className="font-semibold w-3/8">Sulphur</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Constitution / Temperament</TableCell>
                    <TableCell>Nervous, active, ambitious, thin, dark-haired, intense, quick to act and react. Type-A personality.</TableCell>
                    <TableCell>Lazy philosopher; lean or stooped, untidy, warm-blooded, burning sensations.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Mind / Emotion</TableCell>
                    <TableCell>Irritable, oversensitive, fault-finding, easily offended, wants perfection. Overworked, over-stimulated.</TableCell>
                    <TableCell>Egotistic, theorizing, indolent but intellectual. Neglects appearance. Indifferent to surroundings.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Modalities (Aggravations / Ameliorations)</TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div>🔺 <strong>Aggravation:</strong> morning, after eating, mental strain, stimulants, cold air, anger.</div>
                        <div>🔻 <strong>Amelioration:</strong> warmth, rest, evening nap, after stool.</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div>🔺 <strong>Aggravation:</strong> standing long, washing, warmth of bed, early morning (5 a.m.), bathing.</div>
                        <div>🔻 <strong>Amelioration:</strong> open air, motion, cool environment.</div>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Key Physical Symptoms</TableCell>
                    <TableCell>Digestive disturbances from overeating, alcohol, coffee, or stimulants. Ineffectual urging for stool; feels better after passing small quantities. Spasmodic cough or cramps.</TableCell>
                    <TableCell>Burning sensations: palms, soles, vertex of head, anus. Offensive discharges. Hunger at 11 a.m. Unwashed, unkempt skin.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Gastrointestinal / Hepatic</TableCell>
                    <TableCell>Constipation with frequent urging; nausea after meals. Hyperacidity, gastritis, liver congestion from stimulants or late nights.</TableCell>
                    <TableCell>Sluggish liver, piles with burning, morning diarrhoea driving from bed. Craving sweets, spicy food; aversion to bathing.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Sleep / Dreams</TableCell>
                    <TableCell>Sleep disturbed by mental activity; wakes 3–4 a.m. thinking of work.</TableCell>
                    <TableCell>Sleeps late, unrefreshing sleep, dreams of fires or philosophical themes.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Skin / Appearance</TableCell>
                    <TableCell>Tense, dry, yellowish skin; sharp features.</TableCell>
                    <TableCell>Dirty, unhealthy skin; boils, eruptions, burning itching worse warmth.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Clinical Focus</TableCell>
                    <TableCell>Acute digestive disorders, overwork, nervous dyspepsia, hepatic congestion.</TableCell>
                    <TableCell>Chronic dyspepsia, skin eruptions, piles, constitutional sluggishness, psoric states.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Differentiating Clincher</TableCell>
                    <TableCell className="bg-primary/5">Driven, efficient, tense, oversensitive; acute phase of disease.</TableCell>
                    <TableCell className="bg-primary/5">Sluggish, lazy, unclean philosopher; chronic phase of disease.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Complementary / Inimical Remedies</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div><strong>Complementary:</strong> Sulphur, Sepia.</div>
                        <div><strong>Inimical:</strong> Coffea, Zincum.</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div><strong>Complementary:</strong> Nux vomica, Calcarea, Lycopodium.</div>
                        <div><strong>Inimical:</strong> Mercurius.</div>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Biochemic Complement</TableCell>
                    <TableCell>Mag phos 6X (for spasms and acidity)</TableCell>
                    <TableCell>Nat phos 6X (for acidity and sluggish metabolism)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="mt-6 p-4 bg-primary/5 rounded-lg">
              <p className="font-medium">💡 Clinical Tip:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Think <strong>Nux vomica</strong> when the patient is tense, driven, and acutely dyspeptic.</li>
                <li>Think <strong>Sulphur</strong> when the patient is lazy, hot, and chronically dyspeptic with burning and offensive discharges.</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Trio Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>⚖️ Trio Comparison: Nux vomica – Sulphur – Lycopodium</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">Feature</TableHead>
                    <TableHead className="font-semibold">Nux vomica</TableHead>
                    <TableHead className="font-semibold">Sulphur</TableHead>
                    <TableHead className="font-semibold">Lycopodium clavatum</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Personality Type</TableCell>
                    <TableCell>Irritable worker, overdriven, exacting</TableCell>
                    <TableCell>Lazy philosopher, theorist, egotist</TableCell>
                    <TableCell>Cautious intellect, anticipatory anxiety, lacks confidence</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Thermal State</TableCell>
                    <TableCell>Chilly, wants warmth</TableCell>
                    <TableCell>Hot, burning, aversion to heat</TableCell>
                    <TableCell>Chilly feet, hot head</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Digestive Pattern</TableCell>
                    <TableCell>Acute gastric irritability; constipation with ineffectual urging</TableCell>
                    <TableCell>Chronic sluggishness; early morning diarrhoea</TableCell>
                    <TableCell>Slow digestion, flatulence, bloating after small meals</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Mind / Emotion</TableCell>
                    <TableCell>Irritable, hasty, intolerant</TableCell>
                    <TableCell>Independent, careless, proud</TableCell>
                    <TableCell>Dominating at home, timid outside, fears failure</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Modalities</TableCell>
                    <TableCell>Worse morning, stimulants, cold air</TableCell>
                    <TableCell>Worse heat, bathing, standing long</TableCell>
                    <TableCell>Worse 4–8 p.m., right to left complaints</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Physical Keynotes</TableCell>
                    <TableCell>Ineffectual urging, oversensitive to noise, light, odors</TableCell>
                    <TableCell>Burning in soles, vertex, anus; offensive sweat</TableCell>
                    <TableCell>Right-sided complaints, craving sweets, distension</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Clinical Essence</TableCell>
                    <TableCell>Acute, congestive, overactive phase</TableCell>
                    <TableCell>Chronic, sluggish, psoric phase</TableCell>
                    <TableCell>Intermediate, digestive and hepatic bridge remedy</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="font-medium mb-2">🧩 Triad Tip:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li><strong>Nux vomica</strong> — acute reaction, overstimulation.</li>
                <li><strong>Sulphur</strong> — chronic psoric, heat and neglect.</li>
                <li><strong>Lycopodium</strong> — bridge between both; chronic digestive atonicity with confidence issues.</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default NuxVomicaSulphur;
