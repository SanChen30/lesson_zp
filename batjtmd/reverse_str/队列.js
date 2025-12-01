function reverseStr(str) {
  const queue = str.split(''); // 初始化队列
  let reversed = '';
  while (queue.length > 0) {
    // 从队首取出字符，并拼接到结果的前面
    reversed = queue.shift() + reversed;
  }
  return reversed;
}

console.log(reverseStr("hello")); // "olleh"
