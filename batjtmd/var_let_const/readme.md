# var_let_const

1. js 里面如何声明变量？
   1) var 声明的变量
      ```js
      var a = 1;
      //相当于
      var a; //**变量提升**，在代码一开始就可以访问，编译阶段（检测语法错误）
      a = 1; //赋值，执行阶段
      ```
   2) let
   3) const 

## 报错的集合
- ReferenceError: height is not defined
  作用域外调用
- TypeError: Assignment to constant variable.
  常量不能被重新赋值
- ReferenceError: Cannot access 'PI' before initialization
  提前访问暂时性死区（Dead Zone）的变量


## 任务
- leetcodehot 100 6-10题目 https://leetcode.cn/studyplan/top-100-liked/
- 《你不知道的JavaScript》 第1-2章 写一篇学习笔记文章
