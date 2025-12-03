import React, { useState } from 'react';
import { Heart, Wind, Clock, Sparkles, ArrowRight, Play, CheckCircle, BookOpen, TrendingDown, TrendingUp } from 'lucide-react';

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
  const [showPostTracking, setShowPostTracking] = useState(false);
  const [postState, setPostState] = useState({ stressLevel: 3, energy: 3 });
  const [beforeState, setBeforeState] = useState({ stressLevel: 3, energy: 3 });
  const [showEducation, setShowEducation] = useState({});

  const educationalContent = {
    yoga: {
      title: "瑜伽如何緩解壓力？",
      simple: "緩慢、專注的動作配合深呼吸會啟動你的副交感神經系統——身體的「休息與消化」模式。",
      science: [
        "當你處於高壓力狀態，交感神經系統（戰或逃模式）會被啟動。心跳加速、呼吸變淺、肌肉緊繃。",
        "瑜伽透過緩慢動作和深呼吸刺激迷走神經——這是連接大腦和身體的主要神經。",
        "迷走神經被啟動時，會告訴你的大腦：「我現在是安全的」，自然降低皮質醇（壓力荷爾蒙）。",
        "前彎和扭轉會按摩內臟器官，釋放儲存在腹部的壓力（是的，壓力真的會卡在那裡）。"
      ],
      expect: [
        "前 3-5 分鐘可能感覺不舒服（這是正常的，你在釋放緊繃）",
        "之後呼吸會自然變深",
        "練習結束時，肩膀會明顯下降、下巴會放鬆",
        "效果在練習後可以持續 2-4 小時"
      ],
      research: "研究顯示：15 分鐘的溫和瑜伽可以降低 25% 的皮質醇水平"
    },
    pilates: {
      title: "皮拉提斯如何平靜心靈？",
      simple: "專注於精確的動作和呼吸需要完全的注意力——這會讓你的大腦暫時遠離壓力思緒。",
      science: [
        "皮拉提斯需要高度的心智-身體連結，迫使你活在當下。當你專注於控制動作時，大腦無法同時反芻焦慮想法。",
        "核心運動會釋放內啡肽（天然的情緒提升劑）和血清素（快樂荷爾蒙）。",
        "控制的呼吸模式（特別是延長吐氣）會啟動副交感神經系統，調節你的壓力反應。",
        "獲得身體掌控感會減少焦慮和無助感——這種心理效應和生理效應一樣重要。"
      ],
      expect: [
        "前幾分鐘需要集中注意力（焦慮思緒會被打斷）",
        "動作過程中會感到更「清醒」和「在場」",
        "結束後感到平靜但有活力（不是疲憊）",
        "心智清晰度提升，更容易專注"
      ],
      research: "研究顯示：專注的動作練習可以減少 40% 的反芻思考"
    },
    walking: {
      title: "步行如何減壓？",
      simple: "有節奏的動作配合新鮮空氣和環境變化會重置你的神經系統，清理思緒。",
      science: [
        "雙邊運動（左右腳交替）會平衡大腦兩側，類似 EMDR 治療的效果，幫助處理壓力記憶。",
        "在自然環境中行走會降低皮質醇達 15-20%，遠比室內步行有效。",
        "溫和的有氧運動會增加血清素（快樂荷爾蒙）和多巴胺（動力荷爾蒙）。",
        "離開壓力環境會打斷反芻思考的循環——物理上的移動創造心理上的距離。"
      ],
      expect: [
        "前 5 分鐘思緒可能還很混亂（正常的）",
        "10 分鐘後開始感到思緒變清晰",
        "15-20 分鐘是「甜蜜點」——壓力明顯下降",
        "結束時會有「重置」的感覺"
      ],
      research: "研究顯示：20 分鐘的戶外步行效果等同於低劑量的抗焦慮藥物"
    }
  };

  const exerciseDatabase = [
    {
      id: 1,
      name: '溫和釋壓流動',
      type: 'yoga',
      duration: 15,
      stressRelief: 5,
      energyRequired: 1,
      description: '緩慢、專注的動作，配合呼吸，釋放身體的緊繃。',
      poses: [
        {
          name: '嬰兒式',
          duration: '3分鐘',
          instructions: [
            '跪坐在墊子上，大腳趾相碰，膝蓋打開與髖同寬或更寬',
            '吐氣時，上半身向前摺疊，額頭朝向地面',
            '手臂可以向前延伸（活躍版）或沿著身體放在兩側（放鬆版）',
            '每次吐氣，想像身體像冰淇淋一樣融化進墊子',
            '如果臀部離開腳跟，在臀部和腳跟之間墊毯子或枕頭'
          ],
          focus: '感受背部隨著呼吸上下起伏，釋放肩膀和頸部的緊繃'
        },
        {
          name: '貓牛式',
          duration: '2分鐘',
          instructions: [
            '四足跪姿：手腕在肩膀正下方，膝蓋在髖部正下方',
            '吸氣 - 牛式：肚子向下沉，胸口向前推，抬頭看向前上方',
            '吐氣 - 貓式：背部拱起，下巴收向胸口，肚臍向脊椎靠近',
            '緩慢流動，讓呼吸引導動作（不是動作趕呼吸）',
            '重複 8-10 次，找到你自己的節奏'
          ],
          focus: '想像脊椎是一節一節慢慢波動，而不是僵硬地來回彎曲'
        },
        {
          name: '坐姿前彎',
          duration: '3分鐘',
          instructions: [
            '坐在墊子上，雙腿向前伸直（或微彎膝蓋）',
            '吸氣時延長脊椎，吐氣時從髖部向前摺疊',
            '手可以放在小腿、腳踝或腳上——不要勉強碰到腳趾',
            '讓頭和頸部完全放鬆下垂',
            '每次吐氣，讓上半身再沉一點點'
          ],
          focus: '釋放下背緊繃，感受大腿後側溫和的伸展'
        },
        {
          name: '仰臥扭轉',
          duration: '4分鐘（每側2分鐘）',
          instructions: [
            '仰臥，雙膝彎曲，腳掌貼地',
            '雙膝倒向右側，左肩保持貼地',
            '左手可以向左伸展或放在肚子上',
            '頭可以轉向左側（遠離膝蓋）加深扭轉',
            '停留 2 分鐘，然後換邊'
          ],
          focus: '感受脊椎的扭轉，像擰毛巾一樣擰出壓力'
        },
        {
          name: '靠牆抬腿',
          duration: '3分鐘',
          instructions: [
            '臀部靠近牆壁側躺，然後轉身讓雙腿靠牆上舉',
            '臀部可以貼牆或距離牆壁幾公分（選舒適的距離）',
            '雙腿可以併攏或打開成V字型',
            '手臂放在身體兩側或肚子上',
            '閉上眼睛，專注在呼吸上'
          ],
          focus: '感受重力幫助血液回流，平靜神經系統'
        }
      ],
      breathWork: '深層腹式呼吸 - 吸氣4拍，吐氣6拍',
      bestFor: '感到不堪負荷、焦慮或疲憊時',
      location: '任何有墊子或柔軟表面的地方'
    },
    {
      id: 2,
      name: '平靜呼吸伸展',
      type: 'yoga',
      duration: 10,
      stressRelief: 5,
      energyRequired: 1,
      description: '需要立即平靜時的快速釋壓練習，可在小空間進行。',
      poses: [
        {
          name: '簡易坐姿配合頸部轉動',
          duration: '2分鐘',
          instructions: [
            '盤腿坐或坐在椅子上，脊椎挺直',
            '右耳慢慢向右肩靠近，停留 5 次呼吸',
            '頭回到中心，左耳向左肩，停留 5 次呼吸',
            '下巴畫圓：下巴向右肩→胸口→左肩→回中心',
            '反方向重複'
          ],
          focus: '釋放累積在頸部和肩膀的緊繃，動作要非常緩慢'
        },
        {
          name: '坐姿貓牛式',
          duration: '2分鐘',
          instructions: [
            '坐在椅子或墊子上，手放在大腿上',
            '吸氣：胸口向前推，肩胛骨向後夾',
            '吐氣：背部拱起，下巴收向胸口',
            '重複 8-10 次，緩慢流動'
          ],
          focus: '溫和活動脊椎，不需要大幅度動作'
        },
        {
          name: '坐姿側彎',
          duration: '2分鐘',
          instructions: [
            '坐姿，左手放在身側地面或椅子上支撐',
            '吸氣，右手向上舉',
            '吐氣，右手和上半身向左側彎',
            '停留 5 次呼吸，每次吐氣延長一點',
            '換邊重複'
          ],
          focus: '打開側身和肋骨，釋放被壓縮的空間'
        },
        {
          name: '嬰兒式',
          duration: '4分鐘',
          instructions: [
            '跪坐，膝蓋打開，大腳趾相碰',
            '上半身向前摺疊，額頭貼地',
            '手臂向前延伸或放在身體兩側',
            '完全放鬆，讓身體的重量沉入地面',
            '專注在腹部呼吸'
          ],
          focus: '深度放鬆與扎根，讓緊繃從身體流出'
        }
      ],
      breathWork: '方塊呼吸 - 吸4、閉4、吐4、閉4',
      bestFor: '快速釋壓、時間緊迫、高度焦慮',
      location: '辦公室、臥室、客廳 - 只需要地板空間'
    },
    {
      id: 5,
      name: '核心平靜練習',
      type: 'pilates',
      duration: 15,
      stressRelief: 4,
      energyRequired: 2,
      description: '溫和的皮拉提斯，專注於控制呼吸和核心穩定來平靜心智。',
      poses: [
        {
          name: '骨盆傾斜',
          duration: '3分鐘',
          instructions: [
            '仰臥，雙膝彎曲，腳掌貼地，雙腳與髖同寬',
            '吸氣準備，吐氣時下背壓向地面，骨盆向上微微捲起',
            '吸氣回到中立位置',
            '重複 10-12 次，非常緩慢且有控制'
          ],
          focus: '連結呼吸與核心肌群的微小動作，建立身體覺察'
        },
        {
          name: '橋式',
          duration: '3分鐘',
          instructions: [
            '仰臥，雙膝彎曲，腳掌貼地',
            '吐氣時，從尾骨開始一節一節抬起脊椎，直到肩膀到膝蓋成一直線',
            '停留 3 次呼吸，感受臀部和大腿後側的啟動',
            '吸氣，從上背開始一節一節放下',
            '重複 5-6 次'
          ],
          focus: '緩慢、控制、配合呼吸，感受脊椎的分段動作'
        },
        {
          name: '單腿伸展',
          duration: '3分鐘',
          instructions: [
            '仰臥，雙膝抬起呈桌面位置（小腿平行地面）',
            '吐氣時，右腿向前延伸（不要太低），左膝保持彎曲',
            '吸氣時，右腿回到桌面位置',
            '換腿，吐氣時左腿延伸',
            '左右交替 10-12 次，動作流暢且有控制'
          ],
          focus: '專注於協調性，讓心智完全投入動作中'
        },
        {
          name: '脊椎向前伸展',
          duration: '3分鐘',
          instructions: [
            '坐姿，雙腿向前伸直（或微彎膝蓋）',
            '吸氣時手臂向上舉，延長脊椎',
            '吐氣時從頭頂開始一節一節向前捲曲，手臂向前延伸',
            '吸氣停留',
            '吐氣時從下背開始一節一節捲回坐姿',
            '重複 5-6 次'
          ],
          focus: '釋放緊繃、延展脊椎，像波浪一樣流動'
        },
        {
          name: '美人魚伸展',
          duration: '3分鐘',
          instructions: [
            '側坐，雙腿彎曲在身體一側',
            '左手撐地支撐，右手向上舉',
            '吸氣延長脊椎，吐氣時右手和身體向左側彎',
            '停留 3-5 次呼吸',
            '回到中心，換邊重複'
          ],
          focus: '側身打開配合呼吸，感受肋骨之間的空間'
        }
      ],
      breathWork: '皮拉提斯呼吸 - 鼻吸氣擴張肋骨，嘴吐氣收緊核心',
      bestFor: '需要心智專注、想要更有掌控感',
      location: '客廳、臥室 - 只需要墊子'
    },
    {
      id: 8,
      name: '釋壓步行',
      type: 'walking',
      duration: 15,
      stressRelief: 4,
      energyRequired: 2,
      description: '輕鬆步調的戶外或室內步行，清理思緒、重置神經系統。',
      poses: [
        {
          name: '步行冥想',
          duration: '15分鐘',
          instructions: [
            '以舒適的步調開始步行，不需要很快',
            '前 5 分鐘：專注將步伐與呼吸同步（例如：吸氣 3 步，吐氣 3 步）',
            '接下來 5 分鐘：啟動五感 - 注意你看到、聽到、聞到的東西',
            '最後 5 分鐘：讓思緒像雲一樣飄過，不要抓住任何想法',
            '結束時站立深呼吸 5 次，感受身體的變化'
          ],
          focus: '這不是運動，是移動中的冥想。讓腳步扎根，讓思緒清空'
        }
      ],
      breathWork: '3步吸、3步吐 - 找到你的自然節奏，不要勉強',
      bestFor: '需要清理思緒、感覺卡住、不安的能量',
      location: '社區、公園，或在家原地踏步'
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
    setBeforeState({ stressLevel: userState.stressLevel, energy: userState.energy });
    setSelectedExercise(exercise);
  };

  const completePractice = () => {
    setShowPostTracking(true);
    setPostState({ stressLevel: userState.stressLevel, energy: userState.energy });
  };

  const finishTracking = () => {
    setShowComplete(true);
    setTimeout(() => {
      setShowComplete(false);
      setShowPostTracking(false);
      setSelectedExercise(null);
      setCurrentView('input');
    }, 3000);
  };

  const toggleEducation = (exerciseId) => {
    setShowEducation(prev => ({
      ...prev,
      [exerciseId]: !prev[exerciseId]
    }));
  };

  const getExerciseTypeLabel = (type) => {
    const labels = {
      yoga: '瑜伽',
      pilates: '墊上皮拉提斯',
      walking: '步行'
    };
    return labels[type] || type;
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
                          {getExerciseTypeLabel(exercise.type)}
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

                  {/* Educational Content */}
                  <button
                    onClick={() => toggleEducation(exercise.id)}
                    className="w-full bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-3 mb-3 font-medium text-purple-900 hover:from-purple-100 hover:to-indigo-100 transition-colors flex items-center justify-center gap-2"
                  >
                    <BookOpen className="w-4 h-4" />
                    {showEducation[exercise.id] ? '隱藏' : '為什麼這個有效？'}
                  </button>

                  {showEducation[exercise.id] && educationalContent[exercise.type] && (
                    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-5 mb-4 border border-purple-100">
                      <h4 className="font-bold text-purple-900 mb-3 flex items-center gap-2">
                        <BookOpen className="w-5 h-5" />
                        {educationalContent[exercise.type].title}
                      </h4>
                      
                      <p className="text-purple-800 mb-4 font-medium">
                        {educationalContent[exercise.type].simple}
                      </p>

                      <div className="bg-white/60 rounded-lg p-4 mb-3">
                        <p className="font-semibold text-purple-900 mb-2">科學原理：</p>
                        <ul className="space-y-2">
                          {educationalContent[exercise.type].science.map((point, idx) => (
                            <li key={idx} className="text-sm text-purple-800 flex gap-2">
                              <span className="text-purple-500 font-bold">•</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-white/60 rounded-lg p-4 mb-3">
                        <p className="font-semibold text-purple-900 mb-2">你會注意到：</p>
                        <ul className="space-y-1">
                          {educationalContent[exercise.type].expect.map((point, idx) => (
                            <li key={idx} className="text-sm text-purple-800 flex gap-2">
                              <span className="text-purple-500">✓</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-purple-900 text-purple-50 rounded-lg p-3 text-sm">
                        <strong>📊 研究發現：</strong> {educationalContent[exercise.type].research}
                      </div>
                    </div>
                  )}

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

        {selectedExercise && !showPostTracking && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-2 inline-block">
                  {getExerciseTypeLabel(selectedExercise.type)}
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
                <h3 className="font-semibold text-gray-800 mb-4">練習順序：</h3>
                <div className="space-y-4">
                  {selectedExercise.poses.map((pose, idx) => (
                    <div key={idx} className="border-l-4 border-indigo-600 pl-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                          {idx + 1}
                        </div>
                        <h4 className="font-bold text-gray-800">{pose.name}</h4>
                        <span className="text-sm text-gray-500">({pose.duration})</span>
                      </div>
                      <div className="ml-10 space-y-1 mb-3">
                        {pose.instructions.map((instruction, iIdx) => (
                          <p key={iIdx} className="text-sm text-gray-700 flex gap-2">
                            <span className="text-indigo-500">•</span>
                            <span>{instruction}</span>
                          </p>
                        ))}
                      </div>
                      <div className="ml-10 bg-green-50 border-l-2 border-green-500 p-2 rounded">
                        <p className="text-sm text-green-800">
                          <strong>專注：</strong>{pose.focus}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
                <p className="text-sm text-amber-900">
                  <strong>💡 記得：</strong>這是關於釋放壓力，不是完美姿勢。傾聽你的身體，深呼吸，對自己溫柔一點。
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

        {showPostTracking && !showComplete && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">練習後感覺如何？</h2>
            <p className="text-gray-600 mb-6">花一點時間覺察你現在的狀態</p>

            <div className="space-y-6 mb-8">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="flex items-center gap-2 text-gray-700 font-medium">
                    <Heart className="w-5 h-5 text-red-500" />
                    壓力程度
                  </label>
                  <span className="text-2xl font-bold text-indigo-600">{postState.stressLevel}/5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={postState.stressLevel}
                  onChange={(e) => setPostState({ ...postState, stressLevel: parseInt(e.target.value) })}
                  className="w-full h-3 bg-gradient-to-r from-green-200 via-yellow-200 to-red-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="flex items-center gap-2 text-gray-700 font-medium">
                    <Sparkles className="w-5 h-5 text-yellow-500" />
                    能量程度
                  </label>
                  <span className="text-2xl font-bold text-indigo-600">{postState.energy}/5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={postState.energy}
                  onChange={(e) => setPostState({ ...postState, energy: parseInt(e.target.value) })}
                  className="w-full h-3 bg-gradient-to-r from-red-200 via-yellow-200 to-green-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            <button
              onClick={finishTracking}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl p-4 font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all"
            >
              查看我的進步
            </button>
          </div>
        )}

        {showComplete && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">做得真好 💙</h3>
              
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mb-4">
                <h4 className="font-semibold text-gray-800 mb-3">你的進步：</h4>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">壓力程度</span>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-400">{beforeState.stressLevel}</span>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                      <span className="text-2xl font-bold text-green-600">{postState.stressLevel}</span>
                      {beforeState.stressLevel > postState.stressLevel && (
                        <TrendingDown className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">能量程度</span>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-400">{beforeState.energy}</span>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                      <span className="text-2xl font-bold text-blue-600">{postState.energy}</span>
                      {beforeState.energy < postState.energy && (
                        <TrendingUp className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                  </div>
                </div>

                {beforeState.stressLevel > postState.stressLevel && (
                  <div className="mt-4 bg-green-100 border-l-4 border-green-600 p-3 rounded">
                    <p className="text-sm text-green-800">
                      <strong>太棒了！</strong> 你的壓力降低了 {beforeState.stressLevel - postState.stressLevel} 級。這就是身體與心靈連結的力量。
                    </p>
                  </div>
                )}
              </div>

              <p className="text-gray-600 text-center text-sm">
                覺察一下現在的感覺與練習前有什麼不同。每一次練習都在訓練你的神經系統更快回到平靜狀態。
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}