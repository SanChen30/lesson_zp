function add(a) {
    return function(b) {
        return a + b;
    }
}

// 函数柯理化 add(1)(2)
console.log(add(1)(2));

