function add(a, b, c, d) {
    return a + b + c + d;
}
console.log(add.length);

// 只负责收集参数，不负责执行函数
function curry(fn) {
    // curry 函数词法扫描发现内部函数，形成 closure，fn 是自由变量
    // curried args 收集参数，非严格柯理化函数
    // 递归调用 curried，收集参数
    return function curried(...args) {
        // curried 闭包，会自动更新 args
        if(args.length >= fn.length){
            return fn(...args); // 退出
        }
        return (...rest) => curried(...args,...rest);
    } 
}

const curriedAdd = curry(add);
console.log(curriedAdd(1,2)(3,4)); // 等价于 add(1,2,3,4)
