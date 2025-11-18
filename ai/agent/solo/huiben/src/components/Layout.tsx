import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { BookOpen, Calendar, Heart, User, Home } from 'lucide-react'

const Layout: React.FC = () => {
  const location = useLocation()

  const navItems = [
    { path: '/', icon: Home, label: '首页' },
    { path: '/library', icon: BookOpen, label: '绘本馆' },
    { path: '/activities', icon: Calendar, label: '活动' },
    { path: '/reading', icon: Heart, label: '阅读记录' },
    { path: '/profile', icon: User, label: '我的' }
  ]

  return (
    <div className="min-h-screen bg-cream">
      {/* 顶部导航栏 */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-sky-blue rounded-full flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-800">绘本岛</h1>
            </Link>
            <div className="flex-1 max-w-md mx-4">
              <input
                type="text"
                placeholder="搜索绘本、活动..."
                className="w-full px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-blue focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </header>

      {/* 主要内容区域 */}
      <main className="pb-16">
        <Outlet />
      </main>

      {/* 底部导航栏 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-around py-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path || 
                (item.path !== '/' && location.pathname.startsWith(item.path))
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'text-sky-blue bg-sky-blue/10' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Icon className="w-5 h-5 mb-1" />
                  <span className="text-xs">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Layout