import { PageLayout } from '@/components/PageLayout';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NuxVomica = () => {
  return (
    <PageLayout
      title="Deep Dive: NUX VOMICA"
      description="The Driven Modern Temperament — 'Tense, irritable, overworked.'"
    >
      <div className="max-w-4xl mx-auto space-y-8">
        <Link
          to="/professional/remedy-deep-dive"
          className="inline-flex items-center gap-2 text-primary hover:underline mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Remedy Deep Dive
        </Link>

        {/* Remedy Identity */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
            🧬 Remedy Identity
          </h2>
          <div className="bg-card border border-border rounded-lg p-6 space-y-3">
            <p><strong>Source:</strong> Seeds of Strychnos nux-vomica, containing strychnine and brucine</p>
            <p><strong>Family:</strong> Loganiaceae</p>
            <p><strong>Miasmatic Affinity:</strong> Predominantly Psoric, with Syco-syphilitic undertones in chronic states</p>
            <p><strong>Polychrest:</strong> Yes — acts on nervous system, gastro-hepatic organs, and spinal reflexes</p>
          </div>
        </section>

        {/* Family Signature */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
            🌿 Family Signature and Sphere of Action
          </h2>
          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <p className="text-muted-foreground">
              The Loganiaceae family (including Ignatia, Gelsemium, Spigelia) produces remedies acting on the spinal cord and nerves, often following shock, strain, or emotional excess.
              Nux vomica stimulates and then exhausts — representing the reactive phase of irritability and collapse.
            </p>
            <div>
              <p className="font-semibold mb-2">Acts powerfully on:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li><strong>Cerebrospinal axis</strong> — hyperexcitability, spasms, sleeplessness</li>
                <li><strong>Digestive organs</strong> — hepatic congestion, gastric catarrh, dyspepsia from stimulants</li>
                <li><strong>Portal system</strong> — constipation, piles, sluggish peristalsis</li>
                <li><strong>Urogenital system</strong> — sexual excess, irritability, morning erections</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Constitution & Temperament */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
            👤 Constitution & Temperament
          </h2>
          <div className="bg-card border border-border rounded-lg p-6 space-y-3">
            <p className="text-muted-foreground italic">
              The Nux type epitomizes the urban, overdriven personality — intense, ambitious, competitive.
            </p>
            <p><strong>Build:</strong> Lean, wiry, active; face flushed, expression tense</p>
            <p><strong>Mind:</strong> Impatient, fault-finding, oversensitive to noise, light, odors</p>
            <p><strong>Temperament:</strong> Easily angered; wants perfection in all; cannot bear contradiction</p>
            <p><strong>Disposition:</strong> "Type A" executive, sedentary lifestyle, coffee–alcohol–late nights–stress loop</p>
          </div>
        </section>

        {/* Causation */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
            🧭 Causation
          </h2>
          <div className="bg-card border border-border rounded-lg p-6">
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Mental overwork, sedentary habits, excess of stimulants</li>
              <li>Drug abuse — coffee, tobacco, alcohol, allopathic purgatives</li>
              <li>Business strain, anxiety about success</li>
              <li>Suppressed anger or frustration</li>
            </ul>
          </div>
        </section>

        {/* Modalities */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
            ⚖️ Modalities
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold mb-3 text-green-600 dark:text-green-400">Better From</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Rest, warmth, nap, evening</li>
                <li>Warm coverings</li>
                <li>Moderate motion</li>
                <li>In quiet surroundings</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold mb-3 text-red-600 dark:text-red-400">Worse From</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Morning, cold, noise, light, mental exertion</li>
                <li>After eating or high living</li>
                <li>Coffee, wine, drugs, stimulants</li>
                <li>Anger, contradiction</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Keynotes */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
            🔑 Keynotes (Boger–Boericke Synthesis)
          </h2>
          <div className="bg-card border border-border rounded-lg p-6">
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Oversensitive to all impressions — noise, odors, light, touch</li>
              <li>"Wants to but cannot" — ineffectual urging for stool, urine, or sleep</li>
              <li>Irritable, quarrelsome, easily angered, then repentant</li>
              <li>Constipation with frequent urging, incomplete evacuation</li>
              <li>Headache from mental strain or after wine</li>
              <li>Morning aggravation — irritable before breakfast</li>
              <li>Sleepless from thoughts of business; awakens 3–4 a.m.</li>
            </ul>
          </div>
        </section>

        {/* Farrington's Essence */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
            💬 Farrington's Essence
          </h2>
          <div className="bg-card border border-border rounded-lg p-6">
            <blockquote className="text-lg italic text-muted-foreground border-l-4 border-primary pl-4">
              "If Sulphur burns with internal fire, Nux vomica flashes like electricity through the system."
            </blockquote>
            <p className="mt-4 text-muted-foreground">
              He describes it as a remedy of reaction and resistance — suited to those who fight life's friction until nerves and digestion rebel.
            </p>
          </div>
        </section>

        {/* Boericke's Clinical Pearls */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
            🧪 Boericke's Clinical Pearls
          </h2>
          <div className="bg-card border border-border rounded-lg p-6">
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Indispensable for drug dyspepsia, sedentary life, constipation, piles, irritability</li>
              <li>Excellent in acute gastric catarrh from excess coffee, alcohol, or spicy food</li>
              <li>Fever with chills, wants to be covered, but restless</li>
              <li>For businessmen, lawyers, students who overwork and overthink</li>
              <li>A morning aggravation remedy — waking tired, head full, irritable</li>
            </ul>
          </div>
        </section>

        {/* Boger's Synoptic Highlights */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
            🧍‍♂️ Boger's Synoptic Highlights
          </h2>
          <div className="bg-card border border-border rounded-lg p-6">
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Predominant tone: spasmodic, irritable, oversensitive</li>
              <li>Alternating states — constipation ↔ diarrhoea, drowsiness ↔ sleeplessness</li>
              <li>Modalities define the case: worse morning, better evening</li>
              <li>Suited for reactionary states after abuse — alcohol, coffee, stimulants</li>
            </ul>
          </div>
        </section>

        {/* Doctrine of Signature */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
            🌺 Doctrine of Signature
          </h2>
          <div className="bg-card border border-border rounded-lg p-6 space-y-3">
            <p className="text-muted-foreground">
              The Nux tree yields its seed from a hard, bitter kernel encased in a rigid shell, symbolizing concentrated vitality and defensive tension.
              Just as the seed resists external penetration, the Nux temperament resists interference — hard-shelled, inwardly explosive, and quick to react to any stimulus.
            </p>
            <p className="text-muted-foreground">
              Its toxic principle (strychnine) causes convulsions and hyper-reflexia — mirroring the mental and physical hypersensitivity of the Nux personality.
            </p>
          </div>
        </section>

        {/* Clinical Applications */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
            ⚕️ Clinical Applications
          </h2>
          <div className="bg-card border border-border rounded-lg p-6">
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li><strong>Gastro-hepatic:</strong> Dyspepsia, constipation, piles, flatulence after overeating or stimulants</li>
              <li><strong>Nervous:</strong> Neuralgia, insomnia, irritability, overstrain, hysteria in men</li>
              <li><strong>Respiratory:</strong> Coryza in city dwellers — alternate nostrils blocked</li>
              <li><strong>Urogenital:</strong> Impotence, seminal emissions, irritable bladder</li>
              <li><strong>Fever:</strong> Chill predominates; heat with desire to be covered; reaction sluggish</li>
              <li><strong>Detox states:</strong> After drugging, purgatives, allopathic excess</li>
            </ul>
          </div>
        </section>

        {/* Modern Clinical Insights */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
            💡 Modern Clinical Insights
          </h2>
          <div className="bg-card border border-border rounded-lg p-6">
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li><strong>Detox & lifestyle medicine:</strong> Nux vomica remains relevant for today's overstimulated, urban patient — coffee, screens, late nights, high stress, low movement.</li>
              <li><strong>Functional GI disorders:</strong> Excellent results in IBS, reflux, drug-induced gastritis.</li>
              <li><strong>Post-stimulant rebound:</strong> Useful for withdrawal irritability and digestive disturbance after stopping caffeine, nicotine, or alcohol.</li>
              <li><strong>Integrative approach:</strong> Often given as a starter remedy to "reset" reactivity before constitutional therapy — especially following suppressive medications.</li>
              <li><strong>Neurochemical parallel:</strong> Reflects a high sympathetic tone — fight/flight dominance, typical of Type A personalities.</li>
            </ul>
          </div>
        </section>

        {/* Relationships */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
            🧩 Relationships
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-card border border-border rounded-lg">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left">Complementary</th>
                  <th className="border border-border p-3 text-left">Follows Well</th>
                  <th className="border border-border p-3 text-left">Antidotes / Inimical</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3">Sulphur, Lycopodium, Sepia</td>
                  <td className="border border-border p-3">Coffea, Ignatia, Chamomilla</td>
                  <td className="border border-border p-3">Zinc, Camphor, Coffea crude</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Doctor's Clinical Notes */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
            🩺 Doctor's Clinical Notes
          </h2>
          <div className="bg-accent/50 border border-border rounded-lg p-6">
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Use Nux vomica 30 or 200 as an initial prescription in cases with modern stress and stimulant excess.</li>
              <li>Excellent "bridge remedy" between acute stress and chronic psoric treatment.</li>
              <li>Caution: Avoid in advanced inflammatory states with marked weakness; may overstimulate.</li>
              <li>Think of Nux when patient says: "Doctor, I'm exhausted but I can't stop working."</li>
            </ul>
          </div>
        </section>

        {/* Cross-Links */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
            🧭 Cross-Links
          </h2>
          <div className="bg-card border border-border rounded-lg p-6 space-y-2">
            <p>Family Study: Loganiaceae Remedies</p>
            <p>
              Comparative Study:{' '}
              <Link to="/professional/materia-medica/nux-vomica-sulphur" className="text-primary hover:underline">
                Nux vomica vs Sulphur
              </Link>
            </p>
            <p>Next Deep Dive → Pulsatilla nigricans</p>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default NuxVomica;
