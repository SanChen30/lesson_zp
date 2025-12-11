// node 服务器端代码
// 引用 node 内置的 http 模板，require 是 node 内置的函数
// require 模块化机制，node 早期的 commonjs 模块机制
// 在大型项目中，分目录（mvc），分文件（类），不可能只是一个文件
// JS 前端早期是没有模块化的，esm 是 es6 2015年引入的模块化机制，早期的JS任务简单
// ES6 正式引入ESM（ECMAScript Modules）
// no module -> node(全栈，commonjs) -> es6(esm) 



// 使用 CommonJS 模块语法引入 Node.js 内置的 http 模块，用于创建 Web 服务器
const http = require('http');

// 引入 Node.js 内置的 url 模块，用于解析客户端请求的 URL（注意：此方法已废弃，但此处仍可用）
const url = require('url');

// 模拟用户数据（在真实应用中通常来自数据库）
const users = [
    {
        id: 1,
        name: '张三',
        email: '123@qq.com'
    },
    {
        id: 2,
        name: '李四',
        email: '456@qq.com'
    },
    {
        id: 3,
        name: '王五',
        email: '789@qq.com'
    }
];

/**
 * 根据用户数据生成完整的 HTML 页面字符串
 * @param {Array} users - 用户对象数组
 * @returns {string} 完整的 HTML 字符串
 */
function generateUserHTML(users) {
    // 使用 Array.map() 将每个用户对象转换为 HTML 表格行（<tr>）
    // 利用模板字符串（反引号 ``）嵌入动态数据
    const userRows = users.map(user => `
        <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
        </tr>
    `).join(''); // 将所有行拼接成一个字符串（去掉数组默认的逗号）

    // 返回完整的 HTML 文档结构，内联 CSS 美化表格样式
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>User List</title>
        <style>
            /* 表格样式：全宽、边框合并、顶部留白 */
            table { 
                width: 100%; 
                border-collapse: collapse; 
                margin-top: 20px; 
            }
            /* 表头和单元格样式：灰色边框、内边距、左对齐 */
            th, td { 
                border: 1px solid #ccc; 
                padding: 8px; 
                text-align: left; 
            }
            /* 表头背景色 */
            th { 
                background-color: #f4f4f4; 
            }
        </style>
    </head>
    <body>
        <h1>Users</h1>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                ${userRows} <!-- 插入动态生成的用户行 -->
            </tbody>
        </table>
    </body>
    </html>
    `;
}

// 创建 HTTP 服务器
// 每当有客户端发起请求，就会触发这个回调函数
const server = http.createServer((req, res) => {
    // 解析请求的 URL（例如：/users?id=1）
    // 第二个参数 true 表示自动将查询字符串（?id=1）解析为对象
    const parsedUrl = url.parse(req.url, true);

    // 判断请求路径是否为根路径 '/' 或 '/users'
    if (parsedUrl.pathname === '/' || parsedUrl.pathname === '/users') {
        // 设置 HTTP 响应状态码为 200（成功）
        res.statusCode = 200;
        // 设置响应头：内容类型为 HTML，并指定字符编码为 UTF-8（支持中文）
        res.setHeader('Content-Type', 'text/html;charset=utf-8');
        // 调用函数生成 HTML 内容
        const html = generateUserHTML(users);
        // 将 HTML 发送给客户端并结束响应
        res.end(html);
    } else {
        // 如果请求了其他路径（如 /about、/api 等），返回 404 Not Found
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain'); // 纯文本响应
        res.end('Not Found');
    }
});

// 启动服务器，监听本地 1234 端口
// 当服务器成功启动后，执行回调函数
server.listen(1234, () => {
    console.log('Server is running on port 1234');
});