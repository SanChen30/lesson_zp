# 对象字面量 JSON Object

## JS 是最有表现力的脚本语言
- 不需要像Java/c++ 等语言一样，先定义类，再创建对象
- {}是对象字面量
- []数组
- js 提供了对象(object)字面量(字面意义上就知道是一个对象)

## 面向对象
- 对象由属性和方法构成
- 简单的面向对象
- 复杂的人际关系的面向对象

## JS 数据类型
- 字符串 string
- 数值 number
- 布尔值 boolean
- 空值 null
- 未定义 undefined
- 对象 object

## 设计模式 Proxy
- 面向**接口(Interface)**的编程，代码就灵活且powerful
- xs -> xm 送花,大概率会被拒
- 添加一个 xh 对象字面量，xh 拥有和 xm 一样的 receiveFlower 方法
- xs -> xh,xh -> xm 送花
  xh 可以代理 xm 收花
  xm xh 实现了一样的 receiveFlower 接口
- 这就是代理模式(Proxy Pattern)