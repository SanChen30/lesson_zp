# AI 全栈项目

## 技能点

### react 开发全家桶
- react + typescript (js超级)
- react-router-dom (前端路由)
- zustand (全局状态管理)
- axios (http 请求库)

### 后端
- nodejs
- nestjs 企业级别后端开发框架
- psql 数据库
- redis 缓存数据库

### AI
- langchain
- coze/n8n
- LLM
- trae/cursor

## 项目安排
- frontend
- backend
- ai_server
- admin 后台管理系统

## git 操作
- 全新的实战项目
  git init
- 提交的时机
  每次完成一个相对独立的模块后，提交一下
  提交信息要准确完整

## react 全家桶

### react-router-dom 
- 前端路由
- **pnpm i react-router-dom**

1. 早期的前端没有路由，路由由后端负责，前端是切图仔
2. 前后端分离，前端有独立的（html5）路由，实现页面切换

- 不管什么路由模式，取别名，as Router 可读性好

- 页面组件的懒加载
为了性能，快，在需要的时候才加载，而不是一上来就加载所有页面组件，可以延迟其他页面的加载

### 路由模式

React Router 中两种最常见的路由模式。它们的功能是一样的（实现页面跳转不刷新），但底层原理和对服务器的要求完全不同。

简单的一句话总结：

* BrowserRouter：好看、标准、现代化，但需要服务器配合。是基于 HTML5 的 **History API** (pushState, replaceState) 来实现的，即页面不刷新。
* HashRouter：URL 带个 `#` 号，略丑，但不需要服务器配置（即插即用）。 

如果你在本地开发 (localhost:3000) 觉得两个都一样，是因为 React 的脚手架工具（Vite/Webpack）内置的开发服务器已经帮你自动处理好了 BrowserRouter 的重定向问题。一旦打包部署上线，区别就出来了。

- 默认首选： BrowserRouter。它是现代 Web 应用的标准。

- 特殊情况选 HashRouter：

1. 你把项目部署在 GitHub Pages 上（GitHub Pages 对 SPA 的 History 模式支持很麻烦，用 Hash 最省事）。
2. 你只是要把打包出的 dist 文件夹扔给后台，后台人员告诉你“我不会配置 Nginx，你就给我个能点的 HTML 文件”。
3. 你的应用是一个完全不需要联网的本地文件系统应用（比如 Electron 包裹的本地网页）。

所谓 History API 路由，本质上是一场精心策划的“骗局”：

1. 你点链接： React 阻止了浏览器的默认跳转，用 pushState 假装跳了过去（改了 URL）。
2. 你点后退： React 监听 popstate，假装回退了（手动换组件）。
3. 你点刷新： 骗局穿帮了！ 浏览器真的拿着这个假 URL 去问服务器，服务器如果没有配置好（也就是之前说的配置），就会一脸懵逼：“我没有这个文件啊”，然后报 404。

这就是为什么 BrowserRouter 需要服务器配置，因为它在客户端“伪造”了路径。

### 路由有多少种？

- 普通路由
- 动态路由 :id
- 通配路由 *
- 嵌套路由 Outlet
- 路由守卫 ProtectRoute
- 重定向路由 Redirect Navigate

### 路由生成访问历史

history 对象，栈结构，每次路由切换，就会在栈中添加一个记录，记录了路由的路径和参数，当点击后退按钮时，就会从栈中弹出一个记录，然后根据记录中的路径和参数，渲染对应的组件。
<Navigate replace to='/new-path' />，replace属性， 是 redirect 跳转时，替换当前历史记录，不会添加新记录，new-path 替换 old-path

### 单页应用（SPA）
- 传统的开发是多页的，基于 http 请求，每次 url 发生改变后，去服务器重新请求整个页面。
  体验不好，页面会白一下
- 单页应用（SPA） react-router-dom html5 history api 实现的
  前端路由
  路由改变后
  前端会收到一个事件，将匹配的新路由显示在页面上


## typescript

Javascript 是动态类型语言，类型检查是在运行时进行的，而 typescript 是静态类型语言，类型检查是在编译时进行的。
强类型静态语言

## notes AI 全栈项目

- 登录功能

- 文章系统

- AIGC 功能

- nestjs 后端

### UI组件库 shadcn

- 页面由组件构成，选用第三方组件库

- shadcn 组件严格按需加载

- shadcn 组件可以下载到本地，可以随意的修改

- shadcn 基于 tailwindcss 实现组件的样式

- 配置 alias 设置路径别名，更短，好用


流程：

    - pnpm i shadcn@latest

    - 配置tailwindcss

    - 在 vite.config.ts 中配置 alias 设置路径别名，在 tsconfig.json 和 tsconfig.app.json 中配置 paths 路径别名
      - pnpm i -D @types/node 是为了在 ts 中使用 node 的内置模块 path

    - npx shadcn@latest init

    - npx shadcn@latest add button

    - npx shadcn@latest add card
  
npx 是 Node.js 自带的工具，用于临时安装并**执行** npm 包中的命令，无需全局或本地预先安装。

不用预先安装，试用，测试开发人员用，用完会删除

- shadcn 提供命令行工具

  - npx shadcn@latest add 组件名

 如果需要一个 button 组件
 npx shadcn@latest add button

### vite 的配置

