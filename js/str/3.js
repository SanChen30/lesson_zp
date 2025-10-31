const todos = [
    {
        id: 1,
        title: "学习ES6"
    },
    {
        id: 2,
        title: "通读你不知道的JavaScript"
    }
];

console.log(todos.map(function(todo){
    return `<li>${todo.title}</li>`
}));

// ES6 箭头函数
// function 可以省略，直接写参数 => 函数体
// 如果函数体只有一行代码，大括号可以省略，直接写代码
// 如果只有一个参数，小括号可以省略
console.log(todos.map(todo => `<li>${todo.title}</li>`));
