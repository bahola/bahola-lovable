import React from 'react';
import { PageLayout } from '@/components/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const BelladonnaGlonoinum = () => {
  return (
    <PageLayout
      title="Belladonna vs Glonoinum"
      description="Professional comparative analysis of two congestive headache remedies"
      keywords={['belladonna', 'glonoinum', 'materia medica', 'homeopathy comparison', 'headache', 'congestion']}
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
            <h2 className="text-2xl font-semibold mb-6 text-foreground">🌿 Family Comparison: Solanaceae vs Nitro-Glycerin Group</h2>
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
                    <td className="border border-border p-3">Solanaceae (Nightshade family)</td>
                    <td className="border border-border p-3 font-medium">Belladonna atropa</td>
                    <td className="border border-border p-3">Produces sudden violent congestions, redness, dryness, dilated pupils, and heat. Acts rapidly on brain and vascular system.</td>
                    <td className="border border-border p-3">Brain, meninges, throat, skin, circulation.</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3">Nitro-Glycerin Compound (Glonoinum group)</td>
                    <td className="border border-border p-3 font-medium">Glonoinum (nitroglycerin)</td>
                    <td className="border border-border p-3">Produces intense cerebral congestion, bursting pulsations, and heat of head &gt; sun exposure. Sudden surges of blood upward.</td>
                    <td className="border border-border p-3">Cerebral vessels, heart, circulation, meninges.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm font-medium">🌱 Family Insight:</p>
              <p className="text-sm mt-2">Belladonna expresses inflammatory congestion with dryness and excitability.</p>
              <p className="text-sm">Glonoinum expresses vascular congestion with throbbing and explosive fullness.</p>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Comparison */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">🩺 Comparative Materia Medica: Belladonna vs Glonoinum</h2>
            <p className="text-muted-foreground mb-6">Common Sphere: Acute congestive headaches, sunstroke, high fevers, cerebral hyperemia, menopausal flushes.</p>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="border border-border p-3 text-left font-semibold w-1/4">Feature</th>
                    <th className="border border-border p-3 text-left font-semibold">Belladonna atropa</th>
                    <th className="border border-border p-3 text-left font-semibold">Glonoinum (nitroglycerin)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Constitution / Temperament</td>
                    <td className="border border-border p-3">Plethoric, robust, sensitive, quick-reacting, fiery temperament.</td>
                    <td className="border border-border p-3">Plethoric, sensitive to sun and heat, sudden rush of blood to head.</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Mind / Emotion</td>
                    <td className="border border-border p-3">Excitable, furious, delirious; sees visions, sudden outbursts; wants to strike or bite.</td>
                    <td className="border border-border p-3">Confused, bewildered, lost sense of direction; as if intoxicated; fear of heart stopping.</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Modalities (Aggr./Amel.)</td>
                    <td className="border border-border p-3">
                      <div className="space-y-2">
                        <p>🔺 <strong>Aggravation:</strong> heat, motion, touch, light, noise, lying down, afternoon.</p>
                        <p>🔻 <strong>Amelioration:</strong> rest, darkness, slightly elevated head.</p>
                      </div>
                    </td>
                    <td className="border border-border p-3">
                      <div className="space-y-2">
                        <p>🔺 <strong>Aggravation:</strong> sun, heat, motion, bending head down.</p>
                        <p>🔻 <strong>Amelioration:</strong> uncovering head, cool air, shade, quiet.</p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Head Pain Character</td>
                    <td className="border border-border p-3">Throbbing, pulsating, bursting, right-sided; head hot, face flushed, carotids throbbing; pupils dilated.</td>
                    <td className="border border-border p-3">Intense bursting sensation "head will explode," face flushed, eyes bulge, carotids pulsate violently.</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Thermal State</td>
                    <td className="border border-border p-3">Hot head, cold extremities.</td>
                    <td className="border border-border p-3">General heat rising to head; whole body flushed and throbbing.</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Fever / Circulation</td>
                    <td className="border border-border p-3">High fever, red face, dry burning skin, delirium, violent throbbing pulse.</td>
                    <td className="border border-border p-3">Sudden flushes or surges of blood; alternating pallor → redness; throbbing carotids.</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Skin / Sensation</td>
                    <td className="border border-border p-3">Burning, dry, scarlet skin; local inflammations.</td>
                    <td className="border border-border p-3">Hot, sweating, flushed skin with sense of fullness; feels heat rising upward.</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Clinical Focus</td>
                    <td className="border border-border p-3">Acute inflammation of brain, tonsils, skin; sudden fevers; right-sided headaches; otitis, erysipelas.</td>
                    <td className="border border-border p-3">Sunstroke, heat-headaches, menopausal flushes, congestive cardiac headaches, high BP surges.</td>
                  </tr>
                  <tr className="bg-primary/5">
                    <td className="border border-border p-3 font-medium bg-muted/30">Differentiating Clincher</td>
                    <td className="border border-border p-3 font-semibold">Inflammation with dryness, redness, throbbing, high fever, right-sided.</td>
                    <td className="border border-border p-3 font-semibold">Vascular congestion from sun or heat, feeling head will burst, no actual inflammation.</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Complementary / Inimical Remedies</td>
                    <td className="border border-border p-3">
                      <p><strong>Complementary:</strong> Aconite, Calc carb.</p>
                      <p className="text-destructive"><strong>Inimical:</strong> Nitric acid.</p>
                    </td>
                    <td className="border border-border p-3">
                      <p><strong>Complementary:</strong> Belladonna, Lachesis.</p>
                      <p className="text-destructive"><strong>Inimical:</strong> Nux vomica.</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Biochemic Complement</td>
                    <td className="border border-border p-3">Ferrum phos 6X (for inflammatory congestion)</td>
                    <td className="border border-border p-3">Kali phos 6X (for vascular irritability and heat exhaustion)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 bg-primary/5 border-l-4 border-primary rounded">
              <p className="font-semibold">💡 Clinical Tip:</p>
              <p className="mt-2">When the patient is red, hot, throbbing, dry, excited → <strong>Belladonna</strong>.</p>
              <p>When the patient feels head will burst from heat of sun or flush of blood → <strong>Glonoinum</strong>.</p>
            </div>
          </CardContent>
        </Card>

        {/* Trio Comparison */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-6 text-foreground">⚖️ Trio Comparison: Belladonna – Glonoinum – Gelsemium sempervirens</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="border border-border p-3 text-left font-semibold">Feature</th>
                    <th className="border border-border p-3 text-left font-semibold">Belladonna</th>
                    <th className="border border-border p-3 text-left font-semibold">Glonoinum</th>
                    <th className="border border-border p-3 text-left font-semibold">Gelsemium</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Type of Congestion</td>
                    <td className="border border-border p-3">Inflammatory – red, hot, dry</td>
                    <td className="border border-border p-3">Vascular – surging, throbbing</td>
                    <td className="border border-border p-3">Nervous – dull, heavy, drowsy</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Onset / Cause</td>
                    <td className="border border-border p-3">Sudden exposure to cold, shock</td>
                    <td className="border border-border p-3">Sun or heat exposure, rush of blood</td>
                    <td className="border border-border p-3">Emotional shock, anticipation</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Mental State</td>
                    <td className="border border-border p-3">Delirious, violent</td>
                    <td className="border border-border p-3">Confused, intoxicated</td>
                    <td className="border border-border p-3">Drowsy, dizzy, apathetic</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Thermal State</td>
                    <td className="border border-border p-3">Hot head, cold feet</td>
                    <td className="border border-border p-3">General heat, throbbing</td>
                    <td className="border border-border p-3">Chilly, tremulous</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Headache Character</td>
                    <td className="border border-border p-3">Throbbing, bursting, right-sided</td>
                    <td className="border border-border p-3">Bursting, pulsating, whole head</td>
                    <td className="border border-border p-3">Dull, heavy, band-like</td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 font-medium bg-muted/30">Modalities</td>
                    <td className="border border-border p-3">Worse noise/light/motion</td>
                    <td className="border border-border p-3">Worse heat/sun</td>
                    <td className="border border-border p-3">Worse anticipation, humid weather</td>
                  </tr>
                  <tr className="bg-primary/5">
                    <td className="border border-border p-3 font-medium bg-muted/30">Clinical Essence</td>
                    <td className="border border-border p-3 font-semibold">Acute inflammation with heat & redness</td>
                    <td className="border border-border p-3 font-semibold">Sudden sun/heat vascular congestion</td>
                    <td className="border border-border p-3 font-semibold">Drowsy weakness with tremors</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm font-medium">🧩 Triad Tip:</p>
              <p className="text-sm mt-2"><strong>Belladonna</strong> — Inflammatory, dry, furious congestion.</p>
              <p className="text-sm"><strong>Glonoinum</strong> — Vascular, explosive, sun-induced congestion.</p>
              <p className="text-sm"><strong>Gelsemium</strong> — Nervous, paralytic, dull congestion.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default BelladonnaGlonoinum;
