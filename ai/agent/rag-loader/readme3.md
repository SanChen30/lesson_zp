# RAG loader 从各种来源加载文档

- loader
    载入任何类型文件
- splitter
    rawDocument -> Text Splitter -> chunks

## loader

- @langchain/community 文件类型很多 社区模块
- 网页loader


这两个导入的作用可以概括为：

### 1. import "cheerio";

**cheerio** 是一个在 Node.js 里用的 HTML 解析库，API 类似 jQuery：

- **作用**：把 HTML 字符串解析成可遍历的 DOM 结构，用选择器（如 $('p')、$('.title')）查找、读取或修改节点。
- **常见用途**：服务端抓取网页、解析 HTML、从页面里抽取正文/链接等，不依赖浏览器，速度快、体积小。

这里单独 import "cheerio" 一般是做**副作用导入**，确保 cheerio 被加载；具体用到的往往是后面的 CheerioWebBaseLoader（它内部会用到 cheerio）。

---

### 2. import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";

**CheerioWebBaseLoader** 是 LangChain Community 里的一个**文档加载器**：

- **作用**：用 HTTP 请求抓取指定 URL 的网页，用 cheerio 解析 HTML，然后把页面内容转成 LangChain 的 **Document** 对象（通常包含 pageContent 和 metadata）。
- **在 RAG 里的位置**：属于「加载」这一步——把网页变成可被切分（split）、向量化、检索的文档，供后续 RAG 流程使用。

总结：**cheerio** 负责解析 HTML；**CheerioWebBaseLoader** 负责「抓网页 + 用 cheerio 解析 + 转成 LangChain Document」，方便你做 RAG 的加载与后续处理。

## splitter

- 。，？ 天然的语义分割器
- chunkSize 大小衡量
- chunkOverlap 重叠，不是每一次都进行重叠，而是看语义是否完整，句号实现语义完整就不会进行重叠