# tailwindcss login 页面
- 前端工程

vite 初始化项目
tailwindcss 配置

## 登录业务
- 受控组件 -> react
- lucide-react 图标库 -> 第三方组件库
- 抽象的表单事件处理 -> JS 逻辑
- showPassword 业务，密码显示隐藏 -> 界面状态，由数据驱动
- loading 业务，登录中 -> 界面不一定是静态的，界面状态，由数据驱动
- tailwindcss 业务
  
  - min-h-screen -> 最小高度，等于视口高度
  - w-full -> 宽度等于父元素宽度
  - max-w-md -> 最大宽度，等于 420px
  - rounded-3xl -> 圆角半径，等于 24px
  - shadow-xl -> 阴影，等于 24px
  - shadow-slate-200/60 -> 阴影颜色，等于 #e2e8f0，透明度 60%
  - space-y-6 -> 除第一个元素，直接子元素之间垂直方向间距，等于 24px
  - 选择 placeholder: focus: 这样一些伪类
  - md:p-10 -> 中等屏幕及以上，内边距，等于 32px
  - 适配 media query 宽度 Mobile First sm md lg xl 2xl
