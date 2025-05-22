
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
  Grief, 
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
        { name: 'Mimulus', description: 'For known fears' },
        { name: 'Aspen', description: 'For unknown fears' },
        { name: 'Red Chestnut', description: 'For worry about others' }
      ]
    },
    {
      id: 'irritability-anger',
      icon: <Angry className="h-8 w-8 text-orange-500" />,
      emoji: '😤',
      title: 'Irritability & Anger',
      description: 'Soothe frustration and balance inner tension.',
      remedies: [
        { name: 'Impatiens', description: 'For impatience' },
        { name: 'Holly', description: 'For jealousy, hatred, anger' },
        { name: 'Beech', description: 'For intolerance and criticism' }
      ]
    },
    {
      id: 'grief-sadness',
      icon: <Grief className="h-8 w-8 text-blue-500" />,
      emoji: '😢',
      title: 'Grief & Sadness',
      description: 'Gently ease sorrow and heal emotional wounds.',
      remedies: [
        { name: 'Star of Bethlehem', description: 'For shock and trauma' },
        { name: 'Sweet Chestnut', description: 'For deep anguish' },
        { name: 'Mustard', description: 'For sudden gloom without cause' }
      ]
    },
    {
      id: 'low-confidence',
      icon: <Leaf className="h-8 w-8 text-green-500" />,
      emoji: '😟',
      title: 'Low Confidence & Self-Doubt',
      description: 'Strengthen self-trust and inner belief.',
      remedies: [
        { name: 'Larch', description: 'For lack of confidence' },
        { name: 'Cerato', description: 'For self-doubt and seeking validation' },
        { name: 'Gentian', description: 'For discouragement from setbacks' }
      ]
    },
    {
      id: 'overthinking',
      icon: <Brain className="h-8 w-8 text-purple-500" />,
      emoji: '🌀',
      title: 'Overthinking & Mental Overload',
      description: 'Free your mind and restore clarity.',
      remedies: [
        { name: 'White Chestnut', description: 'For unwanted thoughts' },
        { name: 'Elm', description: 'For feeling overwhelmed' },
        { name: 'Chestnut Bud', description: 'For repeating mistakes' }
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
        { name: 'Wild Oat', description: 'For uncertainty about life direction' }
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
        { name: 'Hornbeam', description: 'For mental fatigue' },
        { name: 'Oak', description: 'For pushing beyond limits' }
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
        { name: 'Vervain', description: 'For hyper-enthusiasm' },
        { name: 'Clematis', description: 'For daydreaming and lack of focus' },
        { name: 'Chicory', description: 'For clinginess or over-possessiveness' }
      ]
    },
    {
      id: 'crisis',
      icon: <Star className="h-8 w-8 text-amber-500" />,
      emoji: '🌪️',
      title: 'Crisis & Emotional Shock',
      description: 'Emergency support when emotions spiral.',
      remedies: [
        { name: 'Rescue Remedy', description: 'A blend of 5 Bach flowers for immediate balance in crisis situations' }
      ]
    }
  ];

  return (
    <PageLayout title="Shop by Concern – Bach Flower Remedies" description="Find the perfect remedy for your emotional balance">
      <div className="max-w-4xl mx-auto">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {concerns.map((concern) => (
            <Card key={concern.id} className="border-2 hover:border-bahola-blue-400 transition-colors overflow-hidden">
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
    </PageLayout>
  );
};

export default BachFlowerConcerns;
