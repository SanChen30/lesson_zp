# langchain

2022年，chatgpt 横空出世，基于 transformer 架构，实现了基于文本的对话。

langchain 比 chatgpt 还早，现在终于推出了 1.0+ 版本

AI 应用开发框架

## langchain = lang + chain

language model + chain，n8n,coze 链接起来

chains 是 langchain 中的一个重要概念，它是一个可执行的序列，用于将多个 language model 连接起来，实现复杂的任务。

基于 node 开发

- 项目使用 ESM 模块规范
    package.json 中添加 type:module
- 项目依赖 langchain 1.2.3 版本
- pnpm i @langchain/deepseek，LLM 变的可拔插
  LLM 性价比、更新换代、频繁变化，langchain 提供了可拔插的接口，方便开发者切换不同的 LLM。
  适配器模式，将不同的 LLM 适配为 langchain 中的标准接口。
  - langchain 统一接口
  - completion 接口，用于调用 LLM 生成文本
  - stream 接口，用于调用 LLM 生成文本流
  - 其他接口，如 chat 接口、embedding 接口等

## Demo1