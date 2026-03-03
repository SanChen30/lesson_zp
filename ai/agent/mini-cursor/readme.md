# 手写 cursor 最小版本

## 近期Agent 爆火产品
- 千问点奶茶 豆包 元宝
  互联网计算向 AI Agent 推理，运行的一个划时代的产品，更复杂，更智能，更强大。
- OpenClaw 
  一人公司
  虚拟数字人，多 Agent
  编程 Agent(cursor) ppt 算账 市场
  任务拆解、计划，找到一批需要的 Agent，完成任务。
  Manus
  开源版本的Manus
- seedance 抖音视频的数据

- 从 llm prompt engineering （DeepSeek）-> Agentci engineering (全栈)
  
- AI Agent 如何打造？
  - 直接调用大模型？获得智能，生成代码
    gemini 3.1 pro
  - 你上周和它聊过的消息，它是不是记不住？Memory
  - 你让他帮你访问一个网页，做一些事情，Tool
  - 你想让他基于公司内部的私密文档做一些解答，RAG

AI Agent = llm + Memory + Tool + RAG + Prompt Template

## Agent 是什么
其实就是给大模型拓展了Tool和Memory，它本来就可以思考，规划，你给它用 Tool 拓展了能力，
它就可以**自动**做事情，用 Memory 管理记忆，它就可以记住你想它记住的东西，还可以使用 RAG 
查询内部知识来获取知识（context）

这是一个知道内部知识，能思考规划，有记忆，能够帮你做事情的扩展后的大模型，就是一个Agent

## Tool 工具

### 用 react 创建一个 todoList
- 任务，期待 Cursor 编程 Agent 完成
- LLM 思考（thinking），规划（planing）aigc 生成代码
- tool 让 LLM 扩展 有读写文件的能力，项目就生成了
- tool bash 执行命令

### Langchain
是一个 AI Agent 框架，提供了 memory tool rag 等功能，帮助你快速搭建一个 Agent
后端功底（nodejs、nestjs）

AI Agent 全栈开发

## LLM with Tools
- LLM 选择
  qwen-coder-turbo
  apikey: sk-653a71e2319948d188334999e029ed66
  baseurl: https://dashscope.aliyuncs.com/compatible-mode/v1
- tools
  [read, write, exec]
- **pnpm i @langchain/openai** 适配了常见的模型


- fs
  readFile
  writeFile
  mkdir
  readdir