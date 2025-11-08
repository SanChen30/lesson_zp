// 堆内存中，动态性，可以插入删除元素
// 内存需求，弹性
// 堆内存开销大，拷贝不重新给空间，而是指向同一个空间
const users = [
    {
        id: 1,
        name: "张三",
        hometown: "北京"
    },
    {
        id: 2,
        name: "李四",
        hometown: "上海"
    },
    {
        id: 3,
        name: "王五",
        hometown: "广州"
    }
];

users.push({
    id: 4,
    name: "赵六",
    hometown: "深圳"
});

const data = users; //引用式拷贝，浅拷贝

// 栈内存中，简单，高效，变量的读写操作，不会影响空间大小
// 连续存储的简单变量，方便管理，快速访问
// 程序，申请一个连续的空间
let a = 1;
let d = a; //值拷贝，深拷贝


data[0].hobbies=["篮球","足球"];
console.log(data,users);