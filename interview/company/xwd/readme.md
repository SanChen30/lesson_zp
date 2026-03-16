# 星物种

- 公司
    方向 机器人AI
    A轮 有价值的公司
    薪资 150-250 杭州的中等薪资
    前端团队规模（有没有人带）开发流程

## 浏览器的渲染机制

- 脑海中要有一张图

- 首先，浏览器拿到URL之后会发起网络请求，开始下载HTML。
HTML是流式解析的，也就是边下载边解析。HTML解析器会把标签逐步解析成DOM树。
在解析过程中如果遇到link，style 等css请求，浏览器会发起css请求，并交给css解析器生成CSSOM树。

- 接着，如果在解析HTML的过程中遇到JavaScript，默认情况下JS会阻塞DOM构建（document.title 修改节点）。
浏览器会暂停DOM解析，交给V8引擎执行JS，执行完之后再继续解析HTML。

- 然后，当DOM树和CSSOM树都构建完成后合并生成Render Tree（渲染树）。
    渲染树只包含需要显示的节点，display: none 的节点不会进入渲染树。

- 接着，进入Layout（回流、重绘）阶段，浏览器会根据盒模型、位置、尺寸等信息计算每个元素在页面中的几何位置和大小，生成布局树。

- 然后就是Paint（绘制），浏览器会把每个元素的颜色、背景、阴影、边框等绘制出来。

- 最后进入Composite（合成）阶段。浏览器会把页面拆成多个图层，比如transform、opacity、popsition:fixed、动画等元素可能单独成为合成层，然后交给GPU做图层合并，最终显示到屏幕上。

总结：HTML解析 -> DOM树 + CSSOM -> Render Tree -> Layout -> Paint -> Layer -> Composite

- html 优化
    - 语义化标签，有利于SEO（Search Engine Optimization，搜索引擎优化），也有利于代码维护，而不是通篇优化
    - 合理使用id/class，避免重复选择器，便于样式和脚本维护
    - 懒加载非首屏 DOM/资源，图片懒加载，降低渲染压力
    - 避免频繁操作DOM，可先缓存节点或用文档碎片批量更新
    document.createDocumentFragment();

- css 优化
    - * 通配符，换成标签选择
    - 小图片（icon）转base64减少请求，大资源任用外链避免css体积过大
    - 抽离通用样式，减少代码冗余。（面向对象）
    - 合理使用css变量，统一主题样式，便于维护
    - 避免使用!important 
    - tailwindcss 原子类开发，很少需要手写样式
        - 原子类css，组合样式，无需写css
        - 原子类名语义化，减少命名成本
        - 团队风格统一，降低沟通成本
        - 按需编译，体积可控，适配响应式
  
- script 优化
    - 放底部
      - <script src="" defer></script>
      - <script src="" async></script>
      都不会阻塞DOM树的生成
      defer: 
        ✅ 不阻塞 HTML 解析：脚本会异步下载，同时 HTML 继续解析。
        ⏱️ 执行时机：等整个 HTML 文档解析完成（DOMContentLoaded 之前），按出现顺序依次执行。
        📌 适合：依赖 DOM 结构的脚本（比如操作页面元素的 JS）。
      async: 异步加载 下载后执行
        ✅ 不阻塞 HTML 解析：脚本异步下载。
        ⚡ 谁先下载完谁先执行：不保证顺序！
        📌 适合：独立脚本，比如统计代码（Google Analytics）、广告脚本等，不依赖 DOM 也不被其他脚本依赖。
    - 变量使用 let/const 减少全局变量污染
    - 频繁DOM操作先缓存节点，批量更新
    - 函数拆分复用，避免冗长代码
    - 异步逻辑使用async/await，替代回调地狱

- 性能优化
    - 减少回流，重绘
    回流一定会触发重绘
    回流需要计算几何位置和尺寸，代价非常高
    - 触发方式
    修改 width/height/margin/padding
    修改 fontSize
    DOM 的插入删除
    读取布局属性 el.offsetHeight 
    el.getBoundingClientRect() 得到元素相对视窗的关系
    

## GET 和 POST 的区别，以及一次HTTP请求包含哪些信息

- 核心区别
    从 Restful HTTP 语义上来说，GET 是获取资源，POST 是提交数据新增资源。
- 数据传输方式上
    GET 的参数一般放在 URL QueryString 里
    /api/user?id=1&name=admin 长度受限 2kb-8kb 左右
    POST 数据一般放在请求体（Request Body）里
    GET 不是不可以发送请求体，只是服务器和浏览器约定不用。

- 安全性
    GET/POST 都是明文传输，POST相对安全一些，安全性是来自于HTTPS

- 幂等性
    HTTP 是无状态的
    GET n次请求都一样
    POST 不一样的

- 缓存
    GET 会缓存
    POST 一般不缓存

- 包含信息
    - 请求行
      - 请求方法 GET/POST/PUT/PATCH/DELETE/OPITIONS/HEAD等
      - 请求路径、HTTP版本
    - 请求头
      Authorization: Bearer token
      Cookie
      ContentType
    - 请求体 一般出现在 POST/PUT/PATCH

- 为什么TCP需要三次握手
    确认双方都具有发送接收的能力
    SYN + ACK
    开始的接收方在发送应答ACK消息的同时，可以发送SYN消息