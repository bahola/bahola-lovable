import { PageLayout } from '@/components/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const LachesisPulsatilla = () => {
  return (
    <PageLayout
      title="🐍 Lachesis mutus vs Pulsatilla nigricans" 
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
            <CardTitle>🌿 Family Comparison: Loganiaceae vs Ranunculaceae</CardTitle>
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
                    <TableCell className="font-medium">Loganiaceae (Strychnos family)</TableCell>
                    <TableCell>Lachesis mutus</TableCell>
                    <TableCell>Acts on nervous and circulatory systems producing intense excitation, left-sidedness, and congestion. Suddenness, heat, and loquacity characterize the family.</TableCell>
                    <TableCell>Circulation, female reproductive organs, nervous system, throat.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Ranunculaceae (Buttercup family)</TableCell>
                    <TableCell>Pulsatilla nigricans</TableCell>
                    <TableCell>Produces emotional sensitivity, mildness, changeable symptoms, and catarrhal conditions. Acts especially on mucous membranes and venous system.</TableCell>
                    <TableCell>Respiratory, digestive, and reproductive systems, emotions.</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="font-medium mb-2">🌱 Family Insight:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Loganiaceae remedies show sudden, intense, and congestive states with strong nervous involvement.</li>
                <li>Ranunculaceae remedies show gentle, fluctuating, and reactive emotional and physical expressions.</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Main Comparison */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>🩺 Comparative Materia Medica: Lachesis mutus vs Pulsatilla nigricans</CardTitle>
            <p className="text-muted-foreground mt-2">
              <strong>Common Sphere:</strong> Female disorders (menses, menopause), circulatory and emotional disturbances, headaches, throat conditions.
            </p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold w-1/4">Feature</TableHead>
                    <TableHead className="font-semibold w-3/8">Lachesis mutus</TableHead>
                    <TableHead className="font-semibold w-3/8">Pulsatilla nigricans</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Constitution / Temperament</TableCell>
                    <TableCell>Dark, thin, nervous, hot-blooded, loquacious, and jealous. Often left-sided complaints.</TableCell>
                    <TableCell>Fair, plump, gentle, mild, tearful; suited to timid, affectionate individuals.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Mind / Emotion</TableCell>
                    <TableCell>Jealous, suspicious, talkative, passionate; cannot bear contradiction. Worse after sleep.</TableCell>
                    <TableCell>Mild, yielding, dependent; weeps easily, seeks sympathy and comfort.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Modalities (Aggravations / Ameliorations)</TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div>🔺 <strong>Aggravation:</strong> after sleep, heat, tight clothing, left side, during menses, morning.</div>
                        <div>🔻 <strong>Amelioration:</strong> discharge of blood or secretions, open air, warmth.</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div>🔺 <strong>Aggravation:</strong> heat, closed rooms, rich food, evening, before menses.</div>
                        <div>🔻 <strong>Amelioration:</strong> cool fresh air, gentle motion, sympathy.</div>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Key Physical Symptoms</TableCell>
                    <TableCell>Flushes of heat, hot flashes with perspiration; intolerance to constriction (esp. around neck). Left-sided sore throat or ovarian pain. Menses too short and scanty but frequent.</TableCell>
                    <TableCell>Menses delayed, changeable, variable flow; cramping pain before and during menses. Leucorrhoea thick, bland, yellow-green.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Circulatory & Thermal State</TableCell>
                    <TableCell>Always hot; desires cool air but sensitive to it. Left-sided congestions.</TableCell>
                    <TableCell>Chilly yet dislikes heat; feels better in cool air.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Gastrointestinal / Sleep</TableCell>
                    <TableCell>Desires alcohol; aggravation after sleep ("sleeps into aggravation"). Constipation with frequent urging but small stools.</TableCell>
                    <TableCell>Thirstless, aversion to fat, flatulence after rich food. Sleep disturbed by vivid dreams; tearful on waking.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Skin / Generalities</TableCell>
                    <TableCell>Purple, congested skin; tendency to hemorrhages and varicosities.</TableCell>
                    <TableCell>Pale, soft, cool, slow circulation.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Clinical Focus</TableCell>
                    <TableCell>Menopausal flushes, hot left ovary, hypertension, jealousy, throat constriction, septic conditions.</TableCell>
                    <TableCell>Delayed menses, hormonal headaches, emotional dependency, catarrhal states.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Differentiating Clincher</TableCell>
                    <TableCell className="bg-primary/5">Hot, loquacious, jealous; left-sided; worse after sleep.</TableCell>
                    <TableCell className="bg-primary/5">Mild, tearful, dependent; changeable; better in cool air.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Complementary / Inimical Remedies</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div><strong>Complementary:</strong> Lycopodium, Sulphur.</div>
                        <div><strong>Inimical:</strong> Nux vomica, Pulsatilla.</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div><strong>Complementary:</strong> Silicea, Sulphur.</div>
                        <div><strong>Inimical:</strong> Lachesis, Ferrum.</div>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Biochemic Complement</TableCell>
                    <TableCell>Kali mur 6X (for congestive and throat conditions)</TableCell>
                    <TableCell>Calcarea phos 6X (for delayed or irregular menses)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="mt-6 p-4 bg-primary/5 rounded-lg">
              <p className="font-medium">💡 Clinical Tip:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>When the patient is hot, talkative, suspicious, and worse after sleep → think <strong>Lachesis</strong>.</li>
                <li>When the patient is soft, weepy, gentle, and better in cool open air → think <strong>Pulsatilla</strong>.</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Trio Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>⚖️ Trio Comparison: Lachesis – Pulsatilla – Lycopodium</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">Feature</TableHead>
                    <TableHead className="font-semibold">Lachesis mutus</TableHead>
                    <TableHead className="font-semibold">Pulsatilla nigricans</TableHead>
                    <TableHead className="font-semibold">Lycopodium clavatum</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Emotional Tone</TableCell>
                    <TableCell>Intense, jealous, passionate</TableCell>
                    <TableCell>Mild, affectionate, yielding</TableCell>
                    <TableCell>Proud, anxious, anticipatory</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Laterality</TableCell>
                    <TableCell>Left-sided → right</TableCell>
                    <TableCell>Changeable</TableCell>
                    <TableCell>Right-sided → left</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Thermal State</TableCell>
                    <TableCell>Hot; cannot bear heat</TableCell>
                    <TableCell>Chilly; seeks cool air</TableCell>
                    <TableCell>Chilly feet, hot head</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Menses / Female Health</TableCell>
                    <TableCell>Early, short, hot flushes, worse during</TableCell>
                    <TableCell>Delayed, changeable, scanty, better cool air</TableCell>
                    <TableCell>Late menses, weak digestion, gas, right ovarian pain</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Digestive Traits</TableCell>
                    <TableCell>Craves alcohol, sharp pains, fullness</TableCell>
                    <TableCell>Aversion to fatty food, thirstless</TableCell>
                    <TableCell>Craving sweets, bloated after meals</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Mind / Emotion</TableCell>
                    <TableCell>Loquacious, jealous, suspicious</TableCell>
                    <TableCell>Weepy, needs sympathy</TableCell>
                    <TableCell>Bossy at home, timid outside</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Modalities</TableCell>
                    <TableCell>Worse after sleep, heat, pressure</TableCell>
                    <TableCell>Worse evening, fatty food</TableCell>
                    <TableCell>Worse 4–8 p.m., pressure of clothing</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Clinical Essence</TableCell>
                    <TableCell>Hot, talkative, congestive, worse after sleep</TableCell>
                    <TableCell>Mild, changeable, tearful, better fresh air</TableCell>
                    <TableCell>Confident facade, digestive weakness, lack of self-trust</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="font-medium mb-2">🧩 Triad Tip:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li><strong>Lachesis</strong> — hot, intense, worse after sleep.</li>
                <li><strong>Pulsatilla</strong> — cool, mild, changeable, better in open air.</li>
                <li><strong>Lycopodium</strong> — analytical, right-sided, digestive complaints.</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default LachesisPulsatilla;
