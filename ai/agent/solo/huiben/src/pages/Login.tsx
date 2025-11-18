import React from 'react'
import { Link } from 'react-router-dom'
import { Phone, MessageCircle, ArrowLeft } from 'lucide-react'

const Login: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream to-light-yellow flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* 返回按钮 */}
        <Link to="/" className="flex items-center text-gray-600 hover:text-gray-800 mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span>返回首页</span>
        </Link>

        {/* Logo 和标题 */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-sky-blue rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">欢迎回来</h1>
          <p className="text-gray-600">登录绘本岛，开启亲子阅读之旅</p>
        </div>

        {/* 登录表单 */}
        <div className="card space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">手机号</label>
            <input
              type="tel"
              placeholder="请输入手机号"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-blue focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">验证码</label>
            <div className="flex space-x-3">
              <input
                type="text"
                placeholder="请输入验证码"
                className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-blue focus:border-transparent"
              />
              <button className="btn-secondary whitespace-nowrap">
                获取验证码
              </button>
            </div>
          </div>

          <button className="btn-primary w-full py-3">
            登录
          </button>

          {/* 其他登录方式 */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">其他登录方式</span>
            </div>
          </div>

          <div className="flex space-x-4">
            <button className="flex-1 flex items-center justify-center py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <MessageCircle className="w-5 h-5 text-green-500 mr-2" />
              <span className="text-sm">微信登录</span>
            </button>
          </div>

          {/* 注册链接 */}
          <div className="text-center">
            <span className="text-sm text-gray-600">还没有账号？</span>
            <Link to="/register" className="text-sm text-sky-blue hover:text-blue-600 ml-1">
              立即注册
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login