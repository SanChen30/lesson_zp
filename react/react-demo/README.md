# React 项目架构

- npm init vite

从 github 中拉取一个项目模板

  - npm run dev

  vite 就是开发阶段的脚手架

  test 阶段
  production 上线阶段
  dev -> test -> production -> dev -> test -> production
  vite 帮我们编译 stylus 为 css，需要指令 npm i -D stylus ，因为 stylus 是只在开发阶段使用的工具。
   - -D 开发依赖，对应 package.json 中的devDependencies
   - -d 生产依赖，对应 package.json 中的dependencies

  - react 基建也交给 vite 处理

  - ES6 模块化机制 ESM，极致的冷启动


- 项目依赖

上一个vue项目的依赖 vue 3.5.24

react 19.2.0        第一的现代前端开发框架，响应式，组件化，数据绑定...
react-dom 19.2.0    

vue = react(core) + react-dom(component reder dom)


- 引入路由

1) 安装路由

npm i react-router-dom

2) 路由的配置


3) 导航，页面级别组件