import React from 'react';
import { PageLayout } from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const CalcareaNatrum = () => {
  return (
    <PageLayout
      title="Calcarea Carbonica vs Natrum Muriaticum"
      description="Professional comparative analysis of two foundational constitutional remedies"
      keywords={['calcarea carbonica', 'natrum muriaticum', 'materia medica', 'homeopathy comparison', 'constitutional remedies']}
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
            <h2 className="text-2xl font-semibold mb-6 text-foreground">🌿 Family Comparison: Carbonate of Calcium vs Chloride of Sodium</h2>
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
                    <td className="border border-border p-3">Calcareous Group (Earthy Carbonates)</td>
                    <td className="border border-border p-3 font-medium">Calcarea carbonica</td>
                    <td className="border border-border p-3">Produces slowness, coldness, weakness, and easy fatigue. Acts deeply on metabolism, glands, bones, and nutrition.</td>
                    <td className="border border-border p-3">Endocrine, skeletal, lymphatic, digestive, reproductive systems.</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3">Chloride Group (Halogen Salts)</td>
                    <td className="border border-border p-3 font-medium">Natrum muriaticum</td>
                    <td className="border border-border p-3">Produces dryness, emaciation, grief, and emotional reserve. Acts on blood, skin, mucosa, and the mind.</td>
                    <td className="border border-border p-3">Nutrition, skin, mucous membranes, blood, emotions.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm font-medium">🌱 Family Insight:</p>
              <p className="text-sm mt-2">Calcarea carbonica expresses slow, chilly, secure dependence.</p>
              <p className="text-sm">Natrum muriaticum expresses dry, warm, reserved independence.</p>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Comparison */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">🩺 Comparative Materia Medica: Calcarea carbonica vs Natrum muriaticum</h2>
            <p className="text-muted-foreground mb-6">Common Sphere: Chronic constitutional states, anemia, glandular weakness, menstrual irregularities, emotional disturbances.</p>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="border border-border p-3 text-left font-semibold w-1/4">Feature</th>
                    <th className="border border-border p-3 text-left font-semibold">Calcarea carbonica</th>
                    <th className="border border-border p-3 text-left font-semibold">Natrum muriaticum</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Constitution / Temperament</td>
                    <td className="border border-border p-3">Fair, flabby, overweight, sluggish, chilly, sweat easily—especially on head. Calm but anxious about health or finances.</td>
                    <td className="border border-border p-3">Thin, tall, refined, reserved, sensitive; warm-blooded; introverted and self-contained.</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Mind / Emotion</td>
                    <td className="border border-border p-3">Anxious, fearful (heights, insanity, misfortune); seeks reassurance; dependent on others.</td>
                    <td className="border border-border p-3">Reserved, dignified, grieves silently; avoids consolation; easily offended but hides feelings.</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Modalities (Aggravations / Ameliorations)</td>
                    <td className="border border-border p-3">
                      <div className="space-y-2">
                        <p>🔺 <strong>Aggravation:</strong> cold air, dampness, exertion, full moon, overwork.</p>
                        <p>🔻 <strong>Amelioration:</strong> warmth, rest, dry weather.</p>
                      </div>
                    </td>
                    <td className="border border-border p-3">
                      <div className="space-y-2">
                        <p>🔺 <strong>Aggravation:</strong> heat, sun, sea air, grief, exertion, consolation.</p>
                        <p>🔻 <strong>Amelioration:</strong> cool air, open air, solitude, rest.</p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Thermal State</td>
                    <td className="border border-border p-3">Chilly; dislikes cold air, wants warm clothing.</td>
                    <td className="border border-border p-3">Warm-blooded; craves cool air, dislikes heat.</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Appetite / Cravings</td>
                    <td className="border border-border p-3">Craves eggs, indigestible things (chalk, clay), sweets; dislikes fat.</td>
                    <td className="border border-border p-3">Craves salt, sour foods; thirst for cold water; aversion to bread.</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Gastrointestinal / Nutrition</td>
                    <td className="border border-border p-3">Slow digestion, acidity, distension, constipation from sluggish bowel.</td>
                    <td className="border border-border p-3">Irregular appetite, salt craving, constipation with hard, crumbly stool.</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Menses / Female Health</td>
                    <td className="border border-border p-3">Early, profuse, prolonged menses; leucorrhoea like milk; cold, flabby, tired women.</td>
                    <td className="border border-border p-3">Delayed, scanty, irregular menses; headaches before menses; sadness or irritability during flow.</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Sleep / Dreams</td>
                    <td className="border border-border p-3">Deep sleep with snoring, night sweats, dreams of falling.</td>
                    <td className="border border-border p-3">Sleepless after grief, dreams of past events, awakening unrefreshed.</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Skin / Appearance</td>
                    <td className="border border-border p-3">Pale, flabby, cold, perspiring; slow to heal; tendency to warts.</td>
                    <td className="border border-border p-3">Dry, cracked lips, oily face; acne in adolescence; emaciated despite good appetite.</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Clinical Focus</td>
                    <td className="border border-border p-3">Hypothyroidism, rickets, chronic fatigue, lymphatic swelling, obesity, delayed milestones.</td>
                    <td className="border border-border p-3">Anemia, depression after grief, chronic headaches, eczema, cold sores, menstrual migraines.</td>
                  </tr>
                  <tr className="bg-primary/5">
                    <td className="border border-border p-3 font-medium bg-muted/30">Differentiating Clincher</td>
                    <td className="border border-border p-3 font-semibold">Chilly, dependent, fearful, sweats on head; craves eggs.</td>
                    <td className="border border-border p-3 font-semibold">Reserved, warm, grief-bound, craves salt; avoids sympathy.</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Complementary / Inimical Remedies</td>
                    <td className="border border-border p-3">
                      <p><strong>Complementary:</strong> Silicea, Lycopodium.</p>
                      <p className="text-destructive"><strong>Inimical:</strong> Bryonia.</p>
                    </td>
                    <td className="border border-border p-3">
                      <p><strong>Complementary:</strong> Sepia, Ignatia.</p>
                      <p className="text-destructive"><strong>Inimical:</strong> Apis, Natrum carb.</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Biochemic Complement</td>
                    <td className="border border-border p-3">Calcarea phos 6X (for bone & glandular weakness)</td>
                    <td className="border border-border p-3">Natrum phos 6X (for metabolism & acidity)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 bg-primary/5 border-l-4 border-primary rounded">
              <p className="font-semibold">💡 Clinical Tip:</p>
              <p className="mt-2">Think <strong>Calcarea carbonica</strong> for the chilly, slow, dependent constitution that gains weight easily.</p>
              <p>Think <strong>Natrum muriaticum</strong> for the warm, reserved, grief-prone patient who craves salt and solitude.</p>
            </div>
          </CardContent>
        </Card>

        {/* Trio Comparison */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-6 text-foreground">⚖️ Trio Comparison: Calcarea carbonica – Natrum muriaticum – Lycopodium clavatum</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="border border-border p-3 text-left font-semibold">Feature</th>
                    <th className="border border-border p-3 text-left font-semibold">Calcarea carbonica</th>
                    <th className="border border-border p-3 text-left font-semibold">Natrum muriaticum</th>
                    <th className="border border-border p-3 text-left font-semibold">Lycopodium clavatum</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Build / Appearance</td>
                    <td className="border border-border p-3">Fair, flabby, short, slow</td>
                    <td className="border border-border p-3">Thin, refined, pale, dry</td>
                    <td className="border border-border p-3">Lean upper body, bloated abdomen</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Thermal State</td>
                    <td className="border border-border p-3">Chilly, worse cold</td>
                    <td className="border border-border p-3">Warm, worse heat</td>
                    <td className="border border-border p-3">Chilly feet, hot head</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Emotional Tone</td>
                    <td className="border border-border p-3">Anxious, dependent, fearful</td>
                    <td className="border border-border p-3">Reserved, grief-holding, dignified</td>
                    <td className="border border-border p-3">Dominant at home, timid in public</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Mind / Emotion</td>
                    <td className="border border-border p-3">Seeks security, fears failure</td>
                    <td className="border border-border p-3">Dwells on grief, dislikes sympathy</td>
                    <td className="border border-border p-3">Fears responsibility, anticipates failure</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Digestive Traits</td>
                    <td className="border border-border p-3">Slow digestion, sour eructations</td>
                    <td className="border border-border p-3">Irregular appetite, craving salt</td>
                    <td className="border border-border p-3">Flatulence, bloating, right-sided pain</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Menses / Hormonal</td>
                    <td className="border border-border p-3">Early, profuse, exhausting</td>
                    <td className="border border-border p-3">Delayed, scanty, sadness during flow</td>
                    <td className="border border-border p-3">Late, scanty, weakness before flow</td>
                  </tr>
                  <tr className="bg-primary/5">
                    <td className="border border-border p-3 font-medium bg-muted/30">Clinical Essence</td>
                    <td className="border border-border p-3 font-semibold">Chilly, dependent, slow metabolism</td>
                    <td className="border border-border p-3 font-semibold">Warm, emotional repression, salt craving</td>
                    <td className="border border-border p-3 font-semibold">Intelligent, anxious, digestive weakness</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm font-medium">🧩 Triad Tip:</p>
              <p className="text-sm mt-2"><strong>Calcarea</strong> — slow, secure, dependent.</p>
              <p className="text-sm"><strong>Natrum mur</strong> — reserved, wounded, independent.</p>
              <p className="text-sm"><strong>Lycopodium</strong> — ambitious, anxious, compensatory.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default CalcareaNatrum;
