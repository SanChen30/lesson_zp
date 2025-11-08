// json 数组 在堆内存中，独立于users、data 之外
// users、data 对 json 数组都是引用，类似于指针

// 变量的数据类型由值决定，变量是变量，值是值
var user; // 栈
var data; // 栈

var users = [
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

var data = users;  // 引用式拷贝，浅拷贝, 指向同一个空间

// 如何真正的去拷贝一个对象？
// 向堆内存重新申请一个新的空间，存储拷贝后的数据，与原对象独立，深拷贝

// JSON.stringify() - 对象转 JSON 字符串
// JSON.parse() - JSON 字符串转对象

// 序列化，是把内存中的对象转换为字节序列、字符串或其他可存储/传输格式的过程
console.log(JSON.stringify(users), typeof JSON.stringify(users));

// 转换为字符串，再转换为对象
data = JSON.parse(JSON.stringify(users));

data[0].hobbies=["篮球","足球"];
console.log(data,users);
