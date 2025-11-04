# 微信小程序

1. AppStore 的 Native App(IOS/Android)
- 一个App，开发两次

2. 微信生态的APP
- 借助微信的生态，用前端的技术，不用开发两个版本
- 内存小，几乎不用安装，扫码即用
- 特别适合线下 o2o生态 特别合适线下商业

## 小程序核心概念

### pages

- 自动分成四部分，不运行在浏览器，不是网页

1. wxml -> html
1) view -> div

2. wxss -> css

3. js

### vant 框架

1. npm i vant-weapp -S --production

2. 工具 -> 构建 npm

3. 引入组件：在`index.json`中引入`vant`中的组件
   
```js
{
  "usingComponents": {
    "van-search":"vant-weapp/search/index"
  }
}
```

