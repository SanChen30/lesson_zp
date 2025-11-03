# 盒模型 box

1. 盒子在页面（文档流）的占位

1) 由内容(content)、内边距(padding)、边框(border)、外边距(margin)组成

2) 盒模型的计算方式 = 内容(content) + 内边距(padding) + 边框(border) + 外边距(margin)

- 标准盒模型

css 默认盒子的**宽高**并不是盒子在页面的大小，只是内容的大小，`box-sizing` 默认为`content-box`

- 怪异盒模型

`box-sizing: border-box;` 盒子设置的宽高 = 内容 + 内边距 + 边框

