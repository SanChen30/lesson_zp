# Ajax 数据请求

Ajax 全称 Asynchronous JavaScript and XML，异步的 JavaScript 和 XML。

1. 流程

1) 实例化 new XMLHttpRequest();
2) open 打开一个请求
3) send 发送请求
4) onreadystatechange 事件监听 

xhr.readyState

- 0 未初始化
- 1 已打开
- 2 已发送
- 3 正在接收
- 4 已完成