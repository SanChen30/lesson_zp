# 原子css

- bad
  样式带有太多的业务属性，在一个或少数类名，样式几乎不能复用
- 面向对象css
  - 封装 基类
  - 多态 业务

- 将我们的css规则拆分成原子css
  - 大量的基类，好复用
  - 组合起来
  - tailwindcss 是一个原子css框架
    几乎不用再写css
  - tailwindcss 原子css类名
    llm 自然语言处理
    - 生成界面？
    prompt 描述布局、风格 和 语义化好的 tailwindcss 更有利于生成

## tailwindcss 配置

1. 创建一个vite项目
2. 安装 tailwindcss 和 vite 插件
   npm install tailwindcss @tailwindcss/vite
   - tailwindcss 是一个css框架
   - @tailwindcss/vite 是一个vite插件，用于在vite项目中使用tailwindcss
3. 配置 vite.config.js 文件
   - 引入 tailwindcss 插件
   - 配置 tailwindcss 插件

## Fragment

文档碎片节点

在React中，每个组件必须返回单一的根元素

解决 react 单一根节点问题，因为单一根节点 - 清晰的树结构，好遍历

不渲染到页面上，杜绝了额外且不需要的div节点

Fragment的优势

- 不产生额外的DOM节点 ：Fragment不会在DOM中创建额外的包装元素
- 保持DOM结构简洁 ：避免了不必要的div嵌套
- CSS样式不受影响 ：不会干扰CSS选择器和布局

react 中 <></> Fragment 组件，唯一根节点，性能优化