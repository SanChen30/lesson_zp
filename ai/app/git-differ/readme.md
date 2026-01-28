# Git 提交AI神器

1. 需求
  - 规范的 git 提交信息是很重要的
    - 项目的日志
    - 工作业绩的审核， leader 要看 
    - 新手可以像高手一样高质量提交代码 （git 高级规范）

2. 技术构成
  - 全栈项目
  - 前端 react + tailwindcss + axios
  - 后端 nodejs + express 

3. 前后端分离

  1) server 目录
    - 运行在服务器上
    - 提供 API 接口，3000 端口，监听请求
    - **npm init -y** 初始化 nodejs 后端项目
    - **pnpm i express** 安装 express 框架
    - http://localhost:3000 
    - nodemon 监听文件变化，自动重启服务器，热更新，不需要手动重启

  2) frontend 目录
    - 在用户的浏览器上运行（v8 引擎，js 运行的宿主）
    - http://localhost:5173 前端Web

4. AI
   - ollama 部署开源大模型 deepseek-r1:8b，r -> reasoning 推理能力，需要耗GPU，会慢一点
   - 像 openai 一样的 API 接口
   : 11434 端口
   - 模型 deepseek-r1:8b



## express

1. 示例代码，快速上手**express**
  ```js
  import express from 'express'; // 引入 Express
  const app = express();         // 创建应用实例
  const port = 3000;

  // 中间件示例：解析 JSON 格式的请求体
  app.use(express.json());

  // 路由 1: GET 请求
  app.get('/', (req, res) => {
  res.send('Hello World! 这是我的第一个 Node 服务');
  });

  // 路由 2: POST 请求 (模拟数据接收)
  app.post('/api/data', (req, res) => {
  const data = req.body;
  console.log('收到数据:', data);
  res.json({ message: '数据已接收', received: data });
  });

  // 启动服务器
  app.listen(port, () => {
  console.log(`服务器正在运行: http://localhost:${port}`);
  });
  ```

  - node 老牌的敏捷开发框架
  - app 后端应用
  - listen 3000 监听 3000 端口，等待请求
  - 后端路由 path
  网站本质是提供资源和服务的
  app.get('/hello', () => {})
  http 是基于请求响应的简单协议
  http://localhost:3000/hello
  ip 找到服务器
  端口对应的是应用 express
  path /hello
  GET 资源操作 增删改查 CRUD（create read update delete）
  req 请求对象
  res 响应对象


- apifox 测试 API 接口
- nodemon 可以让我们边调试边开发
- express 默认不支持 req.body 解析
  - 加一个 json 解析中间件
  - 请求  中间件1,中间件2...  响应
- 中间件
  app.use(express.json()); // 解析 JSON 格式的请求体


1. GET 和 POST 区别
  - GET 没有请求体，只能在 url 上传递参数，用来获取资源
  - POST 有请求体，可以传递复杂的数据，用来创建资源

2) 本质区别：语义与副作用

在 RESTful 架构风格中，每个动词都有特定的含义：
GET (获取):
语义: 向服务器索取数据。
性质: 安全 (Safe) 且 幂等 (Idempotent)。意味着 GET 请求应该只是读取数据，不应该改变服务器上的状态（比如不能用 GET 去删除一条记录）。

POST (提交):
语义: 向服务器提交数据，通常用于创建新资源或处理数据。
性质: 非安全 且 非幂等。意味着 POST 请求会改变服务器状态（比如创建新用户、写入数据库），且执行多次可能产生不同的结果（比如创建了 10 个用户）。

3) 区别总结
GET 用于获取资源，POST 用于创建资源。
GET 请求是安全的，不会改变服务器状态；POST 请求是不安全的，可能会改变服务器状态。
GET 请求是幂等的，多次请求相同资源结果相同；POST 请求不是幂等的，多次请求可能会创建多个资源。

2. 状态码

范围,               类别,               核心态度,               典型代表
2xx,            Success,                搞定了,         "200 (查/改), 201 (增), 204 (删)"
3xx,            Redirection,            去那边,         "301 (永久), 302 (临时), 304 (缓存)"
4xx,            Client Error,           你错了,         "400 (参数错), 401 (没登录), 403 (没权限), 404 (没找到)"
5xx,            Server Error,           我错了,         "500 (代码崩了), 502 (网关崩了)"

1) 1xx: 信息性状态码 (Informational)

理论含义: 协议处理的中间状态。服务器收到请求，需要请求者继续执行操作。

    常见场景: 在常规 REST API 开发中非常少见，通常底层框架（Node.js http 模块）会自动处理。
    例子: 101 Switching Protocols: 客户端要求协议升级（例如从 HTTP 升级到 WebSocket 时握手成功）。

2) 2xx: 成功 (Success)
   
理论含义: 操作被成功接收、理解并接受。

- 关键代码:
    200 OK: 最标准成功。GET 请求拿到了数据，PUT 请求更新了数据。
    201 Created: POST 请求成功，并且服务器创建了新的资源。规范: 响应头通常包含 Location 字段，指向新资源的 URL。
    204 No Content: 请求成功，但响应体为空。场景: DELETE 请求成功后（资源删了，没什么好返回的，但这代表成功）。

3) 3xx: 重定向 (Redirection)

理论含义: 资源位置发生了变动，客户端需要采取进一步操作（通常是自动跳转）。

- 关键代码:
    301 Moved Permanently: 永久重定向。影响: 浏览器/搜索引擎会缓存这个跳转，“记住”旧地址已经作废，下次直接访问新地址。SEO 权重会转移。
    302 Found: 临时重定向。影响: 资源只是暂时搬家，浏览器不会缓存跳转关系。
    304 Not Modified: 未修改 (缓存命钟)。理论机制: 客户端发起请求时带上了 If-None-Match (Etag) 头，服务器判断文件没变，于是返回 304。结果: 不返回 Body，客户端直接使用本地缓存。这是 HTTP 性能优化的关键。
4) 4xx: 客户端错误 (Client Error)

理论含义: 客户端发起的请求有问题（格式错、参数错、权限不够），服务器无法处理。责任在客户端。

- 关键代码:
    400 Bad Request: 语法错误。通用的错误，比如 JSON 格式不对，或者必填参数缺失。
    401 Unauthorized: 未认证。直译: “你是谁？”场景: 缺少 Token，或者 Token 过期。
    403 Forbidden: 禁止访问。直译: “我知道你是谁，但你没权限。”场景: 普通用户试图访问管理员接口。
    404 Not Found: 资源不存在。URL 写错了，或者 ID 查不到数据。
    405 Method Not Allowed: 方法不允许。场景: 接口只支持 GET，你非要发 POST 请求。
    429 Too Many Requests: 请求过多。触发了服务器的限流 (Rate Limiting) 机制。

5) 5xx: 服务器错误 (Server Error)

理论含义: 请求是有效的，但服务器处理时出错了。责任在服务端。

- 关键代码:
    500 Internal Server Error: 内部错误。代码抛出了未捕获的异常 (Exception)，或者数据库连接断了。这是后端最不想看到的错误。
    502 Bad Gateway: 网关错误。场景: Node.js 进程挂了，前面的 Nginx 转发请求时连不上 Node.js，Nginx 就会返回 502。
    503 Service Unavailable: 服务不可用。服务器超载或正在维护。

## 跨域

有风险

- www.baidu.com（用户安全） ->  www.dy.com
- http:// (协议) www.baidu.com (域名):5173 (端口)
- 同源策略: 协议、域名、端口都相同，才被认为是同源。
- 非同源即跨域，浏览器会直接放弃请求，不返回任何数据。CORS Cross-Origin Resource Sharing 跨域资源共享
- 端口不一样，也会被认为是跨域，非常严格

解决跨域

前端运行在 http://localhost:5173 (Vite)，而后端运行在 http://localhost:3000 (Express)。
由于端口不同，浏览器出于安全考虑，默认禁止这种跨域请求。
你需要告诉后端：“我允许来自 5173 端口的请求。”

配置 Express CORS
- pnpm i cors
- import cors from 'cors';
- app.use(cors());


- 由前端发起跨域接口请求（端口port: 5173），需要数据
- 浏览器，用户是小白，为了用户安全，默认禁止跨域请求，同源策略保护用户，block 阻止请求
- 后端默认不允许跨域请求，需要配置允许跨域
  如果允许呢？就好像给我们前端特批了签证一样，浏览器放行