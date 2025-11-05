import { PageLayout } from '@/components/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ApisCantharis = () => {
  return (
    <PageLayout
      title="🐝 Apis mellifica vs Cantharis vesicatoria" 
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
            <CardTitle>🌿 Family Comparison: Animal Venom vs Vegetable Resin Group</CardTitle>
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
                    <TableCell className="font-medium">Animal Origin (Bee venom)</TableCell>
                    <TableCell>Apis mellifica</TableCell>
                    <TableCell>Produces rapid oedema, burning–stinging pains, serous inflammation, and absence of thirst. Acts quickly with puffiness and soreness.</TableCell>
                    <TableCell>Skin, kidneys, urinary tract, mucosa, serous membranes.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Vegetable Origin (Spanish fly resin – Cantharis vesicatoria)</TableCell>
                    <TableCell>Cantharis vesicatoria</TableCell>
                    <TableCell>Produces violent burning, cutting, raw pains with constant urging to urinate and thirst for small quantities.</TableCell>
                    <TableCell>Urinary bladder, kidneys, skin (burns & vesication), GI tract.</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="font-medium mb-2">🌱 Family Insight:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Apis expresses serous inflammation with oedema, relief from cold, thirstlessness.</li>
                <li>Cantharis expresses inflammatory rawness with violent burning and thirst.</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Main Comparison */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>🩺 Comparative Materia Medica: Apis mellifica vs Cantharis vesicatoria</CardTitle>
            <p className="text-muted-foreground mt-2">
              <strong>Common Sphere:</strong> Urinary tract infections, cystitis, nephritis, burns, erysipelas, and inflammatory skin conditions.
            </p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold w-1/4">Feature</TableHead>
                    <TableHead className="font-semibold w-3/8">Apis mellifica</TableHead>
                    <TableHead className="font-semibold w-3/8">Cantharis vesicatoria</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Constitution / Temperament</TableCell>
                    <TableCell>Chilly, sensitive, nervous; oedematous tendency; quick alternation of moods.</TableCell>
                    <TableCell>Fiery, excitable, nervous, hypersensitive; violent reactions to pain.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Mind / Emotion</TableCell>
                    <TableCell>Restless, busy, irritable, jealous; alternates between activity and stupor.</TableCell>
                    <TableCell>Furious delirium from pain; shrieks, tears things; sexual mania.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Modalities (Aggravations / Ameliorations)</TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div>🔺 <strong>Aggravation:</strong> heat, touch, pressure, after sleep.</div>
                        <div>🔻 <strong>Amelioration:</strong> cold applications, uncovering, cool air.</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div>🔺 <strong>Aggravation:</strong> touch, urination, drinking water, night.</div>
                        <div>🔻 <strong>Amelioration:</strong> cold applications (temporarily), rest.</div>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Urinary Symptoms</TableCell>
                    <TableCell>Burning and stinging before, during, or after urination. Urine scanty, dark, sometimes bloody. No thirst.</TableCell>
                    <TableCell>Intense burning and cutting pain before, during, and after urination. Constant desire, passes drop by drop with tenesmus. Extreme thirst for small sips.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Burns / Skin</TableCell>
                    <TableCell>Pink, shiny, oedematous swelling; better cold; stinging pain.</TableCell>
                    <TableCell>Vesication and rawness; blisters that burn and ulcerate; pain out of proportion.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Mucous Membranes</TableCell>
                    <TableCell>Puffy, inflamed, swollen with serous exudation; throat and eyelids oedematous.</TableCell>
                    <TableCell>Raw, inflamed, ulcerated surfaces; burning and smarting with raw bleeding.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Fever / Generalities</TableCell>
                    <TableCell>Sudden high fever with thirstlessness, puffiness, and sleepiness.</TableCell>
                    <TableCell>Violent fever with burning thirst and unbearable pain; delirium.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Thermal State</TableCell>
                    <TableCell>Chilly yet better cold; sensitive to heat.</TableCell>
                    <TableCell>Burning heat; prefers cold but cannot bear slightest touch.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Clinical Focus</TableCell>
                    <TableCell>Acute oedema, nephritis, hives, insect stings, cystitis with stinging pains, burns relieved by cold.</TableCell>
                    <TableCell>Acute cystitis, nephritis, urethritis, burns with vesication, violent inflammation, thirst for small sips.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Differentiating Clincher</TableCell>
                    <TableCell className="bg-primary/5">Stinging, oedematous swelling, thirstless, better cold.</TableCell>
                    <TableCell className="bg-primary/5">Raw burning pain, violent tenesmus, intense thirst, worse motion.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Complementary / Inimical Remedies</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div><strong>Complementary:</strong> Rhus tox, Cantharis (sometimes follows).</div>
                        <div><strong>Inimical:</strong> Rhus tox (often not well together).</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div><strong>Complementary:</strong> Apis (when oedema persists), Arnica.</div>
                        <div><strong>Inimical:</strong> Phosphorus.</div>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Biochemic Complement</TableCell>
                    <TableCell>Kali mur 6X (for serous inflammation and oedema)</TableCell>
                    <TableCell>Ferrum phos 6X (for acute burning inflammation)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="mt-6 p-4 bg-primary/5 rounded-lg">
              <p className="font-medium">💡 Clinical Tip:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>When the inflammation is puffy, stinging, thirstless, and better by cold → <strong>Apis</strong>.</li>
                <li>When it is raw, cutting, violent, with thirst and tenesmus → <strong>Cantharis</strong>.</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Trio Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>⚖️ Trio Comparison: Apis – Cantharis – Arsenicum album</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">Feature</TableHead>
                    <TableHead className="font-semibold">Apis mellifica</TableHead>
                    <TableHead className="font-semibold">Cantharis vesicatoria</TableHead>
                    <TableHead className="font-semibold">Arsenicum album</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Type of Pain</TableCell>
                    <TableCell>Stinging, burning, smarting</TableCell>
                    <TableCell>Burning, cutting, raw, intolerable</TableCell>
                    <TableCell>Burning, tearing, restlessness</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Thirst</TableCell>
                    <TableCell>Thirstless</TableCell>
                    <TableCell>Extreme thirst for small quantities</TableCell>
                    <TableCell>Thirst for frequent small sips</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Modalities</TableCell>
                    <TableCell>Better cold, worse heat</TableCell>
                    <TableCell>Worse motion, urination, touch</TableCell>
                    <TableCell>Better warmth, worse cold</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Skin / Mucosa</TableCell>
                    <TableCell>Oedema, shiny swelling</TableCell>
                    <TableCell>Vesicles, blisters, ulceration</TableCell>
                    <TableCell>Burning with anxiety, necrosis</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Urinary System</TableCell>
                    <TableCell>Scanty urine, stinging, no thirst</TableCell>
                    <TableCell>Bloody urine, tenesmus, intense pain</TableCell>
                    <TableCell>Scanty, albuminous urine with burning</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Mental State</TableCell>
                    <TableCell>Busy, irritable, jealous</TableCell>
                    <TableCell>Furious, wild from pain</TableCell>
                    <TableCell>Anxious, fearful, restless</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Clinical Essence</TableCell>
                    <TableCell>Serous inflammation with oedema</TableCell>
                    <TableCell>Raw destructive inflammation</TableCell>
                    <TableCell>Exhaustive inflammation with prostration</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="font-medium mb-2">🧩 Triad Tip:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li><strong>Apis</strong> — thirstless, stinging, oedematous.</li>
                <li><strong>Cantharis</strong> — burning, raw, thirsty.</li>
                <li><strong>Arsenicum</strong> — burning, anxious, exhausted.</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default ApisCantharis;
