import React, { useState } from 'react';
import { User, Heart, ShoppingBag, Settings, Baby, Star } from 'lucide-react';

interface ChildProfile {
  id: number;
  name: string;
  age: number;
  avatar: string;
  interests: string[];
  readingLevel: string;
}

interface Order {
  id: number;
  orderNumber: string;
  date: string;
  total: number;
  status: string;
  items: {
    title: string;
    cover: string;
    price: number;
    quantity: number;
  }[];
}

const UserCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'children' | 'orders' | 'favorites'>('profile');

  const userProfile = {
    name: '张妈妈',
    phone: '138****8888',
    email: 'zhang***@example.com',
    avatar: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=年轻妈妈头像，温柔微笑，卡通风格，温暖色调&image_size=square',
    memberSince: '2023-06-15',
    totalReadingTime: 1280,
    totalBooks: 45,
    level: '金牌会员'
  };

  const children: ChildProfile[] = [
    {
      id: 1,
      name: '小明',
      age: 5,
      avatar: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=可爱小男孩头像，5岁，卡通风格，温暖色调&image_size=square',
      interests: ['动物', '汽车', '恐龙'],
      readingLevel: '启蒙阶段'
    },
    {
      id: 2,
      name: '小红',
      age: 4,
      avatar: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=可爱小女孩头像，4岁，卡通风格，温暖色调&image_size=square',
      interests: ['公主', '动物', '音乐'],
      readingLevel: '启蒙阶段'
    }
  ];

  const orders: Order[] = [
    {
      id: 1,
      orderNumber: 'HB20240101001',
      date: '2024-01-01',
      total: 168,
      status: '已完成',
      items: [
        {
          title: '小熊宝宝绘本系列',
          cover: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=小熊宝宝绘本封面，可爱小熊，温馨色彩，儿童插画风格&image_size=square',
          price: 68,
          quantity: 1
        },
        {
          title: '猜猜我有多爱你',
          cover: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=猜猜我有多爱你绘本封面，兔子父子，温馨色调，经典儿童绘本&image_size=square',
          price: 58,
          quantity: 1
        }
      ]
    },
    {
      id: 2,
      orderNumber: 'HB20231215002',
      date: '2023-12-15',
      total: 88,
      status: '已发货',
      items: [
        {
          title: '好饿的毛毛虫',
          cover: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=好饿的毛毛虫绘本封面，彩色毛毛虫，水果食物，经典儿童绘本风格&image_size=square',
          price: 88,
          quantity: 1
        }
      ]
    }
  ];

  const favoriteBooks = [
    {
      id: 1,
      title: '小熊宝宝绘本系列',
      cover: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=小熊宝宝绘本封面，可爱小熊，温馨色彩，儿童插画风格&image_size=square',
      author: '佐佐木洋子',
      rating: 5
    },
    {
      id: 2,
      title: '猜猜我有多爱你',
      cover: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=猜猜我有多爱你绘本封面，兔子父子，温馨色调，经典儿童绘本&image_size=square',
      author: '山姆·麦克布雷尼',
      rating: 5
    }
  ];

  const tabs = [
    { id: 'profile', name: '个人资料', icon: User },
    { id: 'children', name: '孩子档案', icon: Baby },
    { id: 'orders', name: '订单管理', icon: ShoppingBag },
    { id: 'favorites', name: '我的收藏', icon: Heart }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case '已完成': return 'text-green-600 bg-green-100';
      case '已发货': return 'text-blue-600 bg-blue-100';
      case '待发货': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* 用户信息头部 */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-800">{userProfile.name}</h2>
              <p className="text-sm text-gray-600">{userProfile.level}</p>
              <p className="text-xs text-gray-500">加入时间：{userProfile.memberSince}</p>
            </div>
            <button className="p-2 text-gray-600 hover:text-gray-800">
              <Settings className="w-5 h-5" />
            </button>
          </div>
          
          {/* 统计信息 */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center">
              <div className="text-xl font-bold text-sky-blue">{userProfile.totalBooks}</div>
              <div className="text-xs text-gray-600">阅读本数</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-sky-blue">{userProfile.totalReadingTime}</div>
              <div className="text-xs text-gray-600">阅读时长(分钟)</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-sky-blue">{children.length}</div>
              <div className="text-xs text-gray-600">孩子数量</div>
            </div>
          </div>
        </div>
      </div>

      {/* 导航标签 */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-3 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-sky-blue text-sky-blue'
                      : 'border-transparent text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* 个人资料 */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">基本信息</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">姓名</span>
                  <span className="text-gray-800">{userProfile.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">手机号</span>
                  <span className="text-gray-800">{userProfile.phone}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">邮箱</span>
                  <span className="text-gray-800">{userProfile.email}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">会员等级</span>
                  <span className="text-sky-blue font-medium">{userProfile.level}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 孩子档案 */}
        {activeTab === 'children' && (
          <div className="space-y-4">
            {children.map((child) => (
              <div key={child.id} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={child.avatar}
                    alt={child.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">{child.name}</h4>
                    <p className="text-sm text-gray-600">{child.age}岁 · {child.readingLevel}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">兴趣爱好</p>
                  <div className="flex flex-wrap gap-2">
                    {child.interests.map((interest, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-light-yellow text-gray-700 rounded-full text-sm"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 订单管理 */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm text-gray-500">订单号：{order.orderNumber}</p>
                    <p className="text-xs text-gray-400">{order.date}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                
                <div className="space-y-3 mb-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <img
                        src={item.cover}
                        alt={item.title}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h5 className="text-sm font-medium text-gray-800">{item.title}</h5>
                        <p className="text-xs text-gray-600">¥{item.price} × {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t">
                  <span className="text-lg font-semibold text-gray-800">¥{order.total}</span>
                  <button className="px-4 py-2 bg-sky-blue text-white rounded-lg hover:bg-blue-400 transition-colors text-sm">
                    查看详情
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 我的收藏 */}
        {activeTab === 'favorites' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {favoriteBooks.map((book) => (
              <div key={book.id} className="bg-white rounded-xl shadow-md p-4">
                <div className="flex space-x-4">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-800 mb-1">{book.title}</h4>
                    <p className="text-xs text-gray-600 mb-2">{book.author}</p>
                    <div className="flex items-center">
                      {renderStars(book.rating)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCenter;