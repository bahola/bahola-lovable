import React from 'react';
import { PageLayout } from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const GelsemiumBaptisia = () => {
  return (
    <PageLayout
      title="Gelsemium Sempervirens vs Baptisia Tinctoria"
      description="Professional comparative analysis of two prostration and fever remedies"
      keywords={['gelsemium', 'baptisia', 'materia medica', 'homeopathy comparison', 'fever', 'prostration']}
    >
      <div className="space-y-8">
        <Link 
          to="/professional/materia-medica" 
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Materia Medica
        </Link>

        {/* Family Comparison */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-6 text-foreground">🌿 Family Comparison: Loganiaceae vs Leguminosae (Bean Family)</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="border border-border p-3 text-left font-semibold">Family / Source</th>
                    <th className="border border-border p-3 text-left font-semibold">Representative Remedy</th>
                    <th className="border border-border p-3 text-left font-semibold">Core Traits</th>
                    <th className="border border-border p-3 text-left font-semibold">Typical Sphere of Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border p-3">Loganiaceae (Strychnos family)</td>
                    <td className="border border-border p-3 font-medium">Gelsemium sempervirens</td>
                    <td className="border border-border p-3">Produces nervous prostration, drowsiness, trembling, and lack of coordination. The patient becomes dull, heavy, and motionless.</td>
                    <td className="border border-border p-3">Nervous system, muscles, circulation, mucosa.</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3">Leguminosae (Pea family)</td>
                    <td className="border border-border p-3 font-medium">Baptisia tinctoria</td>
                    <td className="border border-border p-3">Produces septic fever, mental confusion, besotted expression, and putrid discharges. Patient feels "scattered," as if body parts are not connected.</td>
                    <td className="border border-border p-3">Blood, mucous membranes, GI tract, septic states.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm font-medium">🌱 Family Insight:</p>
              <p className="text-sm mt-2">Gelsemium expresses functional paralysis and dullness.</p>
              <p className="text-sm">Baptisia expresses toxemia and putridity.</p>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Comparison */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">🩺 Comparative Materia Medica: Gelsemium sempervirens vs Baptisia tinctoria</h2>
            <p className="text-muted-foreground mb-6">Common Sphere: Typhoid, influenza, nervous exhaustion, septic fevers, and post-viral weakness.</p>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="border border-border p-3 text-left font-semibold w-1/4">Feature</th>
                    <th className="border border-border p-3 text-left font-semibold">Gelsemium sempervirens</th>
                    <th className="border border-border p-3 text-left font-semibold">Baptisia tinctoria</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Constitution / Temperament</td>
                    <td className="border border-border p-3">Nervous, sensitive, timid; suited to emotional or anticipatory types.</td>
                    <td className="border border-border p-3">Plethoric, sluggish, besotted, dull; suited to septic or toxic states.</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Mind / Emotion</td>
                    <td className="border border-border p-3">Dull, drowsy, dizzy, apathetic; wants to be alone, too weak to think. Stage fright, anticipatory diarrhoea.</td>
                    <td className="border border-border p-3">Confused, delirious, muttering; feels body is scattered or in pieces. Thinks he is double or parts are separated.</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Modalities (Aggr./Amel.)</td>
                    <td className="border border-border p-3">
                      <div className="space-y-2">
                        <p>🔺 <strong>Aggravation:</strong> anticipation, emotion, humid weather, heat of sun.</p>
                        <p>🔻 <strong>Amelioration:</strong> urination, sweating, rest.</p>
                      </div>
                    </td>
                    <td className="border border-border p-3">
                      <div className="space-y-2">
                        <p>🔺 <strong>Aggravation:</strong> motion, exertion, septic states, humidity.</p>
                        <p>🔻 <strong>Amelioration:</strong> rest, open air.</p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Sensorium / Mind State</td>
                    <td className="border border-border p-3">Heavy, dull, drooping; sleepy but cannot rest; slow perception; trembling weakness.</td>
                    <td className="border border-border p-3">Stuporous, besotted, muttering delirium; can't locate himself; answers slowly or incoherently.</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Fever / Circulation</td>
                    <td className="border border-border p-3">Chill up and down spine; no thirst; pulse slow and soft; dull, muscular weakness.</td>
                    <td className="border border-border p-3">High fever with offensive discharges; pulse fast, soft, and weak; stupor with fetid breath and sweat.</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Face / Tongue</td>
                    <td className="border border-border p-3">Dull, heavy, besotted face; drooping eyelids; trembling tongue.</td>
                    <td className="border border-border p-3">Dark red or brownish tongue with yellow coating in centre; fetid odour.</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Gastrointestinal</td>
                    <td className="border border-border p-3">Diarrhoea from emotion or anticipation; stools painless, yellow, or involuntary in severe weakness.</td>
                    <td className="border border-border p-3">Diarrhoea offensive, cadaveric; stool, sweat, and breath smell putrid.</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Muscular / Neurological</td>
                    <td className="border border-border p-3">Trembling, heaviness, paralysis; weakness after illness or fright.</td>
                    <td className="border border-border p-3">Prostration from sepsis; soreness as if beaten; limbs heavy, bruised.</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Clinical Focus</td>
                    <td className="border border-border p-3">Functional dullness, influenza, stage fright, post-viral fatigue, nervous weakness.</td>
                    <td className="border border-border p-3">Typhoid, septic fevers, gastroenteric infections, toxemic states.</td>
                  </tr>
                  <tr className="bg-primary/5">
                    <td className="border border-border p-3 font-medium bg-muted/30">Differentiating Clincher</td>
                    <td className="border border-border p-3 font-semibold">Dullness with functional weakness, trembling, and drooping eyelids.</td>
                    <td className="border border-border p-3 font-semibold">Stupor with toxic weakness, foul odour, and muttering delirium.</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Complementary / Inimical Remedies</td>
                    <td className="border border-border p-3">
                      <p><strong>Complementary:</strong> Ferrum phos, Phosphoric acid.</p>
                      <p className="text-destructive"><strong>Inimical:</strong> Bryonia.</p>
                    </td>
                    <td className="border border-border p-3">
                      <p><strong>Complementary:</strong> Arnica, Gelsemium.</p>
                      <p className="text-destructive"><strong>Inimical:</strong> Rhus tox.</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Biochemic Complement</td>
                    <td className="border border-border p-3">Kali phos 6X (for nerve exhaustion)</td>
                    <td className="border border-border p-3">Ferrum phos 6X (for fever and toxemia)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 bg-primary/5 border-l-4 border-primary rounded">
              <p className="font-semibold">💡 Clinical Tip:</p>
              <p className="mt-2">In fever with dullness, heaviness, and tremulous weakness → <strong>Gelsemium</strong>.</p>
              <p>In fever with stupor, fetor, and toxic delirium → <strong>Baptisia</strong>.</p>
            </div>
          </CardContent>
        </Card>

        {/* Trio Comparison */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-6 text-foreground">⚖️ Trio Comparison: Gelsemium – Baptisia – Arnica montana</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="border border-border p-3 text-left font-semibold">Feature</th>
                    <th className="border border-border p-3 text-left font-semibold">Gelsemium sempervirens</th>
                    <th className="border border-border p-3 text-left font-semibold">Baptisia tinctoria</th>
                    <th className="border border-border p-3 text-left font-semibold">Arnica montana</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Mental State</td>
                    <td className="border border-border p-3">Dull, drowsy, apathetic</td>
                    <td className="border border-border p-3">Stuporous, delirious, besotted</td>
                    <td className="border border-border p-3">Says "nothing ails me"; denies illness</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Prostration Type</td>
                    <td className="border border-border p-3">Nervous, trembling</td>
                    <td className="border border-border p-3">Septic, toxic, foul</td>
                    <td className="border border-border p-3">Traumatic, sore, bruised</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Fever Type</td>
                    <td className="border border-border p-3">Low-grade, sluggish, no thirst</td>
                    <td className="border border-border p-3">High, septic, putrid</td>
                    <td className="border border-border p-3">Typhoid from injury, septic bruising</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Odour</td>
                    <td className="border border-border p-3">Slight or absent</td>
                    <td className="border border-border p-3">Offensive, fetid</td>
                    <td className="border border-border p-3">Slightly sour or metallic</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Modalities</td>
                    <td className="border border-border p-3">Worse heat, anticipation</td>
                    <td className="border border-border p-3">Worse motion, humidity</td>
                    <td className="border border-border p-3">Worse movement, touch</td>
                  </tr>
                  <tr className="bg-primary/5">
                    <td className="border border-border p-3 font-medium bg-muted/30">Clinical Essence</td>
                    <td className="border border-border p-3 font-semibold">Functional paralysis, fear, weakness</td>
                    <td className="border border-border p-3 font-semibold">Septic delirium, fetor, body feels "scattered"</td>
                    <td className="border border-border p-3 font-semibold">Bruised soreness, traumatic sepsis</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm font-medium">🧩 Triad Tip:</p>
              <p className="text-sm mt-2"><strong>Gelsemium</strong> — Functional dullness and trembling weakness.</p>
              <p className="text-sm"><strong>Baptisia</strong> — Toxic stupor and fetid discharges.</p>
              <p className="text-sm"><strong>Arnica</strong> — Traumatic septic or bruised state with denial.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default GelsemiumBaptisia;
