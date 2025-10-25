// js 弱类型语言，变量类型由值决定

// 早期的JS就用来页面交互，有一些缺失甚至设计不合理的地方

// 语言精粹，The Good Parts,The Bad Parts

// ES5 只有var声明变量，没有常量

//约定俗成：变量名大写为常量，不应该被改变
var PI = 3.1415926;
PI = 3.14;
console.log(PI);

var age = 18; 
age++;
console.log(age);

// ES6 2015年 新增let 声明变量，const 声明常量，为了像Java/c++等大型语言，企业级开发项目

// 建议不要用var，用let或const代替

let height = 188;
height++;
console.log(height);

const key = "abc123";
key = "abc234";
