// forEach

const arr = [1, 2, 3, 4, 5, 6];

// 不能 break，会报错
// 每次迭代都是函数调用
arr.forEach((item, index) => {
    // if(item === 3){
    //     break;
    // }
    console.log(item, index); // 函数调用有开销
})

// 对比 for 循环 - 直接执行，无函数调用
const len = arr.length;
for (let i = 0; i < len; i++) {
    console.log(arr[i],i); // 直接访问，性能更好
}