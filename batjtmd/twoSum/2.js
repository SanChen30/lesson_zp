// es6 提供了hashMap O(1)的时间复杂度
// 语言提供了一些内置的数据结构
function twoSum(nums, target) {
    const diffs = new Map();
    const len = nums.length;
    for (let i = 0; i < len; i++) {
        const complement = target - nums[i];
        if (diffs.has(complement)) {
            return [diffs.get(complement), i]
        }
        diffs.set(nums[i], i);
    }
}