// B/S 架构 Browser/Server 浏览器/服务器 Web程序
// C/S 架构 Client/Server 客户端/服务器 通信
// mcp 协议 通信协议
// mcp client : cursor/trae
// mcp server : my-mcp-server.mjs
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
// 标准输入输出传输层
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

// tool 数据服务 
// 模拟数据库
const database = {
    users: {
        "001": { id: "001", name: "张三", email: "zhangsan@example.com", role: "admin" },
        "002": { id: "002", name: "李四", email: "lisi@example.com", role: "user" },
        "003": { id: "003", name: "王五", email: "wangwu@example.com", role: "user" },
    }
}


// 初始化一个 MCP 服务器，命名为 my-mcp-server，版本 1.0.0
const server = new McpServer({
    name: 'my-mcp-server',
    version: '1.0.0',
});


//  注册工具（Tool）
server.registerTool('query-user', {
    description: '查询数据库中的用户信息，输入用户ID，返回该用户的详细信息（姓名、邮箱、角色）。',
    inputSchema: {
        userId: z.string().describe('用户ID，例如：001, 002, 003')
    }
}, async ({ userId }) => {
    const user = database.users[userId];
    if (!user) {
        return {
           content: [
            {
                type: 'text',
                text: `用户ID ${userId} 不存在。可用的ID: 001, 002, 003`
            }
           ] 
        }
    } else {
        return {
            content: [
                {
                    type: 'text',
                    text: `用户ID ${userId} 的信息如下：\n姓名 ${user.name}，\n邮箱 ${user.email}，\n角色 ${user.role}`
                }
            ]
        }
    }
})


// 注册资源：使用指南 提供资源给llm 
// model tool resource promptTemplate protocol
// model context protocol 上下文协议
server.registerTool('使用指南', 'docs://guide', {

})


// 启动服务器（连接传输层）
// 创建一个基于 标准输入输出（stdio） 的传输通道
// 调用 server.connect() 启动服务，开始监听来自客户端的请求（通过 stdin 读取，stdout 输出）
const transport = new StdioServerTransport();
await server.connect(transport);