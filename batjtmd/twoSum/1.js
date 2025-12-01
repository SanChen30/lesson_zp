// es5 没有hashMap O(1)的时间复杂度
function twoSum(nums,target){
    const diffs = {}; 
    const len = nums.length; // 缓存数组的长度
    for(let i =0; i<len; i++){
        const complement = target - nums[i]; // 和变差
        if(diffs[complement] !== undefined){
            return [diffs[complement], i];
        }
        diffs[nums[i]] = i;
    }
}