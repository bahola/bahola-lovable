
import { PageLayout } from '@/components/PageLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from 'react-router-dom';

const MateriaMedica = () => {
  const remedies = [
    { name: "Bryonia alba", comparisons: "Rhus tox, Arnica, Belladonna", keynote: "Dryness, stitching pains, worse motion" },
    { name: "Rhus toxicodendron", comparisons: "Bryonia, Arnica, Calcarea", keynote: "Restlessness, stiffness, better motion" },
    { name: "Arnica montana", comparisons: "Rhus tox, Bellis perennis", keynote: "Sore, bruised, \"as if beaten\"" },
    { name: "Pulsatilla nigricans", comparisons: "Sepia, Lachesis, Natrum mur", keynote: "Mild, yielding, weepy, thirstless" },
    { name: "Sepia officinalis", comparisons: "Pulsatilla, Natrum mur, Lachesis", keynote: "Indifferent, irritable, bearing-down" },
    { name: "Natrum muriaticum", comparisons: "Pulsatilla, Sepia, Ignatia", keynote: "Reserved, grief, aversion to consolation" },
    { name: "Lachesis mutus", comparisons: "Pulsatilla, Lycopodium, Sepia", keynote: "Loquacious, left-sided, worse after sleep" },
    { name: "Lycopodium clavatum", comparisons: "Lachesis, Sulphur, Nux vomica", keynote: "Flatulence, anticipation, lack of confidence" },
    { name: "Sulphur", comparisons: "Nux vomica, Lycopodium, Calcarea", keynote: "Philosophic, burning sensations, offensive discharges" },
    { name: "Nux vomica", comparisons: "Sulphur, Ignatia, Coffea", keynote: "Irritable, oversensitive, sedentary" },
    { name: "Ignatia amara", comparisons: "Natrum mur, Nux vomica", keynote: "Contradictory, spasmodic grief, sighing" },
    { name: "Calcarea carbonica", comparisons: "Natrum mur, Lycopodium, Sulphur", keynote: "Slow, flabby, chilly, sweats on head" },
    { name: "Phosphorus", comparisons: "Arsenicum, Sulphur, Bryonia", keynote: "Open, sympathetic, thirst for cold water" },
    { name: "Arsenicum album", comparisons: "Phosphorus, Nux vomica", keynote: "Anxious, restless, fastidious, burning pains" },
    { name: "Belladonna", comparisons: "Glonoinum, Bryonia", keynote: "Sudden, violent, congestive, red face" },
    { name: "Gelsemium sempervirens", comparisons: "Baptisia, Nux vomica", keynote: "Dull, drowsy, dizzy, trembling" },
    { name: "Baptisia tinctoria", comparisons: "Gelsemium, Arnica", keynote: "Stupor, besotted look, prostration" },
    { name: "Hepar sulphuris", comparisons: "Mercurius, Silicea", keynote: "Sensitive to cold, suppuration tendency" },
    { name: "Mercurius solubilis", comparisons: "Hepar sulph, Kali bich", keynote: "Offensive discharges, salivation, bone pains" },
    { name: "Apis mellifica", comparisons: "Cantharis, Rhus tox", keynote: "Burning, stinging, oedema, thirstless" },
    { name: "Cantharis vesicatoria", comparisons: "Apis, Merc cor", keynote: "Burning with cutting pains, urinary tenesmus" },
    { name: "Causticum", comparisons: "Rhus tox, Phosphorus", keynote: "Paralytic weakness, burning, worse dry cold wind" },
    { name: "Silicea terra", comparisons: "Hepar sulph, Calcarea", keynote: "Lack of grit, suppurative tendencies, chilliness" },
    { name: "Kali carbonicum", comparisons: "Bryonia, Nux vomica", keynote: "Stitching pains, weakness, early waking" },
  ];

  const popularComparisons = [
    { name: "Bryonia vs Rhus tox", link: "/professional/materia-medica/bryonia-rhus" },
    { name: "Pulsatilla vs Sepia", link: "/professional/materia-medica/pulsatilla-sepia" },
    { name: "Lachesis vs Pulsatilla", link: "/professional/materia-medica/lachesis-pulsatilla" },
    { name: "Nux vomica vs Sulphur", link: "/professional/materia-medica/nux-vomica-sulphur" },
    { name: "Apis vs Cantharis", link: "#" },
    { name: "Phosphorus vs Arsenicum", link: "#" },
    { name: "Belladonna vs Glonoinum", link: "#" },
    { name: "Gelsemium vs Baptisia", link: "#" },
    { name: "Hepar sulph vs Mercurius", link: "#" },
    { name: "Calcarea vs Natrum mur", link: "#" },
  ];

  return (
    <PageLayout
      title="🩺 Comparative Materia Medica" 
      description="Refine your clinical differentiation."
    >
      <div className="max-w-7xl mx-auto mb-10">
        {/* Intro Section */}
        <div className="mb-12">
          <p className="text-lg text-muted-foreground mb-4">
            Explore side-by-side comparisons of similar remedies — concise, clinically relevant, and doctor-ready.
          </p>
          <p className="text-lg text-muted-foreground mb-4">
            Perfect for practice, teaching, and case correlation.
          </p>
          <p className="text-lg font-medium">
            🧩 See at a glance how similar remedies diverge in essence, modalities, and constitution.
          </p>
        </div>

        {/* Browse by Remedy Table */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">🔍 Browse by Remedy</h2>
          <p className="text-muted-foreground mb-4">(Click any remedy to open comparisons where it appears.)</p>
          
          <div className="rounded-lg border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Remedy</TableHead>
                  <TableHead className="font-semibold">Common Comparisons</TableHead>
                  <TableHead className="font-semibold">Keynote</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {remedies.map((remedy, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{remedy.name}</TableCell>
                    <TableCell>{remedy.comparisons}</TableCell>
                    <TableCell className="text-muted-foreground">{remedy.keynote}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Popular Comparisons */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">🧠 Popular Comparisons</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularComparisons.map((comparison, index) => (
              <Link
                key={index}
                to={comparison.link}
                className="p-4 rounded-lg border bg-card hover:border-primary hover:shadow-md transition-all"
              >
                <span className="font-medium">{comparison.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Subscribe Note */}
        <div className="p-6 rounded-lg bg-muted">
          <p className="text-center text-muted-foreground">
            📚 More pairs and trios are added weekly. Subscribe to updates.
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default MateriaMedica;
