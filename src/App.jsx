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
      name: '溫和釋壓流動',
      type: '瑜伽',
      duration: 15,
      stressRelief: 5,
      energyRequired: 1,
      description: '緩慢、專注的動作，配合呼吸，釋放身體的緊繃。',
      poses: [
        '嬰兒式（3分鐘）- 讓身體融入墊子',
        '貓牛式（2分鐘）- 溫和的脊椎律動配合呼吸',
        '坐姿前彎（3分鐘）- 釋放下背緊繃',
        '仰臥扭轉（4分鐘，每側2分鐘）- 擰出壓力',
        '靠牆抬腿（3分鐘）- 平靜神經系統'
      ],
      breathWork: '深層腹式呼吸 - 吸氣4拍，吐氣6拍',
      bestFor: '感到不堪負荷、焦慮或疲憊時',
      location: '任何有墊子或柔軟表面的地方'
    },
    {
      id: 2,
      name: '平靜呼吸伸展',
      type: '瑜伽',
      duration: 10,
      stressRelief: 5,
      energyRequired: 1,
      description: '需要立即平靜時的快速釋壓練習，可在小空間進行。',
      poses: [
        '簡易坐姿配合頸部轉動（2分鐘）- 釋放肩膀緊繃',
        '坐姿貓牛式（2分鐘）- 溫和活動脊椎',
        '坐姿側彎（2分鐘）- 打開被壓迫的肋骨',
        '嬰兒式（4分鐘）- 深度放鬆與扎根'
      ],
      breathWork: '方塊呼吸 - 吸4、閉4、吐4、閉4',
      bestFor: '快速釋壓、時間緊迫、高度焦慮',
      location: '辦公室、臥室、客廳 - 只需要地板空間'
    },
    {
      id: 3,
      name: '緊繃釋放練習',
      type: '瑜伽',
      duration: 20,
      stressRelief: 4,
      energyRequired: 2,
      description: '針對壓力累積的部位：頸部、肩膀、髖部和下背。',
      poses: [
        '頸部釋放（3分鐘）- 各方向溫和伸展',
        '肩膀轉動與手臂畫圈（2分鐘）- 釋放上半身',
        '穿針引線式（4分鐘，每側2分鐘）- 深度肩膀釋放',
        '鴿式（6分鐘，每側3分鐘）- 釋放髖部緊繃',
        '仰臥蝴蝶式（3分鐘）- 打開髖部，平靜心靈',
        '最後放鬆（2分鐘）- 整合'
      ],
      breathWork: '漸進式放鬆配合呼吸覺察',
      bestFor: '壓力造成的身體緊繃、久坐辦公',
      location: '家中、瑜伽教室、安靜的戶外空間'
    },
    {
      id: 4,
      name: '扎根流動',
      type: '瑜伽',
      duration: 25,
      stressRelief: 4,
      energyRequired: 3,
      description: '緩慢、刻意的動作，讓你回到身體、離開焦慮的思緒。',
      poses: [
        '山式配合呼吸（2分鐘）- 找到你的中心',
        '站立前彎（3分鐘）- 釋放奔馳的思緒',
        '低弓步變化式（6分鐘，每側3分鐘）- 透過雙腿扎根',
        '戰士二式保持（4分鐘，每側2分鐘）- 建立內在力量',
        '寬腿前彎（3分鐘）- 平靜神經系統',
        '坐姿冥想（4分鐘）- 觀察更平靜的狀態',
        '大休息（3分鐘）- 完整整合'
      ],
      breathWork: '烏佳伊呼吸（海洋呼吸）專注與平靜',
      bestFor: '感到散亂、失連、思緒奔馳',
      location: '任何可以完全伸展的地方 - 客廳就很適合'
    },
    {
      id: 5,
      name: '核心平靜練習',
      type: '墊上皮拉提斯',
      duration: 15,
      stressRelief: 4,
      energyRequired: 2,
      description: '溫和的皮拉提斯，專注於控制呼吸和核心穩定來平靜心智。',
      poses: [
        '骨盆傾斜（3分鐘）- 連結呼吸與動作',
        '橋式（3分鐘）- 緩慢、控制、配合呼吸',
        '單腿伸展（3分鐘）- 專注於協調',
        '脊椎向前伸展（3分鐘）- 釋放緊繃、延展',
        '美人魚伸展（3分鐘）- 側身打開配合呼吸'
      ],
      breathWork: '皮拉提斯呼吸 - 鼻吸、輕微收縮吐氣',
      bestFor: '需要心智專注、想要更有掌控感',
      location: '客廳、臥室 - 只需要墊子'
    },
    {
      id: 6,
      name: '修復性皮拉提斯',
      type: '墊上皮拉提斯',
      duration: 20,
      stressRelief: 5,
      energyRequired: 2,
      description: '緩慢、專注的皮拉提斯，強調呼吸和溫和的核心運動來恢復平衡。',
      poses: [
        '呼吸準備（2分鐘）- 建立平靜基礎',
        '胸部提升（3分鐘）- 溫和收縮，大量呼吸',
        '側臥腿部系列（6分鐘）- 冥想式、控制',
        '天鵝準備式（3分鐘）- 溫和背部伸展',
        '滾動下降（3分鐘）- 按摩脊椎、釋放緊繃',
        '休息姿勢（3分鐘）- 相當於嬰兒式、完全休息'
      ],
      breathWork: '延長吐氣來啟動副交感神經系統',
      bestFor: '中度壓力、想要結構但溫和',
      location: '家中、任何安靜有墊子的地方'
    },
    {
      id: 7,
      name: '專注動作流動',
      type: '墊上皮拉提斯',
      duration: 25,
      stressRelief: 3,
      energyRequired: 3,
      description: '流動的皮拉提斯序列，需要專注，將你從壓力拉到當下。',
      poses: [
        '貓式伸展（3分鐘）- 緩慢活動脊椎',
        '游泳準備式（4分鐘）- 輕度背部運動配合節奏',
        '平板到倒V（4分鐘）- 核心運動需要專注',
        '側平板變化式（4分鐘）- 建立穩定與專注',
        '捲體準備式（4分鐘）- 挑戰需要心智臨在',
        '像球一樣滾動（3分鐘）- 玩樂、釋壓',
        '最後伸展（3分鐘）- 整合與平靜'
      ],
      breathWork: '配合呼吸與動作節奏 - 冥想狀態',
      bestFor: '需要從壓力分心、有中等能量',
      location: '家中工作室、臥室、任何有墊子空間'
    },
    {
      id: 8,
      name: '釋壓步行',
      type: '步行',
      duration: 15,
      stressRelief: 4,
      energyRequired: 2,
      description: '輕鬆步調的戶外或室內步行，清理思緒、重置神經系統。',
      poses: [
        '以舒適步調步行（總共15分鐘）',
        '專注呼吸 - 將步伐與呼吸同步',
        '注意周圍環境 - 啟動感官',
        '讓思緒像雲一樣飄過',
        '結束時站立深呼吸5次'
      ],
      breathWork: '3步吸、3步吐 - 找到你的自然節奏',
      bestFor: '需要清理思緒、感覺卡住、不安的能量',
      location: '社區、公園，或在家原地踏步'
    },
    {
      id: 9,
      name: '溫和動作步行',
      type: '步行',
      duration: 20,
      stressRelief: 5,
      energyRequired: 2,
      description: '延長的專注步行，處理壓力並回到平靜基準。',
      poses: [
        '前5分鐘 - 讓身體找到自然步調',
        '接下來10分鐘 - 專注呼吸與身體感受',
        '最後5分鐘 - 逐漸放慢，注意你的感受',
        '結束時進行溫和的站立伸展'
      ],
      breathWork: '自然呼吸，步行時逐漸加深',
      bestFor: '高壓力、需要空間處理、情緒不堪負荷',
      location: '優先戶外、跑步機也可、或大型室內空間'
    },
    {
      id: 10,
      name: '快速平靜步行',
      type: '步行',
      duration: 10,
      stressRelief: 3,
      energyRequired: 2,
      description: '短暫步行休息，打斷壓力循環，獲得立即釋放。',
      poses: [
        '以輕鬆步調步行（8分鐘）',
        '步行時練習4-7-8呼吸',
        '每分鐘向後轉動肩膀',
        '結束時站立2分鐘，閉眼，深呼吸'
      ],
      breathWork: '4-7-8呼吸（吸4、閉7、吐8）調整為步行',
      bestFor: '需要立即從壓力中休息、時間有限',
      location: '繞街區、辦公大樓，或在家原地'
    },
    {
      id: 11,
      name: '陰瑜伽深度釋放',
      type: '瑜伽',
      duration: 30,
      stressRelief: 5,
      energyRequired: 1,
      description: '長時間保持的被動體式，針對深層結締組織，允許完全的心智臣服。',
      poses: [
        '蝴蝶式（5分鐘）- 釋放髖部和下背',
        '人面獅身式/海豹式（5分鐘）- 溫和的心胸打開',
        '龍式（8分鐘，每側4分鐘）- 深度髖部釋放',
        '仰臥扭轉（6分鐘，每側3分鐘）- 排毒扭轉',
        '大休息（6分鐘）- 完全臣服與整合'
      ],
      breathWork: '自然呼吸，每次吐氣讓身體更柔軟',
      bestFor: '深度壓力、創傷保持、需要深刻釋放',
      location: '家中安靜空間，使用枕頭/毯子支撐'
    },
    {
      id: 12,
      name: '呼吸中心微練習',
      type: '瑜伽',
      duration: 5,
      stressRelief: 3,
      energyRequired: 1,
      description: '幾乎沒時間但需要立即釋壓時的超快速練習。',
      poses: [
        '選擇的坐姿（1分鐘）- 安定下來',
        '方塊呼吸（2分鐘）- 4-4-4-4模式',
        '溫和頸部伸展（1分鐘）- 釋放立即的緊繃',
        '手放在心臟和腹部（1分鐘）- 自我慈悲'
      ],
      breathWork: '方塊呼吸快速調節神經系統',
      bestFor: '緊急釋壓、會議之間、恐慌時刻',
      location: '真的任何地方 - 辦公桌、車上、浴室、臥室'
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
      return "你現在壓力很大且能量低落。我選了最溫和、最能恢復的練習，幫助你感到安全和平靜，不需要太多力氣。";
    } else if (stressLevel >= 4 && timeAvailable <= 10) {
      return "高壓力 + 時間有限 = 需要快速釋放。這些短練習專門設計來快速打斷你的壓力反應。";
    } else if (stressLevel >= 4) {
      return "你的壓力程度偏高。這些練習特別針對透過呼吸、溫和動作和扎根來調節神經系統。";
    } else if (energy <= 2) {
      return "今天能量偏低。這些溫和的動作會幫助釋放緊繃，不會進一步消耗你。有時候緩慢移動正是我們需要的。";
    } else if (stressLevel <= 2) {
      return "你的壓力目前還好。這些練習會幫助維持你的平靜狀態，防止壓力累積。";
    } else {
      return "偵測到中度壓力。這些練習會幫助你處理正在感受的情緒，回到更平靜的基準線。";
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
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Wind className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-800">Movelief</h1>
          </div>
          <p className="text-gray-600">Move your body, relieve your mind</p>
        </div>

        {!selectedExercise && currentView === 'input' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">你現在感覺如何？</h2>
            
            <div className="space-y-8">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="flex items-center gap-2 text-gray-700 font-medium">
                    <Heart className="w-5 h-5 text-red-500" />
                    壓力程度
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
                  <span>平靜</span>
                  <span>非常有壓力</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="flex items-center gap-2 text-gray-700 font-medium">
                    <Sparkles className="w-5 h-5 text-yellow-500" />
                    能量程度
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
                  <span>疲憊</span>
                  <span>精力充沛</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="flex items-center gap-2 text-gray-700 font-medium">
                    <Clock className="w-5 h-5 text-blue-500" />
                    可用時間
                  </label>
                  <span className="text-2xl font-bold text-indigo-600">{userState.timeAvailable} 分鐘</span>
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
                  <span>5 分鐘</span>
                  <span>30 分鐘</span>
                </div>
              </div>
            </div>

            <button
              onClick={getRecommendations}
              className="w-full mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl p-4 font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              找到我的練習
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
                  <h3 className="font-semibold mb-2">為你個人化推薦</h3>
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
                            最佳匹配
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
                      <div className="text-xs text-gray-500">分鐘</div>
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
                    開始這個練習
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => setCurrentView('input')}
              className="w-full bg-white text-indigo-600 border-2 border-indigo-600 rounded-xl p-4 font-semibold hover:bg-indigo-50 transition-colors"
            >
              更改我的設定
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
                <p className="text-gray-600 mt-1">{selectedExercise.duration} 分鐘</p>
              </div>
            </div>

            <div className="space-y-6 mb-8">
              <div className="bg-indigo-50 rounded-xl p-6">
                <h3 className="font-semibold text-indigo-900 mb-3 flex items-center gap-2">
                  <Wind className="w-5 h-5" />
                  呼吸技巧
                </h3>
                <p className="text-indigo-800">{selectedExercise.breathWork}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-3">練習順序：</h3>
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
                  <strong>記得：</strong>這是關於釋放壓力，不是完美姿勢。傾聽你的身體，深呼吸，對自己溫柔一點。
                </p>
              </div>
            </div>

            <button
              onClick={completePractice}
              className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl p-4 font-semibold hover:from-green-700 hover:to-teal-700 transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              我完成這個練習了
            </button>
          </div>
        )}

        {showComplete && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">做得真好 💙</h3>
              <p className="text-gray-600">
                你活動了身體，釋放了心靈。覺察一下現在的感覺與練習前有什麼不同。
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}