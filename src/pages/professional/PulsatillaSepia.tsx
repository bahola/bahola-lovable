import { PageLayout } from '@/components/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PulsatillaSepia = () => {
  return (
    <PageLayout
      title="🌸 Pulsatilla vs Sepia" 
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
            <CardTitle>🌿 Family Comparison: Ranunculaceae vs Solanaceae</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">Botanical Family</TableHead>
                    <TableHead className="font-semibold">Representative Remedy</TableHead>
                    <TableHead className="font-semibold">Core Traits</TableHead>
                    <TableHead className="font-semibold">Typical Sphere of Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Ranunculaceae (Buttercup family)</TableCell>
                    <TableCell>Pulsatilla nigricans</TableCell>
                    <TableCell>Acts on mucous membranes; produces changeable, mild, tearful states and catarrhal tendencies. Emotional and hormonal instability are keynotes.</TableCell>
                    <TableCell>Respiratory tract, genito-urinary organs, digestion, and mind.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Solanaceae (Nightshade family)</TableCell>
                    <TableCell>Sepia officinalis (Note: chemically related to Solanaceae alkaloids in action, though zoological origin is Cuttlefish Ink—functional analogy applies.)</TableCell>
                    <TableCell>Acts deeply on female pelvic organs, liver, and circulation; produces venous stasis, indifference, irritability, and hormonal dysregulation.</TableCell>
                    <TableCell>Female reproductive system, liver, portal circulation, mental-emotional sphere.</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="font-medium mb-2">🌱 Family Insight:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Ranunculaceae remedies like Pulsatilla express sensitivity, changeability, and mildness.</li>
                <li>Solanaceae-type remedies like Sepia express intensity, congestion, and withdrawal.</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Main Comparison */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>🩺 Comparative Materia Medica: Pulsatilla nigricans vs Sepia officinalis</CardTitle>
            <p className="text-muted-foreground mt-2">
              <strong>Common Sphere:</strong> Female hormonal disorders, menstrual irregularities, digestive disturbances, headaches, and emotional lability.
            </p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold w-1/4">Feature</TableHead>
                    <TableHead className="font-semibold w-3/8">Pulsatilla nigricans</TableHead>
                    <TableHead className="font-semibold w-3/8">Sepia officinalis</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Constitution / Temperament</TableCell>
                    <TableCell>Mild, yielding, fair-haired, blue-eyed, gentle, timid, affectionate; often suited to soft, tearful, emotional women or children.</TableCell>
                    <TableCell>Indifferent, irritable, dark-haired, sallow complexion, lean; suited to exhausted mothers, worn out by childbearing or cares.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Mind / Emotion</TableCell>
                    <TableCell>Weeps easily, seeks consolation, feels better when comforted; fears abandonment. Changeable moods.</TableCell>
                    <TableCell>Indifferent to loved ones, aversion to husband and children, irritability with indifference. Needs solitude and exercise.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Modalities (Aggravations / Ameliorations)</TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div>🔺 <strong>Aggravation:</strong> heat, rich food, closed rooms, before menses, evening.</div>
                        <div>🔻 <strong>Amelioration:</strong> cool fresh air, gentle motion, consolation, open windows.</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div>🔺 <strong>Aggravation:</strong> cold air, early morning, before menses, during rest, after exertion.</div>
                        <div>🔻 <strong>Amelioration:</strong> vigorous exercise, warmth, after discharge appears.</div>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Key Physical Symptoms</TableCell>
                    <TableCell>Menses delayed, scanty, changeable; flows one day, stops the next. Thick, bland, yellow-green leucorrhoea. Thirstless, prefers cold foods.</TableCell>
                    <TableCell>Menses irregular, often early and scanty. Bearing-down sensation as if everything would fall out. Yellowish, excoriating leucorrhoea. Aversion to sex.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Gastrointestinal / Circulation</TableCell>
                    <TableCell>Flatulence after fatty food, no thirst. Digestive sluggishness with mild nausea.</TableCell>
                    <TableCell>Stasis in portal circulation, venous congestion, constipation with sense of weight in rectum.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Sleep / Dreams</TableCell>
                    <TableCell>Sleepy in evening, disturbed dreams, restless before menses.</TableCell>
                    <TableCell>Sleep unrefreshing, wakes tired. Dreams of danger, anxiety, sexual themes.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Skin / Appearance</TableCell>
                    <TableCell>Pale, fair, gentle expression, prefers cool air, dislikes fatty food.</TableCell>
                    <TableCell>Sallow, earthy complexion, dark circles, dry skin, yellow blotches, hair loss.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Clinical Focus</TableCell>
                    <TableCell>Amenorrhoea, dysmenorrhoea, hormonal headaches, catarrhal troubles, emotional dependency.</TableCell>
                    <TableCell>Pelvic congestion, prolapse, menopause syndrome, postpartum depression, venous stasis.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Differentiating Clincher</TableCell>
                    <TableCell className="bg-primary/5">Mild, yielding, emotional; symptoms ever-changing. Craves sympathy.</TableCell>
                    <TableCell className="bg-primary/5">Indifferent, worn out, irritable; craves solitude and motion.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Complementary / Inimical Remedies</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div><strong>Complementary:</strong> Silicea, Sulphur.</div>
                        <div><strong>Inimical:</strong> Ferrum, Sepia.</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div><strong>Complementary:</strong> Natrum mur, Lachesis.</div>
                        <div><strong>Inimical:</strong> Pulsatilla.</div>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Biochemic Complement</TableCell>
                    <TableCell>Calcarea phos 6X (for delayed menses)</TableCell>
                    <TableCell>Kali mur 6X (for congestive pelvic conditions)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="mt-6 p-4 bg-primary/5 rounded-lg">
              <p className="font-medium">💡 Clinical Tip:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>When the patient weeps and feels better from sympathy and fresh air, think <strong>Pulsatilla</strong>.</li>
                <li>When she is irritable, indifferent to loved ones, and feels better from vigorous exercise, think <strong>Sepia</strong>.</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Trio Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>⚖️ Trio Comparison: Pulsatilla – Sepia – Natrum muriaticum</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">Feature</TableHead>
                    <TableHead className="font-semibold">Pulsatilla nigricans</TableHead>
                    <TableHead className="font-semibold">Sepia officinalis</TableHead>
                    <TableHead className="font-semibold">Natrum muriaticum</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Emotional Tone</TableCell>
                    <TableCell>Mild, tearful, changeable; seeks consolation</TableCell>
                    <TableCell>Indifferent, irritable, withdrawn</TableCell>
                    <TableCell>Reserved, grief-holding, avoids consolation</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Menses</TableCell>
                    <TableCell>Changeable, delayed, scanty, better in open air</TableCell>
                    <TableCell>Early, scanty, painful, with bearing-down</TableCell>
                    <TableCell>Irregular, painful, suppressed after grief</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Mental Picture</TableCell>
                    <TableCell>Clingy, affectionate, fears abandonment</TableCell>
                    <TableCell>Detached, exhausted, avoids emotional contact</TableCell>
                    <TableCell>Dignified, introverted, dwells on past hurt</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Modalities</TableCell>
                    <TableCell>Worse heat; better open air, motion</TableCell>
                    <TableCell>Worse cold, morning; better vigorous motion</TableCell>
                    <TableCell>Worse sun, heat, sympathy; better solitude</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Physical Keynotes</TableCell>
                    <TableCell>Bland yellow leucorrhoea, no thirst</TableCell>
                    <TableCell>Yellow-green, excoriating leucorrhoea, bearing down</TableCell>
                    <TableCell>Watery discharge, cracked lips, dry mucosa</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">General Appearance</TableCell>
                    <TableCell>Fair, plump, gentle</TableCell>
                    <TableCell>Sallow, lean, tired</TableCell>
                    <TableCell>Pale, anaemic, delicate</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="font-medium mb-2">🧩 Triad Tip:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li><strong>Pulsatilla</strong> — Emotionally dependent.</li>
                <li><strong>Sepia</strong> — Emotionally detached.</li>
                <li><strong>Natrum mur</strong> — Emotionally repressed.</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default PulsatillaSepia;
