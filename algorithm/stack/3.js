// 链表实现栈
// es5 没有 class 关键字
// es6 有了 class 关键字

class ListNode{
    constructor(val){
        this.val = val;
        this.next = null; // 离散性
    }
}

class LinkedListStack{
    // 私有属性 只能在内部使用，面向对象的封装性，保护类不被随意修改
    // 栈顶指针
    #stackPeek; 
    // 栈的大小，可以随意扩容
    #size = 0;
    constructor(){
        // 初始化栈顶指针为空
        this.#stackPeek = null;
    }
}

const stack = new LinkedListStack();
// console.log(stack.size); // 私有属性不能被直接访问，undefined