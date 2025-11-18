import React from 'react'
import { Link } from 'react-router-dom'
import { User, Baby, ArrowLeft } from 'lucide-react'

const Register: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream to-light-yellow flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* 返回按钮 */}
        <Link to="/login" className="flex items-center text-gray-600 hover:text-gray-800 mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span>返回登录</span>
        </Link>

        {/* Logo 和标题 */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-sky-blue rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">创建账号</h1>
          <p className="text-gray-600">加入绘本岛，记录孩子的成长时光</p>
        </div>

        {/* 注册表单 */}
        <div className="card space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">家长姓名</label>
            <input
              type="text"
              placeholder="请输入您的姓名"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-blue focus:border-transparent"
            />
          </div>

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

          {/* 孩子信息 */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center mb-4">
              <Baby className="w-5 h-5 text-sky-blue mr-2" />
              <h3 className="text-lg font-medium text-gray-800">孩子信息</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">孩子姓名</label>
                <input
                  type="text"
                  placeholder="请输入孩子姓名"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-blue focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">孩子年龄</label>
                <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-blue focus:border-transparent">
                  <option value="">请选择年龄</option>
                  <option value="0-1">0-1岁</option>
                  <option value="1-3">1-3岁</option>
                  <option value="3-6">3-6岁</option>
                  <option value="6-9">6-9岁</option>
                  <option value="9-12">9-12岁</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">兴趣爱好</label>
                <input
                  type="text"
                  placeholder="如：动物、汽车、公主等（选填）"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-blue focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <button className="btn-primary w-full py-3">
            完成注册
          </button>

          {/* 登录链接 */}
          <div className="text-center">
            <span className="text-sm text-gray-600">已有账号？</span>
            <Link to="/login" className="text-sm text-sky-blue hover:text-blue-600 ml-1">
              立即登录
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register