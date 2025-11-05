import { PageLayout } from "@/components/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Sulphur = () => {
  return (
    <PageLayout 
      title="Deep Dive: Sulphur" 
      description="The King of Antipsorics — The Philosopher of Psora"
    >
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link 
          to="/professional/remedy-deep-dive" 
          className="inline-flex items-center gap-2 text-primary hover:underline mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Deep Dive Series
        </Link>

        <div className="space-y-6">
          {/* Header */}
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">🧠 Deep Dive: SULPHUR</CardTitle>
              <CardDescription className="text-xl">
                The King of Antipsorics — The Philosopher of Psora
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Remedy Identity */}
          <Card>
            <CardHeader>
              <CardTitle>🧬 Remedy Identity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p><strong>Source:</strong> Sublimated Sulphur (brimstone)</p>
              <p><strong>Family/Group:</strong> Mineral, non-metal, oxygen group element</p>
              <p><strong>Miasmatic Affinity:</strong> Psoric (foundation of chronic disease)</p>
              <p><strong>Polychrest:</strong> Yes — acts on skin, venous, portal, digestive, and nervous systems</p>
            </CardContent>
          </Card>

          {/* Family Signature */}
          <Card>
            <CardHeader>
              <CardTitle>🌿 Family Signature and Sphere of Action</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Sulphur, as a fundamental element of oxidation and heat, corresponds to inflammation, congestion, and defective metabolism.
              </p>
              <p className="mb-2">It acts deeply on:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Circulatory system:</strong> venous stasis, portal congestion</li>
                <li><strong>Skin and mucosa:</strong> chronic eruptions, suppurations, unclean discharges</li>
                <li><strong>Digestive tract:</strong> sluggish portal circulation, constipation, haemorrhoids</li>
                <li><strong>Nervous system:</strong> mental overactivity with physical neglect</li>
              </ul>
            </CardContent>
          </Card>

          {/* Constitution & Temperament */}
          <Card>
            <CardHeader>
              <CardTitle>👤 Constitution & Temperament</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                The Sulphur patient is philosophical, idealistic, negligent of appearance, and often absorbed in theories.
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Build:</strong> Lean, stooping, unwashed look, red lips and orifices</li>
                <li><strong>Mind:</strong> Egotistic yet benevolent; speculative thinker; loves metaphysics and argument</li>
                <li><strong>Temperament:</strong> Hot, lazy, dirty, careless about clothing, loves comfort and idleness</li>
                <li><strong>Type:</strong> "The ragged philosopher"</li>
              </ul>
            </CardContent>
          </Card>

          {/* Causation */}
          <Card>
            <CardHeader>
              <CardTitle>🧭 Causation</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-1">
                <li>Suppression of skin eruptions or discharges</li>
                <li>Abuse of external applications</li>
                <li>Over-stimulation (drugs, alcohol) followed by collapse</li>
                <li>Chronic psoric background</li>
              </ul>
            </CardContent>
          </Card>

          {/* Modalities */}
          <Card>
            <CardHeader>
              <CardTitle>⚖️ Modalities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Better From</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Warm, dry weather</li>
                    <li>Open air (sometimes)</li>
                    <li>Lying on right side</li>
                    <li>Motion, scratching</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Worse From</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Heat, bathing, standing long</li>
                    <li>Morning, especially 11 a.m.</li>
                    <li>Night, especially after midnight</li>
                    <li>Suppression of eruptions or perspiration</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Keynotes */}
          <Card>
            <CardHeader>
              <CardTitle>🔑 Keynotes (Boger–Boericke Synthesis)</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-1">
                <li>Burning in soles, must uncover feet</li>
                <li>Unwashed look, dirty skin despite bathing</li>
                <li>Itching aggravated by warmth of bed</li>
                <li>Red orifices: lips, ears, eyes, anus</li>
                <li>Hungry at 11 a.m.</li>
                <li>Aversion to bathing</li>
                <li>Standing aggravates — haemorrhoids, varicose veins</li>
                <li>"Sinkings" and faintness from heat or fasting</li>
              </ul>
            </CardContent>
          </Card>

          {/* Farrington's Essence */}
          <Card>
            <CardHeader>
              <CardTitle>💬 Farrington's Essence</CardTitle>
            </CardHeader>
            <CardContent>
              <blockquote className="border-l-4 border-primary pl-4 italic mb-4">
                "Sulphur is the heat of life turned inward. Its fire gives both illumination and inflammation."
              </blockquote>
              <p>
                Acts as the prototype of psora, exciting vital reaction. Restores eruptions or secretions when suppressed. 
                Related to nearly every chronic case as the fundamental stimulus to reactivity.
              </p>
            </CardContent>
          </Card>

          {/* Boericke's Clinical Pearls */}
          <Card>
            <CardHeader>
              <CardTitle>🧪 Boericke's Clinical Pearls</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-1">
                <li>Chronic skin eruptions with much burning and scratching</li>
                <li>Morning diarrhoea — drives patient out of bed</li>
                <li>Portal congestion — piles, constipation, distended veins</li>
                <li>Periodic flushes of heat, vertex congestion</li>
                <li>Standing aggravates; sitting relieves</li>
                <li>Excellent intercurrent in chronic cases that have stalled</li>
              </ul>
            </CardContent>
          </Card>

          {/* Boger's Synoptic Highlights */}
          <Card>
            <CardHeader>
              <CardTitle>🧍‍♂️ Boger's Synoptic Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-1">
                <li>Slow evolution of chronic disease</li>
                <li>Congestive, burning, itching states</li>
                <li>Great weakness after suppression</li>
                <li>Modalities: worse standing, bathing, 11 a.m.; better open air</li>
                <li>"Complaints after suppression" = call for Sulphur</li>
              </ul>
            </CardContent>
          </Card>

          {/* Clinical Applications */}
          <Card>
            <CardHeader>
              <CardTitle>⚕️ Clinical Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Skin:</strong> eczema, psoriasis, acne, boils, eruptions with burning and itching</li>
                <li><strong>Digestive:</strong> portal congestion, piles, constipation with heat and burning</li>
                <li><strong>Respiratory:</strong> chronic catarrh, morning cough, dirty tongue</li>
                <li><strong>Metabolic:</strong> gouty states, chronic liver sluggishness</li>
                <li><strong>Nervous:</strong> vertigo, faintness, mental overactivity with physical neglect</li>
              </ul>
            </CardContent>
          </Card>

          {/* Relationships */}
          <Card>
            <CardHeader>
              <CardTitle>🧩 Relationships</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Complementary</h3>
                  <p>Calcarea carb., Nux vomica, Lycopodium</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Follows Well</h3>
                  <p>Aconite, Belladonna, Hepar sulph.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Inimical / Antidoted by</h3>
                  <p>Camphor, Mercurius, Sepia</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Doctor's Clinical Notes */}
          <Card>
            <CardHeader>
              <CardTitle>🩺 Doctor's Clinical Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use Sulphur 30 or 200 as an intercurrent in obstinate chronic cases before repeating specific remedies.</li>
                <li>Excellent to "clear up" psoric soil before constitutional prescription.</li>
                <li>Avoid overuse in acute conditions; may aggravate if vitality low.</li>
                <li>When other remedies fail or lose effect, think Sulphur.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Cross-Links */}
          <Card>
            <CardHeader>
              <CardTitle>🧭 Cross-Links</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>Family Study: Oxygen Group Remedies</li>
                <li>Comparative Study: Sulphur vs Nux vomica</li>
                <li>Next Deep Dive → Nux vomica</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Sulphur;
