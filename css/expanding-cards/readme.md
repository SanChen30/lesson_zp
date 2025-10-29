# 弹性布局

弹性布局是指在页面中，元素的宽度和高度可以根据页面的大小和内容的变化而自动调整的布局方式。

1. HTML文档
   一些html片段，html**文档流**
   默认从上到下（块级），从左到右（行内），像水流一样流满整个页面

2. 块级、行内元素
- display: block; //可以设置宽高，适合做容器
- display: inline; //不可以设置宽高，不适合做布局
- display: inline-block; //可以设置宽高，适合做布局，但是会有空格问题
  
3. 布局 css实现
- 两列式布局
    切换display为inline-block
- 三列式布局

1. 弹性布局
   - display: flex;