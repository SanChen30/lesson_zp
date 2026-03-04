# MCP

- llm with tools
  
  read write listDir exec tool
  llm + tools = Agent
  llm 调用 tools 执行任务

- mini-cursor
   llm with tools 不太满意？
   更多的tool，更好的tool，第三方的tool
   向外提供 tool，大厂将自己的服务以 mcp 的方式向外提供
   - 80% 的 App 会消失
   - 集成第三方 mcp 服务，mcp 其实就是 tool
   - node 调用 java/python/rust 等其他语言的 tool
   - 远程的 tool

## MCP

本质就是 tool

Model Context Protocol（MCP） 是由 Anthropic 提出的一种开放协议，目的是为 大模型（LLM）与外部工具、数据源、系统环境之间的交互 建立统一标准。

大模型的「USB-C 接口标准」
就像 USB-C 统一了设备连接方式，MCP 试图统一 模型如何读取上下文、调用工具、访问本地资源和外部系统。

MCP 解决的问题是：
以前：每个 AI 应用都要为不同模型单独写工具调用适配层
现在：只要支持 MCP，模型和工具可以按标准协议通信

在大量的将本地、跨语言、第三方的 tool 集成到 llm 中，让 llm 强大的同时，也会带来一些复杂性（对接联调）大家都按一个约定来

## 按 MCP 协议来开发，将我们的服务或资源输出

## MCP 协议还有通信部分
 - stdio 本地命令行
 - http 远程调用

## MCP 最大的特点就是可以跨进程调用工具
 - 子进程 node:child_process
 - 跨进程 java/rust
 - 远程进程
 llm 干更强大的任务
 繁杂（本地、跨语言、跨部门、远程）不同的通信方式（stdio、http）
 规范的提供工具和资源，mcp 协议

## 编写满足 mcp 协议规范的 Tool

- Model Context Protocol
  tool -> result -> ToolMessage -> context -> model

- Anthorpic 24年底发布了 MCP 协议，25年底贡献给开源社区
- sdk，**pnpm i @modelcontextprotocol/sdk**，用于在 Node.js 中实现 MCP Server 或 MCP Client。

MCP 的核心作用是：

让大模型可以通过标准协议调用外部工具（文件系统、数据库、终端、API等）。