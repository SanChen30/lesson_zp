const arr = [1, 2, 3, 4, 5, 6];
// reducer 函数
// 第一个参数是reducer函数，reducer函数的第一个参数是暂存器，第二个参数是当前值
// 暂存器存的是: 上一次reducer函数的返回值
// 第一次运行时，暂存器的值是初始值
// 第二个参数是初始值，为了应对空数组报错
const total = arr.reduce((acc, cur) => {
    console.log(acc, cur);
    return acc + cur;
}, 0);

console.log(total);

function reverseStr(str) {
    return [...str].reduce((acc, cur) => cur + acc, '');
}

console.log(reverseStr('hello')); 
