const MinStack = function () {
    this.stack = [];
    this.stack2 = [];
}

MinStack.prototype.push = function (x) {
    this.stack.push(x);
    if (this.stack2.length === 0 || this.stack2[this.stack2.length - 1] >= x) {
        this.stack2.push(x);
    }
}

MinStack.prototype.pop = function () {
    if (this.stack.length === 0) return null;
    if (this.stack.pop() === this.stack2[this.stack2.length - 1]) {
        this.stack2.pop();
    }
}

MinStack.prototype.top = function () {
    if (this.stack.length === 0) return null;
    return this.stack[this.stack.length - 1];
}

MinStack.prototype.getMin = function () {
    if (this.stack2.length === 0) return null;
    return this.stack2[this.stack2.length - 1];
}