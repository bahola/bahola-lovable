import React from 'react';
import { PageLayout } from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeparMercurius = () => {
  return (
    <PageLayout
      title="Hepar Sulphuris vs Mercurius Solubilis"
      description="Professional comparative analysis of two major suppurative remedies"
      keywords={['hepar sulphuris', 'mercurius solubilis', 'materia medica', 'homeopathy comparison', 'suppuration', 'ulceration']}
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
            <h2 className="text-2xl font-semibold mb-6 text-foreground">🌿 Family Comparison: Mineral Compound vs Metal Group</h2>
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
                    <td className="border border-border p-3">Sulphur–Calcium Compound (Hepar group)</td>
                    <td className="border border-border p-3 font-medium">Hepar sulphuris calcareum</td>
                    <td className="border border-border p-3">Produces extreme sensitivity to pain and cold, suppuration tendency, and irritability. Person is oversensitive mentally and physically.</td>
                    <td className="border border-border p-3">Respiratory tract, skin, glands, abscesses, ENT, dental infections.</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3">Mercurial Metal Group</td>
                    <td className="border border-border p-3 font-medium">Mercurius solubilis</td>
                    <td className="border border-border p-3">Produces offensive discharges, ulceration, salivation, and bone pains. Acts deeply on glands, mucosa, and periosteum.</td>
                    <td className="border border-border p-3">Mouth, throat, lymph nodes, glands, bones, GI tract.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm font-medium">🌱 Family Insight:</p>
              <p className="text-sm mt-2">Hepar sulphuris = Hypersensitivity + Early suppuration.</p>
              <p className="text-sm">Mercurius = Offensiveness + Advanced ulceration.</p>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Comparison */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">🩺 Comparative Materia Medica: Hepar sulphuris vs Mercurius solubilis</h2>
            <p className="text-muted-foreground mb-6">Common Sphere: Tonsillitis, abscesses, otitis, dental infections, and skin suppurations.</p>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="border border-border p-3 text-left font-semibold w-1/4">Feature</th>
                    <th className="border border-border p-3 text-left font-semibold">Hepar sulphuris calcareum</th>
                    <th className="border border-border p-3 text-left font-semibold">Mercurius solubilis</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Constitution / Temperament</td>
                    <td className="border border-border p-3">Chilly, sensitive, peevish, irritable; slightest draft aggravates. Oversensitive to pain, touch, and cold.</td>
                    <td className="border border-border p-3">Weak, trembling, flabby, perspiring, offensive; general constitutional debility.</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Mind / Emotion</td>
                    <td className="border border-border p-3">Irritable, hasty, hypersensitive; anxiety about health; violent temper, wants to strike.</td>
                    <td className="border border-border p-3">Slow, weak memory, suspicious, restless, fearful; anxiety with trembling.</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Modalities (Aggravations / Ameliorations)</td>
                    <td className="border border-border p-3">
                      <div className="space-y-2">
                        <p>🔺 <strong>Aggravation:</strong> slightest draft, touch, uncovering, cold air, night.</p>
                        <p>🔻 <strong>Amelioration:</strong> warmth, covering, damp weather.</p>
                      </div>
                    </td>
                    <td className="border border-border p-3">
                      <div className="space-y-2">
                        <p>🔺 <strong>Aggravation:</strong> night, heat of bed, damp cold, sweating.</p>
                        <p>🔻 <strong>Amelioration:</strong> rest, moderate warmth, lying on right side.</p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Key Physical Symptoms</td>
                    <td className="border border-border p-3">Sharp, sticking pains "as if from splinters." Early stage of suppuration—threatening abscesses. Pus thick, creamy, foul-smelling. Extreme chilliness.</td>
                    <td className="border border-border p-3">Advanced suppuration; discharge thin, bloody, offensive, metallic odor. Profuse sweat without relief. Trembling tongue and limbs.</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Mouth / Throat</td>
                    <td className="border border-border p-3">Throat raw, splinter-like pain on swallowing; tonsils threaten to abscess; breath offensive.</td>
                    <td className="border border-border p-3">Salivation, metallic taste, fetid breath, ulceration of gums and mouth; tongue large, flabby, shows teeth-marks.</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Skin / Glands</td>
                    <td className="border border-border p-3">Suppurating glands, boils, acne with pus formation. Skin sensitive to touch, ulcers painful.</td>
                    <td className="border border-border p-3">Ulceration with fetid discharge; moist eruptions; glands swollen and tender; bone pains at night.</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Temperature / Sweating</td>
                    <td className="border border-border p-3">Chilly to the core; cannot bear exposure; sweats with slightest exertion, offensive odor.</td>
                    <td className="border border-border p-3">Alternating heat and chilliness; profuse oily perspiration, sour or fetid; does not relieve.</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Clinical Focus</td>
                    <td className="border border-border p-3">Early abscess, otitis, tonsillitis, boils, carbuncles, dental infections, bronchitis with thick expectoration.</td>
                    <td className="border border-border p-3">Advanced ulceration, foul discharges, glandular inflammation, bone affections, stomatitis, pharyngitis.</td>
                  </tr>
                  <tr className="bg-primary/5">
                    <td className="border border-border p-3 font-medium bg-muted/30">Differentiating Clincher</td>
                    <td className="border border-border p-3 font-semibold">Marked chilliness, sensitivity, suppuration early, pain as from splinters.</td>
                    <td className="border border-border p-3 font-semibold">Offensive, advanced ulceration, salivation, bone or gland involvement.</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Complementary / Inimical Remedies</td>
                    <td className="border border-border p-3">
                      <p><strong>Complementary:</strong> Silicea, Calcarea sulph.</p>
                      <p className="text-destructive"><strong>Inimical:</strong> Mercurius.</p>
                    </td>
                    <td className="border border-border p-3">
                      <p><strong>Complementary:</strong> Hepar, Belladonna.</p>
                      <p className="text-destructive"><strong>Inimical:</strong> Silicea.</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Biochemic Complement</td>
                    <td className="border border-border p-3">Calcarea sulph 6X (for pus formation and drainage)</td>
                    <td className="border border-border p-3">Nat sulph 6X (for offensive, chronic discharges)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 bg-primary/5 border-l-4 border-primary rounded">
              <p className="font-semibold">💡 Clinical Tip:</p>
              <p className="mt-2">When the infection is just forming, with acute pain and chilliness, think <strong>Hepar sulph</strong>.</p>
              <p>When it is established, offensive, and ulcerative with salivation, think <strong>Mercurius solubilis</strong>.</p>
            </div>
          </CardContent>
        </Card>

        {/* Trio Comparison */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-6 text-foreground">⚖️ Trio Comparison: Hepar sulph – Mercurius solubilis – Silicea terra</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="border border-border p-3 text-left font-semibold">Feature</th>
                    <th className="border border-border p-3 text-left font-semibold">Hepar sulphuris</th>
                    <th className="border border-border p-3 text-left font-semibold">Mercurius solubilis</th>
                    <th className="border border-border p-3 text-left font-semibold">Silicea terra</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Stage of Suppuration</td>
                    <td className="border border-border p-3">Early, forming stage</td>
                    <td className="border border-border p-3">Fully developed, offensive ulceration</td>
                    <td className="border border-border p-3">Late, chronic, sluggish healing</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Pain Type</td>
                    <td className="border border-border p-3">Splinter-like, sharp</td>
                    <td className="border border-border p-3">Burning, raw, gnawing</td>
                    <td className="border border-border p-3">Dull, throbbing, deep-seated</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Discharge</td>
                    <td className="border border-border p-3">Thick, creamy, yellow</td>
                    <td className="border border-border p-3">Thin, offensive, bloody</td>
                    <td className="border border-border p-3">Thin, acrid, scanty</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Thermal State</td>
                    <td className="border border-border p-3">Extremely chilly</td>
                    <td className="border border-border p-3">Alternating chills and heat</td>
                    <td className="border border-border p-3">Chilly, sweats easily</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Mind / Temperament</td>
                    <td className="border border-border p-3">Irritable, violent</td>
                    <td className="border border-border p-3">Restless, suspicious</td>
                    <td className="border border-border p-3">Timid, yielding, anxious</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Modalities</td>
                    <td className="border border-border p-3">Worse cold air, better warmth</td>
                    <td className="border border-border p-3">Worse night, heat, damp</td>
                    <td className="border border-border p-3">Worse cold drafts, better warmth</td>
                  </tr>
                  <tr className="bg-primary/5">
                    <td className="border border-border p-3 font-medium bg-muted/30">Clinical Essence</td>
                    <td className="border border-border p-3 font-semibold">Early pus formation, acute infections</td>
                    <td className="border border-border p-3 font-semibold">Advanced ulceration, foul secretions</td>
                    <td className="border border-border p-3 font-semibold">Chronic induration, delayed healing</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm font-medium">🧩 Triad Tip:</p>
              <p className="text-sm mt-2"><strong>Hepar sulph</strong> — Acute, early, sensitive.</p>
              <p className="text-sm"><strong>Mercurius</strong> — Advanced, offensive, destructive.</p>
              <p className="text-sm"><strong>Silicea</strong> — Chronic, sluggish, reparative.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default HeparMercurius;
