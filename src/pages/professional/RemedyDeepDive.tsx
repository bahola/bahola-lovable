import { PageLayout } from '@/components/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Target, Clock } from 'lucide-react';

const featuredRemedies = [
  { no: 1, remedy: "Sulphur", icon: "🔥", theme: "The King of Antipsorics", highlights: "Chronic psora, venous stasis, philosophical mind, neglect of appearance" },
  { no: 2, remedy: "Nux vomica", icon: "⚡", theme: "The Driven Modern Temperament", highlights: "Business strain, stimulants, irritability, dyspepsia, overwork" },
  { no: 3, remedy: "Pulsatilla nigricans", icon: "💧", theme: "The Gentle Adaptor", highlights: "Mucous catarrhs, hormonal change, yielding nature, thirstlessness" },
  { no: 4, remedy: "Lycopodium clavatum", icon: "🌿", theme: "The Anticipatory Intellectual", highlights: "Right-sided complaints, low confidence, gas, hepatic and urinary tension" },
  { no: 5, remedy: "Arsenicum album", icon: "❄️", theme: "The Restless Perfectionist", highlights: "Anxiety, chilliness, burning pains, meticulousness" },
  { no: 6, remedy: "Calcarea carbonica", icon: "🪶", theme: "The Solid Builder", highlights: "Slow development, fatigue, glandular swellings, bone health" },
  { no: 7, remedy: "Phosphorus", icon: "✨", theme: "The Radiant Sensitivity", highlights: "Nervous exhaustion, bleeding tendency, desire for company" },
  { no: 8, remedy: "Natrum muriaticum", icon: "💎", theme: "The Silent Griever", highlights: "Reserved emotions, headaches, chronic malaria, emaciation" },
  { no: 9, remedy: "Belladonna", icon: "🌡️", theme: "The Fiery Acute", highlights: "Sudden onset, congestion, violence, delirium, fever" },
  { no: 10, remedy: "Rhus toxicodendron", icon: "🌧️", theme: "The Mover in Motion", highlights: "Rheumatism, sprains, eruptions, better from motion" }
];

const seriesFeatures = [
  "Family & Sphere of Action (botanical/mineral signature)",
  "Constitution & Temperament",
  "Modalities & Causations",
  "Farrington's Comparative Hints",
  "Boger's Keynotes & Synoptic Essence",
  "Boericke's Clinical Pearls",
  "Doctor's Commentary & Case References",
  "Relationships and Complementaries"
];

const usagePoints = [
  "Use for case differentiation and remedy essence recall",
  "Ideal for seminars, repertory integration, and advanced materia medica discussions",
  "Each page cross-links to Comparative Materia Medica and Family Overview"
];

const comingSoon = [
  "Deep Dives into Ignatia, Sepia, Bryonia, Hepar sulphuris, and Aurum metallicum",
  "Integrated audio lectures and PDF downloads for each remedy"
];

const RemedyDeepDive = () => {
  return (
    <PageLayout 
      title="🧠 Deep Dive Materia Medica" 
      description="Explore the inner world of our greatest remedies — one at a time."
    >
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardDescription className="text-base leading-relaxed">
                Go beyond keynotes and symptoms. The Deep Dive Series is designed for the professional homeopath who wishes to study the constitutional depth, pathophysiological affinities, and remedy essence that define classical materia medica.
              </CardDescription>
              <CardDescription className="text-base leading-relaxed mt-4">
                Each article synthesizes insights from <span className="font-semibold">Farrington's Lectures</span>, <span className="font-semibold">Boger's Synoptic Key</span>, and <span className="font-semibold">Boericke's Clinical Materia Medica</span>, with modern clinical perspectives and remedy relationships.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Featured Remedies */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">🔍 Featured Remedies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-border">
                      <th className="text-left py-3 px-4 font-semibold">No.</th>
                      <th className="text-left py-3 px-4 font-semibold">Remedy</th>
                      <th className="text-left py-3 px-4 font-semibold">Theme</th>
                      <th className="text-left py-3 px-4 font-semibold">Highlights</th>
                    </tr>
                  </thead>
                  <tbody>
                    {featuredRemedies.map((item) => (
                      <tr key={item.no} className="border-b border-border hover:bg-muted/50 transition-colors">
                        <td className="py-3 px-4">{item.no}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{item.icon}</span>
                            <span className="font-medium">{item.remedy}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 font-medium text-primary">{item.theme}</td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">{item.highlights}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* About the Series */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                🩺 About the Series
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">Each remedy page includes:</p>
              <ul className="space-y-2">
                {seriesFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* How to Use */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                💡 How to Use
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 font-medium">Designed for clinicians and postgraduate students:</p>
              <ul className="space-y-2">
                {usagePoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Coming Soon */}
          <Card className="border-2 border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                📚 Coming Soon
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {comingSoon.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

        </div>
      </PageLayout>
  );
};

export default RemedyDeepDive;
