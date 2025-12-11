# 响应式驱动界面的诞生

- 前后端分离
- ref 响应式数据，将数据包装成响应式对象
- 界面由{{}} v-for 进行数据驱动 template 渲染
- 聚焦于业务，数据的变化

## 纯后端的套模板

1. mvc 开发模式

- model 数据

mysql 数据库抽象

- view 模板

html {{todos}}

- controller 控制器

查询 model 数据
渲染 view 模板

- http 伺服

 - req.url 
 - res.end
   - html 静态部分
   - 动态部分，由数据驱动

## 前后端分离

- 前端

html/css/js
ajax/fetch 前端可以主动的拉取数据
http://127.0.0.1:5501/vue/ref/demo2/frontend/index.html

- 后端

没有返回 html
数据接口 api :3000/users
http://localhost:3001/users

- 优势是开发人员解耦
  - 前端开发人员 只需要关注 数据的显示、用户体验
    缺点是 DOM 编程，先找节点（不是业务）
    如何 focus 业务？ 数据驱动界面
  - 后端开发人员 只需要关注 数据的处理、并发性能

## 响应式数据驱动

1. 响应式数据**驱动**的界面（template 模板）
  {{}}
  根在后端套模板的业务中来
  不用做 DOM API，麻烦，性能还不好


## 模块化

1. 早期 JavaScript（1995–2009）—— 无模块系统
2. 社区方案兴起（2009–2014）—— CommonJS、AMD、UMD
3. ES6 / ES2015 —— 官方标准 ESM 诞生 
4. 构建工具桥接时代（2015–2020）

如今（2025 年）：

现代浏览器原生支持 ESM（<script type="module">）
Node.js 原生支持 ESM（.mjs 或 "type": "module"）
构建工具（Vite、Rollup）优先基于 ESM 设计
npm 包越来越多提供 双包格式（CJS + ESM）

