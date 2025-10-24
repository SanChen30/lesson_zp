# OpenAI AIGC Models 特指 OpenAI 公司开发的用于生成各类内容的人工智能模型系列。

## openai 提供了LLM SDK（大语言模型 软件开发工具包）
- 初始化一个后端项目
  node 是 js 的后端实现，命令行运行
  npm (Node Package Manager) ，npm 是 Node.js 的包管理器
  - 安装依赖
    npm install openai
  - 初始化项目
    npx express-generator
  - 启动项目
    npm start

  1. npm init -y 快速初始化 Node.js 项目，使用所有默认配置
  2. npm i openai@4.71.0 安装指定版本 4.71.0 的 OpenAI 官方 Node.js SDK
- node 以其轻量级开发，适合中小型项目，占据大量开发市场
- openai llm 成为事实上的标准
  - completion 文本补全接口
    Completion = 单轮文本生成
  - chat 对话接口 
    Chat = 多轮对话 + 角色系统 + 更优性能
- 配置.env 文件
  - 从环境变量中获取 API 密钥
  - 从环境变量中获取 baseURL

## LLM 
- 来自openai
- LLM gpt-3.5-turbo-instruct
- 文本生成
- 安装了openai sdk package
- 实例化，apiKey，baseUrl
- 调用completions.create 方法
- 本质是向 api.openai.com/completions 发送 POST 请求
- 返回json choices[0].text 字段，即生成的文本

导入OpenAI库--> 创建客户端 --> 发送Completion请求 --> AI处理提示词 --> 返回生成结果 --> 提取第一条结果 --> 输出歌词