import React from 'react';
import { Book, Calendar, Trophy, Heart, Clock } from 'lucide-react';

const ReadingRecord: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">阅读记录</h1>
        
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-light-yellow rounded-lg p-4 text-center">
              <Book className="w-8 h-8 text-sky-blue mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">2</div>
              <div className="text-sm text-gray-600">本数</div>
            </div>
            <div className="bg-light-yellow rounded-lg p-4 text-center">
              <Clock className="w-8 h-8 text-sky-blue mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">45</div>
              <div className="text-sm text-gray-600">分钟</div>
            </div>
            <div className="bg-light-yellow rounded-lg p-4 text-center">
              <Calendar className="w-8 h-8 text-sky-blue mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">60</div>
              <div className="text-sm text-gray-600">页数</div>
            </div>
            <div className="bg-light-yellow rounded-lg p-4 text-center">
              <Trophy className="w-8 h-8 text-sky-blue mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">2</div>
              <div className="text-sm text-gray-600">打卡</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="sm:w-1/4">
                <img
                  src="https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=小熊宝宝绘本封面，可爱小熊，温馨色彩，儿童插画风格&image_size=square"
                  alt="小熊宝宝绘本系列"
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">小熊宝宝绘本系列</h3>
                  <div className="flex items-center">
                    {[1,2,3,4,5].map((star) => (
                      <Heart key={star} className="w-4 h-4 text-red-400 fill-current" />
                    ))}
                  </div>
                </div>
                
                <div className="text-sm text-gray-600 mb-3">
                  <div className="flex items-center mb-1">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>2024-01-10</span>
                    <span className="ml-4">小明</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>25分钟 · 32页</span>
                  </div>
                </div>
                
                <div className="bg-cream rounded-lg p-3 mb-3">
                  <p className="text-sm text-gray-700">孩子很喜欢这个故事，学会了分享的重要性</p>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-sm text-green-600 flex items-center">
                    <Trophy className="w-4 h-4 mr-1" />
                    已打卡
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="sm:w-1/4">
                <img
                  src="https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=猜猜我有多爱你绘本封面，兔子父子，温馨色调，经典儿童绘本&image_size=square"
                  alt="猜猜我有多爱你"
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">猜猜我有多爱你</h3>
                  <div className="flex items-center">
                    {[1,2,3,4,5].map((star) => (
                      <Heart key={star} className="w-4 h-4 text-red-400 fill-current" />
                    ))}
                  </div>
                </div>
                
                <div className="text-sm text-gray-600 mb-3">
                  <div className="flex items-center mb-1">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>2024-01-08</span>
                    <span className="ml-4">小红</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>20分钟 · 28页</span>
                  </div>
                </div>
                
                <div className="bg-cream rounded-lg p-3 mb-3">
                  <p className="text-sm text-gray-700">温馨的亲子故事，孩子听得很认真</p>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-sm text-green-600 flex items-center">
                    <Trophy className="w-4 h-4 mr-1" />
                    已打卡
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingRecord;