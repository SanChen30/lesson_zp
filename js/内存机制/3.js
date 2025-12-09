// JS 是动态弱类型语言
var bar; // undefined 调用栈执行上下文里顺手就存了
console.log(typeof bar);

bar = 12; 
console.log(typeof bar);

bar = "极客时间"; 
console.log(typeof bar);

bar = true;
console.log(typeof bar);

bar = null;
console.log(typeof bar); // object，这是一个历史遗留问题

bar = {name:"极客时间"};
console.log(typeof bar);

// 用 Object.prototype.toString.call 来获得对象的具体类型
console.log(Object.prototype.toString.call(bar)); // [object Object]
// 普通对象的默认 toString() 就是返回 "[object Object]"