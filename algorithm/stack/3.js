// 链表实现栈
// es5 没有 class 关键字
// es6 有了 class 关键字

class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null; // 离散性
    }
}

class LinkedListStack {
    // 私有属性 只能在内部使用，面向对象的封装性，保护类不被随意修改
    // 栈顶指针
    #stackPeek;
    // 栈的大小，可以随意扩容
    #size = 0;
    constructor() {
        // 初始化栈顶指针为空
        this.#stackPeek = null;
    }
    push(num) {
        const node = new ListNode(num);
        node.next = this.#stackPeek;
        this.#stackPeek = node;
        this.#size++;
    }
    peek() {
        if (!this.#stackPeek) throw new Error('栈为空');
        return this.#stackPeek.val;
    }
    pop() {
        const num = this.peek();
        this.#stackPeek = this.#stackPeek.next;
        this.#size--;
        return num;
    }
    get size() {
        return this.#size;
    }
    isEmpty() {
        return this.#size === 0;
    }
    toArray() {
        let node = this.#stackPeek;
        const res = new Array(this.size);
        for (let i = res.length - 1; i >= 0; i--) {
            res[i] = node.val;
            node = node.next;
        }
        return res;
    }
}

const stack = new LinkedListStack();
console.log(stack.size); // get 方法，访问私有属性