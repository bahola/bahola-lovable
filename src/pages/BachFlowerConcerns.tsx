
import React from 'react';
import { PageLayout } from '@/components/PageLayout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Angry, 
  Frown, // Replaced Grief with Frown which is available in lucide-react
  Flower,
  Brain,
  Star,
  Leaf,
  Circle,
  Sun,
  Moon,
  Cloud,
  CircleArrowRight
} from 'lucide-react';

const BachFlowerConcerns = () => {
  const concerns = [
    {
      id: 'anxiety-worry',
      icon: <Heart className="h-8 w-8 text-red-500" />,
      emoji: '😰',
      title: 'Anxiety & Worry',
      description: 'Find calm in chaos and restore a sense of security.',
      remedies: [
        { name: 'Mimulus', description: 'For known fears like illness or public speaking' },
        { name: 'Aspen', description: 'For vague, unknown fears or dread' },
        { name: 'Red Chestnut', description: 'For excessive worry about loved ones' },
        { name: 'Cherry Plum', description: 'For fear of losing control' },
        { name: 'Rock Rose', description: 'For panic or terror' }
      ]
    },
    {
      id: 'irritability-anger',
      icon: <Angry className="h-8 w-8 text-orange-500" />,
      emoji: '😤',
      title: 'Irritability & Anger',
      description: 'Soothe frustration and balance inner tension.',
      remedies: [
        { name: 'Impatiens', description: 'For irritability and quick temper' },
        { name: 'Holly', description: 'For jealousy, hatred, or anger' },
        { name: 'Beech', description: 'For criticism and intolerance' },
        { name: 'Vine', description: 'For domineering attitudes and need for control' }
      ]
    },
    {
      id: 'grief-sadness',
      icon: <Frown className="h-8 w-8 text-blue-500" />,
      emoji: '😢',
      title: 'Grief & Sadness',
      description: 'Gently ease sorrow and heal emotional wounds.',
      remedies: [
        { name: 'Star of Bethlehem', description: 'For shock or trauma' },
        { name: 'Sweet Chestnut', description: 'For anguish and despair' },
        { name: 'Mustard', description: 'For gloom without reason' },
        { name: 'Gentian', description: 'For discouragement after setbacks' },
        { name: 'Gorse', description: 'For hopelessness and resignation' }
      ]
    },
    {
      id: 'low-confidence',
      icon: <Leaf className="h-8 w-8 text-green-500" />,
      emoji: '😟',
      title: 'Low Confidence & Self-Doubt',
      description: 'Strengthen self-trust and inner belief.',
      remedies: [
        { name: 'Larch', description: 'For lack of confidence or fear of failure' },
        { name: 'Cerato', description: 'For self-doubt and seeking validation' },
        { name: 'Gentian', description: 'For loss of faith after setbacks' },
        { name: 'Elm', description: 'For temporary overwhelm from responsibility' }
      ]
    },
    {
      id: 'overthinking',
      icon: <Brain className="h-8 w-8 text-purple-500" />,
      emoji: '🌀',
      title: 'Overthinking & Mental Overload',
      description: 'Free your mind and restore clarity.',
      remedies: [
        { name: 'White Chestnut', description: 'For repetitive thoughts' },
        { name: 'Elm', description: 'For feeling overwhelmed' },
        { name: 'Chestnut Bud', description: 'For repeating mistakes' },
        { name: 'Hornbeam', description: 'For mental fatigue or procrastination' }
      ]
    },
    {
      id: 'indecision',
      icon: <Circle className="h-8 w-8 text-cyan-500" />,
      emoji: '😵‍💫',
      title: 'Indecision & Lack of Direction',
      description: 'Gain clarity and make confident choices.',
      remedies: [
        { name: 'Scleranthus', description: 'For indecision between two choices' },
        { name: 'Wild Oat', description: 'For uncertainty about direction in life' },
        { name: 'Cerato', description: 'For lack of trust in one\'s own judgment' }
      ]
    },
    {
      id: 'exhaustion',
      icon: <Moon className="h-8 w-8 text-indigo-500" />,
      emoji: '😩',
      title: 'Exhaustion & Burnout',
      description: 'Restore energy and emotional resilience.',
      remedies: [
        { name: 'Olive', description: 'For physical exhaustion' },
        { name: 'Hornbeam', description: 'For mental tiredness' },
        { name: 'Oak', description: 'For those who push themselves too hard' },
        { name: 'Vervain', description: 'For overzealous, tense achievers' }
      ]
    },
    {
      id: 'guilt',
      icon: <Cloud className="h-8 w-8 text-gray-500" />,
      emoji: '😬',
      title: 'Guilt & Self-Blame',
      description: 'Release emotional burdens and self-criticism.',
      remedies: [
        { name: 'Pine', description: 'For guilt and self-reproach' },
        { name: 'Crab Apple', description: 'For feelings of impurity or self-disgust' }
      ]
    },
    {
      id: 'restlessness',
      icon: <Sun className="h-8 w-8 text-yellow-500" />,
      emoji: '🤹',
      title: 'Restlessness & Inattention',
      description: 'Promote focus and emotional calm.',
      remedies: [
        { name: 'Vervain', description: 'For overenthusiasm and tension' },
        { name: 'Clematis', description: 'For daydreaming or distraction' },
        { name: 'Chicory', description: 'For over-possessiveness or clinginess' }
      ]
    },
    {
      id: 'crisis',
      icon: <Star className="h-8 w-8 text-amber-500" />,
      emoji: '🌪️',
      title: 'Crisis & Emotional Shock',
      description: 'Emergency support when emotions spiral.',
      remedies: [
        { name: 'Rescue Remedy', description: 'A blend of Rock Rose, Impatiens, Clematis, Star of Bethlehem, and Cherry Plum for rapid balance' }
      ]
    },
    {
      id: 'disengagement',
      icon: <Cloud className="h-8 w-8 text-slate-500" />,
      emoji: '🫥',
      title: 'Disengagement & Apathy',
      description: 'Reignite presence and zest for life.',
      remedies: [
        { name: 'Wild Rose', description: 'For resignation and apathy' },
        { name: 'Honeysuckle', description: 'For living in the past' },
        { name: 'Olive', description: 'For energy drained by illness or effort' },
        { name: 'Mustard', description: 'For gloom without cause' },
        { name: 'Clematis', description: 'For disconnection from the present moment' }
      ]
    },
    {
      id: 'loneliness',
      icon: <Heart className="h-8 w-8 text-pink-500" />,
      emoji: '🧍',
      title: 'Loneliness & Isolation',
      description: 'Open gentle pathways to connection.',
      remedies: [
        { name: 'Water Violet', description: 'For aloofness or reserve' },
        { name: 'Heather', description: 'For self-preoccupation and loneliness' },
        { name: 'Impatiens', description: 'For irritability that pushes others away' }
      ]
    },
    {
      id: 'oversensitivity',
      icon: <Leaf className="h-8 w-8 text-teal-500" />,
      emoji: '🛡️',
      title: 'Oversensitivity & Boundaries',
      description: 'Stay centered amid outside pressures.',
      remedies: [
        { name: 'Walnut', description: 'For change and external influence' },
        { name: 'Centaury', description: 'For difficulty asserting oneself' },
        { name: 'Agrimony', description: 'For hiding pain behind cheerfulness' },
        { name: 'Holly', description: 'For jealousy, anger, and emotional defensiveness' }
      ]
    },
    {
      id: 'despair',
      icon: <Frown className="h-8 w-8 text-gray-600" />,
      emoji: '🌫️',
      title: 'Despair & Hopelessness',
      description: 'Recover courage, dignity, and hope.',
      remedies: [
        { name: 'Gorse', description: 'For hopelessness and giving up' },
        { name: 'Sweet Chestnut', description: 'For deep despair and anguish' },
        { name: 'Oak', description: 'For those who persist beyond endurance' },
        { name: 'Pine', description: 'For guilt and self-blame' },
        { name: 'Crab Apple', description: 'For shame or self-disgust' }
      ]
    },
    {
      id: 'over-care',
      icon: <Heart className="h-8 w-8 text-rose-500" />,
      emoji: '🤲',
      title: 'Over-Care & Control',
      description: 'Serve with love, not pressure.',
      remedies: [
        { name: 'Chicory', description: 'For possessive or controlling love' },
        { name: 'Vervain', description: 'For overzealous reformers' },
        { name: 'Vine', description: 'For dominating personalities' },
        { name: 'Beech', description: 'For critical or rigid attitudes' },
        { name: 'Rock Water', description: 'For strict self-denial or inflexibility' }
      ]
    },
    {
      id: 'change-transition',
      icon: <CircleArrowRight className="h-8 w-8 text-violet-500" />,
      emoji: '🔄',
      title: 'Change & Transition',
      description: 'Adapt smoothly through life\'s turning points.',
      remedies: [
        { name: 'Walnut', description: 'For emotional protection during change' },
        { name: 'Star of Bethlehem', description: 'For healing shock or upheaval' },
        { name: 'Honeysuckle', description: 'For letting go of the past' }
      ]
    },
    {
      id: 'creativity-focus',
      icon: <Brain className="h-8 w-8 text-amber-500" />,
      emoji: '💡',
      title: 'Creativity & Focus',
      description: 'Align clarity, drive, and follow-through.',
      remedies: [
        { name: 'Clematis', description: 'For lack of focus or dreamy detachment' },
        { name: 'Vervain', description: 'For overstrain and mental excitement' },
        { name: 'Chestnut Bud', description: 'For learning from experience' },
        { name: 'Hornbeam', description: 'For mental fatigue' }
      ]
    },
    {
      id: 'sleep-rest',
      icon: <Moon className="h-8 w-8 text-indigo-600" />,
      emoji: '🌙',
      title: 'Sleep & Rest',
      description: 'Find peace and rest through emotional calm.',
      remedies: [
        { name: 'White Chestnut', description: 'For racing thoughts at night' },
        { name: 'Aspen', description: 'For fear of the unknown' },
        { name: 'Mimulus', description: 'For identifiable fears' },
        { name: 'Olive', description: 'For physical exhaustion' },
        { name: 'Star of Bethlehem', description: 'For soothing emotional wounds' }
      ]
    },
    {
      id: 'post-illness',
      icon: <Sun className="h-8 w-8 text-orange-400" />,
      emoji: '🌤️',
      title: 'Post-Illness Recovery',
      description: 'Rebuild emotional and physical strength.',
      remedies: [
        { name: 'Olive', description: 'For fatigue after illness' },
        { name: 'Hornbeam', description: 'For mental weariness' },
        { name: 'Star of Bethlehem', description: 'For trauma or shock from illness' },
        { name: 'Impatiens', description: 'For frustration with slow healing' }
      ]
    },
    {
      id: 'spiritual-growth',
      icon: <Star className="h-8 w-8 text-purple-600" />,
      emoji: '🔮',
      title: 'Spiritual Growth & Inner Peace',
      description: 'Rebalance your inner world and align with purpose.',
      remedies: [
        { name: 'Wild Oat', description: 'For uncertainty about life direction' },
        { name: 'Walnut', description: 'For transformation and letting go' },
        { name: 'Chestnut Bud', description: 'For breaking old patterns' },
        { name: 'Water Violet', description: 'For inner stillness and wisdom' }
      ]
    },
    {
      id: 'emotional-suppression',
      icon: <Heart className="h-8 w-8 text-blue-400" />,
      emoji: '🕊️',
      title: 'Emotional Suppression & Expression',
      description: 'Find safety in feeling.',
      remedies: [
        { name: 'Agrimony', description: 'For masking pain behind a smile' },
        { name: 'Water Violet', description: 'For emotional reserve' },
        { name: 'Star of Bethlehem', description: 'For frozen grief or trauma' }
      ]
    },
    {
      id: 'overall-balance',
      icon: <Flower className="h-8 w-8 text-emerald-500" />,
      emoji: '✨',
      title: 'Overall Balance',
      description: 'Harmonize emotions and rediscover equilibrium.',
      remedies: [
        { name: 'Rescue Remedy', description: 'Emergency blend for daily stress' },
        { name: 'Walnut', description: 'For life transitions' },
        { name: 'Olive', description: 'For renewal' },
        { name: 'Gentian', description: 'For optimism' }
      ]
    }
  ];

  return (
    <PageLayout title="Shop by Concern – Bach Flower Remedies" description="Find the perfect remedy for your emotional balance">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center">
            <Flower className="h-8 w-8 text-bahola-blue-500 mr-2" />
            <h1 className="text-3xl md:text-4xl font-bold text-bahola-neutral-900">Bach Flower Remedies</h1>
          </div>
          <p className="mt-4 text-lg text-bahola-neutral-600">
            Bach Flower Remedies are gentle, natural solutions to restore inner harmony and emotional well-being. 
            Browse by concern to discover what suits your current state of mind.
          </p>
        </div>

        <div className="flex gap-8 relative">
          {/* Quick Navigation Menu */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 bg-background border border-border rounded-lg p-4 max-h-[calc(100vh-7rem)] overflow-y-auto">
              <h2 className="font-semibold text-sm text-muted-foreground mb-3 uppercase tracking-wide">Quick Navigation</h2>
              <nav className="space-y-1">
                {concerns.map((concern) => (
                  <a
                    key={concern.id}
                    href={`#${concern.id}`}
                    className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-accent hover:text-accent-foreground transition-colors group"
                  >
                    <span className="text-base group-hover:scale-110 transition-transform">{concern.emoji}</span>
                    <span className="line-clamp-1">{concern.title}</span>
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {concerns.map((concern) => (
                <Card 
                  key={concern.id} 
                  id={concern.id}
                  className="border-2 hover:border-bahola-blue-400 transition-colors overflow-hidden scroll-mt-24"
                >
              <CardHeader className="bg-gradient-to-r from-bahola-blue-50 to-white pb-2">
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-2">{concern.emoji}</span>
                  {concern.icon}
                </div>
                <CardTitle className="text-xl text-bahola-neutral-800">{concern.title}</CardTitle>
                <CardDescription>{concern.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <h3 className="font-medium text-bahola-neutral-700 mb-2">Recommended Remedies:</h3>
                <ul className="space-y-2">
                  {concern.remedies.map((remedy) => (
                    <li key={remedy.name} className="flex">
                      <span className="mr-2 text-bahola-blue-500">•</span>
                      <div>
                        <span className="font-medium">{remedy.name}</span>
                        <span className="text-bahola-neutral-600"> — {remedy.description}</span>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <Link to={`/bach-flower/${concern.id}`}>
                    <Button variant="outline" className="w-full border-bahola-blue-400 text-bahola-blue-500 hover:bg-bahola-blue-50">
                      View Remedies
                      <CircleArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-bahola-blue-50 p-6 rounded-lg text-center mb-12">
          <h2 className="text-2xl font-bold text-bahola-neutral-800 mb-4">
            ✨ Embrace gentle healing
          </h2>
          <p className="text-bahola-neutral-600 mb-6">
            Each remedy is hand-picked to match a specific emotional need.
            Start your journey toward emotional harmony today.
          </p>
              <Button className="bg-bahola-blue-500 hover:bg-bahola-blue-600">
                Explore All Bach Flower Remedies
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default BachFlowerConcerns;
