import React, { useState } from 'react';
import { Heart, Wind, Clock, Sparkles, ArrowRight, Play, CheckCircle } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState('input');
  const [userState, setUserState] = useState({
    stressLevel: 3,
    energy: 3,
    timeAvailable: 20
  });
  const [recommendations, setRecommendations] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [showComplete, setShowComplete] = useState(false);

  const exerciseDatabase = [
    {
      id: 1,
      name: 'Gentle Stress Release Flow',
      type: 'Yoga',
      duration: 15,
      stressRelief: 5,
      energyRequired: 1,
      description: 'Slow, mindful movements focusing on breath and releasing tension from your body.',
      poses: [
        "Child's Pose (3 min) - Let your body melt into the mat",
        'Cat-Cow (2 min) - Gentle spine movements with breath',
        'Seated Forward Fold (3 min) - Release lower back tension',
        'Supine Twist (4 min, 2 min each side) - Wring out stress',
        'Legs Up the Wall (3 min) - Calm your nervous system'
      ],
      breathWork: 'Deep belly breathing - 4 counts in, 6 counts out',
      bestFor: 'Feeling overwhelmed, anxious, or exhausted',
      location: 'Anywhere with a mat or soft surface'
    },
    {
      id: 2,
      name: 'Calming Breath & Stretch',
      type: 'Yoga',
      duration: 10,
      stressRelief: 5,
      energyRequired: 1,
      description: 'Quick stress-relief routine when you need immediate calm.',
      poses: [
        'Easy Seat with Neck Rolls (2 min) - Release shoulder tension',
        'Seated Cat-Cow (2 min) - Mobilize spine gently',
        'Seated Side Stretch (2 min) - Open up compressed ribs',
        "Child's Pose (4 min) - Deep relaxation and grounding"
      ],
      breathWork: 'Box breathing - 4 in, 4 hold, 4 out, 4 hold',
      bestFor: 'Quick stress relief, tight schedule, high anxiety',
      location: 'Office, bedroom, living room - just need floor space'
    },
    {
      id: 3,
      name: 'Tension Release Practice',
      type: 'Yoga',
      duration: 20,
      stressRelief: 4,
      energyRequired: 2,
      description: 'Target areas where stress accumulates: neck, shoulders, hips, and lower back.',
      poses: [
        'Neck Releases (3 min) - Gentle stretches in all directions',
        'Shoulder Rolls & Arm Circles (2 min) - Release upper body',
        'Thread the Needle (4 min, 2 min each) - Deep shoulder release',
        'Pigeon Pose (6 min, 3 min each) - Release hip tension',
        'Reclined Butterfly (3 min) - Open hips, calm mind',
        'Final Relaxation (2 min) - Integration'
      ],
      breathWork: 'Progressive relaxation with breath awareness',
      bestFor: 'Physical tension from stress, desk work',
      location: 'Home, yoga studio, quiet outdoor space'
    },
    {
      id: 4,
      name: 'Core Calm Practice',
      type: 'Mat Pilates',
      duration: 15,
      stressRelief: 4,
      energyRequired: 2,
      description: 'Gentle pilates focusing on controlled breathing and core stability to quiet your mind.',
      poses: [
        'Pelvic Tilts (3 min) - Connect breath to movement',
        'Bridge Lifts (3 min) - Slow, controlled, with breath',
        'Single Leg Stretch (3 min) - Focus mind on coordination',
        'Spine Stretch Forward (3 min) - Release tension, lengthen',
        'Mermaid Stretch (3 min) - Side body opening with breath'
      ],
      breathWork: 'Pilates breath - inhale through nose, exhale with slight engagement',
      bestFor: 'Need mental focus, want to feel more in control',
      location: 'Living room, bedroom - just need a mat'
    },
    {
      id: 5,
      name: 'Restorative Pilates',
      type: 'Mat Pilates',
      duration: 20,
      stressRelief: 5,
      energyRequired: 2,
      description: 'Slow, mindful pilates emphasizing breath and gentle core work to restore balance.',
      poses: [
        'Breathing Preparation (2 min) - Establish calm foundation',
        'Chest Lift (3 min) - Gentle engagement, lots of breath',
        'Side-Lying Leg Series (6 min) - Meditative, controlled',
        'Swan Prep (3 min) - Gentle back extension',
        'Roll Downs (3 min) - Massage spine, release tension',
        "Rest Position (3 min) - Child's pose equivalent"
      ],
      breathWork: 'Extended exhales to activate parasympathetic system',
      bestFor: 'Moderate stress, want structure but gentle',
      location: 'Home, anywhere quiet with a mat'
    },
    {
      id: 6,
      name: 'Stress-Relief Walk',
      type: 'Walking',
      duration: 15,
      stressRelief: 4,
      energyRequired: 2,
      description: 'Easy-paced walk to clear your mind and reset your nervous system.',
      poses: [
        'Walk at comfortable pace (15 min total)',
        'Focus on your breath - sync steps with breathing',
        'Notice your surroundings - engage senses',
        'Let thoughts pass like clouds',
        'End with 5 deep breaths standing still'
      ],
      breathWork: '3 steps in, 3 steps out - find your natural rhythm',
      bestFor: 'Need to clear head, feeling stuck, restless energy',
      location: 'Neighborhood, park, or walk in place at home'
    },
    {
      id: 7,
      name: 'Quick Calming Walk',
      type: 'Walking',
      duration: 10,
      stressRelief: 3,
      energyRequired: 2,
      description: 'Short walk break to interrupt stress cycle.',
      poses: [
        'Walk at easy pace (8 min)',
        'Practice 4-7-8 breathing while walking',
        'Roll shoulders back every minute',
        'Finish with 2 min standing, eyes closed, deep breathing'
      ],
      breathWork: '4-7-8 breath modified for walking',
      bestFor: 'Need immediate break from stress, limited time',
      location: 'Around the block, office building, or in place at home'
    },
    {
      id: 8,
      name: 'Breath-Centered Micro Practice',
      type: 'Yoga',
      duration: 5,
      stressRelief: 3,
      energyRequired: 1,
      description: 'Ultra-quick practice when you have almost no time but need immediate relief.',
      poses: [
        'Seated position of choice (1 min) - Get settled',
        'Box breathing (2 min) - 4-4-4-4 pattern',
        'Gentle neck stretches (1 min) - Release immediate tension',
        'Hands on heart and belly (1 min) - Self-compassion'
      ],
      breathWork: 'Box breathing to quickly regulate nervous system',
      bestFor: 'Emergency stress relief, between meetings',
      location: 'Literally anywhere - desk, car, bathroom, bedroom'
    }
  ];

  const getRecommendations = () => {
    const { stressLevel, energy, timeAvailable } = userState;
    
    const scored = exerciseDatabase.map(exercise => {
      let score = 0;
      
      if (stressLevel >= 4) {
        score += exercise.stressRelief * 3;
      } else {
        score += exercise.stressRelief * 2;
      }
      
      const energyDiff = Math.abs(exercise.energyRequired - energy);
      score += (3 - energyDiff) * 2;
      
      if (exercise.duration <= timeAvailable) {
        score += 8;
      } else if (exercise.duration <= timeAvailable + 5) {
        score += 4;
      } else {
        score -= 5;
      }
      
      if (energy <= 2 && stressLevel >= 4) {
        if (exercise.energyRequired === 1) score += 5;
      }
      
      return { ...exercise, score };
    });
    
    const top3 = scored.sort((a, b) => b.score - a.score).slice(0, 3);
    setRecommendations(top3);
    setCurrentView('recommendations');
  };

  const getInsight = () => {
    const { stressLevel, energy, timeAvailable } = userState;
    
    if (stressLevel >= 5 && energy <= 2) {
      return "You're very stressed and low on energy. I've selected the gentlest, most restorative practices that will help you feel safe and calm without requiring much effort.";
    } else if (stressLevel >= 4 && timeAvailable <= 10) {
      return "High stress + limited time = quick relief needed. These short practices are designed to interrupt your stress response fast.";
    } else if (stressLevel >= 4) {
      return "Your stress level is high. These practices specifically target nervous system regulation through breath, gentle movement, and grounding.";
    } else if (energy <= 2) {
      return "Low energy today. These gentle movements will help release tension without depleting you further.";
    } else if (stressLevel <= 2) {
      return "Your stress is manageable right now. These practices will help maintain your calm state.";
    } else {
      return "Moderate stress detected. These practices will help you process what you're feeling and return to a calmer baseline.";
    }
  };

  const startPractice = (exercise) => {
    setSelectedExercise(exercise);
  };

  const completePractice = () => {
    setShowComplete(true);
    setTimeout(() => {
      setShowComplete(false);
      setSelectedExercise(null);
      setCurrentView('input');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Wind className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-800">Movelief</h1>
          </div>
          <p className="text-gray-600">Move your body, relieve your mind</p>
        </div>

        {!selectedExercise && currentView === 'input' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">How are you feeling right now?</h2>
            
            <div className="space-y-8">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="flex items-center gap-2 text-gray-700 font-medium">
                    <Heart className="w-5 h-5 text-red-500" />
                    Stress Level
                  </label>
                  <span className="text-2xl font-bold text-indigo-600">{userState.stressLevel}/5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={userState.stressLevel}
                  onChange={(e) => setUserState({ ...userState, stressLevel: parseInt(e.target.value) })}
                  className="w-full h-3 bg-gradient-to-r from-green-200 via-yellow-200 to-red-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Calm</span>
                  <span>Very Stressed</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="flex items-center gap-2 text-gray-700 font-medium">
                    <Sparkles className="w-5 h-5 text-yellow-500" />
                    Energy Level
                  </label>
                  <span className="text-2xl font-bold text-indigo-600">{userState.energy}/5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={userState.energy}
                  onChange={(e) => setUserState({ ...userState, energy: parseInt(e.target.value) })}
                  className="w-full h-3 bg-gradient-to-r from-red-200 via-yellow-200 to-green-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Exhausted</span>
                  <span>Energized</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="flex items-center gap-2 text-gray-700 font-medium">
                    <Clock className="w-5 h-5 text-blue-500" />
                    Time Available
                  </label>
                  <span className="text-2xl font-bold text-indigo-600">{userState.timeAvailable} min</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="30"
                  step="5"
                  value={userState.timeAvailable}
                  onChange={(e) => setUserState({ ...userState, timeAvailable: parseInt(e.target.value) })}
                  className="w-full h-3 bg-gradient-to-r from-yellow-200 to-blue-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>5 min</span>
                  <span>30 min</span>
                </div>
              </div>
            </div>

            <button
              onClick={getRecommendations}
              className="w-full mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl p-4 font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              Find My Practice
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {!selectedExercise && currentView === 'recommendations' && (
          <>
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg p-6 mb-6 text-white">
              <div className="flex items-start gap-3">
                <Wind className="w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Personalized for You</h3>
                  <p className="text-indigo-100">{getInsight()}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              {recommendations.map((exercise, index) => (
                <div key={exercise.id} className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {index === 0 && (
                          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold">
                            BEST MATCH
                          </span>
                        )}
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                          {exercise.type}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-1">{exercise.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{exercise.description}</p>
                      <p className="text-sm text-indigo-600 font-medium">→ {exercise.bestFor}</p>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-3xl font-bold text-indigo-600">{exercise.duration}</div>
                      <div className="text-xs text-gray-500">minutes</div>
                    </div>
                  </div>

                  <div className="bg-indigo-50 rounded-xl p-4 mb-4">
                    <p className="text-sm font-medium text-indigo-900 mb-2">📍 {exercise.location}</p>
                    <p className="text-sm text-indigo-700">🌬️ {exercise.breathWork}</p>
                  </div>

                  <button
                    onClick={() => startPractice(exercise)}
                    className="w-full bg-indigo-600 text-white rounded-lg p-3 font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Play className="w-4 h-4" />
                    Start This Practice
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => setCurrentView('input')}
              className="w-full bg-white text-indigo-600 border-2 border-indigo-600 rounded-xl p-4 font-semibold hover:bg-indigo-50 transition-colors"
            >
              Change My Settings
            </button>
          </>
        )}

        {selectedExercise && !showComplete && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-2 inline-block">
                  {selectedExercise.type}
                </span>
                <h2 className="text-2xl font-bold text-gray-800">{selectedExercise.name}</h2>
                <p className="text-gray-600 mt-1">{selectedExercise.duration} minutes</p>
              </div>
            </div>

            <div className="space-y-6 mb-8">
              <div className="bg-indigo-50 rounded-xl p-6">
                <h3 className="font-semibold text-indigo-900 mb-3 flex items-center gap-2">
                  <Wind className="w-5 h-5" />
                  Breathing Technique
                </h3>
                <p className="text-indigo-800">{selectedExercise.breathWork}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Practice Sequence:</h3>
                <div className="space-y-3">
                  {selectedExercise.poses.map((pose, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                        {idx + 1}
                      </div>
                      <p className="text-gray-700 pt-1">{pose}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded">
                <p className="text-sm text-green-800">
                  <strong>Remember:</strong> This is about releasing stress, not perfecting poses. 
                  Listen to your body, breathe deeply, and be gentle with yourself.
                </p>
              </div>
            </div>

            <button
              onClick={completePractice}
              className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl p-4 font-semibold hover:from-green-700 hover:to-teal-700 transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              I've Completed This Practice
            </button>
          </div>
        )}

        {showComplete && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Beautiful Work 💙</h3>
              <p className="text-gray-600">
                You moved your body and relieved your mind. Notice how you feel now compared to before.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
