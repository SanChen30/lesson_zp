# 手写 instanceof 

1. 原型和原型链

2. 实例判断运算符 其他OOP语言

3. 原型关系判断运算符

1) A instanceof B

A 的原型链上是否有 B 的原型

4. 需求

1) 大型项目多人协作时，搞不清除对象上有哪些属性和方法

instanceof 有必要

## 继承的方式

本质就是父类的属性和方法，子类也能有

- 构造函数绑定继承

call/apply

- prototype 模式

 - 父类的实例作为子类的原型
 - 子类的原型的 constructor 属性指回子类