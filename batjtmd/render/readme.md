# HTML/CSS/JS 是如何渲染页面的？

1. 浏览器渲染页面有哪些流程？

1) HTML/CSS/JS 输入 -> 浏览器(Chrome) -> 输出一张图

2) 电脑 1s 可以渲染 60 帧

2. 渲染流程

3) 流程复杂
4) 时间开销
5) 性能优化

3. HTML/CSS/JS 

1) **解析HTML，构建DOM树**

浏览器不太好直接处理字符串，转换成树形结构处理

- 输入 HTML 字符串
  标记 -> 节点
  文本 -> 文本节点
  树 -> 递归
  
- 输出 DOM 树
  document
  内存中就有了document DOM根节点

- 如何正确使用HTML?
  认真把html写好，语义化，SEO就会好
  搜索引擎优化 Search Engine Optimization
  在百度输入查询，百度派出蜘蛛去爬取各家网站，针对html 算法分析，查询内容和相关网页的相关性
 - 结构语义化标签 header、footer、main、aside、section、article
 - 功能语义化标签 h1-h5、p、ul、li、code
 - main 放在前面， aside 放在后面？
  - 主内容先下载，再下载侧边栏
  - flex 的 order 属性，调整侧边栏位置

2) **解析CSS，构建CSSOM树**

浏览器怎么理解css? 字符串文本也不适合被处理，也转换成树形结构处理

- CSSOM 树 (CSS Object Model 树) 
- 找到相应的 HTML 节点， CSS 节点和 HTML 节点 进行匹配
- 合并 CSS 规则，生成 CSSOM 树