- vite.config.ts 配置对象

  - plugins 插件数组
    - react | vue
    - tailwindcss
  
  - resolve 解析配置对象
    - alias 路径别名对象
      - @ -> __dirname/src
      - npm i -D @types/node，node 来到 ts 开发的时候，需要单独安装 node 的类型声明文件，js 不需要
  
### ts 的配置

根目录下的 tsconfig.app.json 和 tsconfig.json 配置对象

- compilerOptions 编译选项对象
  - baseUrl 基础路径
    - . 表示项目根目录
  - paths 路径别名对象
    - @/* 指向 src/*


### 路由

- 路由懒加载（性能优化的关键）
- suspense + lazy 实现路由懒加载
- 自定义loading组件
- 路由守卫

### 状态管理
pnpm i zustand
- 状态管理库
- 全局状态管理
- 全局状态管理的实现原理
- 全局状态管理的使用场景

### BackToTop 组件

- 通用组件
- 自有状态isVisible
- onScroll 判断一个阙值
- scroll事件频繁触发，性能优化
    节流，放在utils目录下，是一个工具函数
- 组件卸载时，移除scroll事件监听，防止内存泄漏

### 幻灯片组件 slides

- shadcn 提供了 Carousel、CarouselContent、CarouselItem 组件
- 一组组件，层次结构如下
    - Carousel 组件
        - CarouselContent 组件
            - CarouselItem 组件
- 自动播放的功能作为插件引入， shadcn 简单性能好，定制性更好
    useRef 持久化可变的对象
    plugins=[]
- api 向外暴露 Carsousel 的各种功能
  selectedIndex 私有状态
  api onSelect 方法 改变它
- 指示点
    循环输出
    动态类名
- css
  - transition-all
  - gradient 线性渐变，取代图片（渐变色）做背景
    性能优化 图片做背景 http下载的开销 减少http并发数

### store

- user 全局共享
- 每个页面级别组件都有自己独立的store
- 组件 UI 和 数据分离

### Post List

- 数据怎么提供呢？
  - 真实数据在后端
  - axios 请求后端api
  - 前端要等待后端接口吗？不能等，前后端分离的基础上，前端可以自行解决数据需求？ mock 一下，伪造请求
  api接口文档
  GET /api/posts?page=1&limit=10 返回内容
  {
    status: 200,
    list: Post[]
  }
  只要切换后端真正的地址，无缝对接

### mockjs

- 前端接口伪造，开发时候用，上线前切换为后端接口，无缝对接
- **pnpm i vite-plugin-mock -D**
- 配置 vite.config.ts
  - 引入 mock 插件
  - plugins 数组 加入 mock 插件
  - 配置 mock 插件的选项
    - mockPath 指向 mock 目录
    - localEnabled 开发环境下开启 mock 接口
    - prodEnabled 生产环境下关闭 mock 接口
- vite 启动 mock
- 前后端确立接口开发文档
- **pnpm i mockjs**
- mockjs 语法
- mockPath 新建posts.js
  export default {
    {
      url:,
      method:,
      response:(req, res) => {}
    }
  }
- mockjs 随机功能 @
- 分页机制
  - Page, limit parseInt
  - 计算 start, end
  - 分页数据 paginatedData
  - slice 截取数组
  - 返回分页数据
- **pnpm i axios**

### JWT 登录

- JWT 的工作流程（以登录为例）
1. 用户提交用户名/密码到服务器。
2. 服务器验证成功后，生成一个 JWT（含用户 ID、角色、过期时间等），用密钥签名。
3. 服务器将 JWT 返回给客户端（通常放在响应体或 Authorization: Bearer <token> 头中）。
4. 客户端存储 JWT（如 localStorage、cookie）。
5. 后续请求，客户端在 Authorization 头中携带 JWT：
```js
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx
```
6. 服务器收到后：
- 验证签名是否合法（防伪造）
- 检查 exp 是否过期
- 提取 payload 中的用户信息，无需查数据库（无状态）

- htttp 无状态的
Cookie Authorization token 身份令牌
- 颁发令牌 token
- 安装 jwt 库
  **pnpm i jsonwebtoken**
  json 用户身份对象 web 形式 token 令牌
  用户名+密码 { id:1, name:'admin' } json 加密成一个token
  请求时，再传来，服务器端 decode 得到用户对象

  - sign 方法 由服务器调用，服务器将用户对象，secret, 过期时间 加密成一个 token
  - verify 方法 由服务器调用，服务器将 token, secret 解密成用户对象
  - decode方法，解析请求头，Authorization 头中的 token，服务器拿到用户对象


## api 后端接口项目

- **npm install -g @nestjs/cli** 全局安装 NestJS 命令行工具
- **nest new posts** 新建项目

盖度模块化，依赖注入特性的企业级开发框架

- 数据库

### prisma ORM

将数据库映射成

Table -> 类
row -> 实例
props -> props
psql/mysql sql太专业了，prisma 翻译官
后端 -> prisma -> sql
User(service class) === User(table)
create === Insert
findMany === Select 

### ORM ObjectRelationMapping 对象关系映射

- **pnpm i prisma**

- **pnpm uninstall prisma**

- **pnpm i prisma@6.19.2**

### Prisma 的初始化流程

- 建数据库
- prisma 命令行 + @prisma/client(ORM)
- npx prisma init