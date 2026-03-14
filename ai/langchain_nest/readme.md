# Nest + langchain 实现 AI 接口

- 大多数 Agent 都是跑在后端服务
    Nest +Langchain 开发 api 接口
- nest?
    nodejs + typescript 的最主流框架
    底层是 express （轻量级），
    提供了严谨的 MVC、DI（依赖注入 Dependencies Injection）等架构特性
    React MVVM  Model-View-ViewModel

- 创建项目
    nest new hello-nest-langchain
    npm run start:dev
    - MVC 在哪？
    后端的开发设计模式
    Model Service 数据操作，远程 rpc 调用
    View（前后端分离）
    Controller 控制器 参数校验和逻辑处理业务
    module 会将Controller Service（providers）import 外部服务 组合起来形成一个功能模块，
    适合企业级开发。
    - DI
    - 装饰器模式
    面向对象设计模式之一
    函数或类快速通过装饰器 增强功力
    - restful
    一切皆资源
    book (名词) + CRUD (HTTP Method 动词)

- nest g res book --no-spec
- nest g res ai --no-spec
- pnpm i @nestjs/config
- pnpm i @nestjs/serve-static