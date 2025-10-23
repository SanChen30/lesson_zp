# 使用n8n工作流 生成科技新闻速览

- openai 推出了AI浏览器 Atlas
  在AI时代，可以用AI把以前的东西重新做一遍

- 将重复的工作交给 n8n工作流自动去做
  - 哪里去获取重要的AI科技新闻
  - 摘要，总结一下

- 启动n8n "npx n8n"
  - js 运行环境可以是前端（浏览器）也可以是后端（node命令行），还是AI SDK的主流开发语言（JS、Python），甚至可以运行在单片机中
  - n8n 基于node 命令行
    n8n 是一个工具包，设计AI自动化工作流，25年是AIAgent自动化元年
  - npx node 是一个命令行工具，可以在命令行中运行node代码
  - npx n8n 可以在命令行中运行n8n工作流

## 打造tech 工作流，为每一天充电
- trigger 节点
  - 每天定时触发
- RSS 节点
  订阅源 连线RSS 
  有点像http请求节点
  直接提供了RSS节点，非常重要常见的信息来源节点

RSS（简易信息聚合）是一种用于发布和订阅网站内容（如新闻、博客更新）的标准化XML格式，允许用户通过阅读器集中获取最新信息更新。

《连线》杂志rss源: https://www.wired.com/feed/rss

- Filter 节点
  - 过滤出今天发布的新闻
- DataTransform EditFields 节点
  - 添加了一个自定义节点，将title和content合并成一个字符串
  并且添加Title:Content: 前缀描述，\n 隔开
  对大模型友好的内容，足够的清晰，prompt 
- Aggregate 节点
  - 合并所有新闻，变成一个字符串
- AI Agent 节点
  AI 代理，可以理解为智能小助手，借助大模型的能力，自主决策执行一些任务
  订票、查询天气、发送邮件等任务
  - temperature 参数 控制生成文本的随机性
    - 0 表示最确定的文本，1 表示最随机的文本
  - Prompt 提示词
    大模型工作的关键

- AIGC Generate Content 生成式AI
  - 生成文本
  - 生成图片
  - 生成视频
  

## JS Date 类型
- js 内置了日期类型 Date
  - new Date() 可以创建一个日期对象，得到当前日期时间
  - 接受时间毫秒数，可以创建指定时间的日期对象
  - getTime() 可以获取日期对象的时间毫秒数
  - 60*60*24*1000 是一天的毫秒数