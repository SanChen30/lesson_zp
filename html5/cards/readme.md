# CSS 的“增强版”或“升级版” -- Stylus

Stylus 并不是 CSS，而是一种 CSS 预处理器（CSS Preprocessor）。它是一种动态的样式语言，可以编译成标准的 CSS 代码，从而让编写 CSS 变得更高效、更灵活、更易于维护。

但是浏览器只能解析css，stylus是一种预处理器，需要编译成css才能被浏览器解析。

1. 简洁的语法（可选花括号和分号和冒号）
Stylus 允许你省略花括号 {} 和分号 ;和冒号 :，使代码更简洁。

2. stylus css 

1) npm i -g stylus
    安装 Stylus

2) stylus style.styl -o style.css
    编译为 CSS

3) stylus style.styl -o style.css -w    
    持续监听 style.styl 文件的变化，一旦保存，立即自动编译成 style.css

3. 弹性布局

1) display: flex; 弹性格式化上下文
2) 移动端布局的主角
3) 父子（们）一起的一种布局方案
4) 子元素块级能力丢失，不会自动换行，多列布局
5) justify-content（水平） align-items（垂直）
   
   默认flex-direction row ，定义主轴方向为水平方向
   默认justify-content flex-start ，主轴方向的对齐方式，左对齐
   默认align-items stretch ，侧轴上的对齐方式（单行），拉伸填满容器（高度一致）

6) 子元素设置flex 1 等比例分配空间
7) &.active 这个嵌套和上级是同一级
8) transiton 过渡动画
   比animation 更简单，没有keyframes 关键帧
   `transition all 700ms ease-in`
   all 任何属性的改变
   700ms 过渡时间
   ease-in 过渡效果
   `transition opacity 300ms ease-in 400ms`
   opacity 透明度属性
   300ms 过渡时间
   ease-in 过渡效果
   400ms 延迟时间 transition-delay

4. @media(max-width:480px)
   媒体查询 响应式布局
   max-width:480px 查询条件
   对特定设备适配
   
5.  stylus 增强了css 的编程性
  - 嵌套
  - 模块化的能力
  - 作用域
  - 自动添加前缀







