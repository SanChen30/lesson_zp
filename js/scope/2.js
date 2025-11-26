var globalVar = "我是全局变量";

function myFunction(){
    var localVar = "我是局部变量";
    console.log(localVar);
    console.log(globalVar);
}

myFunction();
console.log(globalVar);
// console.log(localVar); // 报错，局部变量只能在函数内部使用

