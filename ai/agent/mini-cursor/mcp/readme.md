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

- 为什么需要 MCP 配置？
  - 编程 Agent cursor 支持 MCP client
  - 读取 mcp.json 需要的 mcp tool
- 手写 MCP tool
  - tool 的基础上加上 MCP 规范
  - tool 需要一个 server 容器，@modelcontextprotocol/sdk/server
  - tool 实现 MCP 协议的 server 端
  - server.registerTool 注册 tool
  - server.connect 启动 server，transport 连接到 stdio 或 http

## MCP 三者关系

- MCP Host（宿主）
    承载 AI Agent/LLM 会话与工具编排的环境。

- MCP Client（客户端，工具适配层）
    遵循 MCP 协议的“工具接口实现”。
    Client 是“插座转接头”。Host 只需要会用 MCP 插头，就能驱动各种异构工具。

- MCP Server（服务端，执行层）
    实际执行工具逻辑的进程/服务。

- 工作流程（端到端链路）

1. 启动与发现：
  - Host 启动 Agent，会读取配置（manifest、配置文件、或 UI 中的插件列表）。
  - Host 通过 MCP Client 发现可用工具（工具名、参数 schema、权限说明）。
  
2. 调用流程（一次工具调用的标准路径）：
  - 用户在 Host 里触发任务（或 LLM 规划出需要用某个工具）。
  - Host 选择相应的 MCP Client，并向其发起调用，请求体含：工具名、参数、上下文片段、会话 ID。
  - MCP Client 校验参数，按约定协议把请求转发给目标 MCP Server。
  - MCP Server 执行实际逻辑（访问 API/DB/文件/编译/搜索等），产出结果。
结果回传：Server → Client → Host → 反馈给 LLM/用户；Host 可做结果持久化、可视化与审计。

3. 错误与恢复：
  - Client 通常负责把 Server 的错误翻译成统一错误码/结构，便于 Host 做重试、降级或提示用户。
  - Host 可根据工具声明的幂等性与超时策略决定是否自动重试或切换备用工具。