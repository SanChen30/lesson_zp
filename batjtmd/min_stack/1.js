// es5 构造函数
const MiniStack = function() {
    this.stack = [];
}

MiniStack.prototype.push = function(val){
    this.stack.push(val);
}

MiniStack.prototype.pop = function() {
    if(!this.stack || !this.stack.length) return null;
    return this.stack.pop();
}

MiniStack.prototype.top = function() {
    if(!this.stack || !this.stack.length) return null;
    return this.stack[this.stack.length - 1];
}

// O(n)
MiniStack.prototype.getMin = function() {
    // - 遍历
    // - Infinity 初始值
    let minValue = Infinity; // 无穷大
    // 对象解构赋值 const { 属性名 } = 对象;
    // { stack } 中的 stack 必须和对象里的属性名一模一样
    // 如果你想换个名字，可以这样：
    // const { stack: minStack } = this;
    const { stack } = this;
    // 等价于 const stack = this.stack;
    for(let i =0; i < stack.length; i++) {
        if(stack[i] < minValue)
            minValue = stack[i];
    }
    return minValue;
}