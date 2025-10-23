// null 和 undefined 都是空值
// 区别：
// null 是一个对象，而 undefined 是一个原始值
// null 表示一个空对象指针，而 undefined 表示一个未定义的值

// 变量声明但未赋值时，类型无法确定，默认值为 undefined
// 或对象属性/数组元素不存在时，JS自动给undefined
// JS 弱类型语言
let a;
console.log(a,typeof a); // undefined undefined
a = 1; //变量的类型由值决定
console.log(a,typeof a); // 1 number

// null 表示一个空值，不是未定义
// 有值
// 主动赋值给变量，表示这个值是空的
let c = "原有的值";
c = null;

let b = null;
console.log(b,typeof b); // null object

let obj = {
    name: "张三",
}
console.log(obj.age); // undefined