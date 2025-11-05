import { PageLayout } from '@/components/PageLayout';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Pulsatilla = () => {
  return (
    <PageLayout
      title="Deep Dive: PULSATILLA NIGRICANS"
      description="The Gentle Adaptor — 'Changeable mind, changeable body.'"
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
            <p><strong>Source:</strong> Anemone pulsatilla (Pasque flower)</p>
            <p><strong>Family:</strong> Ranunculaceae</p>
            <p><strong>Miasmatic Affinity:</strong> Psoric, with mild sycotic influence</p>
            <p><strong>Polychrest:</strong> Yes — acts on hormonal, venous, and mucous systems, with marked action on digestive, respiratory, and genital organs</p>
          </div>
        </section>

        {/* Family Signature */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
            🌿 Family Signature and Sphere of Action
          </h2>
          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <p className="text-muted-foreground">
              The Ranunculaceae family produces remedies of nervous irritability, hypersensitivity, and suppressed emotion (Aconite, Clematis, Ranunculus, Pulsatilla).
              Pulsatilla's keynote is variability — of circulation, mood, and discharge.
            </p>
            <div>
              <p className="font-semibold mb-2">Acts chiefly on:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li><strong>Venous system:</strong> Passive congestion, sluggish return, varicosities</li>
                <li><strong>Mucous membranes:</strong> Thick, bland, yellow-green discharges</li>
                <li><strong>Hormonal balance:</strong> Menstrual irregularities, puberty, menopause</li>
                <li><strong>Digestive tract:</strong> Rich food intolerance, desire for fats and pastry but aversion after eating</li>
                <li><strong>Respiratory tract:</strong> Catarrhal, changeable, bland secretions</li>
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
              The Pulsatilla type represents the soft, yielding, affectionate temperament — gentle yet needy.
            </p>
            <p><strong>Build:</strong> Fair, light hair, blue eyes, soft tissues, easily flushed</p>
            <p><strong>Mind:</strong> Mild, tearful, seeks sympathy and reassurance</p>
            <p><strong>Temperament:</strong> Timid, conscientious, emotional, religious, dependent</p>
            <p><strong>Disposition:</strong> Changes opinion quickly, fears abandonment, avoids confrontation</p>
            <p><strong>Children:</strong> Cry easily, clingy, shy with strangers</p>
          </div>
        </section>

        {/* Causation */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
            🧭 Causation
          </h2>
          <div className="bg-card border border-border rounded-lg p-6">
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Suppressed menses, grief, loss of love, or disappointment</li>
              <li>Fatty, rich, indigestible food</li>
              <li>Hormonal disturbances — puberty, pregnancy, menopause</li>
              <li>Getting wet feet, exposure to cold air</li>
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
                <li>Open, cool air</li>
                <li>Gentle motion, slow walking</li>
                <li>Consolation, sympathy</li>
                <li>Rest</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold mb-3 text-red-600 dark:text-red-400">Worse From</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Heat, warm room</li>
                <li>Lying on painful side</li>
                <li>Fatty food, evening, after eating</li>
                <li>Neglect, solitude, closed space</li>
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
              <li>Mild, timid, tearful disposition — "Weeps easily, feels better for sympathy."</li>
              <li>Thirstless with dry mouth; dislikes fatty foods</li>
              <li>Changeable symptoms — no two days alike</li>
              <li>Thick, bland, yellow-green discharges (nasal, vaginal, ocular)</li>
              <li>Menses delayed, scanty, or suppressed from chill or emotion</li>
              <li>Varicose veins, chilliness with one-sided flushes</li>
              <li>Better in open air, worse in warm closed rooms</li>
              <li>Children cry easily and cling to mother</li>
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
              "Pulsatilla is the antithesis of Nux vomica — yielding where Nux resists, soft where Nux is hard, weeping where Nux is irritable."
            </blockquote>
            <p className="mt-4 text-muted-foreground">
              Farrington places Pulsatilla as the emblem of adaptability and emotional circulation, noting its ability to restore balance to systems deranged by alternating conditions — whether in mind, hormones, or circulation.
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
              <li>Excellent in female complaints — delayed or suppressed menses, dysmenorrhoea, menopausal flushes</li>
              <li>Digestive — flatulent dyspepsia after rich or fatty foods</li>
              <li>Respiratory — bland coryza, thick yellow discharge, loss of taste/smell</li>
              <li>Varicose veins, phlebitis, venous congestion</li>
              <li>Otitis media with thick, bland discharge, worse at night</li>
              <li>Characteristically mild disposition — key to selection</li>
            </ul>
          </div>
        </section>

        {/* Boger's Synoptic Highlights */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
            🧍‍♀️ Boger's Synoptic Highlights
          </h2>
          <div className="bg-card border border-border rounded-lg p-6">
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Changeability is the master-key: shifting pains, symptoms, moods</li>
              <li>Acts on mucous membranes and veins</li>
              <li>Thirstlessness, desire for open air, soft temperament define the totality</li>
              <li>A remedy for blonde, lymphatic, emotional constitutions</li>
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
              The Pasque flower bends and sways in the wind — soft, yielding, and easily moved — symbolizing the emotional pliancy and sensitivity of the Pulsatilla temperament.
              Its silky, down-covered blossoms suggest softness, delicacy, and tenderness; its sap irritates the skin, reflecting the inner sensitivity hidden beneath gentleness.
              Thus, Pulsatilla embodies change, adaptability, and emotion, both in plant and patient.
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
              <li><strong>Reproductive system:</strong> Delayed, scanty, or absent menses; PMS with weeping; dysmenorrhoea relieved by flow; menopause with mood swings</li>
              <li><strong>Digestive:</strong> Indigestion from rich food, no thirst, sensation of fullness after small meals</li>
              <li><strong>Respiratory:</strong> Chronic catarrh, otitis media, sinusitis with thick bland discharge</li>
              <li><strong>Circulatory:</strong> Varicose veins, venous stasis, cold extremities</li>
              <li><strong>Psychological:</strong> Emotional dependency, sadness, insecurity, mood changes</li>
              <li><strong>Pediatrics:</strong> Clingy, gentle, affectionate children who cry easily</li>
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
              <li><strong>Hormonal balance:</strong> Pulsatilla remains vital in PMS, puberty, PCOS, and menopausal transition where emotions fluctuate alongside physical symptoms.</li>
              <li><strong>Psychoneuroendocrine correlation:</strong> Reflects estrogen dominance with emotional sensitivity; mind-body oscillation mirrors hormonal tides.</li>
              <li><strong>Gastroenterology:</strong> Works beautifully for functional dyspepsia with bloating and intolerance to fats.</li>
              <li><strong>Psychotherapy parallel:</strong> Often resonates with attachment-based anxiety — patients who seek reassurance and fear abandonment.</li>
              <li><strong>Modern phenotype:</strong> The over-adapted, emotionally intuitive woman (or man) who loses self-direction while trying to please others.</li>
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
                  <td className="border border-border p-3">Silicea, Sepia, Sulphur</td>
                  <td className="border border-border p-3">Chamomilla, Nux vomica</td>
                  <td className="border border-border p-3">Ferrum, Sulphuric acid, Lachesis (occasionally inimical)</td>
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
              <li>In chronic female cases, use Pulsatilla 30 or 200; avoid low potencies if marked venous congestion.</li>
              <li>Excellent intercurrent in cases where mental symptoms dominate over physicals.</li>
              <li>Thirstless yet chilly is a reliable keynote.</li>
              <li>Compare: Sepia (independent, indifferent) vs. Pulsatilla (dependent, affectionate).</li>
            </ul>
          </div>
        </section>

        {/* Cross-Links */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
            🧭 Cross-Links
          </h2>
          <div className="bg-card border border-border rounded-lg p-6 space-y-2">
            <p>Family Study: Ranunculaceae Remedies</p>
            <p>
              Comparative Study:{' '}
              <Link to="/professional/materia-medica/pulsatilla-sepia" className="text-primary hover:underline">
                Pulsatilla vs Sepia
              </Link>
            </p>
            <p>Next Deep Dive → Lycopodium clavatum</p>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default Pulsatilla;
