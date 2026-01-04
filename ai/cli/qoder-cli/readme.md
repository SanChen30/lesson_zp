# qoder-cli

命令行 AI coding Agent
基于阿里 qwen 编程大模型，构建 AI Agent 的命令行框架。

- 安装

npm i -g @qoder-ai/qodercli

qodercli 进入命令行界面

/init 初始化项目 -> AGENTS.md 文件
AI开发项目，给LLM项目的角色描述，LLM会根据描述生成项目的代码。

## 为什么有了 Trae/Cursor 编译器之后还需要 qoder-cli,claude-cli 命令行式 AI Agent？

未来的**开发界面**不会只有IDE，还会有cli(commmand line interface)命令行式开发界面，最好即是两者融合

IDE 适合深度上下文与复杂任务处理
CLI 具备深度、灵活性与自动化能力

双AI引擎的新AI编程模式
端到端的AI自主开发模式

## mcp Model Context Protocol

MCP 是一种基于 JSON 格式的通信协议，用于在 AI 模型之间传递上下文信息。

MCP 让AI应用以统一方式向大模型提供结构化上下文（如工具、文档、数据库等），并接收模型生成的结构化响应（如代码、文档、注释等）。

安装两个MCP工具playwright、context7

- qodercli mcp add playwright -- npx - y @playwright/mcp@latest
- qodercli mcp add context7-- npx - y @upstash/context7-mcp@latest


## palywright 工具

是一个用于端到端测试的工具，它可以模拟用户在浏览器中的操作，如点击、输入、导航等。

## context7 工具

是一个用于上下文管理的工具，它可以帮助AI模型更好地理解和处理上下文信息。

当 LLM 生成的代码是老版本，或不太行的时候 context7 来了，大模型在训练时可能还没有现在最新的版本，所以需要 coontext7 获取最新的上下文

context7 是一个 MCP 服务，在生成代码指令发出前，带上指定的版本的库的文档作为上下文，大模型根据上下文生成最新的代码。
