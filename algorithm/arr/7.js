for (var i = 0; i < 10; i++) {
    // i 有变量提升，属于全局环境中的变量环境，只有一个 i
    setTimeout(function () {
        // 函数作用域
        console.log(i);
    }, 1000);
}

for (let i = 0; i < 10; i++) {
    // 每次循环都创建一个新的块级作用域，有10个不同的 i
    // 块级作用域，每次循环创建新的词法环境
    // 词法环境会有一个栈用来存十个 i
    // 每次函数调用时，会从词法环境中找到对应的 i
    // i 没有变量提升，在暂时性死区，属于它自己的词法环境
    // 块级作用域
    setTimeout(function () {
        // 函数作用域
        console.log(i); // 可以在词法环境中找到十个 i
    }, 1000);
}


// 在 JavaScript 中，使用 var 声明循环变量 i 时，
// 在循环体内创建点击事件处理函数会导致一个常见问题：
// 所有点击事件都引用同一个变量 i，最终的值是循环结束后的值。
// ```javascript
// for (var i = 0; i < 5; i++) {
//     btn.addEventListener('click', function() {
//         console.log(i); // 总是输出 5
//     });
// }
// ```

// 解决方案

// 1. 使用 let（推荐）
// ```javascript
// for (let i = 0; i < 5; i++) {
//     btn.addEventListener('click', function() {
//         console.log(i); // 正确输出 0,1,2,3,4
//     });
// }
// ```

// 2. 使用闭包（IIFE）
// ```javascript
// for (var i = 0; i < 5; i++) {
//     (function(index) {
//         btn.addEventListener('click', function() {
//             console.log(index); // 正确输出 0,1,2,3,4
//         });
//     })(i);
// }
// ```

// 3. 使用 forEach
// ```javascript
// [0,1,2,3,4].forEach(function(i) {
//     btn.addEventListener('click', function() {
//         console.log(i); // 正确输出 0,1,2,3,4
//     });
// });
// ```


// 最简单有效的解决方案就是使用 `let` 替代 `var`。