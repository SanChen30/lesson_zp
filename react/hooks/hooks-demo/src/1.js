// 不是纯函数
function add(nums) {
    return nums.reduce((pre,cur) => pre +cur, 0);
}

// 纯函数
const add = function(x, y) {
    return x + y;
}

const nums = [1,2];
add(nums); // 有副作用，修改了 nums 数组
console.log(nums.length);