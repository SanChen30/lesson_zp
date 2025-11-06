// v8 引擎看待这段代码

var myName; //undefined

function showName() {
    console.log('函数showName被执行');
}

showName();
console.log(myName);
myName = '张三';