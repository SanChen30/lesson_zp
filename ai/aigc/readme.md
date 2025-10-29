# AIGC 人工智能生成内容

## 生成文本

model: "gpt-3.5-turbo-instruct",

## 生成图片

model: "dall-e-3",

- 安装 openai, dotenv 这两个模块，我们已经在别的地方安装过，如何优化?

不需要重复安装，我们可以使用`pnpm`代替`npm`，共享，更快更省空间

1. npm init -y
  初始化后端环境 package.json 项目描述文件

2. npm install -g pnpm
  安装pnpm,pnpm 是比 npm 更快、更省磁盘空间的 JavaScript 包管理工具

3. pnpm i openai@4.71.0 dotenv@17.2.3 要和上次安装的版本一致
   pnpm i dotenv openai 没有指定版本号的安装，默认安装最新版本

4. node main.mjs
  - node 以命令行运行main.mjs
  - main.mjs 单点入口 方便管理
  - mjs 模块化的js, import from 导入模块
  - 程序运行后，将是一个独立的进程（process）
  - 进程是分配资源的最小单位
  - 前端document 是浏览器的文档对象模型，是前端的入口;后端process 是Node.js的进程对象模型,是后端的入口
  - process.env 进程在执行的时候可以读取到环境变量，环境变量是程序可以获取的一些我们的参数、配置

5. dotenv 是一个零依赖模块，用于从 .env 文件加载环境变量
   它会将 .env 文件中的变量加载到 process.env 中
   可以在代码中使用 process.env 来访问这些变量

## Prompt 提示词

- 提示LLM，一段话，LLM根据这段话生成文本或图片，用聊天的方式给LLM下达指令
- 如果你要让大模型帮我们执行复杂的任务，需要精心设计Prompt

## Prompt Engineering 提示工程

- 设计出合理的Prompt ， 才能让大模型按照我们的意图执行任务
- 提示工程是一个迭代的过程， 不断优化Prompt ， 才能得到我们期望的结果
- 有时候，LLM 性能不太行的时候，提示词也许可以独当一面
- 提示词的编写上升到工程的角度，有些AI项目的核心就是几段提示词
  
## 数据分析