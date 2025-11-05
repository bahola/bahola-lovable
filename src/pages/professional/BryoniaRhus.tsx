import { PageLayout } from '@/components/PageLayout';
import { ProtectedDoctorRoute } from '@/components/auth/ProtectedDoctorRoute';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const BryoniaRhus = () => {
  return (
    <ProtectedDoctorRoute>
      <PageLayout 
        title="Bryonia alba vs Rhus toxicodendron" 
        description="Comprehensive comparative materia medica analysis"
      >
        <div className="max-w-6xl mx-auto mb-10">
          <Link 
            to="/professional/materia-medica" 
            className="inline-flex items-center text-bahola-blue-600 hover:text-bahola-blue-700 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Materia Medica
          </Link>

          {/* Family Comparison */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">🌿 Family Comparison: Cucurbitaceae vs Anacardiaceae</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-bahola-blue-50">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Botanical Family</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Representative Remedy</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Core Traits</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Typical Sphere of Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">Cucurbitaceae (Gourd family)</td>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Bryonia alba</td>
                      <td className="border border-gray-300 px-4 py-3">Produces dryness, hardness, stitching pains, and aggravation from movement. Tissues feel inflamed yet dry.</td>
                      <td className="border border-gray-300 px-4 py-3">Serous membranes (pleura, peritoneum), synovial joints, mucous membranes.</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">Anacardiaceae (Cashew family)</td>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Rhus toxicodendron</td>
                      <td className="border border-gray-300 px-4 py-3">Causes restlessness, stiffness, and vesicular eruptions; marked aggravation from damp, cold, rest.</td>
                      <td className="border border-gray-300 px-4 py-3">Fibrous tissues, ligaments, muscles, skin (vesicular eruptions).</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="font-semibold mb-2">🌱 Family Insight:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Cucurbitaceae</strong> expresses inflammation with dry, sharp pain and desire for immobility.</li>
                  <li><strong>Anacardiaceae</strong> expresses inflammation with restlessness, stiffness, and need for motion to relieve discomfort.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Main Comparison */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">🩺 Comparative Materia Medica: Bryonia alba vs Rhus toxicodendron</CardTitle>
              <p className="text-muted-foreground mt-2"><strong>Common Sphere:</strong> Rheumatism, pleurisy, influenza, sprains, fever with body ache, joint and muscular pains.</p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-bahola-blue-50">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold w-1/4">Feature</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Bryonia alba</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Rhus toxicodendron</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Constitution / Temperament</td>
                      <td className="border border-gray-300 px-4 py-3">Chilly, robust, dark-haired, dry constitutions. Business-minded, irritable when disturbed.</td>
                      <td className="border border-gray-300 px-4 py-3">Nervous, restless, rheumatic constitutions. Sensitive to damp and cold weather.</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Mind / Emotion</td>
                      <td className="border border-gray-300 px-4 py-3">Wants to be left alone; dislikes being disturbed. Irritable, taciturn, answers shortly. Anxiety about business or future.</td>
                      <td className="border border-gray-300 px-4 py-3">Restless, anxious, cannot stay still. Fear of being poisoned or of impending illness. Irritable when pain compels rest.</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Modalities</td>
                      <td className="border border-gray-300 px-4 py-3">
                        <div className="space-y-2">
                          <div><span className="font-semibold">🔺 Aggravation:</span> slightest motion, touch, heat, after eating, morning.</div>
                          <div><span className="font-semibold">🔻 Amelioration:</span> absolute rest, pressure, lying on painful side, cool air, cold applications.</div>
                        </div>
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        <div className="space-y-2">
                          <div><span className="font-semibold">🔺 Aggravation:</span> rest, first motion, damp cold weather, getting wet, night.</div>
                          <div><span className="font-semibold">🔻 Amelioration:</span> continued motion, warmth, hot bath, dry weather.</div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Key Physical Symptoms</td>
                      <td className="border border-gray-300 px-4 py-3">Stitching, tearing, bursting pains; every motion increases pain. Dryness of mucous membranes. Lips and tongue dry and cracked. Constipation — stool hard, dry, like burnt clay.</td>
                      <td className="border border-gray-300 px-4 py-3">Tearing, drawing, bruised pains with stiffness and restlessness. Pain worse on first movement, better as motion continues. Tongue red at tip with triangular shape. Diarrhoea from cold drinks or wet exposure.</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Sleep / Sweat / Discharges</td>
                      <td className="border border-gray-300 px-4 py-3">Sleepless from business worries or physical pain. Profuse sour sweat during sleep.</td>
                      <td className="border border-gray-300 px-4 py-3">Restless sleep; tossing about. Sweat relieves pain and fever. Offensive perspiration with body odor.</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Tongue / Mouth</td>
                      <td className="border border-gray-300 px-4 py-3">White-coated, dry tongue; thirst for large quantities of cold water.</td>
                      <td className="border border-gray-300 px-4 py-3">Red tip, triangular patch, thirst for small quantities, dry mouth but desires milk.</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Skin / Fever</td>
                      <td className="border border-gray-300 px-4 py-3">Dry, hot, burning skin; prefers to lie quietly, covers well.</td>
                      <td className="border border-gray-300 px-4 py-3">Itching vesicles, burning, better hot applications. Fever with restlessness and body ache.</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Clinical Focus</td>
                      <td className="border border-gray-300 px-4 py-3">Rheumatism, pleurisy, peritonitis, typhoid with dryness, constipation, irritability.</td>
                      <td className="border border-gray-300 px-4 py-3">Rheumatism, influenza, sprains, muscle strain, fevers with restlessness.</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Differentiating Clincher</td>
                      <td className="border border-gray-300 px-4 py-3 bg-yellow-50"><strong>Pain worse by slightest movement, better by rest.</strong></td>
                      <td className="border border-gray-300 px-4 py-3 bg-yellow-50"><strong>Pain worse on rest, better by motion.</strong></td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Complementary / Inimical Remedies</td>
                      <td className="border border-gray-300 px-4 py-3">
                        <div><strong>Complementary:</strong> Alumina, Nux vomica.</div>
                        <div><strong>Inimical:</strong> Rhus tox.</div>
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        <div><strong>Complementary:</strong> Bryonia (in alternation sometimes useful), Calcarea, Arnica.</div>
                        <div><strong>Inimical:</strong> Apis.</div>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Biochemic Complement</td>
                      <td className="border border-gray-300 px-4 py-3">Ferrum phos 6X (for inflammation)</td>
                      <td className="border border-gray-300 px-4 py-3">Kali phos 6X (for muscular strain and recovery)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <p className="font-semibold mb-2">💡 Clinical Tip:</p>
                <p>In rheumatic or febrile pains — if the patient <strong>lies absolutely still fearing the pain from movement</strong> → <strong>Bryonia</strong>.</p>
                <p>If the patient <strong>keeps shifting and moving for relief</strong> → <strong>Rhus tox</strong>.</p>
              </div>
            </CardContent>
          </Card>

          {/* Trio Comparison */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">⚖️ Trio Comparison: Bryonia – Rhus tox – Arnica montana</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-bahola-blue-50">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Feature</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Bryonia alba</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Rhus toxicodendron</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Arnica montana</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Motion Effect</td>
                      <td className="border border-gray-300 px-4 py-3">Worse by motion, better rest</td>
                      <td className="border border-gray-300 px-4 py-3">Worse on rest, better motion</td>
                      <td className="border border-gray-300 px-4 py-3">Worse by touch or motion, but feels as if bed is too hard</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Pain Character</td>
                      <td className="border border-gray-300 px-4 py-3">Sharp, stitching, tearing</td>
                      <td className="border border-gray-300 px-4 py-3">Bruised, tearing, stiffness</td>
                      <td className="border border-gray-300 px-4 py-3">Sore, bruised, "as if beaten"</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Onset / Cause</td>
                      <td className="border border-gray-300 px-4 py-3">Gradual, from exposure to cold & dryness</td>
                      <td className="border border-gray-300 px-4 py-3">From damp cold, strain, over-exertion</td>
                      <td className="border border-gray-300 px-4 py-3">From trauma, blows, falls</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Mental State</td>
                      <td className="border border-gray-300 px-4 py-3">Quiet, irritable, wants to be left alone</td>
                      <td className="border border-gray-300 px-4 py-3">Restless, anxious</td>
                      <td className="border border-gray-300 px-4 py-3">Says "nothing ails me," denies injury</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Modalities</td>
                      <td className="border border-gray-300 px-4 py-3">Worse slightest motion</td>
                      <td className="border border-gray-300 px-4 py-3">Worse first motion</td>
                      <td className="border border-gray-300 px-4 py-3">Worse touch, motion</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Sphere</td>
                      <td className="border border-gray-300 px-4 py-3">Serous membranes</td>
                      <td className="border border-gray-300 px-4 py-3">Fibrous tissues, joints</td>
                      <td className="border border-gray-300 px-4 py-3">Muscles, capillaries, trauma sites</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                <p className="font-semibold mb-2">🧩 Triad Tip:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Think <strong>Bryonia</strong> when pain = sharp + motion aggravates.</li>
                  <li>Think <strong>Rhus tox</strong> when pain = stiff + motion relieves.</li>
                  <li>Think <strong>Arnica</strong> when pain = bruised + touch aggravates.</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    </ProtectedDoctorRoute>
  );
};

export default BryoniaRhus;
