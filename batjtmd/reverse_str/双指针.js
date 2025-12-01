// JavaScript 中字符串是不可变的，所以不能真正“原地”反转，但可以转换为数组后用双指针交换。
function reverseStr(str) {
  const arr = str.split(''); // 转为字符数组
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    // 交换
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }

  return arr.join('');
}

// 示例
console.log(reverseStr("hello")); // "olleh"
