const arr = new Array(6).fill(0);
const len = arr.length; // 优化 只查找一次

// 计数循环 cpu 工作很契合
// 遍历数组方法千千万，计数循环性能最好

// for(let i = 0; i < arr.length; i++) // 每次循环都要查找 arr.length 属性，查找开销大

for (let i = 0; i < len; i++) { 
    // arr.pop();
    console.log(arr[i]);
}

