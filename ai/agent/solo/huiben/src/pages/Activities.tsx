import React, { useState } from 'react';
import { Calendar, MapPin, Users, Clock, Star } from 'lucide-react';

interface Activity {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  price: number;
  participants: number;
  maxParticipants: number;
  image: string;
  category: string;
  rating: number;
}

const Activities: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [registeredActivities, setRegisteredActivities] = useState<number[]>([]);

  const categories = ['全部', '手工制作', '亲子阅读', '户外探索', '音乐律动', '科学实验'];

  const mockActivities: Activity[] = [
    {
      id: 1,
      title: '亲子绘本手工制作',
      description: '和孩子一起制作可爱的绘本手工，培养动手能力和创造力',
      date: '2024-01-15',
      time: '10:00-11:30',
      location: '绘本岛活动中心',
      price: 68,
      participants: 12,
      maxParticipants: 20,
      image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=亲子手工制作活动，温馨场景，家长和孩子一起做手工，彩色纸张，安全剪刀，胶水，欢乐氛围&image_size=square',
      category: '手工制作',
      rating: 4.8
    },
    {
      id: 2,
      title: '户外亲子探索之旅',
      description: '在大自然中寻找绘本中的小动物和植物',
      date: '2024-01-20',
      time: '09:00-12:00',
      location: '城市公园',
      price: 88,
      participants: 8,
      maxParticipants: 15,
      image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=户外亲子活动，公园场景，家长和孩子一起探索自然，放大镜，小背包，阳光草地，温馨氛围&image_size=square',
      category: '户外探索',
      rating: 4.9
    },
    {
      id: 3,
      title: '音乐律动绘本时光',
      description: '用音乐和律动感受绘本的魅力',
      date: '2024-01-18',
      time: '14:00-15:00',
      location: '音乐教室',
      price: 58,
      participants: 15,
      maxParticipants: 25,
      image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=音乐律动活动，温馨教室，家长和孩子一起唱歌跳舞，乐器，音乐符号，快乐氛围&image_size=square',
      category: '音乐律动',
      rating: 4.7
    }
  ];

  const filteredActivities = selectedCategory === '全部' 
    ? mockActivities 
    : mockActivities.filter(activity => activity.category === selectedCategory);

  const handleRegister = (activityId: number) => {
    if (!registeredActivities.includes(activityId)) {
      setRegisteredActivities([...registeredActivities, activityId]);
    }
  };

  const handleCancelRegister = (activityId: number) => {
    setRegisteredActivities(registeredActivities.filter(id => id !== activityId));
  };

  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">亲子活动</h1>
          
          {/* 分类筛选 */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-sky-blue text-white'
                    : 'bg-light-yellow text-gray-700 hover:bg-yellow-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* 活动列表 */}
        <div className="space-y-6">
          {filteredActivities.map((activity) => (
            <div key={activity.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-1/3">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-48 sm:h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{activity.title}</h3>
                    <div className="flex items-center text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="ml-1 text-sm text-gray-600">{activity.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">{activity.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{activity.date}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{activity.time}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{activity.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="w-4 h-4 mr-2" />
                      <span>{activity.participants}/{activity.maxParticipants} 人</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold text-red-500">
                      ¥{activity.price}
                    </div>
                    
                    {registeredActivities.includes(activity.id) ? (
                      <button
                        onClick={() => handleCancelRegister(activity.id)}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                      >
                        已报名
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRegister(activity.id)}
                        className="px-4 py-2 bg-sky-blue text-white rounded-lg hover:bg-blue-400 transition-colors"
                      >
                        立即报名
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 空状态 */}
        {filteredActivities.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Calendar className="w-16 h-16 mx-auto" />
            </div>
            <p className="text-gray-500">暂无相关活动</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Activities;