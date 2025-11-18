import React from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Heart, Star, Calendar, ChevronRight } from 'lucide-react'

const Home: React.FC = () => {
  // 模拟热门绘本数据
  const hotBooks = [
    {
      id: 1,
      title: '小熊宝宝绘本',
      cover: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=可爱的小熊宝宝绘本封面，温馨的水彩风格，柔和的米黄色调，适合0-3岁婴幼儿&image_size=square',
      age: '0-3岁',
      rating: 4.8
    },
    {
      id: 2,
      title: '猜猜我有多爱你',
      cover: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=温馨的兔子父子绘本封面，柔和的水彩风格，淡粉色和米白色调，表达亲子之爱&image_size=square',
      age: '3-6岁',
      rating: 4.9
    },
    {
      id: 3,
      title: '好饿的毛毛虫',
      cover: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=色彩鲜艳的毛毛虫绘本封面，儿童画风格，绿色毛毛虫和彩虹色背景&image_size=square',
      age: '2-5岁',
      rating: 4.7
    }
  ]

  // 模拟活动数据
  const activities = [
    {
      id: 1,
      title: '周末亲子故事会',
      date: '2024年1月20日',
      location: '北京市朝阳区',
      participants: 12
    },
    {
      id: 2,
      title: '绘本手工制作课',
      date: '2024年1月27日',
      location: '上海市浦东新区',
      participants: 8
    }
  ]

  // 轮播图数据
  const banners = [
    {
      id: 1,
      title: '新年特惠，绘本全场8折',
      subtitle: '精选优质绘本，陪伴孩子成长',
      image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=温馨的新年绘本促销横幅，柔和的水彩风格，米白色背景，可爱的动物角色，节日气氛&image_size=landscape_16_9'
    },
    {
      id: 2,
      title: '亲子阅读打卡活动',
      subtitle: '每天十分钟，培养阅读习惯',
      image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=温馨的亲子阅读场景，父母和孩子一起读书，柔和的灯光，舒适的家居环境&image_size=landscape_16_9'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* 轮播图区域 */}
      <section className="relative h-48 bg-gradient-to-r from-sky-blue to-blue-300 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-2xl font-bold mb-2">绘本岛</h2>
            <p className="text-sm opacity-90">让亲子时光，更温暖一点</p>
          </div>
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {banners.map((_, index) => (
            <div key={index} className="w-2 h-2 bg-white/50 rounded-full"></div>
          ))}
        </div>
      </section>

      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* 热门绘本区域 */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">热门绘本</h3>
            <Link to="/library" className="flex items-center text-sky-blue hover:text-blue-600">
              <span className="text-sm">查看更多</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {hotBooks.map((book) => (
              <Link key={book.id} to={`/book/${book.id}`} className="card hover:shadow-md transition-shadow">
                <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
                  <img 
                    src={book.cover} 
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-medium text-sm text-gray-800 mb-1 truncate">{book.title}</h4>
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>{book.age}</span>
                  <div className="flex items-center">
                    <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                    <span>{book.rating}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 亲子活动区域 */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">亲子活动</h3>
            <Link to="/activities" className="flex items-center text-sky-blue hover:text-blue-600">
              <span className="text-sm">查看更多</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="space-y-3">
            {activities.map((activity) => (
              <div key={activity.id} className="card flex items-center p-4">
                <div className="w-12 h-12 bg-light-yellow rounded-lg flex items-center justify-center mr-4">
                  <Calendar className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800 mb-1">{activity.title}</h4>
                  <p className="text-xs text-gray-600 mb-1">{activity.date} · {activity.location}</p>
                  <p className="text-xs text-sky-blue">{activity.participants}人参与</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            ))}
          </div>
        </section>

        {/* 阅读打卡区域 */}
        <section className="card text-center py-6">
          <BookOpen className="w-12 h-12 text-sky-blue mx-auto mb-3" />
          <h3 className="text-lg font-bold text-gray-800 mb-2">今日阅读打卡</h3>
          <p className="text-sm text-gray-600 mb-4">和孩子一起读完一本绘本，记录美好时光</p>
          <button className="btn-primary">
            <Heart className="w-4 h-4 mr-2 inline" />
            开始阅读
          </button>
        </section>
      </div>
    </div>
  )
}

export default Home