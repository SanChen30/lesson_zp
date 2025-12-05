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

// O(1)
MiniStack.prototype.getMin = function() {
    
}