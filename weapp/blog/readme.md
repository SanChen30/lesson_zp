# blog 小程序

1. app.json 应用配置
1) pages > page 路径
2) window > navigationBar 导航栏
3) tabBar > list 底部导航栏
4) 全局组件
``` 
"usingComponents": {
    "van-button": "@vant/weapp/button",
    "van-search":"@vant/weapp/search"
  }
```

2. 小程序架构
1）app 应用的概念

全局：app.wxss、app.js、app.json (全局使用的组件放在app.json)

pages > page：wxml、wxss、js、json

2) weapp 事件

- onclick -> bindtap 

- js 文件就是一个 page 的实例
  data 是页面可以用到的数据
  事件处理函数在 Page ({}) 配置就好

- wx 对象
  weixin的能力

  block 是一个可以接受指令的标签
   wx:for 循环输出
   wx:key 唯一的ID

3) rpx
  小程序独有的响应式单位
  无论什么手机，都能适配
  宽度为 750rpx iphone 标准设备的单位
  如何等比例，由小程序自己去做
  设计师出的移动端设计稿就是 750

4) 数据驱动界面

- js Page{{}}

data 绑定了数据
wxml 模板 使用{{}} 来使用数据
block wx:for 循环指令来循环输出，默认每一项是item