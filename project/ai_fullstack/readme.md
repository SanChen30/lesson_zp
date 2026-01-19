# AI 全栈项目




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


pnpm i zustand
- 状态管理库
- 全局状态管理
- 全局状态管理的实现原理
- 全局状态管理的使用场景