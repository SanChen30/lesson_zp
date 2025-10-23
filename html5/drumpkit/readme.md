# HTML5 敲击乐

## HTML5 web 应用
- 编写页面结构
- 模块化职责分离
  专业、可维护、可拓展
  css 负责样式 link 在head 引入
  js 负责交互 script 在body 的底部引入
- 浏览器是执行前端代码的程序
  - 下载并解析 html 结构
  - link 标签 引入 css
  - script 交互放到后面
    script 如果放在前面会阻塞html的下载和执行

## 静态页面
HTML & CSS 生成静态页面
- CSS Reset 的作用是通过统一或清除不同浏览器对HTML元素的默认样式差异，为样式开发提供一个一致、可预测的基础。
- * 选择器，匹配所有元素，性能不好
- 业界推荐的css reset
    列出所有的元素，代替* 选择器
- html 结构
    通过选择器
    标签选择器
    类选择器
- 背景的使用
  background-size: cover|contain;
  cover 以盒子为主，背景图片会被等比例缩放，以铺满盒子，可能会有部分背景图片被牺牲
  contain 以背景图片为主，背景图片会被等比例缩放，直到在盒子里面完全显示图片，可能会产生空白区域
  background-position: center center;
  背景图片居中显示
  background-repeat: no-repeat;
  背景图片不重复显示
- rem、vh、vw 相对单位
  rem 相对单位，相对于根元素的字体大小
    html 根元素的字体大小默认是16px
    html{font-size:10px;} //可以自己设置
  vh 视口高度单位，1vh 等于视口高度的1%
  vw 视口宽度单位，1vw 等于视口宽度的1%

**相对单位**解决移动端设备尺寸不一致的问题，建议不要使用px绝对单位

- flex + 居中 完成布局
  - display:flex; 弹性布局，手机尺寸不一致
    9个.key 子元素就不会换行了（块级），在一行
  - justify-content:center; 水平居中
  - align-items:center; 垂直居中
