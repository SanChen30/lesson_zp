# 现代前端开发工程化

- npm init vite

新建项目

何为 vite？ 
vue 的作者尤雨溪开发的现代前端**构建**工具，它利用浏览器原生ES模板实现**极速**的**冷启动**和**热更新**，大幅提升开发体验。

- 能够得到一个比较标准的项目开发模板
优秀的架构
  
## 优秀的架构

- vite 会将根目录下的index.html作为首页启动

#app 是组件的挂载点
App.vue 是根组件，所有的组件都挂载在它下面

- vite 是为了构建，是具体业务开发的基石
    - 返回了项目开发模板
    - npm i 安装项目依赖 package.json 中定义的依赖
    - vite 是构建的大管家
      - 开发的是前端项目 vue3 src/ 前端开发目录
      - vite 是基于 node 的，后端驱动的前端构建工具
        - npm i vite
        - npm run dev
      - localhost:5173 是 vite 启动的默认端口
      - 可以在 package.json 中配置启动端口
        - "scripts": {
          "dev": "vite --port 8080"
        }
      - 自动打开浏览器
      - 热更新 监听任何文件的修改，自动刷新浏览器

- src/ 前端开发目录
  - main.js 是入口文件
  - App.vue 是根组件
  - components/ 组件目录
    - 组件.vue 组件文件
  - style.css 全局样式文件

- Volar 是 vue3 的官方插件，提供了 vue3 的语法提示和校验
- Vue devtool 是浏览器插件，提供了 vue3 的调试工具


## 如何实现多个页面呢？

vue-router 可以帮助我们实现多个页面的切换

npm i vue-router
- 配置路由
- 新建页面
  - 在src路径下新建views文件夹
    views 文件夹存放其他页面的组件
    - Home.vue 首页组件
    - About.vue 关于页组件
  - 在src路径下新建router文件夹
    router 文件夹存放路由配置文件
    - index.js 路由配置文件


